import React, { useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import type { CarouselApi } from '@/components/ui/carousel';

const spotImages = [
  '/lovable-uploads/76b34224-8a12-4901-9839-77f20c8654fe.png',
  '/lovable-uploads/d7e2886b-5a3b-411b-bc33-b05a1a3f003f.png',
  '/lovable-uploads/70503f81-ceee-48c9-b424-93801ce69203.png',
  '/lovable-uploads/78e6639f-9c3a-41e9-b14a-4e3c34c9764d.png',
  '/lovable-uploads/4ad4aea1-5565-47ac-ac71-59db280ddac4.png'
];

const LocalSpotCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) {
      return;
    }

    // Auto-play functionality
    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [api]);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {spotImages.map((image, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <img 
                    src={image} 
                    alt={`Local coffee spot ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default LocalSpotCarousel;