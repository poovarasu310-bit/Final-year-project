import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Eye, Download, Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

interface Compound {
  id: string;
  name: string;
  molecularFormula: string;
  molecularWeight: number;
  logP: number;
  functionalGroups: string[];
  smiles: string;
  plantSources: string[];
  bioactivity: string;
  drugLikeness: string;
  thumbnail: string;
}

interface CompoundCardProps {
  compound: Compound;
  onViewMolecule: (compound: Compound) => void;
}

export function CompoundCard({ compound, onViewMolecule }: CompoundCardProps) {
  // Simple molecule visualization placeholder
  const MoleculeThumbnail = () => (
    <div className="w-full h-32 bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg flex items-center justify-center border border-gray-200 group-hover:border-blue-300 transition-colors">
      <svg width="120" height="90" viewBox="0 0 120 90" className="text-gray-400 group-hover:text-blue-500 transition-colors">
        {/* Improved molecule representation */}
        <circle cx="30" cy="45" r="8" fill="currentColor" opacity="0.8" />
        <circle cx="60" cy="25" r="8" fill="#3050F8" opacity="0.8" />
        <circle cx="60" cy="65" r="8" fill="#FF0D0D" opacity="0.8" />
        <circle cx="90" cy="45" r="8" fill="currentColor" opacity="0.8" />
        <line x1="38" y1="45" x2="52" y2="31" stroke="currentColor" strokeWidth="2.5" opacity="0.6" />
        <line x1="38" y1="45" x2="52" y2="59" stroke="currentColor" strokeWidth="2.5" opacity="0.6" />
        <line x1="68" y1="25" x2="82" y2="39" stroke="currentColor" strokeWidth="2.5" opacity="0.6" />
        <line x1="68" y1="65" x2="82" y2="51" stroke="currentColor" strokeWidth="2.5" opacity="0.6" />
        <line x1="60" y1="33" x2="60" y2="57" stroke="currentColor" strokeWidth="3" opacity="0.6" />
      </svg>
    </div>
  );

  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{compound.name}</h4>
            <p className="text-sm text-gray-600 font-mono">{compound.molecularFormula}</p>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onViewMolecule(compound)}
                  className="hover:bg-blue-100 hover:text-blue-600"
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View 3D structure</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <MoleculeThumbnail />
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Molecular Weight</p>
            <p className="font-semibold text-gray-900">{compound.molecularWeight.toFixed(2)} <span className="text-xs text-gray-500">Da</span></p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1 flex items-center gap-1">
                      LogP <Info className="h-3 w-3" />
                    </p>
                    <p className="font-semibold text-gray-900">{compound.logP.toFixed(2)}</p>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Lipophilicity measure (partition coefficient)</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Drug-likeness</p>
          <Badge 
            variant={compound.drugLikeness === 'Excellent' ? 'default' : 
                    compound.drugLikeness === 'Good' ? 'secondary' : 
                    compound.drugLikeness === 'Moderate' ? 'outline' : 'destructive'}
            className={`text-xs shadow-sm ${
              compound.drugLikeness === 'Excellent' ? 'bg-green-500 text-white hover:bg-green-600' :
              compound.drugLikeness === 'Good' ? 'bg-blue-500 text-white hover:bg-blue-600' :
              compound.drugLikeness === 'Moderate' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' :
              'bg-red-100 text-red-800 border-red-300'
            }`}
          >
            {compound.drugLikeness}
          </Badge>
        </div>

        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Plant Sources</p>
          <div className="flex flex-wrap gap-1">
            {compound.plantSources.slice(0, 2).map((plant) => (
              <Badge 
                key={plant} 
                variant="outline" 
                className="text-xs bg-green-50 text-green-700 border-green-300 hover:bg-green-100 transition-colors"
              >
                {plant}
              </Badge>
            ))}
            {compound.plantSources.length > 2 && (
              <Badge variant="outline" className="text-xs text-gray-500 bg-gray-50">
                +{compound.plantSources.length - 2}
              </Badge>
            )}
          </div>
        </div>
        
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Functional Groups</p>
          <div className="flex flex-wrap gap-1">
            {compound.functionalGroups.slice(0, 3).map((group) => (
              <Badge 
                key={group} 
                variant="secondary" 
                className="text-xs bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 transition-colors"
              >
                {group}
              </Badge>
            ))}
            {compound.functionalGroups.length > 3 && (
              <Badge variant="outline" className="text-xs text-gray-500 bg-gray-50">
                +{compound.functionalGroups.length - 3}
              </Badge>
            )}
          </div>
        </div>

        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Bioactivity</p>
          <p className="text-xs text-gray-700 line-clamp-2 leading-relaxed">{compound.bioactivity}</p>
        </div>
        
        <div className="pt-2 border-t border-gray-200">
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">SMILES</p>
          <p className="text-xs font-mono bg-gray-50 p-2 rounded text-gray-700 break-all line-clamp-2 border border-gray-200">
            {compound.smiles}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}