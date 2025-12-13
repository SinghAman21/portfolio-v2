"use client"
// create your own video and change the content 
// for now i will keep this aside
import { useState } from "react"
import { Play } from "lucide-react"
import CornerMarkers from "@/components/CornerMarkers"

export function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlay = () => {
    setIsPlaying(true)
  }

  return (
    <section className="mb-16 mt-12">
      <div className="relative">
        {!isPlaying ? (
          <article
            role="button"
            aria-label="Play video: Building Modern Web Applications"
            tabIndex={0}
            onClick={handlePlay}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                handlePlay()
              }
            }}
            className="group cursor-pointer select-none border border-gray-300 dark:border-gray-800 bg-white dark:bg-neutral-950 overflow-hidden transition-colors focus:outline-[0.5px] outline-offset-[6px] focus:outline-gray-400/50 dark:focus:outline-neutral-600/50 relative"
          >
            <CornerMarkers />

            {/* Thumbnail */}
            <div className="aspect-video bg-gray-100 dark:bg-neutral-900 flex items-center justify-center">
              <img
                src="https://img.youtube.com/vi/BvAWNrlYMJ4/mqdefault.jpg"
                alt="Building Modern Web Applications - thumbnail"
                className="w-full h-full object-cover opacity-85 group-hover:opacity-95 transition-opacity"
                width={320}
                height={180}
                loading="lazy"
                decoding="async"
              />

              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-full p-4 bg-black/10 dark:bg-white/5 group-hover:bg-black/20 dark:group-hover:bg-white/10 backdrop-blur-sm transition-colors border border-black/20 dark:border-white/10">
                  <Play className="w-8 h-8 text-gray-900 dark:text-neutral-100 ml-1" />
                </div>
              </div>
            </div>

          </article>
        ) : (
          <div className="aspect-video border border-gray-300 dark:border-gray-800 overflow-hidden">
            <iframe
              src="https://www.youtube.com/embed/BvAWNrlYMJ4?autoplay=1"
              title="Building Modern Web Applications"
              className="w-full h-full"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
        )}
      </div>
    </section>
  )
}
