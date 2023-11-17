import React, { useState } from 'react';
import MapaDeCamiones from '../pages/home/MapaDeCamiones';
import ListaCamiones from '../pages/home/ListaCamiones';

const Home = ({camiones}) => {
  
  const [centroMapa, setCentroMapa] = useState(null);
  const [camionSeleccionado, setCamionSeleccionado] = useState(null);

  const handleCamionClick = (camion) => {
    setCentroMapa([camion.latitud, camion.longitud]);
    setCamionSeleccionado(camion.patente); // Guarda la patente del camión seleccionado
  };


  return (
    <div className="container mx-auto">
    <div className="flex flex-row">
      <div className="w-5/12">
        <ListaCamiones camiones={camiones} onCamionClick={handleCamionClick} />
      </div>
      <div className="w-7/12">
        <MapaDeCamiones camiones={camiones} centroMapa={centroMapa} camionSeleccionado={camionSeleccionado} />
      </div>
    </div>
  </div>

  );
};

export default Home;