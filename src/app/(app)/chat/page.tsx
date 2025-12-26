'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLanguage } from '@/context/language-context';
import { cn } from '@/lib/utils';
import { format, isToday, isYesterday } from 'date-fns';
import { it } from 'date-fns/locale';
import { MessageSquare, Search, Send } from 'lucide-react';
import { useState, useMemo } from 'react';
import { useUser, useFirestore, useCollection, useMemoFirebase, addDocumentNonBlocking } from '@/firebase';
import { collection, query, where, orderBy } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';

type Chat = {
  id: string;
  users: string[];
  userNames: { [key: string]: string };
  userAvatars: { [key: string]: string };
  lastMessage?: {
    text: string;
    timestamp: any;
    senderId: string;
  };
};

type ChatMessage = {
  id: string;
  senderId: string;
  text: string;
  timestamp: any;
};

export default function ChatPage() {
  const { t, language } = useLanguage();
  const { user } = useUser();
  const firestore = useFirestore();
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  const chatsQuery = useMemoFirebase(() => {
    if (!user) return null;
    return query(collection(firestore, 'chats'), where('users', 'array-contains', user.uid));
  }, [firestore, user]);

  const { data: chats, isLoading: isLoadingChats } = useCollection<Chat>(chatsQuery);

  const messagesQuery = useMemoFirebase(() => {
    if (!selectedChat) return null;
    return query(collection(firestore, `chats/${selectedChat.id}/messages`), orderBy('timestamp', 'asc'));
  }, [firestore, selectedChat]);

  const { data: messages, isLoading: isLoadingMessages } = useCollection<ChatMessage>(messagesQuery);
  
  const [newMessage, setNewMessage] = useState('');

  const formatTimestamp = (date: Date) => {
    if (!date) return '';
    if (isToday(date)) {
      return format(date, 'p', { locale: language === 'it' ? it : undefined });
    }
    if (isYesterday(date)) {
      return language === 'it' ? 'Ieri' : 'Yesterday';
    }
    return format(date, 'P', { locale: language === 'it' ? it : undefined });
  };
  
  const handleSendMessage = () => {
    if (!user || !selectedChat || !newMessage.trim()) return;

    const messagesCol = collection(firestore, `chats/${selectedChat.id}/messages`);
    addDocumentNonBlocking(messagesCol, {
      senderId: user.uid,
      text: newMessage,
      timestamp: new Date(),
    });
    setNewMessage('');
  };
  
  const getOtherUser = (chat: Chat) => {
    const otherUserId = chat.users.find(uid => uid !== user?.uid) || '';
    return {
        id: otherUserId,
        name: chat.userNames[otherUserId],
        avatar: chat.userAvatars[otherUserId],
    }
  }

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
          {isLoadingChats && Array.from({length: 3}).map((_, i) => (
             <div key={i} className="p-4 flex items-start gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className='flex-1 space-y-2'>
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                </div>
            </div>
          ))}
          {!isLoadingChats && chats && chats.map((chat) => {
            const otherUser = getOtherUser(chat);
            return (
                <div
                key={chat.id}
                className={cn(
                    "p-4 flex items-start gap-4 cursor-pointer hover:bg-muted/50",
                    selectedChat?.id === chat.id && 'bg-muted'
                )}
                onClick={() => setSelectedChat(chat)}
                >
                <Avatar>
                    <AvatarImage src={otherUser.avatar} />
                    <AvatarFallback>{otherUser.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                    <div className="flex justify-between items-center">
                    <h3 className="font-semibold truncate">{otherUser.name}</h3>
                     {chat.lastMessage?.timestamp && <p className="text-xs text-muted-foreground whitespace-nowrap">
                        {formatTimestamp(chat.lastMessage.timestamp.toDate())}
                    </p>}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{chat.lastMessage?.text}</p>
                </div>
                </div>
            )
          })}
        </ScrollArea>
      </div>
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            <div className="p-4 border-b flex items-center gap-4">
              <Avatar>
                <AvatarImage src={getOtherUser(selectedChat).avatar} />
                <AvatarFallback>{getOtherUser(selectedChat).name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <h2 className="font-semibold text-lg">{getOtherUser(selectedChat).name}</h2>
            </div>
            <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                    {isLoadingMessages && <Skeleton className="h-10 w-1/3" />}
                    {messages && messages.map((msg: ChatMessage) => (
                        <div key={msg.id} className={cn("flex", msg.senderId === user?.uid ? 'justify-end' : 'justify-start')}>
                            <div className={cn(
                                "max-w-xs lg:max-w-md rounded-xl p-3",
                                msg.senderId === user?.uid ? 'bg-primary text-primary-foreground' : 'bg-muted'
                            )}>
                                <p className="text-sm">{msg.text}</p>
                                {msg.timestamp && <p className={cn("text-xs mt-1",  msg.senderId === user?.uid ? 'text-primary-foreground/70' : 'text-muted-foreground')}>
                                     {format(msg.timestamp.toDate(), 'p', { locale: language === 'it' ? it : undefined })}
                                </p>}
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
            <div className="p-4 border-t">
                 <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex items-center gap-2">
                    <Input placeholder={t('chat_type_message_placeholder')} value={newMessage} onChange={e => setNewMessage(e.target.value)} />
                    <Button type="submit">
                        <Send className="h-5 w-5" />
                        <span className="sr-only">{t('chat_send_button')}</span>
                    </Button>
                 </form>
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
