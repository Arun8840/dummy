"use server"

import CryptoJS from "crypto-js"

const SECRET = process.env.NEXT_ENCRYPTION_SECRET

if (!SECRET) {
  throw new Error("Environment variable NEXT_ENCRYPTION_SECRET is missing.")
}

const KEY = CryptoJS.SHA256(SECRET)
const IV = CryptoJS.enc.Hex.parse("00000000000000000000000000000000")

// --- Base64 → Base64URL ---
function toBase64Url(str: string) {
  return str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "")
}

// --- Base64URL → Base64 ---
function fromBase64Url(str: string) {
  let b64 = str.replace(/-/g, "+").replace(/_/g, "/")
  while (b64.length % 4 !== 0) b64 += "="
  return b64
}

export async function encrypt(text: string): Promise<string> {
  const base64 = CryptoJS.AES.encrypt(text, KEY, { iv: IV }).toString()
  return toBase64Url(base64) // URL safe
}

export async function decrypt(ciphertext: string): Promise<string> {
  const base64 = fromBase64Url(ciphertext)
  const bytes = CryptoJS.AES.decrypt(base64, KEY, { iv: IV })
  return bytes.toString(CryptoJS.enc.Utf8)
}
