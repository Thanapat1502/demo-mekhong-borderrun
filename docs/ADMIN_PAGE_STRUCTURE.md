# Admin Page Structure Documentation

## Overview
The admin interface is a comprehensive dashboard for managing the Mekong Border Run website content, including images, reviews, pricing, contact information, and system settings.

## Admin Page Architecture

### **Main Admin Page (`src/app/admin/page.tsx`)**
**Layout Structure**:
```
┌─────────────────────────────────────────────────────────┐
│                    Header Bar                           │
│  [Logo] Admin Dashboard    [User Info] [Website] [Logout]│
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────┐  ┌─────────────────────────────────────┐│
│  │  Sidebar    │  │        Main Content Area            ││
│  │  Navigation │  │                                     ││
│  │             │  │  [Active Panel Content]             ││
│  │  • Dashboard│  │                                     ││
│  │  • Images   │  │                                     ││
│  │  • Reviews  │  │                                     ││
│  │  • Pricing  │  │                                     ││
│  │  • Contact  │  │                                     ││
│  │  • Settings │  │                                     ││
│  └─────────────┘  └─────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
```

### **Navigation Menu Items**
1. **Dashboard** (`dashboard`) - Business overview and statistics
2. **Manage Images** (`images`) - Image content management
3. **Customer Reviews** (`reviews`) - Review management
4. **Service Pricing** (`pricing`) - Package pricing control
5. **Contact Info** (`contact`) - Contact information management
6. **Settings** (`settings`) - System configuration

## Component Hierarchy

### **1. Dashboard Panel (`AdminDashboard.tsx`)**
**Purpose**: Business overview and statistics dashboard
**Data Sources**:
- Contact requests from Supabase (`contact_requests` table)
- Business statistics and metrics
- Recent customer inquiries

**Key Features**:
- **Statistics Cards**:
  - Total Requests
  - New Requests (last 3 days)
  - Monthly Visitors
  - Conversion Rate
- **Recent Contact Requests Table**:
  - Customer name and contact info
  - Request status with dropdown
  - Message preview
  - Timestamp
- **Tabbed Interface**:
  - Business Overview
  - Service Pricing (embedded)
  - Contact Info (embedded)

**Data Flow**:
```
AdminDashboard → Supabase → contact_requests table
              ↓
StatusDropdown → Update request status
              ↓
ServicePricingManager → Manage pricing
              ↓
ContactInfoManager → Manage contact info
```

### **2. Images Management Panel (`ImagesManagementPanel.tsx`)**
**Purpose**: Manage pickup point images and gallery content
**Data Sources**:
- `useContentStore` - Pickup point images
- Supabase Storage - Image files
- `pickup_point_images` table - Image metadata

**Key Features**:
- **Image Gallery Display**:
  - Grid view of current images
  - Image preview with metadata
  - Edit/Delete/View actions
- **Upload New Images**:
  - Drag & drop interface
  - Multiple file selection
  - Image preview before upload
  - Metadata form (title, alt, location, description, Google Maps URL)
- **Edit Image Information**:
  - Modal form for editing metadata
  - Real-time preview
  - Save/Cancel actions
- **Delete Images**:
  - Confirmation modal
  - Complete removal from storage and database

**Data Flow**:
```
ImagesManagementPanel → useContentStore → fetchPickupPointImages()
                     ↓
ImageGallery → Display images with actions
                     ↓
Upload Modal → uploadPickupPointImageComplete()
                     ↓
Edit Modal → updatePickupPointImage()
                     ↓
Delete Modal → deletePickupPointImageComplete()
```

### **3. Customer Reviews Panel (`CustomerReviewsPanel.tsx`)**
**Purpose**: Manage customer testimonials and reviews
**Component**: Wrapper for `CustomerReviewManager`
**Data Sources**:
- `useReviewStore` - Customer reviews
- `customer_reviews` table - Review data

**Key Features**:
- Review listing and management
- Add/Edit/Delete reviews
- Review status management
- Featured review selection

### **4. Service Pricing Panel (`ServicePricingPanel.tsx`)**
**Purpose**: Manage service packages and pricing
**Component**: Wrapper for `ServicePricingManager`
**Data Sources**:
- `usePackageStore` - Service packages
- `service_packages` table - Package data

**Key Features**:
- Package listing and editing
- Price management
- Feature list management
- Availability toggle
- Popular package marking

### **5. Contact Info Panel (`ContactInfoPanel.tsx`)**
**Purpose**: Manage business contact information
**Component**: Wrapper for `ContactInfoManager`
**Data Sources**:
- `useContactStore` - Contact information
- `contact_info`, `business_info`, `owner_info` tables

**Key Features**:
- Contact method management
- Business information editing
- Owner profile management
- Social media links

### **6. Settings Panel (`SettingsPanel.tsx`)**
**Purpose**: System configuration and settings
**Data Sources**:
- `useWebConfigStore` - Website configuration
- `web_config` table - Configuration data

**Key Features**:
- Website settings
- System configuration
- Admin preferences

## Data Management Architecture

### **Zustand Stores Used**:
1. **`useContentStore`** - Images and content data
2. **`useReviewStore`** - Customer reviews
3. **`usePackageStore`** - Service packages
4. **`useContactStore`** - Contact information
5. **`useWebConfigStore`** - Website configuration
6. **`useAuth`** - Authentication state

### **Database Tables**:
1. **`pickup_point_images`** - Image metadata
2. **`customer_reviews`** - Review data
3. **`service_packages`** - Package information
4. **`contact_info`** - Contact methods
5. **`business_info`** - Business details
6. **`owner_info`** - Owner profile
7. **`web_config`** - Website settings
8. **`contact_requests`** - Customer inquiries

### **File Storage**:
- **Supabase Storage** - Image files
- **Categorized buckets** - Organized by content type

## Component Dependencies

### **External Libraries**:
- **@heroui/react** - UI components
- **react-icons/fi** - Feather icons
- **next/image** - Optimized images
- **next/navigation** - Routing

### **Internal Dependencies**:
- **Zustand stores** - State management
- **Supabase client** - Database operations
- **Auth context** - User authentication
- **Image storage utilities** - File management

## Admin Panel Features

### **CRUD Operations**:
- **Create**: Add new images, reviews, packages
- **Read**: Display all content with pagination
- **Update**: Edit existing content in-place
- **Delete**: Remove content with confirmation

### **File Management**:
- **Upload**: Drag & drop image upload
- **Storage**: Organized file storage
- **Optimization**: Image processing and compression
- **Metadata**: Rich metadata management

### **User Experience**:
- **Responsive Design**: Works on all screen sizes
- **Loading States**: Visual feedback during operations
- **Error Handling**: User-friendly error messages
- **Confirmation Dialogs**: Prevent accidental deletions

### **Security Features**:
- **Authentication Required**: Protected routes
- **Role-based Access**: Admin-only functionality
- **Input Validation**: Form validation and sanitization
- **CSRF Protection**: Secure form submissions

## Current Issues for Demo Implementation

### **Database Dependencies**:
1. All panels rely on Supabase database connections
2. Real-time data fetching from multiple tables
3. File upload requires Supabase Storage
4. Authentication depends on Supabase Auth

### **API Calls**:
1. CRUD operations call Supabase directly
2. Image upload/delete operations
3. Status updates and real-time sync
4. Statistics calculation from live data

### **Static Data Requirements**:
1. **Contact Requests** - For dashboard statistics
2. **Image Metadata** - For image management
3. **Admin Settings** - For configuration
4. **File Upload Simulation** - For image management

## Next Steps for Static Implementation

### **Phase 1: Create Static Data**
- Generate sample contact requests
- Create admin configuration data
- Mock file upload responses
- Simulate database operations

### **Phase 2: Update Stores**
- Modify admin-specific stores
- Implement mock CRUD operations
- Add static data loading
- Preserve UI functionality

### **Phase 3: Component Updates**
- Update panels to use static data
- Mock file operations
- Simulate real-time updates
- Maintain interactive features
