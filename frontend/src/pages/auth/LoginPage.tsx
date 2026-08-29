import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Eye, EyeOff, Mail, Lock, User, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const demoAccounts = [
    { email: 'admin@heritageverse.com', password: 'Heritage@123', role: 'Admin' },
    { email: 'tourist@heritageverse.com', password: 'Heritage@123', role: 'Tourist' },
    { email: 'authority@heritageverse.com', password: 'Heritage@123', role: 'Heritage Authority' },
    { email: 'student@heritageverse.com', password: 'Heritage@123', role: 'Student' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back to HeritageVerse!');
      navigate('/');
    } catch (err) {
      toast.error('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (demoEmail: string, demoPassword: string, role: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setIsLoading(true);
    try {
      await login(demoEmail, demoPassword);
      toast.success(`Logged in as ${role}`);
      navigate(role === 'Admin' || role === 'Heritage Authority' ? '/dashboard' : '/');
    } catch {
      toast.error('Demo login failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Taj_Mahal%2C_Agra%2C_India_edit3.jpg/1920px-Taj_Mahal%2C_Agra%2C_India_edit3.jpg"
          alt="Background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-heritage-dark via-heritage-dark/90 to-heritage-dark" />
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto px-4 py-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2">
            <span className="text-2xl">🏛️</span>
            <span className="text-2xl font-serif font-bold">
              Heritage<span className="text-gold">Verse</span>
            </span>
          </Link>
          <h1 className="text-3xl font-serif font-bold mt-4 mb-2">Welcome Back</h1>
          <p className="text-gray-400">Continue your heritage journey</p>
        </div>

        {/* Form Card */}
        <div className="glass rounded-2xl p-8 border border-gold/20">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full bg-white/5 border border-heritage-border rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold/50 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-white/5 border border-heritage-border rounded-xl pl-11 pr-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold/50 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-600 bg-white/5" />
                <span className="text-sm text-gray-400">Remember me</span>
              </label>
              <Link to="/auth/forgot-password" className="text-sm text-gold hover:text-gold-light">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gold hover:bg-gold-light disabled:opacity-50 text-heritage-dark font-bold py-3 rounded-xl transition-all flex items-center justify-center"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-heritage-dark/30 border-t-heritage-dark rounded-full animate-spin" />
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-heritage-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-[#12121A] text-gray-400">Or sign in as</span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              {demoAccounts.map(account => (
                <button
                  key={account.email}
                  onClick={() => handleDemoLogin(account.email, account.password, account.role)}
                  className="text-xs bg-white/5 hover:bg-white/10 border border-heritage-border rounded-lg px-3 py-2 text-gray-300 hover:text-white transition-all text-left"
                >
                  <div className="font-medium">{account.role}</div>
                  <div className="text-gray-500 truncate">{account.email}</div>
                </button>
              ))}
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-gray-400">
            Don't have an account?{' '}
            <Link to="/auth/register" className="text-gold hover:text-gold-light font-medium">
              Sign up for free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
