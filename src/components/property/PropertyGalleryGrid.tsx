import { cn } from '@/lib/utils';

interface PropertyGalleryGridProps {
  mainImage: string;
  mainImageAlt: string;
  sideImages: Array<{
    src: string;
    alt: string;
  }>;
  allPhotosCount: number;
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
    <div className={cn('relative', className)}>
      <div className="flex gap-3">
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

        {/* Side column with 4 stacked images - matches main photo height */}
        <div className="hidden lg:flex w-[18%] flex-col gap-2">
          {displayImages.map((image, index) => (
            <div
              key={index}
              className="flex-1 min-h-0 rounded-md overflow-hidden shadow-md cursor-pointer"
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
    </div>
  );
};

export default PropertyGalleryGrid;
