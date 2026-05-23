import { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Picture } from 'vite-imagetools';
import { ResponsivePicture } from '@/components/ui/ResponsivePicture';
import { isPicture, type ImageSrc } from './PropertyGalleryGrid';

export interface LightboxImage {
  src: ImageSrc;
  alt: string;
}

interface PropertyLightboxProps {
  images: LightboxImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const PropertyLightbox = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: PropertyLightboxProps) => {
  const handlePrevious = useCallback(() => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    onNavigate(newIndex);
  }, [currentIndex, images.length, onNavigate]);

  const handleNext = useCallback(() => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    onNavigate(newIndex);
  }, [currentIndex, images.length, onNavigate]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          handlePrevious();
          break;
        case 'ArrowRight':
          handleNext();
          break;
      }
    },
    [isOpen, onClose, handlePrevious, handleNext]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const currentImage = images[currentIndex];

  return (
    <div
      className="fixed inset-0 z-50 bg-charcoal/95 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 text-cream/80 hover:text-cream transition-colors"
        aria-label="Sluiten"
      >
        <X className="h-8 w-8" />
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-4 text-cream/60 text-sm font-medium">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Previous button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handlePrevious();
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-cream/80 hover:text-cream transition-colors"
        aria-label="Vorige foto"
      >
        <ChevronLeft className="h-10 w-10" />
      </button>

      {/* Image */}
      <div
        className="max-w-[90vw] max-h-[85vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {isPicture(currentImage.src) ? (
          <ResponsivePicture
            picture={currentImage.src}
            alt={currentImage.alt}
            sizes="100vw"
            loading="eager"
            fetchPriority="high"
            className="max-w-full max-h-[85vh] flex items-center"
            imgClassName="max-w-full max-h-[85vh] w-auto h-auto object-contain"
          />
        ) : (
          <img
            src={currentImage.src}
            alt={currentImage.alt}
            loading="eager"
            decoding="async"
            className="max-w-full max-h-[85vh] object-contain"
          />
        )}
      </div>

      {/* Next button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-cream/80 hover:text-cream transition-colors"
        aria-label="Volgende foto"
      >
        <ChevronRight className="h-10 w-10" />
      </button>

      {/* Alt text caption */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-cream/60 text-sm text-center max-w-md px-4">
        {currentImage.alt}
      </div>
    </div>
  );
};

export default PropertyLightbox;
