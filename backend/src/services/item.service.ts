import { CreateItemInput, UpdateItemInput, PaginationParams, Item } from '../types/item';
import { AppError } from '../middleware/error.middleware';
import { supabase } from '../config/database';

export class ItemService {
  static async getAllItems(params: PaginationParams) {
    const { page, limit, search, category, status } = params;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    try {
      let query = supabase
        .from('items')
        .select('*', { count: 'exact' });

      // Apply search filter
      if (search) {
        query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
      }

      // Apply category filter
      if (category) {
        query = query.eq('category', category);
      }

      // Apply status filter
      if (status) {
        query = query.eq('status', status);
      }

      // Execute query with pagination
      const { data: items, error, count } = await query
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) {
        throw new AppError(`Database error: ${error.message}`, 500);
      }

      const totalCount = count || 0;
      const totalPages = Math.ceil(totalCount / limit);
      const hasNext = page < totalPages;
      const hasPrev = page > 1;

      return {
        data: items as Item[],
        pagination: {
          page,
          limit,
          total: totalCount,
          totalPages,
          hasNext,
          hasPrev,
        },
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Failed to fetch items', 500);
    }
  }

  static async getItemById(id: string): Promise<Item> {
    try {
      const { data: item, error } = await supabase
        .from('items')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') { // No rows returned
          throw new AppError('Item not found', 404);
        }
        throw new AppError(`Database error: ${error.message}`, 500);
      }

      if (!item) {
        throw new AppError('Item not found', 404);
      }

      return item as Item;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Failed to fetch item', 500);
    }
  }

  static async createItem(input: CreateItemInput): Promise<Item> {
    try {
      const itemData = {
        title: input.title,
        description: input.description || null,
        category: input.category || 'General',
        price: input.price || 0,
        quantity: input.quantity || 0,
        tags: input.tags || [],
        status: input.status || 'ACTIVE',
      };

      const { data: item, error } = await supabase
        .from('items')
        .insert(itemData)
        .select()
        .single();

      if (error) {
        throw new AppError(`Database error: ${error.message}`, 500);
      }

      return item as Item;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Failed to create item', 500);
    }
  }

  static async updateItem(id: string, input: UpdateItemInput): Promise<Item> {
    try {
      // Check if item exists first
      const existingItem = await this.getItemById(id);

      // Prepare update data (only include defined fields)
      const updateData: any = {};
      if (input.title !== undefined) updateData.title = input.title;
      if (input.description !== undefined) updateData.description = input.description;
      if (input.category !== undefined) updateData.category = input.category;
      if (input.price !== undefined) updateData.price = input.price;
      if (input.quantity !== undefined) updateData.quantity = input.quantity;
      if (input.tags !== undefined) updateData.tags = input.tags;
      if (input.status !== undefined) updateData.status = input.status;

      const { data: item, error } = await supabase
        .from('items')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw new AppError(`Database error: ${error.message}`, 500);
      }

      return item as Item;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Failed to update item', 500);
    }
  }

  static async deleteItem(id: string): Promise<{ message: string }> {
    try {
      // Check if item exists first
      await this.getItemById(id);

      const { error } = await supabase
        .from('items')
        .delete()
        .eq('id', id);

      if (error) {
        throw new AppError(`Database error: ${error.message}`, 500);
      }

      return { message: 'Item deleted successfully' };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Failed to delete item', 500);
    }
  }

  static async getCategories(): Promise<string[]> {
    try {
      const { data: categories, error } = await supabase
        .from('items')
        .select('category')
        .not('category', 'is', null);

      if (error) {
        throw new AppError(`Database error: ${error.message}`, 500);
      }

      // Extract unique categories
      const uniqueCategories = [...new Set(categories.map(item => item.category))];
      return uniqueCategories.sort();
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Failed to fetch categories', 500);
    }
  }

  static async searchItems(searchTerm: string, limit: number = 10): Promise<Item[]> {
    try {
      const { data: items, error } = await supabase
        .from('items')
        .select('*')
        .or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
        .limit(limit)
        .order('created_at', { ascending: false });

      if (error) {
        throw new AppError(`Database error: ${error.message}`, 500);
      }

      return items as Item[];
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Failed to search items', 500);
    }
  }
}