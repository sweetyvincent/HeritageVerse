import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Volume2, MessageCircle, Sparkles, AlertTriangle, Globe, X, ChevronDown, Bot, Zap } from 'lucide-react';
import { heritageSites } from '../data/heritageSites';
import { useLanguage } from '../context/LanguageContext';
import { askGroqHeritageAI } from '../services/groqService';
import { voiceService } from '../services/voiceService';
import toast from 'react-hot-toast';

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

// ─── Mock AI Knowledge Base ────────────────────────────────────────────────
const getAIResponse = (userMessage: string): string => {
  const msg = userMessage.toLowerCase();

  if (msg.includes('taj mahal') || msg.includes('taj')) {
    if (msg.includes('built') || msg.includes('who') || msg.includes('history')) {
      return `**The Taj Mahal** was commissioned by **Emperor Shah Jahan** in 1632 CE in memory of his beloved wife **Mumtaz Mahal**, who passed away during the birth of their 14th child.

Over **20,000 artisans** from across the Mughal Empire and Central Asia worked on it for **22 years** (completed 1653). The chief architect was **Ustad Ahmad Lahori**.

Key facts:
• Made of **white Makrana marble** from Rajasthan
• The four minarets are tilted slightly **outward** (earthquake protection)
• The marble **changes color** — pink at dawn, white at noon, golden at dusk
• Declared a **UNESCO World Heritage Site** in 1983

It's considered the pinnacle of Mughal architecture, blending Persian, Ottoman, and Indian styles.`;
    }
    return `**Taj Mahal** is a magnificent ivory-white marble mausoleum in **Agra, Uttar Pradesh**, built during the Mughal Empire (1632–1653 CE).

It was built by Emperor Shah Jahan as a symbol of eternal love for his wife Mumtaz Mahal. Today it attracts **8 million visitors annually** and is one of the Seven Wonders of the World.

Would you like to know about:
• Its architectural style?
• The construction story?  
• Tips for visiting?
• Nearby heritage sites?`;
  }

  if (msg.includes('hampi')) {
    return `**Hampi** was the capital of the **Vijayanagara Empire** (14th–16th century CE), located in present-day **Karnataka**.

At its peak in the 15th century, Hampi was one of the **richest and most populous cities in the world**, with over **500,000 inhabitants** — larger than Rome at the time!

Key highlights:
• Over **1,600 archaeological monuments** spread across 41 sq km
• Famous **Vittala Temple** with its iconic Stone Chariot (on the 50-paisa coin)
• Musical pillars that produce different notes when struck
• The empire fell after the **Battle of Talikota (1565)** — the city was burned for 6 months

It's a **UNESCO World Heritage Site** since 1986.`;
  }

  if (msg.includes('red fort') || msg.includes('lal qila')) {
    return `**Red Fort** (Lal Qila) is a magnificent **Mughal fortress** in Old Delhi, built by Emperor **Shah Jahan** between 1638–1648 CE.

Key facts:
• Named for its **red sandstone walls** (2.4 km perimeter)
• Served as the **seat of Mughal power** for nearly 200 years
• Every year, India's Prime Minister **hoists the national flag** here on Independence Day (August 15)
• The Koh-i-Noor diamond and Peacock Throne were kept here before being taken by Nadir Shah in 1739
• **UNESCO World Heritage Site** since 2007

The fort complex contains remarkable structures: **Diwan-i-Aam** (Hall of Public Audience), **Diwan-i-Khas** (Hall of Private Audience), Moti Masjid (Pearl Mosque), and royal baths.`;
  }

  if (msg.includes('konark') || msg.includes('sun temple')) {
    return `**Konark Sun Temple** is a 13th-century masterpiece in **Odisha**, built by King **Narasimhadeva I** of the Eastern Ganga dynasty around 1250 CE.

The entire temple is designed as a **colossal chariot of the Sun God Surya**:
• **24 intricately carved stone wheels** (functioning as sundials!)
• **7 horses** pulling the chariot (days of the week)
• Each wheel has 8 spokes representing 3-hour time divisions

Known as the "**Black Pagoda**" by European sailors, it was used for **navigation** — its counterpart, the Jagannath Temple in Puri, was the "White Pagoda."

The temple appears on the **Indian 10-rupee note**. It's a **UNESCO World Heritage Site** since 1984.`;
  }

  if (msg.includes('ajanta')) {
    return `**Ajanta Caves** are a series of **29 Buddhist rock-cut cave monuments** in Maharashtra, carved between the **2nd century BCE and 5th century CE**.

What makes them extraordinary:
• The **paintings inside** (1,500 years old!) depict Jataka tales — the past lives of Buddha
• Artists used **lapis lazuli blue** from Afghanistan and mineral pigments still vibrant today
• The caves were **completely forgotten** for 1,200 years until rediscovered by British officer John Smith during a tiger hunt in 1819

These caves represent the **finest surviving examples** of ancient Indian art and were a major influence on Buddhist art across Asia — from Japan to Sri Lanka.

**UNESCO World Heritage Site** since 1983.`;
  }

  if (msg.includes('ellora')) {
    return `**Ellora Caves** are unique in the world — a complex of **34 rock-cut temples** representing **three religions side by side**: Buddhism (12 caves), Hinduism (17 caves), and Jainism (5 caves), carved 600–1000 CE.

The crown jewel is **Cave 16 — the Kailash Temple**:
• The **world's largest monolithic excavation** — larger than the Parthenon in Greece!
• 200,000 tonnes of rock were removed — entirely **carved top-to-bottom**
• Took over 100 years to complete under Rashtrakuta king Krishna I

Ellora represents India's tradition of **religious pluralism** — three faiths coexisting and creating masterpieces together.

**UNESCO World Heritage Site** since 1983.`;
  }

  if (msg.includes('route') || msg.includes('itinerary') || msg.includes('plan') || msg.includes('day')) {
    if (msg.includes('delhi') || msg.includes('agra')) {
      return `**Golden Triangle Heritage Route** (Delhi → Agra → Delhi) — 1 Day Itinerary:

🌅 **Morning (6:00 AM)**
• Depart Delhi at dawn (3 hour drive to Agra)
• Arrive at Taj Mahal — **Best at sunrise** (7:00–10:00 AM)
• Photography, guided tour inside the mausoleum

🏯 **Afternoon (12:00 PM)**
• Lunch at a Mughal cuisine restaurant nearby
• **Agra Fort** — Shah Jahan's residence before imprisonment (2 hours)
• Visit **Itmad-ud-Daula** (Baby Taj Mahal)

🚂 **Evening (5:00 PM)**
• Return to Delhi by Gatimaan Express
• Visit **Red Fort** (if time permits — closing at 5:30 PM)
• Dinner at Old Delhi's **Karim's** for authentic Mughal food

**Total distance:** ~450 km | **Best time:** October–March`;
    }
    return `Here's a suggested **Heritage Day Route**:

**Morning (3 hours):**
• Visit the main monument at its best light
• Explore the surrounding complex and gardens
• AI-guided audio tour at key points

**Afternoon (2 hours):**
• Visit nearby heritage sites (within 20 km)
• Local cultural experience — food, crafts

**Evening (1 hour):**
• Sunset views from the best vantage point
• Cultural performance or sound & light show

Would you like a specific route for a particular city? Tell me your location and available time!`;
  }

  if (msg.includes('architecture') || msg.includes('style') || msg.includes('mughal') || msg.includes('dravidian')) {
    return `**Indian Heritage Architecture** — Major Styles:

🕌 **Mughal Architecture (1526–1857)**
• Blend of Persian, Central Asian & Indian styles
• Iconic features: bulbous domes, minarets, red sandstone + marble
• Examples: Taj Mahal, Red Fort, Humayun's Tomb

🛕 **Dravidian / South Indian (600 CE onwards)**
• Characteristic: towering **gopurams** (gateway towers)
• Intricate sculptural programs, stepped tanks
• Examples: Brihadeeswarar Temple, Meenakshi Temple

⛰️ **Nagara / North Indian**
• Curvilinear **shikhara** (tower) above the sanctum
• Examples: Konark Sun Temple, Khajuraho

🪨 **Rock-cut Architecture**
• Carved directly into living rock — no construction!
• Examples: Ajanta, Ellora, Mahabalipuram

Each style reflects the **cultural, religious, and political values** of its era.`;
  }

  if (msg.includes('nearby') || msg.includes('closest') || msg.includes('visit together')) {
    return `**Popular Heritage Clusters in India:**

**Agra Triangle:**
• Taj Mahal → Agra Fort → Fatehpur Sikri (all within 40 km)

**Maharashtra Circuit:**  
• Ajanta Caves → Ellora Caves → Aurangabad (within 100 km)

**Karnataka Heritage:**
• Hampi → Badami → Pattadakal → Aihole (within 150 km)

**Tamil Nadu Temple Trail:**
• Brihadeeswarar (Thanjavur) → Gangaikonda Cholapuram → Darasuram (within 60 km)

**Odisha Coast:**
• Konark Sun Temple → Puri Jagannath → Bhubaneswar temples (within 60 km)

Would you like details on any of these heritage circuits?`;
  }

  if (msg.includes('hello') || msg.includes('hi') || msg.includes('namaste') || msg.includes('start')) {
    return `🙏 **Namaste! Welcome to Heritage AI!**

I'm your intelligent heritage guide, powered by a knowledge base of India's most significant cultural treasures.

I can help you:
• 📚 **Learn the history** of any heritage site
• 🗺️ **Plan your heritage route** based on time and interests
• 🏛️ **Compare architectural styles** across dynasties
• 🎨 **Understand cultural significance** of monuments
• 🔍 **Discover hidden gems** you might not know about

Try asking me:
*"Who built the Taj Mahal?"*  
*"Tell me about Hampi"*
*"Create a 1-day Delhi heritage route"*
*"What makes Ellora Caves unique?"*

⚠️ Note: Always verify historical information with authoritative sources like ASI and UNESCO.`;
  }

  if (msg.includes('mysore') || msg.includes('palace')) {
    return `**Mysore Palace** (Amba Vilas) is one of India's most magnificent royal palaces, seat of the **Wadiyar dynasty** in Karnataka.

Key highlights:
• Built between **1897–1912** in Indo-Saracenic style by British architect Henry Irwin
• **Over 6 million visitors** annually — one of India's most visited monuments
• During **Dasara festival**, lit by **97,000 light bulbs** — a spectacular sight!
• The golden howdah (elephant throne) weighs **750 kg** — used in the Dasara procession
• Interior features carved wooden doors, painted ceilings, and a stunning **Durbar Hall**

Mysore Dasara is one of India's **10 national festivals**, celebrated with a grand elephant procession from the palace.`;
  }

  if (msg.includes('sanchi') || msg.includes('stupa') || msg.includes('buddhist') || msg.includes('ashoka')) {
    return `**Sanchi Stupa** is India's **oldest standing stone structure**, commissioned by Emperor **Ashoka the Great** around 250 BCE.

The fascinating story:
• After witnessing the bloody **Battle of Kalinga** (261 BCE), Ashoka converted to Buddhism and became a messenger of peace
• He built stupas across his empire to spread Buddhist teachings
• The **four ornamental gateways** (toranas) at Sanchi are the finest examples of early Buddhist sculpture

What's inside: **Relics of Sariputra and Maudgalyayana** — two of Buddha's closest disciples.

The **Lion Capital** at Sanchi served as the model for India's **national emblem**.

**UNESCO World Heritage Site** since 1989.`;
  }

  // Generic fallback
  const randomSite = heritageSites[Math.floor(Math.random() * heritageSites.length)];
  return `That's a great question about Indian heritage! 

I'm specialized in India's cultural and historical heritage. Here's something interesting you might like to know:

**${randomSite.name}** in ${randomSite.location} — "${randomSite.shortDescription}"

It's from the ${randomSite.historicalPeriod} period and is classified as ${randomSite.preservationStatus} in preservation status.

Try asking me about specific monuments like:
• **"Tell me about Hampi"** 
• **"History of the Taj Mahal"**
• **"Create a heritage route for Delhi"**
• **"Compare Mughal and Dravidian architecture"**

⚠️ All heritage information should be verified with authoritative sources like ASI, UNESCO, and academic publications.`;
};

const SUGGESTED_QUESTIONS = [
  'Who built the Taj Mahal?',
  'Tell me about Hampi ruins',
  'Create a 2-hour heritage route in Delhi',
  'What makes Ellora Caves unique?',
  'Compare Mughal and Dravidian architecture',
  'History of Konark Sun Temple',
  'Which heritage sites are near Mysore?',
  'Tell me about Buddhist heritage in India',
];

const MessageBubble: React.FC<{ message: Message }> = ({ message }) => {
  const isUser = message.role === 'user';
  const [isPlaying, setIsPlaying] = useState(false);

  const handleReadAloud = () => {
    if (isPlaying) {
      voiceService.stop();
      setIsPlaying(false);
    } else {
      voiceService.speak({
        text: message.content,
        onStart: () => setIsPlaying(true),
        onEnd: () => setIsPlaying(false),
        onError: () => setIsPlaying(false)
      });
    }
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 group`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center mr-3 flex-shrink-0 mt-1">
          <Sparkles className="h-4 w-4 text-gold" />
        </div>
      )}
      <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
        isUser
          ? 'bg-gold text-heritage-dark rounded-br-sm'
          : 'bg-heritage-card border border-heritage-border rounded-bl-sm shadow-lg'
      }`}>
        {!isUser ? (
          <div className="text-sm text-gray-200 leading-relaxed whitespace-pre-line">
            {message.content.split('\n').map((line, i) => {
              const parts = line.split(/\*\*(.*?)\*\*/g);
              return (
                <span key={i}>
                  {parts.map((part, j) => j % 2 === 1 ? <strong key={j} className="text-white font-semibold">{part}</strong> : part)}
                  {'\n'}
                </span>
              );
            })}
          </div>
        ) : (
          <p className="text-sm font-medium">{message.content}</p>
        )}
        <div className="flex items-center justify-between mt-2 pt-1 border-t border-white/5">
          <div className={`text-[10px] ${isUser ? 'text-heritage-dark/60' : 'text-gray-500'}`}>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          {!isUser && (
            <button
              onClick={handleReadAloud}
              className={`text-xs flex items-center space-x-1 px-2 py-0.5 rounded-md transition-all ${
                isPlaying ? 'bg-gold text-heritage-dark font-bold' : 'text-gray-400 hover:text-gold hover:bg-white/5'
              }`}
              title={isPlaying ? 'Stop reading' : 'Read aloud with AI voice'}
            >
              <Volume2 className={`h-3 w-3 ${isPlaying ? 'animate-pulse' : ''}`} />
              <span className="text-[10px]">{isPlaying ? 'Reading...' : 'Listen'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const AIGuidePage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'ai',
      content: `🙏 **Namaste! Welcome to HeritageVerse AI!**
      
I'm your intelligent heritage scholar & tourism guide, powered by real-time LLM inference. Ask me anything about India's 42 UNESCO World Heritage Sites, architectural styles, dynasty timelines, or personalized travel routes!`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage, languages } = useLanguage();
  const [langOpen, setLangOpen] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => { scrollToBottom(); }, [messages, isTyping]);

  const sendMessage = async (text?: string) => {
    const userText = text || input.trim();
    if (!userText) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: userText, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    setShowSuggestions(false);

    try {
      const aiResponse = await askGroqHeritageAI(userText, messages, language);
      const aiMsg: Message = { id: (Date.now() + 1).toString(), role: 'ai', content: aiResponse, timestamp: new Date() };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      const fallbackMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: getAIResponse(userText),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleVoice = () => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognitionClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognitionClass();
      recognition.lang = language === 'hi' ? 'hi-IN' : language === 'ta' ? 'ta-IN' : 'en-IN';
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
        toast('Listening to your voice...', { icon: '🎙️' });
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        sendMessage(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
        toast.error('Could not capture audio. Please type your query.');
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      toast('Speech recognition not supported in this browser. Please type.', { icon: '⌨️' });
    }
  };

  return (
    <div className="min-h-screen bg-heritage-dark pt-16 pb-20 md:pb-0 flex flex-col">
      <div className="flex-1 flex max-w-4xl mx-auto w-full px-4 py-6 flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gold/30 to-amber-600/30 border border-gold/30 flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-gold" />
            </div>
            <div>
              <h1 className="text-xl font-serif font-bold">Heritage AI Guide</h1>
              <p className="text-xs text-gray-400">Powered by heritage knowledge base</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {/* Language Selector */}
            <div className="relative">
              <button onClick={() => setLangOpen(!langOpen)} className="flex items-center space-x-2 bg-heritage-card border border-heritage-border px-3 py-2 rounded-xl text-sm text-gray-300 hover:border-gold/30 transition-all">
                <Globe className="h-4 w-4" />
                <span>{language.toUpperCase()}</span>
                <ChevronDown className="h-3 w-3" />
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-2 w-44 bg-heritage-card border border-heritage-border rounded-xl shadow-xl z-50 overflow-hidden">
                  {languages.map(lang => (
                    <button key={lang.code} onClick={() => { setLanguage(lang.code); setLangOpen(false); }}
                      className={`w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-white/5 transition-colors ${language === lang.code ? 'text-gold' : 'text-gray-300'}`}>
                      <span>{lang.name}</span>
                      <span className="text-xs text-gray-500">{lang.nativeName}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => { setMessages([messages[0]]); setShowSuggestions(true); }} className="text-xs text-gray-400 hover:text-white bg-white/5 px-3 py-2 rounded-xl transition-all">
              Clear
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto mb-4 space-y-2 pr-1">
          {messages.map(msg => (
            <MessageBubble key={msg.id} message={msg} />
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                <Sparkles className="h-4 w-4 text-gold" />
              </div>
              <div className="bg-heritage-card border border-heritage-border rounded-2xl rounded-bl-sm px-4 py-3">
                <div className="flex space-x-1.5 items-center">
                  {[0, 150, 300].map(delay => (
                    <div key={delay} className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: `${delay}ms` }} />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions */}
        {showSuggestions && (
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-2">Suggested questions:</p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_QUESTIONS.map(q => (
                <button key={q} onClick={() => sendMessage(q)}
                  className="text-xs bg-white/5 hover:bg-gold/10 border border-heritage-border hover:border-gold/30 text-gray-300 hover:text-gold px-3 py-1.5 rounded-full transition-all">
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="flex items-start space-x-2 text-xs text-gray-500 p-3 bg-yellow-500/5 border border-yellow-500/10 rounded-xl mb-4">
          <AlertTriangle className="h-3.5 w-3.5 text-yellow-500 flex-shrink-0 mt-0.5" />
          <span>AI-generated heritage information. Verify against authoritative sources (ASI, UNESCO, academic publications) for accuracy.</span>
        </div>

        {/* Input Area */}
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
              placeholder="Ask about any heritage site, history, architecture..."
              className="w-full bg-heritage-card border border-heritage-border rounded-2xl px-5 py-3.5 pr-12 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold/50 transition-colors"
            />
          </div>
          <button onClick={handleVoice} className="p-3.5 bg-heritage-card border border-heritage-border rounded-2xl text-gray-400 hover:text-white hover:border-white/20 transition-all">
            <Mic className="h-5 w-5" />
          </button>
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || isTyping}
            className="p-3.5 bg-gold hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed text-heritage-dark rounded-2xl transition-all"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Click outside to close lang dropdown */}
      {langOpen && <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />}
    </div>
  );
};

export default AIGuidePage;
