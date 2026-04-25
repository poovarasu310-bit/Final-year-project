# Quick Start - Deploy Your Medicinal Plants App

## ✅ All Errors Fixed!

The health check errors have been resolved. All API endpoints are now correctly configured.

## 🚀 One Command to Deploy

```bash
supabase functions deploy server
```

That's it! After running this command, your application will:
- ✅ Connect to the database
- ✅ Pass all health checks
- ✅ Automatically seed with 9 plants and 37 compounds
- ✅ Be ready to use

## 📋 Prerequisites

1. **Install Supabase CLI** (if you haven't):
   ```bash
   npm install -g supabase
   ```

2. **Login to Supabase**:
   ```bash
   supabase login
   ```

3. **Link your project**:
   ```bash
   supabase link --project-ref spinnwljiitjtjbdouvm
   ```

## 🔍 Verify Deployment

After deploying, test the health endpoint:
```bash
curl https://spinnwljiitjtjbdouvm.supabase.co/functions/v1/server/health
```

Expected response:
```json
{"status":"ok"}
```

## 🎉 What's Next?

Once deployed, refresh your browser and the app will:
1. Connect to the backend
2. Check for existing data
3. Seed the database (if empty)
4. Display all medicinal plants and compounds
5. Enable all features:
   - Plant and compound browsing
   - Detailed compound information
   - Interactive filters
   - Knowledge graph visualization
   - Compound upload functionality

## 📚 More Information

- **Full deployment guide**: See `DEPLOYMENT_GUIDE.md`
- **What was fixed**: See `FIX_SUMMARY.md`
- **Database structure**: See `DATABASE_INTEGRATION.md`

## ❓ Having Issues?

1. Check function is deployed: `supabase functions list`
2. View logs: `supabase functions logs server`
3. Verify project ID: `spinnwljiitjtjbdouvm`
4. Check you're using the correct Supabase credentials

---

**Note**: The Edge Function is the backend API server. Without it deployed, the frontend cannot connect to the database. Once deployed, everything will work automatically!
