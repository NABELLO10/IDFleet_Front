// Importaciones necesarias
import React, { useState, useMemo, useEffect  } from 'react';
import { Line,  Bar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { msgError } from "../Alertas"
import clienteAxios from "../../config/axios";
import { format } from "date-fns";
import TextField from "@mui/material/TextField";
import RptOx from '../reports/RptOX';
import RptTemp from '../reports/RptTemp';
import RptAlertas from '../reports/RptAlertas';
import moment from 'moment-timezone';

// Registro de componentes necesarios para Chart.js
ChartJS.register(...registerables);

// Componente de React
const GraficoGral = ({camionSeleccionado, handleClickOpenAlerta}) => {
  const [selectedPatent, setSelectedPatent] = useState(camionSeleccionado.patente);
  const [desde, setDesde] = useState(format(new Date(), "yyyy-MM-dd"));
  const [hasta, setHasta] = useState(format(new Date(), "yyyy-MM-dd"));
  
  const [datosOX, setDatosOx] = useState([]);
  const [log, setLog] = useState([]);

  useEffect(() => {
    DatosOx()    
    obtenerLog()
    setSelectedPatent(camionSeleccionado.patente)    
  },[camionSeleccionado, desde, hasta])

  
  const DatosOx = async () => {
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
      const { data } = await clienteAxios.get(`/general/datos-ox-fechas/${camionSeleccionado.patente}/${desde}/${hasta}`, config);
      setDatosOx(data);
   
    } catch (error) {
      msgError(error.response.data.msg);
    } 
  };

  const obtenerLog = async () => {
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
       const { data } = await clienteAxios.get(`/general/obtenerLog/${selectedPatent}/${desde}/${hasta}`, config);  
      
       setLog(data);
    
      } catch (error) {
       msgError(error.response.data.msg);
     } 
   };

   
  const alertsCountByDate = useMemo(() => {
    const counts = {};
  
    // Asumimos que cada elemento en `log` es una alerta.
    log.forEach(item => {
      // Usamos la fecha de registro como clave para contar las alertas.
      const date = item.fechaRegistro // Ajusta esto según el formato exacto de tu fecha.
      if (!counts[date]) {
        counts[date] = 0;
      }
      counts[date] += 1; // Sumamos 1 por cada alerta.
    });
        
    // Convertimos el objeto en un array de objetos para usarlo en el gráfico.
    return Object.entries(counts).map(([date, count]) => ({
      fechaRegistro: date,
      numAlertas: count
    }));
 
  }, [log]);


  const alertBarChartData = {
    labels: alertsCountByDate.map(data => data.fechaRegistro),
    datasets: [
      {
        label: 'Alertas por día',
        data: alertsCountByDate.map(data =>  data.numAlertas),
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      },
    ]
  };
  
  const filteredData = datosOX.filter((data) => {
    if (selectedPatent && data.patente !== selectedPatent) {
      return false;
    }
    const date = new Date(data.fec_gps);
    if (desde && date < new Date(desde)) {
      return false;
    }
    if (hasta && date > new Date(hasta)) {
      return false;
    }
    return true;
  });
  
  // Configuración del gráfico de líneas
  const lineChartData = {
    labels: filteredData.map(data => data.fechaRegistro),
    datasets: [
      {
        label: 'OX1',
        data: filteredData.map(data => data.ox1),
        fill: false,
        borderColor: 'gray',
        tension: 0.2,    
      },
      {
        label: 'OX2',
        data: filteredData.map(data => data.ox2),
        fill: false,
        borderColor: 'black',
        tension: 0.2,
        fechaAdd: filteredData.map(data => format(new Date(data.fechaRegistro), 'dd-MM-yyyy HH:mm:ss'))
      },
      {
        label: 'OX3',
        data: filteredData.map(data => data.ox3),
        fill: false,
        borderColor: 'MediumVioletRed',
        tension: 0.2
      },
      {
        label: 'OX4',
        data: filteredData.map(data => data.ox4),
        fill: false,
        borderColor: 'green',
        tension: 0.2
      },
      {
        label: 'OX5',
        data: filteredData.map(data => data.ox5),
        fill: false,
        borderColor: 'DarkBlue',
        tension: 0.5
      },
      {
        label: 'OX6',
        data: filteredData.map(data => data.ox6),
        fill: false,
        borderColor: 'Olive',
        tension: 0.2
      },
      {
        label: 'OX7',
        data: filteredData.map(data => data.ox7),
        fill: false,
        borderColor: 'DarkRed',
        tension: 0.2
      },
      {
        label: 'OX8',
        data: filteredData.map(data => data.ox8),
        fill: false,
        borderColor: 'Darkorange',
        tension: 0.2
      },
      {
        label: 'OX9',
        data: filteredData.map(data => data.ox9),
        fill: false,
        borderColor: 'Indigo',
        tension: 0.2
      },
     
      // Repetir para cada sensor OX necesario...
    ]
  };


  const tempChartData = {
    labels: filteredData.map(data => data.fechaRegistro),
    datasets: [
      {
        label: 'Temperatura',
        data: filteredData.map(data => data.temp),
        fill: false,
        borderColor: 'DodgerBlue',
        tension: 0.2
      },
    ]
  };


  const options = {
    scales: {
      x: {
        ticks: {
          // Esto oculta las etiquetas del eje x
          display: false
        }
      },
      // Configuración para los otros ejes si es necesario
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: function (context) {
            console.log(context)
            // Personaliza el título del tooltip
            return 'Fecha Registro: ' + moment.tz(context[0].label, 'America/Santiago').format('YYYY-MM-DD HH:mm:ss') ;
          },
               
        }
      }
    }
  };


  const optionsAlertas = {
    scales: {
      x: {
        ticks: {
          // Esto oculta las etiquetas del eje x
          display: false
        }
      },
      // Configuración para los otros ejes si es necesario
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: function (context) {
            console.log(context)
            // Personaliza el título del tooltip
            return 'Fecha Registro : ' + moment.tz(context[0].label, 'America/Santiago').format('YYYY-MM-DD') ;
          },               
        }
      }
    }
  };
 

  return (
    <div>
      <div className="lg:flex justify-end gap-2 mb-4">
        <div className="lg:w-3/12">
          <TextField
            id="desde"
            label="Desde"
            className="block w-full bg-white"
            type="date"
            variant="outlined"
            value={desde}
            onChange={(e) => setDesde(e.target.value)}
          />
        </div>

        <div className="lg:w-3/12 mt-4 lg:mt-0">
          <TextField
            id="hasta"
            label="Hasta"
            className="block w-full bg-white"
            type="date"
            variant="outlined"
            value={hasta}
            onChange={(e) => setHasta(e.target.value)}
          />
        </div>
      </div>

      <div className="">
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold mt-2">
            Oxigenación {camionSeleccionado.patente}
          </h2>

        <RptOx data={datosOX} nombrePdf={"Oxigenación"} /> 

        </div>

        <Line data={lineChartData} options={options} />
      </div>

      <div className="mt-4">
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold mt-2">
            Temp {camionSeleccionado.patente}
          </h2>

          <RptTemp data={datosOX} nombrePdf={"Temperatura"} /> 

          
        </div>
        {/* Gráfico de líneas para Temperatura */}
        <Line data={tempChartData} options={options} />
      </div>

      <div className="mt-4">
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold mt-2">
            Alertas {camionSeleccionado.patente}
          </h2>

          <RptAlertas data={log} nombrePdf={"Alertas"} /> 
        </div>

        {/*    <Line data={alertBarChartData} options={optionsAlertas} /> */}
        <Bar data={alertBarChartData} options={optionsAlertas} />
      </div>
    </div>
  );
};

export default GraficoGral;
