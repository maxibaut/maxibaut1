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
    <div className={cn('grid grid-cols-1 lg:grid-cols-4 gap-3', className)}>
      {/* Main image - takes 3 columns */}
      <div className="lg:col-span-3 aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
        <img
          src={mainImage}
          alt={mainImageAlt}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Side column with 4 stacked images */}
      <div className="hidden lg:flex lg:col-span-1 flex-col gap-2">
        {displayImages.map((image, index) => (
          <div
            key={index}
            className="flex-1 rounded-md overflow-hidden shadow-md"
            style={{ minHeight: 0 }}
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
