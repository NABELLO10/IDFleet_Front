import React, { useState, useEffect } from "react";
import clienteAxios from "../../config/axios";
import { msgError} from "../../components/Alertas";
import Home from "../Home";

import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import useAuth from "../../hooks/useAuth";

const TableroTablet = () => {
  const { auth } = useAuth();
  const [id_empresa, setEmpresa] = useState(auth.id_empresa);
  const [empresasGlobales, setEmpresasGlobales] = useState([]);
  const [empresaSistema, setEmpresaSistema] = useState("");
  const [empresasSistema, setEmpresasSistema] = useState([]);
  const [id_transportista, setTransportista] = useState("");
  const [transportistas, setTransportistas] = useState([]);

  
  const [notActiva, setNotActiva] = useState({});
  const [notTemp, setNotTemp] = useState({});

  const [oxs, setOX] = useState([]);
  const [isLoading2, setIsLoading2] = useState(false);
 

  useEffect(() => {
    obtenerEmpresasGlobal();
    obtenerEmpresasSistema();
    obtenerDatosTablet()
   // obtenerResumenGPS();    
  }, []);

  
  // Ejecutar la función cada 10 s
  useEffect(() => {
    const interval = setInterval(() => {
        obtenerDatosTablet();
    }, 10000);

    return () => clearInterval(interval);
  }, []);     



  useEffect(() => {
    obtenerEmpresasSistema();
  }, [id_empresa]);

  useEffect(() => {
    if (empresaSistema > 0) {
      obtenerTransportistas();
    }   
  }, [empresaSistema, id_empresa]);

  
  useEffect(() => {
    if (empresaSistema > 0 &&  id_transportista > 0) {
      obtenerValoresOX(1);
    }
  }, [id_transportista]);


  const obtenerEmpresasGlobal = async () => {
    const token = localStorage.getItem("token_emsegur");

    if (!token) return;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await clienteAxios("/crud/obtener-empresas", config);
    setEmpresasGlobales(data);
  };

  const obtenerTransportistas = async () => {
    const token = localStorage.getItem("token_emsegur");

    if (!token) return;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await clienteAxios(
      `/crud/obtener-transportistas/${empresaSistema}/${id_empresa}`,
      config
    );
    setTransportistas(data);
  };

  const obtenerEmpresasSistema = async () => {
    const token = localStorage.getItem("token_emsegur");

    if (!token) return;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await clienteAxios(
      `/crud/obtener-empresas-sistema/${id_empresa}`,
      config
    );
    setEmpresasSistema(data);
  };



  const obtenerDatosTablet = async () => {
    setIsLoading2(true);
    try {
      const token = localStorage.getItem("token_emsegur");

      if (!token) {
        msgError("Token no valido");
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.get(`/general/datos-school`, config);

      setIsLoading2(false);
      setOX(data);
      console.log(data)

       // Oxigenacion, envir otro id para otro sensor

    } catch (error) {
      msgError(error.response.data.msg);
    }
  };



  const limpiarFormulario = () =>{
    setEmpresaSistema("")
    setTransportista("")
  //  obtenerResumenGPS();   
  obtenerDatosTablet()
  }



  

  return (
    <>
      <div className="lg:flex items-center gap-2 mb-2">
        <div className=" lg:w-2/12">
          <h2 className="font-black  text-cyan-900 text-lg ">
            Tablero{" "}
            <span className="font-black text-cyan-500">
              Tablet
            </span>
          </h2>
        </div>

        <div className="flex w-full justify-end gap-2">
          {auth.id == 1 && (
            <div className="lg:w-10/12">
              <label
                htmlFor="empresa"
                className="peer-placeholder-shown:uppercase absolute left-0 -top-3.5 text-gray-900 text-sm
                                peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 transition-all peer-placeholder-shown:top-3"
              ></label>

              <select
                name="empresa"
                value={id_empresa}
                className={`mt-2 w-full p-2 bg-gray-50 border uppercase border-gray-300 rounded-lg text-center text font-bold text-gray-500 `}
                onChange={(e) => setEmpresa(+e.target.value)}
              >
                <option value={""} disabled hidden>
                  Seleccionar...
                </option>
                {empresasGlobales.map((empresa) => (
                  <option key={empresa.id} value={empresa.id}>
                    {empresa.nom_empresa}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="w-2/12">
          <FormControl fullWidth sx={{ m: 0, minWidth: 120 }} size="small">
              <InputLabel id="demo-simple-select-label">Empresa</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={empresaSistema}
                label="Empresa"
                size="small"
                onChange={(e) => setEmpresaSistema(e.target.value)}
              >
                {empresasSistema.map((tipo) => (
                  <MenuItem key={tipo.id} value={tipo.id}>
                    {tipo.nom_empresa}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="w-2/12">
          <FormControl fullWidth sx={{ m: 0, minWidth: 120 }} size="small">
              <InputLabel id="demo-simple-select-label">
                Transportista
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={id_transportista}
                label="Transportista"
              
                onChange={(e) => setTransportista(e.target.value)}
              >
                {transportistas.map((tipo) => (
                  <MenuItem key={tipo.id} value={tipo.id}>
                    {tipo.nombre + " " + tipo.ape_paterno}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="">
            <button
              id="todos"
              className="bg-cyan-600 hover:bg-cyan-800 transition cursor-pointer rounded  p-2 text-white font-bold  "
              value="todos"
              onClick={limpiarFormulario}
            >
              Todos
            </button>
          </div>
        </div>
        
      </div>
      <Home className="shadow-lg" camiones={oxs} notActiva={notActiva} notTemp={notTemp} />
    </>
  );
};

export default TableroTablet;
