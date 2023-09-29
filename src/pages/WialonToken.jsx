import React, { useState, useEffect } from "react";

import clienteAxios from "../config/axios";
import clipboardCopy from "clipboard-copy";
import ContentCopyTwoToneIcon from "@mui/icons-material/ContentCopyTwoTone";
import Tooltip from "@mui/material/Tooltip";
import { msgError, msgInfo, msgOk, msgWarning } from "../components/Alertas";

const WialonToken = () => {


  const [tokenExiste, setTokenExiste] = useState(false);
  const [usuario, setUsuario] = useState("");
  const [tokenBD, setTokenBD] = useState("");
  const [unidades, setUnidades] = useState([]);
  const [tControl, setTcontrol] = useState([]);
  const [oxs, setOX] = useState([]);
  const [token, setToken] = useState("");


  const obtenerTokenWialon = async () =>{
    try {
        const token = localStorage.getItem("token_emsegur")

        if(!token) return
  
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }                        
     
        const {data} = await clienteAxios('/general/token-wialon', config)          
        
        return(data.token)     

    } catch (error) {
        console.log(error)
    }
}   

const asignarToken = async () => {
  const tokenWialon = await obtenerTokenWialon();
  setTokenBD(tokenWialon);
}

  useEffect(() => {
    asignarToken()
  },[tokenExiste])


  const copyToClipboard = () => {
    const tokenElement = document.getElementById("token");
    if (tokenElement) {
      actualizarToken();

      const tokenText = tokenElement.innerText;
      clipboardCopy(tokenText)
        .then(() => {
          msgInfo("Token copiado al portapapeles");
        })
        .catch((error) => {
          console.error("Error al copiar al portapapeles:", error);
        });
    }   
  };


  const actualizarToken = async () => {
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
          usuario,
          token: tokenJs,
        },
        config
      );
    } catch (error) {
      msgError(error.response.data.msg);
    }
  };

  const ListarUnidadesPY = async () => {
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
      const { data } = await clienteAxios.get(
        `/general/listarUnidadesPY`,
        config
      );
  
      setUnidades(data)

    } catch (error) {
      msgError(error.response.data.msg);
    }
  };

  
  const DatosOxPy = async () => {
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
      const { data } = await clienteAxios.get(`/general/datosOx`, config); 
      console.log(data)
      setOX(data)

    } catch (error) {
      msgError(error.response.data.msg);
    }
  };
  
  const Tcontrol = async () => {
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
      const { data } = await clienteAxios.get(`/general/tControl`, config); 
      console.log(data)
      setTcontrol(data)

    } catch (error) {
      msgError(error.response.data.msg);
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
    // get message from login window
    var msg = e.data;
    if (typeof msg == "string" && msg.indexOf("access_token=") >= 0) {
      // get token
      var token = msg.replace("access_token=", "");
      setToken(token);
      // now we can use token, e.g show it on page
      document.getElementById("token").innerHTML = token;
      document.getElementById("login").setAttribute("disabled", "");
      //  document.getElementById("logout").removeAttribute("disabled");

      // or login to wialon using our token
      wialon.core.Session.getInstance().initSession(
        "https://hst-api.wialon.com"
      );

      wialon.core.Session.getInstance().loginToken(token, "", function (code) {
        if (code) return;
        var user = wialon.core.Session.getInstance().getCurrUser().getName();
        setUsuario(user);
      });

      setTokenExiste(true);
      // remove "message" event listener
      window.removeEventListener("message", tokenRecieved);
    }
  }

  return (
    <>
      <div className="lg:flex lg:justify-between">
        <h2 className="font-black text-cyan-900 text-2xl mx-4 ">
          Tablero{" "}
          <span className="font-black text-cyan-500 mb-10 text-center">
            Wialon
          </span>
        </h2>
        <div className="flex font-bold text-sm">
          {tokenBD ? tokenBD : token}
        </div>
      </div>

      <div className="lg:flex items-center lg:gap-3 ">
        <button
          id="login"
          className="bg-cyan-600 lg:mb-5 hover:bg-cyan-800 transition cursor-pointer w-full lg:w-2/12 rounded-lg p-1 text-white font-bold mt-5 "
          value="Nuevo Token"
          onClick={getToken}
        >
          Nuevo Token
        </button>

        <div>
          <span className=" text-cyan-800 lg:text-md  font-bold" id="token">
            {""}
          </span>
        </div>

        <div>
          <Tooltip title="Copiar al portapapeles">
            <button
              className={`bg-cyan-800 text-white rounded p-2 ${
                tokenExiste ? "block" : " hidden"
              } `}
              onClick={copyToClipboard}
            >
              <ContentCopyTwoToneIcon />
            </button>
          </Tooltip>
        </div>
      </div>

      <div className=" lg:flex lg:justify-between">
        <div className="w-2/12">
          <button
            id="login"
            className="bg-cyan-900 lg:mb-5 hover:bg-cyan-700 transition cursor-pointer w-full   p-1 text-white "
            value="Listar Unidades"
            onClick={ListarUnidadesPY}
          >
            Listar Unidades
          </button>
        </div>

        <div className="w-2/12">
          <button
            id="login"
            className="bg-cyan-900 lg:mb-5 hover:bg-cyan-700 transition cursor-pointer w-full   p-1 text-white "
            value="Oxigenacion"
            onClick={DatosOxPy}
          >
            Oxigenación
          </button>
        </div>
        <div className="w-2/12">
          <button
            id="login"
            className="bg-cyan-900 lg:mb-5 hover:bg-cyan-700 transition cursor-pointer w-full   p-1 text-white "
            value="Listar Unidades"
            onClick={Tcontrol}
          >
            Control token
          </button>
        </div>
      </div>

      <div className=" lg:flex lg:justify-between">
        <div className="w-2/12">
          <div className="max-w-md mx-auto overflow-auto bg-gray-800 p-5 rounded-xl shadow-md space-y-4">
            <h2 className="text-xl font-semibold text-center text-white">
              {unidades.length} Unidades
            </h2>
            <ul className="space-y-3">
              {unidades.map((r, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-100 rounded-md"
                >
                  <span className="text-lg font-medium text-gray-600">
                    {r.ID}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-2/12">
          <div className="bg-white shadow rounded-lg p-6 w-full mx-auto mt-6 max-w-md">
            <h2 className="text-xl font-semibold mb-4">Sensores</h2>
            <ul>
            {oxs.map((r, index) => (
                <div key={index}>
                  <li className="mb-2">
                    <strong>Patente: {r.Patente}</strong>{" "}
                  </li>
                  <li className="mb-2">
                    <strong>Velocidad:  {r.Velocidad}</strong> km/h
                  </li>                
                  <li className="mb-2">
                    <strong>Latitud:  {r.Latitud}</strong>{" "}
                  </li>
                  <li className="mb-2">
                    <strong>Longitud:  {r.Longitud}</strong>{" "}
                  </li>
                  <li className="mb-2">
                    <strong>Curso:  {r.Curso}</strong>{" "}
                  </li>
                  <li className="mb-2">
                    <strong>Altitud:  {r.Altitud}</strong>{" "}
                  </li>                  
                  <li className="mb-2">
                    <strong>Oxigenación:  {r.Oxigenacion}</strong>{" "}
                  </li>
                
                </div>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-2/12">
        <div className="bg-white shadow rounded-lg p-6 w-full mx-auto mt-6 max-w-md">
            <h2 className="text-xl font-semibold mb-4">Sensores</h2>
            <ul>
            {tControl.map((r, index) => (
                <div  key={index}>
                  <hr className="py-3"></hr>
                  <li className="mb-2">
                    <strong>Patente: {r.Patente}</strong>{" "}
                  </li>
                  <li className="mb-2">
                    <strong>Velocidad:  {r.Velocidad}</strong> km/h
                  </li>                
                  <li className="mb-2">
                    <strong>Latitud:  {r.Latitud}</strong>{" "}
                  </li>
                  <li className="mb-2">
                    <strong>Longitud:  {r.Longitud}</strong>{" "}
                  </li>
                  <li className="mb-2">
                    <strong>Curso:  {r.Curso}</strong>{" "}
                  </li>
                  <li className="mb-2">
                    <strong>Altitud:  {r.Altitud}</strong>{" "}
                  </li>                  
                 
                
                </div>
              ))}
            </ul>
          </div>
        
        </div>
      </div>
    </>
  );
};

export default WialonToken;
