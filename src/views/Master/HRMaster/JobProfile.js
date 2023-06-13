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
    CFormTextarea
} from "@coreui/react";
import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';

import React, { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { MdEdit,MdDelete } from "react-icons/md";

let user = JSON.parse(localStorage.getItem('user-info'))
const username = user.user.username;
const token = user.token;

const JobProfile = () =>{

    const headers = {
        "Authorization": `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
       }

    const [showForm,setForm] = useState(true)
    const [visible, setVisible] = useState(false)
    const [result1, setResult1] = useState([]);
    const url = useSelector((el) => el.domainOfApi)
    const [updateActive,setUpdateActive] = useState(false)
    const [jobProfileData,setJobProfileData] = useState([])
    const [jobProfile,setJobProfile] = useState(
        {
            username: username,
            Designations: '',
            jobProfile:'',
        }
    )  


   

    function getDesignation() {
        axios.get(`${url}/designation/all`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                setResult1(res.data.reverse())
            })
            .catch((error) => {
                console.error(error)
            })
    }


    const getJobProfileData = ()=>{
        axios.get(`${url}/jobProfile/all`,{headers}).then((el)=>{
         if(el.status!==200){
          return 
         }
         console.log(el.data)
         setJobProfileData(el.data)
       }).catch((error)=>{console.log(error)})
       }

       useEffect(() => {
        getDesignation()
        getJobProfileData()
    }, []);


    const saveData = async (type)=>{
        let response ={}
        try{
          if(type==='Save'){
            response = await  axios.post(`${url}/jobProfile/create`,jobProfile,{headers})
          }
          if(type==='Update'){
           response = await  axios.post(`${url}/jobProfile/update/${jobProfile._id}`,jobProfile,{headers})
          }
      
         if(response?.status===200){
          setVisible(value=>!value) 
          getJobProfileData()
          alert('successfully save')
         }
          }catch(error){
            console.error(error)
          }
      }

      
      function toToggaleFrom(){
        setForm((prev=>!prev))
         setUpdateActive(false)
         setJobProfile({
            username: '',
            Designations: '',
            jobProfile:'',
          })
       }


       const updateProduct = async (item)=>{
        setForm(false)
        setJobProfile({...item})
        setUpdateActive(true)
       
      }

      function deleteEnquiry(id) {

        if (confirm('Do you want to delete this')) {
            fetch(`${url}/jobProfile/delete/${id}`, {
                method: 'DELETE',
                headers,
            }).then((result) => {
                result.json().then((resp) => {
                    console.warn(resp)
                    getJobProfileData()
                })
            })
        }
    }
    return <div>
    <CModal visible={visible} onClose={() => setVisible(false)}>
       <CModalHeader>
        <CModalTitle>Successfully Save   <CIcon icon={icon.cilCheckAlt} size="xl" color="success"/></CModalTitle>
        </CModalHeader> 
    </CModal>





      <CCard className="mb-3 border-success mt-4">
                    <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                        <CCardTitle className="mt-2">Job Profile</CCardTitle>
                    </CCardHeader>
                    <CCardBody>

                        
                    {showForm?<CCol color="primary" className="bg-body d-flex justify-content-end">
            <CButton onClick={()=>toToggaleFrom()}>Add New Payrol Setup</CButton>
    </CCol>:

    <CCard className="overflow-hidden"   >
        <CCardHeader className="p-4" style={{ backgroundColor: '#0B5345', color: 'white' }}>
                 <CCardTitle> <h4>Job Profile </h4></CCardTitle>
        </CCardHeader>
    <div className="p-4">
         <CForm>
            <CCol className="d-flex justify-content-end">
                <CButton color='danger' onClick={()=>toToggaleFrom()}>Close</CButton>
            </CCol>
             

            <CCol>
              <CCol md={6}>
              <CFormSelect
                  label='Department'
                  options={[
                    "Select Dpartment",
                    ...result1.map((el)=>el?.jobDesignation)                   
                    ]}

                  value={jobProfile.Designations}
                  onChange={(e)=>setJobProfile((prev)=>({...prev,Designations:e.target.value}))}
              />
                </CCol>   
                <CCol   md={8} >
              <CFormTextarea
                  value={jobProfile.jobProfile}
                  label='Job Profile'
                  onChange={(e)=>setJobProfile((prev)=>({...prev,jobProfile:e.target.value}))}
              />
                </CCol>    
            </CCol>

           
        
           
            
          
     
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



                        
                    <CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345" }} hover responsive>
                            <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                                <CTableRow >
                                    <CTableHeaderCell>Sr.No</CTableHeaderCell>

                                    <CTableHeaderCell>Designation</CTableHeaderCell>
                                    <CTableHeaderCell>Job Profile</CTableHeaderCell>

                                    <CTableHeaderCell>Edit/Delete </CTableHeaderCell>
                                 
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                        {jobProfileData.map((el,i) => (
                            <CTableRow className="text-center">
                                <CTableDataCell>
                                    {i+1}
                                </CTableDataCell>
                                <CTableDataCell>
                                    {el.Designations}
                                </CTableDataCell>
                                <CTableDataCell>
                                    {el.jobProfile}
                                </CTableDataCell>
                                <CTableDataCell>
                                      <MdEdit style={{cursor:'pointer'}} onClick={()=>updateProduct(el)} />
                                      <MdDelete style={{cursor:'pointer'}} onClick={()=> deleteEnquiry(el._id)}/>       
                                </CTableDataCell>
                               
                            </CTableRow>

                                ))}
                              
                          
                            </CTableBody>
                        </CTable>
                    </CCardBody>
                </CCard>
      </div>
}

export default JobProfile;