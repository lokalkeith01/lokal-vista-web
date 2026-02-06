import { Monitor, Gauge, MousePointer, LayoutDashboard, Server, Activity } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useWebVitals, type WebVitalsRating } from "@/hooks/useWebVitals";

const VITAL_INFO: Record<string, { icon: typeof Monitor; description: string; fullName: string }> = {
  LCP: {
    icon: Monitor,
    fullName: "Largest Contentful Paint",
    description: "Time until the largest content element is visible",
  },
  FCP: {
    icon: LayoutDashboard,
    fullName: "First Contentful Paint",
    description: "Time until first content is painted",
  },
  CLS: {
    icon: Gauge,
    fullName: "Cumulative Layout Shift",
    description: "Visual stability - how much content shifts",
  },
  INP: {
    icon: MousePointer,
    fullName: "Interaction to Next Paint",
    description: "Responsiveness to user interactions",
  },
  TTFB: {
    icon: Server,
    fullName: "Time to First Byte",
    description: "Server response time",
  },
};

const getRatingColor = (rating: WebVitalsRating["rating"]) => {
  switch (rating) {
    case "good":
      return "bg-green-500/10 text-green-500 border-green-500/20";
    case "needs-improvement":
      return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
    case "poor":
      return "bg-red-500/10 text-red-500 border-red-500/20";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getRatingBgColor = (rating: WebVitalsRating["rating"]) => {
  switch (rating) {
    case "good":
      return "bg-green-500";
    case "needs-improvement":
      return "bg-yellow-500";
    case "poor":
      return "bg-red-500";
    default:
      return "bg-muted";
  }
};

const formatValue = (value: number | null, unit: string, name: string): string => {
  if (value === null) return "—";
  if (name === "CLS") return value.toFixed(3);
  return `${Math.round(value)}${unit}`;
};

interface WebVitalsCardProps {
  compact?: boolean;
}

export function WebVitalsCard({ compact = false }: WebVitalsCardProps) {
  const { getVitalsWithRatings, getOverallRating } = useWebVitals();
  const vitals = getVitalsWithRatings();
  const overallRating = getOverallRating();

  // Count metrics by rating
  const goodCount = vitals.filter((v) => v.rating === "good").length;
  const needsImprovementCount = vitals.filter((v) => v.rating === "needs-improvement").length;
  const poorCount = vitals.filter((v) => v.rating === "poor").length;
  const measuredCount = vitals.filter((v) => v.rating !== "unknown").length;

  if (compact) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              Frontend Performance
            </CardTitle>
            <Badge className={getRatingColor(overallRating)}>
              {overallRating === "unknown" ? "Measuring..." : overallRating.replace("-", " ")}
            </Badge>
          </div>
          <CardDescription className="text-xs">
            Core Web Vitals • {measuredCount}/5 measured
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-5 gap-1">
            {vitals.map((vital) => {
              const info = VITAL_INFO[vital.name];
              const Icon = info.icon;
              return (
                <TooltipProvider key={vital.name}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex flex-col items-center p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-help">
                        <div className={`p-1.5 rounded-full mb-1 ${getRatingBgColor(vital.rating)}/10`}>
                          <Icon className={`h-3 w-3 ${getRatingColor(vital.rating).split(" ")[1]}`} />
                        </div>
                        <span className="text-[10px] font-medium text-muted-foreground">
                          {vital.name}
                        </span>
                        <span className={`text-xs font-bold ${getRatingColor(vital.rating).split(" ")[1]}`}>
                          {formatValue(vital.value, vital.unit, vital.name)}
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="max-w-xs">
                      <p className="font-medium">{info.fullName}</p>
                      <p className="text-xs text-muted-foreground">{info.description}</p>
                      <div className="text-xs mt-1">
                        <span className="text-green-500">Good: ≤{vital.thresholds.good}{vital.unit}</span>
                        {" • "}
                        <span className="text-red-500">Poor: {">"}{vital.thresholds.poor}{vital.unit}</span>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </div>
          
          {/* Summary bar */}
          <div className="mt-3 flex items-center gap-2 text-[10px]">
            <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden flex">
              {goodCount > 0 && (
                <div 
                  className="bg-green-500 h-full" 
                  style={{ width: `${(goodCount / 5) * 100}%` }}
                />
              )}
              {needsImprovementCount > 0 && (
                <div 
                  className="bg-yellow-500 h-full" 
                  style={{ width: `${(needsImprovementCount / 5) * 100}%` }}
                />
              )}
              {poorCount > 0 && (
                <div 
                  className="bg-red-500 h-full" 
                  style={{ width: `${(poorCount / 5) * 100}%` }}
                />
              )}
            </div>
            <span className="text-muted-foreground whitespace-nowrap">
              {goodCount} good • {needsImprovementCount + poorCount} issues
            </span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              Core Web Vitals
            </CardTitle>
            <CardDescription className="text-xs mt-1">
              Real user performance metrics for this session
            </CardDescription>
          </div>
          <Badge className={getRatingColor(overallRating)}>
            {overallRating === "unknown" ? "Measuring..." : overallRating.replace("-", " ")}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {vitals.map((vital) => {
            const info = VITAL_INFO[vital.name];
            const Icon = info.icon;
            const percentage = vital.value !== null
              ? Math.min(100, (vital.value / vital.thresholds.poor) * 100)
              : 0;

            return (
              <div key={vital.name} className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{info.fullName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-bold ${getRatingColor(vital.rating).split(" ")[1]}`}>
                      {formatValue(vital.value, vital.unit, vital.name)}
                    </span>
                    <Badge variant="outline" className={`text-[10px] ${getRatingColor(vital.rating)}`}>
                      {vital.rating === "unknown" ? "pending" : vital.rating}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${getRatingBgColor(vital.rating)}`}
                      style={{ width: vital.value !== null ? `${Math.min(100, percentage)}%` : "0%" }}
                    />
                  </div>
                  <span className="text-[10px] text-muted-foreground w-16 text-right">
                    ≤{vital.thresholds.good}{vital.unit} good
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
