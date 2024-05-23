'use server'
import { cookies } from 'next/headers'
 
export async function deleteCookie(key: string) {
  cookies().delete(key)
}
export async function getCookie(key: string) {
  const cookie = cookies().get(key)
  if (cookie) return cookie.value
  return null
}

export async function setCookie(key: string, value: string, options: any) {
  cookies().set(key, value, options)
}