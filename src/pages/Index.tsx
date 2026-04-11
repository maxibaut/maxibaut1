import { PageWrapper } from '@/components/layout';
import {
  HeroSection,
  TrustSignals,
  DifferentiatorsPreview,
  AudienceSection,
  WhyBookDirect,
} from '@/components/home';
import { useSEO } from '@/hooks/useSEO';
import FAQJsonLd from '@/components/FAQJsonLd';

const Index = () => {
  useSEO();
  
  return (
    <PageWrapper>
      <FAQJsonLd />
      <HeroSection />
      <TrustSignals />
      <DifferentiatorsPreview />
      <AudienceSection />
      <WhyBookDirect />
    </PageWrapper>
  );
};

export default Index;
