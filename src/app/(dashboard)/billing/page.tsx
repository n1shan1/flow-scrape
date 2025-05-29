import { GetAvailableCredits } from "@/actions/billing/get-available-credits";
import ReactCountUp from "@/components/global/react-count-up-wrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeftIcon, CoinsIcon } from "lucide-react";
import React, { Suspense } from "react";
import CreditsPurchase from "./_components/credits-purchase";
import { Skeleton } from "@/components/ui/skeleton";
import { Period } from "@/types/analytics/analytics";
import { GetCreditsUsageInPeriod } from "@/actions/analytics/get-credits-usage-in-period";
import CreditUsageChart from "./_components/credit-usage-chart";
import PaymentUsageChart from "./_components/payment-usage-chart";
import { GetUserPurchaseHistory } from "@/actions/billing/get-user-purchase-history";

type Props = {};

function BillingPage({}: Props) {
  return (
    <div className="flex flex-col px-6 py-4 h-full w-full min-h-screen gap-4">
      <h1 className="text-3xl font-bold">Billing</h1>
      <Suspense
        fallback={
          <div className="animate-pulse h-16 w-full bg-gray-200 rounded"></div>
        }
      >
        <BalanceCard />
      </Suspense>
      <CreditsPurchase />
      <Suspense fallback={<Skeleton className="w-full h-[300px]" />}>
        <CreditUsageCard />
      </Suspense>
      <Suspense fallback={<Skeleton className="w-full h-[300px]" />}>
        <TransactionHistoryCard />
      </Suspense>
    </div>
  );
}

export default BillingPage;

async function BalanceCard() {
  const userBalance = await GetAvailableCredits();
  return (
    <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20 shadow-lg flex justify-between flex-col overflow-hidden">
      <CardContent className="p-6 relative items-center">
        <div className="flex justify-between items-center">
          <h1>
            <p className="text-lg font-semibold text-foreground mb-1">
              Available Credits
            </p>
            <div className="text-4xl font-bold text-primary">
              <ReactCountUp value={userBalance} />
            </div>
          </h1>
          <CoinsIcon
            size={140}
            className="text-primary opacity-20 absolute bottom-0 right-0"
          />
        </div>
      </CardContent>
      <CardFooter className="text-muted-foreground text-sm">
        When your credit balance reaches zero, your workflows will stop working
      </CardFooter>
    </Card>
  );
}

async function CreditUsageCard() {
  const period: Period = {
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  };
  const data = await GetCreditsUsageInPeriod(period);
  return <PaymentUsageChart chartData={data} />;
}

async function TransactionHistoryCard() {
  const purchases = await GetUserPurchaseHistory();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold items-center flex gap-2">
          <ArrowLeftIcon className="size-6 text-primary" />
          Transactions
        </CardTitle>
        <CardDescription>
          Your transaction history, including all credit purchases and usage
          details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {purchases.length === 0 && (
          <p>
            No transaction history available. Please purchase credits to see
            your transaction history.
          </p>
        )}
        {purchases.map((purchase) => (
          <div
            key={purchase.id}
            className="flex justify-between items-center py-3 border-b border-accent"
          >
            <div>
              <p className="font-medium">{formatDate(purchase.date)}</p>
              <p className="text-sm text-muted-foreground">
                {purchase.description}
              </p>
            </div>
            <div className="text-right">
              <p className="font-medium">
                {formatAmount(purchase.amount, purchase.currency)}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

function formatAmount(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}
