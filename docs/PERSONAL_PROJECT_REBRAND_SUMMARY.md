# Personal Project Rebrand Summary

## Overview

This document summarizes the complete rebranding and contact information update for the demo branch, converting from client-specific "Mekong Border Run" branding to personal project "Visa Border Run" with updated contact details.

## 📞 Contact Information Changes

### **Phone Numbers Updated**

| Location               | Old Value         | New Value      |
| ---------------------- | ----------------- | -------------- |
| Primary Phone          | `+66 123 456 789` | `+66850994775` |
| WhatsApp               | `+66 987 654 321` | `+66850994775` |
| Navigation Call Button | `+66951029528`    | `+66850994775` |

### **Email Addresses Updated**

| Location       | Old Value                      | New Value                 |
| -------------- | ------------------------------ | ------------------------- |
| Primary Email  | `info@mekong-borderrun.com`    | `thanapat15020@gmail.com` |
| Booking Email  | `booking@mekong-borderrun.com` | `thanapat15020@gmail.com` |
| Business Email | `info@mekong-borderrun.com`    | `thanapat15020@gmail.com` |

### **Social Media Links Disabled**

| Platform  | Old Value                               | New Value     |
| --------- | --------------------------------------- | ------------- |
| Facebook  | `https://facebook.com/mekongborderrun`  | `` (disabled) |
| Instagram | `https://instagram.com/mekongborderrun` | `` (disabled) |
| LINE      | `@mekongborderrun`                      | `` (disabled) |

**Note**: Social media links are disabled by setting `is_public: false` in contact-info.json

## 🏷️ Branding Changes: "Mekong Border Run" → "Visa Border Run"

### **Files Modified for Branding**

#### **1. Navigation & Header**

- **File**: `src/components/Navigation.tsx`
- **Changes**:
  - Logo alt text: `"Mekong Border Run Logo"` → `"Visa Border Run Logo"`
  - Brand text: `"Mekong"` → `"Visa"`
  - Logo source: `/image/logo/40028.png` → `/image/logo/visa-border-run-logo.svg`

#### **2. Footer**

- **File**: `src/components/Footer.tsx`
- **Changes**:
  - Logo alt text: `"Mekong Border Run Logo"` → `"Visa Border Run Logo"`
  - Brand name: `"Mekong Border Run"` → `"Visa Border Run"`
  - Logo source: `/image/logo/40028.png` → `/image/logo/visa-border-run-logo.svg`

#### **3. Metadata & SEO**

- **File**: `src/app/layout.tsx`
- **Changes**:
  - Title: `"Mekong Border Run - Professional..."` → `"Visa Border Run - Professional..."`
  - Template: `"%s | Mekong Border Run"` → `"%s | Visa Border Run"`

#### **4. Web App Manifest**

- **File**: `src/app/manifest.ts`
- **Changes**:
  - Name: `"Mekong Border Run - Professional..."` → `"Visa Border Run - Professional..."`
  - Short name: `"Mekong Border Run"` → `"Visa Border Run"`

#### **5. Admin Interface**

- **File**: `src/app/admin/layout.tsx`
- **Changes**:
  - Title: `"Admin Dashboard - Mekong Border Run"` → `"Admin Dashboard - Visa Border Run"`
  - Description: Updated to reflect new branding

#### **6. Page Layouts**

- **File**: `src/app/contact/layout.tsx`

  - Description: `"Contact Mekong Border Run..."` → `"Contact Visa Border Run..."`
  - Keywords: `"Mekong transfer contact"` → `"Visa transfer contact"`
  - Phone: `"+66 95 102 9528"` → `"+66850994775"`

- **File**: `src/app/customers/layout.tsx`
  - Title: `"...Mekong Border Run Service"` → `"...Visa Border Run Service"`
  - Description: Updated to reflect new branding
  - Keywords: `"Mekong border run feedback"` → `"Visa border run feedback"`

#### **7. Static Data Files**

- **File**: `src/data/static/web-config.json`

  - `website_title`: `"Mekong Border Run"` → `"Visa Border Run"`
  - `contact_email`: `"info@mekong-borderrun.com"` → `"thanapat15020@gmail.com"`
  - `contact_phone`: `"+66 123 456 789"` → `"+66850994775"`

- **File**: `src/data/static/business-info.json`

  - `id`: `"mekong-border-run-business"` → `"visa-border-run-business"`
  - `business_name`: `"Mekong Border Run Service"` → `"Visa Border Run Service"`
  - `business_phone`: `"+66 123 456 789"` → `"+66850994775"`
  - `business_email`: `"info@mekong-borderrun.com"` → `"thanapat15020@gmail.com"`

- **File**: `src/data/static/contact-info.json`
  - Updated all phone numbers to `"+66850994775"`
  - Updated all emails to `"thanapat15020@gmail.com"`
  - Disabled social media by setting `is_public: false`

#### **8. Store Configuration**

- **File**: `src/store/zustand/contactStore.ts`
  - Updated hardcoded contact information
  - Disabled social media links

## 🎨 New Logo Design

### **Logo Created**

- **File**: `public/image/logo/visa-border-run-logo.svg`
- **Design Elements**:
  - Green circular background (#059669)
  - White passport/document icon
  - Visa stamp with "V" marking
  - Route/path lines indicating travel
  - Location pins for origin/destination
  - Border crossing symbol
  - Premium service stars
- **Dimensions**: 64x64px SVG (scalable)
- **Color Scheme**: Green primary (#059669), white accents, gold stars

### **Logo Implementation**

- **Navigation Header**: Updated to use new SVG logo
- **Footer**: Updated to use new SVG logo
- **Responsive**: SVG format ensures crisp display at all sizes

## 📁 Files Modified Summary

### **Contact Information (8 files)**

1. `src/data/static/contact-info.json`
2. `src/data/static/web-config.json`
3. `src/data/static/business-info.json`
4. `src/store/zustand/contactStore.ts`
5. `src/components/Navigation.tsx`
6. `src/app/contact/layout.tsx`

### **Branding Updates (10 files)**

1. `src/components/Navigation.tsx`
2. `src/components/Footer.tsx`
3. `src/app/layout.tsx`
4. `src/app/manifest.ts`
5. `src/app/admin/layout.tsx`
6. `src/app/contact/layout.tsx`
7. `src/app/customers/layout.tsx`
8. `src/data/static/web-config.json`
9. `src/data/static/business-info.json`
10. `src/data/static/contact-info.json`

### **New Assets Created (1 file)**

1. `public/image/logo/visa-border-run-logo.svg`

## ✅ Verification Checklist

### **Contact Information**

- [x] Phone numbers updated to `+66850994775` across all files
- [x] Email addresses updated to `thanapat15020@gmail.com` across all files
- [x] Social media links disabled (set to empty and `is_public: false`)
- [x] Navigation call button updated
- [x] Contact store hardcoded values updated

### **Branding**

- [x] "Mekong Border Run" → "Visa Border Run" in all visible text
- [x] Logo alt texts updated
- [x] Page titles and metadata updated
- [x] Manifest file updated
- [x] Admin interface titles updated
- [x] Static data files updated

### **Logo**

- [x] New SVG logo created with professional design
- [x] Logo implemented in Navigation component
- [x] Logo implemented in Footer component
- [x] Logo is scalable and responsive

## 🚀 Impact

### **User-Facing Changes**

- All contact information now reflects personal details
- Brand name changed throughout the website
- New professional logo design
- Social media buttons disabled/hidden

### **SEO & Metadata**

- All page titles updated for search engines
- Meta descriptions updated
- Web app manifest updated
- Keywords updated to reflect new branding

### **Admin Interface**

- Admin dashboard title updated
- All static data sources updated
- Contact management reflects new information

## 📝 Notes

1. **Social Media**: Disabled rather than removed to maintain data structure
2. **Phone Format**: Using international format `+66850994775` consistently
3. **Email**: Single email address used for all contact purposes
4. **Logo**: SVG format chosen for scalability and crisp display
5. **Branding**: "Visa" maintains the professional service focus while being more generic

This rebrand successfully converts the project from client-specific to personal project while maintaining all functionality and professional appearance.
