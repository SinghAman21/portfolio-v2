import PageHeader from "@/components/PageHeader";
import ReachSection from "@/components/ReachSection";

export default function ReachPage() {
  return (
    <main className="mb-32 text-gray-700 dark:text-neutral-400">
      <PageHeader
        backHref="/"
        title="reach"
        description="Connect with me across the web or send a direct email for software engineering, backend, infrastructure, and full-stack work."
      />
      <ReachSection animationDelay="0.15s" showTitle={false} />
    </main>
  );
}
