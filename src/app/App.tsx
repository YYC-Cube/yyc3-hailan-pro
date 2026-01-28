import * as React from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
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
import { UserProvider } from "@/app/context/UserContext";
import { PrivacyProvider } from "@/app/context/PrivacyContext";
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

// 注册Service Worker
if (import.meta.env.PROD) {
  registerServiceWorker({
    onSuccess: () => {
      console.log('[PWA] App is ready for offline use');
    },
    onUpdate: () => {
      console.log('[PWA] New version available');
    },
    onOfflineReady: () => {
      toast.success('应用已可离线使用', {
        description: '即使断网也能正常浏览',
      });
    },
    onError: (error) => {
      console.error('[PWA] Service Worker error:', error);
    },
  });
}

import { useUser } from "@/app/context/UserContext";

import { CamouflageScreen } from "@/app/components/privacy/CamouflageScreen";

function AppContent() {
    const { settings, updateSettings } = useUser();
    const privacyMode = settings.privacyMode;
    const setPrivacyMode = (mode: boolean) => updateSettings({ privacyMode: mode });
    const navigate = useNavigate();
    const [showSplash, setShowSplash] = React.useState(true);

    if (showSplash) {
        return <BrandSplash onComplete={() => setShowSplash(false)} />;
    }

    return (
        <>
            <SkeletonStyles />
            <CamouflageScreen />
            <GlobalAIAssistant />
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
            
            <Route path="/" element={
                <HomePage 
                    onLogout={() => navigate("/welcome")} 
                    privacyMode={privacyMode} 
                    onPrivacyToggle={setPrivacyMode} 
                />
            } />
            
            <Route path="/category" element={
                <CategoryPage 
                    privacyMode={privacyMode} 
                    onPrivacyToggle={setPrivacyMode} 
                />
            } />
            
            <Route path="/product/:id" element={
                <ProductDetailPage />
            } />
            
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/profile" element={
                <UserProfilePage 
                    privacyMode={privacyMode}
                    onPrivacyToggle={setPrivacyMode}
                />
            } />
            <Route path="/ai-assistant" element={<AIAssistantPage />} />
            <Route path="/ar-start" element={<ARStartPage />} />
            <Route path="/ar-viewer" element={<ARViewerPage />} />
            <Route path="/quiz-intro" element={
                <QuizIntroPage 
                    privacyMode={privacyMode}
                    onPrivacyToggle={setPrivacyMode}
                />
            } />
            <Route path="/quiz-question" element={<QuizQuestionPage />} />
            <Route path="/quiz-result" element={<QuizResultPage />} />
            <Route path="/user-center" element={<UserCenterPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/privacy-control" element={<PrivacyControlPage />} />
            <Route path="/preferences" element={<PreferencesPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/community" element={<CommunityHomePage />} />
            <Route path="/post/:id" element={<PostDetailPage />} />
            <Route path="/create-post" element={<CreatePostPage />} />
            <Route path="/qa" element={<QAPage />} />
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
  return (
    <ErrorBoundary>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <UserProvider>
          <CartProvider>
            <PrivacyProvider>
              <PaymentProvider>
                <AppContent />
                <Toaster position="top-center" />
                {/* PWA功能组件 */}
                <InstallPrompt />
                <UpdatePrompt />
              </PaymentProvider>
            </PrivacyProvider>
          </CartProvider>
        </UserProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
