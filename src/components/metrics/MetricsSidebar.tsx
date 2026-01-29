import { useNavigate } from "react-router-dom";
import { 
  BarChart3, 
  Video, 
  Target,
  MapPin, 
  TrendingUp, 
  Settings,
  Radio
} from "lucide-react";

export type SectionType = 'dashboard' | 'content' | 'campaigns' | 'beacons' | 'reports' | 'settings';

interface MetricsSidebarProps {
  isAdmin: boolean;
  activeSection: SectionType;
  onSectionChange: (section: SectionType) => void;
}

const MetricsSidebar = ({ isAdmin, activeSection, onSectionChange }: MetricsSidebarProps) => {
  const navigate = useNavigate();

  const menuItems = [
    { id: 'dashboard' as SectionType, label: 'Dashboard', icon: BarChart3, adminOnly: false },
    { id: 'content' as SectionType, label: 'My Content', icon: Video, adminOnly: false },
    { id: 'campaigns' as SectionType, label: 'Campaigns', icon: Target, adminOnly: true },
    { id: 'beacons' as SectionType, label: 'Beacon Management', icon: MapPin, adminOnly: true },
    { id: 'reports' as SectionType, label: 'Reports', icon: TrendingUp, adminOnly: true },
    { id: 'settings' as SectionType, label: 'Settings', icon: Settings, adminOnly: false },
  ];

  return (
    <aside className="w-64 bg-background border-r border-border min-h-screen p-4 hidden lg:block">
      <div className="text-xl font-bold mb-8 text-foreground">
        {isAdmin ? 'Admin Dashboard' : 'My Metrics'}
      </div>
      
      <nav>
        <ul className="space-y-2">
          {menuItems.map((item) => {
            // Skip admin-only items for non-admins
            if (item.adminOnly && !isAdmin) return null;
            
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onSectionChange(item.id)}
                  className={`flex items-center gap-3 p-3 rounded-lg w-full text-left transition-colors ${
                    isActive 
                      ? 'bg-muted text-foreground' 
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <Icon size={20} />
                  {item.label}
                </button>
              </li>
            );
          })}
          
          {isAdmin && (
            <li>
              <button 
                onClick={() => navigate('/live-ble')}
                className="flex items-center gap-3 p-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors w-full text-left"
              >
                <Radio size={20} />
                Live BLE Scanner
              </button>
            </li>
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default MetricsSidebar;
