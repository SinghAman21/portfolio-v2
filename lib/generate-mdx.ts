import type { Experiment } from "./experiments-data";

export function generateMDX(experiment: Experiment, componentCode: string, usage?: string): string {
  const featuresList = experiment.features?.map(f => `- ${f}`).join("\n") || "";
  const dependenciesList = experiment.dependencies?.join(", ") || "";

  return `---
title: "${experiment.title}"
description: "${experiment.description}"
year: "${experiment.year}"
---

# ${experiment.title}

${experiment.description}

${experiment.features && experiment.features.length > 0 ? `## Features\n\n${featuresList}\n` : ""}
${experiment.dependencies && experiment.dependencies.length > 0 ? `## Dependencies\n\n${dependenciesList}\n` : ""}
## Component Code

\`\`\`tsx
${componentCode}
\`\`\`

${usage ? `## Usage\n\n\`\`\`tsx\n${usage}\n\`\`\`\n` : ""}
`;
}
