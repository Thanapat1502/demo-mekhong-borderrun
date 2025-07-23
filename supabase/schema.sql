-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Hero Images Table
CREATE TABLE hero_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    src TEXT NOT NULL,
    alt TEXT NOT NULL,
    title TEXT,
    description TEXT,
    priority BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Journey Images Table
CREATE TABLE journey_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    src TEXT NOT NULL,
    alt TEXT NOT NULL,
    step TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    time TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Pickup Point Images Table
CREATE TABLE pickup_point_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    src TEXT NOT NULL,
    alt TEXT NOT NULL,
    title TEXT NOT NULL,
    location TEXT NOT NULL,
    description TEXT NOT NULL,
    landmark TEXT,
    coordinates JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Gallery Images Table
CREATE TABLE gallery_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    src TEXT NOT NULL,
    alt TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('journey', 'destination', 'service', 'cultural')),
    featured BOOLEAN DEFAULT FALSE,
    aspect_ratio TEXT CHECK (aspect_ratio IN ('square', 'landscape', 'portrait')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Customer Reviews Table
CREATE TABLE customer_reviews (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    country TEXT NOT NULL,
    avatar TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review TEXT NOT NULL,
    date DATE NOT NULL,
    verified BOOLEAN DEFAULT FALSE,
    trip_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Service Packages Table
CREATE TABLE service_packages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    currency TEXT NOT NULL DEFAULT 'THB',
    description TEXT NOT NULL,
    features JSONB NOT NULL,
    duration TEXT NOT NULL,
    max_passengers INTEGER NOT NULL,
    is_popular BOOLEAN DEFAULT FALSE,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Pricing Tiers Table
CREATE TABLE pricing_tiers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    base_price DECIMAL(10,2) NOT NULL,
    currency TEXT NOT NULL DEFAULT 'THB',
    description TEXT NOT NULL,
    features JSONB NOT NULL,
    limitations JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact Info Table
CREATE TABLE contact_info (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type TEXT NOT NULL CHECK (type IN ('phone', 'email', 'whatsapp', 'line', 'address', 'website')),
    label TEXT NOT NULL,
    value TEXT NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    is_public BOOLEAN DEFAULT TRUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Owner Info Table
CREATE TABLE owner_info (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    whatsapp TEXT,
    line TEXT,
    avatar TEXT,
    bio TEXT,
    experience TEXT,
    languages JSONB,
    certifications JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Business Info Table
CREATE TABLE business_info (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_name TEXT NOT NULL,
    registration_number TEXT,
    tat_license TEXT,
    address JSONB NOT NULL,
    coordinates JSONB,
    operating_hours JSONB NOT NULL,
    social_media JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_hero_images_priority ON hero_images(priority);
CREATE INDEX idx_journey_images_step ON journey_images(step);
CREATE INDEX idx_gallery_images_category ON gallery_images(category);
CREATE INDEX idx_gallery_images_featured ON gallery_images(featured);
CREATE INDEX idx_customer_reviews_rating ON customer_reviews(rating);
CREATE INDEX idx_customer_reviews_verified ON customer_reviews(verified);
CREATE INDEX idx_service_packages_popular ON service_packages(is_popular);
CREATE INDEX idx_service_packages_available ON service_packages(is_available);
CREATE INDEX idx_contact_info_type ON contact_info(type);
CREATE INDEX idx_contact_info_primary ON contact_info(is_primary);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_hero_images_updated_at BEFORE UPDATE ON hero_images FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_journey_images_updated_at BEFORE UPDATE ON journey_images FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_pickup_point_images_updated_at BEFORE UPDATE ON pickup_point_images FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_gallery_images_updated_at BEFORE UPDATE ON gallery_images FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_customer_reviews_updated_at BEFORE UPDATE ON customer_reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_service_packages_updated_at BEFORE UPDATE ON service_packages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_pricing_tiers_updated_at BEFORE UPDATE ON pricing_tiers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_info_updated_at BEFORE UPDATE ON contact_info FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_owner_info_updated_at BEFORE UPDATE ON owner_info FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_business_info_updated_at BEFORE UPDATE ON business_info FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE hero_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE journey_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE pickup_point_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE owner_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_info ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public read access" ON hero_images FOR SELECT USING (true);
CREATE POLICY "Public read access" ON journey_images FOR SELECT USING (true);
CREATE POLICY "Public read access" ON pickup_point_images FOR SELECT USING (true);
CREATE POLICY "Public read access" ON gallery_images FOR SELECT USING (true);
CREATE POLICY "Public read access" ON customer_reviews FOR SELECT USING (true);
CREATE POLICY "Public read access" ON service_packages FOR SELECT USING (true);
CREATE POLICY "Public read access" ON pricing_tiers FOR SELECT USING (true);
CREATE POLICY "Public read access" ON contact_info FOR SELECT USING (is_public = true);
CREATE POLICY "Public read access" ON owner_info FOR SELECT USING (true);
CREATE POLICY "Public read access" ON business_info FOR SELECT USING (true);

-- Note: Add admin policies for INSERT, UPDATE, DELETE operations
-- These should be restricted to authenticated admin users
