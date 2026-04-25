import { useState } from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowLeft, Download, Share2, Calendar, User, Beaker, Award, ChevronDown, ChevronUp, Activity, Pill } from 'lucide-react';
import { MolecularDescriptorsScreen } from './MolecularDescriptorsScreen';
import { QSARModelingScreen } from './QSARModelingScreen';
import { DrugLikenessScreen } from './DrugLikenessScreen';
import { MLVisualizationScreen } from './MLVisualizationScreen';
import { FinalInterpretationScreen } from './FinalInterpretationScreen';
import { ExportShareButtons } from './ExportShareButtons';

interface AnalysisReportDetailViewProps {
  report: any;
  onBack: () => void;
}

export function AnalysisReportDetailView({ report, onBack }: AnalysisReportDetailViewProps) {
  const {
    compoundName,
    smiles,
    sourcePlant,
    analysisResults,
    timestamp,
    userId,
    id: reportId,
    molecularFormula,
    cid,
    plantSources,
    diseaseTargets,
    functionalGroups
  } = report;

  const [isMetadataExpanded, setIsMetadataExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Reports
              </Button>
              <div className="h-6 w-px bg-gray-300"></div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{compoundName}</h1>
                <p className="text-sm text-gray-600">{sourcePlant || 'Analysis Report'}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge className="bg-green-100 text-green-700 border-green-200">
                <Award className="w-3 h-3 mr-1" />
                Completed
              </Badge>
              <ExportShareButtons
                data={{
                  compoundName,
                  smiles,
                  sourcePlant,
                  ...analysisResults,
                  reportId,
                  timestamp
                }}
                stepName="Complete Analysis Report"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Report Metadata */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Card
          className="mb-6 cursor-pointer hover:shadow-lg hover:border-blue-300 transition-all"
          onClick={() => setIsMetadataExpanded(!isMetadataExpanded)}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-700">Analysis Information</h3>
              <Button variant="ghost" size="sm" className="p-1">
                {isMetadataExpanded ? (
                  <ChevronUp className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                )}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-xs text-gray-500">Analysis Date</p>
                  <p className="text-sm font-medium">
                    {new Date(timestamp).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Beaker className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-xs text-gray-500">SMILES</p>
                  <p className="text-sm font-medium font-mono truncate max-w-[200px]" title={smiles}>
                    {smiles}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-xs text-gray-500">Report ID</p>
                  <p className="text-sm font-medium font-mono">{reportId?.slice(0, 8) || 'N/A'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-xs text-gray-500">Status</p>
                  <p className="text-sm font-medium text-green-600">Analysis Complete</p>
                </div>
              </div>
            </div>

            {isMetadataExpanded && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-700 mb-4">Detailed Analysis Summary</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="h-5 w-5 text-blue-600" />
                      <p className="text-sm font-medium text-blue-900">Plant Sources</p>
                    </div>
                    <p className="text-2xl font-bold text-blue-700">{plantSources || 0}</p>
                    <p className="text-xs text-gray-600 mt-1">Medicinal plants identified</p>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="h-5 w-5 text-purple-600" />
                      <p className="text-sm font-medium text-purple-900">Disease Targets</p>
                    </div>
                    <p className="text-2xl font-bold text-purple-700">{diseaseTargets || 0}</p>
                    <p className="text-xs text-gray-600 mt-1">Potential therapeutic targets</p>
                  </div>

                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Pill className="h-5 w-5 text-green-600" />
                      <p className="text-sm font-medium text-green-900">Functional Groups</p>
                    </div>
                    <p className="text-2xl font-bold text-green-700">{functionalGroups || 0}</p>
                    <p className="text-xs text-gray-600 mt-1">Chemical functional groups detected</p>
                  </div>
                </div>

                {molecularFormula && (
                  <div className="mt-4 bg-gray-50 rounded-lg p-4">
                    <p className="text-xs text-gray-500 mb-1">Molecular Formula</p>
                    <p className="text-lg font-mono font-semibold text-gray-800">{molecularFormula}</p>
                  </div>
                )}

                {cid && (
                  <div className="mt-4 bg-gray-50 rounded-lg p-4">
                    <p className="text-xs text-gray-500 mb-1">PubChem CID</p>
                    <p className="text-lg font-mono font-semibold text-gray-800">{cid}</p>
                  </div>
                )}

                <p className="text-xs text-gray-500 mt-4 text-center">
                  Click anywhere on this card to collapse details
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Analysis Results Sections */}
        <div className="space-y-6">
          {/* Step 1: Molecular Descriptors */}
          {analysisResults && (
            <>
              <div>
                <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 text-sm font-bold">
                    1
                  </span>
                  Molecular Descriptors
                </h2>
                <MolecularDescriptorsScreen results={analysisResults} smiles={smiles} />
              </div>

              {/* Step 2: QSAR Modeling */}
              <div>
                <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-700 text-sm font-bold">
                    2
                  </span>
                  QSAR Modeling & Predictions
                </h2>
                <QSARModelingScreen results={analysisResults} smiles={smiles} />
              </div>

              {/* Step 3: Drug-Likeness */}
              <div>
                <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-700 text-sm font-bold">
                    3
                  </span>
                  Drug-Likeness Evaluation
                </h2>
                <DrugLikenessScreen results={analysisResults} smiles={smiles} />
              </div>

              {/* Step 4: ML Visualization */}
              <div>
                <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-700 text-sm font-bold">
                    4
                  </span>
                  Machine Learning Visualization
                </h2>
                <MLVisualizationScreen results={analysisResults} smiles={smiles} />
              </div>

              {/* Step 5: Final Interpretation */}
              <div>
                <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-700 text-sm font-bold">
                    5
                  </span>
                  Final Interpretation & Drug Prediction
                </h2>
                <FinalInterpretationScreen 
                  results={analysisResults} 
                  compoundName={compoundName}
                  smiles={smiles}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}