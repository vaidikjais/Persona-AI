"use client"

import React from 'react'
import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'
import { Twitter, Linkedin } from 'lucide-react'
import { Button } from './ui/button'
import { SettingsModal } from './settings-modal'

export function Header() {
  return (
    // ADD THE BACKGROUND AND BLUR CLASSES HERE 👇
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Link href="https://x.com/vaidikjais" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Button>
          </Link>
          <Link href="https://www.linkedin.com/in/vaidik-jaiswal/

" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Button>
          </Link>
          <ThemeToggle />
          <SettingsModal/>
        </div>
      </div>
    </header>
  )
}