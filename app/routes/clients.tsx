import type {LoaderFunctionArgs} from "@remix-run/node";
import {json} from "@remix-run/node";
import {NavLink, Outlet, useLoaderData, useNavigate} from "@remix-run/react";
import {Plus} from "lucide-react";
import {Button} from "~/@/components/ui/button";
import {ensureAuthenticated} from "~/auth/helpers";
import {getClients} from "~/db/get-clients";
import {getPersonalTeam} from "~/db/get-personal-team";
import {MasterDetail} from "~/layouts/MasterDetail";
import {PageContainer} from "~/layouts/PageContainer";

export async function loader({request}: LoaderFunctionArgs) {
  const user = await ensureAuthenticated(request);
  const team = await getPersonalTeam(user.id);
  const clients = await getClients(team.id);

  return json({user, clients});
}

export default function Clients() {
  const navigate = useNavigate();
  const {user, clients} = useLoaderData<typeof loader>();

  return (
    <PageContainer user={user}>
      <MasterDetail>
        <MasterDetail.Master>
          <MasterDetail.Master.Header>
            <h2>All clients</h2>
            <Button variant="ghost" size="icon" onClick={() => navigate("new")}>
              <Plus />
            </Button>
          </MasterDetail.Master.Header>
          <MasterDetail.MasterList>
            {clients.map((client) => (
              <NavLink to={client.id} key={client.id}>
                {({isActive}) => (
                  <MasterDetail.MasterListItem highlight={isActive}>
                    <MasterDetail.MasterListItem.Heading>
                      {client.name}
                    </MasterDetail.MasterListItem.Heading>
                    <MasterDetail.MasterListItem.Description
                      highlight={isActive}
                    >
                      <span />
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
