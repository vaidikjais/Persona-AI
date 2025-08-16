'use client';

import React, { use, useEffect, useRef, useState } from 'react';
import { personas } from '@/lib/config/personas';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, LoaderCircle, Copy } from 'lucide-react';
import { ChatHeader } from '@/components/chat-header';
import { nanoid } from 'nanoid';

// New imports for Markdown and Syntax Highlighting
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';


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


// A new helper component to render styled code blocks
function MarkdownCodeBlock({ inline, className, children }) {
  const [isCopied, setIsCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || '');
  const codeString = String(children).replace(/\n$/, '');

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return !inline && match ? (
    <div className="relative my-2 bg-[#282c34] rounded-md not-prose">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-700/80 rounded-t-md">
        <span className="text-xs text-gray-300">{match[1]}</span>
        <button onClick={handleCopy} className="inline-flex items-center gap-1.5 text-xs text-gray-300 hover:text-white">
          {isCopied ? <><Copy className="h-3 w-3" /> Copied!</> : <><Copy className="h-3 w-3" /> Copy code</>}
        </button>
      </div>
      <SyntaxHighlighter
        style={atomOneDark}
        language={match[1]}
        PreTag="div"
        customStyle={{ margin: 0, padding: '1rem', background: 'transparent' }}
        codeTagProps={{ style: { background: 'transparent' } }}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  ) : (
    <code className="text-sm bg-muted/50 text-foreground rounded-sm px-1 py-0.5">{children}</code>
  );
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

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: newMessages,
        personaId: persona.id,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = { id: nanoid(), role: 'assistant', content: errorData.error || "Sorry, an unexpected error occurred." };
      setMessages(prev => [...prev, errorMessage]);
      setIsLoading(false);
      return;
    }
    
    const responseText = await response.text();
    const assistantResponse = { id: nanoid(), role: 'assistant', content: responseText };
    setMessages(prev => [...prev, assistantResponse]);
    
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
                    <div className="prose prose-sm dark:prose-invert max-w-none"> 
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        code: MarkdownCodeBlock,
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                    </div>
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