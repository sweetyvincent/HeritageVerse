import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles, AlertTriangle, Minimize2, Maximize2, Bot } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { askGroqHeritageAI } from '../../services/groqService';

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
}

const QUICK_RESPONSES: Record<string, string> = {
  'taj mahal': 'The Taj Mahal was built by Emperor Shah Jahan in 1632 CE in memory of his wife Mumtaz Mahal. It took 22 years and 20,000 artisans to complete.',
  'hampi': 'Hampi was the capital of the Vijayanagara Empire and was once one of the wealthiest cities in the world. Today it is a UNESCO World Heritage Site with over 1,600 monuments.',
  'heritage': 'India has 42 UNESCO World Heritage Sites! The most visited include Taj Mahal, Red Fort, Hampi, and the Ajanta & Ellora Caves.',
  'route': 'A popular 3-day heritage route: Day 1 - Taj Mahal + Agra Fort. Day 2 - Red Fort + Humayun\'s Tomb in Delhi. Day 3 - Qutub Minar + Lodhi Garden.',
  'hello': 'Namaste! 🙏 I\'m HeritageVerse AI, powered by Groq LLM. Ask me anything about India\'s cultural heritage, architecture, or travel planning!',
};

const getResponse = (msg: string): string => {
  const lower = msg.toLowerCase();
  for (const [key, response] of Object.entries(QUICK_RESPONSES)) {
    if (lower.includes(key)) return response;
  }
  return `India has a glorious 5,000-year history with 42 UNESCO World Heritage Sites. Ask me about any monument, architectural style, or ASI historical facts!`;
};

const HIDDEN_PATHS = ['/ai-guide', '/auth/login', '/auth/register', '/auth/forgot-password'];

const ChatBot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '0', role: 'ai', content: 'Namaste! 🙏 I\'m HeritageVerse AI (Powered by Groq LLM). Ask me anything about India\'s cultural heritage!' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const location = useLocation();

  // Don't show on certain pages
  if (HIDDEN_PATHS.includes(location.pathname)) return null;

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const aiReply = await askGroqHeritageAI(userMsg.content, messages);
      const aiMsg: Message = { id: (Date.now() + 1).toString(), role: 'ai', content: aiReply };
      setMessages(prev => [...prev, aiMsg]);
    } catch (e) {
      const aiMsg: Message = { id: (Date.now() + 1).toString(), role: 'ai', content: getResponse(userMsg.content) };
      setMessages(prev => [...prev, aiMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const suggestions = ['Tell me about Taj Mahal', 'Plan a heritage route', 'Best sites to visit'];

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50">
      {open && !minimized && (
        <div className="mb-3 w-80 md:w-96 bg-heritage-card border border-heritage-border rounded-2xl shadow-2xl shadow-black/40 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-heritage-card to-gold/5 border-b border-heritage-border px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-gold" />
              </div>
              <div>
                <div className="text-sm font-bold">Heritage AI</div>
                <div className="text-xs text-green-400 flex items-center space-x-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  <span>Online</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <button onClick={() => setMinimized(true)} className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/5">
                <Minimize2 className="h-3.5 w-3.5" />
              </button>
              <button onClick={() => setOpen(false)} className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/5">
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="h-64 overflow-y-auto p-4 space-y-3">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-xl px-3 py-2 text-xs ${msg.role === 'user' ? 'bg-gold text-heritage-dark' : 'bg-white/5 border border-heritage-border text-gray-200'}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/5 border border-heritage-border rounded-xl px-3 py-2">
                  <div className="flex space-x-1">
                    {[0, 150, 300].map(d => (
                      <div key={d} className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Suggestions */}
          {messages.length <= 2 && (
            <div className="px-4 pb-2 flex flex-wrap gap-1">
              {suggestions.map(s => (
                <button key={s} onClick={() => { setInput(s); }}
                  className="text-xs bg-gold/10 text-gold border border-gold/20 rounded-full px-2.5 py-1 hover:bg-gold/20 transition-all">
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Disclaimer */}
          <div className="px-4 pb-2 flex items-center space-x-1">
            <AlertTriangle className="h-3 w-3 text-yellow-500 flex-shrink-0" />
            <span className="text-xs text-gray-500">Verify historical info with authoritative sources</span>
          </div>

          {/* Input */}
          <div className="border-t border-heritage-border p-3 flex space-x-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && sendMessage()}
              placeholder="Ask about heritage..."
              className="flex-1 bg-white/5 border border-heritage-border rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-gold/50"
            />
            <button onClick={sendMessage} disabled={!input.trim()}
              className="p-2 bg-gold hover:bg-amber-500 disabled:opacity-40 text-heritage-dark rounded-xl transition-all">
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => { setOpen(!open); setMinimized(false); }}
        className={`relative w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${
          open
            ? 'bg-heritage-card border border-gold/30 text-gold'
            : 'bg-gold hover:bg-amber-500 text-heritage-dark hover:scale-110'
        }`}
      >
        {open ? (
          <X className="h-6 w-6" />
        ) : (
          <>
            <MessageCircle className="h-6 w-6" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-heritage-dark" />
          </>
        )}
      </button>
    </div>
  );
};

export default ChatBot;
