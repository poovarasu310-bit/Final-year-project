import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { RotateCcw, Download, Maximize2, Settings } from 'lucide-react';

interface Compound {
  id: string;
  name: string;
  molecularFormula: string;
  molecularWeight: number;
  logP: number;
  functionalGroups: string[];
  smiles: string;
}

interface MoleculeViewerProps {
  compound: Compound | null;
  isOpen: boolean;
  onClose: () => void;
}

// Atom positions and types for 3D visualization
interface Atom {
  x: number;
  y: number;
  z: number;
  element: string;
  color: string;
  radius: number;
}

interface Bond {
  from: number;
  to: number;
  order: number;
}

// Parse basic SMILES to create a simplified 3D structure
function parseSMILESTo3D(smiles: string): { atoms: Atom[]; bonds: Bond[] } {
  const atoms: Atom[] = [];
  const bonds: Bond[] = [];
  
  // Element colors (CPK coloring)
  const elementColors: { [key: string]: string } = {
    'C': '#909090',
    'H': '#FFFFFF',
    'N': '#3050F8',
    'O': '#FF0D0D',
    'S': '#FFFF30',
    'P': '#FF8000',
    'F': '#90E050',
    'Cl': '#1FF01F',
    'Br': '#A62929',
    'I': '#940094'
  };

  const elementRadii: { [key: string]: number } = {
    'C': 8,
    'H': 5,
    'N': 7,
    'O': 7,
    'S': 9,
    'P': 8,
    'F': 6,
    'Cl': 8,
    'Br': 9,
    'I': 10
  };

  // Simple SMILES parsing (basic approach)
  let currentAtomIndex = 0;
  const atomStack: number[] = [];
  
  // Generate atoms in a 3D space
  for (let i = 0; i < smiles.length; i++) {
    const char = smiles[i];
    
    if (char.match(/[CNOSPFHI]/)) {
      const element = char === 'l' && i > 0 && smiles[i-1] === 'C' ? 'Cl' : char;
      
      // Calculate position in 3D space (tetrahedral-like arrangement)
      const angle = (currentAtomIndex * Math.PI * 2) / 7;
      const radius = 40;
      const layer = Math.floor(currentAtomIndex / 6);
      
      atoms.push({
        x: Math.cos(angle) * radius * (1 + layer * 0.3),
        y: Math.sin(angle) * radius * (1 + layer * 0.3),
        z: (currentAtomIndex % 3 - 1) * 20 + layer * 15,
        element: element,
        color: elementColors[element] || '#FF69B4',
        radius: elementRadii[element] || 7
      });
      
      // Add bonds to previous atoms (simplified)
      if (currentAtomIndex > 0 && char !== '(' && char !== ')') {
        const bondOrder = smiles[i-1] === '=' ? 2 : smiles[i-1] === '#' ? 3 : 1;
        bonds.push({
          from: currentAtomIndex - 1,
          to: currentAtomIndex,
          order: bondOrder
        });
      }
      
      currentAtomIndex++;
    } else if (char === '(') {
      atomStack.push(currentAtomIndex - 1);
    } else if (char === ')') {
      atomStack.pop();
    }
  }

  // If we have few atoms, create a default structure
  if (atoms.length < 3) {
    atoms.length = 0;
    bonds.length = 0;
    
    // Create a simple benzene-like ring
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI * 2) / 6;
      atoms.push({
        x: Math.cos(angle) * 50,
        y: Math.sin(angle) * 50,
        z: (i % 2) * 10,
        element: 'C',
        color: elementColors['C'],
        radius: 8
      });
      
      bonds.push({
        from: i,
        to: (i + 1) % 6,
        order: i % 2 === 0 ? 2 : 1
      });
    }
  }

  return { atoms, bonds };
}

export function MoleculeViewer({ compound, isOpen, onClose }: MoleculeViewerProps) {
  if (!isOpen || !compound) return null;

  // 2D molecule visualization component
  const Molecule2D = () => (
    <div className="w-full h-96 bg-white border rounded-lg flex items-center justify-center">
      <svg width="350" height="300" viewBox="0 0 350 300" className="text-gray-700">
        {/* More complex 2D molecule structure */}
        <g transform="translate(175,150)">
          {/* Benzene ring */}
          <polygon 
            points="-40,-23 -40,23 0,46 40,23 40,-23 0,-46" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          />
          {/* Carbon atoms */}
          <circle cx="-40" cy="-23" r="4" fill="currentColor" />
          <circle cx="-40" cy="23" r="4" fill="currentColor" />
          <circle cx="0" cy="46" r="4" fill="currentColor" />
          <circle cx="40" cy="23" r="4" fill="currentColor" />
          <circle cx="40" cy="-23" r="4" fill="currentColor" />
          <circle cx="0" cy="-46" r="4" fill="currentColor" />
          
          {/* Side chains */}
          <line x1="40" y1="23" x2="70" y2="40" stroke="currentColor" strokeWidth="2" />
          <circle cx="70" cy="40" r="4" fill="red" />
          <text x="75" y="45" className="text-xs fill-red-600">OH</text>
          
          <line x1="-40" y1="-23" x2="-70" y2="-40" stroke="currentColor" strokeWidth="2" />
          <circle cx="-70" cy="-40" r="4" fill="blue" />
          <text x="-85" y="-35" className="text-xs fill-blue-600">NH2</text>
          
          {/* Labels */}
          <text x="-45" y="-10" className="text-xs fill-current">C</text>
          <text x="-45" y="35" className="text-xs fill-current">C</text>
          <text x="-5" y="60" className="text-xs fill-current">C</text>
          <text x="45" y="35" className="text-xs fill-current">C</text>
          <text x="45" y="-10" className="text-xs fill-current">C</text>
          <text x="-5" y="-60" className="text-xs fill-current">C</text>
        </g>
      </svg>
    </div>
  );

  // 3D molecule visualization component
  const Molecule3D = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rotationRef = useRef({ x: 0.3, y: 0.3 });
    const [isDragging, setIsDragging] = useState(false);
    const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 });
    const [autoRotate, setAutoRotate] = useState(true);
    const animationRef = useRef<number>();
    const isDraggingRef = useRef(false);
    const autoRotateRef = useRef(true);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const { atoms, bonds } = parseSMILESTo3D(compound.smiles);

      // Helper functions for colors
      function lightenColor(color: string, percent: number): string {
        const num = parseInt(color.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = Math.min(255, (num >> 16) + amt);
        const G = Math.min(255, ((num >> 8) & 0x00FF) + amt);
        const B = Math.min(255, (num & 0x0000FF) + amt);
        return `#${((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1)}`;
      }

      function darkenColor(color: string, percent: number): string {
        const num = parseInt(color.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = Math.max(0, (num >> 16) - amt);
        const G = Math.max(0, ((num >> 8) & 0x00FF) - amt);
        const B = Math.max(0, (num & 0x0000FF) - amt);
        return `#${((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1)}`;
      }

      const drawMolecule = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const scale = 2;
        const rotation = rotationRef.current;

        // Rotate atoms
        const rotatedAtoms = atoms.map(atom => {
          // Rotation around Y axis
          let x = atom.x;
          let y = atom.y;
          let z = atom.z;

          // Rotate Y
          const cosY = Math.cos(rotation.y);
          const sinY = Math.sin(rotation.y);
          const newX = x * cosY - z * sinY;
          const newZ = x * sinY + z * cosY;
          x = newX;
          z = newZ;

          // Rotate X
          const cosX = Math.cos(rotation.x);
          const sinX = Math.sin(rotation.x);
          const newY = y * cosX - z * sinX;
          z = y * sinX + z * cosX;
          y = newY;

          return { ...atom, x, y, z };
        });

        // Sort by Z (painter's algorithm)
        const sortedAtoms = rotatedAtoms
          .map((atom, index) => ({ atom, index }))
          .sort((a, b) => a.atom.z - b.atom.z);

        // Draw bonds first
        bonds.forEach(bond => {
          const atom1 = rotatedAtoms[bond.from];
          const atom2 = rotatedAtoms[bond.to];
          
          if (!atom1 || !atom2) return;

          const x1 = centerX + atom1.x * scale;
          const y1 = centerY + atom1.y * scale;
          const x2 = centerX + atom2.x * scale;
          const y2 = centerY + atom2.y * scale;

          ctx.strokeStyle = '#555555';
          ctx.lineWidth = bond.order === 2 ? 4 : bond.order === 3 ? 6 : 3;
          ctx.lineCap = 'round';
          
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();

          // For double/triple bonds, draw additional lines
          if (bond.order > 1) {
            const dx = x2 - x1;
            const dy = y2 - y1;
            const len = Math.sqrt(dx * dx + dy * dy);
            const offsetX = (-dy / len) * 3;
            const offsetY = (dx / len) * 3;

            ctx.beginPath();
            ctx.moveTo(x1 + offsetX, y1 + offsetY);
            ctx.lineTo(x2 + offsetX, y2 + offsetY);
            ctx.stroke();

            if (bond.order === 3) {
              ctx.beginPath();
              ctx.moveTo(x1 - offsetX, y1 - offsetY);
              ctx.lineTo(x2 - offsetX, y2 - offsetY);
              ctx.stroke();
            }
          }
        });

        // Draw atoms
        sortedAtoms.forEach(({ atom }) => {
          const x = centerX + atom.x * scale;
          const y = centerY + atom.y * scale;
          const radius = atom.radius;

          // Shadow for depth
          const shadowOffset = (atom.z / 100) * 3;
          ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
          ctx.beginPath();
          ctx.arc(x + shadowOffset, y + shadowOffset, radius, 0, Math.PI * 2);
          ctx.fill();

          // Atom sphere with gradient
          const gradient = ctx.createRadialGradient(
            x - radius / 3,
            y - radius / 3,
            0,
            x,
            y,
            radius
          );
          gradient.addColorStop(0, lightenColor(atom.color, 40));
          gradient.addColorStop(1, atom.color);

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();

          // Border
          ctx.strokeStyle = darkenColor(atom.color, 20);
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Element label
          if (atom.element !== 'C' && atom.element !== 'H') {
            ctx.fillStyle = '#FFFFFF';
            ctx.font = 'bold 10px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(atom.element, x, y);
          }
        });
      };

      const animate = () => {
        if (autoRotateRef.current && !isDraggingRef.current) {
          rotationRef.current = {
            x: rotationRef.current.x,
            y: rotationRef.current.y + 0.01
          };
        }
        drawMolecule();
        animationRef.current = requestAnimationFrame(animate);
      };

      animate();

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }, [compound.smiles]);

    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
      setIsDragging(true);
      isDraggingRef.current = true;
      setAutoRotate(false);
      autoRotateRef.current = false;
      setLastMouse({ x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!isDragging) return;

      const deltaX = e.clientX - lastMouse.x;
      const deltaY = e.clientY - lastMouse.y;

      rotationRef.current = {
        x: rotationRef.current.x + deltaY * 0.01,
        y: rotationRef.current.y + deltaX * 0.01
      };

      setLastMouse({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      isDraggingRef.current = false;
    };

    const handleReset = () => {
      rotationRef.current = { x: 0.3, y: 0.3 };
      setAutoRotate(true);
      autoRotateRef.current = true;
    };

    const handleToggleRotation = () => {
      const newAutoRotate = !autoRotate;
      setAutoRotate(newAutoRotate);
      autoRotateRef.current = newAutoRotate;
    };

    return (
      <div className="w-full h-96 bg-gray-900 rounded-lg flex items-center justify-center relative overflow-hidden">
        <canvas
          ref={canvasRef}
          width={700}
          height={384}
          className="cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />
        
        {/* Floating controls */}
        <div className="absolute bottom-4 left-4 flex gap-2">
          <Button 
            variant="secondary" 
            size="sm"
            onClick={handleReset}
            title="Reset View"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button 
            variant="secondary" 
            size="sm"
            onClick={handleToggleRotation}
            title={autoRotate ? "Stop Rotation" : "Auto Rotate"}
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>

        {/* Instructions */}
        <div className="absolute top-4 right-4 bg-black/50 text-white text-xs px-3 py-2 rounded">
          Drag to rotate • Click reset to center
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between border-b">
          <div>
            <h3 className="font-medium">{compound.name}</h3>
            <p className="text-sm text-muted-foreground">{compound.molecularFormula}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Maximize2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              ×
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2">
              <Tabs defaultValue="3d">
                <TabsList className="mb-4">
                  <TabsTrigger value="2d">2D Structure</TabsTrigger>
                  <TabsTrigger value="3d">3D Model</TabsTrigger>
                </TabsList>
                
                <TabsContent value="2d">
                  <Molecule2D />
                </TabsContent>
                
                <TabsContent value="3d">
                  <Molecule3D />
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">Properties</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Molecular Weight</p>
                    <p className="font-medium">{compound.molecularWeight.toFixed(2)} Da</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">LogP</p>
                    <p className="font-medium">{compound.logP.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Formula</p>
                    <p className="font-medium font-mono">{compound.molecularFormula}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Functional Groups</h4>
                <div className="flex flex-wrap gap-2">
                  {compound.functionalGroups.map((group) => (
                    <Badge key={group} variant="secondary" className="text-xs">
                      {group}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">SMILES</h4>
                <p className="text-xs font-mono bg-muted p-3 rounded break-all">
                  {compound.smiles}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
