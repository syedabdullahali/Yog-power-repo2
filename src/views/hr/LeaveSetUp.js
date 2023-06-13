import {
    CCard,
    CCardBody,
    CCardHeader,
    CCardTitle,
    CCol,
    CRow,
    CTable,
    CTableHead,
    CTableRow,
    CTableHeaderCell,
    CTableBody,
    CTableDataCell

} from "@coreui/react";
import axios from "axios";


import React, { useState,useEffect } from "react";

let user = JSON.parse(localStorage.getItem('user-info'))
const token = user.token;
import { useSelector } from "react-redux";

const headers = {
    "Authorization": `Bearer ${token}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
   }



const LeaveSetUp= () => {
    const [leaveData,setLeaveData] = useState([])
    const url = useSelector((el) => el.domainOfApi)

    const getLeaveSetupData = async ()=>{
        try{
           let response = await  axios.get(`${url}/leaveSetUpMaster/all`,{headers})
            if(response.status===200){
                setLeaveData(response.data)
            }
        }catch(error){
         console.error(error)
        }
    }

useEffect(()=>{
getLeaveSetupData()
},[])




    return (
        <CRow>
            <CCol lg={12} sm={12}>
                <CCard className="mb-3 border-success">
                    <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                        <CCardTitle className="mt-2">Leave Setup</CCardTitle>
                    </CCardHeader>
                    <CCardBody>
                   
                                <CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345" }} hover responsive>
                        <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                           <CTableRow >
                                <CTableHeaderCell>Sr.No</CTableHeaderCell>
                                <CTableHeaderCell>year</CTableHeaderCell>

                                <CTableHeaderCell>No of Sl</CTableHeaderCell>
                                <CTableHeaderCell>No of CL</CTableHeaderCell>

                                <CTableHeaderCell>No of PL</CTableHeaderCell>
                                <CTableHeaderCell>Total Leave</CTableHeaderCell>                             
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {leaveData.map((el,i)=>
                            <CTableRow className="text-center">
                                <CTableDataCell>
                                   {i+1}
                                </CTableDataCell>
                                <CTableDataCell>{el.year}
                                </CTableDataCell>
                                <CTableDataCell>
                                    {el.noOfSl}
                                </CTableDataCell>
                                <CTableDataCell>
                                    {el.noOfCl}
                                </CTableDataCell>
                                <CTableDataCell>
                                    {el.noOfPl}
                                </CTableDataCell>   
                                <CTableDataCell>
                                    {el.totalLeave}
                                </CTableDataCell>                           
                            </CTableRow>   
                            )}                   
                        </CTableBody>
                    </CTable>                  
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default LeaveSetUp
