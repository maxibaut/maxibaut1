import React from 'react';

interface FamilyIconProps {
  className?: string;
  size?: number;
}

/**
 * Family icon: two adults (left & right) with a child in the centre-front.
 * Filled silhouette style, matches the reference image provided.
 */
const FamilyIcon: React.FC<FamilyIconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Left adult – head */}
    <circle cx="5.5" cy="4.5" r="2.5" />
    {/* Left adult – body/shoulders */}
    <path d="M1 19.5v-3.8a4.5 4.5 0 0 1 4.5-4.5 4.5 4.5 0 0 1 4.5 4.5v3.8H1z" />

    {/* Right adult – head */}
    <circle cx="18.5" cy="4.5" r="2.5" />
    {/* Right adult – body/shoulders */}
    <path d="M14 19.5v-3.8a4.5 4.5 0 0 1 4.5-4.5 4.5 4.5 0 0 1 4.5 4.5v3.8H14z" />

    {/* Child – head (smaller, centred, overlapping adults) */}
    <circle cx="12" cy="13" r="2" />
    {/* Child – body (shorter, sits in front) */}
    <path d="M8.5 22v-2.8a3.5 3.5 0 0 1 3.5-3.5 3.5 3.5 0 0 1 3.5 3.5V22H8.5z" />
  </svg>
);

export default FamilyIcon;
