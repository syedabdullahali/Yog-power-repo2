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

const EmpPerformanceTable = () => {
    const [employeePerformance,setEmployeePerformance] = useState([])
    const url = useSelector((el) => el.domainOfApi)


    useEffect(()=>{
        getEmpPerformance()
      },[])
      
      
    function getEmpPerformance(){
        axios.get(`${url}/employeePerformance/all`, {headers})
        .then((res) => {
          setEmployeePerformance(res.data.reverse())
        }).catch((error) => {console.error(error)})
      }
      

      
  return (
    <>
     

     <CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345" }} hover responsive>
                            <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                                <CTableRow >
                                    <CTableHeaderCell>Sr No</CTableHeaderCell>
                                    <CTableHeaderCell>Name</CTableHeaderCell>
                                    <CTableHeaderCell>Emp Id</CTableHeaderCell>
                                    <CTableHeaderCell>Department</CTableHeaderCell>
                                    <CTableHeaderCell>Designation</CTableHeaderCell>
                                    <CTableHeaderCell>Punctuality</CTableHeaderCell>
                                    <CTableHeaderCell>Productivity</CTableHeaderCell>
                                    <CTableHeaderCell>Response</CTableHeaderCell>
                                    <CTableHeaderCell>Additional Comments</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                            {employeePerformance.map((el,i)=> 
                               <CTableRow className='text-center'>
                                    <CTableDataCell>{i+1}</CTableDataCell>
                                    <CTableDataCell>{el.name}</CTableDataCell>
                                    <CTableDataCell>{el.empId}</CTableDataCell>
                                    <CTableDataCell>{el.department}</CTableDataCell>
                                    <CTableDataCell>{el.designation}</CTableDataCell>
                                    <CTableDataCell>{el.punctuality}</CTableDataCell>
                                    <CTableDataCell>{el.productivity}</CTableDataCell>
                                    <CTableDataCell>{el.response}</CTableDataCell>
                                    <CTableDataCell>{el.additionalComments}</CTableDataCell>                                  
                                </CTableRow>)}                                                               
                            </CTableBody>
                        </CTable>
   </>                     
  )
}

export default EmpPerformanceTable
