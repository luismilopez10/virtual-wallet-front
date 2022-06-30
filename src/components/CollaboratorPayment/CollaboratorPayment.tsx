import React, { useEffect, useRef, useState } from 'react'
import readXlsxFile, { Row } from 'read-excel-file'
import { ExcelExport, ExcelExportColumn } from '@progress/kendo-react-excel-export';
import { getAllCollaborators } from '../../actions/collaborators/getAllCollaborators';
import { useAppDispatch } from '../../app/store';
import { collaboratorStateType, collaboratorType, selectCollaboratorStateTypeState, selectCollaboratorStateTypeStatus } from '../../features/collaboratorSlice';
import { useSelector } from 'react-redux';
import { putCollaborator } from '../../actions/collaborators/putCollaborator';
import { requestStatus } from '../../features/transaccionSlice';
import { isEmpty } from '@firebase/util';

function EmployeePayment() {

    const [collaborators, setCollaborators] = useState([{}])
    const [collaboratorsToPay, setCollaboratorsToPay] = useState([{}])
    const [payments, setPayments]: any = useState<Row[]>([])
    const _export = useRef<ExcelExport | null>(null)
    const inputFile = useRef(null) as any
    const [isDownload, setIsDownload] = useState(false)
    const [fileSelected, setFileSelected] = useState(false)
    const [paymentFail, setPaymentFail] = useState(false)
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
        })
    }

    const deleteFile = () => {
        if (inputFile.current !== null) {
            inputFile.current.value = ""
            setIsDownload(false)
            setFileSelected(false)
            setPaymentFail(false)
            setPayments([])
        }
    }

    const payToCollaborators = () => {
        let flag = false
        let collaboratorsToUpdate: any = []
        if (!isEmpty(payments)) {
            payments.forEach((payment:any) => {
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
                        // console.log("Collaborator found");
                        // console.log(collaboratorFound);
                        // console.log("Collaborator to update");
                        // console.log(collaboratorToUpdate);
                        collaboratorsToUpdate.push(collaboratorToUpdate)
                        console.log("fuuuuuckk");
                        console.log(collaboratorsToUpdate);
                        setCollaboratorsToPay([...collaboratorsToUpdate])
                        console.log(collaboratorsToPay);

                    } else {
                        alert(`El pago para ${payment[0]} contiene un valor no valido en el pago: ${payment[1]} , por favor cambiarlo e intentar de nuevo`)
                        setPaymentFail(true)
                        setCollaboratorsToPay([{}])
                    }
                } else {
                    alert(`El correo ${payment[0]} no existe en la base de datos`)
                    setPaymentFail(true)
                    setCollaboratorsToPay([{}])
                }

            })
            console.log(paymentFail);
            if (!paymentFail) {
                console.log("----------------------------------------------------");
                console.log(collaboratorsToPay);
                collaboratorsToPay.forEach((collaboratorToPay: any) => {
                    dispatch(putCollaborator(collaboratorToPay));
                    setPayments([])
                })
                alert("Los pagos se han realizado con éxito")
            } else {
                alert("No se pudo realizar los pagos")
            }
        }else{
            alert("no se ha cargado ningún archivo")
        }
    }

    return (
        <div className='grid justify-center space-y-0'>
            <div className='grid gap-y-5' style={{ marginTop: "5rem", marginBottom: "0rem" }}>
                <h1 className='text-4xl'>Pago de colaboradores</h1>
                <p>Por favor descarga el archivo Excel, ingresa los saldos a
                    <br />
                    pagar a cada colaborador y vuelve a montar el archivo</p>
            </div>
            <div className='grid grid-rows-4 grid-flow-col gap-y-10 justify-center '>
                <div>
                    <ExcelExport data={getCollaborators} ref={_export}>
                        <ExcelExportColumn field='email' title='Correo' width={200} />
                        <ExcelExportColumn field='pago' title='pago' width={200} />
                    </ExcelExport>
                </div>
                <div className='grid justify-center'>
                    <button
                        onClick={createExcel}
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
                <table>
                    <thead>
                        <tr>
                            <td>Correo</td>
                            <td>Pago</td>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment: { toString: () => string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }[]) => {
                            return <tr>
                                <td>{payment[0] ? payment[0].toString() : 'Null'}</td>
                                <td>{payment[1] ? payment[1].toString() : 'Null'}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
                <div className='flex space-x-4'>
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
                    <button onClick={() => { payToCollaborators(); deleteFile() }}
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
        </div>
    )
}

export default EmployeePayment