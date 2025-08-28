import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { MessageSquare, X, Send, User, Bot, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface Command {
  command: string;
  description: string;
}

const commands: Command[] = [
  { command: '/help', description: 'Show available commands' },
  { command: '/status', description: 'Check system status' },
  { command: '/demo', description: 'Start product demo' },
  { command: '/pricing', description: 'View pricing plans' },
  { command: '/contact', description: 'Contact support team' },
];

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hi! I\'m SanTra AI. How can I help you today? Type / for commands.',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCommands, setShowCommands] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load messages from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('santra-chat-messages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  // Save messages to localStorage
  useEffect(() => {
    localStorage.setItem('santra-chat-messages', JSON.stringify(messages));
  }, [messages]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    setShowCommands(false);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(input);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.startsWith('/help')) {
      return 'Available commands:\n' + commands.map(cmd => `${cmd.command} - ${cmd.description}`).join('\n');
    } else if (input.startsWith('/status')) {
      return 'System Status: ✅ All systems operational\n🟢 Response time: <2s\n🟢 Uptime: 99.9%';
    } else if (input.startsWith('/demo')) {
      return 'I\'d love to show you a demo! Our AI can handle customer inquiries, escalate to humans when needed, and integrate with your existing tools. Would you like to see our pricing plans or schedule a live demo?';
    } else if (input.startsWith('/pricing')) {
      return 'Our pricing plans:\n🆓 Starter: Free forever\n⚡ Growth: $49/month\n🏢 Enterprise: Custom pricing\n\nWould you like more details about any plan?';
    } else if (input.startsWith('/contact')) {
      return 'You can reach our team at:\n📧 hello@santra.ai\n📞 1-800-SANTRA\n💬 This chat (we\'re here 24/7!)';
    } else if (input.includes('price') || input.includes('cost')) {
      return 'Our Growth plan starts at just $49/month and includes AI responses, voice agents, and up to 5 team members. Enterprise plans offer custom pricing. Would you like to start a free trial?';
    } else if (input.includes('demo') || input.includes('try')) {
      return 'Great! You can start a free trial right now - no credit card required. Our AI will be up and running in under 10 minutes. Shall I help you get started?';
    } else if (input.includes('help') || input.includes('support')) {
      return 'I\'m here to help! I can answer questions about our features, pricing, setup process, or anything else about SanTra. What would you like to know?';
    } else {
      return 'Thanks for your message! I can help you with questions about SanTra\'s AI-powered customer support platform. Feel free to ask about our features, pricing, or type "/" to see available commands.';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    setShowCommands(value.startsWith('/'));
  };

  const handleCommandSelect = (command: string) => {
    setInput(command + ' ');
    setShowCommands(false);
    inputRef.current?.focus();
  };

  return (
    <>
      {/* Chat Bubble Trigger */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 rounded-full bg-gradient-primary hover:opacity-90 text-white shadow-2xl hover-lift animate-pulse-glow"
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
        </Button>
      </div>

      {/* Chat Widget */}
      {isOpen && (
        <>
          {/* Mobile Overlay */}
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden" onClick={() => setIsOpen(false)} />
          
          {/* Chat Container */}
          <Card className={`fixed z-50 shadow-2xl transition-all duration-300 ease-out ${
            isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          } ${
            // Mobile: full screen, Desktop: bottom right
            'md:bottom-24 md:right-6 md:w-96 md:h-[500px] ' +
            'bottom-0 right-0 left-0 top-0 md:left-auto md:top-auto w-full h-full md:rounded-2xl'
          } glass border-white/20`}>
            
            {/* Header */}
            <CardHeader className="pb-3 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">SanTra AI</h3>
                    <p className="text-sm text-foreground-secondary">Online now</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-foreground-secondary hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex flex-col h-full p-0">
              <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                  >
                    <div className={`flex items-start space-x-2 max-w-[80%] ${
                      message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.sender === 'user' 
                          ? 'bg-gradient-primary text-white' 
                          : 'bg-gradient-secondary text-white'
                      }`}>
                        {message.sender === 'user' ? 
                          <User className="h-4 w-4" /> : 
                          <Bot className="h-4 w-4" />
                        }
                      </div>
                      <div className={`px-4 py-2 rounded-2xl ${
                        message.sender === 'user'
                          ? 'bg-gradient-primary text-white'
                          : 'bg-white/10 backdrop-blur text-foreground border border-white/20'
                      }`}>
                        <p className="text-sm whitespace-pre-line">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'user' ? 'text-white/70' : 'text-foreground-secondary'
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start animate-fade-in">
                    <div className="flex items-start space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-secondary flex items-center justify-center">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div className="px-4 py-2 rounded-2xl bg-white/10 backdrop-blur border border-white/20">
                        <div className="flex items-center space-x-1">
                          <Loader2 className="h-4 w-4 animate-spin text-foreground-secondary" />
                          <span className="text-sm text-foreground-secondary">AI is typing...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Command Suggestions */}
              {showCommands && (
                <div className="border-t border-white/10 p-4 bg-white/5 backdrop-blur">
                  <p className="text-sm text-foreground-secondary mb-2">Available commands:</p>
                  <div className="space-y-1">
                    {commands
                      .filter(cmd => cmd.command.includes(input.slice(1)))
                      .map((cmd) => (
                        <button
                          key={cmd.command}
                          onClick={() => handleCommandSelect(cmd.command)}
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 transition-colors group"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-foreground group-hover:text-primary">
                              {cmd.command}
                            </span>
                            <span className="text-xs text-foreground-secondary">
                              {cmd.description}
                            </span>
                          </div>
                        </button>
                      ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="border-t border-white/10 p-4">
                <div className="flex items-center space-x-2">
                  <Input
                    ref={inputRef}
                    value={input}
                    onChange={handleInputChange}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type a message or / for commands..."
                    className="flex-1 bg-white/10 border-white/20 text-foreground placeholder:text-foreground-secondary focus:border-primary"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!input.trim()}
                    className="bg-gradient-primary hover:opacity-90 text-white disabled:opacity-50"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </>
  );
};