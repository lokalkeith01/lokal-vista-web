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

interface MetricsSidebarProps {
  isAdmin: boolean;
}

const MetricsSidebar = ({ isAdmin }: MetricsSidebarProps) => {
  const navigate = useNavigate();

  return (
    <aside className="w-64 bg-background border-r border-border min-h-screen p-4 hidden lg:block">
      <div className="text-xl font-bold mb-8 text-foreground">
        {isAdmin ? 'Admin Dashboard' : 'My Metrics'}
      </div>
      
      <nav>
        <ul className="space-y-2">
          <li>
            <a href="#" className="flex items-center gap-3 p-3 rounded-lg bg-muted text-foreground">
              <BarChart3 size={20} />
              Dashboard
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center gap-3 p-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
              <Video size={20} />
              My Content
            </a>
          </li>
          {isAdmin && (
            <>
              <li>
                <a href="#" className="flex items-center gap-3 p-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                  <Target size={20} />
                  Campaigns
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-3 p-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                  <MapPin size={20} />
                  Beacon Management
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-3 p-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                  <TrendingUp size={20} />
                  Reports
                </a>
              </li>
            </>
          )}
          <li>
            <a href="#" className="flex items-center gap-3 p-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
              <Settings size={20} />
              Settings
            </a>
          </li>
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
