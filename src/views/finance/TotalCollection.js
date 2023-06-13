import React,{useEffect, useState} from 'react'
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
import axios from 'axios'
import { useSelector } from 'react-redux'
import moment from 'moment/moment'

let user = JSON.parse(localStorage.getItem('user-info'))
const token = user.token;
const username = user.user.username;
const centerCode = user.user.centerCode;

const headers = {
    'Authorization': `Bearer ${token}`,
    'My-Custom-Header': 'foobar'
   };


const Totalc= () => {
  const [totalCollection,setTotalCollection] = useState([])
  const [paymentModal,setPaymentModal] = useState('')
  const [staffS,setStaffS] = useState('')
  const url1 = useSelector((el)=>el.domainOfApi) 


  const getInvoiceDataToTotalCollection = async  ()=>{

  const {data} = await axios.get(`${url1}/invoice/all`,{headers})
  setTotalCollection(data)
  console.log(data.map((el)=>el))
  }


  useEffect(()=>{
    getInvoiceDataToTotalCollection()
    getStaff()
  },[])

console.log(totalCollection)

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

function clearFilter(){
   setStaffS('')
   setPaymentModal('')
}

    return (
        <CRow>
            <CCol lg={12} sm={12}>
                <CCard className='mb-3 border-top-success border-top-3'>
                    <CCardHeader>
                        <strong className="mt-2">Total Collection</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CRow>
                        <CCol lg={4} className='mb-2'>
                            <CFormSelect 
                            value={paymentModal}
                            onChange={(e)=>setPaymentModal(e.target.value)}
                            options={[
                                "Select By Payment Model",
                                { label: "Cash", value: "Cash" },
                                { label: "Debit Card", value: "Debit Card" },
                                { label: "Credit Card", value: "Credit Card" },
                                { label: "Cheque", value: "Cheque" },
                                { label: "Draft", value: "Draft" },
                                { label: "Paytm", value: "Paytm" },
                                { label: "GPay", value: "GPay" },
                                { label: "PhonePe", value: "PhonePe" },
                                { label: "Account Pay", value: "Account Pay" },
                            ]}
                            >
                               
                            </CFormSelect>
                            </CCol>
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
                            </CCol >

                        </CRow>   
                        <CRow>
                            <CCol>
                            <CCol className=' mb-3'>
                            <CButton onClick={(e)=>clearFilter(e.target.value)}>Clear Filter</CButton>
                            </CCol>
                            </CCol>
                        </CRow>
                        <div style={{overflow:'scroll'}}>                                          
                        <CTable className='m-0 p-0' bordered style={{ borderColor: "#106103",width:'150%' }} responsive>
                            <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }}>
                                <CTableRow>
                                    <CTableHeaderCell scope="col">Sr No</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Brach</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">
                                        Invoice No
                                    </CTableHeaderCell>
                                    <CTableHeaderCell scope="col" style={{width:'200px'}}>Receipt No</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">client ID</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">client Name</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Payment Model</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Amount</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Collected By</CTableHeaderCell>
                          
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {totalCollection.filter((el)=>{
                                    return el?.paymode?.includes(paymentModal) &&
                                    el?.counseller?.includes(staffS)

                                })
                                
                                .map((el,i)=>{

                            const ReceipstsNo = (recepits,el)=>{
                                if(!recepits.length){
                                  return "Not created yet"                                                           
                                }else if(recepits.length){

                               return recepits.map((el2,i)=>{
                                    return <><span className='mb-2'><u>{el.InvoiceNo +"RN"+ +(1+i)}</u></span><br/></> 
                                           
                                })

                                }

                            }

                           return    <CTableRow key={i}>
                                   <CTableDataCell>{i+1}</CTableDataCell>
                                    <CTableDataCell>{moment(el.createdAt).format("MM-DD-YYYY")}</CTableDataCell>
                                    <CTableDataCell>{el.centerName}</CTableDataCell>
                                    <CTableDataCell>{el.InvoiceNo}</CTableDataCell>
                                    <CTableDataCell className='text-center'>
                                        {
                                            
                                        ReceipstsNo(el.Receipts,el)
                                        
                                        }
                                        
                                    </CTableDataCell>
                                    <CTableDataCell>{el.clientId}</CTableDataCell>
                                    <CTableDataCell>{el.MemberName}</CTableDataCell>
                                    <CTableDataCell>{el.paymode}</CTableDataCell>
                                    <CTableDataCell>{el.amount}</CTableDataCell>
                                    <CTableDataCell>{el.counseller}</CTableDataCell>
                                </CTableRow>
})}
                                
                            </CTableBody>
                        </CTable>
                        </div>  
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default Totalc