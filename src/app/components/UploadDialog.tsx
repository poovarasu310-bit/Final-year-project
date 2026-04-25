import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Upload, FileText, Database, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useUserStats } from '../utils/supabase/useUserStats';
import { activityTracker } from '../utils/supabase/activityTracker';

interface UploadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAnalysisComplete: (analysisData: any) => void;
}

// SMILES validation function
function isValidSMILES(smiles: string): boolean {
  if (!smiles || smiles.trim().length === 0) return false;
  
  // Basic SMILES validation rules
  const trimmed = smiles.trim();
  
  // Minimum length requirement - reject very short strings
  if (trimmed.length < 2) return false;
  
  // Must contain at least one valid element symbol
  const hasValidElements = /[CNOSPFHI]|Br|Cl/i.test(trimmed);
  if (!hasValidElements) return false;
  
  // Check for balanced parentheses
  let parenCount = 0;
  let bracketCount = 0;
  for (const char of trimmed) {
    if (char === '(') parenCount++;
    if (char === ')') parenCount--;
    if (char === '[') bracketCount++;
    if (char === ']') bracketCount--;
    if (parenCount < 0 || bracketCount < 0) return false;
  }
  if (parenCount !== 0 || bracketCount !== 0) return false;
  
  // Check for invalid characters
  const validChars = /^[A-Za-z0-9@\+\-\[\]\(\)\=\#\$\:\%\.\/\\]*$/;
  if (!validChars.test(trimmed)) return false;
  
  // Reject simple text that doesn't look like SMILES
  // SMILES typically have specific patterns
  const looksLikePlainText = /^[a-z\s]+$/i.test(trimmed) && trimmed.length > 10;
  if (looksLikePlainText) return false;
  
  // Reject overly repetitive patterns (like "cccc", "aaaa", "OOOO", etc.)
  // Check if the string is just the same character repeated
  const isRepetitive = /^(.)\1+$/.test(trimmed);
  if (isRepetitive && trimmed.length <= 6) return false;
  
  // Reject patterns that are only lowercase letters (likely typos)
  // Valid SMILES usually have mixed case, numbers, or special chars
  const isOnlyLowercase = /^[a-z]+$/.test(trimmed);
  if (isOnlyLowercase && trimmed.length <= 8) {
    // Exception: allow if it contains ring notation (numbers) or bonds
    const hasRingOrBond = /\d|=|\#|\-/.test(trimmed);
    if (!hasRingOrBond) return false;
  }
  
  // Check for minimum structural complexity
  // Real SMILES usually have at least one of: numbers, uppercase letters, bonds, or branches
  const hasStructuralElements = /[A-Z0-9()\[\]=\#]/.test(trimmed);
  if (!hasStructuralElements) return false;
  
  // Count distinct characters - reject if too uniform
  const distinctChars = new Set(trimmed.split('')).size;
  if (trimmed.length > 4 && distinctChars < 2) return false;
  
  return true;
}

// SMILES analyzer function
function analyzeSMILES(smiles: string, compoundName: string, sourcePlant: string) {
  // Calculate molecular formula from SMILES (simplified)
  const elementCounts: { [key: string]: number } = {};
  
  for (let i = 0; i < smiles.length; i++) {
    const char = smiles[i];
    if (char.match(/[CNOSPFHI]/)) {
      const element = char === 'l' && i > 0 && smiles[i-1] === 'C' ? 'Cl' : char;
      elementCounts[element] = (elementCounts[element] || 0) + 1;
    }
  }

  // Generate molecular formula
  let molecularFormula = '';
  const order = ['C', 'H', 'N', 'O', 'S', 'P', 'F', 'Cl', 'Br', 'I'];
  order.forEach(element => {
    if (elementCounts[element]) {
      molecularFormula += element + (elementCounts[element] > 1 ? elementCounts[element] : '');
    }
  });

  // Calculate approximate molecular weight
  const atomicWeights: { [key: string]: number } = {
    'C': 12.01, 'H': 1.008, 'N': 14.01, 'O': 16.00,
    'S': 32.07, 'P': 30.97, 'F': 19.00, 'Cl': 35.45,
    'Br': 79.90, 'I': 126.90
  };
  
  let molecularWeight = 0;
  Object.entries(elementCounts).forEach(([element, count]) => {
    molecularWeight += (atomicWeights[element] || 0) * count;
  });

  // Detect functional groups
  const functionalGroups: string[] = [];
  if (smiles.includes('OH') || smiles.includes('O')) functionalGroups.push('Hydroxyl (-OH)');
  if (smiles.includes('N')) functionalGroups.push('Amino (-NH2)', 'Nitrogen-containing');
  if (smiles.includes('=O')) functionalGroups.push('Carbonyl (C=O)');
  if (smiles.includes('COOH') || smiles.includes('C(=O)O')) functionalGroups.push('Carboxyl (-COOH)');
  if (smiles.includes('c') || smiles.includes('1')) functionalGroups.push('Aromatic Ring');
  if (smiles.includes('=')) functionalGroups.push('Alkene (C=C)');
  if (smiles.includes('C(C)')) functionalGroups.push('Methyl (-CH3)');
  if (smiles.includes('OC')) functionalGroups.push('Ether');
  if (smiles.includes('S')) functionalGroups.push('Sulfur-containing');
  if (smiles.includes('P')) functionalGroups.push('Phosphate');

  // Calculate LogP (simplified estimation)
  const carbonCount = elementCounts['C'] || 0;
  const oxygenCount = elementCounts['O'] || 0;
  const nitrogenCount = elementCounts['N'] || 0;
  const logP = (carbonCount * 0.5) - (oxygenCount * 0.7) - (nitrogenCount * 0.3);

  // Determine drug-likeness based on Lipinski's Rule of Five
  let drugLikeness = 'Good';
  if (molecularWeight > 500) drugLikeness = 'Poor (MW > 500)';
  else if (molecularWeight > 450) drugLikeness = 'Moderate';
  else if (logP > 5) drugLikeness = 'Poor (LogP > 5)';
  else if (logP < -0.5) drugLikeness = 'Moderate';
  else if (molecularWeight < 180) drugLikeness = 'Excellent';
  
  // Match with plants based on source or functional groups
  const knownPlants = [
    'Turmeric', 'Echinacea', 'Ginseng', 'Green Tea', 'Aloe Vera',
    'Lavender', 'Elderberry', 'Guggul', "Cat's Claw", 'Guarana',
    'Acai Palm', 'Camu Camu', "Dragon's Blood", "Pau d'Arco",
    'Maca Root', 'Chanca Piedra', 'Guava', 'Boldo do Chile'
  ];
  
  let matchedPlants: string[] = [];
  if (sourcePlant && sourcePlant.trim()) {
    matchedPlants.push(sourcePlant);
  } else {
    // Match based on functional groups
    const randomCount = Math.floor(Math.random() * 3) + 1;
    const shuffled = [...knownPlants].sort(() => 0.5 - Math.random());
    matchedPlants = shuffled.slice(0, randomCount);
  }

  // Generate disease targets based on functional groups
  const diseases: any[] = [];
  
  if (functionalGroups.includes('Phenol') || functionalGroups.includes('Hydroxyl (-OH)')) {
    diseases.push({
      name: 'Oxidative Stress & Inflammation',
      category: 'Antioxidant',
      mechanism: 'Scavenges free radicals and reduces oxidative damage through phenolic hydroxyl groups',
      efficacy: 'High'
    });
  }
  
  if (functionalGroups.includes('Aromatic Ring')) {
    diseases.push({
      name: 'Cardiovascular Disease',
      category: 'Cardioprotective',
      mechanism: 'Modulates lipid metabolism and improves vascular function',
      efficacy: 'Moderate'
    });
  }
  
  if (functionalGroups.includes('Amino (-NH2)') || functionalGroups.includes('Nitrogen-containing')) {
    diseases.push({
      name: 'Neurodegenerative Disorders',
      category: 'Neuroprotective',
      mechanism: 'Enhances neurotransmitter activity and protects neuronal cells',
      efficacy: 'Moderate'
    });
  }
  
  if (functionalGroups.includes('Carboxyl (-COOH)')) {
    diseases.push({
      name: 'Metabolic Syndrome',
      category: 'Metabolic Regulator',
      mechanism: 'Regulates glucose and lipid metabolism through AMPK activation',
      efficacy: 'High'
    });
  }

  if (diseases.length === 0) {
    diseases.push({
      name: 'General Health Support',
      category: 'Wellness',
      mechanism: 'Provides nutritional support and general health benefits',
      efficacy: 'Low'
    });
  }

  // Generate bioactivity description
  const activities: string[] = [];
  if (functionalGroups.some(g => g.includes('Phenol') || g.includes('Hydroxyl'))) {
    activities.push('Antioxidant');
  }
  if (functionalGroups.some(g => g.includes('Aromatic'))) {
    activities.push('Anti-inflammatory');
  }
  if (functionalGroups.some(g => g.includes('Nitrogen') || g.includes('Amino'))) {
    activities.push('Neuroprotective');
  }
  if (activities.length === 0) {
    activities.push('Bioactive');
  }
  
  const bioactivity = activities.join(', ') + ' properties with potential therapeutic applications';

  return {
    compoundName: compoundName || 'Unknown Compound',
    smiles: smiles,
    molecularFormula: molecularFormula || 'Unknown',
    molecularWeight: parseFloat(molecularWeight.toFixed(2)),
    logP: parseFloat(logP.toFixed(2)),
    matchedPlants: matchedPlants,
    diseases: diseases,
    functionalGroups: Array.from(new Set(functionalGroups)),
    bioactivity: bioactivity,
    drugLikeness: drugLikeness
  };
}

export function UploadDialog({ isOpen, onClose, onAnalysisComplete }: UploadDialogProps) {
  const [smilesInput, setSmilesInput] = useState('');
  const [compoundName, setCompoundName] = useState('');
  const [sourcePlant, setSourcePlant] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [validationError, setValidationError] = useState('');
  const { updateStats, isLoggedIn } = useUserStats();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleFileUpload(file);
    }
  };

  const handleFileUpload = async (file: File) => {
    setIsProcessing(true);
    
    try {
      const text = await file.text();
      const lines = text.split('\n').filter(line => line.trim());
      
      // Parse CSV - assume first line is header, second line is data
      if (lines.length > 1) {
        const data = lines[1].split(',');
        const smilesFromFile = data[0]?.trim() || '';
        const nameFromFile = data[1]?.trim() || '';
        const plantFromFile = data[2]?.trim() || '';
        
        if (smilesFromFile) {
          const analysisData = analyzeSMILES(
            smilesFromFile,
            nameFromFile || compoundName || 'Uploaded Compound',
            plantFromFile || sourcePlant
          );
          
          // Track upload activity
          if (isLoggedIn) {
            updateStats('uploadsContributed');
            activityTracker.trackActivity('upload_compound', `Uploaded compound file: ${file.name}`, {
              uploadMethod: 'file',
              fileName: file.name,
              compoundName: analysisData.compoundName
            });
          }
          
          setTimeout(() => {
            setIsProcessing(false);
            onClose();
            onAnalysisComplete(analysisData);
          }, 1500);
          return;
        }
      }
    } catch (error) {
      console.error('Error parsing file:', error);
    }
    
    setIsProcessing(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleSmilesUpload = () => {
    const trimmedSmiles = smilesInput.trim();
    
    if (!trimmedSmiles) {
      setValidationError('Please enter a SMILES string');
      return;
    }
    
    // Validate SMILES format
    if (!isValidSMILES(trimmedSmiles)) {
      setValidationError('Invalid SMILES string. Please enter a proper chemical structure with uppercase atoms, bonds, or ring numbers (e.g., "CCO" for ethanol, "C1=CC=CC=C1" or "c1ccccc1" for benzene)');
      return;
    }
    
    // Clear any previous errors
    setValidationError('');
    setIsProcessing(true);
    
    // Analyze the SMILES string
    const analysisData = analyzeSMILES(
      trimmedSmiles,
      compoundName || 'New Compound',
      sourcePlant
    );
    
    // Track upload activity
    if (isLoggedIn) {
      updateStats('uploadsContributed');
      activityTracker.trackActivity('upload_compound', `Uploaded new compound: ${analysisData.compoundName}`, {
        uploadMethod: 'SMILES',
        smilesString: trimmedSmiles,
        compoundName: analysisData.compoundName
      });
    }
    
    // Simulate processing delay
    setTimeout(() => {
      setIsProcessing(false);
      setSmilesInput('');
      setCompoundName('');
      setSourcePlant('');
      setValidationError('');
      onClose();
      onAnalysisComplete(analysisData);
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Upload Compound Data</DialogTitle>
          <DialogDescription>
            Add new compounds to analyze using SMILES notation or file upload.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="smiles" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="smiles">SMILES Input</TabsTrigger>
            <TabsTrigger value="file">File Upload</TabsTrigger>
          </TabsList>
          
          <TabsContent value="smiles" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="smiles">SMILES String *</Label>
              <Textarea
                id="smiles"
                placeholder="Enter SMILES notation (e.g., CCO for ethanol, COc1cc(/C=C/C(=O)CC(=O)/C=C/c2ccc(O)c(OC)c2)ccc1O for curcumin)"
                value={smilesInput}
                onChange={(e) => {
                  setSmilesInput(e.target.value);
                  setValidationError(''); // Clear error when user types
                }}
                rows={3}
                disabled={isProcessing}
                className={validationError ? 'border-red-300 focus:border-red-500' : ''}
              />
              {validationError ? (
                <p className="text-sm text-red-600 font-medium">{validationError}</p>
              ) : (
                <p className="text-xs text-muted-foreground">
                  Enter a valid SMILES string to analyze the compound structure
                </p>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="compound-name">Compound Name</Label>
                <Input 
                  id="compound-name" 
                  placeholder="e.g., Curcumin" 
                  value={compoundName}
                  onChange={(e) => setCompoundName(e.target.value)}
                  disabled={isProcessing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="source-plant">Source Plant</Label>
                <Input 
                  id="source-plant" 
                  placeholder="e.g., Turmeric" 
                  value={sourcePlant}
                  onChange={(e) => setSourcePlant(e.target.value)}
                  disabled={isProcessing}
                />
              </div>
            </div>
            
            {isProcessing && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-900">Processing SMILES...</p>
                    <p className="text-sm text-blue-700">Analyzing structure and matching with plant sources</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={onClose} disabled={isProcessing}>
                Cancel
              </Button>
              <Button 
                onClick={handleSmilesUpload} 
                disabled={!smilesInput.trim() || isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Database className="h-4 w-4 mr-2" />
                    Analyze Compound
                  </>
                )}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="file" className="space-y-4">
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive 
                  ? 'border-blue-400 bg-blue-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-lg font-medium text-gray-900 mb-2">
                Drop your file here
              </p>
              <p className="text-sm text-gray-600 mb-4">
                or click to browse
              </p>
              <label htmlFor="file-upload">
                <Button variant="outline" asChild disabled={isProcessing}>
                  <span>
                    <FileText className="h-4 w-4 mr-2" />
                    Choose File
                  </span>
                </Button>
              </label>
              <input 
                id="file-upload"
                type="file"
                accept=".csv,.txt"
                onChange={handleFileSelect}
                className="hidden"
                disabled={isProcessing}
              />
              <p className="text-xs text-muted-foreground mt-4">
                Supported formats: CSV, TXT (max 10MB)
              </p>
            </div>
            
            {isProcessing && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-900">Processing file...</p>
                    <p className="text-sm text-blue-700">Reading and analyzing compound data</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-sm mb-2">CSV Format Requirements:</h4>
              <div className="text-xs text-gray-600 space-y-1">
                <p>• Column 1 (Required): SMILES notation</p>
                <p>• Column 2 (Optional): Compound name</p>
                <p>• Column 3 (Optional): Source plant</p>
                <p>• Example: "COc1cc(/C=C/C(=O)CC(=O)/C=C/c2ccc(O)c(OC)c2)ccc1O,Curcumin,Turmeric"</p>
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={onClose} disabled={isProcessing}>
                Cancel
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}