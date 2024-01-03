import type {Client, Project, Skill} from "@prisma/client";
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
import {SaveProjectInput} from "./db/save-project";
import {typeToFlattenedError} from "zod";
import {TagsInput} from "./@/components/ui/tagsinput";

type Props = {
  clients: SerializeFrom<Client>[];
  skills: SerializeFrom<Skill>[];
  errors?: SerializeFrom<typeToFlattenedError<SaveProjectInput>>;
  defaultValues?: SerializeFrom<Project>;
};

type FormData = {
  projectId?: string;
  name: string;
  clientId: string;
  description: string;
  startingMonth: string;
  startingYear: string;
  endingMonth: string;
  endingYear: string;
};

export function ProjectForm(props: Props) {
  const {errors, clients, skills, defaultValues} = props;
  const nameRef = useRef<HTMLInputElement>(null);
  const navigation = useNavigation();
  const submitting = navigation.state === "submitting";

  const formData = mapProjectToFormData(defaultValues);

  useEffect(() => {
    if (!submitting && !errors) {
      nameRef.current?.focus();
    }
  }, [submitting]);

  return (
    <Form method="post" className="flex flex-col gap-4 max-w-sm grow-0">
      <input type="hidden" name="id" value={formData.projectId} />
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="name">Name*</Label>
        <Input
          id="name"
          type="text"
          name="name"
          ref={nameRef}
          autoComplete="off"
          defaultValue={formData.name}
        />
        <span className="text-red-600 text-sm">{errors?.fieldErrors.name}</span>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="client">Select client*</Label>
        <Select name="clientId" defaultValue={formData.clientId}>
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
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="description">Description*</Label>
        <span className="text-zinc-500 text-sm">
          Describe the project and what you did.
        </span>
        <Textarea
          id="description"
          name="description"
          className="h-52 w-96"
          defaultValue={formData.description}
        />
        <span className="text-red-600 text-sm">
          {errors?.fieldErrors.description}
        </span>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label>Skills</Label>
        <TagsInput
          onChange={(tags) => console.log(tags)}
          options={skills.map((skill) => ({
            label: skill.name,
            value: skill.id,
          }))}
        />
      </div>
      <div className="flex flex-col gap-1.5 flex-auto">
        <Label>From*</Label>
        <div className="flex gap-2">
          <Select name="startingMonth" defaultValue={formData.startingMonth}>
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
          <Select name="startingYear" defaultValue={formData.startingYear}>
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
      </div>
      <div className="flex flex-col gap-1.5 flex-auto">
        <Label htmlFor="">To</Label>
        <div className="flex gap-2">
          <Select name="endingMonth" defaultValue={formData.endingMonth}>
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
          <Select name="endingYear" defaultValue={formData.endingYear}>
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
      </div>
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

function mapProjectToFormData(project?: SerializeFrom<Project>): FormData {
  const startedAt = project?.startedAt
    ? new Date(project.startedAt)
    : new Date();
  const endedAt = project?.endedAt ? new Date(project.endedAt) : new Date();
  const startingMonth = startedAt.getMonth().toString();
  const startingYear = startedAt.getFullYear().toString();
  const endingMonth = endedAt.getMonth().toString();
  const endingYear = endedAt.getFullYear().toString();

  return {
    projectId: project?.id,
    name: project?.name ?? "",
    clientId: project?.clientId ?? "",
    description: project?.description ?? "",
    startingMonth,
    startingYear,
    endingMonth,
    endingYear,
  };
}
