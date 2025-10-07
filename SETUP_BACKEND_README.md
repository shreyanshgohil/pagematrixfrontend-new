# Backend Setup Guide for Property Upload

## Issue
The "Upload Property" button shows "Property uploaded successfully" but no property is actually saved because the backend server is not running or not accessible.

## Prerequisites
1. Make sure you have MongoDB installed and running
2. Make sure you have Node.js installed (version 14 or higher)

## Steps to Fix

### 1. Set up Environment Variables
Create a `.env` file in the `backend` directory with the following variables:

```bash
# MongoDB Connection
MONGO_URL=mongodb://localhost:27017/realestate

# Server Configuration
PORT=5000
FRONTEND_URL=http://localhost:3000

# Session Secret (generate a random string)
SESSION_SECRET=your_random_session_secret_here

# Discord Bot Token (optional, can be any string for now)
BOT_TOKEN=your_discord_bot_token_here
```

### 2. Install Dependencies
```bash
cd backend
npm install
```

### 3. Start the Backend Server
```bash
cd backend
npm start
```

You should see output like:
```
Server is stated at port 5000
🤖 Discord bot is ready as [bot_name]
```

### 4. Test the Backend
The backend should be running at `http://localhost:5000`

You can test if it's working by visiting:
- `http://localhost:5000/properties` (should show properties list or empty array)

### 5. Update Frontend Environment (if needed)
If your backend is running on a different port, update the frontend API route in:
`frontend/src/pages/api/properties.js`

Change this line:
```javascript
const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
```

### 6. Test Property Upload
1. Make sure both frontend and backend are running
2. Go to the upload property page
3. Fill out the form
4. Submit - you should see actual API calls in the browser console
5. Check the backend console for any errors

## Troubleshooting

### Common Issues:

1. **MongoDB Connection Error**
   - Make sure MongoDB is running
   - Check if the MONGO_URL is correct

2. **Port Already in Use**
   - Change the PORT in .env file
   - Update the frontend API route accordingly

3. **CORS Error**
   - Make sure FRONTEND_URL in .env matches your frontend URL
   - Check if both servers are running

4. **Validation Errors**
   - Check the browser console for detailed error messages
   - Check the backend console for validation errors

### Debug Steps:
1. Open browser developer tools (F12)
2. Go to Console tab
3. Try uploading a property
4. Look for any error messages or API call logs
5. Check Network tab to see if the API call is being made

## Expected Behavior
After setup, when you upload a property:
1. Form data is sent to `/api/properties`
2. Frontend API route forwards to backend at `/properties`
3. Backend validates and saves to MongoDB
4. Success response is returned
5. Form is reset for next property

## Next Steps
Once the backend is working:
1. Check MongoDB to see if properties are being saved
2. You can view properties at `/properties` endpoint
3. Consider adding property listing page to view uploaded properties
