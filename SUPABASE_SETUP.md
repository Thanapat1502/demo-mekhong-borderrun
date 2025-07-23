# Supabase Integration Setup Guide

This guide will help you set up Supabase integration for the Mekong Border Run application.

## 🚀 Quick Start

### 1. Create Supabase Project

1. Go to [Supabase](https://supabase.com) and create a new account
2. Create a new project
3. Wait for the project to be fully initialized

### 2. Set Up Database Schema

1. Go to the SQL Editor in your Supabase dashboard
2. Copy and paste the contents of `supabase/schema.sql`
3. Run the SQL to create all tables and policies

### 3. Seed Initial Data

1. In the SQL Editor, copy and paste the contents of `supabase/seed.sql`
2. Run the SQL to populate your database with initial data

### 4. Configure Environment Variables

1. Copy `.env.example` to `.env.local`
2. Fill in your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can find these values in your Supabase project settings under "API".

### 5. Test the Integration

1. Start your development server: `npm run dev`
2. Visit your application - data should now load from Supabase
3. Check the browser console for any errors

## 📊 Database Schema Overview

### Core Tables

- **hero_images**: Homepage hero section images
- **journey_images**: Step-by-step journey images
- **pickup_point_images**: Pickup location images and details
- **gallery_images**: Gallery images with categories
- **customer_reviews**: Customer testimonials and ratings
- **service_packages**: Available service packages and pricing
- **contact_info**: Contact information (phone, email, etc.)
- **owner_info**: Business owner/operator information
- **business_info**: Business details and operating hours

### Key Features

- **UUID Primary Keys**: All tables use UUID for better scalability
- **Row Level Security (RLS)**: Enabled on all tables
- **Public Read Access**: Anonymous users can read public data
- **Automatic Timestamps**: `created_at` and `updated_at` fields
- **JSONB Support**: For complex data like coordinates, features, etc.

## 🔧 Data Management

### Adding New Data

You can add data through:

1. **Supabase Dashboard**: Use the table editor for quick additions
2. **SQL Editor**: Write custom INSERT statements
3. **API Calls**: Use the service functions in your application

### Updating Existing Data

The application includes fallback mechanisms:
- If Supabase is unavailable, it falls back to local mock data
- Error handling ensures the app continues to function
- Loading states provide good UX during data fetching

## 🛡️ Security Configuration

### Row Level Security Policies

Current policies allow:
- **Public Read**: Anyone can read public data
- **Admin Write**: Only authenticated admins can modify data

### Future Enhancements

For production, consider:
- User authentication for admin features
- More granular permissions
- API rate limiting
- Data validation rules

## 📱 Application Integration

### Zustand Stores

The application uses three main stores:

1. **ContentStore** (`src/store/zustand/contentStore.ts`)
   - Manages images and content data
   - Fetches from Supabase with fallback to local data

2. **PackageStore** (`src/store/zustand/packageStore.ts`)
   - Manages service packages and pricing
   - Includes CRUD operations for packages

3. **ContactStore** (`src/store/zustand/contactStore.ts`)
   - Manages contact and business information
   - Handles owner info and business details

### Service Layer

Service functions in `src/services/supabaseService.ts` provide:
- Type-safe database operations
- Error handling and logging
- Consistent API across all data types

## 🔄 Data Flow

```
Page Component
    ↓
Zustand Store (fetch functions)
    ↓
Supabase Service Layer
    ↓
Supabase Database
    ↓
Fallback to Local Data (if error)
```

## 🚨 Troubleshooting

### Common Issues

1. **Environment Variables Not Loading**
   - Ensure `.env.local` is in the project root
   - Restart your development server after adding variables

2. **Database Connection Errors**
   - Check your Supabase URL and API key
   - Verify your project is active in Supabase dashboard

3. **RLS Policy Errors**
   - Ensure policies are created correctly
   - Check that public read access is enabled

4. **Data Not Loading**
   - Check browser console for errors
   - Verify the database has been seeded with data

### Debug Mode

To enable debug logging, add to your `.env.local`:
```env
NEXT_PUBLIC_DEBUG=true
```

## 📈 Performance Optimization

### Recommended Practices

1. **Indexing**: Key indexes are already created in the schema
2. **Caching**: Consider implementing client-side caching
3. **Pagination**: For large datasets, implement pagination
4. **Image Optimization**: Use Next.js Image component with proper sizing

### Monitoring

Monitor your Supabase usage:
- Database size and growth
- API request patterns
- Query performance
- Error rates

## 🔮 Future Enhancements

### Planned Features

1. **Real-time Updates**: Use Supabase realtime subscriptions
2. **File Storage**: Integrate Supabase Storage for images
3. **Authentication**: Add admin authentication
4. **Analytics**: Track user interactions and popular content
5. **Backup Strategy**: Implement automated backups

### Migration Path

When ready for production:
1. Set up production Supabase project
2. Configure proper backup strategy
3. Implement monitoring and alerting
4. Set up CI/CD for database migrations

## 📞 Support

If you encounter issues:
1. Check the Supabase documentation
2. Review the application logs
3. Test with the fallback data to isolate issues
4. Verify your environment configuration

The application is designed to be resilient - it will continue working even if Supabase is temporarily unavailable by falling back to local data.
