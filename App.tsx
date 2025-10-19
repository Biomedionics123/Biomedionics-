import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';

// Public Components
import Header from './components/Header';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import { AppContextProvider, useAppContext } from './contexts/AppContext';

// Public Pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import CartPage from './pages/CartPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import TrackOrderPage from './pages/TrackOrderPage';
import DynamicPage from './pages/DynamicPage';
import SearchResultsPage from './pages/SearchResultsPage';
import WishlistPage from './pages/WishlistPage';


// Admin Components
import AdminLayout from './pages/admin/AdminLayout';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import AdminBlogPage from './pages/admin/AdminBlogPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';
import PrivateRoute from './components/PrivateRoute';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';
import AdminReviewsPage from './pages/admin/AdminReviewsPage';
import AdminAppearancePage from './pages/admin/AdminAppearancePage';
import AdminPagesPage from './pages/admin/AdminPagesPage';
import AdminNotificationsPage from './pages/admin/AdminNotificationsPage';

const ThemeStyleInjector: React.FC = () => {
  const { appearanceSettings } = useAppContext();
  
  useEffect(() => {
    const styleId = 'dynamic-theme-styles';
    let styleElement = document.getElementById(styleId) as HTMLStyleElement | null;
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }
    
    const themeStyles = `
      :root {
        --color-primary: ${appearanceSettings.primaryColor};
        --color-secondary: ${appearanceSettings.secondaryColor};
      }
    `;
    
    styleElement.innerHTML = themeStyles;
  }, [appearanceSettings]);

  return null;
}


const AppContent: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className={`min-h-screen flex flex-col font-sans text-gray-800 ${isAdminRoute ? 'bg-gray-100' : 'bg-gray-50'}`}>
      {!isAdminRoute && <Header />}
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:productId" element={<ProductDetailPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:postId" element={<BlogPostPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
          <Route path="/track-order" element={<TrackOrderPage />} />
          <Route path="/pages/:slug" element={<DynamicPage />} />
          <Route path="/search" element={<SearchResultsPage />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route 
            path="/admin"
            element={
              <PrivateRoute>
                <AdminLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="products" element={<AdminProductsPage />} />
            <Route path="blog" element={<AdminBlogPage />} />
            <Route path="orders" element={<AdminOrdersPage />} />
            <Route path="reviews" element={<AdminReviewsPage />} />
            <Route path="pages" element={<AdminPagesPage />} />
            <Route path="notifications" element={<AdminNotificationsPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
            <Route path="appearance" element={<AdminAppearancePage />} />
          </Route>
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <Chatbot />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppContextProvider>
      <ThemeStyleInjector />
      <HashRouter>
        <AppContent />
      </HashRouter>
    </AppContextProvider>
  );
};

export default App;