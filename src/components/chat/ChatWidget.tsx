import { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, X, User, Store, Bike } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';

export interface ChatMessage {
  id: string;
  sender: 'customer' | 'merchant' | 'delivery';
  message: string;
  timestamp: Date;
}

interface ChatWidgetProps {
  currentProfile: 'customer' | 'merchant' | 'delivery';
  orderId?: string;
  onSendMessage?: (message: string) => void;
}

export function ChatWidget({ currentProfile, orderId, onSendMessage }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'customer',
      message: 'Olá! Pode adicionar bastante molho extra?',
      timestamp: new Date(Date.now() - 300000),
    },
    {
      id: '2',
      sender: 'merchant',
      message: 'Claro! Vou adicionar molho extra sem custo adicional.',
      timestamp: new Date(Date.now() - 240000),
    },
    {
      id: '3',
      sender: 'delivery',
      message: 'Saí para buscar o pedido. Chego em 5 minutos.',
      timestamp: new Date(Date.now() - 180000),
    },
  ]);
  const [unreadCount, setUnreadCount] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!message.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: currentProfile,
      message: message.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');
    
    if (onSendMessage) {
      onSendMessage(message.trim());
    }

    // Simular resposta automática
    if (currentProfile === 'customer') {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          sender: 'merchant',
          message: 'Recebido! Obrigado pela mensagem.',
          timestamp: new Date(),
        }]);
        if (!isOpen) {
          setUnreadCount(prev => prev + 1);
        }
      }, 2000);
    }
  };

  const getProfileIcon = (profile: string) => {
    switch (profile) {
      case 'customer':
        return <User className="w-4 h-4" />;
      case 'merchant':
        return <Store className="w-4 h-4" />;
      case 'delivery':
        return <Bike className="w-4 h-4" />;
    }
  };

  const getProfileName = (profile: string) => {
    switch (profile) {
      case 'customer':
        return 'Cliente';
      case 'merchant':
        return 'Restaurante';
      case 'delivery':
        return 'Entregador';
    }
  };

  const getProfileColor = (profile: string) => {
    switch (profile) {
      case 'customer':
        return 'bg-blue-500';
      case 'merchant':
        return 'bg-green-500';
      case 'delivery':
        return 'bg-orange-500';
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => {
            setIsOpen(true);
            setUnreadCount(0);
          }}
          className="rounded-full w-14 h-14 shadow-lg bg-blue-500 hover:bg-blue-600 relative"
        >
          <MessageCircle className="w-6 h-6" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-red-500 px-2">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)]">
      <Card className="flex flex-col h-[500px] shadow-2xl">
        <div className="bg-blue-500 text-white p-4 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            <div>
              <h3 className="text-white">Chat do Pedido</h3>
              {orderId && (
                <p className="text-xs text-blue-100">Pedido #{orderId}</p>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-blue-600 h-8 w-8 p-0"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((msg) => {
              const isCurrentUser = msg.sender === currentProfile;
              return (
                <div
                  key={msg.id}
                  className={`flex gap-2 ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div className={`${getProfileColor(msg.sender)} w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0`}>
                    {getProfileIcon(msg.sender)}
                  </div>
                  <div className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'} max-w-[70%]`}>
                    <span className="text-xs text-gray-500 mb-1">
                      {getProfileName(msg.sender)}
                    </span>
                    <div
                      className={`px-4 py-2 rounded-lg ${
                        isCurrentUser
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{msg.message}</p>
                    </div>
                    <span className="text-xs text-gray-400 mt-1">
                      {msg.timestamp.toLocaleTimeString('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>

        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              placeholder="Digite sua mensagem..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <Button
              onClick={handleSend}
              disabled={!message.trim()}
              className="bg-blue-500 hover:bg-blue-600"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Chat em tempo real com cliente, restaurante e entregador
          </p>
        </div>
      </Card>
    </div>
  );
}
