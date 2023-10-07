import { Form, Link } from "@remix-run/react";
import { DatePicker } from "./@/components/ui/date-picker";
import { Input } from "./@/components/ui/input";
import { Label } from "./@/components/ui/label";
import { useState } from "react";
import { Textarea } from "./@/components/ui/textarea";
import type { SerializeFrom } from "@remix-run/node";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "./@/components/ui/select";
import type { Client } from "@prisma/client";

type Props = {
  id: string;
  clients: SerializeFrom<Client>[];
};

export function ProjectForm(props: Props) {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());

  return (
    <Form method="post" className="flex flex-col gap-6" id={props.id}>
      <fieldset className="flex flex-col gap-1.5">
        <Label htmlFor="name">Name*</Label>
        <Input id="name" type="text" name="name" />
      </fieldset>
      <fieldset className="flex flex-col gap-1.5">
        <Label htmlFor="client">Select the client*</Label>
        <Select name="clientId">
          <SelectTrigger>
            <SelectValue placeholder="Select..." />
          </SelectTrigger>
          <SelectContent>
            {props.clients.map((c) => (
              <SelectItem value={c.id} key={c.id}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-zinc-500 text-sm">
          or{" "}
          <Link to="/clients/new" className="underline">
            create a new one
          </Link>
        </span>
      </fieldset>
      <fieldset className="flex flex-col gap-1.5">
        <Label htmlFor="description">Description*</Label>
        <span className="text-zinc-500 text-sm">
          Describe the project and what you did.
        </span>
        <Textarea id="description" name="description" className="h-36" />
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
