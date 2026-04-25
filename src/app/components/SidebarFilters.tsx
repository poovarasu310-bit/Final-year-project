import { useState } from 'react';
import { Card } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Slider } from './ui/slider';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface SidebarFiltersProps {
  filters: {
    functionalGroups: string[];
    molecularWeightRange: [number, number];
    drugLikeness: string[];
    plantTypes: string[];
  };
  onFiltersChange: (filters: any) => void;
}

export function SidebarFilters({ filters, onFiltersChange }: SidebarFiltersProps) {
  const [showAllFunctionalGroups, setShowAllFunctionalGroups] = useState(false);
  
  const functionalGroups = [
    'Hydroxyl (-OH)',
    'Carbonyl (C=O)',
    'Carboxyl (-COOH)',
    'Amino (-NH2)',
    'Phenol',
    'Ester',
    'Ether',
    'Alkene (C=C)',
    'Aromatic Ring',
    'Methyl (-CH3)',
    'Glycoside',
    'Steroid',
    'Terpene',
    'Ketone',
    'Flavonoid',
    'Anthocyanin',
    'Alcohol',
    'Anthraquinone',
    'Polysaccharide',
    'Catechol',
    'Gallate',
    'Polyphenol',
    'Monoterpene',
    'Triterpenoid',
    'Saponin',
    'Acetal',
    'Sugar Ring',
    'Cycloalkane',
    'Rutinoside',
    'Cyanogenic Glycoside',
    'Alkaloid',
    'Tannin',
    'Terpenoid',
    'Essential Oil',
    'Coumarin',
    'Quinone',
    'Stilbene',
    'Benzene Ring',
    'Conjugated System',
    'Amide'
  ];

  const drugLikenessOptions = [
    'Lipinski Rule of Five',
    'Veber Rule',
    'PAINS Filter',
    'Lead-like',
    'Drug-like'
  ];

  const plantTypes = [
    'Herb',
    'Shrub', 
    'Tree',
    'Vine',
    'Succulent',
    'Moss'
  ];

  const handleFunctionalGroupChange = (group: string, checked: boolean) => {
    const newGroups = checked 
      ? [...filters.functionalGroups, group]
      : filters.functionalGroups.filter(g => g !== group);
    
    onFiltersChange({
      ...filters,
      functionalGroups: newGroups
    });
  };

  const handleDrugLikenessChange = (option: string, checked: boolean) => {
    const newOptions = checked 
      ? [...filters.drugLikeness, option]
      : filters.drugLikeness.filter(o => o !== option);
    
    onFiltersChange({
      ...filters,
      drugLikeness: newOptions
    });
  };

  const handleMolecularWeightChange = (value: number[]) => {
    onFiltersChange({
      ...filters,
      molecularWeightRange: [value[0], value[1]] as [number, number]
    });
  };

  const handlePlantTypeChange = (type: string, checked: boolean) => {
    const newTypes = checked 
      ? [...filters.plantTypes, type]
      : filters.plantTypes.filter(t => t !== type);
    
    onFiltersChange({
      ...filters,
      plantTypes: newTypes
    });
  };

  return (
    <div className="w-80 p-6 bg-white border-r border-border h-full overflow-y-auto">
      <h3 className="font-medium mb-4">Filters</h3>
      
      <Card className="p-4 mb-6">
        <Label className="text-sm font-medium mb-3 block">Plant Type</Label>
        <div className="space-y-3">
          {plantTypes.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox 
                id={type}
                checked={filters.plantTypes.includes(type)}
                onCheckedChange={(checked) => handlePlantTypeChange(type, !!checked)}
              />
              <Label htmlFor={type} className="text-sm font-normal cursor-pointer">
                {type}
              </Label>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-4 mb-6">
        <Label className="text-sm font-medium mb-3 block">Functional Groups</Label>
        <div className="space-y-3">
          {functionalGroups
            .slice(0, showAllFunctionalGroups ? functionalGroups.length : 10)
            .map((group) => (
              <div key={group} className="flex items-center space-x-2">
                <Checkbox 
                  id={group}
                  checked={filters.functionalGroups.includes(group)}
                  onCheckedChange={(checked) => handleFunctionalGroupChange(group, !!checked)}
                />
                <Label htmlFor={group} className="text-sm font-normal cursor-pointer">
                  {group}
                </Label>
              </div>
            ))}
        </div>
        
        {functionalGroups.length > 10 && (
          <div className="mt-4 pt-3 border-t border-gray-100">
            <Button
              variant="ghost"
              size="sm"
              className="w-full h-auto p-2 text-xs text-gray-600 hover:text-gray-800 hover:bg-gray-50"
              onClick={() => setShowAllFunctionalGroups(!showAllFunctionalGroups)}
            >
              {showAllFunctionalGroups ? (
                <>
                  <ChevronUp className="h-3 w-3 mr-1" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="h-3 w-3 mr-1" />
                  Show {functionalGroups.length - 10} More
                </>
              )}
            </Button>
          </div>
        )}
      </Card>

      <Card className="p-4 mb-6">
        <Label className="text-sm font-medium mb-3 block">
          Molecular Weight Range
        </Label>
        <div className="space-y-4">
          <Slider
            value={filters.molecularWeightRange}
            onValueChange={handleMolecularWeightChange}
            max={1000}
            min={50}
            step={10}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{filters.molecularWeightRange[0]} g/mol</span>
            <span>{filters.molecularWeightRange[1]} g/mol</span>
          </div>
        </div>
      </Card>

      <Card className="p-4 mb-6">
        <Label className="text-sm font-medium mb-3 block">Drug-likeness</Label>
        <div className="space-y-3">
          {drugLikenessOptions.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox 
                id={option}
                checked={filters.drugLikeness.includes(option)}
                onCheckedChange={(checked) => handleDrugLikenessChange(option, !!checked)}
              />
              <Label htmlFor={option} className="text-sm font-normal cursor-pointer">
                {option}
              </Label>
            </div>
          ))}
        </div>
      </Card>

      <Separator className="my-4" />
      
      <div className="space-y-2">
        <Label className="text-sm font-medium">Active Filters</Label>
        <div className="flex flex-wrap gap-2">
          {filters.plantTypes.map((type) => (
            <Badge key={type} variant="default" className="text-xs">
              {type}
            </Badge>
          ))}
          {filters.functionalGroups.map((group) => (
            <Badge key={group} variant="secondary" className="text-xs">
              {group.split(' ')[0]}
            </Badge>
          ))}
          {filters.drugLikeness.map((option) => (
            <Badge key={option} variant="outline" className="text-xs">
              {option}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}