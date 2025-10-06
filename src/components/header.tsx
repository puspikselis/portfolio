import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-1 flex items-center justify-between p-8">
      <Link className="flex gap-4" href="/">
        <Avatar className="size-9 rounded-[0.75rem]">
          <AvatarImage className="rounded-none" src="/images/KK.png" />
          <AvatarFallback>KK</AvatarFallback>
        </Avatar>
        <div className="flex flex-col-reverse justify-center gap-1">
          <h1 className="font-semibold text-13/4 text-white">Kristaps Krūze</h1>
          <h2 className="font-medium text-12/4 text-dim-gray-100">Designer</h2>
        </div>
      </Link>
      <Button className="inset-shadow-0-1-0 inset-shadow-white/4 h-9 rounded-full bg-nero-100 px-5 font-semibold text-12 text-white">
        Contact
      </Button>
    </header>
  );
}
