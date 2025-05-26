"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ParamProps } from "@/types/node/app-node";
import { useEffect, useId, useState } from "react";

function ParamString({
  param,
  value,
  updateNodeParamValue,
  disabled,
}: ParamProps) {
  const id = useId();
  const [intervalValue, setIntervalValue] = useState(value || "");

  useEffect(() => {
    setIntervalValue(value);
  }, [value]);

  let Component: any = Input;
  if (param.variant === "textarea") {
    Component = Textarea;
  }

  return (
    <div className="space-y-1 p-1 w-full">
      <Label htmlFor={id} className="text-xs flex">
        {param.name}
        {param.required && <span className="text-red-500 ml-1">*</span>}
        <span className="text-xs text-muted-foreground ml-1">
          {param.description}
        </span>
      </Label>
      <Component
        disabled={disabled}
        id={id}
        className="text-xs"
        value={intervalValue}
        onChange={(e: any) => setIntervalValue(e.target.value)}
        onBlur={() => updateNodeParamValue(intervalValue)}
      />
      {param.helperText && (
        <p className="text-muted-foreground px-2">{param.helperText}</p>
      )}
    </div>
  );
}

export default ParamString;
