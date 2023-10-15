import type { Client } from "@prisma/client";
import type { SerializeFrom } from "@remix-run/node";
import { Form, Link, useNavigation } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { Input } from "./@/components/ui/input";
import { Label } from "./@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./@/components/ui/select";
import { Textarea } from "./@/components/ui/textarea";
// import { Switch } from "./@/components/ui/switch";

type Props = {
  id: string;
  clients: SerializeFrom<Client>[];
};

export function ProjectForm(props: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const navigation = useNavigation();
  const submitting = navigation.state == "submitting";

  useEffect(() => {
    if (!submitting) {
      formRef.current?.reset();
      nameRef.current?.focus();
    }
  }, [submitting])

  return (
    <Form method="post" className="flex flex-col gap-6" id={props.id} ref={formRef}>
      <fieldset className="flex flex-col gap-1.5">
        <Label htmlFor="name">Name*</Label>
        <Input id="name" type="text" name="name" ref={nameRef} />
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
        <Textarea id="description" name="description" className="h-52 w-96" />
      </fieldset>
      <fieldset className="flex flex-col gap-1.5 flex-auto">
        <Label htmlFor="">From*</Label>
        <div className="flex gap-2">
          <Select
            name="startingMonth"
            defaultValue={new Date().getMonth().toString()}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">January</SelectItem>
              <SelectItem value="1">February</SelectItem>
              <SelectItem value="2">March</SelectItem>
              <SelectItem value="3">April</SelectItem>
              <SelectItem value="4">May</SelectItem>
              <SelectItem value="5">June</SelectItem>
              <SelectItem value="6">July</SelectItem>
              <SelectItem value="7">August</SelectItem>
              <SelectItem value="8">September</SelectItem>
              <SelectItem value="9">October</SelectItem>
              <SelectItem value="10">November</SelectItem>
              <SelectItem value="11">December</SelectItem>
            </SelectContent>
          </Select>
          <Select
            name="startingYear"
            defaultValue={new Date().getFullYear().toString()}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              {Array(15)
                .fill(undefined)
                .map((_, index) => (
                  <SelectItem
                    key={index}
                    value={(new Date().getFullYear() - index).toString()}
                  >
                    {new Date().getFullYear() - index}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </fieldset>
      <fieldset className="flex flex-col gap-1.5 flex-auto">
        <Label htmlFor="">To</Label>
        <div className="flex gap-2">
          <Select
            name="endingMonth"
            defaultValue={new Date().getMonth().toString()}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">January</SelectItem>
              <SelectItem value="1">February</SelectItem>
              <SelectItem value="2">March</SelectItem>
              <SelectItem value="3">April</SelectItem>
              <SelectItem value="4">May</SelectItem>
              <SelectItem value="5">June</SelectItem>
              <SelectItem value="6">July</SelectItem>
              <SelectItem value="7">August</SelectItem>
              <SelectItem value="8">September</SelectItem>
              <SelectItem value="9">October</SelectItem>
              <SelectItem value="10">November</SelectItem>
              <SelectItem value="11">December</SelectItem>
            </SelectContent>
          </Select>
          <Select
            name="endingYear"
            defaultValue={new Date().getFullYear().toString()}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              {Array(15)
                .fill(undefined)
                .map((_, index) => (
                  <SelectItem
                    key={index}
                    value={(new Date().getFullYear() - index).toString()}
                  >
                    {new Date().getFullYear() - index}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </fieldset>
    </Form>
  );
}
