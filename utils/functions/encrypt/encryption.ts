"use server"

import CryptoJS from "crypto-js"

const SECRET = process.env.NEXT_ENCRYPTION_SECRET

if (!SECRET) {
  throw new Error("Environment variable NEXT_ENCRYPTION_SECRET is missing.")
}

const KEY = CryptoJS.SHA256(SECRET)
const IV = CryptoJS.enc.Hex.parse("00000000000000000000000000000000")

// Convert classic base64 to base64url
function toBase64Url(str: string) {
  return str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}

// Convert base64url to classic base64
function fromBase64Url(str: string) {
  let b64 = str.replace(/-/g, "+").replace(/_/g, "/")
  while (b64.length % 4 !== 0) b64 += "="
  return b64
}

// AES encrypt with server IV and key and convert result (ciphertext only) to base64url
export async function encrypt(text: string): Promise<string> {
  // Only encrypt the raw value, don't use OpenSSL (salted__) wrapping!
  const encrypted = CryptoJS.AES.encrypt(text, KEY, { iv: IV })
  // Only include ciphertext, not salt or full OpenSSL envelope
  return toBase64Url(encrypted.ciphertext.toString(CryptoJS.enc.Base64))
}

// AES decrypt from base64url string with server IV and key (input is ciphertext only)
export async function decrypt(ciphertext: string): Promise<string> {
  try {
    const b64 = fromBase64Url(ciphertext)
    // Decryption expects a WordArray, not b64-encoded string! Convert to WordArray:
    const cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: CryptoJS.enc.Base64.parse(b64),
    })
    const decrypted = CryptoJS.AES.decrypt(cipherParams, KEY, { iv: IV })
    const result = decrypted.toString(CryptoJS.enc.Utf8)
    if (typeof result !== "string" || result.length === 0) {
      throw new Error(
        "Malformed UTF-8 data: likely an incorrect secret, corrupt ciphertext, or wrong base64 format"
      )
    }
    return result
  } catch (err) {
    throw new Error(
      "Malformed UTF-8 data: likely an incorrect secret, corrupt ciphertext, or wrong base64 format"
    )
  }
}
