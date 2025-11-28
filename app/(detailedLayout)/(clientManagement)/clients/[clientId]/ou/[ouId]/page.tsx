import { OuDetails } from "@/components/modules/client-management/clients/ou-templates/ou-details";
import { OuModules } from "@/components/modules/client-management/clients/ou-templates/ou-modules";

interface OuPageProps {
  params: {
    clientId: string;
    ouId: string;
  };
}
export default async function ouPage({ params }: OuPageProps) {
  const { ouId } = await params;
  return (
    <div className="flex flex-col gap-2">
      <OuDetails ouId={ouId} />
      <OuModules />
    </div>
  );
}
