"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "app/@/lib/utils";
import { Button } from "app/@/components/ui/button";
import { Calendar } from "app/@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "app/@/components/ui/popover";

type Props = {
  onChange?: (date: Date | undefined) => void;
  date?: Date | undefined;
  placeholder?: string;
};

export function DatePicker(props: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-auto justify-start text-left font-normal",
            !props.date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {props.date ? (
            format(props.date, "PPP")
          ) : (
            <span>{props.placeholder || "Pick a date"}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={props.date}
          onSelect={props.onChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
