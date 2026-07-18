import { motion } from 'framer-motion';
import { FaGoogle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const AdminLogin = () => {
  const { user, isAdmin, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && isAdmin) {
      navigate('/admin/dashboard');
    }
  }, [user, isAdmin, navigate]);

  const handleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      await signInWithGoogle();
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center px-6">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-purple-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-violet-accent/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card rounded-3xl p-8 md:p-12 max-w-md w-full text-center relative z-10"
      >
        {/* Logo */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-purple mx-auto flex items-center justify-center mb-6 purple-glow">
          <span className="text-2xl font-heading font-black text-white">KH</span>
        </div>

        <h1 className="text-2xl font-heading font-bold text-text-primary mb-2">
          Admin Portal
        </h1>
        <p className="text-text-muted text-sm mb-8">
          Sign in with your authorized Google account to manage your portfolio projects.
        </p>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6"
          >
            <p className="text-red-400 text-sm">{error}</p>
          </motion.div>
        )}

        <button
          onClick={handleSignIn}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-bg-elevated border border-border-default hover:border-purple-primary/40 text-text-primary font-medium transition-all duration-300 hover:purple-glow disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <FaGoogle size={18} className="text-purple-primary group-hover:scale-110 transition-transform" />
          {loading ? 'Signing in...' : 'Sign in with Google'}
        </button>

        <p className="text-text-muted text-xs mt-6">
          Only the authorized admin email can access this portal.
        </p>

        {/* Back to portfolio */}
        <a
          href="/"
          className="inline-block mt-6 text-purple-light text-sm hover:text-text-primary transition-colors"
        >
          ← Back to Portfolio
        </a>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
