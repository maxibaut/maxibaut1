import jsPDF from 'jspdf';
import type { TFunction } from 'i18next';

interface Article {
  number: number;
  title: string;
  content: string;
}

export const generateRentalTermsPDF = (t: TFunction, language: string) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;
  let yPosition = margin;

  const checkPageBreak = (requiredSpace: number) => {
    if (yPosition + requiredSpace > pageHeight - margin) {
      doc.addPage();
      yPosition = margin;
      return true;
    }
    return false;
  };

  // Header
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text(t('pageTitle') as string, margin, yPosition);
  yPosition += 12;

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100);
  const subtitleLines = doc.splitTextToSize(t('pageSubtitle') as string, contentWidth);
  doc.text(subtitleLines, margin, yPosition);
  yPosition += subtitleLines.length * 5 + 8;

  // Metadata box
  doc.setDrawColor(200);
  doc.setFillColor(248, 248, 248);
  doc.roundedRect(margin, yPosition, contentWidth, 32, 2, 2, 'FD');
  yPosition += 6;

  doc.setFontSize(9);
  doc.setTextColor(80);
  doc.setFont('helvetica', 'bold');
  doc.text(`${t('accommodation') as string}:`, margin + 4, yPosition);
  doc.setFont('helvetica', 'normal');
  doc.text(t('accommodationValue') as string, margin + 35, yPosition);
  yPosition += 5;

  doc.setFont('helvetica', 'bold');
  doc.text(`${t('website') as string}:`, margin + 4, yPosition);
  doc.setFont('helvetica', 'normal');
  doc.text(t('websiteValue') as string, margin + 35, yPosition);
  yPosition += 5;

  doc.setFont('helvetica', 'bold');
  doc.text(`${t('operator') as string}:`, margin + 4, yPosition);
  doc.setFont('helvetica', 'normal');
  doc.text(t('operatorValue') as string, margin + 35, yPosition);
  yPosition += 5;

  doc.setFont('helvetica', 'bold');
  doc.text(`${t('vatNumber') as string}:`, margin + 4, yPosition);
  doc.setFont('helvetica', 'normal');
  doc.text(t('vatNumberValue') as string, margin + 35, yPosition);

  // Version on the right
  doc.setFont('helvetica', 'bold');
  doc.text(`${t('version') as string}:`, margin + 100, yPosition - 15);
  doc.setFont('helvetica', 'normal');
  doc.text(t('versionValue') as string, margin + 115, yPosition - 15);

  yPosition += 16;

  // Intro
  doc.setTextColor(0);
  doc.setFontSize(10);
  const introLines = doc.splitTextToSize(t('intro') as string, contentWidth);
  doc.text(introLines, margin, yPosition);
  yPosition += introLines.length * 5 + 10;

  // Line
  doc.setDrawColor(200);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 10;

  // Articles
  const articles = t('articles', { returnObjects: true }) as Article[];

  articles.forEach((article) => {
    checkPageBreak(25);

    // Article title
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(40);
    const titleText = `Artikel ${article.number} — ${article.title}`;
    doc.text(titleText, margin, yPosition);
    yPosition += 6;

    // Article content
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60);
    
    // Handle bullet points (• character)
    const contentParts = article.content.split('\n');
    contentParts.forEach((part) => {
      checkPageBreak(8);
      const lines = doc.splitTextToSize(part, contentWidth);
      doc.text(lines, margin, yPosition);
      yPosition += lines.length * 5 + 2;
    });
    
    yPosition += 6;
  });

  // Line before closing
  checkPageBreak(30);
  doc.setDrawColor(200);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 10;

  // Closing
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60);
  const closingText = t('closing') as string;
  doc.text(closingText, pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 8;

  // Contact
  const contactText = `${t('contact.email') as string} • ${t('contact.phone') as string}`;
  doc.text(contactText, pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 12;

  // Signature
  doc.setFontSize(9);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(120);
  doc.text(t('signature') as string, pageWidth / 2, yPosition, { align: 'center' });

  // Save PDF
  const langSuffix = language === 'nl' ? 'nl' : language === 'fr' ? 'fr' : language === 'de' ? 'de' : 'en';
  doc.save(`huurvoorwaarden-ardennest-${langSuffix}.pdf`);
};
