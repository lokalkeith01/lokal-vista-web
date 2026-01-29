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
import OwnerBusinessDashboard from "@/components/metrics/OwnerBusinessDashboard";
import PersonaSelector, { PersonaType } from "@/components/metrics/PersonaSelector";
import MyContentSection from "@/components/metrics/sections/MyContentSection";
import CampaignsSection from "@/components/metrics/sections/CampaignsSection";
import BeaconManagementSection from "@/components/metrics/sections/BeaconManagementSection";
import ReportsSection from "@/components/metrics/sections/ReportsSection";
import SettingsSection from "@/components/metrics/sections/SettingsSection";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Metrics = () => {
  const { user } = useAuth();
  const isAdmin = isAdminEmail(user?.email);
  const [selectedPersona, setSelectedPersona] = useState<PersonaType>('admin');
  const [activeSection, setActiveSection] = useState<SectionType>('dashboard');

  // Check if user is a business owner
  const { data: ownedBusiness } = useQuery({
    queryKey: ['user-owned-business', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const { data } = await supabase
        .from('businesses')
        .select('id, name')
        .eq('owner_id', user.id)
        .single();
      return data;
    },
    enabled: !!user?.id,
  });

  const isBusinessOwner = !!ownedBusiness;

  const renderDashboard = () => {
    // If user is a business owner (not admin), show their business dashboard
    if (isBusinessOwner && !isAdmin) {
      return <OwnerBusinessDashboard />;
    }

    // If not admin and not business owner, show regular user dashboard
    if (!isAdmin) {
      return <UserMetricsDashboard />;
    }

    // Admin persona switching
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
                    {isBusinessOwner && !isAdmin 
                      ? `Welcome back, ${ownedBusiness?.name}!`
                      : `Welcome back${user?.email ? `, ${user.email.split('@')[0]}` : ''}!`
                    }
                  </h1>
                  {isAdmin && (
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      Admin
                    </Badge>
                  )}
                  {isBusinessOwner && !isAdmin && (
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      Business Owner
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
