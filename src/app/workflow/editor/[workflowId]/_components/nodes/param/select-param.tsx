"use client";

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
import { useId } from "react";

type OptionType = {
  label: string;
  value: string;
};

function SelectParam({ param, updateNodeParamValue, value }: ParamProps) {
  const id = useId();
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
            <SelectLabel>Options</SelectLabel>
            {param.options.map((option: OptionType) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default SelectParam;
