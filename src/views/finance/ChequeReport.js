import React,{useState,useEffect} from 'react'
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
const ChequeReport = () => {

const [cheque,setChaqueData] = useState([])
const url1 = useSelector((el)=>el.domainOfApi) 
const [staffS,setStaffS] = useState('')


const headers = {
    'Authorization': `Bearer ${token}`,
    'My-Custom-Header': 'foobar'
};

const getAllInvoiceData = async  ()=>{
    
    try{
    const response1 = await axios.get(`${url1}/invoice/all`,{headers})


   const newCashData =   response1.data.map((el)=>{
        if(el.paymode !=='Cheque')return
        let dipositeToBank  = "Rs" + el.paidAmount
        if(el?.Receipts.length){
         el?.Receipts.forEach((el3)=>{
            dipositeToBank +=  " Rs"+el3?.PaidAmount
         })
        }  

        return {date:el.createdAt,totalCash:el.amount,dipositeToBank,counseller:el.counseller}
       }).filter((el)=>el)
   setChaqueData(newCashData)
    }catch(error){
    console.log(error)
    }
    }

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
        getAllInvoiceData()
        getStaff()

    },[])

    return (
        <CRow>
            <CCol lg={12} sm={12}>
                <CCard className='mb-3 border-top-success border-top-3'>
                    <CCardHeader>
                        <strong className="mt-2">Cheque Report</strong>
                    </CCardHeader>
                    <CCardBody>
                    <CRow className='my-3'>
                        
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
                        <CButton onClick={()=>{setStaffS('')}} >Clear Filter</CButton>
                        </CCol>
                        </CCol>
                    </CRow>
                        <CTable bordered style={{ borderColor: "#106103" }} responsive>
                            <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }}>
                                <CTableRow>
                                    <CTableHeaderCell scope="col">Sr No</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Cheque No</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">
                                        Cheque Amonut
                                    </CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Bank Details</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Deposite By</CTableHeaderCell>
                                    {/* <CTableHeaderCell scope="col">Renewls Revenue</CTableHeaderCell> */}
                                    {/* <CTableHeaderCell scope="col">
                                        Balance Collection
                                    </CTableHeaderCell>
                                    <CTableHeaderCell scope="col">View</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Achived %</CTableHeaderCell> */}
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {cheque.filter((el)=>el.counseller.includes(staffS)).map((el,i)=>{                                    
                                    const splitCheck =(el)=>{
                                        return el.split(' ').map((el)=>{
                                            return <><b>{el}</b><br/></>
                                        })
                                    }

                                    console.log(el)
                                    return  <CTableRow key={i}>
                                    <CTableDataCell>{i+1}</CTableDataCell>
                                        <CTableDataCell>{moment(el.date).format('MM-DD-YYYY')}</CTableDataCell>
                                        <CTableDataCell>{`C${(i+1)}`}</CTableDataCell>
                                        <CTableDataCell className='text-center'>{splitCheck(el.dipositeToBank)}</CTableDataCell>
                                        <CTableDataCell></CTableDataCell>
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

export default ChequeReport