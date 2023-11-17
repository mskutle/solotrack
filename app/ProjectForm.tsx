import type {Client} from "@prisma/client";
import type {SerializeFrom} from "@remix-run/node";
import {Form, Link, useNavigation} from "@remix-run/react";
import {useEffect, useRef} from "react";
import {Input} from "./@/components/ui/input";
import {Label} from "./@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./@/components/ui/select";
import {Textarea} from "./@/components/ui/textarea";
import {Button} from "./@/components/ui/button";
import {Save} from "lucide-react";
import {saveProjectSchema, SaveProjectInput} from "./db/save-project";
import {ZodError, typeToFlattenedError} from "zod";

type Props = {
  clients: SerializeFrom<Client>[];
  errors?: SerializeFrom<typeToFlattenedError<SaveProjectInput>>;
};

export function ProjectForm(props: Props) {
  const {errors, clients} = props;
  const nameRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const navigation = useNavigation();
  const submitting = navigation.state === "submitting";

  useEffect(() => {
    if (!submitting && !errors) {
      formRef.current?.reset();
      nameRef.current?.focus();
    }
  }, [submitting, errors]);

  return (
    <Form ref={formRef} method="post" className="flex flex-col gap-6">
      <fieldset className="flex flex-col gap-1.5">
        <Label htmlFor="name">Name*</Label>
        <Input
          id="name"
          type="text"
          name="name"
          ref={nameRef}
          autoComplete="off"
        />
        <span className="text-red-600 text-sm">{errors?.fieldErrors.name}</span>
      </fieldset>
      <fieldset className="flex flex-col gap-1.5">
        <Label htmlFor="client">Select the client*</Label>
        <Select name="clientId">
          <SelectTrigger>
            <SelectValue placeholder="Select..." />
          </SelectTrigger>
          <SelectContent>
            {clients.map((c) => (
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
        <span className="text-red-600 text-sm">
          {errors?.fieldErrors.clientId}
        </span>
      </fieldset>
      <fieldset className="flex flex-col gap-1.5">
        <Label htmlFor="description">Description*</Label>
        <span className="text-zinc-500 text-sm">
          Describe the project and what you did.
        </span>
        <Textarea id="description" name="description" className="h-52 w-96" />
        <span className="text-red-600 text-sm">
          {errors?.fieldErrors.description}
        </span>
      </fieldset>
      <fieldset className="flex flex-col gap-1.5 flex-auto">
        <Label>From*</Label>
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
        <span className="text-red-600 text-sm">
          {errors?.fieldErrors.endDate}
        </span>
      </fieldset>
      <Button
        type="submit"
        variant="default"
        className="self-end flex items-center gap-2"
      >
        <Save />
        <span>Save</span>
      </Button>
    </Form>
  );
}
