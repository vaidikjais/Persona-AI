import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle, Users, Star } from 'lucide-react'
import { Button } from './ui/button'

export function PersonaProfile({ persona, index }) {
  const animationDelay = `${index * 150}ms`;

  return (
    <div 
      className="relative group animate-fade-in-up"
      style={{ animationDelay }}
    >
      {/* This div creates the blurred gradient glow in dark mode */}
      <div 
        className="absolute -inset-1 rounded-2xl bg-gradient-green dark:bg-gradient-glow 
                   opacity-0 blur-xl transition duration-300 group-hover:opacity-30 z-0"
      ></div>

      {/* This is the actual card content, which sits on top of the glow */}
      <div 
        className="relative flex flex-col h-full rounded-2xl p-6 shadow-lg
                   border bg-card/50 backdrop-blur-sm 
                   dark:bg-slate-900/80 z-10"
      >
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <Image
              src={persona.avatar}
              alt={`${persona.name}'s avatar`}
              width={60}
              height={60}
              className="rounded-full border-2 transition-transform duration-300 group-hover:scale-105"
            />
            <div>
              <h2 className="text-xl font-bold">{persona.name}</h2>
              <p className="text-sm text-muted-foreground">{persona.title}</p>
            </div>
          </div>
          <p className="text-xs text-foreground/70 mb-4">{persona.description}</p>
          <ul className="space-y-1.5 mb-5">
            {persona.tags.map((tag) => (
              <li key={tag} className="flex items-start text-xs">
                <CheckCircle className="h-3.5 w-3.5 mr-2 mt-0.5 text-primary flex-shrink-0" />
                <span>{tag}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="border-t border-slate-700/50 pt-4">
          <div className="flex justify-between items-center text-xs text-muted-foreground mb-4">
            {/* ... (stats content remains the same) ... */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5" />
                <span>{persona.stats.subscribers}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="h-3.5 w-3.5" />
                <span>{persona.stats.reviews} Reviews</span>
              </div>
            </div>
          </div>
          <Link href={`/chat/${persona.id}`} className="w-full">
            <Button 
              className="w-full text-lg py-6 transition-all duration-300 group-hover:-translate-y-1 
                         text-white bg-gradient-green 
                         dark:text-primary-foreground dark:bg-primary dark:bg-none"
            >
              Chat Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}