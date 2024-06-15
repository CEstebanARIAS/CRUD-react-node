import "./App.css";
import React from "react";
import Swal from "sweetalert2"

import { useState, useEffect } from "react";
import Axios from "axios";


function App() {
  const [user_id, setUser_id] = useState();
  const [user_handle, setUser_Handler] = useState("");
  const [first_name, setFirst_Name] = useState("");
  const [last_name, setLast_Name] = useState("");
  const [phonenumber, setPhonenumber] = useState();
  const [usersList, setUsers] = useState([]);
  const [editar, setEditar] = useState(false);

  useEffect( ()=> {
    getUsers();
  }, []);

  const addUser = () => {
    Axios.post("http://localhost:3001/create", {
      user_handle: user_handle,
      first_name: first_name,
      last_name: last_name,
      phonenumber: phonenumber,
    }).then(() => {
      getUsers();
      Swal.fire({
        title: "<strong>Registro Exitoso!</strong>",
        html: "<i>El Usuario " + first_name + " fue registrado con exito</i>",
        icon: 'success'
      })
      cleanInputs();
    });
  };

  const getUsers = () => {
    Axios.get("http://localhost:3001/users").then((response) => {
      setUsers(response.data);
    });
  };

  const deleteUser = (val) => {
    Swal.fire({
      title: 'Seguro que quieres eliminarlo?',
      html: "<i>Una vez eliminado el resgistro no podras volver atras</i>",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo'
    }).then( (result) => {
      if (result.isConfirmed){
        Axios.delete(`http://localhost:3001/delete/${val.user_id}`).then(() => {
          Swal.fire(
            'Eliminado',
            'Registro eliminado con exito',
            'success'
          )
          getUsers();
        });
       
      }
    });
    
  };

  const updateUser = () => {
    Axios.put("http://localhost:3001/update", {
      user_id: user_id,
      user_handle: user_handle,
      first_name: first_name,
      last_name: last_name,
      phonenumber: phonenumber,
    }).then(() => {
      Swal.fire({
        title: "<strong>Actualizacion Exitosa!</strong>",
        html: "<i>El empleado <strong>" + first_name +"</strong> fue actualizado con exito</i>",
        icon: 'success'
      })
      getUsers();
      cleanInputs();
    });
    
  };

  const cleanInputs = () => {
    setUser_Handler("");
    setFirst_Name("");
    setLast_Name("");
    setPhonenumber();  
    setEditar(false)  
  };

  const cargarDatos = (val) => {
    setEditar(true);
    setUser_id(val.user_id);
    setUser_Handler(val.user_handle);
    setFirst_Name(val.first_name);
    setLast_Name(val.last_name);
    setPhonenumber(val.phonenumber);
  };

  return (
    <div className="App">
      <div className="Datos">
        {/* <section className="windowModal">
          <Modal/>
        </section> */}
        <label>
          User Name{" "}
          <input
            onChange={(event) => {
              setUser_Handler(event.target.value);
            }}
            type="text"
            value={user_handle || ""}
            placeholder="Ingrese su nombre de usuario"
          ></input>
        </label>
        <label>
          Nombre{" "}
          <input
            onChange={(event) => {
              setFirst_Name(event.target.value);
            }}
            type="text"
            value={first_name || ""}
            placeholder="Ingrese su primer nombre"
          ></input>
        </label>
        <label>
          Apellido{" "}
          <input
            onChange={(event) => {
              setLast_Name(event.target.value);
            }}
            type="text"
            value={last_name || ""}
            placeholder="Ingrese su primer apellido"
          ></input>
        </label>
        <label>
          Telefono{" "}
          <input
            onChange={(event) => {
              setPhonenumber(event.target.value);
              
            }}
            type="number"
            value={phonenumber || ""}
            placeholder="Ingrese su numero de telefono"
          ></input>
        </label>
        <div className="Buttons">
        {editar == true ? (
          <div>
            <button onClick={updateUser}>Actualizar</button>
            <button onClick={cleanInputs}>Cancelar</button>
          </div>
        ) : (
          <button onClick={addUser}>Registrar</button>
          
        )}
        </div>
      </div>
      <div>
        <table className="List">
          <thead className="ListHead">
            <tr>
              <th>#</th>
              <th>Nick Name</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Telefono</th>
              <th>Fecha de Creacion</th>
            </tr>
          </thead>
          <tbody className="ListBody">
            {usersList.map((val) => {
              return (
                <tr key={val.user_id}>
                  <th>{val.user_id}</th>
                  <th>{val.user_handle}</th>
                  <th>{val.first_name}</th>
                  <th>{val.last_name}</th>
                  <th>{val.phonenumber}</th>
                  <th>{val.created_at}</th>
                  <th>
                    <button
                      onClick={() => {
                        cargarDatos(val);
                      }}
                    >Modificar
                    </button>
                  </th>
                  <th>
                    <button 
                      onClick={() => {
                        deleteUser(val);
                      }}
                    >Eliminar
                    </button>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
