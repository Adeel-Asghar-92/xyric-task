import { Router } from 'express';
import {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  getCategories,
  searchItems,
} from '../controllers/item.controller';
import { validate, validateQuery, validateParams } from '../middleware/validation.middleware';
import {
  createItemSchema,
  updateItemSchema,
  paginationSchema,
  itemIdSchema,
} from '../validators/item.validator';
import { asyncHandler } from '../middleware/error.middleware';

const router = Router();

router.get('/', validateQuery(paginationSchema), asyncHandler(getAllItems));
router.get('/categories', asyncHandler(getCategories));
router.get('/search', asyncHandler(searchItems));
router.get('/:id', validateParams(itemIdSchema), asyncHandler(getItemById));
router.post('/', validate(createItemSchema), asyncHandler(createItem));
router.put('/:id', validateParams(itemIdSchema), validate(updateItemSchema), asyncHandler(updateItem));
router.delete('/:id', validateParams(itemIdSchema), asyncHandler(deleteItem));

export default router;