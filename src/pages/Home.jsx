import React, { useState } from 'react';
import MapaDeCamiones from '../pages/home/MapaDeCamiones';
import ListaCamiones from '../pages/home/ListaCamiones';

const Home = ({camiones, notActiva, notTemp}) => {
  
  const [centroMapa, setCentroMapa] = useState(null);
  const [camionSeleccionado, setCamionSeleccionado] = useState(null);

  const handleCamionClick = (camion) => {
    setCentroMapa([camion.latitud, camion.longitud]);
    setCamionSeleccionado(camion.patente); // Guarda la patente del camión seleccionado
  };


  return (
    <div className="flex flex-row">
      <div className="w-5/12">
        <ListaCamiones camiones={camiones} onCamionClick={handleCamionClick} notActiva={notActiva} notTemp= {notTemp} />
      </div>
     {Object.keys(notActiva).length > 0 && 
     <div className="w-6/12">
        <MapaDeCamiones
          camiones={camiones}
          centroMapa={centroMapa}
          camionSeleccionado={camionSeleccionado}
        />
      </div> } 
      
    </div>
  );
};

export default Home;