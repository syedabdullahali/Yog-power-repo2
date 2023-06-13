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


const ShiftTimingManagment = () => {

    const [shiftTimeingData,setShitTimeingData] = useState([])
    const url = useSelector((el) => el.domainOfApi)


    let user = JSON.parse(localStorage.getItem('user-info'))
    console.log(user);
    const token = user.token;
  
    useEffect(() => {
        getShitTimeData()
    }, [])

    
    const headers = {
        "Authorization": `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
       }
    
       function formatTime(timeString) {
        if(!timeString){
            return 
           }
        const [hourString, minute] = timeString?.split(":");
       
        const hour = +hourString % 24;
        return (hour % 12 || 12) + ":" + minute + (hour < 12 ? "AM" : "PM");
    }
    
      
      const getShitTimeData = ()=>{
       axios.get(`${url}/shiftTimeSchedule/all`,{headers}).then((el)=>{
        if(!el.status){
         return 
        }
        setShitTimeingData(el.data)
      }).catch((error)=>{console.log(error)})
      }





    return (
        <CRow>
            <CCol lg={12} sm={12}>
                <CCard className="mb-3 border-success">
                    <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                        <CCardTitle className="mt-2">Shift Timing </CCardTitle>
                    </CCardHeader>
                    <CCardBody>
                      
                        <CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345" }} hover responsive>
                            <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                                <CTableRow >
                                    <CTableHeaderCell>Sr.No</CTableHeaderCell>
                                    <CTableHeaderCell>Shift Name</CTableHeaderCell>
                                    <CTableHeaderCell>In Time</CTableHeaderCell>
                                    <CTableHeaderCell>Out Time</CTableHeaderCell>
                                   
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                               
                            {shiftTimeingData.map((el,i)=>
                              
                              <CTableRow className="text-center">
                                    <CTableDataCell>
                                         {i+1}
                                    </CTableDataCell>
                                    <CTableDataCell>
                                      {el.shiftName}
                                    </CTableDataCell>
                                    <CTableDataCell>                                    
                                      { formatTime(el.startTime)} 
                                    </CTableDataCell>
                                    <CTableDataCell>             
                                    { formatTime(el.endTime)} 
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

export default ShiftTimingManagment
