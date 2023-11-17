"use client";
import type { MaskitoMask, MaskitoOptions } from "@maskito/core";
import { useMaskito } from "@maskito/react";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

const MaskedInput = (
  className: string,
  maxLength: number,
  mask: MaskitoOptions,
  form: UseFormReturn,
  placeholder: string,
  fieldName: string
) => {
  const maskedInputRef = useMaskito({ options: mask });

  return (
    <Input
      className={className}
      maxLength={maxLength}
      ref={maskedInputRef}
      onInput={(evt) => {
        form.setValue(fieldName, evt.currentTarget.value.toUpperCase());
      }}
      placeholder={placeholder}
    />
  );
};

export default MaskedInput;
