-- Admin Dashboard Database Schema
-- Run this in your Supabase SQL Editor to create the required tables

-- =====================================================
-- 1. CONTACT REQUESTS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS contact_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Customer Information
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  
  -- Request Details
  message TEXT NOT NULL,
  service_type TEXT, -- e.g., 'Border Run', 'Custom Tour', etc.
  preferred_date TEXT, -- Flexible text field for date preferences
  number_of_people INTEGER,
  
  -- Request Management
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'confirmed', 'completed', 'cancelled')),
  
  -- Additional Fields
  special_requirements TEXT,
  pickup_location TEXT,
  budget_range TEXT,
  admin_notes TEXT,
  follow_up_date DATE,
  assigned_to TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 2. WEBSITE ANALYTICS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS website_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Date (unique per day)
  date DATE NOT NULL UNIQUE,
  
  -- Traffic Metrics
  page_views INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  sessions INTEGER DEFAULT 0,
  bounce_rate DECIMAL(5,2) DEFAULT 0.00,
  
  -- User Engagement
  avg_session_duration INTEGER DEFAULT 0,
  pages_per_session DECIMAL(4,2) DEFAULT 0.00,
  
  -- Contact & Conversion Metrics
  contact_form_submissions INTEGER DEFAULT 0,
  booking_inquiries INTEGER DEFAULT 0,
  phone_clicks INTEGER DEFAULT 0,
  whatsapp_clicks INTEGER DEFAULT 0,
  email_clicks INTEGER DEFAULT 0,
  
  -- Traffic Sources
  organic_traffic INTEGER DEFAULT 0,
  direct_traffic INTEGER DEFAULT 0,
  social_traffic INTEGER DEFAULT 0,
  referral_traffic INTEGER DEFAULT 0,
  paid_traffic INTEGER DEFAULT 0,
  
  -- Device Analytics
  mobile_visitors INTEGER DEFAULT 0,
  desktop_visitors INTEGER DEFAULT 0,
  tablet_visitors INTEGER DEFAULT 0,
  
  -- Geographic Data
  thailand_visitors INTEGER DEFAULT 0,
  international_visitors INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 3. INDEXES FOR PERFORMANCE
-- =====================================================

-- Contact Requests Indexes
CREATE INDEX IF NOT EXISTS idx_contact_requests_status ON contact_requests(status);
CREATE INDEX IF NOT EXISTS idx_contact_requests_created_at ON contact_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_requests_email ON contact_requests(email);
CREATE INDEX IF NOT EXISTS idx_contact_requests_service_type ON contact_requests(service_type);

-- Website Analytics Indexes
CREATE INDEX IF NOT EXISTS idx_website_analytics_date ON website_analytics(date DESC);
CREATE INDEX IF NOT EXISTS idx_website_analytics_created_at ON website_analytics(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_website_analytics_unique_visitors ON website_analytics(unique_visitors DESC);

-- =====================================================
-- 4. TRIGGERS FOR AUTO-UPDATE TIMESTAMPS
-- =====================================================

-- Create function for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers
CREATE TRIGGER update_contact_requests_updated_at 
    BEFORE UPDATE ON contact_requests 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_website_analytics_updated_at 
    BEFORE UPDATE ON website_analytics 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 5. ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS
ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_analytics ENABLE ROW LEVEL SECURITY;

-- Policies for contact_requests
CREATE POLICY "Allow public insert for contact_requests" 
ON contact_requests FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow all for contact_requests" 
ON contact_requests FOR ALL 
USING (true);

-- Policies for website_analytics
CREATE POLICY "Allow all for website_analytics" 
ON website_analytics FOR ALL 
USING (true);

-- =====================================================
-- 6. SAMPLE DATA
-- =====================================================

-- Sample Contact Requests
INSERT INTO contact_requests (name, email, phone, message, service_type, preferred_date, number_of_people, status, pickup_location) VALUES 
('John Smith', 'john.smith@email.com', '+1-555-0123', 'Hi, I need a border run service for tomorrow. Can you help?', 'Border Run', 'Tomorrow', 2, 'new', 'Tha Pae Gate'),
('Sarah Johnson', 'sarah.j@email.com', '+44-7700-900123', 'Looking for border run service next week. What are your rates?', 'Border Run', 'Next week', 4, 'contacted', 'Central Festival'),
('Mike Chen', 'mike.chen@email.com', '+86-138-0013-8000', 'Need border run for family of 4. When is your next available date?', 'Border Run', 'This Friday', 4, 'confirmed', 'MAYA Lifestyle'),
('Emma Wilson', 'emma.w@email.com', '+61-4-1234-5678', 'Border run service inquiry for this Friday', 'Border Run', 'This Friday', 1, 'new', 'Chiang Mai Gate'),
('David Brown', 'david.brown@email.com', '+1-555-0456', 'Completed border run last week. Thank you for excellent service!', 'Border Run', 'Next month', 2, 'completed', 'Tha Pae Gate')
ON CONFLICT DO NOTHING;

-- Sample Website Analytics (Last 30 days)
INSERT INTO website_analytics (date, page_views, unique_visitors, sessions, contact_form_submissions, booking_inquiries, phone_clicks, whatsapp_clicks, email_clicks, mobile_visitors, desktop_visitors, thailand_visitors, international_visitors) VALUES 
(CURRENT_DATE - INTERVAL '29 days', 45, 32, 28, 2, 1, 5, 8, 3, 18, 14, 25, 7),
(CURRENT_DATE - INTERVAL '28 days', 52, 38, 35, 1, 0, 7, 12, 4, 22, 16, 28, 10),
(CURRENT_DATE - INTERVAL '27 days', 38, 28, 25, 0, 0, 4, 6, 2, 16, 12, 20, 8),
(CURRENT_DATE - INTERVAL '26 days', 61, 45, 40, 3, 2, 9, 15, 6, 28, 17, 35, 10),
(CURRENT_DATE - INTERVAL '25 days', 48, 35, 32, 1, 1, 6, 10, 4, 20, 15, 26, 9),
(CURRENT_DATE - INTERVAL '24 days', 55, 42, 38, 2, 1, 8, 13, 5, 24, 18, 30, 12),
(CURRENT_DATE - INTERVAL '23 days', 43, 31, 28, 1, 0, 5, 9, 3, 18, 13, 22, 9),
(CURRENT_DATE - INTERVAL '22 days', 67, 51, 45, 4, 3, 11, 18, 7, 32, 19, 38, 13),
(CURRENT_DATE - INTERVAL '21 days', 39, 29, 26, 0, 0, 4, 7, 2, 17, 12, 21, 8),
(CURRENT_DATE - INTERVAL '20 days', 58, 44, 39, 2, 1, 8, 14, 5, 26, 18, 33, 11),
(CURRENT_DATE - INTERVAL '19 days', 46, 34, 31, 1, 1, 6, 11, 4, 20, 14, 25, 9),
(CURRENT_DATE - INTERVAL '18 days', 53, 40, 36, 2, 1, 7, 12, 4, 23, 17, 29, 11),
(CURRENT_DATE - INTERVAL '17 days', 41, 30, 27, 1, 0, 5, 8, 3, 18, 12, 22, 8),
(CURRENT_DATE - INTERVAL '16 days', 62, 47, 42, 3, 2, 9, 16, 6, 29, 18, 35, 12),
(CURRENT_DATE - INTERVAL '15 days', 49, 36, 33, 1, 1, 6, 11, 4, 21, 15, 27, 9),
(CURRENT_DATE - INTERVAL '14 days', 56, 43, 38, 2, 1, 8, 13, 5, 25, 18, 31, 12),
(CURRENT_DATE - INTERVAL '13 days', 44, 32, 29, 1, 0, 5, 9, 3, 19, 13, 23, 9),
(CURRENT_DATE - INTERVAL '12 days', 68, 52, 46, 4, 3, 11, 19, 7, 33, 19, 39, 13),
(CURRENT_DATE - INTERVAL '11 days', 40, 30, 27, 0, 0, 4, 7, 2, 18, 12, 22, 8),
(CURRENT_DATE - INTERVAL '10 days', 59, 45, 40, 2, 1, 8, 15, 5, 27, 18, 34, 11),
(CURRENT_DATE - INTERVAL '9 days', 47, 35, 32, 1, 1, 6, 11, 4, 21, 14, 26, 9),
(CURRENT_DATE - INTERVAL '8 days', 54, 41, 37, 2, 1, 7, 12, 4, 24, 17, 30, 11),
(CURRENT_DATE - INTERVAL '7 days', 42, 31, 28, 1, 0, 5, 8, 3, 18, 13, 23, 8),
(CURRENT_DATE - INTERVAL '6 days', 63, 48, 43, 3, 2, 9, 16, 6, 30, 18, 36, 12),
(CURRENT_DATE - INTERVAL '5 days', 50, 37, 34, 1, 1, 6, 11, 4, 22, 15, 28, 9),
(CURRENT_DATE - INTERVAL '4 days', 57, 44, 39, 2, 1, 8, 13, 5, 26, 18, 32, 12),
(CURRENT_DATE - INTERVAL '3 days', 45, 33, 30, 1, 0, 5, 9, 3, 19, 14, 24, 9),
(CURRENT_DATE - INTERVAL '2 days', 69, 53, 47, 4, 3, 11, 19, 7, 34, 19, 40, 13),
(CURRENT_DATE - INTERVAL '1 day', 41, 31, 28, 0, 0, 4, 7, 2, 18, 13, 23, 8),
(CURRENT_DATE, 35, 28, 25, 1, 1, 4, 7, 3, 16, 12, 21, 7)
ON CONFLICT (date) DO UPDATE SET
  page_views = EXCLUDED.page_views,
  unique_visitors = EXCLUDED.unique_visitors,
  sessions = EXCLUDED.sessions,
  contact_form_submissions = EXCLUDED.contact_form_submissions,
  booking_inquiries = EXCLUDED.booking_inquiries,
  phone_clicks = EXCLUDED.phone_clicks,
  whatsapp_clicks = EXCLUDED.whatsapp_clicks,
  email_clicks = EXCLUDED.email_clicks,
  mobile_visitors = EXCLUDED.mobile_visitors,
  desktop_visitors = EXCLUDED.desktop_visitors,
  thailand_visitors = EXCLUDED.thailand_visitors,
  international_visitors = EXCLUDED.international_visitors,
  updated_at = NOW();
