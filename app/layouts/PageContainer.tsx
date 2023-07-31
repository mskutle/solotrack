import type { ReactNode } from "react";
import { MainNavigation } from "./MainNavigation";
import type { User } from "~/db/schema/users";
import type { SerializeFrom } from "@remix-run/node";

type Props = {
  children: ReactNode;
  user: SerializeFrom<User>;
};

export function PageContainer(props: Props) {
  return (
    <div className="flex w-full h-full bg-zinc-50">
      <MainNavigation user={props.user} />
      <main className="grow bg-white">{props.children}</main>
    </div>
  );
}
