import {
    CTable,CTableHead,CTableRow,
    CTableHeaderCell, CTableBody,
    CTableDataCell,CCard,CCardHeader,
    CCardTitle,
    CPagination,
    CPaginationItem,
    CFormSelect,
    CRow,CCol,
    CButton,
} from '@coreui/react'

import { Link } from 'react-router-dom';
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CountryList } from "src/components/CountryList";
import { useSelector } from 'react-redux'
import moment from 'moment/moment';

const monthName =     ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function TtcClientDetails (){
  let num =0


const url= useSelector((el)=>el.domainOfApi) 
const [classesData,setClassesData] = useState([])
const [pagination, setPagination] = useState(5)
const [filterObj,setFilterObj] = useState({
  clientName:'',
  year:'',
  month:'',
})

let user = JSON.parse(localStorage.getItem('user-info'))
const token = user.token;

const headers = {
    'Authorization': `Bearer ${token}`,
    'My-Custom-Header': 'foobar'
};




const getTtSClassesDetails = async ()=>{
try{
  const response  = await axios.get(`${url}/memberForm/classes/TTC Classes`,{headers})
  if(response.status===200){
    console.log(response.data)
    setClassesData(response.data)  
  }
}catch(error){
console.log(error)
}
}


useEffect(()=>{
getTtSClassesDetails()
},[])


const clearFilter = ()=>{
  setFilterObj(
    {
      clientName:'',
      year:'',
      month:'',
    }
  )
 }

 function updateRec(id, status) {
  const data1 = { status: status }
  fetch(`${url}/memberForm/update/${id}`, {
      method: "POST",
      headers: {
          "Authorization": `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data1)
  }).then((resp) => {
      resp.json().then(() => {
        getTtSClassesDetails()
      })
  })
}


return<CCard className=''>
 <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }} className='mb-2'>
                        <CCardTitle className="mt-2">TTC Client </CCardTitle>
 </CCardHeader>
          <CCol className='text-end px-3'>
            <h5>Total Clinet :- {classesData.length}</h5>
          </CCol>

 <CRow className="mx-3">
        <h5 className="m-0 p-0">Filter by</h5>
      </CRow>
     <CRow className="mx-3 p-0">
         <CCol lg={3} md={3} className="m-0 p-0">
              <CFormSelect
              label='Client Name'
              value={filterObj.clientName}
              onChange={(e)=>setFilterObj(prev=>({...prev,clientName:e.target.value}))}
              >
                <option value={''} >Select Client Name</option>
                {classesData.map((el,i)=>
                <option key={i} value={el.Fullname} >{el.Fullname}</option>
                )}
              </CFormSelect>
         </CCol>
         <CCol lg={3} md={3} >
            <CFormSelect
              label='Year'
              value={filterObj.year}
              onChange={(e)=>setFilterObj(prev=>({...prev,year:e.target.value}))}
              >
               <option key={'l'} value={''}>Select Year</option>
                <option>2023</option>
                <option>2024</option>
                <option>2025</option>
                <option>2026</option>
                <option>2027</option>
                <option>2028</option>
                <option>2029</option>
                <option>2030</option>
                <option>2031</option>
                <option>2032</option>
                <option>2034</option>
                <option>2035</option>
              </CFormSelect>
         </CCol>
         <CCol lg={3} md={3} >
         <CFormSelect
              label='Month'
              value={filterObj.month}
              onChange={(e)=>setFilterObj(prev=>({...prev,month:e.target.value}))}
              >
                <option key={'l'} value={''}>Select Month</option>
                { monthName.map((el,i)=><option key={i} value={i}>{el}</option>)}
          </CFormSelect>
         </CCol>
     </CRow>
     <CRow className="mx-2 py-3">
      <CCol >
      <CButton onClick={()=>clearFilter()}>Clear Filter</CButton>
      </CCol>
     </CRow>

<CTable className='m-3 p-2' align="middle" bordered style={{ borderColor: "#0B5345"}} hover responsive>
   <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }}>
       <CTableRow>
        <CTableHeaderCell>Member ID</CTableHeaderCell>    
        <CTableHeaderCell>Client Name</CTableHeaderCell>    
        <CTableHeaderCell>Contact</CTableHeaderCell>    
        <CTableHeaderCell>Gender</CTableHeaderCell>    
        <CTableHeaderCell>Course Name</CTableHeaderCell>    
        <CTableHeaderCell>Start Date</CTableHeaderCell>    
        <CTableHeaderCell>End Date</CTableHeaderCell> 
        <CTableHeaderCell>Invoice No</CTableHeaderCell>    
        <CTableHeaderCell>Trainner</CTableHeaderCell>    
        <CTableHeaderCell>Action</CTableHeaderCell>    
       </CTableRow>
   </CTableHead>
   <CTableBody>
    {classesData.filter((el)=>{
         return (new Date(el.createdAt).getFullYear()+"").includes(filterObj.year) &&
                (new Date(el.createdAt).getMonth()+"").includes(filterObj.month) &&
                el.Fullname.includes(filterObj.clientName)
        }).filter((el, i) => {  num++
if (pagination - 5 < i + 1 && pagination >= i + 1) {return el}}).map((el,i)=>
    <CTableRow key={i}>
     <CTableDataCell>{i+1}</CTableDataCell>
     <CTableDataCell>
     <Link style={{textDecoration:'none'}} to={`/clients/member-details/${el._id}/1`}>{el.Fullname}</Link>
     </CTableDataCell>
     <CTableDataCell>{el.ContactNumber}</CTableDataCell>
     <CTableDataCell>{el.Gender}</CTableDataCell>
     <CTableDataCell>{el.serviceName}</CTableDataCell>
     <CTableDataCell>{moment(el.startDate).format('YYYY-MM-DD')}</CTableDataCell>
     <CTableDataCell>{moment(el.endDate).format('YYYY-MM-DD')}</CTableDataCell>
     <CTableDataCell>{el.invoiceNum}</CTableDataCell>
     <CTableDataCell>{el.GeneralTrainer}</CTableDataCell>
     <CTableDataCell>{el.status === 'active' ? <><CButton className='mt-1' color='success' onClick={() => updateRec(el._id, 'inactive')} >Active</CButton></> : <CButton className='mt-1' color='danger' onClick={() => updateRec(el._id, 'active')}>Inactive</CButton>}</CTableDataCell>
    </CTableRow>
    )}
    </CTableBody>
</CTable>

<div className='d-flex justify-content-center mt-3' >
          <CPagination aria-label="Page navigation example" style={{ cursor: 'pointer' }}>
            <CPaginationItem aria-label="Previous" onClick={() => setPagination((val) => val > 5 ? val - 5 : 5)}>
              <span aria-hidden="true" >&laquo;</span>
            </CPaginationItem>
            <CPaginationItem active >{pagination / 5}</CPaginationItem>
            {num > pagination / 5 * 5 && <CPaginationItem onClick={() => setPagination((val) => val < num ? val + 5 : val)}>{pagination / 5 + 1}</CPaginationItem>}
            {num > pagination / 5 * 10 && <CPaginationItem onClick={() => setPagination((val) => val < num ? val + 5 : val)}>{pagination / 5 + 2}</CPaginationItem>}
            <CPaginationItem aria-label="Next" onClick={() => setPagination((val) => val < num ? val + 5 : val)}>
              <span aria-hidden="true">&raquo;</span>
            </CPaginationItem>
          </CPagination>
        </div>
</CCard>
}

export default TtcClientDetails