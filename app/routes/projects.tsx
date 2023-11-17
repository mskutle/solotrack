import {json, type LoaderFunctionArgs} from "@remix-run/node";
import {Link, NavLink, Outlet, useLoaderData} from "@remix-run/react";
import {EditIcon, Pencil, Plus} from "lucide-react";
import {Button} from "~/@/components/ui/button";
import {ensureAuthenticated} from "~/auth/helpers";
import {getPersonalTeam} from "~/db/get-personal-team";
import {getProjectList} from "~/db/get-project-list";
import {MasterDetail} from "~/layouts/MasterDetail";
import {PageContainer} from "~/layouts/PageContainer";

export async function loader({request}: LoaderFunctionArgs) {
  const user = await ensureAuthenticated(request);
  const team = await getPersonalTeam(user.id);
  const projects = await getProjectList(team.id);

  return json({user, projects});
}

export default function Projects() {
  const {user, projects} = useLoaderData<typeof loader>();

  return (
    <PageContainer user={user}>
      <MasterDetail>
        <MasterDetail.Master>
          <MasterDetail.Master.Header>
            <h2>All projects</h2>
            <Button asChild variant="ghost" size="icon">
              <Link to="new">
                <Plus />
              </Link>
            </Button>
          </MasterDetail.Master.Header>
          <MasterDetail.MasterList>
            {projects.map((p) => (
              <NavLink to={p.id} key={p.id}>
                {({isActive}) => (
                  <MasterDetail.MasterListItem highlight={isActive}>
                    <MasterDetail.MasterListItem.Heading>
                      {p.name}
                    </MasterDetail.MasterListItem.Heading>
                    <MasterDetail.MasterListItem.Description
                      highlight={isActive}
                    >
                      {p.client.name}
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
