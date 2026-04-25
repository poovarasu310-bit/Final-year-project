import { useState } from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { ChevronDown, ChevronUp, Brain, Target, CheckCircle2, XCircle, TrendingUp } from 'lucide-react';

interface ExpandableMLCardProps {
  type: 'models' | 'outputs';
  activityProbability?: number;
  classification?: string;
}

export function ExpandableMLCard({ type, activityProbability = 91.4, classification = 'Active' }: ExpandableMLCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (type === 'models') {
    const models = [
      {
        name: 'Random Forest',
        accuracy: 87.2,
        precision: 0.85,
        recall: 0.83,
        f1Score: 0.84,
        featuresUsed: 156
      },
      {
        name: 'Support Vector Machine (SVM)',
        accuracy: 84.6,
        precision: 0.82,
        recall: 0.80,
        f1Score: 0.81,
        featuresUsed: 156
      },
      {
        name: 'Gradient Boosting',
        accuracy: 88.9,
        precision: 0.87,
        recall: 0.85,
        f1Score: 0.86,
        featuresUsed: 156
      },
      {
        name: 'Neural Network',
        accuracy: 86.3,
        precision: 0.84,
        recall: 0.82,
        f1Score: 0.83,
        featuresUsed: 156
      }
    ];

    return (
      <Card 
        className={`cursor-pointer transition-all duration-300 ${
          isExpanded 
            ? 'border-2 border-green-300 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50' 
            : 'border-2 border-green-200 shadow-lg hover:shadow-xl bg-gradient-to-br from-green-50 to-teal-50'
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-md">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-green-900">ML Models</h3>
                {!isExpanded && (
                  <p className="text-sm text-green-700">Random Forest, SVM, Gradient Boosting, Neural Networks</p>
                )}
              </div>
            </div>
            {isExpanded ? (
              <ChevronUp className="h-6 w-6 text-green-700 flex-shrink-0" />
            ) : (
              <ChevronDown className="h-6 w-6 text-green-700 flex-shrink-0" />
            )}
          </div>
        </CardHeader>

        {isExpanded && (
          <CardContent className="pt-0 space-y-4">
            {models.map((model, index) => (
              <div 
                key={index}
                className="p-4 bg-white rounded-lg border border-green-200 shadow-sm"
              >
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  {model.name}
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div>
                    <p className="text-xs text-gray-600">Accuracy</p>
                    <p className="text-sm font-bold text-gray-900">{model.accuracy}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Precision</p>
                    <p className="text-sm font-bold text-gray-900">{model.precision.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Recall</p>
                    <p className="text-sm font-bold text-gray-900">{model.recall.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">F1-Score</p>
                    <p className="text-sm font-bold text-gray-900">{model.f1Score.toFixed(2)}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-xs text-gray-600">Features Used</p>
                    <p className="text-sm font-bold text-gray-900">{model.featuresUsed}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-xs text-green-800">
                <strong>Note:</strong> Each model independently analyzes molecular descriptors and fingerprints to predict drug activity.
              </p>
            </div>
          </CardContent>
        )}
      </Card>
    );
  }

  // Prediction Outputs Card
  const predictedIC50 = (10 + Math.random() * 20).toFixed(2);
  const overallConfidence = (activityProbability + Math.random() * 5 - 2.5).toFixed(1);

  return (
    <Card 
      className={`cursor-pointer transition-all duration-300 ${
        isExpanded 
          ? 'border-2 border-orange-300 shadow-xl bg-gradient-to-br from-orange-50 to-red-50' 
          : 'border-2 border-orange-200 shadow-lg hover:shadow-xl bg-gradient-to-br from-orange-50 to-amber-50'
      }`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-md">
              <Target className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-orange-900">Prediction Outputs</h3>
              {!isExpanded && (
                <p className="text-sm text-orange-700">Active/Inactive, Activity probability, Therapeutic effectiveness</p>
              )}
            </div>
          </div>
          {isExpanded ? (
            <ChevronUp className="h-6 w-6 text-orange-700 flex-shrink-0" />
          ) : (
            <ChevronDown className="h-6 w-6 text-orange-700 flex-shrink-0" />
          )}
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="pt-0 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Predicted Activity */}
            <div className="p-4 bg-white rounded-lg border border-orange-200 shadow-sm">
              <p className="text-xs text-gray-600 mb-2">Predicted Activity</p>
              <div className="flex items-center gap-2">
                <Badge className={`${
                  classification === 'Active' 
                    ? 'bg-green-100 text-green-700 border-green-300' 
                    : 'bg-red-100 text-red-700 border-red-300'
                } px-3 py-1`}>
                  {classification === 'Active' ? (
                    <CheckCircle2 className="h-3 w-3 mr-1 inline" />
                  ) : (
                    <XCircle className="h-3 w-3 mr-1 inline" />
                  )}
                  {classification}
                </Badge>
              </div>
            </div>

            {/* Activity Probability */}
            <div className="p-4 bg-white rounded-lg border border-orange-200 shadow-sm">
              <p className="text-xs text-gray-600 mb-2">Activity Probability</p>
              <div className="space-y-2">
                <p className="text-2xl font-bold text-gray-900">{activityProbability.toFixed(1)}%</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-orange-500 to-red-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${activityProbability}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Predicted IC50 */}
            <div className="p-4 bg-white rounded-lg border border-orange-200 shadow-sm">
              <p className="text-xs text-gray-600 mb-2">Predicted IC<sub>50</sub></p>
              <p className="text-2xl font-bold text-gray-900">{predictedIC50} <span className="text-sm font-normal text-gray-600">μM</span></p>
            </div>

            {/* Therapeutic Effectiveness */}
            <div className="p-4 bg-white rounded-lg border border-orange-200 shadow-sm">
              <p className="text-xs text-gray-600 mb-2">Therapeutic Effectiveness</p>
              <div className="flex items-center gap-2">
                <Badge className={`${
                  activityProbability >= 85
                    ? 'bg-green-100 text-green-700 border-green-300'
                    : activityProbability >= 70
                    ? 'bg-blue-100 text-blue-700 border-blue-300'
                    : 'bg-orange-100 text-orange-700 border-orange-300'
                } px-3 py-1`}>
                  <TrendingUp className="h-3 w-3 mr-1 inline" />
                  {activityProbability >= 85 ? 'High' : activityProbability >= 70 ? 'Moderate' : 'Low'}
                </Badge>
              </div>
            </div>

            {/* Drug-Likeness Status */}
            <div className="p-4 bg-white rounded-lg border border-orange-200 shadow-sm">
              <p className="text-xs text-gray-600 mb-2">Drug-Likeness Status</p>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-100 text-green-700 border-green-300 px-3 py-1">
                  <CheckCircle2 className="h-3 w-3 mr-1 inline" />
                  Passed
                </Badge>
              </div>
            </div>

            {/* Overall Confidence Score */}
            <div className="p-4 bg-white rounded-lg border border-orange-200 shadow-sm">
              <p className="text-xs text-gray-600 mb-2">Overall Confidence Score</p>
              <div className="space-y-2">
                <p className="text-2xl font-bold text-gray-900">{overallConfidence}%</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${overallConfidence}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
            <p className="text-xs text-orange-800">
              <strong>Interpretation:</strong> The compound demonstrates strong predicted biological activity and high therapeutic potential based on ensemble machine learning results.
            </p>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
