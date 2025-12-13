import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getExperimentBySlug, getAllExperimentSlugs } from "./experiments-data";
import { readComponentCode } from "./read-component";
import { generateMDX } from "./generate-mdx";

const experimentsDirectory = path.join(process.cwd(), "content/experiments");

export type ExperimentMDX = {
  slug: string;
  title: string;
  description: string;
  year: string;
  content: string;
};

// Ensure experiments directory exists
function ensureExperimentsDirectory() {
  if (!fs.existsSync(experimentsDirectory)) {
    fs.mkdirSync(experimentsDirectory, { recursive: true });
  }
}

// Generate MDX file for an experiment if it doesn't exist
async function generateExperimentMDXFile(slug: string): Promise<void> {
  ensureExperimentsDirectory();

  const experiment = getExperimentBySlug(slug);
  if (!experiment) {
    throw new Error(`Experiment not found: ${slug}`);
  }

  const filePath = path.join(experimentsDirectory, `${slug}.md`);

  // Only generate if file doesn't exist
  if (fs.existsSync(filePath)) {
    return;
  }

  const componentCode = await readComponentCode(experiment.component);
  const mdxContent = generateMDX(experiment, componentCode, experiment.usage);

  fs.writeFileSync(filePath, mdxContent, "utf-8");
}

// Generate all experiment MDX files
export async function generateAllExperimentMDXFiles(): Promise<void> {
  const slugs = getAllExperimentSlugs();
  await Promise.all(slugs.map((slug) => generateExperimentMDXFile(slug)));
}

// Get all experiment MDX files
export async function getAllExperimentMDX(): Promise<ExperimentMDX[]> {
  ensureExperimentsDirectory();

  // Generate files if they don't exist
  await generateAllExperimentMDXFiles();

  const slugs = getAllExperimentSlugs();
  const experiments = await Promise.all(
    slugs.map(async (slug) => {
      const filePath = path.join(experimentsDirectory, `${slug}.md`);
      if (!fs.existsSync(filePath)) {
        await generateExperimentMDXFile(slug);
      }

      const fileContents = fs.readFileSync(filePath, "utf8");
      const matterResult = matter(fileContents);
      const experiment = getExperimentBySlug(slug);

      return {
        slug,
        title: matterResult.data.title || experiment?.title || "",
        description: matterResult.data.description || experiment?.description || "",
        year: matterResult.data.year || experiment?.year || "",
        content: matterResult.content,
      };
    })
  );

  return experiments;
}

// Get experiment MDX by slug
export async function getExperimentMDXBySlug(slug: string): Promise<ExperimentMDX | null> {
  try {
    ensureExperimentsDirectory();

    const filePath = path.join(experimentsDirectory, `${slug}.md`);

    // Generate file if it doesn't exist
    if (!fs.existsSync(filePath)) {
      await generateExperimentMDXFile(slug);
    }

    const fileContents = fs.readFileSync(filePath, "utf8");
    const matterResult = matter(fileContents);
    const experiment = getExperimentBySlug(slug);

    if (!experiment) {
      return null;
    }

    return {
      slug,
      title: matterResult.data.title || experiment.title,
      description: matterResult.data.description || experiment.description,
      year: matterResult.data.year || experiment.year,
      content: matterResult.content,
    };
  } catch (error) {
    console.error("Error getting experiment MDX by slug:", error);
    return null;
  }
}

