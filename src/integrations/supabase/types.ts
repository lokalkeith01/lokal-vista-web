export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      ad_events: {
        Row: {
          ad_id: string
          ad_type: string
          campaign_id: string | null
          device_fingerprint: string | null
          event_metadata: Json | null
          event_type: string
          id: string
          timestamp: string
          user_id: string | null
        }
        Insert: {
          ad_id: string
          ad_type: string
          campaign_id?: string | null
          device_fingerprint?: string | null
          event_metadata?: Json | null
          event_type: string
          id?: string
          timestamp?: string
          user_id?: string | null
        }
        Update: {
          ad_id?: string
          ad_type?: string
          campaign_id?: string | null
          device_fingerprint?: string | null
          event_metadata?: Json | null
          event_type?: string
          id?: string
          timestamp?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ad_events_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      ad_rate_limits: {
        Row: {
          ad_id: string
          campaign_id: string | null
          created_at: string | null
          device_fingerprint: string
          event_count: number | null
          event_type: string
          first_event_at: string | null
          flagged_reason: string | null
          id: string
          ip_address: string | null
          is_flagged: boolean | null
          last_event_at: string | null
        }
        Insert: {
          ad_id: string
          campaign_id?: string | null
          created_at?: string | null
          device_fingerprint: string
          event_count?: number | null
          event_type: string
          first_event_at?: string | null
          flagged_reason?: string | null
          id?: string
          ip_address?: string | null
          is_flagged?: boolean | null
          last_event_at?: string | null
        }
        Update: {
          ad_id?: string
          campaign_id?: string | null
          created_at?: string | null
          device_fingerprint?: string
          event_count?: number | null
          event_type?: string
          first_event_at?: string | null
          flagged_reason?: string | null
          id?: string
          ip_address?: string | null
          is_flagged?: boolean | null
          last_event_at?: string | null
        }
        Relationships: []
      }
      banner_ads: {
        Row: {
          background_color: string | null
          business_id: string
          campaign_id: string
          clicks: number | null
          created_at: string
          cta_text: string | null
          description: string
          id: string
          image_url: string
          impressions: number | null
          is_active: boolean | null
          link_url: string
          title: string
          updated_at: string
        }
        Insert: {
          background_color?: string | null
          business_id: string
          campaign_id: string
          clicks?: number | null
          created_at?: string
          cta_text?: string | null
          description: string
          id?: string
          image_url: string
          impressions?: number | null
          is_active?: boolean | null
          link_url: string
          title: string
          updated_at?: string
        }
        Update: {
          background_color?: string | null
          business_id?: string
          campaign_id?: string
          clicks?: number | null
          created_at?: string
          cta_text?: string | null
          description?: string
          id?: string
          image_url?: string
          impressions?: number | null
          is_active?: boolean | null
          link_url?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "banner_ads_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "banner_ads_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      beacon_detections: {
        Row: {
          beacon_id: string | null
          created_at: string | null
          detected_at: string | null
          detection_type: string | null
          device_fingerprint: string
          distance_meters: number | null
          id: string
          metadata: Json | null
          signal_strength: number
        }
        Insert: {
          beacon_id?: string | null
          created_at?: string | null
          detected_at?: string | null
          detection_type?: string | null
          device_fingerprint: string
          distance_meters?: number | null
          id?: string
          metadata?: Json | null
          signal_strength: number
        }
        Update: {
          beacon_id?: string | null
          created_at?: string | null
          detected_at?: string | null
          detection_type?: string | null
          device_fingerprint?: string
          distance_meters?: number | null
          id?: string
          metadata?: Json | null
          signal_strength?: number
        }
        Relationships: [
          {
            foreignKeyName: "beacon_detections_beacon_id_fkey"
            columns: ["beacon_id"]
            isOneToOne: false
            referencedRelation: "beacons"
            referencedColumns: ["id"]
          },
        ]
      }
      beacons: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          is_active: boolean | null
          last_seen_at: string | null
          latitude: number | null
          location_name: string
          longitude: number | null
          mac_address: string
          major: number | null
          minor: number | null
          name: string
          updated_at: string | null
          uuid: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          last_seen_at?: string | null
          latitude?: number | null
          location_name: string
          longitude?: number | null
          mac_address: string
          major?: number | null
          minor?: number | null
          name: string
          updated_at?: string | null
          uuid?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          last_seen_at?: string | null
          latitude?: number | null
          location_name?: string
          longitude?: number | null
          mac_address?: string
          major?: number | null
          minor?: number | null
          name?: string
          updated_at?: string | null
          uuid?: string | null
        }
        Relationships: []
      }
      business_follows: {
        Row: {
          business_id: string
          followed_at: string
          id: string
          user_id: string
        }
        Insert: {
          business_id: string
          followed_at?: string
          id?: string
          user_id: string
        }
        Update: {
          business_id?: string
          followed_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_follows_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      businesses: {
        Row: {
          address: string | null
          business_hours: Json | null
          business_type: string | null
          category: string | null
          chamber_id: string | null
          chamber_joined_at: string | null
          chamber_membership_status: string | null
          content_count: number | null
          created_at: string
          description: string | null
          followers_count: number | null
          hero_image_url: string | null
          id: string
          is_claimed: boolean | null
          latitude: number | null
          logo_image_url: string | null
          longitude: number | null
          name: string
          owner_id: string | null
          phone: string | null
          place_id: string
          price_level: number | null
          rating: number | null
          slug: string | null
          types: string[] | null
          updated_at: string
          verification_status: string | null
          website: string | null
        }
        Insert: {
          address?: string | null
          business_hours?: Json | null
          business_type?: string | null
          category?: string | null
          chamber_id?: string | null
          chamber_joined_at?: string | null
          chamber_membership_status?: string | null
          content_count?: number | null
          created_at?: string
          description?: string | null
          followers_count?: number | null
          hero_image_url?: string | null
          id?: string
          is_claimed?: boolean | null
          latitude?: number | null
          logo_image_url?: string | null
          longitude?: number | null
          name: string
          owner_id?: string | null
          phone?: string | null
          place_id: string
          price_level?: number | null
          rating?: number | null
          slug?: string | null
          types?: string[] | null
          updated_at?: string
          verification_status?: string | null
          website?: string | null
        }
        Update: {
          address?: string | null
          business_hours?: Json | null
          business_type?: string | null
          category?: string | null
          chamber_id?: string | null
          chamber_joined_at?: string | null
          chamber_membership_status?: string | null
          content_count?: number | null
          created_at?: string
          description?: string | null
          followers_count?: number | null
          hero_image_url?: string | null
          id?: string
          is_claimed?: boolean | null
          latitude?: number | null
          logo_image_url?: string | null
          longitude?: number | null
          name?: string
          owner_id?: string | null
          phone?: string | null
          place_id?: string
          price_level?: number | null
          rating?: number | null
          slug?: string | null
          types?: string[] | null
          updated_at?: string
          verification_status?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "businesses_chamber_id_fkey"
            columns: ["chamber_id"]
            isOneToOne: false
            referencedRelation: "chambers"
            referencedColumns: ["id"]
          },
        ]
      }
      campaign_attributions: {
        Row: {
          attributed_at: string | null
          attribution_type: string
          beacon_id: string | null
          campaign_id: string | null
          confidence_score: number
          created_at: string | null
          id: string
          metadata: Json | null
          visitor_session_id: string | null
        }
        Insert: {
          attributed_at?: string | null
          attribution_type: string
          beacon_id?: string | null
          campaign_id?: string | null
          confidence_score: number
          created_at?: string | null
          id?: string
          metadata?: Json | null
          visitor_session_id?: string | null
        }
        Update: {
          attributed_at?: string | null
          attribution_type?: string
          beacon_id?: string | null
          campaign_id?: string | null
          confidence_score?: number
          created_at?: string | null
          id?: string
          metadata?: Json | null
          visitor_session_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_attributions_beacon_id_fkey"
            columns: ["beacon_id"]
            isOneToOne: false
            referencedRelation: "beacons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_attributions_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_attributions_visitor_session_id_fkey"
            columns: ["visitor_session_id"]
            isOneToOne: false
            referencedRelation: "visitor_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      campaigns: {
        Row: {
          ad_format: string[] | null
          budget_limit: number | null
          budget_spent: number | null
          business_id: string | null
          campaign_type: string
          cost_per_click: number | null
          cost_per_impression: number | null
          created_at: string | null
          created_by: string | null
          description: string | null
          end_date: string | null
          id: string
          is_active: boolean | null
          metadata: Json | null
          name: string
          searchable_fee: number | null
          start_date: string
          status: string | null
          surrounding_communities_fee: number | null
          surrounding_zip_codes: string[] | null
          target_area_codes: string[] | null
          target_beacons: string[] | null
          target_location_lat: number | null
          target_location_lng: number | null
          target_radius_miles: number | null
          target_searchable: boolean | null
          target_surrounding_communities: boolean | null
          target_zip_code: string | null
          targeting_criteria: Json | null
          total_clicks: number | null
          total_impressions: number | null
          updated_at: string | null
        }
        Insert: {
          ad_format?: string[] | null
          budget_limit?: number | null
          budget_spent?: number | null
          business_id?: string | null
          campaign_type: string
          cost_per_click?: number | null
          cost_per_impression?: number | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          name: string
          searchable_fee?: number | null
          start_date: string
          status?: string | null
          surrounding_communities_fee?: number | null
          surrounding_zip_codes?: string[] | null
          target_area_codes?: string[] | null
          target_beacons?: string[] | null
          target_location_lat?: number | null
          target_location_lng?: number | null
          target_radius_miles?: number | null
          target_searchable?: boolean | null
          target_surrounding_communities?: boolean | null
          target_zip_code?: string | null
          targeting_criteria?: Json | null
          total_clicks?: number | null
          total_impressions?: number | null
          updated_at?: string | null
        }
        Update: {
          ad_format?: string[] | null
          budget_limit?: number | null
          budget_spent?: number | null
          business_id?: string | null
          campaign_type?: string
          cost_per_click?: number | null
          cost_per_impression?: number | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          name?: string
          searchable_fee?: number | null
          start_date?: string
          status?: string | null
          surrounding_communities_fee?: number | null
          surrounding_zip_codes?: string[] | null
          target_area_codes?: string[] | null
          target_beacons?: string[] | null
          target_location_lat?: number | null
          target_location_lng?: number | null
          target_radius_miles?: number | null
          target_searchable?: boolean | null
          target_surrounding_communities?: boolean | null
          target_zip_code?: string | null
          targeting_criteria?: Json | null
          total_clicks?: number | null
          total_impressions?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      chambers: {
        Row: {
          city_names: string[]
          contact_email: string | null
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          slug: string
          updated_at: string | null
        }
        Insert: {
          city_names: string[]
          contact_email?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          slug: string
          updated_at?: string | null
        }
        Update: {
          city_names?: string[]
          contact_email?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      content: {
        Row: {
          avg_watch_time: number | null
          campaign_id: string | null
          company_name: string
          completion_rate: number | null
          created_at: string
          description: string | null
          duration: number | null
          event_date: string | null
          file_size: number | null
          id: string
          is_promoted: boolean | null
          latitude: number | null
          likes_count: number
          location_data: string | null
          longitude: number | null
          music_credit_name: string | null
          music_credit_url: string | null
          persona_id: string | null
          place_name: string | null
          preview_url: string | null
          promotion_budget: number | null
          promotion_clicks: number | null
          promotion_end_date: string | null
          promotion_impressions: number | null
          promotion_start_date: string | null
          shares_count: number
          status: string | null
          tags: string[] | null
          thumbnail_url: string | null
          title: string
          track_id: string | null
          updated_at: string
          upload_id: string | null
          user_id: string
          venue_type: string | null
          video_url: string
          views: number | null
        }
        Insert: {
          avg_watch_time?: number | null
          campaign_id?: string | null
          company_name: string
          completion_rate?: number | null
          created_at?: string
          description?: string | null
          duration?: number | null
          event_date?: string | null
          file_size?: number | null
          id?: string
          is_promoted?: boolean | null
          latitude?: number | null
          likes_count?: number
          location_data?: string | null
          longitude?: number | null
          music_credit_name?: string | null
          music_credit_url?: string | null
          persona_id?: string | null
          place_name?: string | null
          preview_url?: string | null
          promotion_budget?: number | null
          promotion_clicks?: number | null
          promotion_end_date?: string | null
          promotion_impressions?: number | null
          promotion_start_date?: string | null
          shares_count?: number
          status?: string | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title: string
          track_id?: string | null
          updated_at?: string
          upload_id?: string | null
          user_id: string
          venue_type?: string | null
          video_url: string
          views?: number | null
        }
        Update: {
          avg_watch_time?: number | null
          campaign_id?: string | null
          company_name?: string
          completion_rate?: number | null
          created_at?: string
          description?: string | null
          duration?: number | null
          event_date?: string | null
          file_size?: number | null
          id?: string
          is_promoted?: boolean | null
          latitude?: number | null
          likes_count?: number
          location_data?: string | null
          longitude?: number | null
          music_credit_name?: string | null
          music_credit_url?: string | null
          persona_id?: string | null
          place_name?: string | null
          preview_url?: string | null
          promotion_budget?: number | null
          promotion_clicks?: number | null
          promotion_end_date?: string | null
          promotion_impressions?: number | null
          promotion_start_date?: string | null
          shares_count?: number
          status?: string | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title?: string
          track_id?: string | null
          updated_at?: string
          upload_id?: string | null
          user_id?: string
          venue_type?: string | null
          video_url?: string
          views?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "content_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_persona_id_fkey"
            columns: ["persona_id"]
            isOneToOne: false
            referencedRelation: "user_personas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_track_id_fkey"
            columns: ["track_id"]
            isOneToOne: false
            referencedRelation: "music_tracks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      content_views: {
        Row: {
          completion_rate: number | null
          content_id: string
          id: string
          user_id: string
          viewed_at: string | null
          watch_time_seconds: number | null
        }
        Insert: {
          completion_rate?: number | null
          content_id: string
          id?: string
          user_id: string
          viewed_at?: string | null
          watch_time_seconds?: number | null
        }
        Update: {
          completion_rate?: number | null
          content_id?: string
          id?: string
          user_id?: string
          viewed_at?: string | null
          watch_time_seconds?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "content_views_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "content"
            referencedColumns: ["id"]
          },
        ]
      }
      daily_analytics: {
        Row: {
          avg_scroll_depth: number | null
          avg_session_duration_seconds: number | null
          avg_video_completion_rate: number | null
          avg_videos_watched: number | null
          created_at: string
          daily_active_users: number | null
          date: string
          id: string
          total_sessions: number | null
          total_video_views: number | null
          updated_at: string
        }
        Insert: {
          avg_scroll_depth?: number | null
          avg_session_duration_seconds?: number | null
          avg_video_completion_rate?: number | null
          avg_videos_watched?: number | null
          created_at?: string
          daily_active_users?: number | null
          date: string
          id?: string
          total_sessions?: number | null
          total_video_views?: number | null
          updated_at?: string
        }
        Update: {
          avg_scroll_depth?: number | null
          avg_session_duration_seconds?: number | null
          avg_video_completion_rate?: number | null
          avg_videos_watched?: number | null
          created_at?: string
          daily_active_users?: number | null
          date?: string
          id?: string
          total_sessions?: number | null
          total_video_views?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      daily_page_analytics: {
        Row: {
          avg_scroll_depth: number | null
          avg_time_on_page_seconds: number | null
          created_at: string
          date: string
          id: string
          page_name: string
          total_ad_clicks: number | null
          total_ad_impressions: number | null
          total_visits: number | null
          unique_visitors: number | null
          updated_at: string
        }
        Insert: {
          avg_scroll_depth?: number | null
          avg_time_on_page_seconds?: number | null
          created_at?: string
          date: string
          id?: string
          page_name: string
          total_ad_clicks?: number | null
          total_ad_impressions?: number | null
          total_visits?: number | null
          unique_visitors?: number | null
          updated_at?: string
        }
        Update: {
          avg_scroll_depth?: number | null
          avg_time_on_page_seconds?: number | null
          created_at?: string
          date?: string
          id?: string
          page_name?: string
          total_ad_clicks?: number | null
          total_ad_impressions?: number | null
          total_visits?: number | null
          unique_visitors?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      detection_approvals: {
        Row: {
          approved_at: string
          approved_by: string
          detection_id: string
          id: string
          notes: string | null
          status: string
        }
        Insert: {
          approved_at?: string
          approved_by: string
          detection_id: string
          id?: string
          notes?: string | null
          status: string
        }
        Update: {
          approved_at?: string
          approved_by?: string
          detection_id?: string
          id?: string
          notes?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "detection_approvals_detection_id_fkey"
            columns: ["detection_id"]
            isOneToOne: false
            referencedRelation: "location_detections"
            referencedColumns: ["id"]
          },
        ]
      }
      drafts: {
        Row: {
          company_name: string
          created_at: string
          description: string | null
          duration: number | null
          file_size: number | null
          id: string
          latitude: number | null
          location_data: string | null
          longitude: number | null
          music_credit_name: string | null
          music_credit_url: string | null
          persona_id: string | null
          place_name: string | null
          status: string | null
          tags: string[] | null
          thumbnail_url: string | null
          title: string
          track_id: string | null
          updated_at: string
          user_id: string
          venue_type: string | null
          video_url: string
        }
        Insert: {
          company_name: string
          created_at?: string
          description?: string | null
          duration?: number | null
          file_size?: number | null
          id?: string
          latitude?: number | null
          location_data?: string | null
          longitude?: number | null
          music_credit_name?: string | null
          music_credit_url?: string | null
          persona_id?: string | null
          place_name?: string | null
          status?: string | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title: string
          track_id?: string | null
          updated_at?: string
          user_id: string
          venue_type?: string | null
          video_url: string
        }
        Update: {
          company_name?: string
          created_at?: string
          description?: string | null
          duration?: number | null
          file_size?: number | null
          id?: string
          latitude?: number | null
          location_data?: string | null
          longitude?: number | null
          music_credit_name?: string | null
          music_credit_url?: string | null
          persona_id?: string | null
          place_name?: string | null
          status?: string | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title?: string
          track_id?: string | null
          updated_at?: string
          user_id?: string
          venue_type?: string | null
          video_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "drafts_persona_id_fkey"
            columns: ["persona_id"]
            isOneToOne: false
            referencedRelation: "user_personas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "drafts_track_id_fkey"
            columns: ["track_id"]
            isOneToOne: false
            referencedRelation: "music_tracks"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          address: string | null
          business_id: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          end_date: string | null
          id: string
          is_active: boolean | null
          latitude: number | null
          longitude: number | null
          name: string
          start_date: string
          venue_name: string | null
        }
        Insert: {
          address?: string | null
          business_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          latitude?: number | null
          longitude?: number | null
          name: string
          start_date: string
          venue_name?: string | null
        }
        Update: {
          address?: string | null
          business_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          latitude?: number | null
          longitude?: number | null
          name?: string
          start_date?: string
          venue_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      follows: {
        Row: {
          followed_at: string
          follower_id: string
          following_id: string
          id: string
        }
        Insert: {
          followed_at?: string
          follower_id: string
          following_id: string
          id?: string
        }
        Update: {
          followed_at?: string
          follower_id?: string
          following_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "follows_follower_fk"
            columns: ["follower_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "follows_following_fk"
            columns: ["following_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      generated_music_tracks: {
        Row: {
          audio_url: string
          created_at: string
          duration_seconds: number
          id: string
          mood: string
          prompt: string
        }
        Insert: {
          audio_url: string
          created_at?: string
          duration_seconds: number
          id?: string
          mood: string
          prompt: string
        }
        Update: {
          audio_url?: string
          created_at?: string
          duration_seconds?: number
          id?: string
          mood?: string
          prompt?: string
        }
        Relationships: []
      }
      influencer_bookings: {
        Row: {
          booked_by_user_id: string
          budget: number
          campaign_details: string
          created_at: string
          end_date: string | null
          id: string
          influencer_id: string
          influencer_payout: number | null
          payment_status: string
          payout_status: string | null
          platform_fee: number | null
          service_type: string
          start_date: string
          status: string
          stripe_checkout_session_id: string | null
          stripe_payment_intent_id: string | null
          updated_at: string
        }
        Insert: {
          booked_by_user_id: string
          budget: number
          campaign_details: string
          created_at?: string
          end_date?: string | null
          id?: string
          influencer_id: string
          influencer_payout?: number | null
          payment_status?: string
          payout_status?: string | null
          platform_fee?: number | null
          service_type: string
          start_date: string
          status?: string
          stripe_checkout_session_id?: string | null
          stripe_payment_intent_id?: string | null
          updated_at?: string
        }
        Update: {
          booked_by_user_id?: string
          budget?: number
          campaign_details?: string
          created_at?: string
          end_date?: string | null
          id?: string
          influencer_id?: string
          influencer_payout?: number | null
          payment_status?: string
          payout_status?: string | null
          platform_fee?: number | null
          service_type?: string
          start_date?: string
          status?: string
          stripe_checkout_session_id?: string | null
          stripe_payment_intent_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "influencer_bookings_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "influencer_bookings_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "public_influencer_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      influencer_payouts: {
        Row: {
          amount: number
          booking_id: string
          completed_at: string | null
          created_at: string
          id: string
          influencer_id: string
          net_amount: number
          platform_fee: number
          status: string
          stripe_transfer_id: string | null
        }
        Insert: {
          amount: number
          booking_id: string
          completed_at?: string | null
          created_at?: string
          id?: string
          influencer_id: string
          net_amount: number
          platform_fee: number
          status?: string
          stripe_transfer_id?: string | null
        }
        Update: {
          amount?: number
          booking_id?: string
          completed_at?: string | null
          created_at?: string
          id?: string
          influencer_id?: string
          net_amount?: number
          platform_fee?: number
          status?: string
          stripe_transfer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "influencer_payouts_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "influencer_bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "influencer_payouts_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "influencer_payouts_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "public_influencer_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      influencer_profiles: {
        Row: {
          audience_age_range: string | null
          audience_gender: string | null
          audience_locations: string | null
          bio: string
          content_formats: string[] | null
          created_at: string | null
          email: string
          excluded_industries: string | null
          full_name: string
          id: string
          instagram: string | null
          instagram_followers: number | null
          is_active: boolean | null
          languages: string | null
          latitude: number | null
          location: string
          longitude: number | null
          phone: string | null
          primary_categories: string[]
          profile_completion: number | null
          profile_photo_url: string | null
          reels_price: string | null
          services_offered: string[]
          sponsored_post_price: string | null
          stories_price: string | null
          stripe_account_id: string | null
          stripe_account_status: string | null
          tiktok: string | null
          tiktok_followers: number | null
          turnaround_time: string | null
          twitter: string | null
          twitter_followers: number | null
          updated_at: string | null
          user_id: string
          video_price: string | null
          youtube: string | null
          youtube_followers: number | null
        }
        Insert: {
          audience_age_range?: string | null
          audience_gender?: string | null
          audience_locations?: string | null
          bio: string
          content_formats?: string[] | null
          created_at?: string | null
          email: string
          excluded_industries?: string | null
          full_name: string
          id?: string
          instagram?: string | null
          instagram_followers?: number | null
          is_active?: boolean | null
          languages?: string | null
          latitude?: number | null
          location: string
          longitude?: number | null
          phone?: string | null
          primary_categories?: string[]
          profile_completion?: number | null
          profile_photo_url?: string | null
          reels_price?: string | null
          services_offered?: string[]
          sponsored_post_price?: string | null
          stories_price?: string | null
          stripe_account_id?: string | null
          stripe_account_status?: string | null
          tiktok?: string | null
          tiktok_followers?: number | null
          turnaround_time?: string | null
          twitter?: string | null
          twitter_followers?: number | null
          updated_at?: string | null
          user_id: string
          video_price?: string | null
          youtube?: string | null
          youtube_followers?: number | null
        }
        Update: {
          audience_age_range?: string | null
          audience_gender?: string | null
          audience_locations?: string | null
          bio?: string
          content_formats?: string[] | null
          created_at?: string | null
          email?: string
          excluded_industries?: string | null
          full_name?: string
          id?: string
          instagram?: string | null
          instagram_followers?: number | null
          is_active?: boolean | null
          languages?: string | null
          latitude?: number | null
          location?: string
          longitude?: number | null
          phone?: string | null
          primary_categories?: string[]
          profile_completion?: number | null
          profile_photo_url?: string | null
          reels_price?: string | null
          services_offered?: string[]
          sponsored_post_price?: string | null
          stories_price?: string | null
          stripe_account_id?: string | null
          stripe_account_status?: string | null
          tiktok?: string | null
          tiktok_followers?: number | null
          turnaround_time?: string | null
          twitter?: string | null
          twitter_followers?: number | null
          updated_at?: string | null
          user_id?: string
          video_price?: string | null
          youtube?: string | null
          youtube_followers?: number | null
        }
        Relationships: []
      }
      location_detections: {
        Row: {
          created_at: string
          detected_at: string
          detection_data: Json | null
          detection_type: string
          device_fingerprint: string
          id: string
          monitored_location_id: string
          status: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          detected_at?: string
          detection_data?: Json | null
          detection_type: string
          device_fingerprint: string
          id?: string
          monitored_location_id: string
          status?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          detected_at?: string
          detection_data?: Json | null
          detection_type?: string
          device_fingerprint?: string
          id?: string
          monitored_location_id?: string
          status?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "location_detections_monitored_location_id_fkey"
            columns: ["monitored_location_id"]
            isOneToOne: false
            referencedRelation: "monitored_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      monitored_locations: {
        Row: {
          beacon_major: number | null
          beacon_minor: number | null
          beacon_uuid: string | null
          created_at: string
          created_by: string
          description: string | null
          id: string
          is_active: boolean
          latitude: number | null
          location_type: string
          longitude: number | null
          name: string
          radius_meters: number | null
          updated_at: string
        }
        Insert: {
          beacon_major?: number | null
          beacon_minor?: number | null
          beacon_uuid?: string | null
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          is_active?: boolean
          latitude?: number | null
          location_type: string
          longitude?: number | null
          name: string
          radius_meters?: number | null
          updated_at?: string
        }
        Update: {
          beacon_major?: number | null
          beacon_minor?: number | null
          beacon_uuid?: string | null
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          is_active?: boolean
          latitude?: number | null
          location_type?: string
          longitude?: number | null
          name?: string
          radius_meters?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      music_tracks: {
        Row: {
          audio_url: string
          bpm: number | null
          created_at: string | null
          description: string | null
          duration_seconds: number
          genres: string[]
          id: string
          is_active: boolean | null
          is_featured: boolean | null
          mood: string | null
          musician_id: string
          title: string
          total_plays: number | null
          total_uses: number | null
          updated_at: string | null
          vibes: string[]
        }
        Insert: {
          audio_url: string
          bpm?: number | null
          created_at?: string | null
          description?: string | null
          duration_seconds: number
          genres?: string[]
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          mood?: string | null
          musician_id: string
          title: string
          total_plays?: number | null
          total_uses?: number | null
          updated_at?: string | null
          vibes?: string[]
        }
        Update: {
          audio_url?: string
          bpm?: number | null
          created_at?: string | null
          description?: string | null
          duration_seconds?: number
          genres?: string[]
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          mood?: string | null
          musician_id?: string
          title?: string
          total_plays?: number | null
          total_uses?: number | null
          updated_at?: string | null
          vibes?: string[]
        }
        Relationships: [
          {
            foreignKeyName: "music_tracks_musician_id_fkey"
            columns: ["musician_id"]
            isOneToOne: false
            referencedRelation: "musician_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      musician_payouts: {
        Row: {
          amount: number
          completed_at: string | null
          created_at: string | null
          id: string
          musician_id: string
          net_amount: number
          period_end: string
          period_start: string
          platform_fee: number
          status: string
          stripe_transfer_id: string | null
          total_plays: number | null
          total_uses: number | null
        }
        Insert: {
          amount: number
          completed_at?: string | null
          created_at?: string | null
          id?: string
          musician_id: string
          net_amount: number
          period_end: string
          period_start: string
          platform_fee: number
          status?: string
          stripe_transfer_id?: string | null
          total_plays?: number | null
          total_uses?: number | null
        }
        Update: {
          amount?: number
          completed_at?: string | null
          created_at?: string | null
          id?: string
          musician_id?: string
          net_amount?: number
          period_end?: string
          period_start?: string
          platform_fee?: number
          status?: string
          stripe_transfer_id?: string | null
          total_plays?: number | null
          total_uses?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "musician_payouts_musician_id_fkey"
            columns: ["musician_id"]
            isOneToOne: false
            referencedRelation: "musician_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      musician_profiles: {
        Row: {
          agreement_accepted: boolean | null
          agreement_accepted_at: string | null
          agreement_version: string | null
          bandcamp: string | null
          banner_url: string | null
          bio: string
          created_at: string | null
          email: string
          followers_count: number | null
          full_name: string
          genres: string[]
          has_pro_affiliation: boolean | null
          id: string
          instagram: string | null
          is_active: boolean | null
          is_signed_to_label: boolean | null
          is_verified: boolean | null
          label_name: string | null
          latitude: number | null
          legal_name: string | null
          location: string | null
          longitude: number | null
          music_styles: string[]
          owns_composition_publishing: boolean | null
          owns_master_recordings: boolean | null
          payment_preference: string | null
          paypal_email: string | null
          phone: string | null
          pro_organization: string | null
          profile_completion: number | null
          profile_photo_url: string | null
          samples_are_cleared: boolean | null
          soundcloud: string | null
          spotify: string | null
          stripe_account_id: string | null
          stripe_account_status: string | null
          total_plays: number | null
          total_uses: number | null
          tracks_contain_samples: boolean | null
          updated_at: string | null
          user_id: string
          website: string | null
          youtube: string | null
        }
        Insert: {
          agreement_accepted?: boolean | null
          agreement_accepted_at?: string | null
          agreement_version?: string | null
          bandcamp?: string | null
          banner_url?: string | null
          bio: string
          created_at?: string | null
          email: string
          followers_count?: number | null
          full_name: string
          genres?: string[]
          has_pro_affiliation?: boolean | null
          id?: string
          instagram?: string | null
          is_active?: boolean | null
          is_signed_to_label?: boolean | null
          is_verified?: boolean | null
          label_name?: string | null
          latitude?: number | null
          legal_name?: string | null
          location?: string | null
          longitude?: number | null
          music_styles?: string[]
          owns_composition_publishing?: boolean | null
          owns_master_recordings?: boolean | null
          payment_preference?: string | null
          paypal_email?: string | null
          phone?: string | null
          pro_organization?: string | null
          profile_completion?: number | null
          profile_photo_url?: string | null
          samples_are_cleared?: boolean | null
          soundcloud?: string | null
          spotify?: string | null
          stripe_account_id?: string | null
          stripe_account_status?: string | null
          total_plays?: number | null
          total_uses?: number | null
          tracks_contain_samples?: boolean | null
          updated_at?: string | null
          user_id: string
          website?: string | null
          youtube?: string | null
        }
        Update: {
          agreement_accepted?: boolean | null
          agreement_accepted_at?: string | null
          agreement_version?: string | null
          bandcamp?: string | null
          banner_url?: string | null
          bio?: string
          created_at?: string | null
          email?: string
          followers_count?: number | null
          full_name?: string
          genres?: string[]
          has_pro_affiliation?: boolean | null
          id?: string
          instagram?: string | null
          is_active?: boolean | null
          is_signed_to_label?: boolean | null
          is_verified?: boolean | null
          label_name?: string | null
          latitude?: number | null
          legal_name?: string | null
          location?: string | null
          longitude?: number | null
          music_styles?: string[]
          owns_composition_publishing?: boolean | null
          owns_master_recordings?: boolean | null
          payment_preference?: string | null
          paypal_email?: string | null
          phone?: string | null
          pro_organization?: string | null
          profile_completion?: number | null
          profile_photo_url?: string | null
          samples_are_cleared?: boolean | null
          soundcloud?: string | null
          spotify?: string | null
          stripe_account_id?: string | null
          stripe_account_status?: string | null
          total_plays?: number | null
          total_uses?: number | null
          tracks_contain_samples?: boolean | null
          updated_at?: string | null
          user_id?: string
          website?: string | null
          youtube?: string | null
        }
        Relationships: []
      }
      notification_preferences: {
        Row: {
          created_at: string | null
          device_platform: string | null
          device_token: string | null
          followed_content_enabled: boolean | null
          id: string
          new_business_enabled: boolean | null
          new_events_enabled: boolean | null
          push_notifications_enabled: boolean | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          device_platform?: string | null
          device_token?: string | null
          followed_content_enabled?: boolean | null
          id?: string
          new_business_enabled?: boolean | null
          new_events_enabled?: boolean | null
          push_notifications_enabled?: boolean | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          device_platform?: string | null
          device_token?: string | null
          followed_content_enabled?: boolean | null
          id?: string
          new_business_enabled?: boolean | null
          new_events_enabled?: boolean | null
          push_notifications_enabled?: boolean | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          body: string
          created_at: string | null
          id: string
          is_read: boolean | null
          metadata: Json | null
          notification_type: string
          reference_id: string | null
          reference_type: string | null
          title: string
          user_id: string
        }
        Insert: {
          body: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          metadata?: Json | null
          notification_type: string
          reference_id?: string | null
          reference_type?: string | null
          title: string
          user_id: string
        }
        Update: {
          body?: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          metadata?: Json | null
          notification_type?: string
          reference_id?: string | null
          reference_type?: string | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      page_views: {
        Row: {
          ad_clicks: number | null
          ad_impressions: number | null
          device_type: string | null
          id: string
          page_name: string
          scroll_depth: number | null
          session_id: string
          time_on_page_seconds: number | null
          user_id: string
          visited_at: string
        }
        Insert: {
          ad_clicks?: number | null
          ad_impressions?: number | null
          device_type?: string | null
          id?: string
          page_name: string
          scroll_depth?: number | null
          session_id: string
          time_on_page_seconds?: number | null
          user_id: string
          visited_at?: string
        }
        Update: {
          ad_clicks?: number | null
          ad_impressions?: number | null
          device_type?: string | null
          id?: string
          page_name?: string
          scroll_depth?: number | null
          session_id?: string
          time_on_page_seconds?: number | null
          user_id?: string
          visited_at?: string
        }
        Relationships: []
      }
      password_reset_limits: {
        Row: {
          attempt_count: number | null
          email_hash: string
          first_attempt_at: string | null
          id: string
          ip_address: string
          last_attempt_at: string | null
        }
        Insert: {
          attempt_count?: number | null
          email_hash: string
          first_attempt_at?: string | null
          id?: string
          ip_address: string
          last_attempt_at?: string | null
        }
        Update: {
          attempt_count?: number | null
          email_hash?: string
          first_attempt_at?: string | null
          id?: string
          ip_address?: string
          last_attempt_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          followers_count: number | null
          following_count: number | null
          geofence_formatted_address: string | null
          geofence_latitude: number | null
          geofence_longitude: number | null
          geofence_place_id: string | null
          geofence_place_name: string | null
          geofence_radius: number | null
          id: string
          interests: string[] | null
          is_profile_public: boolean | null
          location_privacy_public: boolean | null
          updated_at: string
          user_id: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          followers_count?: number | null
          following_count?: number | null
          geofence_formatted_address?: string | null
          geofence_latitude?: number | null
          geofence_longitude?: number | null
          geofence_place_id?: string | null
          geofence_place_name?: string | null
          geofence_radius?: number | null
          id?: string
          interests?: string[] | null
          is_profile_public?: boolean | null
          location_privacy_public?: boolean | null
          updated_at?: string
          user_id: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          followers_count?: number | null
          following_count?: number | null
          geofence_formatted_address?: string | null
          geofence_latitude?: number | null
          geofence_longitude?: number | null
          geofence_place_id?: string | null
          geofence_place_name?: string | null
          geofence_radius?: number | null
          id?: string
          interests?: string[] | null
          is_profile_public?: boolean | null
          location_privacy_public?: boolean | null
          updated_at?: string
          user_id?: string
          username?: string | null
        }
        Relationships: []
      }
      saved_videos: {
        Row: {
          created_at: string
          id: string
          is_liked: boolean
          is_saved: boolean
          persona_id: string | null
          user_id: string
          video_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_liked?: boolean
          is_saved?: boolean
          persona_id?: string | null
          user_id: string
          video_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_liked?: boolean
          is_saved?: boolean
          persona_id?: string | null
          user_id?: string
          video_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_videos_persona_id_fkey"
            columns: ["persona_id"]
            isOneToOne: false
            referencedRelation: "user_personas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "saved_videos_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "content"
            referencedColumns: ["id"]
          },
        ]
      }
      shares: {
        Row: {
          content_id: string
          id: string
          share_method: string | null
          shared_at: string
          user_id: string | null
        }
        Insert: {
          content_id: string
          id?: string
          share_method?: string | null
          shared_at?: string
          user_id?: string | null
        }
        Update: {
          content_id?: string
          id?: string
          share_method?: string | null
          shared_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shares_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "content"
            referencedColumns: ["id"]
          },
        ]
      }
      spatial_ref_sys: {
        Row: {
          auth_name: string | null
          auth_srid: number | null
          proj4text: string | null
          srid: number
          srtext: string | null
        }
        Insert: {
          auth_name?: string | null
          auth_srid?: number | null
          proj4text?: string | null
          srid: number
          srtext?: string | null
        }
        Update: {
          auth_name?: string | null
          auth_srid?: number | null
          proj4text?: string | null
          srid?: number
          srtext?: string | null
        }
        Relationships: []
      }
      sponsored_cards: {
        Row: {
          badge_text: string | null
          business_id: string
          campaign_id: string
          card_type: string
          clicks: number | null
          created_at: string
          cta_text: string | null
          description: string
          id: string
          image_url: string
          impressions: number | null
          is_active: boolean | null
          link_url: string
          show_rating: boolean | null
          title: string
          updated_at: string
        }
        Insert: {
          badge_text?: string | null
          business_id: string
          campaign_id: string
          card_type: string
          clicks?: number | null
          created_at?: string
          cta_text?: string | null
          description: string
          id?: string
          image_url: string
          impressions?: number | null
          is_active?: boolean | null
          link_url: string
          show_rating?: boolean | null
          title: string
          updated_at?: string
        }
        Update: {
          badge_text?: string | null
          business_id?: string
          campaign_id?: string
          card_type?: string
          clicks?: number | null
          created_at?: string
          cta_text?: string | null
          description?: string
          id?: string
          image_url?: string
          impressions?: number | null
          is_active?: boolean | null
          link_url?: string
          show_rating?: boolean | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sponsored_cards_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sponsored_cards_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      track_plays: {
        Row: {
          content_id: string
          id: string
          play_duration_seconds: number | null
          played_at: string | null
          track_id: string
          user_id: string | null
        }
        Insert: {
          content_id: string
          id?: string
          play_duration_seconds?: number | null
          played_at?: string | null
          track_id: string
          user_id?: string | null
        }
        Update: {
          content_id?: string
          id?: string
          play_duration_seconds?: number | null
          played_at?: string | null
          track_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "track_plays_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "content"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "track_plays_track_id_fkey"
            columns: ["track_id"]
            isOneToOne: false
            referencedRelation: "music_tracks"
            referencedColumns: ["id"]
          },
        ]
      }
      track_usage: {
        Row: {
          content_id: string
          id: string
          track_id: string
          used_at: string | null
          user_id: string
        }
        Insert: {
          content_id: string
          id?: string
          track_id: string
          used_at?: string | null
          user_id: string
        }
        Update: {
          content_id?: string
          id?: string
          track_id?: string
          used_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "track_usage_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "content"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "track_usage_track_id_fkey"
            columns: ["track_id"]
            isOneToOne: false
            referencedRelation: "music_tracks"
            referencedColumns: ["id"]
          },
        ]
      }
      user_personas: {
        Row: {
          avatar_url: string | null
          bio: string | null
          business_id: string | null
          created_at: string | null
          display_name: string | null
          followers_count: number | null
          following_count: number | null
          id: string
          influencer_profile_id: string | null
          is_active: boolean | null
          musician_profile_id: string | null
          persona_type: Database["public"]["Enums"]["persona_type"]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          business_id?: string | null
          created_at?: string | null
          display_name?: string | null
          followers_count?: number | null
          following_count?: number | null
          id?: string
          influencer_profile_id?: string | null
          is_active?: boolean | null
          musician_profile_id?: string | null
          persona_type: Database["public"]["Enums"]["persona_type"]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          business_id?: string | null
          created_at?: string | null
          display_name?: string | null
          followers_count?: number | null
          following_count?: number | null
          id?: string
          influencer_profile_id?: string | null
          is_active?: boolean | null
          musician_profile_id?: string | null
          persona_type?: Database["public"]["Enums"]["persona_type"]
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_personas_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_personas_influencer_profile_id_fkey"
            columns: ["influencer_profile_id"]
            isOneToOne: false
            referencedRelation: "influencer_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_personas_influencer_profile_id_fkey"
            columns: ["influencer_profile_id"]
            isOneToOne: false
            referencedRelation: "public_influencer_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_personas_musician_profile_id_fkey"
            columns: ["musician_profile_id"]
            isOneToOne: false
            referencedRelation: "musician_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_sessions: {
        Row: {
          created_at: string
          device_fingerprint: string | null
          device_type: string | null
          duration_seconds: number | null
          ended_at: string | null
          id: string
          max_scroll_depth: number | null
          session_id: string
          started_at: string
          user_id: string
          videos_watched: number | null
        }
        Insert: {
          created_at?: string
          device_fingerprint?: string | null
          device_type?: string | null
          duration_seconds?: number | null
          ended_at?: string | null
          id?: string
          max_scroll_depth?: number | null
          session_id: string
          started_at?: string
          user_id: string
          videos_watched?: number | null
        }
        Update: {
          created_at?: string
          device_fingerprint?: string | null
          device_type?: string | null
          duration_seconds?: number | null
          ended_at?: string | null
          id?: string
          max_scroll_depth?: number | null
          session_id?: string
          started_at?: string
          user_id?: string
          videos_watched?: number | null
        }
        Relationships: []
      }
      videos: {
        Row: {
          company_name: string
          created_at: string
          duration: number | null
          file_size: number | null
          id: string
          latitude: number | null
          location_data: string | null
          longitude: number | null
          place_name: string | null
          preview_url: string | null
          status: string | null
          tags: string[] | null
          thumbnail_url: string | null
          title: string
          updated_at: string
          user_id: string
          venue_type: string | null
          video_url: string
        }
        Insert: {
          company_name: string
          created_at?: string
          duration?: number | null
          file_size?: number | null
          id?: string
          latitude?: number | null
          location_data?: string | null
          longitude?: number | null
          place_name?: string | null
          preview_url?: string | null
          status?: string | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string
          user_id: string
          venue_type?: string | null
          video_url: string
        }
        Update: {
          company_name?: string
          created_at?: string
          duration?: number | null
          file_size?: number | null
          id?: string
          latitude?: number | null
          location_data?: string | null
          longitude?: number | null
          place_name?: string | null
          preview_url?: string | null
          status?: string | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
          user_id?: string
          venue_type?: string | null
          video_url?: string
        }
        Relationships: []
      }
      visitor_sessions: {
        Row: {
          beacon_path: Json | null
          confidence_score: number | null
          created_at: string | null
          device_fingerprint: string
          entry_beacon_id: string | null
          exit_beacon_id: string | null
          id: string
          is_active: boolean | null
          session_end: string | null
          session_start: string
          total_dwell_time_seconds: number | null
          updated_at: string | null
        }
        Insert: {
          beacon_path?: Json | null
          confidence_score?: number | null
          created_at?: string | null
          device_fingerprint: string
          entry_beacon_id?: string | null
          exit_beacon_id?: string | null
          id?: string
          is_active?: boolean | null
          session_end?: string | null
          session_start: string
          total_dwell_time_seconds?: number | null
          updated_at?: string | null
        }
        Update: {
          beacon_path?: Json | null
          confidence_score?: number | null
          created_at?: string | null
          device_fingerprint?: string
          entry_beacon_id?: string | null
          exit_beacon_id?: string | null
          id?: string
          is_active?: boolean | null
          session_end?: string | null
          session_start?: string
          total_dwell_time_seconds?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "visitor_sessions_entry_beacon_id_fkey"
            columns: ["entry_beacon_id"]
            isOneToOne: false
            referencedRelation: "beacons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "visitor_sessions_exit_beacon_id_fkey"
            columns: ["exit_beacon_id"]
            isOneToOne: false
            referencedRelation: "beacons"
            referencedColumns: ["id"]
          },
        ]
      }
      zip_codes: {
        Row: {
          adjacent_zip_codes: string[] | null
          city: string
          county: string | null
          created_at: string | null
          id: string
          is_active: boolean | null
          latitude: number
          longitude: number
          population: number | null
          state: string | null
          timezone: string | null
          updated_at: string | null
          zip_code: string
        }
        Insert: {
          adjacent_zip_codes?: string[] | null
          city: string
          county?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          latitude: number
          longitude: number
          population?: number | null
          state?: string | null
          timezone?: string | null
          updated_at?: string | null
          zip_code: string
        }
        Update: {
          adjacent_zip_codes?: string[] | null
          city?: string
          county?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          latitude?: number
          longitude?: number
          population?: number | null
          state?: string | null
          timezone?: string | null
          updated_at?: string | null
          zip_code?: string
        }
        Relationships: []
      }
    }
    Views: {
      geography_columns: {
        Row: {
          coord_dimension: number | null
          f_geography_column: unknown
          f_table_catalog: unknown
          f_table_name: unknown
          f_table_schema: unknown
          srid: number | null
          type: string | null
        }
        Relationships: []
      }
      geometry_columns: {
        Row: {
          coord_dimension: number | null
          f_geometry_column: unknown
          f_table_catalog: string | null
          f_table_name: unknown
          f_table_schema: unknown
          srid: number | null
          type: string | null
        }
        Insert: {
          coord_dimension?: number | null
          f_geometry_column?: unknown
          f_table_catalog?: string | null
          f_table_name?: unknown
          f_table_schema?: unknown
          srid?: number | null
          type?: string | null
        }
        Update: {
          coord_dimension?: number | null
          f_geometry_column?: unknown
          f_table_catalog?: string | null
          f_table_name?: unknown
          f_table_schema?: unknown
          srid?: number | null
          type?: string | null
        }
        Relationships: []
      }
      public_influencer_profiles: {
        Row: {
          audience_age_range: string | null
          audience_gender: string | null
          audience_locations: string | null
          bio: string | null
          content_formats: string[] | null
          created_at: string | null
          full_name: string | null
          id: string | null
          instagram_followers: number | null
          is_active: boolean | null
          location: string | null
          primary_categories: string[] | null
          profile_completion: number | null
          profile_photo_url: string | null
          services_offered: string[] | null
          tiktok_followers: number | null
          twitter_followers: number | null
          updated_at: string | null
          user_id: string | null
          youtube_followers: number | null
        }
        Insert: {
          audience_age_range?: string | null
          audience_gender?: string | null
          audience_locations?: string | null
          bio?: string | null
          content_formats?: string[] | null
          created_at?: string | null
          full_name?: string | null
          id?: string | null
          instagram_followers?: number | null
          is_active?: boolean | null
          location?: string | null
          primary_categories?: string[] | null
          profile_completion?: number | null
          profile_photo_url?: string | null
          services_offered?: string[] | null
          tiktok_followers?: number | null
          twitter_followers?: number | null
          updated_at?: string | null
          user_id?: string | null
          youtube_followers?: number | null
        }
        Update: {
          audience_age_range?: string | null
          audience_gender?: string | null
          audience_locations?: string | null
          bio?: string | null
          content_formats?: string[] | null
          created_at?: string | null
          full_name?: string | null
          id?: string | null
          instagram_followers?: number | null
          is_active?: boolean | null
          location?: string | null
          primary_categories?: string[] | null
          profile_completion?: number | null
          profile_photo_url?: string | null
          services_offered?: string[] | null
          tiktok_followers?: number | null
          twitter_followers?: number | null
          updated_at?: string | null
          user_id?: string | null
          youtube_followers?: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      _postgis_deprecate: {
        Args: { newname: string; oldname: string; version: string }
        Returns: undefined
      }
      _postgis_index_extent: {
        Args: { col: string; tbl: unknown }
        Returns: unknown
      }
      _postgis_pgsql_version: { Args: never; Returns: string }
      _postgis_scripts_pgsql_version: { Args: never; Returns: string }
      _postgis_selectivity: {
        Args: { att_name: string; geom: unknown; mode?: string; tbl: unknown }
        Returns: number
      }
      _postgis_stats: {
        Args: { ""?: string; att_name: string; tbl: unknown }
        Returns: string
      }
      _st_3dintersects: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_contains: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_containsproperly: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_coveredby:
        | { Args: { geog1: unknown; geog2: unknown }; Returns: boolean }
        | { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      _st_covers:
        | { Args: { geog1: unknown; geog2: unknown }; Returns: boolean }
        | { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      _st_crosses: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_dwithin: {
        Args: {
          geog1: unknown
          geog2: unknown
          tolerance: number
          use_spheroid?: boolean
        }
        Returns: boolean
      }
      _st_equals: { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      _st_intersects: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_linecrossingdirection: {
        Args: { line1: unknown; line2: unknown }
        Returns: number
      }
      _st_longestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      _st_maxdistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      _st_orderingequals: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_overlaps: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_sortablehash: { Args: { geom: unknown }; Returns: number }
      _st_touches: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_voronoi: {
        Args: {
          clip?: unknown
          g1: unknown
          return_polygons?: boolean
          tolerance?: number
        }
        Returns: unknown
      }
      _st_within: { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      addauth: { Args: { "": string }; Returns: boolean }
      addgeometrycolumn:
        | {
            Args: {
              catalog_name: string
              column_name: string
              new_dim: number
              new_srid_in: number
              new_type: string
              schema_name: string
              table_name: string
              use_typmod?: boolean
            }
            Returns: string
          }
        | {
            Args: {
              column_name: string
              new_dim: number
              new_srid: number
              new_type: string
              schema_name: string
              table_name: string
              use_typmod?: boolean
            }
            Returns: string
          }
        | {
            Args: {
              column_name: string
              new_dim: number
              new_srid: number
              new_type: string
              table_name: string
              use_typmod?: boolean
            }
            Returns: string
          }
      calculate_distance_miles: {
        Args: { lat1: number; lat2: number; lng1: number; lng2: number }
        Returns: number
      }
      can_view_location: {
        Args: { requesting_user_id: string; video_user_id: string }
        Returns: boolean
      }
      cleanup_old_password_reset_limits: { Args: never; Returns: undefined }
      cleanup_old_rate_limits: { Args: never; Returns: undefined }
      disablelongtransactions: { Args: never; Returns: string }
      dropgeometrycolumn:
        | {
            Args: {
              catalog_name: string
              column_name: string
              schema_name: string
              table_name: string
            }
            Returns: string
          }
        | {
            Args: {
              column_name: string
              schema_name: string
              table_name: string
            }
            Returns: string
          }
        | { Args: { column_name: string; table_name: string }; Returns: string }
      dropgeometrytable:
        | {
            Args: {
              catalog_name: string
              schema_name: string
              table_name: string
            }
            Returns: string
          }
        | { Args: { schema_name: string; table_name: string }; Returns: string }
        | { Args: { table_name: string }; Returns: string }
      enablelongtransactions: { Args: never; Returns: string }
      equals: { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      find_adjacent_zip_codes: {
        Args: { radius_miles?: number; target_zip: string }
        Returns: string[]
      }
      find_cardinal_adjacent_zip_codes: {
        Args: { max_distance_miles?: number; target_zip: string }
        Returns: string[]
      }
      generate_business_slug: {
        Args: { business_name: string }
        Returns: string
      }
      geometry: { Args: { "": string }; Returns: unknown }
      geometry_above: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_below: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_cmp: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      geometry_contained_3d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_contains: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_contains_3d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_distance_box: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      geometry_distance_centroid: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      geometry_eq: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_ge: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_gt: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_le: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_left: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_lt: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overabove: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overbelow: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overlaps: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overlaps_3d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overleft: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overright: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_right: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_same: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_same_3d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_within: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geomfromewkt: { Args: { "": string }; Returns: unknown }
      get_active_persona: { Args: { p_user_id: string }; Returns: string }
      get_best_venue_type: { Args: { types: string[] }; Returns: string }
      get_content_within_radius: {
        Args: {
          lat: number
          lng: number
          max_results?: number
          radius_km: number
        }
        Returns: {
          avg_watch_time: number
          company_name: string
          completion_rate: number
          created_at: string
          description: string
          duration: number
          id: string
          latitude: number
          likes_count: number
          longitude: number
          place_name: string
          shares_count: number
          tags: string[]
          thumbnail_url: string
          title: string
          user_id: string
          venue_type: string
          video_url: string
          views: number
        }[]
      }
      get_creator_engagement: {
        Args: { p_user_id: string }
        Returns: {
          avg_watch_time: number
          creator_id: string
          last_interaction: string
          like_count: number
          share_count: number
          view_count: number
        }[]
      }
      get_videos_with_privacy: {
        Args: never
        Returns: {
          company_name: string
          created_at: string
          duration: number
          file_size: number
          id: string
          location_data: string
          tags: string[]
          thumbnail_url: string
          title: string
          updated_at: string
          user_id: string
          video_url: string
        }[]
      }
      gettransactionid: { Args: never; Returns: unknown }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      longtransactionsenabled: { Args: never; Returns: boolean }
      populate_geometry_columns:
        | { Args: { tbl_oid: unknown; use_typmod?: boolean }; Returns: number }
        | { Args: { use_typmod?: boolean }; Returns: string }
      postgis_constraint_dims: {
        Args: { geomcolumn: string; geomschema: string; geomtable: string }
        Returns: number
      }
      postgis_constraint_srid: {
        Args: { geomcolumn: string; geomschema: string; geomtable: string }
        Returns: number
      }
      postgis_constraint_type: {
        Args: { geomcolumn: string; geomschema: string; geomtable: string }
        Returns: string
      }
      postgis_extensions_upgrade: { Args: never; Returns: string }
      postgis_full_version: { Args: never; Returns: string }
      postgis_geos_version: { Args: never; Returns: string }
      postgis_lib_build_date: { Args: never; Returns: string }
      postgis_lib_revision: { Args: never; Returns: string }
      postgis_lib_version: { Args: never; Returns: string }
      postgis_libjson_version: { Args: never; Returns: string }
      postgis_liblwgeom_version: { Args: never; Returns: string }
      postgis_libprotobuf_version: { Args: never; Returns: string }
      postgis_libxml_version: { Args: never; Returns: string }
      postgis_proj_version: { Args: never; Returns: string }
      postgis_scripts_build_date: { Args: never; Returns: string }
      postgis_scripts_installed: { Args: never; Returns: string }
      postgis_scripts_released: { Args: never; Returns: string }
      postgis_svn_version: { Args: never; Returns: string }
      postgis_type_name: {
        Args: {
          coord_dimension: number
          geomname: string
          use_new_name?: boolean
        }
        Returns: string
      }
      postgis_version: { Args: never; Returns: string }
      postgis_wagyu_version: { Args: never; Returns: string }
      st_3dclosestpoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_3ddistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_3dintersects: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_3dlongestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_3dmakebox: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_3dmaxdistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_3dshortestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_addpoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_angle:
        | { Args: { line1: unknown; line2: unknown }; Returns: number }
        | {
            Args: { pt1: unknown; pt2: unknown; pt3: unknown; pt4?: unknown }
            Returns: number
          }
      st_area:
        | { Args: { geog: unknown; use_spheroid?: boolean }; Returns: number }
        | { Args: { "": string }; Returns: number }
      st_asencodedpolyline: {
        Args: { geom: unknown; nprecision?: number }
        Returns: string
      }
      st_asewkt: { Args: { "": string }; Returns: string }
      st_asgeojson:
        | {
            Args: { geog: unknown; maxdecimaldigits?: number; options?: number }
            Returns: string
          }
        | {
            Args: { geom: unknown; maxdecimaldigits?: number; options?: number }
            Returns: string
          }
        | {
            Args: {
              geom_column?: string
              maxdecimaldigits?: number
              pretty_bool?: boolean
              r: Record<string, unknown>
            }
            Returns: string
          }
        | { Args: { "": string }; Returns: string }
      st_asgml:
        | {
            Args: {
              geog: unknown
              id?: string
              maxdecimaldigits?: number
              nprefix?: string
              options?: number
            }
            Returns: string
          }
        | {
            Args: { geom: unknown; maxdecimaldigits?: number; options?: number }
            Returns: string
          }
        | { Args: { "": string }; Returns: string }
        | {
            Args: {
              geog: unknown
              id?: string
              maxdecimaldigits?: number
              nprefix?: string
              options?: number
              version: number
            }
            Returns: string
          }
        | {
            Args: {
              geom: unknown
              id?: string
              maxdecimaldigits?: number
              nprefix?: string
              options?: number
              version: number
            }
            Returns: string
          }
      st_askml:
        | {
            Args: { geog: unknown; maxdecimaldigits?: number; nprefix?: string }
            Returns: string
          }
        | {
            Args: { geom: unknown; maxdecimaldigits?: number; nprefix?: string }
            Returns: string
          }
        | { Args: { "": string }; Returns: string }
      st_aslatlontext: {
        Args: { geom: unknown; tmpl?: string }
        Returns: string
      }
      st_asmarc21: { Args: { format?: string; geom: unknown }; Returns: string }
      st_asmvtgeom: {
        Args: {
          bounds: unknown
          buffer?: number
          clip_geom?: boolean
          extent?: number
          geom: unknown
        }
        Returns: unknown
      }
      st_assvg:
        | {
            Args: { geog: unknown; maxdecimaldigits?: number; rel?: number }
            Returns: string
          }
        | {
            Args: { geom: unknown; maxdecimaldigits?: number; rel?: number }
            Returns: string
          }
        | { Args: { "": string }; Returns: string }
      st_astext: { Args: { "": string }; Returns: string }
      st_astwkb:
        | {
            Args: {
              geom: unknown
              prec?: number
              prec_m?: number
              prec_z?: number
              with_boxes?: boolean
              with_sizes?: boolean
            }
            Returns: string
          }
        | {
            Args: {
              geom: unknown[]
              ids: number[]
              prec?: number
              prec_m?: number
              prec_z?: number
              with_boxes?: boolean
              with_sizes?: boolean
            }
            Returns: string
          }
      st_asx3d: {
        Args: { geom: unknown; maxdecimaldigits?: number; options?: number }
        Returns: string
      }
      st_azimuth:
        | { Args: { geog1: unknown; geog2: unknown }; Returns: number }
        | { Args: { geom1: unknown; geom2: unknown }; Returns: number }
      st_boundingdiagonal: {
        Args: { fits?: boolean; geom: unknown }
        Returns: unknown
      }
      st_buffer:
        | {
            Args: { geom: unknown; options?: string; radius: number }
            Returns: unknown
          }
        | {
            Args: { geom: unknown; quadsegs: number; radius: number }
            Returns: unknown
          }
      st_centroid: { Args: { "": string }; Returns: unknown }
      st_clipbybox2d: {
        Args: { box: unknown; geom: unknown }
        Returns: unknown
      }
      st_closestpoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_collect: { Args: { geom1: unknown; geom2: unknown }; Returns: unknown }
      st_concavehull: {
        Args: {
          param_allow_holes?: boolean
          param_geom: unknown
          param_pctconvex: number
        }
        Returns: unknown
      }
      st_contains: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_containsproperly: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_coorddim: { Args: { geometry: unknown }; Returns: number }
      st_coveredby:
        | { Args: { geog1: unknown; geog2: unknown }; Returns: boolean }
        | { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      st_covers:
        | { Args: { geog1: unknown; geog2: unknown }; Returns: boolean }
        | { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      st_crosses: { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      st_curvetoline: {
        Args: { flags?: number; geom: unknown; tol?: number; toltype?: number }
        Returns: unknown
      }
      st_delaunaytriangles: {
        Args: { flags?: number; g1: unknown; tolerance?: number }
        Returns: unknown
      }
      st_difference: {
        Args: { geom1: unknown; geom2: unknown; gridsize?: number }
        Returns: unknown
      }
      st_disjoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_distance:
        | {
            Args: { geog1: unknown; geog2: unknown; use_spheroid?: boolean }
            Returns: number
          }
        | { Args: { geom1: unknown; geom2: unknown }; Returns: number }
      st_distancesphere:
        | { Args: { geom1: unknown; geom2: unknown }; Returns: number }
        | {
            Args: { geom1: unknown; geom2: unknown; radius: number }
            Returns: number
          }
      st_distancespheroid: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_dwithin: {
        Args: {
          geog1: unknown
          geog2: unknown
          tolerance: number
          use_spheroid?: boolean
        }
        Returns: boolean
      }
      st_equals: { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      st_expand:
        | { Args: { box: unknown; dx: number; dy: number }; Returns: unknown }
        | {
            Args: { box: unknown; dx: number; dy: number; dz?: number }
            Returns: unknown
          }
        | {
            Args: {
              dm?: number
              dx: number
              dy: number
              dz?: number
              geom: unknown
            }
            Returns: unknown
          }
      st_force3d: { Args: { geom: unknown; zvalue?: number }; Returns: unknown }
      st_force3dm: {
        Args: { geom: unknown; mvalue?: number }
        Returns: unknown
      }
      st_force3dz: {
        Args: { geom: unknown; zvalue?: number }
        Returns: unknown
      }
      st_force4d: {
        Args: { geom: unknown; mvalue?: number; zvalue?: number }
        Returns: unknown
      }
      st_generatepoints:
        | { Args: { area: unknown; npoints: number }; Returns: unknown }
        | {
            Args: { area: unknown; npoints: number; seed: number }
            Returns: unknown
          }
      st_geogfromtext: { Args: { "": string }; Returns: unknown }
      st_geographyfromtext: { Args: { "": string }; Returns: unknown }
      st_geohash:
        | { Args: { geog: unknown; maxchars?: number }; Returns: string }
        | { Args: { geom: unknown; maxchars?: number }; Returns: string }
      st_geomcollfromtext: { Args: { "": string }; Returns: unknown }
      st_geometricmedian: {
        Args: {
          fail_if_not_converged?: boolean
          g: unknown
          max_iter?: number
          tolerance?: number
        }
        Returns: unknown
      }
      st_geometryfromtext: { Args: { "": string }; Returns: unknown }
      st_geomfromewkt: { Args: { "": string }; Returns: unknown }
      st_geomfromgeojson:
        | { Args: { "": Json }; Returns: unknown }
        | { Args: { "": Json }; Returns: unknown }
        | { Args: { "": string }; Returns: unknown }
      st_geomfromgml: { Args: { "": string }; Returns: unknown }
      st_geomfromkml: { Args: { "": string }; Returns: unknown }
      st_geomfrommarc21: { Args: { marc21xml: string }; Returns: unknown }
      st_geomfromtext: { Args: { "": string }; Returns: unknown }
      st_gmltosql: { Args: { "": string }; Returns: unknown }
      st_hasarc: { Args: { geometry: unknown }; Returns: boolean }
      st_hausdorffdistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_hexagon: {
        Args: { cell_i: number; cell_j: number; origin?: unknown; size: number }
        Returns: unknown
      }
      st_hexagongrid: {
        Args: { bounds: unknown; size: number }
        Returns: Record<string, unknown>[]
      }
      st_interpolatepoint: {
        Args: { line: unknown; point: unknown }
        Returns: number
      }
      st_intersection: {
        Args: { geom1: unknown; geom2: unknown; gridsize?: number }
        Returns: unknown
      }
      st_intersects:
        | { Args: { geog1: unknown; geog2: unknown }; Returns: boolean }
        | { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      st_isvaliddetail: {
        Args: { flags?: number; geom: unknown }
        Returns: Database["public"]["CompositeTypes"]["valid_detail"]
        SetofOptions: {
          from: "*"
          to: "valid_detail"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      st_length:
        | { Args: { geog: unknown; use_spheroid?: boolean }; Returns: number }
        | { Args: { "": string }; Returns: number }
      st_letters: { Args: { font?: Json; letters: string }; Returns: unknown }
      st_linecrossingdirection: {
        Args: { line1: unknown; line2: unknown }
        Returns: number
      }
      st_linefromencodedpolyline: {
        Args: { nprecision?: number; txtin: string }
        Returns: unknown
      }
      st_linefromtext: { Args: { "": string }; Returns: unknown }
      st_linelocatepoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_linetocurve: { Args: { geometry: unknown }; Returns: unknown }
      st_locatealong: {
        Args: { geometry: unknown; leftrightoffset?: number; measure: number }
        Returns: unknown
      }
      st_locatebetween: {
        Args: {
          frommeasure: number
          geometry: unknown
          leftrightoffset?: number
          tomeasure: number
        }
        Returns: unknown
      }
      st_locatebetweenelevations: {
        Args: { fromelevation: number; geometry: unknown; toelevation: number }
        Returns: unknown
      }
      st_longestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_makebox2d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_makeline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_makevalid: {
        Args: { geom: unknown; params: string }
        Returns: unknown
      }
      st_maxdistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_minimumboundingcircle: {
        Args: { inputgeom: unknown; segs_per_quarter?: number }
        Returns: unknown
      }
      st_mlinefromtext: { Args: { "": string }; Returns: unknown }
      st_mpointfromtext: { Args: { "": string }; Returns: unknown }
      st_mpolyfromtext: { Args: { "": string }; Returns: unknown }
      st_multilinestringfromtext: { Args: { "": string }; Returns: unknown }
      st_multipointfromtext: { Args: { "": string }; Returns: unknown }
      st_multipolygonfromtext: { Args: { "": string }; Returns: unknown }
      st_node: { Args: { g: unknown }; Returns: unknown }
      st_normalize: { Args: { geom: unknown }; Returns: unknown }
      st_offsetcurve: {
        Args: { distance: number; line: unknown; params?: string }
        Returns: unknown
      }
      st_orderingequals: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_overlaps: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_perimeter: {
        Args: { geog: unknown; use_spheroid?: boolean }
        Returns: number
      }
      st_pointfromtext: { Args: { "": string }; Returns: unknown }
      st_pointm: {
        Args: {
          mcoordinate: number
          srid?: number
          xcoordinate: number
          ycoordinate: number
        }
        Returns: unknown
      }
      st_pointz: {
        Args: {
          srid?: number
          xcoordinate: number
          ycoordinate: number
          zcoordinate: number
        }
        Returns: unknown
      }
      st_pointzm: {
        Args: {
          mcoordinate: number
          srid?: number
          xcoordinate: number
          ycoordinate: number
          zcoordinate: number
        }
        Returns: unknown
      }
      st_polyfromtext: { Args: { "": string }; Returns: unknown }
      st_polygonfromtext: { Args: { "": string }; Returns: unknown }
      st_project: {
        Args: { azimuth: number; distance: number; geog: unknown }
        Returns: unknown
      }
      st_quantizecoordinates: {
        Args: {
          g: unknown
          prec_m?: number
          prec_x: number
          prec_y?: number
          prec_z?: number
        }
        Returns: unknown
      }
      st_reduceprecision: {
        Args: { geom: unknown; gridsize: number }
        Returns: unknown
      }
      st_relate: { Args: { geom1: unknown; geom2: unknown }; Returns: string }
      st_removerepeatedpoints: {
        Args: { geom: unknown; tolerance?: number }
        Returns: unknown
      }
      st_segmentize: {
        Args: { geog: unknown; max_segment_length: number }
        Returns: unknown
      }
      st_setsrid:
        | { Args: { geog: unknown; srid: number }; Returns: unknown }
        | { Args: { geom: unknown; srid: number }; Returns: unknown }
      st_sharedpaths: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_shortestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_simplifypolygonhull: {
        Args: { geom: unknown; is_outer?: boolean; vertex_fraction: number }
        Returns: unknown
      }
      st_split: { Args: { geom1: unknown; geom2: unknown }; Returns: unknown }
      st_square: {
        Args: { cell_i: number; cell_j: number; origin?: unknown; size: number }
        Returns: unknown
      }
      st_squaregrid: {
        Args: { bounds: unknown; size: number }
        Returns: Record<string, unknown>[]
      }
      st_srid:
        | { Args: { geog: unknown }; Returns: number }
        | { Args: { geom: unknown }; Returns: number }
      st_subdivide: {
        Args: { geom: unknown; gridsize?: number; maxvertices?: number }
        Returns: unknown[]
      }
      st_swapordinates: {
        Args: { geom: unknown; ords: unknown }
        Returns: unknown
      }
      st_symdifference: {
        Args: { geom1: unknown; geom2: unknown; gridsize?: number }
        Returns: unknown
      }
      st_symmetricdifference: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_tileenvelope: {
        Args: {
          bounds?: unknown
          margin?: number
          x: number
          y: number
          zoom: number
        }
        Returns: unknown
      }
      st_touches: { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      st_transform:
        | {
            Args: { from_proj: string; geom: unknown; to_proj: string }
            Returns: unknown
          }
        | {
            Args: { from_proj: string; geom: unknown; to_srid: number }
            Returns: unknown
          }
        | { Args: { geom: unknown; to_proj: string }; Returns: unknown }
      st_triangulatepolygon: { Args: { g1: unknown }; Returns: unknown }
      st_union:
        | { Args: { geom1: unknown; geom2: unknown }; Returns: unknown }
        | {
            Args: { geom1: unknown; geom2: unknown; gridsize: number }
            Returns: unknown
          }
      st_voronoilines: {
        Args: { extend_to?: unknown; g1: unknown; tolerance?: number }
        Returns: unknown
      }
      st_voronoipolygons: {
        Args: { extend_to?: unknown; g1: unknown; tolerance?: number }
        Returns: unknown
      }
      st_within: { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      st_wkbtosql: { Args: { wkb: string }; Returns: unknown }
      st_wkttosql: { Args: { "": string }; Returns: unknown }
      st_wrapx: {
        Args: { geom: unknown; move: number; wrap: number }
        Returns: unknown
      }
      switch_persona: {
        Args: { p_persona_id: string; p_user_id: string }
        Returns: boolean
      }
      unlockrows: { Args: { "": string }; Returns: number }
      update_daily_analytics: {
        Args: { target_date: string }
        Returns: undefined
      }
      updategeometrysrid: {
        Args: {
          catalogn_name: string
          column_name: string
          new_srid_in: number
          schema_name: string
          table_name: string
        }
        Returns: string
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      persona_type: "user" | "business_owner" | "influencer" | "musician"
    }
    CompositeTypes: {
      geometry_dump: {
        path: number[] | null
        geom: unknown
      }
      valid_detail: {
        valid: boolean | null
        reason: string | null
        location: unknown
      }
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      persona_type: ["user", "business_owner", "influencer", "musician"],
    },
  },
} as const
