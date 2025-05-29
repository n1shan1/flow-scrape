"use client";

import { PurchaseCredits } from "@/actions/billing/purchase-credits";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditsPacks, PACK } from "@/types/billing/pack";
import { useMutation } from "@tanstack/react-query";
import { CoinsIcon, CreditCard } from "lucide-react";
import React, { useState } from "react";

type Props = {};

function CreditsPurchase({}: Props) {
  const [selectedPack, setSelectedPack] = useState(PACK.MEDIUM);
  const mutation = useMutation({
    mutationFn: PurchaseCredits,
    onSuccess: () => {},
    onError: (error) => {
      console.error("Error purchasing credits:", error);
    },
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <CoinsIcon className="size-5 stroke-primary" />
          Purchase Credits
        </CardTitle>
        <CardDescription>
          Buy credits to use for running workflows. Credits are consumed based
          on the resources used by your workflows.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup
          onValueChange={(value) => setSelectedPack(value as PACK)}
          value={selectedPack}
        >
          {CreditsPacks.map((pack) => (
            <div
              onClick={() => setSelectedPack(pack.id)}
              key={pack.id}
              className="cursor-pointer flex items-center gap-4 space-x-3 bg-secondary/50 rounded-lg p-3 hover:bg-secondary"
            >
              <RadioGroupItem value={pack.id} id={pack.id} />
              <Label
                className="flex justify-between cursor-pointer items-center w-full"
                htmlFor={pack.id}
              >
                <span className="text-lg font-semibold">
                  {pack.name} - {pack.label}
                </span>{" "}
                <span className="font-bold text-primary text-xl">
                  Rs. {pack.price}
                </span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          onClick={() => mutation.mutate(selectedPack)}
          disabled={mutation.isPending}
          className="w-full"
          size="lg"
        >
          <CreditCard className="size-5 stroke-background" />
          Purchase Credits
        </Button>
      </CardFooter>
    </Card>
  );
}

export default CreditsPurchase;
