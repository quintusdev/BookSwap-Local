'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLanguage } from '@/context/language-context';
import { cn } from '@/lib/utils';
import { format, formatDistanceToNow, isToday, isYesterday } from 'date-fns';
import { it } from 'date-fns/locale';
import { Search, Send } from 'lucide-react';
import { useState } from 'react';

// Dati di esempio - in un'app reale, questi verrebbero da Firebase
const conversations = [
  {
    id: 'convo-1',
    userName: 'Bob',
    avatarUrl: 'https://i.pravatar.cc/150?u=bob',
    lastMessage: 'Sounds good! See you then.',
    lastMessageTimestamp: new Date(Date.now() - 5 * 60 * 1000),
  },
  {
    id: 'convo-2',
    userName: 'Charlie',
    avatarUrl: 'https://i.pravatar.cc/150?u=charlie',
    lastMessage: 'Can we meet at 5 PM instead?',
    lastMessageTimestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: 'convo-3',
    userName: 'Diana',
    avatarUrl: 'https://i.pravatar.cc/150?u=diana',
    lastMessage: "I've arrived at the library.",
    lastMessageTimestamp: new Date(Date.now() - 26 * 60 * 60 * 1000),
  },
];

const messages = {
  'convo-1': [
    { id: 'msg-1-1', sender: 'Bob', text: "Hey! I'm interested in swapping 'To Kill a Mockingbird'.", timestamp: new Date(Date.now() - 15 * 60 * 1000) },
    { id: 'msg-1-2', sender: 'Me', text: "Great! I'm available tomorrow at The Reader's Corner.", timestamp: new Date(Date.now() - 10 * 60 * 1000) },
    { id: 'msg-1-3', sender: 'Bob', text: 'Sounds good! See you then.', timestamp: new Date(Date.now() - 5 * 60 * 1000) },
  ],
  'convo-2': [
     { id: 'msg-2-1', sender: 'Charlie', text: "Hey, about our swap tomorrow.", timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000 - 60000) },
     { id: 'msg-2-2', sender: 'Charlie', text: "Can we meet at 5 PM instead?", timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) },
  ],
  'convo-3': [
     { id: 'msg-3-1', sender: 'Diana', text: "I've arrived at the library.", timestamp: new Date(Date.now() - 26 * 60 * 60 * 1000) },
  ]
};

type Conversation = typeof conversations[0];
type Message = typeof messages['convo-1'][0];

export default function ChatPage() {
  const { t, language } = useLanguage();
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0]);

  const formatTimestamp = (date: Date) => {
    if (isToday(date)) {
      return format(date, 'p', { locale: language === 'it' ? it : undefined });
    }
    if (isYesterday(date)) {
      return language === 'it' ? 'Ieri' : 'Yesterday';
    }
    return format(date, 'P', { locale: language === 'it' ? it : undefined });
  };

  return (
    <div className="flex h-[calc(100vh-12rem)] border rounded-lg">
      <div className="w-full md:w-1/3 lg:w-1/4 border-r flex flex-col">
        <div className="p-4 border-b">
            <h1 className="font-headline text-2xl font-bold tracking-tight">{t('chat_title')}</h1>
            <div className="relative mt-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder={t('chat_search_placeholder')} className="pl-10" />
            </div>
        </div>
        <ScrollArea className="flex-1">
          {conversations.map((convo) => (
            <div
              key={convo.id}
              className={cn(
                "p-4 flex items-start gap-4 cursor-pointer hover:bg-muted/50",
                selectedConversation?.id === convo.id && 'bg-muted'
              )}
              onClick={() => setSelectedConversation(convo)}
            >
              <Avatar>
                <AvatarImage src={convo.avatarUrl} />
                <AvatarFallback>{convo.userName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold truncate">{convo.userName}</h3>
                  <p className="text-xs text-muted-foreground whitespace-nowrap">
                    {formatTimestamp(convo.lastMessageTimestamp)}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground truncate">{convo.lastMessage}</p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            <div className="p-4 border-b flex items-center gap-4">
              <Avatar>
                <AvatarImage src={selectedConversation.avatarUrl} />
                <AvatarFallback>{selectedConversation.userName.charAt(0)}</AvatarFallback>
              </Avatar>
              <h2 className="font-semibold text-lg">{selectedConversation.userName}</h2>
            </div>
            <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                    {(messages[selectedConversation.id as keyof typeof messages] || []).map((msg: Message) => (
                        <div key={msg.id} className={cn("flex", msg.sender === 'Me' ? 'justify-end' : 'justify-start')}>
                            <div className={cn(
                                "max-w-xs lg:max-w-md rounded-xl p-3",
                                msg.sender === 'Me' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                            )}>
                                <p className="text-sm">{msg.text}</p>
                                <p className={cn("text-xs mt-1",  msg.sender === 'Me' ? 'text-primary-foreground/70' : 'text-muted-foreground')}>
                                     {format(msg.timestamp, 'p', { locale: language === 'it' ? it : undefined })}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
            <div className="p-4 border-t">
                 <div className="flex items-center gap-2">
                    <Input placeholder={t('chat_type_message_placeholder')} />
                    <Button>
                        <Send className="h-5 w-5" />
                        <span className="sr-only">{t('chat_send_button')}</span>
                    </Button>
                 </div>
            </div>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center text-center">
            <div>
              <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground" />
              <h2 className="mt-2 text-xl font-semibold">{t('chat_title')}</h2>
              <p className="mt-1 text-muted-foreground">{t('chat_select_conversation')}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
