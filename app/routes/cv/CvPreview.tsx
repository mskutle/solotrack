import type {SerializeFrom} from "@remix-run/node";
import {PDFViewer} from "@react-pdf/renderer";
import {ClientOnly} from "remix-utils";
import {CurriculumVitae} from "./CurriculumVitae";
import type {ProjectList} from "~/db/get-project-list";

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
