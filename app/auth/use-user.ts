import { useOutletContext } from "@remix-run/react";

type Context = {
  user: { firstname: string; lastname: string };
};

export function useUser() {
  return useOutletContext<Context>();
}
