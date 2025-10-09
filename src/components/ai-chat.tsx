"use client";

import { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from './ui/badge';

type Message = {
    id: number;
    sender: 'user' | 'bot';
    text: string;
};

async function runSimpleChat(prompt: string): Promise<string> {
    const response = await fetch('/api/genkit/simpleChatFlow', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: prompt }),
    });
    if (!response.ok) {
        throw new Error('Flow execution failed');
    }
    const result = await response.json();
    return result.data;
}


export default function AIChat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim() === '' || loading) return;

        const userMessage: Message = {
            id: messages.length + 1,
            sender: 'user',
            text: newMessage,
        };

        setMessages(prev => [...prev, userMessage]);
        setNewMessage('');
        setLoading(true);

        try {
            const botResponse = await runSimpleChat(newMessage);

            const botMessage: Message = {
                id: messages.length + 2,
                sender: 'bot',
                text: botResponse,
            };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
             const errorMessage: Message = {
                id: messages.length + 2,
                sender: 'bot',
                text: "Sorry, I'm having trouble connecting. Please try again later.",
            };
            setMessages(prev => [...prev, errorMessage]);
            console.error("Error calling chat flow:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleBadgeClick = (text: string) => {
        setNewMessage(text);
    }

    return (
        <div className="flex flex-col h-full bg-card border rounded-lg">
            <div className="p-4 border-b flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-primary" />
                <h2 className="font-headline text-lg font-semibold">Asistente IA</h2>
            </div>
            <ScrollArea className="flex-1 p-4">
                <div className="space-y-6">
                    {messages.length === 0 && (
                         <div className="text-center text-muted-foreground py-8">
                            <Sparkles className="mx-auto h-8 w-8 mb-2" />
                            <p>¿Cómo puedo ayudarte hoy?</p>
                        </div>
                    )}
                    {messages.map((message) => {
                        const isBot = message.sender === 'bot';
                        return (
                            <div key={message.id} className={`flex items-start gap-3 ${!isBot ? 'flex-row-reverse' : ''}`}>
                                <Avatar className="h-8 w-8">
                                    {isBot ? (
                                        <AvatarFallback className="bg-primary text-primary-foreground">
                                            <Sparkles className="h-5 w-5"/>
                                        </AvatarFallback>
                                    ) : (
                                        <>
                                            <AvatarImage src="https://picsum.photos/seed/101/200/200" alt="User" data-ai-hint="portrait" />
                                            <AvatarFallback>U</AvatarFallback>
                                        </>
                                    )}
                                </Avatar>
                                <div className={`flex flex-col ${!isBot ? 'items-end' : 'items-start'}`}>
                                    <div className={`p-3 rounded-lg max-w-xs ${isBot ? 'bg-muted' : 'bg-primary text-primary-foreground'}`}>
                                        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                     {loading && (
                        <div className="flex items-start gap-3">
                            <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-primary text-primary-foreground">
                                    <Sparkles className="h-5 w-5"/>
                                </AvatarFallback>
                            </Avatar>
                            <div className="p-3 rounded-lg max-w-xs bg-muted">
                                <p className="text-sm">...</p>
                            </div>
                        </div>
                    )}
                </div>
            </ScrollArea>
             <div className="p-2 border-t">
                 <div className="flex gap-2 mb-2">
                    <Badge variant="outline" className="cursor-pointer hover:bg-muted" onClick={() => handleBadgeClick('¿Cuáles son las fechas de mis próximos exámenes?')}>Exámenes</Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-muted" onClick={() => handleBadgeClick('¿Qué cursos tengo este semestre?')}>Cursos</Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-muted" onClick={() => handleBadgeClick('Muéstrame mi horario de clases')}>Horarios</Badge>
                 </div>
                <form onSubmit={handleSendMessage} className="flex gap-2">
                    <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Pregúntale algo al asistente..."
                        autoComplete="off"
                         className="bg-background focus-visible:ring-primary"
                         disabled={loading}
                    />
                    <Button type="submit" size="icon" variant="ghost" className="text-primary hover:text-primary" disabled={loading}>
                        <Send className="h-5 w-5" />
                        <span className="sr-only">Enviar</span>
                    </Button>
                </form>
            </div>
        </div>
    );
}
