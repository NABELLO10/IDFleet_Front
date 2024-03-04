import { useEffect, useState } from "react";
import { msgError, msgOk } from "../../components/Alertas";
import clienteAxios from "../../config/axios";
import useAuth from "../../hooks/useAuth";
import { format } from "date-fns";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Descargar from "../../components/datos/Descargar"
import Autocomplete from "@mui/material/Autocomplete";
import TablePagination from '@mui/material/TablePagination';
import AssignmentIndTwoToneIcon from '@mui/icons-material/AssignmentIndTwoTone';
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import { styled } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";

const Camiones = () => {
  const { auth } = useAuth();  
  const [id_empresa, setEmpresa] = useState(auth.id_empresa);
  const [empresasListado, setEmpresasListado] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [unidadesWialon, setUnidadesWialon] = useState([]);
  const [unidad, setUnidad] = useState(0);
  const [empresaSistema, setEmpresaSistema] = useState("");

  const [transportistas, setTransportistas] = useState([]);
  const [id_transportista, setTransportista] = useState("");
  
  const [conductores, setConductores] = useState([]);
  const [id_conductor, setConductor] = useState("");

  const [arrastres, setArrastres] = useState([]);
  const [arrastre, setArrastre] = useState("");


  const [estado, setEstado] = useState(1);
  const [est_ox, setEstadoOx] = useState(0);
  const [est_temp, setEstadoTemp] = useState(0);
  const [nom_patente, setPatente] = useState("");
  const [fec_rev_tecnica, setFecRev] = useState(format(new Date(), "yyyy-MM-dd"));
  const [fec_per_circulacion, setPermiso] = useState(format(new Date(), "yyyy-MM-dd"));
  const [fec_seguro, setSeguro] = useState(format(new Date(), "yyyy-MM-dd"));

  const [busqueda, setBusqueda] = useState("");
  const [id, setID] = useState(null);

  //Lista de Camiones registrados
  const [camiones, setCamiones] = useState([]);
  const theme = useTheme();

 // PAGINACION TABLA ////////////////////////////////////////////////////////////////
 const [page, setPage] = useState(0);
 const [rowsPerPage, setRowsPerPage] = useState(10);

 const handleChangePage = (event, newPage) => {
   setPage(newPage);
 };

 const handleChangeRowsPerPage = (event) => {
   setRowsPerPage(parseInt(event.target.value, 10));
   setPage(0);
 };

 const filtered = camiones.filter((val) => {
   if (busqueda === "") return true;

   return (
    val.nom_patente
    .toLowerCase()
    .includes(busqueda.toLowerCase()) ||
  val.mae_transportista.nombre
    .toLowerCase()
    .includes(busqueda.toLowerCase()) ||
  val.mae_transportista.ape_paterno
    .toLowerCase()
    .includes(busqueda.toLowerCase())
   );
 });

 const paginatedCamiones = filtered.slice(
   page * rowsPerPage,
   page * rowsPerPage + rowsPerPage
 );

 /////////////////////////////////////////////////////////////////////////////////////
  //PARA EDICION de un edit

  const [edit, setEdit] = useState({});

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {      
    obtenerEmpresas()     
 }, [id_empresa]);

 
 useEffect(() => {      
  if(empresaSistema > 0 && id_transportista > 0) {
    obtenerArrastres(id_transportista)
  }
 }, [empresaSistema, id_transportista]);

  useEffect(() => {   
     obtenerEmpresasListado()
     obtenerEmpresas()   
     obtenerUnidadesWialon()
  }, []);

  useEffect(() => {  
    if(empresaSistema){
      obtenerCamiones()  
      obtenerTransportistas()
      obtenerConductores()

    }
  }, [empresaSistema, id_empresa]);


  function invertirFecha(fecha) {
    return fecha.split('-').reverse().join('-');
}


  const obtenerEmpresasListado = async () =>{   
        const token = localStorage.getItem("token_emsegur")

        if(!token) return
  
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }                        
     
        const {data} = await clienteAxios('/crud/obtener-empresas', config)           
        setEmpresasListado(data) 
}   

  const obtenerEmpresas = async () =>{
        const token = localStorage.getItem("token_emsegur")

        if(!token) return
  
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }                        
     
        const {data} = await clienteAxios(`/crud/obtener-empresas-sistema/${id_empresa}`, config)           
        setEmpresas(data)
}   

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


const obtenerUnidadesWialon = async () => {
  const token = localStorage.getItem("token_emsegur");

  if (!token) return;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await clienteAxios(
    `/crud/unidades-wialon`,
    config
  );
  setUnidadesWialon(data);
};

const obtenerCamiones = async () => {
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
    
      setCamiones(data);      
  };

  const obtenerArrastres = async (transportista) => {
      const token = localStorage.getItem("token_emsegur");

      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(
        `/crud/obtener-todosarrastres/${empresaSistema}`,
        config
      );  

      const arrastres = data.filter((r) => r.id_transportista == transportista)

      setArrastres(arrastres);      
  };
  

  const limpiarFormulario = () => {
    setPatente("");   
    setArrastre("");   
    setUnidad("")   
    setEdit({});
    setID(null);    
    setEstado(1)  
    setEstadoOx(0)  
    setEstadoTemp(0)  
    handleClose()
   /*  obtenerTransportistas()
    obtenerArrastres() */
    obtenerCamiones()
  };

  const setEdicion = (edit) => {
    setEdit(edit);
    setPatente(edit.nom_patente);  
    setUnidad(edit.id_wialon)
    setArrastre(edit.id_arrastre);  
    setTransportista(edit.id_transportista)
    setEmpresaSistema(edit.id_empresa);
    setFecRev(edit.fec_rev_tecnica);
    setSeguro(edit.fec_seguro);
    setPermiso(edit.fec_per_circulacion);
    setEstado(edit.est_activo)
    setEstadoOx(edit.est_ox)
    setEstadoTemp(edit.est_temp)
    setID(edit.id);
    setConductor(edit.id_conductor)
  };
 
  const eliminarCamion = async (id) => {
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

      const { data } = await clienteAxios.delete(
        `crud/camion/${id}`,
        config
      );

      msgOk(data.msg);
      limpiarFormulario();
    } catch (error) {
      console.log(error);
    }
  };

  const registrar = async () => {

    if ([id_transportista, nom_patente, arrastre, id_conductor].includes("")) {
      msgError("Ingrese transportista, patente, arrastre y conductor");
      return;
    }

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
     
    try {
      if (edit.id) {
        const { data } = await clienteAxios.put(
          `/crud/camion/${edit.id}`,
          {
            id_transportista,
            id_arrastre: arrastre,
            nom_patente,
            fec_rev_tecnica,
            fec_per_circulacion,
            id_conductor,
            fec_seguro,
            est_activo: estado,
            id_empresa: empresaSistema,
            id_wialon: unidad ? unidad : 0,
            est_ox,
            est_temp,
          },
          config
        );
        msgOk(data.msg);
      } else {
        const { data } = await clienteAxios.post(
          "/crud/camion",
          {
            id_transportista,
            id_arrastre: arrastre,
            nom_patente,
            fec_rev_tecnica,
            fec_per_circulacion,
            fec_seguro,
            id_conductor,
            est_activo: estado,
            id_empresa: empresaSistema,
            id_empresa_global: id_empresa,
            est_asignado: 0,
            id_wialon: unidad ? unidad : 0,
            est_ox,
            est_temp
          },
          config
        );
        msgOk(data.msg);
      }

      limpiarFormulario();
    } catch (error) {
      msgError(error.response.data.msg);
    }
 
  };

  const obtenerConductores = async () => {
    const token = localStorage.getItem("token_emsegur");

    if (!token) return;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await clienteAxios(
      `/crud/obtener-conductores/${empresaSistema}/${id_empresa}`,
      config
    );
    setConductores(data);
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registrar();
  };


  const handleChange = (event, newValue) => {
    setUnidad(newValue ? newValue.id_wialon : null);
    setPatente(newValue ? newValue.nm : "");
  };

  const handleChangeConductor = (event, newValue) => {
    setConductor(newValue ? newValue.id : null);
  };

  const handlePatenteChange = (event) => {
    // Eliminar guiones y puntos del valor ingresado
    const valorFiltrado = event.target.value.replace(/[-.]/g, '').toUpperCase();
    setPatente(valorFiltrado);
  };


  
  const StickyTableCell = styled(TableCell)(({ theme }) => ({
    position: "sticky",
    top: 0,
    zIndex: 1,
    backgroundColor: "#1b3242",
    color: "white", // para asegurarte de que el fondo no sea transparente
  }));

  return (
    <>
      <h2 className="font-black text-cyan-900 text-2xl mx-4 ">
        Registrar{" "}
        <span className="font-black text-cyan-500 mb-10 text-center">
          Unidades
        </span>
      </h2>

      <div className="grid-cols-2 lg:flex mt-4 lg:gap-4">
        <div className="shadow-lg  lg:mx-auto lg:w-4/12 px-3 lg:py-5 rounded-xl bg-white">
          <form className="space-y-4 " onSubmit={handleSubmit}>
            {auth.id == 2 && (
              <div className="">
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
                  {empresasListado.map((empresa) => (
                    <option key={empresa.id} value={empresa.id}>
                      {empresa.nom_empresa}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="lg:flex gap-3 space-y-4 lg:space-y-0">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Empresa</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={empresaSistema}
                  label="Empresa"
                  onChange={(e) => setEmpresaSistema(e.target.value)}
                >
                  {empresas.map((tipo) => (
                    <MenuItem key={tipo.id} value={tipo.id}>
                      {tipo.nom_empresa}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div className="w-full">
                <FormControl fullWidth>
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

            <div className="lg:flex gap-3 space-y-4 lg:space-y-0">
            <div className="lg:w-8/12  w-full">
                <Autocomplete
                  options={unidadesWialon}
                  getOptionLabel={(option) =>
                    option.nm + " / " + option.id_wialon
                  }
                  value={
                    unidadesWialon.find((r) => r.id_wialon === unidad) || null
                  } // Asegura un valor controlado
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Unidad wialon"
                      variant="outlined"
                    />
                  )}
                  onChange={handleChange}
                />
              </div>

              <div className="lg:w-4/12 w-full">
                <TextField
                  id="nom_patente"
                  className="peer pt-3 pb-2 block"
                  value={nom_patente}
                  onChange={(e) => setPatente(e.target.value)}
                  label="Patente"
                  inputProps={{ maxLength: 7 }}
                  variant="outlined"
                />
              </div>
             

            </div>
            <div className="lg:flex gap-3 justify-center space-y-4 lg:space-y-0">
              <FormControlLabel
                id="est_activo"
                control={<Checkbox checked={estado === 1} />}
                onChange={(e) => setEstado(e.target.checked ? 1 : 0)}
                label="Activo"
              />

              <FormControlLabel
                id="est_ox"
                control={<Checkbox checked={est_ox === 1} />}
                onChange={(e) => setEstadoOx(e.target.checked ? 1 : 0)}
                label="OX"
              />

              <FormControlLabel
                id="est_temp"
                control={<Checkbox checked={est_temp === 1} />}
                onChange={(e) => setEstadoTemp(e.target.checked ? 1 : 0)}
                label="T°"
              />
            </div>

            <div className="lg:flex gap-3 space-y-4 lg:space-y-0">
              <div className="w-full">
                <Autocomplete
                  options={conductores}
                  getOptionLabel={(option) =>
                    option.nombre + " " + option.ape_paterno
                  }
                  value={conductores.find((r) => r.id === id_conductor) || null} // Asegura un valor controlado
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Conductor"
                      variant="outlined"
                    />
                  )}
                  onChange={handleChangeConductor}
                />
              </div>
            </div>

            <div className="lg:flex lg:gap-3 lg:space-y-0">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Arrastre</InputLabel>
                <Select
                  labelId="arrastres"
                  id="arrastres"
                  value={arrastre}
                  label="Arrastre"
                  onChange={(e) => setArrastre(e.target.value)}
                >
                  {arrastres.map((tipo) => (
                    <MenuItem key={tipo.id} value={tipo.id}>
                      {tipo.nom_patente +
                        " / " +
                        tipo.mae_transportista.nombre +
                        " " +
                        tipo.mae_transportista.ape_paterno}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div className="lg:flex gap-3 space-y-4 lg:space-y-0">
              <TextField
                id="fec_rev_tecnica"
                className="peer pt-3 pb-2 block w-full"
                value={fec_rev_tecnica}
                onChange={(e) => setFecRev(e.target.value)}
                label="Rev. Tecnica"
                type="date"
                variant="outlined"
                inputProps={{ maxLength: 10 }}
              />

              <TextField
                id="fec_per_circulacion"
                className="peer pt-3 pb-2 block w-full"
                value={fec_per_circulacion}
                onChange={(e) => setPermiso(e.target.value)}
                label="Permiso Circulación"
                type="date"
                variant="outlined"
              />
              <TextField
                id="fec_seguro"
                className="peer pt-3 pb-2 block w-full"
                value={fec_seguro}
                onChange={(e) => setSeguro(e.target.value)}
                label="Seguro"
                type="date"
                variant="outlined"
              />
            </div>

            <div className="flex gap-2 ">
              <input
                type="submit"
                value={edit.id ? "Actualizar" : "Registrar"}
                className="bg-cyan-600 w-full  hover:bg-cyan-900 duration-500 py-3 rounded-md text-white uppercase font-bold mt-2 hover:cursor-pointer px-10"
              ></input>

              <button
                type="button"
                onClick={limpiarFormulario}
                className={`bg-gray-600  hover:bg-gray-700 duration-500 w-full  py-3 rounded-md text-white uppercase font-bold mt-2 hover:cursor-pointer px-10 `}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>

        <div className=" rounded-lg lg:mx-auto   md:w-full  lg:w-8/12 mt-5 lg:mt-0">
          <div className="flex gap-4 mb-2 ">
            <input
              name="busqueda"
              id="busqueda"
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full lg:w-7/12 border shadow px-1 text-sky-500"
              placeholder="Buscar Camión..."
            />

            <Descargar data={camiones} nombrePdf={"Camiones"} item={1} />
          </div>

          <TableContainer
            className="bg-white"
            style={{ maxHeight: 580, overflowY: "auto" }}
          >
            <Table className="min-w-full">
              <TableHead>
                <TableRow>
                  <StickyTableCell
                    style={{
                      fontWeight: theme.typography.fontWeightBold,
                    }}
                  >
                    Patente
                  </StickyTableCell>
                  <StickyTableCell
                    style={{
                      fontWeight: theme.typography.fontWeightBold,
                    }}
                  >
                    Wialon
                  </StickyTableCell>
                  <StickyTableCell
                    style={{
                      fontWeight: theme.typography.fontWeightBold,
                    }}
                  >
                    Información
                  </StickyTableCell>
                  <StickyTableCell
                    style={{
                      fontWeight: theme.typography.fontWeightBold,
                    }}
                  >
                    Documentos
                  </StickyTableCell>

                  <StickyTableCell
                    style={{
                      fontWeight: theme.typography.fontWeightBold,
                    }}
                  >
              
                  </StickyTableCell>
               
                </TableRow>
              </TableHead>

              <TableBody>
                {filtered
                  .filter((val) => id_transportista == val.id_transportista)
                  .map((r) => (
                    <TableRow key={r.id}>
                      <TableCell style={{ borderBottom: "1px solid #FFFFFF" }}>
                        <div className=" flex flex-col ">
                          <div>
                            {r.nom_patente}
                          </div>

                         
                          <div className="flex gap-2 font-bold text-blue-700 mx-2">
                            <p className={`${r.est_ox == 1 ? "block" : "hidden"}`}>OX</p>
                            <p className={`${r.est_temp == 1 ? "block" : "hidden"}`}>T°</p>
                          </div>
                          <div className="">
                            {" "}
                            {r.est_activo ? (
                              <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                                <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                                Activo
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
                                <span className="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                                Inactivo
                              </span>
                            )}
                          </div>

                        </div>
                      </TableCell>

                      <TableCell style={{ borderBottom: "1px solid #FFFFFF" }}>
                        {unidadesWialon
                          .filter((u) => u.id_wialon == r.id_wialon)
                          .map((r) => (
                            <div className="font-bold">
                              <p>ID: {r.id_wialon}</p>
                              <p>NM: {r.nm}</p>
                            </div>
                          ))}
                      </TableCell>

                      <TableCell style={{ borderBottom: "1px solid #FFFFFF" }}>
                        <div>
                          {"Transportista: " +
                            r.mae_transportista.nombre +
                            " " +
                            r.mae_transportista.ape_paterno}
                        </div>
                        <div>
                          {"Empresa: " + r.mae_empresas_sistema.nom_empresa}
                        </div>
                        {r.mae_conductore && (
                          <div className="font-semibold text-xs flex items-center text-cyan-700">
                            <AssignmentIndTwoToneIcon />
                            {r.mae_conductore.nombre +
                              " " +
                              r.mae_conductore.ape_paterno}
                          </div>
                        )}
                      </TableCell>

                      <TableCell style={{ borderBottom: "1px solid #FFFFFF" }}>
                        <p>RT: {invertirFecha(r.fec_rev_tecnica)}</p>
                        <p>SEG: {invertirFecha(r.fec_seguro)}</p>
                        <p>PC: {invertirFecha(r.fec_per_circulacion)}</p>
                      </TableCell>
                

                      <TableCell style={{ borderBottom: "1px solid #FFFFFF" }}>
                        <div className="flex">
                          <Tooltip title="Editar">
                            <button
                              type="button"
                              onClick={() => setEdicion(r)}
                              className="py-1 mx-2"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 text-blue-400 hover:text-blue-800"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                            </button>
                          </Tooltip>

                          <Tooltip title="Eliminar">
                            <button
                              className="py-1 "
                              onClick={() => {
                                setID(edit.id);
                                setEdicion(r);
                                handleClickOpen();
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 text-red-500 hover:text-red-800"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </Tooltip>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
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
          <div className="p-0.5 rounded-lg">
            <div className="">
              <div className="modal-body relative p-4">
                <p>¿Realmente desea el camion: {edit.nom_patente}?</p>
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
          <button
            type="button"
            onClick={() => eliminarCamion(id)}
            className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
          >
            Eliminar
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Camiones;
