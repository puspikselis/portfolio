import Link from 'next/link';

import { ArrowTopRightCircle } from '@/components/icons/arrow-top-right-circle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-1 flex items-center justify-between px-12 py-8">
      <Link className="flex gap-3 transition-opacity duration-200 ease-in-out hover:opacity-80" href="/">
        <Avatar className="size-9 rounded-[0.75rem]">
          <AvatarImage alt="Kristaps Krūze" className="rounded-none" src="/images/KK.avif" />
          <AvatarFallback>KK</AvatarFallback>
        </Avatar>
        <div className="flex flex-col-reverse justify-center gap-1">
          <h1 className="font-semibold text-13/4 text-white">Kristaps Krūze</h1>
          <h2 className="-tracking-[0.03em] font-medium text-12/4 text-dim-gray-100">Designer</h2>
        </div>
      </Link>
      <div className="flex items-center gap-5">
        <Button
          asChild
          className="h-9 bg-transparent font-semibold text-12 text-nobel-100 hover:bg-transparent"
        >
          <a
            className="group flex items-center gap-2 hover:text-white [&_svg_path:first-of-type]:group-hover:fill-white [&_svg_path:last-of-type]:group-hover:stroke-black [&_svg_path]:transition-all [&_svg_path]:duration-200 [&_svg_path]:ease-in-out"
            href="https://www.linkedin.com/in/kristapskruze/"
            rel="noopener noreferrer"
            target="_blank"
          >
            LinkedIn
            <ArrowTopRightCircle />
          </a>
        </Button>
        <Button
          asChild
          className="inset-shadow-0-1-0 inset-shadow-white/8 h-9 gap-2 rounded-full bg-nero-100 px-5 font-semibold text-12 text-white hover:bg-nero-200"
        >
          <a href="mailto:kristaps@kruze.lv">
            <span className="size-1 rounded-full bg-lime-green-100" />
            Contact
          </a>
        </Button>
      </div>
    </header>
  );
}
