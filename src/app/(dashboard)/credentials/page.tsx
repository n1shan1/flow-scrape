import { GetCredentialsForUser } from "@/actions/credentials/get-credentials-for-user";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";
import { LockKeyhole, ShieldIcon, ShieldOffIcon } from "lucide-react";
import { Suspense } from "react";
import CreateCredentialDialog from "./_components/create-credential-dialog";
import DeleteCredentialDialog from "./_components/delete-workflow-dialog";
type Props = {};

function CredentialsPage({}: Props) {
  return (
    <div className="flex flex-col gap-4 p-6 h-full">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col gap-2 mb-4">
            <h1 className="text-3xl font-bold">Credentials</h1>
            <p className="text-muted-foreground text-lg">
              Manage Your Credentials
            </p>
          </div>
          <CreateCredentialDialog />
        </div>
        <div className="h-full py-6 space-y-8">
          <Alert>
            <ShieldIcon className="size-4 stroke-primary" />
            <AlertTitle>Encryption</AlertTitle>
            <AlertDescription>
              All information is securely encrypted, ensuring your data remains
              safe.
            </AlertDescription>
          </Alert>
          <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
            <UserCredentials />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default CredentialsPage;

async function UserCredentials() {
  const credentials = await GetCredentialsForUser();

  if (!credentials) {
    return <div>Something Went wrong!</div>;
  }

  if (credentials.length === 0) {
    return (
      <Card className="w-full p-4">
        <div className="flex flex-col items-center justify-center h-full p-6">
          <div className="rounded-full bg-accent h-20 w-20 flex items-center justify-center mb-4">
            <ShieldOffIcon size={40} className="stroke-primary" />
          </div>
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <p className="font-bold">No Credentials created yet.</p>
            <p className="text-sm text-muted-foreground">
              Click the button below to create your first credential.
            </p>
            <CreateCredentialDialog triggerText="Create your First Credential" />
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {credentials.map((credential) => {
        const createdAt = formatDistanceToNow(credential.createdAt, {
          addSuffix: true,
        });
        return (
          <Card
            className="flex flex-col gap-4 p-6 shadow-sm border border-border/60 bg-background/80 transition hover:shadow-md"
            key={credential.id}
          >
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-primary/10 h-10 w-10 flex items-center justify-center">
                <LockKeyhole size={20} className="stroke-primary" />
              </div>
              <div className="flex flex-col flex-1">
                <span className="font-semibold text-lg truncate">
                  {credential.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {createdAt}
                </span>
              </div>
              <DeleteCredentialDialog name={credential.name} />
            </div>
          </Card>
        );
      })}
    </div>
  );
}
