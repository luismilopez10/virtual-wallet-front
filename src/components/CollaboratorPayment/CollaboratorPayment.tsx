import React, { useEffect, useRef, useState } from 'react'
import readXlsxFile, { Row } from 'read-excel-file'
import { ExcelExport, ExcelExportColumn } from '@progress/kendo-react-excel-export';
import { getAllCollaborators } from '../../actions/collaborators/getAllCollaborators';
import { RootState, useAppDispatch } from '../../app/store';
import { collaboratorStateType, collaboratorType, selectCollaboratorStateTypeState, selectCollaboratorStateTypeStatus } from '../../features/collaboratorSlice';
import { useSelector } from 'react-redux';
import { putCollaborator } from '../../actions/collaborators/putCollaborator';
import { requestStatus, transactionType } from '../../features/transaccionSlice';
import { nanoid } from '@reduxjs/toolkit';
import moment from 'moment';
import { postTransaction } from '../../actions/transactions/postTransaction';

function EmployeePayment() {

    const [collaborators, setCollaborators] = useState([{}])
    const [payments, setPayments] = useState<Row[]>([])
    const _export = useRef<ExcelExport | null>(null)
    const inputFile = useRef(null) as any
    const [isDownload, setIsDownload] = useState(false)
    const [isUploaded, setIsUploaded] = useState(false)
    const [fileSelected, setFileSelected] = useState(false)
    const { user } = useSelector((state: RootState) => state.logged);
    const dispatch = useAppDispatch()

    const getCollaborators = useSelector(selectCollaboratorStateTypeState())
    const status = useSelector(selectCollaboratorStateTypeStatus())

    useEffect(() => {
        if (status === requestStatus.IDLE) {
            dispatch(getAllCollaborators())
        }
    }, [dispatch])

    const createExcel = () => {
        if (_export.current !== null) {
            _export.current.save();
            setIsDownload(true)
            setCollaborators(getCollaborators)
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

    const payToCollaborators = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        let flag = false
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
                    // collaboratorToUpdate.balance += payment[1]
                    console.log("Collaborator found");
                    console.log(collaboratorFound);
                    console.log("Collaborator to update");
                    console.log(collaboratorToUpdate);
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
        setIsUploaded(false)
    }



    const updatePage = () => {

    }

    return (
        <div className='grid justify-center space-y-0 container mx-auto'>
            <div className='grid gap-y-5' style={{ marginTop: "5rem", marginBottom: "0rem" }}>
                <h1 className='text-4xl'>Pago de colaboradores</h1>
                <p>Por favor descarga el archivo Excel, ingresa los saldos a
                    <br />
                    pagar a cada colaborador y vuelve a montar el archivo</p>
            </div>
            <div className='flex flex-col space-y-16 ml-6'>
                <div>
                    <ExcelExport data={getCollaborators} ref={_export}>
                        <ExcelExportColumn field='email' title='Correo' width={200} />
                        <ExcelExportColumn field='pago' title='pago' width={200} />
                    </ExcelExport>
                </div>
                <div className='grid justify-center'>
                    <button
                        onClick={() => { createExcel()}}
                        className='
                border
                border-black 
                rounded-md
                h-16
                w-64
                shadow-xl
                '
                        style={{ backgroundColor: "#51BBFE" }}
                    >Descargar archivo</button>
                </div>
                <div className='grid justify-center'>
                    <input
                        type="file"
                        onChange={(e) => readExcel(e)}
                        disabled={!isDownload} ref={inputFile}
                        className='w-64'
                    />
                </div>
                {isUploaded ?
                    <div className='flex flex-col space-y-12'>
                        <table className='table-fixed border-collapse border border-black border-separate border-spacing-2' style={{ backgroundColor: 'white' }}>
                            <thead>
                                <tr className=''>
                                    <td className='border-collapse border border-black' style={{ backgroundColor: '#0e3b43', color: 'white' }}>Correo</td>
                                    <td className='border-collapse border border-black' style={{ backgroundColor: '#0e3b43', color: 'white' }}>Pago</td>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.map((payment: { toString: () => string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }[]) => {
                                    return <tr>
                                        <td>{payment[0] ? payment[0].toString() : 'null'}</td>
                                        <td style={payment[1] ? { color: 'green' } : { color: 'red' }}>{payment[1] ? "$" + payment[1].toString() : 'null'}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                        <div className='flex space-x-4 justify-center'>
                            <button onClick={deleteFile}
                                disabled={!fileSelected}
                                className='
                    border
                    border-black 
                    rounded-md
                    h-10
                    w-40
                    shadow-xl
                    bg-red-500
                    '
                            >Quitar archivo</button>
                            <button onClick={(e) => { payToCollaborators(e); deleteFile() }}
                                className='
                    border
                    border-black 
                    rounded-md
                    h-10
                    w-40
                    shadow-xl
                    bg-green-500
                    '
                            >Pagar</button>
                        </div>
                    </div>
                    :
                    <div></div>
                }
            </div>
        </div>
    )
}

export default EmployeePayment