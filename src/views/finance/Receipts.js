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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowCircleBottom, cilArrowCircleTop, cilPlus } from '@coreui/icons'
import { BsReceipt } from 'react-icons/bs'
import { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import {BsEye } from 'react-icons/bs'
import {MdReceiptLong} from 'react-icons/md'
import moment from 'moment/moment'


const Invoice = React.lazy(()=>import('../clients/Invoice'))
const ViewRecepits =React.lazy(()=>import('./ViewRecepits'))

const url = 'https://yog-seven.vercel.app'

let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;
    const username = user.user.username;

const Receipt = () => {
    let num  = 0;

    const [ClientData,setClient] = useState([])
    const [showInvoiceModal,setInvoceModal] = useState(false)
    const [allIvoiceOfaUser,setAllInvoiceOfUser] = useState([])
    const [result1,setResult1] = useState([])
    const [showReceipts,setShowReceipts] = useState(false)
    const [receptsData,setResiptsData] = useState('')
    const [receptsInvoiceData,setReceptsInvoiceData] = useState('')
    const [resiptNo,setResiptNo] = useState(1)
    const [pagination, setPagination] = useState(10)
    const [serviceName,setServiceName] = useState('')
    const [result, setResult] = useState([]);
    const [resiptData2,setResiptData2] = useState([])
    
    const url1 = useSelector((el)=>el.domainOfApi) 


    const [startDate,setStartDate] = useState('')
    const [endDate,setEndDate] = useState('')
    const [employeeData, setEmployeeData] = useState([])
    const [selectedEmployee, setSselectedEmployee] = useState('')


    useEffect(()=>{
        setPagination(10)
        },[serviceName,endDate,startDate,selectedEmployee])

        useEffect(()=>{
            getPackage()
        },[])

    function getPackage() {
        axios.get(`${url1}/packagemaster`, {
    
        })
            .then((res) => {
                setResult(res.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }


    const getAllInvoiceData = async ()=>{
        const {data} = await axios.get(`${url1}/invoice/all`,{ 
                  headers: {
                      'Authorization': `Bearer ${token}`
                  }})          
          setResiptData2(data.reverse().flatMap((el)=>el.Receipts.map((el2,i)=>{
            delete el2._id
            return{...el,...el2,length:i+1}}) 
            ))       
                  
  }  
console.log(resiptData2)



const getDate = (date,val) => {

    const date2 = new Date(date).getDate() + "/" + (new Date(date).getMonth() + (val? 1:0)) + "/" + new Date(date).getFullYear()
    if (date2 === 'NaN/NaN/NaN') {
        return 'Invalid Date'
    }
    return date2

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




useEffect(()=>{
getEnquiry()
},[])


function ShowUserInvoceHandler (id,item){
    
    const uniqClientData = result1.filter((el)=>el?.invoiceId===id)
    setAllInvoiceOfUser([item])    
    setClient(...uniqClientData)
    setInvoceModal(true)      
} 


function ViewReceiptsFun(el,el2,num){
setResiptsData(el2)
setReceptsInvoiceData(el)
setResiptNo(num)
setShowReceipts(true)
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
   
   <ViewRecepits
   showReceipts={showReceipts}
   setShowReceipts={setShowReceipts}
   receptsData={receptsData}
   receptsInvoiceData={receptsInvoiceData}
   resiptNo={resiptNo}
/>
   

            <CCol lg={12} sm={12}>
                <CCard className='mb-3 border-top-success border-top-3'>
                    <CCardHeader>
                        <strong className="mt-2">Receipt</strong>
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
                        <CTable bordered style={{ borderColor: "#106103",minWidth:'150%' }} responsive>
                            <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }}>
                                <CTableRow >
                                    <CTableHeaderCell scope="col">Sr No</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Receipt No</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">
                                        Invoice No                                    </CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Client Id</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Client Name</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Service</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Created By</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Paid Amount</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Pay Mode</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">View Invoice</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">View Receipt</CTableHeaderCell>  
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {resiptData2.filter((el)=>{
                                 return el.counseller.includes(selectedEmployee)})
                                .filter((el)=>{ if(startDate&&endDate){
                                return compareDate(startDate,el.startDate,'start') &&
                                compareDate(endDate,el.endDate,'end')}return true})
                                .filter((el)=>{if(serviceName){num =0
                                 return serviceName=== el.ServiceName}return el})
                                .filter((el, i) => { num++
                                 if (pagination - 10 < i + 1 && pagination >= i + 1) {
                                 return el}}).map((el,i)=>{
                                        return <CTableRow>
                                        <CTableDataCell>{i+pagination-10+1}</CTableDataCell>
                                            <CTableDataCell>{getDate(el.NewSlipDate,true)}</CTableDataCell>
                                            <CTableDataCell>{el.InvoiceNo +"RN"+ +(el.length)}</CTableDataCell>
                                            <CTableDataCell>{el.InvoiceNo}</CTableDataCell>
                                            <CTableDataCell>{el.clientId}</CTableDataCell>
                                            <CTableDataCell>{el.MemberName}</CTableDataCell>
                                            <CTableDataCell>{el.ServiceName}</CTableDataCell>
                                            <CTableDataCell>{el.Counseller}</CTableDataCell>
                                            <CTableDataCell>{el.PaidAmount}</CTableDataCell>
                                            <CTableDataCell>{el.Pay_Mode}</CTableDataCell>
                                            <CTableDataCell onClick={()=>ShowUserInvoceHandler(el._id,el)} className='text-center'>
                                                <CButton size='sm'><BsEye/></CButton></CTableDataCell>
                                            <CTableDataCell className='text-center'>
                                                <CButton onClick={()=>ViewReceiptsFun(el,el,i+1)} size='sm' className='text-white' color='info'><MdReceiptLong/></CButton>
                                            </CTableDataCell>
                                        </CTableRow>
    
                                    })
                                 }                               
                            </CTableBody>
                        </CTable>
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

export default Receipt;