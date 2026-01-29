import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useInfluencerMetrics } from "@/hooks/usePersonaMetrics";
import { 
  Users, 
  UserCheck,
  Calendar,
  TrendingUp,
  Instagram,
  MapPin
} from "lucide-react";

const InfluencerMetricsDashboard = () => {
  const { data: metrics, isLoading } = useInfluencerMetrics();

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
      title: "Total Influencers",
      value: metrics?.totalInfluencers || 0,
      icon: Users,
      description: "Registered creators"
    },
    {
      title: "Active Influencers",
      value: metrics?.activeInfluencers || 0,
      icon: UserCheck,
      description: "Currently active"
    },
    {
      title: "Combined Reach",
      value: metrics?.totalFollowers || 0,
      icon: TrendingUp,
      description: "Social followers"
    },
    {
      title: "Total Bookings",
      value: metrics?.totalBookings || 0,
      icon: Calendar,
      description: "Campaign bookings"
    }
  ];

  const formatFollowers = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div>
        <h2 className="text-lg font-semibold mb-4 text-foreground">Influencer Overview</h2>
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

      {/* Influencer List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Top Influencers by Reach
          </CardTitle>
        </CardHeader>
        <CardContent>
          {metrics?.influencers && metrics.influencers.length > 0 ? (
            <div className="space-y-4">
              {metrics.influencers.slice(0, 10).map((influencer, index) => (
                <div key={influencer.id} className="flex justify-between items-center py-3 border-b border-border last:border-b-0">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-muted-foreground w-6">
                      #{index + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-foreground">
                          {influencer.full_name}
                        </h4>
                        {influencer.is_active && (
                          <Badge variant="secondary" className="text-xs">Active</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {influencer.location}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {influencer.instagram_followers && (
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Instagram className="w-3 h-3" />
                        {formatFollowers(influencer.instagram_followers)}
                      </Badge>
                    )}
                    {influencer.primary_categories?.slice(0, 2).map((cat, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">No influencers registered yet</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InfluencerMetricsDashboard;
