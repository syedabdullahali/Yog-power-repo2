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
    CPagination,
    CPaginationItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowCircleBottom, cilArrowCircleTop, cilPlus } from '@coreui/icons'
import axios from 'axios'
import { useSelector } from 'react-redux'
import moment from 'moment/moment'
import YogaSpinnar from '../theme/YogaSpinnar'

let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;
    const username = user.user.username;

const CommentOfWritten = () => {


    const [AllInvoiceData,setAllInvoiceData] = useState([])
    const url1 = useSelector((el)=>el.domainOfApi) 
    const [serviceName,setServiceName] = useState('')
    const [result, setResult] = useState([]);
    const [pagination, setPagination] = useState(10)
    let num =0

    const [startDate,setStartDate] = useState('')
    const [endDate,setEndDate] = useState('')
    const [employeeData, setEmployeeData] = useState([])
    const [selectedEmployee, setSselectedEmployee] = useState('')



    useEffect(()=>{
        setPagination(10)
        getPackage()
        },[serviceName])


    function getPackage() {
        axios.get(`${url1}/packagemaster`)
            .then((res) => {
                setResult(res.data)
                console.log(res.data)
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
        
        setAllInvoiceData(data.reverse())     
                
    } 
    useEffect(()=>{
       getAllInvoiceData()
    },[])


    const getDate = (date,val) => {

        const date2 = new Date(date).getDate() + "/" + (new Date(date).getMonth() + (val? 1:0)) + "/" + new Date(date).getFullYear()
        if (date2 === 'NaN/NaN/NaN') {
            return 'Invalid Date'
        }
        return date2

    }

  
console.log(AllInvoiceData)    


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
            <CCol lg={12} sm={12}>
                <CCard className='mb-3 border-top-success border-top-3'>
                    <CCardHeader>
                        <strong className="mt-2">Comments of cancel invoice </strong>
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
                                    <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Client Id</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">
                                        Member Name
                                    </CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Services</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Cancelled By</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Invoice No</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Comments</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                
                       {AllInvoiceData.filter((el)=>el.commentsofwrite&&el.status==="cancel").filter((el)=>{
                                 return el.counseller.includes(selectedEmployee)})
                                .filter((el)=>{ if(startDate&&endDate){
                                return compareDate(startDate,el.startDate,'start') &&
                                compareDate(endDate,el.endDate,'end')}return true})
                                .filter((el)=>{if(serviceName){num =0
                                 return serviceName=== el.ServiceName}return el}).filter((el, i) => {num++                                    
                                 if (pagination - 10 < i + 1 && pagination >= i + 1) {
                                 return el}}).map((el,i)=>
                                <CTableRow>
                                    <CTableDataCell>{i + 1 + pagination - 10}</CTableDataCell>
                                    <CTableDataCell>{getDate(el.createdAt,true)}</CTableDataCell>
                                    <CTableDataCell>{el.clientId}</CTableDataCell>
                                    <CTableDataCell>{el.MemberName}</CTableDataCell>
                                    <CTableDataCell>{el.ServiceName}</CTableDataCell>
                                    <CTableDataCell>{el.username}</CTableDataCell>
                                    <CTableDataCell>{el.InvoiceNo}</CTableDataCell>
                                    <CTableDataCell>{el.commentsofwrite}</CTableDataCell>
                                </CTableRow>
                                )}    


                            </CTableBody>
                        </CTable>

                        {!AllInvoiceData[0] ?
                                <CCol style={{ width: '100%' }} className='d-flex justify-content-center my-3'>
                                    <YogaSpinnar />
                         </CCol> : ''}
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
              
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default CommentOfWritten;