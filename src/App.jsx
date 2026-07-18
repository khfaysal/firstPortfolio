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

// Admin
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import AdminRoute from './admin/AdminRoute';

// Portfolio Home Page
const PortfolioPage = () => (
  <div className="relative min-h-screen bg-bg-primary">
    <Navbar />
    <main>
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
    <AuthProvider>
      <Routes>
        {/* Portfolio */}
        <Route path="/" element={<PortfolioPage />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
