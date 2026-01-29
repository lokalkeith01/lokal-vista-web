import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { isAdminEmail } from "@/config/adminConfig";
import MetricsSidebar from "@/components/metrics/MetricsSidebar";
import AdminMetricsDashboard from "@/components/metrics/AdminMetricsDashboard";
import UserMetricsDashboard from "@/components/metrics/UserMetricsDashboard";
import { Badge } from "@/components/ui/badge";

const Metrics = () => {
  const { user } = useAuth();
  const isAdmin = isAdminEmail(user?.email);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="flex">
        <MetricsSidebar isAdmin={isAdmin} />

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8">
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
              <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-800 rounded-lg text-sm font-medium">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Live Data
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </header>

          {/* Conditional Dashboard */}
          {isAdmin ? <AdminMetricsDashboard /> : <UserMetricsDashboard />}
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default Metrics;
