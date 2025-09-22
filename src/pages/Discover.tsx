import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Heart, Play, Share, Bookmark, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LocalSpotCarousel from '@/components/LocalSpotCarousel';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const Discover = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');

  // Sample businesses for the map
  const sampleBusinesses = [
    {
      id: 1,
      name: "Inn at Bay Harbor",
      type: "Adventure Tours",
      lat: 40.7589,
      lng: -73.9851,
      rating: 4.8,
      videos: 12,
      description: "Amazing hot air balloon experiences! Can't miss!!"
    },
    {
      id: 2,
      name: "Bakehouse 46",
      type: "Bakery & Café",
      lat: 40.7614,
      lng: -73.9776,
      rating: 4.9,
      videos: 8,
      description: "Artisan breads and fresh pastries daily"
    },
    {
      id: 3,
      name: "LegaSea Aquarium & The Reptarium",
      type: "Aquarium & Zoo",
      lat: 40.7505,
      lng: -73.9934,
      rating: 4.6,
      videos: 15,
      description: "Incredible marine life and reptile experiences"
    }
  ];

  // Sample user videos/content
  const featuredContent = [
    {
      id: 1,
      businessName: "Inn at Bay Harbor",
      userName: "Sarah M.",
      userAvatar: "SM",
      thumbnail: "/inn-bay-harbor-video.mov",
      vibe: "Sky Adventure",
      views: 234,
      likes: 45,
      saved: true,
      description: "Amazing hot air balloon experiences! Can't miss!!"
    },
    {
      id: 2,
      businessName: "Bakehouse 46",
      userName: "Mike K.",
      userAvatar: "MK",
      thumbnail: "/bakehouse-46-video.gif",
      vibe: "Fresh Baked",
      views: 189,
      likes: 67,
      saved: false,
      description: "Fresh croissants and sourdough every morning!"
    },
    {
      id: 3,
      businessName: "LegaSea Aquarium & The Reptarium",
      userName: "Emma L.",
      userAvatar: "EL",
      thumbnail: "/legasea-aquarium-image.jpeg",
      vibe: "Ocean Life",
      views: 412,
      likes: 89,
      saved: true,
      description: "Incredible marine life and reptile experiences"
    }
  ];

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-73.9851, 40.7589], // NYC
      zoom: 13,
    });

    // Add markers for sample businesses
    sampleBusinesses.forEach(business => {
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.backgroundImage = 'url(/lovable-uploads/5abd728f-cdbf-4d25-8991-fc4d87776263.png)';
      el.style.width = '48px';
      el.style.height = '48px';
      el.style.backgroundSize = '100%';
      el.style.backgroundRepeat = 'no-repeat';
      el.style.cursor = 'pointer';

      new mapboxgl.Marker(el)
        .setLngLat([business.lng, business.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <div class="p-2">
                <h3 class="font-semibold text-foreground">${business.name}</h3>
                <p class="text-sm text-muted-foreground">${business.type}</p>
                <p class="text-xs text-muted-foreground mt-1">${business.description}</p>
                <div class="flex items-center mt-2 text-xs">
                  <span class="text-primary">⭐ ${business.rating}</span>
                  <span class="ml-2 text-muted-foreground">${business.videos} videos</span>
                </div>
              </div>
            `)
        )
        .addTo(map.current);
    });

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-background py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Discover places that feel like home
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get inspired at home and when you travel. Experience wherever you are like a local. Find authentic spots 
              through real stories from neighbors who know best.
            </p>
          </div>
        </div>
      </section>

      {/* Local Spots Carousel */}
      <section className="py-8 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <LocalSpotCarousel />
        </div>
      </section>

      {/* How it Works */}
      <section className="py-12 bg-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Your pocket guide to authentic experiences
            </h2>
            <p className="text-muted-foreground">
              Whether you're at home or traveling, discover places that locals actually love
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Get Inspired at Home
              </h3>
              <p className="text-muted-foreground text-sm">
                Browse videos from your neighborhood and discover hidden gems you never knew existed
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Travel Like a Local
              </h3>
              <p className="text-muted-foreground text-sm">
                Find authentic spots in any city through real stories from people who live there
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Bookmark className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Save & Share Easily
              </h3>
              <p className="text-muted-foreground text-sm">
                Bookmark places for later and share your own discoveries with friends and community
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Content */}
      <section className="py-12 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Stories from your community
            </h2>
            <p className="text-muted-foreground">
              Real experiences shared by locals who know these places best
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredContent.map((content) => (
              <Card key={content.id} className="bg-card border border-border hover:shadow-lg transition-shadow">
                <div className="relative">
                  {content.thumbnail.endsWith('.gif') || content.thumbnail.endsWith('.mov') ? (
                    content.thumbnail.endsWith('.mov') ? (
                      <video 
                        src={content.thumbnail} 
                        className="aspect-video rounded-t-lg w-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                    ) : (
                      <img 
                        src={content.thumbnail} 
                        alt={`${content.businessName} video`}
                        className="aspect-video rounded-t-lg w-full object-cover"
                      />
                    )
                  ) : (
                    <div className="bg-muted aspect-video rounded-t-lg flex items-center justify-center">
                      <Play className="w-12 h-12 text-primary" />
                    </div>
                  )}
                  <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                    {content.vibe}
                  </Badge>
                  <button className="absolute top-3 right-3 p-2 bg-background/80 rounded-full">
                    {content.saved ? (
                      <Bookmark className="w-4 h-4 text-primary fill-current" />
                    ) : (
                      <Bookmark className="w-4 h-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-foreground text-sm">
                        {content.businessName}
                      </h3>
                      <div className="flex items-center mt-1">
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs text-primary-foreground font-semibold mr-2">
                          {content.userAvatar}
                        </div>
                        <span className="text-xs text-muted-foreground">{content.userName}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {content.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center">
                        <Heart className="w-3 h-3 mr-1" />
                        {content.likes}
                      </span>
                      <span>{content.views} views</span>
                    </div>
                    <Button size="sm" variant="ghost" className="h-6 px-2 text-xs">
                      <Share className="w-3 h-3 mr-1" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-8 bg-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              What's happening near you
            </h2>
            <p className="text-muted-foreground">
              Explore local spots and see what your neighbors are sharing
            </p>
          </div>
          
          <div className="relative h-96 rounded-lg overflow-hidden border border-border bg-card">
            <img 
              src="/lovable-uploads/6ba0bf60-e843-436e-9085-6c04c3219a57.png" 
              alt="Map showing local businesses" 
              className="w-full h-full object-cover"
            />
            
            {/* Map Points */}
            <div className="absolute top-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative group cursor-pointer">
                <div className="w-12 h-12 flex items-center justify-center">
                  <img src="/lovable-uploads/5abd728f-cdbf-4d25-8991-fc4d87776263.png" alt="Location pin" className="w-12 h-12" />
                </div>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-background border border-border rounded-lg p-3 shadow-lg whitespace-nowrap">
                    <p className="font-semibold text-foreground text-sm">Inn at Bay Harbor</p>
                    <p className="text-xs text-muted-foreground">Sarah's sky adventure pick</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute top-1/2 right-1/4 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative group cursor-pointer">
                <div className="w-12 h-12 flex items-center justify-center">
                  <img src="/lovable-uploads/5abd728f-cdbf-4d25-8991-fc4d87776263.png" alt="Location pin" className="w-12 h-12" />
                </div>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-background border border-border rounded-lg p-3 shadow-lg whitespace-nowrap">
                    <p className="font-semibold text-foreground text-sm">Bakehouse 46</p>
                    <p className="text-xs text-muted-foreground">Mike's fresh baked favorite</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative group cursor-pointer">
                <div className="w-12 h-12 flex items-center justify-center">
                  <img src="/lovable-uploads/5abd728f-cdbf-4d25-8991-fc4d87776263.png" alt="Location pin" className="w-12 h-12" />
                </div>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-background border border-border rounded-lg p-3 shadow-lg whitespace-nowrap">
                    <p className="font-semibold text-foreground text-sm">LegaSea Aquarium & The Reptarium</p>
                    <p className="text-xs text-muted-foreground">Emma's ocean life pick</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Ready to explore your city differently?
          </h2>
          <p className="text-muted-foreground mb-6">
            Join neighbors who are sharing the places they love and discovering new favorites every day.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Start Discovering
            </Button>
            <Button size="lg" variant="outline">
              Share Your Favorite Spot
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Discover;