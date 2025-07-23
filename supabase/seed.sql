-- Seed data for Mekong Border Run application

-- Insert Hero Images
INSERT INTO hero_images (src, alt, title, description, priority) VALUES
('/image/home/other1.jpg', 'Mekong Border Run - Professional visa run service', 'Professional Border Run Service', 'Comfortable and reliable visa extension service', true),
('/image/home/other2.jpg', 'Chiang Mai to Laos border crossing', 'Chiang Mai to Laos', 'Daily departures to Huay Xai border', false),
('/image/home/other3.jpg', 'White Temple visit during border run', 'Cultural Experience', 'Visit the famous White Temple in Chiang Rai', false);

-- Insert Journey Images
INSERT INTO journey_images (src, alt, step, title, description, time) VALUES
('/image/home/commercial/commercial2.jpg', 'Book your border run in advance', '01', 'Book in Advance', 'Reserve your spot at least 24 hours before departure for guaranteed availability', '24h'),
('/image/home/commercial/commercial1.jpg', 'Professional pickup service in Chiang Mai', '02', 'Departure', 'Professional pickup from your accommodation in Chiang Mai', '09:30'),
('/image/home/commercial/commercial3.jpg', 'White Temple visit in Chiang Rai', '03', 'Cultural Stop', 'Lunch and visit to the magnificent White Temple in Chiang Rai', '12:30'),
('/image/home/commercial/commercial5.jpg', 'Border crossing at Chiang Khong to Huay Xai', '04', 'Border Crossing', 'Arrive at Chiang Khong and cross to Huay Xai, Laos', '15:30'),
('/image/home/commercial/commercial7.jpeg', 'Return journey to Chiang Mai with new visa stamp', '05', 'Return Journey', 'Begin comfortable return to Chiang Mai with new entry stamp', '16:00');

-- Insert Pickup Point Images
INSERT INTO pickup_point_images (src, alt, title, location, description, landmark, coordinates) VALUES
('/image/home/pickup/tha-pae-gate.jpg', 'Tha Pae Gate pickup point', 'Tha Pae Gate', 'Old City Center', 'Historic gate and popular meeting point in Chiang Mai''s old city', 'Famous ancient city gate', '{"lat": 18.7883, "lng": 98.9917}'),
('/image/home/pickup/central.webp', 'Central Festival Chiang Mai pickup point', 'Central Festival', 'Shopping Mall', 'Major shopping center with easy access and parking', 'Large shopping mall', '{"lat": 18.8021, "lng": 99.0158}'),
('/image/home/pickup/maya.jpg', 'Maya Lifestyle Shopping Center pickup point', 'Maya Lifestyle', 'Nimman Area', 'Modern shopping center in trendy Nimman district', 'Popular shopping destination', '{"lat": 18.7969, "lng": 98.9683}'),
('/image/home/pickup/downtown1.jpg', 'Downtown Chiang Mai pickup point', 'Downtown Area', 'City Center', 'Central business district with multiple pickup options', 'Business and commercial center', '{"lat": 18.7883, "lng": 98.9853}'),
('/image/home/pickup/chiang-mai-gate.webp', 'Chiang Mai Gate pickup point', 'Chiang Mai Gate', 'South Gate', 'Historic southern entrance to the old city', 'Ancient city gate', '{"lat": 18.7833, "lng": 98.9867}');

-- Insert Gallery Images
INSERT INTO gallery_images (src, alt, title, description, category, featured, aspect_ratio) VALUES
('/image/home/commercial/commercial1.jpg', 'Professional border run service vehicle', 'Professional Service', 'Comfortable air-conditioned vehicles for your journey', 'service', true, 'landscape'),
('/image/home/commercial/commercial2.jpg', 'Border crossing experience', 'Border Experience', 'Smooth and efficient border crossing process', 'journey', false, 'square'),
('/image/home/commercial/commercial4.jpg', 'Cultural sites during the journey', 'Cultural Highlights', 'Visit amazing cultural sites along the way', 'cultural', false, 'square'),
('/image/home/commercial/commercial6.jpg', 'Scenic views during border run', 'Scenic Journey', 'Beautiful landscapes throughout the trip', 'destination', false, 'square'),
('/image/home/commercial/commercial8.jpg', 'Professional border run team', 'Expert Guidance', 'Experienced team to assist with all procedures', 'service', false, 'square'),
('/image/home/commercial/commercial9.JPG', 'Border crossing documentation', 'Documentation Support', 'Complete assistance with visa and border procedures', 'service', false, 'square'),
('/image/home/commercial/commercial10.jpg', 'Return journey comfort', 'Comfortable Return', 'Relaxing journey back to Chiang Mai', 'journey', false, 'square');

-- Insert Customer Reviews
INSERT INTO customer_reviews (name, country, avatar, rating, review, date, verified, trip_date) VALUES
('Sarah Johnson', 'Australia', 'https://i.pravatar.cc/150?img=1', 5, 'Excellent service! The driver was professional and the trip was smooth. Made my visa run stress-free.', '2024-01-15', true, '2024-01-10'),
('Mark Thompson', 'UK', 'https://i.pravatar.cc/150?img=3', 5, 'Highly recommend Mekong Transfer. On time pickup, comfortable vehicle, and great value for money.', '2024-01-10', true, '2024-01-08'),
('Lisa Chen', 'Canada', 'https://i.pravatar.cc/150?img=5', 5, 'Professional service from start to finish. The White Temple stop was a nice bonus!', '2024-01-08', true, '2024-01-05'),
('David Miller', 'USA', 'https://i.pravatar.cc/150?img=7', 5, 'Smooth border crossing experience. The guide was helpful and knowledgeable throughout the journey.', '2024-01-05', true, '2024-01-03'),
('Emma Wilson', 'New Zealand', 'https://i.pravatar.cc/150?img=9', 5, 'Perfect for visa extension! Everything was handled professionally and efficiently.', '2024-01-03', true, '2024-01-01'),
('James Brown', 'Ireland', 'https://i.pravatar.cc/150?img=11', 5, 'Great communication, punctual service, and comfortable transport. Will use again!', '2024-01-01', true, '2023-12-28');

-- Insert Service Packages
INSERT INTO service_packages (name, price, currency, description, features, duration, max_passengers, is_popular, is_available) VALUES
('Standard Border Run', 4200.00, 'THB', 'Complete visa extension service with cultural experience', 
'["Professional pickup from your location", "Air-conditioned vehicle", "White Temple visit in Chiang Rai", "Lunch included", "Border crossing assistance", "Return to Chiang Mai", "Licensed TAT operator"]', 
'Full Day (8-9 hours)', 8, true, true),
('Premium Border Run', 5500.00, 'THB', 'Enhanced service with additional comfort and flexibility', 
'["All Standard features", "Private vehicle option", "Flexible pickup time", "Premium lunch", "Personal border assistant", "Photo service at White Temple", "Refreshments during journey"]', 
'Full Day (8-9 hours)', 4, false, true);

-- Insert Contact Info
INSERT INTO contact_info (type, label, value, is_primary, is_public, description) VALUES
('phone', 'Primary Phone', '+66 95 102 9528', true, true, 'Main contact number for bookings and inquiries'),
('email', 'Primary Email', 'mekongborderrun@gmail.com', true, true, 'Main email for bookings and support'),
('whatsapp', 'WhatsApp', '+66 95 102 9528', false, true, 'Quick messaging and support'),
('line', 'LINE Official', '@mekongborderrun', false, true, 'LINE official account for Thai customers'),
('address', 'Office Address', 'Chiang Mai, Thailand', true, true, 'Main office location');

-- Insert Owner Info
INSERT INTO owner_info (name, title, email, phone, whatsapp, line, bio, experience, languages, certifications) VALUES
('Mekong Border Run Team', 'Licensed Border Run Operator', 'mekongborderrun@gmail.com', '+66 95 102 9528', '+66 95 102 9528', '@mekongborderrun', 
'Professional visa extension service provider with years of experience in Thailand-Laos border crossings.', '5+ years', 
'["English", "Thai", "Basic Lao"]', '["TAT Licensed Operator", "Tourism Business License"]');

-- Insert Business Info
INSERT INTO business_info (business_name, tat_license, address, coordinates, operating_hours, social_media) VALUES
('Mekong Border Run', 'TAT-XXXX-XXXX', 
'{"street": "Chiang Mai", "city": "Chiang Mai", "province": "Chiang Mai", "postalCode": "50000", "country": "Thailand"}',
'{"lat": 18.7883, "lng": 98.9853}',
'{"monday": {"open": "08:00", "close": "18:00", "isOpen": true}, "tuesday": {"open": "08:00", "close": "18:00", "isOpen": true}, "wednesday": {"open": "08:00", "close": "18:00", "isOpen": true}, "thursday": {"open": "08:00", "close": "18:00", "isOpen": true}, "friday": {"open": "08:00", "close": "18:00", "isOpen": true}, "saturday": {"open": "08:00", "close": "18:00", "isOpen": true}, "sunday": {"open": "08:00", "close": "18:00", "isOpen": true}}',
'{"facebook": "https://facebook.com/mekongborderrun", "instagram": "https://instagram.com/mekongborderrun"}');

-- Insert Pricing Tiers
INSERT INTO pricing_tiers (name, base_price, currency, description, features) VALUES
('Individual', 4200.00, 'THB', 'Perfect for solo travelers', '["Shared transportation", "All standard inclusions", "Group experience"]'),
('Couple', 4000.00, 'THB', 'Special rate for two people', '["Shared transportation", "All standard inclusions", "Couple discount applied"]'),
('Group (4+)', 3800.00, 'THB', 'Best value for groups', '["Shared transportation", "All standard inclusions", "Group discount applied"]');
