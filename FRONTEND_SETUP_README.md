# Frontend Image Upload Setup

## Environment Configuration

Create a `.env.local` file in the frontend directory with:

```bash
# Backend API URL
BACKEND_URL=http://localhost:5000
```

## Features Added

### 1. Image Upload Components
- **Property Images**: Multiple image upload with drag & drop
- **Featured Image**: Single main property image
- **Brochure**: Property brochure/document upload
- **Floor Plan Images**: Optional floor plan images

### 2. Upload Methods
- **Drag & Drop**: Users can drag files directly onto upload areas
- **Click to Upload**: Traditional file picker interface
- **Multiple File Support**: Upload multiple images at once

### 3. File Validation
- **File Type**: Only images (PNG, JPG, GIF) and PDFs for brochures
- **File Size**: Maximum 10MB per file
- **Required Fields**: Property images, featured image, and brochure are required

### 4. Upload Progress
- Real-time upload progress tracking
- Visual progress bars for each file
- Upload status indicators

### 5. Image Management
- Preview uploaded images
- Remove individual images
- Reorder images (index-based)

## Technical Implementation

### AWS S3 Integration
- Uses presigned URLs for secure direct uploads
- Files uploaded directly to S3 from frontend
- No file storage on backend server

### State Management
- Separate state for each image type
- Progress tracking for uploads
- Error handling and validation

### API Integration
- Frontend API route (`/api/images/generate-upload-url`)
- Backend communication for presigned URLs
- Proper error handling and user feedback

## Usage

1. **Step 4**: Images & Media step in the property upload form
2. **Drag & Drop**: Drag files onto upload areas
3. **File Selection**: Click upload areas to select files
4. **Preview**: See uploaded images immediately
5. **Remove**: Click trash icon to remove images
6. **Validation**: Required fields must be filled before proceeding

## Dependencies

The following packages are used:
- React hooks for state management
- Fetch API for HTTP requests
- File API for file handling
- Drag & Drop API for enhanced UX
