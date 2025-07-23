-- Contact Requests Table Schema
-- This table stores all contact form submissions and booking inquiries

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
  special_requirements TEXT, -- Any special needs or requests
  pickup_location TEXT, -- Preferred pickup location
  budget_range TEXT, -- Customer's budget expectations
  
  -- Admin Notes
  admin_notes TEXT, -- Internal notes for admin use
  follow_up_date DATE, -- When to follow up
  assigned_to TEXT, -- Staff member assigned to handle this request
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contact_requests_status ON contact_requests(status);
CREATE INDEX IF NOT EXISTS idx_contact_requests_created_at ON contact_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_requests_email ON contact_requests(email);
CREATE INDEX IF NOT EXISTS idx_contact_requests_service_type ON contact_requests(service_type);

-- Create trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_contact_requests_updated_at 
    BEFORE UPDATE ON contact_requests 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;

-- Create policies (adjust based on your authentication setup)
-- Allow public to insert (for contact form submissions)
CREATE POLICY "Allow public insert for contact_requests" 
ON contact_requests FOR INSERT 
WITH CHECK (true);

-- Allow authenticated users to read all (for admin dashboard)
CREATE POLICY "Allow authenticated read for contact_requests" 
ON contact_requests FOR SELECT 
USING (auth.role() = 'authenticated');

-- Allow authenticated users to update (for admin management)
CREATE POLICY "Allow authenticated update for contact_requests" 
ON contact_requests FOR UPDATE 
USING (auth.role() = 'authenticated');

-- Insert sample data for testing
INSERT INTO contact_requests (
  name, 
  email, 
  phone, 
  message, 
  service_type, 
  preferred_date, 
  number_of_people, 
  status,
  pickup_location,
  special_requirements
) VALUES 
(
  'John Smith',
  'john.smith@email.com',
  '+1-555-0123',
  'Hi, I need a border run service for tomorrow. Can you help? I have a visa that expires soon.',
  'Border Run',
  'Tomorrow or ASAP',
  2,
  'new',
  'Tha Pae Gate',
  'Need early morning pickup'
),
(
  'Sarah Johnson',
  'sarah.j@email.com',
  '+44-7700-900123',
  'Looking for border run service next week. What are your rates for a group?',
  'Border Run',
  'Next week (flexible)',
  4,
  'contacted',
  'Central Festival',
  'Group of 4 friends'
),
(
  'Mike Chen',
  'mike.chen@email.com',
  '+86-138-0013-8000',
  'Need border run for family of 4. When is your next available date? We prefer morning departure.',
  'Border Run',
  'This Friday',
  4,
  'confirmed',
  'MAYA Lifestyle',
  'Family with 2 children (ages 8, 12)'
),
(
  'Emma Wilson',
  'emma.w@email.com',
  '+61-4-1234-5678',
  'Border run service inquiry for this Friday. Is same-day return possible?',
  'Border Run',
  'This Friday',
  1,
  'new',
  'Chiang Mai Gate',
  NULL
),
(
  'David Brown',
  'david.brown@email.com',
  '+1-555-0456',
  'Completed border run last week. Thank you for excellent service! Would like to book again.',
  'Border Run',
  'Next month',
  2,
  'completed',
  'Tha Pae Gate',
  'Repeat customer'
)
ON CONFLICT DO NOTHING;
