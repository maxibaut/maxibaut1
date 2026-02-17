import React from 'react';

interface FritesConeProps {
  className?: string;
  size?: number;
}

const FritesCone: React.FC<FritesConeProps> = ({ className = '', size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={{ transform: 'rotate(15deg)' }}
  >
    {/* Cone/puntzak */}
    <path d="M6 3h12l-4 18H10L6 3z" />
    {/* Fries sticking out */}
    <line x1="9" y1="3" x2="8" y2="0" />
    <line x1="12" y1="3" x2="12" y2="-1" />
    <line x1="15" y1="3" x2="16" y2="0" />
  </svg>
);

export default FritesCone;
