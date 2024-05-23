import 'server-only'
import { SignJWT, jwtVerify } from 'jose'

const secretKey = process.env.APP_JWT_SIGNING_KEY
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload: any, expiresAt: number | string | Date = '7d') {
  return new SignJWT(payload).setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setExpirationTime(expiresAt).sign(encodedKey)
}

export async function decrypt(data: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(data, encodedKey, { algorithms: ['HS256'] })
    return payload
  } catch (error) {
    throw new Error('Decryption failed')
  }
}