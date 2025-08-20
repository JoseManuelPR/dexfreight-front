# 🚛 DexFreight - Transport Management System

A modern, responsive transport logistics management system built with **Vue 3**, **TypeScript**, and **Tailwind CSS**. This project implements a comprehensive solution for managing shipments, vehicles, drivers, and fleet operations.

[![Vue](https://img.shields.io/badge/Vue-3.5.13-4FC08D?style=flat&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0.11-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0.0-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-3.2.4-6E9F18?style=flat&logo=vitest&logoColor=white)](https://vitest.dev/)

## 🎯 Project Overview

DexFreight is a comprehensive transport management system designed for logistics companies in Peru. It provides tracking, fleet management, driver performance monitoring, and comprehensive analytics for transportation operations.

### Key Features

- 📊 **Dashboard** - Metrics and KPIs for transport operations
- 📦 **Shipment Management** - Complete tracking from pickup to delivery
- 🚚 **Fleet Management** - Vehicle status, maintenance, and optimization
- 👨‍💼 **Driver Management** - Performance tracking and assignment
- 📱 **Responsive Design** - Mobile-first approach for all devices
- 🌙 **Dark Mode** - Built-in theme switching
- 🧪 **Comprehensive Testing** - 80+ unit tests with 100% pass rate
- ⚡ **Performance Optimized** - Code splitting, lazy loading, and compression

## 🏗️ Tech Stack

### Core Technologies
- **Frontend**: Vue 3 (Composition API)
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS (Based on [TailAdmin](https://tailadmin.com/docs) template)
- **State Management**: Pinia
- **Routing**: Vue Router 4
- **Testing**: Vitest + Vue Test Utils

### Architectural Decisions
- **Vue 3**: Modern reactivity system and Composition API for better code organization
- **TypeScript**: Type safety and better developer experience for a technical assessment
- **Vite**: Fast development server and optimized builds for quick iteration
- **Pinia**: Simpler state management compared to Vuex, perfect for this scope
- **Tailwind CSS**: Rapid UI development with utility-first approach

### UI Framework Base
This project is built upon the **TailAdmin** free template, a modern admin dashboard template built with Tailwind CSS. For more information about TailAdmin features and documentation, visit: [https://tailadmin.com/docs](https://tailadmin.com/docs)

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ 
- npm 9+ or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/JoseManuelPR/dexfreight-front
   cd dexfreight-front
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available/Basic Scripts

```bash
# Development
npm run dev             # Start development server

# Production
npm run build           # Build for production
npm run prod            # Start the production server

# Code Quality
npm run lint            # ESLint code linting
npm run format          # Prettier code formatting

# Testing
npm run test            # Run tests in watch mode
npm run test:run        # Run all tests once
npm run test:coverage   # Generate coverage report

# Analysis
npm run analyze         # Bundle size analysis
npm run build:stats     # Build with detailed stats
```

## 📁 Project Structure

```
src/
├── 📱 pages/                 # Main application pages
│   ├── Dashboard.vue         # Main dashboard
│   ├── Shipments.vue         # Shipment management
│   ├── Vehicles.vue          # Fleet management
│   └── Drivers.vue           # Driver management
├── 🧩 components/            # Reusable UI components
│   ├── layout/               # Layout components (header, sidebar)
│   ├── ui/                   # Basic UI components (buttons, modals)
│   ├── shipments/            # Shipment-specific components
│   ├── vehicles/             # Vehicle-specific components
│   └── drivers/              # Driver-specific components
├── 🗃️ store/                 # Pinia state management
│   └── index.ts              # Main store with all modules
├── 🛣️ router/                # Vue Router configuration
│   └── index.ts              # Route definitions
├── 🔧 services/              # API services and utilities
│   ├── api.ts                # Main API service
│   └── cache.ts              # Caching utilities
├── 📊 types/                 # TypeScript type definitions
│   └── models.ts             # Core data models
├── 🎨 assets/                # Static assets
│   └── main.css              # Global styles
├── 🧪 __tests__/             # Test files
│   ├── pages/                # Page component tests
│   └── components/           # Component tests
└── 📁 mock/                  # Mock data for development
    ├── shipments.json        # Sample shipment data
    ├── vehicles.json         # Sample vehicle data
    └── drivers.json          # Sample driver data
```

## 🗄️ Mock Data

The application uses comprehensive mock data for development and testing, located in the `src/mock/` directory:

### Data Files
- **`src/mock/shipments.json`** - Contains 15+ sample shipments with complete tracking information, customer details, and route data
- **`src/mock/vehicles.json`** - Fleet data including trucks, vans, trailers with maintenance schedules and driver assignments
- **`src/mock/drivers.json`** - Driver profiles with performance metrics, ratings, and delivery statistics

The mock data is automatically loaded through the API service layer (`src/services/api.ts`) with realistic latency simulation and error handling.

## 🧪 Testing

For detailed testing information, see [`src/__tests__/README.md`](src/__tests__/README.md).

## 📊 Performance & Analysis Reports

### Performance Report
For detailed performance analysis and optimization insights, see [`performance-report.pdf`](./performance-report.pdf).

### Bundle Analysis Report
For comprehensive bundle size analysis and optimization recommendations, see [`bundle-analysis-report.pdf`](./bundle-analysis-report.pdf).

## 🏗️ Architecture

### State Management (Pinia)
- **Modular stores** for each domain (shipments, vehicles, drivers, dashboard)
- **Computed properties** for derived state
- **Error handling** with user-friendly messages
- **Caching layer** for API responses

### API Layer
- **Centralized API service** with consistent error handling
- **Mock data integration** with realistic latency
- **Response caching** for improved performance
- **TypeScript interfaces** for all API responses

### Performance Optimizations
- **Code splitting** by route and feature
- **Lazy loading** for all page components
- **Bundle optimization** with manual chunks
- **Compression** Gzip
- **CSS code splitting** for faster initial load

## 🎨 Design System

Built on **TailAdmin's** design foundation with:
- **Consistent spacing** and typography scales
- **Custom color palette** optimized for logistics
- **Dark/light mode** support
- **Responsive breakpoints** from mobile to desktop
- **Accessible components** with proper ARIA labels

## 📈 Performance

### Build Optimization
- **Manual chunks** for vendor libraries
- **Tree shaking** for unused code elimination
- **Minification** with Terser
- **Asset optimization** with modern formats

### Runtime Performance
- **Virtual scrolling** for large data sets
- **Efficient filtering** with computed properties
- **Optimized re-renders** with Vue 3 reactivity
- **Caching strategies** for API responses

### Development Guidelines
- Follow **TypeScript** strict mode
- Maintain **test coverage** for new features
- Use **conventional commits** format
- Ensure **responsive design** compatibility
- Follow **Vue 3 Composition API** patterns

---

**Built with ❤️ for modern transport logistics by Josema https://www.instagram.com**