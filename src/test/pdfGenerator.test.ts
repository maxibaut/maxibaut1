import { describe, it, expect, vi, beforeEach } from 'vitest';
import { generatePDF, generateChecklistPDF } from '@/lib/pdfGenerator';

// Mock jsPDF
vi.mock('jspdf', () => {
  return {
    jsPDF: vi.fn().mockImplementation(() => ({
      internal: {
        pageSize: {
          getWidth: () => 210,
          getHeight: () => 297,
        },
      },
      setFont: vi.fn(),
      setFontSize: vi.fn(),
      setTextColor: vi.fn(),
      setDrawColor: vi.fn(),
      setFillColor: vi.fn(),
      setLineWidth: vi.fn(),
      text: vi.fn(),
      line: vi.fn(),
      rect: vi.fn(),
      roundedRect: vi.fn(),
      addPage: vi.fn(),
      save: vi.fn(),
      splitTextToSize: vi.fn((text: string) => [text]),
      getTextWidth: vi.fn(() => 20),
    })),
  };
});

describe('generatePDF', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should generate a PDF successfully with valid options', () => {
    const options = {
      title: 'Test Title',
      subtitle: 'Test Subtitle',
      sections: [
        {
          title: 'Section 1',
          content: 'Section content',
        },
      ],
    };

    const result = generatePDF(options, 'test.pdf');
    expect(result).toBe(true);
  });

  it('should handle empty sections array', () => {
    const options = {
      title: 'Test Title',
      sections: [],
    };

    const result = generatePDF(options, 'test.pdf');
    expect(result).toBe(true);
  });

  it('should handle metadata', () => {
    const options = {
      title: 'Test Title',
      metadata: [
        { label: 'Author', value: 'Test Author' },
        { label: 'Date', value: '2024-01-01' },
      ],
      sections: [],
    };

    const result = generatePDF(options, 'test.pdf');
    expect(result).toBe(true);
  });

  it('should handle emergency contacts', () => {
    const options = {
      title: 'Test Title',
      sections: [],
      emergency: [
        { label: 'Emergency', value: '112' },
      ],
    };

    const result = generatePDF(options, 'test.pdf');
    expect(result).toBe(true);
  });
});

describe('generateChecklistPDF', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should generate a checklist PDF successfully', () => {
    const options = {
      title: 'Checklist',
      subtitle: 'Departure checklist',
      intro: 'Please complete all items',
      sections: [
        {
          title: 'General',
          items: ['Item 1', 'Item 2'],
        },
      ],
      damage: {
        title: 'Damage',
        content: 'Report any damage',
        depositInfo: 'Deposit: €500',
      },
      contact: {
        title: 'Contact',
        phone1: '+32 123 456 789',
        phone2: '+32 987 654 321',
      },
      closing: {
        content: 'Thank you',
        signature: 'The Team',
      },
    };

    const result = generateChecklistPDF(options, 'checklist.pdf');
    expect(result).toBe(true);
  });

  it('should handle sections with tips', () => {
    const options = {
      title: 'Checklist',
      sections: [
        {
          title: 'Kitchen',
          items: ['Clean stove'],
          tip: 'Use the provided cleaning supplies',
        },
      ],
      damage: {
        title: 'Damage',
        content: 'Report damage',
        depositInfo: 'Deposit info',
      },
      contact: {
        title: 'Contact',
        phone1: '123',
        phone2: '456',
      },
      closing: {
        content: 'Thanks',
        signature: 'Team',
      },
    };

    const result = generateChecklistPDF(options, 'checklist.pdf');
    expect(result).toBe(true);
  });
});
