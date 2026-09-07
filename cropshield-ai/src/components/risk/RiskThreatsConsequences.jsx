import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldAlert, 
  AlertTriangle, 
  Clock, 
  TrendingUp, 
  Skull, 
  CheckCircle2, 
  DollarSign, 
  Sparkles, 
  Layers, 
  ChevronRight, 
  Flame, 
  Activity, 
  Calendar, 
  Info,
  Droplets,
  Sprout,
  ArrowRight,
  ShieldCheck,
  AlertOctagon,
  Timer
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';

export const RiskThreatsConsequences = () => {
  const { lang, t, theme, setActiveTab } = useApp();
  const isDark = theme === 'dark';

  // Selected Crop Tab
  const [selectedCrop, setSelectedCrop] = useState('cotton');
  // Interactive Simulation Slider (in Days, 0 to 14)
  const [simulatedDay, setSimulatedDay] = useState(2);

  // 1. Comprehensive Crop-by-Crop Threat and Threshold Knowledge Base
  const cropThreatProfiles = {
    cotton: {
      cropName: 'Cotton (Bt Hybrid / Desi)',
      cropNameMr: 'कापूस (बीट हायब्रिड)',
      cropNameTa: 'பருத்தி',
      cropNameHi: 'कपास',
      primaryPathogen: 'Bacterial Blight & Angular Leaf Spot (Xanthomonas citri pv. malvacearum)',
      vectorType: 'Bacterial inoculum spread via rain splash & wind-driven moisture (85%+ RH)',
      goldenThresholdHours: 48,
      thresholdTitle: '48 Hours Golden Action Window',
      thresholdSubtitle: 'Spore germination occurs on leaf surface; bacteria are confined to epidermal stomata with zero vascular penetration.',
      minimalDamageYieldPct: '2.5%',
      preventiveCostPerAcre: 280,
      totalAcreageValue: 65000,
      
      stages: [
        {
          dayRange: 'Day 0 – 2 (0 to 48 Hours)',
          label: 'Threshold Golden Window',
          status: 'Golden Window',
          statusColor: 'bg-emerald-500 text-white',
          borderClass: 'border-emerald-500',
          bgClass: 'bg-emerald-50/50 dark:bg-emerald-950/20',
          pathology: 'Microscopic water-soaked angular specks (1–2mm). Bacteria remain on leaf epidermis; no internal petiole ingress.',
          damagePct: 3,
          yieldLossPct: 2,
          lossRupees: 1300,
          curativeCostRupees: 280,
          urgency: 'Safe / Immediate Spot Action',
          action: 'Spray Streptocycline (0.5g/L) + Copper Oxychloride 50% WP (2.5g/L) or Copper Hydroxide (2.0g/L). 98% Recovery Guaranteed.',
          consequences: 'Zero systemic spread. Crop canopy unaffected. Full yield potential preserved.'
        },
        {
          dayRange: 'Day 3 – 5 (72 to 120 Hours)',
          label: 'Post-Threshold Foliar Necrosis',
          status: 'Moderate Escalation',
          statusColor: 'bg-amber-500 text-white',
          borderClass: 'border-amber-500',
          bgClass: 'bg-amber-50/50 dark:bg-amber-950/20',
          pathology: 'Angular lesions expand and coalesce along main leaf veins ("Vein Blight"). Leaves turn brown with yellow halo margins.',
          damagePct: 28,
          yieldLossPct: 18,
          lossRupees: 11700,
          curativeCostRupees: 1450,
          urgency: 'High Warning / Urgent Spray',
          action: 'Curative foliar spray of Kresoxim-methyl 44.3% SC (1ml/L) + Streptocycline (1g/L). Prune heavily spotted bottom canopy.',
          consequences: 'Photosynthesis capacity drops by 35%. Lower leaves shed prematurely. Secondary fungal saprophytes invade weakened tissue.'
        },
        {
          dayRange: 'Day 6 – 9 (144 to 216 Hours)',
          label: 'Vascular Blackarm & Canker',
          status: 'Critical Danger',
          statusColor: 'bg-rose-600 text-white',
          borderClass: 'border-rose-600',
          bgClass: 'bg-rose-50/50 dark:bg-rose-950/20',
          pathology: 'Bacteria penetrate xylem vascular strands causing black sunken girdling lesions on branches and main stem ("Blackarm stage").',
          damagePct: 62,
          yieldLossPct: 52,
          lossRupees: 33800,
          curativeCostRupees: 3900,
          urgency: 'Critical Disaster / Emergency Cocktail',
          action: 'Emergency systemic bactericide + Kasugamycin 3% SL (2ml/L) + Potassium Phosphonate (3ml/L). High chemical stress on crop.',
          consequences: 'Extensive square (bud) and young boll shedding. Main stem snapping during wind. 50%+ boll formation lost permanently.'
        },
        {
          dayRange: 'Day 10+ (Beyond 240 Hours)',
          label: 'Irreversible Total Boll Rot & Lodging',
          status: 'Catastrophic Destruction',
          statusColor: 'bg-slate-900 text-white',
          borderClass: 'border-slate-800',
          bgClass: 'bg-slate-100 dark:bg-slate-900/60',
          pathology: 'Total vascular necrosis, bolls rot internally with stained discolored lint, black gummy bacterial ooze, plant death.',
          damagePct: 90,
          yieldLossPct: 84,
          lossRupees: 54600,
          curativeCostRupees: 6500,
          urgency: 'Irreversible Crop Failure',
          action: 'Chemical cure impossible. Harvest whatever salvageable bolls remain. Remove crop residues and burn to prevent soil contamination.',
          consequences: '80–90% total financial wipeout. Seeds and soil harbor bacterial inoculum for 2 subsequent sowing seasons.'
        }
      ],

      lossCurveData: [
        { day: 'Day 0', hours: 0, lossPct: 0, lossRs: 0, costRs: 280, riskScore: 5 },
        { day: 'Day 2 (Threshold)', hours: 48, lossPct: 2.5, lossRs: 1625, costRs: 280, riskScore: 12 },
        { day: 'Day 4', hours: 96, lossPct: 15.0, lossRs: 9750, costRs: 1200, riskScore: 38 },
        { day: 'Day 6', hours: 144, lossPct: 35.0, lossRs: 22750, costRs: 2600, riskScore: 68 },
        { day: 'Day 8', hours: 192, lossPct: 58.0, lossRs: 37700, costRs: 4100, riskScore: 84 },
        { day: 'Day 10', hours: 240, lossPct: 75.0, lossRs: 48750, costRs: 5500, riskScore: 94 },
        { day: 'Day 14', hours: 336, lossPct: 88.0, lossRs: 57200, costRs: 6800, riskScore: 100 }
      ]
    },

    tomato: {
      cropName: 'Tomato (Abhinav / Arka Rakshak)',
      cropNameMr: 'टोमॅटो (अभिनव / अर्का रक्षक)',
      cropNameTa: 'தக்காளி',
      cropNameHi: 'टमाटर',
      primaryPathogen: 'Early Blight (Alternaria solani) & Late Blight (Phytophthora infestans)',
      vectorType: 'Airborne fungal conidia favored by high relative humidity (80%+) and rain showers',
      goldenThresholdHours: 36,
      thresholdTitle: '36 Hours Golden Action Window',
      thresholdSubtitle: 'Alternaria spores germinate on wet leaf cuticle; mycelium is confined to initial target lesions without petiole girdling.',
      minimalDamageYieldPct: '3.0%',
      preventiveCostPerAcre: 340,
      totalAcreageValue: 120000,

      stages: [
        {
          dayRange: 'Day 0 – 2 (0 to 36 Hours)',
          label: 'Threshold Golden Window',
          status: 'Golden Window',
          statusColor: 'bg-emerald-500 text-white',
          borderClass: 'border-emerald-500',
          bgClass: 'bg-emerald-50/50 dark:bg-emerald-950/20',
          pathology: 'Isolated circular dark brown spots with characteristic concentric target rings on lower leaves only. Stem is unaffected.',
          damagePct: 4,
          yieldLossPct: 3,
          lossRupees: 3600,
          curativeCostRupees: 340,
          urgency: 'Safe / Immediate Action',
          action: 'Apply Mancozeb 75% WP (2.5g/L) or Chlorothalonil 75% WP (2.0g/L). 96% Recovery Rate.',
          consequences: 'Halts fungal spore germination completely. Prevents upward movement into flowering trusses.'
        },
        {
          dayRange: 'Day 3 – 5 (48 to 120 Hours)',
          label: 'Foliar Blight & Collar Canker',
          status: 'Moderate Escalation',
          statusColor: 'bg-amber-500 text-white',
          borderClass: 'border-amber-500',
          bgClass: 'bg-amber-50/50 dark:bg-amber-950/20',
          pathology: 'Spots coalesce rapidly causing bottom canopy blighting. Dark sunken lesions form on stems and leaf petioles.',
          damagePct: 32,
          yieldLossPct: 24,
          lossRupees: 28800,
          curativeCostRupees: 1800,
          urgency: 'High Warning / Urgent Spray',
          action: 'Curative spray of Azoxystrobin 18.2% + Difenoconazole 11.4% SC (1ml/L) or Cymoxanil 8% + Mancozeb 64% WP (2.0g/L).',
          consequences: '30% leaf loss causes severe sunscald on developing fruits. Premature blossom drop reduces fruit set by 35%.'
        },
        {
          dayRange: 'Day 6 – 9 (144 to 216 Hours)',
          label: 'Fruit Rot & Vascular Collapse',
          status: 'Critical Danger',
          statusColor: 'bg-rose-600 text-white',
          borderClass: 'border-rose-600',
          bgClass: 'bg-rose-50/50 dark:bg-rose-950/20',
          pathology: 'Dark velvety sunken rot patches at the stem end of fruits. Fruits drop green or rot on vines with foul smell.',
          damagePct: 68,
          yieldLossPct: 60,
          lossRupees: 72000,
          curativeCostRupees: 4200,
          urgency: 'Critical Disaster / Rescue Protocol',
          action: 'Dimethomorph 50% WP (1.0g/L) + Mancozeb (2.0g/L) systemic high-pressure wash. Remove all rotten fruits manually.',
          consequences: 'Marketable yield drops by 60%. Wholesalers reject produce due to internal latent mycelium rot.'
        },
        {
          dayRange: 'Day 10+ (Beyond 240 Hours)',
          label: 'Total Field Defoliation & Vine Death',
          status: 'Catastrophic Destruction',
          statusColor: 'bg-slate-900 text-white',
          borderClass: 'border-slate-800',
          bgClass: 'bg-slate-100 dark:bg-slate-900/60',
          pathology: 'Entire tomato canopy dries up like burnt straw ("Blight Firestorm"). Vine collapses completely.',
          damagePct: 95,
          yieldLossPct: 90,
          lossRupees: 108000,
          curativeCostRupees: 7000,
          urgency: 'Total Field Loss',
          action: 'No salvageable crop. Uproot crop to clear land for rotation. Solarize soil with plastic mulching.',
          consequences: '₹1.0 Lakh+ financial loss per acre. Severe debt cycle for smallholders.'
        }
      ],

      lossCurveData: [
        { day: 'Day 0', hours: 0, lossPct: 0, lossRs: 0, costRs: 340, riskScore: 5 },
        { day: 'Day 2 (Threshold)', hours: 48, lossPct: 3.0, lossRs: 3600, costRs: 340, riskScore: 14 },
        { day: 'Day 4', hours: 96, lossPct: 22.0, lossRs: 26400, costRs: 1600, riskScore: 45 },
        { day: 'Day 6', hours: 144, lossPct: 48.0, lossRs: 57600, costRs: 3200, riskScore: 74 },
        { day: 'Day 8', hours: 192, lossPct: 70.0, lossRs: 84000, costRs: 4800, riskScore: 89 },
        { day: 'Day 10', hours: 240, lossPct: 86.0, lossRs: 103200, costRs: 6200, riskScore: 96 },
        { day: 'Day 14', hours: 336, lossPct: 95.0, lossRs: 114000, costRs: 7500, riskScore: 100 }
      ]
    },

    grapes: {
      cropName: 'Grapes (Thompson Seedless / Export)',
      cropNameMr: 'द्राक्षे (थॉमसन / निर्यात दर्जा)',
      cropNameTa: 'திராட்சை',
      cropNameHi: 'अंगूर',
      primaryPathogen: 'Downy Mildew (Plasmopara viticola) & Powdery Mildew (Uncinula necator)',
      vectorType: 'Oospores splashing from wet soil under high leaf wetness (>90% RH for 6+ hrs)',
      goldenThresholdHours: 24,
      thresholdTitle: '24 to 36 Hours Critical Golden Window',
      thresholdSubtitle: 'Zoospores swim into stomata; fungal haustoria remain superficial on lower leaf surface with zero bunch infection.',
      minimalDamageYieldPct: '1.8%',
      preventiveCostPerAcre: 650,
      totalAcreageValue: 350000,

      stages: [
        {
          dayRange: 'Day 0 – 1.5 (0 to 36 Hours)',
          label: 'Threshold Golden Window',
          status: 'Golden Window',
          statusColor: 'bg-emerald-500 text-white',
          borderClass: 'border-emerald-500',
          bgClass: 'bg-emerald-50/50 dark:bg-emerald-950/20',
          pathology: 'Translucent yellow "oil spots" on upper leaf surface. White downy growth appears underneath in humid dawn hours.',
          damagePct: 2,
          yieldLossPct: 1.5,
          lossRupees: 5250,
          curativeCostRupees: 650,
          urgency: 'Safe / Immediate Action',
          action: 'Preventative spray of Potassium Phosphonate (3.0g/L) + Mancozeb (2.0g/L) or Copper Hydroxide (1.5g/L). 99% Control.',
          consequences: 'Zero bunch or rachis infection. Full export grade bunch cluster development guaranteed.'
        },
        {
          dayRange: 'Day 2 – 4 (48 to 96 Hours)',
          label: 'Rachis Infection & Berry Drying',
          status: 'Moderate Escalation',
          statusColor: 'bg-amber-500 text-white',
          borderClass: 'border-amber-500',
          bgClass: 'bg-amber-50/50 dark:bg-amber-950/20',
          pathology: 'Fungal mycelium moves to young inflorescences and berry stalks (rachis). Rachis turns brown, bends like a shepherd crook.',
          damagePct: 35,
          yieldLossPct: 28,
          lossRupees: 98000,
          curativeCostRupees: 3200,
          urgency: 'High Warning / Urgent Spray',
          action: 'Systemic curative spray of Mandipropamid 23.4% SC (0.8ml/L) or Metalaxyl 8% + Mancozeb 64% (2.5g/L).',
          consequences: 'Berry drop and drying in 30% of bunches. Total loss of APEDA export eligibility (diverted to low-value local wine/raisins).'
        },
        {
          dayRange: 'Day 5 – 8 (120 to 192 Hours)',
          label: 'Leather Berry Rot & Vine Defoliation',
          status: 'Critical Danger',
          statusColor: 'bg-rose-600 text-white',
          borderClass: 'border-rose-600',
          bgClass: 'bg-rose-50/50 dark:bg-rose-950/20',
          pathology: 'Berries turn dull grayish-brown, shrivel into hard mummies ("Leather rot"). Severe premature vine defoliation.',
          damagePct: 75,
          yieldLossPct: 65,
          lossRupees: 227500,
          curativeCostRupees: 6800,
          urgency: 'Critical Disaster / Vineyard Emergency',
          action: 'Ametoctradin + Dimethomorph (1.0ml/L) + Fenamidone. Cut and bury severely blighted bunches.',
          consequences: '65%+ harvest lost. Weakened vines fail to store cane carbohydrates for next year pruning cycle.'
        },
        {
          dayRange: 'Day 9+ (Beyond 216 Hours)',
          label: 'Total Vineyard Crop Collapse',
          status: 'Catastrophic Destruction',
          statusColor: 'bg-slate-900 text-white',
          borderClass: 'border-slate-800',
          bgClass: 'bg-slate-100 dark:bg-slate-900/60',
          pathology: 'Complete vine canopy loss, 100% bunches mummified and dried on wires, cane necrosis.',
          damagePct: 98,
          yieldLossPct: 92,
          lossRupees: 322000,
          curativeCostRupees: 11000,
          urgency: 'Total Crop Wipeout',
          action: 'Entire seasonal crop lost. Apply copper sanitation wash and Bordeaux paste to save main vine wood.',
          consequences: '₹3.0 Lakh+ financial loss per acre. Devastating commercial loss for export farmers.'
        }
      ],

      lossCurveData: [
        { day: 'Day 0', hours: 0, lossPct: 0, lossRs: 0, costRs: 650, riskScore: 8 },
        { day: 'Day 1.5 (Threshold)', hours: 36, lossPct: 1.8, lossRs: 6300, costRs: 650, riskScore: 16 },
        { day: 'Day 3', hours: 72, lossPct: 20.0, lossRs: 70000, costRs: 2400, riskScore: 50 },
        { day: 'Day 5', hours: 120, lossPct: 45.0, lossRs: 157500, costRs: 4800, riskScore: 78 },
        { day: 'Day 7', hours: 168, lossPct: 70.0, lossRs: 245000, costRs: 7200, riskScore: 92 },
        { day: 'Day 9', hours: 216, lossPct: 88.0, lossRs: 308000, costRs: 9500, riskScore: 98 },
        { day: 'Day 14', hours: 336, lossPct: 96.0, lossRs: 336000, costRs: 11500, riskScore: 100 }
      ]
    },

    sugarcane: {
      cropName: 'Sugarcane (Co 86032 / CoM 0265)',
      cropNameMr: 'ऊस (को ८६०३२ / कोएम ०२६५)',
      cropNameTa: 'கரும்பு',
      cropNameHi: 'गन्ना',
      primaryPathogen: 'Red Rot (Colletotrichum falcatum) & Early Shoot Borer (Chilo infuscatellus)',
      vectorType: 'Fungal mycelium in infected setts + moth larvae boring into central growing spindle',
      goldenThresholdHours: 72,
      thresholdTitle: '72 Hours Threshold Window',
      thresholdSubtitle: 'Initial central spindle yellowing / pinhole bore marks; vascular sucrose pith remains unfermented.',
      minimalDamageYieldPct: '2.0%',
      preventiveCostPerAcre: 420,
      totalAcreageValue: 140000,

      stages: [
        {
          dayRange: 'Day 0 – 3 (0 to 72 Hours)',
          label: 'Threshold Golden Window',
          status: 'Golden Window',
          statusColor: 'bg-emerald-500 text-white',
          borderClass: 'border-emerald-500',
          bgClass: 'bg-emerald-50/50 dark:bg-emerald-950/20',
          pathology: '3rd and 4th leaves from spindle show yellowing. Dead heart can be pulled out easily with fresh smell.',
          damagePct: 3,
          yieldLossPct: 2,
          lossRupees: 2800,
          curativeCostRupees: 420,
          urgency: 'Safe / Immediate Action',
          action: 'Soil drenching with Trichoderma harzianum (2.5 kg/acre) + Cartap Hydrochloride 4G (10 kg/acre). 97% Control.',
          consequences: 'Spindle recovers, tillering remains vigorous. Zero sucrose conversion loss.'
        },
        {
          dayRange: 'Day 4 – 7 (96 to 168 Hours)',
          label: 'Internal Pith Reddening',
          status: 'Moderate Escalation',
          statusColor: 'bg-amber-500 text-white',
          borderClass: 'border-amber-500',
          bgClass: 'bg-amber-50/50 dark:bg-amber-950/20',
          pathology: 'Red rot fungus infects internal stalk pith; diagnostic horizontal white patches across red vascular tissues.',
          damagePct: 30,
          yieldLossPct: 22,
          lossRupees: 30800,
          curativeCostRupees: 1600,
          urgency: 'High Warning / Urgent Spray',
          action: 'Drench Carbendazim 50% WP (2.0g/L) + Chlorantraniliprole 18.5% SC (0.4ml/L). Remove severely dried canes.',
          consequences: 'Sucrose inversion begins: 15–20% sugar recovery loss. Stunted ratoon emergence for next year.'
        },
        {
          dayRange: 'Day 8 – 14 (192 to 336 Hours)',
          label: 'Fermentative Rot & Cane Hollow Drying',
          status: 'Critical Danger',
          statusColor: 'bg-rose-600 text-white',
          borderClass: 'border-rose-600',
          bgClass: 'bg-rose-50/50 dark:bg-rose-950/20',
          pathology: 'Entire stalk pith turns hollow, dark red with sour alcohol smell (fermentation of sugars). Cane breaks easily.',
          damagePct: 65,
          yieldLossPct: 55,
          lossRupees: 77000,
          curativeCostRupees: 3500,
          urgency: 'Critical Disaster / Sugar Mill Rejection',
          action: 'No cure for infected canes. Cut and remove infected stools. Avoid water stagnation across field.',
          consequences: 'Sugar mills reject cane loads due to low Brix (<12%) and sour fermentative odor.'
        },
        {
          dayRange: 'Day 15+ (Beyond 360 Hours)',
          label: 'Total Stool Lodging & Ratoon Death',
          status: 'Catastrophic Destruction',
          statusColor: 'bg-slate-900 text-white',
          borderClass: 'border-slate-800',
          bgClass: 'bg-slate-100 dark:bg-slate-900/60',
          pathology: 'Complete cane drying, fungal spores contaminate root zone, zero ratoon sproutability.',
          damagePct: 85,
          yieldLossPct: 78,
          lossRupees: 109200,
          curativeCostRupees: 5200,
          urgency: 'Total Field Crop Failure',
          action: 'Uproot field completely. Disinfect soil before replanting. Do not take ratoon crop.',
          consequences: 'Destroys 3-year cane cycle (Plant cane + 2 Ratoons), costing ₹2.5+ Lakhs over multi-year horizon.'
        }
      ],

      lossCurveData: [
        { day: 'Day 0', hours: 0, lossPct: 0, lossRs: 0, costRs: 420, riskScore: 4 },
        { day: 'Day 3 (Threshold)', hours: 72, lossPct: 2.0, lossRs: 2800, costRs: 420, riskScore: 12 },
        { day: 'Day 6', hours: 144, lossPct: 18.0, lossRs: 25200, costRs: 1400, riskScore: 42 },
        { day: 'Day 9', hours: 216, lossPct: 42.0, lossRs: 58800, costRs: 2800, riskScore: 70 },
        { day: 'Day 12', hours: 288, lossPct: 64.0, lossRs: 89600, costRs: 3900, riskScore: 88 },
        { day: 'Day 15', hours: 360, lossPct: 78.0, lossRs: 109200, costRs: 4900, riskScore: 95 },
        { day: 'Day 20', hours: 480, lossPct: 86.0, lossRs: 120400, costRs: 5500, riskScore: 100 }
      ]
    },

    rice: {
      cropName: 'Rice / Paddy (Indrayani / Basmati)',
      cropNameMr: 'भात / धान (इंद्रायणी / बासमती)',
      cropNameTa: 'நெல்',
      cropNameHi: 'धान / चावल',
      primaryPathogen: 'Paddy Blast (Magnaporthe oryzae) & Bacterial Leaf Blight (Xanthomonas oryzae)',
      vectorType: 'Airborne fungal conidia triggered by night cooling (20-24°C) + leaf wetness (>90% RH)',
      goldenThresholdHours: 48,
      thresholdTitle: '48 Hours Critical Blast Window',
      thresholdSubtitle: 'Eye-shaped spindle lesions appear on leaf blade; neck node and panicle remain uninvaded.',
      minimalDamageYieldPct: '2.0%',
      preventiveCostPerAcre: 310,
      totalAcreageValue: 55000,

      stages: [
        {
          dayRange: 'Day 0 – 2 (0 to 48 Hours)',
          label: 'Threshold Golden Window',
          status: 'Golden Window',
          statusColor: 'bg-emerald-500 text-white',
          borderClass: 'border-emerald-500',
          bgClass: 'bg-emerald-50/50 dark:bg-emerald-950/20',
          pathology: 'Isolated spindle/diamond-shaped lesions with gray centers and reddish-brown borders on leaves.',
          damagePct: 3,
          yieldLossPct: 2,
          lossRupees: 1100,
          curativeCostRupees: 310,
          urgency: 'Safe / Immediate Action',
          action: 'Foliar spray of Tricyclazole 75% WP (0.6g/L) or Isoprothiolane 40% EC (1.5ml/L). 98% Control.',
          consequences: 'Prevents transmission into emerging panicle neck. 100% grain filling preserved.'
        },
        {
          dayRange: 'Day 3 – 5 (72 to 120 Hours)',
          label: 'Leaf Blast Coalescence',
          status: 'Moderate Escalation',
          statusColor: 'bg-amber-500 text-white',
          borderClass: 'border-amber-500',
          bgClass: 'bg-amber-50/50 dark:bg-amber-950/20',
          pathology: 'Lesions coalesce across upper leaves ("Burnt appearance"). Flag leaf blighting stops carbohydrate transfer to grains.',
          damagePct: 30,
          yieldLossPct: 22,
          lossRupees: 12100,
          curativeCostRupees: 1350,
          urgency: 'High Warning / Urgent Spray',
          action: 'Spray Azoxystrobin 18.2% + Difenoconazole 11.4% SC (1.0ml/L) + Streptocycline (0.5g/L).',
          consequences: '25% chaffy grain formation. Thousand-grain weight drops by 18%.'
        },
        {
          dayRange: 'Day 6 – 9 (144 to 216 Hours)',
          label: 'Neck Blast & Panicle Choking',
          status: 'Critical Danger',
          statusColor: 'bg-rose-600 text-white',
          borderClass: 'border-rose-600',
          bgClass: 'bg-rose-50/50 dark:bg-rose-950/20',
          pathology: 'Blackish-brown rotting of panicle neck node ("Neck Blast"). Panicle breaks and hangs down completely white/sterile.',
          damagePct: 65,
          yieldLossPct: 58,
          lossRupees: 31900,
          curativeCostRupees: 2900,
          urgency: 'Critical Disaster / Emergency Spray',
          action: 'Kasugamycin 3% SL (2.0ml/L) + Picoxystrobin. Heavy yield loss already locked in.',
          consequences: 'Complete sterility of panicles ("Whiteheads"). 60% of ears produce zero edible rice grains.'
        },
        {
          dayRange: 'Day 10+ (Beyond 240 Hours)',
          label: 'Total Panicle Collapse & Lodging',
          status: 'Catastrophic Destruction',
          statusColor: 'bg-slate-900 text-white',
          borderClass: 'border-slate-800',
          bgClass: 'bg-slate-100 dark:bg-slate-900/60',
          pathology: 'All panicles break at the neck, crop lodges into mud, fungal mold rots remaining unharvested grain.',
          damagePct: 88,
          yieldLossPct: 82,
          lossRupees: 45100,
          curativeCostRupees: 4200,
          urgency: 'Total Harvest Loss',
          action: 'Harvest whatever few intact tillers remain. Dry paddy immediately to avoid aflatoxin contamination.',
          consequences: '80%+ crop value destroyed. Major food security loss for farming family.'
        }
      ],

      lossCurveData: [
        { day: 'Day 0', hours: 0, lossPct: 0, lossRs: 0, costRs: 310, riskScore: 5 },
        { day: 'Day 2 (Threshold)', hours: 48, lossPct: 2.0, lossRs: 1100, costRs: 310, riskScore: 13 },
        { day: 'Day 4', hours: 96, lossPct: 18.0, lossRs: 9900, costRs: 1150, riskScore: 40 },
        { day: 'Day 6', hours: 144, lossPct: 40.0, lossRs: 22000, costRs: 2300, riskScore: 72 },
        { day: 'Day 8', hours: 192, lossPct: 62.0, lossRs: 34100, costRs: 3300, riskScore: 87 },
        { day: 'Day 10', hours: 240, lossPct: 78.0, lossRs: 42900, costRs: 4100, riskScore: 95 },
        { day: 'Day 14', hours: 336, lossPct: 88.0, lossRs: 48400, costRs: 4800, riskScore: 100 }
      ]
    }
  };

  const currentProfile = cropThreatProfiles[selectedCrop] || cropThreatProfiles.cotton;

  // Calculate Real-time Simulation Values based on selected slider day
  const getSimulatedStage = (day) => {
    if (day <= 2) return currentProfile.stages[0];
    if (day <= 5) return currentProfile.stages[1];
    if (day <= 9) return currentProfile.stages[2];
    return currentProfile.stages[3];
  };

  const activeStage = getSimulatedStage(simulatedDay);

  // Linear Interpolated Metrics
  const calculatedLossPct = Math.min(95, Math.round(simulatedDay * (currentProfile.stages[3].yieldLossPct / 12) + (simulatedDay > 2 ? 10 : 1)));
  const calculatedLossRs = Math.round((calculatedLossPct / 100) * currentProfile.totalAcreageValue);
  const calculatedCostRs = Math.round(currentProfile.preventiveCostPerAcre + (simulatedDay > 2 ? (simulatedDay * 420) : 0));

  return (
    <div className="space-y-6 animate-fadeIn pb-16 font-sans">
      
      {/* 1. TOP HEADER & IMPACT SUMMARY */}
      <div className={`p-6 sm:p-7 rounded-3xl border shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-5 ${
        isDark ? 'bg-[#0a1324] border-[#182a4a] text-white' : 'bg-[#F5FCF7] border-[#D2EBD7] text-slate-900'
      }`}>
        <div className="flex items-start space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-600 to-amber-600 text-white flex items-center justify-center text-3xl shadow-md shrink-0 border border-rose-300/40">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                Risk & Threats Consequences Matrix
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-300 dark:border-rose-800 font-mono">
                Critical Threshold Monitor
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-1 leading-relaxed max-w-3xl">
              Understand the biological <strong>Golden Action Threshold Period</strong>. Taking action within this window limits crop damage to <strong>&lt;3%</strong>, whereas inaction beyond the threshold triggers exponential vascular decay, financial wipeout, and soil contamination.
            </p>
          </div>
        </div>

        {/* Global Key Stat Pill */}
        <div className="flex items-center gap-3 bg-white/90 dark:bg-slate-900 p-3 rounded-2xl border border-[#D2EBD7] dark:border-slate-800 shadow-xs self-start lg:self-center shrink-0">
          <div className="text-left font-mono">
            <span className="text-[10px] text-slate-500 uppercase block font-bold">Action Window Advantage</span>
            <span className="text-sm font-black text-emerald-700 dark:text-emerald-400">97.5% Crop Salvaged</span>
          </div>
          <div className="h-8 w-px bg-slate-200 dark:bg-slate-800" />
          <div className="text-left font-mono">
            <span className="text-[10px] text-slate-500 uppercase block font-bold">Inaction Risk</span>
            <span className="text-sm font-black text-rose-600 dark:text-rose-400">-85% Yield Loss</span>
          </div>
        </div>
      </div>

      {/* 2. CROP SELECTOR BUTTONS */}
      <div className={`p-1.5 rounded-2xl border flex flex-wrap items-center gap-1.5 shadow-xs ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white/80 border-[#D2EBD7]'
      }`}>
        {[
          { id: 'cotton', label: '🌾 Cotton (Bt Hybrid)', icon: '🌾' },
          { id: 'tomato', label: '🍅 Tomato (Early/Late Blight)', icon: '🍅' },
          { id: 'grapes', label: '🍇 Grapes (Downy Mildew)', icon: '🍇' },
          { id: 'sugarcane', label: '🎋 Sugarcane (Red Rot)', icon: '🎋' },
          { id: 'rice', label: '🍚 Rice / Paddy (Blast)', icon: '🍚' }
        ].map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCrop(c.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
              selectedCrop === c.id
                ? 'bg-[#047857] text-white shadow-md'
                : 'text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-slate-800'
            }`}
          >
            <span>{c.icon}</span>
            <span>{c.label}</span>
          </button>
        ))}
      </div>

      {/* 3. GOLDEN THRESHOLD HIGHLIGHT BANNER */}
      <div className={`p-5 sm:p-6 rounded-3xl border-2 shadow-md relative overflow-hidden ${
        isDark ? 'bg-[#081726] border-emerald-500/50 text-white' : 'bg-gradient-to-r from-emerald-50 via-teal-50/50 to-white border-emerald-400 text-slate-900'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-400 font-mono">
                {currentProfile.thresholdTitle} ({currentProfile.cropName})
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              Primary Threat: {currentProfile.primaryPathogen}
            </h2>
            <p className="text-xs text-slate-700 dark:text-slate-300 font-medium max-w-3xl leading-relaxed">
              {currentProfile.thresholdSubtitle} Vector Spread: <em>{currentProfile.vectorType}</em>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="px-4 py-3 rounded-2xl bg-emerald-600 text-white shadow-md text-center font-mono">
              <span className="text-[10px] uppercase font-bold block opacity-90">Preventive Cost</span>
              <span className="text-base font-black">₹{currentProfile.preventiveCostPerAcre} / Acre</span>
            </div>
            <div className="px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-300 dark:border-slate-800 text-center font-mono">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Minimal Loss</span>
              <span className="text-base font-black text-emerald-600 dark:text-emerald-400">&lt; {currentProfile.minimalDamageYieldPct}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. INTERACTIVE TIME-SLIDER LOSS & CONSEQUENCE SIMULATOR */}
      <div className={`p-6 sm:p-7 rounded-3xl border shadow-sm space-y-6 ${
        isDark ? 'bg-[#0a1324] border-[#182a4a]' : 'bg-[#F5FCF7] border-[#D2EBD7]'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/70 dark:border-slate-800 pb-3">
          <div>
            <h3 className="font-black text-base sm:text-lg text-slate-900 dark:text-white flex items-center gap-2">
              <Timer className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>Interactive Threshold Timeline & Inaction Consequence Simulator</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Drag the timeline slider to observe biological disease progression and compounding monetary damage per acre.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-black bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-white self-start sm:self-auto">
            Simulating: Day {simulatedDay} ({simulatedDay * 24} Hours post-trigger)
          </span>
        </div>

        {/* Timeline Slider Control */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono font-bold text-slate-600 dark:text-slate-400">
            <span className="text-emerald-600 font-black">● Day 0 (Spore Trigger)</span>
            <span className="text-emerald-700 font-black">● Day 2 (48h Golden Threshold)</span>
            <span className="text-amber-600">● Day 5 (Foliar Blight)</span>
            <span className="text-rose-600">● Day 9 (Vascular Canker)</span>
            <span className="text-slate-900 dark:text-slate-200 font-black">● Day 14+ (Total Failure)</span>
          </div>

          <input
            type="range"
            min="0"
            max="14"
            step="1"
            value={simulatedDay}
            onChange={(e) => setSimulatedDay(Number(e.target.value))}
            className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#047857]"
          />
        </div>

        {/* Dynamic Simulated Consequence Card */}
        <div className={`p-5 rounded-3xl border-2 transition-all shadow-md space-y-4 ${activeStage.borderClass} ${activeStage.bgClass}`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/60 dark:border-slate-800/80 pb-3">
            <div className="flex items-center space-x-3">
              <span className={`px-3 py-1 rounded-full text-xs font-black uppercase font-mono ${activeStage.statusColor}`}>
                {activeStage.status}
              </span>
              <strong className="text-base font-black text-slate-900 dark:text-white">
                {activeStage.label} ({activeStage.dayRange})
              </strong>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono font-bold">
              <span>Urgency Level:</span>
              <span className="text-rose-600 dark:text-rose-400 font-black">{activeStage.urgency}</span>
            </div>
          </div>

          {/* 4 Metric Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-3 rounded-2xl bg-white/90 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase block font-bold">Estimated Yield Loss</span>
              <strong className="text-lg font-black text-rose-600 dark:text-rose-400">-{calculatedLossPct}%</strong>
            </div>

            <div className="p-3 rounded-2xl bg-white/90 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase block font-bold">Monetary Loss / Acre</span>
              <strong className="text-lg font-black text-rose-600 dark:text-rose-400">₹{calculatedLossRs.toLocaleString()}</strong>
            </div>

            <div className="p-3 rounded-2xl bg-white/90 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase block font-bold">Curative Spray Cost</span>
              <strong className="text-lg font-black text-slate-900 dark:text-white">₹{calculatedCostRs.toLocaleString()}</strong>
            </div>

            <div className="p-3 rounded-2xl bg-white/90 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase block font-bold">Plant Tissue Destruction</span>
              <strong className="text-lg font-black text-amber-600 dark:text-amber-400">{activeStage.damagePct}% Canopy</strong>
            </div>
          </div>

          {/* Biological Symptoms & Critical Warning */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-1.5">
              <span className="font-black uppercase tracking-wider text-[11px] text-slate-700 dark:text-slate-300 block font-mono">
                🔬 Biological Pathology & Visible Symptoms:
              </span>
              <p className="text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                {activeStage.pathology}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-1.5">
              <span className="font-black uppercase tracking-wider text-[11px] text-rose-700 dark:text-rose-400 block font-mono">
                ⚠️ Long-term Consequences by Leaving Unchecked:
              </span>
              <p className="text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                {activeStage.consequences}
              </p>
            </div>
          </div>

          {/* Recommended Action Protocol */}
          <div className="p-4 rounded-2xl bg-emerald-100/60 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="space-y-0.5">
              <span className="font-black uppercase tracking-wider text-[11px] text-emerald-900 dark:text-emerald-300 block font-mono">
                🛡️ Immediate Prescription Protocol:
              </span>
              <p className="text-emerald-800 dark:text-emerald-200 font-bold">
                {activeStage.action}
              </p>
            </div>

            <button
              onClick={() => setActiveTab('scan')}
              className="py-2.5 px-4 rounded-xl bg-[#047857] hover:bg-[#065F46] text-white font-black text-xs shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 shrink-0"
            >
              <span>Scan Leaf with AI</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

      {/* 5. DUAL VISUALIZATION: INACTION LOSS CURVE VS REMEDIATION COST ESCALATION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* CHART 1: Yield Loss % and Monetary Damage (7 cols) */}
        <div className={`lg:col-span-7 p-6 rounded-3xl border shadow-sm space-y-4 ${
          isDark ? 'bg-[#0a1324] border-[#182a4a]' : 'bg-[#F5FCF7] border-[#D2EBD7]'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-black text-base text-slate-900 dark:text-white">
                Inaction Loss Progression vs. Days of Delay
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Notice the sharp inflection point beyond the 48-hour Golden Action Window
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400">Exponential Risk</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={currentProfile.lossCurveData}>
                <defs>
                  <linearGradient id="lossGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#1e293b" : "#e2e8f0"} />
                <XAxis dataKey="day" stroke={isDark ? "#94a3b8" : "#64748b"} fontSize={11} />
                <YAxis unit="%" stroke={isDark ? "#94a3b8" : "#64748b"} fontSize={11} />
                <Tooltip 
                  formatter={(val) => [`${val}% Loss`, 'Yield Destruction']}
                  contentStyle={{ backgroundColor: isDark ? '#0f172a' : '#ffffff', borderRadius: '12px', border: '1px solid #cbd5e1' }} 
                />
                <Area type="monotone" dataKey="lossPct" name="Yield Loss %" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#lossGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 2: Chemical Remediation Cost Multiplier (5 cols) */}
        <div className={`lg:col-span-5 p-6 rounded-3xl border shadow-sm space-y-4 ${
          isDark ? 'bg-[#0a1324] border-[#182a4a]' : 'bg-[#F5FCF7] border-[#D2EBD7]'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-black text-base text-slate-900 dark:text-white">
                Spray & Chemical Cost Escalation
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                ₹280 preventive spray vs ₹6,800 late systemic emergency cocktails
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-amber-600">24x Cost Spike</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={currentProfile.lossCurveData}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#1e293b" : "#e2e8f0"} />
                <XAxis dataKey="day" stroke={isDark ? "#94a3b8" : "#64748b"} fontSize={10} />
                <YAxis unit="₹" stroke={isDark ? "#94a3b8" : "#64748b"} fontSize={10} />
                <Tooltip 
                  formatter={(val) => [`₹${val}`, 'Remediation Cost / Acre']}
                  contentStyle={{ backgroundColor: isDark ? '#0f172a' : '#ffffff', borderRadius: '12px', border: '1px solid #cbd5e1' }} 
                />
                <Bar dataKey="costRs" name="Spray Cost (₹/Acre)" fill="#f59e0b" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* 6. COMPLETE 4-STAGE POST-THRESHOLD ESCALATION BREAKDOWN CARDS */}
      <div className="space-y-4">
        <h3 className="font-black text-lg text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <span>Stage-by-Stage Pathological Escalation & Consequences</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {currentProfile.stages.map((st, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-3xl border-2 flex flex-col justify-between space-y-3 transition-all hover:shadow-md ${st.borderClass} ${st.bgClass}`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase font-mono ${st.statusColor}`}>
                    {st.status}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 font-bold">{st.dayRange}</span>
                </div>

                <h4 className="font-black text-sm text-slate-900 dark:text-white leading-tight">
                  {st.label}
                </h4>

                <p className="text-[11px] text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                  {st.pathology}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-200/60 dark:border-slate-800">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-500">Yield Loss:</span>
                  <strong className="text-rose-600 dark:text-rose-400">-{st.yieldLossPct}%</strong>
                </div>
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-500">Financial Loss:</span>
                  <strong className="text-rose-600 dark:text-rose-400">₹{st.lossRupees.toLocaleString()}</strong>
                </div>
                <div className="p-2 rounded-xl bg-white/80 dark:bg-slate-900 text-[10px] text-slate-700 dark:text-slate-300 font-bold border border-slate-200 dark:border-slate-800">
                  ⚡ {st.action}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
