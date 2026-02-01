import { useState, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PhotoItem {
  src: string;
  alt: string;
}

interface BentoPhotoGridProps {
  photos: PhotoItem[];
  viewAllLabel?: string;
  className?: string;
}

const BentoPhotoGrid = ({ photos, viewAllLabel = 'Bekijk alle foto\'s', className }: BentoPhotoGridProps) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Show max 4 photos in grid (1 large + 3 small)
  const displayPhotos = photos.slice(0, 4);
  const hasMorePhotos = photos.length > 4;
  
  // Ensure we always have 3 side photos (duplicate if needed)
  const sidePhotos = (() => {
    const available = displayPhotos.slice(1);
    if (available.length >= 3) return available.slice(0, 3);
    if (available.length === 0) return [];
    // Fill with duplicates from available photos
    const filled = [...available];
    while (filled.length < 3) {
      filled.push(available[filled.length % available.length]);
    }
    return filled;
  })();

  const openLightbox = useCallback((index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  }, [photos.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  }, [photos.length]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
  }, [closeLightbox, goToPrevious, goToNext]);

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) closeLightbox();
  }, [closeLightbox]);

  return (
    <>
      {/* Bento Grid */}
      <div className={cn('relative', className)}>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-5 md:h-[500px]">
          {/* Main large photo - spans 3 columns on desktop, full height */}
          {displayPhotos[0] && (
            <button
              onClick={() => openLightbox(0)}
              className="md:col-span-3 aspect-[4/3] md:aspect-auto md:h-full rounded-lg overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label={`Open ${displayPhotos[0].alt} in galerij`}
            >
              <img
                src={displayPhotos[0].src}
                alt={displayPhotos[0].alt}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </button>
          )}

          {/* Right side stacked photos - spans 2 columns, 3 photos fill same height as main */}
          <div className="md:col-span-2 grid grid-cols-3 md:grid-cols-1 md:grid-rows-3 gap-4 md:gap-5 md:h-full">
            {sidePhotos.map((photo, index) => (
              <button
                key={index + 1}
                onClick={() => openLightbox(index + 1)}
                className="aspect-[4/3] md:aspect-auto md:h-full rounded-lg overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label={`Open ${photo.alt} in galerij`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* View all photos text */}
        {hasMorePhotos && (
          <button
            onClick={() => openLightbox(0)}
            className="absolute bottom-4 right-4 text-sm text-muted-foreground hover:text-foreground transition-colors bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-md"
          >
            {viewAllLabel} ({photos.length})
          </button>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Foto galerij"
          className="fixed inset-0 z-50 bg-charcoal/95 flex items-center justify-center"
          onClick={handleBackdropClick}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 p-2 text-cream/80 hover:text-cream transition-colors"
            aria-label="Sluit galerij"
          >
            <X className="h-8 w-8" />
          </button>

          {/* Navigation - Previous */}
          {photos.length > 1 && (
            <button
              onClick={goToPrevious}
              className="absolute left-4 z-10 p-2 text-cream/80 hover:text-cream transition-colors"
              aria-label="Vorige foto"
            >
              <ChevronLeft className="h-10 w-10" />
            </button>
          )}

          {/* Current photo */}
          <div className="max-w-[90vw] max-h-[85vh] flex items-center justify-center">
            <img
              src={photos[currentIndex].src}
              alt={photos[currentIndex].alt}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />
          </div>

          {/* Navigation - Next */}
          {photos.length > 1 && (
            <button
              onClick={goToNext}
              className="absolute right-4 z-10 p-2 text-cream/80 hover:text-cream transition-colors"
              aria-label="Volgende foto"
            >
              <ChevronRight className="h-10 w-10" />
            </button>
          )}

          {/* Photo counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-cream/70 text-sm">
            {currentIndex + 1} / {photos.length}
          </div>
        </div>
      )}
    </>
  );
};

export default BentoPhotoGrid;
