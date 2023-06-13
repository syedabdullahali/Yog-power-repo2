import { cilArrowCircleBottom, cilArrowCircleTop } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import { MdCall, MdDelete, MdEdit, MdMail } from 'react-icons/md';
import { BsPlusCircle, BsWhatsapp } from 'react-icons/bs';
import {
    CButton,
    CButtonGroup,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CFormInput,
    CFormSelect,
    CInputGroup,
    CInputGroupText,
    CNav,
    CNavItem,
    CNavLink,
    CRow,
    CTabContent,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CTabPane,
} from '@coreui/react'
import React, { useState,useCallback,useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'


let user = JSON.parse(localStorage.getItem('user-info'))
const username = user.user.username;
const token = user.token;

const ServicesRateCard = () => {
    const [activeKey, setActiveKey] = useState(1)
    const url = useSelector((el)=>el.domainOfApi)  
    const [servicesRateCard,setServicesRateCard] = useState([])


    const  getSalesCallData = useCallback(async function() {
        try{
        const response1 = await axios.get(`${url}/packagemaster`)
        setServicesRateCard(response1.data)
        }catch(error) {
                console.error(error)
        }
    },[])

    useEffect(() => {
        getSalesCallData()
    },[ getSalesCallData]) 
   


    return (
        <CRow>
            <CCol xs={12}>
                <CCard>
                    <CCardHeader  style={{ backgroundColor: '#0B5345', color: 'white' }}>
                        <CNav responsive variant="pills" role="tablist">
                            <CNavItem>
                                <CNavLink
                                    href="javascript:void(0);"
                                    active={activeKey === 1}
                                    onClick={() => setActiveKey(1)}
                                >
                                    Services Rate Card
                                </CNavLink>
                            </CNavItem>
                           
                        </CNav>
                    </CCardHeader>
                    <CCardBody >
                        <CTabContent>
                            <CTabPane responsives role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>

                               
                                <CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345" }} hover responsive>
                    <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                        <CTableRow >
                            <CTableHeaderCell>Sr.No</CTableHeaderCell>
                            <CTableHeaderCell>Service</CTableHeaderCell>
                            <CTableHeaderCell>Variation</CTableHeaderCell>
                            <CTableHeaderCell>Package Name</CTableHeaderCell>
                            <CTableHeaderCell>Duration</CTableHeaderCell>
                            <CTableHeaderCell>Fees</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {servicesRateCard.map((item, index) => (
                            item.username === username && (
                                <CTableRow key={index}>
                                    <CTableDataCell>{index + 1}</CTableDataCell>
                                    <CTableDataCell>{item.Service}</CTableDataCell>
                                    <CTableDataCell>{item.Variation}</CTableDataCell>
                                    <CTableDataCell>{item.Package_Name}</CTableDataCell>
                                    <CTableDataCell>{item.Duration}</CTableDataCell>
                                    <CTableDataCell>{item.Fees}</CTableDataCell>
                                </CTableRow>
                            )
                        ))}
                    </CTableBody>
                </CTable>
                            </CTabPane>
                        
                        </CTabContent>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}
export default ServicesRateCard