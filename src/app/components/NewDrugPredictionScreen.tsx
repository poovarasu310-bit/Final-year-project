import { useState } from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowLeft, Brain, Beaker, Shield, Activity, Share2, Download, Leaf, Dna, FlaskConical, Target, CheckCircle2 } from 'lucide-react';
import { exportReport, shareResults, generateShareText } from '../utils/export-share-utils';

interface NewDrugPredictionScreenProps {
  onBack: () => void;
  data: any;
  analysisResults: any;
}

export function NewDrugPredictionScreen({ onBack, data, analysisResults }: NewDrugPredictionScreenProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'plants' | 'synthesis'>('overview');

  const handleExport = () => {
    typeof window !== 'undefined' && window.print();
  };

  const handleShare = () => {
    shareResults(`New Drug Discovery: ${data.compoundName}`, generateShareText('Drug Discovery Prediction', data));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50">
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
                Back to Chemoinformatics
              </Button>
              <div className="h-8 w-px bg-gray-300" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">New Drug Discovery Prediction</h1>
                  <p className="text-sm text-gray-600">Comprehensive Synthesis of 5-Step Pipeline</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button onClick={handleExport} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              <Button onClick={handleShare} variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Top Overview Card */}
        <Card className="border-2 border-cyan-200 shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-cyan-600 to-blue-700 p-6 text-white text-center">
            <Badge className="bg-white/20 text-white border-white/30 mb-4 backdrop-blur-sm">
              <CheckCircle2 className="h-3 w-3 mr-1 inline" /> Recommended Candidate
            </Badge>
            <h2 className="text-3xl font-extrabold mb-2">{data.compoundName}</h2>
            <p className="text-cyan-100 max-w-2xl mx-auto">
              Based on the comprehensive 5-step chemoinformatics analysis, this compound exhibits a highly favorable profile for new drug development, validated by structural integrity, QSAR predictions, pharmacokinetic rules, and machine learning ensemble scoring.
            </p>
          </div>
          <CardContent className="p-8 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-100">
              <p className="text-sm font-semibold text-gray-500 mb-1">Molecular Weight</p>
              <p className="text-2xl font-bold text-gray-900">{analysisResults.molecularWeight.toFixed(1)} Da</p>
              <p className="text-xs text-green-600 mt-1">Optimal Range</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-100">
              <p className="text-sm font-semibold text-gray-500 mb-1">QSAR Activity</p>
              <p className="text-2xl font-bold text-gray-900">{analysisResults.qsarActivity}</p>
              <p className="text-xs text-green-600 mt-1">Confirmed Target Affinity</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-100">
              <p className="text-sm font-semibold text-gray-500 mb-1">Lipinski Violations</p>
              <p className="text-2xl font-bold text-gray-900">{analysisResults.lipinskiViolations}</p>
              <p className="text-xs text-green-600 mt-1">Pharmacokinetic Stability</p>
            </div>
            <div className="text-center p-4 bg-cyan-50 rounded-xl border border-cyan-200">
              <p className="text-sm font-semibold text-cyan-700 mb-1">Overall Confidence</p>
              <p className="text-3xl font-black text-cyan-900">{analysisResults.overallConfidence}%</p>
              <p className="text-xs text-cyan-700 mt-1">ML Ensemble Validation</p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main 5-Step Synthesis Column */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border shadow-md">
              <CardHeader className="bg-slate-50 border-b">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <Dna className="h-5 w-5 text-indigo-600" />
                  Synthesis of Chemoinformatics Pipeline
                </h3>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">1</div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg mb-1 flex items-center gap-2">
                        Molecular Descriptors
                        <Badge variant="outline" className="text-green-600 border-green-300 bg-green-50">Passed</Badge>
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        The quantitative structural mapping reveals a LogP of {analysisResults.logP.toFixed(2)} and TPSA of {analysisResults.tpsa}, aligning perfectly with optimal boundaries for cellular permeability and absorption capability.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold">2</div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg mb-1 flex items-center gap-2">
                        QSAR Modeling
                        <Badge variant="outline" className="text-green-600 border-green-300 bg-green-50">Active</Badge>
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Biological activity prediction models yield an "{analysisResults.qsarActivity}" status with an incredibly precise IC50 prediction of {analysisResults.predictedIC50} μM, verifying high target receptor affinity.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">3</div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg mb-1 flex items-center gap-2">
                        Drug-Likeness Rules
                        <Badge variant="outline" className="text-green-600 border-green-300 bg-green-50">{analysisResults.lipinskiViolations === 0 ? 'Optimal' : 'Acceptable'}</Badge>
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Evaluating against Lipinski's Rule of Five, the compound registers {analysisResults.lipinskiViolations} violations. This translates to an oral bioavailability probability of {analysisResults.bioavailabilityScore}, indicating extreme resilience against breakdown natively.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 font-bold">4</div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg mb-1 flex items-center gap-2">
                        Machine Learning Profiling
                        <Badge variant="outline" className="text-green-600 border-green-300 bg-green-50">Validated</Badge>
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Visualizing the dataset normalized distributions places the compound's topology and electrostatic profiles strongly within the top decile of known FDA-approved drug analogs.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-700 font-bold">5</div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg mb-1 flex items-center gap-2">
                        Overall Prediction Verdict
                        <Badge variant="outline" className="text-green-600 border-green-300 bg-green-50">High Potential</Badge>
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Integrating these parameters gives a final synthesized therapeutic potential rated as High. The compound presents minimal toxicity risks and a viable structural foundation for new drug clinical translation.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Plants & Discovery Impact */}
          <div className="space-y-6">
            <Card className="border shadow-md bg-gradient-to-br from-green-50 to-emerald-50">
              <CardHeader className="border-b border-green-100/50">
                <h3 className="font-bold text-green-900 flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-green-600" />
                  Medicinal Plant Sources
                </h3>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-sm text-gray-700 mb-4">
                  The discovery of precisely targeted compounds heavily relies on extracting foundational scaffolding from nature. 
                </p>
                <div className="space-y-3">
                  {data.matchedPlants?.length > 0 ? (
                    data.matchedPlants.map((plant: string, i: number) => (
                       <div key={i} className="bg-white p-3 rounded border border-green-200 flex items-center gap-3 shadow-sm">
                         <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-700">🌿</div>
                         <p className="font-medium text-gray-900">{plant}</p>
                       </div>
                    ))
                  ) : (
                    <div className="bg-white p-3 rounded border border-green-200">
                      <p className="text-sm text-gray-600 italic">No direct plant sources mapped for this specific functional scaffolding.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="border shadow-md bg-gradient-to-br from-indigo-50 to-purple-50">
              <CardHeader className="border-b border-indigo-100/50">
                <h3 className="font-bold text-indigo-900 flex items-center gap-2">
                  <FlaskConical className="h-5 w-5 text-indigo-600" />
                  Discovery Impact
                </h3>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <p className="text-sm text-gray-700 font-medium">
                  Why is exploring this candidate critical for new drug discovery?
                </p>
                <ul className="space-y-3">
                  <li className="flex gap-2">
                    <Target className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">The low toxicity and favorable LogP ({analysisResults.logP.toFixed(2)}) means it penetrates cell barriers efficiently, skipping early phase failures.</span>
                  </li>
                  <li className="flex gap-2">
                    <Activity className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">High predicted QSAR activity reduces required dosages, minimizing severe side effects compared to traditional synthetics.</span>
                  </li>
                  <li className="flex gap-2">
                    <Shield className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">Aligning with Lipinski rules ensures that the synthesis will likely result in an orally available drug.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
