import React, { useEffect, useState } from 'react'
import {
    CButton,
    CButtonGroup,
    CCard,
    CCardBody,
    CCardHeader,
    CCardTitle,
    CCol,
    CFormInput,
    CFormSelect,
    CInputGroup,
    CInputGroupText,
    CPagination,
    CPaginationItem,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowCircleBottom, cilArrowCircleTop, cilInfo } from '@coreui/icons'
import { MdCall, MdDelete, MdEdit, MdMail } from 'react-icons/md';
import { BsPlusCircle, BsWhatsapp } from 'react-icons/bs';
import axios from 'axios';
import moment from 'moment';
import { useSelector } from "react-redux";


const EmpJoining = () => {

    const [empJoininSheetData,setEmpJoininSheetData] = useState([])
    const url = useSelector((el) => el.domainOfApi)


    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;
    console.log(token);

    const headers = {
        "Authorization": `Bearer ${token}`,
       }
    
    useEffect(()=>{
        getEmpJoiningData()    
    },[])

    const getEmpJoiningData = ()=>{
        axios.get(`${url}/empJoining/all`,{headers}).then((el)=>{
         console.log(el.data)
         if(!el.data){
          return 
         }
         setEmpJoininSheetData(el.data)
       }).catch((error)=>{console.log(error)})
       }

   

    return (
        <CRow>
            <CCol lg={12} sm={12}>
                <CCard className="mb-3 border-success">
                    <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                        <CCardTitle className="mt-2">Employee Joining</CCardTitle>
                    </CCardHeader>
                    <CCardBody>
                        
                        <CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345" }} hover responsive>
                            <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                                <CTableRow >
                                    <CTableHeaderCell>Sr.No</CTableHeaderCell>
                                   <CTableHeaderCell style={{width:'200px'}}>Document Name</CTableHeaderCell>
                                   <CTableHeaderCell>Document Details</CTableHeaderCell>
                                
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                              {empJoininSheetData.map((el,i)=>
                              
                              <CTableRow className="text-center">
                                    <CTableDataCell>
                                         {i+1}
                                    </CTableDataCell>
                                    <CTableDataCell > 
                                        {el.DocumentName}            
                                    </CTableDataCell>

                                    <CTableDataCell>
                                        {el.documentDetails}
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

export default EmpJoining
