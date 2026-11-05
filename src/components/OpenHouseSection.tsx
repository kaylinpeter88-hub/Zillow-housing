import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Navigation,
  UserCheck,
  Edit3,
  Coffee,
  Check,
  Sparkles,
} from 'lucide-react';

interface OpenHouseSectionProps {
  openHouseDate: string;
  openHouseTime: string;
  propertyAddress: string;
  onOpenDirections: () => void;
  onOpenRsvp: () => void;
  onEditSchedule: () => void;
  onContactAgent: () => void;
}

export const OpenHouseSection: React.FC<OpenHouseSectionProps> = ({
  openHouseDate,
  openHouseTime,
  propertyAddress,
  onOpenDirections,
  onOpenRsvp,
  onEditSchedule,
  onContactAgent,
}) => {
  return (
    <section id="open-house" className="py-20 bg-[#102A43] text-white relative overflow-hidden">
      {/* Subtle geometric background accents */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#006AFF]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-br from-[#102A43] via-[#163554] to-[#102A43] rounded-3xl p-8 sm:p-12 border border-white/15 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Headlines & Schedule */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#006AFF] text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  Public Viewing Event
                </span>
                <span className="text-xs text-blue-200">
                  Refreshments & Gourmet Coffee Provided
                </span>
              </div>

              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                  You're Invited to Our Open House!
                </h2>
                <p className="mt-3 text-base sm:text-lg text-slate-300 max-w-xl">
                  Step inside {propertyAddress} and experience its sunlit architectural layout firsthand. Hosted personally by Sarah Johnson.
                </p>
              </div>

              {/* Schedule and Address Box */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {/* Date card with inline edit trigger */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4.5 border border-white/20 relative group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs uppercase font-semibold text-blue-200 tracking-wider flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-[#006AFF]" />
                      Date
                    </span>
                    {/* Editable prompt requirement */}
                    <button
                      onClick={onEditSchedule}
                      className="text-xs text-blue-300 hover:text-white flex items-center gap-1 transition-colors px-2 py-0.5 rounded hover:bg-white/10 cursor-pointer"
                      title="Edit open house date & time"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Edit Date</span>
                    </button>
                  </div>
                  <div className="text-xl sm:text-2xl font-extrabold text-white">
                    {openHouseDate}
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Free admission · No registration mandatory
                  </p>
                </div>

                {/* Time & Location card */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4.5 border border-white/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs uppercase font-semibold text-blue-200 tracking-wider flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-[#006AFF]" />
                      Time
                    </span>
                    <span className="text-xs text-emerald-400 font-medium">Doors open 12:00</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-extrabold text-white">
                    {openHouseTime}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-300 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#006AFF] shrink-0" />
                    <span className="truncate">{propertyAddress}</span>
                  </div>
                </div>
              </div>

              {/* Prominent Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-4">
                <button
                  onClick={onOpenDirections}
                  className="px-6 py-3.5 text-sm font-bold text-white bg-[#006AFF] hover:bg-[#0053c6] active:bg-[#0047a8] rounded-xl shadow-lg shadow-blue-600/30 transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Directions</span>
                </button>

                <button
                  onClick={onOpenRsvp}
                  className="px-6 py-3.5 text-sm font-bold text-[#102A43] bg-white hover:bg-slate-100 active:bg-slate-200 rounded-xl transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <UserCheck className="w-4 h-4 text-[#006AFF]" />
                  <span>RSVP on Guest List</span>
                </button>

                <button
                  onClick={onContactAgent}
                  className="px-5 py-3.5 text-sm font-semibold text-slate-200 hover:text-white bg-transparent hover:bg-white/10 rounded-xl transition-colors flex items-center justify-center cursor-pointer"
                >
                  <span>Contact Agent</span>
                </button>
              </div>
            </div>

            {/* Right Column: Visual Invitation & Event Perks */}
            <div className="lg:col-span-5">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-slate-200 space-y-4">
                <div className="relative rounded-xl overflow-hidden aspect-16/10 mb-4 border border-white/20">
                  <img
                    src="/src/assets/images/property_maple_exterior_1793879932362.jpg"
                    alt="123 Maple Street Exterior Entrance"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#102A43] via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 text-xs font-semibold text-white">
                    Main Entrance at 123 Maple Street
                  </div>
                </div>

                <h3 className="text-base font-bold text-white">
                  What to Expect at the Event:
                </h3>

                <ul className="space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Complete printed disclosure and home inspection binder ready on the kitchen island.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Walk the expansive private patio and review garage EV charging layout.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Complimentary on-site mortgage pre-qualification review with local preferred lender.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Coffee className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>Artisanal pastries and espresso bar courtesy of Zillow Real Estate.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
