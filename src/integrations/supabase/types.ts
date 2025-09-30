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
      businesses: {
        Row: {
          address: string | null
          business_type: string | null
          category: string | null
          content_count: number | null
          created_at: string
          description: string | null
          hero_image_url: string | null
          id: string
          is_claimed: boolean | null
          latitude: number | null
          logo_image_url: string | null
          longitude: number | null
          name: string
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
          business_type?: string | null
          category?: string | null
          content_count?: number | null
          created_at?: string
          description?: string | null
          hero_image_url?: string | null
          id?: string
          is_claimed?: boolean | null
          latitude?: number | null
          logo_image_url?: string | null
          longitude?: number | null
          name: string
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
          business_type?: string | null
          category?: string | null
          content_count?: number | null
          created_at?: string
          description?: string | null
          hero_image_url?: string | null
          id?: string
          is_claimed?: boolean | null
          latitude?: number | null
          logo_image_url?: string | null
          longitude?: number | null
          name?: string
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
        Relationships: []
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
          campaign_type: string
          created_at: string | null
          created_by: string | null
          description: string | null
          end_date: string | null
          id: string
          is_active: boolean | null
          metadata: Json | null
          name: string
          start_date: string
          target_beacons: string[] | null
          updated_at: string | null
        }
        Insert: {
          campaign_type: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          name: string
          start_date: string
          target_beacons?: string[] | null
          updated_at?: string | null
        }
        Update: {
          campaign_type?: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          name?: string
          start_date?: string
          target_beacons?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      content: {
        Row: {
          asset_id: string | null
          company_name: string
          created_at: string
          description: string | null
          duration: number | null
          file_size: number | null
          id: string
          latitude: number | null
          location_data: string | null
          longitude: number | null
          place_name: string | null
          playback_id: string | null
          preview_url: string | null
          status: string | null
          tags: string[] | null
          thumbnail_url: string | null
          title: string
          updated_at: string
          upload_id: string | null
          user_id: string
          video_url: string
        }
        Insert: {
          asset_id?: string | null
          company_name: string
          created_at?: string
          description?: string | null
          duration?: number | null
          file_size?: number | null
          id?: string
          latitude?: number | null
          location_data?: string | null
          longitude?: number | null
          place_name?: string | null
          playback_id?: string | null
          preview_url?: string | null
          status?: string | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string
          upload_id?: string | null
          user_id: string
          video_url: string
        }
        Update: {
          asset_id?: string | null
          company_name?: string
          created_at?: string
          description?: string | null
          duration?: number | null
          file_size?: number | null
          id?: string
          latitude?: number | null
          location_data?: string | null
          longitude?: number | null
          place_name?: string | null
          playback_id?: string | null
          preview_url?: string | null
          status?: string | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
          upload_id?: string | null
          user_id?: string
          video_url?: string
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
          asset_id: string | null
          company_name: string
          created_at: string
          duration: number | null
          file_size: number | null
          id: string
          latitude: number | null
          location_data: string | null
          longitude: number | null
          place_name: string | null
          playback_id: string | null
          status: string | null
          tags: string[] | null
          thumbnail_url: string | null
          title: string
          updated_at: string
          user_id: string
          video_url: string
        }
        Insert: {
          asset_id?: string | null
          company_name: string
          created_at?: string
          duration?: number | null
          file_size?: number | null
          id?: string
          latitude?: number | null
          location_data?: string | null
          longitude?: number | null
          place_name?: string | null
          playback_id?: string | null
          status?: string | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string
          user_id: string
          video_url: string
        }
        Update: {
          asset_id?: string | null
          company_name?: string
          created_at?: string
          duration?: number | null
          file_size?: number | null
          id?: string
          latitude?: number | null
          location_data?: string | null
          longitude?: number | null
          place_name?: string | null
          playback_id?: string | null
          status?: string | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
          user_id?: string
          video_url?: string
        }
        Relationships: []
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
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          id: string
          location_privacy_public: boolean | null
          updated_at: string
          user_id: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          id?: string
          location_privacy_public?: boolean | null
          updated_at?: string
          user_id: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          id?: string
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
          user_id: string
          video_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_liked?: boolean
          is_saved?: boolean
          user_id: string
          video_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_liked?: boolean
          is_saved?: boolean
          user_id?: string
          video_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_videos_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "content"
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
      videos: {
        Row: {
          asset_id: string | null
          company_name: string
          created_at: string
          duration: number | null
          file_size: number | null
          id: string
          latitude: number | null
          location_data: string | null
          longitude: number | null
          place_name: string | null
          playback_id: string | null
          preview_url: string | null
          status: string | null
          tags: string[] | null
          thumbnail_url: string | null
          title: string
          updated_at: string
          user_id: string
          video_url: string
        }
        Insert: {
          asset_id?: string | null
          company_name: string
          created_at?: string
          duration?: number | null
          file_size?: number | null
          id?: string
          latitude?: number | null
          location_data?: string | null
          longitude?: number | null
          place_name?: string | null
          playback_id?: string | null
          preview_url?: string | null
          status?: string | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string
          user_id: string
          video_url: string
        }
        Update: {
          asset_id?: string | null
          company_name?: string
          created_at?: string
          duration?: number | null
          file_size?: number | null
          id?: string
          latitude?: number | null
          location_data?: string | null
          longitude?: number | null
          place_name?: string | null
          playback_id?: string | null
          preview_url?: string | null
          status?: string | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
          user_id?: string
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_view_location: {
        Args: { requesting_user_id: string; video_user_id: string }
        Returns: boolean
      }
      generate_business_slug: {
        Args: { business_name: string }
        Returns: string
      }
      get_videos_with_privacy: {
        Args: Record<PropertyKey, never>
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
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
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
    },
  },
} as const
