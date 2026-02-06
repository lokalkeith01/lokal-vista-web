import { AlertTriangle, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format, parseISO, formatDistanceToNow } from "date-fns";

interface Incident {
  id: string;
  name: string;
  cause: string;
  startedAt: string;
  resolvedAt: string | null;
  isResolved: boolean;
}

interface ErrorData {
  recentErrors: Array<{
    timestamp: string;
    message: string;
    type: string;
  }>;
  errorRate: number;
  note: string;
}

interface ErrorTrackingProps {
  incidents: Incident[];
  errorData: ErrorData | null;
  loading?: boolean;
}

export function ErrorTracking({ incidents, errorData, loading }: ErrorTrackingProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-24 bg-muted animate-pulse rounded-lg" />
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  const recentIncidents = incidents.slice(0, 5);
  const hasActiveIncidents = incidents.some((i) => !i.isResolved);
  const resolvedCount = incidents.filter((i) => i.isResolved).length;

  return (
    <div className="space-y-6">
      {/* Incident Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className={hasActiveIncidents ? "border-red-500/50" : "border-green-500/50"}>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              {hasActiveIncidents ? (
                <XCircle className="h-8 w-8 text-red-500" />
              ) : (
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              )}
              <div>
                <p className="text-sm font-medium">
                  {hasActiveIncidents ? "Active Incidents" : "All Systems Normal"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {hasActiveIncidents
                    ? `${incidents.filter((i) => !i.isResolved).length} ongoing`
                    : "No active incidents"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold">{incidents.length}</p>
                <p className="text-xs text-muted-foreground">Total Incidents</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{resolvedCount}</p>
                <p className="text-xs text-muted-foreground">Resolved</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Incidents */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-primary" />
            Recent Incidents
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentIncidents.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <CheckCircle2 className="h-12 w-12 mx-auto mb-3 text-green-500" />
              <p className="font-medium">No recent incidents</p>
              <p className="text-sm">All systems have been running smoothly</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentIncidents.map((incident) => (
                <div
                  key={incident.id}
                  className={`p-3 rounded-lg border ${
                    incident.isResolved
                      ? "bg-muted/50 border-border"
                      : "bg-red-500/5 border-red-500/20"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {incident.isResolved ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                        )}
                        <p className="text-sm font-medium truncate">{incident.name}</p>
                      </div>
                      <p className="text-xs text-muted-foreground ml-6">
                        {incident.cause || "No details available"}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <Badge
                        variant={incident.isResolved ? "secondary" : "destructive"}
                        className="text-xs"
                      >
                        {incident.isResolved ? "Resolved" : "Active"}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDistanceToNow(parseISO(incident.startedAt), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                  </div>
                  {incident.resolvedAt && (
                    <p className="text-xs text-green-600 ml-6 mt-2">
                      Resolved {format(parseISO(incident.resolvedAt), "MMM d, h:mm a")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edge Function Errors Note */}
      {errorData?.note && (
        <Card className="bg-muted/50">
          <CardContent className="pt-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Edge Function Monitoring</p>
                <p className="text-xs text-muted-foreground mt-1">{errorData.note}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
