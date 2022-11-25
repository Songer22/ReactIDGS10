import React from "react";
import { findRenderedComponentWithType } from "react-dom/test-utils";
import {
  BrowserRouter as Router,
  Switch,
  Routes,
  Route,
  Link,
  BrowserRouter,
  Outlet
} from "react-router-dom";
// import { Outlet, Link } from "react-router-dom";


import Departamentos from "./components/Departamentos";
import Empleados from "./components/empleados";
import Perfiles from "./components/perfiles";
import Personas from "./components/personas";
import Usuarios from "./components/usuarios";

import Menu from "./menu/menu";


function App(){
  return(

    <BrowserRouter>
      <Routes>
        
        {/* <Route path="/" element={<Menu />}> */}
          <Route path="/" element={<Departamentos />} />
          {/* <Route path="Departamentos" element={<Departamentos />} /> */}
          <Route path="Empleados" element={<Empleados />} />
          <Route path="Perfiles" element={<Perfiles />} />
          <Route path="Personas" element={<Personas />} />
          <Route path="Usuarios" element={<Usuarios />} />
          {/* <Route path="*" element={<NoPage />} /> */}
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}
// cargarTabla=()=>{
//   $('#lista_deptos').dataTable().fnDestroy();
//   $('lista_deptos').dataTabla({
//     'languaje':{
//       "url":""

//     },
//     "paging":true,
//     // "dom":Bfrtip,
//     "ajax":{
//       "url":"https://localhost:7218/api/GetDepartamentos",
//       "method":"POST",
//       "timeout":0,
//       "contentType":"application/Json",
//       "dataSrc":function(d){
//         return JSON.stringify({"activo":1})
//       },
//       dataTyoe:"json"
//     },
//     "columns":[
//       {
//         "data":"Id"
//       },
//       {
//         "":""
//       }
//     ]
//   })
// }

export default App;

