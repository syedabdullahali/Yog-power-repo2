import { cilArrowCircleTop } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
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
    CFormSwitch,
    CFormTextarea,
    CPagination,
    CPaginationItem,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from "@coreui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
const url = 'https://yog-seven.vercel.app'
const url2 = 'https://yog-seven.vercel.app'
import { useSelector } from "react-redux";

const Referrals = ({ id }) => {
    const [action, setAction] = useState(false)
    const [Title, setTitle] = useState('')
    const [Policy, setPolicy] = useState('')
    const url = useSelector((el)=>el.domainOfApi) 


    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;
    const username = user.user.username;
    const [result1, setResult1] = useState([]);
    const [paging, setPaging] = useState(0);
    const headers = {
        'Authorization': `Bearer ${token}`,
        'My-Custom-Header': 'foobar'
    };
    useEffect(() => {
        getMem()
    }, []);

   function getMem() {
        axios.get(`${url}/memberForm/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                setResult1([res.data].filter((el)=>el?.ClientReferenceName))
            
            })
            .catch((error) => {
                console.error(error)
            })
    }

    
    return (
        <CRow>

            <CCol xs={12}>
                <div className='d-flex justify-content-between mb-2'>
                    <div className='mt-2 ms-2'>
                        <CCardTitle>Referrals  </CCardTitle>
                    </div>
                   

                </div>
            </CCol>
            <CCol lg={12} sm={12}>
                <CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345" }} hover responsive>
                    <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                        <CTableRow >
                            <CTableHeaderCell>Sno.</CTableHeaderCell>
                            <CTableHeaderCell>Refer by</CTableHeaderCell>
                            <CTableHeaderCell>Refer to</CTableHeaderCell>
                            <CTableHeaderCell>Number</CTableHeaderCell>
                            <CTableHeaderCell>Service</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>

                        {result1.slice(paging * 10, paging * 10 + 10).map((item, index) => (
                                <CTableRow key={index}>
                                    <CTableDataCell>{index + 1 + (paging * 10)}</CTableDataCell>
                                    <CTableDataCell>{item.ClientReferenceName}</CTableDataCell>
                                    <CTableDataCell>{item.Fullname}</CTableDataCell>
                                    <CTableDataCell> {item.ContactNumber} </CTableDataCell>
                                    <CTableDataCell> {item.serviceName} </CTableDataCell>
                                </CTableRow>

                            ))}
                    </CTableBody>
                </CTable>

            </CCol>
        </CRow>
    )
}

export default Referrals
