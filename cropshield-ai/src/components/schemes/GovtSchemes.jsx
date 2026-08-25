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
  const { lang, t } = useApp();
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
      // Descriptions
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

      // Eligibility
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

      // Benefits
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

    if (lang === 'hi') {
      if (text.includes('Income support of ₹6,000 per year')) return 'सभी भूमिधारक किसान परिवारों को प्रति वर्ष ₹6,000 की प्रत्यक्ष आय सहायता 3 समान किस्तों में।';
      if (text.includes('Financial support to farmers suffering crop loss')) return 'प्राकृतिक आपदाओं और कीटों से हुए फसल नुकसान की व्यापक वित्तीय भरपाई।';
      if (text.includes('All Landholder Farmers')) return 'सभी भूमिधारक किसान';
      if (text.includes('All Farmers growing notified crops')) return 'अधिसूचित फसलें उगाने वाले सभी किसान';
      if (text.includes('Small & Marginal Farmers')) return 'छोटे और सीमांत किसान';
      if (text.includes('₹6,000 / year')) return '₹6,000 / वर्ष';
      if (text.includes('Low premium crop cover')) return 'कम प्रीमियम पर फसल सुरक्षा';
    }

    return text;
  };

  const filteredSchemes = governmentSchemesData.filter(s => {
    const selectedCategoryObj = categoryList.find(c => c.key === activeCategoryKey);
    const matchesCategory = !selectedCategoryObj || selectedCategoryObj.id === 'All' || s.category === selectedCategoryObj.id;
    const matchesSearch = 
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.titleMr && s.titleMr.toLowerCase().includes(searchQuery.toLowerCase())) ||
      s.benefitDetails.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12 select-none">
      {/* Top Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-white tracking-tight">
            {t('availableGovtSchemes')}
          </h2>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
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
            className="w-full pl-9 pr-3 py-2 bg-[#0c1527] border border-[#1e2f4f] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
        {categoryList.map((cat) => {
          const isSelected = activeCategoryKey === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => setActiveCategoryKey(cat.key)}
              className={
                "px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all " +
                (isSelected
                  ? "bg-cyan-500 text-slate-950 shadow-[0_0_12px_rgba(6,182,212,0.3)] font-black scale-102"
                  : "bg-[#0a1426] text-slate-300 hover:text-white hover:bg-[#122240] border border-[#192b4a]")
              }
            >
              {t(cat.key)}
            </button>
          );
        })}
      </div>

      {/* Schemes List matching Reference Image Layout */}
      <div className="space-y-4">
        {filteredSchemes.map((scheme) => {
          const isExpanded = expandedSchemeId === scheme.id;

          return (
            <div
              key={scheme.id}
              className="bg-[#091122] border border-[#162744] hover:border-cyan-500/40 rounded-2xl p-5 transition-all shadow-md relative overflow-hidden group"
            >
              <div className="flex items-start space-x-4">
                {/* Left Ribbon Bookmark Circle Icon matching reference image */}
                <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 flex-shrink-0 shadow-[0_0_10px_rgba(6,182,212,0.15)] mt-0.5">
                  <Bookmark className="w-5 h-5 fill-cyan-500/20" />
                </div>

                {/* Main Content Area */}
                <div className="flex-1 space-y-2.5">
                  <div>
                    <h3 className="text-base font-extrabold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                      {lang === 'mr' && scheme.titleMr ? scheme.titleMr : scheme.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 font-normal leading-relaxed">
                      {translateContent(scheme.benefitDetails)}
                    </p>
                  </div>

                  {/* Metadata Badges matching reference image */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-[11px] font-semibold text-slate-300 bg-[#060c18] border border-slate-800 px-2.5 py-1 rounded-lg">
                      <strong className="text-slate-400">{t('benefit')}: </strong>
                      <span className="text-white font-bold">{translateContent(scheme.benefitAmount)}</span>
                    </span>

                    <span className="text-[11px] font-semibold text-slate-300 bg-[#060c18] border border-slate-800 px-2.5 py-1 rounded-lg">
                      <strong className="text-slate-400">{t('eligibility')}: </strong>
                      <span className="text-white font-bold">{translateContent(scheme.eligibility)}</span>
                    </span>

                    <span className="text-[11px] font-bold text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-1 rounded-lg">
                      {getCategoryTranslation(scheme.category)}
                    </span>
                  </div>

                  {/* Expandable Documents & Application Steps */}
                  {isExpanded && (
                    <div className="pt-3 mt-3 border-t border-slate-800/80 space-y-3 animate-fadeIn text-xs">
                      <div className="space-y-1.5">
                        <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-cyan-400" /> {t('mandatoryDocs')}:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                          {scheme.documentsRequired && scheme.documentsRequired.map((doc, idx) => (
                            <div key={idx} className="p-2 bg-[#0c1628] border border-slate-800/80 rounded-lg text-slate-300 text-[11px] flex items-center gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                              <span>{doc}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-2.5 bg-[#060d1b] border border-slate-800 rounded-xl text-[11px] text-slate-300 flex items-center justify-between">
                        <span><strong>{t('nodalDepartment')}:</strong> {scheme.department}</span>
                        <span className="text-cyan-400 font-bold">{scheme.subsidyPercentage}</span>
                      </div>
                    </div>
                  )}

                  {/* Actions Row */}
                  <div className="pt-2 flex items-center space-x-3">
                    {/* Direct 1-Click Official Portal Link matching reference image */}
                    <a
                      href={scheme.applicationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-md transition-all active:scale-95 group/btn"
                    >
                      <span>{t('applyOnline')}</span>
                      <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </a>

                    {/* View Details Toggle */}
                    <button
                      onClick={() => setExpandedSchemeId(isExpanded ? null : scheme.id)}
                      className="px-3 py-2 bg-[#0c1628] hover:bg-[#142340] border border-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors"
                    >
                      <span>{isExpanded ? t('hideDetails') : t('viewRequirements')}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
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
