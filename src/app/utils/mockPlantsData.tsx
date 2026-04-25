// Comprehensive 50 Medicinal Plants Database

// Import custom plant images
import blackPepperImg from 'figma:asset/5dd0710f0aed488bc2b300949b6bfda2dd2f324f.png';
import cardamomImg from 'figma:asset/70a8151b74462fc6749447b40441539d071e4bdf.png';
import licoriceImg from 'figma:asset/2a26272bfaf216e3fd782a359c8e933d9aa0fef3.png';
import fenugreekImg from 'figma:asset/23191a16e6c6a45a6e6af6876fc239ea3ac090e2.png';
import saffronImg from 'figma:asset/d98b8228449f89b9a4df1e1ddfc810665973b2d2.png';
import ginsengImg from 'figma:asset/d4c5def7ca640cbc83e43dc9b2a91c67c11041ee.png';
import peppermintImg from 'figma:asset/f3a5783fa561fd6b9b5818d77102c467180eef7b.png';
import eucalyptusImg from 'figma:asset/66110e86d8d90d8576913aa37b1662cda0b1ed87.png';
import lemongrassImg from 'figma:asset/1febbcf6084bcc193990be3f6978605c16ca45df.png';
import moringaImg from 'figma:asset/51c60af7f9212e29f2b9869da1462ee55eb40cb7.png';
import arjunaImg from 'figma:asset/abc4f963e22d901e5eb60a91155d3f4c1ef4e141.png';
import haritakiImg from 'figma:asset/07bbab55a81153c77ea1273acf13a3e96d9e0cb5.png';
import bibhitakiImg from 'figma:asset/6487284bc559aebb63d6fddc9a129e53f2cd306b.png';
import shatavariImg from 'figma:asset/450149ab34cc0f16fa720e35686b4f6f03cce7e4.png';
import kalmeghImg from 'figma:asset/5d129cfbb4d1e73de24beb0b82c2e9a3019f1a75.png';
import vasakaImg from 'figma:asset/5e44720fab1024a45340ce0151da79f31e468e9d.png';
import gotuKolaImg from 'figma:asset/ad6391f7a404c60e875265e8de69e4c66f26d78c.png';
import aloeVeraImg from 'figma:asset/1992ea5d1c6fe36aef902d5dd5f715e92bbf2694.png';
import sennaImg from 'figma:asset/102b6ad8bb191d16df0213a6754b68b2134e824e.png';
import noniImg from 'figma:asset/58af2f6c35aacc43e1a634fca219b00637eb46a8.png';
import bayLeafImg from 'figma:asset/c071ebf7802091d1b61daf5d1ec907ac64557b91.png';
import fennelImg from 'figma:asset/4b53c3017c5039565cf15d7767030d7a72ce4924.png';
import corianderImg from 'figma:asset/65e758025e2a0be9ac19f2a7517f00758d4e42d2.png';
import nutmegImg from 'figma:asset/d6e292cb84ebaf937a442a1c115e046d9af39f78.png';
import jamunImg from 'figma:asset/ab8420d3a03c4a448e24fc82a5bba8dcdecbb169.png';
import karelaImg from 'figma:asset/cba43f90d1ae8717d96e2c4da6c624187dba14a7.png';
import ashokaImg from 'figma:asset/1abf63a3aaa4112687761b43bcaf7609cf8d17ed.png';
import bhringrajImg from 'figma:asset/fbf9497926d3629e6601137b6a9f1199be7b060e.png';
import punarnawaImg from 'figma:asset/314f06c94343459bd4df0a154d4d067a1afa4c14.png';
import nagarmothaImg from 'figma:asset/35790e17a83b102787642960577fdd85e0ccfe8b.png';
import vidangaImg from 'figma:asset/9436e1699f3545dc79aa9ac91c62ba34b2a1c641.png';
import kantakariImg from 'figma:asset/f1c3690f547f2606ea29b0232cb006cb06a3e4ad.png';
import guduchiImg from 'figma:asset/7a9ed4c29305105c2daadde7cc029d3205188362.png';
import amalakiImg from 'figma:asset/d3cb557d2e1605ec9ffd8b718e95a859e75f8dcf.png';
import erandaImg from 'figma:asset/9d1cb409d57d2dde7a8be066c89a9cb1cacd49f5.png';
import kutkiImg from 'figma:asset/3a843a1f633691f4d31be4c68f7b1b122bbda5c0.png';
import neemLeafImg from 'figma:asset/c436913d4f335134c21ddc358030b619398ecaaa.png';
import neemBarkImg from 'figma:asset/464fd9fc596fe5e28186ff4f63249677eb264bd6.png';
import cloveImg from 'figma:asset/16c3be058fa6b10548f3bde1f6649761d1cb8d3b.png';

export const COMPREHENSIVE_PLANTS_DATA = [
  {
    id: '1',
    name: 'Turmeric (Curcuma longa)',
    tamilName: 'மஞ்சள்',
    scientificName: 'Curcuma longa',
    image: 'https://images.unsplash.com/photo-1673208126879-18094b40d9cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXJtZXJpYyUyMHJvb3QlMjBnb2xkZW58ZW58MXx8fHwxNzY4MzkxNzQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    compounds: 23,
    functionalGroups: ['Phenol', 'Hydroxyl (-OH)', 'Carbonyl', 'Ester', 'Aromatic Ring', 'Methoxy'],
    plantType: 'Herb',
    primaryCompounds: ['Curcumin', 'Demethoxycurcumin', 'Bisdemethoxycurcumin'],
    therapeuticTargets: ['Anti-inflammatory Response', 'Antioxidant Systems', 'Anticancer Activity', 'Neuroprotection'],
    description: 'Known for its powerful anti-inflammatory and antioxidant properties, rich in curcuminoids.'
  },
  {
    id: '2',
    name: 'Neem (Azadirachta indica)',
    tamilName: 'வேப்பமரம்',
    scientificName: 'Azadirachta indica',
    image: 'https://images.unsplash.com/photo-1687945906634-25c66199d941?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZWVtJTIwdHJlZSUyMGxlYXZlc3xlbnwxfHx8fDE3Njg0NjA2ODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    compounds: 18,
    functionalGroups: ['Terpenoid', 'Lactone', 'Phenol', 'Alkaloid', 'Glycoside'],
    plantType: 'Tree',
    primaryCompounds: ['Azadirachtin', 'Nimbin', 'Nimbidin'],
    therapeuticTargets: ['Antimicrobial Activity', 'Antiviral Response', 'Immunomodulation', 'Skin Health'],
    description: 'Versatile medicinal tree with powerful antimicrobial and antiviral properties, used extensively in traditional medicine.'
  },
  {
    id: '3',
    name: 'Tulsi / Holy Basil (Ocimum sanctum)',
    tamilName: 'துளசி',
    scientificName: 'Ocimum sanctum',
    image: 'https://images.unsplash.com/photo-1754493930441-2550a605e805?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob2x5JTIwYmFzaWwlMjB0dWxzaSUyMHBsYW50fGVufDF8fHx8MTc2ODQ2MDY4M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    compounds: 16,
    functionalGroups: ['Phenol', 'Terpenoid', 'Essential Oil', 'Aromatic Ring', 'Hydroxyl (-OH)'],
    plantType: 'Herb',
    primaryCompounds: ['Eugenol', 'Ursolic acid', 'Rosmarinic acid'],
    therapeuticTargets: ['Stress Response', 'Immune Support', 'Respiratory Health', 'Antioxidant Systems'],
    description: 'Sacred plant in Ayurveda with adaptogenic properties, excellent for stress management and immune support.'
  },
  {
    id: '4',
    name: 'Ashwagandha (Withania somnifera)',
    tamilName: 'அஸ்வகந்தா',
    scientificName: 'Withania somnifera',
    image: 'https://images.unsplash.com/photo-1701788001609-c2d7a42d6fc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2h3YWdhbmRoYSUyMHJvb3RzJTIwZHJpZWR8ZW58MXx8fHwxNzY4NDYwNjg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    compounds: 21,
    functionalGroups: ['Steroid', 'Lactone', 'Withanolide', 'Alkaloid'],
    plantType: 'Herb',
    primaryCompounds: ['Withanolides', 'Withaferin A', 'Withanone'],
    therapeuticTargets: ['Neuroprotection', 'Anti-anxiety', 'Stress Adaptation', 'Cognitive Enhancement'],
    description: 'Powerful adaptogenic herb with neuroprotective and anti-anxiety properties, supports cognitive function.'
  },
  {
    id: '5',
    name: 'Ginger (Zingiber officinale)',
    tamilName: 'இஞ்சி',
    scientificName: 'Zingiber officinale',
    image: 'https://images.unsplash.com/photo-1763019228611-b2bce31c89d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGdpbmdlciUyMHJvb3R8ZW58MXx8fHwxNzY4MzgxMDQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    compounds: 19,
    functionalGroups: ['Phenol', 'Ketone', 'Hydroxyl (-OH)', 'Aromatic Ring', 'Ether'],
    plantType: 'Herb',
    primaryCompounds: ['Gingerol', 'Shogaol', 'Zingerone'],
    therapeuticTargets: ['Anti-inflammatory Response', 'Antiemetic Activity', 'Analgesic Effect', 'Digestive Health'],
    description: 'Popular spice with potent anti-inflammatory and digestive properties, effective against nausea.'
  },
  {
    id: '6',
    name: 'Garlic (Allium sativum)',
    tamilName: 'பூண்டு',
    scientificName: 'Allium sativum',
    image: 'https://images.unsplash.com/photo-1661760194787-1f4d523f2eec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJsaWMlMjBidWxicyUyMGZyZXNofGVufDF8fHx8MTc2ODM5MTc1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    compounds: 22,
    functionalGroups: ['Sulfur Compounds', 'Thiol', 'Disulfide', 'Allyl'],
    plantType: 'Herb',
    primaryCompounds: ['Allicin', 'Ajoene', 'S-allyl cysteine'],
    therapeuticTargets: ['Cardiovascular Health', 'Antimicrobial Activity', 'Antioxidant Systems', 'Blood Pressure Regulation'],
    description: 'Renowned for cardiovascular benefits and antimicrobial properties, contains organosulfur compounds.'
  },
  {
    id: '7',
    name: 'Green Tea (Camellia sinensis)',
    tamilName: 'பச்சை தேநீர்',
    scientificName: 'Camellia sinensis',
    image: 'https://images.unsplash.com/photo-1602943543714-cf535b048440?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMHRlYSUyMGxlYXZlc3xlbnwxfHx8fDE3Njg0NjA2ODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    compounds: 25,
    functionalGroups: ['Phenol', 'Catechin', 'Flavonoid', 'Hydroxyl (-OH)', 'Aromatic Ring'],
    plantType: 'Shrub',
    primaryCompounds: ['EGCG', 'Catechins', 'Theanine'],
    therapeuticTargets: ['Antioxidant Systems', 'Neuroprotection', 'Anti-obesity', 'Cancer Prevention'],
    description: 'Rich in catechins and antioxidants, supports brain health and metabolic function.'
  },
  {
    id: '8',
    name: 'Amla / Indian Gooseberry (Emblica officinalis)',
    tamilName: 'நெ��்லிக்காய்',
    scientificName: 'Emblica officinalis',
    image: 'https://images.unsplash.com/photo-1694975350184-732334941a0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbWxhJTIwaW5kaWFuJTIwZ29vc2ViZXJyeXxlbnwxfHx8fDE3NjgzNzkwMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    compounds: 20,
    functionalGroups: ['Phenol', 'Tannin', 'Flavonoid', 'Vitamin C', 'Hydroxyl (-OH)'],
    plantType: 'Tree',
    primaryCompounds: ['Vitamin C', 'Ellagic acid', 'Gallic acid'],
    therapeuticTargets: ['Antioxidant Systems', 'Hepatoprotection', 'Immunomodulation', 'Rejuvenation'],
    description: 'Exceptionally rich in vitamin C and antioxidants, supports liver health and immunity.'
  },
  {
    id: '9',
    name: 'Brahmi (Bacopa monnieri)',
    tamilName: 'பிரம்மி',
    scientificName: 'Bacopa monnieri',
    image: 'https://images.unsplash.com/photo-1644820864412-2e08f6f7c975?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFobWklMjBiYWNvcGElMjBwbGFudHxlbnwxfHx8fDE3Njg0NjA2ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    compounds: 17,
    functionalGroups: ['Saponin', 'Triterpenoid', 'Glycoside', 'Alkaloid'],
    plantType: 'Herb',
    primaryCompounds: ['Bacosides', 'Bacoside A', 'Bacopaside'],
    therapeuticTargets: ['Cognitive Enhancement', 'Memory Support', 'Anxiolytic Effect', 'Neuroprotection'],
    description: 'Renowned nootropic herb that enhances memory, learning, and cognitive function.'
  },
  {
    id: '10',
    name: 'Giloy (Tinospora cordifolia)',
    tamilName: 'கிலோய்',
    scientificName: 'Tinospora cordifolia',
    image: 'https://images.unsplash.com/photo-1755394834920-91c09ddbdafe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaWxveSUyMHRpbm9zcG9yYSUyMHZpbmV8ZW58MXx8fHwxNzY4NDYwNjg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    compounds: 19,
    functionalGroups: ['Alkaloid', 'Terpenoid', 'Glycoside', 'Lactone'],
    plantType: 'Vine',
    primaryCompounds: ['Tinosporin', 'Berberine', 'Giloin'],
    therapeuticTargets: ['Immunomodulation', 'Antipyretic Activity', 'Hepatoprotection', 'Anti-inflammatory Response'],
    description: 'Powerful immunomodulator and antipyretic herb, excellent for fever and liver health.'
  },
  // Continue with remaining 40 plants...
  {
    id: '11',
    name: 'Cinnamon (Cinnamomum verum)',
    tamilName: 'பட்டை',
    scientificName: 'Cinnamomum verum',
    image: 'https://images.unsplash.com/photo-1758657996518-e67bd328854e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5uYW1vbiUyMHN0aWNrcyUyMGJhcmt8ZW58MXx8fHwxNzY4MzkzODIxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    compounds: 15,
    functionalGroups: ['Aldehyde', 'Phenol', 'Aromatic Ring', 'Essential Oil'],
    plantType: 'Tree',
    primaryCompounds: ['Cinnamaldehyde', 'Eugenol', 'Coumarin'],
    therapeuticTargets: ['Blood Glucose Regulation', 'Antimicrobial Activity', 'Antioxidant Systems', 'Anti-inflammatory Response'],
    description: 'Antidiabetic spice with antimicrobial properties and blood sugar regulation benefits.'
  },
  {
    id: '12',
    name: 'Clove (Syzygium aromaticum)',
    tamilName: 'கிராம்பு',
    scientificName: 'Syzygium aromaticum',
    image: cloveImg,
    compounds: 14,
    functionalGroups: ['Phenol', 'Essential Oil', 'Aromatic Ring', 'Hydroxyl (-OH)'],
    plantType: 'Tree',
    primaryCompounds: ['Eugenol', 'Acetyl eugenol', 'Beta-caryophyllene'],
    therapeuticTargets: ['Analgesic Effect', 'Antimicrobial Activity', 'Antioxidant Systems', 'Dental Health'],
    description: 'Powerful analgesic and antimicrobial spice, particularly effective for dental pain.'
  },
  {
    id: '13',
    name: 'Black Pepper (Piper nigrum)',
    tamilName: 'மிளகு',
    scientificName: 'Piper nigrum',
    image: blackPepperImg,
    compounds: 12,
    functionalGroups: ['Alkaloid', 'Amide', 'Piperidine', 'Aromatic Ring'],
    plantType: 'Vine',
    primaryCompounds: ['Piperine', 'Chavicine', 'Piperanine'],
    therapeuticTargets: ['Bioavailability Enhancement', 'Antioxidant Systems', 'Digestive Health', 'Anti-inflammatory Response'],
    description: 'Contains piperine which enhances bioavailability of other compounds and nutrients.'
  },
  {
    id: '14',
    name: 'Cardamom (Elettaria cardamomum)',
    tamilName: 'ஏலக்காய',
    scientificName: 'Elettaria cardamomum',
    image: cardamomImg,
    compounds: 13,
    functionalGroups: ['Terpenoid', 'Essential Oil', 'Ether', 'Alcohol'],
    plantType: 'Herb',
    primaryCompounds: ['1,8-Cineole', 'Alpha-terpineol', 'Limonene'],
    therapeuticTargets: ['Digestive Health', 'Antimicrobial Activity', 'Antioxidant Systems', 'Respiratory Health'],
    description: 'Aromatic spice with digestive and antimicrobial properties, supports respiratory health.'
  },
  {
    id: '15',
    name: 'Licorice (Glycyrrhiza glabra)',
    tamilName: 'அதிமதுரம்',
    scientificName: 'Glycyrrhiza glabra',
    image: licoriceImg,
    compounds: 18,
    functionalGroups: ['Saponin', 'Triterpenoid', 'Flavonoid', 'Glycoside'],
    plantType: 'Herb',
    primaryCompounds: ['Glycyrrhizin', 'Glabridin', 'Liquiritin'],
    therapeuticTargets: ['Anti-inflammatory Response', 'Antiviral Activity', 'Hepatoprotection', 'Ulcer Healing'],
    description: 'Sweet root with anti-inflammatory and hepatoprotective properties, supports digestive health.'
  },
  {
    id: '16',
    name: 'Fenugreek (Trigonella foenum-graecum)',
    tamilName: 'வெந்தயம்',
    scientificName: 'Trigonella foenum-graecum',
    image: fenugreekImg,
    compounds: 16,
    functionalGroups: ['Alkaloid', 'Saponin', 'Steroidal Saponin', 'Amino Acid'],
    plantType: 'Herb',
    primaryCompounds: ['4-Hydroxyisoleucine', 'Diosgenin', 'Trigonelline'],
    therapeuticTargets: ['Blood Glucose Regulation', 'Lactation Support', 'Anti-obesity', 'Cholesterol Management'],
    description: 'Seed with antidiabetic and galactagogue properties, supports metabolic health.'
  },
  {
    id: '17',
    name: 'Saffron (Crocus sativus)',
    tamilName: 'குங்குமப்பூ',
    scientificName: 'Crocus sativus',
    image: saffronImg,
    compounds: 14,
    functionalGroups: ['Carotenoid', 'Aldehyde', 'Terpenoid', 'Glycoside'],
    plantType: 'Herb',
    primaryCompounds: ['Crocin', 'Safranal', 'Picrocrocin'],
    therapeuticTargets: ['Antidepressant Activity', 'Neuroprotection', 'Antioxidant Systems', 'Mood Enhancement'],
    description: 'Precious spice with antidepressant and neuroprotective properties, supports mental health.'
  },
  {
    id: '18',
    name: 'Ginseng (Panax ginseng)',
    tamilName: 'ஜின்செங்',
    scientificName: 'Panax ginseng',
    image: ginsengImg,
    compounds: 22,
    functionalGroups: ['Saponin', 'Triterpenoid', 'Ginsenoside', 'Glycoside'],
    plantType: 'Herb',
    primaryCompounds: ['Ginsenosides', 'Panaxadiol', 'Panaxatriol'],
    therapeuticTargets: ['Stress Adaptation', 'Cognitive Enhancement', 'Immunomodulation', 'Energy Support'],
    description: 'Premier adaptogenic root that enhances physical and mental performance.'
  },
  {
    id: '19',
    name: 'Peppermint (Mentha piperita)',
    tamilName: 'புதினா',
    scientificName: 'Mentha piperita',
    image: peppermintImg,
    compounds: 15,
    functionalGroups: ['Terpenoid', 'Essential Oil', 'Alcohol', 'Ketone'],
    plantType: 'Herb',
    primaryCompounds: ['Menthol', 'Menthone', 'Menthyl acetate'],
    therapeuticTargets: ['Digestive Health', 'Analgesic Effect', 'Antimicrobial Activity', 'IBS Relief'],
    description: 'Cooling herb with digestive and analgesic properties, effective for IBS symptoms.'
  },
  {
    id: '20',
    name: 'Eucalyptus (Eucalyptus globulus)',
    tamilName: 'யூகலிப்டஸ்',
    scientificName: 'Eucalyptus globulus',
    image: eucalyptusImg,
    compounds: 13,
    functionalGroups: ['Terpenoid', 'Essential Oil', 'Ether', 'Alcohol'],
    plantType: 'Tree',
    primaryCompounds: ['Eucalyptol', '1,8-Cineole', 'Alpha-pinene'],
    therapeuticTargets: ['Respiratory Health', 'Antimicrobial Activity', 'Anti-inflammatory Response', 'Decongestant'],
    description: 'Aromatic tree with powerful respiratory benefits and antimicrobial properties.'
  },
  // Add remaining 30 plants (21-50) with similar structure
  {
    id: '21',
    name: 'Lemongrass (Cymbopogon citratus)',
    tamilName: 'எலுமிச்சை புல்',
    scientificName: 'Cymbopogon citratus',
    image: lemongrassImg,
    compounds: 12,
    functionalGroups: ['Terpenoid', 'Essential Oil', 'Aldehyde', 'Alcohol'],
    plantType: 'Herb',
    primaryCompounds: ['Citral', 'Geraniol', 'Limonene'],
    therapeuticTargets: ['Antimicrobial Activity', 'Antioxidant Systems', 'Anxiolytic Effect', 'Digestive Health'],
    description: 'Aromatic grass with antimicrobial and calming properties.'
  },
  {
    id: '22',
    name: 'Moringa (Moringa oleifera)',
    tamilName: 'முருங்கை',
    scientificName: 'Moringa oleifera',
    image: moringaImg,
    compounds: 20,
    functionalGroups: ['Isothiocyanate', 'Flavonoid', 'Phenol', 'Vitamin', 'Mineral'],
    plantType: 'Tree',
    primaryCompounds: ['Isothiocyanates', 'Quercetin', 'Kaempferol'],
    therapeuticTargets: ['Nutritional Support', 'Anti-inflammatory Response', 'Antioxidant Systems', 'Blood Sugar Regulation'],
    description: 'Nutrient-dense tree with exceptional anti-inflammatory and antioxidant properties.'
  },
  {
    id: '23',
    name: 'Arjuna (Terminalia arjuna)',
    tamilName: 'அர்ஜுனம்',
    scientificName: 'Terminalia arjuna',
    image: arjunaImg,
    compounds: 17,
    functionalGroups: ['Triterpenoid', 'Tannin', 'Flavonoid', 'Saponin'],
    plantType: 'Tree',
    primaryCompounds: ['Arjunolic acid', 'Arjunetin', 'Tannins'],
    therapeuticTargets: ['Cardioprotection', 'Antioxidant Systems', 'Anti-ischemic', 'Blood Pressure Regulation'],
    description: 'Powerful cardioprotective herb that supports heart health and reduces ischemic damage.'
  },
  {
    id: '24',
    name: 'Haritaki (Terminalia chebula)',
    tamilName: 'கடுக்காய்',
    scientificName: 'Terminalia chebula',
    image: haritakiImg,
    compounds: 16,
    functionalGroups: ['Tannin', 'Phenolic acid', 'Flavonoid', 'Glycoside'],
    plantType: 'Tree',
    primaryCompounds: ['Chebulagic acid', 'Chebulinic acid', 'Ellagic acid'],
    therapeuticTargets: ['Digestive Health', 'Antioxidant Systems', 'Antimicrobial Activity', 'Laxative Effect'],
    description: 'Revered Ayurvedic herb for digestive health with powerful antioxidant properties.'
  },
  {
    id: '25',
    name: 'Bibhitaki (Terminalia bellirica)',
    tamilName: 'தான்றிக்காய்',
    scientificName: 'Terminalia bellirica',
    image: bibhitakiImg,
    compounds: 15,
    functionalGroups: ['Tannin', 'Phenolic acid', 'Glycoside', 'Flavonoid'],
    plantType: 'Tree',
    primaryCompounds: ['Gallic acid', 'Ellagic acid', 'Belleric acid'],
    therapeuticTargets: ['Antioxidant Systems', 'Antimicrobial Activity', 'Hepatoprotection', 'Respiratory Health'],
    description: 'Part of Triphala formulation with antioxidant and hepatoprotective properties.'
  },
  {
    id: '26',
    name: 'Shatavari (Asparagus racemosus)',
    tamilName: 'சதாவரி',
    scientificName: 'Asparagus racemosus',
    image: shatavariImg,
    compounds: 14,
    functionalGroups: ['Saponin', 'Steroidal Saponin', 'Alkaloid', 'Flavonoid'],
    plantType: 'Herb',
    primaryCompounds: ['Shatavarin', 'Asparagamine', 'Saponins'],
    therapeuticTargets: ['Lactation Support', 'Immunomodulation', 'Antioxidant Systems', 'Reproductive Health'],
    description: 'Renowned female tonic with galactagogue and immunomodulatory properties.'
  },
  {
    id: '27',
    name: 'Kalmegh (Andrographis paniculata)',
    tamilName: 'நிலவேம்பு',
    scientificName: 'Andrographis paniculata',
    image: kalmeghImg,
    compounds: 18,
    functionalGroups: ['Lactone', 'Diterpenoid', 'Flavonoid', 'Ketone'],
    plantType: 'Herb',
    primaryCompounds: ['Andrographolide', 'Neoandrographolide', 'Deoxyandrographolide'],
    therapeuticTargets: ['Hepatoprotection', 'Immunomodulation', 'Antimicrobial Activity', 'Anti-inflammatory Response'],
    description: 'Bitter herb with potent hepatoprotective and immunomodulatory properties.'
  },
  {
    id: '28',
    name: 'Vasaka (Adhatoda vasica)',
    tamilName: 'ஆடாதோடை',
    scientificName: 'Adhatoda vasica',
    image: vasakaImg,
    compounds: 13,
    functionalGroups: ['Alkaloid', 'Quinazoline', 'Ketone'],
    plantType: 'Shrub',
    primaryCompounds: ['Vasicine', 'Vasicinone', 'Alkaloids'],
    therapeuticTargets: ['Bronchodilation', 'Expectorant Activity', 'Antimicrobial Activity', 'Respiratory Health'],
    description: 'Powerful bronchodilator and expectorant for respiratory conditions.'
  },
  {
    id: '29',
    name: 'Gotu Kola (Centella asiatica)',
    tamilName: 'வல்லாரை',
    scientificName: 'Centella asiatica',
    image: gotuKolaImg,
    compounds: 16,
    functionalGroups: ['Triterpenoid', 'Saponin', 'Glycoside', 'Flavonoid'],
    plantType: 'Herb',
    primaryCompounds: ['Asiaticoside', 'Madecassoside', 'Asiatic acid'],
    therapeuticTargets: ['Wound Healing', 'Cognitive Enhancement', 'Anti-anxiety', 'Collagen Synthesis'],
    description: 'Renowned for wound healing and cognitive enhancement properties.'
  },
  {
    id: '30',
    name: 'Aloe Vera',
    tamilName: 'கற்றாழை',
    scientificName: 'Aloe barbadensis miller',
    image: aloeVeraImg,
    compounds: 17,
    functionalGroups: ['Anthraquinone', 'Polysaccharide', 'Glycoside', 'Acemannan'],
    plantType: 'Succulent',
    primaryCompounds: ['Aloin', 'Aloe-emodin', 'Acemannan'],
    therapeuticTargets: ['Wound Healing', 'Anti-inflammatory Response', 'Laxative Effect', 'Skin Health'],
    description: 'Versatile succulent with wound healing and anti-inflammatory properties.'
  },
  // Continuing with remaining 20 plants (31-50)...
  {
    id: '31',
    name: 'Senna (Cassia angustifolia)',
    tamilName: 'நிலவாகை',
    scientificName: 'Cassia angustifolia',
    image: sennaImg,
    compounds: 11,
    functionalGroups: ['Anthraquinone', 'Glycoside', 'Sennoside'],
    plantType: 'Shrub',
    primaryCompounds: ['Sennosides', 'Anthraquinones', 'Rhein'],
    therapeuticTargets: ['Laxative Effect', 'Purgative Activity', 'Digestive Health', 'Constipation Relief'],
    description: 'Powerful natural laxative used for constipation relief.'
  },
  {
    id: '32',
    name: 'Noni (Morinda citrifolia)',
    tamilName: 'நோனி',
    scientificName: 'Morinda citrifolia',
    image: noniImg,
    compounds: 15,
    functionalGroups: ['Iridoid', 'Coumarin', 'Anthraquinone', 'Flavonoid'],
    plantType: 'Tree',
    primaryCompounds: ['Iridoids', 'Scopoletin', 'Damnacanthal'],
    therapeuticTargets: ['Immunomodulation', 'Antioxidant Systems', 'Analgesic Effect', 'Anti-inflammatory Response'],
    description: 'Tropical fruit with immunomodulatory and antioxidant properties.'
  },
  {
    id: '33',
    name: 'Bay Leaf (Cinnamomum tamala)',
    tamilName: 'தேஜ்பத்திரி',
    scientificName: 'Cinnamomum tamala',
    image: bayLeafImg,
    compounds: 12,
    functionalGroups: ['Phenol', 'Essential Oil', 'Terpenoid', 'Ether'],
    plantType: 'Tree',
    primaryCompounds: ['Eugenol', 'Methyleugenol', 'Cineole'],
    therapeuticTargets: ['Digestive Health', 'Antimicrobial Activity', 'Antioxidant Systems', 'Blood Sugar Regulation'],
    description: 'Aromatic leaf with digestive and antimicrobial properties.'
  },
  {
    id: '34',
    name: 'Fennel (Foeniculum vulgare)',
    tamilName: 'பெருஞ்சீரகம்',
    scientificName: 'Foeniculum vulgare',
    image: fennelImg,
    compounds: 13,
    functionalGroups: ['Terpenoid', 'Essential Oil', 'Phenylpropanoid', 'Ether'],
    plantType: 'Herb',
    primaryCompounds: ['Anethole', 'Fenchone', 'Estragole'],
    therapeuticTargets: ['Digestive Health', 'Carminative Effect', 'Antispasmodic', 'Lactation Support'],
    description: 'Aromatic seed with digestive and carminative properties.'
  },
  {
    id: '35',
    name: 'Coriander (Coriandrum sativum)',
    tamilName: 'கொத்தமல்லி',
    scientificName: 'Coriandrum sativum',
    image: corianderImg,
    compounds: 14,
    functionalGroups: ['Terpenoid', 'Essential Oil', 'Alcohol', 'Aldehyde'],
    plantType: 'Herb',
    primaryCompounds: ['Linalool', 'Geranyl acetate', 'Camphor'],
    therapeuticTargets: ['Digestive Health', 'Antioxidant Systems', 'Antimicrobial Activity', 'Blood Sugar Regulation'],
    description: 'Culinary herb with digestive and antioxidant properties.'
  },
  {
    id: '36',
    name: 'Nutmeg (Myristica fragrans)',
    tamilName: 'ஜாதிக்காய்',
    scientificName: 'Myristica fragrans',
    image: nutmegImg,
    compounds: 11,
    functionalGroups: ['Terpenoid', 'Essential Oil', 'Phenylpropanoid', 'Ether'],
    plantType: 'Tree',
    primaryCompounds: ['Myristicin', 'Elemicin', 'Safrole'],
    therapeuticTargets: ['Digestive Health', 'Carminative Effect', 'Antimicrobial Activity', 'Sedative Effect'],
    description: 'Aromatic spice with digestive and mild sedative properties.'
  },
  {
    id: '37',
    name: 'Jamun (Syzygium cumini)',
    tamilName: 'நாவல் பழம்',
    scientificName: 'Syzygium cumini',
    image: jamunImg,
    compounds: 15,
    functionalGroups: ['Alkaloid', 'Phenol', 'Anthocyanin', 'Glycoside'],
    plantType: 'Tree',
    primaryCompounds: ['Jambosine', 'Ellagic acid', 'Anthocyanins'],
    therapeuticTargets: ['Blood Glucose Regulation', 'Antioxidant Systems', 'Antimicrobial Activity', 'Diabetic Management'],
    description: 'Fruit with potent antidiabetic and antioxidant properties.'
  },
  {
    id: '38',
    name: 'Karela / Bitter Gourd (Momordica charantia)',
    tamilName: 'பாகற்காய்',
    scientificName: 'Momordica charantia',
    image: karelaImg,
    compounds: 18,
    functionalGroups: ['Triterpene', 'Saponin', 'Peptide', 'Alkaloid'],
    plantType: 'Vine',
    primaryCompounds: ['Charantin', 'Momordicin', 'Polypeptide-p'],
    therapeuticTargets: ['Blood Glucose Regulation', 'Antiviral Activity', 'Immunomodulation', 'Anticancer Activity'],
    description: 'Bitter vegetable with strong antidiabetic and antiviral properties.'
  },
  {
    id: '39',
    name: 'Ashoka (Saraca asoca)',
    tamilName: 'அசோகம்',
    scientificName: 'Saraca asoca',
    image: ashokaImg,
    compounds: 14,
    functionalGroups: ['Catechin', 'Steroid', 'Flavonoid', 'Glycoside'],
    plantType: 'Tree',
    primaryCompounds: ['Catechins', 'Steroids', 'Flavonoids'],
    therapeuticTargets: ['Uterotonic Activity', 'Anti-inflammatory Response', 'Antioxidant Systems', 'Women Health'],
    description: 'Sacred tree bark used for women\'s health and uterine disorders.'
  },
  {
    id: '40',
    name: 'Bhringraj (Eclipta alba)',
    tamilName: 'கரிசலாங்கண்ணி',
    scientificName: 'Eclipta alba',
    image: bhringrajImg,
    compounds: 13,
    functionalGroups: ['Coumestan', 'Thiophene', 'Flavonoid', 'Triterpenoid'],
    plantType: 'Herb',
    primaryCompounds: ['Wedelolactone', 'Eclalbatin', 'Coumestans'],
    therapeuticTargets: ['Hepatoprotection', 'Hair Growth', 'Antimicrobial Activity', 'Anti-aging'],
    description: 'Liver protective herb renowned for promoting hair growth.'
  },
  {
    id: '41',
    name: 'Punarnava (Boerhavia diffusa)',
    tamilName: 'முக்கிரட்டை',
    scientificName: 'Boerhavia diffusa',
    image: punarnawaImg,
    compounds: 12,
    functionalGroups: ['Rotenoid', 'Alkaloid', 'Flavonoid', 'Phenol'],
    plantType: 'Herb',
    primaryCompounds: ['Punarnavine', 'Rotenoids', 'Flavonoids'],
    therapeuticTargets: ['Diuretic Effect', 'Hepatoprotection', 'Anti-inflammatory Response', 'Kidney Health'],
    description: 'Diuretic herb that supports kidney and liver function.'
  },
  {
    id: '42',
    name: 'Nagarmotha (Cyperus rotundus)',
    tamilName: 'கோரைக்கிழங்கு',
    scientificName: 'Cyperus rotundus',
    image: nagarmothaImg,
    compounds: 11,
    functionalGroups: ['Sesquiterpene', 'Ketone', 'Terpenoid', 'Essential Oil'],
    plantType: 'Herb',
    primaryCompounds: ['Cyperone', 'Cyperene', 'Alpha-cyperone'],
    therapeuticTargets: ['Anti-inflammatory Response', 'Analgesic Effect', 'Digestive Health', 'Antimicrobial Activity'],
    description: 'Aromatic tuber with anti-inflammatory and digestive properties.'
  },
  {
    id: '43',
    name: 'Vidanga (Embelia ribes)',
    tamilName: 'வாய்விளங்கம்',
    scientificName: 'Embelia ribes',
    image: vidangaImg,
    compounds: 10,
    functionalGroups: ['Quinone', 'Phenol', 'Alkylbenzoquinone'],
    plantType: 'Shrub',
    primaryCompounds: ['Embelin', 'Vilangin', 'Quercitol'],
    therapeuticTargets: ['Anthelmintic Activity', 'Antimicrobial Activity', 'Antioxidant Systems', 'Anti-obesity'],
    description: 'Traditional anthelmintic herb with antimicrobial properties.'
  },
  {
    id: '44',
    name: 'Kantakari (Solanum xanthocarpum)',
    tamilName: 'கண்டங்கத்திரி',
    scientificName: 'Solanum xanthocarpum',
    image: kantakariImg,
    compounds: 12,
    functionalGroups: ['Alkaloid', 'Steroid', 'Saponin', 'Glycoside'],
    plantType: 'Herb',
    primaryCompounds: ['Solasodine', 'Carpesterol', 'Alkaloids'],
    therapeuticTargets: ['Respiratory Health', 'Anti-asthmatic', 'Expectorant Activity', 'Bronchodilation'],
    description: 'Respiratory herb effective for asthma and bronchitis.'
  },
  {
    id: '45',
    name: 'Guduchi (Tinospora cordifolia)',
    tamilName: 'குடூச்சி',
    scientificName: 'Tinospora cordifolia',
    image: guduchiImg,
    compounds: 19,
    functionalGroups: ['Alkaloid', 'Terpenoid', 'Glycoside', 'Lactone'],
    plantType: 'Vine',
    primaryCompounds: ['Tinosporin', 'Berberine', 'Giloin'],
    therapeuticTargets: ['Immunomodulation', 'Antipyretic Activity', 'Hepatoprotection', 'Anti-inflammatory Response'],
    description: 'Same as Giloy - powerful immunomodulator and antipyretic herb.'
  },
  {
    id: '46',
    name: 'Amalaki (Emblica officinalis)',
    tamilName: 'அமலகி',
    scientificName: 'Emblica officinalis',
    image: amalakiImg,
    compounds: 20,
    functionalGroups: ['Phenol', 'Tannin', 'Flavonoid', 'Vitamin C', 'Hydroxyl (-OH)'],
    plantType: 'Tree',
    primaryCompounds: ['Vitamin C', 'Phyllaemblicin', 'Gallic acid'],
    therapeuticTargets: ['Antioxidant Systems', 'Rejuvenation', 'Immunomodulation', 'Anti-aging'],
    description: 'Same as Amla - exceptionally rich in vitamin C and antioxidants.'
  },
  {
    id: '47',
    name: 'Eranda / Castor (Ricinus communis)',
    tamilName: 'ஆமணக்கு',
    scientificName: 'Ricinus communis',
    image: erandaImg,
    compounds: 13,
    functionalGroups: ['Fatty acid', 'Ricinoleic acid', 'Alkaloid', 'Ester'],
    plantType: 'Shrub',
    primaryCompounds: ['Ricinoleic acid', 'Ricinine', 'Alkaloids'],
    therapeuticTargets: ['Laxative Effect', 'Anti-inflammatory Response', 'Analgesic Effect', 'Skin Health'],
    description: 'Oil-producing plant with potent laxative and anti-inflammatory properties.'
  },
  {
    id: '48',
    name: 'Kutki (Picrorhiza kurroa)',
    tamilName: 'குட்கி',
    scientificName: 'Picrorhiza kurroa',
    image: kutkiImg,
    compounds: 14,
    functionalGroups: ['Iridoid', 'Glycoside', 'Apocynin', 'Phenol'],
    plantType: 'Herb',
    primaryCompounds: ['Picrosides', 'Kutkoside', 'Apocynin'],
    therapeuticTargets: ['Hepatoprotection', 'Immunomodulation', 'Anti-inflammatory Response', 'Choleretic Effect'],
    description: 'Potent hepatoprotective herb used for liver disorders.'
  },
  {
    id: '49',
    name: 'Neem Leaf (Azadirachta indica)',
    tamilName: 'வேப்பிலை',
    scientificName: 'Azadirachta indica',
    image: neemLeafImg,
    compounds: 16,
    functionalGroups: ['Terpenoid', 'Flavonoid', 'Phenol', 'Steroid'],
    plantType: 'Tree',
    primaryCompounds: ['Nimbin', 'Quercetin', 'Beta-sitosterol'],
    therapeuticTargets: ['Antimicrobial Activity', 'Blood Glucose Regulation', 'Immunomodulation', 'Skin Health'],
    description: 'Neem leaves with antimicrobial and antidiabetic properties.'
  },
  {
    id: '50',
    name: 'Neem Bark (Azadirachta indica)',
    tamilName: 'வேப்ப மரப்பட்டை',
    scientificName: 'Azadirachta indica',
    image: neemBarkImg,
    compounds: 15,
    functionalGroups: ['Terpenoid', 'Tannin', 'Flavonoid', 'Alkaloid'],
    plantType: 'Tree',
    primaryCompounds: ['Margolone', 'Nimbidin', 'Nimbosterol'],
    therapeuticTargets: ['Antimicrobial Activity', 'Anti-inflammatory Response', 'Antipyretic Activity', 'Immunomodulation'],
    description: 'Neem bark with potent antimicrobial and anti-inflammatory properties.'
  }
];