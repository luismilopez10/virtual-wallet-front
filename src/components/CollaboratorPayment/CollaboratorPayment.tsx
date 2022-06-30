import React, { useEffect, useRef, useState } from 'react'
import { saveAs } from 'file-saver'
import readXlsxFile from 'read-excel-file'
import { ExcelExport, ExcelExportColumn } from '@progress/kendo-react-excel-export';
import { fetchAllCollaborators } from '../../actions/getAllCollaborators';

function EmployeePayment() {

    const [collaborators, setCollaborators] = useState([{}])
    const _export = useRef<ExcelExport | null>(null)
    const inputFile = useRef(null)
    const [isDownload, setIsDownload] = useState(false)
    const [fileSelected, setFileSelected] = useState(false)



    useEffect(() => {
        fetchAllCollaborators().then(
            collaborators => {
                console.log(collaborators);
                setCollaborators(collaborators)
            }
        )
    }, [])

    const createExcel = () => {
        if (_export.current !== null) {
            _export.current.save();
            setIsDownload(true)
        }
    }

    const readExcel = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0]
        readXlsxFile(file).then((rows) => {
            setCollaborators(rows)
            setFileSelected(true)
        })
    }

    const deleteFile = () => {
        if (inputFile.current !== null) {
            inputFile.current.value = ""
            setIsDownload(false)
            setFileSelected(false)
        }
    }

    const payToCollaborators = () => {

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
                    <ExcelExport data={collaborators} ref={_export}>
                        <ExcelExportColumn field='email' title='Correo' width={200} />
                        <ExcelExportColumn field='name' title='Nombre' width={200} />
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
                    <button onClick={deleteFile}
                        disabled={!fileSelected}
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