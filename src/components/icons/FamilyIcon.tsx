import React from 'react';

interface FamilyIconProps {
  className?: string;
  size?: number;
}

/**
 * Custom family icon: adult — baby — adult
 * Communicates multigenerational groups incl. children.
 */
const FamilyIcon: React.FC<FamilyIconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Left adult – head */}
    <circle cx="4.5" cy="4.5" r="2" />
    {/* Left adult – body */}
    <path d="M2 13v-3a2.5 2.5 0 0 1 5 0v3" />
    {/* Left adult – legs */}
    <line x1="3" y1="13" x2="3" y2="18" />
    <line x1="6" y1="13" x2="6" y2="18" />

    {/* Baby – small head in the middle */}
    <circle cx="12" cy="6.5" r="1.4" />
    {/* Baby – body (shorter/smaller) */}
    <path d="M10 13v-2.5a2 2 0 0 1 4 0V13" />
    {/* Baby – legs (shorter) */}
    <line x1="11" y1="13" x2="11" y2="16.5" />
    <line x1="13" y1="13" x2="13" y2="16.5" />

    {/* Right adult – head */}
    <circle cx="19.5" cy="4.5" r="2" />
    {/* Right adult – body */}
    <path d="M17 13v-3a2.5 2.5 0 0 1 5 0v3" />
    {/* Right adult – legs */}
    <line x1="18" y1="13" x2="18" y2="18" />
    <line x1="21" y1="13" x2="21" y2="18" />
  </svg>
);

export default FamilyIcon;
