import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Property, College } from '../../types';
import { formatDistance } from '../../utils/distance';

interface PropertyMapProps {
  college?: College | null;
  properties: Property[];
  selectedProperty?: Property | null;
  onSelectProperty?: (property: Property) => void;
  height?: string;
  zoomLevel?: number;
}

export const PropertyMap: React.FC<PropertyMapProps> = ({
  college,
  properties,
  selectedProperty,
  onSelectProperty,
  height = '450px',
  zoomLevel = 14,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Center map around college or selected property or first property
    let initialLat = 14.4426; // Nellore default
    let initialLng = 79.9865;

    if (selectedProperty && selectedProperty.latitude && selectedProperty.longitude) {
      initialLat = selectedProperty.latitude;
      initialLng = selectedProperty.longitude;
    } else if (college && college.latitude && college.longitude) {
      initialLat = college.latitude;
      initialLng = college.longitude;
    } else if (properties.length > 0 && properties[0].latitude && properties[0].longitude) {
      initialLat = properties[0].latitude;
      initialLng = properties[0].longitude;
    }

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [initialLat, initialLng],
        zoom: zoomLevel,
        zoomControl: true,
        scrollWheelZoom: false,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      const markersLayer = L.layerGroup().addTo(map);
      markersLayerRef.current = markersLayer;
      mapInstanceRef.current = map;
    } else {
      mapInstanceRef.current.setView([initialLat, initialLng], zoomLevel);
    }

    return () => {
      // Cleanup on unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update markers whenever college or properties change
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;
    if (!map || !markersLayer) return;

    markersLayer.clearLayers();
    const bounds: [number, number][] = [];

    // College Icon (Academic graduation cap marker)
    if (college && college.latitude && college.longitude) {
      const collegeIcon = L.divIcon({
        className: 'custom-college-marker',
        html: `
          <div style="background-color: #1a60e8; color: white; border: 2px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.3); border-radius: 9999px; width: 38px; height: 38px; display: flex; align-items: center; justify-content: center;">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
          </div>
        `,
        iconSize: [38, 38],
        iconAnchor: [19, 19],
      });

      const collegeMarker = L.marker([college.latitude, college.longitude], {
        icon: collegeIcon,
      }).addTo(markersLayer);

      collegeMarker.bindPopup(`
        <div style="font-family: inherit; font-size: 13px; line-height: 1.4; padding: 4px;">
          <div style="font-size: 11px; text-transform: uppercase; font-weight: 700; color: #1a60e8; letter-spacing: 0.5px;">Campus Location</div>
          <strong style="font-size: 14px; color: #0f172a; display: block; margin: 2px 0;">${college.name}</strong>
          <span style="color: #64748b;">${college.area}, ${college.city}</span>
        </div>
      `);

      bounds.push([college.latitude, college.longitude]);
    }

    // Property Markers
    properties.forEach((prop) => {
      if (!prop.latitude || !prop.longitude) return;

      const isSelected = selectedProperty?.id === prop.id;
      const markerColor = isSelected ? '#10b981' : '#1e293b';

      const propIcon = L.divIcon({
        className: 'custom-prop-marker',
        html: `
          <div style="background-color: ${markerColor}; color: white; border: 2px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.25); border-radius: 9999px; padding: 4px 8px; font-weight: 700; font-size: 12px; display: flex; align-items: center; gap: 4px; white-space: nowrap; transform: translate(-50%, -50%); cursor: pointer;">
            <span>₹${(prop.monthly_rent / 1000).toFixed(prop.monthly_rent % 1000 === 0 ? 0 : 1)}k</span>
          </div>
        `,
        iconSize: [50, 26],
        iconAnchor: [0, 0],
      });

      const marker = L.marker([prop.latitude, prop.longitude], {
        icon: propIcon,
      }).addTo(markersLayer);

      const distanceText = formatDistance(prop.distance_km);

      const popupHtml = `
        <div style="font-family: inherit; min-width: 200px; padding: 4px;">
          <img src="${prop.images[0]}" alt="${prop.name}" style="width: 100%; height: 90px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;" />
          <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: #1a60e8;">${prop.property_type} • ${prop.gender_category}</div>
          <div style="font-size: 14px; font-weight: 700; color: #0f172a; margin: 2px 0;">${prop.name}</div>
          <div style="font-size: 12px; color: #64748b; margin-bottom: 6px;">${distanceText} ${college ? `from ${college.name.slice(0, 18)}...` : ''}</div>
          <div style="font-size: 14px; font-weight: 800; color: #1a60e8; margin-bottom: 8px;">₹${prop.monthly_rent.toLocaleString('en-IN')}<span style="font-size: 11px; font-weight: 500; color: #64748b;">/month</span></div>
          <button id="view-prop-btn-${prop.id}" style="width: 100%; background-color: #1a60e8; color: white; border: none; border-radius: 6px; padding: 6px 12px; font-weight: 600; font-size: 12px; cursor: pointer;">
            View Details
          </button>
        </div>
      `;

      marker.bindPopup(popupHtml);

      marker.on('popupopen', () => {
        const btn = document.getElementById(`view-prop-btn-${prop.id}`);
        if (btn && onSelectProperty) {
          btn.onclick = () => onSelectProperty(prop);
        }
      });

      bounds.push([prop.latitude, prop.longitude]);
    });

    if (bounds.length > 1 && !selectedProperty) {
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 16 });
    } else if (selectedProperty && selectedProperty.latitude && selectedProperty.longitude) {
      map.setView([selectedProperty.latitude, selectedProperty.longitude], 15);
    }
  }, [college, properties, selectedProperty]);

  return (
    <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-soft bg-white">
      {/* Map container */}
      <div ref={mapContainerRef} style={{ height, width: '100%' }} className="z-10" />

      {/* Floating Info / API Key Badge */}
      <div className="absolute top-3 right-3 z-[1000] bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-sm border border-slate-200 text-xs flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span className="font-semibold text-slate-700">OpenStreetMap Active</span>
        <span className="text-slate-400">|</span>
        <span className="text-slate-500" title="Optional: Set VITE_GOOGLE_MAPS_API_KEY in .env if Google Maps is preferred">
          API: Zero Config
        </span>
      </div>
    </div>
  );
};
