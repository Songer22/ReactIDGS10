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
  onInsertPerfil=()=>{
    var nomPerfil = document.getElementById("nomPerfil").value;
    if (nomPerfil == "") {
      Swal.fire("Campos vacios","Debes ingresar los datos solicitados","error")
    }else{
      //headers de la solicitud
      var myHeaders = new Headers();
      myHeaders.append("Content-Type","application/json")
      //armar body de la solicitud
      var raw = JSON.stringify({
        "nombre":nomPerfil,
        "activo":1,
        "usuario":1
      });
    }
    //options del request
    var requestOptions={
      method:"POST",
      headers:myHeaders,
      body:raw,
      redirect:"follow"
    };
    fetch('https://localhost:7218/api/InsertPerfil',requestOptions)
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
    $('#lista_usuarios').DataTable().ajax.reload();
  }



  /* funcion para traer los datos de la tabla con datatable */
  cargarTabla=()=>{ 
    $('#lista_usuarios').dataTable().fnDestroy();
    $('#lista_usuarios').dataTable({
      "language":{
        "url":""
      },
      "dom":"Bfrtip",
      "ajax":{
        "url":"https://localhost:7218/api/GetUsuarios",
        "method":"POST",
        "timeout":0,
        "contentType":"application/json",
        "dataSrc":"response.data",
        data:function(d){
          return JSON.stringify({"activo":0});
        },
        dataType:"json"
      },

      "columns":[
        {
          "data":"Id",
        },
        {
          "data":"Nombre"
        },
        {
          "data":"Pass"
        },
        {
          "data":"Id_persona"
        },
        {
          "data":"Id_perfil"
        },
        {
          "data":"Usuario"
        }
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
          <h1>Administración de Usuarios</h1>
          <br/>
          <Button color='success' onClick={()=>this.modalInsertar()}>Nuevo Usuario</Button>
          <br/><br/>
          <Table className="table-bordered" id="lista_usuarios">
            <thead>
              <tr align="center">
                <th width="10%">Id</th>
                <th width="10%">Nombre</th>
                <th width="10%">pass</th>
                <th width="10%">Id persona</th>
                <th width="10%">Id perfil</th>
                <th width="10%">FechaHora</th>
                <th width="10%">Status</th>
                {/* <th>Nombre</th>
                <th width="20%">Fecha</th>
                <th width="10%">Status</th>
                <th width="12%">Usuario</th>
                <th width="10%">Status</th>
                <th width="12%">Usuario</th> */}
              </tr>
            </thead>
          </Table>
          <Modal isOpen={this.state.modalInsertar}>
            <ModalHeader>
              <div>
                <h3>Perfiles | Nuevo Registro</h3>
              </div>
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <label>Nombre:</label>
                <input type="text" className="form-control" ref="nomPerfil" id="nomPerfil"  name="nombre" />
              </FormGroup>
            </ModalBody>      
            <ModalFooter>
              <Button color="primary" onClick={()=>this.onInsertPerfil()}>Guardar Registro</Button>
              <Button color='danger' onClick={()=>this.cerrarModalInsertar()}>Cancelar</Button>
            </ModalFooter>
          </Modal>
        </Container>
      </>
    );
  }
}

export default App;