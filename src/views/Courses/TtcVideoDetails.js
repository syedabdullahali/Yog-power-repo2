import {
    CTable,
    CTableHead,
    CTableRow,
    CTableHeaderCell,
    CTableBody,
    CTableDataCell,
    CCard,
    CCardHeader,
    CCardTitle,
    CCardBody,
    CFormInput,
    CCol,
    CButton,
    CForm,
    CRow,
    CPagination,
    CPaginationItem
} from '@coreui/react'

import { useSelector } from 'react-redux';
import { useState,useEffect} from 'react';
import axios from 'axios';
import { MdDelete } from 'react-icons/md';

let user = JSON.parse(localStorage.getItem('user-info'))
const token = user.token;
const username = user.user.username;
const centerCode = user.user.centerCode;

const headers = {
    "Authorization": `Bearer ${token}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

function TtcVideoDetails(){

    let num =0

    const url = useSelector((el) => el.domainOfApi)

    const obj={
        courseName:'',
        formalOfVideos:'',
        sessionNo:'',
        videoLink:'',  
    }

    const [showForm,setForm] = useState(true)
    const [ttcVideoDetails,setVideoDetails] = useState({...obj})
    const [updateActive,setUpdateActive] = useState('')
    const [ttcVideoData,setTTCVideoData] = useState([])
    const [pagination, setPagination] = useState(5)


    const getVideoDetails  = () =>{
        axios.get(`${url}/ttcVideo/all`,{headers})
            .then((res) => { 
                if(res.status===200){
                    console.log(res.data)
                  setTTCVideoData(res.data.reverse())
                }
            })
            .catch((error) => {
                console.error(error)
            })

    }

    const saveData = async (type)=>{
           let response ={}
           try{
             if(type==='Save'){
               response = await  axios.post(`${url}/ttcVideo/create`,ttcVideoDetails,{headers})
             }
       
            if(response?.status===200){
             alert('successfully save')
             getVideoDetails()
            }
             }catch(error){
               console.error(error)
             }
         }

    useEffect(()=>{
     getVideoDetails()
    },[])


    function deleteCr(id) {
        if (confirm('Do you want to delete this')) {
    
            fetch(`${url}/ttcVideo/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then((result) => {
                result.json().then((resp) => {
                    getVideoDetails()          
                })
            })
        }
      }


    return<CCard className=''>
    <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }} className='mb-4'>
                           <CCardTitle className="mt-2">TTC Videos </CCardTitle>
    </CCardHeader>

     <CCardBody>

     {showForm?<CCol className="bg-body d-flex justify-content-end">
            <CButton onClick={()=>setForm((value)=>!value)}>Add New</CButton>
    </CCol>:
    <CCard>
        <CCardHeader className="p-3" style={{ backgroundColor: '#0B5345', color: 'white' }}>
                 <CCardTitle> <h5>Certificate Form</h5></CCardTitle>
        </CCardHeader>
    <div >
         <CForm className='p-4'>
            <CRow>
                <CCol className="text-end p-2">
                    <CButton color="danger" onClick={()=>{
                        setForm(true)
                        setVideoDetails({...obj})
                    }}>Close</CButton>
                </CCol>
            </CRow>
            <CRow>
              <CCol lg={6} md={6} sm={12}>
                <CFormInput
                  label='Course Name'
                  type='text'
                  value={ttcVideoDetails.courseName}
                  onChange={(e)=>setVideoDetails((prev)=>({...prev,courseName:e.target.value}))}
                />
              </CCol>
              <CCol lg={6} md={6} sm={12}>
                <CFormInput
                  label='Formal of Videos'
                  type='text'
                  value={ttcVideoDetails.formalOfVideos}
                  onChange={(e)=>setVideoDetails((prev)=>({...prev,formalOfVideos:e.target.value}))}
                />
              </CCol>
             </CRow>
             <CRow>
             <CCol lg={6} md={6} sm={12}>
                <CFormInput
                  label='Session No'
                  type='text'
                  value={ttcVideoDetails.sessionNo}
                  onChange={(e)=>setVideoDetails((prev)=>({...prev,sessionNo:e.target.value}))}
                />
              </CCol> 
              <CCol lg={6} md={6} sm={12}>
                <CFormInput
                  label='Video Link'
                  type='text'
                  value={ttcVideoDetails.videoLink}
                  onChange={(e)=>setVideoDetails((prev)=>({...prev,videoLink:e.target.value}))}
                />
              </CCol> 
             </CRow>
         </CForm>
    </div>
    <CCol  className='pb-4 text-end px-4'>
          <CButton onClick={()=>saveData('Save')}>Save</CButton>
    </CCol>
      </CCard>}

    <CTable className='m-3 p-2' align="middle" bordered style={{ borderColor: "#0B5345"}} hover responsive>
      <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }}>
          <CTableRow>
           <CTableHeaderCell>Sr No</CTableHeaderCell>    
           <CTableHeaderCell>Course Name</CTableHeaderCell>    
           <CTableHeaderCell>Formal of Videos</CTableHeaderCell>    
           <CTableHeaderCell>Session No</CTableHeaderCell>    
           <CTableHeaderCell>Video Link</CTableHeaderCell> 
           <CTableHeaderCell>Delete</CTableHeaderCell>    
          </CTableRow>
      </CTableHead>

      <CTableBody>
       {ttcVideoData.filter((el, i) => {  num++
if (pagination - 5 < i + 1 && pagination >= i + 1) {return el}}).map((el,i)=>{
        return <CTableRow className='text-center'>
        <CTableDataCell>{i+1+ pagination - 5}</CTableDataCell>
        <CTableDataCell>{el.courseName}</CTableDataCell>
        <CTableDataCell>{el.formalOfVideos}</CTableDataCell>
        <CTableDataCell>{el.sessionNo}</CTableDataCell>
        <CTableDataCell style={{width:'300px'}} ><a target='_blank' href={el.videoLink}>{el.videoLink}</a></CTableDataCell>
        <CTableDataCell>
            <MdDelete style={{cursor:'pointer'}} onClick={()=>deleteCr(el._id)}/>
        </CTableDataCell>
       </CTableRow>   
       })}
      </CTableBody>
    </CTable>
    </CCardBody>

   
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



export default TtcVideoDetails


