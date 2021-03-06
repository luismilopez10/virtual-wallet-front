import { nanoid } from '@reduxjs/toolkit';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getAllCollaborators } from '../../actions/collaborators/getAllCollaborators';
import { putCollaborator } from '../../actions/collaborators/putCollaborator';
import { postTransaction } from '../../actions/transactions/postTransaction';
import { RootState, useAppDispatch } from '../../app/store';
import { collaboratorType, selectCollaboratorStateTypeFetchError, selectCollaboratorStateTypeState, selectCollaboratorStateTypeStatus } from '../../features/collaboratorSlice';
import { requestStatus, transactionType } from '../../features/transaccionSlice';


const CollaboratorTransaction: React.FunctionComponent = () => {
    const { user } = useSelector((state: RootState) => state.logged);
    const dispatch = useAppDispatch();
    const [reciever, setReciever] = useState('')
    const [amount, setAmount] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        const localStorageUser = localStorage.getItem("localStorageUser");
        if (user === null && localStorageUser === null) {
            navigate('/login');
        }
        if (status === requestStatus.IDLE) {
            dispatch(getAllCollaborators())
        }
    }, [dispatch])

    const error = useSelector(selectCollaboratorStateTypeFetchError())
    const status = useSelector(selectCollaboratorStateTypeStatus())
    const getCollaborators = useSelector(selectCollaboratorStateTypeState())
    const currentCollaborator = getCollaborators.find((collaborator) => collaborator.email === user)


    const onSendTransaction = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (reciever && amount) {
            if (amount <= currentCollaborator?.balance!) {
                if (reciever != currentCollaborator?.email) {
                    let currentReciever = getCollaborators.find((collab) => collab.email === reciever)

                    if (currentReciever) {
                        const addedTransaction: transactionType = {
                            id: nanoid(),
                            source: currentCollaborator?.email!,
                            receiver: currentReciever?.email,
                            amount: amount,
                            date: moment(new Date()).format("DD/MM/YYYY HH:mm:ss")
                        }

                        dispatch(postTransaction(addedTransaction))
                        alert('La transaccion fue exitosa')

                        const updatedSource: collaboratorType = {
                            email: currentCollaborator?.email!,
                            name: currentCollaborator?.name!,
                            balance: currentCollaborator?.balance! - amount,
                            contactsList: currentCollaborator?.contactsList!,
                            logged: currentCollaborator?.logged!
                        }

                        const updatedReciever: collaboratorType = {
                            email: currentReciever.email,
                            name: currentReciever.name,
                            balance: currentReciever.balance + amount,
                            contactsList: currentReciever.contactsList,
                            logged: currentReciever.logged
                        }

                        dispatch(putCollaborator(updatedSource))
                        dispatch(putCollaborator(updatedReciever))
                        setReciever('')
                        setAmount(0)
                        navigate('/inicio-colab')

                    } else {
                        alert('La cuenta destino no se encuentra en el sistema')
                        setReciever("")
                    }
                } else {
                    alert('Esta transaccion es redundante')
                    setReciever("")
                }
            } else {
                alert('El dinero a enviar no puede ser mayor que su saldo')
                setAmount(0)
            }
        } else {
            alert('Debe haber un usuario y un valor para que se realize la transaccion')
            setReciever('')
            setAmount(0)
        }
    }


    return (
        <div className='login__body'>
            <div className="login__container">
                <form autoComplete="on" onSubmit={(e) => onSendTransaction(e)}>
                    {/* <Link to='/inicio-colab'>
                        <button>Regresar</button>
                    </Link> */}
                    <div className="title">Enviar dinero</div>
                    <div className="input-box underline">
                        <input type="text" placeholder="Destinatario" value={reciever} onChange={(e) => setReciever(e.target.value)} required />
                        <div className="underline"></div>
                    </div>
                    <div className="input-box">
                        <input type="number" placeholder="Valor" value={amount} onChange={(e) => setAmount(Number(e.target.value))} required />
                        <div className="underline"></div>
                    </div>
                    <br />
                    <div className="input-box button">
                        <input type="submit" name="" value="Enviar dinero" />
                    </div>
                </form>
                <br />
            </div>
        </div>
    )
};

export default CollaboratorTransaction;