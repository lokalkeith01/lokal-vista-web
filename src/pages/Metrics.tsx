import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { isAdminEmail } from "@/config/adminConfig";
import MetricsSidebar, { SectionType } from "@/components/metrics/MetricsSidebar";
import AdminMetricsDashboard from "@/components/metrics/AdminMetricsDashboard";
import UserMetricsDashboard from "@/components/metrics/UserMetricsDashboard";
import BusinessMetricsDashboard from "@/components/metrics/BusinessMetricsDashboard";
import InfluencerMetricsDashboard from "@/components/metrics/InfluencerMetricsDashboard";
import MusicianMetricsDashboard from "@/components/metrics/MusicianMetricsDashboard";
import PersonaSelector, { PersonaType } from "@/components/metrics/PersonaSelector";
import MyContentSection from "@/components/metrics/sections/MyContentSection";
import CampaignsSection from "@/components/metrics/sections/CampaignsSection";
import BeaconManagementSection from "@/components/metrics/sections/BeaconManagementSection";
import ReportsSection from "@/components/metrics/sections/ReportsSection";
import SettingsSection from "@/components/metrics/sections/SettingsSection";
import { Badge } from "@/components/ui/badge";

const Metrics = () => {
  const { user } = useAuth();
  const isAdmin = isAdminEmail(user?.email);
  const [selectedPersona, setSelectedPersona] = useState<PersonaType>('admin');
  const [activeSection, setActiveSection] = useState<SectionType>('dashboard');

  const renderDashboard = () => {
    if (!isAdmin) {
      return <UserMetricsDashboard />;
    }

    switch (selectedPersona) {
      case 'admin':
        return <AdminMetricsDashboard />;
      case 'business':
        return <BusinessMetricsDashboard />;
      case 'influencer':
        return <InfluencerMetricsDashboard />;
      case 'musician':
        return <MusicianMetricsDashboard />;
      default:
        return <AdminMetricsDashboard />;
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <>
            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-4 border-b-2 border-border">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl md:text-3xl font-semibold text-foreground">
                    Welcome back{user?.email ? `, ${user.email.split('@')[0]}` : ''}!
                  </h1>
                  {isAdmin && (
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      Admin
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-800 rounded-lg text-sm font-medium">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Live Data
                  </div>
                  {isAdmin && (
                    <PersonaSelector 
                      value={selectedPersona} 
                      onChange={setSelectedPersona} 
                    />
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </header>

            {/* Conditional Dashboard */}
            {renderDashboard()}
          </>
        );
      case 'content':
        return <MyContentSection />;
      case 'campaigns':
        return <CampaignsSection />;
      case 'beacons':
        return <BeaconManagementSection />;
      case 'reports':
        return <ReportsSection />;
      case 'settings':
        return <SettingsSection />;
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="flex">
        <MetricsSidebar 
          isAdmin={isAdmin} 
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8">
          {renderContent()}
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default Metrics;
