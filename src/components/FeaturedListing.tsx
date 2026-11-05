import React, { useState } from 'react';
import { Bed, Bath, Maximize2, MapPin, Calendar, Heart, Share2, Check } from 'lucide-react';
import { Property } from '../types';

interface FeaturedListingProps {
  property: Property;
  openHouseDate: string;
  onViewDetails: () => void;
  onScheduleTour: () => void;
}

export const FeaturedListing: React.FC<FeaturedListingProps> = ({
  property,
  openHouseDate,
  onViewDetails,
  onScheduleTour,
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'featured' | 'move_in'>('all');

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const nearbyComps = [
    {
      id: 'comp_01',
      address: '454 Oak Avenue',
      price: '$515,000',
      beds: 4,
      baths: 2.5,
      sqft: 2150,
      status: 'Pending',
      image: '/src/assets/images/property_kitchen_quartz_1793879933333.jpg',
      note: 'Higher price point, comparable finish quality',
    },
    {
      id: 'comp_02',
      address: '88 Highland Ridge',
      price: '$489,000',
      beds: 3,
      baths: 2,
      sqft: 1720,
      status: 'Sold Recently',
      image: '/src/assets/images/property_living_fireplace_1793879934056.jpg',
      note: 'Sold in 14 days over asking price',
    },
  ];

  return (
    <section id="properties" className="py-20 bg-[#F3F8FF] border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#006AFF] mb-2">
              Exclusive Portfolio
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#102A43] tracking-tight">
              Featured Property Listing
            </h2>
            <p className="mt-2 text-base text-slate-600 max-w-2xl">
              Carefully curated by Sarah Johnson. Discover premium craftsmanship, modern conveniences, and unbeatable community value.
            </p>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-white rounded-xl shadow-xs border border-slate-200 shrink-0 self-start md:self-auto">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-[#006AFF] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Listings
            </button>
            <button
              onClick={() => setActiveFilter('featured')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeFilter === 'featured'
                  ? 'bg-[#006AFF] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Featured Only
            </button>
            <button
              onClick={() => setActiveFilter('move_in')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeFilter === 'move_in'
                  ? 'bg-[#006AFF] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Move-In Ready
            </button>
          </div>
        </div>

        {/* Marquee Primary Property Card: 123 Maple Street */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-12 hover:shadow-md transition-shadow">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Visual Media Column */}
            <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-full">
              <img
                src={property.heroImage}
                alt="123 Maple Street Exterior"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover min-h-[320px] lg:min-h-[480px]"
              />
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="bg-[#006AFF] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md shadow-sm">
                  Featured Property
                </span>
                <span className="bg-[#102A43]/90 text-white text-xs font-semibold px-2.5 py-1 rounded-md backdrop-blur-xs">
                  {property.status}
                </span>
              </div>

              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer ${
                    isSaved
                      ? 'bg-rose-500 text-white'
                      : 'bg-white/80 hover:bg-white text-slate-700'
                  }`}
                  aria-label="Save listing"
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
                </button>
                <button
                  onClick={handleShare}
                  className="w-9 h-9 rounded-full bg-white/80 hover:bg-white text-slate-700 flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
                  aria-label="Share listing"
                  title="Copy link"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                </button>
              </div>

              {/* Bottom media indicator */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white bg-[#102A43]/80 backdrop-blur-md px-3.5 py-2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-blue-300" />
                  <span>Open House: <strong className="font-semibold text-white">{openHouseDate}</strong></span>
                </div>
                <span className="text-slate-300">4 Photos · Full 3D Walkthrough</span>
              </div>
            </div>

            {/* Information Column */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-4 mb-2">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {property.propertyType}
                  </span>
                  <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded">
                    Verified Zillow MLS
                  </span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-extrabold text-[#102A43] tabular-nums tracking-tight mb-2">
                  {property.formattedPrice}
                </h3>

                <div className="flex items-center gap-1.5 text-base font-semibold text-slate-800 mb-4">
                  <MapPin className="w-4 h-4 text-[#006AFF] shrink-0" />
                  <span>{property.address}, {property.city}, {property.state} {property.zip}</span>
                </div>

                {/* Key Features Pill-free spec bar */}
                <div className="grid grid-cols-3 gap-3 py-3.5 px-4 bg-[#F3F8FF] rounded-xl border border-blue-100/80 mb-6 text-center">
                  <div>
                    <div className="flex items-center justify-center gap-1 text-[#006AFF] mb-1">
                      <Bed className="w-4 h-4" />
                    </div>
                    <p className="text-sm font-bold text-[#102A43]">{property.bedrooms} Bedrooms</p>
                    <p className="text-[11px] text-slate-500">Master Ensuite</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1 text-[#006AFF] mb-1">
                      <Bath className="w-4 h-4" />
                    </div>
                    <p className="text-sm font-bold text-[#102A43]">{property.bathrooms} Bathrooms</p>
                    <p className="text-[11px] text-slate-500">Upgraded Vanities</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1 text-[#006AFF] mb-1">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                    <p className="text-sm font-bold text-[#102A43] tabular-nums">{property.sqft.toLocaleString()} Sq Ft</p>
                    <p className="text-[11px] text-slate-500">$229.73 / sq ft</p>
                  </div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed mb-6 line-clamp-3">
                  {property.description}
                </p>

                {/* Quick Highlights Bullet points */}
                <div className="space-y-2 text-xs text-slate-700 mb-8">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#006AFF]" />
                    <span>Attached 2-car garage with dedicated 240V EV charger circuit</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#006AFF]" />
                    <span>Modern chef’s kitchen with waterfall quartz countertops</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#006AFF]" />
                    <span>Private entertainer's backyard patio in quiet residential tract</span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="space-y-2.5 pt-4 border-t border-slate-100">
                <button
                  onClick={onViewDetails}
                  className="w-full py-3 px-5 text-sm font-bold text-white bg-[#006AFF] hover:bg-[#0053c6] active:bg-[#0047a8] rounded-xl shadow-sm transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>View Property Details</span>
                </button>
                <button
                  onClick={onScheduleTour}
                  className="w-full py-2.5 px-5 text-sm font-semibold text-[#102A43] bg-slate-100 hover:bg-slate-200 active:bg-slate-300 rounded-xl transition-colors flex items-center justify-center cursor-pointer"
                >
                  <span>Schedule a Private Tour</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Neighborhood Market Context Comparison */}
        {activeFilter === 'all' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#102A43]">
                Neighborhood Market Comparisons & Recent Activity
              </h3>
              <span className="text-xs text-slate-500">Updated this week</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {nearbyComps.map((comp) => (
                <div
                  key={comp.id}
                  className="bg-white rounded-xl border border-slate-200 p-4 flex gap-4 items-center hover:border-blue-300 transition-colors"
                >
                  <img
                    src={comp.image}
                    alt={comp.address}
                    referrerPolicy="no-referrer"
                    className="w-28 h-24 object-cover rounded-lg shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-slate-500">{comp.status}</span>
                      <span className="text-base font-extrabold text-[#102A43] tabular-nums">{comp.price}</span>
                    </div>
                    <p className="text-sm font-bold text-slate-900 truncate mt-0.5">{comp.address}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-600 mt-1">
                      <span>{comp.beds} Beds</span>
                      <span aria-hidden="true">·</span>
                      <span>{comp.baths} Baths</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">{comp.sqft.toLocaleString()} Sq Ft</span>
                    </div>
                    <p className="text-[11px] text-[#006AFF] font-medium mt-1.5 truncate">
                      {comp.note}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
