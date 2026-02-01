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

  const sideImagesElement = (
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
  );

  const mainImageElement = (
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
  );

  return (
    <div className={cn('flex flex-col lg:flex-row gap-3', className)}>
      {sideImagesPosition === 'left' ? (
        <>
          {sideImagesElement}
          {mainImageElement}
        </>
      ) : (
        <>
          {mainImageElement}
          {sideImagesElement}
        </>
      )}
    </div>
  );
};

export default PropertyGalleryGrid;
