# DocKLens Frontend

DocKLens is a modern web application for monitoring and managing Docker containers. This application provides a user-friendly interface for viewing container status, analyzing images, and performing security scans.

## Application Architecture

The application follows SOLID principles and a modular architecture to ensure maintainability and scalability:

### Directory Structure

```
src/
├── api/                    # API services
│   ├── baseApi.js          # Base API client
│   ├── containerService.js # Container-related API calls
│   ├── imageService.js     # Image-related API calls
│   ├── securityService.js  # Security scan API calls
│   └── index.js            # API exports
├── components/             # UI components
│   ├── containers/         # Container-related components
│   ├── images/             # Image-related components
│   ├── security/           # Security-related components
│   ├── ui/                 # Reusable UI components
│   ├── layout/             # Layout components
│   └── index.js            # Component exports
├── context/                # React context for global state
│   └── AppContext.jsx      # Application context
├── hooks/                  # Custom React hooks
│   ├── useContainers.js    # Container data hook
│   ├── useSecurityScan.js  # Security scan hook
│   └── index.js            # Hook exports
├── pages/                  # Application pages/routes
│   ├── Dashboard.jsx
│   ├── Containers.jsx
│   └── ...
├── utils/                  # Utility functions
├── assets/                 # Static assets
├── App.jsx                 # Main application component
└── main.jsx                # Application entry point
```

### Key Architecture Principles

1. **Separation of Concerns**
   - API layer is separate from UI components
   - Components are organized by feature domain
   - Reusable UI components are isolated in the `ui` directory

2. **Single Responsibility Principle**
   - Each component has a single responsibility
   - API services are divided by domain (containers, images, security)
   - Custom hooks manage specific data concerns

3. **Dependency Injection**
   - Services are injected where needed rather than imported directly
   - Context provides global state to components that need it

4. **Interface Segregation**
   - Components accept only the props they need
   - API services expose only domain-specific methods

5. **Don't Repeat Yourself (DRY)**
   - Reusable components for common UI elements (Button, Card, Modal)
   - Shared hooks for common data operations

## Component Design

### Core UI Components

- **Button**: Reusable button with multiple variants
- **Card**: Content container with optional header and footer
- **Modal**: Overlay dialog with standardized layout

### Feature Components

Components are grouped by feature domain (containers, images, security) to make the codebase more navigable and maintainable.

### Hooks

Custom hooks encapsulate data fetching and state management logic:
- `useContainers`: Container data and operations
- `useSecurityScan`: Security scanning functionality

### Context

`AppContext` provides global application state and Docker connection status.

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

## Development Workflow

When adding new features, follow these guidelines:

1. Create new API services in the appropriate domain directory
2. Add new UI components in the relevant feature directory
3. For reusable UI elements, add them to the `ui` directory
4. Create custom hooks for complex state management
5. Update the context if the feature requires global state

## Features

- Modern React-based user interface
- Real-time container monitoring
- Interactive data visualization using Recharts
- Responsive design with Tailwind CSS
- Type-safe development environment

## Tech Stack

- **Frontend Framework:** React 19
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** Headless UI
- **Icons:** Heroicons
- **Data Fetching:** TanStack Query (React Query)
- **Routing:** React Router DOM
- **Charts:** Recharts

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd docklens-fe
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview the production build locally

## Project Structure

```
docklens-fe/
├── src/
│   ├── api/         # API integration and services
│   ├── assets/      # Static assets
│   ├── components/  # Reusable React components
│   ├── pages/       # Page components
│   ├── App.jsx      # Main application component
│   └── main.jsx     # Application entry point
├── public/          # Public static files
└── ...config files  # Various configuration files
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
