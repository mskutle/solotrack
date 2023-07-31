import { json, type LoaderArgs } from "@remix-run/node";
import { NavLink, Outlet, useLoaderData, useNavigate } from "@remix-run/react";
import { desc, eq } from "drizzle-orm";
import { Plus } from "lucide-react";
import { Button } from "~/@/components/ui/button";
import { ensureAuthenticated } from "~/auth/helpers";
import { db } from "~/db/db";
import { projects } from "~/db/schema/projects";
import { MasterDetail } from "~/layouts/MasterDetail";
import { PageContainer } from "~/layouts/PageContainer";

export async function loader({ request }: LoaderArgs) {
  const user = await ensureAuthenticated(request);
  const userProjects = await db.query.projects.findMany({
    where: eq(projects.userId, user.id),
    orderBy: desc(projects.createdAt),
  });

  return json({ user, projects: userProjects });
}

export default function Projects() {
  const navigate = useNavigate();
  const { user, projects } = useLoaderData<typeof loader>();

  return (
    <PageContainer user={user}>
      <MasterDetail>
        <MasterDetail.Master>
          <MasterDetail.MasterHeader>
            <h2>All projects</h2>
            <Button variant="ghost" size="icon" onClick={() => navigate("new")}>
              <Plus />
            </Button>
          </MasterDetail.MasterHeader>
          <MasterDetail.MasterList>
            {projects.map((p) => (
              <NavLink to={p.id} key={p.id}>
                {({ isActive }) => (
                  <MasterDetail.MasterListItem highlight={isActive}>
                    <MasterDetail.MasterListItem.Heading>
                      {p.name}
                    </MasterDetail.MasterListItem.Heading>
                    <MasterDetail.MasterListItem.Description
                      highlight={isActive}
                    >
                      {p.description}
                    </MasterDetail.MasterListItem.Description>
                  </MasterDetail.MasterListItem>
                )}
              </NavLink>
            ))}
          </MasterDetail.MasterList>
        </MasterDetail.Master>
        <MasterDetail.Detail>
          <MasterDetail.DetailHeader color="white">
            {null}
          </MasterDetail.DetailHeader>
          <MasterDetail.DetailContent>
            <Outlet />
          </MasterDetail.DetailContent>
        </MasterDetail.Detail>
      </MasterDetail>
    </PageContainer>
  );
}
