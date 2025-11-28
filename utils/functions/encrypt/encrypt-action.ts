"use server"

import { encrypt } from "./encryption"

export async function encryptEmailAction(email: string) {
  return encrypt(email)
}
