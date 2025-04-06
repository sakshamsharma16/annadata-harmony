export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      farms: {
        Row: {
          created_at: string | null
          crop_type: string
          harvest_date: string | null
          id: string
          location: string
          quantity: number | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          crop_type: string
          harvest_date?: string | null
          id?: string
          location: string
          quantity?: number | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          crop_type?: string
          harvest_date?: string | null
          id?: string
          location?: string
          quantity?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "farms_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      "Farms Table": {
        Row: {
          crop_type: string
          harvest_date: string
          id: string
          location: string
          quantity: number
          user_id: string
        }
        Insert: {
          crop_type: string
          harvest_date: string
          id?: string
          location: string
          quantity: number
          user_id?: string
        }
        Update: {
          crop_type?: string
          harvest_date?: string
          id?: string
          location?: string
          quantity?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "Farms Table_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "Users Table"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string | null
          customer_id: string
          id: string
          product_id: string
          quantity: number
          status: string
        }
        Insert: {
          created_at?: string | null
          customer_id: string
          id?: string
          product_id: string
          quantity: number
          status?: string
        }
        Update: {
          created_at?: string | null
          customer_id?: string
          id?: string
          product_id?: string
          quantity?: number
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      "Orders Table": {
        Row: {
          created_at: string
          customer_id: string
          id: string
          product_id: string
          quantity: number
          status: string
        }
        Insert: {
          created_at: string
          customer_id?: string
          id?: string
          product_id?: string
          quantity: number
          status: string
        }
        Update: {
          created_at?: string
          customer_id?: string
          id?: string
          product_id?: string
          quantity?: number
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "Orders Table_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "Users Table"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Orders Table_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "Product Table"
            referencedColumns: ["id"]
          },
        ]
      }
      "Product Table": {
        Row: {
          availability: boolean
          farm_id: string
          id: string
          name: string
          price_per_kg: number
        }
        Insert: {
          availability: boolean
          farm_id?: string
          id?: string
          name: string
          price_per_kg: number
        }
        Update: {
          availability?: boolean
          farm_id?: string
          id?: string
          name?: string
          price_per_kg?: number
        }
        Relationships: [
          {
            foreignKeyName: "Product Table_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "Farms Table"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          availability: boolean | null
          created_at: string | null
          farm_id: string
          id: string
          name: string
          price_per_kg: number | null
        }
        Insert: {
          availability?: boolean | null
          created_at?: string | null
          farm_id: string
          id?: string
          name: string
          price_per_kg?: number | null
        }
        Update: {
          availability?: boolean | null
          created_at?: string | null
          farm_id?: string
          id?: string
          name?: string
          price_per_kg?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "products_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          full_name: string
          id: string
          phone_number: string | null
          role: string
        }
        Insert: {
          created_at?: string | null
          full_name: string
          id: string
          phone_number?: string | null
          role: string
        }
        Update: {
          created_at?: string | null
          full_name?: string
          id?: string
          phone_number?: string | null
          role?: string
        }
        Relationships: []
      }
      "Users Table": {
        Row: {
          created_at: string
          full_name: string
          id: string
          phone_number: string
          role: string
        }
        Insert: {
          created_at?: string
          full_name?: string
          id?: string
          phone_number?: string
          role?: string
        }
        Update: {
          created_at?: string
          full_name?: string
          id?: string
          phone_number?: string
          role?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
