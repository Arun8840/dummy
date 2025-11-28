import { ClientDetails } from "@/components/modules/client-management/clients/client-details";
import { ClientOuTable } from "@/components/modules/client-management/clients/client-ous";
import { decryptClient } from "@/utils/functions/encrypt/client-encryption";
import { Warning } from "@/utils/ui/warning";

interface ClientDetailsPageProps {
  params: {
    clientId: string;
  };
}
export default async function clientById({ params }: ClientDetailsPageProps) {
  const { clientId } = await params;

  if (!clientId) {
    return (
      <Warning
        title="Client Id missing"
        variant="destructive"
        description="A client ID is required to view client details. Please check the URL or try again."
      />
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <ClientDetails clientId={clientId} />
      <ClientOuTable clientId={clientId} />
    </div>
  );
}
