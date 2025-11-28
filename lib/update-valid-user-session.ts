"use server"

import { auth, CustomSession, unstable_update } from "./auth-options"
import { SessionUser } from "./auth-options"

export async function updateValidUserSession(
  update: Partial<SessionUser>
): Promise<SessionUser | null> {
  const session = (await auth()) as CustomSession

  if (!session?.user?.email) {
    console.warn("⚠️ Failed to get current session value")
    return null
  }

  const user: SessionUser = {
    id: update.id ?? "",
    email: session?.user.email ?? "",
    name: session?.user?.email ?? "",
    access_token: update.access_token ?? "",
    refresh_token: update.refresh_token ?? "",
    verified: typeof update.verified === "boolean" ? update.verified : true,
    mfa_enabled:
      typeof update.mfa_enabled === "boolean" ? update.mfa_enabled : false,
    mfa_verified: session?.user?.mfa_verified,
    token_type: update.token_type ?? "",
    expires_in: update.expires_in ?? 0,
  }

  await unstable_update({
    ...session,
    user: { ...user },
  })
  return user
}
