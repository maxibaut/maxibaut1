import { PageWrapper } from '@/components/layout';
import {
  HeroSection,
  TrustSignals,
  DifferentiatorsPreview,
  WhyBookDirect,
} from '@/components/home';

const Index = () => {
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
