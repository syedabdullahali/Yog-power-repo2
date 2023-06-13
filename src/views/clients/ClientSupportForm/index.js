import { CCard,CCol,CRow,CButton,CForm,
    CCardHeader,CCardTitle,CFormInput,CCallout,CModal,
 } from "@coreui/react"

import {useEffect, useState} from'react'
import axios from "axios"
import { useSelector } from 'react-redux'
import CustomSelectInput from "src/views/Fitness/CustomSelectInput/CustomSelectInput"

let user = JSON.parse(localStorage.getItem('user-info'))
const token = user.token;

function ClientSupportForm (){


  const [clinetName,setClientName] = useState('')
  const [number,setNumber] = useState('')
  const [typeOfRequest,setTypeOfRequest] = useState('')
  const [date,setDate]= useState('')
  const [requestDetail,setRequestDetail] = useState('')
  const [medium,setMedium ] = useState('')
  const [errorMessage,setErrorMessage] = useState('')
  const [clientReferance,setClientReferance] = useState('')
  const [clientData,setClientData] = useState([])
  const [memBerId,setMemBerId] = useState('')

  const url1 = useSelector((el)=>el.domainOfApi)


  const validation =  clientReferance.trim()!=='' && number.trim()!=='' && typeOfRequest.trim()!=='' && date.trim()!==''
   && requestDetail.trim()!=='' && medium.trim()!==''

   const obj = {
    Sr_No:' ',
    Client_Name:clientReferance,
    Regular_Mobile_No:number,
    Type_Of_Request:typeOfRequest,
    Request_Date:date,
    Request_Details:requestDetail,
    Status:true,
    Medium:medium,
    Delete:' ',
    memBerId
  }

  const saveData = async  ()=>{
 if(!validation){
  setErrorMessage("Please Fill Al details")
  return 
 }

 axios.post(`${url1}/clientSupport`,obj,{ headers: {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
}}).then((res)=>{
alert('Successfully save')
})

  }

 

  function getClientData() {
    axios.get(`${url1}/memberForm/all`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then((res) => {
            
            setClientData(res.data)
        })
        .catch((error) => {
            console.error(error)
        })
}


useEffect(()=>{
getClientData()
},[])


function clientObj(obj){
  setMemBerId(obj._id)
  setClientReferance(obj.Fullname)    
}


return <CCard   >
    <CCardHeader className="p-4" style={{ backgroundColor: '#0B5345', color: 'white' }}>
             <CCardTitle> <h4>Client Support Form</h4></CCardTitle>
    </CCardHeader>
<div className="p-4">
     <CForm>
       
        <CRow>
          <CCol md={6}>
                                  <label className="mb-2">Select Referal Client</label>
                                    <CustomSelectInput data={clientData} 
                                    title={clientReferance?.trim()?
                                     clientReferance:"Select client name"}
                                     getData={clientObj}/>
          </CCol>
          <CCol md={6}>
            <CFormInput
              type="number"
              label='Reg Mobile '
              placeholder="Enter Mobile  No"
              value={number}
              onChange={(e)=>setNumber(e.target.value)}
            />
          </CCol>
        </CRow> 
        <CRow >
          <CCol md={6}>
          <CFormInput
              type="text"
              label='Type of Request'
              placeholder="Enter Type of Request"
              value={typeOfRequest}
              onChange={(e)=>setTypeOfRequest(e.target.value)}
            />
         
          </CCol>
          <CCol md={6}>
            <CFormInput
              type="date"
              label='Request Date'
              value={date}
              onChange={(e)=>setDate(e.target.value)}              
            />
          </CCol>
        </CRow>    

        <CRow>
        
          <CCol md={6}>
            <CFormInput
              type="text"
              label='Request details'
              placeholder="Enter Request details"
              value={requestDetail}
              onChange={(e)=>setRequestDetail(e.target.value)}
            />
          </CCol>
        <CCol md={6}>
        <CFormInput
              type="text"
              label='Requiest By'
              placeholder="Enter Requiest"
              value={medium}
              onChange={(e)=>setMedium(e.target.value)}
            />
        </CCol>
        </CRow> 
        {errorMessage&&<CCol className="p-2"><p style={{fontSize:'15px',color:'red'}}>{errorMessage}</p></CCol>}     
      <CButton color="primary mt-2 px-4" onClick={()=>saveData()} >Save</CButton>
     </CForm>
</div>

  </CCard>


}


export default ClientSupportForm