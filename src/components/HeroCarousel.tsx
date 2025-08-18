import React, { useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import type { CarouselApi } from '@/components/ui/carousel';

const heroImages = [
  '/lovable-uploads/bc81065e-751e-4110-a4d4-f3040d56684c.png',
  '/lovable-uploads/dcd711d6-976c-4fe1-b58e-7d1eec1d04c4.png',
  '/lovable-uploads/ccd77544-eead-4378-8a69-7f9e99f19ed4.png',
  '/lovable-uploads/1b6587e2-c257-44b8-a922-506def5cea68.png',
  '/lovable-uploads/f4a1065b-5198-43ec-a8d5-c5abb0d41d30.png',
  '/lovable-uploads/35c240c1-f531-444d-9fe4-83b28dfd451b.png',
  '/lovable-uploads/9da8703e-c203-475b-8f09-8c711c68b405.png'
];

const HeroCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) {
      return;
    }

    // Auto-play functionality
    const interval = setInterval(() => {
      api.scrollNext();
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [api]);

  return (
    <div className="absolute inset-0">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full h-full"
      >
        <CarouselContent className="h-full">
          {heroImages.map((image, index) => (
            <CarouselItem key={index} className="h-full">
              <div className="relative w-full h-full">
                <img 
                  src={image} 
                  alt={`Local business atmosphere ${index + 1}`}
                  className="w-full h-full object-cover object-center transition-opacity duration-1000"
                />
                <div className="absolute inset-0 bg-black/40"></div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default HeroCarousel;