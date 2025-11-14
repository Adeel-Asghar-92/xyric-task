export interface Item {
  id: string;
  title: string;
  description: string | null;
  category: string;
  price: number;
  quantity: number;
  tags: string[];
  status: 'ACTIVE' | 'INACTIVE' | 'DISCONTINUED';
  created_at: string;
  updated_at: string;
}

export interface CreateItemInput {
  title: string;
  description?: string;
  category?: string;
  price?: number;
  quantity?: number;
  tags?: string[];
  status?: 'ACTIVE' | 'INACTIVE' | 'DISCONTINUED';
}

export interface UpdateItemInput {
  title?: string;
  description?: string;
  category?: string;
  price?: number;
  quantity?: number;
  tags?: string[];
  status?: 'ACTIVE' | 'INACTIVE' | 'DISCONTINUED';
}

export interface PaginationParams {
  page: number;
  limit: number;
  search?: string;
  category?: string;
  status?: 'ACTIVE' | 'INACTIVE' | 'DISCONTINUED';
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}