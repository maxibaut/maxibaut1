import { PageWrapper } from '@/components/layout';
import {
  HeroSection,
  TrustSignals,
  DifferentiatorsPreview,
  AudienceSection,
  WhyBookDirect,
  StoryAndExclusive,
} from '@/components/home';
import { LocationMap } from '@/components/LocationMap';
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
      <StoryAndExclusive />
      <WhyBookDirect />
    </PageWrapper>
  );
};

export default Index;
