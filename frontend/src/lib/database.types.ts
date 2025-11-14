export interface Database {
  public: {
    Tables: {
      items: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          category: string;
          price: number;
          quantity: number;
          tags: string[] | null;
          status: 'active' | 'inactive' | 'discontinued';
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          category: string;
          price: number;
          quantity?: number;
          tags?: string[] | null;
          status?: 'active' | 'inactive' | 'discontinued';
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          category?: string;
          price?: number;
          quantity?: number;
          tags?: string[] | null;
          status?: 'active' | 'inactive' | 'discontinued';
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
    };
  };
}
