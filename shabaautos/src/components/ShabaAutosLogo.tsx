import React from 'react';

interface ShabaAutosLogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  showDivider?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const SIZE_STYLES = {
  sm: 'h-12',
  md: 'h-14 sm:h-16',
  lg: 'h-20 sm:h-24',
} as const;

export const ShabaAutosLogo: React.FC<ShabaAutosLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'light',
}) => {
  const heightClass = SIZE_STYLES[size] ?? SIZE_STYLES.md;
  const imageClass = `shaba-logo-img ${heightClass} block w-auto rounded-full object-contain`;

  return (
    <span
      className={`shaba-logo inline-flex select-none items-center ${
        variant === 'dark' ? 'shaba-logo--on-dark' : ''
      } ${className}`}
    >
      <img
        src="/assets/shabaautos-logo.jpeg"
        alt="ShabaAutos logo"
        width={720}
        height={720}
        loading="eager"
        className={imageClass}
      />
    </span>
  );
};
