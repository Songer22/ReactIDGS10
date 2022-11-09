import React from "react";
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


function App(){
  return(

    <BrowserRouter>
      <Routes>
        
        {/* <Route path="/" element={<Departamentos />}> */}
        <Route path="/" element={<Departamentos />} />
          <Route path="Departamentos" element={<Departamentos />} />
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

export default App;

