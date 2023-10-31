import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { Plus } from "lucide-react";
import { Button } from "~/@/components/ui/button";
import { ensureAuthenticated } from "~/auth/helpers";
import { MasterDetail } from "~/layouts/MasterDetail";
import { PageContainer } from "~/layouts/PageContainer";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await ensureAuthenticated(request);
  const cvs = [{ id: "1", name: "Frontend focused", lang: "nb" }];

  return json({ user, cvs });
}

export default function Cv() {
  const { user, cvs } = useLoaderData<typeof loader>();
  return (
    <PageContainer user={user}>
      <MasterDetail>
        <MasterDetail.Master>
          <MasterDetail.MasterHeader>
            <h2>All projects</h2>
            <Button asChild variant="ghost" size="icon">
              <Link to="new">
                <Plus />
              </Link>
            </Button>
          </MasterDetail.MasterHeader>
          <MasterDetail.MasterList>
            {cvs.map((cv) => (
              <NavLink to={cv.id} key={cv.id}>
                {({ isActive }) => (
                  <MasterDetail.MasterListItem highlight={isActive}>
                    <MasterDetail.MasterListItem.Heading>
                      {cv.name}
                    </MasterDetail.MasterListItem.Heading>
                    <MasterDetail.MasterListItem.Description
                      highlight={isActive}
                    >
                      {null}
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
