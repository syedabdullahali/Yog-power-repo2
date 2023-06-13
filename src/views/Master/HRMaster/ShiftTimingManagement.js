import { CCard,CTable,CTableHead,CTableHeaderCell,CTableRow
    ,CTableBody,CTableDataCell,CCol,CRow,CButton,CForm,
    CCardHeader,CCardTitle,CFormInput,CCallout,CModal,
    CModalHeader,CModalTitle,CCardBody
 } from "@coreui/react"

 import React,{useEffect, useState} from 'react'
 import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import { useSelector } from "react-redux";
import axios from 'axios'
import { MdEdit,MdDelete } from "react-icons/md";

function ShiftTimingManagment (){

  let user = JSON.parse(localStorage.getItem('user-info'))
  console.log(user);
  const token = user.token;
  const username = user.user.username;
  const centerCode = user.user.centerCode;
  const url = useSelector((el) => el.domainOfApi)


    const [showForm,setForm] = useState(true)
    const [visible, setVisible] = useState(false)
    const [shiftTimeingData,setShitTimeingData] = useState([])
    const [updateActive,setUpdateActive] = useState(false)
    const [shiftTimeing,setShiftTiming] = useState({
     shiftName:'',
     startTime:'',
     endTime:'',
     username:username,
     centercode:centerCode
    })


   
   const headers = {
    "Authorization": `Bearer ${token}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
   }

   

  
  const getShitTimeData = ()=>{
   axios.get(`${url}/shiftTimeSchedule/all`,{headers}).then((el)=>{
    console.log(el.data)
    if(!el.data){
     return 
    }
    setShitTimeingData(el.data)
  }).catch((error)=>{console.log(error)})
  }

  const saveData = async (type)=>{
    let response ={}
    try{
      if(type==='Save'){
        response = await  axios.post(`${url}/shiftTimeSchedule/create`,shiftTimeing,{headers})
      }
      if(type==='Update'){
       response = await  axios.post(`${url}/shiftTimeSchedule/update/${shiftTimeing._id}`,shiftTimeing,{headers})
      }
  
     if(response?.status===200){
      getShitTimeData()
      alert('successfully save')
     }
      }catch(error){
        console.error(error)
      }
  }


  useEffect(()=>{
    getShitTimeData()
  },[])

  function toToggaleFrom(){
   setForm((prev=>!prev))
    setUpdateActive(false)
    setShiftTiming({
      shiftName:'',
      startTime:'',
      endTime:'',
      username:username,
      centercode:centerCode
     })
  }
  

  const updateProduct = async (item)=>{
    setForm(false)
    setShiftTiming({...item})
    setUpdateActive(true)
   
  }


  function formatTime(timeString) {
    if(!timeString){
     return 
    }
    const [hourString, minute] = timeString.split(":");
    const hour = +hourString % 24;
    return (hour % 12 || 12) + ":" + minute + (hour < 12 ? "AM" : "PM");
}


const toDeleteData= async (id)=>{
  if(!confirm('Do u want to delete this')){
  return
  }
  
  const response = await  axios.delete(`${url}/shiftTimeSchedule/delete/${id}`, {headers})
  if(response.status===200){
     getShitTimeData()
  }
  
  }

    return  <> 
 <CModal visible={visible} onClose={() => setVisible(false)}>
       <CModalHeader>
        <CModalTitle>Successfully Save   <CIcon icon={icon.cilCheckAlt} size="xl" color="success"/></CModalTitle>
        </CModalHeader> 
</CModal>




<CCard >
<CCardHeader style={{ backgroundColor: "#0B5345", color: "white" }} className='p-3'>
        <CCardTitle><h4>Shift Timing </h4></CCardTitle>
</CCardHeader>

<CCardBody>
                <CCol className='my-3 text-end'>
                   {showForm&&<CButton onClick={()=>toToggaleFrom()}>Add New </CButton>}
                   {showForm||<CCard className="overflow-hidden my-4 text-start"   >
        <CCardHeader className="p-4" style={{ backgroundColor: '#0B5345', color: 'white' }}>
                 <CCardTitle> <h5>Shift Timing Form</h5></CCardTitle>
        </CCardHeader>
    <div className="p-4">
         <CForm>
            <CCol className="d-flex justify-content-end">
                <CButton color='danger' onClick={()=>toToggaleFrom()}>Close</CButton>
            </CCol>
            <CRow>
              <CCol md={6}>
                <CFormInput
                  type="text"
                  placeholder="Enter Shift Name"
                  label='Shift Name'
                  value={shiftTimeing.shiftName}
                  onChange={(e)=>setShiftTiming(prev=>({...prev,shiftName:e.target.value}))}
                />
              </CCol>
              <CCol md={6}>
                <CFormInput
                  type="time"
                  label='Start Time'
                  value={shiftTimeing.startTime}
                  onChange={(e)=>setShiftTiming(prev=>({...prev,startTime:e.target.value}))}
                />
              </CCol>
            </CRow> 
            <CRow >
              <CCol md={6}>
              <CFormInput
                  type="time"
                  label='End Time'
                  value={shiftTimeing.endTime}
                  onChange={(e)=>setShiftTiming(prev=>({...prev,endTime:e.target.value}))}
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
    <CCol style={{ backgroundColor: '#0B5345'}} className='p-1'>

    </CCol>
      </CCard>}

                </CCol>
<CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345" }} hover responsive>
                            <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                                <CTableRow >
                                    <CTableHeaderCell>Sr.No</CTableHeaderCell>
                                    <CTableHeaderCell>Shift Name</CTableHeaderCell>
                                    <CTableHeaderCell>In Time</CTableHeaderCell>
                                    <CTableHeaderCell>Out Time</CTableHeaderCell>
                                    <CTableHeaderCell>Edit/Delete</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                              {shiftTimeingData.map((el,i)=>
                              
                              <CTableRow className="text-center">
                                    <CTableDataCell>
                                         {i+1}
                                    </CTableDataCell>
                                    <CTableDataCell>
                                      {el.shiftName}
                                    </CTableDataCell>
                                    <CTableDataCell>                                    
                                      { formatTime(el.startTime)} 
                                    </CTableDataCell>
                                    <CTableDataCell>             
                                    { formatTime(el.endTime)} 
                                    </CTableDataCell>
                               

                                    <CTableDataCell>
                                      <MdEdit style={{cursor:'pointer'}} onClick={()=>updateProduct(el)} />
                                      <MdDelete style={{cursor:'pointer'}} onClick={()=>toDeleteData(el._id)}/>                                       
                                    </CTableDataCell>
                                                               
                                </CTableRow>
                              
                              )}
                                
                               
                            </CTableBody>
</CTable>
</CCardBody>

</CCard>
</>

}



export default ShiftTimingManagment