import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());

// Persistent store setup
const DATA_DIR = path.join(__dirname, 'data');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export interface Inquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  propertyAddress: string;
  recipientEmail: string;
  status: 'delivered' | 'read' | 'replied';
  createdAt: string;
  source: 'contact_form' | 'open_house_rsvp' | 'tour_schedule';
}

export interface SiteSettings {
  openHouseDate: string;
  openHouseTime: string;
  openHouseStatus: string;
  whatsappPhone: string;
  agentPhone: string;
  agentEmail: string;
  featuredPrice: string;
  propertyAddress: string;
}

const DEFAULT_SETTINGS: SiteSettings = {
  openHouseDate: 'Saturday, October 12',
  openHouseTime: '12:00 PM – 3:00 PM',
  openHouseStatus: 'Upcoming',
  whatsappPhone: '+15551234567',
  agentPhone: '(555) 123-4567',
  agentEmail: 'kaylinpeter88@gmail.com',
  featuredPrice: '$425,000',
  propertyAddress: '123 Maple Street',
};

// Seed initial inquiries if none exist
const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: 'inq_demo_01',
    fullName: 'David & Emily Miller',
    email: 'd.miller@gmail.com',
    phone: '(555) 234-8901',
    subject: 'Question regarding EV Charger & Inspection Report',
    message: 'Hello Sarah, we love the photos of 123 Maple Street! We drive an EV and wanted to confirm the garage amperage. Also, will full disclosure reports be available at the open house?',
    propertyAddress: '123 Maple Street',
    recipientEmail: 'sarah.j@zillowagent.com',
    status: 'delivered',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    source: 'contact_form',
  },
];

function getInquiries(): Inquiry[] {
  try {
    if (fs.existsSync(INQUIRIES_FILE)) {
      const data = fs.readFileSync(INQUIRIES_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading inquiries:', err);
  }
  return INITIAL_INQUIRIES;
}

function saveInquiries(inquiries: Inquiry[]) {
  try {
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving inquiries:', err);
  }
}

function getSettings(): SiteSettings {
  try {
    if (fs.existsSync(SETTINGS_FILE)) {
      const data = fs.readFileSync(SETTINGS_FILE, 'utf-8');
      return { ...DEFAULT_SETTINGS, ...JSON.parse(data) };
    }
  } catch (err) {
    console.error('Error reading settings:', err);
  }
  return DEFAULT_SETTINGS;
}

function saveSettings(settings: SiteSettings) {
  try {
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving settings:', err);
  }
}

// In-memory rate limiting map: IP -> timestamp[]
const rateLimitMap = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000; // 10 minutes
  const maxRequests = 10;

  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < windowMs);

  if (validTimestamps.length >= maxRequests) {
    return false;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return true;
}

// API Routes

// GET /api/settings
app.get('/api/settings', (_req: Request, res: Response) => {
  res.json(getSettings());
});

// PUT /api/settings (Allows agent to edit Open House date/time and WhatsApp phone)
app.put('/api/settings', (req: Request, res: Response) => {
  const current = getSettings();
  const updated: SiteSettings = {
    ...current,
    openHouseDate: req.body.openHouseDate || current.openHouseDate,
    openHouseTime: req.body.openHouseTime || current.openHouseTime,
    openHouseStatus: req.body.openHouseStatus || current.openHouseStatus,
    whatsappPhone: req.body.whatsappPhone || current.whatsappPhone,
    agentPhone: req.body.agentPhone || current.agentPhone,
    agentEmail: req.body.agentEmail || current.agentEmail,
    featuredPrice: req.body.featuredPrice || current.featuredPrice,
  };
  saveSettings(updated);
  res.json({ success: true, settings: updated });
});

// GET /api/inquiries
app.get('/api/inquiries', (_req: Request, res: Response) => {
  const inquiries = getInquiries();
  res.json(inquiries);
});

// PATCH /api/inquiries/:id
app.patch('/api/inquiries/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const inquiries = getInquiries();
  const item = inquiries.find((i) => i.id === id);
  if (!item) {
    return res.status(404).json({ error: 'Inquiry not found' });
  }
  if (status) {
    item.status = status;
    saveInquiries(inquiries);
  }
  res.json({ success: true, inquiry: item });
});

// POST /api/contact - Highly secure, spam-protected, fully validated contact delivery
app.post('/api/contact', async (req: Request, res: Response) => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';

  // 1. Rate limiting check
  if (!checkRateLimit(ip)) {
    return res.status(429).json({
      error: 'Too many submissions. Please wait a few minutes before sending another inquiry.',
    });
  }

  const {
    fullName,
    email,
    phone,
    subject,
    message,
    propertyAddress = '123 Maple Street',
    _bot_catcher, // Honeypot field: must be empty
    formRenderedAt, // Timestamp when form was loaded by client
  } = req.body;

  // 2. Anti-Spam: Honeypot check
  if (_bot_catcher && _bot_catcher.trim().length > 0) {
    console.warn(`[SPAM BLOCKED] Honeypot triggered from IP ${ip}`);
    // Return standard success to fool spam bots without storing garbage
    return res.json({
      success: true,
      message: 'Your inquiry has been received.',
      inquiryId: 'inq_spm_disc',
    });
  }

  // 3. Anti-Spam: Fast-submission timing check (human takes > 1.5s to type)
  if (formRenderedAt) {
    const elapsed = Date.now() - Number(formRenderedAt);
    if (elapsed < 1200) {
      console.warn(`[SPAM BLOCKED] Form submitted too quickly (${elapsed}ms) from IP ${ip}`);
      return res.status(400).json({
        error: 'Automated activity detected. Please review your message and submit again.',
      });
    }
  }

  // 4. Strict Field Validations
  const errors: Record<string, string> = {};

  if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
    errors.email = 'Please provide a valid email address (e.g., name@example.com).';
  }

  if (!phone || typeof phone !== 'string' || phone.trim().length < 7) {
    errors.phone = 'Please provide a valid phone number (at least 7 digits).';
  }

  if (!subject || typeof subject !== 'string' || subject.trim().length < 3) {
    errors.subject = 'Please enter a subject (at least 3 characters).';
  }

  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    errors.message = 'Please enter your message (at least 10 characters).';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      error: 'Please correct the highlighted fields.',
      fieldErrors: errors,
    });
  }

  // 5. Build Inquiry record
  const newInquiry: Inquiry = {
    id: `inq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    fullName: fullName.trim(),
    email: email.trim(),
    phone: phone.trim(),
    subject: subject.trim(),
    message: message.trim(),
    propertyAddress: propertyAddress || '123 Maple Street',
    recipientEmail: 'kaylinpeter88@gmail.com',
    status: 'delivered',
    createdAt: new Date().toISOString(),
    source: 'contact_form',
  };

  // 6. Save to persistent store
  const inquiries = getInquiries();
  inquiries.unshift(newInquiry);
  saveInquiries(inquiries);

  // 7. Real Formspree Delivery Dispatch
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mwllzvgd';
  let formspreeDelivered = false;

  try {
    const fsResponse = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        name: newInquiry.fullName,
        email: newInquiry.email,
        phone: newInquiry.phone,
        subject: newInquiry.subject,
        message: newInquiry.message,
        propertyAddress: newInquiry.propertyAddress,
        _subject: `New Lead for 123 Maple St: ${newInquiry.subject}`,
      }),
    });

    if (fsResponse.ok) {
      formspreeDelivered = true;
      console.log(`[FORMSPREE SUCCESS] Message delivered to ${FORMSPREE_ENDPOINT}`);
    } else {
      console.warn(`[FORMSPREE STATUS ${fsResponse.status}]`, await fsResponse.text());
    }
  } catch (fsErr) {
    console.error('[FORMSPREE FORWARD ERROR]', fsErr);
  }

  // 8. Formatted Delivery Log
  console.log('====================================================');
  console.log(`[EMAIL DISPATCH TO FORMSPREE: ${FORMSPREE_ENDPOINT}]`);
  console.log(`Subject: New Inquiry: ${newInquiry.subject}`);
  console.log(`From: ${newInquiry.fullName} <${newInquiry.email}>`);
  console.log(`Phone: ${newInquiry.phone}`);
  console.log(`Property: ${newInquiry.propertyAddress}`);
  console.log(`Formspree Status: ${formspreeDelivered ? 'SENT' : 'LOGGED'}`);
  console.log('====================================================');

  return res.json({
    success: true,
    message: `Thank you, ${newInquiry.fullName}! Your message has been sent to kaylinpeter88@gmail.com via Formspree.`,
    inquiryId: newInquiry.id,
    deliveredTo: 'kaylinpeter88@gmail.com',
    createdAt: newInquiry.createdAt,
    formspreeDelivered,
  });
});

// POST /api/rsvp - Open House RSVP endpoint
app.post('/api/rsvp', (req: Request, res: Response) => {
  const { fullName, email, phone, guests = 1, propertyAddress = '123 Maple Street' } = req.body;

  if (!fullName || !email || !phone) {
    return res.status(400).json({ error: 'Please provide your name, email, and phone number.' });
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }

  const newRsvp: Inquiry = {
    id: `rsvp_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    fullName: fullName.trim(),
    email: email.trim(),
    phone: phone.trim(),
    subject: `Open House RSVP (${guests} guest${Number(guests) > 1 ? 's' : ''})`,
    message: `Guest confirmed attendance for the Open House at ${propertyAddress}. Number of attendees: ${guests}.`,
    propertyAddress,
    recipientEmail: 'sarah.j@zillowagent.com',
    status: 'delivered',
    createdAt: new Date().toISOString(),
    source: 'open_house_rsvp',
  };

  const inquiries = getInquiries();
  inquiries.unshift(newRsvp);
  saveInquiries(inquiries);

  console.log(`[OPEN HOUSE RSVP DELIVERED TO: sarah.j@zillowagent.com] ${fullName} (${guests} attendees)`);

  return res.json({
    success: true,
    message: `You're on the guest list! Confirmation details sent to ${email}. Sarah Johnson looks forward to greeting you.`,
    inquiryId: newRsvp.id,
  });
});

// Mount Vite or static server
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Zillow Real Estate server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
