import { auth, CustomSession } from "@/lib/auth-options"
import { initTRPC, TRPCError } from "@trpc/server"
import superjson from "superjson"

export async function createTRPCContext() {
  const session = (await auth()) as CustomSession | null
  const access_token = session?.user?.access_token ?? null

  const CLIENT_BASE_URL = process.env.NEXT_CLIENT_SERVICE_BASE_URL!
  const ADMIN_BASE_URL = process.env.NEXT_ADMIN_SERVICE_BASE_URL!

  // if (!access_token) {
  //   throw new TRPCError({
  //     code: "UNAUTHORIZED",
  //     message:
  //       "Could not retrieve access token from session. Please ensure you are logged in.",
  //   })
  // }
  return { access_token, CLIENT_BASE_URL, ADMIN_BASE_URL }
}

export type Context = Awaited<ReturnType<typeof createTRPCContext>>

const t = initTRPC.context<Context>().create({
  transformer: superjson,
})

export const createTRPCRouter = t.router
export const createCallerFactory = t.createCallerFactory
export const baseProcedure = t.procedure

export const protectedProcedure = t.procedure.use(async function isAuthed(
  opts
) {
  const { ctx } = opts

  if (!ctx.access_token) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }

  return opts.next({
    ctx,
  })
})
