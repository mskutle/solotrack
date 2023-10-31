import { json, type ActionFunctionArgs, redirect } from "@remix-run/node";
import { Save } from "lucide-react";
import { useId } from "react";
import { Button } from "~/@/components/ui/button";
import { ensureAuthenticated } from "~/auth/helpers";
import { createNewClientSchema } from "~/clients/validation";
import { Form, useActionData } from "@remix-run/react";
import { parse } from "@conform-to/zod";
import { useForm } from "@conform-to/react";
import { Label } from "~/@/components/ui/label";
import { Input } from "~/@/components/ui/input";
import { MainContent } from "~/layouts/MainContent";
import { createClient } from "~/db/create-client";

export async function action({ request }: ActionFunctionArgs) {
  const user = await ensureAuthenticated(request);

  const formData = await request.formData();
  const submission = parse(formData, { schema: createNewClientSchema });

  if (!submission.value || submission.intent !== "submit") {
    return json(submission, { status: 400 });
  }

  await createClient(user.id, submission.value.name);

  return redirect(".");
}

export default function NewClient() {
  const clientFormId = useId();
  const lastSubmission = useActionData<typeof action>();
  const [form, { name }] = useForm({
    lastSubmission,
    onValidate({ formData }) {
      return parse(formData, { schema: createNewClientSchema });
    },
  });

  return (
    <MainContent align="center">
      <div className="flex flex-col max-w-sm gap-8">
        <h1 className="text-4xl font-bold">New client</h1>
        <Form
          id={clientFormId}
          method="post"
          className="flex flex-col gap-6"
          {...form.props}
        >
          <fieldset className="flex flex-col gap-1.5">
            <Label htmlFor="name">Name*</Label>
            <Input id="name" type="text" name={name.name} />
            <span className="text-red-600 text-sm">{name.error}</span>
          </fieldset>
        </Form>
        <Button
          className="self-end flex items-center gap-2"
          form={clientFormId}
        >
          <Save />
          <span>Save</span>
        </Button>
      </div>
    </MainContent>
  );
}
