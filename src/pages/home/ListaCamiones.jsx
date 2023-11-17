import React, {useState} from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ThermostatAutoTwoToneIcon from '@mui/icons-material/ThermostatAutoTwoTone';
import AssignmentTwoToneIcon from '@mui/icons-material/AssignmentTwoTone';
import Tooltip from "@mui/material/Tooltip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";


const ListaCamiones = ({ camiones, onCamionClick }) => {

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
    <div className="w-full bg-gray-800 text-white rounded-md h-screen">
      <div className="overflow-auto h-full">
        <ul className="divide-y divide-gray-200">
          {camiones.map((camion, index) => (
            <li key={index} className="p-3 flex justify-between items-center">
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
                  <span className="text-xs">{camion.ox1}</span>
                  <span className="text-xs font-bold text-cyan-500">
                    E2:{" "}
                  </span>{" "}
                  <span className="text-xs">{camion.ox2}</span>
                  <span className="text-xs font-bold text-cyan-500">
                    E3:{" "}
                  </span>{" "}
                  <span className="text-xs">{camion.ox3}</span>
                  <span className="text-xs font-bold text-cyan-500">
                    E4:{" "}
                  </span>{" "}
                  <span className="text-xs">{camion.ox4}</span>
                  <span className="text-xs font-bold text-cyan-500">
                    E5:{" "}
                  </span>{" "}
                  <span className="text-xs">{camion.ox5}</span>
                  <span className="text-xs font-bold text-cyan-500">
                    E6:{" "}
                  </span>{" "}
                  <span className="text-xs">{camion.ox6}</span>
                  <span className="text-xs font-bold text-cyan-500">
                    E7:{" "}
                  </span>{" "}
                  <span className="text-xs">{camion.ox7}</span>
                  <span className="text-xs font-bold text-cyan-500">
                    E8:{" "}
                  </span>{" "}
                  <span className="text-xs">{camion.ox8}</span>
                  <span className="text-xs font-bold text-cyan-500">
                    E9:{" "}
                  </span>{" "}
                  <span className="text-xs">{camion.ox9}</span>
                  <span className="text-xs font-bold text-cyan-500">
                    T°:{" "}
                  </span>{" "}
                  <span className="text-xs">{camion.temp}</span>
                </div>
              </div>

            <div className="flex items-center space-x-2">
                <Tooltip title="Oxigenación">
                    <button
                        className={`rounded-lg ${camion.ox1 <= 0 ? "hidden" : ""}`}
                        onClick={() => {
                            handleClickOpen();
                            setInfo(camion)
                        }}
                    >
                        <AssignmentTwoToneIcon className="text-blue-400" />
                    </button>
                </Tooltip>
                <Tooltip title="Alertas T°">
                    <button
                        className="rounded-lg"
                        onClick={() => {
                            handleClickOpenAlerta();
                        }}
                    >
                        <ThermostatAutoTwoToneIcon className="text-red-500" />
                    </button>
                </Tooltip>

                <button
                    className="rounded-lg"
                    onClick={() => onCamionClick(camion)}
                >
                    <LocationOnIcon className="text-green-600" />
                </button>
            </div>
            </li>
          ))}
        </ul>
      </div>

      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <div className=" rounded-lg">
            <div className="">
            <div className="modal-body relative ">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Patente</p>
                        <p className="text-lg font-bold">{info.patente}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Oxígeno 1</p>
                        <p className="text-lg font-bold">{info.ox1}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Oxígeno 2</p>
                        <p className="text-lg font-bold">{info.ox2}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Oxígeno 3</p>
                        <p className="text-lg font-bold">{info.ox3}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Oxígeno 4</p>
                        <p className="text-lg font-bold">{info.ox4}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Oxígeno 5</p>
                        <p className="text-lg font-bold">{info.ox5}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Oxígeno 6</p>
                        <p className="text-lg font-bold">{info.ox6}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Oxígeno 7</p>
                        <p className="text-lg font-bold">{info.ox7}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Oxígeno 8</p>
                        <p className="text-lg font-bold">{info.ox8}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Oxígeno 9</p>
                        <p className="text-lg font-bold">{info.ox9}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Temperatura</p>
                        <p className="text-lg font-bold">{info.temp}</p>
                    </div>
                </div>
            </div>
            </div>
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
        maxWidth={"md"}
        open={openAlerta}
        onClose={handleCloseAlerta}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <div className=" rounded-lg">
            <div className="">
              <div className="modal-body relative ">Alerta</div>
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
  );
};

export default ListaCamiones;
