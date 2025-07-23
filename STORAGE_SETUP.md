# Supabase Storage Setup Guide

## 🗂️ Create Storage Bucket

### Step 1: Create the Images Bucket

1. **Go to your Supabase Dashboard**
2. **Navigate to Storage** (in the left sidebar)
3. **Click "Create a new bucket"**
4. **Configure the bucket:**
   - **Name**: `images`
   - **Public bucket**: ✅ **Check this box** (important!)
   - **File size limit**: 50MB (optional)
   - **Allowed MIME types**: Leave empty for all image types

5. **Click "Create bucket"**

### Step 2: Set Up Storage Policies

After creating the bucket, you need to set up policies for public access:

1. **Go to Storage → Policies**
2. **Click "New Policy"** for the `images` bucket
3. **Create a policy for SELECT (read access):**

```sql
-- Policy name: Public read access
-- Operation: SELECT
-- Target roles: public

-- Policy definition:
(bucket_id = 'images'::text)
```

4. **Create a policy for INSERT (upload access):**

```sql
-- Policy name: Public upload access  
-- Operation: INSERT
-- Target roles: public

-- Policy definition:
(bucket_id = 'images'::text)
```

5. **Create a policy for DELETE (delete access):**

```sql
-- Policy name: Public delete access
-- Operation: DELETE  
-- Target roles: public

-- Policy definition:
(bucket_id = 'images'::text)
```

### Step 3: Test Storage Access

You can test if storage is working by:

1. **Go to your admin page**: `http://localhost:3001/admin`
2. **Click on "Manage Images"**
3. **Try uploading an image using the upload component**
4. **Check if the image appears in your Supabase Storage bucket**

## 📁 Folder Structure

The storage will automatically organize images into folders:

```
images/
├── hero/           # Hero section images
├── journey/        # Journey step images  
├── pickup/         # Pickup point images
├── gallery/        # Gallery images
└── avatars/        # User avatars (future use)
```

## 🔄 Image Migration Process

### Automatic Migration

The admin panel includes an **Image Migration Tool** that will:

1. **Scan all existing images** in your database
2. **Identify local images** (not already in Supabase Storage)
3. **Upload them to Supabase Storage**
4. **Update database records** with new Supabase URLs
5. **Show progress and results**

### Manual Migration

You can also migrate images manually:

```typescript
import { ImageUploadService } from '@/services/imageUploadService';

// Migrate a single local image
const result = await ImageUploadService.migrateLocalImage(
  '/image/home/hero1.jpg',  // Local URL
  'hero'                    // Category
);

if (result.success) {
  console.log('New URL:', result.url);
  // Update your database record with result.url
}
```

## 🛠️ Storage Service Features

### Upload Images
```typescript
import { uploadImage } from '@/services/imageUploadService';

const result = await uploadImage(file, 'hero');
if (result.success) {
  console.log('Uploaded to:', result.url);
}
```

### Delete Images
```typescript
import { deleteImage } from '@/services/imageUploadService';

const result = await deleteImage('hero/123456-abc.jpg');
```

### Replace Images
```typescript
import { replaceImage } from '@/services/imageUploadService';

const result = await replaceImage(
  'hero/old-image.jpg',  // Old file path
  newFile,               // New file
  'hero'                 // Category
);
```

## 🔒 Security Considerations

### Current Setup (Development)
- **Public bucket** with full read/write access
- **No authentication required** for uploads
- **Suitable for development and testing**

### Production Recommendations
1. **Implement authentication** for upload/delete operations
2. **Add file size limits** and validation
3. **Set up proper RLS policies** based on user roles
4. **Add virus scanning** for uploaded files
5. **Implement rate limiting** for uploads

### Example Production Policy
```sql
-- Only authenticated users can upload
CREATE POLICY "Authenticated users can upload" ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'images');

-- Only file owners can delete
CREATE POLICY "Users can delete own files" ON storage.objects  
FOR DELETE TO authenticated
USING (auth.uid()::text = (storage.foldername(name))[1]);
```

## 📊 Storage Monitoring

### Check Storage Usage
1. **Go to Settings → Usage** in Supabase
2. **Monitor storage usage** and bandwidth
3. **Set up alerts** for usage limits

### File Management
1. **Go to Storage → images** to browse files
2. **View file details** and public URLs
3. **Delete files manually** if needed

## 🚨 Troubleshooting

### Common Issues

**1. Upload fails with "Policy violation"**
- Check that your bucket policies allow public access
- Verify the bucket is marked as public

**2. Images don't display after upload**
- Check the public URL format
- Verify the bucket name is correct
- Ensure RLS policies allow SELECT

**3. Migration tool shows errors**
- Check that local image URLs are accessible
- Verify Supabase credentials are correct
- Check browser console for detailed errors

**4. Large files fail to upload**
- Check file size limits in bucket settings
- Verify network connection for large uploads
- Consider implementing chunked uploads for very large files

### Debug Mode

Enable debug logging by adding to your `.env.local`:
```env
NEXT_PUBLIC_DEBUG_STORAGE=true
```

This will log detailed information about storage operations to the browser console.

## 🎯 Next Steps

After setting up storage:

1. **Test the migration tool** in your admin panel
2. **Upload new images** using the admin interface  
3. **Verify images display** correctly on your website
4. **Set up backup strategy** for your storage bucket
5. **Plan for production security** improvements

Your images will now be served from Supabase's global CDN, providing better performance and reliability!
