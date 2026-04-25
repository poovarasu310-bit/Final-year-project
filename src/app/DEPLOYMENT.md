# Edge Function Deployment Guide

## The Error You're Seeing

```
Health check failed: TypeError: Failed to fetch
Server health check failed
```

This error occurs because the **Supabase Edge Function has not been deployed yet**. The application is trying to connect to the backend server, but it doesn't exist until you deploy it.

## How to Fix It

### Option 1: Deploy Using Supabase CLI (Recommended)

1. **Install Supabase CLI** (if you haven't already):
   ```bash
   npm install -g supabase
   ```

2. **Login to Supabase**:
   ```bash
   supabase login
   ```

3. **Link to Your Project**:
   ```bash
   supabase link --project-ref spinnwljiitjtjbdouvm
   ```

4. **Deploy the Edge Function**:
   ```bash
   supabase functions deploy make-server-1f891a69
   ```

5. **Refresh the Application**:
   Once deployment is complete, refresh your browser. The app should now connect successfully and seed the initial data.

### Option 2: Deploy Using Supabase Dashboard

1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/spinnwljiitjtjbdouvm
2. Navigate to **Edge Functions** in the left sidebar
3. Click **"New Function"** or **"Deploy Function"**
4. Name it: `make-server-1f891a69`
5. Copy and paste the contents of `/supabase/functions/server/index.tsx`
6. Create another file in the function called `kv_store.tsx` with the contents of `/supabase/functions/server/kv_store.tsx`
7. Click **Deploy**

## Verifying Deployment

After deployment, you can verify it's working by visiting:
```
https://spinnwljiitjtjbdouvm.supabase.co/functions/v1/make-server-1f891a69/health
```

You should see:
```json
{
  "status": "ok"
}
```

## What the Edge Function Does

The Edge Function (`make-server-1f891a69`) is the backend API server for your medicinal plants application. It:

- Stores all plant and compound data in Supabase KV store
- Provides REST API endpoints for CRUD operations
- Handles user authentication and profile management
- Seeds initial data (9 plants, 37 compounds) on first launch
- Manages activity tracking and user statistics

## Troubleshooting

### "Failed to deploy function"
- Make sure you're logged in: `supabase login`
- Make sure you're linked to the right project: `supabase link --project-ref spinnwljiitjtjbdouvm`
- Check your internet connection

### "Permission denied"
- Make sure you have access to the Supabase project
- Try logging out and logging back in: `supabase logout` then `supabase login`

### Still seeing CORS errors after deployment
- Wait 30-60 seconds after deployment for the function to fully initialize
- Clear your browser cache
- Check the Supabase Function Logs in the dashboard for any errors

## Next Steps After Deployment

Once the Edge Function is deployed and the health check passes:

1. The application will automatically check if data exists
2. If no data exists, it will seed 9 medicinal plants and 37 compounds
3. You can then browse plants, view compound details, and interact with the knowledge graph
4. All data will persist in the Supabase backend

## Files Involved

- `/supabase/functions/server/index.tsx` - Main Edge Function with all API endpoints
- `/supabase/functions/server/kv_store.tsx` - KV store wrapper for data persistence
- `/components/DataInitializer.tsx` - Frontend component that tests the connection and seeds data
- `/utils/dataService.tsx` - Frontend service for making API calls

## Support

If you continue to have issues after deployment:
1. Check the Supabase Dashboard > Edge Functions > Logs
2. Check your browser console for detailed error messages
3. Verify your Supabase project is active and not paused
