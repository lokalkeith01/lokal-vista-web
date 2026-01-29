import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useMyContentMetrics } from "@/hooks/useMetrics";
import { 
  Heart, 
  TrendingUp, 
  Video,
  Share2,
  Eye,
  Activity
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const UserMetricsDashboard = () => {
  const { data: myContent, isLoading } = useMyContentMetrics();

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array(4).fill(0).map((_, i) => (
            <Card key={i}>
              <CardContent className="pt-6">
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-8 w-16" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!myContent || myContent.totalContent === 0) {
    return (
      <div className="text-center py-16">
        <Video className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
        <h2 className="text-xl font-semibold mb-2">No Content Yet</h2>
        <p className="text-muted-foreground">
          Start creating content in the Lokal app to see your metrics here.
        </p>
      </div>
    );
  }

  const stats = [
    {
      title: "Your Videos",
      value: myContent.totalContent,
      icon: Video,
      description: "Content pieces created"
    },
    {
      title: "Total Views",
      value: myContent.totalViews,
      icon: Eye,
      description: "Video views"
    },
    {
      title: "Total Likes",
      value: myContent.totalLikes,
      icon: Heart,
      description: "Community engagement"
    },
    {
      title: "Total Shares",
      value: myContent.totalShares,
      icon: Share2,
      description: "Content shared"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div>
        <h2 className="text-lg font-semibold mb-4 text-foreground">Your Performance</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
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
                    {stat.value.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Content List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Content */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Your Recent Content
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myContent.content.slice(0, 5).map((content) => (
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
          </CardContent>
        </Card>

        {/* Top Performing */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Top Performing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...myContent.content]
                .sort((a, b) => b.likes_count - a.likes_count)
                .slice(0, 5)
                .map((content, index) => (
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserMetricsDashboard;
