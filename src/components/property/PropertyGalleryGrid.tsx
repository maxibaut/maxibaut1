import { cn } from '@/lib/utils';

interface PropertyGalleryGridProps {
  mainImage: string;
  mainImageAlt: string;
  sideImages: Array<{
    src: string;
    alt: string;
  }>;
  className?: string;
}

const PropertyGalleryGrid = ({
  mainImage,
  mainImageAlt,
  sideImages,
  className,
}: PropertyGalleryGridProps) => {
  // Take only 4 side images
  const displayImages = sideImages.slice(0, 4);

  return (
    <div className={cn('flex gap-3', className)}>
      {/* Main image - keeps original 4/3 aspect ratio */}
      <div className="flex-1 aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
        <img
          src={mainImage}
          alt={mainImageAlt}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Side column with 4 stacked images - matches main photo height */}
      <div className="hidden lg:flex w-[18%] flex-col gap-2">
        {displayImages.map((image, index) => (
          <div
            key={index}
            className="flex-1 min-h-0 rounded-md overflow-hidden shadow-md"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyGalleryGrid;
