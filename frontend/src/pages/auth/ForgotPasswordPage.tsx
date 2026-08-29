import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setSent(true);
    setIsLoading(false);
    toast.success('Reset link sent! Check your email.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Sanchi1_N-MP-220.jpg/1920px-Sanchi1_N-MP-220.jpg" alt="bg"
          className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-heritage-dark/90" />
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto px-4">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2">
            <span className="text-2xl">🏛️</span>
            <span className="text-2xl font-serif font-bold">Heritage<span className="text-gold">Verse</span></span>
          </Link>
        </div>

        <div className="glass rounded-2xl p-8 border border-gold/20">
          {!sent ? (
            <>
              <h1 className="text-2xl font-serif font-bold mb-2">Reset Password</h1>
              <p className="text-gray-400 mb-6">Enter your email and we'll send you a reset link.</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" required
                    className="w-full bg-white/5 border border-heritage-border rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold/50" />
                </div>
                <button type="submit" disabled={isLoading}
                  className="w-full bg-gold hover:bg-gold-light disabled:opacity-50 text-heritage-dark font-bold py-3 rounded-xl flex items-center justify-center">
                  {isLoading ? <div className="w-5 h-5 border-2 border-heritage-dark/30 border-t-heritage-dark rounded-full animate-spin" /> : 'Send Reset Link'}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <CheckCircle className="h-16 w-16 text-gold mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2">Check Your Email</h2>
              <p className="text-gray-400 mb-6">We've sent a password reset link to <strong className="text-white">{email}</strong></p>
              <button onClick={() => setSent(false)} className="text-gold hover:text-gold-light text-sm">
                Send again
              </button>
            </div>
          )}

          <div className="mt-6 text-center">
            <Link to="/auth/login" className="inline-flex items-center text-sm text-gray-400 hover:text-white">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
