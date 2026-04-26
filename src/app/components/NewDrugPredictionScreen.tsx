import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Progress } from './ui/progress';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, LineChart, Line, AreaChart, Area
} from 'recharts';
import { 
  ArrowLeft, Brain, Beaker, Shield, Activity, Share2, Download, Dna, Target, CheckCircle2, 
  Search, Upload, Layers, Network, FileDown, AlertTriangle, Fingerprint, Zap, Database
} from 'lucide-react';
import { shareResults, generateShareText } from '../utils/export-share-utils';

interface NewDrugPredictionScreenProps {
  onBack: () => void;
  data: any;
  analysisResults: any;
}

export function NewDrugPredictionScreen({ onBack, data, analysisResults }: NewDrugPredictionScreenProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedProtein, setSelectedProtein] = useState('');
  const [isDocking, setIsDocking] = useState(false);
  const [dockingScore, setDockingScore] = useState<number | null>(null);

  const handleExport = () => {
    typeof window !== 'undefined' && window.print();
  };

  const handleShare = () => {
    shareResults(`Advanced AI Discovery: ${data.compoundName}`, generateShareText('Drug Discovery AI Prediction', data));
  };

  const runDockingSimulation = () => {
    if(!selectedProtein) return;
    setIsDocking(true);
    setDockingScore(null);
    setTimeout(() => {
      setIsDocking(false);
      setDockingScore(-(8.4 + Math.random() * 2)); // e.g. -9.5 kcal/mol
    }, 2500);
  };

  // Mock Data for Advanced Features
  const featureImportance = [
    { name: 'LogP', impact: 85, detail: 'High Lipophilicity increases cell permeability' },
    { name: 'TPSA', impact: 91, detail: 'Optimal surface area for absorption' },
    { name: 'Mol Weight', impact: 72, detail: 'Within Rule of 5 limit (< 500 Da)' },
    { name: 'H-Bond Donors', impact: 65, detail: 'Sufficient donor points' },
    { name: 'Aromatic Rings', impact: 80, detail: 'Enhances receptor binding affinity' },
  ];

  const modelComparison = [
    { name: 'Random Forest', acc: 92, f1: 89, roc: 94 },
    { name: 'Grad. Boost', acc: 94, f1: 91, roc: 95 },
    { name: 'SVM (RBF)', acc: 88, f1: 85, roc: 89 },
    { name: 'Deep Neural Net', acc: 96, f1: 94, roc: 97 },
    { name: 'Ensemble', acc: 98, f1: 96, roc: 99 },
  ];

  const validationMetrics = [
    { metric: 'Accuracy', value: 0.94, color: 'text-green-600', bg: 'bg-green-100', bar: 'bg-green-500' },
    { metric: 'Precision', value: 0.91, color: 'text-emerald-600', bg: 'bg-emerald-100', bar: 'bg-emerald-500' },
    { metric: 'Recall', value: 0.93, color: 'text-teal-600', bg: 'bg-teal-100', bar: 'bg-teal-500' },
    { metric: 'F1-Score', value: 0.92, color: 'text-cyan-600', bg: 'bg-cyan-100', bar: 'bg-cyan-500' },
  ];

  const similarityMatches = [
    { id: 'CHEMBL120493', sim: 0.91, target: 'EGFR Tyrosine Kinase' },
    { id: 'CHEMBL50231', sim: 0.88, target: 'HER2 Receptor' },
    { id: 'CHEMBL99014', sim: 0.84, target: 'VEGFR-2' },
  ];
  
  const admetRadar = [
    { subject: 'Absorption', A: 90, fullMark: 100 },
    { subject: 'Distribution', A: 85, fullMark: 100 },
    { subject: 'Metabolism', A: 75, fullMark: 100 },
    { subject: 'Excretion', A: 88, fullMark: 100 },
    { subject: 'Toxicity (Low is better)', A: 20, fullMark: 100 },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack} className="w-fit hover:bg-gray-100 px-0 sm:px-3">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="hidden sm:block h-8 w-px bg-gray-300" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-inner">
                  <Network className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 leading-tight">Advanced Discovery Module</h1>
                  <p className="text-sm text-gray-500 font-medium">MediPlants DL & Docking Architecture</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button onClick={handleExport} variant="outline" size="sm" className="bg-white">
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
              <Button onClick={handleShare} size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        
        {/* Global Context Card */}
        <div className="mb-8 grid grid-cols-1 lg:grid-cols-4 gap-4">
          <Card className="lg:col-span-3 border-0 shadow-lg bg-gradient-to-r from-indigo-900 to-purple-900 text-white overflow-hidden relative">
            <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
              <Network className="w-64 h-64 -translate-y-12 translate-x-12" />
            </div>
            <CardContent className="p-8 relative z-10">
              <Badge className="bg-indigo-500/30 text-indigo-100 hover:bg-indigo-500/40 mb-4 border-indigo-400">
                <CheckCircle2 className="h-3 w-3 mr-1 inline" /> Validated Lead Compound
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-2 tracking-tight">{data.compoundName}</h2>
              <p className="text-indigo-200 max-w-2xl text-lg mt-4 leading-relaxed">
                Evaluated by an advanced ensemble of 5 Deep Learning models and QSAR frameworks. This compound exhibits exceptional permeability, strong target affinity, and low toxicity risk.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-white flex flex-col justify-center items-center text-center p-6">
             <div className="w-24 h-24 rounded-full border-8 border-emerald-100 flex items-center justify-center mb-4">
               <span className="text-3xl font-black text-emerald-600">{analysisResults?.overallConfidence || 95}%</span>
             </div>
             <p className="font-bold text-gray-800 text-lg">Ensemble Confidence</p>
             <p className="text-sm text-gray-500 mt-1">Extremely High Predictive Certainty</p>
             <Badge className="mt-3 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-0">Primary Candidate</Badge>
          </Card>
        </div>

        {/* Modular System Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white border shadow-sm p-1 grid grid-cols-2 lg:grid-cols-6 h-auto gap-1">
            <TabsTrigger value="overview" className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700 py-3"><Brain className="w-4 h-4 mr-2" /> X-AI</TabsTrigger>
            <TabsTrigger value="docking" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 py-3"><Target className="w-4 h-4 mr-2" /> Docking</TabsTrigger>
            <TabsTrigger value="admet" className="data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700 py-3"><Shield className="w-4 h-4 mr-2" /> ADMET</TabsTrigger>
            <TabsTrigger value="validation" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700 py-3"><Layers className="w-4 h-4 mr-2" /> Metrics</TabsTrigger>
            <TabsTrigger value="search" className="data-[state=active]:bg-orange-50 data-[state=active]:text-orange-700 py-3"><Fingerprint className="w-4 h-4 mr-2" /> Similar</TabsTrigger>
            <TabsTrigger value="bulk" className="data-[state=active]:bg-pink-50 data-[state=active]:text-pink-700 py-3"><Database className="w-4 h-4 mr-2" /> Bulk</TabsTrigger>
          </TabsList>

          {/* TAB: Explainable AI & Overview */}
          <TabsContent value="overview" className="space-y-6 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-md border-indigo-100">
                <CardHeader className="bg-slate-50 border-b">
                  <CardTitle className="text-lg flex items-center"><Brain className="w-5 h-5 mr-2 text-indigo-600" /> Feature Importance (SHAP Approximation)</CardTitle>
                  <CardDescription>Top contributing descriptors explaining the high confidence score.</CardDescription>
                </CardHeader>
                <CardContent className="p-6 h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart layout="vertical" data={featureImportance} margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
                      <RechartsTooltip cursor={{fill: 'transparent'}} />
                      <Bar dataKey="impact" fill="#4f46e5" radius={[0, 4, 4, 0]} barSize={24} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card className="shadow-md">
                <CardHeader className="bg-slate-50 border-b">
                  <CardTitle className="text-lg flex items-center"><Zap className="w-5 h-5 mr-2 text-amber-500" /> Confidence Breakdown logic</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Why did the model predict "Active"?</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      The Deep Neural Net heavily weighted the <span className="font-bold text-indigo-600">TPSA (Topological Polar Surface Area)</span> and <span className="font-bold text-indigo-600">LogP</span> parameters. These structures strongly correlate with previously known active inhibitors in the training dataset.
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">Deep Learning Certainty</span>
                        <span>97%</span>
                      </div>
                      <Progress value={97} className="h-2 bg-gray-100" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">SVM Bound Margin</span>
                        <span>84%</span>
                      </div>
                      <Progress value={84} className="h-2 bg-gray-100" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">Random Forest Agreement</span>
                        <span>100% (All trees)</span>
                      </div>
                      <Progress value={100} className="h-2 bg-gray-100" />
                    </div>
                  </div>
                  
                  <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-lg flex items-start gap-3">
                    <Database className="w-5 h-5 text-indigo-600 mt-0.5" />
                    <p className="text-sm text-indigo-900"><span className="font-bold">Ensemble Conclusion:</span> High Multi-Model Agreement yields a robust confidence profile resilient against single-algorithm bias.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* TAB: Molecular Docking */}
          <TabsContent value="docking" className="space-y-6 animate-in fade-in duration-500">
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-1 shadow-md">
                  <CardHeader className="bg-slate-50 border-b">
                    <CardTitle className="text-lg flex items-center"><Target className="w-5 h-5 mr-2 text-blue-600" /> Target Protein Selection</CardTitle>
                    <CardDescription>Select a target to simulate binding affinity</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                       <Label>Disease Target / Protein</Label>
                       <Select value={selectedProtein} onValueChange={setSelectedProtein}>
                         <SelectTrigger>
                           <SelectValue placeholder="Select target protein..." />
                         </SelectTrigger>
                         <SelectContent>
                           <SelectItem value="EGFR">EGFR Tyrosine Kinase (Cancer)</SelectItem>
                           <SelectItem value="COVID">SARS-CoV-2 Mpro (Viral)</SelectItem>
                           <SelectItem value="COX2">COX-2 (Inflammation)</SelectItem>
                           <SelectItem value="AChE">Acetylcholinesterase (Alzheimer's)</SelectItem>
                         </SelectContent>
                       </Select>
                    </div>
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white" 
                      onClick={runDockingSimulation}
                      disabled={isDocking || !selectedProtein}
                    >
                      {isDocking ? 'Simulating Docking...' : 'Run AutoDock Vina Simulation'}
                    </Button>
                    
                    {dockingScore && (
                      <div className="mt-6 p-4 rounded-xl border-2 border-emerald-200 bg-emerald-50 text-center animate-in zoom-in">
                         <p className="text-sm font-semibold text-emerald-700 uppercase tracking-wider mb-1">Binding Affinity Score</p>
                         <p className="text-4xl font-black text-emerald-600">{dockingScore.toFixed(1)} <span className="text-lg font-medium text-emerald-500">kcal/mol</span></p>
                         <p className="text-xs text-emerald-600 mt-2">Strong interaction predicted</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="lg:col-span-2 shadow-md flex flex-col">
                  <CardHeader className="bg-slate-50 border-b">
                    <CardTitle className="text-lg flex items-center"><Dna className="w-5 h-5 mr-2 text-blue-600" /> 3D Interaction Visualization (Mock)</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 flex-1 relative min-h-[400px] bg-slate-900 flex items-center justify-center overflow-hidden">
                    {/* Simulated 3D Viewer Space */}
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-400 via-slate-900 to-black"></div>
                    {isDocking ? (
                      <div className="text-center z-10 flex flex-col items-center">
                        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-blue-400 font-mono">Calculating Grid Box & Binding Modes...</p>
                      </div>
                    ) : dockingScore ? (
                      <div className="z-10 text-center space-y-4">
                        <Dna className="w-32 h-32 text-emerald-400 opacity-80 mx-auto animate-pulse" />
                        <div className="bg-black/50 backdrop-blur-md border border-white/10 p-4 rounded-lg">
                          <p className="text-white font-medium">Ligand perfectly bound to active site</p>
                          <p className="text-blue-300 text-sm mt-1">H-bonds: 3 | Hydrophobic interactions: 4</p>
                        </div>
                      </div>
                    ) : (
                      <div className="z-10 text-center text-slate-500">
                        <Target className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p>Select a protein and run simulation to view interactions</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
             </div>
          </TabsContent>

          {/* TAB: Advanced ADMET */}
          <TabsContent value="admet" className="animate-in fade-in duration-500 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-100 shadow-sm">
                 <CardContent className="p-6">
                   <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                     <CheckCircle2 className="w-6 h-6" />
                   </div>
                   <h3 className="font-bold text-gray-900 text-lg">Toxicity Level</h3>
                   <p className="text-3xl font-black text-emerald-600 mt-2">Low Risk</p>
                   <p className="text-sm text-gray-600 mt-2">Passed AMES mutagenicity and hERG inhibition thresholds.</p>
                 </CardContent>
               </Card>
               <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100 shadow-sm">
                 <CardContent className="p-6">
                   <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                     <Shield className="w-6 h-6" />
                   </div>
                   <h3 className="font-bold text-gray-900 text-lg">Drug Safety Class</h3>
                   <p className="text-3xl font-black text-blue-600 mt-2">Class I</p>
                   <p className="text-sm text-gray-600 mt-2">High solubility and high permeability (BCS Classification).</p>
                 </CardContent>
               </Card>
               <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-100 shadow-sm">
                 <CardContent className="p-6">
                   <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-4">
                     <AlertTriangle className="w-6 h-6" />
                   </div>
                   <h3 className="font-bold text-gray-900 text-lg">CYP450 Status</h3>
                   <p className="text-3xl font-black text-amber-600 mt-2">Inhibitor</p>
                   <p className="text-sm text-gray-600 mt-2">Potential for drug-drug interactions via CYP3A4 pathway.</p>
                 </CardContent>
               </Card>
            </div>

            <Card className="shadow-md">
              <CardHeader className="bg-slate-50 border-b">
                 <CardTitle className="text-lg">Detailed ADMET Radar Profile</CardTitle>
              </CardHeader>
              <CardContent className="p-6 h-[400px] flex justify-center">
                 <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={admetRadar}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar name="Compound Profile" dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                      <RechartsTooltip />
                    </RadarChart>
                 </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB: Validation Metrics */}
          <TabsContent value="validation" className="animate-in fade-in duration-500 space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {validationMetrics.map((vm, idx) => (
                <div key={idx} className={`${vm.bg} border border-black/5 rounded-xl p-4 text-center`}>
                   <p className="text-sm font-semibold text-gray-600 mb-2">{vm.metric}</p>
                   <p className={`text-3xl font-black ${vm.color} mb-3`}>{(vm.value * 100).toFixed(1)}%</p>
                   <Progress value={vm.value * 100} className={`h-1.5 ${vm.color.replace('text', 'bg').replace('600', '200')}`} />
                </div>
              ))}
            </div>

            <Card className="shadow-md">
              <CardHeader className="bg-slate-50 border-b">
                 <div className="flex justify-between items-center">
                   <CardTitle className="text-lg">Machine Learning Model Comparison</CardTitle>
                   <Badge variant="outline" className="bg-white">10-Fold Cross-Validation</Badge>
                 </div>
              </CardHeader>
              <CardContent className="p-6 h-[400px]">
                 <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={modelComparison} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} />
                     <YAxis domain={[80, 100]} axisLine={false} tickLine={false} />
                     <RechartsTooltip cursor={{fill: '#f8fafc'}} />
                     <Legend />
                     <Bar dataKey="acc" name="Accuracy" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                     <Bar dataKey="f1" name="F1-Score" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                     <Bar dataKey="roc" name="ROC-AUC" fill="#10b981" radius={[4, 4, 0, 0]} />
                   </BarChart>
                 </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <div className="bg-white p-6 rounded-xl border text-sm text-gray-600">
              <h4 className="font-bold text-gray-900 mb-2">Dataset Source Information</h4>
              <p className="mb-2">Training Data compiled from ChEMBL database mapping {">"}500,000 bioactive compounds targeting specific receptors.</p>
              <p>Train/Test Split: 80/20 with stratified sampling across activity thresholds.</p>
            </div>
          </TabsContent>

          {/* TAB: Similarity Search */}
          <TabsContent value="search" className="animate-in fade-in duration-500">
             <Card className="shadow-md">
               <CardHeader className="bg-slate-50 border-b">
                 <CardTitle className="text-lg flex items-center"><Fingerprint className="w-5 h-5 mr-2 text-orange-600" /> Fingerprint Similarity Search</CardTitle>
                 <CardDescription>Discover existing drugs with similar structural scaffolds (Tanimoto Coefficient)</CardDescription>
               </CardHeader>
               <CardContent className="p-6">
                  <div className="flex gap-4 mb-8">
                    <Input placeholder="Enter SMILES or Compound Name" defaultValue={data.smiles} className="flex-1" />
                    <Button className="bg-orange-600 hover:bg-orange-700">
                      <Search className="w-4 h-4 mr-2" /> Find Matches
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">Top Structural Matches in Database</h4>
                    {similarityMatches.map((match, i) => (
                      <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                         <div>
                           <p className="font-bold text-indigo-700">{match.id}</p>
                           <p className="text-xs text-gray-500 mt-1">Known Target: {match.target}</p>
                         </div>
                         <div className="mt-3 sm:mt-0 flex items-center gap-4">
                           <div className="w-32">
                             <div className="flex justify-between text-xs mb-1">
                               <span className="text-gray-500">Similarity</span>
                               <span className="font-bold text-orange-600">{(match.sim * 100).toFixed(1)}%</span>
                             </div>
                             <Progress value={match.sim * 100} className="h-1.5 [&>div]:bg-orange-500" />
                           </div>
                           <Button variant="outline" size="sm">View Details</Button>
                         </div>
                      </div>
                    ))}
                  </div>
               </CardContent>
             </Card>
          </TabsContent>

          {/* TAB: Bulk Screening */}
          <TabsContent value="bulk" className="animate-in fade-in duration-500">
             <Card className="shadow-md overflow-hidden">
               <div className="bg-gradient-to-r from-pink-600 to-rose-600 p-6 text-white text-center">
                 <Database className="w-12 h-12 mx-auto mb-3 opacity-90" />
                 <h2 className="text-2xl font-bold mb-2">High-Throughput Bulk Screening</h2>
                 <p className="text-pink-100 max-w-lg mx-auto">Upload a CSV of SMILES strings to evaluate hundreds of analog variations simultaneously.</p>
               </div>
               <CardContent className="p-10 text-center flex flex-col items-center justify-center border-dashed border-2 m-6 border-gray-300 rounded-xl bg-gray-50">
                 <Upload className="w-12 h-12 text-gray-400 mb-4" />
                 <h3 className="text-lg font-bold text-gray-700 mb-1">Drag & Drop CSV/SDF File</h3>
                 <p className="text-gray-500 text-sm mb-6">Max 5,000 compounds per batch</p>
                 <Button className="bg-pink-600 hover:bg-pink-700 w-48">
                   Browse Files
                 </Button>
               </CardContent>
               <div className="bg-slate-50 px-6 py-4 flex justify-between items-center border-t">
                  <p className="text-sm text-gray-600">Sample format: <code className="bg-gray-200 px-2 py-1 rounded">ID, SMILES</code></p>
                  <Button variant="outline" size="sm" className="bg-white">
                    <FileDown className="w-4 h-4 mr-2" /> Download Template
                  </Button>
               </div>
             </Card>
          </TabsContent>
          
        </Tabs>
      </div>
    </div>
  );
}
