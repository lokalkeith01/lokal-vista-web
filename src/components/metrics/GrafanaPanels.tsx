import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Settings } from "lucide-react";

interface GrafanaPanel {
  title: string;
  embedUrl: string;
  height?: number;
}

const GRAFANA_PANELS: GrafanaPanel[] = [
  {
    title: "Database Connections",
    embedUrl: "", // Replace with your Grafana Cloud embed URL
    height: 300,
  },
  {
    title: "API Request Rate",
    embedUrl: "", // Replace with your Grafana Cloud embed URL
    height: 300,
  },
  {
    title: "Storage Usage",
    embedUrl: "", // Replace with your Grafana Cloud embed URL
    height: 300,
  },
  {
    title: "Auth Events",
    embedUrl: "", // Replace with your Grafana Cloud embed URL
    height: 300,
  },
];

const GRAFANA_DASHBOARD_URL = ""; // Replace with your Grafana Cloud dashboard URL

const GrafanaPanels = () => {
  const hasAnyPanels = GRAFANA_PANELS.some((p) => p.embedUrl);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <img
            src="https://grafana.com/static/assets/img/fav32.png"
            alt="Grafana"
            className="w-5 h-5"
          />
          Grafana Monitoring
        </h2>
        <div className="flex items-center gap-2">
          {!hasAnyPanels && (
            <Badge variant="outline" className="text-muted-foreground">
              <Settings className="w-3 h-3 mr-1" />
              Configure URLs
            </Badge>
          )}
          {GRAFANA_DASHBOARD_URL && (
            <a
              href={GRAFANA_DASHBOARD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              Open Dashboard
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {GRAFANA_PANELS.map((panel, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {panel.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {panel.embedUrl ? (
                <iframe
                  src={panel.embedUrl}
                  width="100%"
                  height={panel.height || 300}
                  frameBorder="0"
                  className="rounded-md"
                  title={panel.title}
                />
              ) : (
                <div
                  className="flex flex-col items-center justify-center bg-muted/30 rounded-md border border-dashed border-border text-muted-foreground text-sm"
                  style={{ height: panel.height || 300 }}
                >
                  <Settings className="w-8 h-8 mb-2 opacity-40" />
                  <p className="font-medium">Panel not configured</p>
                  <p className="text-xs mt-1 max-w-[200px] text-center">
                    Add your Grafana embed URL in{" "}
                    <code className="text-xs bg-muted px-1 rounded">GrafanaPanels.tsx</code>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GrafanaPanels;
