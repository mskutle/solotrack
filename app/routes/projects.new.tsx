import {
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "~/@/components/ui/button";
import {ensureAuthenticated} from "~/auth/helpers";
import {Save} from "lucide-react";
import {MainContent} from "~/layouts/MainContent";
import {getClients} from "~/db/get-clients";
import {Form, Link, useLoaderData, useSubmit} from "@remix-run/react";
import {
  createProject,
  createProjectSchema,
  CreateProjectInput,
} from "~/db/create-project";
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
  const clients = useLoaderData<typeof loader>();
  const submit = useSubmit();
  const {handleSubmit, register, formState, control} =
    useForm<CreateProjectInput>({
      resolver: zodResolver(createProjectSchema),
      defaultValues: {
        name: "",
        description: "",
        clientId: undefined,
        startingMonth: new Date().getMonth(),
        startingYear: new Date().getFullYear(),
        endingMonth: new Date().getMonth(),
        endingYear: new Date().getFullYear(),
      },
    });

  const onSubmit: SubmitHandler<CreateProjectInput> = (data, event) => {
    submit(data, {method: "POST"});
  };

  return (
    <MainContent align="center">
      <div className="max-w-md flex flex-col gap-8">
        <h1 className="text-4xl font-bold">New project</h1>
        <Form
          method="post"
          className="flex flex-col gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <fieldset className="flex flex-col gap-1.5">
            <Label htmlFor="name">Name*</Label>
            <Controller
              control={control}
              name="name"
              render={({field}) => (
                <Input
                  id="name"
                  autoComplete="off"
                  type="text"
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />

            <span className="text-red-600 text-sm">
              {formState.errors.name?.message}
            </span>
          </fieldset>
          <fieldset className="flex flex-col gap-1.5">
            <Label htmlFor="client">Select the client*</Label>
            <Controller
              control={control}
              name="clientId"
              render={({field}) => (
                <Select
                  value={field.value}
                  name={field.name}
                  onValueChange={field.onChange}
                >
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
              )}
            />
            <span className="text-zinc-500 text-sm">
              or{" "}
              <Link to="/clients/new" className="underline">
                create a new one
              </Link>
            </span>
            <span className="text-red-600 text-sm">
              {formState.errors.clientId?.message}
            </span>
          </fieldset>
          <fieldset className="flex flex-col gap-1.5">
            <Label htmlFor="description">Description*</Label>
            <span className="text-zinc-500 text-sm">
              Describe the project and what you did.
            </span>
            <Textarea
              id="description"
              className="h-52 w-96"
              {...register("description")}
            />
            <span className="text-red-600 text-sm">
              {formState.errors.description?.message}
            </span>
          </fieldset>
          <fieldset className="flex flex-col gap-1.5 flex-auto">
            <Label htmlFor="">From*</Label>
            <div className="flex gap-2">
              <Controller
                control={control}
                name="startingMonth"
                render={({field}) => (
                  <Select
                    name={field.name}
                    value={field.value.toString()}
                    onValueChange={field.onChange}
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
                )}
              />
              <Controller
                control={control}
                name="startingYear"
                render={({field}) => (
                  <Select
                    name={field.name}
                    value={field.value.toString()}
                    onValueChange={field.onChange}
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
                            value={(
                              new Date().getFullYear() - index
                            ).toString()}
                          >
                            {new Date().getFullYear() - index}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </fieldset>
          <fieldset className="flex flex-col gap-1.5 flex-auto">
            <Label>To</Label>
            <div className="flex gap-2">
              <Controller
                name="endingMonth"
                control={control}
                render={({field}) => (
                  <Select
                    name={field.name}
                    value={field.value?.toString()}
                    onValueChange={field.onChange}
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
                )}
              />
              <Controller
                name="endingYear"
                control={control}
                render={({field}) => (
                  <Select
                    name={field.name}
                    value={field.value?.toString()}
                    onValueChange={field.onChange}
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
                            value={(
                              new Date().getFullYear() - index
                            ).toString()}
                          >
                            {new Date().getFullYear() - index}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
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
