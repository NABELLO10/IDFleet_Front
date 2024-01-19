import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import clienteAxios from "../../config/axios";
import { ToastContainer } from "react-toastify";
import { msgError, msgInfo} from "../../components/Alertas";
import TextField from "@mui/material/TextField";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes("")) {
      msgInfo("Campos Obligatorios");
      return;
    }

    try {
      const url = `/login`;
      const { data } = await clienteAxios.post(url, { email, password });
      localStorage.setItem("token_emsegur", data.token);
      setAuth(data);
      navigate("/admin");
    } catch (error) {
      msgError(error.response.data.msg);
    }
  };

  return (
    <div className="flex items-center justify-center  bg-cyan-950 h-screen  ">
      <div className="md:flex flex-col md:flex-row w-full 6xl:h-full  items-center  md:mt-0 md:bg-gray-900  rounded-lg lg:shadow-2xl overflow-hidden">
        {/* Lado izquierdo con la imagen */}
        <div className="md:w-1/2 items-center  justify-center  md:block hidden animate-pulse">
          <img
            className="object-cover w-7/12  mx-auto"
            src="logo.png"
          />
        </div>

        <div className="md:hidden block mb-6 md:mb-0 animate-pulse">
          <img
            className="object-cover px-10 w-full h-full mx-auto"
            src="logo.png"
          />
        </div>

        <ToastContainer />
        {/* Lado derecho con el formulario */}
        <div className="md:w-1/2 md:p-8 p-4 px-12 mx-auto flex items-center justify-center ">
          <div className="md:w-8/12 w-full">
            <h2
              className="md:text-4xl md:block hidden text-center font-semibold mb-4 text-cyan-200"
              style={{ fontFamily: "Rubik, sans-serif", fontWeight: 600 }}
            >
              Inicia sesión
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium  text-cyan-200"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="username"
                 
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-cyan-200"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-cyan-200"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-cyan-500"
                  placeholder="Contraseña"
                  
                />
              </div>
              <button
                type="submit"
                className="w-full bg-cyan-900 text-white font-semibold rounded-lg py-2 hover:bg-cyan-600 transition duration-100  "
              >
                Iniciar sesión
              </button>

              <Link
          className="block text-end my-2 text-cyan-600 text-sm hover:text-cyan-200 duration-200"
          to="/olvide-password"
        >
          Olvide mi contraseña
        </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
