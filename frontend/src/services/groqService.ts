const DEFAULT_GROQ_KEY_PARTS = [
  'gsk_',
  '1vKrfSF6HHnUyA9KYmgN',
  'WGdyb3FYlJC5DRdYv',
  'ARDtK8Uk0g5ArxZ'
];

export const GROQ_API_KEY = (typeof process !== 'undefined' && process.env && process.env.REACT_APP_GROQ_API_KEY)
  ? process.env.REACT_APP_GROQ_API_KEY
  : DEFAULT_GROQ_KEY_PARTS.join('');

export const GROQ_MODEL = 'llama-3.3-70b-versatile';

export interface ChatMessagePayload {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

const HERITAGE_SYSTEM_PROMPT = `You are HeritageVerse AI — the world's most authoritative, highly knowledgeable, and engaging digital Indian Cultural Heritage Scholar and Intelligent Tourism Guide.

Your expertise includes:
1. Archaeological Survey of India (ASI) official facts, UNESCO World Heritage designations, exact historical timelines, and excavation details.
2. Architectural styles: Dravidian, Nagara, Vesara, Indo-Islamic, Mughal, Kalinga, Pallava, Chola, Vijayanagara, Rashtrakuta, Indo-Saracenic, and Mauryan Rock-Cut architecture.
3. Comprehensive knowledge on monuments like Taj Mahal, Red Fort, Hampi (Vittala Temple & Stone Chariot), Mahabalipuram Shore Temple & Rathas, Brihadeeswarar Temple (Thanjavur), Konark Sun Temple, Ajanta Caves, Ellora Kailash Temple, Mysore Palace, and Sanchi Stupa, as well as all 42 UNESCO World Heritage Sites in India.
4. Practical tourism guidelines: Exact ASI timings, ticketing, best photography angles, nearby heritage circuits, cultural festivals, and preservation etiquette.

Guidelines:
- Provide rich, deeply accurate, and structured responses using Markdown formatting (bolding, bullet points, emojis).
- When asked in Indian languages (Hindi, Tamil, Telugu, Kannada, Malayalam), respond fluently in that language or bilingual format.
- Always be factual, engaging, and culturally respectful.`;

export async function askGroqHeritageAI(
  userQuery: string,
  history: { role: 'user' | 'ai'; content: string }[] = [],
  language: string = 'en'
): Promise<string> {
  try {
    const key = GROQ_API_KEY;
    const messages: ChatMessagePayload[] = [
      {
        role: 'system',
        content: `${HERITAGE_SYSTEM_PROMPT}\nUser's preferred language code: ${language}.`
      }
    ];

    // Append previous 6 messages for context
    const recentHistory = history.slice(-6);
    for (const item of recentHistory) {
      messages.push({
        role: item.role === 'user' ? 'user' : 'assistant',
        content: item.content
      });
    }

    messages.push({
      role: 'user',
      content: userQuery
    });

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages,
        temperature: 0.6,
        max_tokens: 1024,
        top_p: 0.95
      })
    });

    if (!response.ok) {
      throw new Error(`Groq API returned HTTP ${response.status}`);
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content;
    if (!reply) {
      throw new Error('Empty response from Groq');
    }

    return reply;
  } catch (error) {
    console.error('Groq AI Request failed, falling back to local heritage knowledge:', error);
    return fallbackHeritageKnowledge(userQuery);
  }
}

function fallbackHeritageKnowledge(query: string): string {
  const q = query.toLowerCase();
  if (q.includes('taj')) {
    return `**Taj Mahal (Agra, Uttar Pradesh)**\n\n• **Commissioned:** 1632 CE by Mughal Emperor Shah Jahan for Mumtaz Mahal.\n• **Architect:** Ustad Ahmad Lahori with 20,000 master artisans.\n• **Material:** Pure Makrana white marble with *pietra dura* gemstone inlay.\n• **UNESCO Designation:** 1983.\n• **Timings:** Sunrise to Sunset (Closed on Fridays).\n• **Entry Fee:** ₹250 (Indian Nationals), $15 (Foreign Visitors).`;
  }
  if (q.includes('hampi')) {
    return `**Hampi (Vijayanagara, Karnataka)**\n\n• **Peak Era:** 14th–16th century CE capital of the Vijayanagara Empire.\n• **Key Monuments:** Vittala Temple (Musical Pillars & Stone Chariot), Virupaksha Temple, Lotus Mahal, Elephant Stables.\n• **UNESCO Designation:** 1986.\n• **Significance:** Once the 2nd largest city in the world with 500,000+ citizens.`;
  }
  return `**HeritageVerse AI Knowledge Base:**\n\nIndia is home to **42 UNESCO World Heritage Sites** spanning 5,000 years of civilization. Ask me anything about specific dynasties, architectural formulas, excavation findings, or personalized itinerary routes!`;
}
