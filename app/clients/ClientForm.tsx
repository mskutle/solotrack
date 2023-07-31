import type { FormProps } from "@remix-run/react";
import { Form } from "@remix-run/react";
import { Label } from "../@/components/ui/label";
import { Input } from "../@/components/ui/input";
import { type CreateClientFormData } from "./validation";

type Props = {
  id: string;
  defaultValues?: CreateClientFormData;
} & FormProps;

export function ClientForm(props: Props) {
  return (
    <Form id={props.id} method="post" className="flex flex-col gap-6">
      <fieldset className="flex flex-col gap-1.5">
        <Label htmlFor="name">Name*</Label>
        <Input id="name" type="text" />
      </fieldset>
    </Form>
  );
}
