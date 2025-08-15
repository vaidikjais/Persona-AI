import { Header } from '@/components/header';
import { PersonaProfile } from '@/components/persona-profile';
import { personas } from '@/lib/config/personas';

export default function Home() {
  const personaList = Object.values(personas);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16 sm:py-24">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
              Chat with Expert AI Personas
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mt-4">
              Pick a persona, ask questions, and get instant guidance from their unique perspective.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {personaList.map((persona, index) => (
              <PersonaProfile key={persona.id} persona={persona} index={index} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}