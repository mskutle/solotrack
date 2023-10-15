import type { User } from "@prisma/client";
import type { SerializeFrom } from "@remix-run/node";

type Props = {
  user: SerializeFrom<User>;
};

export function Greeting(props: Props) {
  const { user } = props;
  return <h1 className="text-2xl font-medium">Welcome, {user.firstName}!</h1>;
}
