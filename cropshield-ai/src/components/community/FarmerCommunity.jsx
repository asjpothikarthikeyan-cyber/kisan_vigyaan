import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  ShieldCheck, 
  MessageSquare, 
  ThumbsUp, 
  Share2, 
  PlusCircle, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  MapPin, 
  Radio, 
  Send, 
  Check, 
  Award, 
  Camera, 
  Calendar, 
  X,
  Clock,
  Heart,
  MessageCircle,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const FarmerCommunity = () => {
  const { 
    t, 
    lang, 
    role, 
    communityPosts, 
    addCommunityPost, 
    verifyCommunityPost, 
    addCommentToPost,
    farmerProfile, 
    officerProfile,
    selectedLeafImage,
    theme
  } = useApp();

  const isDark = theme === 'dark';

  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCrop, setNewCrop] = useState(farmerProfile?.crop || 'Tomato (Abhinav)');
  const [newTrapCount, setNewTrapCount] = useState('Pheromone: 4 moths | Yellow Sticky: 12 insects');
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'verified' | 'tomato' | 'traps'

  // Inline comment input state per post
  const [commentTexts, setCommentTexts] = useState({});

  // Officer review inline state
  const [reviewingPostId, setReviewingPostId] = useState(null);
  const [officialRemark, setOfficialRemark] = useState('');
  const [actionNotice, setActionNotice] = useState('Added to Sangli Hotspot Zone 1');

  // Likes state
  const [likedPosts, setLikedPosts] = useState({});

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    addCommunityPost({
      title: newTitle,
      content: newContent,
      crop: newCrop,
      trapCount: newTrapCount,
      image: selectedLeafImage || 'https://images.unsplash.com/photo-1592417817098-8f3d69104a49?w=900&auto=format&fit=crop&q=85'
    });

    setNewTitle('');
    setNewContent('');
    setShowNewPostModal(false);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
  };

  const handleOfficerVerify = (postId) => {
    if (!officialRemark.trim()) {
      alert("Please enter official agronomist remarks before verifying.");
      return;
    }
    verifyCommunityPost(postId, officialRemark, actionNotice);
    setReviewingPostId(null);
    setOfficialRemark('');
    confetti({ particleCount: 50, spread: 70, origin: { y: 0.7 } });
  };

  const handleAddComment = (postId) => {
    const text = commentTexts[postId];
    if (!text || !text.trim()) return;

    addCommentToPost(postId, text.trim());
    setCommentTexts(prev => ({ ...prev, [postId]: '' }));
  };

  const toggleLike = (postId) => {
    setLikedPosts(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const filteredPosts = (communityPosts || []).filter(post => {
    if (activeFilter === 'verified') return post.isOfficerVerified;
    if (activeFilter === 'tomato') return (post.crop || '').toLowerCase().includes('tomato');
    if (activeFilter === 'traps') return post.trapCount && post.trapCount.length > 0;
    return true;
  });

  return (
    <div className="space-y-6 pb-16 animate-fadeIn font-sans">
      
      {/* 1. TOP HEADER BANNER */}
      <div className={`p-6 rounded-3xl border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 ${
        isDark ? 'bg-[#091222] border-[#182a4a] text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1B5E20] to-[#15803d] text-white flex items-center justify-center shadow-md shrink-0">
            <Users className="w-6 h-6 text-emerald-200" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-xl font-black tracking-tight text-slate-900 dark:text-white">
                {lang === 'ta' ? 'விவசாயிகள் சமூகம் & வேளாண் அதிகாரி கேள்வி-பதில்' : lang === 'mr' ? 'शेतकरी मंच व कृषी अधिकारी थेट मार्गदर्शन' : 'Farmer Community Forum & Extension Officer Q&A'}
              </h1>
              <span className="hidden sm:inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                Live Network
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 font-medium">
              {lang === 'ta' ? 'உங்கள் பயிர் பிரச்சனைகளை பகிருங்கள், வேளாண் அதிகாரிகளிடம் இருந்து உடனடி அறிவியல் தீர்வு பெறுங்கள்' : lang === 'mr' ? 'शेतातील समस्या मांडा व कृषी तज्ज्ञांकडून थेट शासकीय उपाययोजना मिळवा' : 'Post field observations, pest alerts & receive official IPM validation from District Agri Officers'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowNewPostModal(true)}
          className="px-5 py-2.5 bg-[#1B5E20] hover:bg-[#154D1A] text-white rounded-2xl text-xs font-black shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer self-start md:self-auto active:scale-95"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{lang === 'ta' ? 'புதிய கேள்வியைப் பதிவிடுக' : lang === 'mr' ? 'नवीन समस्या पोस्ट करा' : 'Post Your Concern'}</span>
        </button>
      </div>

      {/* 2. FILTER PILLS */}
      <div className="flex flex-wrap items-center gap-2 pb-1">
        {[
          { id: 'all', label: lang === 'ta' ? 'அனைத்து விவாதங்கள்' : lang === 'mr' ? 'सर्व चर्चा' : 'All Discussions' },
          { id: 'verified', label: lang === 'ta' ? '✓ அதிகாரியால் சரிபார்க்கப்பட்டவை' : lang === 'mr' ? '✓ अधिकारी पडताळणी झालेले' : '✓ Officer Verified Only' },
          { id: 'tomato', label: lang === 'ta' ? '🍅 தக்காளி பயிர்கள்' : lang === 'mr' ? '🍅 टोमॅटो पीक' : '🍅 Tomato Crops' },
          { id: 'traps', label: lang === 'ta' ? '🪤 பூச்சி பொறி எச்சரிக்கைகள்' : lang === 'mr' ? '🪤 सापळे नोंदी' : '🪤 Pest Trap Counts' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id)}
            className={`px-4 py-2 rounded-2xl text-xs font-black whitespace-nowrap transition-all cursor-pointer active:scale-95 ${
              activeFilter === tab.id
                ? 'bg-emerald-600 text-white shadow-sm'
                : isDark
                ? 'bg-[#0a1324] border border-[#182a4a] text-slate-300 hover:text-white'
                : 'bg-white border border-slate-200 text-slate-700 hover:text-emerald-700 shadow-2xs'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 3. POSTS FEED */}
      <div className="space-y-5 max-w-4xl mx-auto">
        {filteredPosts.map((post) => {
          const isLiked = likedPosts[post.id];
          const totalLikes = (post.likes || 0) + (isLiked ? 1 : 0);

          return (
            <div 
              key={post.id} 
              className={`rounded-3xl border shadow-sm transition-all overflow-hidden ${
                post.isOfficerVerified
                  ? isDark 
                    ? 'bg-[#0a1324] border-emerald-500/40 ring-1 ring-emerald-500/30' 
                    : 'bg-white border-emerald-300 ring-1 ring-emerald-200'
                  : isDark
                  ? 'bg-[#0a1324] border-[#182a4a] text-white'
                  : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              {/* Author Strip */}
              <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-11 h-11 rounded-2xl overflow-hidden border-2 border-emerald-500 shadow-xs flex-shrink-0 bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-900 dark:text-emerald-200 font-black text-sm">
                    {post.author ? post.author.slice(0, 2).toUpperCase() : '👨‍🌾'}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-black text-sm text-slate-900 dark:text-white">{post.author}</h3>
                      <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold px-2 py-0.5 rounded-md">
                        {post.role}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-emerald-600 inline" />
                      {post.location} • {post.timeAgo}
                    </p>
                  </div>
                </div>

                {post.isOfficerVerified && (
                  <div className="flex items-center space-x-1.5 px-3 py-1 bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 rounded-xl text-[11px] font-black shadow-xs">
                    <Award className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Officer Verified</span>
                  </div>
                )}
              </div>

              {/* Post Body */}
              <div className="p-5 space-y-3.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-black text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2.5 py-0.5 rounded-lg">
                    {post.crop}
                  </span>
                  {post.trapCount && (
                    <span className="text-[11px] font-bold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 px-2.5 py-0.5 rounded-lg flex items-center gap-1">
                      <Radio className="w-3 h-3 text-amber-600" />
                      {post.trapCount}
                    </span>
                  )}
                </div>

                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-snug">
                  {post.title}
                </h2>

                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  {post.content}
                </p>

                {/* Attached Image */}
                {post.image && (
                  <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 max-h-72 bg-slate-950 flex items-center justify-center">
                    <img src={post.image} alt="Crop Leaf Condition" className="w-full h-full object-cover" />
                  </div>
                )}

                {/* Officer Endorsement & Verification Box */}
                {post.isOfficerVerified && post.officerReview && (
                  <div className="p-4 bg-gradient-to-br from-emerald-50 via-teal-50/50 to-green-50 dark:from-emerald-950/40 dark:via-teal-950/30 dark:to-slate-950 border-2 border-emerald-300 dark:border-emerald-800 rounded-2xl shadow-xs space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-8 h-8 rounded-full overflow-hidden border border-emerald-600 flex-shrink-0">
                          <img 
                            src={post.officerReview.officerAvatar || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&auto=format&fit=crop&q=80'} 
                            alt={post.officerReview.officerName} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <div>
                          <h4 className="text-xs font-black text-emerald-950 dark:text-emerald-300 flex items-center gap-1.5">
                            <span>{post.officerReview.officerName}</span>
                            <span className="text-[9px] bg-emerald-600 text-white font-bold px-1.5 py-0.2 rounded-full">Official</span>
                          </h4>
                          <p className="text-[10px] text-emerald-800 dark:text-emerald-400 font-medium">{post.officerReview.designation}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-white/90 dark:bg-slate-900 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                        {post.officerReview.date}
                      </span>
                    </div>

                    <div className="p-3 bg-white/90 dark:bg-slate-900/80 rounded-xl border border-emerald-200/80 dark:border-emerald-800 text-xs text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                      <strong>Official Recommendation:</strong> {post.officerReview.comment}
                    </div>

                    {post.officerReview.actionTaken && (
                      <div className="text-[11px] font-bold text-emerald-800 dark:text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Action Recorded: {post.officerReview.actionTaken}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Officer Quick Verification Button (for unverified posts) */}
                {!post.isOfficerVerified && (
                  <div className="pt-2">
                    {reviewingPostId === post.id ? (
                      <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-400 rounded-2xl space-y-3">
                        <h4 className="text-xs font-black text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-emerald-700" />
                          Agricultural Officer Field Validation Form
                        </h4>

                        <textarea
                          rows="3"
                          value={officialRemark}
                          onChange={(e) => setOfficialRemark(e.target.value)}
                          placeholder="e.g. Confirmed Early Blight. Recommend Neem Oil 3ml/L alternated with Mancozeb 2g/L. Collect subsidized bio-formulations from Panchayat center."
                          className="w-full p-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500"
                        />

                        <select
                          value={actionNotice}
                          onChange={(e) => setActionNotice(e.target.value)}
                          className="w-full p-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-bold"
                        >
                          <option value="Added to Sangli Hotspot Zone 1 (High Risk)">Add to Sangli Hotspot Map (High Risk)</option>
                          <option value="Scheduled Field Sample Collection by Taluka Krishi Sahayak">Schedule Field Sample Collection</option>
                          <option value="Approved 100% Bio-Pesticide Subsidy Coupon">Approve 100% Bio-Pesticide Subsidy Coupon</option>
                          <option value="Broadcasted Advisory to 450 Nearby Farmers">Broadcast Advisory to 450 Nearby Farmers</option>
                        </select>

                        <div className="flex gap-2">
                          <button
                            onClick={() => handleOfficerVerify(post.id)}
                            className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
                          >
                            Submit Official Verification
                          </button>
                          <button
                            onClick={() => setReviewingPostId(null)}
                            className="px-4 py-2.5 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setReviewingPostId(post.id);
                          setOfficialRemark(`Confirmed symptoms for ${post.crop}. Follow Integrated Pest Management (IPM) guidelines.`);
                        }}
                        className="w-full py-2.5 px-3 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        <span>Review as Agriculture Officer & Validate</span>
                      </button>
                    )}
                  </div>
                )}

                {/* Like & Comments Action Strip */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className={`flex items-center gap-1.5 font-bold cursor-pointer transition-colors ${
                      isLiked ? 'text-rose-600' : 'hover:text-emerald-700 dark:hover:text-emerald-400'
                    }`}
                  >
                    <ThumbsUp className={`w-4 h-4 ${isLiked ? 'fill-rose-600 text-rose-600' : ''}`} />
                    <span>{totalLikes} Upvotes</span>
                  </button>

                  <span className="flex items-center gap-1.5 font-bold">
                    <MessageSquare className="w-4 h-4" />
                    <span>{post.comments?.length || 0} Replies</span>
                  </span>
                </div>

                {/* Existing Comments List */}
                {post.comments && post.comments.length > 0 && (
                  <div className="space-y-2 pt-2">
                    {post.comments.map(c => (
                      <div key={c.id} className="p-3 bg-slate-50 dark:bg-slate-900/70 rounded-2xl border border-slate-200/70 dark:border-slate-800 text-xs space-y-1">
                        <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200">
                          <div className="flex items-center space-x-2">
                            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">
                              {c.author.slice(0, 1)}
                            </span>
                            <span>{c.author} <span className="text-[10px] text-slate-400 font-normal">({c.role})</span></span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-normal">{c.time}</span>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 font-medium pl-7">{c.text}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add Comment Input */}
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="text"
                    placeholder={lang === 'ta' ? 'உங்கள் பதிலை எழுதவும்...' : lang === 'mr' ? 'तुमचा सल्ला किंवा प्रश्न लिहा...' : 'Write an answer or comment...'}
                    value={commentTexts[post.id] || ''}
                    onChange={(e) => setCommentTexts(prev => ({ ...prev, [post.id]: e.target.value }))}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAddComment(post.id);
                    }}
                    className={`flex-1 p-2.5 rounded-xl border text-xs font-medium focus:outline-none focus:border-emerald-500 ${
                      isDark ? 'bg-[#0a1324] border-slate-800 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 shadow-2xs'
                    }`}
                  />
                  <button
                    onClick={() => handleAddComment(post.id)}
                    className="p-2.5 bg-[#1B5E20] hover:bg-[#154D1A] text-white rounded-xl shadow-xs cursor-pointer transition-transform active:scale-95"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* 4. NEW POST MODAL */}
      {showNewPostModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className={`rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 space-y-4 shadow-2xl border ${
            isDark ? 'bg-[#0a1324] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-black flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-600" />
                <span>{lang === 'ta' ? 'சமூகத்தில் புதிய கேள்வியைப் பதிவிடுக' : lang === 'mr' ? 'शेतकरी मंचावर नवीन पोस्ट करा' : 'Post to Community & Extension Officer'}</span>
              </h3>
              <button 
                onClick={() => setShowNewPostModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-3.5 text-xs font-medium">
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-300">
                <strong>Posting as:</strong> {farmerProfile?.name} • {farmerProfile?.location || 'Sangli'}
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Issue Title / Observation Summary</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Yellow concentric rings spotted on lower tomato leaves"
                  className={`w-full p-3 rounded-xl border font-bold focus:outline-none focus:border-emerald-500 ${
                    isDark ? 'bg-[#0f1d38] border-[#203254] text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Crop & Variety</label>
                <input
                  type="text"
                  required
                  value={newCrop}
                  onChange={(e) => setNewCrop(e.target.value)}
                  className={`w-full p-3 rounded-xl border font-bold focus:outline-none focus:border-emerald-500 ${
                    isDark ? 'bg-[#0f1d38] border-[#203254] text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Detailed Field Observations & Question for Officer</label>
                <textarea
                  rows="4"
                  required
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Describe crop acreage, soil wetness, when symptoms started, and what guidance you need from the Agriculture Officer..."
                  className={`w-full p-3 rounded-xl border font-medium focus:outline-none focus:border-emerald-500 ${
                    isDark ? 'bg-[#0f1d38] border-[#203254] text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Pest Trap / Sensor Count (Optional)</label>
                <input
                  type="text"
                  value={newTrapCount}
                  onChange={(e) => setNewTrapCount(e.target.value)}
                  className={`w-full p-3 rounded-xl border font-medium focus:outline-none focus:border-emerald-500 ${
                    isDark ? 'bg-[#0f1d38] border-[#203254] text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3.5 bg-[#1B5E20] hover:bg-[#154D1A] text-white font-black text-xs rounded-xl shadow-md transition-colors cursor-pointer"
                >
                  Publish Post to Community Hub
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewPostModal(false)}
                  className="px-4 py-3.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
