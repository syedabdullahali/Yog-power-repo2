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

import { useEffect,useCallback,useState } from 'react'
import axios from 'axios';


function WorkOutTempletTable(){

    const url = useSelector((el)=>el.domainOfApi) 


    const [workOutData,setWorkOutData] =useState([])    
      const getWorkOutData = useCallback(async ()=>{
        const {data} = await axios.get(`${url}/workouttemplate`)
        setWorkOutData(data)
      console.log(data)
       },[])
      
    useEffect(()=>{
    getWorkOutData()
    },[getWorkOutData])



return <CTable className='m-3 p-2' align="middle" bordered style={{ borderColor: "#0B5345",width:'180%' }} hover responsive>
<CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
    <CTableRow >
        <CTableHeaderCell>Sr No</CTableHeaderCell>
        <CTableHeaderCell>Types of Exercise</CTableHeaderCell>
        <CTableHeaderCell>Exercise Image</CTableHeaderCell>
        <CTableHeaderCell>Video</CTableHeaderCell>
        <CTableHeaderCell>Exercise Name</CTableHeaderCell>
        <CTableHeaderCell>Description</CTableHeaderCell>
        <CTableHeaderCell>Edit/Delete</CTableHeaderCell>
        <CTableHeaderCell>Create Workout</CTableHeaderCell>
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
        
        
       
    </CTableRow>
    {workOutData.map((el,i)=>

<CTableRow>                               
  <CTableDataCell>{i+1}</CTableDataCell>
  <CTableDataCell>{el.Type_Of_Exercise}</CTableDataCell>
  <CTableDataCell></CTableDataCell>
  <CTableDataCell></CTableDataCell>
  <CTableDataCell>{el.Exercise_Name}</CTableDataCell>
  <CTableDataCell>{el.Description}</CTableDataCell>
  <CTableDataCell>{el.EndDate} </CTableDataCell>
  <CTableDataCell>{el.Package}</CTableDataCell>                
</CTableRow>


)}
   
</CTableBody>
</CTable>

}

export default WorkOutTempletTable