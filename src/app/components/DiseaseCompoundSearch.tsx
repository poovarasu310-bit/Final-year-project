import { useState } from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Search, Loader2, CheckCircle2, AlertCircle, Leaf, Pill, Activity, Save, Share2, Download, ArrowLeft, FileText, Printer } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { toast } from 'sonner';
import { supabase } from '../utils/supabase/client';

interface PlantSource {
  plantId: string;
  plantName: string;
  scientificName: string;
  confidence: 'high' | 'medium' | 'low';
  compounds: string[];
  therapeuticUses: string[];
}

interface DiseaseProfile {
  disease: string;
  category: string;
  efficacy: string;
  mechanism: string;
  color: string;
}

interface AnalysisResult {
  compound: {
    cid: number;
    name: string;
    molecularFormula: string;
    molecularWeight: number;
    smiles: string;
    iupacName: string;
  };
  plantSources: PlantSource[];
  relatedDiseases: string[];
  functionalGroups: string[];
  bioactivity: string;
  diseaseProfiles: DiseaseProfile[];
}

export function DiseaseCompoundSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'compound' | 'disease'>('compound');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const serverUrl = `https://${projectId}.supabase.co/functions/v1/make-server-1f891a69`;

  const handleSaveAnalysis = async () => {
    if (!result) return;
    
    try {
      const reportData = {
        id: `report_${Date.now()}`,
        compound: result.compound.name,
        cid: result.compound.cid,
        timestamp: new Date().toISOString(),
        plantSources: result.plantSources.length,
        diseaseTargets: result.relatedDiseases.length,
        functionalGroups: result.functionalGroups.length,
        analysisData: result
      };
      
      // Get existing reports from localStorage
      const storedReports = localStorage.getItem('analysis_reports');
      const reports = storedReports ? JSON.parse(storedReports) : [];
      
      // Add new report
      reports.push(reportData);
      
      // Save back to localStorage
      localStorage.setItem('analysis_reports', JSON.stringify(reports));
      
      console.log('Analysis report saved to localStorage:', reportData.id);
      toast.success('Analysis saved successfully!');
    } catch (err: any) {
      console.error('Error saving analysis:', err);
      toast.error(`Failed to save: ${err.message}`);
    }
  };

  const handleShareAnalysis = async () => {
    if (!result) return;
    
    const shareText = `${result.compound.name} Analysis\n` +
      `Plant Sources: ${result.plantSources.length}\n` +
      `Disease Targets: ${result.relatedDiseases.length}\n` +
      `Functional Groups: ${result.functionalGroups.length}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${result.compound.name} - Chemoinformatics Analysis`,
          text: shareText,
          url: window.location.href
        });
        toast.success('Analysis shared successfully!');
      } catch (err) {
        // User cancelled or error occurred
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareText);
      toast.success('Analysis copied to clipboard!');
    }
  };

  const handleExportAnalysis = () => {
    if (!result) return;
    
    const exportData = {
      compound: result.compound,
      plantSources: result.plantSources,
      diseaseProfiles: result.diseaseProfiles,
      relatedDiseases: result.relatedDiseases,
      functionalGroups: result.functionalGroups,
      bioactivity: result.bioactivity,
      exportedAt: new Date().toISOString()
    };
    
    // Create JSON file
    const jsonString = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${result.compound.name.replace(/\s+/g, '_')}_analysis.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success('Analysis exported successfully!');
  };

  const handlePrintReport = () => {
    window.print();
    toast.success('Opening print dialog...');
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast.error('Please enter a compound name or disease');
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      // Step 1: Fetch compound from PubChem
      const pubchemResponse = await fetch(`${serverUrl}/pubchem/fetch-by-name`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({ compoundName: searchQuery.trim() })
      });

      if (!pubchemResponse.ok) {
        const errorData = await pubchemResponse.json();
        throw new Error(errorData.error || 'Failed to fetch compound from PubChem');
      }

      const pubchemData = await pubchemResponse.json();
      const compound = pubchemData.compound;

      // Step 2: Analyze against plant database
      const analysisResponse = await fetch(`${serverUrl}/analyze-compound-plants`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({ 
          smiles: compound.canonicalSmiles,
          compoundName: compound.name,
          cid: compound.cid
        })
      });

      if (!analysisResponse.ok) {
        const errorData = await analysisResponse.json();
        throw new Error(errorData.error || 'Failed to analyze compound');
      }

      const analysisData = await analysisResponse.json();

      const analysisResult = {
        compound: {
          cid: compound.cid,
          name: compound.name,
          molecularFormula: compound.molecularFormula,
          molecularWeight: compound.molecularWeight,
          smiles: compound.canonicalSmiles,
          iupacName: compound.iupacName || compound.name
        },
        plantSources: analysisData.plantSources || [],
        relatedDiseases: analysisData.relatedDiseases || [],
        functionalGroups: analysisData.functionalGroups || [],
        bioactivity: analysisData.bioactivity || 'Unknown',
        diseaseProfiles: analysisData.diseaseProfiles || []
      };

      setResult(analysisResult);

      // Auto-save the analysis report
      try {
        const reportData = {
          id: `report_${Date.now()}`,
          compound: compound.name,
          compoundName: compound.name,
          smiles: compound.canonicalSmiles,
          sourcePlant: analysisData.plantSources?.[0]?.name || 'Disease Search',
          molecularFormula: compound.molecularFormula,
          cid: compound.cid,
          timestamp: new Date().toISOString(),
          plantSources: (analysisData.plantSources || []).length,
          diseaseTargets: (analysisData.relatedDiseases || []).length,
          functionalGroups: (analysisData.functionalGroups || []).length,
          analysisData: analysisResult,
          analysisResults: analysisData
        };

        const storedReports = localStorage.getItem('analysis_reports');
        const reports = storedReports ? JSON.parse(storedReports) : [];
        reports.push(reportData);
        localStorage.setItem('analysis_reports', JSON.stringify(reports));

        console.log('✅ Analysis report auto-saved:', reportData.id);
        toast.success('Analysis completed and saved!');
      } catch (saveErr) {
        console.error('Error auto-saving report:', saveErr);
      }

    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <Search className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-semibold">Disease & Compound Search</h2>
          </div>
          <p className="text-gray-600">
            Search for compounds or diseases to find medicinal plant sources and therapeutic information
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Type Toggle */}
          <div className="flex gap-2">
            <Button
              variant={searchType === 'compound' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSearchType('compound')}
              className={searchType === 'compound' ? 'bg-blue-600 hover:bg-blue-700' : ''}
            >
              <Pill className="h-4 w-4 mr-2" />
              Compound
            </Button>
            <Button
              variant={searchType === 'disease' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSearchType('disease')}
              className={searchType === 'disease' ? 'bg-green-600 hover:bg-green-700' : ''}
            >
              <Activity className="h-4 w-4 mr-2" />
              Disease
            </Button>
          </div>

          {/* Search Input */}
          <div className="flex gap-2">
            <Input
              placeholder={
                searchType === 'compound' 
                  ? "e.g., Curcumin, Aspirin, Resveratrol" 
                  : "e.g., Inflammation, Cancer, Diabetes"
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              disabled={isLoading}
              className="flex-1"
            />
            <Button 
              onClick={handleSearch} 
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Quick Search Examples */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-600">Try:</span>
            {['Curcumin', 'Resveratrol', 'Quercetin', 'Aspirin'].map((example) => (
              <Badge
                key={example}
                variant="outline"
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  setSearchQuery(example);
                  setSearchType('compound');
                }}
              >
                {example}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Loading State */}
      {isLoading && (
        <Card>
          <CardContent className="py-12">
            <div className="flex flex-col items-center justify-center space-y-4">
              <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
              <div className="text-center">
                <p className="font-medium text-gray-900">Analyzing Compound...</p>
                <p className="text-sm text-gray-600 mt-1">
                  Fetching from PubChem and matching with plant database
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {result && !isLoading && (
        <div className="space-y-6">
          {/* Compound Information */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{result.compound.name}</h3>
                  <p className="text-sm text-gray-600">PubChem CID: {result.compound.cid}</p>
                </div>
                <Badge className="bg-green-100 text-green-700 border-green-200">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Found in Database
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Molecular Formula</p>
                  <p className="font-mono font-medium">{result.compound.molecularFormula}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Molecular Weight</p>
                  <p className="font-medium">{result.compound.molecularWeight.toFixed(2)} Da</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-600">IUPAC Name</p>
                  <p className="text-sm font-medium">{result.compound.iupacName}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-600">SMILES</p>
                  <p className="font-mono text-xs break-all bg-gray-50 p-2 rounded">
                    {result.compound.smiles}
                  </p>
                </div>
              </div>

              {/* Functional Groups */}
              {result.functionalGroups.length > 0 && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">Functional Groups</p>
                  <div className="flex flex-wrap gap-2">
                    {result.functionalGroups.map((group, idx) => (
                      <Badge key={idx} variant="outline" className="bg-blue-50 border-blue-200 text-blue-700">
                        {group}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Bioactivity */}
              <div>
                <p className="text-sm text-gray-600">Bioactivity</p>
                <p className="font-medium">{result.bioactivity}</p>
              </div>
            </CardContent>
          </Card>

          {/* Plant Sources */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-green-600" />
                <h3 className="text-xl font-semibold">Medicinal Plant Sources</h3>
              </div>
              <p className="text-sm text-gray-600">
                Plants containing this compound or related bioactive molecules
              </p>
            </CardHeader>
            <CardContent>
              {result.plantSources.length > 0 ? (
                <div className="space-y-4">
                  {result.plantSources.map((plant, idx) => (
                    <div key={idx} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">{plant.plantName}</h4>
                          <p className="text-sm text-gray-600 italic">{plant.scientificName}</p>
                        </div>
                        <Badge 
                          className={
                            plant.confidence === 'high' 
                              ? 'bg-green-100 text-green-700 border-green-200'
                              : plant.confidence === 'medium'
                              ? 'bg-yellow-100 text-yellow-700 border-yellow-200'
                              : 'bg-gray-100 text-gray-700 border-gray-200'
                          }
                        >
                          {plant.confidence} confidence
                        </Badge>
                      </div>

                      {/* Related Compounds */}
                      <div className="mb-3">
                        <p className="text-xs text-gray-600 mb-1">Related Compounds:</p>
                        <div className="flex flex-wrap gap-1">
                          {plant.compounds.map((compound, cIdx) => (
                            <Badge key={cIdx} variant="outline" className="text-xs">
                              {compound}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Therapeutic Uses */}
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Therapeutic Uses:</p>
                        <div className="flex flex-wrap gap-1">
                          {plant.therapeuticUses.map((use, uIdx) => (
                            <Badge key={uIdx} className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                              {use}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Leaf className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-600">No plant sources found in database</p>
                  <p className="text-sm text-gray-500 mt-1">
                    This compound may not be present in our medicinal plant database
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Related Diseases */}
          {result.relatedDiseases.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-purple-600" />
                  <h3 className="text-xl font-semibold">Related Diseases & Conditions</h3>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {result.relatedDiseases.map((disease, idx) => (
                    <Badge 
                      key={idx} 
                      className="bg-purple-50 text-purple-700 border-purple-200"
                    >
                      {disease}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Disease Efficacy Profiles */}
          {result.diseaseProfiles && result.diseaseProfiles.length > 0 && (
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold">Therapeutic Efficacy Profiles</h3>
                <p className="text-sm text-gray-600">
                  Evidence-based therapeutic applications for specific disease conditions
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                {result.diseaseProfiles.map((profile, idx) => (
                  <div key={idx} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{profile.disease}</h4>
                        <p className="text-sm text-gray-600">{profile.category}</p>
                      </div>
                      <Badge 
                        className={
                          profile.efficacy.includes('High')
                            ? 'bg-green-100 text-green-700 border-green-200'
                            : profile.efficacy.includes('Moderate')
                            ? 'bg-yellow-100 text-yellow-700 border-yellow-200'
                            : 'bg-blue-100 text-blue-700 border-blue-200'
                        }
                      >
                        {profile.efficacy}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Mechanism:</span> {profile.mechanism}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Bioactivity Profile Summary */}
          {result.bioactivity && (
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold">Bioactivity Profile</h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{result.bioactivity}</p>
              </CardContent>
            </Card>
          )}

          {/* Chemoinformatics Summary Bar */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="py-4">
              <div className="space-y-4">
                <h3 className="font-semibold text-blue-900">Analysis Summary</h3>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 flex-shrink-0" />
                    <p className="text-sm text-blue-900">Structure validated</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 flex-shrink-0" />
                    <p className="text-sm text-blue-900">
                      {result.plantSources.length} plant source(s) matched
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 flex-shrink-0" />
                    <p className="text-sm text-blue-900">
                      {result.relatedDiseases.length} disease target(s) identified
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 flex-shrink-0" />
                    <p className="text-sm text-blue-900">
                      {result.functionalGroups.length} functional group(s) detected
                    </p>
                  </div>
                </div>

                {/* Chemoinformatics Analyze Button */}
                <div className="pt-3 border-t border-blue-200">
                  <button
                    onClick={() => {
                      toast.info('Advanced chemoinformatics analysis coming soon!', {
                        description: 'This will provide deeper molecular insights, structure-activity relationships, and predictive modeling.'
                      });
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md py-2.5 px-4 flex items-center justify-center gap-2 transition-colors"
                  >
                    <Activity className="h-5 w-5 flex-shrink-0" />
                    <span className="font-medium">Chemoinformatics Analyze</span>
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chemoinformatics Action Icons Bar */}
          <Card className="border-2 border-gray-200">
            <CardContent className="py-6">
              <div className="flex flex-col space-y-4">
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 mb-1">Analysis Actions</h3>
                  <p className="text-sm text-gray-600">Save, share, or export your chemoinformatics analysis</p>
                </div>
                
                <div className="flex items-center justify-center gap-4 flex-wrap">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleSaveAnalysis}
                    className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700"
                  >
                    <Save className="h-5 w-5" />
                    <span>Save</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleShareAnalysis}
                    className="flex items-center gap-2 hover:bg-green-50 hover:border-green-300 hover:text-green-700"
                  >
                    <Share2 className="h-5 w-5" />
                    <span>Share</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleExportAnalysis}
                    className="flex items-center gap-2 hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700"
                  >
                    <Download className="h-5 w-5" />
                    <span>Export</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handlePrintReport}
                    className="flex items-center gap-2 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700"
                  >
                    <Printer className="h-5 w-5" />
                    <span>Print</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => {
                      setResult(null);
                      setSearchQuery('');
                      toast.info('Analysis cleared');
                    }}
                    className="flex items-center gap-2 hover:bg-gray-50 hover:border-gray-300"
                  >
                    <ArrowLeft className="h-5 w-5" />
                    <span>New Search</span>
                  </Button>
                </div>
                
                {/* Compact Icon-Only Version for Mobile */}
                <div className="flex items-center justify-center gap-3 md:hidden border-t pt-4">
                  <button
                    onClick={handleSaveAnalysis}
                    className="p-3 rounded-full hover:bg-blue-50 text-blue-600 transition-colors"
                    title="Save Analysis"
                  >
                    <Save className="h-6 w-6" />
                  </button>
                  
                  <button
                    onClick={handleShareAnalysis}
                    className="p-3 rounded-full hover:bg-green-50 text-green-600 transition-colors"
                    title="Share Analysis"
                  >
                    <Share2 className="h-6 w-6" />
                  </button>
                  
                  <button
                    onClick={handleExportAnalysis}
                    className="p-3 rounded-full hover:bg-purple-50 text-purple-600 transition-colors"
                    title="Export Data"
                  >
                    <Download className="h-6 w-6" />
                  </button>
                  
                  <button
                    onClick={handlePrintReport}
                    className="p-3 rounded-full hover:bg-orange-50 text-orange-600 transition-colors"
                    title="Print Report"
                  >
                    <Printer className="h-6 w-6" />
                  </button>
                  
                  <button
                    onClick={() => {
                      setResult(null);
                      setSearchQuery('');
                    }}
                    className="p-3 rounded-full hover:bg-gray-50 text-gray-600 transition-colors"
                    title="New Search"
                  >
                    <ArrowLeft className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}