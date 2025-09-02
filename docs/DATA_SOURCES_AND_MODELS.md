# Data Sources and JSON Schema Models

## Overview
This document outlines all data sources currently used by the Mekong Border Run website and provides TypeScript interfaces and JSON schema models for static data implementation.

## Current Data Flow

### Zustand Stores → Supabase Services → Database Tables

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Zustand       │    │   Supabase       │    │   Database      │
│   Stores        │───▶│   Services       │───▶│   Tables        │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## Data Models and Sources

### 1. Hero Images
**Store**: `contentStore.ts`
**Service**: `heroImagesService`
**Table**: `hero_images`

```typescript
interface HeroImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
  priority?: boolean;
}
```

**JSON Schema**:
```json
{
  "type": "object",
  "properties": {
    "id": { "type": "string" },
    "src": { "type": "string" },
    "alt": { "type": "string" },
    "title": { "type": "string" },
    "description": { "type": "string" },
    "priority": { "type": "boolean" }
  },
  "required": ["id", "src", "alt"]
}
```

### 2. Journey Images
**Store**: `contentStore.ts`
**Service**: `journeyImagesService`
**Table**: `journey_images`

```typescript
interface JourneyImage {
  id: string;
  src: string;
  alt: string;
  step: string;
  title: string;
  description: string;
  time: string;
}
```

### 3. Pickup Point Images
**Store**: `contentStore.ts`
**Service**: `pickupPointImagesService`
**Table**: `pickup_point_images`

```typescript
interface PickupPointImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  location: string;
  description: string;
  google_map_url?: string;
  landmark?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}
```

### 4. Gallery Images
**Store**: `contentStore.ts`
**Service**: `galleryImagesService`
**Table**: `gallery_images`

```typescript
interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  description: string;
  category: "journey" | "destination" | "service" | "cultural";
  featured?: boolean;
  aspectRatio?: "square" | "landscape" | "portrait";
}
```

### 5. Customer Reviews
**Store**: `contentStore.ts`
**Service**: `customerReviewsService`
**Table**: `customer_reviews`

```typescript
interface CustomerReviews {
  id: number;
  name: string;
  country: string;
  avatar: string;
  rating: number;
  review: string;
  date: string;
}
```

### 6. Service Packages
**Store**: `packageStore.ts`
**Service**: `servicePackagesService`
**Table**: `service_packages`

```typescript
interface ServicePackage {
  id: string;
  name: string;
  price: number;
  currency: string;
  description: string;
  features: string[];
  duration: string;
  maxPassengers: number;
  isPopular?: boolean;
  isAvailable?: boolean;
}
```

### 7. Web Configuration
**Store**: `webConfigStore.ts`
**Service**: Direct Supabase calls
**Table**: `web_config`

```typescript
interface WebConfig {
  website_title: string;
  website_description: string;
  business_hours: string;
  service_area: string;
  contact_email: string;
  contact_phone: string;
}
```

### 8. Contact Information
**Store**: `contactStore.ts`
**Service**: `contactInfoService`
**Table**: `contact_info`

```typescript
interface ContactInfo {
  id: string;
  type: "phone" | "email" | "address" | "social";
  label: string;
  value: string;
  is_primary: boolean;
  is_public: boolean;
  icon?: string;
}
```

### 9. Business Information
**Service**: `businessInfoService`
**Table**: `business_info`

```typescript
interface BusinessInfo {
  id: string;
  business_name: string;
  business_description: string;
  business_address: string;
  business_phone: string;
  business_email: string;
  business_hours: string;
  license_number?: string;
  tax_id?: string;
}
```

### 10. Owner Information
**Service**: `ownerInfoService`
**Table**: `owner_info`

```typescript
interface OwnerInfo {
  id: string;
  owner_name: string;
  owner_bio: string;
  owner_photo?: string;
  owner_experience: string;
  owner_languages: string[];
  owner_certifications?: string[];
}
```

## Static Data File Structure

### Proposed JSON File Organization
```
src/data/static/
├── hero-images.json
├── journey-images.json
├── pickup-points.json
├── gallery-images.json
├── customer-reviews.json
├── service-packages.json
├── web-config.json
├── contact-info.json
├── business-info.json
└── owner-info.json
```

## Data Transformation Requirements

### From Database to JSON
1. **Field Mapping**: Some database fields use snake_case, interfaces use camelCase
2. **Type Conversion**: Ensure proper data types in JSON
3. **Default Values**: Provide fallback values for optional fields
4. **Validation**: Ensure all required fields are present

### Key Transformations
- `max_passengers` → `maxPassengers`
- `is_popular` → `isPopular`
- `is_available` → `isAvailable`
- `aspect_ratio` → `aspectRatio`
- `google_map_url` → `google_map_url` (keep as is)

## Implementation Strategy

### Phase 1: Create JSON Files
1. Extract current data from existing TypeScript files
2. Create comprehensive JSON files with sample data
3. Ensure data matches existing interfaces

### Phase 2: Modify Zustand Stores
1. Replace Supabase service calls with JSON imports
2. Maintain existing store interfaces
3. Preserve error handling and loading states
4. Add local data validation

### Phase 3: Testing and Validation
1. Verify all components receive expected data
2. Test error scenarios
3. Ensure performance is maintained
4. Validate TypeScript types

## Benefits of Static Data Approach

1. **No API Dependencies**: Works without database connection
2. **Faster Loading**: No network requests for data
3. **Easier Development**: No need for database setup
4. **Version Control**: Data changes tracked in git
5. **Offline Capability**: Works without internet connection

## Considerations

1. **Data Updates**: Manual process to update JSON files
2. **Admin Interface**: Will need modification for static data
3. **Image References**: Ensure all image paths are valid
4. **Type Safety**: Maintain TypeScript interfaces for validation
