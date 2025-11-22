import React, { useState } from 'react';
import { X, Loader2, Sparkles } from 'lucide-react';

interface GeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (topic: string) => Promise<void>;
}

export const GeneratorModal: React.FC<GeneratorModalProps> = ({ isOpen, onClose, onGenerate }) => {
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    
    setIsLoading(true);
    await onGenerate(topic);
    setIsLoading(false);
    setTopic('');
    onClose();
  };

  const suggestions = [
    "OCR Teknolojisinin Eski Metinlere Etkisi",
    "Dijital Arşivlerde Kaybolan Bağlam Sorunu",
    "Big Data ve Tarihsel Demografi",
    "Sözlü Tarih ve Dijital Kayıt Teknolojileri"
  ];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-xl font-serif font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            Yapay Zeka İçerik Üreticisi
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-slate-600 mb-6">
            Gemini AI kullanarak dijital tarihçilik üzerine özel bir makale oluşturun. Merak ettiğiniz konuyu aşağıya yazın.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="relative mb-6">
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Örn: Dijitalleşme ve Ortaçağ haritaları..."
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              />
            </div>

            <div className="mb-6">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Önerilen Başlıklar</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setTopic(s)}
                    className="text-xs px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors text-left"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !topic}
              className="w-full py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-200"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Makale Hazırlanıyor...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Makaleyi Oluştur
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};