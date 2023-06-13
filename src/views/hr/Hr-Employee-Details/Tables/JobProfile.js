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


let user = JSON.parse(localStorage.getItem('user-info'))
console.log(user);
const token = user.token;

const JobProfile = ({id}) => {

    const headers = {
        "Authorization": `Bearer ${token}`,
       }

    const [Search1, setSearch1] = useState('')
    const [Search2, setSearch2] = useState('')
    const [Search10, setSearch10] = useState('')
    const url = useSelector((el) => el.domainOfApi)
    const [jobProfileData,setJobProfileData] = useState([])



    
    const getStaffJobProfile = async () => {
        try {
            const response1 =  axios.get(`${url}/jobProfile/all`, { headers })
            const response2 = axios.get(`${url}/employeeform/${id}`, { headers })

            const data = await Promise.all([response1, response2])
            const jobProfileStaffData =   data[0].data.filter((el)=>el.Designations.trim() === data[1].data.JobDesignation.trim())

                setJobProfileData(jobProfileStaffData)
        


        } catch (error) {
            console.log(error)
        }


    }

    useEffect(() => {
        getStaffJobProfile()
    }, []);


    return (
        <CRow>
            <CCol lg={12} sm={12}>
                <CCard className="mb-3 border-success">
                    <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                        <CCardTitle className="mt-2">Job Profile</CCardTitle>
                    </CCardHeader>
                    <CCardBody>
                        
                        <CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345" }} hover responsive>
                            <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                                <CTableRow >
                                    <CTableHeaderCell>Sr.No</CTableHeaderCell>

                                    <CTableHeaderCell>Designation</CTableHeaderCell>
                                    <CTableHeaderCell>Job Profile</CTableHeaderCell>
                                 
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                <CTableRow>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            style={{ minWidth: "60px" }}
                                            type="text"
                                            disabled
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "90px" }}
                                            value={Search1}
                                            onChange={(e) => setSearch1(e.target.value)}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "90px" }}
                                            value={Search1}
                                            onChange={(e) => setSearch1(e.target.value)}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                  
                                  
                                </CTableRow>
                                {jobProfileData.map((el,i) => (
                            <CTableRow className="text-center">
                                <CTableDataCell>
                                    {i+1}
                                </CTableDataCell>
                                <CTableDataCell>
                                    {el.Designations}
                                </CTableDataCell>
                                <CTableDataCell style={{width:'600px'}}>
                                    {el.jobProfile}
                                </CTableDataCell>         
                               
                            </CTableRow>

                                ))}
                            </CTableBody>
                        </CTable>
                    </CCardBody>
                  
                </CCard>
            </CCol>
        </CRow>
    )
}

export default JobProfile
