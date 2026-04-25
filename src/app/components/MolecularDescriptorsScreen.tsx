import { useState } from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Alert, AlertDescription } from './ui/alert';
import exampleImage from 'figma:asset/ce464872d038218cd30c4a6633e377afe236bc99.png';
import { 
  ArrowLeft, 
  Beaker, 
  CheckCircle2, 
  BarChart3,
  Hash,
  Binary,
  Fingerprint,
  Activity,
  Lightbulb,
  Copy,
  Check,
  Loader2,
  Image as ImageIcon
} from 'lucide-react';
import { ExportShareButtons } from './ExportShareButtons';

interface MolecularDescriptorsScreenProps {
  onBack: () => void;
  initialSmiles?: string;
  compoundName?: string;
  storedResults?: DescriptorResults | null;
}

interface DescriptorResults {
  molecularWeight: number;
  logP: number;
  tpsa: number;
  hBondDonors: number;
  hBondAcceptors: number;
  rotableBonds: number;
  fingerprints: {
    ecfp: {
      length: number;
      bitString: string;
      displayBits: number[];
    };
    maccs: {
      length: number;
      bitString: string;
      displayBits: number[];
    };
  };
}

export function MolecularDescriptorsScreen({ 
  onBack, 
  initialSmiles = '',
  compoundName = 'Compound',
  storedResults = null
}: MolecularDescriptorsScreenProps) {
  const [smiles, setSmiles] = useState(initialSmiles);
  const [isCalculating, setIsCalculating] = useState(false);
  const [results, setResults] = useState<DescriptorResults | null>(storedResults);
  const [copied, setCopied] = useState<string | null>(null);
  const [isFromStoredAnalysis, setIsFromStoredAnalysis] = useState(!!storedResults);

  const calculateDescriptors = async () => {
    if (!smiles.trim()) {
      alert('Please enter a valid SMILES string');
      return;
    }

    setIsCalculating(true);
    
    // Simulate calculation delay
    setTimeout(() => {
      // Generate mock molecular descriptors based on SMILES complexity
      const complexity = smiles.length;
      
      // Generate ECFP fingerprint (Morgan Fingerprint)
      const ecfpLength = 2048;
      const ecfpBits = generateRandomBits(ecfpLength, Math.min(complexity * 2, 200));
      
      // Generate MACCS Keys fingerprint
      const maccsLength = 166;
      const maccsBits = generateRandomBits(maccsLength, Math.min(complexity, 80));
      
      const mockResults: DescriptorResults = {
        molecularWeight: 150 + Math.random() * 400,
        logP: -2 + Math.random() * 7,
        tpsa: 20 + Math.random() * 100,
        hBondDonors: Math.floor(Math.random() * 6),
        hBondAcceptors: Math.floor(Math.random() * 10),
        rotableBonds: Math.floor(Math.random() * 12),
        fingerprints: {
          ecfp: {
            length: ecfpLength,
            bitString: ecfpBits.map(bit => bit ? '1' : '0').join(''),
            displayBits: ecfpBits.map((bit, idx) => bit ? idx : -1).filter(idx => idx >= 0).slice(0, 50)
          },
          maccs: {
            length: maccsLength,
            bitString: maccsBits.map(bit => bit ? '1' : '0').join(''),
            displayBits: maccsBits.map((bit, idx) => bit ? idx : -1).filter(idx => idx >= 0)
          }
        }
      };
      
      setResults(mockResults);
      setIsCalculating(false);
    }, 1500);
  };

  const generateRandomBits = (length: number, numSetBits: number): boolean[] => {
    const bits = new Array(length).fill(false);
    const setBitIndices = new Set<number>();
    
    while (setBitIndices.size < numSetBits) {
      const randomIndex = Math.floor(Math.random() * length);
      setBitIndices.add(randomIndex);
    }
    
    setBitIndices.forEach(idx => {
      bits[idx] = true;
    });
    
    return bits;
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const renderFingerprintVisualization = (bitString: string, length: number) => {
    // Show a subset of bits for visualization
    const displayLength = Math.min(256, length);
    const chunkSize = 8;
    const chunks: string[] = [];
    
    for (let i = 0; i < displayLength; i += chunkSize) {
      chunks.push(bitString.substring(i, i + chunkSize));
    }
    
    return (
      <div className="space-y-1">
        {chunks.map((chunk, idx) => (
          <div key={idx} className="flex gap-1">
            {chunk.split('').map((bit, bitIdx) => (
              <div
                key={bitIdx}
                className={`w-4 h-4 rounded-sm ${
                  bit === '1' 
                    ? 'bg-blue-600' 
                    : 'bg-gray-200'
                }`}
                title={`Bit ${idx * chunkSize + bitIdx}: ${bit}`}
              />
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onBack}
                className="hover:bg-gray-100"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="h-8 w-px bg-gray-300" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                  <Beaker className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Step 1: Molecular Descriptors & Fingerprints</h1>
                  <p className="text-sm text-gray-600">Structural and quantitative molecular analysis</p>
                </div>
              </div>
            </div>
            
            {results && (
              <div className="flex items-center gap-3">
                <ExportShareButtons
                  data={results}
                  stepName="Step 1"
                  stepTitle="Step 1: Molecular Descriptors & Fingerprints"
                  contentId="step1-content"
                  showFormatSelector={true}
                />
                <Badge className="bg-green-100 text-green-700 border-green-300 px-3 py-1">
                  <CheckCircle2 className="h-3 w-3 mr-1 inline" />
                  Calculated
                </Badge>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* SMILES Input Section */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">SMILES Input</h3>
            <p className="text-sm text-gray-600">Enter a SMILES string to calculate molecular descriptors and fingerprints</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <Input
                placeholder="Enter SMILES string (e.g., CC(=O)Oc1ccccc1C(=O)O)"
                value={smiles}
                onChange={(e) => setSmiles(e.target.value)}
                className="flex-1"
              />
              <Button 
                onClick={calculateDescriptors}
                disabled={isCalculating || !smiles.trim()}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
              >
                {isCalculating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  <>
                    <Beaker className="h-4 w-4 mr-2" />
                    Calculate
                  </>
                )}
              </Button>
            </div>
            
            {compoundName && smiles && (
              <Alert>
                <AlertDescription>
                  Analyzing: <strong>{compoundName}</strong>
                </AlertDescription>
              </Alert>
            )}
            
            {isFromStoredAnalysis && results && (
              <Alert className="bg-blue-50 border-blue-200">
                <CheckCircle2 className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  <strong>Displaying stored analysis results.</strong> These values were calculated during the initial cheminformatics analysis and are consistent with the original computation.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {results && (
          <>
            {/* Section A: Molecular Descriptor Calculation */}
            <Card className="border-2 border-blue-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                    <Activity className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Section A: Molecular Descriptors</h3>
                    <p className="text-sm text-gray-600">Quantitative analysis of molecular properties</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                    <p className="text-xs font-medium text-blue-600 mb-1">Molecular Weight</p>
                    <p className="text-2xl font-bold text-blue-900">{results.molecularWeight.toFixed(2)}</p>
                    <p className="text-xs text-blue-600 mt-1">Da</p>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                    <p className="text-xs font-medium text-purple-600 mb-1">LogP</p>
                    <p className="text-2xl font-bold text-purple-900">{results.logP.toFixed(2)}</p>
                    <p className="text-xs text-purple-600 mt-1">Lipophilicity</p>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
                    <p className="text-xs font-medium text-green-600 mb-1">TPSA</p>
                    <p className="text-2xl font-bold text-green-900">{results.tpsa.toFixed(2)}</p>
                    <p className="text-xs text-green-600 mt-1">Ų</p>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
                    <p className="text-xs font-medium text-orange-600 mb-1">H-Bond Donors</p>
                    <p className="text-2xl font-bold text-orange-900">{results.hBondDonors}</p>
                    <p className="text-xs text-orange-600 mt-1">Count</p>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl border border-pink-200">
                    <p className="text-xs font-medium text-pink-600 mb-1">H-Bond Acceptors</p>
                    <p className="text-2xl font-bold text-pink-900">{results.hBondAcceptors}</p>
                    <p className="text-xs text-pink-600 mt-1">Count</p>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl border border-indigo-200">
                    <p className="text-xs font-medium text-indigo-600 mb-1">Rotatable Bonds</p>
                    <p className="text-2xl font-bold text-indigo-900">{results.rotableBonds}</p>
                    <p className="text-xs text-indigo-600 mt-1">Flexibility</p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    <BarChart3 className="inline h-4 w-4 mr-1" />
                    Descriptor Insights
                  </p>
                  <p className="text-sm text-gray-600">
                    Molecular descriptors provide quantitative measures of molecular properties. 
                    MW indicates molecular size, LogP measures lipophilicity (membrane permeability), 
                    TPSA predicts oral bioavailability, and H-bond counts influence drug-receptor interactions.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Section B: Molecular Fingerprints */}
            <Card className="border-2 border-purple-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                    <Fingerprint className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Section B: Molecular Fingerprints</h3>
                    <p className="text-sm text-gray-600">Structural pattern encoding for similarity analysis</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* ECFP (Morgan Fingerprint) */}
                <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border-2 border-blue-300">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-bold text-blue-900 flex items-center gap-2">
                        <Hash className="h-5 w-5" />
                        ECFP (Morgan Fingerprint)
                      </h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Extended-Connectivity Fingerprint - Circular topological fingerprint
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(results.fingerprints.ecfp.bitString, 'ecfp')}
                      className="bg-white"
                    >
                      {copied === 'ecfp' ? (
                        <>
                          <Check className="h-3 w-3 mr-1" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3 mr-1" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-blue-700 font-medium">Fingerprint Length:</span>
                        <Badge className="bg-blue-200 text-blue-900">
                          {results.fingerprints.ecfp.length}-bit
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-blue-700 font-medium">Set Bits:</span>
                        <Badge className="bg-blue-200 text-blue-900">
                          {results.fingerprints.ecfp.displayBits.length}
                        </Badge>
                      </div>
                      <div className="pt-2 space-y-1">
                        <p className="text-xs font-semibold text-blue-800">Usage:</p>
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="outline" className="text-xs bg-white border-blue-300 text-blue-700">
                            Similarity Search
                          </Badge>
                          <Badge variant="outline" className="text-xs bg-white border-blue-300 text-blue-700">
                            Virtual Screening
                          </Badge>
                          <Badge variant="outline" className="text-xs bg-white border-blue-300 text-blue-700">
                            QSAR Modeling
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded-lg border border-blue-200">
                      <p className="text-xs font-medium text-blue-700 mb-2">Fingerprint Visualization (First 256 bits)</p>
                      <div className="overflow-auto max-h-48">
                        {renderFingerprintVisualization(results.fingerprints.ecfp.bitString, results.fingerprints.ecfp.length)}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 text-xs text-blue-700 bg-blue-50 p-2 rounded border border-blue-200">
                    <strong>Active Bit Positions:</strong> {results.fingerprints.ecfp.displayBits.slice(0, 20).join(', ')}
                    {results.fingerprints.ecfp.displayBits.length > 20 && ` ... (+${results.fingerprints.ecfp.displayBits.length - 20} more)`}
                  </div>
                </div>

                {/* MACCS Keys */}
                <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border-2 border-green-300">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-bold text-green-900 flex items-center gap-2">
                        <Binary className="h-5 w-5" />
                        MACCS Keys
                      </h4>
                      <p className="text-sm text-green-700 mt-1">
                        Molecular ACCess System - 166 predefined structural keys
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(results.fingerprints.maccs.bitString, 'maccs')}
                      className="bg-white"
                    >
                      {copied === 'maccs' ? (
                        <>
                          <Check className="h-3 w-3 mr-1" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3 mr-1" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-green-700 font-medium">Fingerprint Length:</span>
                        <Badge className="bg-green-200 text-green-900">
                          {results.fingerprints.maccs.length}-bit
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-green-700 font-medium">Detected Keys:</span>
                        <Badge className="bg-green-200 text-green-900">
                          {results.fingerprints.maccs.displayBits.length}
                        </Badge>
                      </div>
                      <div className="pt-2 space-y-1">
                        <p className="text-xs font-semibold text-green-800">Usage:</p>
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="outline" className="text-xs bg-white border-green-300 text-green-700">
                            Drug-likeness Prediction
                          </Badge>
                          <Badge variant="outline" className="text-xs bg-white border-green-300 text-green-700">
                            Substructure Analysis
                          </Badge>
                          <Badge variant="outline" className="text-xs bg-white border-green-300 text-green-700">
                            ML Models
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded-lg border border-green-200">
                      <p className="text-xs font-medium text-green-700 mb-2">Fingerprint Visualization (All 166 bits)</p>
                      <div className="overflow-auto max-h-48">
                        {renderFingerprintVisualization(results.fingerprints.maccs.bitString, results.fingerprints.maccs.length)}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 text-xs text-green-700 bg-green-50 p-2 rounded border border-green-200">
                    <strong>Active Key Positions:</strong> {results.fingerprints.maccs.displayBits.join(', ')}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Insights Section */}
            <Card className="border-2 border-amber-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 border-b">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                    <Lightbulb className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Chemoinformatics Insights</h3>
                    <p className="text-sm text-gray-600">Understanding molecular descriptors and fingerprints</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    <strong className="text-amber-700">Molecular descriptors</strong> provide quantitative measures of molecular properties such as size, lipophilicity, and bioavailability. 
                    These numerical values are essential for predicting drug-like behavior, toxicity, and pharmacokinetic properties.
                  </p>
                  
                  <p className="text-gray-700 leading-relaxed mt-3">
                    <strong className="text-purple-700">Molecular fingerprints</strong> encode structural patterns into binary vectors, enabling:
                  </p>
                  
                  <ul className="list-disc list-inside text-gray-700 space-y-1 mt-2 ml-4">
                    <li><strong>Similarity Analysis:</strong> Identify structurally similar compounds</li>
                    <li><strong>Virtual Screening:</strong> Filter large compound databases</li>
                    <li><strong>Machine Learning:</strong> Train predictive models for activity, toxicity, and properties</li>
                    <li><strong>QSAR Studies:</strong> Establish structure-activity relationships</li>
                    <li><strong>Drug Discovery:</strong> Accelerate hit identification and lead optimization</li>
                  </ul>

                  <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-gray-700">
                      💡 <strong>Pro Tip:</strong> ECFP fingerprints capture local molecular environments and are excellent for similarity searches, 
                      while MACCS keys represent specific structural features and are widely used in drug-likeness predictions and substructure filtering.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {!results && !isCalculating && (
          <Card className="border-2 border-dashed border-gray-300">
            <CardContent className="p-12 text-center">
              <Beaker className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No Results Yet</h3>
              <p className="text-gray-600">
                Enter a SMILES string above and click "Calculate" to generate molecular descriptors and fingerprints.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}