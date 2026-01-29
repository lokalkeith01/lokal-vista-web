import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useOwnerBusinessMetrics } from "@/hooks/usePersonaMetrics";
import { 
  Building2, 
  Users, 
  Video,
  Eye,
  Star,
  CheckCircle,
  TrendingUp,
  Megaphone,
  MousePointer,
  Heart,
  ExternalLink,
  Phone,
  Globe,
  MapPin
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const OwnerBusinessDashboard = () => {
  const { data: metrics, isLoading } = useOwnerBusinessMetrics();

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

  if (!metrics?.business) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <Building2 className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Business Claimed</h3>
          <p className="text-muted-foreground mb-4">
            You haven't claimed a business yet. Claim your business to see your metrics here.
          </p>
          <Button onClick={() => window.location.href = '/services'}>
            Learn How to Claim Your Business
          </Button>
        </CardContent>
      </Card>
    );
  }

  const { business, followers, contentViews, recentContent, campaignStats } = metrics;

  const stats = [
    {
      title: "Followers",
      value: followers,
      icon: Users,
      description: "People following your business"
    },
    {
      title: "Content Views",
      value: contentViews,
      icon: Eye,
      description: "Total video views"
    },
    {
      title: "Active Campaigns",
      value: campaignStats.active,
      icon: Megaphone,
      description: "Running promotions"
    },
    {
      title: "Campaign Clicks",
      value: campaignStats.totalClicks,
      icon: MousePointer,
      description: "Total ad clicks"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Business Header */}
      <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <CardTitle className="text-2xl">{business.name}</CardTitle>
                {business.is_claimed && (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
              <CardDescription className="flex flex-wrap items-center gap-4 text-sm">
                {business.category && (
                  <span className="flex items-center gap-1">
                    <Building2 className="w-4 h-4" />
                    {business.category}
                  </span>
                )}
                {business.address && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {business.address}
                  </span>
                )}
                {business.rating && (
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    {business.rating.toFixed(1)}
                  </span>
                )}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {business.phone && (
                <Button variant="outline" size="sm" asChild>
                  <a href={`tel:${business.phone}`}>
                    <Phone className="w-4 h-4 mr-1" />
                    Call
                  </a>
                </Button>
              )}
              {business.website && (
                <Button variant="outline" size="sm" asChild>
                  <a href={business.website} target="_blank" rel="noopener noreferrer">
                    <Globe className="w-4 h-4 mr-1" />
                    Website
                  </a>
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        {business.description && (
          <CardContent className="pt-0">
            <p className="text-muted-foreground">{business.description}</p>
          </CardContent>
        )}
      </Card>

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

      {/* Campaign Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Megaphone className="w-5 h-5" />
            Campaign Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-foreground">
                {campaignStats.active}
              </div>
              <p className="text-sm text-muted-foreground">Active Campaigns</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">
                {campaignStats.totalImpressions.toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground">Total Impressions</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">
                {campaignStats.totalImpressions > 0 
                  ? ((campaignStats.totalClicks / campaignStats.totalImpressions) * 100).toFixed(2)
                  : '0.00'}%
              </div>
              <p className="text-sm text-muted-foreground">Click-Through Rate</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="w-5 h-5" />
            Your Recent Content
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentContent.length > 0 ? (
            <div className="space-y-4">
              {recentContent.map((content) => (
                <div key={content.id} className="flex justify-between items-center py-3 border-b border-border last:border-b-0">
                  <div>
                    <h4 className="font-semibold text-foreground line-clamp-1">
                      {content.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(content.created_at), { addSuffix: true })}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Eye className="w-4 h-4" />
                      <span className="text-sm">{content.views || 0}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">{content.likes_count}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">
              No content yet. Create your first video to see it here!
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OwnerBusinessDashboard;
