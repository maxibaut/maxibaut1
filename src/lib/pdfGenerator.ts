import { jsPDF } from 'jspdf';

interface PDFSection {
  title: string;
  content?: string;
  subsections?: { title: string; content: string }[];
}

interface PDFGeneratorOptions {
  title: string;
  subtitle?: string;
  metadata?: { label: string; value: string }[];
  welcome?: string;
  sections: PDFSection[];
  footer?: string;
  emergency?: { label: string; value: string }[];
}

export const generatePDF = (options: PDFGeneratorOptions, filename: string): boolean => {
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  const checkPageBreak = (requiredSpace: number) => {
    if (y + requiredSpace > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
  };

  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.text(options.title, margin, y);
  y += 12;

  // Subtitle
  if (options.subtitle) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(100, 100, 100);
    const subtitleLines = doc.splitTextToSize(options.subtitle, contentWidth);
    doc.text(subtitleLines, margin, y);
    y += subtitleLines.length * 5 + 5;
  }

  // Metadata
  if (options.metadata && options.metadata.length > 0) {
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(9);
    options.metadata.forEach((item) => {
      doc.setFont('helvetica', 'bold');
      doc.text(`${item.label}: `, margin, y);
      const labelWidth = doc.getTextWidth(`${item.label}: `);
      doc.setFont('helvetica', 'normal');
      doc.text(item.value, margin + labelWidth, y);
      y += 5;
    });
    y += 5;
  }

  // Separator line
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, y, pageWidth - margin, y);
  y += 10;

  // Welcome text
  if (options.welcome) {
    checkPageBreak(30);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    const welcomeLines = doc.splitTextToSize(options.welcome, contentWidth);
    doc.text(welcomeLines, margin, y);
    y += welcomeLines.length * 5 + 10;

    // Separator
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;
  }

  // Sections
  options.sections.forEach((section) => {
    checkPageBreak(25);

    // Section title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(section.title, margin, y);
    y += 8;

    // Section content
    if (section.content) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(60, 60, 60);
      const lines = doc.splitTextToSize(section.content, contentWidth);
      
      lines.forEach((line: string) => {
        checkPageBreak(6);
        doc.text(line, margin, y);
        y += 5;
      });
      y += 5;
    }

    // Subsections
    if (section.subsections) {
      section.subsections.forEach((sub) => {
        checkPageBreak(20);
        
        // Subsection title
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(40, 40, 40);
        doc.text(sub.title, margin, y);
        y += 6;

        // Subsection content
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(60, 60, 60);
        const lines = doc.splitTextToSize(sub.content, contentWidth);
        
        lines.forEach((line: string) => {
          checkPageBreak(6);
          doc.text(line, margin, y);
          y += 5;
        });
        y += 5;
      });
    }

    // Section separator
    checkPageBreak(10);
    doc.setDrawColor(220, 220, 220);
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;
  });

  // Emergency section
  if (options.emergency && options.emergency.length > 0) {
    checkPageBreak(30);
    doc.setFillColor(255, 240, 240);
    doc.roundedRect(margin, y - 2, contentWidth, 25, 3, 3, 'F');
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(200, 0, 0);
    
    let xPos = margin + 5;
    options.emergency.forEach((item, index) => {
      doc.text(`${item.label}: ${item.value}`, xPos, y + 10);
      if (index === 0) xPos = margin + contentWidth / 2;
    });
    y += 30;
  }

  // Footer
  if (options.footer) {
    checkPageBreak(20);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9);
    doc.setTextColor(120, 120, 120);
    doc.text(options.footer, margin, y + 5);
  }

    // Save the PDF
    doc.save(filename);
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    return false;
  }
};

// Checklist PDF Generator
interface ChecklistPDFSection {
  title: string;
  subtitle?: string;
  items: string[];
  tip?: string;
}

interface ChecklistPDFOptions {
  title: string;
  subtitle?: string;
  intro?: string;
  sections: ChecklistPDFSection[];
  damage: {
    title: string;
    content: string;
    depositInfo: string;
  };
  contact: {
    title: string;
    phone1: string;
    phone2: string;
  };
  closing: {
    content: string;
    signature: string;
  };
}

export const generateChecklistPDF = (options: ChecklistPDFOptions, filename: string): boolean => {
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  const checkPageBreak = (requiredSpace: number) => {
    if (y + requiredSpace > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
  };

  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.text(options.title, margin, y);
  y += 10;

  // Website
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text('www.ardennest.be', pageWidth - margin - doc.getTextWidth('www.ardennest.be'), margin);
  doc.setTextColor(0, 0, 0);

  // Subtitle
  if (options.subtitle) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(100, 100, 100);
    const subtitleLines = doc.splitTextToSize(options.subtitle, contentWidth);
    doc.text(subtitleLines, margin, y);
    y += subtitleLines.length * 5 + 5;
  }

  // Intro
  if (options.intro) {
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    const introLines = doc.splitTextToSize(options.intro, contentWidth);
    doc.text(introLines, margin, y);
    y += introLines.length * 5 + 8;
  }

  // Separator
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, y, pageWidth - margin, y);
  y += 10;

  // Sections with checkboxes
  options.sections.forEach((section) => {
    checkPageBreak(30);

    // Section title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(section.title, margin, y);
    y += 7;

    // Section subtitle
    if (section.subtitle) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(section.subtitle, margin, y);
      y += 6;
    }

    // Checkbox items
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);

    section.items.forEach((item) => {
      checkPageBreak(8);
      
      // Draw checkbox square
      doc.setDrawColor(150, 150, 150);
      doc.setLineWidth(0.3);
      doc.rect(margin, y - 3.5, 4, 4);
      
      // Item text
      const itemLines = doc.splitTextToSize(item, contentWidth - 8);
      doc.text(itemLines, margin + 7, y);
      y += itemLines.length * 5 + 2;
    });

    // Tip
    if (section.tip) {
      checkPageBreak(10);
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(9);
      doc.setTextColor(80, 120, 80);
      doc.text(section.tip, margin, y);
      y += 8;
    }

    y += 5;

    // Section separator
    doc.setDrawColor(220, 220, 220);
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;
  });

  // Damage section
  checkPageBreak(30);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text(options.damage.title, margin, y);
  y += 7;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  const damageLines = doc.splitTextToSize(options.damage.content, contentWidth);
  doc.text(damageLines, margin, y);
  y += damageLines.length * 5 + 5;

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text(options.damage.depositInfo, margin, y);
  y += 10;

  // Separator
  doc.setDrawColor(220, 220, 220);
  doc.line(margin, y, pageWidth - margin, y);
  y += 10;

  // Contact section
  checkPageBreak(25);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`${options.contact.title}: ${options.contact.phone1} of ${options.contact.phone2}`, margin, y);
  y += 15;

  // Closing
  checkPageBreak(25);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);
  doc.text(options.closing.content, margin, y);
  y += 10;

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9);
  doc.setTextColor(120, 120, 120);
  doc.text(options.closing.signature, margin, y);

    // Save the PDF
    doc.save(filename);
    return true;
  } catch (error) {
    console.error('Error generating checklist PDF:', error);
    return false;
  }
};
