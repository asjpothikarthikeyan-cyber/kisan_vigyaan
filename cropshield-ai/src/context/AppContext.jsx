import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../utils/translations';
import { seedCropListings } from '../data/marketplaceData';
import {
  diseasesDatabase,
  surveillanceStats,
  diseaseTrendData,
  topDiseasesDistribution,
  sangliHotspots,
  seedFarmerReports,
  seedCommunityPosts,
  liveSensorTelemetry,
  sampleLeafImages
} from '../data/mockData';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // Current active role: 'farmer' | 'officer' | 'admin'
  const [role, setRole] = useState(() => localStorage.getItem('cs_role') || 'farmer');
  
  // Current language: 'en' | 'mr' | 'hi'
  const [lang, setLang] = useState(() => localStorage.getItem('cs_lang') || 'en');
  
  // View mode: 'mobile' | 'desktop'
  const [viewMode, setViewMode] = useState('mobile');

  // Active navigation tab for farmer: 'home' | 'scan' | 'diagnosis' | 'actions' | 'reports' | 'community' | 'sensors' | 'weather' | 'profile'
  const [activeTab, setActiveTab] = useState('home');

  // Active navigation tab for officer/admin: 'dashboard' | 'reportsQueue' | 'riskMap' | 'farmers' | 'advisories' | 'communityReview' | 'settings'
  const [officerTab, setOfficerTab] = useState('dashboard');

  // Current Farmer Profile
  const [farmerProfile, setFarmerProfile] = useState({
    name: "Ramesh Patil",
    phone: "+91 98224 55120",
    location: "Sangli, Maharashtra",
    tehsil: "Miraj / Kupwad",
    crop: "Tomato",
    variety: "Abhinav",
    acreage: "2.5 Acres",
    growthStage: "Flowering",
    soilType: "Black Cotton Soil",
    sowingDate: "2024-03-15",
    healthStatus: "Good",
    earlyRiskIndex: 18,
    avatar: "👨‍🌾"
  });

  // Current Officer Profile
  const [officerProfile, setOfficerProfile] = useState({
    name: "Dr. Suhas More",
    designation: "District Agriculture Extension Officer",
    department: "Department of Agriculture, Govt. of Maharashtra",
    officeLocation: "Sangli District Headquarters",
    badge: "Official Verified Officer",
    avatar: "🧑‍🔬"
  });

  // Active Scan Diagnosis State
  const [currentDiagnosis, setCurrentDiagnosis] = useState(diseasesDatabase.earlyBlight);
  const [selectedLeafImage, setSelectedLeafImage] = useState(sampleLeafImages.earlyBlight);

  // Persistent Reports
  const [reports, setReports] = useState(() => {
    const saved = localStorage.getItem('cs_reports');
    return saved ? JSON.parse(saved) : seedFarmerReports;
  });

  // Persistent Community Posts
  const [communityPosts, setCommunityPosts] = useState(() => {
    const saved = localStorage.getItem('cs_community');
    return saved ? JSON.parse(saved) : seedCommunityPosts;
  });

  // Persistent Hotspots
  const [hotspots, setHotspots] = useState(() => {
    const saved = localStorage.getItem('cs_hotspots');
    return saved ? JSON.parse(saved) : sangliHotspots;
  });

  // Active Advisories Broadcasted
  const [advisories, setAdvisories] = useState([
    {
      id: "adv-1",
      title: "Early Blight Outbreak Advisory in Sangli & Miraj",
      titleMr: "सांगली व मिरज पट्ट्यात करपा रोगाचा तीव्र इशारा",
      message: "Continuous cloud cover and 65% humidity have created optimal spore germination conditions. Farmers in Miraj & Kupwad are advised to prune lower foliage and spray Neem Oil (3 ml/L) or Mancozeb (2 g/L).",
      date: "27 May 2024, 08:30 AM",
      issuedBy: "Dr. Suhas More (District Extension Officer)",
      severity: "High",
      targetRadiusKm: 15,
      active: true
    }
  ]);

  // Telemetry & Sensor Traps state
  const [telemetry, setTelemetry] = useState(liveSensorTelemetry);

  // Save to local storage
  useEffect(() => {
    localStorage.setItem('cs_role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('cs_lang', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('cs_reports', JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    localStorage.setItem('cs_community', JSON.stringify(communityPosts));
  }, [communityPosts]);

  useEffect(() => {
    localStorage.setItem('cs_hotspots', JSON.stringify(hotspots));
  }, [hotspots]);

  // Translation helper
  const t = (key) => {
    return translations[lang]?.[key] || translations.en[key] || key;
  };

  // Switch role helper
  const handleRoleChange = (newRole) => {
    setRole(newRole);
    if (newRole === 'farmer') {
      setActiveTab('home');
    } else {
      setOfficerTab('dashboard');
    }
  };

  // Add new scan report
  const saveScanReport = (diagnosisData, customNotes = "") => {
    const newReport = {
      id: `rep-${Date.now()}`,
      farmerName: farmerProfile.name,
      phone: farmerProfile.phone,
      village: farmerProfile.location,
      crop: `${farmerProfile.crop} (${farmerProfile.variety})`,
      acreage: farmerProfile.acreage,
      stage: farmerProfile.growthStage,
      disease: diagnosisData.name,
      confidence: diagnosisData.confidence,
      severity: diagnosisData.severity,
      affectedArea: diagnosisData.affectedArea,
      date: new Date().toLocaleString(),
      status: "Under Officer Review",
      officerRemarks: "Automated scan saved. Queued for validation by Dr. Suhas More.",
      verifiedBy: "Pending Validation",
      verifiedAt: null,
      image: diagnosisData.image || selectedLeafImage,
      recheckDate: new Date(Date.now() + diagnosisData.recheckDays * 86400000).toISOString().split('T')[0],
      customNotes
    };

    setReports(prev => [newReport, ...prev]);

    // Also adjust farm Early Risk Index if high severity
    if (diagnosisData.riskScore > 50) {
      setFarmerProfile(p => ({ ...p, earlyRiskIndex: diagnosisData.riskScore, healthStatus: "Attention Needed" }));
    }

    return newReport;
  };

  // Add Community Post
  const addCommunityPost = (post) => {
    const newPost = {
      id: `post-${Date.now()}`,
      author: farmerProfile.name,
      location: farmerProfile.location,
      role: "Farmer",
      avatar: farmerProfile.avatar,
      timeAgo: "Just now",
      crop: `${farmerProfile.crop} (${farmerProfile.growthStage})`,
      title: post.title,
      content: post.content,
      image: post.image || selectedLeafImage,
      likes: 1,
      commentsCount: 0,
      trapCount: post.trapCount || "Yellow Sticky: 8 insects | Pheromone: 2 moths",
      isOfficerVerified: false,
      officerReview: null,
      comments: []
    };

    setCommunityPosts(prev => [newPost, ...prev]);
    return newPost;
  };

  // Officer Validation of Community Post
  const verifyCommunityPost = (postId, officialComment, actionTaken = "Verified in District Database") => {
    setCommunityPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isOfficerVerified: true,
          officerReview: {
            officerName: officerProfile.name,
            designation: `${officerProfile.designation}, Sangli`,
            date: "Just now",
            badge: "Official Agriculture Dept Validation",
            comment: officialComment,
            actionTaken
          }
        };
      }
      return post;
    }));
  };

  // Officer Validation of Diagnosis Report
  const verifyFarmerReport = (reportId, remarks, status = "Verified by Officer") => {
    setReports(prev => prev.map(rep => {
      if (rep.id === reportId) {
        return {
          ...rep,
          status,
          officerRemarks: remarks,
          verifiedBy: `${officerProfile.name} (${officerProfile.designation})`,
          verifiedAt: new Date().toLocaleString()
        };
      }
      return rep;
    }));
  };

  // Broadcast new regional advisory
  const broadcastNewAdvisory = (advisoryData) => {
    const newAdv = {
      id: `adv-${Date.now()}`,
      title: advisoryData.title,
      titleMr: advisoryData.titleMr || advisoryData.title,
      message: advisoryData.message,
      date: "Just now",
      issuedBy: `${officerProfile.name} (${officerProfile.designation})`,
      severity: advisoryData.severity || "High",
      targetRadiusKm: advisoryData.targetRadiusKm || 15,
      active: true
    };
    setAdvisories(prev => [newAdv, ...prev]);
  };

  // Audio Speech Read-out
  const speakText = (text) => {
    if (!('speechSynthesis' in window)) {
      alert("Text-to-speech not supported in this browser.");
      return;
    }
    window.speechSynthesis.cancel(); // stop previous
    const utterance = new SpeechSynthesisUtterance(text);
    if (lang === 'mr') {
      utterance.lang = 'mr-IN';
    } else if (lang === 'hi') {
      utterance.lang = 'hi-IN';
    } else {
      utterance.lang = 'en-US';
    }
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  };


  // --- MARKETPLACE & MANDI STATE ---
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cs_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('cs_wishlist');
    return saved ? JSON.parse(saved) : ['fert-1', 'seed-1'];
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('cs_orders');
    return saved ? JSON.parse(saved) : [
      {
        orderId: "CS-ORD-2026-9842",
        date: "2026-08-24 10:45 AM",
        farmerName: "Ramesh Patil",
        phone: "+91 98224 55120",
        address: "Plot 14, Sangli-Miraj Road, Kupwad, Sangli, Maharashtra - 416416",
        items: [
          { id: "fert-1", name: "IFFCO Nano Urea Liquid (500 ml)", brand: "IFFCO", price: 225, mrp: 240, qty: 2, subsidyDiscount: 15 },
          { id: "pest-1", name: "Coromandel Mancozeb 75% WP (500 g)", brand: "Coromandel", price: 290, mrp: 360, qty: 1, subsidyDiscount: 70 }
        ],
        subtotal: 740,
        subsidySavings: 100,
        gst: 37,
        deliveryFee: 0,
        total: 777,
        paymentMethod: "UPI (Google Pay)",
        transactionId: "TXN-UPI-98421034-OKAXIS",
        status: "Dispatched from KVK Sangli Hub",
        estimatedDelivery: "2026-08-27",
        trackingNumber: "TRK-MH-SGL-2026-8841"
      }
    ];
  });

  const [farmerCropListings, setFarmerCropListings] = useState(() => {
    const saved = localStorage.getItem('cs_mandi_listings');
    return saved ? JSON.parse(saved) : seedCropListings;
  });

  useEffect(() => {
    localStorage.setItem('cs_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('cs_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('cs_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('cs_mandi_listings', JSON.stringify(farmerCropListings));
  }, [farmerCropListings]);

  // Cart operations
  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQty = (productId, delta) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === productId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const placeOrder = (orderData) => {
    const newOrder = {
      orderId: "CS-ORD-" + new Date().getFullYear() + "-" + Math.floor(1000 + Math.random() * 9000),
      date: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
      ...orderData,
      trackingNumber: "TRK-MH-" + Math.floor(10000 + Math.random() * 90000)
    };
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const addCropListing = (listing) => {
    const newListing = {
      id: "mandi-" + Date.now(),
      farmerName: farmerProfile.name,
      phone: farmerProfile.phone,
      district: farmerProfile.location,
      status: "Active Listing",
      bidsReceived: 0,
      highestBid: listing.expectedPricePerQtl,
      harvestDate: new Date().toISOString().split('T')[0],
      ...listing
    };
    setFarmerCropListings(prev => [newListing, ...prev]);
    return newListing;
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateCartQty,
    clearCart,
    wishlist,
    toggleWishlist,
    orders,
    placeOrder,
    farmerCropListings,
    addCropListing,
    role,
    setRole: handleRoleChange,
    lang,
    setLang,
    t,
    viewMode,
    setViewMode,
    activeTab,
    setActiveTab,
    officerTab,
    setOfficerTab,
    farmerProfile,
    setFarmerProfile,
    officerProfile,
    currentDiagnosis,
    setCurrentDiagnosis,
    selectedLeafImage,
    setSelectedLeafImage,
    reports,
    saveScanReport,
    verifyFarmerReport,
    communityPosts,
    addCommunityPost,
    verifyCommunityPost,
    hotspots,
    setHotspots,
    advisories,
    broadcastNewAdvisory,
    telemetry,
    setTelemetry,
    speakText,
    surveillanceStats,
    diseaseTrendData,
    topDiseasesDistribution,
    diseasesDatabase
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
