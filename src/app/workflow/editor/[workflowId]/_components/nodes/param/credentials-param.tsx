"use client";

import { GetCredentialsForUser } from "@/actions/credentials/get-credentials-for-user";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ParamProps } from "@/types/node/app-node";
import { useQuery } from "@tanstack/react-query";
import { useId } from "react";

function CredentialsParam({ param, updateNodeParamValue, value }: ParamProps) {
  const id = useId();

  const query = useQuery({
    queryKey: ["credentials"],
    queryFn: () => GetCredentialsForUser(),
    refetchInterval: 10000, // Refetch every 10 seconds
  });
  return (
    <div className="flex flex-col gap-1 w-full">
      <Label htmlFor={id} className="text-xs flex">
        {param.name}
        {param.required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Select
        defaultValue={value}
        onValueChange={(value) => {
          updateNodeParamValue(value);
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={"Select an option"} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Credentials</SelectLabel>
            {query.data?.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default CredentialsParam;
