/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedListing } from './components/FeaturedListing';
import { PropertyDetailsSection } from './components/PropertyDetailsSection';
import { OpenHouseSection } from './components/OpenHouseSection';
import { AboutUsSection } from './components/AboutUsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { DirectionsModal } from './components/DirectionsModal';
import { EditOpenHouseModal } from './components/EditOpenHouseModal';
import { ScheduleTourModal } from './components/ScheduleTourModal';
import { AgentInboxModal } from './components/AgentInboxModal';
import { FEATURED_PROPERTY, SARAH_JOHNSON } from './data/propertyData';
import { SiteSettings } from './types';

export default function App() {
  const [settings, setSettings] = useState<SiteSettings>({
    openHouseDate: 'Saturday, October 12',
    openHouseTime: '12:00 PM – 3:00 PM',
    openHouseStatus: 'Upcoming',
    whatsappPhone: '+15551234567',
    agentPhone: '(555) 123-4567',
    agentEmail: 'kaylinpeter88@gmail.com',
    featuredPrice: '$425,000',
    propertyAddress: '123 Maple Street',
  });

  const [unreadInquiriesCount, setUnreadInquiriesCount] = useState<number>(0);

  // Modals state
  const [isDirectionsOpen, setIsDirectionsOpen] = useState(false);
  const [isEditScheduleOpen, setIsEditScheduleOpen] = useState(false);
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);
  const [tourModalMode, setTourModalMode] = useState<'tour' | 'rsvp'>('tour');
  const [isInboxOpen, setIsInboxOpen] = useState(false);
  const [contactSubject, setContactSubject] = useState<string>('Inquiry regarding 123 Maple Street');

  // Load initial settings and inquiries from backend
  const refreshInquiriesCount = async () => {
    try {
      const res = await fetch('/api/inquiries');
      if (res.ok) {
        const data = await res.json();
        const unread = data.filter((i: { status: string }) => i.status === 'delivered').length;
        setUnreadInquiriesCount(unread);
      }
    } catch (err) {
      console.warn('Could not fetch inquiries count:', err);
    }
  };

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/settings');
        if (res.ok) {
          const data = await res.json();
          setSettings(data);
        }
      } catch (err) {
        console.warn('Could not fetch settings from server:', err);
      }
    };

    fetchSettings();
    refreshInquiriesCount();
  }, []);

  const handleSaveSchedule = async (newDate: string, newTime: string) => {
    const updated = {
      ...settings,
      openHouseDate: newDate,
      openHouseTime: newTime,
    };
    setSettings(updated);

    try {
      await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
    } catch (err) {
      console.error('Failed to save settings:', err);
    }
  };

  const handleUpdateWhatsApp = async (newPhone: string) => {
    const updated = {
      ...settings,
      whatsappPhone: newPhone,
    };
    setSettings(updated);

    try {
      await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
    } catch (err) {
      console.error('Failed to save whatsapp setting:', err);
    }
  };

  const scrollTo = (elementId: string) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans">
      {/* 3-Zone Navigation Bar */}
      <Navbar
        agent={SARAH_JOHNSON}
        onOpenInbox={() => setIsInboxOpen(true)}
        onScheduleTour={() => {
          setTourModalMode('tour');
          setIsTourModalOpen(true);
        }}
        unreadCount={unreadInquiriesCount}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section with Luxury House Background */}
        <Hero
          property={FEATURED_PROPERTY}
          onExploreProperties={() => scrollTo('properties')}
          onContactAgent={() => {
            setContactSubject('Inquiry regarding 123 Maple Street');
            scrollTo('contact');
          }}
          onViewPropertyDetails={() => scrollTo('details')}
        />

        {/* 2. Featured Property Listing Section */}
        <FeaturedListing
          property={FEATURED_PROPERTY}
          openHouseDate={settings.openHouseDate}
          onViewDetails={() => scrollTo('details')}
          onScheduleTour={() => {
            setTourModalMode('tour');
            setIsTourModalOpen(true);
          }}
        />

        {/* 3. Property Details Section (Full Specs, Amenities, Mortgage Calc) */}
        <PropertyDetailsSection
          property={FEATURED_PROPERTY}
          agent={SARAH_JOHNSON}
          onScheduleTour={() => {
            setTourModalMode('tour');
            setIsTourModalOpen(true);
          }}
          onContactAgent={() => {
            setContactSubject('Disclosure Packet Request for 123 Maple Street');
            scrollTo('contact');
          }}
        />

        {/* 4. Open House Section with Editable Date/Time */}
        <OpenHouseSection
          openHouseDate={settings.openHouseDate}
          openHouseTime={settings.openHouseTime}
          propertyAddress={settings.propertyAddress}
          onOpenDirections={() => setIsDirectionsOpen(true)}
          onOpenRsvp={() => {
            setTourModalMode('rsvp');
            setIsTourModalOpen(true);
          }}
          onEditSchedule={() => setIsEditScheduleOpen(true)}
          onContactAgent={() => {
            setContactSubject('Question about Open House at 123 Maple Street');
            scrollTo('contact');
          }}
        />

        {/* 5. About Us Section (Sarah Johnson & Trust/Satisfaction) */}
        <AboutUsSection
          agent={SARAH_JOHNSON}
          onContactAgent={() => {
            setContactSubject('General Consultation with Sarah Johnson');
            scrollTo('contact');
          }}
        />

        {/* 6. Contact Section (Direct validated form delivered to sarah.j@zillowagent.com) */}
        <ContactSection
          agent={SARAH_JOHNSON}
          onOpenInbox={() => setIsInboxOpen(true)}
          defaultSubject={contactSubject}
        />
      </main>

      {/* 7. Comprehensive Professional Footer */}
      <Footer
        agent={SARAH_JOHNSON}
        onOpenInbox={() => setIsInboxOpen(true)}
        onOpenDirections={() => setIsDirectionsOpen(true)}
        onScheduleTour={() => {
          setTourModalMode('tour');
          setIsTourModalOpen(true);
        }}
      />

      {/* 8. Floating WhatsApp Integration Button */}
      <WhatsAppButton
        initialPhone={settings.whatsappPhone}
        propertyAddress={settings.propertyAddress}
        onUpdatePhone={handleUpdateWhatsApp}
      />

      {/* Modals & Dialogs */}
      <DirectionsModal
        isOpen={isDirectionsOpen}
        onClose={() => setIsDirectionsOpen(false)}
        address="123 Maple Street, Pleasant Valley, CA 94566"
      />

      <EditOpenHouseModal
        isOpen={isEditScheduleOpen}
        onClose={() => setIsEditScheduleOpen(false)}
        currentDate={settings.openHouseDate}
        currentTime={settings.openHouseTime}
        onSave={handleSaveSchedule}
      />

      <ScheduleTourModal
        isOpen={isTourModalOpen}
        onClose={() => setIsTourModalOpen(false)}
        mode={tourModalMode}
        propertyAddress={settings.propertyAddress}
        openHouseDate={settings.openHouseDate}
        openHouseTime={settings.openHouseTime}
        onSuccessSubmitted={refreshInquiriesCount}
      />

      <AgentInboxModal
        isOpen={isInboxOpen}
        onClose={() => {
          setIsInboxOpen(false);
          refreshInquiriesCount();
        }}
      />
    </div>
  );
}
