import React, { useState } from 'react';
import ModalesNotificaciones from './ModalesNotificaciones';


const ListadoUnidades = ({open,handleClose, info, setInfo, openAlerta, handleCloseAlerta, camiones, onCamionClick, notActiva, notTemp}) => {
 
  const [busqueda, setBusqueda] = useState("");

function esMenorA20Minutos(fechaStr) {
  const fecha = new Date(fechaStr);
  const ahora = new Date();
  const diferencia = ahora - fecha;
  return diferencia >= 20 * 60 * 1000; 
}

function formatearFecha(fechaStr) {
  var fecha = new Date(fechaStr);
  var dia = ('0' + fecha.getDate()).slice(-2);
  var mes = ('0' + (fecha.getMonth() + 1)).slice(-2);
  var año = fecha.getFullYear();
  var horas = ('0' + fecha.getHours()).slice(-2);
  var minutos = ('0' + fecha.getMinutes()).slice(-2);
  var segundos = ('0' + fecha.getSeconds()).slice(-2);
  return dia + '-' + mes + '-' + año + ' ' + horas + ':' + minutos + ':' + segundos;
}

function esFechaValida(valor) {
  const fecha = new Date(valor);
  return !isNaN(fecha.getTime());
}

  return (
    <>
      <div className="lg:flex mr-3 items-center">
        <input
          name="busqueda"
          id="busqueda"
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="lg:w-6/12  p-1.5 mb-2 border border-gray-400 shadow "
          placeholder=" Buscar unidad..."
        />

   
      </div>

      <div
        className="container mx-auto space-y-2"
        style={{ maxHeight: 560, overflowY: "auto" }}
      >
        {camiones   
          .filter((val) => {
            if (busqueda == "") {
              return val;
            } else if (
              val.patente.toLowerCase().includes(busqueda.toLowerCase())              
            ) {
              return val;
            }
          })
          .map((item, index) => (
            <div
              onClick={() => {
                onCamionClick(item);
                setInfo(item); // Esto establece el estado `info` al `item` clickeado
              }}
              key={index}
              className={`${
                info.patente === item.patente ? "bg-gray-300" : "bg-white" // Si `info.patente` es igual a `item.patente`, se aplica la clase de color de fondo azul, de lo contrario, blanco
              } shadow-md border border-gray-300 rounded-lg p-2 mr-3 hover:bg-gray-100 cursor-pointer`}
            >
      
              <div className="flex items-center justify-between">
                <span className="text-md font-bold text-black">
                  {item.patente}
                </span>
                <span className={`${esMenorA20Minutos(item.fechaGPS) ? 'text-red-500' : 'text-green-600'}`}> {esFechaValida(item.fechaGPS) ? formatearFecha(item.fechaGPS) : item.fechaGPS}</span>
              </div>


              <div className="mt-2 ">
                <li key={index} className={`flex justify-between items-center`}>
                  <div className="">
                    <div
                      className={`flex gap-1 ${
                        item.ox1 > 0 ? "block" : "hidden"
                      }`}
                    >
                      <span className="text-sm font-bold text-gray-500">
                        E1:
                      </span>{" "}
                      <span
                        className={`${
                          (notActiva &&
                            parseInt(item.ox1) > parseInt(notActiva.val_max)) ||
                            parseInt(item.ox1) < parseInt(notActiva.val_min)
                            ? "text-red-400 text-md animate-bounce font-bold "
                            : "text-gray-500 text-sm"
                        }`}
                      >
                        {item.ox1}
                      </span>
                      <span className="text-sm font-bold text-gray-500">
                        E2:{" "}
                      </span>{" "}
                      <span
                        className={`${
                          (notActiva &&
                            parseInt(item.ox2) > parseInt(notActiva.val_max)) ||
                          parseInt(item.ox2) < parseInt(notActiva.val_min)
                            ? "text-red-400 text-md animate-bounce font-bold"
                            : "text-gray-500 text-sm"
                        } `}
                      >
                        {item.ox2}
                      </span>
                      <span className="text-sm font-bold text-gray-500">
                        E3:{" "}
                      </span>{" "}
                      <span
                        className={`${
                          (notActiva &&
                            parseInt(item.ox3) > parseInt(notActiva.val_max)) ||
                          parseInt(item.ox3) < parseInt(notActiva.val_min)
                            ? "text-red-400 text-md animate-bounce font-bold"
                            : "text-gray-500 text-sm"
                        }`}
                      >
                        {item.ox3}
                      </span>
                      <span className="text-sm font-bold text-gray-500">
                        E4:{" "}
                      </span>{" "}
                      <span
                        className={`${
                          (notActiva &&
                            parseInt(item.ox4) > parseInt(notActiva.val_max)) ||
                          parseInt(item.ox4) < parseInt(notActiva.val_min)
                            ? "text-red-400 text-md animate-bounce font-bold"
                            : "text-gray-500 text-sm"
                        }`}
                      >
                        {item.ox4}
                      </span>
                      <span className="text-sm font-bold text-gray-500">
                        E5:{" "}
                      </span>{" "}
                      <span
                        className={`${
                          (notActiva &&
                            parseInt(item.ox5) > parseInt(notActiva.val_max)) ||
                          parseInt(item.ox5) < parseInt(notActiva.val_min)
                            ? "text-red-400 text-md animate-bounce font-bold"
                            : "text-gray-500 text-sm"
                        } `}
                      >
                        {item.ox5}
                      </span>
                      <span className="text-sm font-bold text-gray-500">
                        E6:{" "}
                      </span>{" "}
                      <span
                        className={`${
                          (notActiva &&
                            parseInt(item.ox6) > parseInt(notActiva.val_max)) ||
                          parseInt(item.ox6) < parseInt(notActiva.val_min)
                            ? "text-red-400 text-md animate-bounce font-bold"
                            : "text-gray-500 text-sm"
                        } `}
                      >
                        {item.ox6}
                      </span>
                      <span className="text-sm font-bold text-gray-500">
                        E7:{" "}
                      </span>{" "}
                      <span
                        className={`${
                          (notActiva &&
                            parseInt(item.ox7) > parseInt(notActiva.val_max)) ||
                          parseInt(item.ox7) < parseInt(notActiva.val_min)
                            ? "text-red-400 text-md animate-bounce font-bold"
                            : "text-gray-500 text-sm"
                        } `}
                      >
                        {item.ox7}
                      </span>
                      <span className="text-sm font-bold text-gray-500">
                        E8:{" "}
                      </span>{" "}
                      <span
                        className={`${
                          (notActiva &&
                            parseInt(item.ox8) > parseInt(notActiva.val_max)) ||
                          parseInt(item.ox8) < parseInt(notActiva.val_min)
                            ? "text-red-400 text-md animate-bounce font-bold"
                            : "text-gray-500 text-sm"
                        }`}
                      >
                        {item.ox8}
                      </span>
                      <span className="text-sm font-bold text-gray-500">
                        E9:{" "}
                      </span>{" "}
                      <span
                        className={`${
                          (notActiva &&
                            parseInt(item.ox9) > parseInt(notActiva.val_max)) ||
                          parseInt(item.ox9) < parseInt(notActiva.val_min)
                            ? "text-red-400 text-md animate-bounce font-bold"
                            : "text-gray-500 text-sm"
                        } `}
                      >
                        {item.ox9}
                      </span>
                      <span className="text-sm font-bold text-gray-500">
                        {" "}
                        T°:{" "}
                      </span>{" "}
                      <span
                        className={`${
                          (notTemp &&
                            parseInt(item.temp) > parseInt(notTemp.val_max)) ||
                          parseInt(item.temp) < parseInt(notTemp.val_min)
                            ? "text-red-400 text-md animate-bounce font-bold"
                            : "text-gray-500 text-sm"
                        } `}
                      >
                        {item.temp}
                      </span>
                    </div>
                  </div>
               
                </li>
              </div>
            </div>
          ))}

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
    </>
  );
};

export default ListadoUnidades;
