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
  onInsertPersona=()=>{
    var nombre = document.getElementById("nombre").value;
    var ap_paterno = document.getElementById("ap_paterno").value;
    var ap_materno = document.getElementById("ap_materno").value;
    var fecha_nacimiento = document.getElementById("fecha_nacimiento").value;
    var curp = document.getElementById("curp").value;
    var email = document.getElementById("email").value;
    var telefono = document.getElementById("telefono").value;
    var celular = document.getElementById("celular").value;

    if (nombre == "" || ap_paterno == "" || ap_materno == "" || fecha_nacimiento == "" || curp == "" || email == "" || telefono == "" || celular == "") {
      Swal.fire("Campos vacios","Debes ingresar los datos solicitados","error")
    }else{
      //headers de la solicitud
      var myHeaders = new Headers();
      myHeaders.append("Content-Type","application/json")
      //armar body de la solicitud
      var raw = JSON.stringify({
        "nombre":nombre,
        "ap_paterno":ap_paterno,
        "ap_materno":ap_materno,
        "fecha_nacimiento":fecha_nacimiento,
        "curp":curp,
        "email":email,
        "telefono":telefono,
        "celular":celular,
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
    fetch('https://localhost:7218/api/InsertPersonas',requestOptions)
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
    $('#lista_Personas').DataTable().ajax.reload();

    }
    
  }



  /* funcion para traer los datos de la tabla con datatable */
  cargarTabla=()=>{ 
    $('#lista_Personas').dataTable().fnDestroy();
    $('#lista_Personas').dataTable({
      "language":{
        "url":""
      },
      "dom":"Bfrtip",
      "ajax":{
        "url":"https://localhost:7218/api/GetPersonas",
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
          "data":"Nombre",
        },
        {
          "data":"Fecha_nacimiento",
        },
        {
          "data":"Curp",
        },
        {
          "data":"Email",
        },
        {
          "data":"Telefono",
        },
        {
          "data":"Celular",
        },
        {
          "data":"Activo",
        }
      ]
    });
  }

  
  render(){
    return (
      <>
      <Menu/>

      <Outlet />

        <Container>
          <h1>Administración de Personas</h1>
          <br/>
          <Button color='success' onClick={()=>this.modalInsertar()}>Nuevo Persona</Button>
          <br/><br/>
          <Table className="table-bordered" id="lista_Personas">
            <thead>
              <tr align="center">
                <th width="10%">Id</th>
                <th>Nombre</th>
                <th>Fecha nacimiento</th>
                <th>Curp</th>
                <th>Email</th>
                <th>Telefono</th>
                <th>Celular</th>
                <th>Activo</th>
              </tr>
            </thead>
          </Table>
          <Modal isOpen={this.state.modalInsertar}>
            <ModalHeader>
              <div>
                <h3>Persona | Nuevo Registro</h3>
              </div>
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <label>Nombre:</label>
                <input type="text" className="form-control" ref="nombre" id="nombre"  name="nombre" />
                <br />
                <label>Apellido paterno:</label>
                <input type="text" className="form-control" ref="ap_paterno" id="ap_paterno"  name="ap_paterno" />
                <br />
                <label>Apellido materno:</label>
                <input type="text" className="form-control" ref="ap_materno" id="ap_materno"  name="ap_materno" />
                <br />
                <label>Fecha nacimiento:</label>
                <input type="date" className="form-control" ref="fecha_nacimiento" id="fecha_nacimiento"  name="fecha_nacimiento" />
                <br />
                <label>Curp:</label>
                <input type="text" className="form-control" ref="curp" id="curp"  name="curp" />
                <br />
                <label>Email:</label>
                <input type="text" className="form-control" ref="email" id="email"  name="email" />
                <br />
                <label>Telefono:</label>
                <input type="number" className="form-control" ref="telefono" id="telefono"  name="telefono" />
                <br />
                <label>Celular:</label>
                <input type="number" className="form-control" ref="celular" id="celular"  name="celular" />
                <br />
              </FormGroup>
            </ModalBody>      
            <ModalFooter>
              <Button color="primary" onClick={()=>this.onInsertPersona()}>Guardar Registro</Button>
              <Button color='danger' onClick={()=>this.cerrarModalInsertar()}>Cancelar</Button>
            </ModalFooter>
          </Modal>
        </Container>
      </>
    );
  }
}

export default App;