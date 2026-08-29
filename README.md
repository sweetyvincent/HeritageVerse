# 🏛️ HeritageVerse – Digital Heritage Preservation and Tourism Platform

> *Preserve the Past. Experience the Present. Inspire the Future.*

HeritageVerse is a full-stack AI-powered digital heritage platform that combines cultural preservation, immersive tourism, 3D digital twins, and intelligent storytelling to create a world-class heritage experience.

---

## 🌟 Features

### Core Platform
- **Heritage Discovery** – Search and explore 500+ heritage sites with rich filtering
- **AI Heritage Guide** – Intelligent chatbot with heritage knowledge base (RAG architecture)
- **3D Digital Twins** – Interactive Three.js 3D models of heritage monuments
- **Virtual Tours** – 360° immersive tour experiences with hotspots
- **AR Experience** – Augmented reality interface for historical reconstruction
- **Smart Map** – Interactive OpenStreetMap with heritage site markers and routing

### User Experiences
- **Personalized Trip Planner** – AI-generated itineraries based on interests & time
- **Heritage Passport** – Gamified badges, points, and achievement system
- **AI Cultural Storytelling** – Convert history into engaging narratives
- **Multilingual Support** – English, Hindi, Tamil, Telugu, Kannada, Malayalam

### Community & Preservation
- **Community Stories** – Submit local stories, photos, and folk traditions
- **Preservation Reporting** – Report heritage damage with GPS and severity tracking
- **Admin Dashboard** – Analytics, site management, and report handling

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| React 18 + TypeScript | UI framework |
| Tailwind CSS | Styling system |
| Framer Motion | Animations |
| Three.js / @react-three/fiber | 3D visualization |
| React Leaflet + OpenStreetMap | Interactive maps |
| Recharts | Dashboard analytics |
| React Router v6 | Client-side routing |
| Lucide React | Icon library |
| React Hot Toast | Notifications |

### Backend
| Technology | Purpose |
|-----------|---------|
| Node.js + Express | REST API server |
| TypeScript | Type safety |
| PostgreSQL | Primary database |
| JWT + bcryptjs | Authentication |
| Helmet + Rate Limiting | Security |
| Multer | File uploads |
| Morgan | HTTP logging |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL 14+ (optional – app works with mock data)

### 1. Clone / Extract the Project
```bash
cd AASHAV
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials (optional)
npm run dev
```
Backend runs on **http://localhost:5000**

### 3. Frontend Setup
```bash
cd frontend
npm install
# Create .env file:
echo "REACT_APP_API_URL=http://localhost:5000" > .env
npm start
```
Frontend runs on **http://localhost:3000**

### 4. Database Setup (Optional)
```bash
cd backend
# Create the database
psql -U postgres -c "CREATE DATABASE heritageverse;"
# Run schema
psql -U postgres -d heritageverse -f src/database/schema.sql
# Seed with demo data
npm run seed
```

> **Note:** The application works fully in demo mode without a database. All mock data is embedded in the codebase.

---

## 📁 Project Structure

```
AASHAV/
├── README.md
├── backend/
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   └── src/
│       ├── index.ts              # Express server entry
│       ├── config/
│       │   └── database.ts       # PostgreSQL connection
│       ├── database/
│       │   ├── schema.sql        # Complete DB schema
│       │   └── seed.ts           # Demo data seeder
│       ├── middleware/
│       │   ├── auth.ts           # JWT middleware
│       │   ├── errorHandler.ts   # Global error handler
│       │   └── validation.ts     # Input validation
│       ├── routes/
│       │   ├── auth.ts           # Authentication endpoints
│       │   ├── heritage.ts       # Heritage site endpoints
│       │   ├── ai.ts             # AI chatbot endpoints
│       │   ├── map.ts            # Map data endpoints
│       │   ├── tourism.ts        # Trip planning endpoints
│       │   ├── gamification.ts   # Passport & badges
│       │   ├── community.ts      # Community contributions
│       │   ├── preservation.ts   # Preservation reports
│       │   └── admin.ts          # Admin dashboard
│       └── services/
│           └── aiService.ts      # AI service abstraction
└── frontend/
    ├── package.json
    ├── tailwind.config.js
    ├── public/
    └── src/
        ├── App.tsx               # Main app + routing
        ├── index.tsx             # Entry point
        ├── index.css             # Global styles
        ├── context/
        │   ├── AuthContext.tsx   # Authentication state
        │   └── LanguageContext.tsx # i18n support
        ├── data/
        │   ├── heritageSites.ts  # Mock heritage data
        │   ├── badges.ts         # Gamification data
        │   └── aiKnowledge.ts    # AI knowledge base
        ├── services/
        │   ├── api.ts            # Axios instance
        │   ├── heritageService.ts
        │   ├── aiService.ts
        │   ├── authService.ts
        │   └── mapService.ts
        ├── hooks/
        │   ├── useHeritageSites.ts
        │   ├── useAI.ts
        │   └── useGeolocation.ts
        ├── components/
        │   ├── layout/           # Navbar, Footer, Sidebar
        │   ├── heritage/         # Heritage cards, timeline
        │   ├── ai/               # Chatbot components
        │   ├── map/              # Map components
        │   ├── 3d/               # Three.js components
        │   ├── gamification/     # Passport, badges
        │   ├── dashboard/        # Admin components
        │   └── ui/               # Shared UI components
        └── pages/
            ├── LandingPage.tsx
            ├── ExplorePage.tsx
            ├── HeritageDetailPage.tsx
            ├── MapPage.tsx
            ├── VirtualTourPage.tsx
            ├── ThreeDViewerPage.tsx
            ├── ARExperiencePage.tsx
            ├── AIGuidePage.tsx
            ├── TripPlannerPage.tsx
            ├── PassportPage.tsx
            ├── CommunityPage.tsx
            ├── PreservationPage.tsx
            ├── ProfilePage.tsx
            ├── auth/             # Login, Register, Forgot
            └── dashboard/        # Admin pages
```

---

## 🎯 Demo Flow (Hackathon Judge Guide)

1. **Open** http://localhost:3000 → See impressive landing page
2. **Click "Explore Heritage"** → Browse 10 Indian heritage sites
3. **Click "Taj Mahal"** → View detailed heritage page
4. **Click "Historical Timeline"** tab → See events from 1631-1983
5. **Click "Explore in 3D"** → Interactive Three.js 3D viewer
6. **Click "Start Virtual Tour"** → 360° tour experience
7. **Click AI chat button** (bottom right) → Ask "Who built the Taj Mahal?"
8. **Navigate to Plan** → Generate 4-hour Agra itinerary
9. **Navigate to Map** → See all sites on interactive map
10. **Navigate to Passport** → View badges and earn Heritage Explorer badge
11. **Report an Issue** → Submit a preservation report
12. **Navigate to /dashboard** → View admin analytics

---

## 🌐 API Endpoints

### Authentication
```
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
PUT  /api/auth/profile
```

### Heritage
```
GET  /api/heritage/sites?search=&category=&page=
GET  /api/heritage/sites/featured
GET  /api/heritage/sites/:slug
GET  /api/heritage/categories
GET  /api/heritage/sites/:id/timeline
GET  /api/heritage/sites/:id/nearby
GET  /api/heritage/sites/:id/reviews
POST /api/heritage/sites/:id/reviews
```

### AI
```
POST /api/ai/chat
POST /api/ai/story/:siteId
POST /api/ai/itinerary
GET  /api/ai/suggestions/:siteId
```

### Tourism
```
POST /api/tourism/itinerary/generate
GET  /api/tourism/itineraries
POST /api/tourism/visit/:siteId
GET  /api/tourism/recommendations
```

### Map
```
GET /api/map/sites
GET /api/map/nearby?lat=&lng=&radius=
```

### Community & Preservation
```
GET  /api/community/contributions
POST /api/community/contributions
POST /api/preservation/reports
GET  /api/preservation/reports
```

### Admin
```
GET /api/admin/stats
GET /api/admin/analytics
GET /api/admin/users
GET /api/admin/reports
```

---

## 🔐 Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/heritageverse
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:3000
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=10485760
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_MAP_STYLE=osm
```

---

## 👥 User Roles

| Role | Access |
|------|--------|
| Tourist | Explore, tour, plan trips, earn badges |
| Student | All tourist features + educational content |
| Researcher | All + research data export |
| Community Contributor | All + submit community stories |
| Heritage Authority | All + review reports, manage sites |
| Admin | Full platform access + admin dashboard |

**Demo Accounts:**
- Admin: `admin@heritageverse.com` / `Heritage@123`
- Tourist: `tourist@heritageverse.com` / `Heritage@123`
- Authority: `authority@heritageverse.com` / `Heritage@123`

---

## 🏛️ Heritage Sites (Demo Data)

| Site | Location | Period | Category |
|------|----------|--------|----------|
| Taj Mahal | Agra, UP | 1632–1653 | Monument |
| Red Fort | Delhi | 1638–1648 | Fort |
| Hampi | Karnataka | 14th–16th century | Archaeological Site |
| Mahabalipuram | Tamil Nadu | 7th–8th century | Temples |
| Brihadeeswarar Temple | Thanjavur, TN | 1010 CE | Temple |
| Konark Sun Temple | Odisha | 1250 CE | Temple |
| Ajanta Caves | Maharashtra | 2nd BCE–5th CE | Caves |
| Ellora Caves | Maharashtra | 600–1000 CE | Caves |
| Mysore Palace | Karnataka | 1912 CE | Palace |
| Sanchi Stupa | Madhya Pradesh | 3rd BCE | Buddhist |

> ⚠️ **Demo Notice:** Historical information is provided for demonstration purposes. Verify against authoritative sources such as ASI, UNESCO, and academic publications.

---

## 🤖 AI Heritage Guide

The AI Heritage Guide uses a mock RAG (Retrieval-Augmented Generation) architecture:

1. **Knowledge Base** – Pre-indexed heritage facts for all 10 sites
2. **Query Processing** – Keyword matching against knowledge base
3. **Response Generation** – Context-aware heritage-specific answers
4. **Multilingual** – Stub translations for 6 languages

To connect a real LLM (Google Gemini, OpenAI, etc.):
- See `backend/src/services/aiService.ts`
- Replace the `mockGenerateResponse()` function with your API call
- The service interface remains the same

---

## 🗺️ Map Integration

Currently using OpenStreetMap (free, no API key required).

To switch to Mapbox:
1. Add `REACT_APP_MAPBOX_TOKEN` to frontend `.env`
2. Update `src/services/mapService.ts`
3. Replace React Leaflet with `react-map-gl`

---

## 📊 Database Schema

See `backend/src/database/schema.sql` for the complete PostgreSQL schema covering:
- Users with role-based access
- Heritage sites with geospatial data
- Historical timelines
- Media management
- Virtual tour definitions
- Gamification (badges, points)
- Community contributions
- Preservation reports
- AI conversation history

---

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy the `build` folder
```

### Backend (Railway/Render/Heroku)
```bash
cd backend
npm run build
# Deploy with DATABASE_URL and JWT_SECRET env vars
```

---

## 📝 License

Built for demonstration and hackathon purposes.

---

## 🙏 Acknowledgments

- Archaeological Survey of India (ASI)
- UNESCO World Heritage
- OpenStreetMap contributors
- Wikimedia Commons for heritage images

---

*HeritageVerse – Where Technology Meets Tradition* 🏛️
