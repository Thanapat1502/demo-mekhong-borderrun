-- Web Configuration Table Schema
-- Simple key-value store for website configuration settings

CREATE TABLE IF NOT EXISTS web_config (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Configuration key (unique identifier)
  key TEXT NOT NULL UNIQUE,
  
  -- Configuration value (stored as text, can be JSON for complex data)
  value TEXT,
  
  -- Optional description for admin reference
  description TEXT,
  
  -- Category for grouping settings
  category TEXT DEFAULT 'general',
  
  -- Data type hint for frontend validation
  type TEXT DEFAULT 'text', -- text, number, boolean, json, url, email, textarea
  
  -- Whether this setting is required
  is_required BOOLEAN DEFAULT false,
  
  -- Whether this setting is public (can be accessed by frontend)
  is_public BOOLEAN DEFAULT false,
  
  -- Display order for admin interface
  display_order INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_web_config_key ON web_config(key);
CREATE INDEX IF NOT EXISTS idx_web_config_category ON web_config(category);
CREATE INDEX IF NOT EXISTS idx_web_config_public ON web_config(is_public);

-- Create trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_web_config_updated_at 
    BEFORE UPDATE ON web_config 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE web_config ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow public to read public settings
CREATE POLICY "Allow public read for public web_config" 
ON web_config FOR SELECT 
USING (is_public = true);

-- Allow authenticated users to manage all settings (for admin)
CREATE POLICY "Allow authenticated full access to web_config" 
ON web_config FOR ALL 
USING (auth.role() = 'authenticated');

-- Insert default configuration settings
INSERT INTO web_config (key, value, description, category, type, is_required, is_public, display_order) VALUES 
-- Website Settings
('site_title', 'Mekong Border Run', 'Main website title', 'website', 'text', true, true, 1),
('site_description', 'Professional border run service from Chiang Mai to Huay Xai, Laos. Daily departures for visa extension with a licensed TAT operator.', 'Website meta description', 'website', 'textarea', true, true, 2),
('site_keywords', 'border run, visa extension, Chiang Mai, Laos, Huay Xai, Thailand visa, visa run service', 'SEO keywords', 'website', 'textarea', false, true, 3),
('site_url', 'https://mekong-borderrun.com', 'Main website URL', 'website', 'url', true, true, 4),
('contact_email', 'info@mekong-borderrun.com', 'Main contact email', 'website', 'email', true, true, 5),
('contact_phone', '+66 (0) 95 102 9528', 'Main contact phone', 'website', 'text', true, true, 6),
('whatsapp_number', '+66951029528', 'WhatsApp contact number', 'website', 'text', false, true, 7),
('facebook_url', '', 'Facebook page URL', 'website', 'url', false, true, 8),
('instagram_url', '', 'Instagram profile URL', 'website', 'url', false, true, 9),
('google_analytics_id', '', 'Google Analytics tracking ID', 'website', 'text', false, false, 10),

-- Business Settings
('business_hours_monday', '08:00-18:00', 'Monday business hours', 'business', 'text', true, true, 11),
('business_hours_tuesday', '08:00-18:00', 'Tuesday business hours', 'business', 'text', true, true, 12),
('business_hours_wednesday', '08:00-18:00', 'Wednesday business hours', 'business', 'text', true, true, 13),
('business_hours_thursday', '08:00-18:00', 'Thursday business hours', 'business', 'text', true, true, 14),
('business_hours_friday', '08:00-18:00', 'Friday business hours', 'business', 'text', true, true, 15),
('business_hours_saturday', '08:00-18:00', 'Saturday business hours', 'business', 'text', true, true, 16),
('business_hours_sunday', '08:00-18:00', 'Sunday business hours', 'business', 'text', true, true, 17),
('service_area_primary', 'Chiang Mai, Thailand', 'Primary service area', 'business', 'text', true, true, 18),
('service_area_secondary', 'Chiang Rai, Huay Xai (Laos)', 'Secondary service areas', 'business', 'text', false, true, 19),
('pickup_locations', '["Tha Pae Gate", "Central Festival", "MAYA Lifestyle", "Chiang Mai Gate", "Railway Station"]', 'Available pickup locations', 'business', 'json', true, true, 20),
('service_radius_km', '50', 'Service radius in kilometers', 'business', 'number', false, true, 21),
('tat_license_number', '21/01279', 'TAT license number', 'business', 'text', true, true, 22),
('company_registration', '', 'Company registration number', 'business', 'text', false, false, 23),

-- Pricing & Service Settings
('border_run_price', '1500', 'Standard border run price (THB)', 'pricing', 'number', true, true, 24),
('group_discount_threshold', '4', 'Minimum people for group discount', 'pricing', 'number', false, true, 25),
('group_discount_percentage', '10', 'Group discount percentage', 'pricing', 'number', false, true, 26),
('advance_booking_days', '1', 'Minimum advance booking days', 'pricing', 'number', true, true, 27),
('cancellation_hours', '24', 'Cancellation notice hours', 'pricing', 'number', true, true, 28),

-- Operational Settings
('daily_departure_time', '07:00', 'Daily departure time', 'operations', 'text', true, true, 29),
('estimated_return_time', '19:00', 'Estimated return time', 'operations', 'text', true, true, 30),
('max_passengers_per_trip', '15', 'Maximum passengers per trip', 'operations', 'number', true, false, 31),
('vehicle_type', 'Air-conditioned minivan', 'Type of vehicle used', 'operations', 'text', true, true, 32),
('border_crossing_point', 'Chiang Khong - Huay Xai', 'Border crossing point', 'operations', 'text', true, true, 33),

-- Emergency & Safety
('emergency_contact', '+66951029528', 'Emergency contact number', 'safety', 'text', true, false, 34),
('insurance_coverage', 'Full passenger insurance included', 'Insurance coverage details', 'safety', 'text', true, true, 35),
('covid_protocols', 'Following all health and safety guidelines', 'COVID-19 safety protocols', 'safety', 'textarea', false, true, 36)

ON CONFLICT (key) DO NOTHING;

-- Create a view for public settings (for frontend consumption)
CREATE OR REPLACE VIEW public_web_config AS
SELECT 
  key,
  value,
  description,
  category,
  type,
  updated_at
FROM web_config
WHERE is_public = true
ORDER BY category, display_order;

-- Create a view for admin settings (grouped by category)
CREATE OR REPLACE VIEW admin_web_config AS
SELECT 
  key,
  value,
  description,
  category,
  type,
  is_required,
  is_public,
  display_order,
  created_at,
  updated_at
FROM web_config
ORDER BY category, display_order;

-- Helper function to get a config value
CREATE OR REPLACE FUNCTION get_config_value(config_key TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN (SELECT value FROM web_config WHERE key = config_key LIMIT 1);
END;
$$ LANGUAGE plpgsql;

-- Helper function to set a config value
CREATE OR REPLACE FUNCTION set_config_value(config_key TEXT, config_value TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  INSERT INTO web_config (key, value) 
  VALUES (config_key, config_value)
  ON CONFLICT (key) 
  DO UPDATE SET value = config_value, updated_at = NOW();
  
  RETURN TRUE;
EXCEPTION
  WHEN OTHERS THEN
    RETURN FALSE;
END;
$$ LANGUAGE plpgsql;

-- Helper function to get config by category
CREATE OR REPLACE FUNCTION get_config_by_category(config_category TEXT)
RETURNS TABLE(key TEXT, value TEXT, description TEXT, type TEXT) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    wc.key,
    wc.value,
    wc.description,
    wc.type
  FROM web_config wc
  WHERE wc.category = config_category
  ORDER BY wc.display_order;
END;
$$ LANGUAGE plpgsql;
