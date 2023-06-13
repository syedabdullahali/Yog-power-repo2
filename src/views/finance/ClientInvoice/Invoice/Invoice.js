import {
    CButton,
    CCol,
    CFormInput,
    CFormSelect,
    CImage,
    CInputGroup,
    CInputGroupText,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from "@coreui/react";

import React, { useEffect, useState,useRef } from 'react'
import axios from "axios";
import logo from 'src/assets/images/avatars/icon.png'
import moment from "moment/moment";
import {RxCross2} from 'react-icons/rx'
import { useReactToPrint } from "react-to-print";

const Invoice = ({InvoiceData,visibale,setPrinInvoice}) => {


const componentRef = useRef()


const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'yog-power',
    onAfterPrint: () =>{
        alert('print success')
        setPrinInvoice(false)
    } 
})
    
     return            <CModal  size="xl" alignment="center" scrollable visible={visibale} onClose={()=>setPrinInvoice(false)}>
                <CModalHeader>
                    <CModalTitle>Invoice</CModalTitle>
                </CModalHeader>
                <CModalBody ref={componentRef} className="p-4">
                    <CRow>
                        <CCol lg={12} className='text-center'><CImage src={logo} width="100px" height='100px' /></CCol>
                        <CCol lg={12} className='text-center mt-2'><h5>Yog Power International  </h5></CCol>    
                    </CRow>
                  
                    <CRow className="mt-2">
                        <CCol>
                        Full Name:- {InvoiceData?.Fullname} <br/>
                        Contact Number:- {InvoiceData?.contact} <br/>
                        Customer Id:- {InvoiceData?.clientId} <br/> 
                        </CCol>
                        <CCol lg={4} className='text-center mt-4'><h4>Invoice</h4></CCol>
                        <CCol >
                            Date : {moment(new Date(InvoiceData.date)).format('YYYY-MM-DD')}<br />
                            Invoice No :{InvoiceData.InvoiceNo}  <br />
                            <CRow>
                                <CCol lg={9}>
                                    <CInputGroup>
                                        <CInputGroupText
                                            component="label"
                                            htmlFor="inputGroupSelect01"
                                        >
                                            Counseller :
                                        </CInputGroupText>
                                        <CFormInput
                                         value={InvoiceData?.counseller}
                                         disabled  className="bg-body"                                                                                             
                                        >                                          
                                        </CFormInput>
                                    </CInputGroup>
                                </CCol>
                            </CRow>
                        </CCol>
    
                    </CRow>
                     <div className="py-3">
                      <CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345" }} hover responsive>
                    <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                        <CTableRow >
                            <CTableHeaderCell>Sr.No</CTableHeaderCell>
                            <CTableHeaderCell>Product Code</CTableHeaderCell>
                            <CTableHeaderCell>Product Name</CTableHeaderCell>
                            <CTableHeaderCell>Brand Name</CTableHeaderCell>
                            <CTableHeaderCell>No of item</CTableHeaderCell>
                            <CTableHeaderCell>Total Price</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                     
                     
                     
                        {InvoiceData?.InventoryStock?.map((item, index) => {

                    return <CTableRow key={index} className='text-center'>
                                <CTableDataCell>{index+1}</CTableDataCell>
                                <CTableDataCell>{item.Product_Code}</CTableDataCell>
                                <CTableDataCell>{item.Product_Name}</CTableDataCell>
                                <CTableDataCell>{item.Brand_Name}</CTableDataCell>
                                <CTableDataCell>{item.item}{<RxCross2/>}  {item.Price}</CTableDataCell>
                                <CTableDataCell>{+item.Price * +item.item}</CTableDataCell>
                          </CTableRow>
    })}
                             <CTableRow className="text-center" ><CTableDataCell style={{ backgroundColor: "#0B5345", 
                             color: "white" }}  colSpan={4}>Total</CTableDataCell>
                             <CTableDataCell colSpan={2}>{InvoiceData?.InventoryStock?.reduce((crr,el)=>crr+(el.Price*el.item),0)}</CTableDataCell> </CTableRow>
    
    
                    </CTableBody>
                </CTable>
                    </div>  
    
                    <CTableRow style={{ backgroundColor: "#0B5345", color: "white" }}>
                                                <CTableDataCell colSpan={4}>
                                                    <h5>TERMS AND CONDITIONS</h5>
                                                </CTableDataCell>
                                            </CTableRow>
                                            <CTableRow>
                                                <CTableDataCell colSpan={4}>
                                                    <div>Fee once paid is not refundable, Non transferable & no package extension, lapsed sessions has to be adjusted within the expiry date. Instructors & timings are subject to change. All packages would be on hourly basis in a day. If a person wishes to workout more than an hour in a day, kindly upgrade your package accordingly. follow guidelines for better result</div>
                                                </CTableDataCell>
                                            </CTableRow>
    
                                            <CTableRow>
                                                <CTableDataCell colSpan={4}>
                                                    <div style={{ fontWeight: 'bold' }}>Address: Shop 24/25, 2nd Floor, V Mall, Thakur Complex, Kandivali East, Mumbai 400 101. India.</div>
                                                    <label style={{ fontWeight: 'bold' }}>Email: info@yogpowerint.com</label>
                                                    <label style={{ fontWeight: 'bold', marginLeft: '10px' }}>Phone: +91 9819 1232 91</label>
                                                    <div style={{ fontWeight: 'bold' }}>Website: https://yogpowerint.com</div>
                                                </CTableDataCell>
                                            </CTableRow>
                   
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => { setPrinInvoice(6)}}>
                        Close
                    </CButton>
                    <CButton color="primary" onClick={() => handlePrint()}>Print</CButton>
                </CModalFooter>
            </CModal> 
}

export default Invoice
