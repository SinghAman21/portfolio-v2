import { cn } from "@/lib/utils"
import Link from "next/link"
import CornerMarkers from "@/components/CornerMarkers"

interface ExperienceItemProps {
  title: string
  year: string
  company: string
  description: string[]
  companySite: string
}

export default function ExperienceItem({ title, year, company, description, companySite }: ExperienceItemProps) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-start mb-1">
        <div
          className={cn(
            'group flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 w-full',
            'hover:outline-[0.5px] outline-offset-[6px] hover:outline-gray-400/50 dark:hover:outline-neutral-600/50 hover:[&>h3]:text-gray-900 dark:hover:[&>h3]:text-white hover:[&>span]:text-gray-900 dark:hover:[&>span]:text-white border-0',
            'relative'
          )}
        >
          <CornerMarkers />
          <h3 className="grow font-medium text-gray-800 dark:text-neutral-200 underline decoration-gray-400 dark:decoration-neutral-400/50 underline-offset-[3px] transition-colors">
            <Link href={companySite} target="_blank" rel="noopener noreferrer">
              {title} @{company}
            </Link>
          </h3>

          <span className="text-gray-600 dark:text-neutral-500 text-sm shrink-0">{year}</span>
        </div>
      </div>

      <div className="text-gray-600 dark:text-neutral-400 mb-2 space-y-1">
        {description.map((desc, index) => (
          <p key={index} className="text-sm">• {desc}</p>
        ))}
      </div>
    </div>
  )
} 