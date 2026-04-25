import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ZoomIn, ZoomOut, RotateCcw, Settings } from 'lucide-react';

export function KnowledgeGraph() {
  // Interactive network visualization component
  const NetworkVisualization = () => {
    const nodes = [
      // Plants
      { id: 'echinacea', type: 'plant', x: 100, y: 150, label: 'Echinacea' },
      { id: 'turmeric', type: 'plant', x: 100, y: 250, label: 'Turmeric' },
      { id: 'ginseng', type: 'plant', x: 100, y: 350, label: 'Ginseng' },
      
      // Compounds
      { id: 'curcumin', type: 'compound', x: 300, y: 200, label: 'Curcumin' },
      { id: 'ginsenoside', type: 'compound', x: 300, y: 300, label: 'Ginsenoside' },
      { id: 'cichoric-acid', type: 'compound', x: 300, y: 100, label: 'Cichoric Acid' },
      
      // Functional Groups
      { id: 'phenol', type: 'functional', x: 500, y: 150, label: 'Phenol' },
      { id: 'carbonyl', type: 'functional', x: 500, y: 250, label: 'Carbonyl' },
      { id: 'glycoside', type: 'functional', x: 500, y: 350, label: 'Glycoside' },
      
      // Diseases
      { id: 'inflammation', type: 'disease', x: 700, y: 200, label: 'Inflammation' },
      { id: 'diabetes', type: 'disease', x: 700, y: 300, label: 'Diabetes' },
      { id: 'immune', type: 'disease', x: 700, y: 100, label: 'Immune Support' }
    ];

    const connections = [
      // Plant to Compound
      { from: 'turmeric', to: 'curcumin' },
      { from: 'ginseng', to: 'ginsenoside' },
      { from: 'echinacea', to: 'cichoric-acid' },
      
      // Compound to Functional Group
      { from: 'curcumin', to: 'phenol' },
      { from: 'curcumin', to: 'carbonyl' },
      { from: 'ginsenoside', to: 'glycoside' },
      { from: 'cichoric-acid', to: 'phenol' },
      
      // Functional Group to Disease
      { from: 'phenol', to: 'inflammation' },
      { from: 'phenol', to: 'immune' },
      { from: 'carbonyl', to: 'inflammation' },
      { from: 'glycoside', to: 'diabetes' }
    ];

    const getNodeColor = (type: string) => {
      switch (type) {
        case 'plant': return '#22c55e';
        case 'compound': return '#3b82f6';
        case 'functional': return '#f59e0b';
        case 'disease': return '#ef4444';
        default: return '#6b7280';
      }
    };

    return (
      <svg width="800" height="450" viewBox="0 0 800 450" className="border rounded-lg bg-white">
        {/* Connections */}
        {connections.map((conn, index) => {
          const fromNode = nodes.find(n => n.id === conn.from);
          const toNode = nodes.find(n => n.id === conn.to);
          if (!fromNode || !toNode) return null;
          
          return (
            <line
              key={index}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke="#d1d5db"
              strokeWidth="2"
              opacity="0.6"
            />
          );
        })}
        
        {/* Nodes */}
        {nodes.map((node) => (
          <g key={node.id}>
            <circle
              cx={node.x}
              cy={node.y}
              r="20"
              fill={getNodeColor(node.type)}
              stroke="white"
              strokeWidth="3"
              className="cursor-pointer hover:opacity-80 transition-opacity"
            />
            <text
              x={node.x}
              y={node.y + 35}
              textAnchor="middle"
              className="text-xs font-medium fill-gray-700"
            >
              {node.label}
            </text>
          </g>
        ))}
        
        {/* Legend */}
        <g transform="translate(20, 20)">
          <rect x="0" y="0" width="140" height="120" fill="white" stroke="#e5e7eb" rx="8" />
          <text x="10" y="20" className="text-sm font-medium fill-gray-900">Legend</text>
          
          <circle cx="20" cy="40" r="6" fill="#22c55e" />
          <text x="35" y="45" className="text-xs fill-gray-700">Plants</text>
          
          <circle cx="20" cy="60" r="6" fill="#3b82f6" />
          <text x="35" y="65" className="text-xs fill-gray-700">Compounds</text>
          
          <circle cx="20" cy="80" r="6" fill="#f59e0b" />
          <text x="35" y="85" className="text-xs fill-gray-700">Functional Groups</text>
          
          <circle cx="20" cy="100" r="6" fill="#ef4444" />
          <text x="35" y="105" className="text-xs fill-gray-700">Diseases</text>
        </g>
      </svg>
    );
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <h3 className="font-medium">Knowledge Graph</h3>
          <p className="text-sm text-muted-foreground">
            Explore relationships between plants, compounds, functional groups, and diseases
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="mb-4 flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-green-50 text-green-700">
            12 Plants
          </Badge>
          <Badge variant="secondary" className="bg-blue-50 text-blue-700">
            48 Compounds
          </Badge>
          <Badge variant="secondary" className="bg-yellow-50 text-yellow-700">
            24 Functional Groups
          </Badge>
          <Badge variant="secondary" className="bg-red-50 text-red-700">
            18 Diseases
          </Badge>
        </div>
        
        <NetworkVisualization />
        
        <div className="mt-4 text-xs text-muted-foreground">
          Click on nodes to explore connections. Use controls to zoom and navigate.
        </div>
      </CardContent>
    </Card>
  );
}