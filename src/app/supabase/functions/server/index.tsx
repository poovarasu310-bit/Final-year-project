import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable CORS for all routes and methods - must be before other middleware
app.use(
  "*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization", "apikey"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);

// Enable logger
app.use('*', logger(console.log));

// Handle all OPTIONS requests for CORS preflight
app.options("*", (c) => {
  return c.text("", 204);
});

// Initialize Supabase clients
const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') || '';

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Health check endpoint
app.get("/make-server-1f891a69/health", (c) => {
  return c.json({ status: "ok" }, 200, {
    "Content-Type": "application/json",
  });
});

// User registration endpoint
app.post("/make-server-1f891a69/auth/register", async (c) => {
  try {
    const { email, password, fullName, institution } = await c.req.json();

    if (!email || !password || !fullName) {
      return c.json({ error: "Email, password, and full name are required" }, 400);
    }

    // Create user with admin client
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      user_metadata: { 
        full_name: fullName,
        institution: institution || '',
        role: 'Researcher',
        join_date: new Date().toISOString(),
        is_verified: true
      },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.log('Registration error:', error);
      return c.json({ error: error.message }, 400);
    }

    // Store additional user profile data in KV store
    if (data.user) {
      await kv.set(`user_profile_${data.user.id}`, {
        id: data.user.id,
        email: data.user.email,
        fullName,
        institution: institution || '',
        role: 'Researcher',
        joinDate: new Date().toISOString(),
        isVerified: true,
        stats: {
          plantsViewed: 0,
          compoundsAnalyzed: 0,
          reportsGenerated: 0,
          uploadsContributed: 0
        }
      });
    }

    return c.json({ 
      message: "User registered successfully",
      user: {
        id: data.user?.id,
        email: data.user?.email,
        fullName,
        institution
      }
    });

  } catch (error: any) {
    console.log('Registration error:', error);
    return c.json({ error: "Registration failed: " + error.message }, 500);
  }
});

// Get user profile endpoint
app.get("/make-server-1f891a69/auth/profile", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "No access token provided" }, 401);
    }

    const { data: { user }, error } = await supabaseAdmin.auth.getUser(accessToken);
    
    if (error || !user) {
      console.log('Auth error:', error);
      return c.json({ error: "Unauthorized" }, 401);
    }

    // Get additional profile data from KV store
    const profileData = await kv.get(`user_profile_${user.id}`);
    
    if (profileData) {
      return c.json({ user: profileData });
    } else {
      // Create default profile if not exists
      const defaultProfile = {
        id: user.id,
        email: user.email,
        fullName: user.user_metadata?.full_name || 'User',
        institution: user.user_metadata?.institution || '',
        role: user.user_metadata?.role || 'Researcher',
        joinDate: user.created_at,
        isVerified: true,
        stats: {
          plantsViewed: 0,
          compoundsAnalyzed: 0,
          reportsGenerated: 0,
          uploadsContributed: 0
        }
      };
      
      await kv.set(`user_profile_${user.id}`, defaultProfile);
      return c.json({ user: defaultProfile });
    }

  } catch (error: any) {
    console.log('Profile fetch error:', error);
    return c.json({ error: "Failed to fetch profile: " + error.message }, 500);
  }
});

// Update user profile endpoint
app.put("/make-server-1f891a69/auth/profile", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "No access token provided" }, 401);
    }

    const { data: { user }, error } = await supabaseAdmin.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const updateData = await c.req.json();
    const currentProfile = await kv.get(`user_profile_${user.id}`);
    
    const updatedProfile = {
      ...currentProfile,
      ...updateData,
      id: user.id, // Ensure ID doesn't change
      email: user.email // Ensure email doesn't change via this endpoint
    };

    await kv.set(`user_profile_${user.id}`, updatedProfile);
    
    return c.json({ 
      message: "Profile updated successfully",
      user: updatedProfile 
    });

  } catch (error: any) {
    console.log('Profile update error:', error);
    return c.json({ error: "Failed to update profile: " + error.message }, 500);
  }
});

// Update user stats endpoint
app.post("/make-server-1f891a69/auth/update-stats", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "No access token provided" }, 401);
    }

    const { data: { user }, error } = await supabaseAdmin.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const { statType, increment = 1 } = await c.req.json();
    const currentProfile = await kv.get(`user_profile_${user.id}`);
    
    if (currentProfile && currentProfile.stats && statType in currentProfile.stats) {
      currentProfile.stats[statType] += increment;
      await kv.set(`user_profile_${user.id}`, currentProfile);
      
      return c.json({ 
        message: "Stats updated successfully",
        stats: currentProfile.stats 
      });
    }

    return c.json({ error: "Invalid stat type or profile not found" }, 400);

  } catch (error: any) {
    console.log('Stats update error:', error);
    return c.json({ error: "Failed to update stats: " + error.message }, 500);
  }
});

// ==================== PLANTS ENDPOINTS ====================

// Get all plants
app.get("/make-server-1f891a69/plants", async (c) => {
  try {
    console.log('GET /plants - Fetching plants list...');
    const plantsList = await kv.get('plants:list');
    console.log('Plants list from KV:', plantsList);
    
    if (!plantsList || plantsList.length === 0) {
      console.log('No plants found in database, returning empty array');
      return c.json({ plants: [] });
    }
    
    const plants = [];
    
    for (const id of plantsList) {
      console.log(`Fetching plant: ${id}`);
      const plant = await kv.get(`plant:${id}`);
      if (plant) {
        plants.push(plant);
      } else {
        console.log(`Plant ${id} not found in KV store`);
      }
    }
    
    console.log(`Returning ${plants.length} plants`);
    return c.json({ plants });
  } catch (error: any) {
    console.log('Error fetching plants:', error);
    console.error('Full error:', error);
    return c.json({ error: "Failed to fetch plants: " + error.message }, 500);
  }
});

// Get single plant by ID
app.get("/make-server-1f891a69/plants/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const plant = await kv.get(`plant:${id}`);
    
    if (!plant) {
      return c.json({ error: "Plant not found" }, 404);
    }
    
    return c.json({ plant });
  } catch (error: any) {
    console.log('Error fetching plant:', error);
    return c.json({ error: "Failed to fetch plant: " + error.message }, 500);
  }
});

// Create or update plant
app.post("/make-server-1f891a69/plants", async (c) => {
  try {
    const plantData = await c.req.json();
    
    if (!plantData.id || !plantData.name || !plantData.scientificName) {
      return c.json({ error: "Plant ID, name, and scientific name are required" }, 400);
    }
    
    // Store the plant
    await kv.set(`plant:${plantData.id}`, plantData);
    
    // Update the plants list
    const plantsList = await kv.get('plants:list') || [];
    if (!plantsList.includes(plantData.id)) {
      plantsList.push(plantData.id);
      await kv.set('plants:list', plantsList);
    }
    
    return c.json({ 
      message: "Plant saved successfully",
      plant: plantData 
    });
  } catch (error: any) {
    console.log('Error saving plant:', error);
    return c.json({ error: "Failed to save plant: " + error.message }, 500);
  }
});

// Delete plant
app.delete("/make-server-1f891a69/plants/:id", async (c) => {
  try {
    const id = c.req.param('id');
    
    // Delete the plant
    await kv.del(`plant:${id}`);
    
    // Update the plants list
    const plantsList = await kv.get('plants:list') || [];
    const updatedList = plantsList.filter((plantId: string) => plantId !== id);
    await kv.set('plants:list', updatedList);
    
    return c.json({ message: "Plant deleted successfully" });
  } catch (error: any) {
    console.log('Error deleting plant:', error);
    return c.json({ error: "Failed to delete plant: " + error.message }, 500);
  }
});

// ==================== COMPOUNDS ENDPOINTS ====================

// Get all compounds
app.get("/make-server-1f891a69/compounds", async (c) => {
  try {
    const compoundsList = await kv.get('compounds:list') || [];
    const compounds = [];
    
    for (const id of compoundsList) {
      const compound = await kv.get(`compound:${id}`);
      if (compound) {
        compounds.push(compound);
      }
    }
    
    return c.json({ compounds });
  } catch (error: any) {
    console.log('Error fetching compounds:', error);
    return c.json({ error: "Failed to fetch compounds: " + error.message }, 500);
  }
});

// Get single compound by ID
app.get("/make-server-1f891a69/compounds/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const compound = await kv.get(`compound:${id}`);
    
    if (!compound) {
      return c.json({ error: "Compound not found" }, 404);
    }
    
    return c.json({ compound });
  } catch (error: any) {
    console.log('Error fetching compound:', error);
    return c.json({ error: "Failed to fetch compound: " + error.message }, 500);
  }
});

// Create or update compound
app.post("/make-server-1f891a69/compounds", async (c) => {
  try {
    const compoundData = await c.req.json();
    
    if (!compoundData.id || !compoundData.name || !compoundData.molecularFormula) {
      return c.json({ error: "Compound ID, name, and molecular formula are required" }, 400);
    }
    
    // Store the compound
    await kv.set(`compound:${compoundData.id}`, compoundData);
    
    // Update the compounds list
    const compoundsList = await kv.get('compounds:list') || [];
    if (!compoundsList.includes(compoundData.id)) {
      compoundsList.push(compoundData.id);
      await kv.set('compounds:list', compoundsList);
    }
    
    return c.json({ 
      message: "Compound saved successfully",
      compound: compoundData 
    });
  } catch (error: any) {
    console.log('Error saving compound:', error);
    return c.json({ error: "Failed to save compound: " + error.message }, 500);
  }
});

// Delete compound
app.delete("/make-server-1f891a69/compounds/:id", async (c) => {
  try {
    const id = c.req.param('id');
    
    // Delete the compound
    await kv.del(`compound:${id}`);
    
    // Update the compounds list
    const compoundsList = await kv.get('compounds:list') || [];
    const updatedList = compoundsList.filter((compoundId: string) => compoundId !== id);
    await kv.set('compounds:list', updatedList);
    
    return c.json({ message: "Compound deleted successfully" });
  } catch (error: any) {
    console.log('Error deleting compound:', error);
    return c.json({ error: "Failed to delete compound: " + error.message }, 500);
  }
});

// ==================== PUBCHEM DATA COLLECTION ENDPOINTS ====================

// Fetch compound data from PubChem by name
app.post("/make-server-1f891a69/pubchem/fetch-by-name", async (c) => {
  try {
    const { compoundName } = await c.req.json();
    
    if (!compoundName) {
      return c.json({ error: "Compound name is required" }, 400);
    }

    console.log(`Fetching PubChem data for: ${compoundName}`);
    
    // Fetch from PubChem API
    const url = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(compoundName)}/JSON`;
    const response = await fetch(url);
    
    if (!response.ok) {
      console.log(`PubChem API error: ${response.status} ${response.statusText}`);
      return c.json({ error: `PubChem API error: ${response.statusText}` }, response.status);
    }

    const data = await response.json();
    
    if (!data.PC_Compounds || data.PC_Compounds.length === 0) {
      return c.json({ error: "Compound not found in PubChem" }, 404);
    }

    const compound = data.PC_Compounds[0];
    const props = compound.props || [];
    const cid = compound.id?.id?.cid;

    // Extract properties
    const getProp = (label: string) => {
      const prop = props.find((p: any) => p.urn?.label === label);
      return prop?.value?.fval || prop?.value?.sval || null;
    };

    const compoundInfo = {
      cid: cid,
      name: compoundName,
      iupacName: getProp("IUPAC Name"),
      molecularFormula: getProp("Molecular Formula"),
      molecularWeight: getProp("Molecular Weight"),
      canonicalSmiles: getProp("SMILES") || getProp("Canonical SMILES"),
      isomericSmiles: getProp("Isomeric SMILES"),
      inchi: getProp("InChI"),
      inchiKey: getProp("InChIKey"),
      xlogp: getProp("XLogP"),
      exactMass: getProp("Exact Mass"),
      charge: getProp("Charge"),
      complexity: getProp("Complexity"),
      hBondDonorCount: getProp("Hydrogen Bond Donor Count") || getProp("Count of Hydrogen Bond Donors"),
      hBondAcceptorCount: getProp("Hydrogen Bond Acceptor Count") || getProp("Count of Hydrogen Bond Acceptors"),
      rotatableBondCount: getProp("Rotatable Bond Count"),
      heavyAtomCount: getProp("Heavy Atom Count"),
      fetchedAt: new Date().toISOString(),
      source: "PubChem"
    };

    // Try to fetch bioactivity data
    try {
      const bioactivityUrl = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/assaysummary/JSON`;
      const bioResponse = await fetch(bioactivityUrl);
      if (bioResponse.ok) {
        const bioData = await bioResponse.json();
        compoundInfo.bioactivitySummary = bioData;
      }
    } catch (bioError) {
      console.log('Bioactivity fetch failed (non-critical):', bioError);
    }

    // Store in database with PubChem prefix
    await kv.set(`pubchem:compound:${cid}`, compoundInfo);
    
    // Add to PubChem compounds list
    const pubchemList = await kv.get('pubchem:compounds:list') || [];
    if (!pubchemList.includes(cid)) {
      pubchemList.push(cid);
      await kv.set('pubchem:compounds:list', pubchemList);
    }

    console.log(`Successfully fetched and stored PubChem data for CID: ${cid}`);
    
    return c.json({ 
      message: "PubChem data fetched successfully",
      compound: compoundInfo 
    });

  } catch (error: any) {
    console.log('Error fetching PubChem data:', error);
    return c.json({ error: "Failed to fetch PubChem data: " + error.message }, 500);
  }
});

// Fetch compound data from PubChem by CID
app.post("/make-server-1f891a69/pubchem/fetch-by-cid", async (c) => {
  try {
    const { cid } = await c.req.json();
    
    if (!cid) {
      return c.json({ error: "CID is required" }, 400);
    }

    console.log(`Fetching PubChem data for CID: ${cid}`);
    
    const url = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/JSON`;
    const response = await fetch(url);
    
    if (!response.ok) {
      return c.json({ error: `PubChem API error: ${response.statusText}` }, response.status);
    }

    const data = await response.json();
    const compound = data.PC_Compounds[0];
    const props = compound.props || [];

    const getProp = (label: string) => {
      const prop = props.find((p: any) => p.urn?.label === label);
      return prop?.value?.fval || prop?.value?.sval || null;
    };

    const compoundInfo = {
      cid: cid,
      name: getProp("IUPAC Name") || `CID_${cid}`,
      iupacName: getProp("IUPAC Name"),
      molecularFormula: getProp("Molecular Formula"),
      molecularWeight: getProp("Molecular Weight"),
      canonicalSmiles: getProp("SMILES") || getProp("Canonical SMILES"),
      isomericSmiles: getProp("Isomeric SMILES"),
      inchi: getProp("InChI"),
      inchiKey: getProp("InChIKey"),
      xlogp: getProp("XLogP"),
      exactMass: getProp("Exact Mass"),
      charge: getProp("Charge"),
      complexity: getProp("Complexity"),
      hBondDonorCount: getProp("Hydrogen Bond Donor Count"),
      hBondAcceptorCount: getProp("Hydrogen Bond Acceptor Count"),
      rotatableBondCount: getProp("Rotatable Bond Count"),
      heavyAtomCount: getProp("Heavy Atom Count"),
      fetchedAt: new Date().toISOString(),
      source: "PubChem"
    };

    await kv.set(`pubchem:compound:${cid}`, compoundInfo);
    
    const pubchemList = await kv.get('pubchem:compounds:list') || [];
    if (!pubchemList.includes(cid)) {
      pubchemList.push(cid);
      await kv.set('pubchem:compounds:list', pubchemList);
    }

    return c.json({ 
      message: "PubChem data fetched successfully",
      compound: compoundInfo 
    });

  } catch (error: any) {
    console.log('Error fetching PubChem data:', error);
    return c.json({ error: "Failed to fetch PubChem data: " + error.message }, 500);
  }
});

// Batch fetch compounds from PubChem
app.post("/make-server-1f891a69/pubchem/batch-fetch", async (c) => {
  try {
    const { compoundNames } = await c.req.json();
    
    if (!compoundNames || !Array.isArray(compoundNames)) {
      return c.json({ error: "Array of compound names is required" }, 400);
    }

    console.log(`Batch fetching ${compoundNames.length} compounds from PubChem`);
    
    const results = {
      successful: [],
      failed: []
    };

    for (const name of compoundNames) {
      try {
        const url = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(name)}/JSON`;
        const response = await fetch(url);
        
        if (!response.ok) {
          results.failed.push({ name, error: response.statusText });
          continue;
        }

        const data = await response.json();
        const compound = data.PC_Compounds[0];
        const props = compound.props || [];
        const cid = compound.id?.id?.cid;

        const getProp = (label: string) => {
          const prop = props.find((p: any) => p.urn?.label === label);
          return prop?.value?.fval || prop?.value?.sval || null;
        };

        const compoundInfo = {
          cid: cid,
          name: name,
          iupacName: getProp("IUPAC Name"),
          molecularFormula: getProp("Molecular Formula"),
          molecularWeight: getProp("Molecular Weight"),
          canonicalSmiles: getProp("SMILES") || getProp("Canonical SMILES"),
          isomericSmiles: getProp("Isomeric SMILES"),
          inchi: getProp("InChI"),
          inchiKey: getProp("InChIKey"),
          xlogp: getProp("XLogP"),
          exactMass: getProp("Exact Mass"),
          complexity: getProp("Complexity"),
          hBondDonorCount: getProp("Hydrogen Bond Donor Count"),
          hBondAcceptorCount: getProp("Hydrogen Bond Acceptor Count"),
          rotatableBondCount: getProp("Rotatable Bond Count"),
          heavyAtomCount: getProp("Heavy Atom Count"),
          fetchedAt: new Date().toISOString(),
          source: "PubChem"
        };

        await kv.set(`pubchem:compound:${cid}`, compoundInfo);
        
        const pubchemList = await kv.get('pubchem:compounds:list') || [];
        if (!pubchemList.includes(cid)) {
          pubchemList.push(cid);
          await kv.set('pubchem:compounds:list', pubchemList);
        }

        results.successful.push(compoundInfo);
        
        // Rate limiting - wait 300ms between requests
        await new Promise(resolve => setTimeout(resolve, 300));
        
      } catch (error: any) {
        results.failed.push({ name, error: error.message });
      }
    }

    console.log(`Batch fetch complete: ${results.successful.length} successful, ${results.failed.length} failed`);

    return c.json({ 
      message: "Batch fetch completed",
      results 
    });

  } catch (error: any) {
    console.log('Error in batch fetch:', error);
    return c.json({ error: "Failed to batch fetch: " + error.message }, 500);
  }
});

// Get all PubChem compounds from database
app.get("/make-server-1f891a69/pubchem/compounds", async (c) => {
  try {
    const pubchemList = await kv.get('pubchem:compounds:list') || [];
    const compounds = [];
    
    for (const cid of pubchemList) {
      const compound = await kv.get(`pubchem:compound:${cid}`);
      if (compound) {
        compounds.push(compound);
      }
    }
    
    return c.json({ compounds, count: compounds.length });
  } catch (error: any) {
    console.log('Error fetching PubChem compounds:', error);
    return c.json({ error: "Failed to fetch compounds: " + error.message }, 500);
  }
});

// Get single PubChem compound by CID
app.get("/make-server-1f891a69/pubchem/compounds/:cid", async (c) => {
  try {
    const cid = c.req.param('cid');
    const compound = await kv.get(`pubchem:compound:${cid}`);
    
    if (!compound) {
      return c.json({ error: "Compound not found" }, 404);
    }
    
    return c.json({ compound });
  } catch (error: any) {
    console.log('Error fetching PubChem compound:', error);
    return c.json({ error: "Failed to fetch compound: " + error.message }, 500);
  }
});

// ==================== COMPOUND-PLANT ANALYSIS ENDPOINT ====================

// Analyze compound against plant database to find sources
app.post("/make-server-1f891a69/analyze-compound-plants", async (c) => {
  try {
    const { smiles, compoundName, cid } = await c.req.json();
    
    if (!smiles || !compoundName) {
      return c.json({ error: "SMILES and compound name are required" }, 400);
    }

    console.log(`Analyzing compound: ${compoundName} (${cid}) against plant database`);

    // Get all plants from database
    const plantsList = await kv.get('plants:list') || [];
    const plants = [];
    
    for (const id of plantsList) {
      const plant = await kv.get(`plant:${id}`);
      if (plant) {
        plants.push(plant);
      }
    }

    // Get all compounds from database
    const compoundsList = await kv.get('compounds:list') || [];
    const allCompounds = [];
    
    for (const id of compoundsList) {
      const comp = await kv.get(`compound:${id}`);
      if (comp) {
        allCompounds.push(comp);
      }
    }

    // Analyze functional groups from SMILES (simple detection)
    const functionalGroups = detectFunctionalGroups(smiles);

    // Find matching plants based on compound name or similar compounds
    const plantSources = [];
    
    for (const plant of plants) {
      const primaryCompounds = plant.primaryCompounds || [];
      const matchingCompounds = [];
      let confidence = 'low';

      // Check if compound name matches any primary compounds
      if (primaryCompounds.some((pc: string) => 
        pc.toLowerCase().includes(compoundName.toLowerCase()) ||
        compoundName.toLowerCase().includes(pc.toLowerCase())
      )) {
        matchingCompounds.push(compoundName);
        confidence = 'high';
      }

      // Check functional group overlap
      const plantGroups = plant.functionalGroups || [];
      const groupOverlap = functionalGroups.filter(fg => 
        plantGroups.some((pg: string) => pg.toLowerCase().includes(fg.toLowerCase()))
      );

      if (groupOverlap.length > 2) {
        confidence = confidence === 'high' ? 'high' : 'medium';
        matchingCompounds.push(...primaryCompounds.slice(0, 3));
      } else if (groupOverlap.length > 0 && matchingCompounds.length === 0) {
        matchingCompounds.push(...primaryCompounds.slice(0, 2));
      }

      if (matchingCompounds.length > 0 || groupOverlap.length > 0) {
        plantSources.push({
          plantId: plant.id,
          plantName: plant.name,
          scientificName: plant.scientificName,
          confidence: confidence,
          compounds: [...new Set(matchingCompounds)],
          therapeuticUses: plant.therapeuticTargets || []
        });
      }
    }

    // Sort by confidence
    plantSources.sort((a, b) => {
      const order = { high: 3, medium: 2, low: 1 };
      return order[b.confidence] - order[a.confidence];
    });

    // Determine related diseases based on plant therapeutic targets
    const relatedDiseases = new Set<string>();
    plantSources.forEach(ps => {
      ps.therapeuticUses.forEach((use: string) => relatedDiseases.add(use));
    });

    // Simple bioactivity classification
    const bioactivity = determineBioactivity(functionalGroups, compoundName);

    // Generate disease efficacy profiles
    const diseaseProfiles = generateDiseaseProfiles(compoundName, plantSources, bioactivity);

    console.log(`Found ${plantSources.length} potential plant sources for ${compoundName}`);

    return c.json({
      compoundName,
      smiles,
      cid,
      functionalGroups,
      plantSources,
      relatedDiseases: Array.from(relatedDiseases).slice(0, 10),
      bioactivity,
      diseaseProfiles,
      analyzedAt: new Date().toISOString()
    });

  } catch (error: any) {
    console.log('Error analyzing compound:', error);
    return c.json({ error: "Failed to analyze compound: " + error.message }, 500);
  }
});

// Helper function to detect functional groups from SMILES
function detectFunctionalGroups(smiles: string): string[] {
  const groups = [];
  
  if (smiles.includes('C(=O)O') || smiles.includes('COOH')) groups.push('Carboxyl (-COOH)');
  if (smiles.includes('OH') || smiles.includes('O')) groups.push('Hydroxyl (-OH)');
  if (smiles.includes('C=O')) groups.push('Carbonyl');
  if (smiles.includes('NH2') || smiles.includes('N')) groups.push('Amine');
  if (smiles.includes('C(=O)N')) groups.push('Amide');
  if (smiles.includes('c') || smiles.includes('1')) groups.push('Aromatic Ring');
  if (smiles.includes('C=C')) groups.push('Alkene (C=C)');
  if (smiles.includes('C#C')) groups.push('Alkyne');
  if (smiles.includes('S')) groups.push('Sulfur');
  if (smiles.includes('P')) groups.push('Phosphate');
  if (smiles.includes('Cl')) groups.push('Chlorine');
  if (smiles.includes('F')) groups.push('Fluorine');
  if (smiles.includes('Br')) groups.push('Bromine');
  
  // Phenol detection
  if (smiles.includes('c') && smiles.includes('O')) groups.push('Phenol');
  
  // Ester detection
  if (smiles.includes('C(=O)O') && !smiles.includes('C(=O)OH')) groups.push('Ester');
  
  // Ether detection
  if (smiles.includes('COC') || smiles.includes('O')) groups.push('Ether');
  
  return [...new Set(groups)];
}

// Helper function to determine bioactivity
function determineBioactivity(functionalGroups: string[], compoundName: string): string {
  const name = compoundName.toLowerCase();
  
  // Known compound bioactivities
  if (name.includes('curcumin')) return 'Anti-inflammatory, Antioxidant, Anticancer';
  if (name.includes('resveratrol')) return 'Antioxidant, Cardioprotective, Anti-aging';
  if (name.includes('quercetin')) return 'Antioxidant, Anti-inflammatory, Antiviral';
  if (name.includes('aspirin')) return 'Analgesic, Anti-inflammatory, Antiplatelet';
  if (name.includes('caffeine')) return 'Stimulant, Adenosine Receptor Antagonist';
  if (name.includes('morphine')) return 'Analgesic, Opioid Agonist';
  
  // General functional group bioactivity
  if (functionalGroups.includes('Phenol') && functionalGroups.includes('Aromatic Ring')) {
    return 'Antioxidant, Anti-inflammatory';
  }
  if (functionalGroups.includes('Carboxyl (-COOH)')) {
    return 'Anti-inflammatory, Analgesic';
  }
  if (functionalGroups.includes('Amine')) {
    return 'Neurotransmitter Activity, CNS Effects';
  }
  
  return 'Bioactive Compound';
}

// Helper function to generate disease efficacy profiles
function generateDiseaseProfiles(compoundName: string, plantSources: any[], bioactivity: string): any[] {
  const profiles = [];
  const name = compoundName.toLowerCase();
  
  // Cardiovascular Disease profile
  if (name.includes('resveratrol') || name.includes('quercetin') || bioactivity.includes('Cardioprotective')) {
    profiles.push({
      disease: 'Cardiovascular Disease',
      category: 'Cardioprotective',
      efficacy: name.includes('resveratrol') ? 'High Efficacy' : 'Moderate Efficacy',
      mechanism: 'Modulates lipid metabolism and improves vascular function',
      color: 'yellow'
    });
  }
  
  // Metabolic Syndrome profile
  if (name.includes('curcumin') || name.includes('berberine') || bioactivity.includes('metabolic')) {
    profiles.push({
      disease: 'Metabolic Syndrome',
      category: 'Metabolic Regulator',
      efficacy: 'High Efficacy',
      mechanism: 'Regulates glucose and lipid metabolism through AMPK activation',
      color: 'green'
    });
  }
  
  // Inflammation/Cancer profile
  if (bioactivity.includes('Anti-inflammatory') || bioactivity.includes('Anticancer')) {
    profiles.push({
      disease: 'Chronic Inflammation',
      category: 'Anti-inflammatory',
      efficacy: name.includes('curcumin') ? 'High Efficacy' : 'Moderate Efficacy',
      mechanism: 'Inhibits COX-2 and NF-κB inflammatory pathways',
      color: 'blue'
    });
  }
  
  // Oxidative Stress profile
  if (bioactivity.includes('Antioxidant')) {
    profiles.push({
      disease: 'Oxidative Stress',
      category: 'Antioxidant',
      efficacy: 'Moderate Efficacy',
      mechanism: 'Scavenges free radicals and enhances endogenous antioxidant systems',
      color: 'purple'
    });
  }
  
  // Neurodegenerative Disease profile
  if (name.includes('curcumin') || name.includes('resveratrol') || bioactivity.includes('Neuroprotective')) {
    profiles.push({
      disease: 'Neurodegenerative Diseases',
      category: 'Neuroprotective',
      efficacy: 'Moderate Efficacy',
      mechanism: 'Reduces neuroinflammation and promotes neuronal survival',
      color: 'indigo'
    });
  }
  
  return profiles;
}

// ==================== ANALYSIS CACHE ENDPOINTS ====================

// Check if analysis exists for a SMILES string
app.post("/make-server-1f891a69/analysis-cache/check", async (c) => {
  try {
    const { smiles } = await c.req.json();
    
    if (!smiles) {
      return c.json({ error: "SMILES string is required" }, 400);
    }

    // Simple canonicalization - use the SMILES as-is for now
    const canonicalSmiles = smiles.trim();
    
    // Check if analysis exists for this SMILES with timeout protection
    let cachedAnalysis = null;
    try {
      cachedAnalysis = await Promise.race([
        kv.get(`analysis_cache:${canonicalSmiles}`),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('KV timeout')), 5000)
        )
      ]);
    } catch (kvError: any) {
      console.error('⚠️ KV operation failed:', kvError.message);
      // Return cache miss on KV error
      return c.json({ 
        exists: false,
        canonicalSmiles,
        error: 'Cache temporarily unavailable'
      });
    }
    
    if (cachedAnalysis) {
      console.log(`✅ Found cached analysis for SMILES: ${canonicalSmiles}`);
      return c.json({ 
        exists: true,
        analysis: cachedAnalysis,
        canonicalSmiles
      });
    } else {
      console.log(`❌ No cached analysis found for SMILES: ${canonicalSmiles}`);
      return c.json({ 
        exists: false,
        canonicalSmiles
      });
    }

  } catch (error: any) {
    console.error('❌ Error checking analysis cache:', error);
    return c.json({ 
      error: "Failed to check analysis cache: " + error.message,
      exists: false 
    }, 500);
  }
});

// Save analysis to cache
app.post("/make-server-1f891a69/analysis-cache/save", async (c) => {
  try {
    const { smiles, analysisResults, compoundName, metadata } = await c.req.json();
    
    if (!smiles || !analysisResults) {
      return c.json({ error: "SMILES and analysis results are required" }, 400);
    }

    // Simple canonicalization
    const canonicalSmiles = smiles.trim();
    
    // Store the analysis with timestamp
    const cacheData = {
      canonicalSmiles,
      smiles,
      compoundName: compoundName || 'Unknown Compound',
      analysisResults,
      metadata: metadata || {},
      firstAnalyzedAt: new Date().toISOString(),
      lastAccessedAt: new Date().toISOString()
    };

    // Save with timeout protection
    try {
      await Promise.race([
        kv.set(`analysis_cache:${canonicalSmiles}`, cacheData),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('KV timeout')), 5000)
        )
      ]);
      
      console.log(`✅ Saved analysis to cache for SMILES: ${canonicalSmiles}`);

      return c.json({ 
        message: "Analysis cached successfully",
        canonicalSmiles
      });
    } catch (kvError: any) {
      console.error('⚠️ KV save operation failed:', kvError.message);
      return c.json({ 
        error: "Failed to save to cache: " + kvError.message,
        message: "Analysis completed but not cached"
      }, 200); // Return 200 since analysis succeeded, just caching failed
    }

  } catch (error: any) {
    console.error('❌ Error saving to analysis cache:', error);
    return c.json({ 
      error: "Failed to save to analysis cache: " + error.message,
      message: "Analysis completed but not cached"
    }, 200); // Return 200 since this is non-critical
  }
});

// ==================== FUNCTIONAL GROUPS ENDPOINTS ====================

// Get all functional groups
app.get("/make-server-1f891a69/functional-groups", async (c) => {
  try {
    const functionalGroupsList = await kv.get('functional_groups:list') || [];
    const functionalGroups = [];
    
    for (const name of functionalGroupsList) {
      const group = await kv.get(`functional_group:${name}`);
      if (group) {
        functionalGroups.push(group);
      }
    }
    
    return c.json({ functionalGroups, count: functionalGroups.length });
  } catch (error: any) {
    console.log('Error fetching functional groups:', error);
    return c.json({ error: "Failed to fetch functional groups: " + error.message }, 500);
  }
});

// Save or update functional group
app.post("/make-server-1f891a69/functional-groups", async (c) => {
  try {
    const groupData = await c.req.json();
    
    if (!groupData.name) {
      return c.json({ error: "Functional group name is required" }, 400);
    }
    
    // Store the functional group
    await kv.set(`functional_group:${groupData.name}`, groupData);
    
    // Update the functional groups list
    const functionalGroupsList = await kv.get('functional_groups:list') || [];
    if (!functionalGroupsList.includes(groupData.name)) {
      functionalGroupsList.push(groupData.name);
      await kv.set('functional_groups:list', functionalGroupsList);
    }
    
    return c.json({ 
      message: "Functional group saved successfully",
      functionalGroup: groupData 
    });
  } catch (error: any) {
    console.log('Error saving functional group:', error);
    return c.json({ error: "Failed to save functional group: " + error.message }, 500);
  }
});

// Extract and seed functional groups from existing plants and compounds
app.post("/make-server-1f891a69/seed-functional-groups", async (c) => {
  try {
    console.log('Extracting functional groups from plants and compounds...');
    
    const functionalGroupsMap = new Map();
    
    // Get all plants
    const plantsList = await kv.get('plants:list') || [];
    for (const id of plantsList) {
      const plant = await kv.get(`plant:${id}`);
      if (plant && plant.functionalGroups) {
        for (const fg of plant.functionalGroups) {
          if (!functionalGroupsMap.has(fg)) {
            functionalGroupsMap.set(fg, {
              name: fg,
              count: 0,
              plants: [],
              compounds: []
            });
          }
          const group = functionalGroupsMap.get(fg);
          group.count++;
          group.plants.push(plant.name);
        }
      }
    }
    
    // Get all compounds
    const compoundsList = await kv.get('compounds:list') || [];
    for (const id of compoundsList) {
      const compound = await kv.get(`compound:${id}`);
      if (compound && compound.functionalGroups) {
        for (const fg of compound.functionalGroups) {
          if (!functionalGroupsMap.has(fg)) {
            functionalGroupsMap.set(fg, {
              name: fg,
              count: 0,
              plants: [],
              compounds: []
            });
          }
          const group = functionalGroupsMap.get(fg);
          group.count++;
          group.compounds.push(compound.name);
        }
      }
    }
    
    // Save all functional groups
    const functionalGroupsList = [];
    for (const [name, data] of functionalGroupsMap) {
      await kv.set(`functional_group:${name}`, data);
      functionalGroupsList.push(name);
    }
    
    await kv.set('functional_groups:list', functionalGroupsList);
    
    console.log(`Seeded ${functionalGroupsList.length} functional groups`);
    
    return c.json({ 
      message: "Functional groups seeded successfully",
      count: functionalGroupsList.length,
      functionalGroups: Array.from(functionalGroupsMap.values())
    });
  } catch (error: any) {
    console.log('Error seeding functional groups:', error);
    return c.json({ error: "Failed to seed functional groups: " + error.message }, 500);
  }
});

// ==================== CODE SNIPPETS ENDPOINTS ====================

// Get all code snippets
app.get("/make-server-1f891a69/code-snippets", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "No access token provided" }, 401);
    }

    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(accessToken);
    
    if (authError || !user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const snippetsList = await kv.get(`code_snippets:user:${user.id}`) || [];
    const snippets = [];
    
    for (const id of snippetsList) {
      const snippet = await kv.get(`code_snippet:${id}`);
      if (snippet) {
        snippets.push(snippet);
      }
    }
    
    return c.json({ snippets, count: snippets.length });
  } catch (error: any) {
    console.log('Error fetching code snippets:', error);
    return c.json({ error: "Failed to fetch code snippets: " + error.message }, 500);
  }
});

// Save code snippet
app.post("/make-server-1f891a69/code-snippets", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "No access token provided" }, 401);
    }

    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(accessToken);
    
    if (authError || !user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const snippetData = await c.req.json();
    
    if (!snippetData.title || !snippetData.code) {
      return c.json({ error: "Title and code are required" }, 400);
    }
    
    // Generate unique ID
    const snippetId = `${user.id}_${Date.now()}`;
    
    const fullSnippetData = {
      ...snippetData,
      id: snippetId,
      userId: user.id,
      createdAt: new Date().toISOString()
    };
    
    // Store the snippet
    await kv.set(`code_snippet:${snippetId}`, fullSnippetData);
    
    // Update user's snippets list
    const snippetsList = await kv.get(`code_snippets:user:${user.id}`) || [];
    snippetsList.push(snippetId);
    await kv.set(`code_snippets:user:${user.id}`, snippetsList);
    
    return c.json({ 
      message: "Code snippet saved successfully",
      snippet: fullSnippetData 
    });
  } catch (error: any) {
    console.log('Error saving code snippet:', error);
    return c.json({ error: "Failed to save code snippet: " + error.message }, 500);
  }
});

// Delete code snippet
app.delete("/make-server-1f891a69/code-snippets/:snippetId", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "No access token provided" }, 401);
    }

    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(accessToken);
    
    if (authError || !user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const snippetId = c.req.param('snippetId');
    
    // Verify the snippet belongs to the user
    const snippet = await kv.get(`code_snippet:${snippetId}`);
    
    if (!snippet) {
      return c.json({ error: "Snippet not found" }, 404);
    }

    if (snippet.userId !== user.id) {
      return c.json({ error: "Unauthorized to delete this snippet" }, 403);
    }

    // Delete the snippet
    await kv.del(`code_snippet:${snippetId}`);
    
    // Update user's snippets list
    const snippetsList = await kv.get(`code_snippets:user:${user.id}`) || [];
    const updatedList = snippetsList.filter((id: string) => id !== snippetId);
    await kv.set(`code_snippets:user:${user.id}`, updatedList);

    return c.json({ message: "Code snippet deleted successfully" });
  } catch (error: any) {
    console.log('Error deleting code snippet:', error);
    return c.json({ error: "Failed to delete code snippet: " + error.message }, 500);
  }
});

// ==================== METADATA & STATISTICS ENDPOINTS ====================

// Get database metadata and statistics
app.get("/make-server-1f891a69/metadata", async (c) => {
  try {
    const plantsList = await kv.get('plants:list') || [];
    const compoundsList = await kv.get('compounds:list') || [];
    const functionalGroupsList = await kv.get('functional_groups:list') || [];
    const pubchemList = await kv.get('pubchem:compounds:list') || [];
    
    // Calculate functional groups from plants and compounds if not seeded
    let uniqueFunctionalGroups = new Set();
    
    if (functionalGroupsList.length === 0) {
      // Extract from plants
      for (const id of plantsList) {
        const plant = await kv.get(`plant:${id}`);
        if (plant && plant.functionalGroups) {
          plant.functionalGroups.forEach(fg => uniqueFunctionalGroups.add(fg));
        }
      }
      
      // Extract from compounds
      for (const id of compoundsList) {
        const compound = await kv.get(`compound:${id}`);
        if (compound && compound.functionalGroups) {
          compound.functionalGroups.forEach(fg => uniqueFunctionalGroups.add(fg));
        }
      }
    }
    
    const metadata = {
      totalPlants: plantsList.length,
      totalCompounds: compoundsList.length,
      totalFunctionalGroups: functionalGroupsList.length > 0 ? functionalGroupsList.length : uniqueFunctionalGroups.size,
      totalPubChemCompounds: pubchemList.length,
      lastUpdated: new Date().toISOString(),
      databaseVersion: "2.0.0"
    };
    
    // Store metadata for caching
    await kv.set('metadata:stats', metadata);
    
    return c.json({ metadata });
  } catch (error: any) {
    console.log('Error fetching metadata:', error);
    return c.json({ error: "Failed to fetch metadata: " + error.message }, 500);
  }
});

// ==================== DATA INITIALIZATION/SEEDING ENDPOINT ====================

// Seed comprehensive database with all plants, compounds, and functional groups
app.post("/make-server-1f891a69/seed-data", async (c) => {
  try {
    console.log('🌱 Starting comprehensive data seeding...');
    const { plants, compounds, functionalGroups } = await c.req.json();
    
    let seedResults = {
      plantsSeeded: 0,
      compoundsSeeded: 0,
      functionalGroupsSeeded: 0,
      errors: []
    };

    // Seed Plants
    if (plants && Array.isArray(plants)) {
      console.log(`📦 Seeding ${plants.length} plants...`);
      const plantIds = [];
      
      for (const plant of plants) {
        try {
          if (plant.id && plant.name && plant.scientificName) {
            await kv.set(`plant:${plant.id}`, plant);
            plantIds.push(plant.id);
            seedResults.plantsSeeded++;
          }
        } catch (error: any) {
          seedResults.errors.push(`Plant ${plant.id}: ${error.message}`);
        }
      }
      
      await kv.set('plants:list', plantIds);
      console.log(`✅ Successfully seeded ${seedResults.plantsSeeded} plants`);
    }

    // Seed Compounds
    if (compounds && Array.isArray(compounds)) {
      console.log(`📦 Seeding ${compounds.length} compounds...`);
      const compoundIds = [];
      
      for (const compound of compounds) {
        try {
          if (compound.id && compound.name && compound.molecularFormula) {
            await kv.set(`compound:${compound.id}`, compound);
            compoundIds.push(compound.id);
            seedResults.compoundsSeeded++;
          }
        } catch (error: any) {
          seedResults.errors.push(`Compound ${compound.id}: ${error.message}`);
        }
      }
      
      await kv.set('compounds:list', compoundIds);
      console.log(`✅ Successfully seeded ${seedResults.compoundsSeeded} compounds`);
    }

    // Seed Functional Groups
    if (functionalGroups && Array.isArray(functionalGroups)) {
      console.log(`📦 Seeding ${functionalGroups.length} functional groups...`);
      const groupNames = [];
      
      for (const group of functionalGroups) {
        try {
          if (group.name) {
            await kv.set(`functional_group:${group.name}`, group);
            groupNames.push(group.name);
            seedResults.functionalGroupsSeeded++;
          }
        } catch (error: any) {
          seedResults.errors.push(`Functional group ${group.name}: ${error.message}`);
        }
      }
      
      await kv.set('functional_groups:list', groupNames);
      console.log(`✅ Successfully seeded ${seedResults.functionalGroupsSeeded} functional groups`);
    }

    // Extract and seed functional groups from plants and compounds if not provided
    if (!functionalGroups || functionalGroups.length === 0) {
      console.log('📦 Extracting functional groups from plants and compounds...');
      const functionalGroupsMap = new Map();
      
      // Extract from plants
      if (plants) {
        for (const plant of plants) {
          if (plant.functionalGroups) {
            for (const fg of plant.functionalGroups) {
              if (!functionalGroupsMap.has(fg)) {
                functionalGroupsMap.set(fg, {
                  name: fg,
                  count: 0,
                  plants: [],
                  compounds: []
                });
              }
              const group = functionalGroupsMap.get(fg);
              group.count++;
              group.plants.push(plant.name);
            }
          }
        }
      }
      
      // Extract from compounds
      if (compounds) {
        for (const compound of compounds) {
          if (compound.functionalGroups) {
            for (const fg of compound.functionalGroups) {
              if (!functionalGroupsMap.has(fg)) {
                functionalGroupsMap.set(fg, {
                  name: fg,
                  count: 0,
                  plants: [],
                  compounds: []
                });
              }
              const group = functionalGroupsMap.get(fg);
              group.count++;
              group.compounds.push(compound.name);
            }
          }
        }
      }
      
      // Store extracted functional groups
      const extractedGroups = Array.from(functionalGroupsMap.keys());
      for (const groupName of extractedGroups) {
        const groupData = functionalGroupsMap.get(groupName);
        await kv.set(`functional_group:${groupName}`, groupData);
        seedResults.functionalGroupsSeeded++;
      }
      
      await kv.set('functional_groups:list', extractedGroups);
      console.log(`✅ Extracted and seeded ${seedResults.functionalGroupsSeeded} functional groups`);
    }

    console.log('🎉 Data seeding completed successfully!');
    console.log(`📊 Database Results: ${seedResults.plantsSeeded} plants, ${seedResults.compoundsSeeded} compounds, ${seedResults.functionalGroupsSeeded} functional groups`);
    console.log(`💾 All data saved to Supabase Postgres database (kv_store_1f891a69 table)`);

    return c.json({ 
      message: "Data successfully seeded to Supabase Postgres database",
      results: {
        ...seedResults,
        databaseInfo: {
          timestamp: new Date().toISOString(),
          message: 'All data persisted to Supabase Postgres database (kv_store_1f891a69 table)',
          totalRecords: seedResults.plantsSeeded + seedResults.compoundsSeeded + seedResults.functionalGroupsSeeded
        }
      }
    });

  } catch (error: any) {
    console.error('❌ Error seeding data to database:', error);
    return c.json({ error: "Failed to seed data to database: " + error.message }, 500);
  }
});

// Verify database contents and get statistics
app.get("/make-server-1f891a69/database-stats", async (c) => {
  try {
    console.log('📊 Fetching database statistics from Supabase Postgres...');
    
    const plantsList = await kv.get('plants:list') || [];
    const compoundsList = await kv.get('compounds:list') || [];
    const functionalGroupsList = await kv.get('functional_groups:list') || [];
    const pubchemList = await kv.get('pubchem:compounds:list') || [];
    
    // Sample some actual data to verify it's in the database
    const samplePlant = plantsList.length > 0 ? await kv.get(`plant:${plantsList[0]}`) : null;
    const sampleCompound = compoundsList.length > 0 ? await kv.get(`compound:${compoundsList[0]}`) : null;
    const sampleFunctionalGroup = functionalGroupsList.length > 0 ? await kv.get(`functional_group:${functionalGroupsList[0]}`) : null;
    
    const stats = {
      database: 'Supabase Postgres',
      table: 'kv_store_1f891a69',
      timestamp: new Date().toISOString(),
      counts: {
        plants: plantsList.length,
        compounds: compoundsList.length,
        functionalGroups: functionalGroupsList.length,
        pubchemCompounds: pubchemList.length,
        totalRecords: plantsList.length + compoundsList.length + functionalGroupsList.length + pubchemList.length
      },
      samples: {
        plant: samplePlant ? { id: samplePlant.id, name: samplePlant.name, scientificName: samplePlant.scientificName } : null,
        compound: sampleCompound ? { id: sampleCompound.id, name: sampleCompound.name, molecularFormula: sampleCompound.molecularFormula } : null,
        functionalGroup: sampleFunctionalGroup ? { name: sampleFunctionalGroup.name, count: sampleFunctionalGroup.count } : null
      },
      lists: {
        plantIds: plantsList.slice(0, 10), // First 10 plant IDs
        compoundIds: compoundsList.slice(0, 10), // First 10 compound IDs
        functionalGroupNames: functionalGroupsList.slice(0, 10) // First 10 functional group names
      }
    };
    
    console.log(`✅ Database contains: ${stats.counts.totalRecords} total records`);
    console.log(`   - ${stats.counts.plants} plants`);
    console.log(`   - ${stats.counts.compounds} compounds`);
    console.log(`   - ${stats.counts.functionalGroups} functional groups`);
    console.log(`   - ${stats.counts.pubchemCompounds} PubChem compounds`);
    
    return c.json({ stats });
    
  } catch (error: any) {
    console.error('❌ Error fetching database statistics:', error);
    return c.json({ error: "Failed to fetch database statistics: " + error.message }, 500);
  }
});

Deno.serve(app.fetch);