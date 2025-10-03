import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { 
  BarChart3, 
  Users, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  MapPin, 
  Target,
  Settings,
  FileText,
  Activity,
  Radio
} from "lucide-react";

const Metrics = () => {
  const navigate = useNavigate();
  
  const stats = [
    {
      title: "Today's Visitors",
      value: "47",
      change: "+23% vs yesterday",
      positive: true,
      icon: Users
    },
    {
      title: "Campaign Attribution",
      value: "12",
      change: "High confidence visits",
      positive: true,
      icon: Target
    },
    {
      title: "Avg. Dwell Time",
      value: "18m",
      change: "+3m vs last week",
      positive: true,
      icon: Clock
    },
    {
      title: "Estimated Revenue",
      value: "$247",
      change: "Campaign attributed",
      positive: true,
      icon: DollarSign
    }
  ];

  const campaigns = [
    {
      name: "Lunch Special 20% Off",
      status: "Active • Ends in 2 days",
      roi: "387% ROI",
      visits: "12 beacon visits",
      roiType: "high"
    },
    {
      name: "New Customer Welcome",
      status: "Running • First-time visitors",
      roi: "234% ROI", 
      visits: "5 beacon visits",
      roiType: "medium"
    },
    {
      name: "Happy Hour Drinks",
      status: "Scheduled • Starts tomorrow",
      roi: null,
      visits: "Ready to launch",
      roiType: null
    }
  ];

  const attributionData = [
    {
      level: "High Confidence",
      description: "Beacon + Promo Code + 15min+ dwell",
      visits: "8 visits",
      confidence: 95
    },
    {
      level: "Medium Confidence", 
      description: "Beacon + 10min+ dwell during campaign",
      visits: "15 visits",
      confidence: 70
    },
    {
      level: "Low Confidence",
      description: "Beacon detection during campaign", 
      visits: "24 visits",
      confidence: 40
    }
  ];

  const insights = [
    {
      title: "Repeat Visitors (This Week)",
      description: "Customers who came back",
      value: "18 customers",
      subValue: "38% return rate",
      positive: true
    },
    {
      title: "Average Visit Duration",
      description: "Time spent in location", 
      value: "18 minutes",
      subValue: "+3m vs last week",
      positive: true
    },
    {
      title: "Peak Visit Times",
      description: "Busiest hours today",
      value: "11 AM - 1 PM", 
      subValue: "23 beacon detections",
      positive: null
    }
  ];

  const realtimeActivity = [
    {
      title: "Customer entered store",
      description: "Beacon #1 detected • 2 minutes ago",
      label: "New visitor",
      sublabel: "First time",
      type: "new"
    },
    {
      title: "Promotion code redeemed",
      description: "LUNCH20 • 5 minutes ago", 
      label: "$12.50 order",
      sublabel: "High confidence",
      type: "success"
    },
    {
      title: "Customer exited store",
      description: "18 min visit • 8 minutes ago",
      label: "Returning customer", 
      sublabel: "3rd visit this week",
      type: "return"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-background border-r border-border min-h-screen p-4">
          <div className="text-xl font-bold mb-8 text-foreground">
            Lokal Business
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
                  <Users size={20} />
                  Customers
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-3 p-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                  <TrendingUp size={20} />
                  Reports
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-3 p-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                  <Settings size={20} />
                  Settings
                </a>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/live-ble')}
                  className="flex items-center gap-3 p-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors w-full text-left"
                >
                  <Radio size={20} />
                  Live BLE Scanner
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Header */}
          <header className="flex justify-between items-center mb-8 pb-4 border-b-2 border-border">
            <div>
              <h1 className="text-3xl font-semibold text-foreground mb-2">
                Joe's Coffee Shop
              </h1>
              <div className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-800 rounded-lg text-sm font-medium">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                Live Analytics
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-800 rounded-lg text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              2 Beacons Active
            </div>
          </header>

          {/* Action Bar */}
          <div className="flex gap-4 mb-8">
            <Button className="bg-primary hover:bg-primary/90">
              <Target className="w-4 h-4 mr-2" />
              Create Campaign
            </Button>
            <Button variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Beacon Settings
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </CardTitle>
                    <IconComponent className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground mb-1">
                      {stat.value}
                    </div>
                    <p className={`text-sm ${stat.positive ? 'text-green-600' : 'text-muted-foreground'}`}>
                      {stat.change}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Foot Traffic Chart */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Foot Traffic Patterns</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Today</Button>
                    <Button size="sm">Week</Button>
                    <Button variant="outline" size="sm">Month</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-72 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg flex flex-col items-center justify-center text-muted-foreground">
                  <TrendingUp size={48} className="mb-4" />
                  <p className="text-center italic">
                    Interactive Chart: Hourly foot traffic with beacon entry/exit events
                    <br />
                    Peak hours: 11 AM - 1 PM (23 visitors)
                    <br />
                    Campaign correlation: +67% during "Lunch Special" promotion
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Active Campaigns */}
            <Card>
              <CardHeader>
                <CardTitle>Campaign Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {campaigns.map((campaign, index) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b border-border last:border-b-0">
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">
                        {campaign.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {campaign.status}
                      </p>
                    </div>
                    <div className="text-right">
                      {campaign.roi && (
                        <Badge 
                          variant={campaign.roiType === 'high' ? 'default' : 'secondary'}
                          className="mb-1"
                        >
                          {campaign.roi}
                        </Badge>
                      )}
                      <p className="text-sm text-muted-foreground">
                        {campaign.visits}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Attribution Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Visit Attribution Confidence</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {attributionData.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b border-border last:border-b-0">
                    <div>
                      <div className="font-semibold text-foreground">
                        {item.level}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {item.description}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-semibold">{item.visits}</span>
                      <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            item.confidence >= 80 ? 'bg-green-500' : 
                            item.confidence >= 60 ? 'bg-yellow-500' : 'bg-orange-500'
                          }`}
                          style={{ width: `${item.confidence}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Journey Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {insights.map((insight, index) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b border-border last:border-b-0">
                    <div>
                      <div className="font-semibold text-foreground">
                        {insight.title}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {insight.description}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-foreground">
                        {insight.value}
                      </div>
                      <div className={`text-sm ${insight.positive ? 'text-green-600' : 'text-muted-foreground'}`}>
                        {insight.subValue}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Real-time Activity Feed */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Real-Time Activity
                </CardTitle>
                <div className="text-sm text-muted-foreground">
                  Last updated: 2:34 PM
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="max-h-48 overflow-y-auto space-y-4">
                {realtimeActivity.map((activity, index) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b border-border last:border-b-0">
                    <div>
                      <div className="font-semibold text-foreground">
                        {activity.title}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {activity.description}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-semibold ${
                        activity.type === 'new' ? 'text-blue-600' :
                        activity.type === 'success' ? 'text-green-600' :
                        'text-purple-600'
                      }`}>
                        {activity.label}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {activity.sublabel}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default Metrics;