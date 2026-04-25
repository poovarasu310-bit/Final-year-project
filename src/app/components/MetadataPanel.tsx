import { useState, useEffect } from 'react';
import { dataService } from '../utils/dataService';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Leaf, Pill, Activity, Database, RefreshCw, Upload } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner';

interface Metadata {
  totalPlants: number;
  totalCompounds: number;
  totalFunctionalGroups: number;
  totalPubChemCompounds: number;
  lastUpdated: string;
  databaseVersion: string;
}

export function MetadataPanel() {
  const [metadata, setMetadata] = useState<Metadata | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [seeding, setSeeding] = useState(false);

  const fetchMetadata = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('🔍 Fetching metadata from backend...');
      
      // First check if backend is available
      const isHealthy = await dataService.checkHealth();
      
      if (!isHealthy) {
        // Backend not available - use demo mode data
        console.log('📦 Demo Mode: Using local storage for metadata');
        const demoPlants = localStorage.getItem('demo_plants');
        const demoCompounds = localStorage.getItem('demo_compounds');
        
        if (demoPlants && demoCompounds) {
          const plants = JSON.parse(demoPlants);
          const compounds = JSON.parse(demoCompounds);
          
          // Extract unique functional groups
          const functionalGroupsSet = new Set<string>();
          plants.forEach((plant: any) => {
            plant.functionalGroups?.forEach((fg: string) => functionalGroupsSet.add(fg));
          });
          compounds.forEach((compound: any) => {
            compound.functionalGroups?.forEach((fg: string) => functionalGroupsSet.add(fg));
          });
          
          const demoMetadata = {
            totalPlants: plants.length,
            totalCompounds: compounds.length,
            totalFunctionalGroups: functionalGroupsSet.size,
            lastUpdated: new Date().toISOString()
          };
          
          console.log('✅ Demo metadata created:', demoMetadata);
          setMetadata(demoMetadata);
          setLoading(false);
          return;
        }
      }
      
      // Backend is available - fetch from API
      const data = await dataService.getMetadata();
      if (data) {
        console.log('✅ Metadata loaded successfully:', data);
        setMetadata(data);
      } else {
        console.error('❌ Metadata is null');
        setError('Failed to load metadata');
      }
    } catch (err) {
      setError('Error fetching metadata');
      console.error('Metadata fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSeedDatabase = async () => {
    if (!confirm('This will load all seed data into the database (39 plants, 50 compounds). Continue?')) {
      return;
    }

    setSeeding(true);
    toast.info('Seeding database...');

    try {
      // Trigger a page reload to run DataInitializer
      window.location.reload();
    } catch (err) {
      console.error('Seed error:', err);
      toast.error('Error seeding database');
      setSeeding(false);
    }
  };

  useEffect(() => {
    fetchMetadata();
  }, []);

  if (loading) {
    return (
      <Card className="bg-gradient-to-br from-green-50 to-blue-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <RefreshCw className="w-6 h-6 animate-spin text-green-600" />
            <span className="ml-2 text-gray-600">Loading database statistics...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-red-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <span className="text-red-600">{error}</span>
            <Button onClick={fetchMetadata} variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!metadata) {
    return null;
  }

  const isDatabaseEmpty = metadata.totalPlants === 0 && metadata.totalCompounds === 0;

  return (
    <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5 text-green-600" />
            Database Statistics
            {isDatabaseEmpty && (
              <Badge variant="outline" className="ml-2 bg-yellow-50 text-yellow-700 border-yellow-300">
                Empty Database
              </Badge>
            )}
          </CardTitle>
          <Button onClick={fetchMetadata} variant="ghost" size="sm">
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
            <Leaf className="w-8 h-8 text-green-600 mb-2" />
            <span className="text-2xl font-bold text-gray-800">{metadata.totalPlants}</span>
            <span className="text-sm text-gray-600">Medicinal Plants</span>
          </div>
          
          <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
            <Pill className="w-8 h-8 text-blue-600 mb-2" />
            <span className="text-2xl font-bold text-gray-800">{metadata.totalCompounds}</span>
            <span className="text-sm text-gray-600">Compounds</span>
          </div>
          
          <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
            <Activity className="w-8 h-8 text-purple-600 mb-2" />
            <span className="text-2xl font-bold text-gray-800">{metadata.totalFunctionalGroups}</span>
            <span className="text-sm text-gray-600">Functional Groups</span>
          </div>
          
          <button
            onClick={() => window.open('https://pubchem.ncbi.nlm.nih.gov/', '_blank', 'noopener,noreferrer')}
            className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md hover:bg-orange-50 transition-all cursor-pointer border-2 border-transparent hover:border-orange-300"
            title="Open PubChem Database - Explore real chemical compound data"
          >
            <Database className="w-8 h-8 text-orange-600 mb-2" />
            <span className="text-2xl font-bold text-gray-800">{metadata.totalPubChemCompounds}</span>
            <span className="text-sm text-gray-600">PubChem Data</span>
            <span className="text-xs text-orange-600 mt-1 font-medium">Click to explore →</span>
          </button>
        </div>
        
        <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
          <span>Version: {metadata.databaseVersion}</span>
          <span>Last Updated: {new Date(metadata.lastUpdated).toLocaleString()}</span>
        </div>
        
        {isDatabaseEmpty && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              ⚠ Database is empty. Click "Seed Database" below to load 39 medicinal plants and 50 compounds with their functional groups.
            </p>
          </div>
        )}
        
        <div className="mt-4">
          <Button onClick={handleSeedDatabase} variant="outline" size="sm" disabled={seeding}>
            <Upload className="w-4 h-4 mr-2" />
            Seed Database
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}