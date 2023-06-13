import React, { useEffect, useState } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCardTitle,
    CCol,
    CForm,
    CFormInput,
    CFormSelect,
    CFormTextarea,
    CInputGroup,
    CInputGroupText,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
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

import axios from 'axios'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import {MdDelete} from 'react-icons/md'



const ClientSupport = () => {
    const url1 = useSelector((el)=>el.domainOfApi)
    const [clientData,setClientData] = useState([]) 

  
const getClientSupport = async ()=>{
  const {data} = await  axios.get(`${url1}/clientSupport`)
  setClientData(data)
}

const updateStatus = async (obj)=>{
      obj.Status = !obj.Status
     axios.put(`${url1}/clientSupport/${obj._id}`,obj,{headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }}).then((res)=>{
        getClientSupport()
    })
}

const deleteFun = (obj)=>{
 axios.delete(`${url1}/clientSupport/${obj._id}`)
 .then((res)=>{
    getClientSupport()
})

}

useEffect(()=>{
getClientSupport()
},[])


    
    return (
        <CRow>
            <CCol lg={12} sm={12}>
                <CCard className='mb-3 border-top-success border-top-3'>
                    <CCardHeader>
                        <strong className="mt-2">Client Support <span className='float-end'>Total Left Clients :
                         </span></strong>
                    </CCardHeader>
                    <CCardBody>
                        <CRow className='d-flex justify-content-between'>
                            <CCol lg={4} sm={6} md={6}>
                                <CInputGroup className='mb-2'>
                                    <CFormSelect
                                        id="inputGroupSelect04"
                                        aria-label="Example select with button addon"
                                    >
                                        <option >Today</option>
                                        <option >Last Month</option>
                                        <option >Year</option>
                                    </CFormSelect>
                                   
                                </CInputGroup>
                            </CCol>
                            <CCol lg={6} sm={6} md={6}>
                                
                            </CCol>
                            <CCol xs={3}>
                                <CFormSelect
                                    className="mb-1"
                                    aria-label="Select Service Name"
                                    label="Filter By"

                                >
                                    <option value=''>Select</option>
                                    <option value='AssignStaff'>Assign Staff </option>
                                    <option value='EnquiryType'>Lead Sources </option>
                                    <option value='MemberManager'>Member Manager </option>
                                    <option value='serviceName'>Services Name </option>
                                    <option value='Customertype'>Customer Type </option>
                                    <option value='Gender'>Gender</option>
                                </CFormSelect>
                            </CCol>
                            <CCol xs={3}>
                                <CFormSelect
                                    className="mb-1"
                                    aria-label="Select Service Name"
                                    label="Sub-filter"

                                >
                                   
                                </CFormSelect>
                            </CCol>
                            <CCol></CCol>
                        </CRow>

                    
                        <CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345",width:'120%' }} hover responsive>
                            <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                                <CTableRow >
                                    <CTableHeaderCell>Sr.No</CTableHeaderCell>
                                    <CTableHeaderCell>Name</CTableHeaderCell>
                                    <CTableHeaderCell>Reg Mobile</CTableHeaderCell>
                                    <CTableHeaderCell>Type of Request</CTableHeaderCell>
                                    <CTableHeaderCell>Request Date</CTableHeaderCell>
                                    <CTableHeaderCell>Request details</CTableHeaderCell>
                                    <CTableHeaderCell>Status</CTableHeaderCell>
                                    <CTableHeaderCell>Medium</CTableHeaderCell>
                                    <CTableHeaderCell>Delete</CTableHeaderCell>
                                  
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
                                            style={{ minWidth: "120px" }}
                                            type="text"
                                            disabled
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "120px" }}
                                           
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            disabled
                                            style={{ minWidth: "90px" }}
                                        
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            disabled
                                            style={{ minWidth: "120px" }}
                                      
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "120px" }}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "100px" }}
                                          
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            disabled
                                            style={{ minWidth: "100px" }}
                                         
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            disabled
                                            style={{ minWidth: "100px" }}
                                          
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                  
                                 
                                   
                                    
                                   
                                </CTableRow>
                                {clientData.map((el,i)=>
                                <CTableRow >
                                    <CTableDataCell>{i+1}</CTableDataCell>
                                    <CTableDataCell><Link index={-1} style={{ textDecoration: 'none' }} to={`/clients/member-details/${el.memBerId}`} 
                                            target="_black">{el.Client_Name}</Link></CTableDataCell>

                                    <CTableDataCell>{el.Regular_Mobile_No}</CTableDataCell>
                                    <CTableDataCell>{el.Type_Of_Request}</CTableDataCell>
                                    <CTableDataCell>{el.Request_Date}</CTableDataCell>
                                    <CTableDataCell>{el.Request_Details}</CTableDataCell>
                                    <CTableDataCell className='text-center'>
                                        {el.Status?<CButton size='sm' className='bg-success border-success' onClick={()=>updateStatus(el)} >Active</CButton>:
                                        <CButton className='bg-danger' size='sm' onClick={()=>updateStatus(el)} >InActive</CButton>}
                                    </CTableDataCell>
                                    <CTableDataCell>{el.Medium}</CTableDataCell>
                                    <CTableDataCell className='text-center' style={{cursor:'pointer'}}>{<MdDelete
                                    onClick={()=>deleteFun(el)}
                                    />}</CTableDataCell>
                                                                          
                                </CTableRow>
                                )}
                            </CTableBody>
                        </CTable>

                    </CCardBody>


               
                </CCard>
            </CCol >
        </CRow >
    )
}

export default ClientSupport
