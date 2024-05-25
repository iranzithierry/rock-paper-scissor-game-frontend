import 'server-only'
import { cookies } from 'next/headers'
import { decrypt, encrypt } from './jwt'
import COOKIE_NAMES from '@/constants/cookies-names'
import COOKIE_TIME from '@/constants/cookies-time'
import { deleteCookie } from './cookies'
import { redirect } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'
import BACKEND_URLS from '@/constants/backend-urls'
import { SessionType, UserType } from '@/types/auth'

export const runtime = 'edge'
const getCookieSessionValue = () => cookies().get("session")?.value;

export async function createSession(payload: object) {
  const session = await encrypt(payload, COOKIE_TIME.USER_SESSION_STRING)
  // SET TO TRUE IN PRODU
  cookies().set("session", session, { httpOnly: true, secure: false, maxAge: COOKIE_TIME.USER_SESSION, sameSite: 'lax', path: '/', })
}


export async function getSession() {
  try {
    const decryptedSession = await decrypt(getCookieSessionValue())
    return decryptedSession as unknown as SessionType
  } catch (error) {
    return null
  }
}
export async function authenticate(data: UserType) {
  try {
    cookies().set({ name: COOKIE_NAMES.ACCESS_TOKEN, value: data.tokens.access, maxAge: COOKIE_TIME.ACCESS_TOKEN, path: "/", httpOnly: true, })
    cookies().set({ name: COOKIE_NAMES.REFRESH_TOKEN, value: data.tokens.refresh, maxAge: COOKIE_TIME.REFRESH_TOKEN, path: "/", httpOnly: true })
  } catch (error: any) {
    throw new Error(error.message)
  } finally {
    const { tokens, ...user } = data;
    createSession({ user: user })
  }
}

export async function logout() {
  try {
    await deleteCookie('session')
    await deleteCookie(COOKIE_NAMES.REFRESH_TOKEN)
    await deleteCookie(COOKIE_NAMES.ACCESS_TOKEN)
  } catch (error: any) {
    throw new Error(error.message)
  } finally { redirect('/login') }
}
export async function updateAccessToken(request: NextRequest) {
  const accessToken = request.cookies.get(COOKIE_NAMES.ACCESS_TOKEN)?.value
  const currentRefreshToken = request.cookies.get(COOKIE_NAMES.REFRESH_TOKEN)?.value
  const res = NextResponse.next()

  if (accessToken) {
    const error = await decryptionError(accessToken)
    if (error) {
      res.cookies.delete(COOKIE_NAMES.ACCESS_TOKEN)
    } else { return }
  }
  if (!currentRefreshToken) {
    res.cookies.delete("session")
    return res
  }
  const response = await fetch(BACKEND_URLS.GET_NEW_ACCESS_TOKEN, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh: currentRefreshToken })
  });
  const data = await response.json();
  if (!response.ok) {
    res.cookies.delete(COOKIE_NAMES.REFRESH_TOKEN)
    return res;
  }
  if ('access' in data) {
    res.cookies.set({ name: COOKIE_NAMES.ACCESS_TOKEN, value: data.access, secure: true, maxAge: COOKIE_TIME.ACCESS_TOKEN, path: "/", httpOnly: true, })
  }
  return res

}

async function decryptionError(value: any) {
  try {
    await decrypt(value)
    return false
  } catch (error) { return true }
}