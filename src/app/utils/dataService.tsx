import { projectId, publicAnonKey } from './supabase/info';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-1f891a69`;

interface Plant {
  id: string;
  name: string;
  tamilName: string;
  scientificName: string;
  image: string;
  compounds: number;
  functionalGroups: string[];
  plantType: string;
  primaryCompounds: string[];
  therapeuticTargets: string[];
  description: string;
}

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

export const dataService = {
  // Plants API
  async getAllPlants(): Promise<Plant[]> {
    // Check if in demo mode
    const demoMode = localStorage.getItem('demo_mode') === 'true';
    
    if (demoMode) {
      const plants = localStorage.getItem('demo_plants');
      return plants ? JSON.parse(plants) : [];
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/plants`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        return [];
      }
      
      const data = await response.json();
      return data.plants || [];
    } catch (error) {
      return [];
    }
  },

  async getPlantById(id: string): Promise<Plant | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/plants/${id}`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });
      
      if (!response.ok) return null;
      
      const data = await response.json();
      return data.plant || null;
    } catch (error) {
      return null;
    }
  },

  async savePlant(plant: Plant): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/plants`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(plant),
      });
      
      return response.ok;
    } catch (error) {
      return false;
    }
  },

  async deletePlant(id: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/plants/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });
      
      return response.ok;
    } catch (error) {
      return false;
    }
  },

  // Compounds API
  async getAllCompounds(): Promise<Compound[]> {
    // Check if in demo mode
    const demoMode = localStorage.getItem('demo_mode') === 'true';
    
    if (demoMode) {
      const compounds = localStorage.getItem('demo_compounds');
      return compounds ? JSON.parse(compounds) : [];
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/compounds`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });
      
      if (!response.ok) return [];
      
      const data = await response.json();
      return data.compounds || [];
    } catch (error) {
      return [];
    }
  },

  async getCompoundById(id: string): Promise<Compound | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/compounds/${id}`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });
      
      if (!response.ok) return null;
      
      const data = await response.json();
      return data.compound || null;
    } catch (error) {
      return null;
    }
  },

  async saveCompound(compound: Compound): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/compounds`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(compound),
      });
      
      return response.ok;
    } catch (error) {
      return false;
    }
  },

  async deleteCompound(id: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/compounds/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });
      
      return response.ok;
    } catch (error) {
      return false;
    }
  },

  // Data seeding
  async seedData(plants: Plant[], compounds: Compound[]): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/seed-data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({ plants, compounds }),
      });
      
      return response.ok;
    } catch (error) {
      return false;
    }
  },

  // Functional Groups API
  async getAllFunctionalGroups(): Promise<any[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/functional-groups`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });
      
      if (!response.ok) return [];
      
      const data = await response.json();
      return data.functionalGroups || [];
    } catch (error) {
      return [];
    }
  },

  async saveFunctionalGroup(group: any): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/functional-groups`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(group),
      });
      
      return response.ok;
    } catch (error) {
      return false;
    }
  },

  async seedFunctionalGroups(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/seed-functional-groups`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });
      
      return response.ok;
    } catch (error) {
      return false;
    }
  },

  // Code Snippets API
  async getAllCodeSnippets(accessToken: string): Promise<any[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/code-snippets`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      
      if (!response.ok) return [];
      
      const data = await response.json();
      return data.snippets || [];
    } catch (error) {
      return [];
    }
  },

  async saveCodeSnippet(snippet: any, accessToken: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/code-snippets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(snippet),
      });
      
      return response.ok;
    } catch (error) {
      return false;
    }
  },

  async deleteCodeSnippet(snippetId: string, accessToken: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/code-snippets/${snippetId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      
      return response.ok;
    } catch (error) {
      return false;
    }
  },

  // Health check
  async checkHealth(): Promise<boolean> {
    try {
      const url = `${API_BASE_URL}/health`;
      console.log('🔍 Health check URL:', url);
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });
      
      console.log('✅ Health check response:', response.status, response.statusText);
      return response.ok;
    } catch (error) {
      console.error('❌ Health check failed:', error);
      return false;
    }
  },

  // Metadata API
  async getMetadata(): Promise<any> {
    try {
      const url = `${API_BASE_URL}/metadata`;
      console.log('🔍 Metadata URL:', url);
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });
      
      console.log('📊 Metadata response status:', response.status);
      
      if (!response.ok) {
        console.error('❌ Metadata fetch failed:', response.status, response.statusText);
        return null;
      }
      
      const data = await response.json();
      console.log('✅ Metadata received:', data);
      return data.metadata || null;
    } catch (error) {
      console.error('❌ Metadata fetch error:', error);
      return null;
    }
  },
};