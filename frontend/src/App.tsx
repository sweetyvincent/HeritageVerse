import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import MobileNav from './components/layout/MobileNav';
import ChatBot from './components/ai/ChatBot';

// Pages
import LandingPage from './pages/LandingPage';
import ExplorePage from './pages/ExplorePage';
import HeritageDetailPage from './pages/HeritageDetailPage';
import MapPage from './pages/MapPage';
import VirtualTourPage from './pages/VirtualTourPage';
import ThreeDViewerPage from './pages/ThreeDViewerPage';
import ARExperiencePage from './pages/ARExperiencePage';
import AIGuidePage from './pages/AIGuidePage';
import TripPlannerPage from './pages/TripPlannerPage';
import PassportPage from './pages/PassportPage';
import CommunityPage from './pages/CommunityPage';
import CommunitySubmitPage from './pages/CommunitySubmitPage';
import PreservationPage from './pages/PreservationPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import ManageSitesPage from './pages/dashboard/ManageSitesPage';
import ManageUsersPage from './pages/dashboard/ManageUsersPage';
import ManageReportsPage from './pages/dashboard/ManageReportsPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <LanguageProvider>
          <div className="flex flex-col min-h-screen bg-heritage-dark text-white relative pb-16 md:pb-0">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/explore" element={<ExplorePage />} />
                <Route path="/heritage/:slug" element={<HeritageDetailPage />} />
                <Route path="/map" element={<MapPage />} />
                <Route path="/virtual-tour/:siteId" element={<VirtualTourPage />} />
                <Route path="/3d-viewer/:siteId" element={<ThreeDViewerPage />} />
                <Route path="/ar-experience/:siteId" element={<ARExperiencePage />} />
                <Route path="/ai-guide" element={<AIGuidePage />} />
                <Route path="/plan" element={<TripPlannerPage />} />
                <Route path="/passport" element={<PassportPage />} />
                <Route path="/community" element={<CommunityPage />} />
                <Route path="/community/submit" element={<CommunitySubmitPage />} />
                <Route path="/preservation" element={<PreservationPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/auth/login" element={<LoginPage />} />
                <Route path="/auth/register" element={<RegisterPage />} />
                <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/dashboard" element={<AdminDashboard />} />
                <Route path="/dashboard/sites" element={<ManageSitesPage />} />
                <Route path="/dashboard/users" element={<ManageUsersPage />} />
                <Route path="/dashboard/reports" element={<ManageReportsPage />} />
              </Routes>
            </main>
            <ChatBot />
            <Footer />
            <MobileNav />
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: {
                  background: '#12121A',
                  color: '#E8E8F0',
                  border: '1px solid rgba(212, 160, 23, 0.3)',
                },
                success: { iconTheme: { primary: '#D4A017', secondary: '#0A0A0F' } },
              }}
            />
          </div>
        </LanguageProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
