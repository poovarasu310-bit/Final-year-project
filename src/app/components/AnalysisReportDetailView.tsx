import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowLeft, Calendar, User, Beaker, Award, Activity, Pill, ExternalLink, FlaskConical } from 'lucide-react';
import { MolecularDescriptorsScreen } from './MolecularDescriptorsScreen';
import { QSARModelingScreen } from './QSARModelingScreen';
import { DrugLikenessScreen } from './DrugLikenessScreen';
import { MLVisualizationScreen } from './MLVisualizationScreen';
import { FinalInterpretationScreen } from './FinalInterpretationScreen';
import { ExportShareButtons } from './ExportShareButtons';
import { NewDrugPredictionScreen } from './NewDrugPredictionScreen';

interface AnalysisReportDetailViewProps {
  report: any;
  onBack: () => void;
}

export function AnalysisReportDetailView({ report, onBack }: AnalysisReportDetailViewProps) {
  const {
    compoundName,
    smiles,
    sourcePlant,
    timestamp,
    id: reportId,
    molecularFormula,
    cid,
    plantSources,
    diseaseTargets,
    functionalGroups
  } = report;

  const analysisResults = report.analysisData || report.analysisResults;

  const [showAdvancedDiscovery, setShowAdvancedDiscovery] = useState(false);

  // If showing new drug prediction detailed screen
  if (showAdvancedDiscovery) {
    return (
      <NewDrugPredictionScreen
        onBack={() => setShowAdvancedDiscovery(false)}
        data={report}
        analysisResults={analysisResults}
      />
    );
  }



  // Default Overview Dashboard view
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Reports
              </Button>
              <div className="h-6 w-px bg-gray-300"></div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{compoundName}</h1>
                <p className="text-sm text-gray-600">{sourcePlant || 'Analysis Report Overview'}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
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
                stepName="Overview Summary"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Analysis Information Card that triggers the New Page */}
        <Card
          className="cursor-pointer hover:shadow-lg hover:border-blue-400 transition-all border-2 group"
          onClick={() => setShowAdvancedDiscovery(true)}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4 border-b pb-4">
              <h3 className="text-lg font-bold text-gray-800 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-blue-600" />
                Analysis Information
              </h3>
              <Button size="sm" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                Open Full Report
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-xs text-gray-500 font-medium">Analysis Date</p>
                  <p className="text-sm font-bold text-gray-900">
                    {new Date(timestamp).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'short', day: 'numeric',
                      hour: '2-digit', minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Beaker className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-xs text-gray-500 font-medium">SMILES string</p>
                  <p className="text-sm font-mono font-bold text-gray-900 truncate max-w-[200px]" title={smiles}>
                    {smiles}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-xs text-gray-500 font-medium">Report ID</p>
                  <p className="text-sm font-mono font-bold text-gray-900">{reportId?.slice(0, 8) || 'N/A'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-xs text-gray-500 font-medium">Status</p>
                  <p className="text-sm font-bold text-green-600">Analysis Complete</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Summary mapped directly below */}
        <div className="bg-white border rounded-xl p-6 shadow-sm">
           <h4 className="text-base font-bold text-gray-900 mb-4">Metadata Summary</h4>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <div className="bg-blue-50/50 rounded-lg p-4 border border-blue-100">
               <div className="flex items-center gap-2 mb-2">
                 <Activity className="h-5 w-5 text-blue-600" />
                 <p className="text-sm font-bold text-blue-900">Plant Sources</p>
               </div>
               <p className="text-3xl font-black text-blue-700">{plantSources || 0}</p>
             </div>
             <div className="bg-purple-50/50 rounded-lg p-4 border border-purple-100">
               <div className="flex items-center gap-2 mb-2">
                 <Activity className="h-5 w-5 text-purple-600" />
                 <p className="text-sm font-bold text-purple-900">Disease Targets</p>
               </div>
               <p className="text-3xl font-black text-purple-700">{diseaseTargets || 0}</p>
             </div>
             <div className="bg-green-50/50 rounded-lg p-4 border border-green-100">
               <div className="flex items-center gap-2 mb-2">
                 <Pill className="h-5 w-5 text-green-600" />
                 <p className="text-sm font-bold text-green-900">Functional Groups</p>
               </div>
               <p className="text-3xl font-black text-green-700">{functionalGroups || 0}</p>
             </div>
           </div>

           {(molecularFormula || cid) && (
             <div className="mt-6 flex flex-wrap gap-4">
               {molecularFormula && (
                 <Badge variant="outline" className="bg-gray-50 text-gray-700 font-mono py-1.5 px-3">
                   Formula: {molecularFormula}
                 </Badge>
               )}
               {cid && (
                 <Badge variant="outline" className="bg-gray-50 text-gray-700 font-mono py-1.5 px-3">
                   PubChem CID: {cid}
                 </Badge>
               )}
             </div>
           )}
        </div>
      </div>
    </div>
  );
}