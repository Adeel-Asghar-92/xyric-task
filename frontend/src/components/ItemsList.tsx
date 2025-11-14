import React, { useState } from 'react';
import { Edit2, Trash2, Search, Plus, Loader2 } from 'lucide-react';
import { ItemsService } from '../services/items.service';
import { useItems } from '../hooks/useItems';
import { useDebounce } from '../hooks/useDebounce';
import { useToast } from '../hooks/useToast';
import { ItemForm } from './ItemForm';
import { Pagination } from './Pagination';
import { Item, CreateItemInput, UpdateItemInput } from '../types/items.types';

export const ItemsList: React.FC = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const debouncedSearch = useDebounce(searchQuery, 300);
  
  const { data, total, totalPages, loading, error, refetch } = useItems({
    page,
    limit: pageSize,
    search: debouncedSearch || undefined,
  });

  const { showToast } = useToast();

  const handleCreate = () => {
    setSelectedItem(null);
    setIsFormOpen(true);
  };

  const handleEdit = (item: Item) => {
    setSelectedItem(item);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) {
      return;
    }

    setDeletingId(id);
    try {
      await ItemsService.deleteItem(id);
      showToast('Item deleted successfully', 'success');
      // Refetch data and adjust pagination if needed
      if (data.length === 1 && page > 1) {
        setPage(page - 1);
      } else {
        refetch();
      }
    } catch (err) {
      showToast(
        err instanceof Error ? err.message : 'Failed to delete item',
        'error'
      );
    } finally {
      setDeletingId(null);
    }
  };

  const handleFormSubmit = async (formData: CreateItemInput | UpdateItemInput) => {
    try {
      if (selectedItem) {
        await ItemsService.updateItem(selectedItem.id, formData as UpdateItemInput);
        showToast('Item updated successfully', 'success');
      } else {
        await ItemsService.createItem(formData as CreateItemInput);
        showToast('Item created successfully', 'success');
      }
      setIsFormOpen(false);
      setSelectedItem(null);
      refetch();
      setPage(1); // Reset to first page after creating/updating
    } catch (err) {
      showToast(
        err instanceof Error ? err.message : 'Failed to save item',
        'error'
      );
      throw err;
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800';
      case 'INACTIVE':
        return 'bg-yellow-100 text-yellow-800';
      case 'DISCONTINUED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Item Management</h1>
          <p className="text-gray-600">Manage your inventory with real-time search and filtering</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search items by title, description, or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={handleCreate}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Plus className="w-5 h-5" />
                Add Item
              </button>
            </div>
          </div>

          {loading && data.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
          ) : error ? (
            <div className="p-6 text-center text-red-600">
              {error}
            </div>
          ) : data.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-500 mb-4">No items found</p>
              <button
                onClick={handleCreate}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Create your first item
              </button>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tags
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-900">{item.title}</span>
                            {item.description && (
                              <span className="text-sm text-gray-500 line-clamp-1">
                                {item.description}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{item.category}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {formatPrice(item.price)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{item.quantity}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                              item.status
                            )}`}
                          >
                            {item.status.toLowerCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {item.tags && item.tags.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {item.tags.slice(0, 2).map((tag) => (
                                <span
                                  key={tag}
                                  className="inline-flex px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                              {item.tags.length > 2 && (
                                <span className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                                  +{item.tags.length - 2}
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-sm text-gray-400">No tags</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleEdit(item)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              disabled={deletingId === item.id}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                              title="Delete"
                            >
                              {deletingId === item.id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Pagination
                currentPage={page}
                totalPages={totalPages}
                pageSize={pageSize}
                totalItems={total}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
              />
            </>
          )}
        </div>
      </div>

      {isFormOpen && (
        <ItemForm
          item={selectedItem}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setIsFormOpen(false);
            setSelectedItem(null);
          }}
        />
      )}
    </div>
  );
};