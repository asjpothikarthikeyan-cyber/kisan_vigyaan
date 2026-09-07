import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { governmentSchemesData } from '../../data/extendedMockData';
import { 
  Bookmark, 
  ExternalLink, 
  Search, 
  CheckCircle2, 
  FileText, 
  Sparkles,
  ShieldCheck,
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const GovtSchemes = () => {
  const { lang, t, theme } = useApp();
  const isDark = theme === 'dark';
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategoryKey, setActiveCategoryKey] = useState('catAll');
  const [expandedSchemeId, setExpandedSchemeId] = useState(null);

  const categoryList = [
    { id: 'All', key: 'catAll' },
    { id: 'Financial Support', key: 'catFinancial' },
    { id: 'Crop Insurance', key: 'catInsurance' },
    { id: 'Solar & Irrigation', key: 'catIrrigation' },
    { id: 'Machinery & Equipment', key: 'catMachinery' },
    { id: 'Storage & Warehousing', key: 'catStorage' },
    { id: 'Organic Farming', key: 'catOrganic' },
    { id: 'Marketing & Mandi', key: 'catMarketing' },
    { id: 'Livestock & Dairy', key: 'catLivestock' }
  ];

  const getCategoryTranslation = (categoryName) => {
    const matched = categoryList.find(c => c.id === categoryName);
    return matched ? t(matched.key) : categoryName;
  };

  const translateContent = (text, type = 'text') => {
    if (!text) return '';
    if (lang === 'mr') {
      if (text.includes('Income support of ₹6,000 per year')) return 'सर्व जमीनधारक शेतकरी कुटुंबांना दरवर्षी ₹६,००० चे थेट आर्थिक सहाय्य तीन समान हप्त्यांमध्ये बँक खात्यात.';
      if (text.includes('Financial support to farmers suffering crop loss')) return 'अतिवृष्टी, दुष्काळ, कीड व नैसर्गिक आपत्तींमुळे झालेल्या पिकांच्या नुकसानीची संपूर्ण आर्थिक भरपाई.';
      if (text.includes('Get up to 50% subsidy on warehousing rental fees')) return '३ महिन्यांपेक्षा जास्त कालावधीकरिता धान्य साठवणुकीवर ५०% शासकीय भाडे अनुदान.';
      if (text.includes('Get subsidy up to 40% on procurement of advanced IoT')) return 'ट्रॅक्टर, कृषी अवजारे, फवारणी यंत्रे व सेन्सर्स खरेदीवर ४०% ते ८०% थेट बँक अनुदान.';
      if (text.includes('Installation of standalone off-grid 3 HP')) return '३ एचपी, ५ एचपी व ७.५ एचपी स्वतंत्र सौर कृषी पंपांवर ९०% शासकीय अनुदान. २५ वर्षे मोफत सिंचन.';
      if (text.includes('Access timely institutional credit for crop cultivation')) return 'वेळेवर परतफेड केल्यास केवळ ४% व्याजदराने ₹३ लाखांपर्यंत सुलभ पीक कर्ज पुरवठा.';
      if (text.includes('Financial assistance of 55% for small/marginal farmers')) return 'पाण्याची ४०-५०% बचत करून उत्पादन वाढवण्यासाठी ठिबक व तुषार सिंचन संचावर ५५% थेट अनुदान.';
      if (text.includes('Financial support of ₹50,000/ha for organic conversion')) return 'गांडूळ खत युनिट, जीवामृत व सेंद्रिय प्रमाणीकरणासाठी ३ वर्षांत ₹५०,००० प्रति हेक्टर अनुदान.';
      if (text.includes('Online trading platform connecting 1,361+ wholesale APMC')) return 'देशभरातील १,३६१+ बाजार समित्यांशी थेट ऑनलाइन जोडणी व थेट खात्यात त्वरित पैसे जमा.';
      if (text.includes('Medium to long-term debt financing for post-harvest')) return 'शीतगृहे (Cold Storage), पॅक हाऊस व धान्य सायलो उभारणीसाठी ३% व्याज सवलत कर्ज.';
      if (text.includes('Old-age social security pension of ₹3,000 per month')) return 'वयाची ६० वर्षे पूर्ण झाल्यानंतर दरमहा ₹३,००० निश्चित निवृत्तीवेतन (पेन्शन).';
      if (text.includes('Free soil testing card assessing 12 macro/micro-nutrients')) return '१२ अन्नद्रव्यांची मोफत माती तपासणी व अचूक खत मात्रा शिफारस अहवाल.';
      if (text.includes('Up to 50% subsidy on establishment of high-density fruit')) return 'द्राक्ष, डाळिंब फळबाग लागवड, हरितगृह, शेडनेट हाऊस व मल्चिंगवर ५०% अनुदान.';
      if (text.includes('Financial assistance up to 80% for purchase of scientific bee')) return 'मधमाशी पेट्या, मध प्रक्रिया यंत्रे व प्रशिक्षणासाठी ८०% शासकीय अनुदान.';
      if (text.includes('50% capital subsidy on establishing cattle breed')) return 'गायी-म्हशींचे गोठे, स्वयंचलित दूध काढणी यंत्रे व मुरघास युनिटवर ५०% भांडवली अनुदान.';
      if (text.includes('Single window digital gateway for all Maharashtra State')) return 'बियाणे, पाईपलाईन, शेततळे, प्लास्टिक अस्तरीकरण व अवजारांसाठी एकाच अर्जावर संपूर्ण लाभ.';

      if (text.includes('All Landholder Farmers')) return 'सर्व जमीनधारक शेतकरी';
      if (text.includes('All Farmers growing notified crops')) return 'अधिसूचित पिके घेणारे सर्व शेतकरी';
      if (text.includes('Registered Grain Guards')) return 'नोंदणीकृत शेतकरी व FPO';
      if (text.includes('Small & Marginal Farmers')) return 'अल्प व अत्यल्प भूधारक शेतकरी';
      if (text.includes('Farmers with borewell/well without electricity')) return 'विहीर/बोअरवेल असलेले व वीज नसलेले शेतकरी';
      if (text.includes('All owner cultivators, tenant farmers')) return 'सर्व शेतकरी, कुळ शेतकरी व पशुपालक';
      if (text.includes('All farmers with cultivable agricultural land')) return 'पाण्याचा स्त्रोत व शेतीजमीन असणारे सर्व शेतकरी';
      if (text.includes('Farmers in organic clusters')) return '५० एकर सेंद्रिय शेती क्लस्टरमधील शेतकरी';
      if (text.includes('All farmers, FPOs, and traders')) return 'शेतमाल विकणारे सर्व शेतकरी व FPO';
      if (text.includes('Farmers, FPOs, Primary Agricultural')) return 'शेतकरी, FPO आणि कृषी सहकारी संस्था';
      if (text.includes('Small & marginal farmers aged between 18 and 40')) return '१८ ते ४० वयोगटातील अल्पभूधारक शेतकरी';
      if (text.includes('All agricultural landholders in all districts')) return 'सर्व शेतजमीन धारक शेतकरी';
      if (text.includes('Individual farmers, grower associations')) return 'शेतकरी, फळ उत्पादक संघ व बचत गट';
      if (text.includes('Small/Marginal Farmers, Landless laborers')) return 'लहान व सीमांत शेतकरी, आदिवासी शेतकरी';
      if (text.includes('Individual farmers, Dairy Cooperatives')) return 'शेतकरी, दुग्ध सहकारी संस्था व बचत गट';
      if (text.includes('All resident agricultural landowners')) return 'महाराष्ट्रातील सर्व शेतकरी व खातेदार';

      if (text.includes('₹6,000 / year')) return '₹६,००० / वर्ष';
      if (text.includes('Low premium crop cover')) return 'नाममात्र १ रुपयात पीक विमा';
      if (text.includes('50% Rental Subsidy')) return '५०% गोदाम भाडे अनुदान';
      if (text.includes('40% IoT Hardware Subsidy')) return '४०% ते ८०% अवजारे अनुदान';
      if (text.includes('Up to 90% Solar Pump Subsidy')) return '९०% सोलर पंप अनुदान';
      if (text.includes('Loans up to ₹3,00,000 @ 4% Interest')) return '₹३ लाख पीक कर्ज ४% व्याजाने';
      if (text.includes('55% Drip / Sprinkler Subsidy')) return '५५% ठिबक सिंचन अनुदान';
      if (text.includes('₹50,000 per Hectare')) return '₹५०,००० / हेक्टर अनुदान';
      if (text.includes('Zero Brokerage & Pan-India Competitive Prices')) return 'शून्य दलाली व देशव्यापी भाव';
      if (text.includes('3% Interest Subvention on Loans up to ₹2 Crore')) return '३% व्याज सवलत कर्ज';
      if (text.includes('₹3,000 / month Assured Pension')) return 'मासिक ₹३,००० पेन्शन';
      if (text.includes('Free 12-Parameter Soil Card + ₹2,500 Kit')) return 'मोफत माती पत्रिका + किट';
      if (text.includes('Up to 50% Capital Subsidy')) return '५०% फलोत्पादन अनुदान';
      if (text.includes('Up to 80% Subsidy on Bee Colonies')) return '८०% मधमाशी पालन अनुदान';
      if (text.includes('Up to 50% Capital Subsidy (up to ₹50 Lakh)')) return '५०% दुग्ध व्यवसाय अनुदान';
      if (text.includes('Comprehensive Direct Bank Transfer (DBT)')) return 'थेट बँक खात्यात अनुदान (DBT)';
    }

    if (lang === 'ta') {
      if (text.includes('Income support of ₹6,000 per year')) return 'அனைத்து விவசாய குடும்பங்களுக்கும் ஆண்டுக்கு ₹6,000 நேரடி வங்கி பணப்பரிமாற்றம் 3 தவணைகளில்.';
      if (text.includes('Financial support to farmers suffering crop loss')) return 'இயற்கை சீற்றங்கள் மற்றும் பூச்சிகளால் ஏற்படும் பயிர் இழப்பிற்கு முழு நிதி இழப்பீடு.';
      if (text.includes('Get up to 50% subsidy on warehousing rental fees')) return '3 மாதங்களுக்கு மேலான சேமிப்பிற்கு 50% அரசு கிடங்கு வாடகை மானியம்.';
      if (text.includes('Get subsidy up to 40% on procurement of advanced IoT')) return 'டிராக்டர், நவீன கருவிகள் மற்றும் சென்சார்களுக்கு 40% முதல் 80% வரை மானியம்.';
      if (text.includes('Installation of standalone off-grid 3 HP')) return 'சூரியசக்தி பம்புகளுக்கு 90% அரசு மானியம் மற்றும் 25 ஆண்டுகள் இலவச பாசனம்.';
      if (text.includes('Access timely institutional credit for crop cultivation')) return '4% வட்டி விகிதத்தில் ₹3 லட்சம் வரை கிசான் கிரெடிட் கார்டு கடன்.';
      if (text.includes('Financial assistance of 55% for small/marginal farmers')) return 'சொட்டு நீர் மற்றும் தெளிப்பு பாசனத்திற்கு 55% வரை நேரடி மானியம்.';
      if (text.includes('Financial support of ₹50,000/ha for organic conversion')) return 'இயற்கை விவசாய சான்றிதழ் மற்றும் மண்புழு உரத்திற்கு ஹெக்டேருக்கு ₹50,000.';
      if (text.includes('Online trading platform connecting 1,361+ wholesale APMC')) return 'நாடு முழுவதும் 1,361+ சந்தைகளுடன் நேரடி தொடர்பு மற்றும் சிறந்த விலை.';
      if (text.includes('Medium to long-term debt financing for post-harvest')) return 'குளிர்பதன கிடங்கு மற்றும் சேமிப்பு வசதிகளுக்கு 3% வட்டி தள்ளுபடி கடன்.';
      if (text.includes('Old-age social security pension of ₹3,000 per month')) return '60 வயதுக்கு பின் மாதந்தோறும் ₹3,000 உறுதியான ஓய்வூதியம்.';
      if (text.includes('Free soil testing card assessing 12 macro/micro-nutrients')) return '12 ஊட்டச்சத்துக்களுக்கான இலவச மண் பரிசோதனை மற்றும் உர பரிந்துரை அட்டை.';
      if (text.includes('Up to 50% subsidy on establishment of high-density fruit')) return 'பழத்தோட்டம், பாலிஹவுஸ் மற்றும் நிழல்வலை குடில்களுக்கு 50% வரை மானியம்.';
      if (text.includes('Financial assistance up to 80% for purchase of scientific bee')) return 'தேனீ வளர்ப்பு பெட்டிகள் மற்றும் பயிற்சிக்கு 80% அரசு நிதி உதவி.';
      if (text.includes('50% capital subsidy on establishing cattle breed')) return 'பால் பண்ணை மற்றும் கால்நடை கொட்டகைக்கு 50% மூலதன மானியம்.';
      if (text.includes('Single window digital gateway for all Maharashtra State')) return 'அனைத்து அரசு வேளாண் திட்டங்களுக்கும் ஒரே விண்ணப்ப போர்டல்.';

      if (text.includes('All Landholder Farmers')) return 'அனைத்து நில உரிமையாளர் விவசாயிகள்';
      if (text.includes('All Farmers growing notified crops')) return 'அறிவிக்கப்பட்ட பயிர்களை பயிரிடும் அனைத்து விவசாயிகள்';
      if (text.includes('Small & Marginal Farmers')) return 'சிறு & குறு விவசாயிகள்';
      if (text.includes('Farmers with borewell/well without electricity')) return 'மின்சார வசதி இல்லாத கிணறு உள்ள விவசாயிகள்';
      if (text.includes('All owner cultivators, tenant farmers')) return 'அனைத்து விவசாயிகள் மற்றும் குத்தகைதாரர்கள்';
      if (text.includes('All farmers with cultivable agricultural land')) return 'விவசாய நிலம் உள்ள அனைத்து விவசாயிகள்';
      if (text.includes('All farmers, FPOs, and traders')) return 'அனைத்து விவசாயிகள் மற்றும் FPO-க்கள்';
    }

    if (lang === 'hi') {
      if (text.includes('Income support of ₹6,000 per year')) return 'सभी भूमिधारक किसान परिवारों को प्रति वर्ष ₹6,000 की प्रत्यक्ष आय सहायता 3 समान किस्तों में।';
      if (text.includes('Financial support to farmers suffering crop loss')) return 'प्राकृतिक आपदाओं और कीटों से हुए फसल नुकसान की व्यापक वित्तीय भरपाई।';
      if (text.includes('Get up to 50% subsidy on warehousing rental fees')) return '3 महीने से अधिक भंडारण पर 50% सरकारी किराया सब्सिडी।';
      if (text.includes('Get subsidy up to 40% on procurement of advanced IoT')) return 'ट्रैक्टर, आधुनिक कृषि यंत्र और सेंसर पर 40% से 80% तक सब्सिडी।';
      if (text.includes('Installation of standalone off-grid 3 HP')) return 'सोलर पंप पर 90% सरकारी सब्सिडी और 25 साल मुफ्त सिंचाई।';
      if (text.includes('Access timely institutional credit for crop cultivation')) return 'समय पर भुगतान करने पर मात्र 4% ब्याज पर ₹3 लाख तक किसान क्रेडिट कार्ड ऋण।';
      if (text.includes('Financial assistance of 55% for small/marginal farmers')) return 'टपक व फव्वारा सिंचाई यंत्र पर 55% तक प्रत्यक्ष सब्सिडी।';
      if (text.includes('Financial support of ₹50,000/ha for organic conversion')) return 'जैविक प्रमाणीकरण और वर्मीकंपोस्ट के लिए ₹50,000 प्रति हेक्टेयर सहायता।';
      if (text.includes('Online trading platform connecting 1,361+ wholesale APMC')) return 'देशभर की 1,361+ मंडियों से सीधा जुड़ाव व पारदर्शी मूल्य।';
      if (text.includes('Medium to long-term debt financing for post-harvest')) return 'कोल्ड स्टोरेज और गोदाम निर्माण के लिए 3% ब्याज छूट पर ऋण।';
      if (text.includes('Old-age social security pension of ₹3,000 per month')) return '60 वर्ष की आयु के बाद ₹3,000 मासिक सुनिश्चित पेंशन।';
      if (text.includes('Free soil testing card assessing 12 macro/micro-nutrients')) return '12 पोषक तत्वों की मुफ्त मृदा जांच और खाद अनुशंसा पत्र।';
      if (text.includes('Up to 50% subsidy on establishment of high-density fruit')) return 'बागवानी, पॉलीहाउस और शेडनेट के लिए 50% तक सब्सिडी।';
      if (text.includes('Financial assistance up to 80% for purchase of scientific bee')) return 'मधुमक्खी पालन बक्से व प्रशिक्षण के लिए 80% सरकारी सहायता।';
      if (text.includes('50% capital subsidy on establishing cattle breed')) return 'डेयरी फार्मिंग और पशुपालन शेड के लिए 50% पूंजीगत सब्सिडी।';
      if (text.includes('Single window digital gateway for all Maharashtra State')) return 'महाराष्ट्र सरकार की सभी कृषि योजनाओं का एक ही पोर्टल पर लाभ।';
    }

    return text;
  };

  const selectedCategoryObj = categoryList.find(c => c.key === activeCategoryKey);
  const selectedCategoryId = selectedCategoryObj ? selectedCategoryObj.id : 'All';

  const filteredSchemes = governmentSchemesData.filter(scheme => {
    const matchesCategory = selectedCategoryId === 'All' || scheme.category === selectedCategoryId;
    const matchesSearch = 
      scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (scheme.titleMr && scheme.titleMr.toLowerCase().includes(searchQuery.toLowerCase())) ||
      scheme.benefitAmount.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.eligibility.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {t('govtSchemesTitle')}
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300 rounded-full border border-emerald-300 dark:border-emerald-500/30">
              Direct Benefit Transfer
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-0.5">
            {t('govtSchemesSubtitle')}
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xs w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-9 pr-3 py-2 rounded-xl text-xs font-medium focus:outline-none focus:border-emerald-500 transition-colors ${
              isDark 
                ? 'bg-slate-900 border border-slate-800 text-white placeholder-slate-500' 
                : 'bg-white border border-slate-300 text-slate-900 placeholder-slate-400 shadow-2xs'
            }`}
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-1.5 pb-1">
        {categoryList.map((cat) => {
          const isSelected = activeCategoryKey === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => setActiveCategoryKey(cat.key)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer active:scale-95 ${
                isSelected
                  ? 'bg-emerald-600 text-white shadow-md font-black scale-102'
                  : isDark
                  ? 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                  : 'bg-white text-slate-700 hover:text-emerald-700 hover:bg-slate-50 border border-slate-200 shadow-2xs'
              }`}
            >
              {t(cat.key)}
            </button>
          );
        })}
      </div>

      {/* Schemes List */}
      <div className="space-y-4">
        {filteredSchemes.map((scheme) => {
          const isExpanded = expandedSchemeId === scheme.id;

          return (
            <div
              key={scheme.id}
              className={`rounded-2xl p-5 transition-all shadow-sm border group hover:-translate-y-0.5 ${
                isDark 
                  ? 'bg-[#091122] border-slate-800 hover:border-emerald-500/40 text-white' 
                  : 'bg-white border-slate-200 hover:border-emerald-400 text-slate-900'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/30 flex items-center justify-center text-emerald-800 dark:text-emerald-400 shrink-0 shadow-xs mt-0.5">
                  <Bookmark className="w-5 h-5 fill-emerald-500/20" />
                </div>

                <div className="flex-1 space-y-2.5">
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                      {lang === 'mr' && scheme.titleMr ? scheme.titleMr : scheme.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 font-medium leading-relaxed">
                      {translateContent(scheme.benefitDetails)}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border ${
                      isDark ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}>
                      <strong className="text-slate-500 dark:text-slate-400">{t('benefit')}: </strong>
                      <span className="text-emerald-700 dark:text-emerald-400 font-bold">{translateContent(scheme.benefitAmount)}</span>
                    </span>

                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border ${
                      isDark ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}>
                      <strong className="text-slate-500 dark:text-slate-400">{t('eligibility')}: </strong>
                      <span className="text-slate-900 dark:text-white font-bold">{translateContent(scheme.eligibility)}</span>
                    </span>

                    <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-500/30 px-2.5 py-1 rounded-lg">
                      {getCategoryTranslation(scheme.category)}
                    </span>
                  </div>

                  {/* Requirements and Mandatory Documents Section */}
                  <div className="pt-3 mt-1 border-t border-slate-100 dark:border-slate-800 space-y-2.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5 font-sans">
                        <FileText className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>{lang === 'ta' ? 'தேவையான ஆவணங்கள் & தகுதி விவரம்:' : lang === 'mr' ? 'आवश्यक कागदपत्रे व पात्रता तपशील:' : 'Eligibility & Mandatory Documents:'}</span>
                      </span>

                      <button
                        onClick={() => setExpandedSchemeId(isExpanded ? null : scheme.id)}
                        className="text-xs font-bold text-[#1B5E20] dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>{isExpanded ? (lang === 'ta' ? 'குறைவாகக் காட்டு' : lang === 'mr' ? 'कमी माहिती' : 'Show Less') : (lang === 'ta' ? 'ஆவணங்களைப் பார்க்க' : lang === 'mr' ? 'कागदपत्रे पहा' : 'View Requirements')}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="p-3.5 bg-slate-50 dark:bg-slate-950/60 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 animate-fadeIn">
                        <div>
                          <span className="text-[10px] text-slate-500 font-bold uppercase block mb-1">
                            {lang === 'ta' ? 'அமலாக்கத்துறை / அரசு பிரிவு:' : lang === 'mr' ? 'अंमलबजावणी विभाग:' : 'Implementing Authority:'}
                          </span>
                          <strong className="text-slate-900 dark:text-white font-sans text-xs">
                            {scheme.department || 'Ministry of Agriculture & Farmers Welfare'}
                          </strong>
                        </div>

                        <div>
                          <span className="text-[10px] text-slate-500 font-bold uppercase block mb-1.5">
                            {lang === 'ta' ? 'சமர்ப்பிக்க வேண்டிய அத்தியாவசிய ஆவணங்கள்:' : lang === 'mr' ? 'जोडावयाची आवश्यक कागदपत्रे:' : 'Mandatory Verification Documents Required:'}
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {(scheme.documentsRequired || [
                              '7/12 & 8A Land Record Extract',
                              'Aadhaar Card with linked Mobile OTP',
                              'Nationalized Bank Passbook Copy with IFSC',
                              'Sowing Certificate / Crop Declaration'
                            ]).map((doc, idx) => (
                              <div 
                                key={idx} 
                                className={`flex items-center space-x-2 p-2.5 rounded-xl border ${
                                  isDark ? 'bg-[#0a1324] border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700 shadow-2xs'
                                }`}
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                                <span className="text-[11px] font-medium">{doc}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 rounded-xl text-emerald-950 dark:text-emerald-300 text-[11px] font-medium">
                          <strong>💡 {lang === 'ta' ? 'விவசாயி உதவிக்குறிப்பு:' : lang === 'mr' ? 'शेतकरी टीप:' : 'Direct Benefit Tip:'}</strong> {lang === 'ta' ? 'வங்கி கணக்குடன் ஆதார் இணைக்கப்பட்டிருக்க வேண்டும் (DBT Enabled). அனைத்து அரசு மானியங்களும் 72 மணி நேரத்திற்குள் நேரடியாக உங்கள் வங்கி கணக்கில் வரவு வைக்கப்படும்.' : 'Ensure Aadhaar is linked to your Bank Account (DBT Enabled) to receive automatic direct benefit transfers without middlemen.'}
                        </div>
                      </div>
                    )}

                    {/* Bottom Action Strip with Direct Official Portal Link */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                        {lang === 'ta' ? 'அதிகாரப்பூர்வ அரசு இணையதள போர்டல்' : lang === 'mr' ? 'अधिकृत शासकीय ऑनलाइन पोर्टल' : 'Official Central / State Govt Portal'}
                      </span>

                      <a
                        href={scheme.applicationLink || scheme.portalUrl || scheme.link || 'https://agricoop.gov.in/'}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          const url = scheme.applicationLink || scheme.portalUrl || scheme.link || 'https://agricoop.gov.in/';
                          window.open(url, '_blank', 'noopener,noreferrer');
                        }}
                        className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-2.5 bg-[#1B5E20] hover:bg-[#154D1A] text-white text-xs font-black rounded-xl shadow-md cursor-pointer active:scale-95 transition-all"
                      >
                        <span>{t('applyOnGovtPortal')}</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
