import React, { useEffect } from 'react'
import { useAppDispatch } from '../../app/store'
import { useSelector } from 'react-redux';
import { requestStatus, selectTransaccionFetchError, selectTransaccionState, selectTransaccionStatus, transactionType } from "../../features/transaccionSlice";
import { getAllTransactions } from '../../actions/transactions/getAllTransactions';


const colaboradorEgresos: React.FunctionComponent = () => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (status === requestStatus.IDLE) {
            dispatch(getAllTransactions())
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

            {!error && getAllTransaccions.map((product: transactionType) => {
                return <tbody key={product.id}>
                    <tr>
                        <td>{product.date}</td>
                        <td>{product.receiver}</td>
                        <td>{product.amount}</td>
                    </tr>
                </tbody>
            })}
        </table>
        <br />
        

    </div>)

}


export default colaboradorEgresos