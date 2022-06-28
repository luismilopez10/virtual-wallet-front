import React, { useEffect } from 'react'
import { useAppDispatch } from '../../app/store'
import { useSelector } from 'react-redux';
import { requestStatus, selectTransaccionFetchError, selectTransaccionState, selectTransaccionStatus, transaccionType } from "../../features/transaccionSlice";
import { getAllTransacciones } from '../../actions/transactions/getAllTransacciones';


const colaboradorIngresos: React.FunctionComponent = () => {

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
    //TODO: agregar estilo a la cantidad de dinero para que sea verde pues son ingresos

    return (<div>
        <table>
            <thead>
                <tr>
                    <td>Fecha:</td>
                    <td>Origen:</td>
                    <td>Cantidad:</td>
                </tr>
            </thead>

            {!error && getAllTransaccions.map((product: transaccionType) => {
                return <tbody key={product.id}>
                    <tr>
                        <td>{product.fecha}</td>
                        <td>{product.origen}</td>
                        <td>{product.cantidad}</td>
                    </tr>
                </tbody>
            })}
        </table>
        <br />


    </div>)

}


export default colaboradorIngresos