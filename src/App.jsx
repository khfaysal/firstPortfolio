import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Components
import Navbar from './components/Navbar';

// Sections
import Hero from './sections/Hero';
import WhatIDo from './sections/WhatIDo';
import Projects from './sections/Projects';
import ToolkitProcessCTA from './sections/ToolkitProcessCTA';
import Experience from './sections/Experience';
import Contact from './sections/Contact';

// Lazy Loaded Admin Components
const AdminLogin = lazy(() => import('./admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./admin/AdminDashboard'));
const AdminRoute = lazy(() => import('./admin/AdminRoute'));

const PageLoader = () => (
  <div className="min-h-screen bg-bg-primary flex items-center justify-center">
    <div className="w-10 h-10 border-2 border-purple-primary/30 border-t-purple-primary rounded-full animate-spin" />
  </div>
);

// Portfolio Home Page
const PortfolioPage = () => (
  <div className="relative min-h-screen bg-bg-primary">
    <Navbar />
    <main className="overflow-x-hidden w-full relative">
      <Hero />
      <WhatIDo />
      <Projects />
      <ToolkitProcessCTA />
      <Experience />
      <Contact />
    </main>
  </div>
);

function App() {
  return (
    <Routes>
      {/* Portfolio */}
      <Route path="/" element={<PortfolioPage />} />

      {/* Admin - Lazy loaded with AuthProvider isolated here */}
      <Route
        path="/admin/*"
        element={
          <AuthProvider>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="" element={<AdminLogin />} />
                <Route
                  path="dashboard"
                  element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  }
                />
              </Routes>
            </Suspense>
          </AuthProvider>
        }
      />
    </Routes>
  );
}

export default App;

