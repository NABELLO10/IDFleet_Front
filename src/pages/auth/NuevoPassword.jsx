import { useState, useEffect  } from "react"
import { Link, useParams  } from "react-router-dom"
import { msgError, msgInfo, msgOk, msgWarning } from "../../components/Alertas";
import { ToastContainer } from 'react-toastify';
import clienteAxios from "../../config/axios";

const NuevoPassword = () => {
    const [password, setPassword] = useState('')
    const [passwordConfirmada, setPasswordConfirmada] = useState('')
    const [tokenValido, setTokenValido] = useState(false)
    const [passwordModificado, setPasswordModificado] = useState(false)
    
    const params = useParams()
    const { token } = params
  
      useEffect(() => {
        const comprobarToken = async () => {
          try {  
            await clienteAxios.get(`/olvide-password/${token}`)          
            setTokenValido(true)         
            
          } catch (error) {         
            msgError("Hubo un error con el enlace")
          }        
        }
  
        comprobarToken()
      }, [])
  
      
      const crearPassword = async (e) => {
          e.preventDefault()
  
          if(password !== passwordConfirmada){         
            msgError("Contraseñas no coinciden")
            return
          }    
          
          if(password.length < 6){         
            msgError("El password es muy corto, minimo 6 caracteres")
            return
          }
  
          try {
  
            const {data} = await clienteAxios.post(`/olvide-password/${token}`, { password })                      
            msgOk(data.msg)  
            setPasswordModificado(true)      
            
          } catch (error) {
            msgError(error.response.data.msg);
          }          
      }   
  
  return (
    <div>
      <ToastContainer />
      {tokenValido && (
        <>
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

              {/* Lado derecho con el formulario */}
              <div className="md:w-1/2 md:p-8 p-4 md:px-12 mx-auto flex items-center justify-center">
                <div className="md:w-8/12 w-full">
                  <h2
                    className="md:text-4xl md:block hidden text-center font-semibold mb-4 text-cyan-200"
                    style={{ fontFamily: "Rubik, sans-serif", fontWeight: 600 }}
                  >
                    Restablecer Contraseña
                  </h2>

                  {!passwordModificado && (
                    <form onSubmit={crearPassword}>
                      <div className="mb-4">
                        <label
                          htmlFor="password"
                          className="block mb-2 text-sm font-medium text-cyan-200"
                        >
                          Nueva Contraseña
                        </label>
                        <input
                          type="password"
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-cyan-500"
                          placeholder="Nueva Contraseña"
                        />
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="password"
                          className="block mb-2 text-sm font-medium text-cyan-200"
                        >
                          Confirmar Contraseña
                        </label>
                        <input
                          type="password"
                          id="passwordConfirmada"
                          value={passwordConfirmada}
                          onChange={(e) =>
                            setPasswordConfirmada(e.target.value)
                          }
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-cyan-500"
                          placeholder="Confirmar Contraseña"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-cyan-900 text-white font-semibold rounded-lg py-2 hover:bg-cyan-600 transition duration-300"
                      >
                        Guardar Contraseña
                      </button>
                    </form>
                  )}

                  {passwordModificado && (
                    <Link
                      className="block text-center my-5 text-2xl py-2  bg-cyan-900 rounded-xl text-white hover:bg-cyan-600 transition duration-300"
                      to="/"
                    >
                      Inicia Sesión
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>

     
        </>
      )}
    </div>
  );
}

export default NuevoPassword