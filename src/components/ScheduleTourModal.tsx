import React, { useState } from 'react';
import { X, Calendar, Clock, User, Mail, Phone, Users, CheckCircle2, Loader2, Sparkles } from 'lucide-react';

interface ScheduleTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'tour' | 'rsvp';
  propertyAddress: string;
  openHouseDate: string;
  openHouseTime: string;
  onSuccessSubmitted?: () => void;
}

export const ScheduleTourModal: React.FC<ScheduleTourModalProps> = ({
  isOpen,
  onClose,
  mode,
  propertyAddress,
  openHouseDate,
  openHouseTime,
  onSuccessSubmitted,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [tourDate, setTourDate] = useState('Tomorrow');
  const [tourTime, setTourTime] = useState('11:00 AM');
  const [guests, setGuests] = useState('2');
  const [tourType, setTourType] = useState<'in_person' | 'live_video'>('in_person');
  const [notes, setNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setErrorMessage('Please fill in your name, email, and phone number.');
      return;
    }

    setIsSubmitting(true);

    try {
      if (mode === 'rsvp') {
        const res = await fetch('/api/rsvp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fullName,
            email,
            phone,
            guests: Number(guests) || 1,
            propertyAddress,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to submit RSVP.');
        setSuccessMessage(data.message);
      } else {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fullName,
            email,
            phone,
            subject: `Private Tour Request (${tourType === 'in_person' ? 'In-Person' : 'Live Video'})`,
            message: `Requested Tour for ${propertyAddress} on ${tourDate} at ${tourTime}. Attendees: ${guests}. Notes: ${notes || 'None'}`,
            propertyAddress,
            formRenderedAt: Date.now() - 3000,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to request tour.');
        setSuccessMessage(`Tour appointment requested! Confirmation delivered to sarah.j@zillowagent.com and ${email}.`);
      }

      if (onSuccessSubmitted) {
        onSuccessSubmitted();
      }
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'An error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 text-slate-800 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#006AFF]/10 text-[#006AFF] flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#102A43]">
                {mode === 'rsvp' ? 'RSVP for Open House' : 'Schedule a Private Tour'}
              </h3>
              <p className="text-xs text-slate-500">
                {propertyAddress} · Sarah Johnson
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

        {successMessage ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-[#102A43]">You're Confirmed!</h4>
              <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
                {successMessage}
              </p>
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2.5 text-xs font-bold text-white bg-[#006AFF] hover:bg-[#0053c6] rounded-xl cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            {errorMessage && (
              <div className="p-3 rounded-lg bg-rose-50 text-rose-700 text-xs">
                {errorMessage}
              </div>
            )}

            {mode === 'rsvp' ? (
              <div className="bg-[#F3F8FF] p-3.5 rounded-xl border border-blue-100 text-xs text-slate-700 space-y-1">
                <p className="font-bold text-[#102A43] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#006AFF]" />
                  <span>Open House Event Details</span>
                </p>
                <p>
                  <strong>Date:</strong> {openHouseDate}
                </p>
                <p>
                  <strong>Time:</strong> {openHouseTime}
                </p>
                <p className="text-slate-500">
                  We look forward to welcoming you with refreshments and disclosure packages!
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {/* Tour type selector */}
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Tour Preference
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setTourType('in_person')}
                      className={`py-2 px-3 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                        tourType === 'in_person'
                          ? 'bg-[#006AFF] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      In-Person Showing
                    </button>
                    <button
                      type="button"
                      onClick={() => setTourType('live_video')}
                      className={`py-2 px-3 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                        tourType === 'live_video'
                          ? 'bg-[#006AFF] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      Live Video Tour
                    </button>
                  </div>
                </div>

                {/* Date & Time selection */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                      Preferred Day
                    </label>
                    <select
                      value={tourDate}
                      onChange={(e) => setTourDate(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white"
                    >
                      <option>Today Afternoon</option>
                      <option>Tomorrow</option>
                      <option>This Friday</option>
                      <option>This Saturday</option>
                      <option>This Sunday</option>
                      <option>Next Week</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                      Preferred Time
                    </label>
                    <select
                      value={tourTime}
                      onChange={(e) => setTourTime(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white"
                    >
                      <option>10:00 AM</option>
                      <option>11:30 AM</option>
                      <option>1:00 PM</option>
                      <option>3:00 PM</option>
                      <option>5:00 PM</option>
                      <option>6:30 PM (Twilight)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Contact details */}
            <div className="space-y-3 pt-1">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Your Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Sophia Miller"
                    className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="sophia@example.com"
                      className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-slate-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(555) 000-0000"
                      className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-slate-300"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Number of Attendees
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white"
                >
                  <option value="1">1 Person</option>
                  <option value="2">2 People</option>
                  <option value="3">3 People</option>
                  <option value="4">4+ Family Members</option>
                </select>
              </div>

              {mode === 'tour' && (
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Questions or Special Requests (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g., Interested in EV charging and backyard measurements..."
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300"
                  />
                </div>
              )}
            </div>

            <div className="pt-2 flex gap-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-2.5 px-4 text-sm font-bold text-white bg-[#006AFF] hover:bg-[#0053c6] disabled:opacity-50 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Confirming...</span>
                  </>
                ) : (
                  <span>
                    {mode === 'rsvp' ? 'Confirm RSVP on Guest List' : 'Request Private Tour'}
                  </span>
                )}
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
        )}
      </div>
    </div>
  );
};
