# Edge Function Deployment Guide

## Quick Fix Applied

The health check errors have been resolved by fixing the API endpoint paths. All routes in the Edge Function now use the correct paths without the `/make-server-1f891a69/` prefix.

## How to Deploy the Edge Function

The Edge Function needs to be deployed to Supabase to work. Here's how:

### Prerequisites

1. Install the Supabase CLI: https://supabase.com/docs/guides/cli/getting-started
2. Login to Supabase CLI: `supabase login`
3. Link your project: `supabase link --project-ref spinnwljiitjtjbdouvm`

### Deploy Command

Run this command from your project root directory:

```bash
supabase functions deploy server
```

This will deploy the Edge Function located at `supabase/functions/server/` to your Supabase project.

### Verify Deployment

After deployment, you can test the function by visiting:
```
https://spinnwljiitjtjbdouvm.supabase.co/functions/v1/server/health
```

You should see:
```json
{
  "status": "ok"
}
```

### API Endpoints

Once deployed, the following endpoints will be available:

- `GET /health` - Health check
- `GET /plants` - Get all plants
- `GET /plants/:id` - Get a specific plant
- `POST /plants` - Create/update a plant
- `DELETE /plants/:id` - Delete a plant
- `GET /compounds` - Get all compounds
- `GET /compounds/:id` - Get a specific compound
- `POST /compounds` - Create/update a compound
- `DELETE /compounds/:id` - Delete a compound
- `POST /seed-data` - Seed initial data
- `POST /auth/register` - Register a new user
- `GET /auth/profile` - Get user profile
- `PUT /auth/profile` - Update user profile
- `POST /auth/update-stats` - Update user stats

### Testing the API

You can test the API using curl:

```bash
# Health check
curl https://spinnwljiitjtjbdouvm.supabase.co/functions/v1/server/health

# Get plants (requires auth)
curl https://spinnwljiitjtjbdouvm.supabase.co/functions/v1/server/plants \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

## What Was Fixed

1. **Removed incorrect path prefix**: All routes that had `/make-server-1f891a69/` prefix have been updated to use the correct paths (e.g., `/health`, `/plants`, `/compounds`)

2. **Updated API base URL**: The `dataService.tsx` now correctly points to `/functions/v1/server` instead of `/functions/v1/make-server-1f891a69`

3. **Fixed health check**: The `DataInitializer.tsx` now calls the correct health check endpoint at `/functions/v1/server/health`

## Next Steps

1. Deploy the Edge Function using the command above
2. The application will automatically connect and seed the database with initial data
3. You can start using the application to browse medicinal plants and compounds

## Troubleshooting

If you still see errors after deployment:

1. Check that the Edge Function is deployed: `supabase functions list`
2. Check the Edge Function logs: `supabase functions logs server`
3. Verify your Supabase project ID is correct: `spinnwljiitjtjbdouvm`
4. Make sure you're using the correct anon key in the application

## Local Development

To test the Edge Function locally:

```bash
supabase functions serve server
```

Then update the API_BASE_URL in `utils/dataService.tsx` to point to `http://localhost:54321/functions/v1/server`
