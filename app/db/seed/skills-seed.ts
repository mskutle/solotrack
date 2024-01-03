import {prisma} from "../prisma-client";
import {v4 as uuid} from "uuid";

export async function seedSkills() {
  await prisma.skill.createMany({
    data: [
      "React",
      "Node.js",
      "Express.js",
      "C#",
      ".NET",
      "ASP.NET",
      "SQL",
      "CSS",
      "Styled Components",
      "Tailwind CSS",
      "MySQL",
      "PostgreSQL",
      "MSSQL",
      "Azure",
      "AWS",
      "Google Cloud Platform",
      "DevOps",
      "UX",
      "UX Design",
      "Design",
      "JavaScript",
      "TypeScript",
      "Redux",
      "WebSockets",
      "Golang",
      "Project Management",
      "Scrum",
      "Kanban",
      "Angular",
      "Vue",
      "Svelte",
      "Deno",
      "Microservices",
      "Docker",
      "Kubernetes",
    ].map((name) => ({id: name.toLowerCase(), name, projectId: null})),
  });
}
