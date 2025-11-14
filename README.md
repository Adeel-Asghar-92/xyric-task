# Submission Guidelines

## 📋 GitHub Repository Information

### Repository Structure
```
item-management-system/
├── backend/                 # Node.js + Express + TypeScript backend
│   ├── src/
│   ├── prisma/
│   ├── package.json
│   └── README.md
├── frontend/                # React + TypeScript frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── README.md
├── docs/                    # Documentation
└── README.md               # Main project README
```

### GitHub Repository Link
**Repository URL:** `https://github.com/your-username/item-management-system`

*(Note: Replace with your actual GitHub repository URL)*

---

## 🎯 Technology Choices & Rationale

### Backend Technology Choices

| Technology | Choice Reason |
|------------|---------------|
| **Node.js + Express** | Lightweight, fast execution, excellent for I/O-heavy operations, large ecosystem |
| **TypeScript** | Type safety, better developer experience, reduced runtime errors |
| **PostgreSQL** | Reliable, ACID compliance, excellent for complex queries, JSON support |
| **Supabase** | Instant REST API, real-time capabilities, built-in auth, reduces backend code |
| **Zod** | Runtime type safety, excellent validation, TypeScript integration |

### Frontend Technology Choices

| Technology | Choice Reason |
|------------|---------------|
| **React + TypeScript** | Component reusability, type safety, large ecosystem, excellent performance |
| **Tailwind CSS** | Utility-first, rapid UI development, consistent design system |
| **Lucide React** | Lightweight, beautiful icons, tree-shakeable |
| **Custom Hooks** | Logic reuse, clean component architecture, testability |
| **Fetch API** | Native browser API, no additional dependencies |

### Architecture Decisions

1. **Separation of Concerns**: Clean separation between frontend/backend
2. **RESTful API Design**: Standardized endpoints
3. **Component-Based Architecture**: Reusable, maintainable UI components
4. **Custom Hooks**: Business logic encapsulation
5. **Service Layer**: Clean separation between API calls and UI logic

