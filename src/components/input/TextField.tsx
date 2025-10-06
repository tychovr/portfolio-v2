import { ComponentProps } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";

export const inputVariants = cva(
  "flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base bg-input-background transition-[color,box-shadow] outline-none placeholder:text-muted-foreground file:text-foreground \
   file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm \
   focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20  dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive \
   selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input"
);

function Input({ className, type, ...props }: ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(inputVariants(), className)}
      {...props}
    />
  );
}

export { Input };
