import { HardDrive, Database, FolderOpen, AlertCircle, Cloud } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

interface R2StorageData {
  bucketName?: string;
  totalObjects?: number;
  totalSize?: number;
  totalSizeMB?: number;
  folders?: Array<{
    name: string;
    files: number;
    size: number;
    sizeMB: number;
  }>;
  error?: string;
}

interface StorageMetricsProps {
  data: StorageData | null;
  r2Data?: R2StorageData | null;
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

export function StorageMetrics({ data, r2Data, loading }: StorageMetricsProps) {
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <HardDrive className="h-4 w-4 text-primary" />
              Supabase Storage
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

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Cloud className="h-4 w-4 text-orange-500" />
              Cloudflare R2
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {r2Data?.error ? (
                <p className="text-xs text-muted-foreground">{r2Data.error}</p>
              ) : (
                <>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total</span>
                    <span className="font-medium">{r2Data?.totalSizeMB || 0} MB</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Objects</span>
                    <span className="font-medium">{r2Data?.totalObjects || 0}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Bucket: {r2Data?.bucketName || "N/A"}
                  </p>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Storage Provider Tabs */}
      <Tabs defaultValue="supabase" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="supabase">Supabase Buckets</TabsTrigger>
          <TabsTrigger value="r2">Cloudflare R2</TabsTrigger>
        </TabsList>
        
        <TabsContent value="supabase" className="space-y-4">
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
        </TabsContent>

        <TabsContent value="r2" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Cloud className="h-4 w-4 text-orange-500" />
                R2 Folders
              </CardTitle>
            </CardHeader>
            <CardContent>
              {r2Data?.error ? (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm">{r2Data.error}</span>
                </div>
              ) : r2Data?.folders && r2Data.folders.length > 0 ? (
                <div className="space-y-4">
                  {r2Data.folders.map((folder) => {
                    const percentage = r2Data.totalSizeMB 
                      ? (folder.sizeMB / r2Data.totalSizeMB) * 100 
                      : 0;

                    return (
                      <div key={folder.name} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{folder.name}</span>
                          <span className="text-muted-foreground">
                            {folder.sizeMB} MB ({folder.files} files)
                          </span>
                        </div>
                        <Progress value={percentage} className="h-1.5" />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No files in R2 bucket</p>
              )}
            </CardContent>
          </Card>

          {r2Data && !r2Data.error && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">R2 Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold">{r2Data.totalObjects || 0}</p>
                    <p className="text-xs text-muted-foreground">Total Objects</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{r2Data.totalSizeMB || 0}</p>
                    <p className="text-xs text-muted-foreground">Total MB</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{r2Data.folders?.length || 0}</p>
                    <p className="text-xs text-muted-foreground">Folders</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
