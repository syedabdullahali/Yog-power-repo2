import React from 'react'
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
    CPagination,
    CPaginationItem,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CImage
} from '@coreui/react'

import { BsPlusCircle, BsWhatsapp,BsEye } from 'react-icons/bs'



import CIcon from '@coreui/icons-react'
import { cilArrowCircleBottom, cilArrowCircleTop, cilPlus } from '@coreui/icons'
import {useEffect, useState} from 'react'
import axios from 'axios'
import YogaSpinnar from '../theme/YogaSpinnar';
import { useSelector } from "react-redux";
import logo from 'src/assets/images/avatars/icon.png'
import moment from 'moment/moment'
const Invoice = React.lazy(()=>import('../clients/Invoice'))

const url = 'https://yog-seven.vercel.app'
let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;
    const username = user.user.username;


const BalancePayment = () => {
    let num =0;
    const [pagination, setPagination] = useState(10)
    const [result, setResult] = useState([]);
    const [serviceName,setServiceName] = useState('')
    const [result1,setResult1] = useState([])
    const url1 = useSelector((el)=>el.domainOfApi) 
    const [AllInvoiceData,setAllInvoiceData] = useState([])
    const [clientInvoiceData,setClientInvoiceData] = useState('')


    const [pendingAmount,setPendingAmount] = useState('')
    const [counseller,setCounseller] = useState('') 
    const [paymentAmount,setPaymentAmount] = useState('')
    const [balanceAmount,setBalanceAmount] = useState('')
    const [paymentMode,setPaymentMode] = useState('')
    const [staff, setStaff] = useState([])
    const [ClientData,setClient] = useState([])
    const [showInvoiceModal,setInvoceModal] = useState(false)
    const [allIvoiceOfaUser,setAllInvoiceOfUser] = useState([])
    const [showResiptsModal,setResiptsModal] = useState(false)

    
    const [startDate,setStartDate] = useState('')
    const [endDate,setEndDate] = useState('')
    const [employeeData, setEmployeeData] = useState([])
    const [selectedEmployee, setSselectedEmployee] = useState('')


    const getDate = (date,val) => {

        const date2 = new Date(date).getDate() + "/" + (new Date(date).getMonth() + (val? 1:0)) + "/" + new Date(date).getFullYear()
        if (date2 === 'NaN/NaN/NaN') {
            return 'Invalid Date'
        }
        return date2

    }
 const getAllInvoiceData = async ()=>{
      const {data} = await axios.get(`${url1}/invoice/all`,{ 
                headers: {
                    'Authorization': `Bearer ${token}`
                }})
        
        setAllInvoiceData(data.filter((el)=>el.pendingAmount).reverse())                    
}   

function getPackage() {
    axios.get(`${url1}/packagemaster`, {

    })
        .then((res) => {
            setResult(res.data)
            console.log(res.data)
        })
        .catch((error) => {
            console.error(error)
        })
}


function getEnquiry() {
    axios.get(`${url1}/memberForm/all`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then((res) => {
           
         setResult1(res.data.filter((list) => list.username === username).reverse())
         getAllInvoiceData()
        })
        .catch((error) => {
            console.error(error)
        })
}


function ShowUserInvoceHandler (id,item){
    const uniqClientData = result1.filter((el)=>el?.invoiceId===id)
    console.log(uniqClientData)
    setAllInvoiceOfUser([item])    
    setClient(...uniqClientData)
    setInvoceModal(true)      
} 




function ShowResiptsModal(el){
setResiptsModal(true)
setClientInvoiceData(el)
}


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




useEffect(()=>{
    getPackage()
    getEnquiry()
},[])

useEffect(()=>{
setPagination(10)
},[serviceName,endDate,startDate,selectedEmployee])


useEffect(()=>{
    setPendingAmount(clientInvoiceData.pendingAmount)
    setCounseller(clientInvoiceData.counseller)
 },[clientInvoiceData?._id])


 useEffect(()=>{
setBalanceAmount((pendingAmount-paymentAmount))
 },[paymentAmount,pendingAmount])


const savePaymentAmount = () =>{



const ClientResipt  = {
    RemainingAmount:pendingAmount,
        PaidAmount:paymentAmount,
        Counseller:counseller,
        NewSlipDate:new Date(),
        Status: true,
        AfterPayremainingAmount:balanceAmount,
        Pay_Mode:paymentMode,
    
}

console.log(clientInvoiceData.Receipts)

 let obj ={
    pendingAmount:clientInvoiceData.pendingAmount-paymentAmount,
    Receipts:[{...ClientResipt},...clientInvoiceData.Receipts]
} 

   
const headers = {
    'Authorization': `Bearer ${token}`,
    'My-Custom-Header': 'foobar'
};

axios.post(`${url1}/invoice/update/${clientInvoiceData._id}`,obj, {headers},)
    .then((resp) => {
        setPendingAmount(balanceAmount)
        setResiptsModal(false)
        alert('Successfully save')
        getAllInvoiceData()
        setPaymentAmount('')
        setBalanceAmount('')
    })
    .catch((error) => {
        console.error(error)
    })



}

useEffect(() => {
    getEmployee()
}, [])

async function getEmployee() {
    try {
        const { data } = await axios.get(`${ url1 }/employeeform`)
        setEmployeeData(data)
    } catch (error) {
        console.log(error)
    }
}


const  compareDate = (date1,date2,type)=>{      
    if(type==='start'){
    return moment(date1).format('YYYY-MM-DD')<=moment(date2).format('YYYY-MM-DD')
    }
    if(type==='end'){  
    return   moment(date1).format('YYYY-MM-DD')>=moment(date2).format('YYYY-MM-DD')
    }
    }


    const clearFilter=()=>{
        setSselectedEmployee('')
        setStartDate('')
        setEndDate('')
        setServiceName('')
        }
    return (
        <CRow>

     <Invoice 
            allIvoiceOfaUser={allIvoiceOfaUser} 
            ClientData={ClientData} setInvoceModal={setInvoceModal}
            showInvoiceModal={showInvoiceModal}            
            />  

<CModal size="xl" alignment="center" scrollable visible={showResiptsModal} onClose={() => setResiptsModal(false)} >
                     <CModalHeader>
                     <CModalTitle>Add client resipts</CModalTitle>
                 </CModalHeader>
                 <CModalBody  style={{ padding: '25px' }}>
                     <CRow>
                        <CCol lg={12} className='text-center'><CImage src={logo} width="100px" height='100px' /></CCol>
                         <CCol lg={12} className='text-center mt-2'><h5>Yog Power International </h5></CCol>
                     </CRow>
                     <CRow>
                        <CCol md={4}>
                           <CFormInput
                           label='Total Amount'
                           value={pendingAmount} 
                           onChange={(e)=>setPendingAmount(e.target.value)}
                           type='number'
                           />
                       </CCol>
                       <CCol md={4}>
                            <CFormInput 
                            label='Payment Amount'   
                            type='number'
                            value={paymentAmount}
                            onChange={(e)=>setPaymentAmount(e.target.value)}
                        
                            />
                       </CCol>
                       <CCol md={4}>
                            <CFormInput 
                            label='Balance Amount'    
                            type='number'
                            value={balanceAmount}
                            onChange={(e)=>setBalanceAmount(e.target.value)}
                       
                            />
                       </CCol>
                      
                      
                       <CCol md={4}>
                            <CFormSelect
                            label='Payment mode'  
                            value={paymentMode} 
                            onChange={(e)=>setPaymentMode(e.target.value)}
                            options={[
                                "Select",
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
                        />

                       </CCol>
                   

                       <CCol md={4}>
                           <CFormSelect
                            label='Created By'
                            placeholder='Enter Paing Amount'
                            value={counseller}
                            onChange={(e)=>setCounseller(e.target.value)}
                           > 
                          <option>Select staff</option>
                           {staff.filter((list) => list.username === username &&
                            list.selected === 'Select').map((item, index) => (
                               <option key={index}>{item.FullName}</option>
                           ))}
                           
                            </CFormSelect>


                       </CCol>
                      

                     </CRow>
                     <CRow>
                        <CCol>
                        <CButton className='mt-4' onClick={()=>{savePaymentAmount()}} >Save Receipts</CButton>
                        </CCol>
                       </CRow>
               </CModalBody>

</CModal>

  

            <CCol lg={12} sm={12}>
                <CCard className='mb-3 border-top-success border-top-3'>
                    <CCardHeader>
                        <strong className="mt-2">Balance Payment</strong>
                    </CCardHeader>
                    <CCardBody>
                    <CRow className='d-flex justify-content-center mb-2'>
                            <CCol lg={3} md={6} sm={12}  className='mb-2'>
                                <CInputGroup
                                    className='mb-2'
                                >
                                    <CInputGroupText
                                        component="label"
                                    >
                                        From
                                    </CInputGroupText>
                                    <CFormInput
                                        type='date'
                                        aria-label="Start Date"
                                        value={startDate}
                                        onChange={(e)=>setStartDate(e.target.value)}
                                    />
                                </CInputGroup>
                            </CCol>
                            <CCol lg={3} md={6} sm={12} className='mb-2'>
                                <CInputGroup className='mb-2'>
                                    <CInputGroupText
                                        component="label"
                                    >
                                        To
                                    </CInputGroupText>
                                    <CFormInput
                                        type='date'
                                        aria-label="End Date"
                                        value={endDate}
                                        onChange={(e)=>setEndDate(e.target.value)}
                                    />
                                </CInputGroup>
                            </CCol>
                            <CCol lg={3} md={6} sm={12}  className='mb-2'>
                                <CInputGroup>
                                    <CInputGroupText
                                        component="label"
                                        htmlFor="inputGroupSelect01"
                                    >
                                       Select Staff
                                    </CInputGroupText>
                                    <CFormSelect 
                    value={selectedEmployee}
                    onChange={(e) => setSselectedEmployee(e.target.value)}
                >
                    <option >Select Staff </option>

                    {employeeData.filter((list) => list.username === username && list.selected === 'Select').map((item, index) => (
                        item.username === username && (
                            <option key={index} value={item.FullName} >{item.FullName}</option>
                        )
                    ))}

                </CFormSelect>
                                </CInputGroup>
                            </CCol>
                            <CCol lg={3} md={6} sm={12}  className='mb-2'>
                                <CInputGroup>
                                    <CFormSelect id="inputGroupSelect01"
                                    value={serviceName}
                                     onChange={(e)=>setServiceName(e.target.value)}
                                    >
                                    <option>Select Service</option>
                                        {result.map((item, index) => (
                                            item.username === username && (
                                               item.Status=== true && (
                                                    <option key={index}>{item.Service }</option>                                                  
                                                )
                                            
                                            )))}
                                    </CFormSelect>
                                </CInputGroup>
                            </CCol>
                        </CRow>
                        <CRow className='mb-4'>
                            <CCol>
                            <CButton onClick={()=>{clearFilter()}}>Clear Filter</CButton>
                            </CCol>
                        </CRow>
                        <CTable bordered style={{ borderColor: "#106103" }} responsive>
                            <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }}>
                                <CTableRow>
                                    <CTableHeaderCell scope="col">Sr No</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Purchase Date</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Center Name</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">
                                        Client Id
                                    </CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Client Name</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Service</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Service Duration</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Counseller</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Total Amount</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Paid Amount</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Balance</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Payment Mode</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Invoice</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Add Receipts</CTableHeaderCell>


                            
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>

                                {AllInvoiceData.filter((el)=>{
                                 return el.counseller.includes(selectedEmployee)})
                                .filter((el)=>{ if(startDate&&endDate){
                                return compareDate(startDate,el.startDate,'start') &&
                                compareDate(endDate,el.endDate,'end')}return true})
                                .filter((el)=>{if(serviceName){num =0
                                 return serviceName=== el.ServiceName}return el}).filter((el, i) => {
                                    num++
                  if (pagination - 10 < i + 1 && pagination >= i + 1) {
                        return el
                }
                

              }).map((el,i)=>
                                <CTableRow key={i}>
                                    <CTableDataCell>{i + 1 + pagination - 10}</CTableDataCell>
                                    <CTableDataCell>{getDate(el.createdAt,true)}</CTableDataCell>
                                    <CTableDataCell>{el.centerName}</CTableDataCell>
                                    <CTableDataCell>{el.clientId}</CTableDataCell>
                                    <CTableDataCell>{el.MemberName}</CTableDataCell>
                                    <CTableDataCell>{el.ServiceName}</CTableDataCell>
                                    <CTableDataCell>{el.duration}</CTableDataCell>
                                    <CTableDataCell>{el.counseller}</CTableDataCell>
                                    <CTableDataCell>{el.amount}</CTableDataCell>
                                    <CTableDataCell>{el.paidAmount + el?.Receipts?.reduce((crr,el2)=>crr+ +el2.PaidAmount,0)}</CTableDataCell>
                                    <CTableDataCell>{el.pendingAmount}</CTableDataCell>
                                    <CTableDataCell>{el.paymode}</CTableDataCell>
                                    <CTableDataCell>{
                                        <CButton size='sm' onClick={()=>ShowUserInvoceHandler(el._id,el)}>
                                            <BsEye />
                                      </CButton>}</CTableDataCell>
                                    <CTableDataCell className='text-center' >
                                    <CButton   onClick={()=>ShowResiptsModal(el)}
                                    color='success' size='sm'
                                    ><BsPlusCircle/></CButton></CTableDataCell>

                                </CTableRow>
                                )}
                              
                            </CTableBody>
                          
                        </CTable>
                        {!AllInvoiceData[0] ?
                                <CCol style={{ width: '100%' }} className='d-flex justify-content-center my-3'>
                                    <YogaSpinnar />
                         </CCol> : ''}
                    </CCardBody>
                </CCard>
            </CCol>
            
            <div className='d-flex justify-content-center mt-3' >
                        <CPagination aria-label="Page navigation example" style={{cursor:'pointer'}}>
                            <CPaginationItem aria-label="Previous" onClick={() => setPagination((val) => val > 10 ? val - 10 : 10)}>
                                <span aria-hidden="true" >&laquo;</span>
                            </CPaginationItem>
                            <CPaginationItem active >{pagination / 10}</CPaginationItem>
                            {num > pagination / 10 * 10 && <CPaginationItem onClick={() => setPagination((val) => val < num ? val + 10 : val)}>{pagination / 10 + 1}</CPaginationItem>}
                            {num > pagination / 10 * 20 && <CPaginationItem onClick={() => setPagination((val) => val < num ? val + 10 : val)}>{pagination / 10 + 2}</CPaginationItem>}
                            <CPaginationItem aria-label="Next" onClick={() => setPagination((val) => val < num ? val + 10 : val)}>
                                <span aria-hidden="true">&raquo;</span>
                            </CPaginationItem>
                        </CPagination>
      </div>
        </CRow>
    )
}

export default BalancePayment;