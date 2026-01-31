import { PageWrapper } from '@/components/layout';
import {
  HeroSection,
  TrustSignals,
  DifferentiatorsPreview,
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
      <WhyBookDirect />
    </PageWrapper>
  );
};

export default Index;
