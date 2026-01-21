import { Allocations, Assignments } from "./dashboard-items";

export default function DashboardItems() {
    return <section className="size-full grid lg:grid-cols-2 gap-2">
        <Assignments />
        <Allocations />
    </section>
}
