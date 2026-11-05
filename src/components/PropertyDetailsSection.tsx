import React, { useState } from 'react';
import {
  Bed,
  Bath,
  Maximize2,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Calculator,
  ShieldCheck,
  Zap,
  Flame,
  FileText,
  DollarSign,
  Sun,
  Award,
} from 'lucide-react';
import { Property, AgentInfo } from '../types';

interface PropertyDetailsSectionProps {
  property: Property;
  agent: AgentInfo;
  onScheduleTour: () => void;
  onContactAgent: () => void;
}

export const PropertyDetailsSection: React.FC<PropertyDetailsSectionProps> = ({
  property,
  agent,
  onScheduleTour,
  onContactAgent,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Mortgage Calculator state
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [loanTermYears, setLoanTermYears] = useState<number>(30);

  // Calculate monthly mortgage
  const homePrice = property.price;
  const downPaymentAmount = (homePrice * downPaymentPercent) / 100;
  const loanAmount = homePrice - downPaymentAmount;
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanTermYears * 12;

  const monthlyPrincipalAndInterest =
    monthlyRate > 0
      ? (loanAmount *
          (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
      : loanAmount / numberOfPayments;

  const monthlyPropertyTax = (homePrice * 0.0115) / 12; // ~1.15% annual
  const monthlyInsurance = 115; // ~$1,380 annual
  const totalMonthlyPayment = Math.round(
    monthlyPrincipalAndInterest + monthlyPropertyTax + monthlyInsurance
  );

  return (
    <section id="details" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Lead */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-[#006AFF] mb-2">
            Property Specifications & Architectural Tour
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#102A43] tracking-tight">
            Comprehensive Property Details
          </h2>
          <p className="mt-2 text-base text-slate-600">
            Explore 123 Maple Street in full detail. Designed for comfort, entertaining, and effortless modern living.
          </p>
        </div>

        {/* Media Gallery Stage */}
        <div className="mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Main Stage Display */}
            <div className="lg:col-span-8 relative rounded-2xl overflow-hidden aspect-16/10 bg-slate-100 shadow-sm border border-slate-200">
              <img
                src={property.images[activeImageIndex].url}
                alt={property.images[activeImageIndex].caption}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-300"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-[#102A43]/85 backdrop-blur-md px-4 py-2.5 rounded-xl text-white flex items-center justify-between">
                <span className="text-xs sm:text-sm font-medium">
                  {property.images[activeImageIndex].caption}
                </span>
                <span className="text-xs text-blue-200 font-semibold tabular-nums shrink-0">
                  {activeImageIndex + 1} of {property.images.length}
                </span>
              </div>
            </div>

            {/* Thumbnail Navigator */}
            <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-3">
              {property.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative rounded-xl overflow-hidden aspect-16/9 text-left border-2 transition-all cursor-pointer group ${
                    activeImageIndex === idx
                      ? 'border-[#006AFF] shadow-md ring-2 ring-[#006AFF]/20'
                      : 'border-transparent opacity-75 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img.url}
                    alt={img.caption}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-2 left-2 text-xs font-semibold text-white truncate max-w-[85%]">
                    {img.tag}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 2-Column Content Split: Overview & Amenities on Left, Specs & Calculator on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Description & Official Amenities */}
          <div className="lg:col-span-7 space-y-10">
            {/* Description Card */}
            <div>
              <h3 className="text-2xl font-extrabold text-[#102A43] tracking-tight mb-4">
                About 123 Maple Street
              </h3>
              <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
                <p className="text-base sm:text-lg font-normal text-slate-800">
                  {property.description}
                </p>
                <p className="text-sm text-slate-600">
                  Boasting an open floor plan with optimal southern exposure, the residence was constructed in 2021 with uncompromising quality. Designed for both intimate relaxation and grand hosting, seamless sliding glass transitions connect the interior living room fireplace directly to a private entertainer's patio.
                </p>
              </div>
            </div>

            {/* Official Amenities Section */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Award className="w-5 h-5 text-[#006AFF]" />
                <h3 className="text-2xl font-extrabold text-[#102A43] tracking-tight">
                  Featured Amenities
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#F3F8FF] border border-blue-100 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#006AFF]/10 text-[#006AFF] flex items-center justify-center shrink-0">
                    <Sun className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#102A43]">Modern Chef's Kitchen</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Quartz countertops and premium stainless steel appliances.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#F3F8FF] border border-blue-100 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#006AFF]/10 text-[#006AFF] flex items-center justify-center shrink-0">
                    <Flame className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#102A43]">Spacious Living Room</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Abundant natural light with architectural contemporary fireplace.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#F3F8FF] border border-blue-100 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#006AFF]/10 text-[#006AFF] flex items-center justify-center shrink-0">
                    <Bed className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#102A43]">Primary Luxury Suite</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Generous walk-in closet and designer ensuite bathroom.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#F3F8FF] border border-blue-100 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#006AFF]/10 text-[#006AFF] flex items-center justify-center shrink-0">
                    <Sun className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#102A43]">Private Backyard Patio</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Ideal for outdoor entertaining, weekend barbecues, and relaxation.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#F3F8FF] border border-blue-100 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#006AFF]/10 text-[#006AFF] flex items-center justify-center shrink-0">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#102A43]">Attached 2-Car Garage</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Convenient EV charger readiness with 240V high-amp circuit.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#F3F8FF] border border-blue-100 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#006AFF]/10 text-[#006AFF] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#102A43]">Climate & Flooring</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Energy-efficient HVAC and new luxury vinyl flooring throughout.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Spec Sheet List */}
            <div>
              <h3 className="text-xl font-extrabold text-[#102A43] tracking-tight mb-4">
                Property Specifications
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm border-y border-slate-200 py-4">
                {property.specs.map((spec) => (
                  <div key={spec.label} className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">{spec.label}</span>
                    <span className="text-[#102A43] font-bold tabular-nums">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Mortgage Calculator & Agent Direct Actions */}
          <div className="lg:col-span-5 space-y-6">
            {/* Interactive Mortgage Calculator */}
            <div className="bg-[#F3F8FF] rounded-2xl p-6 border border-blue-100 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Calculator className="w-5 h-5 text-[#006AFF]" />
                <h3 className="text-lg font-extrabold text-[#102A43]">
                  Monthly Payment Estimator
                </h3>
              </div>
              <p className="text-xs text-slate-600 mb-6">
                Based on purchase price of <strong className="text-slate-900">$425,000</strong>
              </p>

              {/* Big calculated output */}
              <div className="text-center py-4 bg-white rounded-xl border border-blue-200/80 mb-6 shadow-xs">
                <span className="text-xs uppercase font-bold text-slate-500 tracking-wider">
                  Estimated Payment
                </span>
                <div className="text-4xl font-extrabold text-[#006AFF] tabular-nums tracking-tight mt-0.5">
                  ${totalMonthlyPayment.toLocaleString()}
                  <span className="text-sm font-normal text-slate-500">/mo</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Includes P&I, estimated taxes & insurance
                </p>
              </div>

              {/* Interactive Controls */}
              <div className="space-y-4 text-xs font-semibold text-slate-700">
                {/* Down payment control */}
                <div>
                  <div className="flex justify-between mb-1.5">
                    <span>Down Payment ({downPaymentPercent}%)</span>
                    <span className="text-[#006AFF] font-bold tabular-nums">
                      ${Math.round(downPaymentAmount).toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    step="5"
                    value={downPaymentPercent}
                    onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                    className="w-full accent-[#006AFF] cursor-pointer"
                  />
                </div>

                {/* Interest rate control */}
                <div>
                  <div className="flex justify-between mb-1.5">
                    <span>Interest Rate</span>
                    <span className="text-[#006AFF] font-bold tabular-nums">{interestRate}%</span>
                  </div>
                  <input
                    type="range"
                    min="4.0"
                    max="9.0"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full accent-[#006AFF] cursor-pointer"
                  />
                </div>

                {/* Loan Term */}
                <div>
                  <span className="block mb-1.5">Loan Term</span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setLoanTermYears(30)}
                      className={`py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        loanTermYears === 30
                          ? 'bg-[#006AFF] text-white'
                          : 'bg-white text-slate-700 border border-slate-200'
                      }`}
                    >
                      30-Year Fixed
                    </button>
                    <button
                      type="button"
                      onClick={() => setLoanTermYears(15)}
                      className={`py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        loanTermYears === 15
                          ? 'bg-[#006AFF] text-white'
                          : 'bg-white text-slate-700 border border-slate-200'
                      }`}
                    >
                      15-Year Fixed
                    </button>
                  </div>
                </div>

                {/* Breakdown List */}
                <div className="pt-3 border-t border-blue-200/60 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Principal & Interest</span>
                    <span className="font-bold text-slate-800 tabular-nums">
                      ${Math.round(monthlyPrincipalAndInterest).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Property Taxes (Est.)</span>
                    <span className="font-bold text-slate-800 tabular-nums">
                      ${Math.round(monthlyPropertyTax).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Homeowners Insurance (Est.)</span>
                    <span className="font-bold text-slate-800 tabular-nums">${monthlyInsurance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">HOA Fees</span>
                    <span className="font-bold text-emerald-600">$0 / mo</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tour & Disclosure Action Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h4 className="text-base font-bold text-[#102A43]">
                Ready to Experience 123 Maple Street?
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Sarah Johnson is available for private walkthroughs, video showings, and to provide the full title & inspection disclosure package.
              </p>

              <div className="space-y-2.5">
                <button
                  onClick={onScheduleTour}
                  className="w-full py-3 px-4 text-sm font-bold text-white bg-[#006AFF] hover:bg-[#0053c6] active:bg-[#0047a8] rounded-xl shadow-sm transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Schedule Private Tour</span>
                </button>
                <button
                  onClick={onContactAgent}
                  className="w-full py-2.5 px-4 text-sm font-semibold text-[#102A43] bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-[#006AFF]" />
                  <span>Request Full Disclosure Packet</span>
                </button>
              </div>

              <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 text-center">
                MLS# ZL-9823411 · Listed with Zillow Real Estate · DRE #02194830
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
