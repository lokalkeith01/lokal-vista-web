import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import { Cloud } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const formatFlagName = (name: string) =>
  name.split("_").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

const FeatureFlagsSection = () => {
  const queryClient = useQueryClient();

  const { data: flags, isLoading } = useQuery({
    queryKey: ["feature-flags"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("feature_flags")
        .select("*")
        .order("name");
      if (error) throw error;
      return data;
    },
  });

  const toggleMutation = useMutation({
    mutationFn: async ({ id, enabled }: { id: string; enabled: boolean }) => {
      const { error } = await supabase
        .from("feature_flags")
        .update({ enabled, updated_at: new Date().toISOString() })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feature-flags"] });
      toast({ title: "Feature flag updated" });
    },
    onError: () => {
      toast({ title: "Failed to update flag", variant: "destructive" });
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Feature Flags</h2>
        {[1, 2, 3].map(i => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Feature Flags</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Toggle Cloud Run backend services on or off in real time.
        </p>
      </div>

      <div className="space-y-4">
        {flags?.map(flag => (
          <Card key={flag.id}>
            <CardContent className="flex items-center justify-between p-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 rounded-md bg-muted p-2">
                  <Cloud className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">
                      {formatFlagName(flag.name)}
                    </span>
                    <Badge variant="secondary" className="text-xs">Cloud Run</Badge>
                  </div>
                  {flag.description && (
                    <p className="text-sm text-muted-foreground">{flag.description}</p>
                  )}
                  {flag.updated_at && (
                    <p className="text-xs text-muted-foreground">
                      Last updated: {formatDistanceToNow(new Date(flag.updated_at), { addSuffix: true })}
                    </p>
                  )}
                </div>
              </div>
              <Switch
                checked={flag.enabled ?? false}
                onCheckedChange={(checked) =>
                  toggleMutation.mutate({ id: flag.id, enabled: checked })
                }
                disabled={toggleMutation.isPending}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeatureFlagsSection;
