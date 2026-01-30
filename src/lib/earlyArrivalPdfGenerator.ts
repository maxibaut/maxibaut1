import { jsPDF } from 'jspdf';
import { TFunction } from 'i18next';

interface Highlight {
  name: string;
  description: string;
}

interface Destination {
  name: string;
  distance: string;
  description: string;
  highlights: Highlight[];
}

export const generateEarlyArrivalPDF = (t: TFunction, language: string) => {
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
  doc.text(t('pageTitle'), margin, y);
  y += 10;

  // Website in top right
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text('www.ardennest.be', pageWidth - margin - doc.getTextWidth('www.ardennest.be'), margin);
  doc.setTextColor(0, 0, 0);

  // Subtitle
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(100, 100, 100);
  const subtitleLines = doc.splitTextToSize(t('pageSubtitle'), contentWidth);
  doc.text(subtitleLines, margin, y);
  y += subtitleLines.length * 5 + 5;

  // Metadata
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(9);
  const metadata = [
    { label: t('accommodation'), value: t('accommodationValue') },
    { label: t('website'), value: t('websiteValue') },
    { label: t('operator'), value: t('operatorValue') },
    { label: t('version'), value: t('versionValue') },
  ];
  metadata.forEach((item) => {
    doc.setFont('helvetica', 'bold');
    doc.text(`${item.label}: `, margin, y);
    const labelWidth = doc.getTextWidth(`${item.label}: `);
    doc.setFont('helvetica', 'normal');
    doc.text(item.value, margin + labelWidth, y);
    y += 5;
  });
  y += 5;

  // Separator
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;

  // Intro
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  const introLines = doc.splitTextToSize(t('intro'), contentWidth);
  doc.text(introLines, margin, y);
  y += introLines.length * 5 + 8;

  // Separator
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, y, pageWidth - margin, y);
  y += 10;

  // Destinations
  const destinations = t('destinations', { returnObjects: true }) as Destination[];

  destinations.forEach((destination, index) => {
    checkPageBreak(40);

    // Destination name and distance
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(destination.name, margin, y);
    
    // Distance badge
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    const distanceText = `🕐 ${destination.distance}`;
    doc.text(distanceText, pageWidth - margin - doc.getTextWidth(distanceText), y);
    y += 7;

    // Description
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    const descLines = doc.splitTextToSize(destination.description, contentWidth);
    doc.text(descLines, margin, y);
    y += descLines.length * 5 + 5;

    // Highlights
    destination.highlights.forEach((highlight) => {
      checkPageBreak(15);
      
      // Highlight name
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(40, 40, 40);
      doc.text(`• ${highlight.name}`, margin + 5, y);
      y += 5;

      // Highlight description
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(80, 80, 80);
      const highlightLines = doc.splitTextToSize(highlight.description, contentWidth - 10);
      doc.text(highlightLines, margin + 8, y);
      y += highlightLines.length * 4 + 3;
    });

    y += 5;

    // Add separator between destinations (except last)
    if (index < destinations.length - 1) {
      doc.setDrawColor(230, 230, 230);
      doc.line(margin + 10, y, pageWidth - margin - 10, y);
      y += 8;
    }
  });

  // Separator before contact
  y += 5;
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, y, pageWidth - margin, y);
  y += 10;

  // Contact section
  checkPageBreak(30);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(t('contact.title'), margin, y);
  y += 7;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  doc.text(t('contact.content'), margin, y);
  y += 6;

  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.text(`📞 ${t('contact.phone1')}`, margin, y);
  y += 5;
  doc.text(`📞 ${t('contact.phone2')}`, margin, y);
  y += 10;

  // Signature
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9);
  doc.setTextColor(120, 120, 120);
  doc.text(t('signature'), margin, y);

  // Save the PDF
  doc.save(`vroege-aankomst-ardennest-${language}.pdf`);
};
