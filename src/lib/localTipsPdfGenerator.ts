import { jsPDF } from 'jspdf';
import { TFunction } from 'i18next';

interface TipItem {
  name: string;
  address?: string;
  phone?: string;
  website?: string;
  email?: string;
  note?: string;
}

interface SubCategory {
  title: string;
  items: TipItem[];
}

export const generateLocalTipsPDF = (t: TFunction, language: string) => {
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

  // Website
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

  // Helper to render items
  const renderItem = (item: TipItem) => {
    checkPageBreak(18);
    
    // Name
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(item.name, margin + 5, y);
    y += 5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(80, 80, 80);

    if (item.address) {
      doc.text(`📍 ${item.address}`, margin + 5, y);
      y += 4;
    }
    if (item.phone) {
      doc.text(`📞 ${item.phone}`, margin + 5, y);
      y += 4;
    }
    if (item.email) {
      doc.text(`✉ ${item.email}`, margin + 5, y);
      y += 4;
    }
    if (item.website) {
      doc.text(`🌐 ${item.website}`, margin + 5, y);
      y += 4;
    }
    if (item.note) {
      doc.setFont('helvetica', 'italic');
      const noteLines = doc.splitTextToSize(item.note, contentWidth - 10);
      noteLines.forEach((line: string) => {
        checkPageBreak(5);
        doc.text(line, margin + 5, y);
        y += 4;
      });
    }
    y += 2;
  };

  // Helper to render subcategory
  const renderSubCategory = (subCategory: SubCategory) => {
    checkPageBreak(15);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(40, 40, 40);
    doc.text(subCategory.title, margin, y);
    y += 6;

    subCategory.items.forEach(renderItem);
    y += 3;
  };

  // Helper to render main section
  const renderSection = (title: string, subCategories: SubCategory[]) => {
    checkPageBreak(20);
    
    // Section title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(title.toUpperCase(), margin, y);
    y += 8;

    subCategories.forEach(renderSubCategory);

    // Separator
    doc.setDrawColor(220, 220, 220);
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;
  };

  // Get sections data
  const shops = t('sections.shops', { returnObjects: true }) as { title: string; bakeries: SubCategory; butchers: SubCategory; fresh: SubCategory; supermarkets: SubCategory };
  const restaurants = t('sections.restaurants', { returnObjects: true }) as { title: string; gedinne: SubCategory; vencimont: SubCategory; bievre: SubCategory; beauraing: SubCategory };
  const takeaway = t('sections.takeaway', { returnObjects: true }) as { title: string; fries: SubCategory; pizza: SubCategory; pitta: SubCategory; chicken: SubCategory };
  const caterers = t('sections.caterers', { returnObjects: true }) as { title: string; items: TipItem[]; bbq: SubCategory };

  // Render sections
  renderSection(shops.title, [shops.bakeries, shops.butchers, shops.fresh, shops.supermarkets]);
  renderSection(restaurants.title, [restaurants.gedinne, restaurants.vencimont, restaurants.bievre, restaurants.beauraing]);
  renderSection(takeaway.title, [takeaway.fries, takeaway.pizza, takeaway.pitta, takeaway.chicken]);

  // Caterers section (special handling for items + bbq)
  checkPageBreak(20);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text(caterers.title.toUpperCase(), margin, y);
  y += 8;

  caterers.items.forEach(renderItem);
  y += 3;
  renderSubCategory(caterers.bbq);

  // Separator
  doc.setDrawColor(220, 220, 220);
  doc.line(margin, y, pageWidth - margin, y);
  y += 10;

  // Closing
  checkPageBreak(20);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  doc.text(t('closing'), margin, y);
  y += 8;

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9);
  doc.setTextColor(120, 120, 120);
  doc.text(t('signature'), margin, y);

  // Save the PDF
  doc.save(`lokale-tips-ardennest-${language}.pdf`);
};
