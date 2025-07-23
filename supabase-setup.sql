-- Supabase Database Setup for Mekong Border Run
-- Run these commands in your Supabase SQL Editor

-- 1. Service Packages Table
CREATE TABLE IF NOT EXISTS service_packages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'THB',
  description TEXT,
  features TEXT[] DEFAULT '{}',
  duration TEXT,
  max_passengers INTEGER DEFAULT 4,
  is_popular BOOLEAN DEFAULT false,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Contact Info Table
CREATE TABLE IF NOT EXISTS contact_info (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('phone', 'email', 'whatsapp', 'line', 'address', 'website')),
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT false,
  is_public BOOLEAN DEFAULT true,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Owner Info Table
CREATE TABLE IF NOT EXISTS owner_info (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT DEFAULT 'Licensed Tour Operator',
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  whatsapp TEXT,
  line TEXT,
  avatar TEXT,
  bio TEXT,
  experience TEXT,
  languages TEXT[],
  certifications TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Contact Requests Table
CREATE TABLE IF NOT EXISTS contact_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  service_type TEXT,
  preferred_date TEXT,
  number_of_people INTEGER,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'confirmed', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Website Analytics Table
CREATE TABLE IF NOT EXISTS website_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL UNIQUE,
  page_views INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  contact_form_submissions INTEGER DEFAULT 0,
  booking_inquiries INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample data

-- Sample service package
INSERT INTO service_packages (name, price, currency, description, features, duration, max_passengers, is_popular, is_available)
VALUES (
  'Border Run Service',
  1500.00,
  'THB',
  'Professional border run service to Myanmar with same-day return',
  ARRAY['Professional driver', 'All documentation handled', 'Same day return', 'Pick-up from hotel', 'Air-conditioned vehicle'],
  '1 day',
  4,
  true,
  true
) ON CONFLICT DO NOTHING;

-- Sample owner info
INSERT INTO owner_info (name, title, email, phone, whatsapp)
VALUES (
  'Mekong Border Run Guide',
  'Licensed Tour Operator',
  'info@mekong-borderrun.com',
  '+66 (0) 95 102 9528',
  '+66 (0) 95 102 9528'
) ON CONFLICT DO NOTHING;

-- Sample contact info
INSERT INTO contact_info (type, label, value, is_primary, is_public)
VALUES 
  ('phone', 'Primary Phone', '+66 (0) 95 102 9528', true, true),
  ('email', 'Primary Email', 'info@mekong-borderrun.com', true, true),
  ('whatsapp', 'WhatsApp', '+66 (0) 95 102 9528', true, true),
  ('address', 'Business Address', 'Chiang Mai, Thailand', false, true)
ON CONFLICT DO NOTHING;

-- Sample analytics data for current month
INSERT INTO website_analytics (date, page_views, unique_visitors, contact_form_submissions, booking_inquiries)
VALUES 
  (CURRENT_DATE - INTERVAL '30 days', 45, 32, 2, 1),
  (CURRENT_DATE - INTERVAL '29 days', 52, 38, 1, 0),
  (CURRENT_DATE - INTERVAL '28 days', 38, 28, 0, 0),
  (CURRENT_DATE - INTERVAL '27 days', 61, 45, 3, 2),
  (CURRENT_DATE - INTERVAL '26 days', 48, 35, 1, 1),
  (CURRENT_DATE - INTERVAL '25 days', 55, 42, 2, 1),
  (CURRENT_DATE - INTERVAL '24 days', 43, 31, 1, 0),
  (CURRENT_DATE - INTERVAL '23 days', 67, 51, 4, 3),
  (CURRENT_DATE - INTERVAL '22 days', 39, 29, 0, 0),
  (CURRENT_DATE - INTERVAL '21 days', 58, 44, 2, 1),
  (CURRENT_DATE - INTERVAL '20 days', 46, 34, 1, 1),
  (CURRENT_DATE - INTERVAL '19 days', 53, 40, 2, 1),
  (CURRENT_DATE - INTERVAL '18 days', 41, 30, 1, 0),
  (CURRENT_DATE - INTERVAL '17 days', 62, 47, 3, 2),
  (CURRENT_DATE - INTERVAL '16 days', 49, 36, 1, 1),
  (CURRENT_DATE - INTERVAL '15 days', 56, 43, 2, 1),
  (CURRENT_DATE - INTERVAL '14 days', 44, 32, 1, 0),
  (CURRENT_DATE - INTERVAL '13 days', 68, 52, 4, 3),
  (CURRENT_DATE - INTERVAL '12 days', 40, 30, 0, 0),
  (CURRENT_DATE - INTERVAL '11 days', 59, 45, 2, 1),
  (CURRENT_DATE - INTERVAL '10 days', 47, 35, 1, 1),
  (CURRENT_DATE - INTERVAL '9 days', 54, 41, 2, 1),
  (CURRENT_DATE - INTERVAL '8 days', 42, 31, 1, 0),
  (CURRENT_DATE - INTERVAL '7 days', 63, 48, 3, 2),
  (CURRENT_DATE - INTERVAL '6 days', 50, 37, 1, 1),
  (CURRENT_DATE - INTERVAL '5 days', 57, 44, 2, 1),
  (CURRENT_DATE - INTERVAL '4 days', 45, 33, 1, 0),
  (CURRENT_DATE - INTERVAL '3 days', 69, 53, 4, 3),
  (CURRENT_DATE - INTERVAL '2 days', 41, 31, 0, 0),
  (CURRENT_DATE - INTERVAL '1 day', 60, 46, 2, 1),
  (CURRENT_DATE, 35, 28, 1, 1)
ON CONFLICT (date) DO NOTHING;

-- Sample contact requests
INSERT INTO contact_requests (name, email, phone, message, service_type, number_of_people, status)
VALUES 
  ('John Smith', 'john.smith@email.com', '+1-555-0123', 'Hi, I need a border run service for tomorrow. Can you help?', 'Border Run', 2, 'new'),
  ('Sarah Johnson', 'sarah.j@email.com', '+44-7700-900123', 'Looking for border run service next week. What are your rates?', 'Border Run', 1, 'contacted'),
  ('Mike Chen', 'mike.chen@email.com', '+86-138-0013-8000', 'Need border run for family of 4. When is your next available date?', 'Border Run', 4, 'confirmed'),
  ('Emma Wilson', 'emma.w@email.com', '+61-4-1234-5678', 'Border run service inquiry for this Friday', 'Border Run', 1, 'new'),
  ('David Brown', 'david.brown@email.com', '+1-555-0456', 'Completed border run last week. Thank you for excellent service!', 'Border Run', 2, 'completed')
ON CONFLICT DO NOTHING;

-- Enable Row Level Security (RLS) - Optional but recommended
ALTER TABLE service_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE owner_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_analytics ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (adjust as needed)
CREATE POLICY "Public read access for service_packages" ON service_packages FOR SELECT USING (true);
CREATE POLICY "Public read access for contact_info" ON contact_info FOR SELECT USING (is_public = true);
CREATE POLICY "Public read access for owner_info" ON owner_info FOR SELECT USING (true);

-- Admin policies (you'll need to adjust these based on your auth setup)
-- CREATE POLICY "Admin full access to contact_requests" ON contact_requests FOR ALL USING (auth.role() = 'admin');
-- CREATE POLICY "Admin full access to website_analytics" ON website_analytics FOR ALL USING (auth.role() = 'admin');

-- For now, allow all operations (remove in production and implement proper auth)
CREATE POLICY "Allow all for service_packages" ON service_packages FOR ALL USING (true);
CREATE POLICY "Allow all for contact_info" ON contact_info FOR ALL USING (true);
CREATE POLICY "Allow all for owner_info" ON owner_info FOR ALL USING (true);
CREATE POLICY "Allow all for contact_requests" ON contact_requests FOR ALL USING (true);
CREATE POLICY "Allow all for website_analytics" ON website_analytics FOR ALL USING (true);
