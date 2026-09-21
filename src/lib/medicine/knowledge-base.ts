/**
 * Curated Demo Medicine Knowledge Base
 *
 * Provides verified educational reference data for common medicines.
 * Strict safety rules:
 * - Educational information only.
 * - No personalized dosage recommendations.
 * - Clear precautions and warning signs for professional consultation.
 */

import { TrustedMedicineRecord } from "./types";

export const TRUSTED_MEDICINE_DATABASE: TrustedMedicineRecord[] = [
  {
    id: "med-paracetamol",
    name: "Paracetamol",
    genericName: "Paracetamol (Acetaminophen)",
    category: "Analgesic & Antipyretic (Pain Reliever & Fever Reducer)",
    aliases: [
      "paracetamol",
      "acetaminophen",
      "crocin",
      "dolo",
      "dolo 650",
      "calpol",
      "tylenol",
      "panadol",
      "metacin",
    ],
    whatIsIt:
      "Paracetamol is a widely used medicine taken to relieve mild to moderate pain and reduce high body temperature (fever). It works by blocking chemical messengers in the brain that signal pain and regulating the body's internal thermostat.",
    commonUses: [
      "Headaches and tension headaches",
      "Fever associated with viral colds, flu, and infections",
      "Toothaches and minor dental pain",
      "Mild muscle aches and back pain",
      "Mild joint aches and osteoarthritis discomfort",
    ],
    howItIsUsed:
      "Typically taken orally in tablet, capsule, or syrup form with a glass of water. It can be taken with or without food. Adults should always follow the package directions and never exceed the stated daily maximum dose.",
    precautions: [
      "Do not combine with other medicines that also contain paracetamol (such as cough/cold syrups), as this can lead to accidental overdose.",
      "Excessive doses can cause serious, irreversible liver damage.",
      "Individuals with chronic liver disease, heavy alcohol intake, or severe kidney problems must consult a physician before use.",
      "Do not use continuously for fever lasting more than 3 consecutive days without doctor evaluation.",
    ],
    commonSideEffects: [
      "Generally very well tolerated at recommended doses.",
      "Rare side effects can include mild nausea, skin rash, or allergic reactions.",
    ],
    whenToContactDoctor: [
      "Fever remains high or persists longer than 3 days despite taking medication.",
      "Yellowing of the skin or the whites of the eyes (jaundice).",
      "Severe abdominal pain, persistent nausea, or dark urine.",
      "Signs of an allergic reaction such as skin hives, facial swelling, or difficulty breathing.",
      "Any suspected accidental overdose (requires immediate emergency medical attention).",
    ],
  },
  {
    id: "med-ibuprofen",
    name: "Ibuprofen",
    genericName: "Ibuprofen",
    category: "NSAID (Non-Steroidal Anti-Inflammatory Drug)",
    aliases: ["ibuprofen", "brufen", "advil", "motrin", "nurofen", "combiflam"],
    whatIsIt:
      "Ibuprofen is a non-steroidal anti-inflammatory drug (NSAID) used to treat inflammation, swelling, stiffness, and pain. It works by inhibiting cyclooxygenase (COX) enzymes, reducing the production of inflammatory prostaglandins.",
    commonUses: [
      "Inflammatory joint conditions such as arthritis or sprains",
      "Musculoskeletal strains, back pain, and tendonitis",
      "Menstrual cramps (dysmenorrhea)",
      "Dental pain and post-extraction inflammation",
      "Fever and inflammatory pain",
    ],
    howItIsUsed:
      "Usually taken orally with or immediately after a meal, milk, or a snack to reduce the risk of stomach irritation. Drink plenty of water throughout the day while taking NSAIDs.",
    precautions: [
      "Can cause irritation, bleeding, or ulcers in the stomach lining, especially with prolonged use.",
      "Use with extreme caution or avoid if you have a history of peptic ulcers, kidney impairment, asthma, or uncontrolled hypertension.",
      "Should generally be avoided in the third trimester of pregnancy as it can affect fetal circulation.",
      "Do not take concurrently with other NSAIDs (such as naproxen or aspirin) unless explicitly directed by a doctor.",
    ],
    commonSideEffects: [
      "Mild indigestion, heartburn, or stomach discomfort",
      "Nausea or mild bloating",
      "Mild dizziness or headache",
    ],
    whenToContactDoctor: [
      "Black, tarry stools or vomiting blood / coffee-ground material (signs of gastrointestinal bleeding).",
      "Sudden shortness of breath, wheezing, or chest tightness.",
      "Swelling of the ankles, feet, or unexplained rapid weight gain.",
      "Severe, persistent stomach pain that does not resolve.",
    ],
  },
  {
    id: "med-cetirizine",
    name: "Cetirizine",
    genericName: "Cetirizine Hydrochloride",
    category: "Second-Generation Antihistamine",
    aliases: ["cetirizine", "zyrtec", "cetzine", "alerid", "okacet", "cetrizen"],
    whatIsIt:
      "Cetirizine is a second-generation antihistamine used to relieve allergy symptoms. It selectively blocks peripheral H1 histamine receptors, preventing histamine from triggering allergic reactions such as sneezing, watery eyes, and itching.",
    commonUses: [
      "Seasonal allergic rhinitis (hay fever) and environmental allergies",
      "Sneezing, runny nose, and nasal congestion due to allergens",
      "Itchy, watery, or irritated eyes",
      "Chronic idiopathic urticaria (allergic hives and itchy skin rashes)",
    ],
    howItIsUsed:
      "Commonly taken as a single daily dose (often in the evening), with or without food. Tablets should be swallowed whole with water.",
    precautions: [
      "Although less sedating than first-generation antihistamines, it can cause drowsiness in some individuals.",
      "Avoid driving, operating heavy machinery, or performing hazardous tasks until you know how the medicine affects you.",
      "Avoid or minimize alcohol consumption, as alcohol can amplify drowsiness.",
      "Patients with significant kidney impairment should consult a doctor for appropriate dosage adjustments.",
    ],
    commonSideEffects: [
      "Mild drowsiness or tiredness",
      "Dry mouth",
      "Mild headache",
      "Mild sore throat or nasal dryness",
    ],
    whenToContactDoctor: [
      "Signs of a severe allergic response such as swelling of the lips, tongue, face, or throat.",
      "Difficulty swallowing or wheezing.",
      "Rapid or irregular heartbeat (palpitations).",
      "Severe dizziness or fainting.",
    ],
  },
  {
    id: "med-amoxicillin",
    name: "Amoxicillin",
    genericName: "Amoxicillin Trihydrate",
    category: "Broad-Spectrum Penicillin Antibiotic",
    aliases: ["amoxicillin", "amoxil", "mox", "augmentin", "novamox", "amoxycillin"],
    whatIsIt:
      "Amoxicillin is a broad-spectrum penicillin-type antibiotic that fights bacterial infections by inhibiting bacterial cell wall synthesis. It is strictly effective against bacterial infections and has no effect against viral infections like colds, COVID-19, or flu.",
    commonUses: [
      "Bacterial respiratory tract infections (bronchitis, pneumonia, sinusitis)",
      "Middle ear infections (acute otitis media)",
      "Bacterial throat infections (strep pharyngitis/tonsillitis)",
      "Urinary tract infections (UTIs) and uncomplicated skin infections",
      "Dental abscesses and oral bacterial infections",
    ],
    howItIsUsed:
      "Prescription-only medicine taken orally at evenly spaced intervals (usually 2 to 3 times daily) with water. Can be taken with or without food. The entire prescribed course must be finished even if symptoms resolve early, to prevent antibiotic resistance.",
    precautions: [
      "Strictly contraindicated in individuals with a known history of penicillin or beta-lactam antibiotic allergy (can cause life-threatening anaphylaxis).",
      "Never self-medicate or take leftover antibiotics for viral illnesses.",
      "Can reduce the effectiveness of some oral contraceptive pills; consult a pharmacist or doctor.",
      "Inform your doctor if you have infectious mononucleosis (glandular fever), as amoxicillin can trigger an extensive non-allergic rash.",
    ],
    commonSideEffects: [
      "Mild diarrhea or loose stools",
      "Stomach upset or mild nausea",
      "Mild temporary rash",
    ],
    whenToContactDoctor: [
      "Immediate allergic reaction: hives, difficulty breathing, throat swelling, or sudden dizziness.",
      "Severe, watery, or bloody diarrhea (which can occur during treatment or up to several weeks afterward).",
      "Yellowing of the eyes or skin, or unexplained severe fatigue.",
      "High fever developing during or shortly after starting the medication.",
    ],
  },
  {
    id: "med-omeprazole",
    name: "Omeprazole",
    genericName: "Omeprazole",
    category: "Proton Pump Inhibitor (PPI)",
    aliases: ["omeprazole", "omez", "prilosec", "losec", "omizac"],
    whatIsIt:
      "Omeprazole is a proton pump inhibitor (PPI) that decreases the amount of acid produced by the cells in the stomach lining. By inhibiting the H+/K+ ATPase enzyme system, it provides prolonged suppression of gastric acid secretion.",
    commonUses: [
      "Gastroesophageal reflux disease (GERD) and chronic acid reflux",
      "Frequent heartburn and acid indigestion",
      "Treatment and healing of gastric and duodenal ulcers",
      "Protection of the stomach lining against damage from regular NSAID use",
      "Zollinger-Ellison syndrome (excessive acid production)",
    ],
    howItIsUsed:
      "Typically taken once daily in the morning, 30 to 60 minutes before breakfast. Capsules or delayed-release tablets should be swallowed whole with water without crushing, chewing, or opening.",
    precautions: [
      "Long-term continuous use (months or years) can reduce absorption of vitamin B12, magnesium, and calcium, potentially increasing bone fracture risk.",
      "Should not be used for immediate relief of occasional heartburn, as it takes 1 to 4 days for full therapeutic effect.",
      "Consult a doctor if heartburn or acid symptoms persist beyond 14 days of over-the-counter use.",
      "May interact with medications such as clopidogrel, methotrexate, and certain antifungal drugs.",
    ],
    commonSideEffects: [
      "Headache",
      "Abdominal pain or stomach cramps",
      "Constipation, diarrhea, or flatulence (gas)",
      "Mild nausea",
    ],
    whenToContactDoctor: [
      "Unintended or unexplained weight loss accompanied by digestive symptoms.",
      "Difficulty or pain while swallowing food or liquids.",
      "Vomiting blood or material resembling dark coffee grounds.",
      "Persistent, severe watery diarrhea that does not improve.",
      "Chest pain radiating to the jaw, neck, or left arm (requires immediate emergency medical evaluation to rule out cardiac issues).",
    ],
  },
];

