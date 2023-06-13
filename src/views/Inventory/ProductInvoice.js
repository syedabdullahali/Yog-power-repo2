import React from 'react'
import {
    CButton,
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
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CPagination,
    CPaginationItem,
    CTableBody,
    CTableDataCell,
} from '@coreui/react'


import { useSelector } from "react-redux";
import {useEffect, useState} from 'react'
import axios from 'axios'
import YogaSpinnar from '../theme/YogaSpinnar';
import { MdDelete } from 'react-icons/md';
import moment from 'moment/moment';
import Invoice from '../finance/ClientInvoice/Invoice/Invoice';


let user = JSON.parse(localStorage.getItem('user-info'))
    console.log(user);
    const token = user.token;
    const username = user.user.username;



const ProductInvoice = () => {

    let num =0
    const [AllInvoiceData,setAllInvoiceData] = useState([])
    const [prinInvoiceData,setPrintInvoiceData] = useState([])
    const [prinInvoice,setPrinInvoice] = useState(false)

    const [pagination, setPagination] = useState(10)
    const [result, setResult] = useState([]);
    const [serviceName,setServiceName] = useState('')
    const [result1,setResult1] = useState([])
    const url1 = useSelector((el)=>el.domainOfApi) 
    const [startDate,setStartDate] = useState('')
    const [endDate,setEndDate] = useState('')
    const [employeeData, setEmployeeData] = useState([])
    const [selectedEmployee, setSselectedEmployee] = useState('')




    const getAllInvoiceData = async ()=>{
        const {data} = await axios.get(`${url1}/productInvoice/all`,{ 
                headers: {
                    'Authorization': `Bearer ${token}`
                }})
        

           console.log(data.reverse())     

        setAllInvoiceData(data.reverse())     
                
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


  
    useEffect(()=>{
        getPackage()
        getEnquiry()
        
    },[])
    
    useEffect(()=>{
    setPagination(10)
    },[serviceName,endDate,startDate,selectedEmployee])

    console.log(AllInvoiceData)



useEffect(() => {
    getEmployee()
}, [])

async function getEmployee() {
    try {
        const { data } = await axios.get(`${url1}/employeeform`)
        setEmployeeData(data)
    } catch (error) {
        console.log(error)
    }
}


const clearFilter=()=>{
setSselectedEmployee('')
}

function deleteCall(id) {

    if (confirm('Do you want to delete this')) {
        fetch(`${url1}/productInvoice/delete/${id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((result) => {
            result.json().then(() => {
                getAllInvoiceData()
            })
        })
    }
}


function toPrintInvoice(data){
    setPrintInvoiceData(data)
    setPrinInvoice(true)  
  }

    return (
        <CRow>
            <Invoice 
       visibale={prinInvoice} 
       setPrinInvoice={setPrinInvoice}
       InvoiceData={prinInvoiceData}
       />
        
            <CCol lg={12} sm={12}>
                <CCard className='mb-3 border-top-success border-top-3'>
                    <CCardHeader className='d-flex justify-content-between'>
                        <strong className="mt-2">Total Invoice</strong>
                        <strong className="mt-2" > Total Invoice :{AllInvoiceData.length}</strong>
                    </CCardHeader>
                    <CCardBody>
                        {/* <CRow className='d-flex justify-content-center mb-2'>
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
                          
                        </CRow>
                        <CRow className='mb-4'>
                            <CCol>
                            <CButton onClick={()=>{clearFilter()}}>Clear Filter</CButton>
                            </CCol>
                        </CRow> */}
                        
                        <CTable bordered style={{ borderColor: "#106103" }} responsive>
                            <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }}>
                                <CTableRow>
                                    <CTableHeaderCell scope="col">Sr No</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Invoice Date</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">
                                        Client Id
                                    </CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Client Name</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Invoice No</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Created By</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Amount</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Pay Mode</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">View</CTableHeaderCell>
                                    <CTableHeaderCell scope="col"> Delete</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {AllInvoiceData.map((el,i)=>
                                <CTableRow>
                                <CTableDataCell>{i+1}</CTableDataCell>
                                <CTableDataCell>{moment(el.followUpDate).format('YYYY-MM-DD')}</CTableDataCell>
                                <CTableDataCell>{el.clientId}</CTableDataCell>
                                <CTableDataCell>{el.Fullname}</CTableDataCell>
                                <CTableDataCell>{el.InvoiceNo}</CTableDataCell>
                                <CTableDataCell>{el.counseller}</CTableDataCell>
                                <CTableDataCell>{el.amount}</CTableDataCell>
                                <CTableDataCell>{el.paymode}</CTableDataCell>
                                <CTableDataCell><CButton size='sm' onClick={()=>toPrintInvoice(el)} >View</CButton></CTableDataCell>
                                <CTableDataCell><MdDelete onClick={()=>deleteCall(el._id)} style={{cursor:'pointer'}}/></CTableDataCell>
                            </CTableRow>
                                )}
                            </CTableBody>
                        </CTable>
                    </CCardBody>
                    {!AllInvoiceData[0] ?
                                <CCol style={{ width: '100%' }} className='d-flex justify-content-center my-3'>
                                    <YogaSpinnar />
                         </CCol> : ''}
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

export default ProductInvoice;