import type { TFunction } from 'i18next';
import { generatePDF, generateChecklistPDF } from '@/lib/pdfGenerator';
import { generateCancellationPolicyPDF } from '@/lib/cancellationPolicyPdfGenerator';
import { generateRentalTermsPDF } from '@/lib/rentalTermsPdfGenerator';
import { generateEarlyArrivalPDF } from '@/lib/earlyArrivalPdfGenerator';
import { generateLocalTipsPDF } from '@/lib/localTipsPdfGenerator';

// Helper to delay between downloads to prevent browser blocking
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const downloadAllDocuments = async (
  tHouseRules: TFunction,
  tChecklist: TFunction,
  tCancellation: TFunction,
  tRentalTerms: TFunction,
  tEarlyArrival: TFunction,
  tLocalTips: TFunction,
  language: string
) => {
  // 1. House Rules PDF
  generatePDF({
    title: tHouseRules('pageTitle'),
    subtitle: tHouseRules('pageSubtitle'),
    metadata: [
      { label: tHouseRules('accommodation'), value: tHouseRules('accommodationValue') },
      { label: tHouseRules('website'), value: tHouseRules('websiteValue') },
      { label: tHouseRules('operator'), value: tHouseRules('operatorValue') },
      { label: tHouseRules('version'), value: tHouseRules('versionValue') },
    ],
    welcome: tHouseRules('welcome'),
    sections: [
      {
        title: tHouseRules('sections.arrivalDeparture.title'),
        subsections: [
          { title: tHouseRules('sections.arrivalDeparture.cleaning.title'), content: tHouseRules('sections.arrivalDeparture.cleaning.content') }
        ]
      },
      {
        title: tHouseRules('sections.house.title'),
        subsections: [
          { title: tHouseRules('sections.house.bedding.title'), content: tHouseRules('sections.house.bedding.content') },
          { title: tHouseRules('sections.house.beds.title'), content: tHouseRules('sections.house.beds.content') },
          { title: tHouseRules('sections.house.furniture.title'), content: tHouseRules('sections.house.furniture.content') },
          { title: tHouseRules('sections.house.shoes.title'), content: tHouseRules('sections.house.shoes.content') },
        ]
      },
      { title: tHouseRules('sections.foodDrink.title'), content: tHouseRules('sections.foodDrink.content') },
      { title: tHouseRules('sections.smokeFree.title'), content: tHouseRules('sections.smokeFree.content') },
      { title: tHouseRules('sections.firewood.title'), content: tHouseRules('sections.firewood.content') },
      {
        title: tHouseRules('sections.kitchen.title'),
        subsections: [
          { title: tHouseRules('sections.kitchen.frying.title'), content: tHouseRules('sections.kitchen.frying.content') }
        ]
      },
      {
        title: tHouseRules('sections.garden.title'),
        subsections: [
          { title: tHouseRules('sections.garden.playground.title'), content: tHouseRules('sections.garden.playground.content') },
          { title: tHouseRules('sections.garden.toys.title'), content: tHouseRules('sections.garden.toys.content') },
          { title: tHouseRules('sections.garden.fire.title'), content: tHouseRules('sections.garden.fire.content') },
          { title: tHouseRules('sections.garden.trampoline.title'), content: tHouseRules('sections.garden.trampoline.content') },
        ]
      },
      {
        title: tHouseRules('sections.quietHours.title'),
        subsections: [
          { title: tHouseRules('sections.quietHours.outdoorMusic.title'), content: tHouseRules('sections.quietHours.outdoorMusic.content') },
          { title: `${tHouseRules('sections.quietHours.quietTime.title')}: ${tHouseRules('sections.quietHours.quietTime.subtitle')}`, content: tHouseRules('sections.quietHours.quietTime.content') },
        ]
      },
      { title: tHouseRules('sections.pets.title'), content: tHouseRules('sections.pets.content') },
      { title: tHouseRules('sections.damage.title'), content: tHouseRules('sections.damage.content') },
      { title: tHouseRules('sections.access.title'), content: tHouseRules('sections.access.content') },
      { title: tHouseRules('sections.emergencyStairs.title'), content: tHouseRules('sections.emergencyStairs.content') },
      { title: tHouseRules('sections.groupSize.title'), content: tHouseRules('sections.groupSize.content') },
      { title: tHouseRules('sections.liability.title'), content: tHouseRules('sections.liability.content') },
      {
        title: tHouseRules('sections.closing.title'),
        content: `${tHouseRules('sections.closing.content1')}\n\n${tHouseRules('sections.closing.content2')}`
      },
    ],
    emergency: [
      { label: tHouseRules('sections.emergency.emergencyNumber'), value: tHouseRules('sections.emergency.emergencyNumberValue') },
      { label: tHouseRules('sections.emergency.ownerContact'), value: tHouseRules('sections.emergency.ownerContactValue') },
    ],
    footer: tHouseRules('sections.closing.signature'),
  }, `huisregels-ardennest-${language}.pdf`);

  await delay(400);

  // 2. Early Arrival PDF
  generateEarlyArrivalPDF(tEarlyArrival, language);

  await delay(400);

  // 3. Checklist PDF
  generateChecklistPDF({
    title: tChecklist('pageTitle'),
    subtitle: tChecklist('pageSubtitle'),
    intro: tChecklist('intro'),
    sections: [
      {
        title: tChecklist('sections.general.title'),
        subtitle: tChecklist('sections.general.departureTime'),
        items: tChecklist('sections.general.items', { returnObjects: true }) as string[],
      },
      {
        title: tChecklist('sections.house.title'),
        items: tChecklist('sections.house.items', { returnObjects: true }) as string[],
      },
      {
        title: tChecklist('sections.kitchen.title'),
        items: tChecklist('sections.kitchen.items', { returnObjects: true }) as string[],
        tip: tChecklist('sections.kitchen.tip'),
      },
      {
        title: tChecklist('sections.outside.title'),
        items: tChecklist('sections.outside.items', { returnObjects: true }) as string[],
      },
      {
        title: tChecklist('sections.bedrooms.title'),
        items: tChecklist('sections.bedrooms.items', { returnObjects: true }) as string[],
      },
    ],
    damage: {
      title: tChecklist('sections.damage.title'),
      content: tChecklist('sections.damage.content'),
      depositInfo: tChecklist('sections.damage.depositInfo'),
    },
    contact: {
      title: tChecklist('contact.title'),
      phone1: tChecklist('contact.phone1'),
      phone2: tChecklist('contact.phone2'),
    },
    closing: {
      content: tChecklist('closing.content'),
      signature: tChecklist('closing.signature'),
    },
  }, `checklist-vertrek-${language}.pdf`);

  await delay(400);

  // 4. Rental Terms PDF
  generateRentalTermsPDF(tRentalTerms, language);

  await delay(400);

  // 5. Cancellation Policy PDF
  generateCancellationPolicyPDF(tCancellation, language);

  await delay(400);

  // 6. Local Tips (Shops) PDF
  generateLocalTipsPDF(tLocalTips, language);
};
