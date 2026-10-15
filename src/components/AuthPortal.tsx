import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AuthPortal() {
  const { isAuthOpen, closeAuth, login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthOpen) {
      // Reset state when closed
      setUsername('');
      setPassword('');
      setError('');
      setIsLogin(false);
    }
  }, [isAuthOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('Fields cannot be empty.');
      return;
    }

    if (isLogin) {
      const success = login(username, password);
      if (success) {
        closeAuth();
      } else {
        setError('Invalid credentials. Access denied.');
      }
    } else {
      const success = register(username, password);
      if (success) {
        closeAuth();
      } else {
        setError('User already exists in the system.');
      }
    }
  };

  return (
    <AnimatePresence>
      {isAuthOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/60 pointer-events-auto"
            onClick={closeAuth}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-md bg-[#0a0a0a] border border-white/10 p-8 relative overflow-hidden shadow-[0_0_100px_rgba(255,255,255,0.05)] pointer-events-auto"
          >
            {/* Glowing orb behind modal */}
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-white/5 blur-[80px] rounded-full pointer-events-none" />
            
            <button 
              onClick={closeAuth}
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <div className="mb-8 relative z-10">
              <Shield className="w-8 h-8 text-white mb-4" />
              <h2 className="text-3xl font-display font-medium text-white mb-2">
                {isLogin ? 'System Login' : 'Candidate Portal'}
              </h2>
              <p className="text-white/50 text-sm leading-relaxed">
                {isLogin 
                  ? 'Enter your credentials to access the internal systems.' 
                  : 'Register your details to apply for ARM recruitment and access active projects.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
              <div>
                <input 
                  type="text" 
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-white/40 transition-colors font-mono text-sm"
                />
              </div>
              <div>
                <input 
                  type="password" 
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-white/40 transition-colors font-mono text-sm"
                />
              </div>
              
              <AnimatePresence>
                {error && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-red-400 text-sm font-mono pt-2"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <button 
                type="submit"
                className="w-full bg-white text-black font-medium py-3 px-4 flex items-center justify-center gap-2 hover:bg-white/90 transition-colors mt-6 group"
              >
                {isLogin ? 'Authenticate' : 'Initialize Application'}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-white/10 text-center relative z-10">
              <button 
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                }}
                className="text-white/40 hover:text-white text-sm transition-colors font-mono"
              >
                {isLogin 
                  ? "Don't have an account? Register." 
                  : "Already registered? Login here."}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
