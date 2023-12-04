import React, { useRef, useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapaDeCamiones = ({ camiones, centroMapa, camionSeleccionado }) => {
  const mapRef = useRef();
  const markerRefs = useRef(new Map());

  // Este efecto actualiza el centro del mapa cuando cambia centroMapa
  useEffect(() => {
    if (camionSeleccionado && markerRefs.current.has(camionSeleccionado)) {
      markerRefs.current.get(camionSeleccionado).openPopup();
    }
  }, [camionSeleccionado, markerRefs]);


  return (
    <MapContainer
      center={centroMapa || [-37.46973, -72.35366]}
      zoom={11}
      style={{ height: "100vh", width: "100%" }}
      ref={mapRef}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
      />
      {camiones.map((camion, index) => (
        <Marker
          key={camion.patente}
          position={[camion.latitud, camion.longitud]}
        
          ref={(ref) => {
            if (ref) {
              markerRefs.current.set(camion.patente, ref);
            }
          }}
          // Aquí puedes configurar el ícono y otras opciones del marcador
        >
          <Popup>
            {camion.patente} <br />    
  
  
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapaDeCamiones;
