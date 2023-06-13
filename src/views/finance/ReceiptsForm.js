import React, { useEffect, useState} from 'react'
import {
    CButton,
   
    CCol,
  
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,

    CRow,
   
    CFormInput,
    CImage,
    CFormSelect
} from '@coreui/react'
import logo from 'src/assets/images/avatars/icon.png'
import { useSelector } from 'react-redux'
import axios from 'axios'


let user = JSON.parse(localStorage.getItem('user-info'))
const username = user.user.username;
const token = user.token;




function Resipts({showResiptsModal,setResiptsModal,clientInvoiceData,getAllInvoiceData2}){

    const [staff, setStaff] = useState([])

    const [pendingAmount,setPendingAmount] = useState('')
    const [counseller,setCounseller] = useState('') 
    const [paymentAmount,setPaymentAmount] = useState('')
    const [balanceAmount,setBalanceAmount] = useState('')
    const [paymentMode,setPaymentMode] = useState('')

    const url1 = useSelector((el)=>el.domainOfApi) 

    function getStaff() {
        axios.get(`${url1}/employeeform`)
            .then((res) => {
                setStaff(res.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }

useEffect(()=>{
getStaff()
 },[])  



return    





}


export default Resipts 