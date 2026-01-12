import { Skeleton } from "@/components/ui/skeleton"

export default function loading() {
  return (
    <section className="size-full flex flex-col gap-2">
      <div className="grid grid-cols-12 gap-2">
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-10" />
      </div>
      <Skeleton className="flex-1 size-full" />
    </section>
  )
}
