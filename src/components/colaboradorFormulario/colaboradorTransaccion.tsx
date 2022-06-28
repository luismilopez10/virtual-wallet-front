import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../app/store';


const colaboradorTransaccion: React.FunctionComponent = () => {
    const [destinatario, setDestinatario] = useState('')
    const [valor, setValor] = useState(0)

    //TODO: traer el correo de la persona cuya sesion esta activa

    //TODO: traer la cuenta destino del array y validar en el metodo on transaccion que exista

    //TODO: validar que la cantidad que envio no sobre pase el valor a enviar

    const onEnviarTransaccion = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (destinatario && valor) {
            //TODO: post de la transaccion
            //TODO: put para cambiar los saldos de ambas cuentas
            //TODO: limpiar los campos
            //TODO: redirigir al menu de usuario

        } else {
            alert('Debe haber un usuario y un valor para que se realize la transaccion')
        }
    }

    return (
        <div>
            
            <form>
                <div>
                    <label>Destinatario:</label>
                    <input onChange={(e) => setDestinatario(e.target.value)} type='text' value={destinatario} placeholder='Destinatario'></input>
                </div>
                <br />
                <div>
                    <label>Valor:</label>
                    <input onChange={(e) => setValor(Number(e.target.value))} type='number' min='0' value={valor}></input>
                </div>
                <br />
                <input type='submit' value='Enviar dinero' />
            </form>
        </div>
    )
};

export default colaboradorTransaccion;