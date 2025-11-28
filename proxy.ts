import { auth } from "@/lib/auth-options"

export default function proxy(req: any, res: any, next: any) {
  return auth(req, res)
}
