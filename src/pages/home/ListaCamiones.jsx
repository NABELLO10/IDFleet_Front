import React, {useState} from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AssignmentTwoToneIcon from '@mui/icons-material/AssignmentTwoTone';
import Tooltip from "@mui/material/Tooltip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import SimCardAlertTwoToneIcon from '@mui/icons-material/SimCardAlertTwoTone';

import HistoricoGps from '../procesos/HistoricoGps';
import HistoricoAlertas from '../procesos/HistoricoAlertas';

const ListaCamiones = ({ camiones, onCamionClick, notActiva, notTemp }) => {

    const [info, setInfo] = useState({}); // info = camiones[index

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };
  
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
    
  return (
 
    <>
     <div className={`w-full bg-gray-900 text-white rounded-md h-screen ${Object.keys(notActiva).length == 0 ? 'block' : 'hidden'  }`}>
      <div className="overflow-auto h-full">
        <ul className="divide-y divide-gray-200">
          {camiones.map((camion, index) => (
            <li
              key={index}
              className={`p-3 flex justify-between items-center ${
                info.PATENTE === camion.PATENTE ? "bg-cyan-800" : ""
              }`}
              onClick={() => {
                onCamionClick(camion);
                setInfo(camion);
              }}
            >
              <div className=''>
                <div className="flex items-center space-x-4 justify-between">
                  <span className="font-bold">{camion.PATENTE}</span>
                  <span
                    className={`text-lg ${
                      new Date(camion.DATE + " " + camion.TIME) < new Date()
                        ? "text-red-400 animate-pulse"
                        : "text-green-300"
                    }`}
                  >
                    {camion.DATE + " " + camion.TIME}
                  </span>
                </div>

                <div
                  className={`flex gap-1 ${
                    camion.O1 != "" ? "block" : "hidden"
                  }`}
                >
                  <span className="text-xs font-bold text-cyan-500">O1:</span>{" "}
                  <span
                    className={`${
                      parseInt(camion.O1) > parseInt(camion.RA) ||
                      parseInt(camion.O1) < parseInt(camion.RB)
                        ? "text-red-400 text-md animate-bounce font-bold "
                        : "text-green-500 text-xs"
                    }`}
                  >
                    {camion.O1}
                  </span>
                  <span className="text-xs font-bold text-cyan-500">O2:</span>{" "}
                  <span
                    className={`${
                      parseInt(camion.O2) > parseInt(camion.RA) ||
                      parseInt(camion.O2) < parseInt(camion.RB)
                        ? "text-red-400 text-md animate-bounce font-bold "
                        : "text-green-500 text-xs"
                    }`}
                  >
                    {camion.O2}
                  </span>
                  <span className="text-xs font-bold text-cyan-500">O3:</span>{" "}
                  <span
                    className={`${
                      parseInt(camion.O3) > parseInt(camion.RA) ||
                      parseInt(camion.O3) < parseInt(camion.RB)
                        ? "text-red-400 text-md animate-bounce font-bold "
                        : "text-green-500 text-xs"
                    }`}
                  >
                    {camion.O3}
                  </span>
                  <span className="text-xs font-bold text-cyan-500">O4:</span>{" "}
                  <span
                    className={`${
                      parseInt(camion.O4) > parseInt(camion.RA) ||
                      parseInt(camion.O4) < parseInt(camion.RB)
                        ? "text-red-400 text-md animate-bounce font-bold "
                        : "text-green-500 text-xs"
                    }`}
                  >
                    {camion.O4}
                  </span>
                  <span className="text-xs font-bold text-cyan-500">O5:</span>{" "}
                  <span
                    className={`${
                      parseInt(camion.O5) > parseInt(camion.RA) ||
                      parseInt(camion.O5) < parseInt(camion.RB)
                        ? "text-red-400 text-md animate-bounce font-bold "
                        : "text-green-500 text-xs"
                    }`}
                  >
                    {camion.O5}
                  </span>
                  <span className="text-xs font-bold text-cyan-500">O6:</span>{" "}
                  <span
                    className={`${
                      parseInt(camion.O6) > parseInt(camion.RA) ||
                      parseInt(camion.O6) < parseInt(camion.RB)
                        ? "text-red-400 text-md animate-bounce font-bold "
                        : "text-green-500 text-xs"
                    }`}
                  >
                    {camion.O6}
                  </span>
                  <span className="text-xs font-bold text-cyan-500">O7:</span>{" "}
                  <span
                    className={`${
                      parseInt(camion.O7) > parseInt(camion.RA) ||
                      parseInt(camion.O7) < parseInt(camion.RB)
                        ? "text-red-400 text-md animate-bounce font-bold "
                        : "text-green-500 text-xs"
                    }`}
                  >
                    {camion.O7}
                  </span>
                  <span className="text-xs font-bold text-cyan-500">O8:</span>{" "}
                  <span
                    className={`${
                      parseInt(camion.O8) > parseInt(camion.RA) ||
                      parseInt(camion.O8) < parseInt(camion.RB)
                        ? "text-red-400 text-md animate-bounce font-bold "
                        : "text-green-500 text-xs"
                    }`}
                  >
                    {camion.O8}
                  </span>
                  <span className="text-xs font-bold text-cyan-500">O9:</span>{" "}
                  <span
                    className={`${
                      parseInt(camion.O9) > parseInt(camion.RA) ||
                      parseInt(camion.O9) < parseInt(camion.RB)
                        ? "text-red-400 text-md animate-bounce font-bold "
                        : "text-green-500 text-xs"
                    }`}
                  >
                    {camion.O9}
                  </span>
                  <span className="text-xs font-bold text-cyan-500">O10:</span>{" "}
                  <span
                    className={`${
                      parseInt(camion.O10) > parseInt(camion.RA) ||
                      parseInt(camion.O10) < parseInt(camion.RB)
                        ? "text-red-400 text-md animate-bounce font-bold "
                        : "text-green-500 text-xs"
                    }`}
                  >
                    {camion.O10}
                  </span>
                  <span className="text-xs font-bold text-cyan-500">TEMP:</span>{" "}
                  <span className='text-xs'>
                    {camion.TEMP}
                  </span>
                </div>
              </div>
{/* 
              <div className="flex items-center space-x-2">
                <Tooltip title="Historico Oxigenación">
                  <button
                    className={`rounded-lg ${camion.ox1 <= 0 ? "hidden" : ""}`}
                    onClick={() => {
                      handleClickOpen();
                      setInfo(camion);
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
                    <SimCardAlertTwoToneIcon className="text-cyan-400" />
                  </button>
                </Tooltip>
              </div> */}
            </li>
          ))}
        </ul>
      </div>

      <Dialog
        fullWidth={true}
        maxWidth={"lg"}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <div className=" rounded-lg">
            <HistoricoGps
              patente={info.patente}
              notActiva={notActiva}
              notTemp={notTemp}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <button
            className="inline-block px-6 py-2.5 bg-gray-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-500 active:shadow-lg transition duration-150 ease-in-out"
            onClick={handleClose}
          >
            Cerrar
          </button>
        </DialogActions>
      </Dialog>

      <Dialog
        fullWidth={true}
        maxWidth={"lg"}
        open={openAlerta}
        onClose={handleCloseAlerta}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <div className=" rounded-lg">
            <div className="">
              <HistoricoAlertas patente={info.patente} />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <button
            className="inline-block px-6 py-2.5 bg-gray-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-500 active:shadow-lg transition duration-150 ease-in-out"
            onClick={handleCloseAlerta}
          >
            Cerrar
          </button>
        </DialogActions>
      </Dialog>
    </div>


      <div className={`w-full bg-gray-900 text-white rounded-md h-screen ${Object.keys(notActiva).length > 0 ? 'block' : 'hidden'  }`}>
      <div className="overflow-auto h-full">
        <ul className="divide-y divide-gray-200">
          {camiones.map((camion, index) => (
            <li
              key={index}
              className={`p-3 flex justify-between items-center ${
                info.patente === camion.patente ? "bg-cyan-800" : ""
              }`}
              onClick={() => {
                onCamionClick(camion);
                setInfo(camion);
              }}
            >
              <div>
                <div className="flex items-center space-x-4">
                  <span className="font-bold">{camion.patente}</span>
                </div>

                <div
                  className={`flex gap-1 ${
                    camion.ox1 > 0 ? "block" : "hidden"
                  }`}
                >
                  <span className="text-xs font-bold text-cyan-500">E1:</span>{" "}
                  <span
                    className={`${
                      (notActiva &&
                        parseInt(camion.ox1) > parseInt(notActiva.val_max)) ||
                      parseInt(camion.ox1) < parseInt(notActiva.val_min)
                        ? "text-red-400 text-md animate-bounce font-bold "
                        : "text-green-500 text-xs"
                    }`}
                  >
                    {camion.ox1}
                  </span>
                  <span className="text-xs font-bold text-cyan-500">E2: </span>{" "}
                  <span
                    className={`${
                      (notActiva &&
                        parseInt(camion.ox2) > parseInt(notActiva.val_max)) ||
                      parseInt(camion.ox2) < parseInt(notActiva.val_min)
                        ? "text-red-400 text-md animate-bounce font-bold"
                        : "text-green-500 text-xs"
                    } `}
                  >
                    {camion.ox2}
                  </span>
                  <span className="text-xs font-bold text-cyan-500">E3: </span>{" "}
                  <span
                    className={`${
                      (notActiva &&
                        parseInt(camion.ox3) > parseInt(notActiva.val_max)) ||
                      parseInt(camion.ox3) < parseInt(notActiva.val_min)
                        ? "text-red-400 text-md animate-bounce font-bold"
                        : "text-green-500 text-xs"
                    }`}
                  >
                    {camion.ox3}
                  </span>
                  <span className="text-xs font-bold text-cyan-500">E4: </span>{" "}
                  <span
                    className={`${
                      (notActiva &&
                        parseInt(camion.ox4) > parseInt(notActiva.val_max)) ||
                      parseInt(camion.ox4) < parseInt(notActiva.val_min)
                        ? "text-red-400 text-md animate-bounce font-bold"
                        : "text-green-500 text-xs"
                    }`}
                  >
                    {camion.ox4}
                  </span>
                  <span className="text-xs font-bold text-cyan-500">E5: </span>{" "}
                  <span
                    className={`${
                      (notActiva &&
                        parseInt(camion.ox5) > parseInt(notActiva.val_max)) ||
                      parseInt(camion.ox5) < parseInt(notActiva.val_min)
                        ? "text-red-400 text-md animate-bounce font-bold"
                        : "text-green-500 text-xs"
                    } `}
                  >
                    {camion.ox5}
                  </span>
                  <span className="text-xs font-bold text-cyan-500">E6: </span>{" "}
                  <span
                    className={`${
                      (notActiva &&
                        parseInt(camion.ox6) > parseInt(notActiva.val_max)) ||
                      parseInt(camion.ox6) < parseInt(notActiva.val_min)
                        ? "text-red-400 text-md animate-bounce font-bold"
                        : "text-green-500 text-xs"
                    } `}
                  >
                    {camion.ox6}
                  </span>
                  <span className="text-xs font-bold text-cyan-500">E7: </span>{" "}
                  <span
                    className={`${
                      (notActiva &&
                        parseInt(camion.ox7) > parseInt(notActiva.val_max)) ||
                      parseInt(camion.ox7) < parseInt(notActiva.val_min)
                        ? "text-red-400 text-md animate-bounce font-bold"
                        : "text-green-500 text-xs"
                    } `}
                  >
                    {camion.ox7}
                  </span>
                  <span className="text-xs font-bold text-cyan-500">E8: </span>{" "}
                  <span
                    className={`${
                      (notActiva &&
                        parseInt(camion.ox8) > parseInt(notActiva.val_max)) ||
                      parseInt(camion.ox8) < parseInt(notActiva.val_min)
                        ? "text-red-400 text-md animate-bounce font-bold"
                        : "text-green-500 text-xs"
                    }`}
                  >
                    {camion.ox8}
                  </span>
                  <span className="text-xs font-bold text-cyan-500">E9: </span>{" "}
                  <span
                    className={`${
                      (notActiva &&
                        parseInt(camion.ox9) > parseInt(notActiva.val_max)) ||
                      parseInt(camion.ox9) < parseInt(notActiva.val_min)
                        ? "text-red-400 text-md animate-bounce font-bold"
                        : "text-green-500 text-xs"
                    } `}
                  >
                    {camion.ox9}
                  </span>
                  <span className="text-xs font-bold text-cyan-500"> T°: </span>{" "}
                  <span className={`${
                      (notTemp &&
                        parseInt(camion.temp) > parseInt(notTemp.val_max)) ||
                      parseInt(camion.temp) < parseInt(notTemp.val_min)
                        ? "text-red-400 text-md animate-bounce font-bold"
                        : "text-green-500 text-xs"
                    } `}>{camion.temp}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Tooltip title="Historico Oxigenación">
                  <button
                    className={`rounded-lg ${camion.ox1 <= 0 ? "hidden" : ""}`}
                    onClick={() => {
                      handleClickOpen();
                      setInfo(camion);
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
                    <SimCardAlertTwoToneIcon className="text-cyan-400" />
                  </button>
                </Tooltip>
              </div>
            </li>
          ))}
        </ul>
      </div>

      

      <Dialog
        fullWidth={true}
        maxWidth={"lg"}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <div className=" rounded-lg">
            <HistoricoGps patente={info.patente} notActiva={notActiva} notTemp={notTemp} />
          </div>
        </DialogContent>
        <DialogActions>
          <button
            className="inline-block px-6 py-2.5 bg-gray-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-500 active:shadow-lg transition duration-150 ease-in-out"
            onClick={handleClose}
          >
            Cerrar
          </button>
        </DialogActions>
      </Dialog>



      <Dialog
        fullWidth={true}
        maxWidth={"lg"}
        open={openAlerta}
        onClose={handleCloseAlerta}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <div className=" rounded-lg">
            <div className="">
            <HistoricoAlertas patente={info.patente}/>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <button
            className="inline-block px-6 py-2.5 bg-gray-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-500 active:shadow-lg transition duration-150 ease-in-out"
            onClick={handleCloseAlerta}
          >
            Cerrar
          </button>
        </DialogActions>
      </Dialog>
    </div> 
    </>
   

 
  );
};

export default ListaCamiones;
