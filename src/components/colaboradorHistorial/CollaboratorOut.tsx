import React, { useEffect } from 'react'
import { RootState, useAppDispatch } from '../../app/store'
import { useSelector } from 'react-redux';
import { requestStatus, selectTransaccionFetchError, selectTransaccionState, selectTransaccionStatus, transactionType } from "../../features/transaccionSlice";
import { getAllTransactionsOut } from '../../actions/transactions/getAllTransactionsOut';
import { Link } from 'react-router-dom';


const CollaboratorOut: React.FunctionComponent = () => {

    const dispatch = useAppDispatch();
    const { user } = useSelector((state: RootState) => state.logged);

    useEffect(() => {
        if (status === requestStatus.IDLE) {
            dispatch(getAllTransactionsOut(user))
        }
    }, [dispatch])

    const error = useSelector(selectTransaccionFetchError())
    const status = useSelector(selectTransaccionStatus())
    const getAllTransaccions = useSelector(selectTransaccionState())


    
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
                        <td style={{ color: 'red' }}>-{product.amount}</td>
                    </tr>
                </tbody>
            })}
        </table>
        <br />
        <Link to='/inicio-colab'>
            <button>Regresar</button>
        </Link>
        

    </div>)

}


export default CollaboratorOut