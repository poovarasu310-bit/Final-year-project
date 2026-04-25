# Medicinal Plants Application - User Guide

## Welcome! 🌿

This comprehensive guide will help you navigate and use all features of the Medicinal Plants Research Platform.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Home Dashboard](#home-dashboard)
3. [Plants Explorer](#plants-explorer)
4. [Compounds Database](#compounds-database)
5. [Analysis Tools](#analysis-tools)
6. [Reports & Code Snippets](#reports--code-snippets)
7. [User Profile](#user-profile)
8. [Tips & Best Practices](#tips--best-practices)

---

## Getting Started

### First-Time Setup

When you first open the application:

1. **Data Initialization** will run automatically
   - The system seeds medicinal plants data
   - Extracts and indexes chemical compounds
   - Organizes functional groups
   - This takes about 10-15 seconds

2. **Welcome Screen** appears
   - Shows initialization progress
   - Displays what's being loaded
   - Auto-redirects when complete

3. **Home Dashboard** loads
   - See live database statistics
   - Access quick action cards
   - View recent activity

### Navigation

Use the **top navigation bar** to access:
- 🏠 **Home** - Dashboard and overview
- 🌱 **Plants** - Browse medicinal plants
- 💊 **Compounds** - Explore chemical compounds
- 🔬 **Analysis** - Research tools and visualizations
- 📊 **Reports** - Saved analyses and code snippets
- 👤 **Profile** - User account and settings

---

## Home Dashboard

### Database Statistics Panel ⭐ NEW

**What you see:**
- **Medicinal Plants** count (🌿 green icon)
- **Compounds** count (💊 blue icon)
- **Functional Groups** count (📊 purple icon)
- **PubChem Data** count (🗄️ orange icon)
- **Database Version** and **Last Updated** timestamp

**Features:**
- 🔄 **Refresh button** - Updates statistics in real-time
- 📈 **Auto-refresh** - Loads data when page opens
- ⚠️ **Error handling** - Retry option if loading fails
- ⏳ **Loading states** - Shows spinner while fetching

### Quick Action Cards

Three main action cards for quick access:

1. **Browse Plants**
   - Opens Plants Explorer
   - View all medicinal plants
   - Search and filter capabilities

2. **Analyze Compounds**
   - Opens Compounds Database
   - Study molecular structures
   - View 2D/3D models

3. **Upload Data**
   - Add new compounds
   - Support for SMILES format
   - CSV batch upload

### Recent Activity

See the latest system updates:
- New compounds added
- Completed analyses
- Database updates
- Color-coded badges (New, Complete, Updated)

### Knowledge Graph Preview

Visual representation showing:
- Number of plants
- Number of compounds
- Number of functional groups
- Number of disease associations
- Click to explore interactive graph

---

## Plants Explorer

### Browse All Plants

**View Options:**
- **Grid View** (default) - Visual cards with images
- **List View** - Compact table format
- Toggle with Grid/List icons

### Plant Card Information

Each plant card displays:
- **Plant Photo** - High-quality image
- **Common Name** - e.g., "Turmeric"
- **Tamil Name** - e.g., "மஞ்சள்"
- **Scientific Name** - e.g., "*Curcuma longa*"
- **Compound Count** - Number of active compounds
- **Plant Type** - Herb, Tree, Shrub, Succulent
- **View Details** button

### Search & Filter

**Left Sidebar Filters:**

1. **Functional Groups**
   - Select one or multiple groups
   - Examples: Phenol, Alkaloid, Terpene
   - Instant filtering

2. **Molecular Weight Range**
   - Slider to set min/max range
   - Default: 50 - 1000 Da
   - Adjust for specific compound sizes

3. **Drug-Likeness**
   - ✅ Excellent
   - ✅ Good
   - ✅ Moderate
   - ✅ Poor
   - Select multiple categories

4. **Plant Types**
   - Herb
   - Tree
   - Shrub
   - Succulent

### Plant Details

Click "View Details" to see:
- Full description
- Primary compounds list
- Therapeutic targets
- Functional groups distribution
- Related compounds

---

## Compounds Database

### Browsing Compounds

**View modes:**
- Grid of compound cards
- Detailed information per card
- Quick molecule viewer access

### Compound Card Information

Each card shows:
- **Compound Name** - e.g., "Curcumin"
- **Molecular Formula** - e.g., C₂₁H₂₀O₆
- **Molecular Weight** - e.g., 368.38 Da
- **Functional Groups** - Color-coded badges
- **Bioactivity** - Known effects
- **Drug-Likeness** - Classification
- **Plant Sources** - Where it's found

### Molecular Viewer

Click "View Molecule" to open:

**2D Structure View:**
- Chemical structure diagram
- Bond representations
- Atom labels
- Functional group highlighting

**3D Interactive View:**
- Rotate molecule (click and drag)
- Zoom (scroll wheel)
- Ball-and-stick model
- Space-filling option

**Properties Panel:**
- LogP (Lipophilicity)
- SMILES notation
- Molecular formula
- Source plants
- Bioactivity information

### Search & Filter

**Search by:**
- Compound name
- Molecular formula
- Plant source
- Functional group

**Filter by:**
- Plant source (dropdown)
- Functional groups (checkboxes)
- Molecular weight range
- Drug-likeness category

---

## Analysis Tools

### Disease-Compound Search

**How to use:**

1. **Enter Disease/Condition**
   - Type disease name (e.g., "diabetes")
   - Or enter compound name
   - Or paste SMILES string

2. **PubChem Integration**
   - Automatically searches PubChem database
   - Fetches compound data
   - Retrieves CID (Compound ID)

3. **View Results**
   - Compound properties
   - Associated diseases
   - Plant sources containing compound
   - Functional groups present

4. **Analyze Further**
   - Click "Analyze Compound"
   - See detailed analysis page
   - View related compounds
   - Explore knowledge graph

### Knowledge Graph

**Interactive Network Visualization:**

**Nodes represent:**
- 🌱 **Plants** (green circles)
- 💊 **Compounds** (blue circles)
- 📊 **Functional Groups** (purple circles)
- 🏥 **Diseases** (red circles)

**Connections show:**
- Plant → Compound relationships
- Compound → Functional Group relationships
- Compound → Disease associations

**Interactions:**
- Click nodes to highlight connections
- Drag nodes to rearrange
- Zoom in/out
- Pan across the graph
- Hover for details

### Charts & Visualizations

**Functional Group Distribution:**
- Bar chart showing frequency
- Color-coded by category
- Interactive tooltips
- Export capability

**Similarity Clustering:**
- Scatter plot of compounds
- Groups by structural similarity
- Click points for details
- Zoom and pan controls

### Compound Analysis Page

When analyzing a specific compound:

**Overview Section:**
- Compound name and CID
- Molecular structure (2D/3D)
- Key properties
- Drug-likeness score

**Plant Sources:**
- List of plants containing compound
- Concentration levels
- Traditional uses

**Disease Associations:**
- Related conditions
- Therapeutic targets
- Mechanism of action
- Clinical evidence

**Functional Groups:**
- All groups present
- Highlighted in structure
- Properties of each group

**Actions:**
- 💾 Save Report
- 📤 Export Data
- 🔗 Share Link

---

## Reports & Code Snippets

### Tab 1: Analysis Reports

**View Saved Reports:**

Each report displays:
- **Compound Name** and **PubChem CID**
- **Analysis Date/Time**
- **Statistics:**
  - 🌱 Number of plant sources
  - 🏥 Number of disease targets
  - 💊 Number of functional groups

**Actions:**
- **Delete Report** - Remove from history
- Reports are user-specific (requires login)

**How to create reports:**
1. Go to Analysis tab
2. Search and analyze a compound
3. Click "Save Report" button
4. Report appears in Reports tab

### Tab 2: Code Snippets ⭐ NEW

**Manage Research Code:**

Perfect for storing:
- Data analysis scripts
- Visualization code
- Processing pipelines
- Custom algorithms
- Query examples

**How to add a snippet:**

1. Click **"+ Add Snippet"** button
2. Fill in the form:
   - **Title** - Descriptive name
   - **Language** - Select from:
     - Python
     - JavaScript
     - R
     - SQL
     - Bash
     - Other
   - **Code** - Paste your code
   - **Description** (optional) - What it does
   - **Tags** (optional) - Comma-separated keywords
3. Click **"💾 Save Snippet"**

**Snippet Display:**
- Title with language badge
- Description
- Tags (if added)
- Full code with syntax formatting
- Creation timestamp
- Delete button

**Benefits:**
- Store frequently used scripts
- Organize by tags
- Quick reference
- Share with team (coming soon)
- Version control (planned)

**Use Cases:**
- Python scripts for compound analysis
- R code for statistical tests
- SQL queries for data extraction
- Bash scripts for batch processing
- JavaScript for custom visualizations

**Authentication Required:**
- Must be logged in to use
- Snippets are private to your account
- Secure storage in Supabase

---

## User Profile

### Account Information

**Profile Details:**
- Full name
- Email address
- Institution/Organization
- Role (Researcher, Student, etc.)
- Join date
- Verification status

### User Statistics

Track your activity:
- 🌱 **Plants Viewed** - Total plant pages accessed
- 💊 **Compounds Analyzed** - Compounds studied
- 📊 **Reports Generated** - Saved analysis reports
- 📤 **Uploads Contributed** - Data uploaded

### Activity Timeline

See your recent actions:
- Plant views with timestamps
- Compound analyses performed
- Reports generated
- Uploads completed
- Color-coded by activity type

### Authentication

**Sign Up:**
1. Click "Sign Up" button
2. Enter email and password
3. Add full name and institution
4. Email confirmation automatic
5. Start using immediately

**Sign In:**
1. Click "Sign In" button
2. Enter credentials
3. Access personalized features

**Sign Out:**
- Click "Sign Out" button
- Clears session
- Returns to public view

### Privacy & Security

- Passwords securely hashed
- Session tokens for authentication
- Activity tracked with consent
- Data stored in Supabase
- GDPR compliant

---

## Tips & Best Practices

### Getting the Most from the Platform

**For Researchers:**
1. Save your analyses as reports
2. Use code snippets for reproducibility
3. Track plants of interest
4. Export data regularly
5. Use tags to organize snippets

**For Students:**
1. Explore the knowledge graph
2. Study compound structures
3. Compare functional groups
4. Save useful code examples
5. Track learning progress

**For Data Scientists:**
1. Upload custom compound data
2. Save analysis scripts
3. Use API endpoints (see docs)
4. Export for external tools
5. Batch process compounds

### Performance Tips

**Faster Loading:**
- Clear browser cache occasionally
- Use modern browsers (Chrome, Firefox, Edge)
- Stable internet connection
- Close unnecessary tabs

**Better Search:**
- Use specific terms
- Try scientific names
- Filter before searching
- Save frequent searches

**Efficient Analysis:**
- Narrow filters first
- Use batch operations
- Save progress regularly
- Export large datasets

### Keyboard Shortcuts

(Coming soon)
- `Ctrl+K` - Quick search
- `Ctrl+S` - Save report
- `Ctrl+N` - New snippet
- `Escape` - Close dialogs

### Data Management

**Best Practices:**
1. Tag snippets consistently
2. Use descriptive names
3. Add comments to code
4. Regular exports
5. Organize by project

**Backup Strategy:**
- Save important reports
- Export code snippets
- Download analyses
- Keep local copies

### Troubleshooting

**Common Issues:**

1. **Data not loading**
   - Refresh the page
   - Check internet connection
   - Clear browser cache
   - Try incognito mode

2. **Can't save snippets**
   - Ensure you're logged in
   - Check session hasn't expired
   - Verify form is complete
   - Try logging in again

3. **Slow performance**
   - Close other browser tabs
   - Reduce active filters
   - Use list view instead of grid
   - Update browser

4. **Analysis errors**
   - Check compound name spelling
   - Try PubChem CID instead
   - Verify SMILES format
   - Contact support

### Contact & Support

**Need Help?**
- Check this user guide
- View architecture documentation
- Browse example code snippets
- Contact system administrator

**Report Issues:**
- Note error messages
- Include steps to reproduce
- Screenshot if helpful
- Check browser console

---

## Feature Roadmap

### Coming Soon ✨

**Q1 2024:**
- Advanced search with autocomplete
- Export reports to PDF
- Share code snippets
- Collaborative workspaces

**Q2 2024:**
- Mobile app version
- Offline mode
- Enhanced visualizations
- Custom dashboards

**Q3 2024:**
- API access
- Bulk data import
- Advanced analytics
- Machine learning integration

**Q4 2024:**
- Multi-language support
- Custom themes
- Notification system
- Team collaboration features

---

## Appendix

### Supported File Formats

**Upload:**
- SMILES (.txt, .smi)
- CSV (.csv)
- JSON (.json)

**Export:**
- PDF (reports)
- CSV (data tables)
- JSON (structured data)
- PNG (images)

### Glossary

- **CID** - PubChem Compound Identifier
- **SMILES** - Simplified Molecular Input Line Entry System
- **LogP** - Partition coefficient (lipophilicity)
- **Functional Group** - Specific atoms arrangement in molecule
- **Drug-Likeness** - Probability of becoming a drug
- **Bioactivity** - Biological effect of compound

### References

- PubChem Database
- Traditional Medicine Database
- Scientific Literature
- Clinical Trial Data

---

**Thank you for using the Medicinal Plants Research Platform!** 🌿💊🔬

We hope this guide helps you make the most of all features. Happy researching!
