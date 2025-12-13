import { ArrowRightIcon } from "lucide-react"
import Anchor from "./Anchor"

interface HeaderProps {
  name: string
  location: string
}

export default function Header({ name, location }: HeaderProps) {
  return (
    <header className="mb-6">
      <div className="flex items-center justify-between">
        <h1 className='text-xl font-serif font-medium text-gray-900 dark:text-stone-100 [font-feature-setting:"kern","calt","case"]'>
          {name}
        </h1>
        <Anchor href="/resume" className="text-gray-900 dark:text-stone-100 font-serif flex items-center gap-1">
          resume 
          <ArrowRightIcon className="w-4 h-4 text-gray-900 dark:text-stone-100" />
        </Anchor>
      </div>
      <p className="text-gray-500 dark:text-neutral-500 mt-1">{location}</p>
    </header>
  )
} 