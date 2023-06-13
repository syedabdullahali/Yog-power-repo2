import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CForm,
    CFormInput,
    CFormSelect,
    CPagination,
    CPaginationItem,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CToast,
    CToastBody,
    CToastClose,
    CCardHeader,
    CCardTitle
} from "@coreui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsWhatsapp } from "react-icons/bs";
import { MdCall, MdDelete, MdEdit, MdMail } from "react-icons/md";
import { useSelector } from 'react-redux'

const AllSuppilerList = () => {
    const url = useSelector((el)=>el.domainOfApi) 
    const [soldProductData,setSoldProductData] = useState([])
    



    let user = JSON.parse(localStorage.getItem('user-info'))
    console.log(user);
    const token = user.token;

    const headers =   {
        "Authorization": `Bearer ${token}`,
    }
    

    useEffect(() => {
        getSoldProductData()
    }, [])


    function  getSoldProductData() {
        axios.get(`${url}/stockorderlist/sold`,{headers})
       
               .then((res) => {
                setSoldProductData(res.data.reverse())
               })
               .catch((error) => {
                   console.error(error)
               })
       }

    
   


       console.log(soldProductData)
   


    
    return (
        <CCard className="overflow-hidden" >
           <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                        <CCardTitle className="mt-2 mb-4">Product Sales Report</CCardTitle>
                    </CCardHeader>
        <CRow className=' mb-2'>
            
            <CCol lg={3} sm={6} className='mb-2'>
            </CCol>
           
             

            <CTable className='m-3' align="middle" bordered style={{ borderColor: "#0B5345" }} hover responsive>
                <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                    <CTableRow >
                    <CTableHeaderCell>Sr.No</CTableHeaderCell>
                        <CTableHeaderCell>Date</CTableHeaderCell>
                        <CTableHeaderCell>Client Name</CTableHeaderCell>
                        <CTableHeaderCell>Mobile No.</CTableHeaderCell>
                        <CTableHeaderCell>Product Code</CTableHeaderCell>
                        <CTableHeaderCell>Product Name</CTableHeaderCell>
                        <CTableHeaderCell>Brand Name</CTableHeaderCell>
                        <CTableHeaderCell>Category</CTableHeaderCell>
                        <CTableHeaderCell>Colour</CTableHeaderCell>
                        <CTableHeaderCell>Price</CTableHeaderCell>
                        <CTableHeaderCell>Qty</CTableHeaderCell>
                        <CTableHeaderCell>Sold By</CTableHeaderCell>
                        <CTableHeaderCell>Total Amount</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {soldProductData.map((item, index) => (
                        <CTableRow key={index}>
                            <CTableDataCell>{index + 1 }</CTableDataCell>
                            <CTableDataCell>{ new Date(item.Order_Date).toLocaleString()}</CTableDataCell>
                            <CTableDataCell>{item.Client_Name}</CTableDataCell>
                            <CTableDataCell>{item.Mobile_No}</CTableDataCell>
                            <CTableDataCell>{item.Product_Code}</CTableDataCell>
                            <CTableDataCell>{item.Product_Name}</CTableDataCell>
                            <CTableDataCell>{item.Brand_Name}</CTableDataCell>
                            <CTableDataCell>{item.Category}</CTableDataCell>
                            <CTableDataCell>{item.Color}</CTableDataCell>
                            <CTableDataCell>{item.Product_Price}</CTableDataCell>
                            <CTableDataCell>{Math.abs(item.Orders_Quantity)}</CTableDataCell>
                            <CTableDataCell>{item.soldBy}</CTableDataCell>
                            <CTableDataCell>{+item.Product_Price*+Math.abs(item.Orders_Quantity)}</CTableDataCell>

                        </CTableRow>
                    ))}
                </CTableBody>
            </CTable>


        </CRow>
        </CCard>

    );
};


export default AllSuppilerList;