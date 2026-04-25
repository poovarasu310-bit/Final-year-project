# Health Check Error - Fix Summary

## Problem

The application was experiencing health check errors:
- `Health check network error: TypeError: Failed to fetch`
- `Server health check failed - no response`

## Root Cause

The API endpoint paths were incorrect. The Edge Function routes included a `/make-server-1f891a69/` prefix that shouldn't be there. When Supabase deploys an Edge Function, the function name becomes part of the URL automatically.

### How Supabase Edge Functions Work

When you deploy a function named `server`:
- The function is deployed at: `https://PROJECT_ID.supabase.co/functions/v1/server`
- Routes inside the function are relative to this base URL
- So a route `/health` in the function becomes: `https://PROJECT_ID.supabase.co/functions/v1/server/health`

### What Was Wrong

**Before (Incorrect):**
- Edge Function route: `app.get("/make-server-1f891a69/health", ...)`
- Frontend called: `https://PROJECT_ID.supabase.co/functions/v1/make-server-1f891a69/health`
- This resulted in: `https://PROJECT_ID.supabase.co/functions/v1/server/make-server-1f891a69/health` (wrong!)

**After (Correct):**
- Edge Function route: `app.get("/health", ...)`
- Frontend calls: `https://PROJECT_ID.supabase.co/functions/v1/server/health`
- This results in: `https://PROJECT_ID.supabase.co/functions/v1/server/health` (correct!)

## Files Changed

### 1. `/supabase/functions/server/index.tsx`
Removed the `/make-server-1f891a69/` prefix from all routes:
- `/make-server-1f891a69/health` → `/health`
- `/make-server-1f891a69/plants` → `/plants`
- `/make-server-1f891a69/plants/:id` → `/plants/:id`
- `/make-server-1f891a69/compounds` → `/compounds`
- `/make-server-1f891a69/compounds/:id` → `/compounds/:id`
- `/make-server-1f891a69/seed-data` → `/seed-data`
- `/make-server-1f891a69/auth/register` → `/auth/register`
- `/make-server-1f891a69/auth/profile` → `/auth/profile`
- `/make-server-1f891a69/auth/update-stats` → `/auth/update-stats`

### 2. `/utils/dataService.tsx`
Updated the API base URL:
```typescript
// Before
const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-1f891a69`;

// After
const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/server`;
```

### 3. `/components/DataInitializer.tsx`
Updated health check endpoint:
```typescript
// Before
fetch(`https://spinnwljiitjtjbdouvm.supabase.co/functions/v1/make-server-1f891a69/health`)

// After
fetch(`https://spinnwljiitjtjbdouvm.supabase.co/functions/v1/server/health`)
```

Also updated deployment instruction from:
- `supabase functions deploy make-server-1f891a69` → `supabase functions deploy server`

### 4. `/components/ProfilePage.tsx`
Updated all auth API endpoints:
```typescript
// Before
`https://${projectId}.supabase.co/functions/v1/make-server-1f891a69/auth/profile`
`https://${projectId}.supabase.co/functions/v1/make-server-1f891a69/auth/register`
`https://${projectId}.supabase.co/functions/v1/make-server-1f891a69/auth/update-stats`

// After
`https://${projectId}.supabase.co/functions/v1/server/auth/profile`
`https://${projectId}.supabase.co/functions/v1/server/auth/register`
`https://${projectId}.supabase.co/functions/v1/server/auth/update-stats`
```

### 5. `/utils/supabase/useUserStats.tsx`
Updated auth API endpoints:
```typescript
// Before
`https://${projectId}.supabase.co/functions/v1/make-server-1f891a69/auth/profile`
`https://${projectId}.supabase.co/functions/v1/make-server-1f891a69/auth/update-stats`

// After
`https://${projectId}.supabase.co/functions/v1/server/auth/profile`
`https://${projectId}.supabase.co/functions/v1/server/auth/update-stats`
```

## How to Deploy

1. Make sure you have the Supabase CLI installed and authenticated
2. Link your project: `supabase link --project-ref spinnwljiitjtjbdouvm`
3. Deploy the Edge Function:
   ```bash
   supabase functions deploy server
   ```

## Verification

After deployment, test the health endpoint:
```bash
curl https://spinnwljiitjtjbdouvm.supabase.co/functions/v1/server/health
```

Expected response:
```json
{
  "status": "ok"
}
```

## What Happens Next

Once the Edge Function is deployed:

1. The health check will succeed
2. The DataInitializer will automatically seed the database with mock data:
   - 9 medicinal plants
   - 37 compounds
3. The application will load and display the plants and compounds
4. All features will work:
   - Browse plants and compounds
   - View detailed information
   - Filter by functional groups and properties
   - View knowledge graph
   - Upload compounds

## Important Notes

- The Edge Function **must** be deployed for the application to work
- All data is stored in Supabase's built-in KV store (no tables needed)
- The first time the app loads, it will automatically seed the database
- Subsequent loads will use the existing data

## Troubleshooting

If you still see errors after deploying:

1. **Check deployment status:**
   ```bash
   supabase functions list
   ```
   You should see `server` in the list.

2. **View logs:**
   ```bash
   supabase functions logs server
   ```

3. **Test the endpoint manually:**
   ```bash
   curl https://spinnwljiitjtjbdouvm.supabase.co/functions/v1/server/health
   ```

4. **Verify project ID:**
   Make sure your project ID is `spinnwljiitjtjbdouvm`

5. **Check CORS:**
   The Edge Function has CORS enabled for all origins (`*`), so CORS shouldn't be an issue.

## Additional Documentation

- See `DEPLOYMENT_GUIDE.md` for detailed deployment instructions
- See `DATABASE_INTEGRATION.md` for information about the data structure
- See `README_ERRORS.md` for the original error documentation
