import type { ActionFunctionArgs } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import { Button } from "~/@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/@/components/ui/card";
import { authenticator } from "~/auth/authenticator";

export async function action({ request, params }: ActionFunctionArgs) {
  return authenticator.authenticate("google", request, {
    successRedirect: "/",
    failureRedirect: "/login",
  });
}

export default function Login() {
  return (
    <div className="flex flex-col items-center h-full bg-zinc-50">
      <Card className="max-w-[300px] mt-36">
        <CardHeader>
          <CardTitle className="text-center">Log in</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col ">
          <Form method="post">
            <Button variant="outline" className="flex items-center gap-2">
              <img src="/img/google.svg" alt="Google" className="w-5 h-5" />
              <span>Log in with Google</span>
            </Button>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <p className="text-xs text-center">
            Don't have an account yet? <br />
            <Link
              to="/signup"
              className="text-blue-500 hover:underline underline-offset-2"
            >
              Click here to sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
