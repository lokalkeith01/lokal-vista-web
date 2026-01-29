import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  useContentMetrics, 
  useRecentContent, 
  useTopContent, 
  useUserStats,
  useMyContentMetrics 
} from "@/hooks/useMetrics";
import { 
  BarChart3, 
  Users, 
  Clock, 
  Heart, 
  TrendingUp, 
  MapPin, 
  Target,
  Settings,
  FileText,
  Activity,
  Radio,
  Video,
  Share2,
  Eye,
  Building2
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const Metrics = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const { data: contentMetrics, isLoading: isLoadingContent } = useContentMetrics();
  const { data: recentContent, isLoading: isLoadingRecent } = useRecentContent(5);
  const { data: topContent, isLoading: isLoadingTop } = useTopContent(5);
  const { data: userStats, isLoading: isLoadingStats } = useUserStats();
  const { data: myContent, isLoading: isLoadingMy } = useMyContentMetrics();

  const stats = [
    {
      title: "Total Videos",
      value: contentMetrics?.totalContent || 0,
      icon: Video,
      description: "Content pieces created"
    },
    {
      title: "Total Likes",
      value: contentMetrics?.totalLikes || 0,
      icon: Heart,
      description: "Community engagement"
    },
    {
      title: "Total Shares",
      value: contentMetrics?.totalShares || 0,
      icon: Share2,
      description: "Content shared"
    },
    {
      title: "Total Users",
      value: userStats?.totalUsers || 0,
      icon: Users,
      description: "Community members"
    }
  ];

  const platformStats = [
    {
      title: "Local Businesses",
      value: userStats?.totalBusinesses || 0,
      icon: Building2,
      description: "Featured on Lokal"
    },
    {
      title: "Content Pieces",
      value: userStats?.totalContent || 0,
      icon: Video,
      description: "Videos & stories"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-background border-r border-border min-h-screen p-4 hidden lg:block">
          <div className="text-xl font-bold mb-8 text-foreground">
            Lokal Metrics
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
        <main className="flex-1 p-4 md:p-8">
          {/* Header */}
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-4 border-b-2 border-border">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">
                Welcome back{user?.email ? `, ${user.email.split('@')[0]}` : ''}!
              </h1>
              <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-800 rounded-lg text-sm font-medium">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Live Data
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </header>

          {/* Your Content Stats (if user has content) */}
          {myContent && myContent.totalContent > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4 text-foreground">Your Content Performance</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <Video className="w-4 h-4" />
                      <span className="text-sm">Your Videos</span>
                    </div>
                    <div className="text-2xl font-bold">{myContent.totalContent}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">Total Likes</span>
                    </div>
                    <div className="text-2xl font-bold">{myContent.totalLikes}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <Share2 className="w-4 h-4" />
                      <span className="text-sm">Total Shares</span>
                    </div>
                    <div className="text-2xl font-bold">{myContent.totalShares}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <Eye className="w-4 h-4" />
                      <span className="text-sm">Total Views</span>
                    </div>
                    <div className="text-2xl font-bold">{myContent.totalViews}</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Platform Stats Grid */}
          <h2 className="text-lg font-semibold mb-4 text-foreground">Platform Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
            {isLoadingContent || isLoadingStats ? (
              Array(4).fill(0).map((_, i) => (
                <Card key={i}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-4" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-8 w-16 mb-2" />
                    <Skeleton className="h-3 w-20" />
                  </CardContent>
                </Card>
              ))
            ) : (
              stats.map((stat, index) => {
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
                        {stat.value.toLocaleString()}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {stat.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Recent Content */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Recent Content
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingRecent ? (
                  <div className="space-y-4">
                    {Array(5).fill(0).map((_, i) => (
                      <div key={i} className="flex justify-between items-center py-3 border-b border-border">
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-48" />
                          <Skeleton className="h-3 w-32" />
                        </div>
                        <Skeleton className="h-6 w-16" />
                      </div>
                    ))}
                  </div>
                ) : recentContent && recentContent.length > 0 ? (
                  <div className="space-y-4">
                    {recentContent.map((content) => (
                      <div key={content.id} className="flex justify-between items-center py-3 border-b border-border last:border-b-0">
                        <div>
                          <h4 className="font-semibold text-foreground mb-1 line-clamp-1">
                            {content.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {content.company_name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(content.created_at), { addSuffix: true })}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            {content.likes_count}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">No content yet</p>
                )}
              </CardContent>
            </Card>

            {/* Top Performing Content */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Top Performing Content
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingTop ? (
                  <div className="space-y-4">
                    {Array(5).fill(0).map((_, i) => (
                      <div key={i} className="flex justify-between items-center py-3 border-b border-border">
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-48" />
                          <Skeleton className="h-3 w-32" />
                        </div>
                        <Skeleton className="h-6 w-16" />
                      </div>
                    ))}
                  </div>
                ) : topContent && topContent.length > 0 ? (
                  <div className="space-y-4">
                    {topContent.map((content, index) => (
                      <div key={content.id} className="flex justify-between items-center py-3 border-b border-border last:border-b-0">
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-bold text-muted-foreground">
                            #{index + 1}
                          </span>
                          <div>
                            <h4 className="font-semibold text-foreground mb-1 line-clamp-1">
                              {content.title}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {content.company_name}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="default" className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            {content.likes_count}
                          </Badge>
                          {content.shares_count > 0 && (
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Share2 className="w-3 h-3" />
                              {content.shares_count}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">No content yet</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Platform Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Platform Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <Building2 className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold">{userStats?.totalBusinesses || 0}</div>
                  <p className="text-sm text-muted-foreground">Local Businesses</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <Users className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold">{userStats?.totalUsers || 0}</div>
                  <p className="text-sm text-muted-foreground">Community Members</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <Video className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold">{contentMetrics?.totalContent || 0}</div>
                  <p className="text-sm text-muted-foreground">Videos Created</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <Heart className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold">{contentMetrics?.totalLikes || 0}</div>
                  <p className="text-sm text-muted-foreground">Total Engagement</p>
                </div>
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
