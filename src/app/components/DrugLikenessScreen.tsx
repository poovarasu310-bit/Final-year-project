import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import exampleImage from 'figma:asset/434a3f29b0f3347e6ebea1ebf48b931703b1b2a6.png';
import { 
  ArrowLeft, 
  Shield, 
  CheckCircle2, 
  XCircle,
  Pill,
  Beaker,
  Activity,
  Lightbulb,
  Filter,
  AlertTriangle
} from 'lucide-react';
import { ExportShareButtons } from './ExportShareButtons';

interface DrugLikenessScreenProps {
  onBack: () => void;
  compoundName?: string;
  smiles?: string;
  molecularWeight?: number;
  logP?: number;
  hbondDonors?: number;
  hbondAcceptors?: number;
  storedResults?: {
    lipinski: boolean;
    lipinskiViolations: number;
    lipinskiDetails: string[];
    bioavailabilityScore: number;
    syntheticAccessibility: number;
    drugLikenessScore: number;
    veberCompliance: boolean;
    molecularWeight: number;
    logP: number;
    hBondDonors: number;
    hBondAcceptors: number;
    tpsa: number;
    rotableBonds: number;
  } | null;
}

interface LipinskiRule {
  name: string;
  threshold: string;
  value: number;
  passed: boolean;
  unit: string;
}

interface DrugLikenessResults {
  lipinskiRules: LipinskiRule[];
  bioavailabilityScore: number;
  syntheticAccessibility: number;
  violationsCount: number;
  overallAssessment: string;
}

export function DrugLikenessScreen({ 
  onBack, 
  compoundName = 'Compound',
  smiles = '',
  molecularWeight = 0,
  logP = 0,
  hbondDonors = 0,
  hbondAcceptors = 0,
  storedResults = null
}: DrugLikenessScreenProps) {
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [results, setResults] = useState<DrugLikenessResults | null>(null);

  // If storedResults are provided, use them instead of generating new ones
  const displayResults = storedResults ? {
    lipinskiRules: [
      {
        name: 'Molecular Weight',
        threshold: '≤ 500 Da',
        value: storedResults.molecularWeight,
        passed: storedResults.molecularWeight <= 500,
        unit: 'Da'
      },
      {
        name: 'LogP',
        threshold: '≤ 5',
        value: storedResults.logP,
        passed: storedResults.logP <= 5,
        unit: ''
      },
      {
        name: 'H-Bond Donors',
        threshold: '≤ 5',
        value: storedResults.hBondDonors,
        passed: storedResults.hBondDonors <= 5,
        unit: ''
      },
      {
        name: 'H-Bond Acceptors',
        threshold: '≤ 10',
        value: storedResults.hBondAcceptors,
        passed: storedResults.hBondAcceptors <= 10,
        unit: ''
      }
    ],
    bioavailabilityScore: storedResults.bioavailabilityScore,
    syntheticAccessibility: storedResults.syntheticAccessibility,
    violationsCount: storedResults.lipinskiViolations,
    overallAssessment: storedResults.lipinski ? 'Drug-like' : storedResults.lipinskiViolations <= 1 ? 'Moderately Drug-like' : 'Not Drug-like'
  } : results;

  const runDrugLikenessEvaluation = () => {
    setIsEvaluating(true);
    
    // Simulate drug-likeness evaluation
    setTimeout(() => {
      // Use provided values or generate random ones
      const mw = molecularWeight || 250 + Math.random() * 300; // 250-550
      const lp = logP || 1 + Math.random() * 4; // 1-5
      const hbd = hbondDonors || Math.floor(Math.random() * 6); // 0-5
      const hba = hbondAcceptors || Math.floor(Math.random() * 11); // 0-10

      const rules: LipinskiRule[] = [
        {
          name: 'Molecular Weight',
          threshold: '≤ 500 Da',
          value: mw,
          passed: mw <= 500,
          unit: 'Da'
        },
        {
          name: 'LogP',
          threshold: '≤ 5',
          value: lp,
          passed: lp <= 5,
          unit: ''
        },
        {
          name: 'H-Bond Donors',
          threshold: '≤ 5',
          value: hbd,
          passed: hbd <= 5,
          unit: ''
        },
        {
          name: 'H-Bond Acceptors',
          threshold: '≤ 10',
          value: hba,
          passed: hba <= 10,
          unit: ''
        }
      ];

      const violations = rules.filter(r => !r.passed).length;
      const bioScore = 0.65 + Math.random() * 0.3; // 0.65-0.95
      const synScore = 2 + Math.random() * 4; // 2-6

      const mockResults: DrugLikenessResults = {
        lipinskiRules: rules,
        bioavailabilityScore: bioScore,
        syntheticAccessibility: synScore,
        violationsCount: violations,
        overallAssessment: violations === 0 
          ? 'Excellent drug-likeness' 
          : violations === 1 
          ? 'Acceptable drug-likeness (1 violation)'
          : 'Poor drug-likeness'
      };
      
      setResults(mockResults);
      setIsEvaluating(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-blue-50">
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
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Step 3: Drug-Likeness Evaluation</h1>
                  <p className="text-sm text-gray-600">Lipinski's Rule of Five & compound filtering</p>
                </div>
              </div>
            </div>
            
            {results && results.violationsCount === 0 && (
              <Badge className="bg-green-100 text-green-700 border-green-300 px-3 py-1">
                <CheckCircle2 className="h-3 w-3 mr-1 inline" />
                Drug-Like
              </Badge>
            )}
            {results && results.violationsCount > 0 && (
              <Badge className="bg-amber-100 text-amber-700 border-amber-300 px-3 py-1">
                <AlertTriangle className="h-3 w-3 mr-1 inline" />
                {results.violationsCount} Violation{results.violationsCount > 1 ? 's' : ''}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Compound Info & Action */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Drug-Likeness Assessment</h3>
            <p className="text-sm text-gray-600">Evaluate compound suitability for drug development</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {compoundName && (
              <Alert>
                <AlertDescription>
                  Evaluating: <strong>{compoundName}</strong>
                  {smiles && <span className="text-gray-600 ml-2 text-xs">({smiles})</span>}
                </AlertDescription>
              </Alert>
            )}
            
            <Button 
              onClick={runDrugLikenessEvaluation}
              disabled={isEvaluating || !!results}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              {isEvaluating ? (
                <>
                  <Activity className="h-4 w-4 mr-2 animate-spin" />
                  Evaluating Drug-Likeness...
                </>
              ) : results ? (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Evaluation Complete
                </>
              ) : (
                <>
                  <Shield className="h-4 w-4 mr-2" />
                  Run Drug-Likeness Evaluation
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {results && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Panel: Lipinski's Rule of Five */}
              <Card className="border-2 border-green-200 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                      <Filter className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Lipinski's Rule of Five</h3>
                      <p className="text-sm text-gray-600">Compound filtering criteria</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {results.lipinskiRules.map((rule, index) => (
                      <div 
                        key={index}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          rule.passed 
                            ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' 
                            : 'bg-gradient-to-r from-red-50 to-pink-50 border-red-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-700 mb-1">
                              {rule.name} {rule.threshold}
                            </p>
                            <div className="flex items-center gap-2">
                              <span className={`text-2xl font-bold ${
                                rule.passed ? 'text-green-900' : 'text-red-900'
                              }`}>
                                {rule.value.toFixed(rule.unit === 'Da' ? 0 : 2)}
                              </span>
                              <span className="text-sm text-gray-600">{rule.unit}</span>
                            </div>
                          </div>
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            rule.passed 
                              ? 'bg-green-100' 
                              : 'bg-red-100'
                          }`}>
                            {rule.passed ? (
                              <CheckCircle2 className="h-6 w-6 text-green-600" />
                            ) : (
                              <XCircle className="h-6 w-6 text-red-600" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-xs text-gray-600 leading-relaxed">
                      <strong>Lipinski's Rule of Five</strong> predicts oral bioavailability. 
                      Compounds meeting these criteria are more likely to be orally active drugs.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Right Panel: Bioavailability & Synthetic Accessibility */}
              <div className="space-y-6">
                {/* Bioavailability Score */}
                <Card className="border-2 border-blue-200 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                        <Pill className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">Bioavailability Score</h3>
                        <p className="text-sm text-gray-600">Probability of oral absorption</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <div className="flex items-end gap-2 mb-2">
                        <span className="text-5xl font-bold text-blue-900">
                          {results.bioavailabilityScore.toFixed(2)}
                        </span>
                        <span className="text-lg text-gray-600 mb-2">/1.00</span>
                      </div>
                      <p className="text-sm text-blue-700">
                        {results.bioavailabilityScore >= 0.85 ? 'Excellent' :
                         results.bioavailabilityScore >= 0.7 ? 'Good' :
                         results.bioavailabilityScore >= 0.55 ? 'Moderate' :
                         'Poor'} oral absorption probability
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-cyan-600 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${results.bioavailabilityScore * 100}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>Poor (0.0)</span>
                        <span>Excellent (1.0)</span>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-xs text-blue-700">
                        ✓ High bioavailability indicates the compound can be effectively absorbed when taken orally
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Synthetic Accessibility */}
                <Card className="border-2 border-purple-200 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                        <Beaker className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">Synthetic Accessibility</h3>
                        <p className="text-sm text-gray-600">Ease of chemical synthesis</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <div className="flex items-end gap-2 mb-2">
                        <span className="text-5xl font-bold text-purple-900">
                          {results.syntheticAccessibility.toFixed(1)}
                        </span>
                        <span className="text-lg text-gray-600 mb-2">/10</span>
                      </div>
                      <p className="text-sm text-purple-700">
                        {results.syntheticAccessibility <= 3 ? 'Easy' :
                         results.syntheticAccessibility <= 6 ? 'Moderate' :
                         results.syntheticAccessibility <= 8 ? 'Difficult' :
                         'Very difficult'} to synthesize
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-pink-600 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${(results.syntheticAccessibility / 10) * 100}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>Easy (1)</span>
                        <span>Difficult (10)</span>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <p className="text-xs text-purple-700">
                        Lower scores indicate easier synthesis, making the compound more practical for drug development
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Final Evaluation Result */}
            <Card className={`border-2 shadow-lg ${
              results.violationsCount === 0 
                ? 'border-green-300 bg-gradient-to-r from-green-50 to-emerald-50' 
                : 'border-amber-300 bg-gradient-to-r from-amber-50 to-orange-50'
            }`}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
                    results.violationsCount === 0 
                      ? 'bg-green-100' 
                      : 'bg-amber-100'
                  }`}>
                    {results.violationsCount === 0 ? (
                      <CheckCircle2 className="h-8 w-8 text-green-600" />
                    ) : (
                      <AlertTriangle className="h-8 w-8 text-amber-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-xl font-bold mb-1 ${
                      results.violationsCount === 0 
                        ? 'text-green-900' 
                        : 'text-amber-900'
                    }`}>
                      {results.violationsCount === 0 
                        ? '✓ No violations detected – Excellent drug-likeness' 
                        : `⚠ ${results.violationsCount} violation${results.violationsCount > 1 ? 's' : ''} detected – ${results.overallAssessment}`}
                    </h3>
                    <p className={`text-sm ${
                      results.violationsCount === 0 
                        ? 'text-green-700' 
                        : 'text-amber-700'
                    }`}>
                      {results.violationsCount === 0 
                        ? 'This compound passes all Lipinski criteria and shows excellent drug-like properties suitable for oral drug development.'
                        : 'Some Lipinski criteria are not met. Consider structural modifications to improve drug-likeness.'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Export Share Buttons */}
            <Card className="border-2 border-gray-200 shadow-lg">
              <CardContent className="p-6">
                <ExportShareButtons
                  data={results}
                  stepName="Step 3"
                  stepTitle="Step 3: Drug-Likeness Evaluation"
                  contentId="step3-content"
                  showFormatSelector={true}
                />
              </CardContent>
            </Card>
          </>
        )}

        {!results && !isEvaluating && (
          <Card className="border-2 border-dashed border-gray-300">
            <CardContent className="p-12 text-center">
              <Shield className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No Evaluation Yet</h3>
              <p className="text-gray-600">
                Click "Run Drug-Likeness Evaluation" to assess compound suitability using Lipinski's Rule of Five and bioavailability metrics.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}