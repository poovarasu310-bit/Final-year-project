# 🌿 MediPlants - Open Access Drug Prediction Tool

## Overview

MediPlants is a **fully open-source, public-access drug prediction tool** for medicinal plant compound analysis and chemoinformatics research. No authentication or sign-in is required to use any features of the application.

## 🔓 Open Access Features

### Complete Public Access
- **No Login Required**: All features are available without creating an account
- **No Authentication Barriers**: Upload compounds, perform analysis, and view results freely
- **Session-Based Storage**: Your analysis results and reports are stored in your browser's local storage

### Available Features (All Public)

#### 1. **Browse Plants Database**
- Explore medicinal plants with images and scientific names
- View detailed plant information including compounds and functional groups
- No restrictions on plant data access

#### 2. **Upload & Analyze Compounds**
- Upload SMILES strings or CSV files
- Perform complete chemoinformatics analysis
- View 2D/3D molecular structures
- No account required for compound uploads

#### 3. **Compound Analysis Pipeline**
- **Step 1**: Drug-likeness prediction (Lipinski's Rule of Five)
- **Step 2**: Molecular descriptors calculation (LogP, TPSA, H-bond donors/acceptors)
- **Step 3**: ML & QSAR modeling with visualizations
- **Step 4**: Interactive ML visualizations (decision boundaries, feature importance)
- **Step 5**: Final interpretation with comprehensive reports

#### 4. **Knowledge Graph Visualization**
- Interactive graph linking plants → compounds → functional groups → diseases
- Filter by functional groups, molecular weight, and drug-likeness
- Export and share visualizations

#### 5. **Analysis Reports**
- Save analysis reports locally (browser storage)
- View saved reports anytime in the Reports tab
- Export reports as PDF, JSON, or CSV
- Delete reports as needed

#### 6. **Code Snippets Manager**
- Save Python, R, JavaScript, and other code snippets
- Organize with tags and descriptions
- Stored locally in your browser
- No server-side authentication required

## 📊 Data Storage

### Local Storage (Browser-Based)
All user-generated data is stored in your browser's `localStorage`:

- **Analysis Reports**: `analysis_reports` key
- **Code Snippets**: `code_snippets` key
- **Demo Mode Settings**: `demo_mode` key

### Server-Side Data
The following data is stored in Supabase (no authentication required):

- **Plants Database**: Medicinal plant information
- **Compounds Database**: Molecular structures and properties
- **Analysis Cache**: Deterministic caching for repeated analyses
- **PubChem Integration**: Automatic compound data retrieval

## 🎯 Use Cases

### Research & Education
- Academic research on medicinal plant compounds
- Student learning in chemoinformatics and drug discovery
- Open science and reproducible research

### Drug Discovery
- Lead compound identification
- Structure-activity relationship analysis
- Virtual screening of natural products

### Data Analysis
- Molecular descriptor calculations
- QSAR modeling and predictions
- Chemical similarity analysis

## 🚀 Getting Started

1. **Open the Application**: No registration needed
2. **Choose Your Path**:
   - Browse existing plants and compounds
   - Upload your own SMILES strings
   - Perform disease-based compound searches
3. **Analyze**: Run full chemoinformatics pipeline
4. **Export**: Download results as PDF, JSON, or CSV
5. **Save**: Reports stored in your browser for future access

## 💾 Data Persistence

### Your Data
- Stored locally in browser `localStorage`
- Persists across sessions
- Private to your browser
- Can be cleared via browser settings

### Shared Data
- Plants and compounds are public
- Analysis cache improves performance
- No personal data is collected or stored on servers

## 🔒 Privacy

- **No User Accounts**: No email, password, or personal information required
- **No Tracking**: No user behavior analytics or tracking
- **Local Storage Only**: Your reports and snippets stay in your browser
- **Open Source**: Full transparency in data handling

## 📝 Export & Share

### Export Formats
- **PDF**: Publication-ready reports
- **JSON**: Machine-readable data export
- **CSV**: Spreadsheet-compatible format

### Sharing
- Use built-in share functionality
- Copy shareable text summaries
- Export and distribute files freely

## 🛠️ Technical Details

### Frontend
- React + TypeScript
- Tailwind CSS for styling
- RDKit.js for molecular operations
- Recharts for data visualization

### Backend
- Supabase (PostgreSQL + Edge Functions)
- PubChem API integration
- Deterministic analysis caching
- Public API endpoints (no auth required)

### Storage Architecture
```
Browser (localStorage)
├── analysis_reports     # User's analysis results
├── code_snippets        # User's saved code
└── demo_mode           # App preferences

Supabase (Public)
├── kv_store            # Plants, compounds, cache
└── Edge Functions      # Analysis & data services
```

## 🌐 Contributing

This is an open-access tool for the scientific community. Contributions welcome!

### How to Contribute
1. Add new medicinal plants to the database
2. Improve analysis algorithms
3. Enhance visualizations
4. Report bugs or suggest features

## 📄 License

Open source and freely available for research and educational purposes.

## 🤝 Acknowledgments

- Built for the open science community
- Powered by PubChem, RDKit, and open molecular databases
- Designed for accessibility and reproducibility

---

**Note**: Since all data is stored in browser localStorage, clearing your browser data will remove your saved reports and code snippets. Export important data before clearing browser storage.
