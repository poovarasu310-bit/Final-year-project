# Application Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Frontend (React)                         │
├─────────────────────────────────────────────────────────────────┤
│  App.tsx (Main Component)                                        │
│  ├── TopNavigation (Home, Plants, Compounds, Analysis,          │
│  │                    Reports, Profile)                          │
│  ├── DataInitializer (Seeds data on first load)                 │
│  └── Main Content Area                                           │
│      ├── Home Tab                                                │
│      │   ├── MetadataPanel ⭐ NEW                               │
│      │   ├── Action Cards                                        │
│      │   ├── Recent Activity                                     │
│      │   └── Knowledge Graph Preview                             │
│      ├── Plants Tab                                              │
│      │   ├── SidebarFilters                                      │
│      │   └── PlantCard Grid                                      │
│      ├── Compounds Tab                                           │
│      │   ├── CompoundCard Grid                                   │
│      │   └── MoleculeViewer Dialog                               │
│      ├── Analysis Tab                                            │
│      │   ├── DiseaseCompoundSearch                               │
│      │   ├── KnowledgeGraph                                      │
│      │   ├── ChartsPanel                                         │
│      │   └── CompoundAnalysisPage                                │
│      ├── Reports Tab ⭐ ENHANCED                                │
│      │   ├── Analysis Reports Tab                                │
│      │   └── Code Snippets Tab ⭐ NEW                            │
│      │       └── CodeSnippetsManager                             │
│      └── Profile Tab                                             │
│          └── ProfilePage (Auth, Stats, Activity)                 │
└─────────────────────────────────────────────────────────────────┘
                              ↕ HTTP/HTTPS
┌─────────────────────────────────────────────────────────────────┐
│                    Data Service Layer                            │
├─────────────────────────────────────────────────────────────────┤
│  /utils/dataService.tsx                                          │
│  ├── getAllPlants()                                              │
│  ├── getAllCompounds()                                           │
│  ├── seedData()                                                  │
│  ├── seedFunctionalGroups()                                      │
│  ├── getFunctionalGroups()                                       │
│  ├── getMetadata() ⭐ NEW                                       │
│  ├── getAllCodeSnippets() ⭐ NEW                                │
│  ├── saveCodeSnippet() ⭐ NEW                                   │
│  └── deleteCodeSnippet() ⭐ NEW                                 │
└─────────────────────────────────────────────────────────────────┘
                              ↕ HTTP/HTTPS
┌─────────────────────────────────────────────────────────────────┐
│               Supabase Edge Function (Hono Server)               │
├─────────────────────────────────────────────────────────────────┤
│  /supabase/functions/server/index.tsx                            │
│                                                                   │
│  API Endpoints:                                                  │
│  ├── GET  /make-server-1f891a69/plants                           │
│  ├── POST /make-server-1f891a69/plants                           │
│  ├── GET  /make-server-1f891a69/compounds                        │
│  ├── POST /make-server-1f891a69/compounds                        │
│  ├── POST /make-server-1f891a69/seed-data                        │
│  │                                                                │
│  ├── GET  /make-server-1f891a69/functional-groups                │
│  ├── POST /make-server-1f891a69/functional-groups                │
│  ├── POST /make-server-1f891a69/seed-functional-groups           │
│  │                                                                │
│  ├── GET  /make-server-1f891a69/metadata ⭐ NEW                 │
│  │                                                                │
│  ├── GET    /make-server-1f891a69/code-snippets ⭐ NEW          │
│  ├── POST   /make-server-1f891a69/code-snippets ⭐ NEW          │
│  ├── DELETE /make-server-1f891a69/code-snippets/:id ⭐ NEW      │
│  │                                                                │
│  ├── POST /make-server-1f891a69/auth/register                    │
│  ├── GET  /make-server-1f891a69/user/profile/:userId             │
│  ├── PUT  /make-server-1f891a69/user/profile/:userId             │
│  │                                                                │
│  ├── POST /make-server-1f891a69/pubchem/fetch-by-name            │
│  ├── POST /make-server-1f891a69/pubchem/fetch-by-cid             │
│  ├── POST /make-server-1f891a69/pubchem/batch-fetch              │
│  ├── POST /make-server-1f891a69/pubchem/analyze-compound         │
│  │                                                                │
│  ├── GET    /make-server-1f891a69/analysis-reports               │
│  ├── POST   /make-server-1f891a69/analysis-reports               │
│  └── DELETE /make-server-1f891a69/analysis-reports/:id           │
└─────────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────────┐
│                   Supabase KV Store                              │
├─────────────────────────────────────────────────────────────────┤
│  /supabase/functions/server/kv_store.tsx                         │
│                                                                   │
│  Key-Value Storage:                                              │
│  ├── plants:list                                                 │
│  ├── plant_{id}                                                  │
│  ├── compounds:list                                              │
│  ├── compound_{id}                                               │
│  ├── functional_groups:list ⭐                                  │
│  ├── functional_group_{name} ⭐                                 │
│  ├── code_snippet_{id} ⭐ NEW                                   │
│  ├── user_snippets_{userId} ⭐ NEW                              │
│  ├── metadata:version ⭐ NEW                                    │
│  ├── metadata:last_updated ⭐ NEW                               │
│  ├── pubchem:compound_{cid}                                      │
│  ├── pubchem:compounds:list                                      │
│  ├── user_profile_{userId}                                       │
│  ├── user_activity_{userId}_{timestamp}                          │
│  └── analysis_report_{userId}_{reportId}                         │
└─────────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────────┐
│                  External Services                               │
├─────────────────────────────────────────────────────────────────┤
│  ├── PubChem API (Compound data)                                 │
│  ├── Supabase Auth (User authentication)                         │
│  └── Unsplash API (Plant images)                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
App.tsx
├── DataInitializer
│   └── Seeds initial data on first load
│
├── TopNavigation
│   └── Navigation tabs and upload button
│
├── DemoModeBanner
│   └── Shows data initialization status
│
└── Main Content (based on activeTab)
    │
    ├── Home Tab
    │   ├── MetadataPanel ⭐ NEW
    │   │   ├── Database Statistics Card
    │   │   ├── Refresh Button
    │   │   └── Version Info
    │   │
    │   ├── Action Cards (Browse, Analyze, Upload)
    │   ├── Recent Activity
    │   └── Knowledge Graph Preview
    │
    ├── Plants Tab
    │   ├── SidebarFilters
    │   │   ├── Functional Groups Filter
    │   │   ├── Molecular Weight Slider
    │   │   ├── Drug-Likeness Checkboxes
    │   │   └── Plant Type Filter
    │   │
    │   └── PlantCard Grid
    │       └── Individual PlantCards
    │
    ├── Compounds Tab
    │   ├── Search and Filter Controls
    │   ├── CompoundCard Grid
    │   │   └── Individual CompoundCards
    │   │
    │   └── MoleculeViewer (Dialog)
    │       ├── 2D Structure
    │       ├── 3D Viewer
    │       └── Properties Panel
    │
    ├── Analysis Tab
    │   ├── DiseaseCompoundSearch
    │   │   ├── Search Input
    │   │   ├── PubChem Integration
    │   │   └── Results Display
    │   │
    │   ├── KnowledgeGraph
    │   │   └── Interactive Network Visualization
    │   │
    │   ├── ChartsPanel
    │   │   ├── Functional Group Distribution
    │   │   └── Similarity Clustering
    │   │
    │   └── CompoundAnalysisPage (when analyzing)
    │       ├── Compound Properties
    │       ├── Plant Sources
    │       ├── Disease Associations
    │       └── Save Report Button
    │
    ├── Reports Tab ⭐ ENHANCED
    │   └── Tabs Component
    │       ├── Analysis Reports Tab
    │       │   └── List of saved reports
    │       │       └── Delete functionality
    │       │
    │       └── Code Snippets Tab ⭐ NEW
    │           └── CodeSnippetsManager
    │               ├── Add Snippet Button
    │               ├── Snippet List
    │               │   ├── Code Display
    │               │   ├── Language Badge
    │               │   ├── Tags
    │               │   └── Delete Button
    │               │
    │               └── Add Snippet Dialog
    │                   ├── Title Input
    │                   ├── Language Select
    │                   ├── Code Textarea
    │                   ├── Description Textarea
    │                   └── Tags Input
    │
    └── Profile Tab
        └── ProfilePage
            ├── User Info
            ├── Statistics
            ├── Activity Timeline
            └── Auth Controls
```

## Data Flow Diagrams

### 1. Application Initialization
```
User Opens App
     ↓
DataInitializer Component Mounts
     ↓
Check if data exists in backend
     ↓
If NO data:
     ↓
Display "Seeding Database" message
     ↓
POST /make-server-1f891a69/seed-data
     ├── Store plants in KV store
     └── Store compounds in KV store
     ↓
POST /make-server-1f891a69/seed-functional-groups
     ├── Extract functional groups from compounds
     └── Store functional groups in KV store
     ↓
Set isDataInitialized = true
     ↓
Load App.tsx main content
     ↓
MetadataPanel fetches statistics
     ↓
Display Home Tab
```

### 2. MetadataPanel Data Flow ⭐ NEW
```
MetadataPanel Mounts
     ↓
useEffect triggers fetchMetadata()
     ↓
GET /make-server-1f891a69/metadata
     ↓
Server queries KV store:
     ├── plants:list → count plants
     ├── compounds:list → count compounds
     ├── functional_groups:list → count groups
     └── pubchem:compounds:list → count PubChem data
     ↓
Return aggregated metadata:
     ├── totalPlants
     ├── totalCompounds
     ├── totalFunctionalGroups
     ├── totalPubChemCompounds
     ├── databaseVersion
     └── lastUpdated
     ↓
Update component state
     ↓
Display statistics with icons
```

### 3. Code Snippet Management Flow ⭐ NEW
```
User navigates to Reports → Code Snippets
     ↓
CodeSnippetsManager Mounts
     ↓
Check user authentication
     ↓
If authenticated:
     ↓
GET /make-server-1f891a69/code-snippets
     ├── Verify access token
     ├── Get user ID from token
     └── Fetch user's snippets from KV store
     ↓
Display snippets list
     ↓
User clicks "Add Snippet"
     ↓
Dialog opens with form
     ↓
User fills form and clicks Save
     ↓
POST /make-server-1f891a69/code-snippets
     ├── Verify access token
     ├── Generate unique snippet ID
     ├── Store snippet: code_snippet_{id}
     └── Update user's list: user_snippets_{userId}
     ↓
Show success toast
     ↓
Refresh snippets list
     ↓
User can view/delete snippets
```

### 4. Compound Analysis with PubChem
```
User searches for compound/disease
     ↓
DiseaseCompoundSearch Component
     ↓
POST /make-server-1f891a69/pubchem/fetch-by-name
     ↓
Server fetches from PubChem API
     ↓
Parse compound data:
     ├── CID
     ├── SMILES
     ├── Molecular Formula
     ├── Molecular Weight
     └── Properties
     ↓
Store in KV store: pubchem:compound_{cid}
     ↓
POST /make-server-1f891a69/pubchem/analyze-compound
     ├── Compare with existing plant compounds
     ├── Find matching functional groups
     └── Identify disease associations
     ↓
Display CompoundAnalysisPage
     ├── Show compound structure
     ├── List plant sources
     ├── Show disease targets
     └── Display functional groups
     ↓
User clicks "Save Report"
     ↓
POST /make-server-1f891a69/analysis-reports
     ├── Store report with user ID
     └── Add to user's reports list
     ↓
Show success toast
```

## Key Features & Capabilities

### ✅ Completed Features

1. **Data Management**
   - Automated data seeding
   - Plant and compound storage
   - Functional group extraction
   - PubChem integration

2. **User Interface**
   - Responsive dashboard layout
   - Interactive navigation
   - Real-time statistics (NEW)
   - Multiple visualization modes

3. **Search & Filter**
   - Plant search by name/scientific name
   - Compound filtering by functional groups
   - Molecular weight range filtering
   - Drug-likeness filtering

4. **Analysis Tools**
   - 2D/3D molecule viewer
   - Knowledge graph visualization
   - Compound similarity clustering
   - Disease-compound associations

5. **Data Visualization**
   - Functional group distribution charts
   - Scatter plot for similarity
   - Interactive knowledge graph
   - Statistics dashboard (NEW)

6. **User Management**
   - User registration/login
   - Profile management
   - Activity tracking
   - Statistics tracking

7. **Code Management** (NEW)
   - Save code snippets
   - Multi-language support
   - Tag organization
   - User-specific storage

8. **Reporting** (ENHANCED)
   - Save analysis reports
   - View report history
   - Delete reports
   - Code snippets management

## Security Implementation

### Authentication Flow
```
1. User registers → POST /auth/register
2. Supabase creates user with email confirmation
3. User logs in → supabase.auth.signInWithPassword()
4. Receive access token
5. Store token in session
6. Include in all authenticated requests:
   Authorization: Bearer {access_token}
```

### Protected Endpoints
- `/user/profile/:userId` (PUT)
- `/code-snippets` (GET, POST, DELETE)
- `/analysis-reports` (GET, POST, DELETE)
- `/user/activity/:userId` (GET)

### Public Endpoints
- `/plants` (GET)
- `/compounds` (GET)
- `/functional-groups` (GET)
- `/metadata` (GET)
- `/pubchem/*` (POST)

## Performance Considerations

### Optimization Strategies
1. **Data Loading**
   - Load data once on initialization
   - Cache in component state
   - Refresh only when needed

2. **API Calls**
   - Batch operations when possible
   - Use pagination for large lists
   - Implement debouncing for search

3. **Rendering**
   - Virtual scrolling for large lists
   - Lazy loading for images
   - Conditional rendering based on view

4. **Storage**
   - KV store for fast retrieval
   - Indexed keys for quick lookup
   - Efficient data structures

## Error Handling

### Frontend
- Try-catch blocks in all async functions
- Toast notifications for user feedback
- Loading states during operations
- Error boundaries for component failures

### Backend
- Comprehensive error logging
- Detailed error messages
- HTTP status codes
- Graceful fallbacks

## Future Enhancements

### Planned Features
1. Advanced search with autocomplete
2. Batch upload for compounds
3. Export reports to PDF
4. Share code snippets
5. Collaborative features
6. API documentation
7. Advanced analytics
8. Mobile app version

This architecture provides a solid foundation for a comprehensive medicinal plants research platform with robust data management, analysis capabilities, and user interaction features.
