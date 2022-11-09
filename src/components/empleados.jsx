import logo from '.././logo.svg';
import '../App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet, Link } from "react-router-dom";
import {Container, FormGroup, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

import Menu from "../menu/menu";

class App extends React.Component {
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
    let depInfo={
      nombre:this.refs.nomDep.value
    };

    console.log(depInfo);

    fetch('http://localhost:5218/api/InsertDepartamento',{
      method:"POST",
      headers:{'Content-type':'application/json'},
      body:depInfo
    }).then(r=>r.json()).then(res=>{
      if(res){
        this.state({message:"Registro creado"});
      }
    }) //verificar endpoint
  }
  render(){
    return (
      <>
      <Menu/>

      <Outlet />

        <Container>
          <h1>Administración de Empleados</h1>
          <br/>
          <Button color='success' onClick={()=>this.modalInsertar()}>Nuevo Departamento</Button>
          <br/><br/>
          <Table className="table-bordered">
            <thead>
              <tr align="center">
                <th width="10%">Id</th>
                <th>Nombre</th>
                <th width="20%">Registro</th>
                <th width="10%">Status</th>
                <th width="12%">Usuario</th>
              </tr>
            </thead>
          </Table>
          <Modal isOpen={this.state.modalInsertar}>
            <ModalHeader>
              <div>
                <h3>Empleados | Nuevo Registro</h3>
              </div>
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <label>Nombre:</label>
                <input type="text" className="form-control" ref="nomDep"  name="nombre" />
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