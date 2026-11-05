import React from 'react';
import {
  Home,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  Shield,
  Heart,
} from 'lucide-react';
import { AgentInfo } from '../types';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  agent: AgentInfo;
  onOpenInbox: () => void;
  onOpenDirections: () => void;
  onScheduleTour: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  agent,
  onOpenInbox,
  onOpenDirections,
  onScheduleTour,
}) => {
  return (
    <footer className="bg-[#102A43] text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Column 1 & 2: Branding & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <a
              href="#home"
              className="flex items-center hover:opacity-95 transition-opacity"
              aria-label="Zillow Real Estate Home"
            >
              <BrandLogo variant="dark" imgClassName="h-10 sm:h-11 w-auto object-contain" />
            </a>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Representing exceptional residential properties with unmatched integrity, verified market data, and dedicated client service.
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <p>Licensed Brokerage Partner · MLS ID #ZL-9823411</p>
              <p>DRE #02194830 · Sarah Johnson</p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 3: Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#home" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#properties" className="hover:text-white transition-colors">
                  Properties
                </a>
              </li>
              <li>
                <a href="#details" className="hover:text-white transition-colors">
                  Property Details
                </a>
              </li>
              <li>
                <a href="#open-house" className="hover:text-white transition-colors">
                  Open House Schedule
                </a>
              </li>
              <li>
                <a href="#about-us" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Property Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Featured Property
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#details" className="hover:text-white transition-colors">
                  123 Maple Street ($425,000)
                </a>
              </li>
              <li>
                <button
                  onClick={onScheduleTour}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Schedule Private Tour
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenDirections}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Driving Directions & Map
                </button>
              </li>
              <li>
                <a href="#details" className="hover:text-white transition-colors">
                  Mortgage Calculator
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenInbox}
                  className="text-xs text-[#006AFF] hover:underline font-semibold flex items-center gap-1 cursor-pointer pt-1"
                >
                  <span>Agent Inquiries Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Contact Direct */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Agent Direct
            </h4>
            <div className="space-y-3 text-sm">
              <p className="font-bold text-white">{agent.name}</p>
              <p className="text-xs text-slate-400">{agent.title}</p>

              <div className="flex items-center gap-2 pt-1 text-xs">
                <Phone className="w-3.5 h-3.5 text-[#006AFF]" />
                <a
                  href={`tel:${agent.phone.replace(/[^0-9]/g, '')}`}
                  className="hover:text-white transition-colors tabular-nums"
                >
                  {agent.phone}
                </a>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <Mail className="w-3.5 h-3.5 text-[#006AFF] shrink-0" />
                <a
                  href={agent.email.startsWith('http') ? agent.email : `mailto:${agent.email}`}
                  target={agent.email.startsWith('http') ? '_blank' : undefined}
                  rel={agent.email.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="hover:text-white transition-colors truncate max-w-[200px]"
                >
                  {agent.email}
                </a>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <MapPin className="w-3.5 h-3.5 text-[#006AFF]" />
                <span>Pleasant Valley, CA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-8 border-t border-slate-800 text-xs text-slate-500 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Equal Housing Logo Mark */}
            <div className="w-5 h-5 rounded border border-slate-600 flex items-center justify-center text-[9px] font-bold text-slate-400" title="Equal Housing Opportunity">
              ⌂
            </div>
            <span>Equal Housing Opportunity. All information deemed reliable but not guaranteed.</span>
          </div>

          <p>© {new Date().getFullYear()} Zillow Real Estate. All rights reserved. Associated with Zillow.com.</p>
        </div>
      </div>
    </footer>
  );
};
