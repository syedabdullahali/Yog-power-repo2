import React from 'react'

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CCol,
  CFormInput,
  CRow,
  CForm,
  CFormSelect,
  CCallout,
  CModal,
  CModalHeader,
  CModalTitle,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CNav,
  CNavGroup,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
  CPagination,
  CPaginationItem,

} from "@coreui/react";

import axios from 'axios';

let user = JSON.parse(localStorage.getItem('user-info'))
const token = user.token;
const username = user.user.username;
import { useState,useEffect } from 'react';
import { useSelector } from "react-redux";
import CustomSelectInput from './CustomSelectInput/CustomSelectInput';


const headers = {
  "Authorization": `Bearer ${token}`,
  'Accept': 'application/json',
  'Content-Type': 'application/json'
 }

const EmpLeaveListTable = () => {


  const obj ={
     leaveDate:'',
     empId:'',	
     empName:'',
     useLeave:'',
     MemberId:'',
     availableLeave:'',  
     year: new Date().getFullYear(),
  }

  const [staff, setStaff] = useState([])
  const [empLeaveTableData,setEmpLeaveTableData] = useState([])
  const [empLeaveListObj,setEmpLeaveListObj] = useState({...obj})
  const [yearArr,setYearArr] = useState([])
  const [selectedYear,setSelectedYear] = useState('')
  const [remainLeaveStatus,setRemainLeaveStatus] = useState('')
  const [selcteEmpError,setSelectEmpError] = useState('')
  const [pagination, setPagination] = useState(10)
  const [clientReferance,setClientReferance] = useState({
    clientName:'',
    clientId:''
  })


  const url = useSelector((el) => el.domainOfApi)
  const [activeForm,setActiveForm] = useState(false)

 async function getEmpLeaveListData  (){

  try{
    const response1 = await axios.get(`${url}/empleaveList/emp-leave-info`,{headers})
    if(response1.status===200){
     setStaff(response1.data)
     
     setYearArr([...response1?.data[0]?.leaveDetails].map((el)=>el.year))
     setSelectedYear(response1?.data[0]?.leaveDetails[0].year)
    }
  }catch(error){
    console.log(error)
  }
  }

  useEffect(()=>{
    getEmpLeaveListData()
  },[])

 const selectedStaff =  staff.find((el)=>el.memBerId===empLeaveListObj.MemberId)


  useEffect(()=>{
    if(selectedStaff){
    setEmpLeaveListObj(prev=>({...prev,empName:selectedStaff?.empName}))   
    setEmpLeaveListObj(prev=>({...prev,empId:selectedStaff?.empId}))  
    setRemainLeaveStatus("")                                                                                                              
    }                                                             

  },[empLeaveListObj.MemberId])

   useEffect(()=>{
    const month = new Date().getMonth()+1
    const date = new Date().getDate()


    setEmpLeaveListObj(prev=>{
    return  ({...prev,
      leaveDate:`${selectedYear}-${month<10?"0"+month:month}-${date<10?"0"+date:date}`
    })
  })   
   },[selectedYear])

  const saveData = async  (type)=>{

     let response ={}

     try{
       if(type==='Save'){
         response = await  axios.post(`${url}/empleaveList/create`,empLeaveListObj,{headers})
       }
       if(response?.status===200){
        alert('successfully save')
        getEmpLeaveListData()
      }

       }catch(error){
         console.error(error)
       }
     
  }
 
  function clientObj(obj){
    setClientReferance(obj.empName)   
    setClientReferance(()=>({clientName:obj.empName,clientId:obj.empId})) 
 }

 function clearFilter(){
setClientReferance(
  {
    clientName:'',
    clientId:''
  }
)
 }


 let num =0

  return (
    <>

                    {activeForm&& <CCard className='p-3 my-3'>
                        <CForm>
                            <CCol className="d-flex justify-content-end">
                                <CButton color='danger' onClick={() =>{
                                  setActiveForm(false)
                                  setEmpLeaveListObj({...obj})
                                  setRemainLeaveStatus("")                                          

                                  
                                  } }>Close</CButton>
                            </CCol>

                              <CRow>
                              <CCol md={6}>
                                    <CFormInput
                                        label='Date'
                                        type='date'   
                                        value={empLeaveListObj.leaveDate} 
                                        onChange={(e)=>setEmpLeaveListObj(prev=>({...prev,leaveDate:e.target.value,year:new Date(e.target.value).getFullYear()}))}                                                                        
                                    />
                              </CCol>
                              <CCol lg={6} md={6} sm={12}>
                                            <CFormSelect
                                                className="mb-1"
                                                aria-label="Select Assign Staff"
                                                value={empLeaveListObj.MemberId} 
                                                onChange={(e)=>setEmpLeaveListObj(prev=>({...prev,MemberId:e.target.value}))}   
                                                label='Employee'
                                            >
                                                <option value=''>Select Employee</option>
                                                {staff.map((item, index) => (
                                                        <option key={index} value={item.memBerId}>{item.empName}</option>
                                                ))}
                                            </CFormSelect>
                                        </CCol>
                                
                            </CRow>

                            <CRow>
                                <CCol md={6}>
                                    <CFormInput
                                        label='Emp Id'
                                        type='text'
                                        value={empLeaveListObj.empId} 
                                        onChange={(e)=>setEmpLeaveListObj(prev=>({...prev,empId:e.target.value}))}  

                                    />
                                </CCol>
                                <CCol md={6}>
                                    <CFormInput
                                        label={`${remainLeaveStatus?`Remain Leave ${remainLeaveStatus}`:'Apply Leaves '}`}
                                        type='number'
                                        value={empLeaveListObj.useLeave} 
                                        onChange={(e)=>setEmpLeaveListObj(prev=>{
                                          const data =
                                           selectedStaff?.leaveDetails?.find((el)=>el.year===+selectedYear)
                                           const leaves =data?.totalLeave - +data?.useleave + -e.target.value
                                            if(leaves>=0){      
                                              setEmpLeaveListObj(prev=>({...prev,availableLeave:leaves}))   
                                              setRemainLeaveStatus(leaves+"")                                          
                                            }else{
                                              return  prev
                                            }
                                            if(!empLeaveListObj.MemberId){
                                              setSelectEmpError('Select Your Employee First')
                                              return  prev
                                            }       
                                          return ({...prev,useLeave:e.target.value})}
                                          )}  
                                    />
                                </CCol>
                            </CRow>
                          <CButton color="primary mt-4 px-4" onClick={(() => {saveData('Save')})} >Save</CButton>

                        </CForm>
                    </CCard>}

                   
                    <CRow>

                    <CCol className='my-2' lg={4} md={4} sm={6}>
                    <CFormSelect
                    label='Filter By Year'
                    value={selectedYear}
                    onChange={(e)=>setSelectedYear(e.target.value)}
                    >
                      {yearArr.map((el,i)=>{
                       return <option key={i}>{el}</option>   
                      })}
                    </CFormSelect>
                    </CCol> 

                    {<CCol lg={4} md={4} sm={6} className=' my-2'>
                                  <label className="mb-2">Select Employee </label>
                                    <CustomSelectInput data={staff} 
                                    title={clientReferance.clientName?.trim()?clientReferance.clientName:"Select Employee Name"}
                                     getData={clientObj}/>
                                </CCol>}


                    </CRow>
                    <CRow>
                      <CCol>
                        <CButton onClick={()=>clearFilter()}> Clear Filter</CButton>
                      </CCol>
                    </CRow>

                   

                    <CCol className='text-end my-2'>
                     { !activeForm && <CButton onClick={()=>setActiveForm(true)}>Add Leave</CButton>}
                    </CCol>  


    <CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345" }} hover responsive>
                        <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                            <CTableRow >
                                <CTableHeaderCell>Sr.No</CTableHeaderCell>
                                <CTableHeaderCell>Year</CTableHeaderCell>
                                <CTableHeaderCell>Emp Id</CTableHeaderCell>
                                <CTableHeaderCell>Emp Name</CTableHeaderCell>
                                <CTableHeaderCell>Total Leave</CTableHeaderCell>
                                <CTableHeaderCell>Use Leave</CTableHeaderCell>
                                <CTableHeaderCell>Available Leave</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          {staff.filter((el)=>el.empId.includes(clientReferance.clientId)).filter((el, i) => {num++
                                if (pagination - 10 < i + 1 && pagination >= i + 1) {return el}}).map((el,i)=>{
                                
                                const {year,useleave,totalLeave} = el.leaveDetails.find((el)=>el.year===+selectedYear)

                              return   <CTableRow className="text-center" key={i}>
                                <CTableDataCell>{i + 1 + pagination - 10}
                                </CTableDataCell>
                                <CTableDataCell>{year}
                                </CTableDataCell>
                                <CTableDataCell>{el.empId}
                                </CTableDataCell>
                                <CTableDataCell>{el.empName}
                                </CTableDataCell>
                                <CTableDataCell>
                                                {totalLeave}
                                </CTableDataCell>
                                <CTableDataCell>{useleave}
                                </CTableDataCell>
                                <CTableDataCell>
                                                {totalLeave-useleave}
                                </CTableDataCell>                                                         
                            </CTableRow>  
                          })}
                             
                        </CTableBody>
                    </CTable> 




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
  </>)
}

export default EmpLeaveListTable
