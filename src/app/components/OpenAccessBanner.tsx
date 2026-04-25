import { useState, useEffect } from 'react';
import { Unlock, X, Info } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { Button } from './ui/button';

export function OpenAccessBanner() {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const isDismissed = localStorage.getItem('open_access_banner_dismissed') === 'true';
    setDismissed(isDismissed);
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem('open_access_banner_dismissed', 'true');
  };

  if (dismissed) {
    return null;
  }

  return (
    <Alert className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200 mb-4">
      <Unlock className="h-4 w-4 text-green-600" />
      <AlertDescription className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <span className="text-gray-800">
            <strong className="text-green-700">🔓 Open Access Tool:</strong> No login required! 
            Upload compounds, perform analysis, and save reports freely. All data is stored locally in your browser.
            <span className="ml-2 inline-flex items-center gap-1 text-xs text-blue-600">
              <Info className="h-3 w-3" />
              Reports saved in browser localStorage
            </span>
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 text-green-600 hover:text-green-800 hover:bg-green-100"
          onClick={handleDismiss}
        >
          <X className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
}
