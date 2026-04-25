import { useState } from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { ChevronRight, Upload, Search, BarChart3, FileText, X, BookOpen, Beaker, Database } from 'lucide-react';
import { Badge } from './ui/badge';

interface QuickStartGuideProps {
  onNavigate: (tab: string) => void;
  onUploadClick: () => void;
}

export function QuickStartGuide({ onNavigate, onUploadClick }: QuickStartGuideProps) {
  const [dismissed, setDismissed] = useState(() => {
    return localStorage.getItem('quick_start_dismissed') === 'true';
  });

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem('quick_start_dismissed', 'true');
  };

  if (dismissed) {
    return null;
  }

  const steps = [
    {
      icon: Database,
      title: 'Browse Plants & Compounds',
      description: 'Explore our curated database of medicinal plants and their bioactive compounds',
      action: 'View Plants',
      onClick: () => onNavigate('plants'),
      badge: 'Start Here',
      badgeColor: 'bg-green-100 text-green-700'
    },
    {
      icon: Upload,
      title: 'Upload Your Compounds',
      description: 'Import SMILES strings or CSV files to analyze your own molecules',
      action: 'Upload',
      onClick: onUploadClick,
      badge: 'Quick Action',
      badgeColor: 'bg-blue-100 text-blue-700'
    },
    {
      icon: Beaker,
      title: 'Run Analysis Pipeline',
      description: 'Perform drug-likeness, molecular descriptors, QSAR modeling, and ML predictions',
      action: 'Analyze',
      onClick: () => onNavigate('analysis'),
      badge: 'Core Feature',
      badgeColor: 'bg-purple-100 text-purple-700'
    },
    {
      icon: FileText,
      title: 'Save & Export Reports',
      description: 'View analysis reports, export as PDF/JSON/CSV, and save code snippets',
      action: 'View Reports',
      onClick: () => onNavigate('reports'),
      badge: 'Results',
      badgeColor: 'bg-orange-100 text-orange-700'
    }
  ];

  return (
    <Card className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 border-green-200 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-200/30 to-green-200/30 rounded-full blur-3xl -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-200/30 to-blue-200/30 rounded-full blur-3xl -ml-32 -mb-32" />
      
      <CardHeader className="relative">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Quick Start Guide</h3>
              <p className="text-sm text-gray-600">Get started with MediPlants in 4 easy steps</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDismiss}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow group relative"
            >
              <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md">
                {index + 1}
              </div>
              
              <div className="mb-3">
                <Badge className={`${step.badgeColor} mb-3`}>
                  {step.badge}
                </Badge>
                <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <step.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{step.title}</h4>
                <p className="text-sm text-gray-600 mb-4">{step.description}</p>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={step.onClick}
                className="w-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors"
              >
                {step.action}
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-white rounded-lg border border-blue-200">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
              <BarChart3 className="h-4 w-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 mb-1">Pro Tip: Knowledge Graph</h4>
              <p className="text-sm text-gray-600">
                Visit the <span className="font-medium text-blue-600">Analysis</span> tab to explore our interactive knowledge graph. 
                It visualizes relationships between plants, compounds, functional groups, and diseases - perfect for discovering new therapeutic connections!
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
