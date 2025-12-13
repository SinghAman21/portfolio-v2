import { readFile } from "fs/promises";
import { join } from "path";

/**
 * Converts PascalCase component name to kebab-case filename
 * @example "AnimatedCounter" -> "animated-counter"
 */
export function getComponentFileName(componentName: string): string {
  return componentName
    .replace(/([A-Z])/g, "-$1")
    .toLowerCase()
    .slice(1); // Remove leading dash
}

/**
 * Reads the source code of a component file from the experiments directory
 * @param componentName - PascalCase component name (e.g., "AnimatedCounter")
 * @returns The component source code as a string
 */
export async function readComponentCode(componentName: string): Promise<string> {
  try {
    const fileName = getComponentFileName(componentName);
    const componentPath = join(
      process.cwd(),
      "components",
      "experiments",
      `${fileName}.tsx`
    );
    const code = await readFile(componentPath, "utf-8");
    return code;
  } catch (error) {
    console.error(`Failed to read component file for ${componentName}:`, error);
    return `// Component code not found for ${componentName}\n// Please ensure the component file exists at: components/experiments/${getComponentFileName(componentName)}.tsx`;
  }
}

