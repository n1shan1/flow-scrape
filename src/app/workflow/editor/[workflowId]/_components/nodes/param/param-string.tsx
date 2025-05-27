"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ParamProps } from "@/types/node/app-node";
import { useEffect, useId, useState } from "react";
import { cn } from "@/lib/utils";

type InputComponent = typeof Input | typeof Textarea;

function ParamString({
  param,
  value = "",
  updateNodeParamValue,
  disabled,
}: ParamProps) {
  const id = useId();
  const [localValue, setLocalValue] = useState(value);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (value !== undefined) {
      setLocalValue(value);
    }
  }, [value]);

  const Component: InputComponent =
    param.variant === "textarea" ? Textarea : Input;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLocalValue(e.target.value);
    if (param.required && !e.target.value.trim()) {
      setError(`${param.name} is required`);
    } else {
      setError(null);
    }
  };

  const handleBlur = () => {
    if (param.required && !localValue.trim()) {
      setError(`${param.name} is required`);
    } else {
      setError(null);
    }
    updateNodeParamValue(localValue);
  };

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
        className={cn("text-xs", error && "border-red-500")}
        value={localValue}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {error && (
        <p className="text-xs text-red-500 px-2">{error}</p>
      )}
      {param.helperText && !error && (
        <p className="text-muted-foreground px-2">{param.helperText}</p>
      )}
    </div>
  );
}

export default ParamString;
