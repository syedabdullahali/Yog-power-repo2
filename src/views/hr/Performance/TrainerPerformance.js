import React, { useEffect, useState } from 'react'
import {
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from '@coreui/react'
import axios from 'axios';
import { useSelector } from 'react-redux';


let user = JSON.parse(localStorage.getItem('user-info'))
const token = user.token;

const headers = {
    "Authorization": `Bearer ${token}`,
   }


const TrainerPerformance = () => {

    const [trainerloyeePerformance,settrainerloyeePerformance] = useState([])
    const url = useSelector((el) => el.domainOfApi)


    useEffect(()=>{
        gettrainerPerformance()
      },[])
      
      
    function gettrainerPerformance(){
        axios.get(`${url}/trainerPerformance/all`, {headers})
        .then((res) => {
            console.log(res.data)
          settrainerloyeePerformance(res.data.reverse())
        }).catch((error) => {console.error(error)})
      }

  return (
    <CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345" }} hover responsive>
    <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
            <CTableRow >
                <CTableHeaderCell>Sr No </CTableHeaderCell>
                <CTableHeaderCell>Name</CTableHeaderCell>
                <CTableHeaderCell>Trainer Id</CTableHeaderCell>
                <CTableHeaderCell>Department</CTableHeaderCell>
                <CTableHeaderCell>Designation</CTableHeaderCell>
                <CTableHeaderCell>Punctuality</CTableHeaderCell>
                <CTableHeaderCell>Attendance %</CTableHeaderCell>
                <CTableHeaderCell>Renewals %</CTableHeaderCell>
                <CTableHeaderCell>Training Feed Back</CTableHeaderCell>
                <CTableHeaderCell>Behaviour</CTableHeaderCell>
                <CTableHeaderCell>Overall feedback</CTableHeaderCell>

            </CTableRow>
        </CTableHead>
        <CTableBody>
            {trainerloyeePerformance.map((el,i)=>

            <CTableRow >
                        <CTableDataCell>{i+1}</CTableDataCell>
                        <CTableDataCell>{el.name}</CTableDataCell>
                        <CTableDataCell>{el.empId}</CTableDataCell>
                        <CTableDataCell>{el.department}</CTableDataCell>
                        <CTableDataCell>{el.designation}</CTableDataCell>
                        <CTableDataCell>{el.punctuality}</CTableDataCell>
                        <CTableDataCell>{el.Attendance}</CTableDataCell>
                        <CTableDataCell>{el.renewals}</CTableDataCell>
                        <CTableDataCell>{el.feedBACK}</CTableDataCell>
                        <CTableDataCell>{el.Behaviour}</CTableDataCell>
                        <CTableDataCell>{el.feedBACK}</CTableDataCell>                                        
                    </CTableRow>
            
            )}
                    
        </CTableBody>
    </CTable>
  )
}

export default TrainerPerformance
