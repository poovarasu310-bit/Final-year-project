import { Badge } from './ui/badge';

export const MEDICINAL_PLANTS_DATABASE = [
  { name: 'Turmeric (Curcuma longa)', compounds: ['Curcumin', 'Demethoxycurcumin', 'Bisdemethoxycurcumin'], icon: '🟡', activities: ['Anti-inflammatory', 'Antioxidant', 'Anticancer'] },
  { name: 'Neem (Azadirachta indica)', compounds: ['Azadirachtin', 'Nimbin', 'Nimbidin'], icon: '🌿', activities: ['Antimicrobial', 'Antiviral', 'Immunomodulatory'] },
  { name: 'Tulsi (Ocimum sanctum)', compounds: ['Eugenol', 'Ursolic acid', 'Rosmarinic acid'], icon: '🍃', activities: ['Adaptogenic', 'Anti-stress', 'Antioxidant'] },
  { name: 'Ashwagandha (Withania somnifera)', compounds: ['Withanolides', 'Withaferin A', 'Withanone'], icon: '🌱', activities: ['Neuroprotective', 'Anti-anxiety', 'Adaptogenic'] },
  { name: 'Ginger (Zingiber officinale)', compounds: ['Gingerol', 'Shogaol', 'Zingerone'], icon: '🫚', activities: ['Anti-inflammatory', 'Antiemetic', 'Analgesic'] },
  { name: 'Garlic (Allium sativum)', compounds: ['Allicin', 'Ajoene', 'S-allyl cysteine'], icon: '🧄', activities: ['Cardiovascular', 'Antimicrobial', 'Antioxidant'] },
  { name: 'Green Tea (Camellia sinensis)', compounds: ['EGCG', 'Catechins', 'Theanine'], icon: '🍵', activities: ['Antioxidant', 'Neuroprotective', 'Anti-obesity'] },
  { name: 'Amla (Emblica officinalis)', compounds: ['Vitamin C', 'Ellagic acid', 'Gallic acid'], icon: '🫐', activities: ['Antioxidant', 'Hepatoprotective', 'Immunomodulatory'] },
  { name: 'Brahmi (Bacopa monnieri)', compounds: ['Bacosides', 'Bacoside A', 'Bacopaside'], icon: '🌿', activities: ['Nootropic', 'Memory enhancer', 'Anxiolytic'] },
  { name: 'Giloy (Tinospora cordifolia)', compounds: ['Tinosporin', 'Berberine', 'Giloin'], icon: '🌿', activities: ['Immunomodulatory', 'Antipyretic', 'Hepatoprotective'] },
  { name: 'Cinnamon (Cinnamomum verum)', compounds: ['Cinnamaldehyde', 'Eugenol', 'Coumarin'], icon: '🌰', activities: ['Antidiabetic', 'Antimicrobial', 'Antioxidant'] },
  { name: 'Clove (Syzygium aromaticum)', compounds: ['Eugenol', 'Acetyl eugenol', 'Beta-caryophyllene'], icon: '🌸', activities: ['Analgesic', 'Antimicrobial', 'Antioxidant'] },
  { name: 'Black Pepper (Piper nigrum)', compounds: ['Piperine', 'Chavicine', 'Piperanine'], icon: '⚫', activities: ['Bioenhancer', 'Antioxidant', 'Digestive'] },
  { name: 'Cardamom (Elettaria cardamomum)', compounds: ['1,8-Cineole', 'Alpha-terpineol', 'Limonene'], icon: '🌿', activities: ['Digestive', 'Antimicrobial', 'Antioxidant'] },
  { name: 'Licorice (Glycyrrhiza glabra)', compounds: ['Glycyrrhizin', 'Glabridin', 'Liquiritin'], icon: '🌿', activities: ['Anti-inflammatory', 'Antiviral', 'Hepatoprotective'] },
  { name: 'Fenugreek (Trigonella foenum-graecum)', compounds: ['4-Hydroxyisoleucine', 'Diosgenin', 'Trigonelline'], icon: '🌾', activities: ['Antidiabetic', 'Galactagogue', 'Anti-obesity'] },
  { name: 'Saffron (Crocus sativus)', compounds: ['Crocin', 'Safranal', 'Picrocrocin'], icon: '🟠', activities: ['Antidepressant', 'Neuroprotective', 'Antioxidant'] },
  { name: 'Ginseng (Panax ginseng)', compounds: ['Ginsenosides', 'Panaxadiol', 'Panaxatriol'], icon: '🌿', activities: ['Adaptogenic', 'Cognitive enhancer', 'Immunomodulatory'] },
  { name: 'Peppermint (Mentha piperita)', compounds: ['Menthol', 'Menthone', 'Menthyl acetate'], icon: '🍃', activities: ['Digestive', 'Analgesic', 'Antimicrobial'] },
  { name: 'Eucalyptus (Eucalyptus globulus)', compounds: ['Eucalyptol', '1,8-Cineole', 'Alpha-pinene'], icon: '🌿', activities: ['Respiratory', 'Antimicrobial', 'Anti-inflammatory'] },
  { name: 'Lemongrass (Cymbopogon citratus)', compounds: ['Citral', 'Geraniol', 'Limonene'], icon: '🌾', activities: ['Antimicrobial', 'Antioxidant', 'Anxiolytic'] },
  { name: 'Moringa (Moringa oleifera)', compounds: ['Isothiocyanates', 'Quercetin', 'Kaempferol'], icon: '🌿', activities: ['Nutritive', 'Anti-inflammatory', 'Antioxidant'] },
  { name: 'Arjuna (Terminalia arjuna)', compounds: ['Arjunolic acid', 'Arjunetin', 'Tannins'], icon: '🌳', activities: ['Cardioprotective', 'Antioxidant', 'Anti-ischemic'] },
  { name: 'Haritaki (Terminalia chebula)', compounds: ['Chebulagic acid', 'Chebulinic acid', 'Ellagic acid'], icon: '🌰', activities: ['Digestive', 'Antioxidant', 'Antimicrobial'] },
  { name: 'Bibhitaki (Terminalia bellirica)', compounds: ['Gallic acid', 'Ellagic acid', 'Belleric acid'], icon: '🌰', activities: ['Antioxidant', 'Antimicrobial', 'Hepatoprotective'] },
  { name: 'Shatavari (Asparagus racemosus)', compounds: ['Shatavarin', 'Asparagamine', 'Saponins'], icon: '🌿', activities: ['Galactagogue', 'Immunomodulatory', 'Antioxidant'] },
  { name: 'Kalmegh (Andrographis paniculata)', compounds: ['Andrographolide', 'Neoandrographolide', 'Deoxyandrographolide'], icon: '🌿', activities: ['Hepatoprotective', 'Immunomodulatory', 'Antimicrobial'] },
  { name: 'Vasaka (Adhatoda vasica)', compounds: ['Vasicine', 'Vasicinone', 'Alkaloids'], icon: '🍃', activities: ['Bronchodilator', 'Expectorant', 'Antimicrobial'] },
  { name: 'Gotu Kola (Centella asiatica)', compounds: ['Asiaticoside', 'Madecassoside', 'Asiatic acid'], icon: '🌿', activities: ['Wound healing', 'Nootropic', 'Anti-anxiety'] },
  { name: 'Aloe Vera', compounds: ['Aloin', 'Aloe-emodin', 'Acemannan'], icon: '🌵', activities: ['Wound healing', 'Anti-inflammatory', 'Laxative'] },
  { name: 'Senna (Cassia angustifolia)', compounds: ['Sennosides', 'Anthraquinones', 'Rhein'], icon: '🌿', activities: ['Laxative', 'Purgative', 'Digestive'] },
  { name: 'Noni (Morinda citrifolia)', compounds: ['Iridoids', 'Scopoletin', 'Damnacanthal'], icon: '🍈', activities: ['Immunomodulatory', 'Antioxidant', 'Analgesic'] },
  { name: 'Bay Leaf (Cinnamomum tamala)', compounds: ['Eugenol', 'Methyleugenol', 'Cineole'], icon: '🍃', activities: ['Digestive', 'Antimicrobial', 'Antioxidant'] },
  { name: 'Fennel (Foeniculum vulgare)', compounds: ['Anethole', 'Fenchone', 'Estragole'], icon: '🌿', activities: ['Digestive', 'Carminative', 'Antispasmodic'] },
  { name: 'Coriander (Coriandrum sativum)', compounds: ['Linalool', 'Geranyl acetate', 'Camphor'], icon: '🌿', activities: ['Digestive', 'Antioxidant', 'Antimicrobial'] },
  { name: 'Nutmeg (Myristica fragrans)', compounds: ['Myristicin', 'Elemicin', 'Safrole'], icon: '🌰', activities: ['Digestive', 'Carminative', 'Antimicrobial'] },
  { name: 'Jamun (Syzygium cumini)', compounds: ['Jambosine', 'Ellagic acid', 'Anthocyanins'], icon: '🫐', activities: ['Antidiabetic', 'Antioxidant', 'Antimicrobial'] },
  { name: 'Karela (Momordica charantia)', compounds: ['Charantin', 'Momordicin', 'Polypeptide-p'], icon: '🥒', activities: ['Antidiabetic', 'Antiviral', 'Immunomodulatory'] },
  { name: 'Ashoka (Saraca asoca)', compounds: ['Catechins', 'Steroids', 'Flavonoids'], icon: '🌸', activities: ['Uterotonic', 'Anti-inflammatory', 'Antioxidant'] },
  { name: 'Bhringraj (Eclipta alba)', compounds: ['Wedelolactone', 'Eclalbatin', 'Coumestans'], icon: '🌿', activities: ['Hepatoprotective', 'Hair growth', 'Antimicrobial'] },
  { name: 'Punarnava (Boerhavia diffusa)', compounds: ['Punarnavine', 'Rotenoids', 'Flavonoids'], icon: '🌿', activities: ['Diuretic', 'Hepatoprotective', 'Anti-inflammatory'] },
  { name: 'Nagarmotha (Cyperus rotundus)', compounds: ['Cyperone', 'Cyperene', 'Alpha-cyperone'], icon: '🌾', activities: ['Anti-inflammatory', 'Analgesic', 'Digestive'] },
  { name: 'Vidanga (Embelia ribes)', compounds: ['Embelin', 'Vilangin', 'Quercitol'], icon: '🌿', activities: ['Anthelmintic', 'Antimicrobial', 'Antioxidant'] },
  { name: 'Kantakari (Solanum xanthocarpum)', compounds: ['Solasodine', 'Carpesterol', 'Alkaloids'], icon: '🌿', activities: ['Respiratory', 'Anti-asthmatic', 'Expectorant'] },
  { name: 'Guduchi (Tinospora cordifolia)', compounds: ['Tinosporin', 'Berberine', 'Giloin'], icon: '🌿', activities: ['Immunomodulatory', 'Antipyretic', 'Hepatoprotective'] },
  { name: 'Amalaki (Emblica officinalis)', compounds: ['Vitamin C', 'Phyllaemblicin', 'Gallic acid'], icon: '🫐', activities: ['Antioxidant', 'Rejuvenative', 'Immunomodulatory'] },
  { name: 'Eranda (Ricinus communis)', compounds: ['Ricinoleic acid', 'Ricinine', 'Alkaloids'], icon: '🌿', activities: ['Laxative', 'Anti-inflammatory', 'Analgesic'] },
  { name: 'Kutki (Picrorhiza kurroa)', compounds: ['Picrosides', 'Kutkoside', 'Apocynin'], icon: '🌿', activities: ['Hepatoprotective', 'Immunomodulatory', 'Anti-inflammatory'] },
  { name: 'Neem Leaf (Azadirachta indica)', compounds: ['Nimbin', 'Quercetin', 'Beta-sitosterol'], icon: '🍃', activities: ['Antimicrobial', 'Antidiabetic', 'Immunomodulatory'] },
  { name: 'Neem Bark (Azadirachta indica)', compounds: ['Margolone', 'Nimbidin', 'Nimbosterol'], icon: '🌳', activities: ['Antimicrobial', 'Anti-inflammatory', 'Antipyretic'] }
];

interface MedicinalPlantCardProps {
  plant: typeof MEDICINAL_PLANTS_DATABASE[0];
}

export function MedicinalPlantCard({ plant }: MedicinalPlantCardProps) {
  return (
    <div className="flex flex-col gap-3 p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl hover:shadow-lg hover:border-green-300 transition-all">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-green-200 to-emerald-200 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-2xl">{plant.icon}</span>
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-gray-900 mb-1 text-sm leading-tight">{plant.name}</h4>
          <Badge variant="outline" className="text-xs">Natural Source</Badge>
        </div>
      </div>
      
      <div>
        <p className="text-xs font-semibold text-green-900 mb-1.5">Key Bioactive Compounds:</p>
        <div className="flex flex-wrap gap-1.5">
          {plant.compounds.map((compound, cidx) => (
            <Badge key={cidx} className="bg-blue-100 text-blue-800 text-xs border-blue-300">
              {compound}
            </Badge>
          ))}
        </div>
      </div>
      
      <div>
        <p className="text-xs font-semibold text-green-900 mb-1.5">Therapeutic Activities:</p>
        <div className="flex flex-wrap gap-1.5">
          {plant.activities.map((activity, aidx) => (
            <Badge key={aidx} className="bg-green-100 text-green-800 text-xs border-green-300">
              {activity}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
