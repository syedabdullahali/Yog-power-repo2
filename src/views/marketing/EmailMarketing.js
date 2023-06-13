import { CButton, CCard, CCardBody,
     CCardHeader, CCardTitle, CCol, CForm,
      CFormInput, CFormSelect,
       CFormTextarea, CRow } from '@coreui/react'
import React, { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import axios from 'axios';


let user = JSON.parse(localStorage.getItem('user-info'))
const token = user.token;

const headers = {
    "Authorization": `Bearer ${token}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

console.log(token)

const EmailMarketing = () => {
    const url = useSelector((el) => el.domainOfApi)
    const [typeOfClientData,setTypeOfClientData] = useState([])
    const [slectedClient,setSelectedClient] = useState('')
    const [emailMarketingData,setEmailMarketingData] =useState([])
    const [emailObj,setEmailObj] = useState({
        client:'',
        subject:'',
        message:'',
    })


    const getEmailMarhetingInput = async  ()=>{
        try{
            let response = await  axios.get(`${url}/marketingEM/all`,{headers})
             if(response.status===200){
                console.log(response.data)
                setEmailMarketingData(response.data)
                setTypeOfClientData(response?.data?.selectInput)
             }
         }catch(error){
          console.error(error)
         }
    }


    useEffect(()=>{
getEmailMarhetingInput()
    },[])
const sendEmail = async ()=>{
let email  = []
if(!slectedClient.trim()){
return
}

const parentKey = slectedClient.split(' ')[0]
const childKey = slectedClient.split(' ')[1]
if(childKey==='no'){
email = emailMarketingData[parentKey].map((el)=>el.email)
}else{
email = emailMarketingData[parentKey].filter((el)=>el[childKey]).map((el)=>el.email) 
}

try{
let  emailStr = email.join(',')
const response = 
await  axios.post(`${url}/sendMultipalMail/mail`,{...emailObj,client:emailStr},{headers})

 if(response?.status===200){
    console.log(response)
    alert('successfully save')
   }
}catch(error){
console.log(error)
}



}





    return (
        <CCard>
            <CCardHeader>
                <CCardTitle>Email Marketing</CCardTitle>
            </CCardHeader>
            <CCardBody>
                <CForm>
                    <CRow>
                        <CCol lg={6} md={6} sm={12}>
                            <CFormSelect
                                className="mb-1"
                                aria-label="Select Currency"
                                label="Email Template"
                                options={[
                                    "Select Email Template",
                                    { label: "yogpower@gmail.com", value: "yogpower@gmail.com" },
                                ]}
                            />
                        </CCol>

                        <CCol lg={6} md={6} sm={12}>
                            <CFormInput
                                className="mb-1"
                                type="text"
                                label="Subject"
                                placeholder="Enter Subject"
                                value={emailObj.subject}
                                onChange={(e)=>setEmailObj(prev=>({...prev,subject:e.target.value}))}
                            />
                        </CCol>
                        <CCol lg={12} md={12} sm={12}>
                            <CFormSelect
                                className="mb-1"
                                label="Client"
                                value={slectedClient}
                                onChange={(e)=>{setSelectedClient(e.target.value)}}
                            >
                                <option value={''}>Select type of Client</option>
                            {typeOfClientData.map((el)=>
                               <option value={`${el.value.parent} ${el.value.child}`}>{el.label}</option>
                            )}

                            </CFormSelect>
                        </CCol>
                        <CCol xs={12}>
                            <CFormTextarea
                                label="Message"
                                rows="2"
                                text="Must be 8-20 words long."
                                value={emailObj.message}
                                onChange={(e)=>setEmailObj(prev=>({...prev,message:e.target.value}))}
                            ></CFormTextarea>
                        </CCol>
                    </CRow>
                    <CButton className='mt-2' onClick={()=>sendEmail()} >Send</CButton>
                </CForm>
            </CCardBody>
        </CCard>
    )
}

export default EmailMarketing
