import type { DashboardMetrics } from "~/db/get-dashboard-metrics";
import { Metric } from "./Metric";

type Props = {
  metrics: DashboardMetrics;
};

export function Metrics(props: Props) {
  return (
    <div className="shadow-sm p-4 border rounded-md grid gap-4 grid-cols-2 md:grid-cols-4">
      <Metric variant="purple">
        <Metric.Value>{props.metrics.clientsCount}</Metric.Value>
        <Metric.Title>Clients</Metric.Title>
      </Metric>
      <Metric variant="blue">
        <Metric.Value>{props.metrics.projectsCount}</Metric.Value>
        <Metric.Title>Total number of projects</Metric.Title>
      </Metric>
      <Metric variant="yellow">
        <Metric.Value>{props.metrics.ongoingProjectsCount}</Metric.Value>
        <Metric.Title>Ongoing projects</Metric.Title>
      </Metric>
      <Metric variant="green">
        <Metric.Value>{props.metrics.completedProjectsCount}</Metric.Value>
        <Metric.Title>Completed projects</Metric.Title>
      </Metric>
    </div>
  );
}
