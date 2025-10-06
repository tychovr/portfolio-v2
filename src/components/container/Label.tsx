import React from "react";
import { ComponentProps } from "react";
import * as LabelComponent from "@radix-ui/react-label";
import { cn } from "../../utils/cn";
import { cva } from "class-variance-authority";

const labelVariants = cva(
  "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
);

function Label({
  className,
  ...props
}: ComponentProps<typeof LabelComponent.Root>) {
  return (
    <LabelComponent.Root
      data-slot="label"
      className={cn(labelVariants(), className)}
      {...props}
    />
  );
}

export { Label };
