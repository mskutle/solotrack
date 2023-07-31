import { Form } from "@remix-run/react";
import { DatePicker } from "./@/components/ui/date-picker";
import { Input } from "./@/components/ui/input";
import { Label } from "./@/components/ui/label";
import { useState } from "react";
import { RichTextEditor } from "./common/RichTextEditor";
import { Textarea } from "./@/components/ui/textarea";

type Props = {
  id: string;
};

export function ProjectForm(props: Props) {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());

  return (
    <Form method="post" className="flex flex-col gap-6" id={props.id}>
      <fieldset className="flex flex-col gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input id="name" type="text" name="name" />
      </fieldset>
      <fieldset className="flex flex-col gap-1.5">
        <Label htmlFor="description">Description</Label>
        {/* <RichTextEditor /> */}
        <Textarea id="description" name="description" />
      </fieldset>
      <div className="flex gap-2">
        <fieldset className="flex flex-col gap-1.5 flex-auto">
          <Label>From</Label>
          <input
            type="hidden"
            name="startedAt"
            value={startDate?.toUTCString()}
          />
          <DatePicker date={startDate} onChange={setStartDate} />
        </fieldset>
        <fieldset className="flex flex-col gap-1.5 flex-auto">
          <Label>To</Label>
          <input type="hidden" name="endedAt" value={endDate?.toUTCString()} />
          <DatePicker date={endDate} onChange={setEndDate} />
        </fieldset>
      </div>
    </Form>
  );
}
