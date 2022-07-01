import React, { useEffect } from 'react'
import { RootState, useAppDispatch } from '../../app/store'
import { useSelector } from 'react-redux';
import { requestStatus, selectTransaccionFetchError, selectTransaccionState, selectTransaccionStatus, transactionType } from "../../features/transaccionSlice";

import { Link, useNavigate } from 'react-router-dom';
import { getAllTransactions } from '../../actions/transactions/getAllTransactions';
import { f } from '../../App';


const CollaboratorOut: React.FunctionComponent = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const { user } = useSelector((state: RootState) => state.logged);

    useEffect(() => {
        const localStorageUser = localStorage.getItem("localStorageUser"); 
        if (user === null && localStorageUser === null) {
            navigate('/login');
        } 
        if (status === requestStatus.IDLE) {
            dispatch(getAllTransactions())
        }
    }, [dispatch])

    const error = useSelector(selectTransaccionFetchError())
    const status = useSelector(selectTransaccionStatus())
    const getAllTransaccions = useSelector(selectTransaccionState())
    const collaboratorTransactionsOut = getAllTransaccions.filter((transaction) => transaction.source === user)


     return (<div>
        <table>
            <thead>
                <tr>
                    <td>Fecha:</td>
                    <td>Destino:</td>
                    <td>Cantidad:</td>
                </tr>
            </thead>

             {!error && collaboratorTransactionsOut.map((product: transactionType) => {
                return <tbody key={product.id}>
                    <tr>
                        <td>{product.date}</td>
                        <td>{product.receiver}</td>
                        <td style={{ color: 'red' }}>-{f.format(product.amount)}</td>
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