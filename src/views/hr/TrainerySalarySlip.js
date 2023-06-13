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
import { useSelector } from 'react-redux';

let user = JSON.parse(localStorage.getItem('user-info'))
const token = user.token;

import TrainerSlip from './TrainerSlip/TrainerSlip';

const TrainerySalary = () => {


    const [trainerSalarySlipData,setTrainerSalrySlipData] = useState([])  
    const url1 = useSelector((el) => el.domainOfApi)
    const [showInvoiceModal,setInvoceModal] = useState(false)
    const [empData,setEmpData] = useState([])
  
  
  
     const getTrainerSalarySlipData = ()=>{
      axios.get(`${url1}/trainerSalarySlip/all`, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      })
          .then((res) => {
              setTrainerSalrySlipData(res.data.reverse())
          })
          .catch((error) => {
              console.error(error)
          })
    }
    
    useEffect(()=>{
      getTrainerSalarySlipData()
    },[])
 
    const showSalarySlip =(item)=>{
        setEmpData(item)
        setInvoceModal(true)
    }
       

    return (<>
    
        <TrainerSlip
             empData={empData}
            showInvoiceModal={showInvoiceModal}
            setInvoceModal={setInvoceModal}
             />
         <CRow>
            <CCol lg={12} sm={12}>
                <CCard className="mb-3 border-success">
                    <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                        <CCardTitle className="mt-2">Trainer Salary Slip</CCardTitle>
                    </CCardHeader>
                    <CCardBody>


                        <CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345" }} hover responsive>
                            <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                                <CTableRow >
                                    <CTableHeaderCell>Sr no</CTableHeaderCell>
                                    <CTableHeaderCell>Date</CTableHeaderCell>
                                    <CTableHeaderCell>Trainer name</CTableHeaderCell>
                                    <CTableHeaderCell>Total Working Hours</CTableHeaderCell>  
                                    <CTableHeaderCell>Amount</CTableHeaderCell>             
                                    <CTableHeaderCell>TDS</CTableHeaderCell>  
                                    <CTableHeaderCell>PT</CTableHeaderCell>  
                                    <CTableHeaderCell>ADV DEC</CTableHeaderCell>      
                                    <CTableHeaderCell>Mode OF Payment</CTableHeaderCell>  
                                    <CTableHeaderCell>Net Salary</CTableHeaderCell>  
                                    <CTableHeaderCell>View</CTableHeaderCell>  

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
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            style={{ minWidth: "120px" }}
                                            type="text"
                                            disabled
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            style={{ minWidth: "100px" }}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            style={{ minWidth: "100px" }}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            style={{ minWidth: "100px" }}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            style={{ minWidth: "100px" }}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            style={{ minWidth: "100px" }}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            style={{ minWidth: "100px" }}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            style={{ minWidth: "100px" }}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            style={{ minWidth: "100px" }}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                      
                                </CTableRow>
                                {trainerSalarySlipData.map((el,i)=>{

                                return <CTableRow className='text-center' >
                                        <CTableDataCell>{i+1}</CTableDataCell>
                                        <CTableDataCell>{new Date(el.date).toLocaleDateString()}</CTableDataCell>

                                        <CTableDataCell>{el.trainerName}</CTableDataCell>
                                        <CTableDataCell>{el.totalWorkingHours}</CTableDataCell>
                                        <CTableDataCell>{el.totalAmount}</CTableDataCell>
                                        <CTableDataCell>{el.tds}%</CTableDataCell>

                                        <CTableDataCell>{el.pt}</CTableDataCell>
                                        <CTableDataCell>{el.advDec}</CTableDataCell>
                                        <CTableDataCell>{el.modeOfPayment}</CTableDataCell>
                                        <CTableDataCell>{el.amount}</CTableDataCell>
                                        <CTableHeaderCell><CButton onClick={()=>showSalarySlip(el)} >View</CButton></CTableHeaderCell>
                                    </CTableRow>
                                })}
                                      
                            </CTableBody>
                        </CTable>
                    </CCardBody>
                 
                </CCard>
            </CCol>
        </CRow>
        </>
        
    )
}

export default TrainerySalary
