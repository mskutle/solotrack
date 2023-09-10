import type { SerializeFrom } from "@remix-run/node";
import type { ProjectList } from "~/db/get-project-list";
import { PDFViewer } from "@react-pdf/renderer";
import { ClientOnly } from "remix-utils";
import { CurriculumVitae } from "./Cv";

type Props = {
  cv: {
    projects: SerializeFrom<ProjectList>;
  };
};

export function CvPreview(props: Props) {
  return (
    <ClientOnly fallback="Loading...">
      {() => (
        <PDFViewer className="w-full h-full" showToolbar={false}>
          <CurriculumVitae cv={props.cv} />
        </PDFViewer>
      )}
    </ClientOnly>
  );
}
