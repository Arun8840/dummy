import Design from "@/components/modules/client-management/client-plan/design";
import { Warning } from "@/utils/ui/warning";

interface ClientPlanDetailsPageProps {
  params: {
    planId: string;
  };
}

export default async function ClientPlanById({
  params,
}: ClientPlanDetailsPageProps) {
  const { planId } = await params;

  if (!planId) {
    return (
      <Warning
        title={`Client Id missing`}
        variant="destructive"
        description="A client ID is required to view client details."
      />
    );
  }

  return <Design planId={planId} />;
}
