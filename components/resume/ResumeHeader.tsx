import Link from "next/link";
import { GithubIcon, GlobeIcon, LinkedinIcon } from "lucide-react";
import Image from "next/image";
import PeerlistIcon from "@/public/Peerlist.svg";

export default function ResumeHeader() {
  return (
    <header className="text-center animate-[slideFadeUp_0.4s_ease-out]">
      <h1 className="text-3xl font-serif font-medium text-gray-900 dark:text-stone-100 mb-4">
        Aman Singh
      </h1>
      <div className="space-y-2 text-gray-600 dark:text-neutral-400">
        <p>
          Hyderabad |{" "}

          <Link
            href="mailto:useraman21@gmail.com"
            className="text-gray-700 dark:text-stone-300 underline decoration-gray-500 dark:decoration-stone-400 decoration-[0.5px] underline-offset-4 transition-colors hover:text-gray-900 dark:hover:text-stone-200"
          >
            useraman21@gmail.com
          </Link>
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <span>
            <Link
              href="https://github.com/SinghAman21"
              target="_blank"
              className="text-gray-700 dark:text-stone-300 underline decoration-gray-500 dark:decoration-stone-400 decoration-[0.5px] underline-offset-4 transition-colors hover:text-gray-900 dark:hover:text-stone-200 flex items-center gap-1"
            >
              <GithubIcon className="w-4 h-4" />
              Github
            </Link>
          </span>
          <span>
            <Link
              href="https://avikmukherjee.me"
              target="_blank"
              className="text-gray-700 dark:text-stone-300 underline decoration-gray-500 dark:decoration-stone-400 decoration-[0.5px] underline-offset-4 transition-colors hover:text-gray-900 dark:hover:text-stone-200 flex items-center gap-1"
            >
              <GlobeIcon className="w-4 h-4" />
              Portfolio
            </Link>
          </span>
          <span>
            <Link
              href="https://www.linkedin.com/in/avik-mukherjee-8ab9911bb/"
              target="_blank"
              className="text-gray-700 dark:text-stone-300 underline decoration-gray-500 dark:decoration-stone-400 decoration-[0.5px] underline-offset-4 transition-colors hover:text-gray-900 dark:hover:text-stone-200 flex items-center gap-1"
            >
              <LinkedinIcon className="w-4 h-4" />
              Linkedin
            </Link>
          </span>
          <span>
            <Link
              href="https://peerlist.io/avikmukherjee/"
              target="_blank"
              className="text-gray-700 dark:text-stone-300 underline decoration-gray-500 dark:decoration-stone-400 decoration-[0.5px] underline-offset-4 transition-colors hover:text-gray-900 dark:hover:text-stone-200 flex items-center gap-1"
            >
              <Image
                src={PeerlistIcon}
                alt="Peerlist"
                className="w-4 h-4"
              />
              Peerlist
            </Link>
          </span>
        </div>
      </div>
    </header>
  );
}
