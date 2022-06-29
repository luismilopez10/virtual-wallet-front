import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../app/store';

//TODO: validar el usuario con sesion activa y traer sus datos de la body
//TODO: mapear los datos de sesion y agregar los historiales desde la pag

const collaboratorMenu = () => {
  const { user } = useSelector((state: RootState) => state.logged);
  return (
    <div>
      <h1>Hola X</h1>
      <div >
        Tu saldo es: Y
      </div>
      <br />
  
    </div>
  )
};

export default collaboratorMenu