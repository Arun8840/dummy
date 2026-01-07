import { Skeleton } from "@/components/ui/skeleton"

export default function loading() {
  return (
    <section className="size-full grid grid-cols-1 sm:grid-cols-[300px_1fr] gap-2">
      <aside className="hidden sm:block">
        <Skeleton className="h-full w-full" />
      </aside>
      <main className="w-full">
        <Skeleton className="h-full w-full" />
      </main>
    </section>
  )
}
