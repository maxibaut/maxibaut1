import { jsPDF } from 'jspdf';
import type { TFunction } from 'i18next';

interface CancellationTier {
  period: string;
  refund: string;
  description: string;
}

export const generateCancellationPolicyPDF = (t: TFunction, language: string) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;
  let yPosition = margin;

  // Helper function to add text with word wrap
  const addWrappedText = (text: string, x: number, y: number, maxWidth: number, lineHeight: number = 7): number => {
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, x, y);
    return y + lines.length * lineHeight;
  };

  // Helper function to check and add new page if needed
  const checkPageBreak = (requiredSpace: number): void => {
    if (yPosition + requiredSpace > doc.internal.pageSize.getHeight() - margin) {
      doc.addPage();
      yPosition = margin;
    }
  };

  // Title
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text(t('pageTitle'), margin, yPosition);
  yPosition += 15;

  // Document info
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100);
  doc.text(`${t('accommodation')}: ${t('accommodationValue')}`, margin, yPosition);
  yPosition += 5;
  doc.text(`${t('website')}: ${t('websiteValue')}`, margin, yPosition);
  yPosition += 5;
  doc.text(`${t('operator')}: ${t('operatorValue')}`, margin, yPosition);
  yPosition += 5;
  doc.text(`${t('version')}: ${t('versionValue')}`, margin, yPosition);
  yPosition += 15;

  // Intro
  doc.setTextColor(0);
  doc.setFontSize(11);
  yPosition = addWrappedText(t('intro'), margin, yPosition, contentWidth);
  yPosition += 10;

  // Cancellation Tiers Title
  checkPageBreak(30);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(t('tiersTitle'), margin, yPosition);
  yPosition += 10;

  // Tiers
  const tiers = t('tiers', { returnObjects: true }) as CancellationTier[];
  doc.setFontSize(11);
  
  tiers.forEach((tier) => {
    checkPageBreak(25);
    
    doc.setFont('helvetica', 'bold');
    doc.text(`${tier.period} — ${tier.refund}`, margin, yPosition);
    yPosition += 6;
    
    doc.setFont('helvetica', 'normal');
    yPosition = addWrappedText(tier.description, margin, yPosition, contentWidth);
    yPosition += 8;
  });

  // Additional Conditions Title
  yPosition += 5;
  checkPageBreak(30);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(t('conditionsTitle'), margin, yPosition);
  yPosition += 10;

  // Conditions
  const conditions = t('conditions', { returnObjects: true }) as string[];
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  
  conditions.forEach((condition) => {
    checkPageBreak(15);
    yPosition = addWrappedText(`• ${condition}`, margin, yPosition, contentWidth);
    yPosition += 3;
  });

  // Force Majeure
  yPosition += 10;
  checkPageBreak(40);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(t('forceMajeure.title'), margin, yPosition);
  yPosition += 10;

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  yPosition = addWrappedText(t('forceMajeure.content'), margin, yPosition, contentWidth);
  yPosition += 15;

  // Contact
  checkPageBreak(40);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(t('contact.title'), margin, yPosition);
  yPosition += 10;

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  yPosition = addWrappedText(t('contact.content'), margin, yPosition, contentWidth);
  yPosition += 8;
  doc.text(t('contact.email'), margin, yPosition);
  yPosition += 6;
  doc.text(t('contact.phone'), margin, yPosition);
  yPosition += 15;

  // Signature
  checkPageBreak(15);
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.setFont('helvetica', 'italic');
  const signature = t('signature');
  const signatureWidth = doc.getTextWidth(signature);
  doc.text(signature, (pageWidth - signatureWidth) / 2, yPosition);

  // Save
  const filename = `annuleringsbeleid-${language}.pdf`;
  doc.save(filename);
};
