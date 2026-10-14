import React from 'react';

interface ShabaAutosLogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  showDivider?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const SIZE_STYLES = {
  sm: 'h-12 w-12',
  md: 'h-14 w-14 sm:h-16 sm:w-16',
  lg: 'h-20 w-20 sm:h-24 sm:w-24',
} as const;

export const ShabaAutosLogo: React.FC<ShabaAutosLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'light',
}) => {
  const badgeClass = SIZE_STYLES[size] ?? SIZE_STYLES.md;
  const imageClass = 'shaba-logo-img block h-auto w-[82%] max-h-[78%] object-contain';

  return (
    <span
      className={`shaba-logo inline-flex select-none items-center ${
        variant === 'dark' ? 'shaba-logo--on-dark' : ''
      } ${className}`}
    >
      <span className={`shaba-logo-badge ${badgeClass}`}>
        <img
          src="/assets/shabaautos-logo-light.png"
          alt="ShabaAutos logo"
          width={560}
          height={430}
          loading="eager"
          className={`${imageClass} shaba-logo-img--light`}
        />
        <img
          src="/assets/shabaautos-logo-dark.png"
          alt=""
          aria-hidden="true"
          width={560}
          height={430}
          loading="eager"
          className={`${imageClass} shaba-logo-img--dark`}
        />
      </span>
    </span>
  );
};
