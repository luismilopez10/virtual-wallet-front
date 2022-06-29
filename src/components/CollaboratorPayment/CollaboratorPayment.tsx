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
        if(inputFile.current !== null){
            inputFile.current.value = ""
            setIsDownload(false)
            setFileSelected(false)
        }
    }

    return (
        <div>
            <ExcelExport data={collaborators} ref={_export}>
                <ExcelExportColumn field='email' title='Correo' width={200}/>
                <ExcelExportColumn field='name' title='Nombre' width={200}/>
                <ExcelExportColumn field='pago' title='pago' width={200}/>
            </ExcelExport>
            <button onClick={createExcel}>Export Excel</button>
            <button onClick={deleteFile} disabled={!fileSelected}>Delete file</button>
            <input type="file" onChange={(e) => readExcel(e)} disabled={!isDownload} ref={inputFile}/>
        </div>
    )
}

export default EmployeePayment