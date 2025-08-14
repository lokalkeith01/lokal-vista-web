import React, { useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import type { CarouselApi } from '@/components/ui/carousel';

const heroImages = [
  '/lovable-uploads/02ecc544-ab7e-4d1e-af06-c69a13514b9d.png',
  '/lovable-uploads/dcd711d6-976c-4fe1-b58e-7d1eec1d04c4.png',
  '/lovable-uploads/1ae285d1-f0e3-419a-9e88-2df2c15ea465.png',
  '/lovable-uploads/1b6587e2-c257-44b8-a922-506def5cea68.png',
  '/lovable-uploads/f4a1065b-5198-43ec-a8d5-c5abb0d41d30.png'
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
                  className="w-full h-full object-cover transition-opacity duration-1000"
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