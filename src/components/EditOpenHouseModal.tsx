import React, { useState } from 'react';
import { X, Calendar, Clock, Check, AlertCircle } from 'lucide-react';

interface EditOpenHouseModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentDate: string;
  currentTime: string;
  onSave: (newDate: string, newTime: string) => Promise<void>;
}

export const EditOpenHouseModal: React.FC<EditOpenHouseModalProps> = ({
  isOpen,
  onClose,
  currentDate,
  currentTime,
  onSave,
}) => {
  const [date, setDate] = useState(currentDate);
  const [time, setTime] = useState(currentTime);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date.trim() || !time.trim()) {
      setError('Both Date and Time are required.');
      return;
    }
    setError(null);
    setIsSaving(true);
    try {
      await onSave(date, time);
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to update schedule.');
    } finally {
      setIsSaving(false);
    }
  };

  const presetDates = [
    'Saturday, October 12',
    'Sunday, October 13',
    'Saturday, November 14',
    'Sunday, November 15',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 text-slate-800 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#006AFF]/10 text-[#006AFF] flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#102A43]">
                Edit Open House Schedule
              </h3>
              <p className="text-xs text-slate-500">
                Update date and time for 123 Maple Street
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 rounded-lg bg-rose-50 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 mb-1">
              Open House Date
            </label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="e.g. Saturday, October 12"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#006AFF]"
            />
            {/* Quick preset selector buttons */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {presetDates.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setDate(p)}
                  className={`text-[11px] px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
                    date === p
                      ? 'bg-[#006AFF] text-white font-semibold'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 mb-1">
              Open House Time Window
            </label>
            <input
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="e.g. 12:00 PM – 3:00 PM"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#006AFF]"
            />
          </div>

          <p className="text-[11px] text-slate-500 bg-[#F3F8FF] p-2.5 rounded-lg border border-blue-100">
            Note: This immediately updates the announcement across the website and synchronizes with the server settings.
          </p>

          <div className="flex gap-2.5 pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 py-2.5 px-4 text-sm font-bold text-white bg-[#006AFF] hover:bg-[#0053c6] disabled:opacity-50 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Check className="w-4 h-4" />
              <span>{isSaving ? 'Saving...' : 'Update Schedule'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-4 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
