import * as React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router";
import { CustomRouter } from "@/app/components/routing/CustomRouter";
import { WelcomePage } from "@/app/pages/onboarding/WelcomePage";
import { PrivacySelectionPage } from "@/app/pages/onboarding/PrivacySelectionPage";
import { RegistrationFlow } from "@/app/pages/onboarding/RegistrationFlow";
import { HomePage } from "@/app/pages/home/HomePage";
import { CategoryPage } from "@/app/pages/category/CategoryPage";
import { ProductDetailPage } from "@/app/pages/product/ProductDetailPage";
import { CartPage } from "@/app/pages/cart/CartPage";
import { CheckoutPage } from "@/app/pages/checkout/CheckoutPage";
import { UserProfilePage } from "@/app/pages/profile/UserProfilePage";
import { AIAssistantPage } from "@/app/pages/ai-assistant/AIAssistantPage";
import { ARStartPage } from "@/app/pages/ar-viewer/ARStartPage";
import { ARViewerPage } from "@/app/pages/ar-viewer/ARViewerPage";
import { QuizIntroPage } from "@/app/pages/quiz/QuizIntroPage";
import { QuizQuestionPage } from "@/app/pages/quiz/QuizQuestionPage";
import { QuizResultPage } from "@/app/pages/quiz/QuizResultPage";
import { UserCenterPage } from "@/app/pages/profile/UserCenterPage";
import { OrdersPage } from "@/app/pages/profile/OrdersPage";
import { PrivacyControlPage } from "@/app/pages/profile/PrivacyControlPage";
import { PreferencesPage } from "@/app/pages/profile/PreferencesPage";
import { HelpPage } from "@/app/pages/profile/HelpPage";
import { CommunityHomePage } from "@/app/pages/community/CommunityHomePage";
import { PostDetailPage } from "@/app/pages/community/PostDetailPage";
import { CreatePostPage } from "@/app/pages/community/CreatePostPage";
import { QAPage } from "@/app/pages/community/QAPage";
import { AdminDashboardPage } from "@/app/pages/admin/AdminDashboardPage";
import { ProductManagementPage } from "@/app/pages/admin/ProductManagementPage";
import { OrderManagementPage } from "@/app/pages/admin/OrderManagementPage";
import { ContentModerationPage } from "@/app/pages/admin/ContentModerationPage";
import { DataAnalyticsPage } from "@/app/pages/admin/DataAnalyticsPage";
import { SupplyChainPage } from "@/app/pages/admin/SupplyChainPage";
import { DistributionPage } from "@/app/pages/admin/DistributionPage";
import { OperationsPage } from "@/app/pages/admin/OperationsPage";
import DesignSystemDemo from "@/app/pages/demo/DesignSystemDemo";
import { CartProvider } from "@/app/context/CartContext";
import { UserProvider, useUser } from "@/app/context/UserContext";
import { PrivacyProvider, usePrivacy } from "@/app/context/PrivacyContext";
import { PaymentProvider } from "@/app/context/PaymentContext";
import { Toaster } from "@/app/components/ui/sonner";
import { ErrorBoundary } from "@/app/components/ErrorBoundary";
import { BrandSplash } from "@/app/components/BrandSplash";
import { InstallPrompt } from "@/app/components/pwa/InstallPrompt";
import { UpdatePrompt } from "@/app/components/pwa/UpdatePrompt";
import { registerServiceWorker } from "@/lib/registerServiceWorker";
import { toast } from "sonner";
import { SkeletonStyles } from "@/app/components/design-system/Skeleton";
import { GlobalAIAssistant } from "@/app/components/ai/GlobalAIAssistant";
import { OfflinePushBanner } from "@/app/components/pwa/OfflinePushBanner";
import { CamouflageScreen } from "@/app/components/privacy/CamouflageScreen";
import { DeviceHubPage } from "@/app/pages/hub/DeviceHubPage";
import { ScenarioPage } from "@/app/pages/hub/ScenarioPage";
import { MultiDeviceSyncPage } from "@/app/pages/hub/MultiDeviceSyncPage";
import { HealthAssetsPage } from "@/app/pages/hub/HealthAssetsPage";
import { ZKMedicalVaultPage } from "@/app/pages/hub/ZKMedicalVaultPage";

function AppContent() {
    const navigate = useNavigate();
    const { logout } = useUser();
    const { isBlur, setIsBlur } = usePrivacy();
    const [showSplash, setShowSplash] = React.useState(true);

    if (showSplash) {
        return <BrandSplash onComplete={() => setShowSplash(false)} />;
    }

    return (
        <>
            <SkeletonStyles />
            <CamouflageScreen />
            <GlobalAIAssistant />
            <OfflinePushBanner />
            <Routes>
                <Route path="/welcome" element={
                    <WelcomePage 
                        onStart={() => navigate("/privacy")} 
                        onPrivacyPolicy={() => alert("Privacy Policy: Your data is secure.")} 
                    />
                } />
                
                <Route path="/privacy" element={
                    <PrivacySelectionPage 
                        onSelect={(mode) => {
                            console.log("Selected mode:", mode);
                            navigate("/register");
                        }} 
                        onBack={() => navigate("/welcome")} 
                    />
                } />
                
                <Route path="/register" element={
                    <RegistrationFlow onComplete={() => navigate("/")} />
                } />
                
                <Route path="/device-hub" element={<DeviceHubPage />} />
                <Route path="/scenarios" element={<ScenarioPage />} />
                <Route path="/sync-protocol" element={<MultiDeviceSyncPage />} />
                <Route path="/health-assets" element={<HealthAssetsPage />} />
                <Route path="/medical-vault" element={<ZKMedicalVaultPage />} />
                
                <Route path="/" element={
                    <HomePage 
                        onLogout={logout}
                        privacyMode={isBlur}
                        onPrivacyToggle={setIsBlur}
                    />
                } />
                <Route path="/category" element={<CategoryPage privacyMode={isBlur} onPrivacyToggle={setIsBlur} />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/profile" element={<UserProfilePage />} />
                <Route path="/ai-assistant" element={<AIAssistantPage />} />
                <Route path="/ar-start" element={<ARStartPage />} />
                <Route path="/ar-viewer" element={<ARViewerPage />} />
                <Route path="/quiz-intro" element={<QuizIntroPage />} />
                <Route path="/quiz-question" element={<QuizQuestionPage />} />
                <Route path="/quiz-result" element={<QuizResultPage />} />
                <Route path="/community" element={<CommunityHomePage />} />
                <Route path="/community/post/:id" element={<PostDetailPage />} />
                <Route path="/community/create-post" element={<CreatePostPage />} />
                <Route path="/community/qa" element={<QAPage />} />
                
                <Route path="/user-center" element={<UserCenterPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/privacy-control" element={<PrivacyControlPage />} />
                <Route path="/preferences" element={<PreferencesPage />} />
                <Route path="/help" element={<HelpPage />} />
                
                <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
                <Route path="/product-management" element={<ProductManagementPage />} />
                <Route path="/order-management" element={<OrderManagementPage />} />
                <Route path="/content-moderation" element={<ContentModerationPage />} />
                <Route path="/data-analytics" element={<DataAnalyticsPage />} />
                <Route path="/supply-chain" element={<SupplyChainPage />} />
                <Route path="/distribution" element={<DistributionPage />} />
                <Route path="/operations" element={<OperationsPage />} />
                <Route path="/design-system-demo" element={<DesignSystemDemo />} />

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </>
    );
}

export default function App() {
  const [isProd, setIsProd] = React.useState(false);
  const [initialized, setInitialized] = React.useState(false);

  React.useEffect(() => {
    try {
      console.log("[v0] App initialization starting");
      
      const isProduction = import.meta.env?.PROD === true;
      setIsProd(isProduction);

      if (isProduction) {
        console.log("[v0] Production mode - registering Service Worker");
        registerServiceWorker({
          onSuccess: () => console.log('[PWA] Ready'),
          onUpdate: () => console.log('[PWA] Update'),
          onOfflineReady: () => toast.success('已可离线使用'),
          onError: (err) => console.error('[PWA] Error', err),
        });
      } else {
        console.log("[v0] Development mode - Service Worker disabled");
      }
      
      setInitialized(true);
      console.log("[HaiLan] Application Heartbeat - Initialized Successfully");
    } catch (error) {
      console.error("[v0] Fatal initialization error:", error);
      setInitialized(true);
    }
  }, []);

  if (!initialized) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh',
        background: '#1a1a1a',
        color: '#0056b3',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '24px', marginBottom: '16px' }}>HaiLan Pro</div>
          <div style={{ fontSize: '14px', opacity: 0.7 }}>正在初始化...</div>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <CustomRouter>
        <UserProvider>
          <CartProvider>
            <PrivacyProvider>
              <PaymentProvider>
                <AppContent />
                <Toaster position="top-center" />
                {isProd && <InstallPrompt />}
                {isProd && <UpdatePrompt />}
              </PaymentProvider>
            </PrivacyProvider>
          </CartProvider>
        </UserProvider>
      </CustomRouter>
    </ErrorBoundary>
  );
}
