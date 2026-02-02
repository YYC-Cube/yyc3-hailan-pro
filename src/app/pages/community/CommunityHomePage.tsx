import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Navbar } from '@/app/components/layout/Navbar';
import { Footer } from '@/app/components/layout/Footer';
import { BottomNav } from '@/app/components/layout/BottomNav';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp,
  Users,
  BookOpen,
  Heart,
  MessageSquare,
  PlusCircle,
  Award,
  Eye,
  ShieldCheck,
  Activity,
  CheckCircle2,
  ArrowRight,
  Filter,
  Search,
  Lock,
  Loader2,
  FileSearch,
  Share2,
  EyeOff,
  Coins,
  History,
  LayoutDashboard,
  X
} from 'lucide-react';
import { cn } from '@/app/components/design-system/utils';
import { GlassCard } from '@/app/components/design-system/GlassCard';
import { Button } from '@/app/components/design-system/Button';
import { apiClient } from '@/services/api.client';
import { toast } from 'sonner';

interface Post {
  id: string;
  title: string;
  excerpt: string;
  category: 'knowledge' | 'experience' | 'wellness' | 'zk-trend';
  author: {
    name: string;
    isExpert: boolean;
    isZKVerified?: boolean;
    avatar: string;
  };
  stats: {
    views: number;
    likes: number;
    comments: number;
  };
  tags: string[];
  publishedAt: string;
  featured?: boolean;
}

export function CommunityHomePage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [verifyingCid, setVerifyingCid] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [badgeInfo, setBadgeInfo] = useState<{name: string, color: string} | null>(null);
  const [receipts, setReceipts] = useState<any[]>([]);
  const [isSharing, setIsSharing] = useState(false);
  const [shareStep, setShareStep] = useState<string | null>(null);
  const [isModerating, setIsModerating] = useState(false);
  const [moderationStatus, setModerationStatus] = useState<string | null>(null);
  const [governanceReward, setGovernanceReward] = useState<number | null>(null);
  const [guardianStats, setGuardianStats] = useState<any>(null);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [weeklyReport, setWeeklyReport] = useState<any>(null);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showWeeklyReport, setShowWeeklyReport] = useState(false);
  const [showCoins, setShowCoins] = useState(false);
  const [isReporting, setIsReporting] = useState(false);
  const [userScore, setUserScore] = useState<number | null>(null);

  const handleVerifyCid = async () => {
    if (!verifyingCid) return;
    setIsVerifying(true);
    setVerificationResult(null);
    setUserScore(null);
    try {
      const response: any = await apiClient.get(`/ipfs/get?cid=${verifyingCid}`);
      if (response && response.data) {
        setVerificationResult(response.data.metadata);
        setBadgeInfo(response.data.badge);
        setReceipts(response.data.receipts || []);
        toast.success("证明验证成功：真实有效");
      } else {
        toast.error("未找到相关证明或证明已失效");
      }
    } catch (error) {
      console.error("Verification failed:", error);
      toast.error("验证服务暂时不可用");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleReport = () => {
    setIsReporting(true);
    setTimeout(() => {
      setIsReporting(false);
      toast.info("举报已受理，核查委员会将在 24 小时内介入。");
    }, 1000);
  };

  const handleScore = async (score: number) => {
    if (!verifyingCid) return;
    try {
      await apiClient.post('/ipfs/reputation', { cid: verifyingCid, score });
      setUserScore(score);
      toast.success(`评分成功：信誉积分已同步至 DID 档案`);
    } catch (error) {
      toast.error("积分同步失败");
    }
  };

  const handleForwardToDoctor = async () => {
    if (!verifyingCid) return;
    setIsSharing(true);
    try {
      // 1. Forward simulation with progressive feedback
      setShareStep("建立加密隧道...");
      await new Promise(r => setTimeout(r, 800));
      
      setShareStep("医生正在审阅报告...");
      await new Promise(r => setTimeout(r, 1200));
      
      setShareStep("医生数字签名中...");
      await new Promise(r => setTimeout(r, 1000));
      
      // 2. Mock Multi-sig receipt from doctor
      const receiptResp: any = await apiClient.post('/ipfs/receipt', {
        cid: verifyingCid,
        doctorId: "DR_HAI_LAN_001",
        doctorName: "Dr. Elena Vance"
      });
      
      if (receiptResp.success) {
        setReceipts(prev => [...prev, receiptResp.receipt]);
        toast.success("专业医疗协作闭环：回执已安全归档");
      }
    } catch (error) {
      toast.error("转发流程中断");
    } finally {
      setIsSharing(false);
      setShareStep(null);
    }
  };

  const handleModerate = async (action: 'VALIDATE' | 'FLAG_FALSE') => {
    if (!verifyingCid) return;
    setIsModerating(true);
    try {
      const resp: any = await apiClient.post('/ipfs/moderate', {
        cid: verifyingCid,
        action,
        moderatorId: "GUARDIAN_USER_ANON"
      });
      if (resp.success) {
        // Refresh everything
        await fetchGuardianData();
        
        setModerationStatus(resp.status);
        setGovernanceReward(resp.reward);

        // Trigger coin animation
        setShowCoins(true);
        setTimeout(() => setShowCoins(false), 3000);

        toast.success(action === 'VALIDATE' ? `已应用治理决策。奖励 +${resp.reward} 权重` : `已提交复核申请。奖励 +${resp.reward} 权重`);
        
        // Refresh verification result to reflect status change
        setVerificationResult((prev: any) => prev ? { ...prev, moderationStatus: resp.status } : null);
      }
    } catch (error) {
      toast.error("管理操作执行失败");
    } finally {
      setIsModerating(false);
    }
  };

  const fetchGuardianData = async () => {
    try {
      const [statsResp, lbResp, weeklyResp]: any = await Promise.all([
        apiClient.get('/guardian/stats?moderatorId=GUARDIAN_USER_ANON'),
        apiClient.get('/guardian/leaderboard'),
        apiClient.get('/guardian/weekly-report?moderatorId=GUARDIAN_USER_ANON')
      ]);
      
      if (statsResp.success) {
        setGuardianStats(statsResp.stats);
      }
      if (lbResp.success) {
        setLeaderboard(lbResp.leaderboard);
      }
      if (weeklyResp.success) {
        setWeeklyReport(weeklyResp.report);
      }
    } catch (error) {
      console.error("Failed to fetch guardian data");
    }
  };

  React.useEffect(() => {
    if (badgeInfo?.name === "Privacy Guardian") {
      fetchGuardianData();
    }
  }, [badgeInfo]);

  const categories = [
    { id: 'all', label: '全部', icon: Filter },
    { id: 'zk-trend', label: 'ZK 趋势', icon: Activity },
    { id: 'knowledge', label: '知识科普', icon: BookOpen },
    { id: 'experience', label: '使用经验', icon: Users },
    { id: 'wellness', label: '健康生活', icon: Heart }
  ];

  const posts: Post[] = [
    {
      id: 'zk-1',
      title: '基于 ZK-Proof 的压力波动趋势分享：25-35岁女性',
      excerpt: '通过零知识证明验证，本趋势图基于 1,240 位用户的真实 HRV 数据生成。数据显示，每周三晚间的整体压力值有显著上升，建议加强晚间冥想场景联动。',
      category: 'zk-trend',
      author: {
        name: '系统自动生成 (ZK-Verified)',
        isExpert: false,
        isZKVerified: true,
        avatar: ''
      },
      stats: {
        views: 24500,
        likes: 1240,
        comments: 56
      },
      tags: ['大数据', '零知识证明', '压力分析'],
      publishedAt: '2026-01-27',
      featured: true
    },
    {
      id: '1',
      title: '新手选购指南：如何选择第一件产品',
      excerpt: '作为初学者，选择合适的产品非常重要。本文将从材质、功能、价格等多个维度为您详细分析...',
      category: 'knowledge',
      author: {
        name: '健康顾问 李医生',
        isExpert: true,
        avatar: ''
      },
      stats: {
        views: 12580,
        likes: 856,
        comments: 127
      },
      tags: ['新手入门', '选购指南', '产品推荐'],
      publishedAt: '2026-01-25',
      featured: true
    },
    {
      id: 'zk-2',
      title: '匿名用户分享：使用“深度减压”场景 30 天后的数据反馈',
      excerpt: '我已验证我的 NAS 数据，结果显示我的平均静息心率下降了 8%。这是通过 ZK-Proof 匿名提交的验证报告。',
      category: 'zk-trend',
      author: {
        name: '匿名用户 (Verified)',
        isExpert: false,
        isZKVerified: true,
        avatar: ''
      },
      stats: {
        views: 8900,
        likes: 670,
        comments: 34
      },
      tags: ['实测反馈', '隐私保护', '自动化场景'],
      publishedAt: '2026-01-26'
    }
  ];

  const filteredPosts = selectedCategory === 'all'
    ? posts
    : posts.filter(post => post.category === selectedCategory);

  const handleCreatePost = () => {
    navigate('/community/create');
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] pb-32 relative overflow-hidden">
      <Navbar />

      {/* Gold Coin Animation Layer */}
      <AnimatePresence>
        {showCoins && (
          <div className="fixed inset-0 pointer-events-none z-[100] flex items-center justify-center">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 0, scale: 0, x: 0 }}
                animate={{ 
                  opacity: [0, 1, 1, 0], 
                  y: [0, -300 - Math.random() * 200],
                  x: [(Math.random() - 0.5) * 400],
                  scale: [0.5, 1.2, 1, 0.8],
                  rotate: [0, 360 * 2]
                }}
                transition={{ duration: 2, ease: "easeOut", delay: Math.random() * 0.5 }}
                className="absolute"
              >
                <div className="w-8 h-8 bg-gradient-to-tr from-amber-500 to-yellow-300 rounded-full border-2 border-amber-200 shadow-lg flex items-center justify-center">
                   <Coins className="w-4 h-4 text-white" />
                </div>
              </motion.div>
            ))}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white/90 backdrop-blur-xl px-8 py-4 rounded-[2rem] border border-brand-gold shadow-2xl shadow-brand-gold/20 flex items-center gap-4"
            >
               <div className="w-12 h-12 bg-brand-gold rounded-2xl flex items-center justify-center text-white">
                  <Award className="w-6 h-6" />
               </div>
               <div>
                  <p className="text-[10px] font-black text-brand-gold uppercase tracking-[0.2em]">治理奖励发放</p>
                  <p className="text-xl font-black text-brand-navy">+{governanceReward} 激励权重</p>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-12">
        <div className="bg-brand-hailan-blue rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden shadow-2xl shadow-brand-hailan-blue/20">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-navy/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
          
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full backdrop-blur-md text-[10px] font-black uppercase tracking-widest border border-white/10">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Zero-Knowledge Verified Community
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight text-white">
                隐私，是交流的<br />
                <span className="text-brand-gold">第一优先级。</span>
              </h1>
              <p className="text-white/80 text-lg leading-relaxed max-w-md">
                基于 ZK-Proof 技术，我们允许您在不暴露任何身份信息的前提下，分享真实的健康趋势与设备心得。
              </p>
              <div className="flex gap-4">
                <Button 
                  onClick={handleCreatePost} 
                  className="bg-white text-brand-hailan-blue hover:bg-neutral-100 rounded-2xl h-14 px-8 font-bold shadow-lg"
                >
                  <PlusCircle className="w-5 h-5 mr-2" /> 发布匿名分享
                </Button>
                <Button 
                  variant="outline" 
                  className="text-white border-white/20 hover:bg-white/10 rounded-2xl h-14 px-8 font-bold"
                >
                  了解 ZK 验证
                </Button>
              </div>
            </div>

            <div className="hidden md:block">
               <div className="bg-white/10 backdrop-blur-2xl rounded-[2.5rem] border border-white/20 p-8 space-y-6">
                  <div className="flex items-center justify-between mb-4">
                     <h3 className="text-sm font-black uppercase tracking-widest text-white/60">实时网络趋势</h3>
                     <Activity className="w-4 h-4 text-emerald-400" />
                  </div>
                  {[
                    { label: "全网平均压力值", val: "42", trend: "down" },
                    { label: "热门自动化场景", val: "深度减压", trend: "up" },
                    { label: "匿名验证数据量", val: "1.2M", trend: "up" }
                  ].map((stat, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
                       <span className="text-xs font-bold text-white/80">{stat.label}</span>
                       <div className="flex items-center gap-2">
                          <span className="text-sm font-black text-white">{stat.val}</span>
                          <TrendingUp className={cn("w-3 h-3", stat.trend === 'up' ? "text-emerald-400" : "text-rose-400")} />
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                "px-6 py-3 rounded-2xl text-sm font-black transition-all border whitespace-nowrap flex items-center gap-2",
                selectedCategory === cat.id
                  ? "bg-brand-hailan-blue text-white border-brand-hailan-blue shadow-lg shadow-brand-hailan-blue/20"
                  : "bg-white text-neutral-400 border-neutral-100 hover:border-brand-hailan-blue/20 hover:text-brand-hailan-blue"
              )}
            >
              <cat.icon className="w-4 h-4" />
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
           <div className="lg:col-span-8 space-y-8">
              {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} onClick={() => navigate(`/community/post/${post.id}`)} />
              ))}
           </div>

           <div className="lg:col-span-4 space-y-8">
              <GlassCard className="p-8 border-brand-hailan-blue/20 bg-brand-navy/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                   <Lock className="w-12 h-12 text-brand-hailan-blue" />
                </div>
                <h3 className="text-lg font-black mb-2 text-brand-hailan-blue uppercase tracking-tight italic">ZK-Proof 验证中心</h3>
                <p className="text-xs text-neutral-500 mb-6 leading-relaxed">
                   输入脱敏报告的 CID，即刻通过零知识证明引擎核实报告的真实性。
                </p>
                
                <div className="space-y-4">
                  <div className="relative">
                    <input 
                      type="text" 
                      value={verifyingCid}
                      onChange={(e) => setVerifyingCid(e.target.value)}
                      placeholder="输入 CID (如: QmMock...)"
                      className="w-full h-12 bg-white border border-neutral-100 rounded-xl px-4 text-xs font-mono focus:ring-2 focus:ring-brand-hailan-blue/20 outline-none transition-all"
                    />
                    <button 
                      onClick={handleVerifyCid}
                      disabled={isVerifying || !verifyingCid}
                      className="absolute right-2 top-2 h-8 px-4 bg-brand-hailan-blue text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-brand-navy transition-all disabled:opacity-50"
                    >
                      {isVerifying ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "验证"}
                    </button>
                  </div>

                          <AnimatePresence>
                    {verificationResult && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={cn(
                          "p-4 rounded-2xl border transition-all duration-500 relative overflow-hidden space-y-3",
                          verificationResult.moderationStatus === 'VERIFIED_BY_GUARDIAN' 
                          ? 'bg-gradient-to-br from-amber-50 to-white border-brand-gold shadow-[0_0_15px_rgba(245,158,11,0.2)]' 
                          : verificationResult.moderationStatus === 'JOINT_REVIEW_REQUIRED'
                          ? 'bg-gradient-to-br from-brand-gold/5 to-white border-brand-gold shadow-[0_0_15px_rgba(245,158,11,0.1)]'
                          : 'bg-emerald-50 border-emerald-100'
                        )}
                      >
                         {verificationResult.moderationStatus === 'VERIFIED_BY_GUARDIAN' && (
                           <div className="absolute top-0 right-0 p-1 bg-brand-gold text-white text-[6px] font-black uppercase tracking-widest rounded-bl-lg z-10">
                              GUARDIAN VERIFIED
                           </div>
                         )}

                         <div className="flex items-center gap-2 text-emerald-600">
                            <CheckCircle2 className={cn(
                              "w-4 h-4", 
                              (verificationResult.moderationStatus === 'VERIFIED_BY_GUARDIAN' || verificationResult.moderationStatus === 'JOINT_REVIEW_REQUIRED') && "text-brand-gold"
                            )} />
                            <span className={cn(
                              "text-[10px] font-black uppercase tracking-widest", 
                              (verificationResult.moderationStatus === 'VERIFIED_BY_GUARDIAN' || verificationResult.moderationStatus === 'JOINT_REVIEW_REQUIRED') && "text-brand-gold"
                            )}>
                               {verificationResult.moderationStatus === 'VERIFIED_BY_GUARDIAN' ? "社区精英核准" : 
                                verificationResult.moderationStatus === 'JOINT_REVIEW_REQUIRED' ? "争议联合评审中" : "验证成功"}
                            </span>
                         </div>
                         
                         {verificationResult.moderationStatus === 'JOINT_REVIEW_REQUIRED' && (
                           <motion.div 
                             animate={{ opacity: [0.5, 1, 0.5] }}
                             transition={{ duration: 2, repeat: Infinity }}
                             className="text-[7px] text-brand-gold font-bold italic flex items-center gap-1"
                           >
                              <Lock className="w-2.5 h-2.5" /> 触发 Senior Arbiter 决策冲突机制
                           </motion.div>
                         )}
                         <div className="space-y-1">
                            <div className="flex items-center justify-between">
                               <p className="text-[10px] font-bold text-emerald-900">{verificationResult.assetName || "私密健康报告"}</p>
                               {badgeInfo && (
                                 <span 
                                   className="text-[8px] px-2 py-0.5 rounded-full text-white font-black uppercase tracking-tighter"
                                   style={{ backgroundColor: badgeInfo.color }}
                                 >
                                    {badgeInfo.name}
                                 </span>
                               )}
                            </div>
                            <p className="text-[9px] text-emerald-600/70 font-mono">ID: {verificationResult.assetId}</p>
                            <div className="flex items-center justify-between pt-2 border-t border-emerald-100">
                               <span className="text-[8px] text-emerald-600 font-bold uppercase tracking-widest">安全等级: {verificationResult.securityLevel}</span>
                               <span className="text-[8px] text-emerald-400 font-mono">{new Date(verificationResult.generatedAt).toLocaleDateString()}</span>
                            </div>
                         </div>

                         {/* Doctor Receipts Section */}
                         {receipts.length > 0 && (
                           <div className="p-2 bg-white/50 rounded-xl border border-emerald-100/50 space-y-2">
                              <p className="text-[8px] font-black text-emerald-800 uppercase tracking-widest flex items-center gap-1">
                                 <ShieldCheck className="w-3 h-3" /> 医生多签回执
                              </p>
                              {receipts.map((rcpt, idx) => (
                                <div key={idx} className="flex items-center justify-between text-[7px] text-emerald-600/80 font-medium">
                                   <span>{rcpt.doctorName} 已确认</span>
                                   <span className="font-mono">{new Date(rcpt.timestamp).toLocaleTimeString()}</span>
                                </div>
                              ))}
                           </div>
                         )}

                         <div className="pt-3 border-t border-emerald-100/50 flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                               <span className="text-[8px] font-black text-emerald-800 uppercase tracking-widest">报告信誉评分</span>
                               <div className="flex gap-1">
                                  {[1, 2, 3, 4, 5].map((s) => (
                                    <button 
                                      key={s}
                                      onClick={() => handleScore(s)}
                                      className={cn(
                                        "w-5 h-5 rounded-md flex items-center justify-center text-[10px] transition-all",
                                        userScore && userScore >= s ? "bg-emerald-500 text-white" : "bg-white text-emerald-300 hover:bg-emerald-100"
                                      )}
                                    >
                                      {s}
                                    </button>
                                  ))}
                                </div>
                            </div>
                            
                            <button 
                              onClick={handleReport}
                              disabled={isReporting}
                              className="w-full h-8 rounded-xl bg-rose-50 text-rose-500 text-[9px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-rose-100 transition-colors"
                            >
                               {isReporting ? <Loader2 className="w-3 h-3 animate-spin" /> : <EyeOff className="w-3 h-3" />}
                               违规举报
                            </button>

                            <div className="pt-2 space-y-3">
                               <Button 
                                 onClick={handleForwardToDoctor}
                                 disabled={isSharing}
                                 className="w-full h-10 bg-brand-hailan-blue text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-brand-hailan-blue/20 flex flex-col items-center justify-center gap-0"
                               >
                                  {isSharing ? (
                                    <>
                                      <Loader2 className="w-4 h-4 animate-spin" />
                                      <span className="text-[7px] mt-0.5 opacity-80">{shareStep}</span>
                                    </>
                                  ) : (
                                    <>
                                      <div className="flex items-center">
                                        <Share2 className="w-4 h-4 mr-2" />
                                        转发至私人医生
                                      </div>
                                    </>
                                  )}
                               </Button>
                               
                               {/* Guardian Moderation Panel */}
                               {badgeInfo?.name === "Privacy Guardian" && (
                                 <div className="mt-4 p-3 bg-brand-navy/5 border border-brand-hailan-blue/10 rounded-xl space-y-2">
                                    <div className="flex items-center justify-between mb-1">
                                       <div className="flex items-center gap-2">
                                          <ShieldCheck className="w-3 h-3 text-brand-gold" />
                                          <span className="text-[8px] font-black text-brand-hailan-blue uppercase tracking-widest">高级管理权限</span>
                                       </div>
                                       <button 
                                         onClick={() => setShowDashboard(true)}
                                         className="text-[7px] font-black text-brand-hailan-blue/60 uppercase hover:text-brand-hailan-blue flex items-center gap-1 transition-colors"
                                       >
                                          <LayoutDashboard className="w-2.5 h-2.5" /> 治理看板
                                       </button>
                                    </div>
                                    {moderationStatus ? (
                                       <div className="py-2 text-center text-[8px] font-bold text-brand-hailan-blue italic">
                                          已执行: {moderationStatus}
                                       </div>
                                    ) : (
                                      <div className="grid grid-cols-2 gap-2">
                                        <button 
                                          onClick={() => handleModerate('VALIDATE')}
                                          disabled={isModerating}
                                          className="h-7 bg-white text-emerald-500 border border-emerald-100 rounded-lg text-[7px] font-black uppercase tracking-tighter hover:bg-emerald-50 transition-colors"
                                        >
                                           核准证明
                                        </button>
                                        <button 
                                          onClick={() => handleModerate('FLAG_FALSE')}
                                          disabled={isModerating}
                                          className="h-7 bg-white text-rose-500 border border-rose-100 rounded-lg text-[7px] font-black uppercase tracking-tighter hover:bg-rose-50 transition-colors"
                                        >
                                           标记虚假
                                        </button>
                                      </div>
                                    )}
                                 </div>
                               )}

                               <p className="text-[8px] text-neutral-400 mt-2 text-center italic">
                                  建立 P2P 加密隧道，单次有效
                               </p>
                            </div>
                         </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </GlassCard>

              <div className="sticky top-24 space-y-8">
                 <GlassCard className="p-8 border-neutral-100 bg-white/50">
                    <h3 className="text-lg font-black mb-6 text-brand-hailan-blue">社区精英</h3>
                    <div className="space-y-6">
                       {[1, 2, 3].map(i => (
                         <div key={i} className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-brand-hailan-blue/5 flex items-center justify-center font-black text-brand-hailan-blue">
                               {i}
                            </div>
                            <div>
                               <p className="text-sm font-bold text-neutral-700">匿名贡献者 #{420 + i}</p>
                               <p className="text-[10px] text-emerald-500 font-black uppercase tracking-widest flex items-center gap-1">
                                  <CheckCircle2 className="w-3 h-3" /> ZK-Verified
                               </p>
                            </div>
                         </div>
                       ))}
                    </div>
                    <Button variant="outline" className="w-full mt-8 border-brand-hailan-blue/10 text-brand-hailan-blue rounded-xl font-bold h-12 hover:bg-brand-hailan-blue/5">
                       查看完整榜单
                    </Button>
                 </GlassCard>
              </div>
           </div>
        </div>
      </main>

      <Footer />
      <BottomNav />

      {/* Governance Dashboard Overlay */}
      <AnimatePresence>
        {showDashboard && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDashboard(false)}
              className="absolute inset-0 bg-brand-navy/40 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-white/20"
            >
               <div className="absolute top-0 right-0 p-6">
                  <button 
                    onClick={() => setShowDashboard(false)}
                    className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 hover:text-brand-navy transition-colors"
                  >
                     <X className="w-5 h-5" />
                  </button>
               </div>

               <div className="p-10 space-y-8 max-h-[85vh] overflow-y-auto scrollbar-hide">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-brand-gold/10 rounded-[2rem] flex items-center justify-center relative">
                           <ShieldCheck className="w-8 h-8 text-brand-gold" />
                           {guardianStats?.totalRewards >= 10000 && (
                             <motion.div 
                               animate={{ rotate: 360 }}
                               transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                               className="absolute -inset-1 border border-dashed border-brand-gold rounded-[2.2rem] opacity-40"
                             />
                           )}
                           {guardianStats?.isActiveLeader && (
                             <motion.div 
                               initial={{ scale: 0 }}
                               animate={{ scale: 1 }}
                               className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center shadow-lg"
                               title="活跃领袖限时勋章"
                             >
                                <Zap className="w-3 h-3 text-white fill-current" />
                             </motion.div>
                           )}
                        </div>
                        <div>
                           <h2 className="text-2xl font-black text-brand-navy tracking-tight">治理仪表盘</h2>
                           <div className="flex items-center gap-2">
                              <span className="text-[8px] px-2 py-0.5 bg-brand-gold text-white rounded-full font-black uppercase tracking-widest">
                                 {guardianStats?.title || "Junior Guardian"}
                              </span>
                              {guardianStats?.isActiveLeader && (
                                <span className="text-[8px] px-2 py-0.5 bg-emerald-500 text-white rounded-full font-black uppercase tracking-widest flex items-center gap-1">
                                   <Zap className="w-2 h-2 fill-current" /> 活跃领袖
                                </span>
                              )}
                              <span className="text-[8px] px-2 py-0.5 bg-brand-hailan-blue/10 text-brand-hailan-blue rounded-full font-black uppercase tracking-widest flex items-center gap-1">
                                 <Activity className="w-2 h-2" /> 权重 {guardianStats?.title === "Senior Arbiter" ? "5.0" : guardianStats?.title === "Security Arbiter" ? "2.5" : guardianStats?.title === "Privacy Guardian" ? "1.5" : "1.0"}x
                              </span>
                              <p className="text-[8px] text-neutral-400 font-bold uppercase tracking-widest">Privacy Guardian 权限组</p>
                           </div>
                        </div>
                     </div>
                     <div className="text-right">
                        <p className="text-[8px] font-black text-neutral-300 uppercase tracking-widest mb-1">距离下一等级</p>
                        <div className="w-24 h-1 bg-neutral-100 rounded-full overflow-hidden">
                           <motion.div 
                             className="h-full bg-brand-gold"
                             initial={{ width: 0 }}
                             animate={{ width: `${Math.min((guardianStats?.totalRewards % 5000) / 50, 100)}%` }}
                           />
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-6 bg-brand-navy/5 rounded-[2rem] space-y-2">
                        <p className="text-[9px] font-black text-brand-hailan-blue uppercase tracking-[0.2em]">累计激励权重</p>
                        <div className="flex items-baseline gap-2">
                           <span className="text-3xl font-black text-brand-navy">{guardianStats?.totalRewards || 0}</span>
                           <Coins className="w-4 h-4 text-brand-gold" />
                        </div>
                     </div>
                     <div className="p-6 bg-brand-navy/5 rounded-[2rem] space-y-2">
                        <p className="text-[9px] font-black text-brand-hailan-blue uppercase tracking-[0.2em]">有效治理行动</p>
                        <div className="flex items-baseline gap-2">
                           <span className="text-3xl font-black text-brand-navy">{guardianStats?.totalActions || 0}</span>
                           <History className="w-4 h-4 text-brand-hailan-blue/40" />
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                       <h4 className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] px-2">决策统计</h4>
                       <div className="space-y-3">
                          <div className="flex items-center justify-between p-4 bg-white border border-neutral-100 rounded-2xl">
                             <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-500">
                                   <CheckCircle2 className="w-4 h-4" />
                                </div>
                                <span className="text-xs font-bold text-neutral-600">核准通过</span>
                             </div>
                             <span className="text-sm font-black text-brand-navy">{guardianStats?.approvals || 0}</span>
                          </div>
                          <div className="flex items-center justify-between p-4 bg-white border border-neutral-100 rounded-2xl">
                             <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-rose-50 rounded-lg flex items-center justify-center text-rose-500">
                                   <EyeOff className="w-4 h-4" />
                                </div>
                                <span className="text-xs font-bold text-neutral-600">标记违规</span>
                             </div>
                             <span className="text-sm font-black text-brand-navy">{guardianStats?.flags || 0}</span>
                          </div>
                       </div>
                    </div>

                    <div className="space-y-4">
                       <div className="flex items-center justify-between px-2">
                          <h4 className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em]">实时治理排行</h4>
                          <button 
                            onClick={() => setShowWeeklyReport(true)}
                            className="text-[8px] font-black text-brand-hailan-blue uppercase tracking-widest bg-brand-hailan-blue/5 px-2 py-1 rounded-lg hover:bg-brand-hailan-blue/10 transition-colors"
                          >
                            查看周报
                          </button>
                       </div>
                       <div className="bg-brand-navy/5 rounded-[2rem] p-4 space-y-3">
                          {leaderboard.length > 0 ? leaderboard.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between">
                               <div className="flex items-center gap-2">
                                  <span className={cn(
                                    "w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-black",
                                    idx === 0 ? "bg-brand-gold text-white" : "bg-white text-neutral-400"
                                  )}>
                                     {idx + 1}
                                  </span>
                                  <span className="text-[10px] font-bold text-neutral-600">{item.id === "GUARDIAN_USER_ANON" ? "您 (YOU)" : item.name}</span>
                               </div>
                               <span className="text-[10px] font-black text-brand-hailan-blue">{item.score} <span className="text-[7px] opacity-50">PTS</span></span>
                            </div>
                          )) : (
                            <p className="text-[10px] text-neutral-400 italic py-4 text-center">暂无排行数据</p>
                          )}
                       </div>
                    </div>
                  </div>

                  <div className="pt-4">
                     <div className="p-4 bg-brand-hailan-blue/5 border border-brand-hailan-blue/10 rounded-2xl">
                        <p className="text-[8px] leading-relaxed text-brand-hailan-blue/70 italic text-center">
                           "您的每一次决策都在重塑社区的数据主权。激励权重将在每周结算周期后，转化为平台燃料费减免额度。"
                        </p>
                     </div>
                  </div>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Weekly Report Overlay */}
      <AnimatePresence>
        {showWeeklyReport && weeklyReport && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowWeeklyReport(false)}
              className="absolute inset-0 bg-brand-navy/60 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="relative w-full max-w-sm bg-white rounded-[3rem] shadow-2xl overflow-hidden"
            >
               <div className="p-10 space-y-8">
                  <div className="text-center space-y-2">
                     <div className="w-20 h-20 bg-brand-hailan-blue rounded-[2.5rem] mx-auto flex items-center justify-center shadow-xl shadow-brand-hailan-blue/20 mb-4">
                        <TrendingUp className="w-10 h-10 text-white" />
                     </div>
                     <h2 className="text-2xl font-black text-brand-navy tracking-tight">治理周报</h2>
                     <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-[0.2em]">第 {weeklyReport.weekNumber} 治理周期</p>
                  </div>

                  <div className="space-y-6">
                     <div className="flex items-center justify-between p-6 bg-brand-hailan-blue/5 rounded-[2rem]">
                        <div>
                           <p className="text-[9px] font-black text-brand-hailan-blue uppercase tracking-widest mb-1">本周收益</p>
                           <p className="text-2xl font-black text-brand-navy">+{weeklyReport.current.rewards}</p>
                        </div>
                        <div className="text-right">
                           <p className="text-[9px] font-black text-neutral-400 uppercase tracking-widest mb-1">较上周</p>
                           <div className={cn(
                             "flex items-center gap-1 font-black text-sm",
                             weeklyReport.current.rewards >= weeklyReport.previous.rewards ? "text-emerald-500" : "text-rose-500"
                           )}>
                              {weeklyReport.current.rewards >= weeklyReport.previous.rewards ? "↑" : "↓"} 
                              {Math.abs(weeklyReport.current.rewards - weeklyReport.previous.rewards)}
                           </div>
                        </div>
                     </div>

                     <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 border border-neutral-100 rounded-2xl text-center">
                           <p className="text-[8px] font-black text-neutral-300 uppercase tracking-widest mb-2">活跃行动</p>
                           <p className="text-lg font-black text-brand-navy">{weeklyReport.current.actions}</p>
                        </div>
                        <div className="p-4 border border-neutral-100 rounded-2xl text-center">
                           <p className="text-[8px] font-black text-neutral-300 uppercase tracking-widest mb-2">社区贡献率</p>
                           <p className="text-lg font-black text-brand-navy">TOP 5%</p>
                        </div>
                     </div>
                  </div>

                  <button 
                    onClick={() => setShowWeeklyReport(false)}
                    className="w-full py-5 bg-brand-navy text-white rounded-[2rem] font-black uppercase tracking-[0.2em] shadow-xl shadow-brand-navy/20 active:scale-95 transition-all"
                  >
                     确认并继续治理
                  </button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PostCard({ post, onClick }: { post: Post; onClick: () => void }) {
  const isZK = post.category === 'zk-trend';

  return (
    <motion.div
      whileHover={{ y: -5 }}
      onClick={onClick}
      className={cn(
        "bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-8 border shadow-sm cursor-pointer transition-all group",
        isZK ? "border-emerald-100 hover:shadow-emerald-100/30" : "border-neutral-100 hover:shadow-brand-hailan-blue/10"
      )}
    >
       <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
             <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center",
                isZK ? "bg-emerald-50 text-emerald-500" : "bg-brand-hailan-blue/5 text-brand-hailan-blue"
             )}>
                {isZK ? <Activity className="w-5 h-5" /> : <Users className="w-5 h-5" />}
             </div>
             <div>
                <p className="text-xs font-black uppercase tracking-widest text-neutral-400">{post.category}</p>
                <div className="flex items-center gap-2">
                   <span className="text-sm font-bold text-neutral-700">{post.author.name}</span>
                   {post.author.isZKVerified && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                   {post.author.isExpert && <Award className="w-3.5 h-3.5 text-brand-hailan-blue" />}
                </div>
             </div>
          </div>
          <span className="text-[10px] font-black text-neutral-300 uppercase">{post.publishedAt}</span>
       </div>

       <h2 className="text-2xl font-black text-neutral-800 group-hover:text-brand-hailan-blue transition-colors mb-4 leading-tight">
          {post.title}
       </h2>
       
       <p className="text-neutral-500 text-sm leading-relaxed mb-6 line-clamp-3">
          {post.excerpt}
       </p>

       <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map((tag, i) => (
            <span key={i} className="px-3 py-1 rounded-lg bg-neutral-50 text-[10px] font-bold text-neutral-400 border border-neutral-100">#{tag}</span>
          ))}
       </div>

       <div className="flex items-center justify-between pt-6 border-t border-neutral-50">
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-1.5 text-[10px] font-black text-neutral-400 uppercase tracking-tighter">
                <Eye className="w-4 h-4" /> {post.stats.views} Views
             </div>
             <div className="flex items-center gap-1.5 text-[10px] font-black text-neutral-400 uppercase tracking-tighter">
                <Heart className="w-4 h-4" /> {post.stats.likes} Likes
             </div>
             <div className="flex items-center gap-1.5 text-[10px] font-black text-neutral-400 uppercase tracking-tighter">
                <MessageSquare className="w-4 h-4" /> {post.stats.comments} Comments
             </div>
          </div>
          <div className="flex items-center gap-2 text-brand-hailan-blue font-black text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
             Read Full <ArrowRight className="w-4 h-4" />
          </div>
       </div>
    </motion.div>
  );
}
