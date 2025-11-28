"use server"

import { auth, unstable_update } from "./auth-options"
import { SessionUser } from "./auth-options"

export async function updateMFASession(
  update: Partial<Pick<SessionUser, "mfa_enabled" | "mfa_verified">>
): Promise<SessionUser | null> {
  const session = await auth()
  if (!session || !session.user) {
    console.warn("⚠️ Failed to get current session.")
    return null
  }

  // Construct a new session user object with updated fields
  const user: SessionUser = {
    id: String(session.user.id ?? ""),
    email: session.user.email ?? "",
    name: session.user.name ?? "",
    access_token: (session.user as any).access_token ?? "",
    refresh_token: (session.user as any).refresh_token ?? "",
    verified: (session.user as any).verified ?? false,
    mfa_enabled:
      update.mfa_enabled ?? (session.user as any).mfa_enabled ?? false,
    mfa_verified:
      update.mfa_verified ?? (session.user as any).mfa_verified ?? false,
  }
  await unstable_update({
    ...session,
    user: {
      ...session.user,
      ...user,
    },
  })
  return user
}
