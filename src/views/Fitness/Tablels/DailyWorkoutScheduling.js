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


function DailyWorkoutScheduling(){

    const url = useSelector((el) => el.domainOfApi)


    const [exerciseLibraryData, setExerciseLibraryData] = useState([])
    const getExerciseLibraryData = useCallback(async () => {
        const { data } = await axios.get(`${url}/dailyworkoutscheduling`)
        setExerciseLibraryData(data)
        console.log(data)
    }, [])

    useEffect(() => {
        getExerciseLibraryData()
    }, [getExerciseLibraryData])

return <CTable className='m-3 p-2' align="middle" bordered style={{ borderColor: "#0B5345", width: '150%' }} hover responsive>
<CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
    <CTableRow >
        <CTableHeaderCell>Sr No</CTableHeaderCell>
        <CTableHeaderCell>Workout Name</CTableHeaderCell>
        <CTableHeaderCell>No of Days</CTableHeaderCell>
        <CTableHeaderCell>Created Date</CTableHeaderCell>
        <CTableHeaderCell>Created From</CTableHeaderCell>
        <CTableHeaderCell>Created By</CTableHeaderCell>
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




    </CTableRow>
    {exerciseLibraryData.map((el,i)=>

<CTableRow key={i}>                               
  <CTableDataCell>{i+1}</CTableDataCell>
  <CTableDataCell>{el.Workout_Name}</CTableDataCell>
  <CTableDataCell>{el.No_Of_Days}</CTableDataCell>
  <CTableDataCell>{el.Created_Date}</CTableDataCell>
  <CTableDataCell>{el.Created_From}</CTableDataCell>
  <CTableDataCell>{el.Created_By} </CTableDataCell>
  <CTableDataCell className='text-center'>
     <MdEdit style={{ fontSize: '35px', cursor: 'pointer', markerStart: '10px' }} size='20px' />
     <MdDelete style={{ cursor: 'pointer', markerStart: '10px', marginLeft: "5px" }}  size='20px' />
  </CTableDataCell>   
</CTableRow>)}


</CTableBody>
</CTable>



}
export default DailyWorkoutScheduling