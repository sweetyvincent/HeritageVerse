-- heritageverse schema
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    avatar_url TEXT,
    language_preference VARCHAR(10) DEFAULT 'en',
    points INT DEFAULT 0,
    badges JSONB DEFAULT '[]',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE heritage_sites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    location_name VARCHAR(255) NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    state VARCHAR(100),
    country VARCHAR(100) DEFAULT 'India',
    historical_period VARCHAR(100),
    category VARCHAR(100),
    short_description TEXT,
    full_description TEXT,
    cultural_significance TEXT,
    architecture_style VARCHAR(255),
    preservation_status VARCHAR(100),
    visitor_count INT DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE heritage_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    icon VARCHAR(255),
    description TEXT
);

CREATE TABLE historical_timeline (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    heritage_site_id UUID REFERENCES heritage_sites(id) ON DELETE CASCADE,
    year VARCHAR(50),
    event_title VARCHAR(255) NOT NULL,
    event_description TEXT,
    event_type VARCHAR(100)
);

CREATE TABLE heritage_media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    heritage_site_id UUID REFERENCES heritage_sites(id) ON DELETE CASCADE,
    media_type VARCHAR(50) NOT NULL,
    url TEXT NOT NULL,
    caption TEXT,
    is_primary BOOLEAN DEFAULT false
);

CREATE TABLE virtual_tours (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    heritage_site_id UUID REFERENCES heritage_sites(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    panorama_url TEXT NOT NULL,
    hotspots JSONB
);

CREATE TABLE tourist_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    heritage_site_id UUID REFERENCES heritage_sites(id) ON DELETE CASCADE,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    visit_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE itineraries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    sites JSONB NOT NULL,
    total_duration VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_visits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    heritage_site_id UUID REFERENCES heritage_sites(id) ON DELETE CASCADE,
    visited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    points_earned INT DEFAULT 0
);

CREATE TABLE badges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(255),
    criteria JSONB,
    points_required INT DEFAULT 0
);

CREATE TABLE user_badges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    badge_id UUID REFERENCES badges(id) ON DELETE CASCADE,
    earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE community_contributions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    location_name VARCHAR(255),
    media_urls JSONB,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE preservation_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    heritage_site_id UUID REFERENCES heritage_sites(id) ON DELETE SET NULL,
    issue_type VARCHAR(100),
    description TEXT,
    severity VARCHAR(50),
    status VARCHAR(50) DEFAULT 'reported',
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    media_urls JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ai_conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    session_id VARCHAR(255) NOT NULL,
    messages JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    heritage_site_id UUID REFERENCES heritage_sites(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    event_type VARCHAR(100)
);

-- Indexes
CREATE INDEX idx_heritage_slug ON heritage_sites(slug);
CREATE INDEX idx_reviews_site ON tourist_reviews(heritage_site_id);
CREATE INDEX idx_timeline_site ON historical_timeline(heritage_site_id);
CREATE INDEX idx_visits_user ON user_visits(user_id);
