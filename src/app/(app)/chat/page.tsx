"use client";

import { useState } from 'react';
import { Send } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { users, messages as initialMessages } from '@/lib/data';

type Message = {
    id: number;
    userId: number;
    text: string;
    timestamp: string;
};

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [newMessage, setNewMessage] = useState('');

    const getUserById = (userId: number) => {
        return users.find(user => user.id === userId) || { name: 'Unknown', nickname: 'Unknown', avatar: '' };
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;

        const message: Message = {
            id: messages.length + 1,
            userId: 1, // Mock current user is Alex Doe
            text: newMessage,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages([...messages, message]);
        setNewMessage('');
    };

    return (
        <div className="flex flex-col h-[calc(100vh-theme(spacing.28))] bg-card border rounded-lg">
            <div className="p-4 border-b">
                <h1 className="font-headline text-2xl font-semibold">Community Chat</h1>
                <p className="text-muted-foreground">General chat for all students</p>
            </div>
            <ScrollArea className="flex-1 p-4">
                <div className="space-y-6">
                    {messages.map((message) => {
                        const user = getUserById(message.userId);
                        const isCurrentUser = user.id === 1;
                        return (
                            <div key={message.id} className={`flex items-start gap-3 ${isCurrentUser ? 'flex-row-reverse' : ''}`}>
                                <Avatar>
                                    <AvatarImage src={user.avatar} alt={user.name} data-ai-hint="portrait" />
                                    <AvatarFallback>{user.nickname.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'}`}>
                                    <div className={`p-3 rounded-lg max-w-xs md:max-w-md ${isCurrentUser ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                        <p className="text-sm">{message.text}</p>
                                    </div>
                                    <div className="text-xs text-muted-foreground mt-1">
                                        {user.nickname} @ {message.timestamp}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </ScrollArea>
            <div className="p-4 border-t bg-background rounded-b-lg">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                    <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        autoComplete="off"
                    />
                    <Button type="submit" size="icon">
                        <Send className="h-4 w-4" />
                        <span className="sr-only">Send</span>
                    </Button>
                </form>
            </div>
        </div>
    );
}
