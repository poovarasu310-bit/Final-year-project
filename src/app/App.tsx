import { useState, useEffect } from "react";
import { TopNavigation } from "./components/TopNavigation";
import { SidebarFilters } from "./components/SidebarFilters";
import { PlantCard } from "./components/PlantCard";
import { CompoundCard } from "./components/CompoundCard";
import { MoleculeViewer } from "./components/MoleculeViewer";
import { KnowledgeGraph } from "./components/KnowledgeGraph";
import { ChartsPanel } from "./components/ChartsPanel";
import { UploadDialog } from "./components/UploadDialog";
import { CompoundAnalysisPage } from "./components/CompoundAnalysisPage";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { DataInitializer } from "./components/DataInitializer";
import { DemoModeBanner } from "./components/DemoModeBanner";
import { OpenAccessBanner } from "./components/OpenAccessBanner";
import { DiseaseCompoundSearch } from "./components/DiseaseCompoundSearch";
import { ReportsPage } from "./components/ReportsPage";
import { MetadataPanel } from "./components/MetadataPanel";
import { CodeSnippetsManager } from "./components/CodeSnippetsManager";
import { ActiveSearchBanner } from "./components/ActiveSearchBanner";
import { dataService } from "./utils/dataService";
import {
  Card,
  CardContent,
  CardHeader,
} from "./components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./components/ui/tabs";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import {
  Search,
  Filter,
  Grid,
  List,
  FileText,
  Leaf,
  Activity,
  Pill,
  Upload,
} from "lucide-react";
import { Input } from "./components/ui/input";
import { Toaster } from "./components/ui/sonner";

// Legacy mock data structure for backward compatibility (will be removed)
const mockPlants_LEGACY = [
  {
    id: "1",
    name: "Echinacea",
    tamilName: "எச்சினேசியா",
    scientificName: "Echinacea purpurea",
    image:
      "https://images.unsplash.com/photo-1723224195494-91b559840f19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY2hpbmFjZWElMjBwdXJwbGUlMjBmbG93ZXIlMjBtZWRpY2luYWx8ZW58MXx8fHwxNzU4ODEzODUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    compounds: 15,
    functionalGroups: [
      "Phenol",
      "Carbonyl",
      "Ester",
      "Hydroxyl (-OH)",
      "Carboxyl (-COOH)",
      "Aromatic Ring",
      "Alkene (C=C)",
      "Amide",
      "Glycoside",
    ],
    plantType: "Herb",
    primaryCompounds: [
      "Cichoric Acid",
      "Echinacoside",
      "Cynarin",
      "Alkamides",
    ],
    therapeuticTargets: [
      "Immune System Modulation",
      "Anti-inflammatory Response",
      "Antiviral Activity",
      "Wound Healing",
    ],
    description:
      "Known for immune system support and anti-inflammatory properties.",
  },
  {
    id: "2",
    name: "Turmeric",
    tamilName: "மஞ்சள்",
    scientificName: "Curcuma longa",
    image:
      "https://images.unsplash.com/photo-1673208126879-18094b40d9cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXJtZXJpYyUyMHJvb3QlMjBnb2xkZW4lMjBzcGljZXxlbnwxfHx8fDE3NTg4MTM4NTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    compounds: 23,
    functionalGroups: [
      "Phenol",
      "Ether",
      "Carbonyl",
      "Hydroxyl (-OH)",
      "Methyl (-CH3)",
      "Aromatic Ring",
      "Alkene (C=C)",
      "Ketone",
      "Benzene Ring",
      "Conjugated System",
    ],
    plantType: "Herb",
    primaryCompounds: [
      "Curcumin",
      "Demethoxycurcumin",
      "Bisdemethoxycurcumin",
      "Turmerone",
    ],
    therapeuticTargets: [
      "COX-2 Inhibition",
      "NF-κB Pathway",
      "Antioxidant Defense",
      "Cancer Cell Apoptosis",
    ],
    description:
      "Rich in curcumin, powerful anti-inflammatory and antioxidant compound.",
  },
  {
    id: "3",
    name: "Ginseng",
    tamilName: "ஜின்செங்",
    scientificName: "Panax ginseng",
    image:
      "https://images.unsplash.com/photo-1726923152938-292c559d4e32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaW5zZW5nJTIwcm9vdCUyMG1lZGljaW5hbCUyMGhlcmJ8ZW58MXx8fHwxNzU4ODEzODUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    compounds: 18,
    functionalGroups: [
      "Glycoside",
      "Hydroxyl (-OH)",
      "Ether",
      "Steroid",
      "Triterpenoid",
      "Saponin",
      "Acetal",
      "Sugar Ring",
      "Cycloalkane",
    ],
    plantType: "Herb",
    primaryCompounds: [
      "Ginsenoside Rb1",
      "Ginsenoside Rg1",
      "Ginsenoside Re",
      "Ginsenoside Rd",
    ],
    therapeuticTargets: [
      "HPA Axis Regulation",
      "Neurotransmitter Balance",
      "Energy Metabolism",
      "Stress Response",
    ],
    description:
      "Adaptogenic herb known for energy enhancement and stress reduction.",
  },
  {
    id: "4",
    name: "Aloe Vera",
    tamilName: "கற்றாழை",
    scientificName: "Aloe barbadensis",
    image:
      "https://images.unsplash.com/photo-1643717101835-ea24088aef16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbG9lJTIwdmVyYSUyMHBsYW50JTIwc3VjY3VsZW50fGVufDF8fHx8MTc1ODgxMzg1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    compounds: 12,
    functionalGroups: [
      "Hydroxyl (-OH)",
      "Glycoside",
      "Ester",
      "Anthraquinone",
      "Polysaccharide",
      "Carboxyl (-COOH)",
      "Aromatic Ring",
      "Phenol",
    ],
    plantType: "Succulent",
    primaryCompounds: [
      "Aloin",
      "Aloesin",
      "Acemannan",
      "Barbaloin",
    ],
    therapeuticTargets: [
      "Wound Healing",
      "Anti-inflammatory",
      "Digestive Health",
      "Skin Regeneration",
    ],
    description:
      "Soothing and healing properties for skin and digestive health.",
  },
  {
    id: "5",
    name: "Green Tea",
    tamilName: "பச்சை தேநீர்",
    scientificName: "Camellia sinensis",
    image:
      "https://images.unsplash.com/photo-1749801463959-954dc2f5be52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMHRlYSUyMGxlYXZlcyUyMHBsYW50fGVufDF8fHx8MTc1ODgxMzg1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    compounds: 20,
    functionalGroups: [
      "Phenol",
      "Hydroxyl (-OH)",
      "Aromatic Ring",
      "Catechol",
      "Gallate",
      "Ester",
      "Flavonoid",
      "Polyphenol",
      "Amino (-NH2)",
      "Carboxyl (-COOH)",
    ],
    plantType: "Shrub",
    primaryCompounds: [
      "EGCG",
      "ECG",
      "EGC",
      "Catechin",
      "L-Theanine",
    ],
    therapeuticTargets: [
      "Cardiovascular Health",
      "Neuroprotection",
      "Cancer Prevention",
      "Metabolic Regulation",
    ],
    description:
      "Rich in catechins and antioxidants, supports cardiovascular health.",
  },
  {
    id: "6",
    name: "Lavender",
    tamilName: "லாவென்டர்",
    scientificName: "Lavandula angustifolia",
    image:
      "https://images.unsplash.com/photo-1749983202660-69402e9e0ca2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXZlbmRlciUyMHB1cnBsZSUyMGZsb3dlcnMlMjBmaWVsZCUyMG1lZGljaW5hbHxlbnwxfHx8fDE3NTg4MTQ1NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    compounds: 16,
    functionalGroups: [
      "Alcohol",
      "Ester",
      "Terpene",
      "Ketone",
      "Monoterpene",
      "Alkene (C=C)",
      "Ether",
      "Hydroxyl (-OH)",
      "Methyl (-CH3)",
    ],
    plantType: "Herb",
    primaryCompounds: [
      "Linalool",
      "Linalyl Acetate",
      "Camphor",
      "Eucalyptol",
    ],
    therapeuticTargets: [
      "GABA Receptors",
      "Anxiety Reduction",
      "Sleep Promotion",
      "Antimicrobial Activity",
    ],
    description:
      "Renowned for its calming properties and therapeutic essential oils used in aromatherapy.",
  },
  {
    id: "7",
    name: "Elderberry",
    tamilName: "முதியவர் பெர்ரி",
    scientificName: "Sambucus nigra",
    image:
      "https://images.unsplash.com/photo-1584710695057-03447e06c87f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGRlcmJlcnJ5JTIwc2FtYnVjdXMlMjBuaWdyYSUyMGRhcmslMjBwdXJwbGUlMjBiZXJyaWVzJTIwbWVkaWNpbmFsfGVufDF8fHx8MTc1ODgxNDk0NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    compounds: 19,
    functionalGroups: [
      "Anthocyanin",
      "Phenol",
      "Glycoside",
      "Flavonoid",
      "Hydroxyl (-OH)",
      "Aromatic Ring",
      "Sugar Ring",
      "Rutinoside",
      "Cyanogenic Glycoside",
      "Polyphenol",
    ],
    plantType: "Tree",
    primaryCompounds: [
      "Cyanidin-3-glucoside",
      "Quercetin-3-rutinoside",
      "Sambunigrin",
      "Chlorogenic Acid",
    ],
    therapeuticTargets: [
      "Immune System Support",
      "Antiviral Activity",
      "Upper Respiratory Health",
      "Oxidative Stress",
    ],
    description:
      "Rich in anthocyanins and flavonoids, traditionally used for immune support and respiratory health.",
  },
  {
    id: "8",
    name: "Guggul",
    tamilName: "குக்குல்",
    scientificName: "Commiphora mukul",
    image:
      "https://images.unsplash.com/photo-1610643084001-0dac29ca151a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxndWdndWwlMjBjb21taXBob3JhJTIwbXVrdWwlMjByZXNpbiUyMHRyZWUlMjBtZWRpY2luYWx8ZW58MXx8fHwxNzU4ODE1MDYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    compounds: 14,
    functionalGroups: [
      "Steroid",
      "Ketone",
      "Ester",
      "Terpene",
      "Triterpenoid",
      "Carboxyl (-COOH)",
      "Cycloalkane",
      "Hydroxyl (-OH)",
      "Methyl (-CH3)",
    ],
    plantType: "Tree",
    primaryCompounds: [
      "Guggulsterone E",
      "Guggulsterone Z",
      "Myrrhanone A",
      "Commiphoric Acid",
    ],
    therapeuticTargets: [
      "Cholesterol Metabolism",
      "Lipid Regulation",
      "Anti-inflammatory",
      "Thyroid Function",
    ],
    description:
      "Traditional Ayurvedic resin known for cholesterol management and metabolic support with unique steroid compounds.",
  },
  {
    id: "9",
    name: "Medicinal Herbs",
    tamilName: "மருத்துவ மூலிகைகள்",
    scientificName: "Various species",
    image:
      "https://images.unsplash.com/photo-1758244129314-9061e71ec193?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2luYWwlMjBoZXJicyUyMGRyaWVkJTIwYm90YW5pY2FsfGVufDF8fHx8MTc1ODgxMzg1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    compounds: 35,
    functionalGroups: [
      "Phenol",
      "Flavonoid",
      "Alkaloid",
      "Saponin",
      "Tannin",
      "Glycoside",
      "Terpenoid",
      "Essential Oil",
      "Coumarin",
      "Quinone",
      "Stilbene",
    ],
    plantType: "Herb",
    primaryCompounds: [
      "Quercetin",
      "Resveratrol",
      "Kaempferol",
      "Rutin",
    ],
    therapeuticTargets: [
      "Multiple Pathways",
      "Antioxidant Systems",
      "Inflammation Control",
      "Immune Support",
    ],
    description:
      "Collection of traditional medicinal plants with diverse therapeutic properties.",
  },
];

const mockCompounds = [
  // Echinacea compounds
  {
    id: "1",
    name: "Cichoric Acid",
    molecularFormula: "C22H18O12",
    molecularWeight: 474.37,
    logP: 0.9,
    functionalGroups: [
      "Carboxyl (-COOH)",
      "Phenol",
      "Ester",
      "Alkene (C=C)",
      "Hydroxyl (-OH)",
    ],
    smiles:
      "O=C(O)/C=C/c1ccc(O)c(O)c1.O=C(O)/C=C/c2ccc(O)c(O)c2",
    plantSources: ["Echinacea"],
    bioactivity: "Antiviral, Immunomodulatory, Antioxidant",
    drugLikeness: "Poor (MW > 450)",
    thumbnail: "",
  },
  {
    id: "2",
    name: "Echinacoside",
    molecularFormula: "C35H46O20",
    molecularWeight: 786.73,
    logP: -1.2,
    functionalGroups: [
      "Glycoside",
      "Phenol",
      "Hydroxyl (-OH)",
      "Ester",
      "Aromatic Ring",
    ],
    smiles:
      "COc1cc(/C=C/CO[C@@H]2O[C@H](CO)[C@@H](O)[C@H](O)[C@H]2O[C@@H]3O[C@H](CO)[C@@H](O)[C@H](O)[C@H]3O)ccc1O",
    plantSources: ["Echinacea"],
    bioactivity:
      "Anti-inflammatory, Neuroprotective, Antioxidant",
    drugLikeness: "Poor (MW > 500)",
    thumbnail: "",
  },
  {
    id: "3",
    name: "Cynarin",
    molecularFormula: "C25H24O12",
    molecularWeight: 516.45,
    logP: 1.1,
    functionalGroups: [
      "Carboxyl (-COOH)",
      "Hydroxyl (-OH)",
      "Ester",
      "Aromatic Ring",
      "Phenol",
    ],
    smiles:
      "O=C(O[C@H]1[C@@H](OC(=O)/C=C/c2ccc(O)c(O)c2)[C@H](O)[C@@H](O)[C@H](O)[C@H]1O)/C=C/c3ccc(O)c(O)c3",
    plantSources: ["Echinacea"],
    bioactivity: "Hepatoprotective, Choleretic, Antioxidant",
    drugLikeness: "Poor (MW > 500)",
    thumbnail: "",
  },
  {
    id: "4",
    name: "Alkamides",
    molecularFormula: "C18H35NO",
    molecularWeight: 281.48,
    logP: 5.2,
    functionalGroups: [
      "Amide",
      "Alkene (C=C)",
      "Methyl (-CH3)",
      "Carbonyl",
    ],
    smiles: "CCCCCCCCCC/C=C/C=C/C(=O)NCCCC",
    plantSources: ["Echinacea"],
    bioactivity:
      "Immunomodulatory, Anti-inflammatory, Analgesic",
    drugLikeness: "Good",
    thumbnail: "",
  },
  // Turmeric compounds
  {
    id: "5",
    name: "Curcumin",
    molecularFormula: "C21H20O6",
    molecularWeight: 368.38,
    logP: 4.2,
    functionalGroups: [
      "Phenol",
      "Ether",
      "Carbonyl",
      "Alkene (C=C)",
      "Hydroxyl (-OH)",
      "Methyl (-CH3)",
    ],
    smiles: "COc1cc(/C=C/C(=O)CC(=O)/C=C/c2ccc(O)c(OC)c2)ccc1O",
    plantSources: ["Turmeric"],
    bioactivity: "Anti-inflammatory, Antioxidant, Anticancer",
    drugLikeness: "Moderate",
    thumbnail: "",
  },
  {
    id: "6",
    name: "Demethoxycurcumin",
    molecularFormula: "C20H18O5",
    molecularWeight: 338.35,
    logP: 3.8,
    functionalGroups: [
      "Phenol",
      "Carbonyl",
      "Alkene (C=C)",
      "Hydroxyl (-OH)",
      "Methyl (-CH3)",
    ],
    smiles: "COc1cc(/C=C/C(=O)CC(=O)/C=C/c2ccc(O)cc2)ccc1O",
    plantSources: ["Turmeric"],
    bioactivity:
      "Anti-inflammatory, Antioxidant, Neuroprotective",
    drugLikeness: "Good",
    thumbnail: "",
  },
  {
    id: "7",
    name: "Bisdemethoxycurcumin",
    molecularFormula: "C19H16O4",
    molecularWeight: 308.33,
    logP: 3.5,
    functionalGroups: [
      "Phenol",
      "Carbonyl",
      "Alkene (C=C)",
      "Hydroxyl (-OH)",
      "Aromatic Ring",
    ],
    smiles: "O=C(CC(=O)/C=C/c1ccc(O)cc1)/C=C/c2ccc(O)cc2",
    plantSources: ["Turmeric"],
    bioactivity: "Antioxidant, Anti-inflammatory, Anticancer",
    drugLikeness: "Good",
    thumbnail: "",
  },
  {
    id: "8",
    name: "Turmerone",
    molecularFormula: "C15H22O",
    molecularWeight: 218.33,
    logP: 4.1,
    functionalGroups: [
      "Ketone",
      "Methyl (-CH3)",
      "Aromatic Ring",
      "Alkene (C=C)",
    ],
    smiles: "CC(C)=CCCC(C)=CC(=O)c1ccc(C)cc1",
    plantSources: ["Turmeric"],
    bioactivity:
      "Neuroprotective, Anti-inflammatory, Antimicrobial",
    drugLikeness: "Excellent",
    thumbnail: "",
  },
  // Ginseng compounds
  {
    id: "9",
    name: "Ginsenoside Rb1",
    molecularFormula: "C54H92O23",
    molecularWeight: 1109.29,
    logP: -2.1,
    functionalGroups: [
      "Glycoside",
      "Hydroxyl (-OH)",
      "Ether",
      "Steroid",
      "Sugar Ring",
    ],
    smiles:
      "C[C@H]1O[C@@H](O[C@H]2[C@@H](O)[C@H](O)[C@@H](CO)O[C@H]2O[C@H]3CC[C@]4(C)[C@H](CC[C@@]5(C)[C@@H]4CC[C@]6(C)[C@H]5CC[C@@H](O[C@H]7O[C@H](CO)[C@@H](O)[C@H](O)[C@H]7O[C@H]8O[C@H](CO)[C@@H](O)[C@H](O)[C@H]8O)C6(C)C)C3(C)C)[C@H](O)[C@H](O)[C@H]1O",
    plantSources: ["Ginseng"],
    bioactivity: "Adaptogenic, Neuroprotective, Anti-fatigue",
    drugLikeness: "Poor (MW > 500)",
    thumbnail: "",
  },
  {
    id: "10",
    name: "Ginsenoside Rg1",
    molecularFormula: "C42H72O14",
    molecularWeight: 801.01,
    logP: -0.8,
    functionalGroups: [
      "Glycoside",
      "Hydroxyl (-OH)",
      "Steroid",
      "Sugar Ring",
      "Ether",
    ],
    smiles:
      "C[C@H]1O[C@@H](O[C@H]2[C@@H](O)[C@H](O)[C@@H](CO)O[C@H]2O[C@H]3CC[C@]4(C)[C@H](CC[C@@]5(C)[C@@H]4CC=C6[C@H]5CC[C@@H](O[C@H]7O[C@H](CO)[C@@H](O)[C@H](O)[C@H]7O)C6(C)C)C3(C)C)[C@H](O)[C@H](O)[C@H]1O",
    plantSources: ["Ginseng"],
    bioactivity:
      "Cognitive Enhancement, Neuroprotective, Anti-aging",
    drugLikeness: "Poor (MW > 500)",
    thumbnail: "",
  },
  {
    id: "11",
    name: "Ginsenoside Re",
    molecularFormula: "C48H82O18",
    molecularWeight: 947.15,
    logP: -1.5,
    functionalGroups: [
      "Glycoside",
      "Hydroxyl (-OH)",
      "Steroid",
      "Sugar Ring",
      "Ether",
    ],
    smiles:
      "C[C@H]1O[C@@H](O[C@H]2[C@@H](O)[C@H](O)[C@@H](CO)O[C@H]2O[C@H]3CC[C@]4(C)[C@H](CC[C@@]5(C)[C@@H]4CC=C6[C@H]5CC[C@@H](O[C@H]7O[C@H](CO)[C@@H](O)[C@H](O)[C@H]7O[C@H]8O[C@H](CO)[C@@H](O)[C@H](O)[C@H]8O)C6(C)C)C3(C)C)[C@H](O)[C@H](O)[C@H]1O",
    plantSources: ["Ginseng"],
    bioactivity:
      "Cardiovascular Protection, Anti-diabetic, Immunomodulatory",
    drugLikeness: "Poor (MW > 500)",
    thumbnail: "",
  },
  {
    id: "12",
    name: "Ginsenoside Rd",
    molecularFormula: "C48H82O18",
    molecularWeight: 947.15,
    logP: -1.3,
    functionalGroups: [
      "Glycoside",
      "Hydroxyl (-OH)",
      "Steroid",
      "Sugar Ring",
      "Ether",
    ],
    smiles:
      "C[C@H]1O[C@@H](O[C@H]2[C@@H](O)[C@H](O)[C@@H](CO)O[C@H]2O[C@H]3CC[C@]4(C)[C@H](CC[C@@]5(C)[C@@H]4CC[C@]6(C)[C@H]5CC[C@@H](O[C@H]7O[C@H](CO)[C@@H](O)[C@H](O)[C@H]7O[C@H]8O[C@H](CO)[C@@H](O)[C@H](O)[C@H]8O)C6(C)C)C3(C)C)[C@H](O)[C@H](O)[C@H]1O",
    plantSources: ["Ginseng"],
    bioactivity:
      "Neuroprotective, Anti-inflammatory, Memory Enhancement",
    drugLikeness: "Poor (MW > 500)",
    thumbnail: "",
  },
  // Aloe Vera compounds
  {
    id: "13",
    name: "Aloin",
    molecularFormula: "C21H22O9",
    molecularWeight: 418.39,
    logP: 0.5,
    functionalGroups: [
      "Glycoside",
      "Phenol",
      "Carbonyl",
      "Hydroxyl (-OH)",
      "Anthraquinone",
    ],
    smiles:
      "COc1cc2C(=O)c3c(O)cc(C[C@H](O)[C@H](O)[C@H](O)CO)cc3C(=O)c2cc1C",
    plantSources: ["Aloe Vera"],
    bioactivity: "Laxative, Antimicrobial, Anti-inflammatory",
    drugLikeness: "Moderate",
    thumbnail: "",
  },
  {
    id: "14",
    name: "Aloesin",
    molecularFormula: "C19H22O9",
    molecularWeight: 394.37,
    logP: -0.2,
    functionalGroups: [
      "Glycoside",
      "Phenol",
      "Hydroxyl (-OH)",
      "Carbonyl",
      "Aromatic Ring",
    ],
    smiles:
      "O=C(c1ccc(O[C@@H]2O[C@H](CO)[C@@H](O)[C@H](O)[C@H]2O)c(O)c1O)C(=O)O",
    plantSources: ["Aloe Vera"],
    bioactivity:
      "Skin Whitening, UV Protection, Anti-inflammatory",
    drugLikeness: "Good",
    thumbnail: "",
  },
  {
    id: "15",
    name: "Acemannan",
    molecularFormula: "C6H10O5",
    molecularWeight: 162.14,
    logP: -2.8,
    functionalGroups: [
      "Polysaccharide",
      "Hydroxyl (-OH)",
      "Glycoside",
      "Carboxyl (-COOH)",
    ],
    smiles:
      "O[C@H]1[C@H](O)[C@H](O[C@H]2[C@H](O)[C@H](O)[C@H](O)O[C@H]2CO)[C@H](O)[C@H](CO)O1",
    plantSources: ["Aloe Vera"],
    bioactivity: "Immunomodulatory, Wound Healing, Anti-cancer",
    drugLikeness: "Poor (Polysaccharide)",
    thumbnail: "",
  },
  {
    id: "16",
    name: "Barbaloin",
    molecularFormula: "C21H22O9",
    molecularWeight: 418.39,
    logP: 0.7,
    functionalGroups: [
      "Anthraquinone",
      "Glycoside",
      "Phenol",
      "Hydroxyl (-OH)",
      "Carbonyl",
    ],
    smiles:
      "COc1cc2C(=O)c3c(O)cc(C[C@H](O)[C@H](O)[C@H](O)CO)cc3C(=O)c2c(O)c1",
    plantSources: ["Aloe Vera"],
    bioactivity: "Antimicrobial, Laxative, Anti-inflammatory",
    drugLikeness: "Moderate",
    thumbnail: "",
  },
  // Green Tea compounds
  {
    id: "17",
    name: "EGCG",
    molecularFormula: "C22H18O11",
    molecularWeight: 458.37,
    logP: 1.2,
    functionalGroups: [
      "Phenol",
      "Hydroxyl (-OH)",
      "Ester",
      "Aromatic Ring",
      "Catechol",
      "Gallate",
    ],
    smiles:
      "O=C(O[C@H]1Cc2c(O)cc(O)cc2O[C@@H]1c3cc(O)c(O)c(O)c3)c4cc(O)c(O)c(O)c4",
    plantSources: ["Green Tea"],
    bioactivity: "Antioxidant, Anticancer, Cardioprotective",
    drugLikeness: "Moderate",
    thumbnail: "",
  },
  {
    id: "18",
    name: "ECG",
    molecularFormula: "C22H18O10",
    molecularWeight: 442.37,
    logP: 1.8,
    functionalGroups: [
      "Phenol",
      "Hydroxyl (-OH)",
      "Ester",
      "Aromatic Ring",
      "Catechol",
    ],
    smiles:
      "O=C(O[C@H]1Cc2c(O)cc(O)cc2O[C@@H]1c3ccc(O)c(O)c3)c4cc(O)c(O)c(O)c4",
    plantSources: ["Green Tea"],
    bioactivity:
      "Antioxidant, Anti-inflammatory, Neuroprotective",
    drugLikeness: "Moderate",
    thumbnail: "",
  },
  {
    id: "19",
    name: "EGC",
    molecularFormula: "C15H14O7",
    molecularWeight: 306.27,
    logP: 0.9,
    functionalGroups: [
      "Phenol",
      "Hydroxyl (-OH)",
      "Aromatic Ring",
      "Catechol",
      "Flavonoid",
    ],
    smiles: "O[C@H]1Cc2c(O)cc(O)cc2O[C@@H]1c3cc(O)c(O)c(O)c3",
    plantSources: ["Green Tea"],
    bioactivity:
      "Antioxidant, Anti-inflammatory, Hepatoprotective",
    drugLikeness: "Good",
    thumbnail: "",
  },
  {
    id: "20",
    name: "Catechin",
    molecularFormula: "C15H14O6",
    molecularWeight: 290.27,
    logP: 1.1,
    functionalGroups: [
      "Phenol",
      "Hydroxyl (-OH)",
      "Aromatic Ring",
      "Flavonoid",
      "Catechol",
    ],
    smiles: "O[C@H]1Cc2c(O)cc(O)cc2O[C@@H]1c3ccc(O)c(O)c3",
    plantSources: ["Green Tea"],
    bioactivity: "Antioxidant, Cardioprotective, Anti-diabetic",
    drugLikeness: "Good",
    thumbnail: "",
  },
  {
    id: "21",
    name: "L-Theanine",
    molecularFormula: "C7H14N2O3",
    molecularWeight: 174.2,
    logP: -1.2,
    functionalGroups: [
      "Amino (-NH2)",
      "Carboxyl (-COOH)",
      "Amide",
    ],
    smiles: "CCCCNC(=O)C[C@H](N)C(=O)O",
    plantSources: ["Green Tea"],
    bioactivity:
      "Anxiolytic, Cognitive Enhancement, Neuroprotective",
    drugLikeness: "Excellent",
    thumbnail: "",
  },
  // Lavender compounds
  {
    id: "22",
    name: "Linalool",
    molecularFormula: "C10H18O",
    molecularWeight: 154.25,
    logP: 2.8,
    functionalGroups: [
      "Alcohol",
      "Terpene",
      "Monoterpene",
      "Hydroxyl (-OH)",
      "Alkene (C=C)",
    ],
    smiles: "CC(C)=CCC[C@@](C)(O)/C=C/C",
    plantSources: ["Lavender"],
    bioactivity: "Anxiolytic, Sedative, Antimicrobial",
    drugLikeness: "Excellent",
    thumbnail: "",
  },
  {
    id: "23",
    name: "Linalyl Acetate",
    molecularFormula: "C12H20O2",
    molecularWeight: 196.29,
    logP: 3.2,
    functionalGroups: [
      "Ester",
      "Terpene",
      "Monoterpene",
      "Carbonyl",
    ],
    smiles: "CC(=O)OC(C)(C=CC)/C=C/C(C)C",
    plantSources: ["Lavender"],
    bioactivity: "Sedative, Anti-inflammatory, Analgesic",
    drugLikeness: "Excellent",
    thumbnail: "",
  },
  {
    id: "24",
    name: "Camphor",
    molecularFormula: "C10H16O",
    molecularWeight: 152.23,
    logP: 2.4,
    functionalGroups: ["Ketone", "Terpene", "Cycloalkane"],
    smiles: "CC1(C)C2CCC1(C)C(=O)C2",
    plantSources: ["Lavender"],
    bioactivity: "Analgesic, Antimicrobial, Decongestant",
    drugLikeness: "Excellent",
    thumbnail: "",
  },
  {
    id: "25",
    name: "Eucalyptol",
    molecularFormula: "C10H18O",
    molecularWeight: 154.25,
    logP: 2.9,
    functionalGroups: [
      "Ether",
      "Terpene",
      "Monoterpene",
      "Cycloalkane",
    ],
    smiles: "CC1CCC2(C)OC1CC2(C)C",
    plantSources: ["Lavender"],
    bioactivity:
      "Expectorant, Anti-inflammatory, Antimicrobial",
    drugLikeness: "Excellent",
    thumbnail: "",
  },
  // Elderberry compounds
  {
    id: "26",
    name: "Cyanidin-3-glucoside",
    molecularFormula: "C21H21O11",
    molecularWeight: 449.39,
    logP: 0.3,
    functionalGroups: [
      "Anthocyanin",
      "Glycoside",
      "Phenol",
      "Hydroxyl (-OH)",
      "Sugar Ring",
    ],
    smiles:
      "O[C@@H]1[C@H](O)[C@@H](O)[C@H](O)[C@H](COc2cc3c(O)cc(O)cc3[o+]c2-c4ccc(O)c(O)c4)O1",
    plantSources: ["Elderberry"],
    bioactivity:
      "Antioxidant, Anti-inflammatory, Cardioprotective",
    drugLikeness: "Moderate",
    thumbnail: "",
  },
  {
    id: "27",
    name: "Quercetin-3-rutinoside",
    molecularFormula: "C27H30O16",
    molecularWeight: 610.52,
    logP: -0.5,
    functionalGroups: [
      "Flavonoid",
      "Glycoside",
      "Rutinoside",
      "Phenol",
      "Hydroxyl (-OH)",
    ],
    smiles:
      "O=c1c(O[C@@H]2O[C@H](CO[C@@H]3O[C@@H](C)[C@H](O)[C@@H](O)[C@H]3O)[C@@H](O)[C@H](O)[C@H]2O)c(-c4ccc(O)c(O)c4)oc5cc(O)cc(O)c15",
    plantSources: ["Elderberry"],
    bioactivity:
      "Antiviral, Anti-inflammatory, Vascular Protection",
    drugLikeness: "Poor (MW > 500)",
    thumbnail: "",
  },
  {
    id: "28",
    name: "Sambunigrin",
    molecularFormula: "C14H17NO6",
    molecularWeight: 295.29,
    logP: 0.8,
    functionalGroups: [
      "Cyanogenic Glycoside",
      "Glycoside",
      "Hydroxyl (-OH)",
      "Aromatic Ring",
    ],
    smiles:
      "N#CC(O[C@@H]1O[C@H](CO)[C@@H](O)[C@H](O)[C@H]1O)c2ccccc2",
    plantSources: ["Elderberry"],
    bioactivity: "Antimicrobial, Antitussive (Precursor)",
    drugLikeness: "Good",
    thumbnail: "",
  },
  {
    id: "29",
    name: "Chlorogenic Acid",
    molecularFormula: "C16H18O9",
    molecularWeight: 354.31,
    logP: 0.6,
    functionalGroups: [
      "Phenol",
      "Carboxyl (-COOH)",
      "Ester",
      "Hydroxyl (-OH)",
      "Aromatic Ring",
    ],
    smiles:
      "O=C(O[C@H]1[C@@H](O)[C@H](O)[C@@H](O)[C@H](C(=O)O)O1)/C=C/c2ccc(O)c(O)c2",
    plantSources: ["Elderberry"],
    bioactivity: "Antioxidant, Anti-diabetic, Hepatoprotective",
    drugLikeness: "Good",
    thumbnail: "",
  },
  // Guggul compounds
  {
    id: "30",
    name: "Guggulsterone E",
    molecularFormula: "C21H28O2",
    molecularWeight: 312.45,
    logP: 4.8,
    functionalGroups: [
      "Steroid",
      "Ketone",
      "Alkene (C=C)",
      "Cycloalkane",
    ],
    smiles:
      "CC(C)=CCC[C@]1(C)CC[C@H]2[C@@H]3CC=C4C[C@H](O)CC[C@]4(C)[C@H]3CC[C@]21C",
    plantSources: ["Guggul"],
    bioactivity:
      "Hypolipidemic, Anti-inflammatory, Thyroid Modulation",
    drugLikeness: "Good",
    thumbnail: "",
  },
  {
    id: "31",
    name: "Guggulsterone Z",
    molecularFormula: "C21H28O2",
    molecularWeight: 312.45,
    logP: 4.6,
    functionalGroups: [
      "Steroid",
      "Ketone",
      "Alkene (C=C)",
      "Cycloalkane",
    ],
    smiles:
      "CC(C)=CCC[C@]1(C)CC[C@H]2[C@@H]3CC=C4C[C@H](O)CC[C@]4(C)[C@H]3CC[C@]21C",
    plantSources: ["Guggul"],
    bioactivity:
      "Cholesterol Reduction, Anti-inflammatory, Cardioprotective",
    drugLikeness: "Good",
    thumbnail: "",
  },
  {
    id: "32",
    name: "Myrrhanone A",
    molecularFormula: "C30H38O4",
    molecularWeight: 462.62,
    logP: 5.2,
    functionalGroups: [
      "Triterpenoid",
      "Ketone",
      "Hydroxyl (-OH)",
      "Cycloalkane",
    ],
    smiles:
      "CC1CCC2(C(=O)O)CCC3(C)C(=CCC4C5(C)CCC(O)C(C)(C)C5CCC43C)C2C1C",
    plantSources: ["Guggul"],
    bioactivity:
      "Anti-inflammatory, Antimicrobial, Hepatoprotective",
    drugLikeness: "Moderate",
    thumbnail: "",
  },
  {
    id: "33",
    name: "Commiphoric Acid",
    molecularFormula: "C24H34O4",
    molecularWeight: 386.53,
    logP: 4.1,
    functionalGroups: [
      "Triterpenoid",
      "Carboxyl (-COOH)",
      "Hydroxyl (-OH)",
      "Cycloalkane",
    ],
    smiles:
      "CC1CCC2(C(=O)O)CCC3(C)C(=CCC4C5(C)CCC(O)C(C)(C)C5CCC43C)C2C1C",
    plantSources: ["Guggul"],
    bioactivity:
      "Hypolipidemic, Anti-inflammatory, Antioxidant",
    drugLikeness: "Good",
    thumbnail: "",
  },
  // Shared compounds (found in multiple plants)
  {
    id: "34",
    name: "Quercetin",
    molecularFormula: "C15H10O7",
    molecularWeight: 302.24,
    logP: 1.8,
    functionalGroups: [
      "Phenol",
      "Carbonyl",
      "Aromatic Ring",
      "Hydroxyl (-OH)",
      "Flavonoid",
    ],
    smiles: "O=c1c(O)c(-c2ccc(O)c(O)c2)oc2cc(O)cc(O)c12",
    plantSources: ["Medicinal Herbs", "Elderberry"],
    bioactivity: "Antioxidant, Anti-inflammatory, Antiviral",
    drugLikeness: "Good",
    thumbnail: "",
  },
  {
    id: "35",
    name: "Resveratrol",
    molecularFormula: "C14H12O3",
    molecularWeight: 228.24,
    logP: 3.1,
    functionalGroups: [
      "Phenol",
      "Hydroxyl (-OH)",
      "Alkene (C=C)",
      "Aromatic Ring",
      "Stilbene",
    ],
    smiles: "Oc1ccc(/C=C/c2cc(O)cc(O)c2)cc1",
    plantSources: ["Medicinal Herbs"],
    bioactivity: "Cardioprotective, Anti-aging, Antioxidant",
    drugLikeness: "Excellent",
    thumbnail: "",
  },
  {
    id: "36",
    name: "Kaempferol",
    molecularFormula: "C15H10O6",
    molecularWeight: 286.24,
    logP: 2.1,
    functionalGroups: [
      "Flavonoid",
      "Phenol",
      "Hydroxyl (-OH)",
      "Carbonyl",
      "Aromatic Ring",
    ],
    smiles: "O=c1c(O)c(-c2ccc(O)cc2)oc2cc(O)cc(O)c12",
    plantSources: ["Medicinal Herbs"],
    bioactivity:
      "Antioxidant, Cardioprotective, Neuroprotective",
    drugLikeness: "Good",
    thumbnail: "",
  },
  {
    id: "37",
    name: "Rutin",
    molecularFormula: "C27H30O16",
    molecularWeight: 610.52,
    logP: -1.2,
    functionalGroups: [
      "Flavonoid",
      "Glycoside",
      "Rutinoside",
      "Phenol",
      "Hydroxyl (-OH)",
    ],
    smiles:
      "O=c1c(O[C@@H]2O[C@H](CO[C@@H]3O[C@@H](C)[C@H](O)[C@@H](O)[C@H]3O)[C@@H](O)[C@H](O)[C@H]2O)c(-c4ccc(O)c(O)c4)oc5cc(O)cc(O)c15",
    plantSources: ["Medicinal Herbs"],
    bioactivity:
      "Vascular Protection, Anti-inflammatory, Antioxidant",
    drugLikeness: "Poor (MW > 500)",
    thumbnail: "",
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [filters, setFilters] = useState({
    functionalGroups: [],
    molecularWeightRange: [50, 1000] as [number, number],
    drugLikeness: [],
    plantTypes: [],
  });
  const [selectedMolecule, setSelectedMolecule] =
    useState<any>(null);
  const [showMoleculeViewer, setShowMoleculeViewer] =
    useState(false);
  const [showUploadDialog, setShowUploadDialog] =
    useState(false);
  const [selectedPlant, setSelectedPlant] = useState<any>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">(
    "grid",
  );
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [showAnalysisPage, setShowAnalysisPage] =
    useState(false);

  // Compounds tab state - moved to top level to fix hooks order
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlantFilter, setSelectedPlantFilter] =
    useState("all");

  // Global search state
  const [globalSearchQuery, setGlobalSearchQuery] =
    useState("");

  // Data loading state
  const [isDataInitialized, setIsDataInitialized] =
    useState(false);
  const [mockPlants, setMockPlants] = useState<any[]>([]);
  const [mockCompounds, setMockCompounds] = useState<any[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Load data from backend on mount
  useEffect(() => {
    const loadData = async () => {
      if (!isDataInitialized) {
        return; // Wait for data initialization
      }

      setIsLoadingData(true);
      try {
        const [plants, compounds] = await Promise.all([
          dataService.getAllPlants(),
          dataService.getAllCompounds(),
        ]);

        setMockPlants(plants);
        setMockCompounds(compounds);
      } finally {
        setIsLoadingData(false);
      }
    };

    loadData();
  }, [isDataInitialized]);

  const handlePlantClick = (plant: any) => {
    setSelectedPlant(plant);
    setActiveTab("plants");
  };

  const handleMoleculeView = (compound: any) => {
    setSelectedMolecule(compound);
    setShowMoleculeViewer(true);
  };

  const handleAnalysisComplete = (data: any) => {
    setAnalysisData(data);
    setShowAnalysisPage(true);
  };

  const handleBackFromAnalysis = () => {
    setShowAnalysisPage(false);
    setAnalysisData(null);
  };

  // Global search handler
  const handleGlobalSearch = (query: string) => {
    setGlobalSearchQuery(query);
    if (query.trim()) {
      // Automatically switch to the most relevant tab based on results
      const plantsMatch = mockPlants.some(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.scientificName
            .toLowerCase()
            .includes(query.toLowerCase()),
      );
      const compoundsMatch = mockCompounds.some(
        (c) =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.molecularFormula
            .toLowerCase()
            .includes(query.toLowerCase()),
      );

      if (compoundsMatch && activeTab === "home") {
        setActiveTab("compounds");
      } else if (plantsMatch && activeTab === "home") {
        setActiveTab("plants");
      }
    }
  };

  // Filter data based on global search
  const filteredPlants = mockPlants.filter((plant) => {
    // If no search query, show all plants
    if (!globalSearchQuery || globalSearchQuery.trim() === "")
      return true;

    // Otherwise, only show plants that match the search query
    const query = globalSearchQuery.toLowerCase().trim();
    return (
      plant.name.toLowerCase().includes(query) ||
      plant.scientificName.toLowerCase().includes(query) ||
      plant.tamilName.toLowerCase().includes(query) ||
      (plant.description &&
        plant.description.toLowerCase().includes(query)) ||
      (plant.primaryCompounds &&
        plant.primaryCompounds.some((c: string) =>
          c.toLowerCase().includes(query),
        )) ||
      (plant.functionalGroups &&
        plant.functionalGroups.some((g: string) =>
          g.toLowerCase().includes(query),
        ))
    );
  });

  const filteredCompounds = mockCompounds.filter((compound) => {
    // If no search query, show all compounds
    if (!globalSearchQuery || globalSearchQuery.trim() === "")
      return true;

    // Otherwise, only show compounds that match the search query
    const query = globalSearchQuery.toLowerCase().trim();
    return (
      compound.name.toLowerCase().includes(query) ||
      compound.molecularFormula.toLowerCase().includes(query) ||
      (compound.bioactivity &&
        compound.bioactivity.toLowerCase().includes(query)) ||
      (compound.functionalGroups &&
        compound.functionalGroups.some((g: string) =>
          g.toLowerCase().includes(query),
        )) ||
      (compound.plantSources &&
        compound.plantSources.some((p: string) =>
          p.toLowerCase().includes(query),
        ))
    );
  });

  const renderHomeTab = () => (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 rounded-2xl p-8 md:p-12 border border-gray-200 shadow-sm">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Medicinal Plants Database
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Open-access chemoinformatics platform for analyzing
            medicinal plant compounds, molecular structures, and
            drug-likeness predictions
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              onClick={() => setShowUploadDialog(true)}
              className="bg-green-600 hover:bg-green-700 shadow-md"
              size="lg"
            >
              <Upload className="h-5 w-5 mr-2" />
              Upload Compounds
            </Button>
            <Button
              onClick={() => setActiveTab("analysis")}
              variant="outline"
              className="shadow-sm"
              size="lg"
            >
              <Activity className="h-5 w-5 mr-2" />
              Start Analysis
            </Button>
          </div>
        </div>
      </div>

      {/* Database Statistics with MetadataPanel */}
      <MetadataPanel />

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Leaf className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2 text-lg">
              Browse Plants
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Explore our medicinal plant database with detailed
              compound information
            </p>
            <Button
              variant="outline"
              className="w-full hover:bg-green-50"
              onClick={() => setActiveTab("plants")}
            >
              View All Plants
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Pill className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2 text-lg">
              Analyze Compounds
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Study molecular structures, properties, and
              drug-likeness
            </p>
            <Button
              variant="outline"
              className="w-full hover:bg-blue-50"
              onClick={() => setActiveTab("compounds")}
            >
              View All Plants
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-medium mb-2">
              Analyze Compounds
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Study molecular structures and properties
            </p>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setActiveTab("compounds")}
            >
              View Compounds
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold mb-2 text-lg">
              Upload Data
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Add new compounds via SMILES or CSV files
            </p>
            <Button
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={() => setShowUploadDialog(true)}
            >
              Upload Compounds
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <h3 className="font-medium">Recent Activity</h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">
                New compound uploaded: Quercetin
              </p>
              <p className="text-sm text-gray-600">
                From Onion extract • 2 hours ago
              </p>
            </div>
            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
              New
            </Badge>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">
                Analysis complete: Ginseng compounds
              </p>
              <p className="text-sm text-gray-600">
                3 new bioactive compounds identified • 4 hours
                ago
              </p>
            </div>
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
              Complete
            </Badge>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">
                Database updated: 15 new plants added
              </p>
              <p className="text-sm text-gray-600">
                From Traditional Medicine Database • 1 day ago
              </p>
            </div>
            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
              Updated
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Knowledge Graph */}
      <Card>
        <CardHeader>
          <div>
            <h3 className="font-medium">Knowledge Graph</h3>
            <p className="text-sm text-gray-600">
              Interactive network showing relationships between
              plants, compounds, functional groups, and diseases
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-white rounded-lg border overflow-hidden p-8">
            <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-12 text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  className="text-white"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="4"
                    fill="currentColor"
                  />
                  <circle
                    cx="28"
                    cy="12"
                    r="4"
                    fill="currentColor"
                  />
                  <circle
                    cx="12"
                    cy="28"
                    r="4"
                    fill="currentColor"
                  />
                  <circle
                    cx="28"
                    cy="28"
                    r="4"
                    fill="currentColor"
                  />
                  <path
                    d="M16 12h8M12 16v8M28 16v8M16 28h8"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <h4 className="text-lg font-medium mb-2">
                Interactive Knowledge Graph
              </h4>
              <p className="text-gray-600 mb-4">
                Explore relationships between plants, compounds,
                functional groups, and diseases
              </p>
              <div className="flex justify-center gap-4 text-sm text-gray-500">
                <span>{mockPlants.length} Plants</span>
                <span>•</span>
                <span>{mockCompounds.length} Compounds</span>
                <span>•</span>
                <span>
                  {
                    Array.from(
                      new Set(
                        mockCompounds.flatMap(
                          (c) => c.functionalGroups,
                        ),
                      ),
                    ).length
                  }{" "}
                  Groups
                </span>
                <span>•</span>
                <span>25 Diseases</span>
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            <Button
              onClick={() => setActiveTab("analysis")}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Explore Interactive Graph
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPlantsTab = () => (
    <div className="space-y-6">
      {selectedPlant ? (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => setSelectedPlant(null)}
            >
              ← Back to Plants
            </Button>
          </div>

          <Card>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="aspect-square rounded-lg overflow-hidden">
                  <img
                    src={selectedPlant.image}
                    alt={selectedPlant.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h1 className="text-2xl font-medium mb-2">
                      {selectedPlant.name}
                    </h1>
                    <p className="text-lg text-blue-600 font-medium mb-2">
                      {selectedPlant.tamilName}
                    </p>
                    <p className="text-lg text-gray-600 italic mb-4">
                      {selectedPlant.scientificName}
                    </p>
                    <p className="text-gray-700">
                      {selectedPlant.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-2">
                        Compounds Found
                      </h3>
                      <p className="text-2xl font-bold text-blue-600">
                        {selectedPlant.compounds}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">
                        Functional Groups
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedPlant.functionalGroups.map(
                          (group: string) => (
                            <Badge
                              key={group}
                              variant="secondary"
                            >
                              {group}
                            </Badge>
                          ),
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-3">
                        Primary Compounds
                      </h3>
                      <div className="space-y-2">
                        {selectedPlant.primaryCompounds?.map(
                          (compound: string) => (
                            <div
                              key={compound}
                              className="flex items-center gap-2"
                            >
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <span className="text-sm text-gray-700">
                                {compound}
                              </span>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium mb-3">
                        Therapeutic Targets
                      </h3>
                      <div className="space-y-2">
                        {selectedPlant.therapeuticTargets?.map(
                          (target: string) => (
                            <div
                              key={target}
                              className="flex items-center gap-2"
                            >
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="text-sm text-gray-700">
                                {target}
                              </span>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="font-medium">
                Associated Compounds
              </h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockCompounds.slice(0, 3).map((compound) => (
                  <CompoundCard
                    key={compound.id}
                    compound={compound}
                    onViewMolecule={handleMoleculeView}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-medium">
                Medicinal Plants
              </h2>
              {globalSearchQuery && (
                <p className="text-sm text-gray-600 mt-1">
                  Found {filteredPlants.length} plant
                  {filteredPlants.length !== 1 ? "s" : ""}{" "}
                  matching "{globalSearchQuery}"
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={
                  viewMode === "grid" ? "default" : "ghost"
                }
                size="sm"
                onClick={() => setViewMode("grid")}
                className={
                  viewMode === "grid"
                    ? "bg-green-100 text-green-700"
                    : ""
                }
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={
                  viewMode === "list" ? "default" : "ghost"
                }
                size="sm"
                onClick={() => setViewMode("list")}
                className={
                  viewMode === "list"
                    ? "bg-green-100 text-green-700"
                    : ""
                }
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <ActiveSearchBanner
            searchQuery={globalSearchQuery}
            resultCount={filteredPlants.length}
            totalCount={mockPlants.length}
            onClear={() => setGlobalSearchQuery("")}
            type="plants"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlants.map((plant) => (
              <PlantCard
                key={plant.id}
                plant={plant}
                onClick={handlePlantClick}
              />
            ))}
            {filteredPlants.length === 0 &&
              globalSearchQuery && (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500">
                    No plants found matching "
                    {globalSearchQuery}"
                  </p>
                </div>
              )}
          </div>
        </>
      )}
    </div>
  );

  const renderCompoundsTab = () => {
    const plantOptions = [
      "all",
      ...Array.from(
        new Set(mockCompounds.flatMap((c) => c.plantSources)),
      ),
    ];

    // Combine global search with local compound filters
    const allFilteredCompounds = mockCompounds.filter(
      (compound) => {
        // Apply global search first
        if (globalSearchQuery) {
          const query = globalSearchQuery.toLowerCase();
          const matchesGlobal =
            compound.name.toLowerCase().includes(query) ||
            compound.molecularFormula
              .toLowerCase()
              .includes(query) ||
            compound.bioactivity
              .toLowerCase()
              .includes(query) ||
            compound.functionalGroups.some((g: string) =>
              g.toLowerCase().includes(query),
            );
          if (!matchesGlobal) return false;
        }

        // Then apply local filters
        const matchesSearch =
          compound.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          compound.molecularFormula
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          compound.bioactivity
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesPlant =
          selectedPlantFilter === "all" ||
          compound.plantSources.includes(selectedPlantFilter);
        return matchesSearch && matchesPlant;
      },
    );

    return (
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-medium">
              Compounds Database
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {globalSearchQuery ? (
                <>
                  Found {allFilteredCompounds.length} compound
                  {allFilteredCompounds.length !== 1 ? "s" : ""}{" "}
                  matching "{globalSearchQuery}"
                </>
              ) : (
                <>
                  {mockCompounds.length} bioactive compounds
                  from {plantOptions.length - 1} medicinal
                  plants
                </>
              )}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search compounds..."
                className="pl-10 w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-3 py-2 border border-gray-200 rounded-md text-sm"
              value={selectedPlantFilter}
              onChange={(e) =>
                setSelectedPlantFilter(e.target.value)
              }
            >
              <option value="all">All Plants</option>
              {plantOptions.slice(1).map((plant) => (
                <option key={plant} value={plant}>
                  {plant}
                </option>
              ))}
            </select>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filter
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">
                    Total Compounds
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    {allFilteredCompounds.length}
                  </p>
                </div>
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="text-blue-600"
                  >
                    <circle
                      cx="4"
                      cy="4"
                      r="2"
                      fill="currentColor"
                    />
                    <circle
                      cx="12"
                      cy="4"
                      r="2"
                      fill="currentColor"
                    />
                    <circle
                      cx="4"
                      cy="12"
                      r="2"
                      fill="currentColor"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="2"
                      fill="currentColor"
                    />
                    <path
                      d="M6 4h4M4 6v4M12 6v4M6 12h4"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">
                    Drug-like
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {
                      allFilteredCompounds.filter(
                        (c) =>
                          c.drugLikeness === "Excellent" ||
                          c.drugLikeness === "Good",
                      ).length
                    }
                  </p>
                </div>
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="text-green-600"
                  >
                    <path
                      d="M8 2L10 6h4l-3 3 1 4-4-2-4 2 1-4-3-3h4l2-4z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">
                    Plant Sources
                  </p>
                  <p className="text-2xl font-bold text-purple-600">
                    {plantOptions.length - 1}
                  </p>
                </div>
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="text-purple-600"
                  >
                    <path
                      d="M8 2v4l3-1v6l-3-1v4l-3-1V8L2 9V3l3 1V2l3 1z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">
                    Avg MW
                  </p>
                  <p className="text-2xl font-bold text-orange-600">
                    {allFilteredCompounds.length > 0
                      ? Math.round(
                          allFilteredCompounds.reduce(
                            (sum, c) => sum + c.molecularWeight,
                            0,
                          ) / allFilteredCompounds.length,
                        )
                      : 0}
                  </p>
                </div>
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="text-orange-600"
                  >
                    <rect
                      x="2"
                      y="6"
                      width="3"
                      height="4"
                      fill="currentColor"
                    />
                    <rect
                      x="6"
                      y="4"
                      width="3"
                      height="6"
                      fill="currentColor"
                    />
                    <rect
                      x="10"
                      y="8"
                      width="3"
                      height="2"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <ActiveSearchBanner
          searchQuery={globalSearchQuery}
          resultCount={allFilteredCompounds.length}
          totalCount={mockCompounds.length}
          onClear={() => setGlobalSearchQuery("")}
          type="compounds"
        />

        {/* Compounds Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allFilteredCompounds.map((compound) => (
            <CompoundCard
              key={compound.id}
              compound={compound}
              onViewMolecule={handleMoleculeView}
            />
          ))}
        </div>

        {allFilteredCompounds.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No compounds found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search terms or filters
            </p>
          </div>
        )}
      </div>
    );
  };

  const renderAnalysisTab = () => (
    <div className="space-y-8">
      {/* Disease & Compound Search */}
      <DiseaseCompoundSearch />

      <div className="border-t pt-8">
        <div className="mb-6">
          <h2 className="text-xl font-medium mb-2">
            Database Analytics
          </h2>
          <p className="text-gray-600">
            Explore molecular patterns and relationships in our
            medicinal plants database.
          </p>
        </div>

        <ChartsPanel />

        <div className="mt-8">
          <KnowledgeGraph />
        </div>
      </div>
    </div>
  );

  // Show data initializer until data is loaded
  if (!isDataInitialized) {
    return (
      <DataInitializer
        onDataLoaded={() => setIsDataInitialized(true)}
      />
    );
  }

  // Show analysis page if compound was uploaded and analyzed
  if (showAnalysisPage && analysisData) {
    return (
      <ErrorBoundary>
        <CompoundAnalysisPage
          data={analysisData}
          onBack={handleBackFromAnalysis}
        />
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <TopNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onUploadClick={() => setShowUploadDialog(true)}
          onSearch={handleGlobalSearch}
          searchQuery={globalSearchQuery}
        />

        <div className="flex">
          {activeTab !== "home" &&
            activeTab !== "profile" &&
            activeTab !== "reports" && (
              <ErrorBoundary>
                <SidebarFilters
                  filters={filters}
                  onFiltersChange={setFilters}
                />
              </ErrorBoundary>
            )}

          <main
            className={`flex-1 p-6 ${activeTab === "home" || activeTab === "reports" ? "max-w-7xl mx-auto" : ""}`}
          >
            <OpenAccessBanner />
            <DemoModeBanner />
            <ErrorBoundary>
              {isLoadingData ? (
                <div className="flex items-center justify-center py-20">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">
                      Loading data...
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  {activeTab === "home" && renderHomeTab()}
                  {activeTab === "plants" && renderPlantsTab()}
                  {activeTab === "compounds" &&
                    renderCompoundsTab()}
                  {activeTab === "analysis" &&
                    renderAnalysisTab()}
                  {activeTab === "reports" && <ReportsPage />}
                </>
              )}
            </ErrorBoundary>
          </main>
        </div>

        <ErrorBoundary>
          <MoleculeViewer
            compound={selectedMolecule}
            isOpen={showMoleculeViewer}
            onClose={() => setShowMoleculeViewer(false)}
          />
        </ErrorBoundary>

        <ErrorBoundary>
          <UploadDialog
            isOpen={showUploadDialog}
            onClose={() => setShowUploadDialog(false)}
            onAnalysisComplete={handleAnalysisComplete}
          />
        </ErrorBoundary>
      </div>
      <Toaster position="bottom-right" />
    </ErrorBoundary>
  );
}