import { useEffect, useState } from 'react';
import { dataService } from '../utils/dataService';
import { Alert, AlertDescription } from './ui/alert';
import { Button } from './ui/button';
import { COMPREHENSIVE_PLANTS_DATA } from '../utils/mockPlantsData';

// Import mock data for seeding - Using comprehensive 50 plants database
const mockPlants = COMPREHENSIVE_PLANTS_DATA;

// Comprehensive Compounds Database - 50 bioactive compounds from medicinal plants
const mockCompounds = [
  {
    id: '1',
    name: 'Curcumin',
    molecularFormula: 'C21H20O6',
    molecularWeight: 368.38,
    logP: 3.2,
    functionalGroups: ['Phenol', 'Ether', 'Carbonyl', 'Alkene (C=C)', 'Hydroxyl (-OH)', 'Methoxy (-OCH3)'],
    smiles: 'COc1cc(/C=C/C(=O)CC(=O)/C=C/c2ccc(O)c(OC)c2)ccc1O',
    plantSources: ['Turmeric'],
    bioactivity: 'Anti-inflammatory, Antioxidant, Anticancer',
    drugLikeness: 'Good',
    thumbnail: ''
  },
  {
    id: '2',
    name: 'Demethoxycurcumin',
    molecularFormula: 'C20H18O5',
    molecularWeight: 338.35,
    logP: 3.1,
    functionalGroups: ['Phenol', 'Carbonyl', 'Alkene (C=C)', 'Hydroxyl (-OH)', 'Methoxy (-OCH3)'],
    smiles: 'COc1cc(/C=C/C(=O)CC(=O)/C=C/c2ccc(O)cc2)ccc1O',
    plantSources: ['Turmeric'],
    bioactivity: 'Anti-inflammatory, Antioxidant, Neuroprotective',
    drugLikeness: 'Good',
    thumbnail: ''
  },
  {
    id: '3',
    name: 'Bisdemethoxycurcumin',
    molecularFormula: 'C19H16O4',
    molecularWeight: 308.33,
    logP: 2.9,
    functionalGroups: ['Phenol', 'Carbonyl', 'Alkene (C=C)', 'Hydroxyl (-OH)', 'Aromatic Ring'],
    smiles: 'O=C(CC(=O)/C=C/c1ccc(O)cc1)/C=C/c2ccc(O)cc2',
    plantSources: ['Turmeric'],
    bioactivity: 'Antioxidant, Anti-inflammatory, Anticancer',
    drugLikeness: 'Good',
    thumbnail: ''
  },
  {
    id: '4',
    name: 'Turmerone',
    molecularFormula: 'C15H22O',
    molecularWeight: 218.33,
    logP: 3.8,
    functionalGroups: ['Ketone', 'Methyl (-CH3)', 'Aromatic Ring', 'Alkene (C=C)'],
    smiles: 'CC(C)=CCCC(C)=CC(=O)c1ccc(C)cc1',
    plantSources: ['Turmeric'],
    bioactivity: 'Neuroprotective, Anti-inflammatory, Antimicrobial',
    drugLikeness: 'Excellent',
    thumbnail: ''
  },
  {
    id: '5',
    name: 'Gingerol',
    molecularFormula: 'C17H26O4',
    molecularWeight: 294.39,
    logP: 3.5,
    functionalGroups: ['Phenol', 'Ketone', 'Hydroxyl (-OH)', 'Ether', 'Methoxy (-OCH3)'],
    smiles: 'CCCCCC(O)CC(=O)CCc1ccc(O)c(OC)c1',
    plantSources: ['Ginger'],
    bioactivity: 'Anti-inflammatory, Antiemetic, Analgesic',
    drugLikeness: 'Good',
    thumbnail: ''
  },
  {
    id: '6',
    name: 'Shogaol',
    molecularFormula: 'C17H24O3',
    molecularWeight: 276.37,
    logP: 4.1,
    functionalGroups: ['Phenol', 'Ketone', 'Alkene (C=C)', 'Methoxy (-OCH3)', 'Hydroxyl (-OH)'],
    smiles: 'CCCCC=CC(=O)CCc1ccc(O)c(OC)c1',
    plantSources: ['Ginger'],
    bioactivity: 'Anti-inflammatory, Antioxidant, Anticancer',
    drugLikeness: 'Good',
    thumbnail: ''
  },
  {
    id: '7',
    name: 'Allicin',
    molecularFormula: 'C6H10OS2',
    molecularWeight: 162.27,
    logP: 1.9,
    functionalGroups: ['Thiosulfinate', 'Sulfur Compound', 'Allyl', 'Disulfide (S-S)'],
    smiles: 'C=CCSSC(=O)CC=C',
    plantSources: ['Garlic'],
    bioactivity: 'Antimicrobial, Antioxidant, Cardiovascular',
    drugLikeness: 'Good',
    thumbnail: ''
  },
  {
    id: '8',
    name: 'Eugenol',
    molecularFormula: 'C10H12O2',
    molecularWeight: 164.20,
    logP: 2.3,
    functionalGroups: ['Phenol', 'Allyl', 'Methoxy (-OCH3)', 'Hydroxyl (-OH)', 'Aromatic Ring'],
    smiles: 'C=CCc1ccc(O)c(OC)c1',
    plantSources: ['Clove', 'Tulsi', 'Cinnamon'],
    bioactivity: 'Analgesic, Antiseptic, Anti-inflammatory',
    drugLikeness: 'Excellent',
    thumbnail: ''
  },
  {
    id: '9',
    name: 'EGCG',
    molecularFormula: 'C22H18O11',
    molecularWeight: 458.37,
    logP: 1.4,
    functionalGroups: ['Phenol', 'Hydroxyl (-OH)', 'Catechin', 'Gallate', 'Ester', 'Aromatic Ring'],
    smiles: 'O=C(O[C@H]1Cc2c(O)cc(O)cc2O[C@@H]1c3cc(O)c(O)c(O)c3)c4cc(O)c(O)c(O)c4',
    plantSources: ['Green Tea'],
    bioactivity: 'Antioxidant, Anticancer, Cardioprotective',
    drugLikeness: 'Moderate',
    thumbnail: ''
  },
  {
    id: '10',
    name: 'Catechin',
    molecularFormula: 'C15H14O6',
    molecularWeight: 290.27,
    logP: 1.4,
    functionalGroups: ['Phenol', 'Hydroxyl (-OH)', 'Catechol', 'Aromatic Ring', 'Flavanol'],
    smiles: 'O[C@H]1Cc2c(O)cc(O)cc2O[C@@H]1c3ccc(O)c(O)c3',
    plantSources: ['Green Tea', 'Cacao'],
    bioactivity: 'Antioxidant, Neuroprotective, Cardioprotective',
    drugLikeness: 'Good',
    thumbnail: ''
  },
  {
    id: '11',
    name: 'Withanolide A',
    molecularFormula: 'C28H38O6',
    molecularWeight: 470.60,
    logP: 3.6,
    functionalGroups: ['Steroid', 'Lactone', 'Hydroxyl (-OH)', 'Ketone', 'Epoxide'],
    smiles: 'C[C@]12CC[C@H]3[C@@H](CC=C4[C@@]3(C[C@H](O)C(=O)[C@H]4[C@@H]5CC(=O)O[C@@H]5C)C)[C@@H]1CC[C@@H]2O',
    plantSources: ['Ashwagandha'],
    bioactivity: 'Neuroprotective, Anti-anxiety, Adaptogenic',
    drugLikeness: 'Moderate',
    thumbnail: ''
  },
  {
    id: '12',
    name: 'Withaferin A',
    molecularFormula: 'C28H38O6',
    molecularWeight: 470.60,
    logP: 3.8,
    functionalGroups: ['Steroid', 'Lactone', 'Hydroxyl (-OH)', 'Ketone', 'Epoxide'],
    smiles: 'C[C@]12CC[C@H]3[C@@H](CC=C4[C@@]3(C[C@H](O)C(=O)[C@H]4[C@@H]5CC(=O)O[C@@H]5C)C)[C@@H]1C[C@@H](O)[C@@H]2O',
    plantSources: ['Ashwagandha'],
    bioactivity: 'Anticancer, Anti-inflammatory, Immunomodulatory',
    drugLikeness: 'Moderate',
    thumbnail: ''
  },
  {
    id: '13',
    name: 'Ginsenoside Rb1',
    molecularFormula: 'C54H92O23',
    molecularWeight: 1109.29,
    logP: 2.1,
    functionalGroups: ['Glycoside', 'Hydroxyl (-OH)', 'Ether', 'Steroid', 'Saponin'],
    smiles: 'CC(C)=CCC[C@@](C)(O[C@@H]1O[C@H](CO)[C@@H](O)[C@H](O)[C@H]1O)[C@H]2CC[C@]3(C)[C@H]2[C@H](O)C[C@@H]4[C@@]5(C)CC[C@H](O[C@@H]6O[C@H](CO)[C@@H](O)[C@H](O)[C@H]6O[C@@H]7O[C@H](CO)[C@@H](O)[C@H](O)[C@H]7O)C(C)(C)[C@@H]5CC[C@@]34C',
    plantSources: ['Ginseng'],
    bioactivity: 'Adaptogenic, Neuroprotective, Anti-fatigue',
    drugLikeness: 'Poor (MW > 500)',
    thumbnail: ''
  },
  {
    id: '14',
    name: 'Ginsenoside Rg1',
    molecularFormula: 'C42H72O14',
    molecularWeight: 801.01,
    logP: 1.9,
    functionalGroups: ['Glycoside', 'Hydroxyl (-OH)', 'Ether', 'Steroid', 'Saponin'],
    smiles: 'CC(C)=CCC[C@@](C)(O[C@@H]1O[C@H](CO)[C@@H](O)[C@H](O)[C@H]1O)[C@H]2CC[C@]3(C)[C@H]2[C@H](O)C[C@@H]4[C@@]5(C)CC[C@H](O[C@@H]6O[C@H](CO)[C@@H](O)[C@H](O)[C@H]6O)C(C)(C)[C@@H]5CC=C4[C@H]3CC',
    plantSources: ['Ginseng'],
    bioactivity: 'Neuroprotective, Cognitive Enhancement, Anti-fatigue',
    drugLikeness: 'Poor (MW > 500)',
    thumbnail: ''
  },
  {
    id: '15',
    name: 'Azadirachtin',
    molecularFormula: 'C35H44O16',
    molecularWeight: 720.71,
    logP: 2.3,
    functionalGroups: ['Terpenoid', 'Ester', 'Epoxide', 'Hydroxyl (-OH)', 'Lactone'],
    smiles: 'CC1=C2[C@@H]3[C@H](C[C@H](O)[C@@H]4[C@@]3(C)C[C@H](OC(=O)C)[C@@H]([C@H]4O)OC)[C@@](O)(CO[C@@H]5O[C@H](C)[C@@H](O)[C@@H](O)[C@H]5O)[C@@H]2[C@@]6(C)O[C@@H]7O[C@@H]8[C@H](C)O[C@H]([C@@H]8O)O[C@H]7[C@@H]6O1',
    plantSources: ['Neem'],
    bioactivity: 'Insecticidal, Antimicrobial, Antifungal',
    drugLikeness: 'Poor (MW > 500)',
    thumbnail: ''
  },
  {
    id: '16',
    name: 'Piperine',
    molecularFormula: 'C17H19NO3',
    molecularWeight: 285.34,
    logP: 3.4,
    functionalGroups: ['Amide', 'Alkaloid', 'Piperidine', 'Methylenedioxy', 'Alkene (C=C)'],
    smiles: 'O=C(/C=C/C=C/c1ccc2OCOc2c1)N1CCCCC1',
    plantSources: ['Black Pepper'],
    bioactivity: 'Bioavailability Enhancement, Antioxidant, Anti-inflammatory',
    drugLikeness: 'Good',
    thumbnail: ''
  },
  {
    id: '17',
    name: 'Resveratrol',
    molecularFormula: 'C14H12O3',
    molecularWeight: 228.24,
    logP: 3.1,
    functionalGroups: ['Phenol', 'Stilbene', 'Hydroxyl (-OH)', 'Alkene (C=C)', 'Aromatic Ring'],
    smiles: 'Oc1ccc(/C=C/c2cc(O)cc(O)c2)cc1',
    plantSources: ['Grapes', 'Berries'],
    bioactivity: 'Antioxidant, Cardioprotective, Anti-aging',
    drugLikeness: 'Excellent',
    thumbnail: ''
  },
  {
    id: '18',
    name: 'Quercetin',
    molecularFormula: 'C15H10O7',
    molecularWeight: 302.24,
    logP: 1.8,
    functionalGroups: ['Flavonoid', 'Phenol', 'Hydroxyl (-OH)', 'Ketone', 'Aromatic Ring'],
    smiles: 'O=C1c2c(O)cc(O)cc2OC(c3ccc(O)c(O)c3)=C1O',
    plantSources: ['Onion', 'Moringa', 'Many plants'],
    bioactivity: 'Antioxidant, Anti-inflammatory, Antiviral',
    drugLikeness: 'Good',
    thumbnail: ''
  },
  {
    id: '19',
    name: 'Kaempferol',
    molecularFormula: 'C15H10O6',
    molecularWeight: 286.24,
    logP: 2.1,
    functionalGroups: ['Flavonoid', 'Phenol', 'Hydroxyl (-OH)', 'Ketone', 'Aromatic Ring'],
    smiles: 'O=C1c2c(O)cc(O)cc2OC(c3ccc(O)cc3)=C1O',
    plantSources: ['Moringa', 'Tea', 'Broccoli'],
    bioactivity: 'Antioxidant, Anti-inflammatory, Cardioprotective',
    drugLikeness: 'Good',
    thumbnail: ''
  },
  {
    id: '20',
    name: 'Berberine',
    molecularFormula: 'C20H18NO4+',
    molecularWeight: 336.36,
    logP: 2.9,
    functionalGroups: ['Alkaloid', 'Quaternary Ammonium', 'Isoquinoline', 'Ether', 'Methoxy (-OCH3)'],
    smiles: 'COc1ccc2c(c1O)-c3cc4c(cc3C[N+]2=C)OCOc4',
    plantSources: ['Goldenseal', 'Barberry', 'Giloy'],
    bioactivity: 'Antimicrobial, Antidiabetic, Cardioprotective',
    drugLikeness: 'Good',
    thumbnail: ''
  },
  {
    id: '21',
    name: 'Andrographolide',
    molecularFormula: 'C20H30O5',
    molecularWeight: 350.45,
    logP: 2.7,
    functionalGroups: ['Lactone', 'Diterpenoid', 'Hydroxyl (-OH)', 'Alkene (C=C)'],
    smiles: 'CC(C)=CC[C@H]([C@H]1CC[C@@H]2[C@@]1(CC[C@H]3[C@H]2C[C@H](C(=C3C)C=O)O)C)O',
    plantSources: ['Kalmegh'],
    bioactivity: 'Hepatoprotective, Immunomodulatory, Anti-inflammatory',
    drugLikeness: 'Good',
    thumbnail: ''
  },
  {
    id: '22',
    name: 'Bacoside A',
    molecularFormula: 'C46H74O17',
    molecularWeight: 899.07,
    logP: 3.1,
    functionalGroups: ['Saponin', 'Triterpenoid', 'Glycoside', 'Hydroxyl (-OH)'],
    smiles: 'CC(C)=CC[C@@H](C)[C@H]1CC[C@]2(C)[C@H]1[C@H](O)C[C@@H]3[C@@]2(C)CC[C@H]4[C@@]3(C)[C@H](O[C@@H]5O[C@H](CO)[C@@H](O)[C@H](O)[C@H]5O[C@@H]6O[C@H](CO)[C@@H](O)[C@H](O)[C@H]6O)CC[C@@]4(C)C(=O)O',
    plantSources: ['Brahmi'],
    bioactivity: 'Cognitive Enhancement, Memory Support, Neuroprotective',
    drugLikeness: 'Poor (MW > 500)',
    thumbnail: ''
  },
  {
    id: '23',
    name: 'Asiaticoside',
    molecularFormula: 'C48H78O19',
    molecularWeight: 959.12,
    logP: 2.4,
    functionalGroups: ['Triterpenoid', 'Saponin', 'Glycoside', 'Hydroxyl (-OH)', 'Carboxyl (-COOH)'],
    smiles: 'CC1(C)[C@@H](O)CC[C@@]2(C)[C@H]1CC[C@]3(C)[C@H]2C[C@@H](O)[C@@H]4[C@@]3(C)CC[C@H](O[C@@H]5O[C@H](CO)[C@@H](O)[C@H](O[C@@H]6O[C@H](CO)[C@@H](O)[C@H](O)[C@H]6O[C@@H]7O[C@H](CO)[C@@H](O)[C@H](O)[C@H]7O)[C@H]5O)[C@@]4(C)C(=O)O',
    plantSources: ['Gotu Kola'],
    bioactivity: 'Wound Healing, Collagen Synthesis, Neuroprotective',
    drugLikeness: 'Poor (MW > 500)',
    thumbnail: ''
  },
  {
    id: '24',
    name: 'Glycyrrhizin',
    molecularFormula: 'C42H62O16',
    molecularWeight: 822.93,
    logP: 2.8,
    functionalGroups: ['Saponin', 'Triterpenoid', 'Glycoside', 'Carboxyl (-COOH)', 'Hydroxyl (-OH)'],
    smiles: 'CC1(C)[C@@H](O)CC[C@@]2(C(=O)O[C@@H]3O[C@H](C(=O)O)[C@@H](O)[C@H](O)[C@H]3O[C@@H]4O[C@H](C(=O)O)[C@@H](O)[C@H](O)[C@H]4O)[C@H]1CC[C@@]3(C)[C@H]2CC[C@@H]4[C@@]3(C)CC[C@H](O)[C@@]4(C)C',
    plantSources: ['Licorice'],
    bioactivity: 'Anti-inflammatory, Antiviral, Hepatoprotective',
    drugLikeness: 'Poor (MW > 500)',
    thumbnail: ''
  },
  {
    id: '25',
    name: 'Aloin',
    molecularFormula: 'C21H22O9',
    molecularWeight: 418.39,
    logP: 1.2,
    functionalGroups: ['Anthraquinone', 'Glycoside', 'Hydroxyl (-OH)', 'Aromatic Ring', 'Ketone'],
    smiles: 'CC1OC(O[C@@H]2Cc3cc(O)cc(O)c3C(=O)c4c2c(O)cc(c4C(C)=O)O[C@@H]5C[C@@](C)(O)[C@@H](O)[C@H](C)O5)C(O)C(O)C1O',
    plantSources: ['Aloe Vera'],
    bioactivity: 'Laxative, Anti-inflammatory, Antimicrobial',
    drugLikeness: 'Moderate',
    thumbnail: ''
  },
  {
    id: '26',
    name: 'Menthol',
    molecularFormula: 'C10H20O',
    molecularWeight: 156.27,
    logP: 3.4,
    functionalGroups: ['Terpenoid', 'Alcohol', 'Hydroxyl (-OH)', 'Cyclohexane', 'Isopropyl'],
    smiles: 'CC(C)[C@H]1CC[C@@H](C)C[C@H]1O',
    plantSources: ['Peppermint'],
    bioactivity: 'Analgesic, Cooling, Antispasmodic',
    drugLikeness: 'Excellent',
    thumbnail: ''
  },
  {
    id: '27',
    name: 'Cinnamaldehyde',
    molecularFormula: 'C9H8O',
    molecularWeight: 132.16,
    logP: 2.1,
    functionalGroups: ['Aldehyde', 'Alkene (C=C)', 'Aromatic Ring', 'Carbonyl'],
    smiles: 'O=C/C=C/c1ccccc1',
    plantSources: ['Cinnamon'],
    bioactivity: 'Antimicrobial, Antidiabetic, Anti-inflammatory',
    drugLikeness: 'Excellent',
    thumbnail: ''
  },
  {
    id: '28',
    name: 'Ursolic Acid',
    molecularFormula: 'C30H48O3',
    molecularWeight: 456.70,
    logP: 7.6,
    functionalGroups: ['Triterpenoid', 'Carboxyl (-COOH)', 'Hydroxyl (-OH)', 'Pentacyclic'],
    smiles: 'CC1(C)CCC[C@]2(C)[C@H]1CC[C@@]3(C)[C@H]2CC=C4[C@@]3(C)CC[C@@H]5[C@@]4(C)CC[C@@H](O)[C@@]5(C)C(=O)O',
    plantSources: ['Tulsi', 'Apple peel', 'Rosemary'],
    bioactivity: 'Anti-inflammatory, Anticancer, Anti-obesity',
    drugLikeness: 'Moderate',
    thumbnail: ''
  },
  {
    id: '29',
    name: 'Rosmarinic Acid',
    molecularFormula: 'C18H16O8',
    molecularWeight: 360.31,
    logP: 1.9,
    functionalGroups: ['Phenolic Acid', 'Ester', 'Catechol', 'Carboxyl (-COOH)', 'Hydroxyl (-OH)'],
    smiles: 'O=C(O[C@H](Cc1ccc(O)c(O)c1)C(=O)O)C=Cc2ccc(O)c(O)c2',
    plantSources: ['Tulsi', 'Rosemary', 'Mint'],
    bioactivity: 'Antioxidant, Anti-inflammatory, Antimicrobial',
    drugLikeness: 'Good',
    thumbnail: ''
  },
  {
    id: '30',
    name: 'Thymol',
    molecularFormula: 'C10H14O',
    molecularWeight: 150.22,
    logP: 3.3,
    functionalGroups: ['Phenol', 'Terpenoid', 'Hydroxyl (-OH)', 'Isopropyl', 'Aromatic Ring'],
    smiles: 'Cc1ccc(C(C)C)c(O)c1',
    plantSources: ['Thyme', 'Oregano'],
    bioactivity: 'Antimicrobial, Antifungal, Antioxidant',
    drugLikeness: 'Excellent',
    thumbnail: ''
  },
  {
    id: '31',
    name: 'Carvacrol',
    molecularFormula: 'C10H14O',
    molecularWeight: 150.22,
    logP: 3.4,
    functionalGroups: ['Phenol', 'Terpenoid', 'Hydroxyl (-OH)', 'Isopropyl', 'Aromatic Ring'],
    smiles: 'Cc1ccc(C(C)C)cc1O',
    plantSources: ['Oregano', 'Thyme'],
    bioactivity: 'Antimicrobial, Antioxidant, Anti-inflammatory',
    drugLikeness: 'Excellent',
    thumbnail: ''
  },
  {
    id: '32',
    name: 'Ellagic Acid',
    molecularFormula: 'C14H6O8',
    molecularWeight: 302.19,
    logP: 1.5,
    functionalGroups: ['Phenolic Acid', 'Lactone', 'Hydroxyl (-OH)', 'Aromatic Ring', 'Polyphenol'],
    smiles: 'O=C1OC2=C(O)C(O)=C3C(=O)OC4=C(O)C(O)=C1C(=C24)C3',
    plantSources: ['Amla', 'Pomegranate', 'Berries'],
    bioactivity: 'Antioxidant, Anticancer, Hepatoprotective',
    drugLikeness: 'Good',
    thumbnail: ''
  },
  {
    id: '33',
    name: 'Gallic Acid',
    molecularFormula: 'C7H6O5',
    molecularWeight: 170.12,
    logP: 0.7,
    functionalGroups: ['Phenolic Acid', 'Trihydroxy', 'Carboxyl (-COOH)', 'Hydroxyl (-OH)', 'Aromatic Ring'],
    smiles: 'O=C(O)c1cc(O)c(O)c(O)c1',
    plantSources: ['Amla', 'Tea', 'Haritaki'],
    bioactivity: 'Antioxidant, Antimicrobial, Anticancer',
    drugLikeness: 'Good',
    thumbnail: ''
  },
  {
    id: '34',
    name: 'Apigenin',
    molecularFormula: 'C15H10O5',
    molecularWeight: 270.24,
    logP: 2.5,
    functionalGroups: ['Flavone', 'Phenol', 'Hydroxyl (-OH)', 'Ketone', 'Aromatic Ring'],
    smiles: 'O=C1CC(c2ccc(O)cc2)Oc3cc(O)cc(O)c13',
    plantSources: ['Chamomile', 'Parsley', 'Celery'],
    bioactivity: 'Anti-inflammatory, Antioxidant, Anxiolytic',
    drugLikeness: 'Good',
    thumbnail: ''
  },
  {
    id: '35',
    name: 'Luteolin',
    molecularFormula: 'C15H10O6',
    molecularWeight: 286.24,
    logP: 2.2,
    functionalGroups: ['Flavone', 'Phenol', 'Hydroxyl (-OH)', 'Ketone', 'Catechol'],
    smiles: 'O=C1CC(c2ccc(O)c(O)c2)Oc3cc(O)cc(O)c13',
    plantSources: ['Celery', 'Parsley', 'Thyme'],
    bioactivity: 'Anti-inflammatory, Neuroprotective, Anticancer',
    drugLikeness: 'Good',
    thumbnail: ''
  },
  {
    id: '36',
    name: 'Hesperidin',
    molecularFormula: 'C28H34O15',
    molecularWeight: 610.56,
    logP: 0.9,
    functionalGroups: ['Flavanone', 'Glycoside', 'Hydroxyl (-OH)', 'Ether', 'Methoxy (-OCH3)'],
    smiles: 'COc1ccc([C@@H]2CC(=O)c3c(O)cc(O[C@@H]4O[C@H](CO)[C@@H](O)[C@H](O)[C@H]4O[C@@H]5O[C@@H](C)[C@H](O)[C@@H](O)[C@H]5O)cc3O2)cc1O',
    plantSources: ['Citrus fruits'],
    bioactivity: 'Antioxidant, Anti-inflammatory, Cardiovascular',
    drugLikeness: 'Poor (MW > 500)',
    thumbnail: ''
  },
  {
    id: '37',
    name: 'Naringenin',
    molecularFormula: 'C15H12O5',
    molecularWeight: 272.25,
    logP: 2.4,
    functionalGroups: ['Flavanone', 'Phenol', 'Hydroxyl (-OH)', 'Ketone', 'Aromatic Ring'],
    smiles: 'O=C1C[C@H](c2ccc(O)cc2)Oc3cc(O)cc(O)c13',
    plantSources: ['Grapefruit', 'Citrus'],
    bioactivity: 'Antioxidant, Anti-inflammatory, Antidiabetic',
    drugLikeness: 'Good',
    thumbnail: ''
  },
  {
    id: '38',
    name: 'Diosgenin',
    molecularFormula: 'C27H42O3',
    molecularWeight: 414.62,
    logP: 5.8,
    functionalGroups: ['Steroidal Saponin', 'Spiroketal', 'Hydroxyl (-OH)', 'Steroid'],
    smiles: 'C[C@H]1[C@H]2[C@H](C[C@@H]3[C@@]2(CC[C@H]4[C@H]3CC=C5[C@@]4(CC[C@@H](C5)O)C)C)O[C@@H]6[C@@H]1O[C@H](C)C[C@@H]6O',
    plantSources: ['Fenugreek', 'Wild Yam'],
    bioactivity: 'Anti-inflammatory, Anticancer, Cholesterol-lowering',
    drugLikeness: 'Moderate',
    thumbnail: ''
  },
  {
    id: '39',
    name: 'Trigonelline',
    molecularFormula: 'C7H7NO2',
    molecularWeight: 137.14,
    logP: -1.2,
    functionalGroups: ['Alkaloid', 'Pyridinium', 'Carboxyl (-COOH)', 'Betaine'],
    smiles: 'C[n+]1ccccc1C(=O)[O-]',
    plantSources: ['Fenugreek', 'Coffee'],
    bioactivity: 'Neuroprotective, Antidiabetic, Cognitive Enhancement',
    drugLikeness: 'Excellent',
    thumbnail: ''
  },
  {
    id: '40',
    name: 'Crocin',
    molecularFormula: 'C44H64O24',
    molecularWeight: 976.96,
    logP: 1.1,
    functionalGroups: ['Carotenoid', 'Glycoside', 'Ester', 'Hydroxyl (-OH)', 'Polyene'],
    smiles: 'CC(=O)O[C@H]1[C@@H](O)[C@@H](O)[C@H](O)[C@@H](O[C@H]2[C@@H](O)[C@H](O)[C@@H](O)[C@H](OC(=O)/C=C/C(C)=C/C=C/C(C)=C/C=C/C=C(C)/C=C/C=C(C)/C=C/C(=O)O[C@H]3[C@@H](O)[C@H](O)[C@@H](O)[C@H](O)[C@@H]3O)O2)O1',
    plantSources: ['Saffron'],
    bioactivity: 'Antidepressant, Neuroprotective, Antioxidant',
    drugLikeness: 'Poor (MW > 500)',
    thumbnail: ''
  },
  {
    id: '41',
    name: 'Safranal',
    molecularFormula: 'C10H14O',
    molecularWeight: 150.22,
    logP: 2.8,
    functionalGroups: ['Terpenoid', 'Aldehyde', 'Cyclic', 'Carbonyl'],
    smiles: 'CC1=C(C=O)C(C)(C)CC=C1',
    plantSources: ['Saffron'],
    bioactivity: 'Antidepressant, Anxiolytic, Neuroprotective',
    drugLikeness: 'Excellent',
    thumbnail: ''
  },
  {
    id: '42',
    name: 'Capsaicin',
    molecularFormula: 'C18H27NO3',
    molecularWeight: 305.41,
    logP: 4.0,
    functionalGroups: ['Vanilloid', 'Amide', 'Phenol', 'Methoxy (-OCH3)', 'Hydroxyl (-OH)'],
    smiles: 'COc1cc(CNC(=O)CCCC/C=C/C(C)C)ccc1O',
    plantSources: ['Chili Pepper'],
    bioactivity: 'Analgesic, Anti-inflammatory, Thermogenic',
    drugLikeness: 'Good',
    thumbnail: ''
  },
  {
    id: '43',
    name: 'Tanshinone IIA',
    molecularFormula: 'C19H18O3',
    molecularWeight: 294.34,
    logP: 4.5,
    functionalGroups: ['Quinone', 'Ketone', 'Terpenoid', 'Aromatic Ring', 'Furan'],
    smiles: 'CC(C)c1coc2c1C(=O)C(=O)c3c2ccc4c3CCCC4(C)C',
    plantSources: ['Red Sage'],
    bioactivity: 'Cardioprotective, Anti-inflammatory, Anticancer',
    drugLikeness: 'Good',
    thumbnail: ''
  },
  {
    id: '44',
    name: 'Artemisinin',
    molecularFormula: 'C15H22O5',
    molecularWeight: 282.33,
    logP: 2.9,
    functionalGroups: ['Sesquiterpene', 'Lactone', 'Peroxide', 'Endoperoxide', 'Ether'],
    smiles: 'CC1CC[C@H]2[C@@H](C)[C@@H](O)OO[C@@]23CC[C@@H]1[C@@H]3OC(=O)C',
    plantSources: ['Sweet Wormwood'],
    bioactivity: 'Antimalarial, Anticancer, Anti-inflammatory',
    drugLikeness: 'Good',
    thumbnail: ''
  },
  {
    id: '45',
    name: 'Rutin',
    molecularFormula: 'C27H30O16',
    molecularWeight: 610.52,
    logP: 0.6,
    functionalGroups: ['Flavonoid', 'Glycoside', 'Hydroxyl (-OH)', 'Ketone', 'Catechol'],
    smiles: 'O=C1c2c(O)cc(O[C@@H]3O[C@H](CO)[C@@H](O)[C@H](O)[C@H]3O[C@@H]4O[C@@H](C)[C@H](O)[C@@H](O)[C@H]4O)cc2OC(c5ccc(O)c(O)c5)=C1O',
    plantSources: ['Buckwheat', 'Citrus', 'Asparagus'],
    bioactivity: 'Antioxidant, Anti-inflammatory, Vascular Protection',
    drugLikeness: 'Poor (MW > 500)',
    thumbnail: ''
  },
  {
    id: '46',
    name: 'Chlorogenic Acid',
    molecularFormula: 'C16H18O9',
    molecularWeight: 354.31,
    logP: 0.3,
    functionalGroups: ['Phenolic Acid', 'Ester', 'Hydroxyl (-OH)', 'Catechol', 'Carboxyl (-COOH)'],
    smiles: 'O=C(O[C@H]1C[C@@](O)(C[C@H](O)[C@H]1O)C(=O)O)/C=C/c2ccc(O)c(O)c2',
    plantSources: ['Coffee', 'Green Tea', 'Echinacea'],
    bioactivity: 'Antioxidant, Anti-inflammatory, Antidiabetic',
    drugLikeness: 'Good',
    thumbnail: ''
  },
  {
    id: '47',
    name: 'Ferulic Acid',
    molecularFormula: 'C10H10O4',
    molecularWeight: 194.18,
    logP: 1.5,
    functionalGroups: ['Phenolic Acid', 'Hydroxyl (-OH)', 'Methoxy (-OCH3)', 'Carboxyl (-COOH)', 'Alkene (C=C)'],
    smiles: 'COc1cc(/C=C/C(=O)O)ccc1O',
    plantSources: ['Rice bran', 'Coffee', 'Apple'],
    bioactivity: 'Antioxidant, Photoprotective, Anti-inflammatory',
    drugLikeness: 'Excellent',
    thumbnail: ''
  },
  {
    id: '48',
    name: 'Hypericin',
    molecularFormula: 'C30H16O8',
    molecularWeight: 504.44,
    logP: 5.9,
    functionalGroups: ['Naphthodianthrone', 'Phenol', 'Hydroxyl (-OH)', 'Ketone', 'Aromatic Ring'],
    smiles: 'Cc1cc2c(c(C)c1O)-c3c4c(c(O)c5c(O)c(C)cc(C)c5c4=O)C(=O)c6c(O)c(C)cc(C)c6c3C2=O',
    plantSources: ['St. John\'s Wort'],
    bioactivity: 'Antidepressant, Antiviral, Photosensitizer',
    drugLikeness: 'Moderate',
    thumbnail: ''
  },
  {
    id: '49',
    name: 'Silymarin',
    molecularFormula: 'C25H22O10',
    molecularWeight: 482.44,
    logP: 2.1,
    functionalGroups: ['Flavonolignan', 'Phenol', 'Hydroxyl (-OH)', 'Methoxy (-OCH3)', 'Ether'],
    smiles: 'COc1cc(O)cc2c1C(=O)[C@@H]3[C@@H](O2)c4cc(O)c(O)cc4O[C@H]3c5ccc(O)cc5',
    plantSources: ['Milk Thistle'],
    bioactivity: 'Hepatoprotective, Antioxidant, Anti-inflammatory',
    drugLikeness: 'Moderate',
    thumbnail: ''
  },
  {
    id: '50',
    name: 'Theobromine',
    molecularFormula: 'C7H8N4O2',
    molecularWeight: 180.16,
    logP: -0.8,
    functionalGroups: ['Xanthine', 'Alkaloid', 'Purine', 'Methyl (-CH3)', 'Carbonyl'],
    smiles: 'Cn1cnc2c1c(=O)[nH]c(=O)n2C',
    plantSources: ['Cacao', 'Tea'],
    bioactivity: 'Vasodilator, Diuretic, Bronchodilator',
    drugLikeness: 'Excellent',
    thumbnail: ''
  }
];

interface DataInitializerProps {
  onDataLoaded: () => void;
}

export function DataInitializer({ onDataLoaded }: DataInitializerProps) {
  const [status, setStatus] = useState<'idle' | 'checking' | 'seeding' | 'complete' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = async () => {
    setStatus('checking');
    setMessage('Initializing application...');

    try {
      // First, test if the server is accessible
      console.log('🔍 Checking backend availability...');
      
      let isHealthy = false;
      try {
        isHealthy = await Promise.race([
          dataService.checkHealth(),
          new Promise<boolean>((_, reject) => 
            setTimeout(() => reject(new Error('Health check timeout')), 3000)
          )
        ]);
      } catch (healthError) {
        console.log('⚠️ Health check timed out or failed:', healthError);
        isHealthy = false;
      }

      if (!isHealthy) {
        console.log('⚠️ Backend not available, switching to demo mode...');
        setStatus('seeding');
        setMessage('Backend unavailable. Loading demo data...');
        
        // Seed data directly to localStorage for demo mode
        localStorage.setItem('demo_mode', 'true');
        localStorage.setItem('demo_plants', JSON.stringify(mockPlants));
        localStorage.setItem('demo_compounds', JSON.stringify(mockCompounds));
        
        setStatus('complete');
        setMessage('Demo data loaded successfully!');
        onDataLoaded();
        return;
      }

      // Backend is healthy, proceed with normal seeding
      console.log('✅ Backend is available, seeding data...');
      setStatus('seeding');
      setMessage('Seeding database with plant and compound data...');

      // Check if data already exists
      const existingPlants = await dataService.getAllPlants();
      
      if (existingPlants.length === 0) {
        // Seed plants
        console.log('📦 Seeding plants...');
        for (const plant of mockPlants) {
          await dataService.savePlant(plant);
        }
        
        // Seed compounds
        console.log('📦 Seeding compounds...');
        for (const compound of mockCompounds) {
          await dataService.saveCompound(compound);
        }
        
        console.log('✅ Database seeded successfully');
      } else {
        console.log('ℹ️ Data already exists, skipping seeding');
      }

      setStatus('complete');
      setMessage('Data loaded successfully!');
      onDataLoaded();
    } catch (error) {
      console.error('❌ Error initializing data:', error);
      setStatus('error');
      setMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleRetry = () => {
    setStatus('idle');
    setMessage('');
    initializeData();
  };

  if (status === 'idle' || status === 'checking' || status === 'seeding') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {status === 'checking' && 'Checking System...'}
            {status === 'seeding' && 'Loading Data...'}
            {status === 'idle' && 'Initializing...'}
          </h2>
          <p className="text-gray-600">{message}</p>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
        <Alert className="max-w-md">
          <AlertDescription>
            <div className="space-y-4">
              <p className="text-red-600 font-semibold">Failed to initialize application</p>
              <p className="text-sm text-gray-600">{message}</p>
              <Button onClick={handleRetry} className="w-full">
                Retry
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return null;
}