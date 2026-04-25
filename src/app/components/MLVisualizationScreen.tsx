import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { 
  ArrowLeft, 
  Eye, 
  CheckCircle2,
  BarChart3,
  Activity,
  Lightbulb,
  TrendingUp,
  Brain,
  Workflow,
  ArrowRight,
  Zap,
  Target,
  ChevronDown,
  ChevronUp,
  Cpu
} from 'lucide-react';
import { ExpandableMLCard } from './ExpandableMLCard';

interface MLVisualizationScreenProps {
  onBack: () => void;
  compoundName?: string;
  smiles?: string;
  molecularWeight?: number;
  logP?: number;
  tpsa?: number;
  hbondDonors?: number;
  hbondAcceptors?: number;
  rotatableBonds?: number;
}

interface MolecularDescriptor {
  name: string;
  abbrev: string;
  value: number;
  normalizedValue: number;
  color: string;
  unit: string;
}

interface BiologicalActivity {
  name: string;
  confidence: number;
  color: string;
}

interface MLPredictionResults {
  descriptors: MolecularDescriptor[];
  activities: BiologicalActivity[];
  overallClassification: string;
  activityProbability: number;
}

export function MLVisualizationScreen({ 
  onBack, 
  compoundName = 'Compound',
  smiles = '',
  molecularWeight = 0,
  logP = 0,
  tpsa = 0,
  hbondDonors = 0,
  hbondAcceptors = 0,
  rotatableBonds = 0
}: MLVisualizationScreenProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<MLPredictionResults | null>(null);
  const [expandedCard, setExpandedCard] = useState<'models' | 'outputs' | null>(null);

  const runMLVisualization = () => {
    setIsGenerating(true);
    
    // Simulate ML prediction visualization generation
    setTimeout(() => {
      // Use provided values or generate random ones - ensure all values are numbers
      const mw = Number(molecularWeight) || 250 + Math.random() * 300;
      const lp = Number(logP) || 1 + Math.random() * 4;
      const tp = Number(tpsa) || 40 + Math.random() * 100;
      const hbd = Number(hbondDonors) || Math.floor(Math.random() * 6);
      const hba = Number(hbondAcceptors) || Math.floor(Math.random() * 11);
      const rb = Number(rotatableBonds) || Math.floor(Math.random() * 10);

      const descriptors: MolecularDescriptor[] = [
        {
          name: 'Molecular Weight',
          abbrev: 'MW',
          value: mw,
          normalizedValue: Math.min(mw / 500, 1),
          color: 'from-gray-500 to-slate-600',
          unit: 'Da'
        },
        {
          name: 'LogP (Lipophilicity)',
          abbrev: 'LogP',
          value: lp,
          normalizedValue: Math.min(lp / 5, 1),
          color: 'from-purple-500 to-pink-600',
          unit: ''
        },
        {
          name: 'Topological Polar Surface Area',
          abbrev: 'TPSA',
          value: tp,
          normalizedValue: Math.min(tp / 140, 1),
          color: 'from-green-500 to-emerald-600',
          unit: 'Ų'
        },
        {
          name: 'H-Bond Donors',
          abbrev: 'HBD',
          value: hbd,
          normalizedValue: Math.min(hbd / 5, 1),
          color: 'from-orange-500 to-red-600',
          unit: ''
        },
        {
          name: 'H-Bond Acceptors',
          abbrev: 'HBA',
          value: hba,
          normalizedValue: Math.min(hba / 10, 1),
          color: 'from-pink-500 to-rose-600',
          unit: ''
        },
        {
          name: 'Rotatable Bonds',
          abbrev: 'RB',
          value: rb,
          normalizedValue: Math.min(rb / 10, 1),
          color: 'from-blue-500 to-cyan-600',
          unit: ''
        }
      ];

      const activities: BiologicalActivity[] = [
        {
          name: 'Anti-inflammatory',
          confidence: 60 + Math.random() * 35,
          color: 'from-green-500 to-emerald-600'
        },
        {
          name: 'Antioxidant',
          confidence: 30 + Math.random() * 40,
          color: 'from-red-500 to-orange-600'
        },
        {
          name: 'Antimicrobial',
          confidence: 70 + Math.random() * 25,
          color: 'from-blue-500 to-cyan-600'
        },
        {
          name: 'Anticancer',
          confidence: 80 + Math.random() * 18,
          color: 'from-purple-500 to-pink-600'
        }
      ];

      const avgConfidence = activities.reduce((sum, a) => sum + a.confidence, 0) / activities.length;

      const mockResults: MLPredictionResults = {
        descriptors,
        activities,
        overallClassification: avgConfidence >= 80 ? 'Active' : avgConfidence >= 60 ? 'Moderately Active' : 'Weakly Active',
        activityProbability: avgConfidence / 100
      };
      
      setResults(mockResults);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
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
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                  <Eye className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Step 4: Visualization & Machine Learning Drug Prediction Results</h1>
                  <p className="text-sm text-gray-600">Graphical interpretation of ML-based drug prediction outcomes</p>
                </div>
              </div>
            </div>
            
            {results && (
              <Badge className="bg-green-100 text-green-700 border-green-300 px-3 py-1">
                <CheckCircle2 className="h-3 w-3 mr-1 inline" />
                Results Visualized
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
            <h3 className="text-lg font-semibold">ML Visualization & Prediction Analysis</h3>
            <p className="text-sm text-gray-600">Generate comprehensive machine learning-based drug prediction visualizations</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {compoundName && (
              <Alert>
                <AlertDescription>
                  Analyzing: <strong>{compoundName}</strong>
                  {smiles && <span className="text-gray-600 ml-2 text-xs">({smiles})</span>}
                </AlertDescription>
              </Alert>
            )}
            
            <Button 
              onClick={runMLVisualization}
              disabled={isGenerating || !!results}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              {isGenerating ? (
                <>
                  <Brain className="h-4 w-4 mr-2 animate-pulse" />
                  Generating ML Visualizations...
                </>
              ) : results ? (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Visualization Complete
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4 mr-2" />
                  Generate ML Prediction Visualizations
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {results && (
          <>
            {/* Machine Learning Pipeline */}
            <Card className="border-2 border-indigo-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <Workflow className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Machine Learning Drug Prediction Pipeline</h3>
                    <p className="text-sm text-gray-600">ML workflow for drug candidate prediction</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {/* Pipeline Flow */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex-1 min-w-[200px] p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
                        <Zap className="h-4 w-4 text-white" />
                      </div>
                      <h4 className="font-bold text-blue-900 text-sm">Input</h4>
                    </div>
                    <p className="text-xs text-blue-700">SMILES-derived molecular descriptors & fingerprints</p>
                  </div>

                  <ArrowRight className="h-5 w-5 text-gray-400 flex-shrink-0" />

                  <div className="flex-1 min-w-[200px] p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center">
                        <Activity className="h-4 w-4 text-white" />
                      </div>
                      <h4 className="font-bold text-purple-900 text-sm">Feature Processing</h4>
                    </div>
                    <p className="text-xs text-purple-700">Normalization & selection</p>
                  </div>

                  <ArrowRight className="h-5 w-5 text-gray-400 flex-shrink-0" />

                  <div className="flex-1 min-w-[200px] p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center">
                        <Brain className="h-4 w-4 text-white" />
                      </div>
                      <h4 className="font-bold text-green-900 text-sm">ML Models</h4>
                    </div>
                    <p className="text-xs text-green-700">Random Forest, SVM, Gradient Boosting, Neural Networks</p>
                    <div className="mt-2">
                      <Button
                        size="xs"
                        variant="ghost"
                        onClick={() => setExpandedCard(expandedCard === 'models' ? null : 'models')}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        {expandedCard === 'models' ? (
                          <>
                            <ChevronUp className="h-4 w-4 mr-1" />
                            Hide Details
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-4 w-4 mr-1" />
                            Show Details
                          </>
                        )}
                      </Button>
                    </div>
                    {expandedCard === 'models' && (
                      <div className="mt-2">
                        <p className="text-xs text-gray-700">
                          <strong>Random Forest:</strong> Ensemble learning method for classification tasks.
                        </p>
                        <p className="text-xs text-gray-700">
                          <strong>SVM (Support Vector Machine):</strong> Supervised learning model for classification and regression.
                        </p>
                        <p className="text-xs text-gray-700">
                          <strong>Gradient Boosting:</strong> Iterative ensemble method that builds models sequentially.
                        </p>
                        <p className="text-xs text-gray-700">
                          <strong>Neural Networks:</strong> Deep learning models inspired by the human brain.
                        </p>
                      </div>
                    )}
                  </div>

                  <ArrowRight className="h-5 w-5 text-gray-400 flex-shrink-0" />

                  <div className="flex-1 min-w-[200px] p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border-2 border-orange-200">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
                        <Target className="h-4 w-4 text-white" />
                      </div>
                      <h4 className="font-bold text-orange-900 text-sm">Prediction Outputs</h4>
                    </div>
                    <p className="text-xs text-orange-700">Active/Inactive, Activity probability, Therapeutic effectiveness</p>
                    <div className="mt-2">
                      <Button
                        size="xs"
                        variant="ghost"
                        onClick={() => setExpandedCard(expandedCard === 'outputs' ? null : 'outputs')}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        {expandedCard === 'outputs' ? (
                          <>
                            <ChevronUp className="h-4 w-4 mr-1" />
                            Hide Details
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-4 w-4 mr-1" />
                            Show Details
                          </>
                        )}
                      </Button>
                    </div>
                    {expandedCard === 'outputs' && (
                      <div className="mt-2">
                        <p className="text-xs text-gray-700">
                          <strong>Active/Inactive:</strong> Binary classification of drug candidate activity.
                        </p>
                        <p className="text-xs text-gray-700">
                          <strong>Activity Probability:</strong> Confidence score for the predicted activity.
                        </p>
                        <p className="text-xs text-gray-700">
                          <strong>Therapeutic Effectiveness:</strong> Estimated therapeutic potential of the compound.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                  <p className="text-sm text-indigo-900">
                    <strong>Machine learning models analyze molecular features to digitally predict new drug candidates before experimental validation.</strong>
                  </p>
                  <p className="text-xs text-indigo-700 mt-2">
                    Ensemble methods combine Random Forest, SVM, Gradient Boosting, and Neural Networks to improve prediction accuracy and reliability.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Expandable ML & Prediction Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ExpandableMLCard 
                type="models" 
              />
              <ExpandableMLCard 
                type="outputs" 
                activityProbability={results.activityProbability * 100}
                classification={results.overallClassification}
              />
            </div>

            {/* Main Visualization Panels */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Section A: Molecular Descriptor Visualization */}
              <Card className="border-2 border-purple-200 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 border-b">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                      <BarChart3 className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Molecular Descriptor Distribution</h3>
                      <p className="text-sm text-gray-600">Normalized property visualization</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-5">
                    {results.descriptors.map((descriptor, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-gray-900">{descriptor.abbrev}</span>
                            <span className="text-xs text-gray-600">{descriptor.name}</span>
                          </div>
                          <span className="text-sm font-bold text-gray-900">
                            {descriptor.value.toFixed(descriptor.unit === 'Da' ? 0 : 1)}
                            {descriptor.unit && <span className="text-xs text-gray-600 ml-1">{descriptor.unit}</span>}
                          </span>
                        </div>
                        <div className="relative">
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                              className={`bg-gradient-to-r ${descriptor.color} h-3 rounded-full transition-all duration-500`}
                              style={{ width: `${descriptor.normalizedValue * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <p className="text-xs text-purple-700">
                      <strong>Descriptor values are normalized (0-1)</strong> relative to drug-like thresholds for visualization purposes.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Section B: Predicted Biological Activity Results */}
              <Card className="border-2 border-green-200 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                      <Activity className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Predicted Biological Activity Profile</h3>
                      <p className="text-sm text-gray-600">ML-based therapeutic predictions</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-5">
                    {results.activities.map((activity, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-gray-900">{activity.name}</span>
                          <span className="text-lg font-bold text-gray-900">{activity.confidence.toFixed(0)}%</span>
                        </div>
                        <div className="relative">
                          <div className="w-full bg-gray-200 rounded-full h-4">
                            <div 
                              className={`bg-gradient-to-r ${activity.color} h-4 rounded-full transition-all duration-500 flex items-center justify-end pr-2`}
                              style={{ width: `${activity.confidence}%` }}
                            >
                              {activity.confidence >= 50 && (
                                <span className="text-xs font-bold text-white">
                                  {activity.confidence.toFixed(0)}%
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className={activity.confidence >= 80 ? 'text-green-700 font-semibold' : 
                                          activity.confidence >= 60 ? 'text-blue-700 font-semibold' :
                                          activity.confidence >= 40 ? 'text-orange-700' :
                                          'text-red-700'}>
                            {activity.confidence >= 80 ? 'High Confidence' : 
                             activity.confidence >= 60 ? 'Moderate Confidence' :
                             activity.confidence >= 40 ? 'Low Confidence' :
                             'Very Low Confidence'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-3 mb-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      <h4 className="font-bold text-green-900 text-sm">Overall Classification</h4>
                    </div>
                    <p className="text-sm text-green-900 mb-1">
                      <strong>{results.overallClassification}</strong> ({(results.activityProbability * 100).toFixed(1)}% confidence)
                    </p>
                    <p className="text-xs text-green-700">
                      ML ensemble prediction based on Random Forest, SVM, Gradient Boosting, and Neural Network models.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Interpretation Panel */}
            <Card className="border-2 border-blue-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                    <Lightbulb className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Interpretation & Insights</h3>
                    <p className="text-sm text-gray-600">Understanding ML-based drug predictions</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    <strong className="text-blue-700">This visualization integrates molecular property analysis with machine-learning predictions 
                    to support interpretation of drug potential, therapeutic relevance, and compound prioritization.</strong>
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <h4 className="text-sm font-bold text-purple-900 mb-2 flex items-center gap-2">
                        <BarChart3 className="h-4 w-4" />
                        Molecular Descriptors
                      </h4>
                      <p className="text-xs text-gray-700">
                        Normalized visualization of key molecular properties. Values are scaled relative to drug-like reference ranges.
                        These descriptors serve as input features for ML models.
                      </p>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <h4 className="text-sm font-bold text-green-900 mb-2 flex items-center gap-2">
                        <Activity className="h-4 w-4" />
                        Activity Predictions
                      </h4>
                      <p className="text-xs text-gray-700">
                        Machine learning models predict therapeutic activities based on molecular features.
                        Confidence scores indicate prediction reliability.
                      </p>
                    </div>

                    <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                      <h4 className="text-sm font-bold text-indigo-900 mb-2 flex items-center gap-2">
                        <Brain className="h-4 w-4" />
                        ML Ensemble
                      </h4>
                      <p className="text-xs text-gray-700">
                        Combines Random Forest, SVM, Gradient Boosting, and Neural Networks for robust predictions
                        before experimental validation.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                    <h4 className="text-sm font-bold text-gray-900 mb-2">Key Interpretation Points</h4>
                    <ul className="text-xs text-gray-700 space-y-1 list-disc list-inside">
                      <li><strong>High activity confidence (≥80%):</strong> Strong therapeutic potential based on ML predictions</li>
                      <li><strong>Moderate confidence (60-80%):</strong> Promising candidate requiring further validation</li>
                      <li><strong>Low confidence (&lt;60%):</strong> Uncertain activity, may need experimental verification</li>
                      <li><strong>Descriptor normalization:</strong> Enables comparison across different molecular properties</li>
                      <li><strong>Ensemble approach:</strong> Reduces model bias and improves prediction robustness</li>
                    </ul>
                  </div>

                  <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <p className="text-xs text-yellow-800">
                      <strong>⚠️ Important:</strong> ML predictions are computational estimates. Experimental validation is required
                      to confirm biological activity and therapeutic efficacy. Use these results as a prioritization guide for
                      laboratory testing.
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
              <Eye className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No Visualization Yet</h3>
              <p className="text-gray-600">
                Click "Generate ML Prediction Visualizations" to create comprehensive graphical representations of machine learning drug prediction results.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}