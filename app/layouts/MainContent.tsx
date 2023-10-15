import { type VariantProps, cva } from "class-variance-authority";
import type { ReactNode } from "react";
import { cn } from "~/@/lib/utils";

interface Props extends VariantProps<typeof mainContentVariants> {
  children: ReactNode;
}

const mainContentVariants = cva("w-full h-full", {
  variants: {
    padding: {
      default: "p-8",
      none: "",
    },
    align: {
      start: "",
      center: "flex flex-col items-center",
    },
    bg: {
      white: "bg-white",
      gray: "bg-zinc-50",
    },
  },
  defaultVariants: {
    padding: "default",
    align: "start",
    bg: "white",
  },
});

export function MainContent(props: Props) {
  const { padding, align, bg } = props;
  return (
    <div className={cn(mainContentVariants({ padding, align, bg }))}>
      {props.children}
    </div>
  );
}
