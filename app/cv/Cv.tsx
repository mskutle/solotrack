import {
  Document,
  Font,
  Page,
  StyleSheet,
  View,
  Text,
  usePDF,
} from "@react-pdf/renderer";
import { Linkifyer } from "~/common/Linkifyer";
import type { Cv } from "~/routes/cv.new";

type Props = {
  cv: Cv;
};

Font.register({
  family: "Inter",
  src: "/fonts/inter/Inter-VariableFont.ttf",
});

const styles = StyleSheet.create({
  document: {
    border: "none",
  },
  page: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    gap: 16,
    paddingVertical: 32,
    fontFamily: "Inter",
  },
  header: {
    paddingBottom: 48,
    paddingTop: 16,
    paddingHorizontal: 32,
    borderBottom: "1px solid lightgray",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    flexGrow: 0,
  },
  title: {
    fontSize: 12,
    color: "gray",
    marginTop: 4,
  },
  sections: { gap: 16, padding: 32, fontSize: 14 },
  section: { flexDirection: "row" },
  sectionTitle: {
    flexBasis: "20%",
    flexGrow: 0,
  },
  sectionContent: { flex: 1 },
  projects: { gap: 16 },
  project: { gap: 4 },
  projectName: {
    textDecoration: "underline",
    fontWeight: "medium",
  },
  projectDescription: {},
});

export function CurriculumVitae(props: Props) {
  console.log(props.cv.projects.map((p) => p.name));

  return (
    <Document
      style={styles.document}
      onRender={(props) => {
        console.log("Rendering!");
      }}
    >
      <Page style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>Magne Skutle</Text>
          <Text style={styles.title}>Software Engineer</Text>
        </View>
        <View style={styles.sections}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Bio</Text>
            <Text style={styles.sectionContent}>This is the summary</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            <View style={styles.sectionContent}>
              <View style={styles.projects}>
                {props.cv.projects.map((project) => (
                  <View key={project.id} style={styles.project}>
                    <Text style={styles.projectName}>
                      {project.name} (
                      {new Intl.DateTimeFormat().format(
                        new Date(project.startedAt)
                      )}{" "}
                      -{" "}
                      {project.endedAt
                        ? new Intl.DateTimeFormat().format(
                            new Date(project.endedAt)
                          )
                        : null}
                      )
                    </Text>
                    <Text style={styles.projectDescription}>
                      <Linkifyer target="pdf">{project.description}</Linkifyer>
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
