import { useState } from "react"
import { Link } from "react-router-dom"
import { msgError, msgInfo, msgOk, msgWarning } from "../../components/Alertas";
import { ToastContainer } from 'react-toastify';
import clienteAxios from "../../config/axios";

const OlvidePassword = () => {

    const [email, setEmail]  = useState('')

    const handleSubmit = async (e) =>{
        e.preventDefault()
        
        if([email].includes('')){             
            msgInfo("Ingrese Email")        
            return
        }
      
        try {         
            const {data} = await clienteAxios.post('olvide-password', {email})
            msgInfo(data.msg)
            
        } catch (error) {     
            msgError(error.response.data.msg)           
        }      
    }



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
        <div className="md:w-1/2 md:p-8 p-4 px-12 mx-auto flex items-center justify-center">
          <div className="md:w-8/12 w-full">
            <h2
              className="md:text-4xl md:block hidden text-center font-semibold mb-4 text-cyan-200"
              style={{ fontFamily: "Rubik, sans-serif", fontWeight: 600 }}
            >
              Recuperar Contraseña
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
                 
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-cyan-500"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  
                />
              </div>
            
              <button
                type="submit"
                className="w-full bg-cyan-900 text-white font-semibold rounded-lg py-2 hover:bg-cyan-600 transition duration-300"
              >
                Recuperar Contraseña
              </button>

           
              <Link
          className="block text-end my-2 text-cyan-600 text-sm hover:text-cyan-200 duration-200"
          to="/"
        >
          Iniciar Sesión
        </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OlvidePassword