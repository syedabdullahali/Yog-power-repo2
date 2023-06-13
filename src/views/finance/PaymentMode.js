import React, { useEffect, useState } from 'react'
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
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowCircleBottom, cilArrowCircleTop, cilPlus } from '@coreui/icons'
import moment from 'moment/moment'

let user = JSON.parse(localStorage.getItem('user-info'))
const token = user.token;
const username = user.user.username;
const centerCode = user.user.centerCode;
import { AiOutlineCheckCircle } from 'react-icons/ai'
const headers = {
    'Authorization': `Bearer ${token}`,
    'My-Custom-Header': 'foobar'
};
import { useSelector } from 'react-redux'

import axios from 'axios'
const PaymentMode = () => {

const url1 = useSelector((el)=>el.domainOfApi) 
const [paymetData,setPaymentData] = useState([])
const [paymentType,setPyamentType] = useState([])
const [staffS,setStaffS] = useState('')



let allPaymentType =[
    { label: "Cash", value: false },
    { label: "Debit Card", value: false },
    { label: "Credit Card", value: false },
    { label: "Cheque", value: false },
    { label: "Draft", value: false },
    { label: "Paytm", value: false },
    { label: "GPay", value: false},
    { label: "PhonePe", value: false },
    { label: "Account Pay", value: false },
]



const getAllInvoiceData = async  ()=>{
try{


const response1 = await axios.get(`${url1}/invoice/all`,{headers})
console.log(response1.data)

const PaymentData = response1.data.flatMap((el)=>{
    console.log(el.counseller)

return allPaymentType.map((el2)=>{
if(el.paymode ===el2.label){
    el2.value =true
let totalColection  = el.paidAmount
if(el?.Receipts.length){
 el?.Receipts.forEach((el3)=>{
    totalColection += +el3?.PaidAmount
 })
}  
return {...el2,totalColection,counseller:el.counseller,date:el.createdAt}

}
})
}).filter((el)=>el)

setPaymentData(PaymentData)

}catch(error){
console.log(error)
}
}

// console.log(invoiceData)

const [staff, setStaff] = useState([])
function getStaff() {
    axios.get(`${url1}/employeeform`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then((res) => {
            setStaff(res.data)
        })
        .catch((error) => {
            console.error(error)
        })
}

useEffect(()=>{
getStaff()
getAllInvoiceData()
},[])

function clearFilter(){
    setStaffS('')
    setPyamentType('')
 }


console.log(paymetData)
    return (
        <CRow>
            <CCol lg={12} sm={12}>
                <CCard className='mb-3 border-top-success border-top-3'>
                    <CCardHeader>
                        <strong className="mt-2">Payment Mode</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CRow className='my-3'>
                            <CCol lg={4} className='mb-2'>
                              <CFormSelect value={paymentType} onChange={(e)=>setPyamentType(e.target.value)}>
                                <option>Select by Payment mode</option>
                                {allPaymentType.map((el,i)=>{
                                return <option key={i}>{el.label}</option>
                                })}
                              </CFormSelect>
                            </CCol >
                            <CCol lg={4} className='mb-2'>
                            <CFormSelect
                            value={staffS}
                            onChange={(e)=>setStaffS(e.target.value)}
                                                                                                                               
                            >
                            <option>Select By Staff</option>
                                {staff.filter((list) => list.username === username &&
                                 list.selected === 'Select').map((item, index) => (
                                    <option key={index}>{item.FullName}</option>
                                ))}

                            </CFormSelect>
                            </CCol>
                          
                        </CRow>
                        <CRow>
                            <CCol>
                            <CCol className=' mb-3'>
                            <CButton onClick={(e)=>clearFilter(e.target.value)}>Clear Filter</CButton>
                            </CCol>
                            </CCol>
                        </CRow>
                        <CTable bordered style={{ borderColor: "#106103" }} responsive>
                            <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }}>
                                <CTableRow>
                                    <CTableHeaderCell scope="col">Sr No</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Cash</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">
                                        GPay
                                    </CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Card</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">A/c</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">UPI</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Cheque</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Total Collection</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Collected By</CTableHeaderCell>                        
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {paymetData.filter((el)=>{
                                    return el.counseller.includes(staffS) && el.label.includes(paymentType)
                                }).map((el,i)=>{
                                   console.log(el)
                               return <CTableRow>
                                    <CTableDataCell>{i+1}</CTableDataCell>
                                    <CTableDataCell>{moment(el.date).format("MM-DD-YYYY")}</CTableDataCell>
                                    <CTableDataCell className='text-center'>{el.label==='Cash'?<CButton className="h5 text-white" color='success' ><AiOutlineCheckCircle/></CButton>:''}</CTableDataCell>
                                    <CTableDataCell className='text-center'>{el.label==='GPay'?<CButton className="h5 text-white" color='success' ><AiOutlineCheckCircle/></CButton>:''}</CTableDataCell>
                                    <CTableDataCell className='text-center'>{el.label.includes('Card')?<CButton className="h5 text-white" color='success' ><AiOutlineCheckCircle/></CButton>:''}</CTableDataCell>
                                    <CTableDataCell className='text-center'>{'Account Pay  Draft'.includes(el.label)?<CButton className="h5 text-white" color='success' ><AiOutlineCheckCircle/></CButton>:''}</CTableDataCell>
                                    <CTableDataCell className='text-center'>{'PhonePe  Paytm'.includes(el.label)?<CButton className="h5 text-white" color='success' ><AiOutlineCheckCircle/></CButton>:''}</CTableDataCell>
                                    <CTableDataCell className='text-center'>{el.label==='Cheque'?<CButton className="h5 text-white" color='success' ><AiOutlineCheckCircle/></CButton>:''}</CTableDataCell>
                                    <CTableDataCell>Rs {el.totalColection}</CTableDataCell>
                                    <CTableDataCell>{el.counseller}</CTableDataCell>
                                </CTableRow>
                                })}                               
                            </CTableBody>
                        </CTable>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default PaymentMode;