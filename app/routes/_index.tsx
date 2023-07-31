import {
  redirect,
  type LoaderArgs,
  type V2_MetaFunction,
} from "@remix-run/node";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "SoloTrack" },
    {
      name: "description",
      content:
        "The best tool for freelancers and independent consultants to manage their projects and clients.",
    },
  ];
};

export async function loader({ request }: LoaderArgs) {
  return redirect("/dashboard");
}

export default function Index() {
  return null;
}
