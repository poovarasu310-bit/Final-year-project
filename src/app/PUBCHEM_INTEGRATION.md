# PubChem Data Collection Integration

## Overview

This application now includes a comprehensive PubChem data collection system that allows you to fetch medicinal compound data from the PubChem REST API (PUG-REST) and store it in your Supabase database.

## Features

### 🎯 Single Compound Collection
- Search and fetch individual compounds by name
- View detailed molecular properties
- Automatically stored in Supabase

### 📦 Batch Collection
- Upload multiple compound names (one per line)
- Rate-limited requests to respect PubChem API guidelines
- Quick-load common medicinal compounds
- Success/failure tracking for each compound

### 💾 Database Management
- View all stored PubChem compounds
- Export data as JSON
- Persistent storage in Supabase KV store

## Data Collected from PubChem

For each compound, the system collects:

- **Identifiers**: CID, Name, IUPAC Name
- **Structure**: Canonical SMILES, Isomeric SMILES, InChI, InChIKey
- **Properties**: 
  - Molecular Formula
  - Molecular Weight
  - Exact Mass
  - XLogP (lipophilicity)
  - Complexity
  - Charge
- **Drug-likeness indicators**:
  - Hydrogen Bond Donor Count
  - Hydrogen Bond Acceptor Count
  - Rotatable Bond Count
  - Heavy Atom Count
- **Bioactivity**: Summary data (when available)

## How to Use

### Access the PubChem Collector

1. Click on the **"PubChem"** tab in the navigation bar
2. You'll see three tabs: Single Compound, Batch Collection, and Database View

### Fetch a Single Compound

1. Go to the **"Single Compound"** tab
2. Enter a compound name (e.g., "Curcumin", "Aspirin", "Resveratrol")
3. Click the search button or press Enter
4. The compound data will be displayed and automatically saved to your database

### Batch Collection

1. Go to the **"Batch Collection"** tab
2. Enter compound names, one per line, OR click "Load Common Compounds" for a preset list
3. Click **"Fetch All Compounds"**
4. Wait for the batch process to complete (rate-limited to ~3 requests per second)
5. View successful and failed fetches separately
6. Export results as JSON if needed

### View Stored Data

1. Go to the **"Database View"** tab
2. Click **"Refresh"** to load all stored compounds
3. View detailed information for each compound
4. Export all data as JSON

## Backend Implementation

### Server Endpoints

The following endpoints have been added to `/supabase/functions/server/index.tsx`:

#### `POST /pubchem/fetch-by-name`
Fetch a single compound by name.

**Request Body:**
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
    "canonicalSmiles": "...",
    ...
  }
}
```

#### `POST /pubchem/fetch-by-cid`
Fetch a compound by PubChem CID.

**Request Body:**
```json
{
  "cid": 969516
}
```

#### `POST /pubchem/batch-fetch`
Fetch multiple compounds in batch.

**Request Body:**
```json
{
  "compoundNames": ["Curcumin", "Aspirin", "Resveratrol"]
}
```

**Response:**
```json
{
  "message": "Batch fetch completed",
  "results": {
    "successful": [...],
    "failed": [...]
  }
}
```

#### `GET /pubchem/compounds`
Get all stored PubChem compounds.

**Response:**
```json
{
  "compounds": [...],
  "count": 10
}
```

#### `GET /pubchem/compounds/:cid`
Get a specific compound by CID.

### Data Storage

Compounds are stored in the Supabase KV store with the following structure:

- **Key**: `pubchem:compound:{cid}`
- **Value**: Complete compound data object
- **List**: `pubchem:compounds:list` - Array of all CIDs

## Common Medicinal Compounds

The system includes a quick-load feature for these common medicinal compounds:

1. **Aspirin** - Pain reliever, anti-inflammatory
2. **Curcumin** - Anti-inflammatory, antioxidant
3. **Resveratrol** - Antioxidant, cardioprotective
4. **Quercetin** - Flavonoid, anti-inflammatory
5. **Caffeine** - Stimulant, adenosine receptor antagonist
6. **Morphine** - Opioid analgesic
7. **Artemisinin** - Antimalarial
8. **Paclitaxel** - Anticancer agent
9. **Berberine** - Antibacterial, metabolic effects
10. **Epigallocatechin gallate** - Antioxidant from green tea

## Python Example (for external data prep)

If you want to prepare data externally before uploading:

```python
import requests
import json

def get_pubchem_data(compound_name):
    url = f"https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/{compound_name}/JSON"
    response = requests.get(url)
    data = response.json()
    
    props = data["PC_Compounds"][0]["props"]
    compound_info = {
        "name": compound_name,
        "cid": data["PC_Compounds"][0]["id"]["id"]["cid"],
        "molecular_weight": next(p["value"]["fval"] for p in props if p["urn"]["label"] == "Molecular Weight"),
        "smiles": next(p["value"]["sval"] for p in props if p["urn"]["label"] == "SMILES"),
    }
    return compound_info

# Example usage
curcumin = get_pubchem_data("Curcumin")
print(json.dumps(curcumin, indent=2))
```

## Rate Limiting

- Single requests: No limit (reasonable use)
- Batch requests: ~300ms delay between requests (3 req/sec)
- Respects PubChem API guidelines
- Failed requests are tracked separately

## Error Handling

The system handles:
- Compound not found in PubChem
- Network errors
- API rate limits
- Invalid compound names
- Partial batch failures (continues processing remaining items)

## Export Functionality

- Export format: JSON
- Includes all collected properties
- Filename: `pubchem_compounds_YYYY-MM-DD.json`
- Can export single results or entire database

## Integration with Main Application

The collected PubChem data can be used:

1. For compound analysis in the CompoundAnalysisPage
2. To populate the main compounds database
3. For molecular structure visualization
4. For drug-likeness assessment
5. For functional group analysis

## Future Enhancements

Potential improvements:
- Automatic plant source matching
- Disease/therapeutic target extraction
- Pharmacology data integration
- Structure similarity searching
- Scheduled automatic updates
- Advanced filtering and search

## API Documentation

PubChem PUG-REST API: https://pubchem.ncbi.nlm.nih.gov/docs/pug-rest

## Notes

- Data is stored permanently in Supabase
- No authentication required for PubChem API
- Free for research and educational use
- Please cite PubChem if used in publications

---

**Last Updated**: 2025-01-22
