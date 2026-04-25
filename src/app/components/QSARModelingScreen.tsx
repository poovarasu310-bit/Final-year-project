import { ArrowLeft, Brain, CheckCircle2, TrendingUp, Target, Activity, Loader2, AlertCircle, Sparkles, FlaskConical, GitBranch, Database, Lightbulb } from 'lucide-react';
import { ExportShareButtons } from './ExportShareButtons';
import { useState } from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import exampleImage from 'figma:asset/e234cc20b62a7da11034e226125e2150c83ce2a5.png';

interface QSARModelingScreenProps {
  onBack: () => void;
  compoundName?: string;
  smiles?: string;
  storedResults?: {
    qsarActivity: string;
    qsarConfidence: number;
    predictedIC50: number;
    modelAccuracy: number;
    mlModels?: any[];
    ensemblePrediction?: any;
    bindingScore?: number;
  } | null;
}

interface QSARResults {
  predictedActivity: 'Active' | 'Inactive';
  confidenceScore: number;
  modelAccuracy: number;
  algorithm: string;
  predictedIC50: number;
  trainingSetSize: number;
  featureCount: number;
}

export function QSARModelingScreen({ 
  onBack, 
  compoundName = 'Compound',
  smiles = '',
  storedResults = null
}: QSARModelingScreenProps) {
  const [isCalculating, setIsCalculating] = useState(false);
  const [results, setResults] = useState<QSARResults | null>(null);

  // If storedResults are provided, use them instead of generating new ones
  const displayResults = storedResults ? {
    predictedActivity: storedResults.qsarActivity === 'Active' ? 'Active' as const : 'Inactive' as const,
    confidenceScore: (storedResults.qsarConfidence || 0) * 100,
    modelAccuracy: (storedResults.modelAccuracy || 0) * 100,
    algorithm: 'Ensemble Classifier',
    predictedIC50: storedResults.predictedIC50 || 0,
    trainingSetSize: 1200,
    featureCount: 150
  } : results;

  const runQSARPrediction = () => {
    setIsCalculating(true);
    
    // Simulate QSAR model calculation
    setTimeout(() => {
      const mockResults: QSARResults = {
        predictedActivity: Math.random() > 0.35 ? 'Active' : 'Inactive',
        confidenceScore: 65 + Math.random() * 30, // 65-95%
        modelAccuracy: 80 + Math.random() * 15, // 80-95%
        algorithm: 'Random Forest Classifier',
        predictedIC50: 5 + Math.random() * 40, // 5-45 μM
        trainingSetSize: 1000 + Math.floor(Math.random() * 500), // 1000-1500
        featureCount: 120 + Math.floor(Math.random() * 80) // 120-200
      };
      
      setResults(mockResults);
      setIsCalculating(false);
    }, 2000);
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
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Step 2: QSAR Modeling & Activity Prediction</h1>
                  <p className="text-sm text-gray-600">Machine learning-based biological activity prediction</p>
                </div>
              </div>
            </div>
            
            {displayResults && (
              <Badge className="bg-green-100 text-green-700 border-green-300 px-3 py-1">
                <CheckCircle2 className="h-3 w-3 mr-1 inline" />
                QSAR Predicted
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Show alert if using stored results */}
        {storedResults && (
          <Alert className="bg-blue-50 border-blue-200">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <strong>Displaying stored analysis results.</strong> These values were calculated when you clicked "Analyze Compound" and match the summary card data.
            </AlertDescription>
          </Alert>
        )}

        {/* Compound Info & Action */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">QSAR Prediction Input</h3>
            <p className="text-sm text-gray-600">Run machine learning model to predict biological activity</p>
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
              onClick={runQSARPrediction}
              disabled={isCalculating || !!displayResults}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              {isCalculating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Running QSAR Model...
                </>
              ) : displayResults ? (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Prediction Complete
                </>
              ) : (
                <>
                  <Brain className="h-4 w-4 mr-2" />
                  Run QSAR Prediction
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {displayResults && (
          <>
            {/* Prediction Result Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Predicted Activity */}
              <Card className="border-2 border-purple-200 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-purple-600 mb-1">Predicted Activity</p>
                      <h2 className={`text-4xl font-bold ${
                        displayResults.predictedActivity === 'Active' 
                          ? 'text-purple-900' 
                          : 'text-gray-600'
                      }`}>
                        {displayResults.predictedActivity}
                      </h2>
                      <p className="text-xs text-purple-600 mt-2">Biological Activity Classification</p>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                      <FlaskConical className={`h-6 w-6 ${
                        displayResults.predictedActivity === 'Active' 
                          ? 'text-purple-600' 
                          : 'text-gray-500'
                      }`} />
                    </div>
                  </div>
                  {displayResults.predictedActivity === 'Active' && (
                    <div className="mt-3 p-2 bg-purple-50 rounded-lg border border-purple-200">
                      <p className="text-xs text-purple-700">
                        ✓ Compound shows predicted biological activity
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Confidence Score */}
              <Card className="border-2 border-blue-200 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-blue-600 mb-1">Confidence Score</p>
                      <h2 className="text-4xl font-bold text-blue-900">
                        {displayResults.confidenceScore.toFixed(1)}%
                      </h2>
                      <p className="text-xs text-blue-600 mt-2">Prediction Reliability</p>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${displayResults.confidenceScore}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      {displayResults.confidenceScore >= 80 ? 'High confidence' : 
                       displayResults.confidenceScore >= 70 ? 'Moderate confidence' : 
                       'Low confidence'}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Model Accuracy */}
              <Card className="border-2 border-green-200 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-green-600 mb-1">Model Accuracy</p>
                      <h2 className="text-4xl font-bold text-green-900">
                        {displayResults.modelAccuracy.toFixed(1)}%
                      </h2>
                      <p className="text-xs text-green-600 mt-2">Cross-Validation Score</p>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <div className="mt-3 p-2 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-xs text-green-700">
                      ✓ Validated model with high accuracy
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* QSAR Model Details */}
            <Card className="border-2 border-purple-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">QSAR Model Details</h3>
                    <p className="text-sm text-gray-600">Machine learning model specifications and parameters</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                      <div className="flex items-center gap-3 mb-2">
                        <GitBranch className="h-5 w-5 text-purple-600" />
                        <p className="text-sm font-semibold text-purple-900">Algorithm</p>
                      </div>
                      <p className="text-lg font-bold text-purple-900">{displayResults.algorithm}</p>
                      <p className="text-xs text-purple-700 mt-1">Ensemble learning method</p>
                    </div>

                    <div className="p-4 bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl border border-pink-200">
                      <div className="flex items-center gap-3 mb-2">
                        <Target className="h-5 w-5 text-pink-600" />
                        <p className="text-sm font-semibold text-pink-900">Predicted IC₅₀</p>
                      </div>
                      <p className="text-lg font-bold text-pink-900">{displayResults.predictedIC50.toFixed(2)} μM</p>
                      <p className="text-xs text-pink-700 mt-1">Half-maximal inhibitory concentration</p>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                      <div className="flex items-center gap-3 mb-2">
                        <Database className="h-5 w-5 text-blue-600" />
                        <p className="text-sm font-semibold text-blue-900">Training Set Size</p>
                      </div>
                      <p className="text-lg font-bold text-blue-900">{displayResults.trainingSetSize.toLocaleString()} compounds</p>
                      <p className="text-xs text-blue-700 mt-1">Curated dataset for training</p>
                    </div>

                    <div className="p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl border border-indigo-200">
                      <div className="flex items-center gap-3 mb-2">
                        <Activity className="h-5 w-5 text-indigo-600" />
                        <p className="text-sm font-semibold text-indigo-900">Feature Count</p>
                      </div>
                      <p className="text-lg font-bold text-indigo-900">{displayResults.featureCount} descriptors</p>
                      <p className="text-xs text-indigo-700 mt-1">Molecular descriptors + fingerprints</p>
                    </div>
                  </div>
                </div>

                {/* Model Pipeline Explanation */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    Model Pipeline
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-600 flex-wrap">
                    <Badge variant="outline" className="bg-white">SMILES Input</Badge>
                    <span>→</span>
                    <Badge variant="outline" className="bg-white">Descriptor Calculation</Badge>
                    <span>→</span>
                    <Badge variant="outline" className="bg-white">Fingerprint Generation</Badge>
                    <span>→</span>
                    <Badge variant="outline" className="bg-white">Feature Vector</Badge>
                    <span>→</span>
                    <Badge variant="outline" className="bg-white">Random Forest Model</Badge>
                    <span>→</span>
                    <Badge variant="outline" className="bg-purple-100 text-purple-700">Activity Prediction</Badge>
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
                    <h3 className="text-lg font-bold text-gray-900">QSAR Modeling Insights</h3>
                    <p className="text-sm text-gray-600">Understanding quantitative structure-activity relationships</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    <strong className="text-purple-700">QSAR (Quantitative Structure-Activity Relationship) models</strong> use molecular descriptors and fingerprints 
                    derived from SMILES to predict biological activity. Machine learning algorithms identify complex patterns between chemical structure and 
                    biological response, enabling activity prediction before experimental validation.
                  </p>
                  
                  <div className="mt-4 grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <h4 className="text-sm font-bold text-purple-900 mb-2">Model Training Process</h4>
                      <ul className="text-xs text-gray-700 space-y-1 list-disc list-inside">
                        <li>Curated dataset of compounds with known activity</li>
                        <li>Feature extraction (descriptors + fingerprints)</li>
                        <li>Random Forest ensemble learning</li>
                        <li>Cross-validation for accuracy assessment</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="text-sm font-bold text-blue-900 mb-2">Prediction Applications</h4>
                      <ul className="text-xs text-gray-700 space-y-1 list-disc list-inside">
                        <li>Virtual screening of compound libraries</li>
                        <li>Lead compound optimization</li>
                        <li>IC₅₀ value estimation</li>
                        <li>Prioritization for experimental testing</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                    <p className="text-sm text-gray-700">
                      <strong>💡 Interpretation:</strong> The <strong>Random Forest Classifier</strong> evaluates {displayResults.featureCount} molecular features 
                      to predict activity. A confidence score of <strong>{displayResults.confidenceScore.toFixed(1)}%</strong> indicates {
                        displayResults.confidenceScore >= 80 ? 'high reliability' :
                        displayResults.confidenceScore >= 70 ? 'moderate reliability' :
                        'lower reliability'
                      } in this prediction. The predicted IC₅₀ of <strong>{displayResults.predictedIC50.toFixed(2)} μM</strong> suggests {
                        displayResults.predictedIC50 < 10 ? 'high potency' :
                        displayResults.predictedIC50 < 30 ? 'moderate potency' :
                        'lower potency'
                      } against the biological target.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Export Share Buttons */}
            <Card className="border-2 border-gray-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gray-500 to-gray-600 flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Export & Share Results</h3>
                    <p className="text-sm text-gray-600">Share your QSAR modeling results with others</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <ExportShareButtons
                  data={displayResults}
                  stepName="Step 2"
                  stepTitle="Step 2: QSAR Modeling & Activity Prediction"
                  contentId="step2-content"
                  showFormatSelector={true}
                />
              </CardContent>
            </Card>
          </>
        )}

        {!results && !isCalculating && (
          <Card className="border-2 border-dashed border-gray-300">
            <CardContent className="p-12 text-center">
              <Brain className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No Predictions Yet</h3>
              <p className="text-gray-600">
                Click "Run QSAR Prediction" to generate machine learning-based activity predictions using molecular descriptors and fingerprints from Step 1.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}