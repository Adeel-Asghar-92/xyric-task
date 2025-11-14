import { apiClient } from '../lib/api';
import {
  Item,
  CreateItemInput,
  UpdateItemInput,
  PaginationParams,
  PaginatedResponse,
  ApiResponse,
} from '../types/items.types';

export class ItemsService {
  static async getItems(params: PaginationParams): Promise<PaginatedResponse<Item>> {
    const queryParams = new URLSearchParams();
    
    queryParams.append('page', params.page.toString());
    queryParams.append('limit', params.limit.toString());
    
    if (params.search) {
      queryParams.append('search', params.search);
    }
    if (params.category) {
      queryParams.append('category', params.category);
    }
    if (params.status) {
      queryParams.append('status', params.status);
    }

    const response = await apiClient<PaginatedResponse<Item>>(
      `/items?${queryParams.toString()}`
    );
    return response;
  }

  static async getItemById(id: string): Promise<Item> {
    const response = await apiClient<ApiResponse<Item>>(`/items/${id}`);
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to fetch item');
    }
    return response.data;
  }

  static async createItem(item: CreateItemInput): Promise<Item> {
    const response = await apiClient<ApiResponse<Item>>('/items', {
      method: 'POST',
      body: JSON.stringify(item),
    });
    
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to create item');
    }
    return response.data;
  }

  static async updateItem(id: string, updates: UpdateItemInput): Promise<Item> {
    const response = await apiClient<ApiResponse<Item>>(`/items/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
    
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to update item');
    }
    return response.data;
  }

  static async deleteItem(id: string): Promise<void> {
    const response = await apiClient<ApiResponse<void>>(`/items/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to delete item');
    }
  }

  static async getCategories(): Promise<string[]> {
    const response = await apiClient<ApiResponse<string[]>>('/items/categories');
    
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to fetch categories');
    }
    return response.data;
  }

  static async searchItems(query: string, limit: number = 10): Promise<Item[]> {
    const response = await apiClient<PaginatedResponse<Item>>(
      `/items?search=${encodeURIComponent(query)}&limit=${limit}`
    );
    return response.data;
  }
}