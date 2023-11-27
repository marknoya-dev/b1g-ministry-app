import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border border-slate-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:border-slate-800 dark:focus:ring-slate-300",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-slate-900 text-slate-50 hover:bg-slate-900/80 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/80",
        secondary:
          "border-transparent bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-900 dark:hover:bg-slate-800/80",
        success:
          "border-transparent bg-green-100 text-green-900 hover:bg-green-100/80 dark:bg-green-800 dark:text-slate-900 dark:hover:bg-green-800/80",
        info: "border-transparent bg-sky-100 text-sky-900 hover:bg-sky-100/80 dark:bg-sky-800 dark:text-slate-900 dark:hover:bg-sky-800/80",
        warning:
          "border-transparent bg-yellow-100 text-yellow-900 hover:bg-yellow-100/80 dark:bg-yellow-800 dark:text-slate-900 dark:hover:bg-yellow-800/80",
        destructive:
          "border-transparent bg-red-500 text-slate-50 hover:bg-red-500/80 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/80",
        orange:
          "border-transparent bg-orange-100 text-orange-900 hover:bg-orange-100/80 dark:bg-orange-800 dark:text-slate-900 dark:hover:bg-orange-800/80",
        outline: "text-slate-950 dark:text-slate-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        badgeVariants({ variant }),
        className,
        "overflow-auto whitespace-nowrap"
      )}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
