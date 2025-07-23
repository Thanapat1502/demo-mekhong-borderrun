-- Website Analytics Table Schema
-- This table stores daily website analytics and visitor data

CREATE TABLE IF NOT EXISTS website_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Date (unique per day)
  date DATE NOT NULL UNIQUE,
  
  -- Traffic Metrics
  page_views INTEGER DEFAULT 0, -- Total page views for the day
  unique_visitors INTEGER DEFAULT 0, -- Unique visitors for the day
  sessions INTEGER DEFAULT 0, -- Total sessions for the day
  bounce_rate DECIMAL(5,2) DEFAULT 0.00, -- Bounce rate percentage (0.00-100.00)
  
  -- User Engagement
  avg_session_duration INTEGER DEFAULT 0, -- Average session duration in seconds
  pages_per_session DECIMAL(4,2) DEFAULT 0.00, -- Average pages per session
  
  -- Contact & Conversion Metrics
  contact_form_submissions INTEGER DEFAULT 0, -- Contact form submissions
  booking_inquiries INTEGER DEFAULT 0, -- Booking inquiry submissions
  phone_clicks INTEGER DEFAULT 0, -- Phone number clicks
  whatsapp_clicks INTEGER DEFAULT 0, -- WhatsApp clicks
  email_clicks INTEGER DEFAULT 0, -- Email clicks
  
  -- Traffic Sources
  organic_traffic INTEGER DEFAULT 0, -- Organic search traffic
  direct_traffic INTEGER DEFAULT 0, -- Direct traffic
  social_traffic INTEGER DEFAULT 0, -- Social media traffic
  referral_traffic INTEGER DEFAULT 0, -- Referral traffic
  paid_traffic INTEGER DEFAULT 0, -- Paid advertising traffic
  
  -- Device & Browser Analytics
  mobile_visitors INTEGER DEFAULT 0, -- Mobile device visitors
  desktop_visitors INTEGER DEFAULT 0, -- Desktop visitors
  tablet_visitors INTEGER DEFAULT 0, -- Tablet visitors
  
  -- Geographic Data
  thailand_visitors INTEGER DEFAULT 0, -- Visitors from Thailand
  international_visitors INTEGER DEFAULT 0, -- International visitors
  
  -- Popular Pages (JSON field for flexibility)
  popular_pages JSONB DEFAULT '[]', -- Array of {page: string, views: number}
  
  -- Search Keywords (JSON field)
  search_keywords JSONB DEFAULT '[]', -- Array of {keyword: string, count: number}
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_website_analytics_date ON website_analytics(date DESC);
CREATE INDEX IF NOT EXISTS idx_website_analytics_created_at ON website_analytics(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_website_analytics_page_views ON website_analytics(page_views DESC);
CREATE INDEX IF NOT EXISTS idx_website_analytics_unique_visitors ON website_analytics(unique_visitors DESC);

-- Create GIN index for JSONB fields
CREATE INDEX IF NOT EXISTS idx_website_analytics_popular_pages ON website_analytics USING GIN (popular_pages);
CREATE INDEX IF NOT EXISTS idx_website_analytics_search_keywords ON website_analytics USING GIN (search_keywords);

-- Create trigger to automatically update updated_at timestamp
CREATE TRIGGER update_website_analytics_updated_at 
    BEFORE UPDATE ON website_analytics 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE website_analytics ENABLE ROW LEVEL SECURITY;

-- Create policies (adjust based on your authentication setup)
-- Allow authenticated users to read all (for admin dashboard)
CREATE POLICY "Allow authenticated read for website_analytics" 
ON website_analytics FOR SELECT 
USING (auth.role() = 'authenticated');

-- Allow authenticated users to insert/update (for analytics tracking)
CREATE POLICY "Allow authenticated write for website_analytics" 
ON website_analytics FOR ALL 
USING (auth.role() = 'authenticated');

-- Insert sample data for the last 30 days
INSERT INTO website_analytics (
  date, 
  page_views, 
  unique_visitors, 
  sessions,
  bounce_rate,
  avg_session_duration,
  pages_per_session,
  contact_form_submissions, 
  booking_inquiries,
  phone_clicks,
  whatsapp_clicks,
  email_clicks,
  organic_traffic,
  direct_traffic,
  social_traffic,
  referral_traffic,
  mobile_visitors,
  desktop_visitors,
  tablet_visitors,
  thailand_visitors,
  international_visitors,
  popular_pages,
  search_keywords
) VALUES 
-- Last 30 days of sample data
(CURRENT_DATE - INTERVAL '29 days', 45, 32, 28, 65.50, 180, 2.1, 2, 1, 5, 8, 3, 20, 15, 3, 2, 18, 12, 2, 25, 7, 
 '[{"page": "/", "views": 20}, {"page": "/our-services", "views": 15}, {"page": "/contact", "views": 10}]',
 '[{"keyword": "chiang mai border run", "count": 8}, {"keyword": "myanmar visa run", "count": 5}]'),

(CURRENT_DATE - INTERVAL '28 days', 52, 38, 35, 58.20, 195, 2.3, 1, 0, 7, 12, 4, 25, 18, 4, 3, 22, 14, 2, 28, 10,
 '[{"page": "/", "views": 25}, {"page": "/our-services", "views": 18}, {"page": "/gallery", "views": 9}]',
 '[{"keyword": "border run service", "count": 10}, {"keyword": "visa run thailand", "count": 6}]'),

(CURRENT_DATE - INTERVAL '27 days', 38, 28, 25, 71.40, 165, 1.9, 0, 0, 4, 6, 2, 18, 12, 2, 1, 16, 10, 2, 20, 8,
 '[{"page": "/", "views": 18}, {"page": "/contact", "views": 12}, {"page": "/our-services", "views": 8}]',
 '[{"keyword": "chiang mai visa run", "count": 7}, {"keyword": "border run myanmar", "count": 4}]'),

(CURRENT_DATE - INTERVAL '26 days', 61, 45, 40, 55.30, 220, 2.5, 3, 2, 9, 15, 6, 30, 22, 5, 4, 28, 15, 2, 35, 10,
 '[{"page": "/", "views": 30}, {"page": "/our-services", "views": 20}, {"page": "/contact", "views": 11}]',
 '[{"keyword": "professional border run", "count": 12}, {"keyword": "same day visa run", "count": 8}]'),

(CURRENT_DATE - INTERVAL '25 days', 48, 35, 32, 62.80, 185, 2.2, 1, 1, 6, 10, 4, 22, 16, 3, 2, 20, 13, 2, 26, 9,
 '[{"page": "/", "views": 22}, {"page": "/gallery", "views": 15}, {"page": "/our-services", "views": 11}]',
 '[{"keyword": "border run chiang mai", "count": 9}, {"keyword": "visa extension alternative", "count": 5}]'),

-- Continue with more sample data...
(CURRENT_DATE, 35, 28, 25, 67.20, 175, 2.0, 1, 1, 4, 7, 3, 18, 12, 2, 1, 16, 10, 2, 21, 7,
 '[{"page": "/", "views": 16}, {"page": "/our-services", "views": 12}, {"page": "/contact", "views": 7}]',
 '[{"keyword": "border run today", "count": 6}, {"keyword": "urgent visa run", "count": 4}]')

ON CONFLICT (date) DO UPDATE SET
  page_views = EXCLUDED.page_views,
  unique_visitors = EXCLUDED.unique_visitors,
  sessions = EXCLUDED.sessions,
  bounce_rate = EXCLUDED.bounce_rate,
  avg_session_duration = EXCLUDED.avg_session_duration,
  pages_per_session = EXCLUDED.pages_per_session,
  contact_form_submissions = EXCLUDED.contact_form_submissions,
  booking_inquiries = EXCLUDED.booking_inquiries,
  phone_clicks = EXCLUDED.phone_clicks,
  whatsapp_clicks = EXCLUDED.whatsapp_clicks,
  email_clicks = EXCLUDED.email_clicks,
  organic_traffic = EXCLUDED.organic_traffic,
  direct_traffic = EXCLUDED.direct_traffic,
  social_traffic = EXCLUDED.social_traffic,
  referral_traffic = EXCLUDED.referral_traffic,
  mobile_visitors = EXCLUDED.mobile_visitors,
  desktop_visitors = EXCLUDED.desktop_visitors,
  tablet_visitors = EXCLUDED.tablet_visitors,
  thailand_visitors = EXCLUDED.thailand_visitors,
  international_visitors = EXCLUDED.international_visitors,
  popular_pages = EXCLUDED.popular_pages,
  search_keywords = EXCLUDED.search_keywords,
  updated_at = NOW();

-- Create a view for monthly analytics summary
CREATE OR REPLACE VIEW monthly_analytics_summary AS
SELECT 
  DATE_TRUNC('month', date) as month,
  SUM(page_views) as total_page_views,
  SUM(unique_visitors) as total_unique_visitors,
  SUM(sessions) as total_sessions,
  AVG(bounce_rate) as avg_bounce_rate,
  AVG(avg_session_duration) as avg_session_duration,
  AVG(pages_per_session) as avg_pages_per_session,
  SUM(contact_form_submissions) as total_contact_submissions,
  SUM(booking_inquiries) as total_booking_inquiries,
  SUM(phone_clicks) as total_phone_clicks,
  SUM(whatsapp_clicks) as total_whatsapp_clicks,
  SUM(email_clicks) as total_email_clicks,
  ROUND((SUM(contact_form_submissions)::DECIMAL / SUM(unique_visitors)) * 100, 2) as conversion_rate
FROM website_analytics
GROUP BY DATE_TRUNC('month', date)
ORDER BY month DESC;
