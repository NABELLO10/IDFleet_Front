import React, { useState } from 'react';
import MapaDeCamiones from '../pages/home/MapaDeCamiones';
import ListaCamiones from '../pages/home/ListaCamiones';
import DashboardUnidades from './procesos/TabletoComponents/DashboardUnidades';
import DashboardUnidadesTablet from './procesos/TabletoComponents/DashboardUnidadesTablet';
import ListadoUnidades from './procesos/TabletoComponents/ListadoUnidades';

const Home = ({camiones, setCamiones, notActiva, notTemp, ventana, empresaSistema, id_transportista, tiposNotificaciones}) => {
    
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
    <div className="lg:flex lg:flex-row ">
      <div className="lg:w-5/12 lg:pr-4 w-full">
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
            setCamiones={setCamiones}
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
          setCamiones={setCamiones}
          onCamionClick={handleCamionClick}
          notActiva={notActiva}
          />
        )}
      </div>


      <div className="lg:w-7/12 w-full">
       {ventana == "Inicio" && camiones.length > 0 && (
          <DashboardUnidades
          setInfo={setInfo}
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
            id_transportista={id_transportista}
            tiposNotificaciones={tiposNotificaciones}
          />
        )} 

        {ventana == "Tablet" && camiones.length > 0 && (
          <DashboardUnidadesTablet
          ventana = {ventana}
          open={open}
          handleClose={handleClose}
          setInfo={setInfo}
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
          id_transportista={id_transportista}
        />
        )}
      </div>
    </div>
  );
};

export default Home;