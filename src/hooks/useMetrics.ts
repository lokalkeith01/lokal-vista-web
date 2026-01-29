import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface ContentMetrics {
  totalContent: number;
  totalViews: number;
  totalLikes: number;
  totalShares: number;
  avgWatchTime: number;
  avgCompletionRate: number;
}

export interface ContentItem {
  id: string;
  title: string;
  company_name: string;
  views: number | null;
  likes_count: number;
  shares_count: number;
  created_at: string;
  thumbnail_url: string | null;
}

export interface UserStats {
  totalUsers: number;
  totalBusinesses: number;
  totalContent: number;
}

export interface DailyAnalytics {
  date: string;
  daily_active_users: number | null;
  total_sessions: number | null;
  total_video_views: number | null;
  avg_session_duration_seconds: number | null;
  avg_video_completion_rate: number | null;
}

// Fetch overall content metrics
export const useContentMetrics = () => {
  return useQuery({
    queryKey: ['content-metrics'],
    queryFn: async (): Promise<ContentMetrics> => {
      const { data, error } = await supabase
        .from('content')
        .select('views, likes_count, shares_count, avg_watch_time, completion_rate');

      if (error) throw error;

      const totalContent = data?.length || 0;
      const totalViews = data?.reduce((sum, item) => sum + (item.views || 0), 0) || 0;
      const totalLikes = data?.reduce((sum, item) => sum + (item.likes_count || 0), 0) || 0;
      const totalShares = data?.reduce((sum, item) => sum + (item.shares_count || 0), 0) || 0;
      const avgWatchTime = totalContent > 0 
        ? data?.reduce((sum, item) => sum + (item.avg_watch_time || 0), 0) / totalContent 
        : 0;
      const avgCompletionRate = totalContent > 0 
        ? data?.reduce((sum, item) => sum + (item.completion_rate || 0), 0) / totalContent 
        : 0;

      return {
        totalContent,
        totalViews,
        totalLikes,
        totalShares,
        avgWatchTime,
        avgCompletionRate,
      };
    },
    refetchInterval: 30000, // Refresh every 30 seconds
  });
};

// Fetch recent content with engagement
export const useRecentContent = (limit = 10) => {
  return useQuery({
    queryKey: ['recent-content', limit],
    queryFn: async (): Promise<ContentItem[]> => {
      const { data, error } = await supabase
        .from('content')
        .select('id, title, company_name, views, likes_count, shares_count, created_at, thumbnail_url')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data || [];
    },
    refetchInterval: 30000,
  });
};

// Fetch top performing content
export const useTopContent = (limit = 5) => {
  return useQuery({
    queryKey: ['top-content', limit],
    queryFn: async (): Promise<ContentItem[]> => {
      const { data, error } = await supabase
        .from('content')
        .select('id, title, company_name, views, likes_count, shares_count, created_at, thumbnail_url')
        .order('likes_count', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data || [];
    },
    refetchInterval: 30000,
  });
};

// Fetch user and platform stats
export const useUserStats = () => {
  return useQuery({
    queryKey: ['user-stats'],
    queryFn: async (): Promise<UserStats> => {
      const [profilesRes, businessesRes, contentRes] = await Promise.all([
        supabase.from('profiles').select('id', { count: 'exact', head: true }),
        supabase.from('businesses').select('id', { count: 'exact', head: true }),
        supabase.from('content').select('id', { count: 'exact', head: true }),
      ]);

      return {
        totalUsers: profilesRes.count || 0,
        totalBusinesses: businessesRes.count || 0,
        totalContent: contentRes.count || 0,
      };
    },
    refetchInterval: 60000,
  });
};

// Fetch daily analytics
export const useDailyAnalytics = (days = 7) => {
  return useQuery({
    queryKey: ['daily-analytics', days],
    queryFn: async (): Promise<DailyAnalytics[]> => {
      const { data, error } = await supabase
        .from('daily_analytics')
        .select('date, daily_active_users, total_sessions, total_video_views, avg_session_duration_seconds, avg_video_completion_rate')
        .order('date', { ascending: false })
        .limit(days);

      if (error) throw error;
      return data || [];
    },
    refetchInterval: 60000,
  });
};

// Fetch user's own content metrics (for logged in users)
export const useMyContentMetrics = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['my-content-metrics', user?.id],
    queryFn: async () => {
      if (!user) return null;

      const { data, error } = await supabase
        .from('content')
        .select('id, title, company_name, views, likes_count, shares_count, created_at, thumbnail_url')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const totalViews = data?.reduce((sum, item) => sum + (item.views || 0), 0) || 0;
      const totalLikes = data?.reduce((sum, item) => sum + (item.likes_count || 0), 0) || 0;
      const totalShares = data?.reduce((sum, item) => sum + (item.shares_count || 0), 0) || 0;

      return {
        content: data || [],
        totalContent: data?.length || 0,
        totalViews,
        totalLikes,
        totalShares,
      };
    },
    enabled: !!user,
    refetchInterval: 30000,
  });
};
