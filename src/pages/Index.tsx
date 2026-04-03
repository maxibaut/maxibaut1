import { PageWrapper } from '@/components/layout';
import {
  HeroSection,
  TrustSignals,
  DifferentiatorsPreview,
  AudienceSection,
  WhyBookDirect,
} from '@/components/home';
import { useSEO } from '@/hooks/useSEO';

const Index = () => {
  useSEO();
  
  return (
    <PageWrapper>
      <HeroSection />
      <TrustSignals />
      <DifferentiatorsPreview />
      <AudienceSection />
      <WhyBookDirect />
    </PageWrapper>
  );
};

export default Index;
