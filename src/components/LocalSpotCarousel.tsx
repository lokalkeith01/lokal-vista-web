import React, { useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import type { CarouselApi } from '@/components/ui/carousel';

const spotImages = [
  '/lovable-uploads/12922951-ccde-43c9-b99f-e0ea4d47c803.png',
  '/lovable-uploads/7137be38-5f71-4b39-813b-d24521cdafb2.png',
  '/lovable-uploads/2fdb2431-48b6-4e83-827c-22dc4ca42336.png',
  '/lovable-uploads/adf4a4bd-714e-45de-9028-43dbf504f3e2.png',
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