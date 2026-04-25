import { Button } from './ui/button';
import { Upload, Search, Menu, AlertCircle, X } from 'lucide-react';
import { Input } from './ui/input';
import { useState, useEffect } from 'react';

interface TopNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onUploadClick: () => void;
  onSearch?: (query: string) => void;
  searchQuery?: string;
}

export function TopNavigation({ activeTab, onTabChange, onUploadClick, onSearch, searchQuery }: TopNavigationProps) {
  const [demoMode, setDemoMode] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery || '');

  useEffect(() => {
    setDemoMode(localStorage.getItem('demo_mode') === 'true');
  }, []);

  useEffect(() => {
    setLocalSearchQuery(searchQuery || '');
  }, [searchQuery]);

  const handleSearchChange = (value: string) => {
    setLocalSearchQuery(value);
    onSearch?.(value);
  };

  const clearSearch = () => {
    setLocalSearchQuery('');
    onSearch?.('');
  };
  
  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'plants', label: 'Plants' },
    { id: 'compounds', label: 'Compounds' },
    { id: 'analysis', label: 'Analysis' },
    { id: 'reports', label: 'Reports' }
  ];

  return (
    <nav className="bg-white border-b border-border px-6 py-4 shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-sm">MP</span>
            </div>
            <span className="font-semibold text-lg bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">MediPlants</span>
            {demoMode && (
              <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                Demo
              </span>
            )}
          </div>
          
          <div className="hidden md:flex items-center gap-1">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                size="sm"
                onClick={() => onTabChange(tab.id)}
                className={activeTab === tab.id ? "bg-green-100 text-green-700 hover:bg-green-200 shadow-sm" : "hover:bg-gray-100"}
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search plants, compounds..."
              className="pl-10 pr-8 w-80"
              value={localSearchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
            {localSearchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          
          <Button onClick={onUploadClick} className="bg-blue-600 hover:bg-blue-700 shadow-md">
            <Upload className="h-4 w-4 mr-2" />
            Upload Compound
          </Button>
          
          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
}