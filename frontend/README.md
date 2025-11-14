# Item Management System - Frontend

A modern, responsive React frontend application for managing items with real-time search, pagination, and CRUD operations.

## 🚀 Features

- **📋 Item Management**: Full CRUD operations (Create, Read, Update, Delete)
- **🔍 Real-time Search**: Debounced search with 300ms delay
- **📄 Pagination**: Efficient pagination with page size controls
- **📱 Responsive Design**: Mobile-first responsive UI
- **🎯 Type Safety**: Full TypeScript implementation
- **✨ Modern UI**: Clean, professional interface with Tailwind CSS
- **📬 Toast Notifications**: User feedback for all actions
- **🏷️ Category Management**: Dropdown with popular categories + custom input
- **⚡ Optimistic Updates**: Immediate UI feedback for better UX

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Hooks (useState, useEffect, custom hooks)
- **HTTP Client**: Native Fetch API
- **Build Tool**: Create React App / Vite

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd item-management-frontend
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_API_URL=http://localhost:3000/api
   ```

4. **Start the development server**
   ```bash
   pnpm run dev
   ```
   The application will open at `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── ItemsList.tsx   # Main items listing with search & pagination
│   ├── ItemForm.tsx    # Create/Edit item form with validation
│   ├── Pagination.tsx  # Pagination controls
│   └── Toast.tsx       # Toast notification component
├── hooks/              # Custom React hooks
│   ├── useItems.ts     # Items data fetching hook
│   ├── useDebounce.ts  # Debounce hook for search
│   └── useToast.ts     # Toast notification hook
├── services/           # API service layer
│   └── items.service.ts # Items API service
├── types/              # TypeScript type definitions
│   └── items.types.ts  # Item-related types
├── contexts/           # React contexts
│   └── ToastContext.tsx # Toast notification context
└── lib/                # Utility libraries
    └── api.ts          # API client configuration
```

## 🔧 API Integration

The frontend integrates with a backend API that provides:

### Endpoints Used:
- `GET /api/items` - Get items with pagination and search
- `GET /api/items/:id` - Get single item by ID
- `POST /api/items` - Create new item
- `PUT /api/items/:id` - Update existing item
- `DELETE /api/items/:id` - Delete item

### Expected Backend Response Format:
```typescript
{
  success: boolean;
  data: Item[] | Item;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  }
}
```

## 🎯 Key Components

### ItemsList
- Main component displaying items in a table
- Real-time search with debouncing
- Create, edit, and delete actions
- Responsive table design

### ItemForm
- Modal form for creating/editing items
- Form validation with error messages
- Category dropdown with 20+ predefined categories
- Tag management system
- Status selection

### Pagination
- Page navigation controls
- Page size selector (10, 25, 50, 100)
- Total items counter
- Smart page number display

## 💡 Custom Hooks

### useItems
```typescript
const { data, total, totalPages, loading, error, refetch } = useItems({
  page: 1,
  limit: 10,
  search: 'query',
  category: 'Electronics',
  status: 'ACTIVE'
});
```

### useDebounce
```typescript
const debouncedSearch = useDebounce(searchQuery, 300);
```

### useToast
```typescript
const { showToast } = useToast();
showToast('Item created successfully', 'success');
```

## 🎨 Styling

The application uses **Tailwind CSS** for styling with:
- Consistent color scheme
- Responsive grid layouts
- Smooth transitions and hover effects
- Professional typography
- Accessible color contrasts

## 📱 Responsive Design

- **Mobile**: Stacked layout, compact table
- **Tablet**: Adjusted column sizes
- **Desktop**: Full table with all columns visible
- **Form modals**: Responsive width and scrolling

## 🔒 TypeScript Types

Key type definitions:

```typescript
interface Item {
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
```

## 🚀 Performance Features

- **Debounced Search**: 300ms delay to reduce API calls
- **Pagination**: Limits data transfer for large datasets
- **Optimistic Updates**: Immediate UI feedback
- **Efficient Re-renders**: Proper React hook dependencies
- **Loading States**: Better user experience during operations

## 🧪 Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run test suite
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler

## 🌟 Best Practices Implemented

- ✅ Component composition and reusability
- ✅ Proper error handling and user feedback
- ✅ Loading states for better UX
- ✅ TypeScript for type safety
- ✅ Responsive design principles
- ✅ Accessibility considerations
- ✅ Clean code architecture
- ✅ Efficient state management

## 🔄 State Management

The application uses React's built-in state management:
- `useState` for local component state
- `useContext` for global toast notifications
- Custom hooks for data fetching and reuse

## 📈 Future Enhancements

- [ ] Advanced filtering (price range, date ranges)
- [ ] Bulk operations
- [ ] Data export functionality
- [ ] Dark mode support
- [ ] Real-time updates with WebSockets
- [ ] Offline support with service workers
- [ ] Advanced search with multiple fields

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions:
1. Check the documentation
2. Open an issue on GitHub
3. Contact the development team

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**