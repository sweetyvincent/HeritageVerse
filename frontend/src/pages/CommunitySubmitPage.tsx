import React, { useState, useRef } from 'react';
import { UploadCloud, X, Send, Image as ImageIcon, CheckCircle, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const CommunitySubmitPage: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Folk Tales');
  const [location, setLocation] = useState('');
  const [content, setContent] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error('Image size must be under 10MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        toast.success('Image selected successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        toast.success('Image uploaded!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error('Please fill in the required fields');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast.success('Story submitted for community review!');
    }, 1200);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-heritage-dark px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" />
      <div className="max-w-3xl mx-auto">
        <Link to="/community" className="inline-flex items-center space-x-2 text-sm text-gray-400 hover:text-white mb-6">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Community</span>
        </Link>

        {submitted ? (
          <div className="glass p-12 rounded-3xl border border-gold/30 text-center animate-fadeInUp">
            <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-white mb-3">Story Submitted!</h2>
            <p className="text-gray-300 max-w-md mx-auto mb-8">
              Thank you for contributing to the preservation of India's cultural heritage. Your story has been sent to the moderation queue.
            </p>
            {imagePreview && (
              <div className="max-w-sm mx-auto mb-8 rounded-2xl overflow-hidden border border-heritage-border">
                <img src={imagePreview} alt="Uploaded story" className="w-full h-48 object-cover" />
              </div>
            )}
            <div className="flex justify-center gap-4">
              <Link to="/community" className="bg-gold text-heritage-dark font-bold px-6 py-3 rounded-xl hover:bg-amber-500 transition-all">
                Browse Community Stories
              </Link>
              <button onClick={() => { setSubmitted(false); setTitle(''); setContent(''); setImagePreview(null); }} className="bg-white/10 text-white px-6 py-3 rounded-xl hover:bg-white/20 transition-all">
                Submit Another
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="text-center mb-10">
              <h1 className="text-4xl font-serif font-bold text-white mb-4">Share Your <span className="text-gold">Story</span></h1>
              <p className="text-gray-400">Contribute oral histories, folk legends, local photographs, and traditions.</p>
            </div>

            <form onSubmit={handleSubmit} className="glass p-8 rounded-2xl border border-heritage-border space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Story Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full bg-heritage-card border border-heritage-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold/60 transition-colors"
                  placeholder="e.g., The Forgotten Temple of Karnataka"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Category *</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full bg-heritage-card border border-heritage-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold/60 transition-colors"
                  >
                    <option value="Folk Tales">Folk Tales & Legends</option>
                    <option value="Historical Photos">Historical Photographs</option>
                    <option value="Traditional Crafts">Traditional Crafts & Art</option>
                    <option value="Festivals">Festivals & Rituals</option>
                    <option value="Oral History">Oral Histories</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Location / Region</label>
                  <input
                    type="text"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    className="w-full bg-heritage-card border border-heritage-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold/60 transition-colors"
                    placeholder="e.g., Hampi, Karnataka"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Story Content *</label>
                <textarea
                  required
                  rows={6}
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  className="w-full bg-heritage-card border border-heritage-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold/60 transition-colors resize-none"
                  placeholder="Write your story, memories, or historical narrative..."
                />
              </div>

              {/* Working Image Upload Area */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Attach Photo / Artifact Image</label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />

                {imagePreview ? (
                  <div className="relative rounded-2xl overflow-hidden border border-gold/40 max-h-72">
                    <img src={imagePreview} alt="Preview" className="w-full h-64 object-cover" />
                    <button
                      type="button"
                      onClick={() => setImagePreview(null)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-black/70 hover:bg-red-600 text-white transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg text-xs text-green-400 font-medium">
                      ✓ Image Attached
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={e => e.preventDefault()}
                    onDrop={handleDrop}
                    className="border-2 border-dashed border-heritage-border hover:border-gold/60 rounded-2xl p-8 text-center transition-colors cursor-pointer bg-heritage-card/50 hover:bg-white/5"
                  >
                    <UploadCloud className="w-10 h-10 text-gold mx-auto mb-3" />
                    <p className="text-sm text-gray-300 font-medium">Click to select photo or drag & drop</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG, WebP up to 10MB</p>
                  </div>
                )}
              </div>

              <div className="border-t border-heritage-border pt-6 flex items-center justify-between">
                <span className="text-xs text-gray-400">All submissions are reviewed before publication</span>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gold hover:bg-amber-500 text-heritage-dark font-bold px-8 py-3.5 rounded-xl flex items-center transition-all shadow-xl shadow-gold/20 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-heritage-dark/30 border-t-heritage-dark rounded-full animate-spin mr-2" />
                  ) : (
                    <Send className="w-4 h-4 mr-2" />
                  )}
                  <span>Submit Story</span>
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default CommunitySubmitPage;
