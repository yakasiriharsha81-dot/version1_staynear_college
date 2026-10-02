import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PropertyProvider, useProperties } from './context/PropertyContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { MobileBottomNav } from './components/common/MobileBottomNav';
import { HeroSearch } from './components/home/HeroSearch';
import { FindPGView } from './components/property/FindPGView';
import { PropertyDetailsView } from './components/property/PropertyDetailsView';
import { CompareView } from './components/property/CompareView';
import { FavoritesView } from './components/property/FavoritesView';
import { CollegeSearchView } from './components/colleges/CollegeSearchView';
import { ListPropertyView } from './components/property/ListPropertyView';
import { OwnerDashboardView } from './components/owner/OwnerDashboardView';
import { AdminDashboardView } from './components/admin/AdminDashboardView';
import { AboutView } from './components/about/AboutView';
import { AuthModal } from './components/auth/AuthModal';
import { ReportModal } from './components/property/ReportModal';
import { Property, College, UserRole } from './types';

const MainAppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedPropertyForDetails, setSelectedPropertyForDetails] = useState<Property | null>(null);
  const [reportPropertyTarget, setReportPropertyTarget] = useState<Property | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalRole, setAuthModalRole] = useState<UserRole>('student');

  const { selectedCollege, setSelectedCollege, updateFilters, resetFilters } = useProperties();

  // Navigation handlers
  const handleViewPropertyDetails = (property: Property) => {
    setSelectedPropertyForDetails(property);
    setActiveTab('property-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCollegeAndSearch = (college: College) => {
    setSelectedCollege(college);
    setActiveTab('find-pg');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHeroSearchSubmit = () => {
    setActiveTab('find-pg');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAuthModal = (role: UserRole = 'student') => {
    setAuthModalRole(role);
    setAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-brand-600 selection:text-white pb-16 lg:pb-0">
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (tab === 'hostels') {
            updateFilters({ accommodationTypes: ['Hostel'] });
            setActiveTab('find-pg');
          } else {
            setActiveTab(tab);
          }
        }}
        onOpenAuthModal={handleOpenAuthModal}
      />

      {/* Main Page Content Body */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HeroSearch
            onSearchSubmit={handleHeroSearchSubmit}
            onNavigateTab={(tab) => {
              if (tab === 'hostels') {
                updateFilters({ accommodationTypes: ['Hostel'] });
                setActiveTab('find-pg');
              } else {
                setActiveTab(tab);
              }
            }}
            onViewDetails={handleViewPropertyDetails}
          />
        )}

        {activeTab === 'find-pg' && (
          <FindPGView
            onViewPropertyDetails={handleViewPropertyDetails}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'colleges' && (
          <CollegeSearchView
            onSelectCollegeAndSearch={handleSelectCollegeAndSearch}
          />
        )}

        {activeTab === 'list-property' && (
          <ListPropertyView
            onStartListing={() => setActiveTab('owner-dashboard')}
            onOpenAuthModal={() => handleOpenAuthModal('owner')}
          />
        )}

        {activeTab === 'favorites' && (
          <FavoritesView
            college={selectedCollege}
            onViewDetails={handleViewPropertyDetails}
            onFindMore={() => setActiveTab('find-pg')}
          />
        )}

        {activeTab === 'compare' && (
          <CompareView
            college={selectedCollege}
            onViewDetails={handleViewPropertyDetails}
            onFindMore={() => setActiveTab('find-pg')}
          />
        )}

        {activeTab === 'about' && <AboutView />}

        {activeTab === 'property-details' && selectedPropertyForDetails && (
          <PropertyDetailsView
            property={selectedPropertyForDetails}
            college={selectedCollege}
            onBack={() => setActiveTab('find-pg')}
            onOpenReportModal={(prop) => setReportPropertyTarget(prop)}
          />
        )}

        {activeTab === 'owner-dashboard' && (
          <OwnerDashboardView
            onViewPropertyDetails={handleViewPropertyDetails}
          />
        )}

        {activeTab === 'admin-dashboard' && (
          <AdminDashboardView
            onViewPropertyDetails={handleViewPropertyDetails}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        setActiveTab={(tab) => {
          if (tab === 'hostels') {
            updateFilters({ accommodationTypes: ['Hostel'] });
            setActiveTab('find-pg');
          } else {
            setActiveTab(tab);
          }
        }}
        onOpenAuthModal={(role) => handleOpenAuthModal(role || 'student')}
      />

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
        }}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialRole={authModalRole}
      />

      {/* Report Modal */}
      <ReportModal
        property={reportPropertyTarget}
        onClose={() => setReportPropertyTarget(null)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <PropertyProvider>
        <MainAppContent />
      </PropertyProvider>
    </AuthProvider>
  );
}
