import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

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
  allPhotosCount,
  onImageClick,
  className,
}: PropertyGalleryGridProps) => {
  const { t } = useTranslation('property');
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

      {/* Subtle "View all photos" text */}
      <button
        onClick={() => onImageClick(mainImage)}
        className="absolute bottom-3 right-3 text-xs text-cream/80 bg-charcoal/50 px-3 py-1.5 rounded-md backdrop-blur-sm"
      >
        {t('gallery.viewAll', { count: allPhotosCount })}
      </button>
    </div>
  );
};

export default PropertyGalleryGrid;
