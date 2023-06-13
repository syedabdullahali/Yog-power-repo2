import React,{useEffect ,useState} from 'react'

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
} from "@coreui/react";
import axios from "axios";
import { BsWhatsapp } from "react-icons/bs";
import { MdCall, MdDelete, MdEdit, MdMail } from "react-icons/md";
import { useSelector} from 'react-redux'


const GenrallInventory = () => {

    const url = useSelector((el)=>el.domainOfApi)  
    const [result1, setResult1] = useState([])


    let user = JSON.parse(localStorage.getItem('user-info'))
    console.log(user);
    const token = user.token;
    const username = user.user.username;

    useEffect(() => {
        getStockListing()
    }, [])





    function getStockListing() {
        axios.get(`${url}/stockorderlist-status-received-stock/General Inventory`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                setResult1(res.data.reverse())
                console.log(res.data);
            })
            .catch((error) => {
                console.error(error)
            })
    }

  return (
    <CRow className='d-flex mb-2'>
 
            <CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345" }} hover responsive>
                <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                <CTableRow >
                        <CTableHeaderCell>Sr.No</CTableHeaderCell>
                        <CTableHeaderCell>Product Code</CTableHeaderCell>
                        <CTableHeaderCell>Product Name</CTableHeaderCell>
                        <CTableHeaderCell>Brand Name</CTableHeaderCell>
                        <CTableHeaderCell>Category</CTableHeaderCell>
                        <CTableHeaderCell>Price</CTableHeaderCell>
                        <CTableHeaderCell>Total Stock</CTableHeaderCell>
                        <CTableHeaderCell>Sold</CTableHeaderCell>
                        <CTableHeaderCell>AVL Stock</CTableHeaderCell>
                        <CTableHeaderCell>Sold By</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                 
            

                    
                {result1.filter((list) =>
                        list.username === username
                    ).map((item, index) => (
                        <CTableRow key={index}>
                            <CTableDataCell>{index + 1 }</CTableDataCell>
                            <CTableDataCell>{item.Product_Code}</CTableDataCell>
                            <CTableDataCell>{item.Product_Name}</CTableDataCell>
                            <CTableDataCell>{item.Brand_Name}</CTableDataCell>
                            <CTableDataCell>{item.Category}</CTableDataCell>
                            <CTableDataCell>{item.Price}</CTableDataCell>
                            <CTableDataCell>{item.Total_Stock}</CTableDataCell>
                            <CTableDataCell>{item.sold}</CTableDataCell>
                            <CTableDataCell>{item.Available_Stock}</CTableDataCell>
                            <CTableDataCell>{item.soldBy}</CTableDataCell>
                            <CTableDataCell><CButton>Add </CButton></CTableDataCell>
                        </CTableRow>
                    ))}
                </CTableBody>
            </CTable>
        </CRow>
  )
}

export default GenrallInventory
