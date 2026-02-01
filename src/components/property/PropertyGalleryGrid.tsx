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
    <div className={cn('aspect-[4/3] relative', className)}>
      <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-4 gap-3">
        {/* Main image - takes 3 columns */}
        <div className="lg:col-span-3 h-full rounded-lg overflow-hidden shadow-lg">
          <img
            src={mainImage}
            alt={mainImageAlt}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Side column with 4 stacked images */}
        <div className="hidden lg:flex lg:col-span-1 h-full flex-col gap-2">
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
    </div>
  );
};

export default PropertyGalleryGrid;
