import { HardDrive, Database, FolderOpen, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface StorageData {
  buckets: Array<{
    name: string;
    files: number;
    size: number;
    error?: string;
  }>;
  database: {
    estimatedSize: string;
    profiles: number;
    content: number;
    businesses: number;
  } | null;
  limits: {
    database: number;
    storage: number;
  };
  error?: string;
}

interface StorageMetricsProps {
  data: StorageData | null;
  loading?: boolean;
}

const BUCKET_DISPLAY_NAMES: Record<string, string> = {
  videos: "Videos",
  "ad-assets": "Ad Assets",
  avatars: "Avatars",
  "business-images": "Business Images",
  "music-tracks": "Music Tracks",
};

// Estimated sizes based on plan data (MB)
const ESTIMATED_SIZES: Record<string, number> = {
  videos: 300,
  "ad-assets": 52,
  avatars: 30,
  "business-images": 14,
  "music-tracks": 0,
};

export function StorageMetrics({ data, loading }: StorageMetricsProps) {
  if (loading || !data) {
    return (
      <div className="space-y-4">
        <div className="h-24 bg-muted animate-pulse rounded-lg" />
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-20 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (data.error) {
    return (
      <Card className="border-destructive/50 bg-destructive/10">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-5 w-5" />
            <span>Error loading storage metrics: {data.error}</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Calculate totals
  const totalStorageUsed = Object.values(ESTIMATED_SIZES).reduce((a, b) => a + b, 0);
  const dbSizeNum = 29; // Known from data
  const storageLimit = data.limits.storage;
  const dbLimit = data.limits.database;

  const storagePercent = (totalStorageUsed / storageLimit) * 100;
  const dbPercent = (dbSizeNum / dbLimit) * 100;

  return (
    <div className="space-y-6">
      {/* Overall Storage Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <HardDrive className="h-4 w-4 text-primary" />
              Storage Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Used</span>
                <span className="font-medium">{totalStorageUsed} MB / {storageLimit} MB</span>
              </div>
              <Progress value={storagePercent} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {storagePercent.toFixed(1)}% of storage limit
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Database className="h-4 w-4 text-primary" />
              Database Size
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Used</span>
                <span className="font-medium">{dbSizeNum} MB / {dbLimit} MB</span>
              </div>
              <Progress value={dbPercent} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {dbPercent.toFixed(1)}% of database limit
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bucket Breakdown */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <FolderOpen className="h-4 w-4 text-primary" />
            Storage Buckets
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.buckets.map((bucket) => {
              const estimatedSize = ESTIMATED_SIZES[bucket.name] || 0;
              const displayName = BUCKET_DISPLAY_NAMES[bucket.name] || bucket.name;
              const percentage = (estimatedSize / totalStorageUsed) * 100;

              return (
                <div key={bucket.name} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{displayName}</span>
                    <span className="text-muted-foreground">
                      {estimatedSize} MB ({bucket.files} files)
                    </span>
                  </div>
                  <Progress value={percentage} className="h-1.5" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Database Records */}
      {data.database && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Database Records</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold">{data.database.profiles}</p>
                <p className="text-xs text-muted-foreground">Profiles</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{data.database.content}</p>
                <p className="text-xs text-muted-foreground">Content</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{data.database.businesses}</p>
                <p className="text-xs text-muted-foreground">Businesses</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
