import React, { useEffect, useState } from 'react';
import AssignmentTwoToneIcon from '@mui/icons-material/AssignmentTwoTone';
import Tooltip from "@mui/material/Tooltip";
import SimCardAlertTwoToneIcon from '@mui/icons-material/SimCardAlertTwoTone';
import ModalesNotificaciones from '../procesos/TabletoComponents/ModalesNotificaciones';

const ListaCamiones = ({open,handleClose, info, setInfo, openAlerta, handleCloseAlerta, camiones, onCamionClick, notActiva, notTemp }) => {

  return (
    <div
      className="container mx-auto space-y-2"
      style={{ maxHeight: 700, overflowY: "auto" }}
    >
      {camiones.map((item, index) => (
        <div
          onClick={() => {
            onCamionClick(item);
            setInfo(item); // Esto establece el estado `info` al `item` clickeado
          }}
          key={index}
          className={`${
            info.PATENTE == item.PATENTE ? "bg-gray-300" : "bg-white" // Si `info.patente` es igual a `item.patente`, se aplica la clase de color de fondo azul, de lo contrario, blanco
          } shadow-md border border-gray-300 rounded-lg p-0 mr-3 hover:bg-gray-100 cursor-pointer`}
        >       
          <div className="">
          <li
              key={index}
              className={`p-3 flex justify-between items-center `}
           
            >
              <div className=''>
                <div className="flex items-center space-x-4 justify-between">
                  <span className="font-bold text-black text-lg">{item.PATENTE}</span>
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
                  className={`flex gap-1 ${
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
                  <span className="text-xs font-bold text-gray-500">O10:</span>{" "}
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
                  <span className="text-xs font-bold text-gray-500">TEMP:</span>{" "}
                  <span className='text-xs'>
                    {item.TEMP}
                  </span>
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
  );
};

export default ListaCamiones;
