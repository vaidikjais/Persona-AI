import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle'; // 1. Import ThemeToggle

export function ChatHeader({ persona }) {
  return (
    <header className="relative z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Left side of header remains the same */}
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="icon">
            <Link href="/">
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <Image
            src={persona.avatar}
            alt={`${persona.name}'s avatar`}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="flex flex-col">
            <h2 className="font-bold text-base">{persona.name}</h2>
            <p className="text-xs text-muted-foreground">Friendly, step-by-step, and example-driven</p>
          </div>
        </div>
        
        {/* 2. Update the right side of the header */}
        <div className="ml-auto flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <div className="relative flex h-2 w-2 rounded-full bg-green-500"></div>
            <span className="text-sm font-medium text-muted-foreground">Online</span>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}