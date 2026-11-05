import React, { useState, useEffect } from 'react';
import { Home, Phone, Mail, Menu, X, Inbox } from 'lucide-react';
import { AgentInfo } from '../types';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  agent: AgentInfo;
  onOpenInbox: () => void;
  onScheduleTour: () => void;
  unreadCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  agent,
  onOpenInbox,
  onScheduleTour,
  unreadCount = 0,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Properties', href: '#properties' },
    { label: 'Property Details', href: '#details' },
    { label: 'Open House', href: '#open-house' },
    { label: 'About Us', href: '#about-us' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3.5'
            : 'bg-white/90 backdrop-blur-sm border-b border-slate-200/50 py-4.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8">
            {/* Zone 1: Brand Wordmark / Logo */}
            <a
              href="#home"
              className="flex items-center hover:opacity-95 transition-opacity whitespace-nowrap shrink-0"
              aria-label="Zillow Real Estate Home"
            >
              <BrandLogo variant="light" />
            </a>

            {/* Zone 2: Navigation Links (Clean single-line text links) */}
            <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="hover:text-[#006AFF] transition-colors whitespace-nowrap shrink-0 py-1 relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#006AFF] transition-all duration-200 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* Zone 3: Primary Action & Agent Utility */}
            <div className="hidden sm:flex items-center gap-3 shrink-0">
              <button
                onClick={onOpenInbox}
                className="relative px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
                title="Agent Inquiries Dashboard"
              >
                <Inbox className="w-3.5 h-3.5 text-slate-600" />
                <span>Agent Inbox</span>
                {unreadCount > 0 && (
                  <span className="w-2 h-2 rounded-full bg-[#006AFF]" />
                )}
              </button>

              <button
                onClick={onScheduleTour}
                className="px-4 py-2 text-sm font-semibold text-white bg-[#006AFF] hover:bg-[#0053c6] active:bg-[#0047a8] rounded-lg shadow-sm transition-all duration-150 whitespace-nowrap shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006AFF]"
              >
                Schedule Tour
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={onOpenInbox}
                className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                aria-label="Agent Inbox"
              >
                <Inbox className="w-5 h-5 text-slate-600" />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-slate-700 hover:text-[#006AFF] hover:bg-slate-100 rounded-lg transition-colors"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed top-18 left-0 right-0 bg-white border-b border-slate-200 px-6 py-6 shadow-xl space-y-4">
            <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
              <BrandLogo variant="light" imgClassName="h-8 w-auto object-contain" />
              <span className="text-xs font-semibold text-slate-400">Pleasant Valley, CA</span>
            </div>
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-semibold text-slate-800 hover:text-[#006AFF] py-2 border-b border-slate-100 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onScheduleTour();
                }}
                className="w-full py-2.5 px-4 text-center text-sm font-semibold text-white bg-[#006AFF] hover:bg-[#0053c6] rounded-lg shadow-sm transition-colors"
              >
                Schedule Tour
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenInbox();
                }}
                className="w-full py-2.5 px-4 text-center text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Inbox className="w-4 h-4 text-slate-600" />
                <span>Agent Inquiries Inbox</span>
              </button>
            </div>

            <div className="pt-3 border-t border-slate-200 text-xs text-slate-600 flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#006AFF]" />
                <a href={`tel:${agent.phone.replace(/[^0-9]/g, '')}`} className="hover:underline">
                  {agent.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#006AFF] shrink-0" />
                <a
                  href={agent.email.startsWith('http') ? agent.email : `mailto:${agent.email}`}
                  target={agent.email.startsWith('http') ? '_blank' : undefined}
                  rel={agent.email.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="hover:underline truncate"
                >
                  {agent.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
