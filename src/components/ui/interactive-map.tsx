import React from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icons
const createCustomIcon = (color = 'blue', size = 'medium') => {
  const sizes: Record<string, [number, number]> = {
    small: [20, 32],
    medium: [25, 41],
    large: [30, 50]
  };
  
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: sizes[size],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

export const AdvancedMap = ({
  center = [13.1118, 77.5898], // BMSIT Coordinates
  zoom = 15,
  markers = [],
  className = '',
  style = { height: '400px', width: '100%', borderRadius: '1rem' }
}: any) => {
  return (
    <div className={`advanced-map ${className} relative z-0`} style={style}>
      <style>{`
        .leaflet-layer {
          filter: invert(100%) hue-rotate(180deg) brightness(95%) contrast(105%);
        }
      `}</style>
      <MapContainer
        center={center as [number, number]}
        zoom={zoom}
        style={{ height: '100%', width: '100%', borderRadius: '1rem', overflow: 'hidden' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {markers.map((marker: any, index: number) => (
          <Marker
            key={marker.id || index}
            position={marker.position}
            icon={marker.icon || createCustomIcon(marker.color, marker.size)}
            eventHandlers={{
              click: () => {
                if (marker.url) {
                  window.open(marker.url, '_blank');
                }
              }
            }}
          >
            {marker.popup && (
              <Popup>
                <div 
                  className="cursor-pointer"
                  onClick={() => {
                    if (marker.url) window.open(marker.url, '_blank');
                  }}
                >
                  <h3 className="font-bold text-gray-900 hover:text-teal-600 transition-colors">{marker.popup.title}</h3>
                  <p className="text-gray-700">{marker.popup.content}</p>
                </div>
              </Popup>
            )}
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
