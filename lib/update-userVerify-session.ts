"use server"

import { auth, CustomSession, unstable_update } from "./auth-options"
import { SessionUser } from "./auth-options"

export async function updateUserVerifySession(
  update: Partial<Pick<SessionUser, "verified">>
): Promise<SessionUser | null> {
  const session = (await auth()) as CustomSession

  // Construct a new session user object with updated fields
  const user: SessionUser = {
    ...session.user,
    ...update,
  }

  await unstable_update({
    ...session,
    user,
  })

  return user
}
