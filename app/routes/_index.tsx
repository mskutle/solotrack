import {
  redirect,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "SoloTrack" },
    {
      name: "description",
      content:
        "The best tool for freelancers and independent consultants to manage their projects and clients.",
    },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  return redirect("/dashboard");
}

export default function Index() {
  return null;
}
