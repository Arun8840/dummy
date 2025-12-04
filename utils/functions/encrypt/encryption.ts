"use server";

import CryptoJS from "crypto-js";

const SECRET = process.env.NEXT_ENCRYPTION_SECRET;

if (!SECRET) {
  throw new Error("Environment variable NEXT_ENCRYPTION_SECRET is missing.");
}

// For server-side only: use Buffer for IV to prevent subtle bugs in node vs browser encoding
const KEY = CryptoJS.SHA256(SECRET);
const IV = CryptoJS.enc.Hex.parse("00000000000000000000000000000000");

// Convert classic base64 to base64url
function toBase64Url(str: string) {
  return str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

// Convert base64url to classic base64
function fromBase64Url(str: string) {
  let b64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (b64.length % 4 !== 0) b64 += "=";
  return b64;
}

// AES encrypt with server IV and key and convert result to base64url
export async function encrypt(text: string): Promise<string> {
  const encrypted = CryptoJS.AES.encrypt(text, KEY, { iv: IV });
  return toBase64Url(encrypted.toString());
}

// AES decrypt from base64url string with server IV and key
export async function decrypt(ciphertext: string): Promise<string> {
  const base64Ciphertext = fromBase64Url(ciphertext);
  const decrypted = CryptoJS.AES.decrypt(base64Ciphertext, KEY, { iv: IV });
  return decrypted.toString(CryptoJS.enc.Utf8);
}
