# Mekong Border Run - Website Structure Documentation

## Overview
This is a Next.js 14 application for a border run service business in Chiang Mai, Thailand. The website has both public pages for customers and admin pages for content management.

## Project Structure

### Root Directory
```
demo-mekhong-borderrun/
├── src/                    # Source code
├── public/                 # Static assets
├── docs/                   # Documentation (this folder)
├── supabase/              # Database schemas
├── package.json           # Dependencies
├── tailwind.config.ts     # Tailwind CSS config
├── next.config.ts         # Next.js config
└── tsconfig.json          # TypeScript config
```

### Source Code Structure (`src/`)
```
src/
├── app/                   # Next.js App Router pages
│   ├── page.tsx          # Home page (main public page)
│   ├── layout.tsx        # Root layout
│   ├── globals.css       # Global styles
│   ├── admin/            # Admin section
│   │   ├── page.tsx      # Admin dashboard
│   │   ├── layout.tsx    # Admin layout
│   │   ├── login/        # Admin login
│   │   └── setup/        # Admin setup
│   ├── contact/          # Contact page
│   ├── customers/        # Customer testimonials page
│   ├── our-services/     # Services page
│   └── api/              # API routes
├── components/           # React components
├── store/               # Zustand state management
├── services/            # API services
├── lib/                 # Utility libraries
├── data/                # Static data files
└── contexts/            # React contexts
```

## Public Pages (Customer-Facing)

### 1. Home Page (`/`)
**File**: `src/app/page.tsx`
**Purpose**: Main landing page showcasing the border run service
**Sections**:
- Hero Section (rotating images)
- About Section (service overview)
- Journey Section (step-by-step process)
- Pickup Points Section (available locations)
- Testimonial Section (customer reviews)
- Contact Section (contact form)
- CTA Section (call-to-action)

### 2. Our Services Page (`/our-services`)
**File**: `src/app/our-services/page.tsx`
**Purpose**: Detailed service packages and pricing

### 3. Contact Page (`/contact`)
**File**: `src/app/contact/page.tsx`
**Purpose**: Contact information and inquiry form

### 4. Customers Page (`/customers`)
**File**: `src/app/customers/page.tsx`
**Purpose**: Customer testimonials and reviews

## Admin Pages (Content Management)

### 1. Admin Dashboard (`/admin`)
**File**: `src/app/admin/page.tsx`
**Purpose**: Main admin interface for content management

### 2. Admin Login (`/admin/login`)
**File**: `src/app/admin/login/page.tsx`
**Purpose**: Authentication for admin access

### 3. Admin Setup (`/admin/setup`)
**File**: `src/app/admin/setup/page.tsx`
**Purpose**: Initial admin account setup

## Component Architecture

### Layout Components
- `src/components/Navigation.tsx` - Main navigation bar
- `src/components/Footer.tsx` - Site footer
- `src/app/layout.tsx` - Root layout wrapper
- `src/app/admin/layout.tsx` - Admin-specific layout

### Page-Specific Components
```
src/components/
├── home/                 # Home page components
│   ├── HeroSection.tsx
│   ├── AboutSection.tsx
│   ├── JourneySection.tsx
│   ├── PickupPointsSection.tsx
│   ├── TestimonialSection.tsx
│   └── ContactSection.tsx
├── our-services/         # Services page components
├── contact/              # Contact page components
├── customers/            # Customer page components
├── admin/                # Admin components
├── shared/               # Shared components
│   └── SharedCTASection.tsx
└── common/               # Common UI components
```

## Data Flow Architecture

### Current State Management (Zustand)
```
src/store/zustand/
├── contentStore.ts       # Images and content data
├── webConfigStore.ts     # Website configuration
├── packageStore.ts       # Service packages
├── contactStore.ts       # Contact information
├── reviewStore.ts        # Customer reviews
├── adminStore.ts         # Admin state
└── userStore.ts          # User authentication
```

### Current Data Sources
- **Supabase Database**: Primary data source (to be replaced with static JSON)
- **Static Image Files**: Located in `src/data/images/`
- **Environment Variables**: Configuration and API keys

## Technology Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **Zustand**: State management
- **Framer Motion**: Animations

### Backend/Database (Current)
- **Supabase**: PostgreSQL database and authentication
- **Supabase Storage**: File storage for images

### UI Components
- **HeroUI**: Component library
- **React Icons**: Icon library
- **Custom Components**: Built with Tailwind CSS

## Performance Optimizations

### Code Splitting
- Dynamic imports for non-critical sections
- Lazy loading with intersection observer
- SSR for above-the-fold content

### Image Optimization
- Next.js Image component
- Responsive images
- Lazy loading

### Caching Strategy
- Static generation where possible
- Client-side caching with Zustand
- Optimized bundle splitting

## SEO and Accessibility

### SEO Features
- Meta tags and Open Graph
- Structured data
- Sitemap generation
- Robots.txt

### Accessibility
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Screen reader support

## Development Workflow

### File Organization
- Feature-based component organization
- Shared utilities in `lib/`
- Type definitions co-located with components
- Centralized state management

### Styling Approach
- Tailwind CSS utility classes
- Component-scoped styles
- Responsive design patterns
- Dark/light theme support

## Next Steps for Static Data Implementation

1. **Create JSON data files** to replace Supabase calls
2. **Modify Zustand stores** to read from local JSON
3. **Maintain existing interfaces** for seamless transition
4. **Preserve all functionality** while removing API dependencies
