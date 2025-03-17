# DockLens Frontend

A modern web application built with React and Vite for managing and visualizing Docker container information.

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
