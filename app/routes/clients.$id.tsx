import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { Client } from "~/Client";
import { ensureAuthenticated } from "~/auth/helpers";
import { db } from "~/db/db";
import { clients } from "~/db/schema/clients";
import { MainContent } from "~/layouts/MainContent";

export async function loader({ request, params }: LoaderArgs) {
  const user = await ensureAuthenticated(request);
  const clientId = z.string().parse(params.id);

  const client = await db.query.clients.findFirst({
    where: and(eq(clients.userId, user.id), eq(clients.id, clientId)),
  });

  if (!client) {
    throw new Response(null, { status: 404 });
  }

  return json(client);
}

export default function ClientDetails() {
  const client = useLoaderData<typeof loader>();
  return (
    <MainContent centerX={false} pad={false}>
      <Client client={client} />
    </MainContent>
  );
}
