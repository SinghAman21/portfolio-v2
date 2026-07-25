import Link from 'next/link';
import CornerMarkers from '@/components/CornerMarkers';
import { ShoppingBag, Container, Activity, type LucideIcon } from 'lucide-react';

// Per-series icons: commerce, containers/Kubernetes, monitoring pulse.
const ICONS: Record<string, LucideIcon> = {
  shopify: ShoppingBag,
  devops: Container,
  monitoring: Activity,
};

interface Props {
  slug: string;
  name: string;
  count: number;
  href: string;
}

export default function BlogFolderItem({ slug, name, count, href }: Props) {
  const Icon = ICONS[slug] ?? ShoppingBag;

  return (
    <div className="py-2 text-gray-700 dark:text-neutral-300">
      <Link
        href={href}
        className="group relative flex items-center justify-between gap-2 transition-all duration-300 ease-out hover:translate-x-[-2px]"
      >
        <CornerMarkers />
        <span className="flex grow items-center gap-2">
          <Icon
            strokeWidth={1.75}
            className="h-4 w-4 shrink-0 text-gray-500 transition-colors group-hover:text-gray-700 dark:text-neutral-400 dark:group-hover:text-neutral-200"
          />
          <h3 className="font-medium text-gray-800 transition-colors group-hover:text-gray-900 dark:text-neutral-200 dark:group-hover:text-neutral-100">
            {name}
          </h3>
        </span>

        <span className="whitespace-nowrap text-sm text-gray-600 dark:text-neutral-400">
          {count} {count === 1 ? 'post' : 'posts'}
        </span>
      </Link>
    </div>
  );
}
