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
  Layers,
  Camera,
  Calendar,
  X
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
    farmerProfile, 
    officerProfile,
    selectedLeafImage,
    currentDiagnosis,
    setActiveTab
  } = useApp();

  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newTrapCount, setNewTrapCount] = useState('Pheromone: 4 moths | Yellow Sticky: 12 insects');
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'verified' | 'tomato' | 'traps'

  // Officer review inline state
  const [reviewingPostId, setReviewingPostId] = useState(null);
  const [officialRemark, setOfficialRemark] = useState('');
  const [actionNotice, setActionNotice] = useState('Added to Sangli Hotspot Zone 1');

  // Comment input state
  const [commentInputs, setCommentInputs] = useState({});

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;

    addCommunityPost({
      title: newTitle,
      content: newContent,
      trapCount: newTrapCount,
      image: selectedLeafImage
    });

    setNewTitle('');
    setNewContent('');
    setShowNewPostModal(false);
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.8 } });
  };

  const handleOfficerVerify = (postId) => {
    if (!officialRemark) {
      alert("Please enter official agronomist remarks before verifying.");
      return;
    }
    verifyCommunityPost(postId, officialRemark, actionNotice);
    setReviewingPostId(null);
    setOfficialRemark('');
    confetti({ particleCount: 50, spread: 70, origin: { y: 0.7 } });
  };

  const filteredPosts = communityPosts.filter(post => {
    if (activeFilter === 'verified') return post.isOfficerVerified;
    if (activeFilter === 'tomato') return post.crop.toLowerCase().includes('tomato');
    if (activeFilter === 'traps') return post.trapCount && post.trapCount.length > 0;
    return true;
  });

  return (
    <div className="flex flex-col min-h-full bg-slate-100 pb-20 select-none">
      {/* Header Banner */}
      <div className="px-4 py-4 bg-[#165a3c] text-white shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-emerald-500/20 border border-emerald-400/40 rounded-2xl">
              <Users className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">{t('community')} & Field Surveillance</h1>
              <p className="text-xs text-emerald-200/90 font-medium">Sangli District Farmer & Extension Officer Network</p>
            </div>
          </div>

          <button
            onClick={() => setShowNewPostModal(true)}
            className="px-3.5 py-2 bg-white hover:bg-emerald-50 text-emerald-900 rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5 transition-transform active:scale-95"
          >
            <PlusCircle className="w-4 h-4 text-emerald-700" />
            <span>New Post</span>
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1 text-xs">
          {[
            { id: 'all', label: 'All Discussions' },
            { id: 'verified', label: '✓ Officer Verified Only' },
            { id: 'tomato', label: '🍅 Tomato Crops' },
            { id: 'traps', label: '🪤 Pest Trap Counts' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                activeFilter === tab.id
                  ? 'bg-emerald-950 text-white shadow-xs'
                  : 'bg-emerald-800/60 text-emerald-200 hover:bg-emerald-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Feed */}
      <div className="max-w-3xl mx-auto w-full px-3 sm:px-4 py-4 space-y-4">
        {/* Officer Role Helper Bar */}
        {role === 'officer' && (
          <div className="p-3.5 bg-emerald-900 text-white rounded-2xl shadow-sm border border-emerald-700 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-emerald-300" />
              <div>
                <strong>Officer Mode Active:</strong> You can review and officially endorse farmer field data below.
              </div>
            </div>
          </div>
        )}

        {/* Posts List */}
        {filteredPosts.map((post) => (
          <div 
            key={post.id} 
            className={`bg-white rounded-2xl border shadow-sm transition-all overflow-hidden ${
              post.isOfficerVerified ? 'border-emerald-300/80 ring-1 ring-emerald-200' : 'border-gray-200'
            }`}
          >
            {/* Post Author Header */}
            <div className="p-4 border-b border-gray-100 flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-emerald-500 shadow-xs flex-shrink-0 bg-emerald-100">
                  {post.avatar && post.avatar.startsWith('http') ? (
                    <img src={post.avatar} alt={post.author} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-black text-emerald-900 text-sm">
                      {post.author ? post.author.slice(0, 2).toUpperCase() : '👨‍🌾'}
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-extrabold text-sm text-gray-900">{post.author}</h3>
                    <span className="text-[10px] bg-slate-100 text-gray-600 font-semibold px-2 py-0.5 rounded-md">
                      {post.role}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 font-medium flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-emerald-600 inline" />
                    {post.location} • {post.timeAgo}
                  </p>
                </div>
              </div>

              {/* Verified Ribbon */}
              {post.isOfficerVerified && (
                <div className="flex items-center space-x-1 px-2.5 py-1 bg-emerald-100/90 text-emerald-900 border border-emerald-300 rounded-xl text-[11px] font-bold shadow-xs">
                  <Award className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Officer Verified</span>
                </div>
              )}
            </div>

            {/* Post Content */}
            <div className="p-4 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-lg">
                  {post.crop}
                </span>
                {post.trapCount && (
                  <span className="text-[11px] font-medium text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-lg flex items-center gap-1">
                    <Radio className="w-3 h-3 text-amber-600" />
                    {post.trapCount}
                  </span>
                )}
              </div>

              <h2 className="text-base font-extrabold text-gray-900 leading-snug">
                {post.title}
              </h2>

              <p className="text-xs text-gray-700 leading-relaxed font-normal">
                {post.content}
              </p>

              {/* Attached Leaf / Symptom Image */}
              {post.image && (
                <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-xs max-h-64 bg-black flex items-center justify-center">
                  <img src={post.image} alt="Crop Leaf Condition" className="w-full h-full object-contain" />
                  <div className="absolute bottom-2 left-2 px-2.5 py-1 bg-black/70 backdrop-blur-xs text-white text-[10px] font-semibold rounded-lg">
                    Leaf Diagnostic Snapshot
                  </div>
                </div>
              )}

              {/* Official Officer Review Card (Key Requirement!) */}
              {post.isOfficerVerified && post.officerReview && (
                <div className="mt-3 p-4 bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 border-2 border-emerald-300 rounded-2xl shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-8 h-8 rounded-full overflow-hidden border border-emerald-600 flex-shrink-0 shadow-xs">
                        <img 
                          src={post.officerReview.officerAvatar || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&auto=format&fit=crop&q=80'} 
                          alt={post.officerReview.officerName} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div>
                        <h4 className="text-xs font-extrabold text-emerald-950 flex items-center gap-1">
                          {post.officerReview.officerName}
                          <span className="text-[9px] bg-emerald-600 text-white font-bold px-1.5 py-0.2 rounded-full">Official</span>
                        </h4>
                        <p className="text-[10px] text-emerald-800 font-medium">{post.officerReview.designation}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-white/90 px-2 py-0.5 rounded border border-emerald-200">
                      {post.officerReview.date}
                    </span>
                  </div>

                  <div className="p-2.5 bg-white/90 rounded-xl border border-emerald-200/80 text-xs text-emerald-950 font-medium leading-relaxed">
                    <strong>Official Recommendation:</strong> {post.officerReview.comment}
                  </div>

                  {post.officerReview.actionTaken && (
                    <div className="text-[11px] font-bold text-emerald-800 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Action Taken: {post.officerReview.actionTaken}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Action Button for Officers to Validate unverified posts */}
              {!post.isOfficerVerified && (
                <div className="pt-2">
                  {reviewingPostId === post.id ? (
                    <div className="p-4 bg-emerald-50 border-2 border-emerald-400 rounded-2xl space-y-3">
                      <h4 className="text-xs font-extrabold text-emerald-900 flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-700" />
                        Agricultural Officer Field Validation Form
                      </h4>

                      <div>
                        <label className="text-[11px] font-bold text-gray-700 block mb-1">
                          Official Scientific Recommendations & Pesticide/Bio-Agent Advice:
                        </label>
                        <textarea
                          rows="3"
                          value={officialRemark}
                          onChange={(e) => setOfficialRemark(e.target.value)}
                          placeholder="e.g. Confirmed Early Blight. Recommend Neem Oil 3ml/L alternated with Mancozeb 2g/L. Collect subsidized bio-formulations from Panchayat center."
                          className="w-full p-2 bg-white border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-gray-700 block mb-1">Surveillance Action:</label>
                        <select
                          value={actionNotice}
                          onChange={(e) => setActionNotice(e.target.value)}
                          className="w-full p-2 bg-white border border-gray-300 rounded-xl text-xs font-semibold"
                        >
                          <option value="Added to Sangli Hotspot Zone 1 (High Risk)">Add to Sangli Hotspot Map (High Risk)</option>
                          <option value="Scheduled Field Sample Collection by Taluka Krishi Sahayak">Schedule Field Sample Collection</option>
                          <option value="Approved 100% Bio-Pesticide Subsidy Coupon">Approve 100% Bio-Pesticide Subsidy Coupon</option>
                          <option value="Broadcasted Advisory to 450 Nearby Tomato Farmers">Broadcast Advisory to 450 Nearby Tomato Farmers</option>
                        </select>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleOfficerVerify(post.id)}
                          className="flex-1 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-sm flex items-center justify-center gap-1"
                        >
                          <Check className="w-4 h-4" /> Submit Official Verification
                        </button>
                        <button
                          onClick={() => setReviewingPostId(null)}
                          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-bold rounded-xl"
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
                      className="w-full py-2.5 px-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-700" />
                      <span>Review as Agriculture Officer & Verify Post</span>
                    </button>
                  )}
                </div>
              )}

              {/* Farmer Discussion Comments */}
              <div className="pt-2 border-t border-gray-100 space-y-2">
                <div className="flex items-center justify-between text-xs text-gray-500 font-semibold">
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5" />
                    Farmer Comments ({post.comments?.length || 0})
                  </span>
                  <span className="flex items-center gap-1 text-emerald-700">
                    <ThumbsUp className="w-3.5 h-3.5" /> {post.likes || 5} Upvotes
                  </span>
                </div>

                {post.comments && post.comments.map(c => (
                  <div key={c.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-xs space-y-1.5">
                    <div className="flex items-center justify-between font-bold text-gray-800">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 rounded-full overflow-hidden border border-emerald-500 flex-shrink-0 bg-emerald-100">
                          {c.avatar ? (
                            <img src={c.avatar} alt={c.author} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center font-bold text-[10px] text-emerald-900">
                              {c.author.slice(0, 1)}
                            </div>
                          )}
                        </div>
                        <span>{c.author} <span className="text-[10px] text-gray-500 font-normal">({c.role})</span></span>
                      </div>
                      <span className="text-[10px] text-gray-400 font-normal">{c.time}</span>
                    </div>
                    <p className="text-gray-700 font-medium pl-8">{c.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Post Modal */}
      {showNewPostModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-5 space-y-4 shadow-2xl border border-emerald-100">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-700" />
                Post to Farmer Community Hub
              </h3>
              <button 
                onClick={() => setShowNewPostModal(false)}
                className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-3 text-xs">
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950 font-medium">
                <strong>Posting as:</strong> {farmerProfile.name} • {farmerProfile.location} • {farmerProfile.crop} ({farmerProfile.growthStage})
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Issue Title / Observation Summary</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Yellow spots expanding on lower tomato leaves after light rain"
                  className="w-full p-2.5 bg-slate-50 border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Detailed Field Description & Questions for Officer</label>
                <textarea
                  rows="4"
                  required
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Describe acreage, soil wetness, when symptoms started, and what guidance you need from the Agriculture Extension Officer..."
                  className="w-full p-2.5 bg-slate-50 border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Pest Trap / Sensor Count (Optional)</label>
                <input
                  type="text"
                  value={newTrapCount}
                  onChange={(e) => setNewTrapCount(e.target.value)}
                  placeholder="e.g. Pheromone Trap: 5 moths | Sticky Trap: 14 insects"
                  className="w-full p-2.5 bg-slate-50 border border-gray-200 rounded-xl font-medium"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#165a3c] hover:bg-[#124930] text-white font-bold text-xs rounded-xl shadow-md transition-colors"
                >
                  Publish Post for Community & Officer Review
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewPostModal(false)}
                  className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl"
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
