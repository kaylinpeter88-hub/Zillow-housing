import React, { useState } from 'react';
import { X, MapPin, Copy, Check, ExternalLink, Navigation, Car, Compass } from 'lucide-react';

interface DirectionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  address?: string;
}

export const DirectionsModal: React.FC<DirectionsModalProps> = ({
  isOpen,
  onClose,
  address = '123 Maple Street, Pleasant Valley, CA 94566',
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard?.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const encodedAddress = encodeURIComponent(address);
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  const appleMapsUrl = `https://maps.apple.com/?q=${encodedAddress}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 text-slate-800 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#006AFF]/10 text-[#006AFF] flex items-center justify-center">
              <Navigation className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#102A43]">
                Directions to 123 Maple Street
              </h3>
              <p className="text-xs text-slate-500">
                Pleasant Valley, CA 94566
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Address Card */}
        <div className="mt-4 p-4 rounded-xl bg-[#F3F8FF] border border-blue-100 flex items-center justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-[#006AFF] shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-[#102A43]">{address}</p>
              <p className="text-xs text-slate-500">Cross streets: Maple St & Crestview Blvd</p>
            </div>
          </div>
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 text-xs font-semibold text-[#006AFF] bg-white hover:bg-blue-50 border border-blue-200 rounded-lg transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Map Preview Graphic Representation */}
        <div className="mt-4 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 relative h-48 flex items-center justify-center">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#006AFF_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="relative text-center p-4">
            <div className="w-12 h-12 rounded-full bg-[#006AFF] text-white flex items-center justify-center mx-auto shadow-lg mb-2">
              <MapPin className="w-6 h-6 animate-bounce" />
            </div>
            <p className="text-xs font-bold text-slate-800">123 Maple Street Residence</p>
            <p className="text-[11px] text-slate-500">Quiet Tree-Lined Neighborhood</p>
          </div>
        </div>

        {/* Quick Travel & Parking Advice */}
        <div className="mt-4 space-y-2 text-xs text-slate-600">
          <div className="flex items-start gap-2">
            <Car className="w-4 h-4 text-[#006AFF] shrink-0 mt-0.5" />
            <span>
              <strong>Parking:</strong> Ample street parking available on Maple Street. Driveway designated for handicapped and EV charging preview.
            </span>
          </div>
          <div className="flex items-start gap-2">
            <Compass className="w-4 h-4 text-[#006AFF] shrink-0 mt-0.5" />
            <span>
              <strong>Transit:</strong> Located 5 minutes from Pleasant Valley Transit Station and Highway 101 corridor.
            </span>
          </div>
        </div>

        {/* External Map Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-2.5">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 px-4 text-xs font-bold text-white bg-[#006AFF] hover:bg-[#0053c6] rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-sm"
          >
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <a
            href={appleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 px-4 text-xs font-bold text-[#102A43] bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>Open in Apple Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
