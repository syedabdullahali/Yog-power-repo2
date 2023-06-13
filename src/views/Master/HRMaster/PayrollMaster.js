import React, { useEffect, useState } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCardTitle,
    CCol,
    CFormInput,
    CFormSelect,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CForm,
    CNav,
    CNavItem,
    CNavLink,
    CTabContent,
    CTabPane
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowCircleBottom, cilArrowCircleTop, cilInfo } from '@coreui/icons'
import { MdCall, MdDelete, MdEdit, MdMail } from 'react-icons/md';
import { BsPlusCircle, BsWhatsapp } from 'react-icons/bs';
import { useSelector } from "react-redux";
import axios from 'axios';
import moment from 'moment';
import { icons } from 'react-icons/lib';
import SalarySheet from 'src/views/hr/SalarySheet';

let user = JSON.parse(localStorage.getItem('user-info'))
const token = user.token;
const username = user.user.username;
const centerCode = user.user.centerCode;


const PayrollMaster = () =>{

  const obj = {
    username:username,
    month:new Date(),
    empId:'',
    joiningDate:'',
    Gender:'',  
    empName:'',
    Designations:'',
    Department:'',
    lateMark:'0',
    halfday:'0',
    leaveDay:'0',
    adjustLeave:'0',
    TWD:30,
    TPD:'0',
    grossSalary:'0',
    BasicSalary:'0',
    incentive:'0',
    PT:'0',  
    netSalary:'0',
    remark:'0',
    advancedSalaryDedct:'0',
    Location:'0',
    typeOfJobTimeing:'0',
    modeOfPayment:'0',
    ctc:'0'
  }


  

  const [showForm,setForm] = useState(true)
  const [salarySheet,setSalarySheet] = useState({...obj})
  const [salarySheetData,setSalarySheetData] = useState([])
  const [updateActive,setUpdateActive] = useState(false)
  const [activeKey, setActiveKey] = useState(1)

  const url = useSelector((el) => el.domainOfApi)


  const headers = {
    "Authorization": `Bearer ${token}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
   }





const [staff, setStaff] = useState([])

const selectedStaff =  staff?.find((el)=>el?._id===salarySheet?.empName)

function getStaff() {
    axios.get(`${url}/employeeform`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then((res) => {
            setStaff(res.data.reverse())
        })
        .catch((error) => {
            console.error(error)
        })
}


console.log(staff)

useEffect(()=>{
  setSalarySheet(prev=>({...prev,empId:selectedStaff?.EmployeeID}))
  setSalarySheet(prev=>({...prev,Designations:selectedStaff?.JobDesignation }))
  setSalarySheet(prev=>({...prev,Department:selectedStaff?.Department  }))
  setSalarySheet(prev=>({...prev,BasicSalary:(selectedStaff?.Salary /12).toFixed(3)}))
  setSalarySheet(prev=>({...prev,ctc:selectedStaff?.Salary }))
  setSalarySheet(prev=>({...prev,joiningDate:selectedStaff?.joiningDate }))
  setSalarySheet(prev=>({...prev,Location:selectedStaff?.address }))
  setSalarySheet(prev=>({...prev,typeOfJobTimeing:selectedStaff?.Grade}))
  setSalarySheet(prev=>({...prev,Gender:selectedStaff?.Gender}))

  
},[salarySheet.empName])



const totalLeave = ((+salarySheet.halfday/100)*50)+ +(salarySheet.lateMark/6)+ +salarySheet.leaveDay
const removeLeave  =+salarySheet.adjustLeave

const totalDecAdPt  = +salarySheet.TPD + +salarySheet.PT
const basicSalary  =  salarySheet.BasicSalary

const netSlaryCal  = +salarySheet.incentive - +salarySheet.advancedSalaryDedct



useEffect(()=>{
 
  setSalarySheet(prev=>{
    return  {...prev,TWD:30+ - totalLeave + removeLeave }
  })    

},[totalLeave,removeLeave])


useEffect(()=>{

  setSalarySheet(prev=>{
    return  {...prev,grossSalary:(basicSalary- totalDecAdPt).toFixed(3) }
  })    
  
  },[totalDecAdPt,basicSalary])

  useEffect(()=>{



    setSalarySheet(prev=>{
      return  {...prev,netSalary:+salarySheet.grossSalary +netSlaryCal }
    })    
    
    },[salarySheet.grossSalary,netSlaryCal])


const getSalarySheetData = ()=>{
  axios.get(`${url}/salarySheet/all`,{headers}).then((el)=>{
   if(!el.status){
    return 
   }
   setSalarySheetData(el.data.reverse())
 }).catch((error)=>{console.log(error)})
 }


useEffect(() => {
  getSalarySheetData()
  getStaff()
}, [])

function deleteSalarySheet(id) {
  if (confirm('Do you want to delete this')) {
      fetch(`${url}/salarySheet/delete/${id}`, {
          method: 'DELETE',
          headers: {
              "Authorization": `Bearer ${token}`,
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
      }).then((result) => {
          result.json().then((resp) => {
              getSalarySheetData()
          })
      })
  }
}



const saveData = async (type)=>{


  let response ={}
  try{
    if(type==='Save'){
      response = await  axios.post(`${url}/salarySheet/create`,{...salarySheet,empName:selectedStaff?.FullName,employeeID:selectedStaff._id},{headers})
    }
    if(type==='Update'){
     response = await  axios.post(`${url}/salarySheet/update/${salarySheet?._id}`,{...salarySheet,empName:selectedStaff?.FullName},{headers})
    }
   if(response?.status===200){
    getSalarySheetData()
    alert('successfully save')
   }
    }catch(error){
      console.error(error)
    }
}


 const [result, setResult] = useState([])
 function getDesignation() {
     axios.get(`${url}/designation/all`, {
         headers: {
             'Authorization': `Bearer ${token}`
         }
     })
         .then((res) => {
             setResult(res.data.reverse())

         })
         .catch((error) => {
             console.error(error)
         })
 }

useEffect(()=>{
 getDesignation()
},[])


const updateProduct = async (item)=>{
  console.log(item)
  setForm(false)
  setSalarySheet({...item,empName:item.employeeID})
  setUpdateActive(true)
 
}


console.log(salarySheetData)

    return <div>
      <CCard className="mb-3 border-success mt-4">
                    <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                        <CCardTitle className="mt-2">Salary Sheet </CCardTitle>
                    </CCardHeader>
                    <CCardBody>

                     
    {showForm?<CCol className="bg-body d-flex justify-content-end">
            <CButton onClick={()=>setForm((value)=>!value)}>Add New Salary</CButton>
    </CCol>:

    <CCard className="overflow-hidden">
        <CCardHeader className="p-2" style={{ backgroundColor: '#0B5345', color: 'white' }}>
                 <CCardTitle> <h4>Salary Setup</h4></CCardTitle>
        </CCardHeader>
        <CCardBody>

            <CCol className="d-flex justify-content-end">
                <CButton color='danger' onClick={()=>setForm(()=>true)}>Close</CButton>
            </CCol>

        <CNav variant="tabs" role="tablist">
      <CNavItem>
        <CNavLink
          active={activeKey === 1}
          onClick={() => setActiveKey(1)}
        >
         Employee Info
        </CNavLink>
      </CNavItem>
      <CNavItem>
        <CNavLink
          active={activeKey === 2}
          onClick={() => setActiveKey(2)}
        >
          Employee Salary Info
        </CNavLink>
      </CNavItem>
    
    </CNav>


    <CTabContent className='p-2'>

      <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>

       <div className="p-4">
         <CForm>
         <CRow>
            <CCol md={6}>
                <CFormInput
                  type="date"
                  label='Select Month'
                  value={salarySheet.month}
                  onChange={(e)=>setSalarySheet(prev=>({...prev,month:e.target.value}))}
                />
              </CCol>
              <CCol md={6}>
              <CFormSelect
              label='Emp Name'
              value={salarySheet.empName}
              onChange={(e)=>setSalarySheet(prev=>({...prev,empName:e.target.value}))}
              >
                <option value=''>Select Employee</option>
                        {staff.filter((list) => list.username === username &&
                          list.selected === 'Select').map((item, index) => (
                            <option key={index} value={item._id}> {item.FullName}</option>
                          ))}
              </CFormSelect>
              </CCol>
              
              <CCol md={6}>
                <CFormInput
                  type="text"
                  label='Emp Id'
                  value={salarySheet.empId}
                  onChange={(e)=>setSalarySheet(prev=>({...prev,empId:e.target.value}))}
                />
              </CCol>

              
              <CCol md={6}>
                <CFormInput
                  type="date"
                  placeholder="Enter Your Name"
                  label='Joining Date'
                  value={moment(salarySheet.joiningDate).format('YYYY-MM-DD')}
                  onChange={(e)=>setSalarySheet(prev=>({...prev,joiningDate:e.target.value
                  }))}
                />
              </CCol>
            </CRow> 
            <CRow >
              <CCol md={6}>
              <CFormSelect
                  label='Select Your Gender'
                  value={salarySheet.Gender}
                  onChange={(e)=>setSalarySheet(prev=>({...prev,Gender:e.target.value}))}
                  options={[
                    "Select Gender",
                    { label: 'Male', value: 'Male' },
                    { label: 'Female', value: 'Female' }

                  ]}
              />
             
              </CCol>
            <CCol md={6}>
              <CFormInput
              label='Location'
              placeholder="Enter Your Location"
              value={salarySheet.Location}
              onChange={(e)=>setSalarySheet(prev=>({...prev,Location:e.target.value}))}
              />
            </CCol>

            <CCol md={6}>
              <CFormSelect
                  label='Full/Part Time'
                  value={salarySheet.typeOfJobTimeing}
                  onChange={(e)=>setSalarySheet(prev=>({...prev,typeOfJobTimeing:e.target.value}))}
                  options={[
                    "Select Grade",
                    { label: "Full Time", value: "Full Time" },
                    { label: "Part Time", value: "Part Time" },
                    { label: "Freelancer", value: "Freelancer" },
                    { label: "Consultant", value: "Consultant" },

                ]}
              />
                </CCol>   
               
                 <CCol md={6}>
                      <CFormSelect
                        className="mb-1"
                        aria-label="Select Job Department"
                        value={salarySheet.Department}
                        onChange={(e)=>setSalarySheet(prev=>({...prev,Department:e.target.value}))}
                        label="Department"
                      >
                        <option>Select Department</option>

                        {result.map((item, index) => (
                          item.username === username && (
                            item.status === true && (
                              <option key={index} >{item.department}</option>
                            )
                          )
                        ))}
                      </CFormSelect>
                </CCol>    

                 <CCol md={6}>
                      <CFormSelect
                        className="mb-1"
                        aria-label="Select Job Designation"
                        value={salarySheet.Designations}
                        onChange={(e)=>setSalarySheet(prev=>({...prev,Designations:e.target.value}))}
                        label="Job Designation"
                      >
                        <option>Select Designation</option>
                        {result.map((item, index) => (
                          item.status === true && (
                            <option key={index} >{item.jobDesignation}</option>
                          )

                        ))}
                      </CFormSelect>
                </CCol> 

            </CRow>    

         </CForm>
        </div>


      </CTabPane>
      <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={activeKey === 2}>
      <div className="p-4">
         <CForm>
 

            <CRow>
             
          
            <CCol md={6}>
              <CFormInput
                  label='No Of Half Day'
                  type="number"
                  value={salarySheet.halfday}
                  onChange={(e)=>setSalarySheet(prev=>({...prev,halfday:e.target.value}))}    
              />
                </CCol>
             
                <CCol md={6}>
              <CFormInput
                  label='Late Mark'
                  type="number"
                  value={salarySheet.lateMark}
                  onChange={(e)=>setSalarySheet(prev=>({...prev,lateMark:e.target.value}))}  
                  
              />
                </CCol>

                <CCol md={6}>
              <CFormInput
                  label='No of Leave'
                  type="number"
                  value={salarySheet.leaveDay}
                  onChange={(e)=>setSalarySheet(prev=>({...prev,leaveDay:e.target.value}))}  
                  
              />
                </CCol>
                <CCol md={6}>
              <CFormInput
                  label='Adjust Leave'
                  type="number"
                  value={salarySheet.adjustLeave}
                  onChange={(e)=>setSalarySheet(prev=>({...prev,adjustLeave:e.target.value}))}  
                  
              />
                </CCol>

                <CCol md={6}>
              <CFormInput
                  label='TWD'
                  type="text"      
                  value={salarySheet.TWD}
                  onChange={(e)=>setSalarySheet(prev=>({...prev,TWD:e.target.value}))}             
              />
                </CCol>
         
             
                <CCol md={6}>
              <CFormInput
                  label='Additional Tex/TDS/PF Amount'
                  type="text"
                  value={salarySheet.TPD}
                  onChange={(e)=>setSalarySheet(prev=>({...prev,TPD:e.target.value}))}    
                  
              />
                </CCol>

              <CCol md={6}>
              <CFormInput
                  label='Basic Salary'
                  type="text"
                  value={salarySheet.BasicSalary}
                  onChange={(e)=>setSalarySheet(prev=>({...prev,BasicSalary:e.target.value}))}    
                  
              />
                </CCol>               
       
              <CCol md={6}>
               <CFormInput
                  label='PT'
                  type="number"
                  value={salarySheet.PT}
                  onChange={(e)=>setSalarySheet(prev=>({...prev,PT:e.target.value}))} 
                  
              />
             </CCol>

             <CCol md={6}>
                <CFormInput
                  label='Gross Salary'
                  type="number"
                  value={salarySheet.grossSalary}
                  onChange={(e)=>setSalarySheet(prev=>({...prev,grossSalary:e.target.value}))}   
                  
              />
                </CCol>


                <CCol md={6}>
              <CFormInput
                  label='Incentive'
                  type="text"    
                  value={salarySheet.incentive}
                  onChange={(e)=>setSalarySheet(prev=>({...prev,incentive:e.target.value}))}              
              />
                </CCol>
               
                <CCol md={6}>
              <CFormInput
                  label='Adev Dec'
                  type="number"
                  value={salarySheet.advancedSalaryDedct}
                  onChange={(e)=>setSalarySheet(prev=>({...prev,advancedSalaryDedct:e.target.value}))} 
                  
              />
                </CCol>
          
                <CCol md={6}>
              <CFormInput
                  label='Net Salary Remark'
                  type="number"
                  value={salarySheet.netSalary}
                  onChange={(e)=>setSalarySheet(prev=>({...prev,netSalary:e.target.value}))} 
                  
              />
                </CCol>

                <CCol md={6}>
              <CFormInput
                  label='Remark'
                  type="text"
                  value={salarySheet.remark}
                  onChange={(e)=>setSalarySheet(prev=>({...prev,remark:e.target.value}))} 
                  
              />
                </CCol>
                <CCol md={6}>

                  
                <CFormSelect
                      className="mb-1"
                      label="Select Mode of Payment"
                      value={salarySheet.modeOfPayment}
                      style={{ minWidth: "100px" }}
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
                      onChange={(e)=>setSalarySheet(prev=>({...prev,modeOfPayment:e.target.value}))} 

                    />
            
                </CCol>

                  </CRow>
            <CCol className='mt-4'>
                    {updateActive?
                      <CButton onClick={()=>saveData('Update')} >Save Update</CButton>:          
                        <CButton onClick={()=>saveData('Save')} >Save</CButton>
                    }
            </CCol>
         </CForm>
    </div>
      </CTabPane>

    </CTabContent>

   
    <CCol style={{ backgroundColor: '#0B5345'}} className='p-1'>

    </CCol>

        </CCardBody>

      </CCard>}

                        <CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345",width:'200%' }} hover responsive>
                            <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                                <CTableRow >
                                    <CTableHeaderCell>Sr no</CTableHeaderCell>
                                    <CTableHeaderCell>Date</CTableHeaderCell>
                                    <CTableHeaderCell>Name</CTableHeaderCell>
                                    <CTableHeaderCell>Emp ID</CTableHeaderCell>
                                    <CTableHeaderCell>JoiningDate</CTableHeaderCell>
                                    <CTableHeaderCell>Gender</CTableHeaderCell>
                                    <CTableHeaderCell>Location</CTableHeaderCell>
                                    <CTableHeaderCell>Full/Part Time</CTableHeaderCell>
                                    <CTableHeaderCell>Department</CTableHeaderCell>
                                    <CTableHeaderCell>Designations</CTableHeaderCell>
                                    <CTableHeaderCell>No of Half Day</CTableHeaderCell>
                                    <CTableHeaderCell>Late Mark</CTableHeaderCell>
                                    <CTableHeaderCell>Leave Day</CTableHeaderCell>
                                    <CTableHeaderCell>Adjust Leave</CTableHeaderCell>
                                    <CTableHeaderCell>TWD</CTableHeaderCell>
                                    <CTableHeaderCell>TDS</CTableHeaderCell>
                                    <CTableHeaderCell>Basic Salary</CTableHeaderCell>
                                    <CTableHeaderCell>Gross Salary</CTableHeaderCell>
                                    <CTableHeaderCell>Incentive</CTableHeaderCell>
                                    <CTableHeaderCell>PT</CTableHeaderCell>
                                    <CTableHeaderCell>Adev Dec</CTableHeaderCell>
                                    <CTableHeaderCell>Incentive</CTableHeaderCell>
                                    <CTableHeaderCell>Net Salary </CTableHeaderCell>
                                    <CTableHeaderCell>Made of Payment</CTableHeaderCell>
                                    <CTableHeaderCell>Remark</CTableHeaderCell>
                                    <CTableHeaderCell>Edit/Delete</CTableHeaderCell>


                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                              
                                {salarySheetData.filter((el)=>el.username === username).map((item, index) => (
                                        <CTableRow key={index} className='text-center'>
                                            <CTableDataCell>{index + 1 }</CTableDataCell>
                                            <CTableDataCell>{new Date(item.month).toDateString()}</CTableDataCell>
                                            <CTableDataCell>{item.empId}</CTableDataCell>
                                            <CTableDataCell>{item.empName}</CTableDataCell>
                                            <CTableDataCell>{new Date(item.joiningDate).toDateString()}</CTableDataCell>
                                            <CTableDataCell>{item.Gender}</CTableDataCell>
                                            <CTableDataCell>{item.Location}</CTableDataCell>
                                            <CTableDataCell>{item.typeOfJobTimeing}</CTableDataCell>
                                            <CTableDataCell>{item.Department}</CTableDataCell>
                                            <CTableDataCell>{item.Designations}</CTableDataCell>
                                            <CTableDataCell>{item.halfday}</CTableDataCell>
                                            <CTableDataCell>{item.lateMark}</CTableDataCell>
                                            <CTableDataCell>{item.leaveDay}</CTableDataCell>
                                            <CTableDataCell>{item.adjustLeave}</CTableDataCell>
                                            <CTableDataCell>{item.TWD}</CTableDataCell>
                                            <CTableDataCell>{item.TPD}</CTableDataCell>
                                            <CTableDataCell>{item.BasicSalary}</CTableDataCell>
                                            <CTableDataCell>{item.grossSalary}</CTableDataCell>
                                            <CTableDataCell>{item.incentive}</CTableDataCell>
                                            <CTableDataCell>{item.PT}</CTableDataCell>
                                            <CTableDataCell>{item.advancedSalaryDedct}</CTableDataCell>
                                            <CTableDataCell>{item.incentive}</CTableDataCell>
                                            <CTableDataCell>{item.netSalary}</CTableDataCell>
                                            <CTableDataCell>{item.modeOfPayment}</CTableDataCell>
                                            <CTableDataCell>{item.netSalary}</CTableDataCell>

                                            <CTableDataCell>
                                               <MdEdit style={{cursor:'pointer'}} onClick={()=>updateProduct(item)}/>
                                               <MdDelete  style={{cursor:'pointer'}} onClick={()=>deleteSalarySheet(item._id)} />
                                            </CTableDataCell>                                       
                                        </CTableRow>
                                ))}
                                
                               
                            </CTableBody>
</CTable>

                    </CCardBody>
                </CCard>
      </div>
}

export default PayrollMaster;