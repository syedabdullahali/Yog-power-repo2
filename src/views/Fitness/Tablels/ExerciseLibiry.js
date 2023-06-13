import axios from 'axios';
import { useEffect, useCallback, useState } from 'react'

import {
    CFormInput,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from '@coreui/react'

import { useSelector } from 'react-redux'
import { BsWhatsapp } from "react-icons/bs";
import { MdCall, MdDelete, MdEdit, MdMail } from "react-icons/md";

function ExerciseLibiry() {


    const url = useSelector((el) => el.domainOfApi)


    const [exerciseLibraryData, setExerciseLibraryData] = useState([])
    const getExerciseLibraryData = useCallback(async () => {
        const { data } = await axios.get(`${url}/exerciselibrary`)
        setExerciseLibraryData(data)
        console.log(data)
    }, [])

    useEffect(() => {
        getExerciseLibraryData()
    }, [getExerciseLibraryData])


    return <CTable className='m-3 p-2' align="middle" bordered style={{ borderColor: "#0B5345", width: '180%' }} hover responsive>
        <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
            <CTableRow >
                <CTableHeaderCell>Sr No</CTableHeaderCell>
                <CTableHeaderCell>Category Name</CTableHeaderCell>
                <CTableHeaderCell>Exercise Image</CTableHeaderCell>
                <CTableHeaderCell>Video</CTableHeaderCell>
                <CTableHeaderCell>Exercise Name</CTableHeaderCell>
                <CTableHeaderCell>Description </CTableHeaderCell>
                <CTableHeaderCell>Created By</CTableHeaderCell>
                <CTableHeaderCell>Action</CTableHeaderCell>
                <CTableHeaderCell>Edit/delete</CTableHeaderCell>

            </CTableRow>
        </CTableHead>
        <CTableBody>
            <CTableRow>
                <CTableDataCell>
                    <CFormInput
                        className="mb-1"
                        style={{ minWidth: "60px" }}
                        type="text"
                        aria-describedby="exampleFormControlInputHelpInline"
                    />
                </CTableDataCell>
                <CTableDataCell>
                    <CFormInput
                        className="mb-1"
                        style={{ minWidth: "120px" }}
                        type="text"
                        aria-describedby="exampleFormControlInputHelpInline"
                    />
                </CTableDataCell>
                <CTableDataCell>
                    <CFormInput
                        className="mb-1"
                        type="text"
                        style={{ minWidth: "120px" }}
                        aria-describedby="exampleFormControlInputHelpInline"
                    />
                </CTableDataCell>
                <CTableDataCell>
                    <CFormInput
                        className="mb-1"
                        type="text"
                        style={{ minWidth: "90px" }}

                        aria-describedby="exampleFormControlInputHelpInline"
                    />
                </CTableDataCell>
                <CTableDataCell>
                    <CFormInput
                        className="mb-1"
                        type="number"
                        style={{ minWidth: "100px" }}

                    />
                </CTableDataCell>
                <CTableDataCell>
                    <CFormInput
                        className="mb-1"
                        type="text"
                    />
                </CTableDataCell>
                <CTableDataCell>
                    <CFormInput
                        className="mb-1"
                        type="text"
                    />
                </CTableDataCell>
                <CTableDataCell>
                    <CFormInput
                        className="mb-1"
                        type="text"

                    />
                </CTableDataCell>
                <CTableDataCell>
                    <CFormInput
                        className="mb-1"
                        type="text"
                    />
                </CTableDataCell>




            </CTableRow>
                {exerciseLibraryData.map((el,i)=>

<CTableRow>                               
  <CTableDataCell>{i+1}</CTableDataCell>
  <CTableDataCell>{el.Category_Name}</CTableDataCell>
  <CTableDataCell></CTableDataCell>
  <CTableDataCell></CTableDataCell>
  <CTableDataCell>{el.Exercise_Name}</CTableDataCell>
  <CTableDataCell>{el.Description}</CTableDataCell>
  <CTableDataCell>{el.Created_By} </CTableDataCell>
  <CTableDataCell className='text-center'><a href={`tel:`} target="_black">
    <MdCall style={{ cursor: 'pointer', markerStart: '10px' }} size='20px' />
    </a><a  target="_black"><BsWhatsapp style={{ marginLeft: "4px", cursor: 'pointer', markerStart: '10px' }} size='20px' />
    </a><a href={`mailto: `} target="_black"> <MdMail style={{ cursor: 'pointer', markerStart: '10px', marginLeft: "4px" }} size='20px' /></a> </CTableDataCell>
  <CTableDataCell className='text-center'><MdEdit style={{ fontSize: '35px', cursor: 'pointer', markerStart: '10px' }} size='20px' /> <MdDelete style={{ cursor: 'pointer', markerStart: '10px', marginLeft: "5px" }}  size='20px' /></CTableDataCell>   
</CTableRow>


)}
       
        </CTableBody>
    </CTable>

}


export default ExerciseLibiry