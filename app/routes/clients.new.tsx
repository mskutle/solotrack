import {json, type ActionFunctionArgs, redirect} from "@remix-run/node";
import {Save} from "lucide-react";
import {useEffect, useRef} from "react";
import {Button} from "~/@/components/ui/button";
import {ensureAuthenticated} from "~/auth/helpers";
import {createNewClientSchema} from "~/clients/validation";
import {Form, useActionData, useNavigation} from "@remix-run/react";
import {Label} from "~/@/components/ui/label";
import {Input} from "~/@/components/ui/input";
import {MainContent} from "~/layouts/MainContent";
import {createClient} from "~/db/create-client";

export async function action({request}: ActionFunctionArgs) {
  const user = await ensureAuthenticated(request);

  const formData = await request.formData();
  const validationResult = createNewClientSchema.safeParse(
    Object.fromEntries(formData)
  );

  if (!validationResult.success) {
    return json({errors: validationResult.error.flatten()}, {status: 400});
  }

  await createClient(user.id, validationResult.data.name);
  return redirect(".");
}

export default function NewClient() {
  const navigation = useNavigation();
  const nameRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const errors = useActionData<typeof action>();
  const submitting = navigation.state === "submitting";

  useEffect(() => {
    if (!submitting) {
      nameRef.current?.focus();
      formRef.current?.reset();
    }
  }, [submitting]);

  return (
    <MainContent align="center">
      <div className="flex flex-col max-w-sm gap-8">
        <h1 className="text-4xl font-bold">New client</h1>
        <Form ref={formRef} method="post" className="flex flex-col gap-6">
          <fieldset className="flex flex-col gap-1.5">
            <Label htmlFor="name">Name*</Label>
            <Input id="name" type="text" name="name" ref={nameRef} />
            <span className="text-red-600 text-sm">
              {errors?.errors.fieldErrors.name}
            </span>
          </fieldset>
          <Button className="self-end flex items-center gap-2">
            <Save />
            <span>Save</span>
          </Button>
        </Form>
      </div>
    </MainContent>
  );
}
