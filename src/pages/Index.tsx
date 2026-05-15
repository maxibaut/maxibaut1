import { PageWrapper } from '@/components/layout';
import {
  HeroSection,
  WhyChoose,
  DifferentiatorsPreview,
  AudienceSection,
  WhyBookDirect,
  StoryAndExclusive,
} from '@/components/home';
import { LocationMap } from '@/components/LocationMap';
import { ReviewsSection } from '@/components/ReviewsSection';
import { useSEO } from '@/hooks/useSEO';
import FAQJsonLd from '@/components/FAQJsonLd';

const Index = () => {
  useSEO();
  
  return (
    <PageWrapper>
      <FAQJsonLd />
      <HeroSection />
      <WhyChoose />
      <DifferentiatorsPreview />
      <ReviewsSection />
      <AudienceSection />
      <StoryAndExclusive />
      <WhyBookDirect />
      <LocationMap />
    </PageWrapper>
  );
};

export default Index;
