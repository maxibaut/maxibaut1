import { jsPDF } from 'jspdf';
import { TFunction } from 'i18next';

interface DataItem {
  purpose?: string;
  basis?: string;
  type?: string;
  right?: string;
  description: string;
  duration?: string;
}

interface Partner {
  name: string;
  description: string;
}

interface CookieItem {
  cookie: string;
  purpose: string;
  duration: string;
  type: string;
}

export const generatePrivacyPDF = (t: TFunction, language: string) => {
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

  const addSectionTitle = (title: string) => {
    checkPageBreak(15);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(title, margin, y);
    y += 7;
  };

  const addParagraph = (text: string, indent: number = 0) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);
    const lines = doc.splitTextToSize(text, contentWidth - indent);
    checkPageBreak(lines.length * 4 + 2);
    doc.text(lines, margin + indent, y);
    y += lines.length * 4 + 2;
  };

  const addBulletList = (items: string[], indent: number = 0) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);
    items.forEach((item) => {
      const lines = doc.splitTextToSize(`• ${item}`, contentWidth - indent - 5);
      checkPageBreak(lines.length * 4 + 1);
      doc.text(lines, margin + indent, y);
      y += lines.length * 4 + 1;
    });
  };

  const addKeyValueList = (items: { key: string; value: string }[]) => {
    items.forEach((item) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(40, 40, 40);
      const keyText = `${item.key}: `;
      const keyWidth = doc.getTextWidth(keyText);
      checkPageBreak(8);
      doc.text(keyText, margin, y);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(60, 60, 60);
      const valueLines = doc.splitTextToSize(item.value, contentWidth - keyWidth);
      doc.text(valueLines, margin + keyWidth, y);
      y += valueLines.length * 4 + 2;
    });
  };

  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
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
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  const subtitleLines = doc.splitTextToSize(t('pageSubtitle'), contentWidth);
  doc.text(subtitleLines, margin, y);
  y += subtitleLines.length * 5 + 5;

  // Metadata
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(8);
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
    y += 4;
  });
  y += 3;

  // Separator
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, y, pageWidth - margin, y);
  y += 6;

  // Intro
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9);
  doc.setTextColor(80, 80, 80);
  const introLines = doc.splitTextToSize(t('intro'), contentWidth);
  doc.text(introLines, margin, y);
  y += introLines.length * 4 + 6;

  // Separator
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;

  // Section 1: Who are we
  addSectionTitle(t('sections.whoAreWe.title'));
  addParagraph(t('sections.whoAreWe.content'));
  y += 2;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(0, 0, 0);
  doc.text(t('sections.whoAreWe.company'), margin, y);
  y += 4;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 60, 60);
  doc.text(t('sections.whoAreWe.address'), margin, y);
  y += 4;
  doc.text(t('sections.whoAreWe.email'), margin, y);
  y += 4;
  doc.text(t('sections.whoAreWe.phone'), margin, y);
  y += 5;
  addParagraph(t('sections.whoAreWe.responsibility'));
  y += 3;

  // Section 2: What data
  addSectionTitle(t('sections.whatData.title'));
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(40, 40, 40);
  doc.text(t('sections.whatData.contactForm.title'), margin, y);
  y += 5;
  const contactFormItems = t('sections.whatData.contactForm.items', { returnObjects: true }) as string[];
  addBulletList(contactFormItems, 3);
  y += 2;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(40, 40, 40);
  doc.text(t('sections.whatData.booking.title'), margin, y);
  y += 5;
  const bookingItems = t('sections.whatData.booking.items', { returnObjects: true }) as string[];
  addBulletList(bookingItems, 3);
  y += 2;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(40, 40, 40);
  doc.text(t('sections.whatData.automatic.title'), margin, y);
  y += 5;
  const automaticItems = t('sections.whatData.automatic.items', { returnObjects: true }) as string[];
  addBulletList(automaticItems, 3);
  y += 3;

  // Section 3: Why collect
  addSectionTitle(t('sections.whyCollect.title'));
  const whyCollectItems = t('sections.whyCollect.items', { returnObjects: true }) as DataItem[];
  addKeyValueList(whyCollectItems.map(item => ({ key: item.purpose || '', value: item.description })));
  y += 3;

  // Section 4: Legal basis
  addSectionTitle(t('sections.legalBasis.title'));
  const legalBasisItems = t('sections.legalBasis.items', { returnObjects: true }) as DataItem[];
  addKeyValueList(legalBasisItems.map(item => ({ key: item.basis || '', value: item.description })));
  y += 3;

  // Section 5: Sharing
  addSectionTitle(t('sections.sharing.title'));
  addParagraph(t('sections.sharing.intro'));
  const sharingPartners = t('sections.sharing.partners', { returnObjects: true }) as Partner[];
  addKeyValueList(sharingPartners.map(p => ({ key: p.name, value: p.description })));
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(0, 0, 0);
  checkPageBreak(8);
  doc.text(t('sections.sharing.noSelling'), margin, y);
  y += 6;

  // Section 6: Retention
  addSectionTitle(t('sections.retention.title'));
  const retentionItems = t('sections.retention.items', { returnObjects: true }) as DataItem[];
  addKeyValueList(retentionItems.map(item => ({ key: item.type || '', value: item.duration || '' })));
  y += 3;

  // Section 7: Rights
  addSectionTitle(t('sections.rights.title'));
  addParagraph(t('sections.rights.intro'));
  const rightsItems = t('sections.rights.items', { returnObjects: true }) as DataItem[];
  addKeyValueList(rightsItems.map(item => ({ key: item.right || '', value: item.description })));
  addParagraph(t('sections.rights.contact'));
  addParagraph(t('sections.rights.complaint'));
  y += 3;

  // Section 8: Cookies
  addSectionTitle(t('sections.cookies.title'));
  addParagraph(t('sections.cookies.intro'));
  y += 2;

  // Essential cookies
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(40, 40, 40);
  checkPageBreak(10);
  doc.text(t('sections.cookies.essential.title'), margin, y);
  y += 5;
  addParagraph(t('sections.cookies.essential.description'));
  
  const essentialCookies = t('sections.cookies.essential.items', { returnObjects: true }) as CookieItem[];
  essentialCookies.forEach(cookie => {
    checkPageBreak(8);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(40, 40, 40);
    doc.text(`${cookie.cookie}:`, margin + 3, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);
    doc.text(`${cookie.purpose} (${cookie.duration})`, margin + 35, y);
    y += 4;
  });
  y += 2;

  // Analytics cookies
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(40, 40, 40);
  checkPageBreak(10);
  doc.text(t('sections.cookies.analytics.title'), margin, y);
  y += 5;
  addParagraph(t('sections.cookies.analytics.description'));
  
  const analyticsCookies = t('sections.cookies.analytics.items', { returnObjects: true }) as CookieItem[];
  analyticsCookies.forEach(cookie => {
    checkPageBreak(8);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(40, 40, 40);
    doc.text(`${cookie.cookie}:`, margin + 3, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);
    doc.text(`${cookie.purpose} (${cookie.duration})`, margin + 35, y);
    y += 4;
  });
  y += 2;
  addParagraph(t('sections.cookies.analytics.note'));
  y += 2;

  // External services
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(40, 40, 40);
  checkPageBreak(10);
  doc.text(t('sections.cookies.external.title'), margin, y);
  y += 5;
  addParagraph(t('sections.cookies.external.description'));
  const externalServices = t('sections.cookies.external.items', { returnObjects: true }) as string[];
  addBulletList(externalServices, 3);
  y += 2;

  // Managing cookies
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(40, 40, 40);
  checkPageBreak(10);
  doc.text(t('sections.cookies.manage.title'), margin, y);
  y += 5;
  addParagraph(t('sections.cookies.manage.description'));
  y += 3;

  // Section 9: Security
  addSectionTitle(t('sections.security.title'));
  addParagraph(t('sections.security.intro'));
  const securityItems = t('sections.security.items', { returnObjects: true }) as string[];
  addBulletList(securityItems, 3);
  y += 3;

  // Section 10: Changes
  addSectionTitle(t('sections.changes.title'));
  addParagraph(t('sections.changes.content'));
  y += 5;

  // Contact section
  checkPageBreak(25);
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  doc.text(t('contact.title'), margin, y);
  y += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(60, 60, 60);
  doc.text(t('contact.content'), margin, y);
  y += 5;
  doc.text(`✉ ${t('contact.email')}`, margin, y);
  y += 4;
  doc.text(`📞 ${t('contact.phone')}`, margin, y);
  y += 8;

  // Signature
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.text(t('signature'), margin, y);

  // Save the PDF
  doc.save(`privacy-cookies-ardennest-${language}.pdf`);
};
