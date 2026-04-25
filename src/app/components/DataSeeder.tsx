import { useState } from 'react';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { Loader2, Database, CheckCircle2, XCircle, BarChart3 } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { COMPREHENSIVE_PLANTS_DATA } from '../utils/mockPlantsData';

// Import compounds data from DataInitializer
const mockCompounds = [
  {
    id: '1',
    name: 'Curcumin',
    molecularFormula: 'C21H20O6',
    molecularWeight: 368.38,
    logP: 3.2,
    functionalGroups: ['Phenol', 'Ether', 'Carbonyl', 'Alkene (C=C)', 'Hydroxyl (-OH)', 'Methoxy (-OCH3)'],
    smiles: 'COc1cc(/C=C/C(=O)CC(=O)/C=C/c2ccc(O)c(OC)c2)ccc1O',
    plantSources: ['Turmeric'],
    bioactivity: 'Anti-inflammatory, Antioxidant, Anticancer',
    drugLikeness: 'Good',
    thumbnail: ''
  },
  {
    id: '2',
    name: 'Demethoxycurcumin',
    molecularFormula: 'C20H18O5',
    molecularWeight: 338.35,
    logP: 3.1,
    functionalGroups: ['Phenol', 'Carbonyl', 'Alkene (C=C)', 'Hydroxyl (-OH)', 'Methoxy (-OCH3)'],
    smiles: 'COc1cc(/C=C/C(=O)CC(=O)/C=C/c2ccc(O)cc2)ccc1O',
    plantSources: ['Turmeric'],
    bioactivity: 'Anti-inflammatory, Antioxidant, Neuroprotective',
    drugLikeness: 'Good',
    thumbnail: ''
  },
  {
    id: '3',
    name: 'Bisdemethoxycurcumin',
    molecularFormula: 'C19H16O4',
    molecularWeight: 308.33,
    logP: 2.9,
    functionalGroups: ['Phenol', 'Carbonyl', 'Alkene (C=C)', 'Hydroxyl (-OH)', 'Aromatic Ring'],
    smiles: 'O=C(CC(=O)/C=C/c1ccc(O)cc1)/C=C/c2ccc(O)cc2',
    plantSources: ['Turmeric'],
    bioactivity: 'Antioxidant, Anti-inflammatory, Anticancer',
    drugLikeness: 'Good',
    thumbnail: ''
  },
  // Add more compounds here (abridged for brevity - in production you'd import all 50)
  {
    id: '4',
    name: 'Turmerone',
    molecularFormula: 'C15H22O',
    molecularWeight: 218.33,
    logP: 3.8,
    functionalGroups: ['Ketone', 'Methyl (-CH3)', 'Aromatic Ring', 'Alkene (C=C)'],
    smiles: 'CC(C)=CCCC(C)=CC(=O)c1ccc(C)cc1',
    plantSources: ['Turmeric'],
    bioactivity: 'Neuroprotective, Anti-inflammatory, Antimicrobial',
    drugLikeness: 'Excellent',
    thumbnail: ''
  },
  {
    id: '5',
    name: 'Gingerol',
    molecularFormula: 'C17H26O4',
    molecularWeight: 294.39,
    logP: 3.5,
    functionalGroups: ['Phenol', 'Ketone', 'Hydroxyl (-OH)', 'Ether', 'Methoxy (-OCH3)'],
    smiles: 'CCCCCC(O)CC(=O)CCc1ccc(O)c(OC)c1',
    plantSources: ['Ginger'],
    bioactivity: 'Anti-inflammatory, Antiemetic, Analgesic',
    drugLikeness: 'Good',
    thumbnail: ''
  },
  {
    id: '6',
    name: 'Shogaol',
    molecularFormula: 'C17H24O3',
    molecularWeight: 276.37,
    logP: 4.1,
    functionalGroups: ['Phenol', 'Ketone', 'Alkene (C=C)', 'Methoxy (-OCH3)', 'Hydroxyl (-OH)'],
    smiles: 'CCCCC=CC(=O)CCc1ccc(O)c(OC)c1',
    plantSources: ['Ginger'],
    bioactivity: 'Anti-inflammatory, Antioxidant, Anticancer',
    drugLikeness: 'Good',
    thumbnail: ''
  },
  {
    id: '7',
    name: 'Allicin',
    molecularFormula: 'C6H10OS2',
    molecularWeight: 162.27,
    logP: 1.9,
    functionalGroups: ['Thiosulfinate', 'Sulfur Compound', 'Allyl', 'Disulfide (S-S)'],
    smiles: 'C=CCSSC(=O)CC=C',
    plantSources: ['Garlic'],
    bioactivity: 'Antimicrobial, Antioxidant, Cardiovascular',
    drugLikeness: 'Good',
    thumbnail: ''
  },
  {
    id: '8',
    name: 'Eugenol',
    molecularFormula: 'C10H12O2',
    molecularWeight: 164.20,
    logP: 2.3,
    functionalGroups: ['Phenol', 'Allyl', 'Methoxy (-OCH3)', 'Hydroxyl (-OH)', 'Aromatic Ring'],
    smiles: 'C=CCc1ccc(O)c(OC)c1',
    plantSources: ['Clove', 'Tulsi', 'Cinnamon'],
    bioactivity: 'Analgesic, Antiseptic, Anti-inflammatory',
    drugLikeness: 'Excellent',
    thumbnail: ''
  },
  {
    id: '9',
    name: 'EGCG',
    molecularFormula: 'C22H18O11',
    molecularWeight: 458.37,
    logP: 1.4,
    functionalGroups: ['Phenol', 'Hydroxyl (-OH)', 'Catechin', 'Gallate', 'Ester', 'Aromatic Ring'],
    smiles: 'O=C(O[C@H]1Cc2c(O)cc(O)cc2O[C@@H]1c3cc(O)c(O)c(O)c3)c4cc(O)c(O)c(O)c4',
    plantSources: ['Green Tea'],
    bioactivity: 'Antioxidant, Anticancer, Cardioprotective',
    drugLikeness: 'Moderate',
    thumbnail: ''
  },
  {
    id: '10',
    name: 'Catechin',
    molecularFormula: 'C15H14O6',
    molecularWeight: 290.27,
    logP: 1.4,
    functionalGroups: ['Phenol', 'Hydroxyl (-OH)', 'Catechol', 'Aromatic Ring', 'Flavanol'],
    smiles: 'O[C@H]1Cc2c(O)cc(O)cc2O[C@@H]1c3ccc(O)c(O)c3',
    plantSources: ['Green Tea', 'Cacao'],
    bioactivity: 'Antioxidant, Neuroprotective, Cardioprotective',
    drugLikeness: 'Good',
    thumbnail: ''
  }
];

export function DataSeeder() {
  const [status, setStatus] = useState<'idle' | 'seeding' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [results, setResults] = useState<any>(null);
  const [dbStats, setDbStats] = useState<any>(null);
  const [loadingStats, setLoadingStats] = useState(false);

  const seedData = async () => {
    try {
      setStatus('seeding');
      setMessage('Seeding data to Supabase backend...');
      
      const url = `https://${projectId}.supabase.co/functions/v1/make-server-1f891a69/seed-data`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({
          plants: COMPREHENSIVE_PLANTS_DATA,
          compounds: mockCompounds,
          functionalGroups: null // Will be extracted from plants and compounds
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to seed data: ${response.statusText}`);
      }

      const data = await response.json();
      
      setStatus('success');
      setMessage('Data successfully seeded to Supabase!');
      setResults(data.results);
      
    } catch (error: any) {
      console.error('Error seeding data:', error);
      setStatus('error');
      setMessage(`Failed to seed data: ${error.message}`);
    }
  };

  const loadDatabaseStats = async () => {
    try {
      setLoadingStats(true);
      const url = `https://${projectId}.supabase.co/functions/v1/make-server-1f891a69/database-stats`;
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to load stats: ${response.statusText}`);
      }

      const data = await response.json();
      setDbStats(data.stats);
      
    } catch (error: any) {
      console.error('Error loading database stats:', error);
    } finally {
      setLoadingStats(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Database className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Supabase Data Seeder</h3>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">
        Seed the Supabase backend with comprehensive medicinal plants, compounds, and functional groups data.
      </p>

      <Button
        onClick={seedData}
        disabled={status === 'seeding'}
        className="w-full"
      >
        {status === 'seeding' ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Seeding Data...
          </>
        ) : (
          <>
            <Database className="w-4 h-4 mr-2" />
            Seed Data to Supabase
          </>
        )}
      </Button>

      {status === 'success' && (
        <Alert className="mt-4 bg-green-50 border-green-200">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            <div className="font-semibold mb-2">{message}</div>
            {results && (
              <div className="text-sm space-y-1">
                <div>✅ Plants seeded: {results.plantsSeeded}</div>
                <div>✅ Compounds seeded: {results.compoundsSeeded}</div>
                <div>✅ Functional groups seeded: {results.functionalGroupsSeeded}</div>
                {results.errors && results.errors.length > 0 && (
                  <div className="mt-2 text-red-600">
                    ⚠️ Errors: {results.errors.length}
                  </div>
                )}
              </div>
            )}
          </AlertDescription>
        </Alert>
      )}

      {status === 'error' && (
        <Alert className="mt-4 bg-red-50 border-red-200">
          <XCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            {message}
          </AlertDescription>
        </Alert>
      )}

      <div className="mt-6">
        <Button
          onClick={loadDatabaseStats}
          disabled={loadingStats}
          className="w-full"
        >
          {loadingStats ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Loading Stats...
            </>
          ) : (
            <>
              <BarChart3 className="w-4 h-4 mr-2" />
              Load Database Stats
            </>
          )}
        </Button>

        {dbStats && (
          <Alert className="mt-4 bg-blue-50 border-blue-200">
            <Database className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <div className="font-semibold mb-3">Supabase Postgres Database</div>
              <div className="text-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span>🗄️ Database:</span>
                  <span className="font-mono text-xs">{dbStats.database}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>📋 Table:</span>
                  <span className="font-mono text-xs">{dbStats.table}</span>
                </div>
                <hr className="border-blue-200 my-2" />
                <div className="flex items-center justify-between">
                  <span>🌿 Plants:</span>
                  <span className="font-semibold">{dbStats.counts.plants}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>⚗️ Compounds:</span>
                  <span className="font-semibold">{dbStats.counts.compounds}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>🧪 Functional Groups:</span>
                  <span className="font-semibold">{dbStats.counts.functionalGroups}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>🔬 PubChem Compounds:</span>
                  <span className="font-semibold">{dbStats.counts.pubchemCompounds}</span>
                </div>
                <hr className="border-blue-200 my-2" />
                <div className="flex items-center justify-between font-semibold">
                  <span>📊 Total Records:</span>
                  <span className="text-blue-600">{dbStats.counts.totalRecords}</span>
                </div>
                {dbStats.samples && (
                  <>
                    <hr className="border-blue-200 my-2" />
                    <div className="text-xs">
                      <div className="font-semibold mb-1">Sample Data:</div>
                      {dbStats.samples.plant && (
                        <div className="truncate">Plant: {dbStats.samples.plant.name}</div>
                      )}
                      {dbStats.samples.compound && (
                        <div className="truncate">Compound: {dbStats.samples.compound.name}</div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}