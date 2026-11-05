import React from 'react';
import { ArrowRight, Sparkles, MapPin, Bed, Bath, Maximize2 } from 'lucide-react';
import { Property } from '../types';

interface HeroProps {
  property: Property;
  onExploreProperties: () => void;
  onContactAgent: () => void;
  onViewPropertyDetails: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  property,
  onExploreProperties,
  onContactAgent,
  onViewPropertyDetails,
}) => {
  return (
    <section id="home" className="relative min-h-[92vh] flex items-center pt-20 pb-16 overflow-hidden">
      {/* Background Image with Measured Scrim Overlay for WCAG AA contrast */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_luxury_home_1793879931818.jpg"
          alt="Modern luxury architectural home"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transform scale-100 transition-transform duration-1000 ease-out"
        />
        {/* Scrim gradient: deep navy/black scrim ensures crisp legibility for typography */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#102A43]/90 via-[#102A43]/75 to-[#102A43]/40" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-[#102A43]/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 text-white space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-200">
              <span className="w-2 h-2 rounded-full bg-[#006AFF]" />
              <span>Zillow Real Estate · Premier Portfolio</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white [text-wrap:balance]">
              Find Your Dream Home With Confidence.
            </h1>

            <p className="text-lg sm:text-xl text-slate-200 max-w-2xl font-normal leading-relaxed">
              Discover beautiful properties, explore exceptional homes, and find the perfect place to call home.
            </p>

            {/* Two Prominent Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onExploreProperties}
                className="px-7 py-3.5 text-base font-semibold text-white bg-[#006AFF] hover:bg-[#0053c6] active:bg-[#0047a8] rounded-xl shadow-lg shadow-blue-600/30 transition-all duration-150 flex items-center justify-center gap-2.5 group cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
              >
                <span>Explore Properties</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onContactAgent}
                className="px-7 py-3.5 text-base font-semibold text-white bg-white/10 hover:bg-white/20 active:bg-white/30 backdrop-blur-md border border-white/25 rounded-xl transition-all duration-150 flex items-center justify-center cursor-pointer"
              >
                <span>Contact Our Agent</span>
              </button>
            </div>

            {/* Trust indicators */}
            <div className="pt-6 border-t border-white/15 grid grid-cols-3 gap-6 text-slate-300">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums">$48M+</p>
                <p className="text-xs text-slate-300 uppercase tracking-wide font-medium mt-0.5">Closed Volume</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums">4.98★</p>
                <p className="text-xs text-slate-300 uppercase tracking-wide font-medium mt-0.5">Client Rating</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums">12+ Yrs</p>
                <p className="text-xs text-slate-300 uppercase tracking-wide font-medium mt-0.5">Market Advisory</p>
              </div>
            </div>
          </div>

          {/* Featured Listing Floating Spotlight Card */}
          <div className="lg:col-span-5">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-2xl border border-white/40 text-slate-900 transition-all hover:shadow-blue-900/20">
              <div className="relative rounded-xl overflow-hidden aspect-4/3 mb-4 group cursor-pointer" onClick={onViewPropertyDetails}>
                <img
                  src="/src/assets/images/property_maple_exterior_1793879932362.jpg"
                  alt="Featured home at 123 Maple Street"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-[#006AFF] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md shadow-sm">
                  Featured Property
                </div>
                <div className="absolute bottom-3 right-3 bg-[#102A43]/90 text-white text-xs font-medium px-2.5 py-1 rounded-md backdrop-blur-xs flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Open House Soon</span>
                </div>
              </div>

              <div>
                <div className="flex items-baseline justify-between gap-2 mb-1.5">
                  <span className="text-3xl font-extrabold text-[#102A43] tabular-nums tracking-tight">
                    {property.formattedPrice}
                  </span>
                  <span className="text-xs font-medium text-slate-500">
                    Est. $2,185/mo
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-800 mb-3">
                  <MapPin className="w-4 h-4 text-[#006AFF] shrink-0" />
                  <span>{property.address}, {property.city}, {property.state}</span>
                </div>

                {/* Specs row */}
                <div className="flex items-center justify-between py-2.5 px-3 bg-[#F3F8FF] rounded-lg text-xs font-semibold text-[#102A43] mb-4">
                  <div className="flex items-center gap-1.5">
                    <Bed className="w-4 h-4 text-[#006AFF]" />
                    <span>{property.bedrooms} Beds</span>
                  </div>
                  <span className="text-slate-300">|</span>
                  <div className="flex items-center gap-1.5">
                    <Bath className="w-4 h-4 text-[#006AFF]" />
                    <span>{property.bathrooms} Baths</span>
                  </div>
                  <span className="text-slate-300">|</span>
                  <div className="flex items-center gap-1.5">
                    <Maximize2 className="w-3.5 h-3.5 text-[#006AFF]" />
                    <span className="tabular-nums">{property.sqft.toLocaleString()} Sq Ft</span>
                  </div>
                </div>

                <button
                  onClick={onViewPropertyDetails}
                  className="w-full py-2.5 px-4 text-sm font-semibold text-white bg-[#006AFF] hover:bg-[#0053c6] active:bg-[#0047a8] rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>View Property Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
