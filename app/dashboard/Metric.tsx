import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { cn } from "~/@/lib/utils";

interface Props extends VariantProps<typeof metricVariants> {
  children: ReactNode;
}

const metricVariants = cva("flex flex-col justify-center items-center p-8", {
  variants: {
    variant: {
      purple: "bg-purple-100 text-purple-500",
      blue: "bg-blue-50 text-blue-500",
      green: "bg-green-100 text-green-500",
      pink: "bg-pink-100 text-pink-500",
      yellow: "bg-yellow-100 text-yellow-500",
    },
  },
  defaultVariants: {
    variant: "purple",
  },
});

export function Metric(props: Props) {
  const { variant, children } = props;
  return <div className={cn(metricVariants({ variant }))}>{children}</div>;
}

const MetricTitle = ({ children }: { children: ReactNode }) => (
  <h2 className={cn("text-sm")}>{children}</h2>
);

const MetricValue = ({ children }: { children: ReactNode }) => (
  <span className="text-5xl">{children}</span>
);

Metric.Title = MetricTitle;
Metric.Value = MetricValue;
