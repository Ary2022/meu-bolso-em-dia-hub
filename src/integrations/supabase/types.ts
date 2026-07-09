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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      ai_conversations: {
        Row: {
          created_at: string
          id: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          title?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      ai_messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          role: string
          user_id: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          role: string
          user_id: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "ai_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      budgets: {
        Row: {
          amount: number
          category: string
          created_at: string
          id: string
          period: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          category: string
          created_at?: string
          id?: string
          period?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          category?: string
          created_at?: string
          id?: string
          period?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          color: string | null
          created_at: string
          icon: string | null
          id: string
          kind: Database["public"]["Enums"]["txn_kind"]
          name: string
          user_id: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          icon?: string | null
          id?: string
          kind: Database["public"]["Enums"]["txn_kind"]
          name: string
          user_id: string
        }
        Update: {
          color?: string | null
          created_at?: string
          icon?: string | null
          id?: string
          kind?: Database["public"]["Enums"]["txn_kind"]
          name?: string
          user_id?: string
        }
        Relationships: []
      }
      debts: {
        Row: {
          created_at: string
          creditor: string
          due_date: string | null
          id: string
          interest_rate: number | null
          notes: string | null
          paid_amount: number
          status: Database["public"]["Enums"]["debt_status"]
          total_amount: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          creditor: string
          due_date?: string | null
          id?: string
          interest_rate?: number | null
          notes?: string | null
          paid_amount?: number
          status?: Database["public"]["Enums"]["debt_status"]
          total_amount: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          creditor?: string
          due_date?: string | null
          id?: string
          interest_rate?: number | null
          notes?: string | null
          paid_amount?: number
          status?: Database["public"]["Enums"]["debt_status"]
          total_amount?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      emergency_reserve: {
        Row: {
          current_amount: number
          monthly_contribution: number
          target_amount: number
          updated_at: string
          user_id: string
        }
        Insert: {
          current_amount?: number
          monthly_contribution?: number
          target_amount?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          current_amount?: number
          monthly_contribution?: number
          target_amount?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      goals: {
        Row: {
          color: string | null
          created_at: string
          current_amount: number
          id: string
          target_amount: number
          target_date: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          current_amount?: number
          id?: string
          target_amount: number
          target_date?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          color?: string | null
          created_at?: string
          current_amount?: number
          id?: string
          target_amount?: number
          target_date?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      leads: {
        Row: {
          created_at: string
          email: string
          financial_goal: string | null
          id: string
          language: string
          name: string
          source: string | null
          whatsapp: string | null
        }
        Insert: {
          created_at?: string
          email: string
          financial_goal?: string | null
          id?: string
          language?: string
          name: string
          source?: string | null
          whatsapp?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          financial_goal?: string | null
          id?: string
          language?: string
          name?: string
          source?: string | null
          whatsapp?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          currency: string
          financial_goal: string | null
          full_name: string | null
          id: string
          language: string
          monthly_income: number | null
          onboarding_completed: boolean
          theme: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          currency?: string
          financial_goal?: string | null
          full_name?: string | null
          id: string
          language?: string
          monthly_income?: number | null
          onboarding_completed?: boolean
          theme?: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          currency?: string
          financial_goal?: string | null
          full_name?: string | null
          id?: string
          language?: string
          monthly_income?: number | null
          onboarding_completed?: boolean
          theme?: string
          updated_at?: string
        }
        Relationships: []
      }
      sponsors: {
        Row: {
          button_text: string
          category: string | null
          clicks: number
          coupon_code: string | null
          created_at: string
          description: string
          end_date: string | null
          id: string
          image_url: string | null
          impressions: number
          is_active: boolean
          language: string
          link_url: string
          logo_url: string | null
          placement: string
          sort_order: number
          sponsor_name: string
          start_date: string | null
          title: string
          updated_at: string
        }
        Insert: {
          button_text?: string
          category?: string | null
          clicks?: number
          coupon_code?: string | null
          created_at?: string
          description: string
          end_date?: string | null
          id?: string
          image_url?: string | null
          impressions?: number
          is_active?: boolean
          language?: string
          link_url: string
          logo_url?: string | null
          placement?: string
          sort_order?: number
          sponsor_name: string
          start_date?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          button_text?: string
          category?: string | null
          clicks?: number
          coupon_code?: string | null
          created_at?: string
          description?: string
          end_date?: string | null
          id?: string
          image_url?: string | null
          impressions?: number
          is_active?: boolean
          language?: string
          link_url?: string
          logo_url?: string | null
          placement?: string
          sort_order?: number
          sponsor_name?: string
          start_date?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          category: string | null
          category_id: string | null
          created_at: string
          description: string | null
          id: string
          kind: Database["public"]["Enums"]["txn_kind"]
          occurred_on: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          category?: string | null
          category_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          kind: Database["public"]["Enums"]["txn_kind"]
          occurred_on?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          category?: string | null
          category_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          kind?: Database["public"]["Enums"]["txn_kind"]
          occurred_on?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
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
          role?: Database["public"]["Enums"]["app_role"]
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      increment_sponsor_metric: {
        Args: { _id: string; _metric: string }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "admin" | "user"
      debt_status: "active" | "paid" | "archived"
      txn_kind: "income" | "expense"
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
      app_role: ["admin", "user"],
      debt_status: ["active", "paid", "archived"],
      txn_kind: ["income", "expense"],
    },
  },
} as const
