import { Link } from "@remix-run/react";
import { Plus } from "lucide-react";
import { Button } from "~/@/components/ui/button";
import { MainContent } from "~/layouts/MainContent";

export default function DefaultProjectDetails() {
  return (
    <MainContent>
      <div className="flex flex-col items-center gap-2">
        <p>Select a project from the list, or</p>
        <Button variant="outline" className="flex items-center gap-2" asChild>
          <Link to="new">
            <Plus />
            <span>Create a new project</span>
          </Link>
        </Button>
      </div>
    </MainContent>
  );
}
