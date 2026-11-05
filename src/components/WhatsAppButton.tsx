import React, { useState } from 'react';
import { MessageCircle, Settings, Check, X } from 'lucide-react';

interface WhatsAppButtonProps {
  initialPhone?: string;
  propertyAddress?: string;
  onUpdatePhone?: (newPhone: string) => void;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  initialPhone = '+15551234567',
  propertyAddress = '123 Maple Street',
  onUpdatePhone,
}) => {
  const [phoneNumber, setPhoneNumber] = useState(initialPhone);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [tempPhone, setTempPhone] = useState(initialPhone);
  const [customGreeting, setCustomGreeting] = useState(
    `Hello Sarah, I saw your listing for ${propertyAddress} on Zillow Real Estate and would like to learn more.`
  );

  const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');

  const handleOpenWhatsApp = () => {
    const encoded = encodeURIComponent(customGreeting);
    const url = `https://wa.me/${cleanPhone}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneNumber(tempPhone);
    setIsConfigOpen(false);
    if (onUpdatePhone) {
      onUpdatePhone(tempPhone);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
      {/* Settings Modal Popover */}
      {isConfigOpen && (
        <div className="mb-2 w-80 bg-white rounded-2xl p-5 shadow-2xl border border-slate-200 text-slate-800 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">
              <Settings className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp Configuration</span>
            </div>
            <button
              onClick={() => setIsConfigOpen(false)}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-500 mb-3">
            Configure the direct mobile number used for incoming WhatsApp chats:
          </p>

          <form onSubmit={handleSaveConfig} className="space-y-3">
            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                WhatsApp Phone (with Country Code)
              </label>
              <input
                type="text"
                value={tempPhone}
                onChange={(e) => setTempPhone(e.target.value)}
                placeholder="+15551234567"
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus-visible:outline-2 focus-visible:outline-emerald-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                Default Intro Message
              </label>
              <textarea
                value={customGreeting}
                onChange={(e) => setCustomGreeting(e.target.value)}
                rows={2}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus-visible:outline-2 focus-visible:outline-emerald-500"
              />
            </div>

            <div className="flex gap-2 pt-1">
              <button
                type="submit"
                className="flex-1 py-1.5 px-3 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg flex items-center justify-center gap-1 cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save Number</span>
              </button>
              <button
                type="button"
                onClick={() => setIsConfigOpen(false)}
                className="py-1.5 px-3 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Button Cluster */}
      <div className="flex items-center gap-2">
        {/* Subtle quick config gear */}
        <button
          onClick={() => {
            setTempPhone(phoneNumber);
            setIsConfigOpen(!isConfigOpen);
          }}
          className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-500 hover:text-slate-800 shadow-md border border-slate-200 flex items-center justify-center transition-all cursor-pointer opacity-70 hover:opacity-100"
          title="Configure WhatsApp Phone Number"
          aria-label="Configure WhatsApp settings"
        >
          <Settings className="w-4 h-4" />
        </button>

        {/* Floating WhatsApp Action Button */}
        <button
          onClick={handleOpenWhatsApp}
          className="group relative flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-3 rounded-full shadow-xl shadow-emerald-900/25 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          aria-label="Chat with Sarah Johnson on WhatsApp"
        >
          {/* Official WhatsApp SVG mark */}
          <svg
            className="w-6 h-6 fill-white shrink-0"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.586 1.761.853 2.796.853h.001c3.181 0 5.768-2.586 5.768-5.766 0-3.18-2.587-5.766-5.769-5.766zm9.969 5.768c0 5.485-4.484 9.969-9.969 9.969-1.637 0-3.187-.406-4.57-1.125l-5.461 1.431 1.458-5.328c-.808-1.449-1.264-3.119-1.264-4.897 0-5.485 4.484-9.969 9.969-9.969 5.485 0 9.969 4.484 9.969 9.969z" />
          </svg>

          <span className="text-xs sm:text-sm font-bold tracking-tight whitespace-nowrap">
            Chat on WhatsApp
          </span>
        </button>
      </div>
    </div>
  );
};
