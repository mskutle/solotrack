import type { ReactNode } from "react";
import { cn } from "~/@/lib/utils";

type Props = {
  children: ReactNode;
  pad?: boolean;
  centerX?: boolean;
};

export function MainContent(props: Props) {
  const { centerX = true, pad = true } = props;
  return (
    <div
      className={cn(
        "w-full h-full",
        centerX && "max-w-5xl mx-auto",
        pad && "p-8"
      )}
    >
      {props.children}
    </div>
  );
}
