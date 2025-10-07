import Link from 'next/link';

// import { ArrowTopRightCircle } from '@/components/icons/arrow-top-right-circle';
import { SpotifyStatus } from '@/components/spotify-status';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="fixed inset-x-0 bottom-0 z-1 flex items-center justify-between bg-black p-5 md:sticky md:top-0 md:bg-transparent md:px-12 md:py-8">
      <div className="flex gap-3">
        <Link href="/">
          <Avatar className="size-9 rounded-[0.75rem] transition-opacity duration-200 ease-in-out hover:opacity-80">
            <AvatarImage alt="Kristaps Krūze" className="rounded-none" src="/images/KK.avif" />
            <AvatarFallback>KK</AvatarFallback>
          </Avatar>
        </Link>
        <div className="flex flex-col-reverse justify-center gap-0.5">
          <SpotifyStatus />
        </div>
      </div>
      <div className="flex items-center gap-5">
        <Button
          asChild
          className="h-9 bg-transparent font-semibold text-12 text-nobel-100 hover:bg-transparent"
        >
          <a
            className="flex items-center gap-2 hover:text-white"
            href="https://www.linkedin.com/in/kristapskruze/"
            rel="noopener noreferrer"
            target="_blank"
          >
            LinkedIn
            {/* <ArrowTopRightCircle /> */}
          </a>
        </Button>
        <Button
          asChild
          className="inset-shadow-0-1-0 inset-shadow-white/8 h-9 gap-2 rounded-full bg-nero-100 px-5 font-semibold text-12 text-white hover:bg-nero-200"
        >
          <a href="mailto:kristaps@kruze.lv">Contact</a>
        </Button>
      </div>
    </header>
  );
}
