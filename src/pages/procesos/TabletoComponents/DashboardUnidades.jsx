import React from 'react';
import MapaDeCamiones from '../../home/MapaDeCamiones';
import ModalesNotificaciones from './ModalesNotificaciones';

const DashboardUnidades = ({setInfo,  handleClickOpenAlerta, handleClickOpen, open,handleClose, info,notActiva, notTemp, openAlerta, handleCloseAlerta, camiones,centroMapa, camionSeleccionado }) => {

  return (
    <div className="bg-white shadow-xl border border-gray-300 p-4">
      {/* Encabezado del DashboardUnidades */}
      <div className="mb-4 flex justify-between items-center">
        {/* Aquí irían los botones o controles del encabezado */}
        <button onClick={() => {
                      handleClickOpen();
                      setInfo(camionSeleccionado);
                    }} className="p-2 bg-blue-700 text-white rounded-md hover:bg-blue-900">GPS</button>
       {camionSeleccionado && <h1 className="text-xl font-semibold">UNIDAD: {camionSeleccionado.patente}</h1>}
        <button  onClick={() => {
                      handleClickOpenAlerta();
                    }} className="p-2 bg-red-900 hover:bg-red-600 text-white rounded-md">Alertas</button>
      </div>

      {/* Sección del Mapa */}
      <div className="h-96 bg-white mb-4 rounded-lg shadow-lg border ">
      <MapaDeCamiones
          ventana="Inicio"
          camiones={camiones}
          centroMapa={centroMapa}
          camionSeleccionado={camionSeleccionado}
        />
      </div>

      {/* Sección de Indicadores de Cumplimiento */}
      <div className="grid grid-cols-2 gap-4">
        {/* Indicador de Cumplimiento */}
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-300">
          <h2 className="text-lg font-semibold mb-2">GPS</h2>
          {/* Indicadores */}
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium">Ultimo registro GPS:</span>
            <span className="text-sm font-medium text-gray-500">{camionSeleccionado.fechaGPS}</span>
          </div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium">Ultimo Dato Add:</span>
            <span className="text-sm font-medium text-gray-500">{camionSeleccionado.fechaRegistro}</span>
          </div>
       
        </div>

        {/* Otros Indicadores */}
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-300">
          <h2 className="text-lg font-semibold mb-2">Otros Indicadores</h2>
          {/* Porcentaje de cumplimiento */}
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium">Velocidad:</span>
            <span className="text-sm font-medium text-gray-500">{camionSeleccionado.velocidad > 0 + "Km/H" ? camionSeleccionado.velocidad : "0 km/h"}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Altitud:</span>
            <span className="text-sm font-medium text-gray-500">{camionSeleccionado.altitud}</span>
          </div>
        </div>
       
      
      </div>
      

      <ModalesNotificaciones
        open={open}
        handleClose={handleClose}
        info={info}
        notActiva={notActiva}
        notTemp={notTemp}
        openAlerta={openAlerta}
        handleCloseAlerta={handleCloseAlerta}
      />
    </div>
  );
};

export default DashboardUnidades;
