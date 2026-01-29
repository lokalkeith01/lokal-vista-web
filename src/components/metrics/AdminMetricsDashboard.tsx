import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  useContentMetrics, 
  useRecentContent, 
  useTopContent, 
  useUserStats 
} from "@/hooks/useMetrics";
import { 
  BarChart3, 
  Users, 
  Heart, 
  TrendingUp, 
  Activity,
  Video,
  Share2,
  Building2
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const AdminMetricsDashboard = () => {
  const { data: contentMetrics, isLoading: isLoadingContent } = useContentMetrics();
  const { data: recentContent, isLoading: isLoadingRecent } = useRecentContent(5);
  const { data: topContent, isLoading: isLoadingTop } = useTopContent(5);
  const { data: userStats, isLoading: isLoadingStats } = useUserStats();

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

  return (
    <div className="space-y-8">
      {/* Platform Stats Grid */}
      <div>
        <h2 className="text-lg font-semibold mb-4 text-foreground">Platform Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
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
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
    </div>
  );
};

export default AdminMetricsDashboard;
