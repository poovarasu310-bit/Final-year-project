import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { FileText, Leaf, Activity, Pill, Loader2, Trash2, Eye } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from 'sonner';
import { CodeSnippetsManager } from './CodeSnippetsManager';
import { AnalysisReportDetailView } from './AnalysisReportDetailView';

interface AnalysisReport {
  id: string;
  compound: string;
  cid: number;
  timestamp: string;
  plantSources: number;
  diseaseTargets: number;
  functionalGroups: number;
  analysisData?: any;
}

export function ReportsPage() {
  const [reports, setReports] = useState<AnalysisReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [showDetailView, setShowDetailView] = useState(false);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setIsLoading(true);
      
      // Load reports from localStorage (session-based storage)
      const storedReports = localStorage.getItem('analysis_reports');
      if (storedReports) {
        const parsedReports = JSON.parse(storedReports);
        setReports(parsedReports);
      }

    } catch (err: any) {
      console.error('Error fetching reports:', err);
      toast.error(`Failed to load reports: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteReport = async (reportId: string) => {
    try {
      // Remove from local state and localStorage
      const updatedReports = reports.filter(r => r.id !== reportId);
      setReports(updatedReports);
      localStorage.setItem('analysis_reports', JSON.stringify(updatedReports));
      toast.success('Report deleted successfully');
    } catch (err: any) {
      console.error('Error deleting report:', err);
      toast.error(`Failed to delete report: ${err.message}`);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="flex flex-col items-center justify-center space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
            <p className="text-gray-600">Loading reports...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Show detail view if a report is selected
  if (showDetailView && selectedReport) {
    return (
      <AnalysisReportDetailView 
        report={selectedReport} 
        onBack={() => {
          setShowDetailView(false);
          setSelectedReport(null);
        }} 
      />
    );
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="reports" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Analysis Reports
          </TabsTrigger>
          <TabsTrigger value="snippets" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Code Snippets
          </TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <FileText className="h-6 w-6 text-purple-600" />
                <h2 className="text-2xl font-semibold">Chemoinformatics Analysis Reports</h2>
              </div>
              <p className="text-gray-600">
                View your saved chemoinformatics analysis reports
              </p>
            </CardHeader>
            <CardContent>
              {reports.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">No saved reports yet</p>
                  <p className="text-sm text-gray-500">
                    Perform compound analysis in the Analysis tab to generate reports
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {reports.map((analysis) => (
                    <Card
                      key={analysis.id}
                      className="border-2 hover:shadow-lg hover:border-blue-300 transition-all cursor-pointer"
                      onClick={() => {
                        setSelectedReport(analysis);
                        setShowDetailView(true);
                      }}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                              {analysis.compound}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {new Date(analysis.timestamp).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                          <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                            CID: {analysis.cid}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-blue-50 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Leaf className="h-5 w-5 text-blue-600" />
                              <p className="text-sm font-medium text-blue-900">Plant Sources</p>
                            </div>
                            <p className="text-2xl font-bold text-blue-700">{analysis.plantSources}</p>
                          </div>

                          <div className="bg-purple-50 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Activity className="h-5 w-5 text-purple-600" />
                              <p className="text-sm font-medium text-purple-900">Disease Targets</p>
                            </div>
                            <p className="text-2xl font-bold text-purple-700">{analysis.diseaseTargets}</p>
                          </div>

                          <div className="bg-green-50 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Pill className="h-5 w-5 text-green-600" />
                              <p className="text-sm font-medium text-green-900">Functional Groups</p>
                            </div>
                            <p className="text-2xl font-bold text-green-700">{analysis.functionalGroups}</p>
                          </div>
                        </div>

                        <div className="mt-4 flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteReport(analysis.id);
                            }}
                            className="text-red-600 hover:bg-red-50 hover:border-red-300 flex items-center gap-2"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete Report
                          </Button>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Eye className="h-4 w-4" />
                            Click to view full report
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="snippets" className="mt-6">
          <CodeSnippetsManager />
        </TabsContent>
      </Tabs>
    </div>
  );
}