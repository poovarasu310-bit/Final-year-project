import { useState, useEffect } from 'react';
import { AlertCircle, X } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { Button } from './ui/button';

export function DemoModeBanner() {
  const [demoMode, setDemoMode] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const isDemoMode = localStorage.getItem('demo_mode') === 'true';
    const isDismissed = localStorage.getItem('demo_banner_dismissed') === 'true';
    setDemoMode(isDemoMode);
    setDismissed(isDismissed);
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem('demo_banner_dismissed', 'true');
  };

  if (!demoMode || dismissed) {
    return null;
  }

  return (
    <Alert className="bg-blue-50 border-blue-200 mb-4">
      <AlertCircle className="h-4 w-4 text-blue-600" />
      <AlertDescription className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <span className="text-blue-800">
            <strong>Demo Mode Active:</strong> Explore with sample data. Deploy the backend for data persistence:
            <code className="ml-2 px-2 py-0.5 bg-blue-100 rounded text-xs">supabase functions deploy server</code>
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 text-blue-600 hover:text-blue-800 hover:bg-blue-100"
          onClick={handleDismiss}
        >
          <X className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
}
