import { CCard,CTable,CTableHead,CTableHeaderCell,CTableRow
    ,CTableBody,CTableDataCell,CCol,CRow,CButton,CForm,
    CCardHeader,CCardTitle,CFormInput,CCallout,CModal,
    CModalHeader,CModalTitle,CCardBody, CFormSelect
 } from "@coreui/react"

 import React,{useEffect, useState,useRef} from 'react'
 import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import { useSelector } from "react-redux";
import axios from 'axios'
import { MdEdit,MdDelete } from "react-icons/md";
import { useReactToPrint } from "react-to-print";

import { storage } from "src/firebase";
import {getDownloadURL, ref,uploadBytesResumable } from "firebase/storage";

function Centerpartners (){

  let user = JSON.parse(localStorage.getItem('user-info'))
  console.log(user);
  const token = user.token;
  const username = user.user.username;
  const centerCode = user.user.centerCode;
  const url = useSelector((el) => el.domainOfApi)


const componentRef = useRef()

const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'yog-power',
    onAfterPrint: () => alert('print success')
})


    const [showForm,setForm] = useState(true)
    const [visible, setVisible] = useState(false)
    const [centerPartnerData,setCenterPartnerData] = useState([])
    const [updateActive,setUpdateActive] = useState(false)
    const [imgPrograss,setImgPrograss] = useState(0)
    const [centerPartnersObj,setCenterPartnersObj] = useState(
      {
        profileLogo: '',
        centerName: '',
        centerCode: '',
        partnerName: '',
        contact: 0,
        typeOfPartner: '',
        location: '',
        city: '',
        country: '',
        startDate: new Date(),
        expDate: new Date(),
        packege: ''
      }
    )


   
   const headers = {
    "Authorization": `Bearer ${token}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
   }

   

  
  const getCenterPartner = ()=>{
   axios.get(`${url}/center-partner/all`,{headers}).then((el)=>{
    console.log(el.data)
    if(!el.data){
     return 
    }
    setCenterPartnerData(el.data)
  }).catch((error)=>{console.log(error)})
  }

  const saveData = async (type)=>{
    let response ={}
    console.log(centerPartnersObj)
    try{
      if(type==='Save'){
        response = await  axios.post(`${url}/center-partner/create`,centerPartnersObj,{headers})
      }
      if(type==='Update'){
       response = await  axios.post(`${url}/center-partner/update/${centerPartnersObj._id}`,centerPartnersObj,{headers})
      }
  
     if(response?.status===200){
      getCenterPartner()
      alert('successfully save')
     }
      }catch(error){
        console.error(error)
      }
  }


  useEffect(()=>{
    getCenterPartner()
  },[])

  function toToggaleFrom(){
   setForm((prev=>!prev))
    setUpdateActive(false)
    setCenterPartnersObj({
      profileLogo: '',
      centerName: '',
      centerCode: '',
      partnerName: '',
      contact: 0,
      typeOfPartner: '',
      location: '',
      city: '',
      country: '',
      startDate: new Date(),
      expDate: new Date(),
      packege: ''
    })
  }
  

  const handleChange = event => {
    const fileUploaded = event.target.files[0];
    const file = event.target.files[0]

     
        const uploadImage = (file)=>{
          if(!fileUploaded)return
         const storageRef =   ref(storage,`center-partner-logo/${fileUploaded.name}`)
         const uploadTask = uploadBytesResumable(storageRef,fileUploaded)
  
         uploadTask.on("state_changed",(snapshot)=>{
          const prog = Math.round((snapshot.bytesTransferred/snapshot.totalBytes) *100)
          setImgPrograss(prog)
  
         },(error)=>{
          console.log(error)
         },
         ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then((url)=>{
            setCenterPartnersObj((prev)=>({...prev,profileLogo:url}))
          })
         }
         )
        }
        uploadImage(file)
  };  


  const toDeleteData= async (id)=>{
    if(!confirm('Do u want to delete this')){
    return
    }
    
    const response = await  axios.delete(`${url}/center-partner/delete/${id}`, {headers})
    if(response.status===200){
      getCenterPartner()
    }
    
    }


    const updateProduct = async (item)=>{
      setForm(false)
      setCenterPartnersObj({...item})
      setUpdateActive(true)
     
    }

    return  <> 
 <CModal visible={visible} onClose={() => setVisible(false)}>
       <CModalHeader>
        <CModalTitle>Successfully Save   <CIcon icon={icon.cilCheckAlt} size="xl" color="success"/></CModalTitle>
        </CModalHeader> 
</CModal>




<CCard >
<CCardHeader style={{ backgroundColor: "#0B5345", color: "white" }} className='p-3'>
        <CCardTitle><h4>Center Partners </h4></CCardTitle>
</CCardHeader>

<CCardBody>
                <CCol className='my-3 text-end'>
                   {showForm&&<CButton onClick={()=>toToggaleFrom()}>Add New </CButton>}
                   {showForm||<CCard className="overflow-hidden my-4 text-start"   >
        <CCardHeader className="p-4" style={{ backgroundColor: '#0B5345', color: 'white' }}>
                 <CCardTitle> <h5>Center Partners</h5></CCardTitle>
        </CCardHeader>
    <div className="p-4">
         <CForm>
            <CCol className="d-flex justify-content-end">
                <CButton color='danger' onClick={()=>toToggaleFrom()}>Close</CButton>
            </CCol>
            <CRow>
              <CCol md={4}>
                <CFormInput
                  type="file"
                  placeholder="Enter Shift Name"
                  label={`Upload Logo ${imgPrograss}%`}
                  onChange={(e)=>handleChange(e)}
                />
              </CCol>
              <CCol md={4}>
                <CFormInput
                  type="text"
                  label='Center Name'
                  value={centerPartnersObj.centerName}
                  onChange={(e)=>setCenterPartnersObj((prev)=>({...prev,centerName:e.target.value}))}
                />
              </CCol>
              <CCol md={4}>
              <CFormInput
                  type="text"
                  label='Center Code'
                  value={centerPartnersObj.centerCode}
                  onChange={(e)=>setCenterPartnersObj((prev)=>({...prev,centerCode:e.target.value}))}
              
                />
             
              </CCol>
            </CRow> 
            <CRow >
            <CCol md={4} className="mt-2">
              <CFormInput
                  type="text"
                  label='Partner Name'
                  value={centerPartnersObj.partnerName}
                  onChange={(e)=>setCenterPartnersObj((prev)=>({...prev,partnerName:e.target.value}))}
              
                />
              </CCol>
              <CCol md={4} className="mt-2">
              <CFormInput
                  type="number"
                  label='Contact'
                  value={centerPartnersObj.contact}
                  onChange={(e)=>setCenterPartnersObj((prev)=>({...prev,contact:e.target.value}))}
              
                />
              </CCol>

              <CCol md={4} className="mt-2">
              <CFormSelect
                  type="text"
                  label='Partner type'
                  value={centerPartnersObj.typeOfPartner}
                  onChange={(e)=>setCenterPartnersObj((prev)=>({...prev,typeOfPartner:e.target.value}))}             
                >
                  <option value=''>Select Type Of Partner</option>
                  <option>Franchise Partner </option>
                  <option>Softwere Partner</option>

                  
                </CFormSelect>
              </CCol>
              

            </CRow>    

        <CRow >
            
              <CCol md={4} className="mt-2">
              <CFormInput
                  type="text"
                  label='Location'
                  value={centerPartnersObj.location}
                  onChange={(e)=>setCenterPartnersObj((prev)=>({...prev,location:e.target.value}))}   
                />
              </CCol>
              <CCol md={4} className="mt-2">
              <CFormInput
                  type="text"
                  label='City'
                  value={centerPartnersObj.city}
                  onChange={(e)=>setCenterPartnersObj((prev)=>({...prev,city:e.target.value}))}                 
                />
              </CCol>

              <CCol md={4} className="mt-2">
              <CFormInput
                  type="text"
                  label='Country'
                  value={centerPartnersObj.country}
                  onChange={(e)=>setCenterPartnersObj((prev)=>({...prev,country:e.target.value}))}    
                />
              </CCol>
        </CRow>    

        <CRow >
              <CCol md={4} className="mt-2">
              <CFormInput
                  type="date"
                  label='Start Date'
                  value={centerPartnersObj.startDate}
                  onChange={(e)=>setCenterPartnersObj((prev)=>({...prev,startDate:e.target.value}))}   
                />
              </CCol>
              <CCol md={4} className="mt-2">
              <CFormInput
                  type="date"
                  label='EXP. Date'
                  value={centerPartnersObj.expDate}
                  onChange={(e)=>setCenterPartnersObj((prev)=>({...prev,expDate:e.target.value}))}   
                />
              </CCol>
              <CCol md={4} className="mt-2">
              <CFormInput
                  type="text"
                  label='Packege'
                  value={centerPartnersObj.packege}
                  onChange={(e)=>setCenterPartnersObj((prev)=>({...prev,packege:e.target.value}))}   
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
                                    <CTableHeaderCell>Profile Logo</CTableHeaderCell>
                                    <CTableHeaderCell>Center Name</CTableHeaderCell>
                                    <CTableHeaderCell>Center Code</CTableHeaderCell>
                                    <CTableHeaderCell>Partner Name</CTableHeaderCell>
                                    <CTableHeaderCell>Contact </CTableHeaderCell>
                                    <CTableHeaderCell>Franchise Partner </CTableHeaderCell>
                                    <CTableHeaderCell>Softwere Partner</CTableHeaderCell>
                                    <CTableHeaderCell>Location</CTableHeaderCell>
                                    <CTableHeaderCell>City</CTableHeaderCell>
                                    <CTableHeaderCell>Country</CTableHeaderCell>
                                    <CTableHeaderCell>Start Date</CTableHeaderCell>
                                    <CTableHeaderCell>EXP. Date</CTableHeaderCell>
                                    <CTableHeaderCell>Packege</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>  

          
                              {centerPartnerData.map((el,i)=>
                              
                              <CTableRow className="text-center">
                              <CTableDataCell>
                                {i+1}
                              </CTableDataCell>
                              <CTableDataCell >
                                <div 
                                className="border-gray rounded-circle border border-secondary"
                                style={{width:'100px',height:'100px',overflow:'hidden'}}
                                >

                                  <img
                                  width='100%'
                                  height='100%'
                                  src={el.profileLogo}
                                  />

                                </div>
                              </CTableDataCell>
                              <CTableDataCell>   
                                {el.centerName}                                 
                              </CTableDataCell>
                              <CTableDataCell>  
                                {el.centerCode}           
                              </CTableDataCell>
                              <CTableDataCell>  
                                {el.partnerName}                                                                      
                              </CTableDataCell>   
                              <CTableDataCell>   
                                {el.contact}          
                              </CTableDataCell>
                              <CTableDataCell>     
                                {el.typeOfPartner}                                                                   
                              </CTableDataCell> 
                              <CTableDataCell>     
                                {el.location}        
                              </CTableDataCell>
                              <CTableDataCell>   
                                {el.city}                                                                     
                              </CTableDataCell>  
                              <CTableDataCell>   
                                {el.country}          
                              </CTableDataCell>
                              <CTableDataCell>  
                                {new Date(el.startDate).toDateString()}                                                                      
                              </CTableDataCell> 
                              <CTableDataCell>    
                                 {new Date(el.expDate).toDateString()}                                                                               
                              </CTableDataCell>
                              <CTableDataCell>    
                                {el.packege}                                                                    
                              </CTableDataCell>                                                
                              <CTableDataCell>     
                                <MdEdit onClick={()=>updateProduct(el)} className="me-1"/>
                                <MdDelete onClick={()=>toDeleteData(el._id)}/>                                                                   
                              </CTableDataCell>  
                          </CTableRow>
                              
                              )}                            
                        
                            </CTableBody>
</CTable>
</CCardBody>

</CCard>
</>

}



export default Centerpartners