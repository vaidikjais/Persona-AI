'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Settings } from 'lucide-react';

export function SettingsModal() {
  // 1. Add state to control the dialog's open status
  const [open, setOpen] = useState(false); 
  
  const [apiKey, setApiKey] = useState('');
  const [apiKeyOption, setApiKeyOption] = useState('free');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const storedApiKey = localStorage.getItem('user_api_key') || '';
    const storedOption = localStorage.getItem('api_key_option') || 'free';
    setApiKey(storedApiKey);
    setApiKeyOption(storedOption);
  }, []);

  const handleSave = () => {
    localStorage.setItem('user_api_key', apiKey);
    localStorage.setItem('api_key_option', apiKeyOption);
    // 3. Close the dialog by updating the state
    setOpen(false); 
  };

  if (!isClient) {
    return null;
  }

  return (
    // 2. Control the Dialog component with our state
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
          <span className="sr-only">Settings</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>API Key Settings</DialogTitle>
          <DialogDescription>
            Choose how to connect to the AI. Your personal key is stored only in your browser.
          </DialogDescription>
        </DialogHeader>
        
        <RadioGroup value={apiKeyOption} onValueChange={setApiKeyOption} className="my-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="free" id="r1" />
            <Label htmlFor="r1">Use Free API Key (Server-side)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="my_key" id="r2" />
            <Label htmlFor="r2">Use My Own API Key (Client-side)</Label>
          </div>
        </RadioGroup>

        {apiKeyOption === 'my_key' && (
          <div className="grid gap-2">
            <Label htmlFor="api-key-input">Your Google AI API Key</Label>
            <Input
              id="api-key-input"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your API key here"
            />
          </div>
        )}
        
        <DialogFooter>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}