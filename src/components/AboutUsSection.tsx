import React from 'react';
import {
  Phone,
  Mail,
  Globe,
  Award,
  Shield,
  HeartHandshake,
  TrendingUp,
  Star,
  CheckCircle,
} from 'lucide-react';
import { AgentInfo } from '../types';
import { REVIEWS } from '../data/propertyData';

interface AboutUsSectionProps {
  agent: AgentInfo;
  onContactAgent: () => void;
}

export const AboutUsSection: React.FC<AboutUsSectionProps> = ({
  agent,
  onContactAgent,
}) => {
  return (
    <section id="about-us" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-bold uppercase tracking-wider text-[#006AFF] mb-2">
            Professional Representation & Advisory
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#102A43] tracking-tight">
            About Zillow Real Estate & Sarah Johnson
          </h2>
          <p className="mt-2 text-base text-slate-600 leading-relaxed">
            Built on integrity, precision data, and an uncompromising commitment to matching families with the homes they truly love.
          </p>
        </div>

        {/* Agent Profile & Company Story Card */}
        <div className="bg-[#F3F8FF] rounded-3xl p-8 sm:p-12 border border-blue-100 shadow-sm mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Agent Portrait Column */}
            <div className="lg:col-span-5 flex flex-col items-center sm:items-start">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden shadow-xl border-4 border-white mb-4">
                <img
                  src={agent.image}
                  alt="Sarah Johnson - Licensed Real Estate Agent"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute bottom-3 left-3 right-3 bg-[#102A43]/90 backdrop-blur-md px-3 py-2 rounded-xl text-white flex items-center justify-between text-xs">
                  <span className="font-semibold">{agent.licenseNumber}</span>
                  <span className="text-amber-400 font-bold flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    4.98 (78 Reviews)
                  </span>
                </div>
              </div>

              {/* Verified Contact Badges */}
              <div className="w-full max-w-sm space-y-2 pt-2">
                <a
                  href={`tel:${agent.phone.replace(/[^0-9]/g, '')}`}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 hover:text-[#006AFF] hover:border-blue-200 transition-colors text-xs font-semibold group"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#006AFF]/10 text-[#006AFF] flex items-center justify-center shrink-0 group-hover:bg-[#006AFF] group-hover:text-white transition-colors">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Direct Call</span>
                    <span className="tabular-nums">{agent.phone}</span>
                  </div>
                </a>

                <a
                  href={agent.email.startsWith('http') ? agent.email : `mailto:${agent.email}`}
                  target={agent.email.startsWith('http') ? '_blank' : undefined}
                  rel={agent.email.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 hover:text-[#006AFF] hover:border-blue-200 transition-colors text-xs font-semibold group"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#006AFF]/10 text-[#006AFF] flex items-center justify-center shrink-0 group-hover:bg-[#006AFF] group-hover:text-white transition-colors">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <div className="truncate">
                    <span className="text-slate-400 block text-[10px] uppercase">
                      {agent.email.startsWith('http') ? 'Direct Inquiries (Formspree)' : 'Email Agent'}
                    </span>
                    <span className="truncate">{agent.email}</span>
                  </div>
                </a>

                <a
                  href="https://www.zillow.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 hover:text-[#006AFF] hover:border-blue-200 transition-colors text-xs font-semibold group"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#006AFF]/10 text-[#006AFF] flex items-center justify-center shrink-0 group-hover:bg-[#006AFF] group-hover:text-white transition-colors">
                    <Globe className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Network Reference</span>
                    <span>Zillow.com Premier Partner</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Story & Credentials Column */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#006AFF]">
                  Meet Your Dedicated Agent
                </span>
                <h3 className="text-3xl font-extrabold text-[#102A43] tracking-tight mt-1">
                  {agent.name}
                </h3>
                <p className="text-base font-semibold text-slate-700">
                  {agent.title} · {agent.company}
                </p>
              </div>

              <p className="text-base text-slate-700 leading-relaxed">
                {agent.bio}
              </p>

              <p className="text-sm text-slate-600 leading-relaxed">
                Whether you are stepping into homeownership for the first time or seeking your next architectural investment, our philosophy is anchored in radical transparency, objective market comps, and round-the-clock availability for our clients.
              </p>

              {/* Quantified Track Record */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-blue-200/60">
                <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-2xs">
                  <div className="text-2xl font-extrabold text-[#006AFF] tabular-nums">
                    {agent.salesVolume}
                  </div>
                  <div className="text-xs font-semibold text-slate-500 mt-0.5">
                    Career Volume
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-2xs">
                  <div className="text-2xl font-extrabold text-[#006AFF] tabular-nums">
                    {agent.closedTransactions}+
                  </div>
                  <div className="text-xs font-semibold text-slate-500 mt-0.5">
                    Homes Closed
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-2xs">
                  <div className="text-2xl font-extrabold text-[#006AFF] tabular-nums">
                    100%
                  </div>
                  <div className="text-xs font-semibold text-slate-500 mt-0.5">
                    Client Dedication
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onContactAgent}
                  className="px-6 py-3 text-sm font-bold text-white bg-[#006AFF] hover:bg-[#0053c6] rounded-xl shadow-sm transition-all duration-150 inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>Connect With Sarah Johnson</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Core Pillars of Customer Satisfaction */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-200 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#006AFF]/10 text-[#006AFF] flex items-center justify-center mb-4">
              <Shield className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-bold text-[#102A43] mb-2">
              Uncompromising Trust
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Every property disclosure, HOA document, and comparable market valuation is verified and thoroughly reviewed so you make decisions with absolute clarity.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-200 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#006AFF]/10 text-[#006AFF] flex items-center justify-center mb-4">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-bold text-[#102A43] mb-2">
              Data-Backed Negotiation
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Backed by Zillow's leading real estate data engine, we leverage localized hyper-trend metrics to secure the most advantageous terms and pricing for our buyers.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-200 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#006AFF]/10 text-[#006AFF] flex items-center justify-center mb-4">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-bold text-[#102A43] mb-2">
              Lifelong Client Partnership
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Our relationship doesn’t end at the closing table. From contractor recommendations to periodic equity reviews, we are your permanent real estate resource.
            </p>
          </div>
        </div>

        {/* Verified Client Testimonials */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl font-extrabold text-[#102A43]">
              What Our Homebuyers & Clients Say
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Real stories from families we've helped find their dream homes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((rev, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-[#F3F8FF] border border-blue-100 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(rev.rating)].map((_, rIdx) => (
                      <Star key={rIdx} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed italic mb-4">
                    "{rev.content}"
                  </p>
                </div>

                <div className="pt-4 border-t border-blue-200/50 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-[#102A43]">{rev.author}</p>
                    <p className="text-[11px] text-slate-500">{rev.role}</p>
                  </div>
                  <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Verified
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
