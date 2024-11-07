import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const RaceFinderComponent = ({ races }) => {
  const [center, setCenter] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          setCenter({ lat: 39.2241, lng: -120.2176 });
        }
      );
    } else {
      setCenter({ lat: 39.2241, lng: -120.2176 });
    }

    // Cleanup function to remove the map container on unmount
    return () => {
      const mapContainer = document.querySelector('.leaflet-container');
      if (mapContainer) {
        mapContainer._leaflet_id = null; // Clear the map instance
      }
    };
  }, []);

  if (!center) {
    return <p>Loading map...</p>;
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <div className='container' style={{ height: '600px' }}>
            <MapContainer center={center} zoom={9} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              />
              {races.map((race) => (
                <Marker key={race.id} position={[race.location.lat, race.location.lng]}>
                  <Popup>
                    <div className="w-48">
                      <h3 className="text-lg font-semibold mt-2">{race.name}</h3>
                      <p className="text-sm">{race.date}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RaceFinderComponent;
