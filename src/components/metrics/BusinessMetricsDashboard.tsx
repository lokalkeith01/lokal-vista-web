import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useBusinessMetrics } from "@/hooks/usePersonaMetrics";
import { 
  Building2, 
  Users, 
  Video,
  Star,
  CheckCircle,
  TrendingUp
} from "lucide-react";

const BusinessMetricsDashboard = () => {
  const { data: metrics, isLoading } = useBusinessMetrics();

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

  const stats = [
    {
      title: "Total Businesses",
      value: metrics?.totalBusinesses || 0,
      icon: Building2,
      description: "Registered on platform"
    },
    {
      title: "Claimed Businesses",
      value: metrics?.claimedBusinesses || 0,
      icon: CheckCircle,
      description: "Verified owners"
    },
    {
      title: "Total Followers",
      value: metrics?.totalFollowers || 0,
      icon: Users,
      description: "Across all businesses"
    },
    {
      title: "Content Created",
      value: metrics?.totalContent || 0,
      icon: Video,
      description: "Business videos"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div>
        <h2 className="text-lg font-semibold mb-4 text-foreground">Business Overview</h2>
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

      {/* Top Businesses */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Top Businesses by Followers
          </CardTitle>
        </CardHeader>
        <CardContent>
          {metrics?.businesses && metrics.businesses.length > 0 ? (
            <div className="space-y-4">
              {metrics.businesses.slice(0, 10).map((business, index) => (
                <div key={business.id} className="flex justify-between items-center py-3 border-b border-border last:border-b-0">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-muted-foreground w-6">
                      #{index + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-foreground line-clamp-1">
                          {business.name}
                        </h4>
                        {business.is_claimed && (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {business.category || 'Uncategorized'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {business.rating && (
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        {business.rating.toFixed(1)}
                      </Badge>
                    )}
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {business.followers_count || 0}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">No businesses yet</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessMetricsDashboard;
