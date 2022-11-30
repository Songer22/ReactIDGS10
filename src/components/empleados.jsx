import logo from '.././logo.svg';
import '../App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet, Link } from "react-router-dom";
import {Container, FormGroup, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

import Menu from "../menu/menu";

import Swal from 'sweetalert2';
import 'jquery/dist/jquery.min.js';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import 'datatables.net-dt/js/dataTables.dataTables.min.js';
import $ from 'jquery';

class App extends React.Component {

  componentDidMount(){
    this.cargarTabla();
  }


  //Seteamos un estado de la modal por defecto
  state={
    modalInsertar: false
  }

  //esta funcion cambia el estado a true
  modalInsertar=()=>{
    this.setState({
      modalInsertar:true,
    });
  }

  //esta funcion cierra la modal
  cerrarModalInsertar=()=>{
    this.setState({
      modalInsertar:false
      
    })
  }
  onInsertEmpleado=()=>{
    var id_persona = document.getElementById("id_persona").value;
    var numero_empleado = document.getElementById("numero_empleado").value;
    var fecha_ingreso = document.getElementById("fecha_ingreso").value;
    var fecha_egreso = document.getElementById("fecha_egreso").value;
    var id_departamento = document.getElementById("id_departamento").value;

    if (id_persona == "" || numero_empleado == "" || fecha_ingreso == "" || fecha_egreso == "" || id_departamento == "") {
      Swal.fire("Campos vacios","Debes ingresar los datos solicitados","error")
    }else{
      //headers de la solicitud
      var myHeaders = new Headers();
      myHeaders.append("Content-Type","application/json")
      //armar body de la solicitud
      var raw = JSON.stringify({
        "id_persona":id_persona,
        "numero_empleado":numero_empleado,
        "fecha_ingreso":fecha_ingreso,
        "fecha_egreso":fecha_egreso,
        "id_departamento":id_departamento,
        "activo":1,
        "usuario":1
      });

      //options del request
    var requestOptions={
      method:"POST",
      headers:myHeaders,
      body:raw,
      redirect:"follow"
    
    };
    fetch('https://localhost:7218/api/InsertEmpleados',requestOptions)
    .then(response=>response.text())
    .then(result=>console.log(result))
    .catch(error=>console.log('error', error));
    this.cerrarModalInsertar();
    Swal.fire(
      {
        title:'Se ha agregado un nuevo registro',
        icon:'success',
        showConfirmButton: false,
        timer: 1500
      }
  )
    $('#lista_empleados').DataTable().ajax.reload();

    }
    
  }



  /* funcion para traer los datos de la tabla con datatable */
  cargarTabla=()=>{ 
    $('#lista_empleados').dataTable().fnDestroy();
    $('#lista_empleados').dataTable({
      "language":{
        "url":""
      },
      "dom":"Bfrtip",
      "ajax":{
        "url":"https://localhost:7218/api/GetEmpleados",
        "method":"POST",
        "timeout":0,
        "contentType":"application/json",
        "dataSrc":"response.data",
        data:function(d){
          return JSON.stringify({"activo":1});
        },
        dataType:"json"
      },

      "columns":[
        {
          "data":"Id",
        },
        {
          "data":"Id_persona"
        },
        {
          "data":"Numero_empleado"
        },
        {
          "data":"Fecha_ingreso"
        },
        {
          "data":"Fecha_egreso"
        },
        {
          "data":"Id_departamento"
        },
        {
          "data":"FechaHora"
        },
        {
          "data":"Activo"
        },
        {
          "data":"Usuario"
        },
      ]
    });
  }

  
  render(){
    return (
      <>
      <Menu/>

      <Outlet />

        <Container>
          <h1>Administración de Empleados</h1>
          <br/>
          <Button color='success' onClick={()=>this.modalInsertar()}>Nuevo Empleado</Button>
          <br/><br/>
          <Table className="table-bordered" id="lista_empleados">
            <thead>
              <tr align="center">
                <th width="10%">Id</th>
                <th>Id empleado</th>
                <th>Numero empleado</th>
                <th>fecha ingreso</th>
                <th>fecha egreso</th>
                <th>Id departamento</th>
                <th>Fecha Hora</th>
                <th>Activo</th>
                <th>Usuario</th>
              </tr>
            </thead>
          </Table>
          <Modal isOpen={this.state.modalInsertar}>
            <ModalHeader>
              <div>
                <h3>Usuarios | Nuevo Registro</h3>
              </div>
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <label>Id persona:</label>
                <input type="number" className="form-control" ref="id_persona" id="id_persona"  name="id_persona" />
                <br />
                <label>Numero empleado:</label>
                <input type="number" className="form-control" ref="numero_empleado" id="numero_empleado"  name="numero_empleado" />
                <br />
                <label>Fecha ingreso:</label>
                <input type="date" className="form-control" ref="fecha_ingreso" id="fecha_ingreso"  name="fecha_ingreso" />
                <br />
                <label>Fecha egreso:</label>
                <input type="date" className="form-control" ref="fecha_egreso" id="fecha_egreso"  name="fecha_egreso" />
                <br />
                <label>Id departamento:</label>
                <input type="number" className="form-control" ref="id_departamento" id="id_departamento"  name="id_departamento" />
                <br />
              </FormGroup>
            </ModalBody>      
            <ModalFooter>
              <Button color="primary" onClick={()=>this.onInsertEmpleado()}>Guardar Registro</Button>
              <Button color='danger' onClick={()=>this.cerrarModalInsertar()}>Cancelar</Button>
            </ModalFooter>
          </Modal>
        </Container>
      </>
    );
  }
}

export default App;