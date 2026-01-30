import { describe, it, expect } from 'vitest';
import { cn } from '@/lib/utils';

describe('cn utility', () => {
  it('should merge class names correctly', () => {
    const result = cn('bg-red-500', 'text-white');
    expect(result).toBe('bg-red-500 text-white');
  });

  it('should handle conditional classes', () => {
    const isActive = true;
    const result = cn('base-class', isActive && 'active-class');
    expect(result).toBe('base-class active-class');
  });

  it('should handle false conditions', () => {
    const isActive = false;
    const result = cn('base-class', isActive && 'active-class');
    expect(result).toBe('base-class');
  });

  it('should merge tailwind classes correctly', () => {
    const result = cn('px-2 py-1', 'px-4');
    expect(result).toBe('py-1 px-4');
  });

  it('should handle undefined and null values', () => {
    const result = cn('base-class', undefined, null, 'other-class');
    expect(result).toBe('base-class other-class');
  });

  it('should handle empty strings', () => {
    const result = cn('base-class', '', 'other-class');
    expect(result).toBe('base-class other-class');
  });

  it('should handle object syntax', () => {
    const result = cn({ 'active-class': true, 'inactive-class': false });
    expect(result).toBe('active-class');
  });
});
