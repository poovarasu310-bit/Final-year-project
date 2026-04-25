import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ChevronDown, ChevronUp, Pill, Leaf } from 'lucide-react';

interface Plant {
  id: string;
  name: string;
  tamilName: string;
  scientificName: string;
  image: string;
  compounds: number;
  functionalGroups: string[];
  description: string;
}

interface PlantCardProps {
  plant: Plant;
  onClick: (plant: Plant) => void;
}

export function PlantCard({ plant, onClick }: PlantCardProps) {
  const [showAllGroups, setShowAllGroups] = useState(false);
  
  const handleCardClick = (e: React.MouseEvent) => {
    // Don't trigger onClick if clicking the show more button
    if ((e.target as HTMLElement).closest('[data-show-more]')) {
      return;
    }
    onClick(plant);
  };

  const handleShowMoreClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowAllGroups(!showAllGroups);
  };

  const groupsToShow = showAllGroups ? plant.functionalGroups : plant.functionalGroups.slice(0, 3);
  
  return (
    <Card 
      className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 overflow-hidden group"
      onClick={handleCardClick}
    >
      <CardContent className="p-0">
        <div className="aspect-video relative overflow-hidden">
          <ImageWithFallback
            src={plant.image}
            alt={plant.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-white/95 backdrop-blur-sm text-gray-700 shadow-md flex items-center gap-1">
              <Pill className="h-3 w-3" />
              {plant.compounds} compounds
            </Badge>
          </div>
          <div className="absolute bottom-3 left-3">
            <Badge variant="secondary" className="bg-green-600/90 backdrop-blur-sm text-white shadow-md flex items-center gap-1">
              <Leaf className="h-3 w-3" />
              Medicinal Plant
            </Badge>
          </div>
        </div>
        
        <div className="p-5">
          <div className="mb-3">
            <h3 className="font-semibold text-gray-900 mb-1 text-lg group-hover:text-green-600 transition-colors">{plant.name}</h3>
            <p className="text-sm text-blue-600 font-medium mb-1">{plant.tamilName}</p>
            <p className="text-sm text-gray-500 italic">{plant.scientificName}</p>
          </div>
          <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">{plant.description}</p>
          
          <div className="pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-2 font-medium">Functional Groups</p>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {groupsToShow.map((group) => (
                <Badge 
                  key={group} 
                  variant="outline" 
                  className="text-xs text-green-700 bg-green-50 border-green-300 hover:bg-green-100 transition-colors"
                >
                  {group}
                </Badge>
              ))}
            </div>
            
            {plant.functionalGroups.length > 3 && (
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-1 text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-50 flex items-center"
                onClick={handleShowMoreClick}
                data-show-more
              >
                {showAllGroups ? (
                  <>
                    <ChevronUp className="h-3 w-3 mr-1" />
                    Show less
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-3 w-3 mr-1" />
                    Show {plant.functionalGroups.length - 3} more
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}