import { Spinner } from "@/components/ui/spinner"

export default function loading() {
  return (
    <div className="size-full grid place-items-center">
      <Spinner />
    </div>
  )
}
