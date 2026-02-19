import React from 'react';

interface FamilyIconProps {
  className?: string;
  size?: number;
}

/**
 * Family icon: 4 silhouettes standing side by side — tall adult, shorter adult,
 * and two children of different heights. Matches the style of the reference image.
 */
const FamilyIcon: React.FC<FamilyIconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="currentColor"
    className={className}
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Figure 1 – tallest adult (left) */}
    <circle cx="5.5" cy="5" r="2.5" />
    <path d="M3 24V14.5a2.5 2.5 0 0 1 5 0V24H3z" />

    {/* Figure 2 – second adult (centre-left, slightly shorter) */}
    <circle cx="11.5" cy="6.5" r="2.2" />
    <path d="M9.2 24V15.5a2.3 2.3 0 0 1 4.6 0V24H9.2z" />

    {/* Figure 3 – older child (centre-right) */}
    <circle cx="19" cy="9" r="1.9" />
    <path d="M17 24V18a2 2 0 0 1 4 0v6h-4z" />

    {/* Figure 4 – small child (right) */}
    <circle cx="26" cy="11" r="1.6" />
    <path d="M24.2 24V19.5a1.8 1.8 0 0 1 3.6 0V24h-3.6z" />
  </svg>
);

export default FamilyIcon;
