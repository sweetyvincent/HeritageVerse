import React, { useState } from 'react';
import { UploadCloud, X, Send } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const CommunitySubmitPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Story submitted successfully! Pending moderation.');
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-heritage-dark px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" toastOptions={{ style: { background: '#12121A', color: '#fff', border: '1px solid #1E1E2E' } }} />
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-serif font-bold text-white mb-4">Share Your <span className="text-gold">Story</span></h1>
          <p className="text-gray-400">Contribute to our digital archive. Share local legends, historical facts, or personal experiences related to our heritage.</p>
        </div>

        <form onSubmit={handleSubmit} className="glass p-8 rounded-2xl border border-gray-800 space-y-6">
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Story Title *</label>
            <input type="text" required className="w-full bg-heritage-dark border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors" placeholder="e.g., The Hidden Frescoes of Ajanta" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Category *</label>
              <select className="w-full bg-heritage-dark border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors appearance-none">
                <option>Folk Tales</option>
                <option>Historical Photos</option>
                <option>Traditional Crafts</option>
                <option>Personal History</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
              <input type="text" className="w-full bg-heritage-dark border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors" placeholder="e.g., Maharashtra, India" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Story Content *</label>
            <textarea required rows={8} className="w-full bg-heritage-dark border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors resize-none" placeholder="Write your story here..."></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Cover Image (Optional)</label>
            <div className="border-2 border-dashed border-gray-700 rounded-xl p-8 text-center hover:border-gold/50 transition-colors cursor-pointer bg-heritage-dark">
              <UploadCloud className="w-10 h-10 text-gray-500 mx-auto mb-3" />
              <p className="text-sm text-gray-400">Drag and drop an image, or click to browse</p>
              <p className="text-xs text-gray-600 mt-2">JPG, PNG up to 5MB</p>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 flex justify-end">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`bg-gold hover:bg-gold-light text-heritage-dark px-8 py-3 rounded-lg font-bold flex items-center transition-all shadow-[0_0_20px_rgba(212,160,23,0.3)] ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Submitting...' : <><Send className="w-5 h-5 mr-2" /> Submit for Review</>}
            </button>
          </div>
          <p className="text-center text-xs text-gray-500 mt-4">By submitting, you agree to our community guidelines. All stories are reviewed by moderators before publishing.</p>
        </form>
      </div>
    </div>
  );
};

export default CommunitySubmitPage;
