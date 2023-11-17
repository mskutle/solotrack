import type {ReactNode} from "react";
import type {SerializeFrom} from "@remix-run/node";
import type {User} from "@prisma/client";
import {MainNavigation} from "./MainNavigation";

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
