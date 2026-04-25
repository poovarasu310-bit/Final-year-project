import { Card, CardContent, CardHeader } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, Cell } from 'recharts';

export function ChartsPanel() {
  // Mock data for functional group frequency
  const functionalGroupData = [
    { id: 'fg-1', name: 'Hydroxyl', count: 45, percentage: 23.5 },
    { id: 'fg-2', name: 'Carbonyl', count: 38, percentage: 19.8 },
    { id: 'fg-3', name: 'Aromatic', count: 35, percentage: 18.2 },
    { id: 'fg-4', name: 'Ester', count: 28, percentage: 14.6 },
    { id: 'fg-5', name: 'Ether', count: 22, percentage: 11.5 },
    { id: 'fg-6', name: 'Amino', count: 15, percentage: 7.8 },
    { id: 'fg-7', name: 'Carboxyl', count: 9, percentage: 4.7 }
  ];

  // Mock data for similarity clustering
  const clusteringData = [
    { id: 'mol-1', x: 2.3, y: 180, molecularWeight: 180, cluster: 'A', name: 'Glucose' },
    { id: 'mol-2', x: 2.8, y: 220, molecularWeight: 220, cluster: 'A', name: 'Caffeic acid' },
    { id: 'mol-3', x: 1.9, y: 164, molecularWeight: 164, cluster: 'A', name: 'Vanillic acid' },
    { id: 'mol-4', x: 4.2, y: 368, molecularWeight: 368, cluster: 'B', name: 'Curcumin' },
    { id: 'mol-5', x: 3.8, y: 284, molecularWeight: 284, cluster: 'B', name: 'Kaempferol' },
    { id: 'mol-6', x: 4.5, y: 300, molecularWeight: 300, cluster: 'B', name: 'Quercetin' },
    { id: 'mol-7', x: 6.1, y: 416, molecularWeight: 416, cluster: 'C', name: 'Ginsenoside Rb1' },
    { id: 'mol-8', x: 5.8, y: 460, molecularWeight: 460, cluster: 'C', name: 'Saponin X' },
    { id: 'mol-9', x: 6.3, y: 388, molecularWeight: 388, cluster: 'C', name: 'Oleanolic acid' },
    { id: 'mol-10', x: 3.2, y: 258, molecularWeight: 258, cluster: 'D', name: 'Resveratrol' },
    { id: 'mol-11', x: 2.9, y: 290, molecularWeight: 290, cluster: 'D', name: 'Catechin' },
    { id: 'mol-12', x: 3.5, y: 270, molecularWeight: 270, cluster: 'D', name: 'Epicatechin' }
  ];

  const getClusterColor = (cluster: string) => {
    const colors = {
      'A': '#22c55e',
      'B': '#3b82f6', 
      'C': '#f59e0b',
      'D': '#ef4444'
    };
    return colors[cluster as keyof typeof colors] || '#6b7280';
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-sm">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm text-gray-600">LogP: {data.x}</p>
          <p className="text-sm text-gray-600">MW: {data.y} Da</p>
          <p className="text-sm text-gray-600">Cluster: {data.cluster}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <h3 className="font-medium">Functional Group Distribution</h3>
          <p className="text-sm text-muted-foreground">
            Frequency of functional groups across all compounds
          </p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={functionalGroupData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-sm">
                        <p className="font-medium">{label}</p>
                        <p className="text-sm text-blue-600">
                          Count: {payload[0].value}
                        </p>
                        <p className="text-sm text-gray-600">
                          {payload[0].payload.percentage}% of total
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {functionalGroupData.map((entry) => (
                  <Cell key={entry.id} fill="#3b82f6" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="font-medium">Molecular Similarity Clustering</h3>
          <p className="text-sm text-muted-foreground">
            Compounds clustered by LogP vs Molecular Weight
          </p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              data={clusteringData}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis 
                type="number" 
                dataKey="x" 
                name="LogP"
                tick={{ fontSize: 12 }}
                label={{ value: 'LogP', position: 'insideBottom', offset: -10 }}
              />
              <YAxis 
                type="number" 
                dataKey="y" 
                name="Molecular Weight"
                tick={{ fontSize: 12 }}
                label={{ value: 'Molecular Weight (Da)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Scatter dataKey="y">
                {clusteringData.map((entry) => (
                  <Cell key={entry.id} fill={getClusterColor(entry.cluster)} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
          
          <div className="mt-4 flex flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-600">Cluster A (Small polar)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-xs text-gray-600">Cluster B (Medium)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-xs text-gray-600">Cluster C (Large lipophilic)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-xs text-gray-600">Cluster D (Polyphenols)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}