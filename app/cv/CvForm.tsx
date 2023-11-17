import {Project} from "@prisma/client";
import {SerializeFrom} from "@remix-run/node";
import {Form} from "@remix-run/react";
import {Input} from "~/@/components/ui/input";
import {Label} from "~/@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/@/components/ui/select";
import {Switch} from "~/@/components/ui/switch";
import {cn} from "~/@/lib/utils";

type Props = {
  projects: SerializeFrom<Project>[];
};

export function CvForm(props: Props) {
  return (
    <Form method="post" className="flex flex-col grow gap-8">
      <fieldset className="max-w-xs">
        <Label htmlFor="name">Name*</Label>
        <Input type="text" name="name" autoComplete="off" />
      </fieldset>
      <fieldset className="max-w-xs">
        <Label htmlFor="language">Language*</Label>
        <Select name="language" defaultValue="nb">
          <SelectTrigger id="language">
            <SelectValue placeholder="Select..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nb">
              <div className="flex items-center gap-2">
                <span>🇳🇴</span>
                <span>Norwegian</span>
              </div>
            </SelectItem>
            <SelectItem value="en">
              <div className="flex items-center gap-2">
                <span>🇬🇧</span>
                <span>English</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </fieldset>
      <fieldset>
        <h1 className="text-xl font-bold">Projects</h1>
        <ul className="flex flex-col gap-2 mt-2">
          {props.projects.map((project) => (
            <li
              key={project.id}
              className={cn(
                "flex gap-8 items-center justify-between bg-green-50 p-4"
              )}
            >
              <div className="flex flex-col">
                <span className="font-bold">{project.name}</span>
                <span className="text-sm text-zinc-600">Some subtitle</span>
              </div>
              <Switch defaultChecked />
            </li>
          ))}
        </ul>
      </fieldset>
    </Form>
  );
}
