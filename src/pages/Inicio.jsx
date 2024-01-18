import React, { useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import { msgError } from "../components/Alertas";
import Home from "./Home";

import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import useAuth from "../hooks/useAuth";

const Inicio = () => {
  const { auth } = useAuth();
  const [id_empresa, setEmpresa] = useState(auth.id_empresa);
  const [empresasGlobales, setEmpresasGlobales] = useState([]);
  const [empresaSistema, setEmpresaSistema] = useState("");
  const [empresasSistema, setEmpresasSistema] = useState([]);
  const [id_transportista, setTransportista] = useState("");
  const [transportistas, setTransportistas] = useState([]);
  const [camionesSistema, setCamionesSistema] = useState([]);
  const [tokenExiste, setTokenExiste] = useState(false);
  const [usuario, setUsuario] = useState("");
  const [tokenBD, setTokenBD] = useState("");
  const [notActiva, setNotActiva] = useState({});
  const [notTemp, setNotTemp] = useState({});
  const [inicioToken, setInicioToken] = useState("");
  const [oxs, setOX] = useState([]);
  const [token1, setToken] = useState("");
  const [isLoading2, setIsLoading2] = useState(false);
  const [tiposNotificaciones, setTiposNotificacion] = useState([]);

  useEffect(() => { 569
    obtenerEmpresasGlobal();
    asignarToken();
    obtenerEmpresasSistema();
    obtenerResumenGPS();
  }, []);

  // Ejecutar la función cada 10 s
     useEffect(() => {
    const interval = setInterval(() => {
      obtenerResumenGPS();
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
    if (empresaSistema > 0 && id_transportista > 0) {
      obtenerValoresOX(1);
    }
  }, [id_transportista]);

  const obtenerTokenWialon = async () => {
    try {
      const token = localStorage.getItem("token_emsegur");

      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios("/general/token-wialon", config);

      return data;
    } catch (error) {
      console.log(error);
    }
  };

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

  const asignarToken = async () => {
    const tokenWialon = await obtenerTokenWialon();
    setTokenBD(tokenWialon.token);
    setInicioToken(tokenWialon.fec_add);
  };

  const obtenerValoresOX = async (sensor) => {
    try {
      const token = localStorage.getItem("token_emsegur");

      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(
        `/crud/not-activas/${id_empresa}/${id_transportista}/${empresaSistema}`,
        config
      );


      if (data.length === 0) {
        setNotActiva({});
        setNotTemp({});
      } else {
        setNotActiva(data.find((na) => na.id_cat_not === 1) ? data.find((na) => na.id_cat_not === 1) : {}); //sensor oxigeno

        setNotTemp(data.find((na) => na.id_cat_not === 2) ? data.find((na) => na.id_cat_not === 2) : {}); // sensor tempetaura
      }
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerResumenGPS = async () => {
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
      const { data } = await clienteAxios.get(`/general/resumenGPS`, config);

      setIsLoading2(false);
      setOX(data);

      // Oxigenacion, envir otro id para otro sensor
    } catch (error) {
      msgError(error.response.data.msg);
    }
  };

  useEffect(() => {
    if (empresaSistema > 0 && id_transportista > 0) {
      obtenerUnidadesSistema();
      obtenerTiposNotificaciones()
    }
  }, [id_transportista, empresaSistema]);

  
  const obtenerUnidadesSistema = async () => {
    const token = localStorage.getItem("token_emsegur");

    if (!token) return;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await clienteAxios(
      `/crud/obtener-camiones/${empresaSistema}/${id_empresa}`,
      config
    );

    if (id_transportista > 0) {
      const camionesTransportistas = data.filter(
        (r) => r.id_transportista == id_transportista
      );
      setCamionesSistema(camionesTransportistas);
    } else {
      setCamionesSistema(data);
    }
  };



  const obtenerTiposNotificaciones = async () => {
    try {
      const token = localStorage.getItem("token_emsegur");

      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(
        `/crud/obtener-tipo-notificacion/${empresaSistema}/${id_transportista}/${id_empresa}`,
        config
      );     


      setTiposNotificacion(data);

    } catch (error) {
      console.log(error);
    }
  };
  // Wialon site dns
  var dns = "https://hosting.wialon.com";

  // Main function
  function getToken() {
    // construct login page URL
    var url = dns + "/login.html"; // your site DNS + "/login.html"
    url += "?client_id=" + "App"; // your application name
    url += "&access_type=" + 0x100; // access level, 0x100 = "Online tracking only"
    url += "&activation_time=" + 0; // activation time, 0 = immediately; you can pass any UNIX time value
    url += "&duration=" + 604800; // duration, 604800 = one week in seconds
    url += "&flags=" + 0x1; // options, 0x1 = add username in response

    url += "&redirect_uri=" + dns + "/post_token.html"; // if login succeed - redirect to this page

    // listen message with token from login page window
    window.addEventListener("message", tokenRecieved);

    // finally, open login page in new window
    window.open(url, "_blank", "width=760, height=500, top=300, left=500");
  }

  // Help function
  function tokenRecieved(e) {
    var msg = e.data;
    if (typeof msg == "string" && msg.indexOf("access_token=") >= 0) {
      var token = msg.replace("access_token=", "");
      setToken(token);
      setTokenBD(token);

      wialon.core.Session.getInstance().initSession(
        "https://hst-api.wialon.com"
      );

      wialon.core.Session.getInstance().loginToken(token, "", function (code) {
        if (code) return;
        var user = wialon.core.Session.getInstance().getCurrUser().getName();
        setUsuario(user);
        // asignarToken()
        actualizarToken(user, token);
      });

      setTokenExiste(true);
    }
  }

  const actualizarToken = async (u, t) => {
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

      const { data } = await clienteAxios.put(
        `/general/token-wialon`,
        {
          usuario: u,
          token: t,
        },
        config
      );

      asignarToken();
    } catch (error) {
      msgError(error.response.data.msg);
    }
  };

  return (
    <>
      <div className="lg:flex items-center gap-2 mb-2">
        <div className=" lg:w-2/12">
          <h2 className="font-black  text-cyan-900 text-lg ">
            Tablero <span className="font-black text-cyan-500">Wialon</span>
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

          <div className="w-4/12">
            <FormControl fullWidth sx={{ m: 0, minWidth: 120 }} size="small">
              <InputLabel id="demo-simple-select-label">Empresa</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={empresaSistema}
                label="Empresa"
                size="small"
                onChange={(e) => {
                  setEmpresaSistema(e.target.value);
                  setTransportista("");
                }}
              >
                {empresasSistema.map((tipo) => (
                  <MenuItem key={tipo.id} value={tipo.id}>
                    {tipo.nom_empresa}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="w-4/12">
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
                    {tipo.nombre +
                      " " +
                      tipo.ape_paterno +
                      " " +
                      tipo.ape_materno}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          {/*   <div className="">
            <button
              id="todos"
              className="bg-cyan-600 hover:bg-cyan-800 transition cursor-pointer rounded  p-2 text-white font-bold  "
              value="todos"
              onClick={limpiarFormulario}
            >
              Todos
            </button>
          </div> */}
        </div>
      </div>

      {/*  <Home className="shadow-lg" id_transportista={id_transportista}  empresaSistema={empresaSistema} ventana={"Inicio"} camiones={oxs} setCamiones={setOX} notActiva={notActiva} notTemp={notTemp} />
       */}
      {id_transportista ? (
        <Home
          className="shadow-lg"
          id_transportista={id_transportista}
          empresaSistema={empresaSistema}
          ventana={"Inicio"}
          camiones={oxs.filter((camionSistema) =>
            camionesSistema.some(
              (dataItem) => dataItem.id_wialon === camionSistema.id_wialon
            )
          )}
          tiposNotificaciones={tiposNotificaciones}
          notActiva={notActiva}
          notTemp={notTemp}
        />
      ) : (
        <span className="flex mt-20 text-cyan-900 font-bold text-2xl justify-center">
          Seleccione Transportista
        </span>
      )}
    </>
  );
};

export default Inicio;
