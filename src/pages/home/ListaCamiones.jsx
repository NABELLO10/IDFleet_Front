import React, { useEffect, useState } from 'react';
import AssignmentTwoToneIcon from '@mui/icons-material/AssignmentTwoTone';
import Tooltip from "@mui/material/Tooltip";
import SimCardAlertTwoToneIcon from '@mui/icons-material/SimCardAlertTwoTone';
import ModalesNotificaciones from '../procesos/TabletoComponents/ModalesNotificaciones';
import NotificationsActiveTwoToneIcon from '@mui/icons-material/NotificationsActiveTwoTone';
import NorthTwoToneIcon from '@mui/icons-material/NorthTwoTone';
import SouthTwoToneIcon from '@mui/icons-material/SouthTwoTone';




const ListaCamiones = ({open,handleClose, info, setInfo, openAlerta, handleCloseAlerta, camiones, onCamionClick, notActiva, notTemp }) => {

  const [busqueda, setBusqueda] = useState("");
  const [orden, setOrden] = useState(true);
  const [alerta, setAlerta] = useState(true);
  const [verFormulario, setVerFormulario] = useState(true);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
  
    window.addEventListener('resize', handleResize);
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


 

  return (
    <>    
  
      <div className={`flex mb-2 gap-2  items-center ${verFormulario ? 'block' : 'hidden'}`}>
        <div className="flex justify-start w-full  gap-2  items-center">
          <input
            name="busqueda"
            id="busqueda"
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className=" p-2 border border-gray-400 shadow "
            placeholder=" Buscar unidad..."
          />
          <Tooltip
            title={`${
              alerta ? "TODOS LOS REGISTROS" : "REGISTROS CON ALERTAS"
            }`}
          >
            <button
              onClick={() => setAlerta(!alerta)}
              className={` ${
                !alerta
                  ? "bg-red-900 hover:bg-red-800 "
                  : "bg-blue-900 hover:bg-blue-800 "
              } p-2 rounded text-white `}
            >
              <NotificationsActiveTwoToneIcon />
            </button>
          </Tooltip>
        </div>

        <div className="flex justify-end  w-full gap-1 mr-3">
          <Tooltip title={`${orden ? "A-Z" : "Z-A"}`}>
            <button
              onClick={() => setOrden(!orden)}
              className="bg-gray-900 p-2 rounded text-white hover:bg-gray-500"
            >
              {orden ? <SouthTwoToneIcon /> : <NorthTwoToneIcon />}
            </button>
          </Tooltip>
        </div>
      </div>
   


      <div className={`container mx-auto space-y-1 ${verFormulario ? 'block' : 'hidden'}`}
        style={{
          maxHeight: isLargeScreen ? 560 : '24vh',
          overflowY: 'auto',
        }}
      >
     

      {camiones
        .filter((val) => {
          if (busqueda == "") {
            return val;
          } else if (
            val.PATENTE.toLowerCase().includes(busqueda.toLowerCase())
          ) {
            return val;
          }
        })
        .filter((val) => {
          // Filtrar por alertas
          if (alerta) {
            return val; // Si alerta es false, mostrar todos
          } else {
            return val.est_alerta; // Si alerta es true, mostrar solo los que tienen est_alerta
          }
        })
        .sort((a, b) => {
          if (orden) {
            return a.PATENTE.localeCompare(b.PATENTE); // Orden ascendente
          } else {
            return b.PATENTE.localeCompare(a.PATENTE); // Orden descendente
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
              info.PATENTE == item.PATENTE ? "bg-gray-300" : "bg-white" // Si `info.patente` es igual a `item.patente`, se aplica la clase de color de fondo azul, de lo contrario, blanco
            } shadow-md border border-gray-300 rounded-lg p-0 hover:bg-gray-100 mb-2 cursor-pointer`}
          >
            <div className="w-full ">
              <li
                key={index}
                className={`p-2 flex justify-between items-center `}
              >
                <div className="">
                  <div className="flex items-center space-x-4 justify-between">
                    <span className="font-bold text-black text-lg">
                      {item.PATENTE}
                    </span>
                    <span
                      className={`text-sm ${
                        new Date(item.DATE + " " + item.TIME) < new Date()
                          ? "text-red-500"
                          : "text-green-300"
                      }`}
                    >
                      {item.DATE + " " + item.TIME}
                    </span>
                  </div>

                  <div
                    className={`lg:flex gap-1 ${
                      item.O1 != "" ? "block" : "hidden"
                    }`}
                  >
                    <span className="text-xs font-bold text-gray-500">O1:</span>{" "}
                    <span
                      className={`${
                        parseInt(item.O1) > parseInt(item.RA) ||
                        parseInt(item.O1) < parseInt(item.RB)
                          ? "text-red-400 text-md animate-bounce font-bold "
                          : " text-xs"
                      }`}
                    >
                      {item.O1}
                    </span>
                    
                    <span className="text-xs font-bold text-gray-500">O2:</span>{" "}
                    <span
                      className={`${
                        parseInt(item.O2) > parseInt(item.RA) ||
                        parseInt(item.O2) < parseInt(item.RB)
                          ? "text-red-400 text-md animate-bounce font-bold "
                          : " text-xs"
                      }`}
                    >
                      {item.O2}
                    </span>
                    <span className="text-xs font-bold text-gray-500">O3:</span>{" "}
                    <span
                      className={`${
                        parseInt(item.O3) > parseInt(item.RA) ||
                        parseInt(item.O3) < parseInt(item.RB)
                          ? "text-red-400 text-md animate-bounce font-bold "
                          : " text-xs"
                      }`}
                    >
                      {item.O3}
                    </span>
                    <span className="text-xs font-bold text-gray-500">O4:</span>{" "}
                    <span
                      className={`${
                        parseInt(item.O4) > parseInt(item.RA) ||
                        parseInt(item.O4) < parseInt(item.RB)
                          ? "text-red-400 text-md animate-bounce font-bold "
                          : " text-xs"
                      }`}
                    >
                      {item.O4}
                    </span>
                    <span className="text-xs font-bold text-gray-500">O5:</span>{" "}
                    <span
                      className={`${
                        parseInt(item.O5) > parseInt(item.RA) ||
                        parseInt(item.O5) < parseInt(item.RB)
                          ? "text-red-400 text-md animate-bounce font-bold "
                          : " text-xs"
                      }`}
                    >
                      {item.O5}
                    </span>
                    <span className="text-xs font-bold text-gray-500">O6:</span>{" "}
                    <span
                      className={`${
                        parseInt(item.O6) > parseInt(item.RA) ||
                        parseInt(item.O6) < parseInt(item.RB)
                          ? "text-red-400 text-md animate-bounce font-bold "
                          : " text-xs"
                      }`}
                    >
                      {item.O6}
                    </span>
                    <span className="text-xs font-bold text-gray-500">O7:</span>{" "}
                    <span
                      className={`${
                        parseInt(item.O7) > parseInt(item.RA) ||
                        parseInt(item.O7) < parseInt(item.RB)
                          ? "text-red-400 text-md animate-bounce font-bold "
                          : " text-xs"
                      }`}
                    >
                      {item.O7}
                    </span>
                    <span className="text-xs font-bold text-gray-500">O8:</span>{" "}
                    <span
                      className={`${
                        parseInt(item.O8) > parseInt(item.RA) ||
                        parseInt(item.O8) < parseInt(item.RB)
                          ? "text-red-400 text-md animate-bounce font-bold "
                          : " text-xs"
                      }`}
                    >
                      {item.O8}
                    </span>
                    <span className="text-xs font-bold text-gray-500">O9:</span>{" "}
                    <span
                      className={`${
                        parseInt(item.O9) > parseInt(item.RA) ||
                        parseInt(item.O9) < parseInt(item.RB)
                          ? "text-red-400 text-md animate-bounce font-bold "
                          : " text-xs"
                      }`}
                    >
                      {item.O9}
                    </span>
                    <span className="text-xs font-bold text-gray-500">
                      O10:
                    </span>{" "}
                    <span
                      className={`${
                        parseInt(item.O10) > parseInt(item.RA) ||
                        parseInt(item.O10) < parseInt(item.RB)
                          ? "text-red-400 text-md animate-bounce font-bold "
                          : " text-xs"
                      }`}
                    >
                      {item.O10}
                    </span>
                    <span className="text-xs font-bold text-gray-500">
                      TEMP:
                    </span>{" "}
                    <span className="text-xs">{item.TEMP}</span>
                  </div>
                </div>
                {/* 
              <div className="flex items-center space-x-2">
                <Tooltip title="Historico Oxigenación">
                  <button
                    className={`rounded-lg ${item.ox1 <= 0 ? "hidden" : ""}`}
                    onClick={() => {
                      handleClickOpen();
                      setInfo(item);
                    }}
                  >
                    <AssignmentTwoToneIcon className="text-blue-400" />
                  </button>
                </Tooltip>
                <Tooltip title="Historico Alertas">
                  <button
                    className="rounded-lg"
                    onClick={() => {
                      handleClickOpenAlerta();
                    }}
                  >
                    <SimCardAlertTwoToneIcon className="text-gray-400" />
                  </button>
                </Tooltip>
              </div> */}
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

export default ListaCamiones;
