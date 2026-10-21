import { ArrowRightIcon } from "lucide-react"
import Anchor from "./Anchor"
import CornerMarkers from "./CornerMarkers"

interface HeaderProps {
  name: string
  location: string
  showResume?: boolean
}

export default function Header({ name, location, showResume = true }: HeaderProps) {
  return (
    <header className="mb-6">
      <div className="flex items-center justify-between">
        <h1 className='text-xl font-serif font-medium text-gray-900 dark:text-stone-100 [font-feature-setting:"kern","calt","case"]'>
          {name}
        </h1>
        {showResume && (
          <Anchor href="/resume" className="group relative text-gray-900 dark:text-stone-100 font-serif flex items-center gap-1">
            <CornerMarkers />
            resume
            <ArrowRightIcon className="w-4 h-4 text-gray-900 dark:text-stone-100" />
          </Anchor>
        )}
      </div>
      <p className="text-gray-500 dark:text-neutral-500 mt-1">{location}</p>
    </header>
  )
} 