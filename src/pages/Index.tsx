import { PageWrapper } from '@/components/layout';
import {
  HeroSection,
  WhyChoose,
  DifferentiatorsPreview,
  AudienceSection,
  HomeFAQSection,
  WhyBookDirect,
  StoryAndExclusive,
} from '@/components/home';
import { LocationMap } from '@/components/LocationMap';
import { ReviewsSection } from '@/components/ReviewsSection';
import { useSEO } from '@/hooks/useSEO';

const Index = () => {
  useSEO();

  return (
    <PageWrapper>
      <HeroSection />
      <WhyChoose />
      <DifferentiatorsPreview />
      <ReviewsSection />
      <AudienceSection />
      <HomeFAQSection />
      <StoryAndExclusive />
      <WhyBookDirect />
      <LocationMap />
    </PageWrapper>
  );
};

export default Index;
