import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

// Business metrics
export interface BusinessMetrics {
  totalBusinesses: number;
  claimedBusinesses: number;
  totalFollowers: number;
  totalContent: number;
  businesses: Array<{
    id: string;
    name: string;
    category: string | null;
    followers_count: number | null;
    content_count: number | null;
    rating: number | null;
    is_claimed: boolean | null;
  }>;
}

export const useBusinessMetrics = () => {
  return useQuery({
    queryKey: ['business-metrics'],
    queryFn: async (): Promise<BusinessMetrics> => {
      const { data, error } = await supabase
        .from('businesses')
        .select('id, name, category, followers_count, content_count, rating, is_claimed')
        .order('followers_count', { ascending: false });

      if (error) throw error;

      const businesses = data || [];
      const totalBusinesses = businesses.length;
      const claimedBusinesses = businesses.filter(b => b.is_claimed).length;
      const totalFollowers = businesses.reduce((sum, b) => sum + (b.followers_count || 0), 0);
      const totalContent = businesses.reduce((sum, b) => sum + (b.content_count || 0), 0);

      return {
        totalBusinesses,
        claimedBusinesses,
        totalFollowers,
        totalContent,
        businesses,
      };
    },
    refetchInterval: 30000,
  });
};

// Owner-specific business metrics (for logged-in business owners)
export interface OwnerBusinessMetrics {
  business: {
    id: string;
    name: string;
    address: string | null;
    category: string | null;
    followers_count: number | null;
    content_count: number | null;
    rating: number | null;
    is_claimed: boolean | null;
    verification_status: string | null;
    phone: string | null;
    website: string | null;
    description: string | null;
  } | null;
  followers: number;
  contentViews: number;
  recentContent: Array<{
    id: string;
    title: string;
    views: number | null;
    likes_count: number;
    created_at: string;
  }>;
  campaignStats: {
    active: number;
    totalImpressions: number;
    totalClicks: number;
  };
}

export const useOwnerBusinessMetrics = () => {
  return useQuery({
    queryKey: ['owner-business-metrics'],
    queryFn: async (): Promise<OwnerBusinessMetrics> => {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Fetch the business owned by this user
      const { data: business, error: bizError } = await supabase
        .from('businesses')
        .select('id, name, address, category, followers_count, content_count, rating, is_claimed, verification_status, phone, website, description')
        .eq('owner_id', user.id)
        .single();

      if (bizError && bizError.code !== 'PGRST116') throw bizError;

      if (!business) {
        return {
          business: null,
          followers: 0,
          contentViews: 0,
          recentContent: [],
          campaignStats: { active: 0, totalImpressions: 0, totalClicks: 0 },
        };
      }

      // Fetch content for this business
      const { data: content } = await supabase
        .from('content')
        .select('id, title, views, likes_count, created_at')
        .eq('company_name', business.name)
        .order('created_at', { ascending: false })
        .limit(10);

      // Fetch campaigns for this business
      const { data: campaigns } = await supabase
        .from('campaigns')
        .select('id, is_active, total_impressions, total_clicks')
        .eq('business_id', business.id);

      const activeCampaigns = campaigns?.filter(c => c.is_active) || [];
      const totalImpressions = campaigns?.reduce((sum, c) => sum + (c.total_impressions || 0), 0) || 0;
      const totalClicks = campaigns?.reduce((sum, c) => sum + (c.total_clicks || 0), 0) || 0;

      const contentViews = content?.reduce((sum, c) => sum + (c.views || 0), 0) || 0;

      return {
        business,
        followers: business.followers_count || 0,
        contentViews,
        recentContent: content || [],
        campaignStats: {
          active: activeCampaigns.length,
          totalImpressions,
          totalClicks,
        },
      };
    },
    refetchInterval: 30000,
  });
};

// Influencer metrics
export interface InfluencerMetrics {
  totalInfluencers: number;
  activeInfluencers: number;
  totalFollowers: number;
  totalBookings: number;
  influencers: Array<{
    id: string;
    full_name: string;
    location: string;
    primary_categories: string[];
    instagram_followers: number | null;
    tiktok_followers: number | null;
    is_active: boolean | null;
  }>;
}

export const useInfluencerMetrics = () => {
  return useQuery({
    queryKey: ['influencer-metrics'],
    queryFn: async (): Promise<InfluencerMetrics> => {
      const [profilesRes, bookingsRes] = await Promise.all([
        supabase
          .from('influencer_profiles')
          .select('id, full_name, location, primary_categories, instagram_followers, tiktok_followers, is_active')
          .order('instagram_followers', { ascending: false }),
        supabase
          .from('influencer_bookings')
          .select('id', { count: 'exact', head: true }),
      ]);

      if (profilesRes.error) throw profilesRes.error;

      const influencers = profilesRes.data || [];
      const totalInfluencers = influencers.length;
      const activeInfluencers = influencers.filter(i => i.is_active).length;
      const totalFollowers = influencers.reduce((sum, i) => 
        sum + (i.instagram_followers || 0) + (i.tiktok_followers || 0), 0);

      return {
        totalInfluencers,
        activeInfluencers,
        totalFollowers,
        totalBookings: bookingsRes.count || 0,
        influencers,
      };
    },
    refetchInterval: 30000,
  });
};

// Musician metrics
export interface MusicianMetrics {
  totalMusicians: number;
  activeMusicians: number;
  totalTracks: number;
  totalPlays: number;
  musicians: Array<{
    id: string;
    full_name: string;
    location: string | null;
    genres: string[];
    total_plays: number | null;
    total_uses: number | null;
    is_active: boolean | null;
  }>;
}

export const useMusicianMetrics = () => {
  return useQuery({
    queryKey: ['musician-metrics'],
    queryFn: async (): Promise<MusicianMetrics> => {
      const [musiciansRes, tracksRes] = await Promise.all([
        supabase
          .from('musician_profiles')
          .select('id, full_name, location, genres, total_plays, total_uses, is_active')
          .order('total_plays', { ascending: false }),
        supabase
          .from('music_tracks')
          .select('id', { count: 'exact', head: true }),
      ]);

      if (musiciansRes.error) throw musiciansRes.error;

      const musicians = musiciansRes.data || [];
      const totalMusicians = musicians.length;
      const activeMusicians = musicians.filter(m => m.is_active).length;
      const totalPlays = musicians.reduce((sum, m) => sum + (m.total_plays || 0), 0);

      return {
        totalMusicians,
        activeMusicians,
        totalTracks: tracksRes.count || 0,
        totalPlays,
        musicians,
      };
    },
    refetchInterval: 30000,
  });
};
