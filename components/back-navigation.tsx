import { Undo2 } from 'lucide-react';
import Link, { LinkProps } from 'next/link';
import { PropsWithChildren } from 'react';

export default function BackNavigation({ children, ...props }: PropsWithChildren<LinkProps>) {
  return (
    <Link
      {...props}
      className="flex items-center gap-2 text-[13px] text-gray-600 dark:text-neutral-500 italic">
      <Undo2 width={13} height={13} className="mb-[2px]" />
      {children}
    </Link>
  );
}