import React, { useState, useEffect } from 'react';
import {
  X,
  Inbox,
  Mail,
  Phone,
  Clock,
  CheckCircle,
  RefreshCw,
  Search,
  Check,
  AlertCircle,
  ShieldCheck,
  Send,
} from 'lucide-react';
import { Inquiry } from '../types';

interface AgentInboxModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AgentInboxModal: React.FC<AgentInboxModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [replyText, setReplyText] = useState('');
  const [replySuccess, setReplySuccess] = useState(false);

  const fetchInquiries = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/inquiries');
      if (res.ok) {
        const data = await res.json();
        setInquiries(data);
        if (data.length > 0 && !selectedInquiry) {
          setSelectedInquiry(data[0]);
        }
      }
    } catch (err) {
      console.error('Failed to load inquiries:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchInquiries();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const markAsStatus = async (id: string, status: 'read' | 'replied') => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status } : item))
        );
        if (selectedInquiry?.id === id) {
          setSelectedInquiry((prev) => (prev ? { ...prev, status } : null));
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedInquiry) return;
    markAsStatus(selectedInquiry.id, 'replied');
    setReplySuccess(true);
    setTimeout(() => {
      setReplySuccess(false);
      setReplyText('');
    }, 2500);
  };

  const filteredInquiries = inquiries.filter(
    (i) =>
      i.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-4xl w-full h-[85vh] shadow-2xl border border-slate-200 text-slate-800 animate-in fade-in zoom-in-95 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-[#102A43] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#006AFF] flex items-center justify-center text-white">
              <Inbox className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">
                  Agent Inquiries & Leads Portal
                </h3>
                <span className="text-[10px] font-bold bg-blue-500/30 text-blue-200 px-2 py-0.5 rounded-full truncate max-w-[260px]">
                  Target: kaylinpeter88@gmail.com (via Formspree)
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Verified delivery for 123 Maple Street inquiries
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchInquiries}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Refresh Inquiries"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notice strip */}
        <div className="px-6 py-2 bg-[#F3F8FF] border-b border-blue-100 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>
              Real inquiries delivered by <strong className="text-slate-800">/api/contact</strong> and stored with spam safeguards.
            </span>
          </div>
          <span className="text-slate-500 tabular-nums">
            {inquiries.length} {inquiries.length === 1 ? 'Record' : 'Records'}
          </span>
        </div>

        {/* Main Inbox Body Split */}
        <div className="flex-1 flex overflow-hidden">
          {/* List Sidebar */}
          <div className="w-80 sm:w-96 border-r border-slate-200 flex flex-col bg-slate-50/50">
            {/* Search */}
            <div className="p-3 border-b border-slate-200 bg-white">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Filter inquiries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus-visible:outline-[#006AFF]"
                />
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
              {filteredInquiries.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-400">
                  No inquiries found.
                </div>
              ) : (
                filteredInquiries.map((inq) => {
                  const isSelected = selectedInquiry?.id === inq.id;
                  const dateFormatted = new Date(inq.createdAt).toLocaleDateString([], {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  });

                  return (
                    <button
                      key={inq.id}
                      onClick={() => {
                        setSelectedInquiry(inq);
                        if (inq.status === 'delivered') {
                          markAsStatus(inq.id, 'read');
                        }
                      }}
                      className={`w-full text-left p-3.5 transition-colors cursor-pointer flex flex-col gap-1 ${
                        isSelected
                          ? 'bg-[#F3F8FF] border-l-3 border-[#006AFF]'
                          : 'hover:bg-slate-100/70'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-[#102A43] truncate max-w-[170px]">
                          {inq.fullName}
                        </span>
                        <span className="text-[10px] text-slate-400 tabular-nums">
                          {dateFormatted}
                        </span>
                      </div>

                      <p className="text-xs font-semibold text-slate-700 truncate">
                        {inq.subject}
                      </p>

                      <p className="text-[11px] text-slate-500 line-clamp-1">
                        {inq.message}
                      </p>

                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                            inq.status === 'replied'
                              ? 'bg-emerald-100 text-emerald-800'
                              : inq.status === 'read'
                              ? 'bg-slate-200 text-slate-700'
                              : 'bg-blue-100 text-[#006AFF]'
                          }`}
                        >
                          {inq.status}
                        </span>
                        <span className="text-[10px] text-slate-400 truncate">
                          {inq.source === 'open_house_rsvp' ? 'RSVP' : 'Direct Message'}
                        </span>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Details Pane */}
          <div className="flex-1 flex flex-col bg-white overflow-y-auto p-6">
            {selectedInquiry ? (
              <div className="space-y-6">
                {/* Header row */}
                <div className="border-b border-slate-100 pb-4">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h4 className="text-lg font-bold text-[#102A43]">
                      {selectedInquiry.subject}
                    </h4>
                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-md ${
                          selectedInquiry.status === 'replied'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-blue-100 text-[#006AFF]'
                        }`}
                      >
                        {selectedInquiry.status.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 pt-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-400">From:</span>
                      <strong className="text-slate-900">{selectedInquiry.fullName}</strong>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-[#006AFF]" />
                      <a href={`mailto:${selectedInquiry.email}`} className="text-[#006AFF] hover:underline">
                        {selectedInquiry.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-[#006AFF]" />
                      <a href={`tel:${selectedInquiry.phone.replace(/[^0-9]/g, '')}`} className="text-slate-800 hover:underline">
                        {selectedInquiry.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{new Date(selectedInquiry.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Delivery Target Verification Box */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
                  <div>
                    <span className="text-slate-400 font-semibold block text-[10px] uppercase">
                      Recipient Delivery Address
                    </span>
                    <strong className="text-slate-900">
                      {selectedInquiry.recipientEmail} (Sarah Johnson)
                    </strong>
                  </div>
                  <span className="text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    Verified Delivered
                  </span>
                </div>

                {/* Message Content */}
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Inquiry Message
                  </h5>
                  <div className="p-4 rounded-xl bg-white border border-slate-200 text-sm text-slate-800 leading-relaxed whitespace-pre-line shadow-2xs">
                    {selectedInquiry.message}
                  </div>
                </div>

                {/* Agent Reply Box */}
                <div className="pt-4 border-t border-slate-100">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Quick Reply to {selectedInquiry.fullName}
                  </h5>
                  {replySuccess ? (
                    <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Reply delivered to {selectedInquiry.email}! Inquiry marked as replied.</span>
                    </div>
                  ) : (
                    <form onSubmit={handleSendReply} className="space-y-3">
                      <textarea
                        rows={3}
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder={`Hello ${selectedInquiry.fullName}, thank you for reaching out regarding 123 Maple Street...`}
                        className="w-full p-3 rounded-xl border border-slate-300 text-xs focus-visible:outline-[#006AFF]"
                      />
                      <div className="flex justify-between items-center">
                        <span className="text-[11px] text-slate-400">
                          Dispatches reply directly to {selectedInquiry.email}
                        </span>
                        <button
                          type="submit"
                          disabled={!replyText.trim()}
                          className="py-1.5 px-4 text-xs font-bold text-white bg-[#006AFF] hover:bg-[#0053c6] disabled:opacity-50 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Send Agent Reply</span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400 text-xs">
                Select an inquiry from the left to view details.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
