import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Item, CreateItemInput, UpdateItemInput } from '../types/items.types';

// Hardcoded categories
const CATEGORIES = [
  'Electronics',
  'Clothing',
  'Books',
  'Home & Garden',
  'Sports',
  'Beauty',
  'Toys',
  'Automotive',
  'Health',
  'Food & Beverages',
  'Office Supplies',
  'Jewelry',
  'Furniture',
  'Music',
  'Movies',
  'Video Games',
  'Art & Crafts',
  'Pet Supplies',
  'Baby Products',
  'Tools'
];

interface ItemFormProps {
  item?: Item | null;
  onSubmit: (data: CreateItemInput | UpdateItemInput) => Promise<void>;
  onCancel: () => void;
}

export const ItemForm: React.FC<ItemFormProps> = ({ item, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<CreateItemInput>({
    title: '',
    description: '',
    category: 'Electronics', // Default category
    price: 0,
    quantity: 0,
    tags: [],
    status: 'ACTIVE',
  });
  const [tagInput, setTagInput] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [showCustomCategory, setShowCustomCategory] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (item) {
      setFormData({
        title: item.title,
        description: item.description || '',
        category: item.category,
        price: item.price,
        quantity: item.quantity,
        tags: item.tags || [],
        status: item.status,
      });
      
      // Check if the item's category exists in our hardcoded categories
      // If not, show custom category input
      if (item.category && !CATEGORIES.includes(item.category)) {
        setCustomCategory(item.category);
        setShowCustomCategory(true);
      }
    }
  }, [item]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const value = e.target.value;
    
    if (e.target.type === 'select-one') {
      // Handle dropdown selection
      if (value === 'custom') {
        setShowCustomCategory(true);
        setFormData(prev => ({ ...prev, category: '' }));
      } else {
        setShowCustomCategory(false);
        setCustomCategory('');
        setFormData(prev => ({ ...prev, category: value }));
      }
    } else {
      // Handle custom category input
      setCustomCategory(value);
      setFormData(prev => ({ ...prev, category: value }));
    }
  };

  const handleUseExistingCategory = () => {
    setShowCustomCategory(false);
    setCustomCategory('');
    setFormData(prev => ({ ...prev, category: CATEGORIES[0] }));
  };

  const handleInputChange = (
    field: keyof CreateItemInput,
    value: string | number
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > 255) {
      newErrors.title = 'Title must be less than 255 characters';
    }

    if (formData.description && formData.description.length > 5000) {
      newErrors.description = 'Description must be less than 5000 characters';
    }

    if (!formData.category!.trim()) {
      newErrors.category = 'Category is required';
    } else if (formData.category!.length > 100) {
      newErrors.category = 'Category must be less than 100 characters';
    }

    if (formData.price! < 0) {
      newErrors.price = 'Price must be non-negative';
    }

    if (formData.quantity! < 0) {
      newErrors.quantity = 'Quantity must be non-negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addTag = (e: React.FormEvent) => {
    e.preventDefault();
    const tag = tagInput.trim();
    if (tag && !formData.tags!.includes(tag)) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags!, tag] }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({ ...prev, tags: prev.tags!.filter(tag => tag !== tagToRemove) }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {item ? 'Edit Item' : 'Create New Item'}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            type="button"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter item title"
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.description ? 'border-red-500' : ''
              }`}
              placeholder="Enter item description"
              rows={4}
            />
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              
              {!showCustomCategory ? (
                <div className="space-y-2">
                  <select
                    id="category"
                    value={formData.category}
                    onChange={handleCategoryChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.category ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    {CATEGORIES.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                    <option value="custom">+ Add Custom Category</option>
                  </select>
                  
                  <button
                    type="button"
                    onClick={() => setShowCustomCategory(true)}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    Can't find your category? Type custom category
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={customCategory || formData.category}
                    onChange={handleCategoryChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.category ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter custom category"
                  />
                  
                  <button
                    type="button"
                    onClick={handleUseExistingCategory}
                    className="text-sm text-gray-600 hover:text-gray-700"
                  >
                    ← Choose from existing categories
                  </button>
                </div>
              )}
              
              {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value as any)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
                <option value="DISCONTINUED">Discontinued</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                Price ($) *
              </label>
              <input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.price ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="0.00"
              />
              {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
            </div>

            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                Quantity *
              </label>
              <input
                id="quantity"
                type="number"
                min="0"
                value={formData.quantity}
                onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || 0)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.quantity ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="0"
              />
              {errors.quantity && <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <div  className="flex gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Add a tag and press Enter"
                onKeyDown={(e) => e.key === 'Enter' && addTag(e)}
              />
              <button
                onClick={addTag}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Add
              </button>
            </div>
            {formData.tags!.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags!.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:bg-blue-200 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Saving...' : item ? 'Update Item' : 'Create Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};