import React from 'react';
import { Headphones } from 'lucide-react';
import { useBusinessContact, toDialNumber } from '../hooks/useBusinessContact';

interface SupportBlobProps {
  label?: boolean;
}

/** Floating WhatsApp support button: headphone blob, bottom-right, gentle shake, opens wa.me chat. Hidden if no business phone is configured. */
export const SupportBlob: React.FC<SupportBlobProps> = ({ label = false }) => {
  const { phone } = useBusinessContact();
  const dialNumber = toDialNumber(phone);
  if (!dialNumber) return null;
  const waHref = `https://wa.me/${dialNumber.replace(/\D/g, '')}?text=${encodeURIComponent('Hello ShabaAutos, I would like to ask about a vehicle.')}`;

  return (
    <a
      href={waHref}
      target="_blank"
      rel="noopener noreferrer"
      className="shaba-support-blob group inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#128c4a] to-[#0e5c33] text-white border-2 border-white/60 shadow-[0_8px_20px_rgba(14,92,51,0.45),0_0_0_6px_rgba(20,136,74,0.18)] hover:shadow-[0_12px_28px_rgba(14,92,51,0.55),0_0_0_8px_rgba(20,136,74,0.25)] fixed bottom-[calc(5.5rem+env(safe-area-inset-bottom))] right-4 z-30 lg:bottom-6 lg:right-6 lg:h-15 lg:w-15 will-change-transform"
      aria-label="Chat with ShabaAutos support on WhatsApp"
      title="Chat with ShabaAutos on WhatsApp"
    >
      <span className="relative flex items-center justify-center">
        <Headphones className="h-6 w-6 lg:h-7 lg:w-7" aria-hidden="true" />
        <span className="pointer-events-none absolute inset-0 -m-1 rounded-full bg-emerald-300/40 blur-sm opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
        {label && (
          <span className="pointer-events-none absolute right-full mr-3 hidden rounded-lg bg-slate-900 px-2.5 py-1 text-[10px] font-bold whitespace-nowrap text-white shadow-lg sm:block">
            Chat with us on WhatsApp
          </span>
        )}
      </span>
    </a>
  );
};