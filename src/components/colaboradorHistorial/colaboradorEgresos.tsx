import React, { useEffect } from 'react'
import { useAppDispatch } from '../../app/store'
import { useSelector } from 'react-redux';
import { requestStatus, selectTransaccionFetchError, selectTransaccionState, selectTransaccionStatus, transaccionType } from "../../features/transaccionSlice";
import { getAllTransacciones } from '../../actions/transactions/getAllTransacciones';


const colaboradorEgresos: React.FunctionComponent = () => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (status === requestStatus.IDLE) {
            dispatch(getAllTransacciones())
        }
    }, [dispatch])

    const error = useSelector(selectTransaccionFetchError())
    const status = useSelector(selectTransaccionStatus())
    const getAllTransaccions = useSelector(selectTransaccionState())


    //TODO: traer el correo de la persona cuya sesion esta activa para poder mapear sus datos
    //TODO: agregar estilo a la cantidad de dinero para que sea rojo pues son egresos

    return (<div>
        <table>
            <thead>
                <tr>
                    <td>Fecha:</td>
                    <td>Destino:</td>
                    <td>Cantidad:</td>
                </tr>
            </thead>

            {!error && getAllTransaccions.map((product: transaccionType) => {
                return <tbody key={product.id}>
                    <tr>
                        <td>{product.fecha}</td>
                        <td>{product.destinatario}</td>
                        <td>{product.cantidad}</td>
                    </tr>
                </tbody>
            })}
        </table>
        <br />
        

    </div>)

}


export default colaboradorEgresos