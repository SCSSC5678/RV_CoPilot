import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// Initialize Mapbox
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

interface RVMapProps {
  center?: [number, number];
  zoom?: number;
  rvSpecs?: {
    height: number;
    weight: number;
    length: number;
  };
}

export function RVMap({ 
  center = [-98.5795, 39.8283], // Center of USA
  zoom = 4,
  rvSpecs
}: RVMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: center,
      zoom: zoom,
    });

    map.current.on('load', () => {
      setMapLoaded(true);
      
      // Add RV-specific layers (e.g., low clearance bridges, weight restrictions)
      if (map.current && rvSpecs) {
        // Add custom layers for RV routing here
        map.current.addLayer({
          id: 'rv-restrictions',
          type: 'symbol',
          source: {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: []
            }
          },
          layout: {
            'icon-image': 'warning',
            'icon-size': 1.5
          }
        });
      }
    });

    return () => {
      map.current?.remove();
    };
  }, [center, zoom, rvSpecs]);

  // Add RV-specific controls
  const addWaypoint = () => {
    if (!map.current || !mapLoaded) return;
    
    // Add waypoint logic here
  };

  const calculateRoute = () => {
    if (!map.current || !mapLoaded) return;
    
    // RV-specific routing logic here
  };

  return (
    <Card className="w-full h-[600px] relative">
      <div ref={mapContainer} className="w-full h-full" />
      <div className="absolute top-4 right-4 space-y-2">
        <Button onClick={addWaypoint}>Add Stop</Button>
        <Button onClick={calculateRoute}>Calculate Route</Button>
      </div>
    </Card>
  );
}