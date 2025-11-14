import { useState, useEffect } from 'react';
import { ItemsService } from '../services/items.service';
import { Item, PaginationParams } from '../types/items.types';

interface UseItemsReturn {
  data: Item[];
  total: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useItems(params: PaginationParams): UseItemsReturn {
  const [data, setData] = useState<Item[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await ItemsService.getItems(params);
      setData(response.data);
      setTotal(response.pagination.total);
      setTotalPages(response.pagination.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch items');
      setData([]);
      setTotal(0);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [params.page, params.limit, params.search, params.category, params.status]);

  return {
    data,
    total,
    totalPages,
    loading,
    error,
    refetch: fetchItems,
  };
}