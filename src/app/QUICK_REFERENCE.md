# Quick Reference Guide

## For Developers - Fast Access to Key Information

---

## 🚀 Quick Start

```bash
# The app auto-initializes on first load
# Just open in browser and wait for data seeding
```

---

## 📁 File Locations

### New Components
```
/components/MetadataPanel.tsx           → Database statistics
/components/CodeSnippetsManager.tsx     → Code snippet management
```

### Modified Files
```
/App.tsx                                → Added imports & integrated components
/components/ReportsPage.tsx             → Added tabs & code snippets
```

### Backend
```
/supabase/functions/server/index.tsx    → All API endpoints
/supabase/functions/server/kv_store.tsx → KV operations (don't modify!)
/utils/dataService.tsx                  → Frontend API calls
```

---

## 🔌 API Endpoints

### Metadata
```typescript
GET /make-server-1f891a69/metadata
→ Returns database statistics
→ Auth: Public (anon key)
```

### Code Snippets
```typescript
GET /make-server-1f891a69/code-snippets
→ Fetch user's code snippets
→ Auth: Required (access token)

POST /make-server-1f891a69/code-snippets
→ Save new code snippet
→ Auth: Required (access token)
→ Body: { title, code, language, description, tags }

DELETE /make-server-1f891a69/code-snippets/:snippetId
→ Delete specific snippet
→ Auth: Required (access token)
```

### Functional Groups
```typescript
GET /make-server-1f891a69/functional-groups
→ List all functional groups
→ Auth: Public

POST /make-server-1f891a69/seed-functional-groups
→ Extract and seed functional groups
→ Auth: Public
```

---

## 🎨 Component Usage

### MetadataPanel

```typescript
import { MetadataPanel } from './components/MetadataPanel';

// Usage
<MetadataPanel />

// Features:
// - Auto-loads on mount
// - Shows database stats
// - Refresh button
// - Error handling
```

### CodeSnippetsManager

```typescript
import { CodeSnippetsManager } from './components/CodeSnippetsManager';

// Usage (requires auth)
<CodeSnippetsManager />

// Features:
// - CRUD operations
// - Language selection
// - Tag support
// - User-specific
```

---

## 🗄️ Data Service Methods

```typescript
import { dataService } from './utils/dataService';

// Metadata
const stats = await dataService.getMetadata();

// Code Snippets (requires access token)
const snippets = await dataService.getAllCodeSnippets(accessToken);
const success = await dataService.saveCodeSnippet(snippet, accessToken);
const deleted = await dataService.deleteCodeSnippet(id, accessToken);

// Functional Groups
const groups = await dataService.getFunctionalGroups();
const seeded = await dataService.seedFunctionalGroups();

// Plants & Compounds
const plants = await dataService.getAllPlants();
const compounds = await dataService.getAllCompounds();
```

---

## 🔑 Authentication

### Get Access Token

```typescript
import { supabase } from './utils/supabase/client';

const { data: { session } } = await supabase.auth.getSession();
const accessToken = session?.access_token;
```

### Check if Logged In

```typescript
const { data: { session } } = await supabase.auth.getSession();
const isLoggedIn = !!session?.access_token;
```

---

## 🎯 Key Patterns

### API Call Pattern

```typescript
// 1. Set loading state
setLoading(true);

try {
  // 2. Make API call
  const response = await fetch(url, options);
  
  // 3. Check response
  if (!response.ok) {
    throw new Error('API error');
  }
  
  // 4. Parse data
  const data = await response.json();
  
  // 5. Update state
  setData(data);
  
} catch (error) {
  // 6. Handle error
  console.error('Error:', error);
  toast.error('Failed to load');
  
} finally {
  // 7. Clear loading
  setLoading(false);
}
```

### Component Pattern

```typescript
import { useState, useEffect } from 'react';

export function MyComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    // ... API call pattern above
  };
  
  if (loading) return <LoadingState />;
  if (error) return <ErrorState />;
  if (!data) return null;
  
  return <DataDisplay data={data} />;
}
```

---

## 📊 KV Store Keys

```typescript
// Metadata
'metadata:version'              → Database version
'metadata:last_updated'         → Timestamp

// Lists
'plants:list'                   → Array of all plants
'compounds:list'                → Array of all compounds
'functional_groups:list'        → Array of functional groups
'pubchem:compounds:list'        → Array of PubChem data

// Individual Items
'plant_{id}'                    → Single plant object
'compound_{id}'                 → Single compound object
'functional_group_{name}'       → Single group object

// Code Snippets
'code_snippet_{id}'             → Single snippet object
'user_snippets_{userId}'        → User's snippet list

// User Data
'user_profile_{userId}'         → User profile
'user_activity_{userId}_{ts}'   → Activity log
'analysis_report_{userId}_{id}' → Saved report

// PubChem Cache
'pubchem:compound_{cid}'        → Cached compound data
```

---

## 🎨 UI Components

### Commonly Used

```typescript
import { Card, CardContent, CardHeader } from './components/ui/card';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { Input } from './components/ui/input';
import { Textarea } from './components/ui/textarea';
import { Dialog, DialogContent } from './components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
```

### Icons

```typescript
import { 
  Leaf,           // Plants
  Pill,           // Compounds
  Activity,       // Functional groups
  Database,       // Data/storage
  Code,           // Code snippets
  FileText,       // Reports
  Plus,           // Add
  Trash2,         // Delete
  Save,           // Save
  RefreshCw       // Refresh
} from 'lucide-react';
```

---

## 🔔 Toast Notifications

```typescript
import { toast } from 'sonner@2.0.3';

// Success
toast.success('Operation successful!');

// Error
toast.error('Operation failed!');

// Info
toast.info('Processing...');

// Custom
toast('Custom message', {
  description: 'Additional info',
  duration: 5000
});
```

---

## 🐛 Debugging

### Check API Response

```typescript
const response = await fetch(url);
console.log('Status:', response.status);
console.log('Headers:', response.headers);

const data = await response.json();
console.log('Data:', data);
```

### Check Auth Token

```typescript
const { data: { session } } = await supabase.auth.getSession();
console.log('Session:', session);
console.log('Token:', session?.access_token);
```

### Check KV Store (Server-side)

```typescript
// In server/index.tsx
const value = await kv.get('key_name');
console.log('KV Value:', value);
```

---

## 🚨 Common Issues

### Issue: Code snippets not saving
**Fix:** Ensure user is authenticated
```typescript
const { data: { session } } = await supabase.auth.getSession();
if (!session?.access_token) {
  toast.error('Please log in');
  return;
}
```

### Issue: Metadata not loading
**Fix:** Check endpoint and CORS
```typescript
// Verify endpoint URL
const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1`;
// Check for CORS errors in console
```

### Issue: Components not rendering
**Fix:** Check imports and exports
```typescript
// Make sure export is correct
export function MyComponent() { ... }

// Import matches export
import { MyComponent } from './MyComponent';
```

---

## 📝 Code Snippets

### Fetch with Auth

```typescript
const fetchWithAuth = async (endpoint: string) => {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session?.access_token) {
    throw new Error('Not authenticated');
  }
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Authorization': `Bearer ${session.access_token}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Request failed');
  }
  
  return response.json();
};
```

### Save Data with Toast

```typescript
const saveData = async (data: any) => {
  try {
    const result = await dataService.save(data);
    toast.success('Saved successfully!');
    return result;
  } catch (error) {
    toast.error('Failed to save');
    console.error(error);
    return null;
  }
};
```

### Loading State Component

```typescript
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <RefreshCw className="w-6 h-6 animate-spin text-blue-600" />
    <span className="ml-2 text-gray-600">Loading...</span>
  </div>
);
```

---

## 🎯 Testing Checklist

```
□ MetadataPanel displays on Home tab
□ All statistics load correctly
□ Refresh button works
□ Code Snippets tab appears in Reports
□ Can create new snippet
□ Can delete snippet
□ Auth check prevents unauthorized access
□ Toast notifications appear
□ Loading states display
□ Error handling works
□ No console errors
□ Responsive on mobile
```

---

## 🔗 Important URLs

```
Application: http://localhost:3000
Server API: https://{projectId}.supabase.co/functions/v1/make-server-1f891a69
Supabase: https://{projectId}.supabase.co
```

---

## 📚 Documentation Files

```
FRONTEND_INTEGRATION_COMPLETE.md  → Integration details
ARCHITECTURE_OVERVIEW.md          → System architecture
USER_GUIDE.md                     → End-user manual
SESSION_SUMMARY.md                → Session summary
QUICK_REFERENCE.md                → This file
```

---

## 🛠️ Useful Commands

### Development
```bash
# Start dev server (if using local dev)
npm run dev

# Check TypeScript
npx tsc --noEmit

# Format code
npx prettier --write .
```

### Debugging
```bash
# Clear browser cache
Ctrl + Shift + Delete

# Hard reload
Ctrl + Shift + R

# Open DevTools
F12 or Ctrl + Shift + I
```

---

## 💡 Pro Tips

1. **Always check authentication first** for protected features
2. **Use loading states** for better UX
3. **Toast notifications** for user feedback
4. **Error boundaries** to catch component errors
5. **Console logging** for debugging API calls
6. **Separate concerns** - UI, logic, data
7. **Consistent patterns** across components
8. **Document as you code**

---

## 🎓 Learning Resources

- React Hooks: https://react.dev/reference/react
- Supabase Docs: https://supabase.com/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Lucide Icons: https://lucide.dev

---

**Keep this file handy for quick reference!** 📌
