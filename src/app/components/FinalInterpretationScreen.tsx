import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { 
  ArrowLeft, 
  CheckCircle2,
  XCircle,
  Award,
  TrendingUp,
  Shield,
  Activity,
  Target,
  Workflow,
  ArrowRight,
  Trophy,
  Star,
  AlertTriangle,
  FileText,
  ChevronRight,
  Zap,
  Brain,
  BarChart3,
  Lightbulb
} from 'lucide-react';

interface FinalInterpretationScreenProps {
  onBack: () => void;
  compoundName?: string;
  smiles?: string;
  molecularWeight?: number;
  logP?: number;
  tpsa?: number;
  hbondDonors?: number;
  hbondAcceptors?: number;
}

interface PredictedCompound {
  id: string;
  name: string;
  smiles: string;
  predictedActivity: 'Active' | 'Moderately Active' | 'Inactive';
  activityProbability: number;
  rank: number;
  drugLikenessScore: number;
  lipinskiCompliance: boolean;
  bioavailabilityScore: number;
  syntheticAccessibility: number;
  bindingScore: number;
  targetInteraction: 'Strong' | 'Moderate' | 'Weak';
  therapeuticPotential: 'High' | 'Medium' | 'Low';
  overallConfidence: number;
}

export function FinalInterpretationScreen({ 
  onBack, 
  compoundName = 'Test Compound',
  smiles = 'CCO',
  molecularWeight = 0,
  logP = 0,
  tpsa = 0,
  hbondDonors = 0,
  hbondAcceptors = 0
}: FinalInterpretationScreenProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<PredictedCompound[] | null>(null);
  const [selectedCompound, setSelectedCompound] = useState<PredictedCompound | null>(null);

  const generateFinalPrediction = () => {
    setIsGenerating(true);
    
    // Simulate final prediction generation
    setTimeout(() => {
      const compounds: PredictedCompound[] = [
        {
          id: 'COMP-001',
          name: compoundName,
          smiles: smiles,
          predictedActivity: 'Active',
          activityProbability: 92.4,
          rank: 1,
          drugLikenessScore: 0.89,
          lipinskiCompliance: true,
          bioavailabilityScore: 0.87,
          syntheticAccessibility: 3.2,
          bindingScore: -8.7,
          targetInteraction: 'Strong',
          therapeuticPotential: 'High',
          overallConfidence: 91.2
        },
        {
          id: 'COMP-002',
          name: 'Quercetin',
          smiles: 'C1=CC(=C(C=C1C2=C(C(=O)C3=C(C=C(C=C3O2)O)O)O)O)O',
          predictedActivity: 'Active',
          activityProbability: 88.6,
          rank: 2,
          drugLikenessScore: 0.82,
          lipinskiCompliance: true,
          bioavailabilityScore: 0.79,
          syntheticAccessibility: 4.1,
          bindingScore: -7.9,
          targetInteraction: 'Strong',
          therapeuticPotential: 'High',
          overallConfidence: 86.8
        },
        {
          id: 'COMP-003',
          name: 'Curcumin',
          smiles: 'COC1=C(C=CC(=C1)C=CC(=O)CC(=O)C=CC2=CC(=C(C=C2)O)OC)O',
          predictedActivity: 'Moderately Active',
          activityProbability: 76.3,
          rank: 3,
          drugLikenessScore: 0.74,
          lipinskiCompliance: false,
          bioavailabilityScore: 0.68,
          syntheticAccessibility: 5.3,
          bindingScore: -6.8,
          targetInteraction: 'Moderate',
          therapeuticPotential: 'Medium',
          overallConfidence: 73.5
        }
      ];
      
      setResults(compounds);
      setSelectedCompound(compounds[0]);
      setIsGenerating(false);
    }, 2500);
  };

  const getActivityColor = (activity: string) => {
    if (activity === 'Active') return 'text-green-700 bg-green-100 border-green-300';
    if (activity === 'Moderately Active') return 'text-blue-700 bg-blue-100 border-blue-300';
    return 'text-red-700 bg-red-100 border-red-300';
  };

  const getPotentialColor = (potential: string) => {
    if (potential === 'High') return 'text-green-700 bg-green-100 border-green-300';
    if (potential === 'Medium') return 'text-orange-700 bg-orange-100 border-orange-300';
    return 'text-red-700 bg-red-100 border-red-300';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
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
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                  <Award className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Step 5: Final Interpretation & Drug Prediction Output</h1>
                  <p className="text-sm text-gray-600">Integrated analysis and final drug candidate selection</p>
                </div>
              </div>
            </div>
            
            {results && (
              <Badge className="bg-green-100 text-green-700 border-green-300 px-3 py-1">
                <CheckCircle2 className="h-3 w-3 mr-1 inline" />
                Prediction Completed
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Action Card */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Generate Final Drug Prediction</h3>
            <p className="text-sm text-gray-600">Integrate all analysis steps and produce final drug candidate ranking</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertDescription>
                This final step will integrate molecular descriptors, QSAR predictions, drug-likeness evaluation, and ML visualizations to produce a ranked list of drug candidates.
              </AlertDescription>
            </Alert>
            
            <Button 
              onClick={generateFinalPrediction}
              disabled={isGenerating || !!results}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              {isGenerating ? (
                <>
                  <Brain className="h-4 w-4 mr-2 animate-pulse" />
                  Generating Final Prediction...
                </>
              ) : results ? (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Prediction Complete
                </>
              ) : (
                <>
                  <Award className="h-4 w-4 mr-2" />
                  Generate Final Prediction
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {results && (
          <>
            {/* Integrated Analysis Overview */}
            <Card className="border-2 border-purple-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                    <Workflow className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Integrated Analysis Overview</h3>
                    <p className="text-sm text-gray-600">Complete cheminformatics pipeline workflow</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex-1 min-w-[180px] p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded bg-blue-500 flex items-center justify-center">
                        <FileText className="h-3 w-3 text-white" />
                      </div>
                      <h4 className="font-bold text-blue-900 text-xs">Step 1</h4>
                    </div>
                    <p className="text-xs text-blue-700">Molecular Descriptors & Fingerprints</p>
                  </div>

                  <ArrowRight className="h-4 w-4 text-gray-400 flex-shrink-0" />

                  <div className="flex-1 min-w-[180px] p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded bg-green-500 flex items-center justify-center">
                        <Activity className="h-3 w-3 text-white" />
                      </div>
                      <h4 className="font-bold text-green-900 text-xs">Step 2</h4>
                    </div>
                    <p className="text-xs text-green-700">QSAR Modeling & Activity Prediction</p>
                  </div>

                  <ArrowRight className="h-4 w-4 text-gray-400 flex-shrink-0" />

                  <div className="flex-1 min-w-[180px] p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded bg-orange-500 flex items-center justify-center">
                        <Shield className="h-3 w-3 text-white" />
                      </div>
                      <h4 className="font-bold text-orange-900 text-xs">Step 3</h4>
                    </div>
                    <p className="text-xs text-orange-700">Drug-Likeness Evaluation</p>
                  </div>

                  <ArrowRight className="h-4 w-4 text-gray-400 flex-shrink-0" />

                  <div className="flex-1 min-w-[180px] p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded bg-indigo-500 flex items-center justify-center">
                        <BarChart3 className="h-3 w-3 text-white" />
                      </div>
                      <h4 className="font-bold text-indigo-900 text-xs">Step 4</h4>
                    </div>
                    <p className="text-xs text-indigo-700">ML Visualization & Activity Profiling</p>
                  </div>

                  <ArrowRight className="h-4 w-4 text-gray-400 flex-shrink-0" />

                  <div className="flex-1 min-w-[180px] p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-2 border-purple-300">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded bg-purple-500 flex items-center justify-center">
                        <Award className="h-3 w-3 text-white" />
                      </div>
                      <h4 className="font-bold text-purple-900 text-xs">Step 5</h4>
                    </div>
                    <p className="text-xs text-purple-700 font-semibold">Final Interpretation & Ranking</p>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <p className="text-xs text-purple-800">
                    <strong>Pipeline Integration:</strong> All analysis steps contribute quantitative features that are combined using ensemble methods to produce final ranked predictions with confidence scores.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Section A: Predicted Active Compounds */}
            <Card className="border-2 border-green-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                    <Activity className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Section A: Predicted Active Compounds</h3>
                    <p className="text-sm text-gray-600">Ranked by ML prediction confidence</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left p-3 text-sm font-bold text-gray-900">Rank</th>
                        <th className="text-left p-3 text-sm font-bold text-gray-900">Compound ID</th>
                        <th className="text-left p-3 text-sm font-bold text-gray-900">Name</th>
                        <th className="text-left p-3 text-sm font-bold text-gray-900">SMILES</th>
                        <th className="text-left p-3 text-sm font-bold text-gray-900">Predicted Activity</th>
                        <th className="text-left p-3 text-sm font-bold text-gray-900">Activity Probability</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((compound, index) => (
                        <tr 
                          key={compound.id}
                          className={`border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                            compound.rank === 1 ? 'bg-green-50' : ''
                          }`}
                          onClick={() => setSelectedCompound(compound)}
                        >
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              {compound.rank === 1 && <Trophy className="h-4 w-4 text-yellow-500" />}
                              <span className="font-bold text-gray-900">#{compound.rank}</span>
                            </div>
                          </td>
                          <td className="p-3 text-sm text-gray-700 font-mono">{compound.id}</td>
                          <td className="p-3 text-sm font-semibold text-gray-900">{compound.name}</td>
                          <td className="p-3 text-xs text-gray-600 font-mono max-w-xs truncate">{compound.smiles}</td>
                          <td className="p-3">
                            <Badge className={getActivityColor(compound.predictedActivity)}>
                              {compound.predictedActivity === 'Active' ? (
                                <CheckCircle2 className="h-3 w-3 mr-1 inline" />
                              ) : compound.predictedActivity === 'Moderately Active' ? (
                                <AlertTriangle className="h-3 w-3 mr-1 inline" />
                              ) : (
                                <XCircle className="h-3 w-3 mr-1 inline" />
                              )}
                              {compound.predictedActivity}
                            </Badge>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-gray-900">{compound.activityProbability.toFixed(1)}%</span>
                              <div className="w-20 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full"
                                  style={{ width: `${compound.activityProbability}%` }}
                                />
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Selected Compound Details */}
            {selectedCompound && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Section B: Drug-Likeness & Safety Summary */}
                <Card className="border-2 border-blue-200 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                        <Shield className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">Section B: Drug-Likeness & Safety</h3>
                        <p className="text-sm text-gray-600">{selectedCompound.name}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-white rounded-lg border border-blue-200">
                        <p className="text-xs text-gray-600 mb-2">Drug-Likeness Score</p>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-gray-900">{selectedCompound.drugLikenessScore.toFixed(2)}</span>
                          <Badge className="bg-green-100 text-green-700 border-green-300">
                            <CheckCircle2 className="h-3 w-3 mr-1 inline" />
                            Good
                          </Badge>
                        </div>
                        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-cyan-600 h-2 rounded-full"
                            style={{ width: `${selectedCompound.drugLikenessScore * 100}%` }}
                          />
                        </div>
                      </div>

                      <div className="p-4 bg-white rounded-lg border border-blue-200">
                        <p className="text-xs text-gray-600 mb-2">Lipinski Rule Compliance</p>
                        <Badge className={selectedCompound.lipinskiCompliance 
                          ? 'bg-green-100 text-green-700 border-green-300'
                          : 'bg-red-100 text-red-700 border-red-300'
                        }>
                          {selectedCompound.lipinskiCompliance ? (
                            <>
                              <CheckCircle2 className="h-3 w-3 mr-1 inline" />
                              Passed
                            </>
                          ) : (
                            <>
                              <XCircle className="h-3 w-3 mr-1 inline" />
                              Failed
                            </>
                          )}
                        </Badge>
                        <p className="text-xs text-gray-600 mt-2">
                          {selectedCompound.lipinskiCompliance 
                            ? 'Meets all Lipinski criteria' 
                            : 'Violates one or more criteria'
                          }
                        </p>
                      </div>

                      <div className="p-4 bg-white rounded-lg border border-blue-200">
                        <p className="text-xs text-gray-600 mb-2">Bioavailability Score</p>
                        <span className="text-2xl font-bold text-gray-900">{selectedCompound.bioavailabilityScore.toFixed(2)}</span>
                        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full"
                            style={{ width: `${selectedCompound.bioavailabilityScore * 100}%` }}
                          />
                        </div>
                      </div>

                      <div className="p-4 bg-white rounded-lg border border-blue-200">
                        <p className="text-xs text-gray-600 mb-2">Synthetic Accessibility</p>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-gray-900">{selectedCompound.syntheticAccessibility.toFixed(1)}</span>
                          <Badge className={selectedCompound.syntheticAccessibility <= 4
                            ? 'bg-green-100 text-green-700 border-green-300'
                            : 'bg-orange-100 text-orange-700 border-orange-300'
                          }>
                            {selectedCompound.syntheticAccessibility <= 4 ? 'Easy' : 'Moderate'}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 mt-2">Scale: 1 (easy) - 10 (difficult)</p>
                      </div>
                    </div>

                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-xs text-blue-800">
                        <strong>Summary:</strong> {selectedCompound.lipinskiCompliance ? 'This compound meets drug-likeness criteria and shows favorable pharmacokinetic properties.' : 'This compound shows some limitations in drug-likeness but may still have therapeutic value.'}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Section C: Binding & Interaction Scores */}
                <Card className="border-2 border-orange-200 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 border-b">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                        <Target className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">Section C: Binding & Interaction</h3>
                        <p className="text-sm text-gray-600">{selectedCompound.name}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="p-4 bg-white rounded-lg border border-orange-200">
                        <p className="text-xs text-gray-600 mb-2">Binding Score / Affinity</p>
                        <div className="flex items-center gap-3">
                          <span className="text-3xl font-bold text-gray-900">{selectedCompound.bindingScore.toFixed(1)}</span>
                          <span className="text-sm text-gray-600">kcal/mol</span>
                          <Badge className={selectedCompound.bindingScore <= -7
                            ? 'bg-green-100 text-green-700 border-green-300'
                            : 'bg-orange-100 text-orange-700 border-orange-300'
                          }>
                            {selectedCompound.bindingScore <= -7 ? 'Strong' : 'Moderate'}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 mt-2">
                          More negative values indicate stronger binding affinity
                        </p>
                      </div>

                      <div className="p-4 bg-white rounded-lg border border-orange-200">
                        <p className="text-xs text-gray-600 mb-2">Target Interaction Strength</p>
                        <div className="flex items-center gap-2 mb-3">
                          <Badge className={
                            selectedCompound.targetInteraction === 'Strong'
                              ? 'bg-green-100 text-green-700 border-green-300'
                              : selectedCompound.targetInteraction === 'Moderate'
                              ? 'bg-blue-100 text-blue-700 border-blue-300'
                              : 'bg-orange-100 text-orange-700 border-orange-300'
                          }>
                            <Zap className="h-3 w-3 mr-1 inline" />
                            {selectedCompound.targetInteraction} Interaction
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span>Weak</span>
                            <span>Moderate</span>
                            <span>Strong</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                              className={`h-3 rounded-full ${
                                selectedCompound.targetInteraction === 'Strong'
                                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 w-full'
                                  : selectedCompound.targetInteraction === 'Moderate'
                                  ? 'bg-gradient-to-r from-blue-500 to-cyan-600 w-2/3'
                                  : 'bg-gradient-to-r from-orange-500 to-red-600 w-1/3'
                              }`}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-white rounded-lg border border-orange-200">
                        <p className="text-xs text-gray-600 mb-2">Stability Indicator</p>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                          <span className="text-sm font-semibold text-gray-900">Stable Complex Formation</span>
                        </div>
                        <p className="text-xs text-gray-600 mt-2">
                          Predicted binding complex shows favorable stability
                        </p>
                      </div>
                    </div>

                    <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                      <p className="text-xs text-orange-800">
                        <strong>Note:</strong> Binding scores estimate the strength of interaction between the compound and the biological target. Lower (more negative) scores indicate stronger binding.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Section D: Ranked Lead Compounds */}
            <Card className="border-2 border-purple-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                    <Trophy className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Section D: Ranked Lead Compounds (Final Output)</h3>
                    <p className="text-sm text-gray-600">Top drug candidates prioritized for experimental validation</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {results.map((compound, index) => (
                    <div 
                      key={compound.id}
                      className={`p-5 rounded-xl border-2 transition-all ${
                        compound.rank === 1 
                          ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-300 shadow-lg' 
                          : 'bg-white border-gray-200 hover:border-purple-200 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          {compound.rank === 1 && (
                            <div className="flex items-center gap-2 bg-yellow-400 px-3 py-1 rounded-full">
                              <Star className="h-4 w-4 text-white fill-white" />
                              <span className="text-xs font-bold text-white">BEST LEAD</span>
                            </div>
                          )}
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-2xl font-bold text-gray-900">#{compound.rank}</span>
                              <span className="text-lg font-bold text-gray-900">{compound.name}</span>
                            </div>
                            <p className="text-xs text-gray-600 font-mono mt-1">{compound.id}</p>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Overall Confidence</p>
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-gray-900">{compound.overallConfidence.toFixed(1)}%</span>
                          </div>
                          <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full"
                              style={{ width: `${compound.overallConfidence}%` }}
                            />
                          </div>
                        </div>

                        <div>
                          <p className="text-xs text-gray-600 mb-1">Therapeutic Potential</p>
                          <Badge className={getPotentialColor(compound.therapeuticPotential)}>
                            <TrendingUp className="h-3 w-3 mr-1 inline" />
                            {compound.therapeuticPotential}
                          </Badge>
                        </div>

                        <div>
                          <p className="text-xs text-gray-600 mb-1">Predicted Activity</p>
                          <Badge className={getActivityColor(compound.predictedActivity)}>
                            {compound.predictedActivity === 'Active' ? (
                              <CheckCircle2 className="h-3 w-3 mr-1 inline" />
                            ) : (
                              <AlertTriangle className="h-3 w-3 mr-1 inline" />
                            )}
                            {compound.predictedActivity}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Final Interpretation Panel */}
            <Card className="border-2 border-indigo-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center">
                    <Lightbulb className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Final Interpretation</h3>
                    <p className="text-sm text-gray-600">Comprehensive analysis summary and recommendations</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    <strong className="text-indigo-700">
                      This final interpretation integrates cheminformatics descriptors, machine learning predictions, and drug-likeness evaluation 
                      to identify and prioritize promising new drug candidates for further experimental validation.
                    </strong>
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <h4 className="text-sm font-bold text-green-900 mb-2 flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4" />
                        Key Findings
                      </h4>
                      <ul className="text-xs text-gray-700 space-y-1">
                        <li>• {results.filter(c => c.predictedActivity === 'Active').length} compounds predicted as Active</li>
                        <li>• Top candidate shows {results[0].overallConfidence.toFixed(1)}% confidence</li>
                        <li>• {results.filter(c => c.lipinskiCompliance).length} compounds pass Lipinski criteria</li>
                        <li>• Strong binding affinity observed in lead compounds</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="text-sm font-bold text-blue-900 mb-2 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        Recommendations
                      </h4>
                      <ul className="text-xs text-gray-700 space-y-1">
                        <li>• Prioritize {results[0].name} for in vitro testing</li>
                        <li>• Validate binding affinity experimentally</li>
                        <li>• Conduct ADME/Tox profiling</li>
                        <li>• Perform structure-activity relationship studies</li>
                      </ul>
                    </div>
                  </div>

                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <p className="text-xs text-yellow-800">
                      <strong>⚠️ Important:</strong> These predictions are computational estimates based on machine learning models and molecular descriptors. 
                      Experimental validation through in vitro and in vivo studies is essential before proceeding to clinical development. 
                      Always consult with medicinal chemistry and pharmacology experts when interpreting these results.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {!results && !isGenerating && (
          <Card className="border-2 border-dashed border-gray-300">
            <CardContent className="p-12 text-center">
              <Award className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No Final Prediction Yet</h3>
              <p className="text-gray-600">
                Click "Generate Final Prediction" to integrate all analysis steps and produce the final drug candidate ranking.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
