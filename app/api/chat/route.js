import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';
import { personas } from '@/lib/config/personas';

export const runtime = 'edge';

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

export async function POST(req) {
  try {
    const { messages, personaId } = await req.json();
    const persona = personas[personaId];

    if (!persona) {
      return new Response("Persona not found", { status: 404 });
    }

    const fullSystemPrompt = [
      persona.system_instruction,
      "\n\n--- EXAMPLES ---",
      ...(persona.training_examples?.map(ex => 
        `\nUser: ${ex.user_input}\nAssistant: ${ex.expected_response}`
      ) || [])
    ].join('\n');

    const result = await generateText({
      model: google('models/gemini-1.5-flash-latest'), 
      system: fullSystemPrompt,
      messages,
    });

    return new Response(result.text, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });

  } catch (error) {
    console.error("Gemini API Error:", error);
    return new Response(
      JSON.stringify({ 
        error: "The free service is currently unavailable. Please use your own API key." 
      }), 
      { 
        status: 503,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}