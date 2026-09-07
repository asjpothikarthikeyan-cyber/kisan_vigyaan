import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { fertilizerProducts, nearestFertilizerShops } from '../../data/extendedMockData';
import { CheckoutModal } from '../marketplace/CheckoutModal';
import { 
  FlaskConical, 
  Landmark, 
  Calculator, 
  CheckCircle2, 
  Sparkles, 
  Tag, 
  Search, 
  ShoppingCart, 
  Star, 
  Building2, 
  MapPin, 
  Phone, 
  Clock, 
  ShieldCheck, 
  ExternalLink, 
  Navigation, 
  Check, 
  Plus, 
  Minus, 
  X, 
  MessageCircle 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const FertilizersSubsidies = () => {
  const { lang, t, addToCart, cart, openDirectCheckout, setIsCartModalOpen } = useApp();
  const [activeTab, setActiveTab] = useState('commercial'); // 'commercial' | 'govt' | 'shops'
  const [searchQuery, setSearchQuery] = useState('');
  const [quantities, setQuantities] = useState({
    'fert-1': 1,
    'fert-2': 1,
    'fert-3': 1,
    'fert-4': 1,
    'fert-5': 1,
    'fert-6': 1
  });
  const [claimedVoucher, setClaimedVoucher] = useState(null);

  const handleQuantityChange = (id, delta) => {
    setQuantities(prev => {
      const current = prev[id] || 1;
      const next = Math.max(1, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const handleAddToCart = (product) => {
    const qty = quantities[product.id] || 1;
    addToCart({
      id: product.id,
      name: product.name,
      brand: product.company,
      price: product.subsidizedPrice,
      mrp: product.mrp || product.subsidizedPrice + 200,
      image: product.image,
      packSize: product.priceUnit,
      nutrientComposition: product.type
    }, qty);
    setIsCartModalOpen(true);
    confetti({ particleCount: 35, spread: 50, origin: { y: 0.8 } });
  };

  const handleBuyNow = (product) => {
    const qty = quantities[product.id] || 1;
    const formatted = {
      id: product.id,
      name: product.name,
      brand: product.company,
      price: product.subsidizedPrice,
      mrp: product.mrp || product.subsidizedPrice + 200,
      image: product.image,
      packSize: product.priceUnit,
      nutrientComposition: product.type,
      quantity: qty
    };
    openDirectCheckout(formatted);
  };

  const totalCartItems = (cart || []).reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts = fertilizerProducts.filter(p => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner & Title matching Reference Image */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-white tracking-tight">
            Fertilizer Marketplace & Outlets
          </h2>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            Verified Commercial & Government Subsidized Fertilizers • Nearest Private & Govt Outlets
          </p>
        </div>

        {/* View Switcher Tabs matching screenshot */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('commercial')}
            className={
              "px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all " +
              (activeTab === 'commercial'
                ? "bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                : "bg-[#0a1426] text-slate-300 hover:text-white border border-[#192b4a]")
            }
          >
            <FlaskConical className="w-3.5 h-3.5" />
            <span>Commercial Fertilizers</span>
          </button>

          <button
            onClick={() => setActiveTab('govt')}
            className={
              "px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all " +
              (activeTab === 'govt'
                ? "bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                : "bg-[#0a1426] text-slate-300 hover:text-white border border-[#192b4a]")
            }
          >
            <Landmark className="w-3.5 h-3.5" />
            <span>Govt Subsidized Fertilizers</span>
          </button>

          <button
            onClick={() => setActiveTab('shops')}
            className={
              "px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all " +
              (activeTab === 'shops'
                ? "bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                : "bg-[#0a1426] text-emerald-300 hover:text-white border border-emerald-500/30")
            }
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Nearest Shops (Private vs Govt)</span>
          </button>
        </div>
      </div>

      {/* Sub-header: Search Bar, Cart Button, Results Count */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0a1426] border border-[#192b4a] rounded-2xl p-3 shadow-md">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder={t('searchPlaceholder') || "Search fertilizers by name, company (IFFCO, Coromandel)..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-[#070e1e] border border-[#1e2f4f] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex items-center space-x-3">
          <span className="text-xs text-slate-400 font-semibold">
            {filteredProducts.length} products found
          </span>

          <button
            onClick={() => setIsCartModalOpen(true)}
            className="relative px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500 hover:text-slate-950 border border-cyan-500/40 text-cyan-300 font-extrabold text-xs rounded-xl flex items-center gap-2 shadow-xs transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Cart & Checkout</span>
            {totalCartItems > 0 && (
              <span className="px-1.5 py-0.2 bg-emerald-500 text-slate-950 rounded-full text-[10px] font-black">
                {totalCartItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* VIEW 1 & 2: PRODUCT CARDS GRID (Matches Reference Screenshot Exactly) */}
      {(activeTab === 'commercial' || activeTab === 'govt') && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {filteredProducts.map((product) => {
            const qty = quantities[product.id] || 1;
            const totalPrice = product.subsidizedPrice * qty;
            const isAdded = Boolean(cart[product.id]);

            return (
              <div
                key={product.id}
                className="bg-[#091122] border border-[#162744] hover:border-cyan-500/50 rounded-2xl overflow-hidden shadow-md flex flex-col justify-between group transition-all"
              >
                {/* Product Image & Top Badges */}
                <div className="relative h-44 bg-[#050b16] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Category Overlay Pill */}
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/80 backdrop-blur-xs text-cyan-300 text-[10px] font-black rounded-md uppercase tracking-wider border border-cyan-500/30">
                    {product.type}
                  </span>
                  {/* Star Rating Badge */}
                  <span className="absolute top-2 right-2 px-2 py-0.5 bg-black/80 backdrop-blur-xs text-amber-400 text-[10px] font-black rounded-md flex items-center gap-1 border border-amber-500/30">
                    <Star className="w-3 h-3 fill-amber-400" />
                    {product.rating}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Title */}
                    <h3 className="font-extrabold text-white text-sm tracking-tight leading-tight line-clamp-1 group-hover:text-cyan-300 transition-colors">
                      {product.name}
                    </h3>

                    {/* Company Tag */}
                    <p className="text-[11px] text-slate-400 font-semibold flex items-center gap-1 mt-0.5">
                      <Tag className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                      <span>{product.company}</span>
                    </p>

                    {/* Description */}
                    <p className="text-[10px] text-slate-400 line-clamp-2 mt-1 font-normal leading-relaxed">
                      {product.description}
                    </p>

                    {/* Star Rating Stars */}
                    <div className="flex items-center gap-1 mt-1.5 text-amber-400 text-xs">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-amber-400' : 'text-slate-600'}`}
                        />
                      ))}
                      <span className="text-[10px] text-slate-400 font-bold ml-1">{product.rating}</span>
                    </div>

                    {/* Stock Level Bar */}
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center justify-between text-[10px] font-bold text-slate-400">
                        <span>Stock</span>
                        <span className="text-cyan-300 font-black">{product.stockBags} bags</span>
                      </div>
                      <div className="w-full h-1 bg-[#162744] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-cyan-400 rounded-full"
                          style={{ width: `${Math.min(100, (product.stockBags / 500) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Price Row */}
                  <div className="pt-2 border-t border-slate-800/80">
                    <div className="text-base font-black text-cyan-400 tracking-tight">
                      ₹{product.subsidizedPrice.toLocaleString()} <span className="text-[10px] text-slate-400 font-normal">{product.priceUnit}</span>
                    </div>

                    {/* Quantity Selector Counter */}
                    <div className="mt-2 space-y-1">
                      <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">
                        QUANTITY (BAGS)
                      </span>
                      <div className="flex items-center bg-[#060d1b] border border-slate-800 rounded-xl p-1 justify-between">
                        <button
                          onClick={() => handleQuantityChange(product.id, -1)}
                          className="w-7 h-7 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-lg flex items-center justify-center transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-extrabold text-xs text-white">{qty}</span>
                        <button
                          onClick={() => handleQuantityChange(product.id, 1)}
                          className="w-7 h-7 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-lg flex items-center justify-center transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[10px] font-bold text-slate-400 pt-0.5">
                        Total: <span className="text-white font-extrabold">₹{totalPrice.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Action Buttons matching reference mockup */}
                    <div className="pt-2.5 space-y-1.5">
                      <div className="grid grid-cols-2 gap-1.5">
                        <button
                          onClick={() => handleAddToCart(product)}
                          className={
                            "py-1.5 px-2 rounded-xl text-[11px] font-extrabold transition-all flex items-center justify-center gap-1 " +
                            (isAdded
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                              : "bg-[#0f1e38] hover:bg-[#162c52] border border-[#213e6d] text-cyan-300")
                          }
                        >
                          {isAdded ? <Check className="w-3 h-3 text-emerald-400" /> : <ShoppingCart className="w-3 h-3" />}
                          <span>{isAdded ? 'Added' : 'Add to Cart'}</span>
                        </button>

                        <button
                          onClick={() => handleClaimSubsidy(product)}
                          className="py-1.5 px-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl text-[11px] font-black shadow-md transition-all active:scale-95 flex items-center justify-center"
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW 3: NEAREST FERTILIZERS OUTLETS & SHOPS (PRIVATE VS GOVERNMENT SECTOR COLUMNS) */}
      {activeTab === 'shops' && (
        <div className="space-y-4">
          <div className="p-4 bg-[#0a1426] border border-[#192b4a] rounded-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-white">
                  Nearest Fertilizer Outlets in Sangli & Miraj Agro-District
                </h3>
                <p className="text-xs text-slate-400">
                  Compare Licensed Private Agro-Dealers vs Authorized Government Subsidized Co-operative Points (PACS / IFFCO e-Bazar)
                </p>
              </div>
            </div>

            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold rounded-xl">
              📍 6 Outlets Located Near Your Farm Plot
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* COLUMN 1: PRIVATE SECTOR SHOPS */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></span>
                  <h3 className="text-base font-black text-white">
                    🏢 Private Licensed Fertilizer Dealers
                  </h3>
                </div>
                <span className="text-xs font-bold text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-0.5 rounded-lg">
                  Private Agro Centers
                </span>
              </div>

              {nearestFertilizerShops.privateSector.map((shop) => (
                <div
                  key={shop.id}
                  className="bg-[#091122] border border-[#162744] hover:border-cyan-500/40 rounded-2xl p-4 shadow-md space-y-3 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-extrabold text-sm text-white">{shop.name}</h4>
                      <p className="text-xs text-slate-400 font-medium">{shop.owner}</p>
                    </div>
                    <span className="px-2.5 py-1 bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-xs font-black rounded-xl">
                      {shop.distance}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 flex items-center gap-1.5 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                    <span>{shop.address}</span>
                  </p>

                  <div className="p-2.5 bg-[#060c18] border border-slate-800 rounded-xl space-y-1 text-xs">
                    <div className="flex items-center justify-between text-slate-300">
                      <span><strong>License No:</strong> {shop.licenseNo}</span>
                      <span className="text-emerald-400 font-bold">{shop.status}</span>
                    </div>
                    <p className="text-cyan-300 font-medium pt-1 border-t border-slate-800/80">
                      {shop.liveStock}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {shop.authorizedBrands.map((b, idx) => (
                      <span key={idx} className="text-[10px] font-semibold text-slate-300 bg-[#0c1628] border border-slate-700 px-2 py-0.5 rounded-md">
                        {b}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex items-center gap-2">
                    <a
                      href={`tel:${shop.phone}`}
                      className="flex-1 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" /> Call Dealer
                    </a>
                    <button
                      onClick={() => alert(`Opening GPS navigation to ${shop.name}`)}
                      className="px-3 py-2 bg-[#0e1c35] hover:bg-[#152a4e] border border-[#203c6e] text-slate-200 rounded-xl text-xs font-bold flex items-center gap-1"
                    >
                      <Navigation className="w-3.5 h-3.5 text-cyan-400" /> Route
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* COLUMN 2: GOVERNMENT SECTOR OUTLETS & PACS */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
                  <h3 className="text-base font-black text-white">
                    🏛️ Government Subsidized Outlets & PACS
                  </h3>
                </div>
                <span className="text-xs font-bold text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-lg">
                  Govt DBT Authorized
                </span>
              </div>

              {nearestFertilizerShops.governmentSector.map((shop) => (
                <div
                  key={shop.id}
                  className="bg-[#081524] border-2 border-emerald-500/30 hover:border-emerald-400/60 rounded-2xl p-4 shadow-md space-y-3 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-extrabold text-sm text-white flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        {shop.name}
                      </h4>
                      <p className="text-xs text-emerald-400 font-semibold">{shop.sector}</p>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-black rounded-xl">
                      {shop.distance}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 flex items-center gap-1.5 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>{shop.address}</span>
                  </p>

                  <div className="p-2.5 bg-[#040d18] border border-emerald-900/60 rounded-xl space-y-1 text-xs">
                    <div className="flex items-center justify-between text-slate-300">
                      <span><strong>Govt Node Code:</strong> {shop.govtCode}</span>
                      <span className="text-cyan-300 font-bold">{shop.subsidyMode}</span>
                    </div>
                    <p className="text-emerald-300 font-bold pt-1 border-t border-slate-800">
                      Official Quota: {shop.officialQuotaPrice}
                    </p>
                    <p className="text-slate-300 text-[11px]">
                      {shop.liveStock}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => handleClaimSubsidy({ name: shop.name, subsidizedPrice: 267 })}
                      className="flex-1 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Tag className="w-3.5 h-3.5" /> Pre-Book DBT Token
                    </button>
                    <button
                      onClick={() => alert(`Connecting to ${shop.name} Officer: ${shop.officerInCharge}`)}
                      className="px-3 py-2 bg-[#071f19] hover:bg-[#0c3127] border border-emerald-600/40 text-emerald-300 rounded-xl text-xs font-bold flex items-center gap-1"
                    >
                      <Phone className="w-3.5 h-3.5" /> Call Officer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
