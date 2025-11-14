import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import helmet from 'helmet';
import itemRoutes from './routes/item.routes';
import { errorHandler } from './middleware/error.middleware';
import { testConnection } from './config/database';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: '*',
  credentials: true,
}));
  // origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],


// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    // Test database connection
    const { data, error } = await require('./config/supabase').supabase
      .from('items')
      .select('count')
      .limit(1);

    res.json({
      success: true,
      message: 'Server is running',
      database: error ? 'disconnected' : 'connected',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
    });
  } catch (error) {
    res.json({
      success: true,
      message: 'Server is running',
      database: 'disconnected',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
    });
  }
});

// API routes
app.use('/api/items', itemRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// Global error handler
app.use(errorHandler);

// Start server
const startServer = async () => {
  try {
    // Test database connection
    await testConnection();
    
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || 'production'}`);
      console.log(`🔗 Health check: http://localhost:${PORT}/health`);
      console.log(`📝 API Documentation: http://localhost:${PORT}/api/items`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;