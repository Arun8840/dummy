import NextAuth, { AuthError } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { loginUser } from "./apis/api"

export type SessionUser = {
  id: string
  name: string | null
  email: string | null
  access_token?: string
  refresh_token?: string
  mfa_enabled?: boolean
  mfa_verified?: boolean
  verified?: boolean
  token_type?: string
  expires_in?: number
}

export type CustomSession = {
  user: SessionUser
  expires: string
}

// Use fetch to stay compatible with Edge Runtime (no Node 'https' module)
export const notVerify =
  "You are not verified, please verify your email to login"
export const { handlers, signIn, signOut, auth, unstable_update } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req) => {
        if (!credentials?.email || !credentials?.password) {
          return null
        }
        // Call backend API to authenticate user
        const response = await loginUser({
          email: credentials.email as string,
          password: credentials.password as string,
        })

        const isNewUser =
          typeof response?.data === "string" && response?.data === notVerify

        // if (isNewUser) {
        //   return {
        //     verified: !isNewUser,
        //   }
        // }

        if (!response?.status) {
          throw new Error(response.data)
        }

        const loggedUser = response?.data

        return {
          id: "",
          ...loggedUser,
          verified: !isNewUser,
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60, // 1 day
    updateAge: 24 * 60 * 60,
  },
  callbacks: {
    async jwt({
      token,
      user,
      trigger,
      session,
    }: {
      token: any
      user?: SessionUser | any
      trigger?: string
      session?: CustomSession
    }): Promise<any> {
      // When user logs in for the first time
      const now = Math.floor(Date.now() / 1000)
      if (user) {
        const absoluteExpiry = now + (user.expires_in || 86400)

        return {
          ...token,
          id: user.id ?? "",
          name: user.name ?? null,
          email: user.email ?? null,
          access_token: user.access_token ?? null,
          refresh_token: user.refresh_token ?? null,
          mfa_enabled: user.mfa_enabled ?? false,
          mfa_verified: user.mfa_verified ?? false,
          verified: user.verified ?? false,
          token_type: user.token_type ?? "",
          expires_in: absoluteExpiry, // ✅ consistent naming
        }
      }

      // When manually updating the session (e.g., `unstable_update`)
      if (trigger === "update" && session?.user) {
        return { ...token, ...session.user }
      }

      // Validate if access token has expired
      // Validate token expiry safely
      // if (token.expires_in && now >= token.expires_in) {
      //   // token expired
      //   token = null
      // }
      return token
    },

    async session(params) {
      const { session, token } = params

      // Defensive fallback, in case some fields are undefined
      return {
        user: {
          id: (token as any).id ?? "",
          name:
            typeof (token as any).name === "string"
              ? (token as any).name
              : null,
          email:
            typeof (token as any).email === "string"
              ? (token as any).email
              : null,
          access_token: (token as any).access_token ?? undefined,
          refresh_token: (token as any).refresh_token ?? undefined,
          mfa_enabled: (token as any).mfa_enabled ?? undefined,
          mfa_verified: (token as any).mfa_verified ?? undefined,
          verified:
            typeof (token as any).verified === "boolean"
              ? (token as any).verified
              : undefined,
          token_type:
            typeof (token as any).token_type === "string"
              ? (token as any).token_type
              : undefined,
          expires_in:
            typeof (token as any).expires_in === "number"
              ? (token as any).expires_in
              : undefined,
        },
        expires: session.expires,
      }
    },
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
  },
})
