import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = schema.parse(req.body);
      req.body = validated;
      next();
    } catch (error) {
      next(error);
    }
  };
};

export const validateQuery = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const rawQuery = {
        page: req.query.page ? parseInt(req.query.page as string) : undefined,
        limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
        search: req.query.search as string,
        category: req.query.category as string,
        status: req.query.status as string,
      };

      const validated = schema.parse(rawQuery);
      req.query = validated as any;
      next();
    } catch (error) {
      next(error);
    }
  };
};

export const validateParams = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Parse and validate req.params
      const validated = schema.parse(req.params);
      // Replace the original params with the validated, potentially transformed data
      req.params = validated as any;
      next();
    } catch (error) {
      // Pass validation error to the global error handler
      next(error);
    }
  };
};