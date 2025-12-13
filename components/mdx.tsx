/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import { highlight } from "sugar-high";
import remarkGfm from "remark-gfm";
import { Pre } from "./mdx-pre";

const options = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
};

function Blockquote(props: any) {
  return (
    <blockquote
      className="bg-gray-100 dark:bg-neutral-800/30 border-l-2 border-gray-300 dark:border-neutral-600 pl-4 py-2 my-4 italic text-gray-700 dark:text-neutral-300"
      {...props}
    />
  );
}

function Code({ children, ...props }: any) {
  const codeHTML = highlight(children);

  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

function CustomLink(props: any) {
  const href = props.href;
  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props} className="text-gray-700 dark:text-stone-300 underline decoration-gray-500 dark:decoration-stone-400 decoration-[0.5px] underline-offset-4 transition-colors hover:text-gray-900 dark:hover:text-stone-200 hover:decoration-gray-700 dark:hover:decoration-stone-200">
        {props.children}
      </Link>
    );
  }
  if (href.startsWith("#")) {
    return <a {...props} className="text-gray-700 dark:text-stone-300 underline decoration-gray-500 dark:decoration-stone-400 decoration-[0.5px] underline-offset-4 transition-colors hover:text-gray-900 dark:hover:text-stone-200 hover:decoration-gray-700 dark:hover:decoration-stone-200" />;
  }
  return <a target="_blank" rel="noopener noreferrer" {...props} className="text-gray-700 dark:text-stone-300 underline decoration-gray-500 dark:decoration-stone-400 decoration-[0.5px] underline-offset-4 transition-colors hover:text-gray-900 dark:hover:text-stone-200 hover:decoration-gray-700 dark:hover:decoration-stone-200" />;
}

function RoundedImage(props: any) {
  const {
    src,
    alt,
    title,
    width,
    height,
    className = "",
    ...rest
  } = props;

  // Check if it's an external URL or starts with /
  const isExternal = src?.startsWith('http://') || src?.startsWith('https://');
  const isLocal = src?.startsWith('/');

  // Determine image size/style from className or props
  const isFullWidth = className.includes('full-width') || props.fullWidth;
  const isSmall = className.includes('small') || props.small;
  const hasCaption = title;

  // Container classes
  const containerClasses = `my-6 ${isFullWidth
    ? 'w-full'
    : isSmall
      ? 'max-w-md mx-auto'
      : 'max-w-2xl mx-auto'
    }`;

  // Image wrapper classes
  const wrapperClasses = `relative rounded-lg overflow-hidden border border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-900/50 ${isFullWidth ? '' : 'shadow-sm'
    }`;

  // Handle external images
  if (isExternal) {
    return (
      <figure className={containerClasses}>
        <div className={wrapperClasses}>
          <img
            src={src}
            alt={alt || ''}
            className="w-full h-auto rounded-lg"
            loading="lazy"
            {...rest}
          />
        </div>
        {hasCaption && (
          <figcaption className="text-center text-sm text-gray-600 dark:text-neutral-400 mt-2 italic">
            {title}
          </figcaption>
        )}
      </figure>
    );
  }

  // Handle local images (from public folder or relative paths)
  // For Next.js Image, we need width and height, or use unoptimized for dynamic sizes
  const imageWidth = width || (isFullWidth ? 1200 : isSmall ? 600 : 800);
  const imageHeight = height || (isFullWidth ? 600 : isSmall ? 400 : 500);

  // If width/height not provided and it's a local image, use unoptimized
  if (isLocal && !width && !height) {
    return (
      <figure className={containerClasses}>
        <div className={wrapperClasses}>
          <Image
            src={src}
            alt={alt || ''}
            width={imageWidth}
            height={imageHeight}
            className="w-full h-auto rounded-lg"
            loading="lazy"
            unoptimized
            {...rest}
          />
        </div>
        {hasCaption && (
          <figcaption className="text-center text-sm text-gray-600 dark:text-neutral-400 mt-2 italic">
            {title}
          </figcaption>
        )}
      </figure>
    );
  }

  return (
    <figure className={containerClasses}>
      <div className={wrapperClasses}>
        <Image
          src={src}
          alt={alt || ''}
          width={imageWidth}
          height={imageHeight}
          className="w-full h-auto rounded-lg"
          loading="lazy"
          {...rest}
        />
      </div>
      {hasCaption && (
        <figcaption className="text-center text-sm text-gray-600 dark:text-neutral-400 mt-2 italic">
          {title}
        </figcaption>
      )}
    </figure>
  );
}

function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with and
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function createHeading(level: number) {
  const Heading = ({ children }: any) => {
    const slug = slugify(children);
    const className = level === 1
      ? "text-gray-900 dark:text-neutral-100 text-xl font-medium mt-8 mb-4"
      : level === 2
        ? "text-gray-900 dark:text-neutral-100 text-lg font-medium mt-6 mb-3"
        : "text-gray-900 dark:text-neutral-100 font-medium mt-4 mb-2";

    return React.createElement(
      `h${level}`,
      { id: slug, className },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
        }),
      ],
      children
    );
  };
  Heading.displayName = `Heading${level}`;
  return Heading;
}

function Paragraph({ children, ...props }: any) {
  return (
    <p className="text-gray-800 dark:text-neutral-400 my-4 leading-relaxed prose-paragraph" {...props}>
      {children}
    </p>
  );
}

function List({ children, ...props }: any) {
  return (
    <ul className="text-gray-800 dark:text-neutral-400 my-4 ml-6 list-disc space-y-1" {...props}>
      {children}
    </ul>
  );
}

function OrderedList({ children, ...props }: any) {
  return (
    <ol className="text-gray-800 dark:text-neutral-400 my-4 ml-6 list-decimal space-y-1" {...props}>
      {children}
    </ol>
  );
}

function ListItem({ children, ...props }: any) {
  return (
    <li className="text-gray-800 dark:text-neutral-400" {...props}>
      {children}
    </li>
  );
}

function Strong({ children, ...props }: any) {
  return (
    <strong className="text-gray-900 dark:text-neutral-200 font-medium" {...props}>
      {children}
    </strong>
  );
}

function Table({ children, ...props }: any) {
  return (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700" {...props}>
        {children}
      </table>
    </div>
  );
}

function TableHead({ children, ...props }: any) {
  return (
    <thead className="bg-gray-50 dark:bg-neutral-800" {...props}>
      {children}
    </thead>
  );
}

function TableBody({ children, ...props }: any) {
  return (
    <tbody className="divide-y divide-gray-200 dark:divide-neutral-700" {...props}>
      {children}
    </tbody>
  );
}

function TableRow({ children, ...props }: any) {
  return <tr className="hover:bg-gray-50 dark:hover:bg-neutral-800/50" {...props}>{children}</tr>;
}

function TableHeader({ children, ...props }: any) {
  return (
    <th
      className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-neutral-300 uppercase tracking-wider"
      {...props}
    >
      {children}
    </th>
  );
}

function TableCell({ children, ...props }: any) {
  return (
    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-neutral-400" {...props}>
      {children}
    </td>
  );
}

const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  p: Paragraph,
  ul: List,
  ol: OrderedList,
  li: ListItem,
  strong: Strong,
  img: RoundedImage,
  a: CustomLink,
  code: Code,
  pre: Pre,
  blockquote: Blockquote,
  table: Table,
  thead: TableHead,
  tbody: TableBody,
  tr: TableRow,
  th: TableHeader,
  td: TableCell,
};

export function CustomMDX(props: any) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
      options={options}
    />
  );
}