"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ParamProps } from "@/types/node/app-node";
import { useId, useState } from "react";

function ParamString({ param, value, updateNodeParamValue }: ParamProps) {
  const id = useId();
  const [intervalValue, setIntervalValue] = useState(value || "");
  return (
    <div className="space-y-1 p-1 w-full">
      <Label htmlFor={id} className="text-xs flex">
        {param.name}
        {param.required && <span className="text-red-500 ml-1">*</span>}
        <span className="text-xs text-muted-foreground ml-1">
          {param.description}
        </span>
      </Label>
      <Input
        id={id}
        className="text-xs"
        value={intervalValue}
        onChange={(e) => setIntervalValue(e.target.value)}
        onBlur={() => updateNodeParamValue(intervalValue)}
      />
      {param.helperText && (
        <p className="text-muted-foreground px-2">{param.helperText}</p>
      )}
    </div>
  );
}

export default ParamString;
