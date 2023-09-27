import React, { useState } from "react";
import clipboardCopy from "clipboard-copy";
import ContentCopyTwoToneIcon from "@mui/icons-material/ContentCopyTwoTone";
import Tooltip from "@mui/material/Tooltip";
import { msgError, msgInfo, msgOk, msgWarning } from "../components/Alertas";

const WialonToken = () => {
  const [tokenExiste, setTokenExiste] = useState(true);

  const copyToClipboard = () => {
    const tokenElement = document.getElementById("token");
    if (tokenElement) {
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
      // now we can use token, e.g show it on page
      document.getElementById("token").innerHTML = token;
      document.getElementById("login").setAttribute("disabled", "");
      document.getElementById("logout").removeAttribute("disabled");

      // or login to wialon using our token
      wialon.core.Session.getInstance().initSession(
        "https://hst-api.wialon.com"
      );

      wialon.core.Session.getInstance().loginToken(token, "", function (code) {
        if (code) return;
        var user = wialon.core.Session.getInstance().getCurrUser().getName();
        alert("Authorized as " + user);
      });
      setTokenExiste(true);
      // remove "message" event listener
      window.removeEventListener("message", tokenRecieved);
    }
  }

  function logout() {
    var sess = wialon.core.Session.getInstance();
    if (sess && sess.getId()) {
      sess.logout(function () {
        document.getElementById("logout").setAttribute("disabled", "");
        document.getElementById("login").removeAttribute("disabled");
      });
    }
  }

  return (
    <>
      <h2 className="font-black text-cyan-900 text-2xl mx-4 ">
        Obtener{" "}
        <span className="font-black text-cyan-500 mb-10 text-center">
          Token Wialon
        </span>
        
      </h2>
      

      <div className="lg:flex lg:justify-between">
        <button
          id="login"
          className="bg-cyan-600 lg:mb-5 hover:bg-cyan-800 transition cursor-pointer py-3 w-full lg:w-3/12 rounded-lg p-3 px-10 text-white font-bold mt-5 "
          value="Click to open login page"
          onClick={getToken}
        >
          Obtener Token
        </button>
       

        {/* <button
          id="logout"
          disabled
          className="bg-gray-600 mb-5 hover:bg-gray-800 transition cursor-pointer py-3 w-full  lg:w-3/12 rounded-lg p-3 px-10 text-white font-bold mt-5 "
          onClick={logout}
        >
          Salir
        </button> */}
      </div>

      
        <>
          <div className="flex flex-col lg:w-12/12 gap-3 lg:mt-5">
            <div className="flex gap-2">
              <span className="text-3xl font-bold">Tu token</span>
              <Tooltip title="Copiar al portapapeles">
                <button
                  className="bg-cyan-800 text-white rounded p-2 "
                  onClick={copyToClipboard}
                >
                  <ContentCopyTwoToneIcon />
                </button>
              </Tooltip>
            </div>

            <span className=" text-cyan-700 lg:text-xl  font-bold" id="token">
              {" "}
            </span>
          </div>

          <div className="flex flex-wrap lg:justify-center"></div>
        </>
  
    </>
  );
};

export default WialonToken;
