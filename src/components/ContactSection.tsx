import React, { useState, useEffect } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Loader2,
  ExternalLink,
  MessageSquare,
} from 'lucide-react';
import { AgentInfo } from '../types';

interface ContactSectionProps {
  agent: AgentInfo;
  onOpenInbox: () => void;
  defaultSubject?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  agent,
  onOpenInbox,
  defaultSubject = 'Inquiry regarding 123 Maple Street',
}) => {
  const [formRenderedAt] = useState<number>(() => Date.now());

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: defaultSubject,
    message: '',
    _bot_catcher: '', // Honeypot field
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [deliveredDetails, setDeliveredDetails] = useState<{
    inquiryId: string;
    deliveredTo: string;
    timestamp: string;
  } | null>(null);

  // Update default subject if prop changes
  useEffect(() => {
    if (defaultSubject) {
      setFormData((prev) => ({ ...prev, subject: defaultSubject }));
    }
  }, [defaultSubject]);

  const validate = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errors.fullName = 'Full Name is required (minimum 2 characters).';
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email format (e.g., name@domain.com).';
    }

    const phoneRegex = /^[0-9+()\-.\s]{7,20}$/;
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required.';
    } else if (!phoneRegex.test(formData.phone.trim())) {
      errors.phone = 'Please enter a valid phone number (at least 7 digits).';
    }

    if (!formData.subject.trim() || formData.subject.trim().length < 3) {
      errors.subject = 'Subject is required (minimum 3 characters).';
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = 'Message is required (minimum 10 characters).';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(null);

    // Client-side validation check
    if (!validate()) {
      setSubmitError('Please correct the highlighted fields before submitting.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          formRenderedAt,
          propertyAddress: '123 Maple Street',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.fieldErrors) {
          setFieldErrors(data.fieldErrors);
        }
        throw new Error(data.error || 'Failed to submit inquiry. Please try again.');
      }

      // Success
      setSubmitSuccess(data.message || 'Your inquiry has been successfully delivered!');
      setDeliveredDetails({
        inquiryId: data.inquiryId,
        deliveredTo: data.deliveredTo || 'sarah.j@zillowagent.com',
        timestamp: new Date().toLocaleTimeString(),
      });

      // Clear form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: defaultSubject,
        message: '',
        _bot_catcher: '',
      });
      setFieldErrors({});
    } catch (err: unknown) {
      console.error('Submission error:', err);
      const message = err instanceof Error ? err.message : 'An unexpected error occurred.';
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  return (
    <section id="contact" className="py-20 bg-[#F3F8FF] border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-[#006AFF] mb-2">
            Direct Agent Inquiries
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#102A43] tracking-tight">
            Contact Sarah Johnson
          </h2>
          <p className="mt-2 text-base text-slate-600">
            Have questions about 123 Maple Street or looking to schedule a private walkthrough? Send a direct message below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact Info & Verification Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div>
                <h3 className="text-xl font-extrabold text-[#102A43]">
                  Direct Contact Information
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Deliveries are routed straight to Sarah Johnson's certified inbox.
                </p>
              </div>

              {/* Clickable phone link */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#006AFF]/10 text-[#006AFF] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs uppercase font-semibold text-slate-400">
                    Phone & Text
                  </span>
                  <a
                    href={`tel:${agent.phone.replace(/[^0-9]/g, '')}`}
                    className="block text-base font-bold text-[#102A43] hover:text-[#006AFF] transition-colors tabular-nums"
                  >
                    {agent.phone}
                  </a>
                  <p className="text-[11px] text-slate-500">Available Mon–Sun 8:00 AM – 8:00 PM</p>
                </div>
              </div>

              {/* Clickable email link */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#006AFF]/10 text-[#006AFF] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs uppercase font-semibold text-slate-400">
                    Direct Contact & Delivery Target
                  </span>
                  <a
                    href={agent.email.startsWith('http') ? agent.email : `mailto:${agent.email}`}
                    target={agent.email.startsWith('http') ? '_blank' : undefined}
                    rel={agent.email.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="block text-sm font-bold text-[#006AFF] hover:underline transition-colors truncate"
                  >
                    {agent.email}
                  </a>
                  <p className="text-[11px] text-slate-500">Formspree Direct Email Delivery</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#006AFF]/10 text-[#006AFF] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs uppercase font-semibold text-slate-400">
                    Featured Residence
                  </span>
                  <p className="text-sm font-bold text-slate-800">
                    123 Maple Street
                  </p>
                  <p className="text-xs text-slate-500">Pleasant Valley, CA 94566</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#006AFF]/10 text-[#006AFF] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs uppercase font-semibold text-slate-400">
                    Showing Availability
                  </span>
                  <p className="text-xs font-semibold text-slate-700">
                    Private Tours by appointment daily. Open House on advertised schedule.
                  </p>
                </div>
              </div>

              {/* Live Agent Inbox Quick Tool */}
              <div className="pt-4 border-t border-slate-100 bg-[#F3F8FF] -mx-6 -mb-6 p-4 rounded-b-2xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span className="text-slate-700 font-medium">Backend Inquiries Portal Active</span>
                </div>
                <button
                  onClick={onOpenInbox}
                  className="font-bold text-[#006AFF] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>View Leads Inbox</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Delivery Architecture & Transparency Notice */}
            <div className="bg-white rounded-xl p-4 border border-slate-200 text-xs text-slate-600 space-y-1.5">
              <div className="font-bold text-slate-800 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#006AFF]" />
                <span>Backend Delivery Architecture</span>
              </div>
              <p>
                Messages are processed by our Express backend (<code className="bg-slate-100 px-1 py-0.5 rounded text-[11px] text-slate-800">/api/contact</code>), validated against spam bots, and delivered to <strong className="text-slate-800">kaylinpeter88@gmail.com</strong> via Formspree.
              </p>
            </div>
          </div>

          {/* Right Column: The Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              <div className="mb-6">
                <h3 className="text-xl font-extrabold text-[#102A43]">
                  Send a Direct Message
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  All fields marked with an asterisk (<span className="text-rose-500">*</span>) are required.
                </p>
              </div>

              {/* Success Notification Alert */}
              {submitSuccess && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-2 animate-in fade-in">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="space-y-1 text-sm">
                      <p className="font-bold">{submitSuccess}</p>
                      {deliveredDetails && (
                        <div className="text-xs text-emerald-800 space-y-0.5">
                          <p>
                            Delivered to: <strong>{deliveredDetails.deliveredTo}</strong>
                          </p>
                          <p>
                            Inquiry Tracking Ref: <code className="bg-emerald-100/60 px-1 py-0.5 rounded">{deliveredDetails.inquiryId}</code> · Received at {deliveredDetails.timestamp}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="pt-2 flex gap-3 text-xs">
                    <button
                      onClick={() => setSubmitSuccess(null)}
                      className="font-semibold text-emerald-800 underline hover:text-emerald-950 cursor-pointer"
                    >
                      Send another message
                    </button>
                    <span>·</span>
                    <button
                      onClick={onOpenInbox}
                      className="font-semibold text-[#006AFF] underline hover:text-blue-800 cursor-pointer"
                    >
                      Inspect in Agent Inbox
                    </button>
                  </div>
                </div>
              )}

              {/* Error Notification Alert */}
              {submitError && (
                <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 flex items-start gap-3 text-sm animate-in fade-in">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Message Submission Failed</p>
                    <p className="text-xs text-rose-700 mt-0.5">{submitError}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* Honeypot field (hidden from real users, traps bots) */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="_bot_catcher">Do not fill this</label>
                  <input
                    type="text"
                    id="_bot_catcher"
                    name="_bot_catcher"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData._bot_catcher}
                    onChange={handleFieldChange}
                  />
                </div>

                {/* Full Name */}
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5"
                  >
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleFieldChange}
                    placeholder="e.g. Eleanor Vance"
                    disabled={isSubmitting}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#006AFF] ${
                      fieldErrors.fullName
                        ? 'border-rose-400 bg-rose-50/30'
                        : 'border-slate-300 hover:border-slate-400 bg-white'
                    }`}
                  />
                  {fieldErrors.fullName && (
                    <p className="text-xs text-rose-600 mt-1">{fieldErrors.fullName}</p>
                  )}
                </div>

                {/* Grid: Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5"
                    >
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFieldChange}
                      placeholder="e.g. eleanor@example.com"
                      disabled={isSubmitting}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#006AFF] ${
                        fieldErrors.email
                          ? 'border-rose-400 bg-rose-50/30'
                          : 'border-slate-300 hover:border-slate-400 bg-white'
                      }`}
                    />
                    {fieldErrors.email && (
                      <p className="text-xs text-rose-600 mt-1">{fieldErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5"
                    >
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFieldChange}
                      placeholder="(555) 000-0000"
                      disabled={isSubmitting}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#006AFF] ${
                        fieldErrors.phone
                          ? 'border-rose-400 bg-rose-50/30'
                          : 'border-slate-300 hover:border-slate-400 bg-white'
                      }`}
                    />
                    {fieldErrors.phone && (
                      <p className="text-xs text-rose-600 mt-1">{fieldErrors.phone}</p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5"
                  >
                    Subject <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleFieldChange}
                    placeholder="e.g. Inquiry regarding 123 Maple Street"
                    disabled={isSubmitting}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#006AFF] ${
                      fieldErrors.subject
                        ? 'border-rose-400 bg-rose-50/30'
                        : 'border-slate-300 hover:border-slate-400 bg-white'
                    }`}
                  />
                  {fieldErrors.subject && (
                    <p className="text-xs text-rose-600 mt-1">{fieldErrors.subject}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5"
                  >
                    Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleFieldChange}
                    placeholder="Tell Sarah about your timeframe, questions on 123 Maple Street, or request a private viewing time..."
                    disabled={isSubmitting}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#006AFF] ${
                      fieldErrors.message
                        ? 'border-rose-400 bg-rose-50/30'
                        : 'border-slate-300 hover:border-slate-400 bg-white'
                    }`}
                  />
                  {fieldErrors.message && (
                    <p className="text-xs text-rose-600 mt-1">{fieldErrors.message}</p>
                  )}
                </div>

                {/* Prominent Blue Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 text-base font-bold text-white bg-[#006AFF] hover:bg-[#0053c6] active:bg-[#0047a8] disabled:opacity-70 disabled:cursor-not-allowed rounded-xl shadow-md shadow-blue-600/25 transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#006AFF]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Validating & Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Security and privacy reassurance */}
                <div className="pt-2 text-center">
                  <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                    <span>Protected with spam prevention. Delivered to kaylinpeter88@gmail.com via Formspree.</span>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
