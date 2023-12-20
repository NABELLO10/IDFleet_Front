import React, { useState } from 'react';
import MapaDeCamiones from '../pages/home/MapaDeCamiones';
import ListaCamiones from '../pages/home/ListaCamiones';
import DashboardUnidades from './procesos/TabletoComponents/DashboardUnidades';
import DashboardUnidadesTablet from './procesos/TabletoComponents/DashboardUnidadesTablet';
import ListadoUnidades from './procesos/TabletoComponents/ListadoUnidades';

const Home = ({camiones, notActiva, notTemp, ventana}) => {
      
  const [info, setInfo] = useState({}); // info = itemes[index

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDiv = (item) => {
    setInfo(item);
  }
     

  const handleClose = () => {
    setOpen(false);
  };
 
  const [openAlerta, setOpenAlerta] = useState(false);
  const handleClickOpenAlerta = () => {
    setOpenAlerta(true);
  };

  const handleCloseAlerta = () => {
    setOpenAlerta(false);
  };


  const [centroMapa, setCentroMapa] = useState(null);
  const [camionSeleccionado, setCamionSeleccionado] = useState({});

  const handleCamionClick = (camion) => {
    setCentroMapa([camion.latitud, camion.longitud]);
    setCamionSeleccionado(camion); // Guarda la patente del camión seleccionado
  };


  return (
    <div className="flex flex-row">
      <div className="w-5/12 pr-4">
        {ventana == "Inicio" && (
          <ListadoUnidades
            open={open}
            handleClose={handleClose}
            info={info}
            setInfo={setInfo}
            notTemp={notTemp}
            openAlerta={openAlerta}
            handleCloseAlerta={handleCloseAlerta}
            handleClickOpen={handleClickOpen}
            camiones={camiones}
            onCamionClick={handleCamionClick}
            notActiva={notActiva}
          />
        )}

        {ventana == "Tablet" && (
          <ListaCamiones
          open={open}
          handleClose={handleClose}
          info={info}
          setInfo={setInfo}
          notTemp={notTemp}
          openAlerta={openAlerta}
          handleCloseAlerta={handleCloseAlerta}
          handleClickOpen={handleClickOpen}
          camiones={camiones}
          onCamionClick={handleCamionClick}
          notActiva={notActiva}
          />
        )}
      </div>

      {/*      {Object.keys(notActiva).length > 0 &&  */}
      <div className="w-7/12">
        {ventana == "Inicio" && (
          <DashboardUnidades
            open={open}
            handleClose={handleClose}
            info={info}
            notActiva={notActiva}
            notTemp={notTemp}
            openAlerta={openAlerta}
            handleCloseAlerta={handleCloseAlerta}
            camiones={camiones}
            centroMapa={centroMapa}
            camionSeleccionado={camionSeleccionado}
            handleDiv={handleDiv}
            handleClickOpen={handleClickOpen}
            handleClickOpenAlerta={handleClickOpenAlerta}
          />
        )}

        {ventana == "Tablet" && (
          <DashboardUnidadesTablet
          open={open}
          handleClose={handleClose}
          info={info}
          notActiva={notActiva}
          notTemp={notTemp}
          openAlerta={openAlerta}
          handleCloseAlerta={handleCloseAlerta}
          camiones={camiones}
          centroMapa={centroMapa}
          camionSeleccionado={camionSeleccionado}
          handleDiv={handleDiv}
          handleClickOpen={handleClickOpen}
          handleClickOpenAlerta={handleClickOpenAlerta}
        />
        )}
      </div>
    </div>
  );
};

export default Home;