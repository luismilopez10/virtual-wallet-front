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
    const getAllTransacions = useSelector(selectTransaccionState())
    const collaboratorTransactionsIn = getAllTransacions.filter((transaction) => transaction.receiver === user)


    return (<div className='flex flex-col space-y-12'>
        <br />
        <table className='table-fixed border-collapse border border-black border-separate border-spacing-2' style={{ backgroundColor: 'white' }}>
            <thead>
                <tr>
                    <td className='border-collapse border border-black' style={{ backgroundColor: '#0e3b43', color: 'white' }}>Fecha:</td>
                    <td className='border-collapse border border-black' style={{ backgroundColor: '#0e3b43', color: 'white' }}>Origen:</td>
                    <td className='border-collapse border border-black' style={{ backgroundColor: '#0e3b43', color: 'white' }}>Cantidad:</td>
                </tr>
            </thead>

            {!error && collaboratorTransactionsIn.map((product: transactionType) => {
                return <tbody key={product.id}>
                    <tr>
                        <td>{product.date}</td>
                        <td>{product.source}</td>
                        <td style={{ color: 'green' }}>+{product.amount}</td>
                    </tr>
                </tbody>
            })}
        </table>
        <br />
        <div className='flex space-x-4 justify-center'>
            <Link to='/inicio-colab'>
                <button>Regresar</button>
            </Link>
        </div>



    </div>)

}


export default CollaboratorIn