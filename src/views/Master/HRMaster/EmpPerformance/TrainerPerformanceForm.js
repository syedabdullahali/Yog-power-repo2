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


const TrainerPerformanceForm = ({updateActive,getData,trainer,setUpdateActive}) => {
const url = useSelector((el) => el.domainOfApi)

    
const [trainerObj,setTrainerObj] = useState({
username:username,  
name:'',
trainerId:'',
empId:'',
department:'',
designation:'',
punctuality:'',
Attendance:'',
renewals:'',
training:'',
feedBACK:'',
Behaviour:'',
overallfeedback:'',
  }
) 


const [staff, setStaff] = useState([])
const [error,setError] = useState(false)
const [form,setForm] =useState(false)
const selectedStaff =  trainer?.find((el)=>el?._id===trainerObj.trainerId)


const clear = ()=>{
  setTrainerObj({ 
    username:username,  
    name:'',
    trainerId:'',
    empId:'',
    department:'',
    designation:'',
    punctuality:'',
    Attendance:'',
    renewals:'',
    training:'',
    feedBACK:'',
    Behaviour:'',
    overallfeedback:'',
    } )
}






const validationVal = Object.values(trainerObj).every((el)=>!!el+""?.trim())


useEffect(()=>{
  if(validationVal){
    setError(false)
  }
},[validationVal])

useEffect(()=>{
setTrainerObj(prev=>({...prev,empId:selectedStaff?.EmployeeID}))
setTrainerObj(prev=>({...prev,department:selectedStaff?.Department}))
setTrainerObj(prev=>({...prev,designation:selectedStaff?.JobDesignation}))
setTrainerObj(prev=>({...prev,name:selectedStaff?.FullName}))

},[selectedStaff?._id])


const saveData = async  (type)=>{
 
  if(!validationVal){
     setError(true)
     return 
  }


   let response ={}
   const id = trainerObj?._id
   delete trainerObj?._id
   try{
     if(type==='Save'){
       response = await  axios.post(`${url}/trainerPerformance/create`,trainerObj,{headers})
     }
     if(type==='Update'){
      response = await  axios.post(`${url}/trainerPerformance/update/${id}`,trainerObj,{headers})
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
   
    setTrainerObj({
    username: updateActive?.obj?.username,  
    name:updateActive?.obj?.name,
    trainerId:updateActive?.obj?.trainerId,
    department:updateActive?.obj?.department,
    designation:updateActive?.obj?.designation,
    punctuality:updateActive?.obj?.punctuality,
    Attendance:updateActive?.obj?.Attendance,
    renewals:updateActive?.obj?.renewals,
    training:updateActive?.obj?.training,
    feedBACK:updateActive?.obj?.feedBACK,
    Behaviour:updateActive?.obj?.Behaviour,
    overallfeedback:updateActive?.obj?.overallfeedback    
})
setForm(true)
}else{
    setForm(false)
}
},[updateActive?.visible])

  return (

    <>

    {form&& <CCard className="mb-3 border-success mt-4">
                    <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                        <CCardTitle className="mt-2">trainerloyee Performance form</CCardTitle>
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
              value={trainerObj.trainerId}
              onChange={(e)=>setTrainerObj(prev=>({...prev, trainerId:e.target.value}))}
              >
                <option value=''>Select trainerloyee</option>
                        {trainer.filter((list) => list.username === username &&
                          list.selected === 'Select').map((item, index) => (
                            <option key={index} value={item._id}> {item.FullName}</option>
                          ))}
              </CFormSelect>
              </CCol>
              <CCol>
              <CFormInput
              label='trainer Id'
              type='text'
              value={trainerObj.empId}
              onChange={(e)=>{
                setTrainerObj(prev=>({...prev,empId:e.target.value}))
              }}
              
            >
              </CFormInput>
              </CCol>
             
        </CRow>
        <CRow>
            <CCol>
            <CFormInput
              label='Department'
              value={trainerObj.department}
              type='text'
              onChange={(e)=>{
                setTrainerObj(prev=>({...prev,department:e.target.value}))
              }}
              >
              </CFormInput>
            </CCol>
            <CCol>
            <CFormInput
            label='Designation'
            value={trainerObj.designation}
            type='text'
            onChange={(e)=>{
              setTrainerObj(prev=>({...prev,designation:e.target.value}))
            }}
              >
              </CFormInput>
            </CCol>
        </CRow>
        <CRow>
            <CCol>
              <CFormInput
              label='Punctuality'
              value={trainerObj.punctuality}
              type='text'
              onChange={(e)=>{
                setTrainerObj(prev=>({...prev,punctuality:e.target.value}))
              }}
              />
            </CCol>
            <CCol>
              <CFormInput
              label='Attendance'
              value={trainerObj.Attendance}
              type='text'
              onChange={(e)=>{
                setTrainerObj(prev=>({...prev,Attendance:e.target.value}))
            }}
              />
            </CCol>
        </CRow>

        <CRow>
            <CCol>
              <CFormInput
              label='Renewals'
              value={trainerObj.renewals}
              type='text'
              onChange={(e)=>{
                setTrainerObj(prev=>({...prev,renewals:e.target.value}))
            }}
              />
            </CCol>
            <CCol>
              <CFormInput
              label='Training Feed Back'
              value={trainerObj.feedBACK}
              onChange={(e)=>{
                setTrainerObj(prev=>({...prev,feedBACK:e.target.value}))
            }}
              />
            </CCol>

        </CRow>
        <CRow>
            <CCol>
              <CFormInput
              label='Behaviour'
              value={trainerObj.Behaviour}
              type='text'
              onChange={(e)=>{
                setTrainerObj(prev=>({...prev,Behaviour:e.target.value}))
            }}
              />
            </CCol>
            <CCol>
              <CFormInput
              label='Overall feedback'
              value={trainerObj.overallfeedback}
              onChange={(e)=>{
                setTrainerObj(prev=>({...prev,overallfeedback:e.target.value}))
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

export default TrainerPerformanceForm

