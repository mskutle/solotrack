import {
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import {Button} from "~/@/components/ui/button";
import {ensureAuthenticated} from "~/auth/helpers";
import {useEffect, useRef} from "react";
import {Save} from "lucide-react";
import {MainContent} from "~/layouts/MainContent";
import {getClients} from "~/db/get-clients";
import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import {createProject, createProjectSchema} from "~/db/create-project";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/@/components/ui/select";
import {Label} from "~/@/components/ui/label";
import {Textarea} from "~/@/components/ui/textarea";
import {Input} from "~/@/components/ui/input";

export async function action({request}: ActionFunctionArgs) {
  const user = await ensureAuthenticated(request);
  const formData = await request.formData();

  const result = createProjectSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    return json(result.error.flatten(), {status: 400});
  }

  await createProject(user.id, result.data);

  return redirect(".");
}

export async function loader({request}: LoaderFunctionArgs) {
  const user = await ensureAuthenticated(request);
  const clients = await getClients(user.id);

  return json(clients);
}

export default function NewProject() {
  const navigation = useNavigation();
  const errors = useActionData<typeof action>();
  const nameRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const clients = useLoaderData<typeof loader>();

  const submitting = navigation.state === "submitting";

  useEffect(() => {
    if (!submitting && !errors) {
      nameRef.current?.focus();
      formRef.current?.reset();
    }
  }, [submitting, errors]);

  return (
    <MainContent align="center">
      <div className="max-w-md flex flex-col gap-8">
        <h1 className="text-4xl font-bold">New project</h1>
        <Form ref={formRef} method="post" className="flex flex-col gap-6">
          <fieldset className="flex flex-col gap-1.5">
            <Label htmlFor="name">Name*</Label>
            <Input id="name" type="text" name="name" ref={nameRef} />
            <span className="text-red-600 text-sm">
              {errors?.fieldErrors.name}
            </span>
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
            <Textarea
              id="description"
              name="description"
              className="h-52 w-96"
            />
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
      </div>
    </MainContent>
  );
}
