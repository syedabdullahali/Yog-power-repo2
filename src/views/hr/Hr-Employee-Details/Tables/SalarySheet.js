import React, { useEffect, useState } from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCardTitle,
    CCol,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CButton,   
} from '@coreui/react'
import { MdCall, MdDelete, MdEdit, MdMail } from 'react-icons/md';
import { useSelector } from "react-redux";
import axios from 'axios';
let user = JSON.parse(localStorage.getItem('user-info'))
const token = user.token;
const username = user.user.username;

import SalarySlip from '../../salarySlip/SalarySlip';

const SalarySheet = ({id}) => {
    const [salarySheetData,setSalarySheetData] = useState([])
    const [showInvoiceModal,setInvoceModal] = useState(false)
    const [empData,setEmpData] = useState([])
    const url = useSelector((el) => el.domainOfApi)



    const headers = {
        "Authorization": `Bearer ${token}`,
       }


   
   



    const getShitTimeData = ()=>{
        axios.get(`${url}/salarySheet/emp/${id}`,{headers}).then((el)=>{
         if(!el.status){
          return 
         }
         setSalarySheetData(el.data.reverse())
       }).catch((error)=>{console.log(error)})
       }


    useEffect(() => {
        getShitTimeData()

    }, [])


 const showSalarySlip =(item)=>{
 setEmpData(item)
 setInvoceModal(true)
 }



    return (
      <>
             <SalarySlip
             empData={empData}
            showInvoiceModal={showInvoiceModal}
            setInvoceModal={setInvoceModal}
             />

        <CRow>
            <CCol lg={12} sm={12}>
                <div className="mb-3 border-success">
                    

                    <CCardBody>

                        <CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345" }} hover responsive>
                            <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                                <CTableRow >
                                    <CTableHeaderCell>Sr.No</CTableHeaderCell>
                                    <CTableHeaderCell>Month</CTableHeaderCell>
                                    <CTableHeaderCell>Emp Id</CTableHeaderCell>
                                    <CTableHeaderCell>Emp Name</CTableHeaderCell>
                                    <CTableHeaderCell>Designations</CTableHeaderCell>
                                    <CTableHeaderCell>Basic Slarry</CTableHeaderCell>
                                    <CTableHeaderCell>Late Mark</CTableHeaderCell>
                                    <CTableHeaderCell>Half day</CTableHeaderCell>
                                    <CTableHeaderCell>Leave day</CTableHeaderCell>
                                    <CTableHeaderCell>Adjust Leave</CTableHeaderCell>
                                    <CTableHeaderCell>T W D</CTableHeaderCell>
                                    <CTableHeaderCell>Gross Salary</CTableHeaderCell>                                  
                                    <CTableHeaderCell>Incentive</CTableHeaderCell>
                                    <CTableHeaderCell>Advanced Salary Dedct</CTableHeaderCell>
                                    <CTableHeaderCell>Net Salary</CTableHeaderCell>
                                    <CTableHeaderCell>Remark</CTableHeaderCell>
                                    <CTableHeaderCell>Salary Slip </CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                
                                
                                {salarySheetData.filter((el)=>el.username === username).map((item, index) => (
                                        <CTableRow key={index}>
                                            <CTableDataCell>{index + 1 }</CTableDataCell>
                                            <CTableDataCell>{item.month}</CTableDataCell>
                                            <CTableDataCell>{item.empId}</CTableDataCell>
                                            <CTableDataCell>{item.empName}</CTableDataCell>
                                            <CTableDataCell>{item.Designations}</CTableDataCell>
                                            <CTableDataCell>{item.BasicSalary}</CTableDataCell>
                                            <CTableDataCell>{item.lateMark}</CTableDataCell>
                                            <CTableDataCell>{item.halfday}</CTableDataCell>
                                            <CTableDataCell>{item.leaveDay}</CTableDataCell>
                                            <CTableDataCell>{item.adjustLeave}</CTableDataCell>
                                            <CTableDataCell>{item.TWD}</CTableDataCell>
                                            <CTableDataCell>{item.grossSalary}</CTableDataCell>
                                            <CTableDataCell>{item.incentive}</CTableDataCell>
                                            <CTableDataCell>{item.advancedSalaryDedct}</CTableDataCell>
                                            <CTableDataCell>{item.netSalary}</CTableDataCell>
                                            <CTableDataCell>{item.remark}</CTableDataCell>
                                            <CTableHeaderCell><CButton onClick={()=>showSalarySlip(item)} >View</CButton></CTableHeaderCell>
                                        </CTableRow>
                                ))}
                            </CTableBody>
                        </CTable>
                    </CCardBody>
                   
                </div>
            </CCol>
        </CRow>
    </>
    )
}

export default SalarySheet
