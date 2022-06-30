import React, { useEffect } from 'react'
import { RootState, useAppDispatch } from '../../app/store'
import { useSelector } from 'react-redux';
import { requestStatus, selectTransaccionFetchError, selectTransaccionState, selectTransaccionStatus, transactionType } from "../../features/transaccionSlice";
import { getAllTransactions } from '../../actions/transactions/getAllTransactions';
import { Link, useNavigate } from 'react-router-dom';



const CollaboratorIn: React.FunctionComponent = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const { user } = useSelector((state: RootState) => state.logged);

    useEffect(() => {
        if (user === null) {
          navigate('/login');
        }
        if (status === requestStatus.IDLE) {
            dispatch(getAllTransactions())
        }
    }, [dispatch])

    const error = useSelector(selectTransaccionFetchError())
    const status = useSelector(selectTransaccionStatus())
    const getAllTransacions = useSelector(selectTransaccionState())
    const collaboratorTransactionsIn = getAllTransacions.filter((transaction) => transaction.receiver === user)
   

    return (<div>
        <table>
            <thead>
                <tr>
                    <td>Fecha:</td>
                    <td>Origen:</td>
                    <td>Cantidad:</td>
                </tr>
            </thead>

            {!error && collaboratorTransactionsIn.map((product: transactionType) => {
                return <tbody key={product.id}>
                    <tr>
                        <td>{product.date}</td>
                        <td>{product.source}</td>
                        <td style={{color: 'green'}}>+{product.amount}</td>
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


export default CollaboratorIn