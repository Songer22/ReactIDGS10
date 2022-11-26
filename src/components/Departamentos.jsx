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

    function deleteRow(){
      console.log("hola");
    }

  //   // Delete row
  //   $('#lista_deptos').on( 'click', 'tbody td.row-remove', function (e) {
  //     var id = e.target.parentNode.parentNode.lastElementChild.parentElement.id;
  //     // var id = e.target.parentElement.id;
  //     console.log(id);
  //     // console.log("hola");
  // } );
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


 
  onInsertDepto=()=>{
    var nomDep = document.getElementById("nomDep").value;
    if (nomDep == "") {
      Swal.fire("Campos vacios","Debes ingresar los datos solicitados","error")
    }else{
      //headers de la solicitud
      var myHeaders = new Headers();
      myHeaders.append("Content-Type","application/json")
      //armar body de la solicitud
      var raw = JSON.stringify({
        "nombre":nomDep,
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
    fetch('https://localhost:7218/api/InsertDepartamento',requestOptions)
    .then(response=>response.text())
    .then(result=>console.log(result))
    .catch(error=>console.log('error', error));
    this.cerrarModalInsertar();
    Swal.fire(
      {
        title:'Se ha agregado un uevo registro',
        icon:'success',
        showConfirmButton: false,
        timer: 1500
      }
  )
    $('#lista_deptos').DataTable().ajax.reload();
  }



  cargarTabla=()=>{ {/* funcion para traer los datos de la tabla con datatable */}
    $('#lista_deptos').dataTable().fnDestroy();
    $('#lista_deptos').dataTable({
      "language":{
        "url":""
      },
      "dom":"Bfrtip",
      "ajax":{
        "url":"https://localhost:7218/api/GetDepartamentos",
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
          "data":"Nombre"
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
        {
          // data: null,
          // defaultContent: '<button class="btn btn-danger">Eliminar</button>',
          // className: 'row-remove dt-center',
          // orderable: false
          
          "data": null,
        "bSortable": false,
        className: 'row-remove dt-center',
        "mRender": function(data, type, value) {
          // console.log(value);
            // return '<button class="btn btn-danger" onclick="deleteRow('+value["Id"]+')">Eliminar</button>'
            return '<button class="btn btn-danger row-remove" id="'+value["Id"]+'" onClick={deleteRow}>Eliminar</button>'
        }
        },
      ]
    });

  }

  // deleteRow=()=>{
  //   console.log("hola");
  // }


//   $('#lista_deptos').on( 'click', 'tbody td.row-remove', function (e) {
//     editor.remove( this.parentNode, {
//         title: 'Delete record',
//         message: 'Are you sure you wish to delete this record?',
//         buttons: 'Delete'
//     } );
// } );

 

  // https://datatables.net/forums/discussion/57742/add-custom-buttons-in-react-datatable
  


  render(){
    return (
      <>
      <Menu/>

      <Outlet />
        <Container>
          <h1>Administración de Departamentos</h1>
          <br/>
          <Button color='success' onClick={()=>this.modalInsertar()}>Nuevo Departamento</Button>
          <br/><br/>
          <Table id="lista_deptos" className="table-bordered">
            <thead>
              <tr align="center">
                <th width="10%">Id</th>
                <th>Nombre</th>
                <th width="20%">Registro</th>
                <th width="10%">Status</th>
                <th width="12%">Usuario</th>
                <th width="12%">Eliminar</th>
              </tr>
            </thead>
          </Table>
          <Modal isOpen={this.state.modalInsertar}>
            <ModalHeader>
              <div>
                <h3>Departamentos | Nuevo Registro</h3>
              </div>
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <label>Nombre:</label>
                <input type="text" className="form-control" ref="nomDep" id="nomDep" name="nomDep" />
              </FormGroup>
            </ModalBody>      
            <ModalFooter>
              <Button color="primary" onClick={()=>this.onInsertDepto()}>Guardar Registro</Button>
              <Button color='danger' onClick={()=>this.cerrarModalInsertar()}>Cancelar</Button>
            </ModalFooter>
          </Modal>
        </Container>
      </>
    );
  }
}

export default App;