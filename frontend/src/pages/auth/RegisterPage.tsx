import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import toast from 'react-hot-toast';

const ROLES = [
  { value: 'tourist', label: 'Tourist', description: 'Explore and experience heritage sites' },
  { value: 'student', label: 'Student', description: 'Learn about cultural heritage' },
  { value: 'researcher', label: 'Researcher', description: 'Academic study and research' },
  { value: 'contributor', label: 'Community Contributor', description: 'Share local stories and traditions' },
  { value: 'authority', label: 'Heritage Authority', description: 'Manage and protect heritage sites' },
];

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('tourist');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setIsLoading(true);
    try {
      await register(name, email, password, role);
      toast.success('Welcome to HeritageVerse! Your journey begins now.');
      navigate('/');
    } catch {
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-8">
      <div className="absolute inset-0 z-0">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Virupaksha_Temple_Hampi_1.jpg/1920px-Virupaksha_Temple_Hampi_1.jpg"
          alt="Background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-heritage-dark via-heritage-dark/90 to-heritage-dark" />
      </div>

      <div className="relative z-10 w-full max-w-lg mx-auto px-4">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2">
            <span className="text-2xl">🏛️</span>
            <span className="text-2xl font-serif font-bold">
              Heritage<span className="text-gold">Verse</span>
            </span>
          </Link>
          <h1 className="text-3xl font-serif font-bold mt-4 mb-2">Join HeritageVerse</h1>
          <p className="text-gray-400">Start your cultural heritage journey</p>
        </div>

        <div className="glass rounded-2xl p-8 border border-gold/20">
          {/* Step indicator */}
          <div className="flex items-center mb-8">
            {[1, 2].map(s => (
              <React.Fragment key={s}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step >= s ? 'bg-gold text-heritage-dark' : 'bg-white/10 text-gray-400'}`}>
                  {s}
                </div>
                {s < 2 && (
                  <div className={`flex-1 h-0.5 mx-2 transition-all ${step > s ? 'bg-gold' : 'bg-white/10'}`} />
                )}
              </React.Fragment>
            ))}
          </div>

          <form onSubmit={step === 1 ? (e) => { e.preventDefault(); setStep(2); } : handleSubmit} className="space-y-5">
            {step === 1 ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your full name" required
                      className="w-full bg-white/5 border border-heritage-border rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold/50" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" required
                      className="w-full bg-white/5 border border-heritage-border rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold/50" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Min. 6 characters" required
                      className="w-full bg-white/5 border border-heritage-border rounded-xl pl-11 pr-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold/50" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Repeat password" required
                      className="w-full bg-white/5 border border-heritage-border rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold/50" />
                  </div>
                </div>
                <button type="submit" className="w-full bg-gold hover:bg-gold-light text-heritage-dark font-bold py-3 rounded-xl transition-all">
                  Continue →
                </button>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">I am a...</label>
                  <div className="space-y-2">
                    {ROLES.map(r => (
                      <label key={r.value} className={`flex items-start p-4 rounded-xl border cursor-pointer transition-all ${role === r.value ? 'border-gold bg-gold/10' : 'border-heritage-border bg-white/5 hover:border-gold/40'}`}>
                        <input type="radio" name="role" value={r.value} checked={role === r.value} onChange={e => setRole(e.target.value)} className="mt-1 mr-3 text-gold" />
                        <div>
                          <div className="font-medium text-white">{r.label}</div>
                          <div className="text-sm text-gray-400">{r.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button type="button" onClick={() => setStep(1)} className="flex-1 border border-heritage-border hover:border-gold/40 text-gray-300 font-medium py-3 rounded-xl transition-all">
                    ← Back
                  </button>
                  <button type="submit" disabled={isLoading}
                    className="flex-1 bg-gold hover:bg-gold-light disabled:opacity-50 text-heritage-dark font-bold py-3 rounded-xl transition-all flex items-center justify-center">
                    {isLoading ? <div className="w-5 h-5 border-2 border-heritage-dark/30 border-t-heritage-dark rounded-full animate-spin" /> : 'Create Account'}
                  </button>
                </div>
              </>
            )}
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link to="/auth/login" className="text-gold hover:text-gold-light font-medium">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
