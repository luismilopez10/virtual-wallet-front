import React from 'react'
import { Link } from 'react-router-dom';

//TODO: validar el usuario con sesion activa y traer sus datos de la body
//TODO: mapear los datos de sesion y agregar los historiales desde la pag

const collaboratorMenu = () => {
  return (
    <div>
      <h1>Hola X</h1>
      <div >
        Tu saldo es: Y
      </div>
      <br />
      

      <div >
        <Link to='/'>
          <button>Cerrar Sesión</button>
        </Link>
      </div>
    </div>
  )
};

export default collaboratorMenu