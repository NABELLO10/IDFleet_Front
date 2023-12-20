import React from 'react';
import MapaDeCamiones from '../../home/MapaDeCamiones';
import ModalesNotificaciones from './ModalesNotificaciones';

const DashboardUnidadesTablet = ({setInfo,  handleClickOpenAlerta, handleClickOpen, open,handleClose, info,notActiva, notTemp, openAlerta, handleCloseAlerta, camiones,centroMapa, camionSeleccionado }) => {
console.log(camionSeleccionado)

  return (
    <div className="bg-white shadow-xl border border-gray-300 p-4">
      {/* Encabezado del DashboardUnidadesTablet */}
      <div className="mb-4 flex justify-between items-center">
        {/* Aquí irían los botones o controles del encabezado */}
        <button onClick={() => {
                      handleClickOpen();
                      setInfo(camionSeleccionado);
                    }} className="p-2 bg-blue-700 text-white rounded-md hover:bg-blue-900">GPS</button>
       {camionSeleccionado && <h1 className="text-xl font-semibold">UNIDAD: {camionSeleccionado.PATENTE}</h1>}
        <button  onClick={() => {
                      handleClickOpenAlerta();
                    }} className="p-2 bg-red-900 hover:bg-red-600 text-white rounded-md">Alertas</button>
      </div>

      {/* Sección del Mapa */}
      <div className="h-96 bg-white mb-4 rounded-lg shadow-lg border ">
       <MapaDeCamiones
          ventana="Tablet"
          camiones={camiones}
          centroMapa={centroMapa}
          camionSeleccionado={camionSeleccionado}
        /> 
      </div>

      
       <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-300">
          <h2 className="text-lg font-semibold mb-2">GPS</h2>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium">Ultimo registro GPS:</span>
            <span className="text-sm font-medium text-gray-500">{camionSeleccionado.DATE + " " + camionSeleccionado.TIME}</span>
          </div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium">Ultimo Dato Add:</span>
            <span className="text-sm font-medium text-gray-500">{camionSeleccionado.fec_add}</span>
          </div>
       
        </div>

      
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-300">
          <h2 className="text-lg font-semibold mb-2">Otros Indicadores</h2>        
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium">RA:</span>
            <span className="text-sm font-medium text-gray-500">{camionSeleccionado.RA}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">RB:</span>
            <span className="text-sm font-medium text-gray-500">{camionSeleccionado.RB}</span>
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

export default DashboardUnidadesTablet;
