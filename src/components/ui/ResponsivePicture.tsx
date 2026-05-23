import type { Picture } from 'vite-imagetools';

interface ResponsivePictureProps {
  picture: Picture;
  alt: string;
  /** sizes-attribuut per usecase. */
  sizes: string;
  /** 'eager' op LCP, 'lazy' op rest. Default 'lazy'. */
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
  className?: string;
  imgClassName?: string;
  onClick?: () => void;
}

/**
 * Renders a responsive <picture> element from a vite-imagetools Picture object.
 * Picture.sources is Record<format, srcsetString> — we forward each as-is.
 */
export function ResponsivePicture({
  picture,
  alt,
  sizes,
  loading = 'lazy',
  fetchPriority,
  className,
  imgClassName = 'w-full h-full object-cover',
  onClick,
}: ResponsivePictureProps) {
  return (
    <picture className={className} onClick={onClick}>
      {Object.entries(picture.sources).map(([type, srcset]) => (
        <source key={type} type={type} srcSet={srcset} sizes={sizes} />
      ))}
      <img
        src={picture.img.src}
        width={picture.img.w}
        height={picture.img.h}
        alt={alt}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
        className={imgClassName}
      />
    </picture>
  );
}

export default ResponsivePicture;
