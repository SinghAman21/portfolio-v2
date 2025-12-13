import ExperimentItem from "@/components/experiments/experiment-item";
import PageHeader from "@/components/PageHeader";
import AnimatedListItem from "@/components/AnimatedListItem";
import { experiments } from "@/lib/experiments-data";

export default function ExperimentsPage() {
  return (
    <main className="mb-32 text-gray-700 dark:text-neutral-400">
      <PageHeader
        backHref="/"
        title="experiments"
        description="Interactive components and UI experiments. Click to explore the code and see them in action."
      />
      <div>
        {experiments.map((experiment, index) => (
          <AnimatedListItem key={experiment.slug} index={index}>
            <ExperimentItem
              slug={experiment.slug}
              title={experiment.title}
              description={experiment.description}
              year={experiment.year}
            />
          </AnimatedListItem>
        ))}
      </div>
    </main>
  );
}

