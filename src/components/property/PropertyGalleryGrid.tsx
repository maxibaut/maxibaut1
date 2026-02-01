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
}

const PropertyGalleryGrid = ({
  mainImage,
  mainImageAlt,
  sideImages,
  onImageClick,
  className,
}: PropertyGalleryGridProps) => {
  const displayImages = sideImages.slice(0, 4);

  return (
    <div className={cn('flex flex-col lg:flex-row gap-3', className)}>
      {/* Main image - keeps original 4/3 aspect ratio */}
      <div
        className="flex-1 aspect-[4/3] rounded-lg overflow-hidden shadow-lg cursor-pointer"
        onClick={() => onImageClick(mainImage)}
      >
        <img
          src={mainImage}
          alt={mainImageAlt}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Side images - row on mobile/tablet, column on desktop */}
      <div className="flex lg:flex-col lg:w-[18%] gap-2">
        {displayImages.map((image, index) => (
          <div
            key={index}
            className="flex-1 aspect-square lg:aspect-auto lg:min-h-0 rounded-md overflow-hidden shadow-md cursor-pointer"
            onClick={() => onImageClick(image.src)}
          >
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyGalleryGrid;
