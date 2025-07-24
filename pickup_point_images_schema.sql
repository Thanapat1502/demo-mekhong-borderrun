-- Pickup Point Images Table Schema
-- This table stores pickup point image metadata and references

CREATE TABLE IF NOT EXISTS pickup_point_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Image Information
  name TEXT NOT NULL,
  description TEXT,
  google_map_url TEXT,
  
  -- File Information
  url TEXT NOT NULL, -- Public URL from Supabase Storage
  storage_path TEXT, -- Path in Supabase Storage for deletion
  size INTEGER NOT NULL, -- File size in bytes
  type TEXT NOT NULL, -- MIME type (e.g., 'image/jpeg')
  
  -- Metadata
  alt_text TEXT, -- For accessibility
  display_order INTEGER DEFAULT 0, -- For ordering images
  is_active BOOLEAN DEFAULT true, -- For soft delete/hide
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_pickup_point_images_active ON pickup_point_images(is_active);
CREATE INDEX IF NOT EXISTS idx_pickup_point_images_order ON pickup_point_images(display_order);
CREATE INDEX IF NOT EXISTS idx_pickup_point_images_created_at ON pickup_point_images(created_at DESC);

-- Create trigger to automatically update updated_at timestamp
CREATE TRIGGER update_pickup_point_images_updated_at 
    BEFORE UPDATE ON pickup_point_images 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE pickup_point_images ENABLE ROW LEVEL SECURITY;

-- Create policies (adjust based on your authentication setup)
-- Allow public to read active images
CREATE POLICY "Allow public read for active pickup_point_images" 
ON pickup_point_images FOR SELECT 
USING (is_active = true);

-- Allow authenticated users to manage all images (for admin)
CREATE POLICY "Allow authenticated full access to pickup_point_images" 
ON pickup_point_images FOR ALL 
USING (auth.role() = 'authenticated');

-- Insert sample data for testing
INSERT INTO pickup_point_images (
  name, 
  description, 
  google_map_url,
  url,
  storage_path,
  size,
  type,
  alt_text,
  display_order,
  is_active
) VALUES 
(
  'Tha Pae Gate',
  'Historic gate and popular pickup point in the old city of Chiang Mai',
  'https://maps.google.com/?q=Tha+Pae+Gate+Chiang+Mai',
  '/images/pickup-points/tha-pae-gate.jpg',
  'pickup-points/tha-pae-gate.jpg',
  245760,
  'image/jpeg',
  'Tha Pae Gate historic entrance in Chiang Mai old city',
  1,
  true
),
(
  'Central Festival Chiang Mai',
  'Modern shopping mall with convenient pickup location',
  'https://maps.google.com/?q=Central+Festival+Chiang+Mai',
  '/images/pickup-points/central-festival.jpg',
  'pickup-points/central-festival.jpg',
  198432,
  'image/jpeg',
  'Central Festival shopping mall entrance',
  2,
  true
),
(
  'MAYA Lifestyle Shopping Center',
  'Popular shopping center in Nimman area',
  'https://maps.google.com/?q=MAYA+Lifestyle+Shopping+Center+Chiang+Mai',
  '/images/pickup-points/maya-lifestyle.jpg',
  'pickup-points/maya-lifestyle.jpg',
  312576,
  'image/jpeg',
  'MAYA Lifestyle Shopping Center in Nimman',
  3,
  true
),
(
  'Chiang Mai Gate',
  'Southern gate of the old city wall',
  'https://maps.google.com/?q=Chiang+Mai+Gate',
  '/images/pickup-points/chiang-mai-gate.jpg',
  'pickup-points/chiang-mai-gate.jpg',
  267890,
  'image/jpeg',
  'Chiang Mai Gate southern entrance to old city',
  4,
  true
),
(
  'Chiang Mai Railway Station',
  'Main train station with easy access',
  'https://maps.google.com/?q=Chiang+Mai+Railway+Station',
  '/images/pickup-points/railway-station.jpg',
  'pickup-points/railway-station.jpg',
  189234,
  'image/jpeg',
  'Chiang Mai Railway Station main entrance',
  5,
  true
)
ON CONFLICT DO NOTHING;

-- Create a view for active images with ordering
CREATE OR REPLACE VIEW active_pickup_point_images AS
SELECT 
  id,
  name,
  description,
  google_map_url,
  url,
  size,
  type,
  alt_text,
  display_order,
  created_at,
  updated_at
FROM pickup_point_images
WHERE is_active = true
ORDER BY display_order ASC, created_at DESC;

-- Function to get next display order
CREATE OR REPLACE FUNCTION get_next_pickup_image_order()
RETURNS INTEGER AS $$
BEGIN
  RETURN COALESCE(
    (SELECT MAX(display_order) + 1 FROM pickup_point_images WHERE is_active = true),
    1
  );
END;
$$ LANGUAGE plpgsql;
