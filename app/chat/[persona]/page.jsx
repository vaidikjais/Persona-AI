'use client';

// All necessary imports are included here
import React, { use, useEffect, useRef, useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { personas } from '@/lib/config/personas';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, LoaderCircle } from 'lucide-react';
import { ChatHeader } from '@/components/chat-header';
import { nanoid } from 'nanoid';

export default function ChatPage({ params }) {
  const persona = personas[use(params).persona];

  if (!persona) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoaderCircle className="h-8 w-8 animate-spin" />
      </div>
    );
  }
  return <ChatInterface persona={persona} />;
}

function ChatInterface({ persona }) {
  const chatContainerRef = useRef(null);
  const [messages, setMessages] = useState([
    { id: 'initial', role: 'assistant', content: `Hi! I'm ${persona.name}. How can I help you today?` },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input || !input.trim() || isLoading) return;

    setIsLoading(true);
    const userMessage = { id: nanoid(), role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');

    // Simplified logic: Always use the server API route
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: newMessages,
        personaId: persona.id,
      }),
    });

    if (!response.body) {
      // You can add an error message to the chat here
      setMessages(prev => [...prev, { id: nanoid(), role: 'assistant', content: 'Sorry, I could not get a response.' }]);
      setIsLoading(false);
      return;
    }
    
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let assistantResponse = { id: nanoid(), role: 'assistant', content: '' };
    setMessages(prev => [...prev, assistantResponse]);

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      assistantResponse.content += chunk;
      setMessages(prev => [...prev.slice(0, -1), { ...assistantResponse }]);
    }
    
    setIsLoading(false);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="relative flex flex-col h-screen overflow-hidden bg-background dark:bg-chat-gradient-dark">
      <ChatHeader persona={persona} />
      <main ref={chatContainerRef} className="flex-1 overflow-y-auto">
        <div className="w-full max-w-3xl mx-auto p-4">
          <div className="space-y-6">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <Avatar className="w-9 h-9">
                  <AvatarImage src={msg.role === 'assistant' ? persona.avatar : ''} />
                  <AvatarFallback>{msg.role === 'user' ? 'U' : persona.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <div className={`max-w-md p-3 rounded-lg border ${msg.role === 'user' ? 'bg-primary/90 text-primary-foreground' : 'dark:bg-slate-800/60 dark:border-slate-700 bg-card/80 backdrop-blur-sm'}`}>
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3">
                <Avatar className="w-9 h-9"><AvatarImage src={persona.avatar} /><AvatarFallback>{persona.name.charAt(0)}</AvatarFallback></Avatar>
                <div className="flex items-center justify-center max-w-md p-3 rounded-lg border dark:bg-slate-800/60 dark:border-slate-700 bg-card/80 backdrop-blur-sm">
                  <LoaderCircle className="h-5 w-5 animate-spin" />
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <footer className="relative z-10 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-slate-700/50">
        <div className="w-full max-w-3xl mx-auto p-4">
          <form onSubmit={handleSubmit} className="relative">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Message ${persona.name}...`}
              className="h-12 rounded-full pr-14 border dark:bg-slate-800/60 dark:border-slate-700 bg-card/80 backdrop-blur-sm"
            />
            <Button type="submit" size="icon" className="absolute top-1/2 -translate-y-1/2 right-2 rounded-full bg-primary/90 hover:bg-primary" disabled={!input || isLoading}>
              {isLoading ? <LoaderCircle className="h-5 w-5 animate-spin" /> : <Send className="w-5" />}
            </Button>
          </form>
        </div>
      </footer>
    </div>
  );
}