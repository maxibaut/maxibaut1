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

export const generatePDF = (options: PDFGeneratorOptions, filename: string) => {
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
};
