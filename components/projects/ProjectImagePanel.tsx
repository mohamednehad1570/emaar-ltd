'use client';

import Image from 'next/image';
import { cn } from '@/lib/cn';

interface Props {
  images: string[];
  selectedImage: string;
  onSelect: (src: string) => void;
  alt: string;
}

export default function ProjectImagePanel({ images, selectedImage, onSelect, alt }: Props) {
  return (
    <div className="md:sticky md:top-28">
      {/* Main image */}
      <div
        className="relative aspect-[4/3] w-full overflow-hidden rounded-sm"
        style={{ boxShadow: '0 4px 12px rgba(45,41,38,0.08), 0 2px 4px rgba(45,41,38,0.04)' }}
      >
        {selectedImage && (
          <Image
            src={selectedImage}
            alt={alt}
            fill
            sizes="(min-width: 768px) 55vw, 100vw"
            priority
            className="object-cover"
          />
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
          {images.map((src, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onSelect(src)}
              className={cn(
                'relative w-20 h-16 flex-shrink-0 overflow-hidden rounded-sm border-2 transition-colors duration-200',
                selectedImage === src
                  ? 'border-brand-dark'
                  : 'border-transparent hover:border-silver-material'
              )}
            >
              <Image
                src={src}
                alt={`${alt} — ${idx + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
