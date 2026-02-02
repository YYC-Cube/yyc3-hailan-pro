import * as React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router";
import { AnimatePresence } from "framer-motion";
import { CustomRouter } from "./components/routing/CustomRouter";
import { WelcomePage } from "./pages/onboarding/WelcomePage";
import { PrivacySelectionPage } from "./pages/onboarding/PrivacySelectionPage";
import { RegistrationFlow } from "./pages/onboarding/RegistrationFlow";
import { HomePage } from "./pages/home/HomePage";
import { CategoryPage } from "./pages/category/CategoryPage";
import { ProductDetailPage } from "./pages/product/ProductDetailPage";
import { CartPage } from "./pages/cart/CartPage";
import { CheckoutPage } from "./pages/checkout/CheckoutPage";
import { UserProfilePage } from "./pages/profile/UserProfilePage";
import { AIAssistantPage } from "./pages/ai-assistant/AIAssistantPage";
import { ARStartPage } from "./pages/ar-viewer/ARStartPage";
import { ARViewerPage } from "./pages/ar-viewer/ARViewerPage";
import { QuizIntroPage } from "./pages/quiz/QuizIntroPage";
import { QuizQuestionPage } from "./pages/quiz/QuizQuestionPage";
import { QuizResultPage } from "./pages/quiz/QuizResultPage";
import { UserCenterPage } from "./pages/profile/UserCenterPage";
import { OrdersPage } from "./pages/profile/OrdersPage";
import { PrivacyControlPage } from "./pages/profile/PrivacyControlPage";
import { PreferencesPage } from "./pages/profile/PreferencesPage";
import { HelpPage } from "./pages/profile/HelpPage";
import { CommunityHomePage } from "./pages/community/CommunityHomePage";
import { PostDetailPage } from "./pages/community/PostDetailPage";
import { CreatePostPage } from "./pages/community/CreatePostPage";
import { QAPage } from "./pages/community/QAPage";
import { AdminDashboardPage } from "./pages/admin/AdminDashboardPage";
import { ProductManagementPage } from "./pages/admin/ProductManagementPage";
import { OrderManagementPage } from "./pages/admin/OrderManagementPage";
import { ContentModerationPage } from "./pages/admin/ContentModerationPage";
import { DataAnalyticsPage } from "./pages/admin/DataAnalyticsPage";
import { SupplyChainPage } from "./pages/admin/SupplyChainPage";
import { DistributionPage } from "./pages/admin/DistributionPage";
import { OperationsPage } from "./pages/admin/OperationsPage";
import DesignSystemDemo from "./pages/demo/DesignSystemDemo";
import { CartProvider } from "./context/CartContext";
import { UserProvider, useUser } from "./context/UserContext";
import { PrivacyProvider } from "./context/PrivacyContext";
import { PaymentProvider } from "./context/PaymentContext";
import { Toaster } from "./components/ui/sonner";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { BrandSplash } from "./components/BrandSplash";
import { InstallPrompt } from "./components/pwa/InstallPrompt";
import { UpdatePrompt } from "./components/pwa/UpdatePrompt";
import { registerServiceWorker } from "../lib/registerServiceWorker";
import { toast } from "sonner";
import { SkeletonStyles } from "./components/design-system/Skeleton";
import { GlobalAIAssistant } from "./components/ai/GlobalAIAssistant";
import { OfflinePushBanner } from "./components/pwa/OfflinePushBanner";
import { CamouflageScreen } from "./components/privacy/CamouflageScreen";
import { DeviceHubPage } from "./pages/hub/DeviceHubPage";
import { ScenarioPage } from "./pages/hub/ScenarioPage";
import { MultiDeviceSyncPage } from "./pages/hub/MultiDeviceSyncPage";
import { HealthAssetsPage } from "./pages/hub/HealthAssetsPage";
import { ZKMedicalVaultPage } from "./pages/hub/ZKMedicalVaultPage";
import { ZKReportDetailPage } from "./pages/community/ZKReportDetailPage";

function AppContent() {
    const { settings, updateSettings } = useUser();
    const privacyMode = settings?.privacyMode;
    const setPrivacyMode = (mode: boolean) => updateSettings({ privacyMode: mode });
    const navigate = useNavigate();
    const [showSplash, setShowSplash] = React.useState(true);

    if (showSplash) {
        return (
          <AnimatePresence>
            <BrandSplash onComplete={() => setShowSplash(false)} />
          </AnimatePresence>
        );
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
                <Route path="/community/post/:id" element={<ZKReportDetailPage />} />
                
                <Route path="/" element={<HomePage />} />
                <Route path="/category/:id" element={<CategoryPage />} />
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

                {/* Default redirect to Home if no match */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </>
    );
}

export default function App() {
  React.useEffect(() => {
    console.log("[HaiLan] Application Heartbeat - Initialized Successfully");
    // 极其防御性的环境检查
    let isProd = false;
    try {
      if (typeof import.meta !== 'undefined' && (import.meta as any).env) {
        isProd = !!(import.meta as any).env.PROD;
      }
    } catch (e) {}

    if (isProd) {
      registerServiceWorker({
        onSuccess: () => console.log('[PWA] Ready'),
        onUpdate: () => console.log('[PWA] Update'),
        onOfflineReady: () => toast.success('已可离线使用'),
        onError: (err) => console.error('[PWA] Error', err),
      });
    }
  }, []);

  return (
    <ErrorBoundary>
      <CustomRouter>
        <UserProvider>
          <CartProvider>
            <PrivacyProvider>
              <PaymentProvider>
                <AppContent />
                <Toaster position="top-center" />
                <InstallPrompt />
                <UpdatePrompt />
              </PaymentProvider>
            </PrivacyProvider>
          </CartProvider>
        </UserProvider>
      </CustomRouter>
    </ErrorBoundary>
  );
}
