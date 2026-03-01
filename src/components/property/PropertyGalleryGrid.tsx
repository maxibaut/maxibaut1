import { cn } from '@/lib/utils';

interface PropertyGalleryGridProps {
  mainImage: string;
  mainImageAlt: string;
  sideImages: Array<{
    src: string;
    alt: string;
  }>;
  allPhotosCount?: number;
  onImageClick: (src: string) => void;
  className?: string;
  sideImagesPosition?: 'left' | 'right';
}

const PropertyGalleryGrid = ({
  mainImage,
  mainImageAlt,
  sideImages,
  onImageClick,
  className,
  sideImagesPosition = 'right',
}: PropertyGalleryGridProps) => {
  const displayImages = sideImages.slice(0, 4);

  return (
    <div className={cn('flex flex-col lg:flex-row gap-3', className)}>
      {/* Side images - always first in DOM for mobile, use order classes for desktop */}
      <div className={cn(
        "flex lg:flex-col lg:w-[18%] gap-2 order-1",
        sideImagesPosition === 'left' ? 'lg:order-1' : 'lg:order-2'
      )}>
        {displayImages.map((image, index) => (
          <div
            key={index}
            className="flex-1 aspect-square lg:aspect-auto lg:min-h-0 rounded-md overflow-hidden shadow-md cursor-pointer"
            onClick={() => onImageClick(image.src)}
          >
            <img
              src={image.src}
              alt={image.alt}
              width={400}
              height={400}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Main image - use order classes for desktop positioning */}
      <div
        className={cn(
          "flex-1 aspect-[4/3] rounded-lg overflow-hidden shadow-lg cursor-pointer order-2",
          sideImagesPosition === 'left' ? 'lg:order-2' : 'lg:order-1'
        )}
        onClick={() => onImageClick(mainImage)}
      >
        <img
          src={mainImage}
          alt={mainImageAlt}
          width={800}
          height={600}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default PropertyGalleryGrid;
