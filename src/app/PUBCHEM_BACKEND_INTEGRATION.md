# PubChem Backend Integration Guide

## Overview

The PubChem integration now operates as a **backend-only service** that automatically fetches compound data from PubChem when users search for diseases or compounds. The data is stored in Supabase and analyzed against your medicinal plant database to find natural sources.

---

## How It Works

### 🔄 Workflow

```
User Search → PubChem API → Supabase Storage → Plant Analysis → Results Display
```

1. **User searches** for a compound or disease (e.g., "Curcumin", "Inflammation")
2. **Backend fetches** compound data from PubChem REST API
3. **Data is stored** in Supabase KV store with key: `pubchem:compound:{cid}`
4. **Analysis engine** matches compound with medicinal plants based on:
   - Compound name matching
   - Functional group overlap
   - Therapeutic target alignment
5. **Results displayed** showing:
   - Compound properties (formula, weight, SMILES)
   - Plant sources (with confidence levels)
   - Related diseases and bioactivity

---

## User Interface

### Disease & Compound Search (Analysis Tab)

**Location:** Analysis Tab → Disease & Compound Search

**Features:**
- Search by compound name (e.g., Curcumin, Aspirin)
- Search by disease/condition (future feature)
- Quick-search examples for common compounds
- Real-time PubChem integration
- Plant source matching with confidence levels

**Example Search:**
```
1. Navigate to "Analysis" tab
2. Click "Compound" button
3. Enter: "Curcumin"
4. Click search icon
5. View results:
   ✓ Compound data (from PubChem)
   ✓ Plant sources (from your database)
   ✓ Related diseases
   ✓ Bioactivity information
```

---

## Backend Architecture

### API Endpoints

#### 1. Fetch Compound from PubChem
```typescript
POST /pubchem/fetch-by-name
```

**Request:**
```json
{
  "compoundName": "Curcumin"
}
```

**Response:**
```json
{
  "message": "PubChem data fetched successfully",
  "compound": {
    "cid": 969516,
    "name": "Curcumin",
    "molecularFormula": "C21H20O6",
    "molecularWeight": 368.4,
    "canonicalSmiles": "COc1cc(/C=C/C(=O)CC(=O)/C=C/c2ccc(O)c(OC)c2)ccc1O",
    "isomericSmiles": "...",
    "inchi": "...",
    "xlogp": 3.2,
    "hBondDonorCount": 2,
    "hBondAcceptorCount": 6,
    ...
  }
}
```

#### 2. Analyze Compound Against Plants
```typescript
POST /analyze-compound-plants
```

**Request:**
```json
{
  "smiles": "COc1cc(/C=C/C(=O)CC(=O)/C=C/c2ccc(O)c(OC)c2)ccc1O",
  "compoundName": "Curcumin",
  "cid": 969516
}
```

**Response:**
```json
{
  "compoundName": "Curcumin",
  "smiles": "...",
  "cid": 969516,
  "functionalGroups": ["Phenol", "Carbonyl", "Alkene (C=C)", "Ether"],
  "plantSources": [
    {
      "plantId": "2",
      "plantName": "Turmeric",
      "scientificName": "Curcuma longa",
      "confidence": "high",
      "compounds": ["Curcumin", "Demethoxycurcumin", "Bisdemethoxycurcumin"],
      "therapeuticUses": ["COX-2 Inhibition", "NF-κB Pathway", "Antioxidant Defense"]
    }
  ],
  "relatedDiseases": ["Inflammation", "Cancer", "Oxidative Stress"],
  "bioactivity": "Anti-inflammatory, Antioxidant, Anticancer"
}
```

---

## Data Storage

### Supabase KV Store Structure

```
Key: pubchem:compound:{cid}
Value: {
  cid: number,
  name: string,
  molecularFormula: string,
  molecularWeight: number,
  canonicalSmiles: string,
  isomericSmiles: string,
  inchi: string,
  inchiKey: string,
  xlogp: number,
  hBondDonorCount: number,
  hBondAcceptorCount: number,
  rotatableBondCount: number,
  heavyAtomCount: number,
  fetchedAt: string,
  source: "PubChem"
}

Key: pubchem:compounds:list
Value: [969516, 2244, 445154, ...]  // Array of CIDs
```

---

## Plant Matching Algorithm

### Confidence Levels

**High Confidence:**
- Compound name directly matches plant's primary compounds
- Example: "Curcumin" → Turmeric (contains Curcumin)

**Medium Confidence:**
- 3+ functional groups overlap with plant's functional groups
- Similar therapeutic targets

**Low Confidence:**
- Some functional group overlap
- Related compound families

### Functional Group Detection

The system detects functional groups from SMILES strings:

```typescript
Detected Groups:
- Carboxyl (-COOH): "C(=O)O" or "COOH"
- Hydroxyl (-OH): "OH" or "O"
- Carbonyl: "C=O"
- Aromatic Ring: "c" or ring notation
- Phenol: aromatic + hydroxyl
- Ester: "C(=O)O" (non-acid)
- Amine: "NH2" or "N"
- Amide: "C(=O)N"
- Alkene: "C=C"
- Ether: "COC" or ether oxygen
```

### Bioactivity Prediction

**Known Compounds:**
- Database of ~50 compounds with known bioactivities

**Functional Group-Based:**
- Phenol + Aromatic Ring → Antioxidant
- Carboxyl → Anti-inflammatory
- Amine → Neurotransmitter activity

---

## Example Use Cases

### Use Case 1: Find Plant Source for Curcumin

**User Action:**
1. Go to Analysis tab
2. Search "Curcumin"

**System Response:**
1. Fetches Curcumin from PubChem (CID: 969516)
2. Stores in Supabase
3. Finds Turmeric as HIGH confidence match
4. Shows: 
   - Molecular properties
   - SMILES structure
   - Turmeric as source
   - Related therapeutic targets

### Use Case 2: Discover Compounds in Ginseng

**User Action:**
1. Browse to Plants tab
2. Click on Ginseng

**System Shows:**
- Ginsenosides (primary compounds)
- Each can be searched via Analysis tab
- PubChem will auto-fetch detailed data

### Use Case 3: Research Anti-inflammatory Compounds

**User Action:**
1. Search "Quercetin" (anti-inflammatory compound)

**System Response:**
1. Fetches from PubChem
2. Identifies functional groups
3. Finds multiple plants:
   - Onions (high confidence)
   - Medicinal Herbs (medium confidence)
4. Lists related diseases: Inflammation, Allergies, etc.

---

## Data Flow Diagram

```
┌─────────────┐
│ User Search │
│  "Curcumin" │
└──────┬──────┘
       │
       v
┌─────────────────────┐
│  Frontend Request   │
│ DiseaseCompound     │
│    Search.tsx       │
└──────┬──────────────┘
       │
       v
┌─────────────────────┐
│  Backend Endpoint   │
│ /pubchem/fetch-by-  │
│      name           │
└──────┬──────────────┘
       │
       v
┌─────────────────────┐
│   PubChem API       │
│  REST API Call      │
└──────┬──────────────┘
       │
       v
┌─────────────────────┐
│  Supabase Storage   │
│ pubchem:compound:   │
│      {cid}          │
└──────┬──────────────┘
       │
       v
┌─────────────────────┐
│ Analysis Endpoint   │
│ /analyze-compound-  │
│      plants         │
└──────┬──────────────┘
       │
       v
┌─────────────────────┐
│ Plant Database      │
│ Match & Analyze     │
└──────┬──────────────┘
       │
       v
┌─────────────────────┐
│  Display Results    │
│ - Plant Sources     │
│ - Bioactivity       │
│ - Diseases          │
└─────────────────────┘
```

---

## Performance & Caching

### Caching Strategy

**First Search:**
- Fetches from PubChem (1-2 seconds)
- Stores in Supabase
- Analyzes against plants
- Returns results

**Subsequent Searches:**
- Checks Supabase first
- If found, skips PubChem fetch
- Instant analysis results

**Benefits:**
- Faster response times
- Reduced API calls
- Persistent data storage

---

## Rate Limiting

### PubChem API Limits

- **Max requests:** 5/second, 400/minute
- **Current implementation:** Single requests only
- **Future enhancement:** Batch background processing

### Best Practices

1. Search compounds individually
2. Common compounds already cached
3. System auto-stores all searches
4. Re-searching is instant (uses cache)

---

## Error Handling

### Common Errors

**"Compound not found in PubChem"**
- Compound doesn't exist in PubChem database
- Try alternative names or CID

**"No plant sources found"**
- Compound not present in current plant database
- System still shows compound properties
- You can manually add plant associations

**"Failed to fetch from PubChem"**
- Network connectivity issue
- PubChem API temporarily unavailable
- Retry after a few seconds

---

## Future Enhancements

### Planned Features

1. **Disease-based search**
   - Search by disease name
   - Find all related compounds
   - Show plant sources

2. **Similarity search**
   - Find structurally similar compounds
   - Based on SMILES fingerprints
   - Tanimoto coefficient scoring

3. **Batch background processing**
   - Auto-populate database
   - Scheduled PubChem syncs
   - Database expansion

4. **Advanced filtering**
   - Filter by drug-likeness
   - Filter by bioactivity type
   - Filter by plant availability

---

## Integration with Other Features

### Molecular Visualization

Collected SMILES strings are used in:
- **2D Structure Viewer** (CompoundAnalysisPage)
- **3D Molecular Models** (Three.js renderer)
- **Functional Group Highlighting**

### Knowledge Graph

PubChem data feeds into:
- Compound-Plant relationships
- Compound-Disease connections
- Functional group networks

### Reports

Analysis results can be:
- Exported as PDF reports
- Downloaded as CSV data
- Shared with colleagues

---

## API Testing

### Test Endpoints

```bash
# Health check
curl https://your-project.supabase.co/functions/v1/make-server-1f891a69/health

# Fetch compound
curl -X POST https://your-project.supabase.co/functions/v1/make-server-1f891a69/pubchem/fetch-by-name \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{"compoundName": "Curcumin"}'

# Analyze compound
curl -X POST https://your-project.supabase.co/functions/v1/make-server-1f891a69/analyze-compound-plants \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{
    "smiles": "COc1cc(/C=C/C(=O)CC(=O)/C=C/c2ccc(O)c(OC)c2)ccc1O",
    "compoundName": "Curcumin",
    "cid": 969516
  }'
```

---

## Troubleshooting

### Issue: Slow search results
**Solution:** First search takes 1-2 seconds (PubChem fetch). Subsequent searches are instant.

### Issue: No plant matches found
**Solution:** Your plant database may not contain that compound. Expand database or add manually.

### Issue: Wrong bioactivity shown
**Solution:** Bioactivity is predicted. Verify with scientific literature for accuracy.

---

## Credits & Attribution

- **PubChem:** NIH National Library of Medicine
- **API:** PubChem PUG-REST
- **License:** Free for research and educational use

**Citation:**
> Kim S, Chen J, Cheng T, et al. PubChem 2023 update. Nucleic Acids Res. 2023;51(D1):D1373-D1380.

---

**Last Updated:** January 22, 2025  
**Version:** 2.0.0  
**Status:** ✅ Production Ready
