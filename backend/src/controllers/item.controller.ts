import { Request, Response } from 'express';
import { ItemService } from '../services/item.service';
import { PaginationInput } from '../validators/item.validator';

export const getAllItems = async (req: Request, res: Response) => {
  const paginationParams = req.query as unknown as PaginationInput;
  
  const result = await ItemService.getAllItems(paginationParams);
  
  res.json({
    success: true,
    data: result.data,
    pagination: result.pagination,
  });
};

export const getItemById = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  const item = await ItemService.getItemById(id);
  
  res.json({
    success: true,
    data: item,
  });
};

export const createItem = async (req: Request, res: Response) => {
  const itemData = req.body;
  
  const item = await ItemService.createItem(itemData);
  
  res.status(201).json({
    success: true,
    data: item,
    message: 'Item created successfully',
  });
};

export const updateItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;
  
  const item = await ItemService.updateItem(id, updates);
  
  res.json({
    success: true,
    data: item,
    message: 'Item updated successfully',
  });
};

export const deleteItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  await ItemService.deleteItem(id);
  
  res.json({
    success: true,
    message: 'Item deleted successfully',
  });
};

export const getCategories = async (req: Request, res: Response) => {
  const categories = await ItemService.getCategories();
  
  res.json({
    success: true,
    data: categories,
  });
};

export const searchItems = async (req: Request, res: Response) => {
  const { q, limit } = req.query;
  
  if (!q || typeof q !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'Search query is required',
    });
  }

  const searchLimit = limit ? parseInt(limit as string) : 10;
  const items = await ItemService.searchItems(q, searchLimit);
  
  res.json({
    success: true,
    data: items,
  });
};