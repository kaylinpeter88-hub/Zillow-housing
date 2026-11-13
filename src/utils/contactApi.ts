import { Inquiry, SiteSettings } from '../types';

export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mwllzvgd';
export const DEFAULT_WHATSAPP_NUMBER = '07042086283';

export const DEFAULT_SETTINGS: SiteSettings = {
  openHouseDate: 'Saturday, October 12',
  openHouseTime: '12:00 PM – 3:00 PM',
  openHouseStatus: 'Upcoming',
  whatsappPhone: DEFAULT_WHATSAPP_NUMBER,
  agentPhone: '(555) 123-4567',
  agentEmail: 'kaylinpeter88@gmail.com',
  featuredPrice: '$425,000',
  propertyAddress: '123 Maple Street',
};

const SETTINGS_STORAGE_KEY = 'zillow_real_estate_settings_v1';
const INQUIRIES_STORAGE_KEY = 'zillow_real_estate_inquiries_v1';

/**
 * Formats a phone number for WhatsApp wa.me links.
 * Converts 11-digit local Nigerian numbers starting with 0 (e.g., 07042086283)
 * into international E.164 digits (2347042086283) while preserving already
 * prefixed international numbers.
 */
export function normalizeWhatsAppDigits(rawPhone: string): string {
  const trimmed = rawPhone.trim();
  const digits = trimmed.replace(/[^0-9]/g, '');
  if (!digits) return '2347042086283';
  if (!trimmed.startsWith('+') && digits.startsWith('0') && digits.length === 11) {
    return `234${digits.slice(1)}`;
  }
  return digits;
}

export function buildWhatsAppUrl(phone: string, message: string): string {
  const normalized = normalizeWhatsAppDigits(phone);
  return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`;
}

function getLocalInquiries(): Inquiry[] {
  try {
    const raw = localStorage.getItem(INQUIRIES_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // ignore storage errors
  }
  return [];
}

function saveLocalInquiry(inquiry: Inquiry): void {
  try {
    const existing = getLocalInquiries();
    localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify([inquiry, ...existing]));
  } catch {
    // ignore storage errors
  }
}

export async function loadSettings(): Promise<SiteSettings> {
  try {
    const res = await fetch('/api/settings');
    const contentType = res.headers.get('content-type') || '';
    if (res.ok && contentType.includes('application/json')) {
      const data = await res.json();
      return { ...DEFAULT_SETTINGS, ...data };
    }
  } catch {
    // Fallback for static deployments (GitHub Pages / Vercel static)
  }

  try {
    const localRaw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (localRaw) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(localRaw) };
    }
  } catch {
    // ignore storage errors
  }

  return DEFAULT_SETTINGS;
}

export async function persistSettings(updated: SiteSettings): Promise<void> {
  try {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // ignore storage errors
  }

  try {
    await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    });
  } catch {
    // Static deploy uses localStorage seamlessly
  }
}

export async function loadInquiries(): Promise<Inquiry[]> {
  try {
    const res = await fetch('/api/inquiries');
    const contentType = res.headers.get('content-type') || '';
    if (res.ok && contentType.includes('application/json')) {
      return await res.json();
    }
  } catch {
    // Fallback for static deployments
  }
  return getLocalInquiries();
}

export async function updateInquiryStatus(id: string, status: 'read' | 'replied'): Promise<void> {
  try {
    const existing = getLocalInquiries();
    const updated = existing.map((item) => (item.id === id ? { ...item, status } : item));
    localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }

  try {
    await fetch(`/api/inquiries/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
  } catch {
    // ignore on static hosting
  }
}

export interface SubmitContactPayload {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  propertyAddress?: string;
  _bot_catcher?: string;
  formRenderedAt?: number;
  source?: 'contact_form' | 'open_house_rsvp' | 'tour_schedule';
}

export interface SubmitContactResult {
  success: boolean;
  message: string;
  inquiryId: string;
  deliveredTo: string;
  fieldErrors?: Record<string, string>;
}

export async function submitContactInquiry(
  payload: SubmitContactPayload
): Promise<SubmitContactResult> {
  // 1. Attempt full-stack Express backend first
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const data = await response.json();
      if (!response.ok) {
        const err = new Error(data.error || 'Failed to submit inquiry.') as Error & {
          fieldErrors?: Record<string, string>;
        };
        err.fieldErrors = data.fieldErrors;
        throw err;
      }
      return data;
    }
  } catch (err) {
    // Re-throw real validation/rate-limit errors returned by backend
    if (err instanceof Error && (err as Error & { fieldErrors?: Record<string, string> }).fieldErrors) {
      throw err;
    }
    // Otherwise fall through to direct Formspree delivery (static deployment on Vercel / GitHub Pages)
  }

  // 2. Direct Formspree fallback for static hosting (GitHub Pages / Vercel static)
  const fsRes = await fetch(FORMSPREE_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      name: payload.fullName.trim(),
      email: payload.email.trim(),
      phone: payload.phone.trim(),
      subject: payload.subject.trim(),
      message: payload.message.trim(),
      propertyAddress: payload.propertyAddress || '123 Maple Street',
      _subject: `New Lead for 123 Maple St: ${payload.subject.trim()}`,
    }),
  });

  if (!fsRes.ok) {
    throw new Error('Unable to deliver your message right now. Please try WhatsApp or email directly.');
  }

  const inquiryId = `inq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  saveLocalInquiry({
    id: inquiryId,
    fullName: payload.fullName.trim(),
    email: payload.email.trim(),
    phone: payload.phone.trim(),
    subject: payload.subject.trim(),
    message: payload.message.trim(),
    propertyAddress: payload.propertyAddress || '123 Maple Street',
    recipientEmail: 'kaylinpeter88@gmail.com',
    status: 'delivered',
    createdAt: new Date().toISOString(),
    source: payload.source || 'contact_form',
  });

  return {
    success: true,
    message: `Thank you, ${payload.fullName.trim()}! Your message has been sent to kaylinpeter88@gmail.com via Formspree.`,
    inquiryId,
    deliveredTo: 'kaylinpeter88@gmail.com',
  };
}
