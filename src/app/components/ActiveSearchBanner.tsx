import { Search, X } from 'lucide-react';
import { Button } from './ui/button';

interface ActiveSearchBannerProps {
  searchQuery: string;
  resultCount: number;
  totalCount: number;
  onClear: () => void;
  type: 'plants' | 'compounds';
}

export function ActiveSearchBanner({ 
  searchQuery, 
  resultCount, 
  totalCount, 
  onClear,
  type 
}: ActiveSearchBannerProps) {
  if (!searchQuery) return null;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-blue-600" />
          <p className="text-sm text-blue-900">
            <strong>Active Search:</strong> Showing {resultCount} of {totalCount} {type} matching <strong>"{searchQuery}"</strong>
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="text-blue-700 hover:text-blue-900 hover:bg-blue-100"
        >
          <X className="h-4 w-4 mr-1" />
          Clear Search
        </Button>
      </div>
    </div>
  );
}
