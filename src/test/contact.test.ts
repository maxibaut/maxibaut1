import { describe, it, expect } from 'vitest';
import { z } from 'zod';

// Contact form validation schema (extracted for testing)
const contactSchema = z.object({
  name: z.string().trim().min(1, 'Naam is verplicht').max(100),
  email: z.string().trim().email('Ongeldig e-mailadres').max(255),
  phone: z.string().trim().optional(),
  dates: z.string().trim().optional(),
  groupSize: z.string().trim().optional(),
  message: z.string().trim().min(1, 'Bericht is verplicht').max(1000),
});

describe('Contact Form Validation', () => {
  describe('name field', () => {
    it('should accept valid name', () => {
      const result = contactSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello',
      });
      expect(result.success).toBe(true);
    });

    it('should reject empty name', () => {
      const result = contactSchema.safeParse({
        name: '',
        email: 'john@example.com',
        message: 'Hello',
      });
      expect(result.success).toBe(false);
    });

    it('should reject name with only whitespace', () => {
      const result = contactSchema.safeParse({
        name: '   ',
        email: 'john@example.com',
        message: 'Hello',
      });
      expect(result.success).toBe(false);
    });

    it('should reject name exceeding 100 characters', () => {
      const result = contactSchema.safeParse({
        name: 'a'.repeat(101),
        email: 'john@example.com',
        message: 'Hello',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('email field', () => {
    it('should accept valid email', () => {
      const result = contactSchema.safeParse({
        name: 'John',
        email: 'john@example.com',
        message: 'Hello',
      });
      expect(result.success).toBe(true);
    });

    it('should reject invalid email format', () => {
      const result = contactSchema.safeParse({
        name: 'John',
        email: 'invalid-email',
        message: 'Hello',
      });
      expect(result.success).toBe(false);
    });

    it('should reject email without domain', () => {
      const result = contactSchema.safeParse({
        name: 'John',
        email: 'john@',
        message: 'Hello',
      });
      expect(result.success).toBe(false);
    });

    it('should reject email exceeding 255 characters', () => {
      const result = contactSchema.safeParse({
        name: 'John',
        email: `${'a'.repeat(250)}@example.com`,
        message: 'Hello',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('message field', () => {
    it('should accept valid message', () => {
      const result = contactSchema.safeParse({
        name: 'John',
        email: 'john@example.com',
        message: 'I would like to book your property.',
      });
      expect(result.success).toBe(true);
    });

    it('should reject empty message', () => {
      const result = contactSchema.safeParse({
        name: 'John',
        email: 'john@example.com',
        message: '',
      });
      expect(result.success).toBe(false);
    });

    it('should reject message exceeding 1000 characters', () => {
      const result = contactSchema.safeParse({
        name: 'John',
        email: 'john@example.com',
        message: 'a'.repeat(1001),
      });
      expect(result.success).toBe(false);
    });
  });

  describe('optional fields', () => {
    it('should accept form without optional fields', () => {
      const result = contactSchema.safeParse({
        name: 'John',
        email: 'john@example.com',
        message: 'Hello',
      });
      expect(result.success).toBe(true);
    });

    it('should accept form with all optional fields', () => {
      const result = contactSchema.safeParse({
        name: 'John',
        email: 'john@example.com',
        phone: '+32 478 030 352',
        dates: '1-7 July 2025',
        groupSize: '10',
        message: 'I would like to book.',
      });
      expect(result.success).toBe(true);
    });
  });
});
