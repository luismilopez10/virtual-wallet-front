import React, { useEffect, useRef, useState } from 'react'
import readXlsxFile, { Row } from 'read-excel-file'
import { ExcelExport, ExcelExportColumn } from '@progress/kendo-react-excel-export';
import { getAllCollaborators } from '../../actions/collaborators/getAllCollaborators';
import { RootState, useAppDispatch } from '../../app/store';
import { collaboratorType, selectCollaboratorStateTypeState, selectCollaboratorStateTypeStatus } from '../../features/collaboratorSlice';
import { useSelector } from 'react-redux';
import { putCollaborator } from '../../actions/collaborators/putCollaborator';
import { requestStatus, transactionType } from '../../features/transaccionSlice';
import { nanoid } from '@reduxjs/toolkit';
import moment from 'moment';
import { postTransaction } from '../../actions/transactions/postTransaction';
import './CollaboratorPayment.css'
import { f } from '../../App';
import { useNavigate } from 'react-router-dom';

function EmployeePayment() {

    const { user } = useSelector((state: RootState) => state.logged);
    const [payments, setPayments] = useState<Row[]>([])
    const _export = useRef<ExcelExport | null>(null)
    const inputFile = useRef(null) as any
    const [isDownload, setIsDownload] = useState(false)
    const [isUploaded, setIsUploaded] = useState(false)
    const [fileSelected, setFileSelected] = useState(false)
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const getCollaborators = useSelector(selectCollaboratorStateTypeState())
    const status = useSelector(selectCollaboratorStateTypeStatus())

    useEffect(() => {
        const localStorageUser = localStorage.getItem("localStorageUser"); 
        if (user === null && localStorageUser === null) {
            navigate('/login');
        } 
        if (status === requestStatus.IDLE) {
            dispatch(getAllCollaborators())
        }
    }, [dispatch])

    const createExcel = () => {
        if (_export.current !== null) {
            _export.current.save();
            setIsDownload(true)
            setIsUploaded(false)
            console.log(getCollaborators);
        }
    }

    const readExcel = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0]
        readXlsxFile(file).then((rows: any) => {
            const paymentContent = rows.slice(1, rows.length)
            console.log(paymentContent);
            setPayments(paymentContent)
            setFileSelected(true)
            setIsUploaded(true)
        })
    }

    const deleteFile = () => {
        if (inputFile.current !== null) {
            inputFile.current.value = ""
            setIsDownload(false)
            setFileSelected(false)
            setPayments([])
            setIsUploaded(false)
        }
    }

    const payToCollaborators = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        e.preventDefault()
        payments.forEach(payment => {
            let collaboratorFound: any = getCollaborators.find((collaborator: collaboratorType | any) => collaborator.email === payment[0])
            if (collaboratorFound) {
                if (payment[1] >= 0 && payment[1]) {
                    let collaboratorToUpdate: collaboratorType = {
                        email: collaboratorFound.email,
                        name: collaboratorFound.name,
                        balance: collaboratorFound.balance + payment[1],
                        contactsList: collaboratorFound.contactsList,
                        logged: collaboratorFound.logged
                    }
                    console.log(collaboratorToUpdate.balance);

                    // console.log("Collaborator found");
                    // console.log(collaboratorFound);
                    // console.log("Collaborator to update");
                    // console.log(collaboratorToUpdate);
                    let transaction: transactionType = {
                        id: nanoid(),
                        source: 'juan.velez993@gmail.com',
                        receiver: collaboratorFound.email,
                        amount: parseFloat(payment[1].toString()),
                        date: moment(new Date()).format("DD/MM/YYYY HH:mm:ss")
                    }
                    dispatch(postTransaction(transaction))
                    dispatch(putCollaborator(collaboratorToUpdate))
                    setPayments([])
                } else {
                    alert(`El pago para ${payment[0]} contiene un valor no valido en el pago: ${payment[1]} , por favor cambiarlo e intentar de nuevo, no habrá pago para este`)
                }
            } else {
                alert(`El correo ${payment[0]} no existe en la base de datos, para este usuario no hay transaccion`)
            }
        })
        alert("transacción finalizada")
        setIsUploaded(false)
    }

    return (
        <div className='flex flex-col space-y-4 container mx-auto'>
            <div className='grid gap-y-5' style={{ marginTop: "5rem", marginBottom: "0rem" }}>
                <h1 className='text-4xl'>Pago de colaboradores</h1>
                <p>Por favor descarga el archivo Excel, ingresa los saldos a pagar a cada colaborador y vuelve a montar el archivo</p>
            </div>
            <div className='flex flex-col space-y-8'>
                <div>
                    <ExcelExport data={getCollaborators} ref={_export}>
                        <ExcelExportColumn field='email' title='Correo' width={200} />
                        <ExcelExportColumn field='pago' title='pago' width={200} />
                    </ExcelExport>
                </div>

                <div className="descargar__input-box button">
                    <input type="submit" name="" value="Descargar archivo" onClick={() => { createExcel() }} />
                </div>

                <div className='seleccionar__input-box button'>
                    <input
                        type="file"
                        onChange={(e) => readExcel(e)}
                        disabled={!isDownload} ref={inputFile}
                        className='w-64'
                    />
                </div>

                {isUploaded ?
                    <div className='flex flex-col space-y-6'>
                        <table className='table-fixed border-collapse border border-black border-separate border-spacing-2' style={{ backgroundColor: 'white' }}>
                            <thead>
                                <tr className=''>
                                    <td className='border-collapse border border-black' style={{ backgroundColor: '#0e3b43', color: 'white' }}>Correo</td>
                                    <td className='border-collapse border border-black' style={{ backgroundColor: '#0e3b43', color: 'white' }}>Pago</td>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.map((payment: { toString: () => any; }[]) => {
                                    return <tr>
                                        <td>{payment[0] ? payment[0].toString() : 'null'}</td>
                                        <td style={payment[1] && payment[1] >= 0 ? { color: 'green' } : { color: 'red' }}>{payment[1] ? "$" + f.format(payment[1].toString()) : 'null'}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>

                        <div className='flex flex-row space-between'>
                            <div className="payment-red__input-box payment__button">
                                <input type="submit" name="" value="Quitar Archivo" onClick={deleteFile} disabled={!fileSelected} />
                            </div>
                            <div className="payment-green__input-box payment__button">
                                <input type="submit" name="" value="Pagar" onClick={(e) => { payToCollaborators(e); deleteFile() }} />
                            </div>
                        </div>
                        <br />
                    </div>
                    :
                    <div></div>
                }
            </div>
        </div>
    )
}

export default EmployeePayment