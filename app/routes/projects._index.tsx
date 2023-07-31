import { Link } from "@remix-run/react";
import { Plus } from "lucide-react";
import { Button } from "~/@/components/ui/button";

export default function DefaultProjectDetails() {
  return (
    <div className="grid place-items-center h-full">
      <div className="flex flex-col items-center gap-2">
        <p>Select a project from the list, or</p>
        <Button variant="outline" className="flex items-center gap-2" asChild>
          <Link to="new">
            <Plus />
            <span>Create a new project</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
