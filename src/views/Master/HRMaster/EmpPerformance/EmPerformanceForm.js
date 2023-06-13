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

} from '@coreui/react'
import { useSelector } from 'react-redux';
import axios from 'axios';
let user = JSON.parse(localStorage.getItem('user-info'))
const token = user.token;
const username = user.user.username;


const headers = {
    "Authorization": `Bearer ${token}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
   }


const EmPerformanceForm = ({updateActive,getData,staff,setUpdateActive}) => {
    const url = useSelector((el) => el.domainOfApi)

   
    
  const [empObj,setEmpObj] = useState({
username:username,  
name:'',
empId:'',
employeeId:'',
department:'',	
designation:'',	
punctuality:'',
productivity:'',	
response:'',	
additionalComments:'',
  }
) 


const [error,setError] = useState(false)
const [form,setForm] =useState(false)
const selectedStaff =  staff?.find((el)=>el?._id===empObj.employeeId)

const clear = ()=>{
  setEmpObj({ 
    username:username,  
    name:'',
    empId:'',
    employeeId:'',
    department:'',	
    designation:'',	
    punctuality:'',
    productivity:'',	
    response:'',	
    additionalComments:'',
    } )
}






const validationVal = Object.values(empObj).every((el)=>!!el+""?.trim())


useEffect(()=>{
  if(validationVal){
    setError(false)
  }
},[validationVal])

useEffect(()=>{
setEmpObj(prev=>({...prev,empId:selectedStaff?.EmployeeID}))
setEmpObj(prev=>({...prev,department:selectedStaff?.Department}))
setEmpObj(prev=>({...prev,designation:selectedStaff?.JobDesignation}))
setEmpObj(prev=>({...prev,name:selectedStaff?.FullName}))

},[selectedStaff?._id])


const saveData = async  (type)=>{
 
  if(!validationVal){
     setError(true)
     return 
  }


   let response ={}
   try{
     if(type==='Save'){
       response = await  axios.post(`${url}/employeePerformance/create`,empObj,{headers})
     }
     if(type==='Update'){
      response = await  axios.post(`${url}/employeePerformance/update/${empObj?._id}`,empObj,{headers})
     }
    if(response?.status===200){
     alert('successfully save')
     getData()
     clear()
    }
     }catch(error){
       console.error(error)
     }
   
}


useEffect(()=>{
if(updateActive?.visible){
setEmpObj(updateActive?.obj)
setForm(true)
}else{
setForm(false)
}
},[updateActive?.visible])

  return (

    <>

    {form&& <CCard className="mb-3 border-success mt-4">
                    <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                        <CCardTitle className="mt-2">Employee Performance form</CCardTitle>
                    </CCardHeader>
                    <CCardBody>
                      <CCol className='text-end'>
                        <CButton color='danger' onClick={()=>{
                          clear()
                          setError(false)
                          setForm(false)
                          setUpdateActive({visible:false,obj:{}})
                        }} >Close</CButton>
                      </CCol>

           <CRow>
            <CCol >
              <CFormSelect
              label='Name'
              value={empObj.employeeId}
              onChange={(e)=>setEmpObj(prev=>({...prev, employeeId:e.target.value}))}
              >
                <option value=''>Select Employee</option>
                        {staff.filter((list) => list.username === username &&
                          list.selected === 'Select').map((item, index) => (
                            <option key={index} value={item._id}> {item.FullName}</option>
                          ))}
              </CFormSelect>
              </CCol>
              <CCol>
              <CFormInput
              label='Emp Id'
              type='text'
              value={empObj.empId}
              onChange={(e)=>{
                setEmpObj(prev=>({...prev,empId:e.target.value}))
              }}
              
            >
              </CFormInput>
              </CCol>
             
        </CRow>
        <CRow>
            <CCol>
            <CFormInput
              label='Department'
              value={empObj.department}
              type='text'
              onChange={(e)=>{
                setEmpObj(prev=>({...prev,department:e.target.value}))
              }}
              >
              </CFormInput>
            </CCol>
            <CCol>
            <CFormInput
            label='Designation'
            value={empObj.designation}
            type='text'
            onChange={(e)=>{
              setEmpObj(prev=>({...prev,designation:e.target.value}))
            }}
              >
              </CFormInput>
            </CCol>
        </CRow>
        <CRow>
            <CCol>
              <CFormInput
              label='Punctuality'
              value={empObj.punctuality}
              type='text'
              onChange={(e)=>{
                setEmpObj(prev=>({...prev,punctuality:e.target.value}))
              }}
              />
            </CCol>
            <CCol>
              <CFormInput
              label='Productivity'
              value={empObj.productivity}
              type='text'
              onChange={(e)=>{
                setEmpObj(prev=>({...prev,productivity:e.target.value}))
            }}
              />
            </CCol>
        </CRow>

        <CRow>
            <CCol>
              <CFormInput
              label='Response'
              value={empObj.response}
              type='text'
              onChange={(e)=>{
                setEmpObj(prev=>({...prev,response:e.target.value}))
            }}
              />
            </CCol>
            <CCol>
              <CFormInput
              label='Additional Comments'
              value={empObj.additionalComments}
              onChange={(e)=>{
                setEmpObj(prev=>({...prev,additionalComments:e.target.value}))
            }}
              />
            </CCol>

        </CRow>
        
        
            <CCol className='text-end py-2'>
              {!updateActive.visible&& <CButton onClick={()=>saveData('Save')}>Save</CButton>}
              {!!updateActive.visible &&<CButton onClick={()=>saveData('Update')}>Update</CButton>}
            </CCol>
            <CCol className='text-end py-2'>
               {error &&<p style={{color:'red'}}>Please fill all details</p>}
            </CCol>
                    </CCardBody>
    </CCard>}

    <CCol className='text-end p-2'>
      {!form &&<CButton onClick={()=>setForm(true)}>ADD ON</CButton>}
    </CCol>
    </>            
  )
}

export default EmPerformanceForm

