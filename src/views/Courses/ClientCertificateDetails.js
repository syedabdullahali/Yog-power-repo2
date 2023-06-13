import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCardTitle,
    CCol,
    CForm,
    CFormCheck,
    CFormInput,
    CListGroup,
    CListGroupItem,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CModal,
    CModalHeader,CModalTitle,CModalBody,CModalFooter,
    CPagination,
    CPaginationItem,
    CFormSelect,
} from "@coreui/react";

import { getDownloadURL, ref,  uploadBytesResumable,deleteObject } from 'firebase/storage'
import { storage } from 'src/firebase'


import { MdDelete, MdEdit} from 'react-icons/md';
let user = JSON.parse(localStorage.getItem('user-info'))
const token = user.token;
const username = user.user.username;
const centerCode = user.user.centerCode;
import { useSelector } from 'react-redux';
import axios from 'axios' 
import { useState,useEffect} from 'react';
import CustomSelectInput from '../Fitness/CustomSelectInput/CustomSelectInput';
import moment from 'moment/moment';
import { Link } from "react-router-dom";


const headers = {
    "Authorization": `Bearer ${token}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
   }

function ClientCertificateDetails(){

  let num =0
  const monthName =     ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const [pagination, setPagination] = useState(5)


    const obj = {
        username:username,
        name:"",
        contactNo:"",
        emailID:"",
        MemberId:"",
        course:"",
        service:"",
        joiningDate:"",
        books:"",
        prractical:"",
        viva:"",
        project:"",
        videos:"",
        theory:"",
        exam:"",
        result:"",
        certification:"",
        grade:"",
        certificationNum:"",
        fileName:'',
        visit:""	
      }
    const [showForm,setForm] = useState(true)
    const [certificateDetails,setCertificateDetails] = useState({...obj})
    const [clientData,setClientData] = useState([])
    const [clientCertificateData,setClientCertificateData] = useState([])
    const [error,setError] = useState(false)
    const [updateActive,setUpdateActive] = useState('')
    const [uploadingDocProgress,setUploadingDocProgRess] = useState(0)
    const [visi1, setVisi1]= useState(false)
    const [docurl,setDocUrl]= useState({visit:'',fileName:''})
    const [filterObj,setFilterObj] = useState({
      clientName:'',
      year:'',
      month:'',
    })

    const url = useSelector((el) => el.domainOfApi)

     function clientObj(obj){
       setCertificateDetails(prev=>({...prev,MemberId:obj?._id}))
       setCertificateDetails(prev=>({...prev,name:obj?.Fullname}))
       setCertificateDetails((prev)=>({...prev,contactNo:obj?.ContactNumber+""}))
       setCertificateDetails((prev)=>({...prev,emailID:obj?.Email}))
       setCertificateDetails((prev)=>({...prev,course:obj?.serviceName}))
       setCertificateDetails((prev)=>({...prev,service:obj?.typeOFBatchClasses}))
       setCertificateDetails((prev)=>({...prev,joiningDate:moment(obj?.createdAt).utc().format('YYYY-MM-DD')}))
     }





     function clientCertificateDetail() {
        axios.get(`${url}/tcClientCertificate/all`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => { 
                console.log(res.data)
                if(res.status===200){
                    setClientCertificateData(res.data.reverse())
                }
            })
            .catch((error) => {
                console.error(error)
            })
    }
    function getClientData() {
        axios.get(`${url}/memberForm/classes/TTC Classes`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => { 
                setClientData(res.data.reverse())
            })
            .catch((error) => {
                console.error(error)
            })
    }

    useEffect(()=>{
      getClientData()
      clientCertificateDetail()
    },[])

   const validation =    certificateDetails.name.trim() &&
                         certificateDetails.contactNo.trim()&&
                         certificateDetails.emailID.trim()&&
                        certificateDetails.joiningDate.trim()&&
                        certificateDetails.course.trim()&&
                        certificateDetails.service.trim()


useEffect(()=>{
 if(validation){
  setError(false)
 }
},[validation])


   const saveData = async (type)=>{
 if(!validation){
    setError(true)
  return 
 }
    
    let response ={}
    try{
      if(type==='Save'){
        response = await  axios.post(`${url}/tcClientCertificate/create`,certificateDetails,{headers})
      }
      if(type==='Update'){
       response = await  axios.post(`${url}/tcClientCertificate/update/${updateActive}`,certificateDetails,{headers})
      }

     if(response?.status===200){
      alert('successfully save')
      clientCertificateDetail()
      setForm(true)
      setCertificateDetails({...obj})
      setUpdateActive('')
     }
      }catch(error){
        console.error(error)
      }
  }
  

  function deleteCr(el) {
    if (confirm('Do you want to delete this')) {

        const desertRef = ref(storage, `certificate/${el.fileName}`);
        deleteObject(desertRef).then((el) => {
            console.log(el,"File deleted successfully")
        }).catch((error) => {
            console.log(error)
        });



        fetch(`${url}/tcClientCertificate/delete/${el._id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((result) => {
            result.json().then((resp) => {
                clientCertificateDetail()
                
            })
        })
    }
  }

 function updateTheValue(el){
    setUpdateActive(el._id)
    setForm(false)
    setCertificateDetails({
        username:el.username,
        name:el.name,
        contactNo:el.contactNo,
        emailID:el.emailID,
        MemberId:el.MemberId,
        course:el.course,
        service:el.service,
        joiningDate:el.joiningDate,
        books:el.books,
        prractical:el.prractical,
        viva:el.viva,
        project:el.project,
        videos:el.videos,
        theory:el.theory,
        exam:el.exam,
        result:el.result,
        certification:el.certification,
        grade:el.grade,
        certificationNum:el.certificationNum,
        fileName:el.filName,
        visit:el.visit	
    })
 }




 const HandaleResumeInputChange = event => {
        const file = event.target.files[0] 

        setCertificateDetails(prev=>({...prev,fileName:file.name}))
        const uploadResume = (file)=>{
          if(!file)return
         const storageRef =   ref(storage,`certificate/${file.name}`)
         const uploadTask = uploadBytesResumable(storageRef,file)
  
         uploadTask.on("state_changed",(snapshot)=>{
          const prog = Math.round((snapshot.bytesTransferred/snapshot.totalBytes) *100)
          setUploadingDocProgRess(prog)
         },(error)=>{
          console.log(error)
         },
         ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then((url)=>{
           setCertificateDetails(prev=>({...prev,visit:url}))
          })
         }
         )
        }
        uploadResume(file)
  };

  const  toViewDoc =(el)=>{
    setVisi1(true)
    setDocUrl({
       visit:el.visit,
      fileName:el.fileName
    })
   }

   const clearFilter = ()=>{
    setFilterObj(
      {
        clientName:'',
        year:'',
        month:'',
      }
    )
   }


    return<>
          <CModal  size="xl" alignment="center" scrollable visible={visi1} onClose={() => setVisi1(false)}>
                            <CModalHeader>
                                <CModalTitle>Certification Preview</CModalTitle>
                            </CModalHeader>
                            <CModalBody style={{ padding: '25px' }}>
                <div style={{minHeight:'100vh',width:'inherit'}}>
                    <iframe
                        src={docurl.visit}
                        frameBorder="0"
                        scrolling="auto"
                        width="100%"
                        height="600"
                    ></iframe>
                </div>                  
                            </CModalBody>
                            <CModalFooter>
                                <Link style={{textDecoration:'none'}} className="text-white bg-primary p-2 px-3 rounded-2" to={docurl.visit} target="_blank" download={docurl.fileName}>Download</Link>
                                
                            </CModalFooter>
               </CModal>
    
    <CCard className=''>
    <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }} className='mb-2'>
            <CCardTitle className="mt-2">Client Certificate Details </CCardTitle>
    </CCardHeader>
<CCardBody>

      <CCol className='text-end px-3'>
            <h5>Total Clinet :- {clientCertificateData.length}</h5>
          </CCol>

      <CRow className="mx-3">
        <h5 className="m-0 p-0">Filter by</h5>
      </CRow>
     <CRow className="mx-3 p-0">
         <CCol lg={3} md={3} className="m-0 p-0">
              <CFormSelect
              label='Client Name'
              value={filterObj.clientName}
              onChange={(e)=>setFilterObj(prev=>({...prev,clientName:e.target.value}))}
              >
                <option value={''} >Select Client Name</option>
                {clientData.map((el,i)=>
                <option key={i} value={el.Fullname} >{el.Fullname}</option>
                )}
              </CFormSelect>
         </CCol>
         <CCol lg={3} md={3} >
            <CFormSelect
              label='Year'
              value={filterObj.year}
              onChange={(e)=>setFilterObj(prev=>({...prev,year:e.target.value}))}
              >
               <option key={'l'} value={''}>Select Year</option>
                <option>2023</option>
                <option>2024</option>
                <option>2025</option>
                <option>2026</option>
                <option>2027</option>
                <option>2028</option>
                <option>2029</option>
                <option>2030</option>
                <option>2031</option>
                <option>2032</option>
                <option>2034</option>
                <option>2035</option>
              </CFormSelect>
         </CCol>
         <CCol lg={3} md={3} >
         <CFormSelect
              label='Month'
              value={filterObj.month}
              onChange={(e)=>setFilterObj(prev=>({...prev,month:e.target.value}))}
              >
                <option key={'l'} value={''}>Select Month</option>
                { monthName.map((el,i)=><option key={i} value={i}>{el}</option>)}
          </CFormSelect>
         </CCol>
     </CRow>
     <CRow className="mx-2 py-2">
      <CCol >
      <CButton onClick={()=>clearFilter()}>Clear Filter</CButton>
      </CCol>
     </CRow>

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
                        setCertificateDetails({...obj})
                    
                    }}>Close</CButton>
                </CCol>
            </CRow>
            <CRow>
               <CCol lg={6} md={6} sm={12}>
                   <label className="mb-2">Select Referal Client</label>
                     <CustomSelectInput data={clientData} 
                    title={certificateDetails.name?.trim()?
                        certificateDetails.name:"Select client name"} getData={clientObj}/>
              </CCol>
              <CCol lg={6} md={6} sm={12}>
                <CFormInput
                  label='Contact no'
                  type='number'
                  value={certificateDetails.contactNo}
                  onChange={(e)=>setCertificateDetails((prev)=>({...prev,certificateDetails:e.target.value}))}
                />
              </CCol>
             </CRow>
             <CRow>
             <CCol lg={6} md={6} sm={12}>
                <CFormInput
                  label='Email ID'
                  type='text'
                  value={certificateDetails.emailID}
                  onChange={(e)=>setCertificateDetails((prev)=>({...prev,emailID:e.target.value}))}
                />
              </CCol> 
              <CCol lg={6} md={6} sm={12}>
                <CFormInput
                  label='Course'
                  type='text'
                  value={certificateDetails.course}
                  onChange={(e)=>setCertificateDetails((prev)=>({...prev,course:e.target.value}))}
                />
              </CCol> 
             </CRow>
             <CRow>
             <CCol lg={6} md={6} sm={12}>
                <CFormInput
                  label='Service'
                  type='text'
                  value={certificateDetails.service}
                  onChange={(e)=>setCertificateDetails((prev)=>({...prev,service:e.target.value}))}
                />
              </CCol> 
              <CCol lg={6} md={6} sm={12}>
                <CFormInput
                  label='Joining Date'
                  type='date'
                  value={certificateDetails.joiningDate}
                  onChange={(e)=>setCertificateDetails((prev)=>({...prev,joiningDate:e.target.value}))}
                />
              </CCol>
             </CRow>
             <CRow>
                <CCol lg={6} md={6} sm={12}>
                <CFormInput
                  label={`Upload Doc ${uploadingDocProgress}%`}
                  type="file"
                  onChange={HandaleResumeInputChange}
                />
                </CCol>
                
             </CRow>
             <CRow>
                       <CCol lg={6} className="mt-3" >
                                <CListGroup>
                                    <CListGroupItem>
                                        <CFormCheck label="Books"
                                            checked={certificateDetails.books==='Done'}
                                            onChange={()=>setCertificateDetails((prev)=>({...prev, books:prev.books?'':'Done'}))}
                                             />
                                    </CListGroupItem>
                                    <CListGroupItem>
                                        <CFormCheck label="PRACTICAL"
                                              checked={certificateDetails.prractical==='Done'}
                                              onChange={()=>setCertificateDetails((prev)=>({...prev,prractical:prev.prractical?'':'Done'}))}
                                            />
                                    </CListGroupItem>
                                    <CListGroupItem>
                                        <CFormCheck label="VIVA"
                                            checked={certificateDetails.viva==='Done'}
                                            onChange={()=>setCertificateDetails((prev)=>({...prev,viva:prev.viva?'':'Done'}))}
                                             />
                                    </CListGroupItem>
                                    <CListGroupItem>
                                        <CFormCheck label="Project"
                                            checked={certificateDetails.project==='Done'}
                                            onChange={()=>setCertificateDetails((prev)=>({...prev,project:prev.project?'':'Done'}))}
                                             />
                                    </CListGroupItem>
                                    
                                </CListGroup>
                            </CCol>

                            <CCol lg={6} className="mt-3" >
                                <CListGroup>
                                    <CListGroupItem>
                                        <CFormCheck label="Videos"
                                             checked={certificateDetails.videos==='Done'}
                                             onChange={()=>setCertificateDetails((prev)=>({...prev,videos:prev.videos?'':'Done'}))}
                                             />
                                    </CListGroupItem>
                                    <CListGroupItem>
                                        <CFormCheck label="THEORY Exam"
                                             checked={certificateDetails.theory==='Done'}
                                             onChange={()=>setCertificateDetails((prev)=>({...prev,theory:prev.theory?'':'Done'}))}
                                            />
                                    </CListGroupItem>
                                    <CListGroupItem>
                                        <CFormCheck label="Result"
                                            checked={certificateDetails.result==='Done'}
                                            onChange={()=>setCertificateDetails((prev)=>({...prev,result: prev.result?'':'Done'}))}
                                             />
                                    </CListGroupItem>
                                    <CListGroupItem>
                                        <CFormCheck label="Course Complition"
                                             checked={certificateDetails.certification==='Done'}
                                             onChange={()=>setCertificateDetails((prev)=>({...prev,certification:prev.certification?'':'Done'}))}
                                             />
                                    </CListGroupItem>
                                    
                                </CListGroup>
                            </CCol>
             </CRow>

              <CRow>
                <CCol lg={6} md={6} sm={12}>
                  <CFormInput
                  type="text"
                  label='Grade'
                  value={certificateDetails.grade}
                  onChange={(e)=>setCertificateDetails((prev)=>({...prev,grade:e.target.value}))} 
                  />   
                </CCol>
                <CCol lg={6} md={6} sm={12}>
                  <CFormInput
                  type="text"
                  label='Certification num'
                  value={certificateDetails.certificationNum}
                  onChange={(e)=>setCertificateDetails((prev)=>({...prev,certificationNum:e.target.value}))} 
                  />   
                </CCol>

             </CRow>   

           <CCol className="pt-3 text-end">
            {!updateActive&&<CButton onClick={()=>saveData('Save') }>Save</CButton>}
            {updateActive&&<CButton onClick={()=>saveData('Update') }>Update</CButton>}
            {updateActive&&<CButton className="ms-4" onClick={()=>{
                setUpdateActive('')
                setCertificateDetails({...obj})
            }}>Reset Update</CButton>}
            { error&&<p style={{color:'red'}}>  Please fill require details</p>}
           </CCol>

         </CForm>
    </div>
    <CCol style={{ backgroundColor: '#0B5345'}} className='p-1'>

    </CCol>
      </CCard>}
     <CTable className='m-3 p-2' align="middle" bordered style={{ borderColor: "#0B5345"}} hover responsive>
      <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }}>
          <CTableRow>
           <CTableHeaderCell>Sr No</CTableHeaderCell>    
           <CTableHeaderCell>Name</CTableHeaderCell>    
           <CTableHeaderCell>Contact No</CTableHeaderCell>    
           <CTableHeaderCell>Email ID</CTableHeaderCell>    
           <CTableHeaderCell>Course </CTableHeaderCell>    
           <CTableHeaderCell>Service Name</CTableHeaderCell>    
           <CTableHeaderCell>Joining date</CTableHeaderCell>    
           <CTableHeaderCell>Books</CTableHeaderCell>    
           <CTableHeaderCell>Practical Exam</CTableHeaderCell>   
           <CTableHeaderCell>Viva Exam </CTableHeaderCell>    
           <CTableHeaderCell>Project</CTableHeaderCell>    
           <CTableHeaderCell>Videos</CTableHeaderCell>    
           <CTableHeaderCell>Theory Exam</CTableHeaderCell>    
           <CTableHeaderCell>Result</CTableHeaderCell>    
           <CTableHeaderCell>Grade</CTableHeaderCell>    
           <CTableHeaderCell>Certificat Number</CTableHeaderCell>   
           <CTableHeaderCell>Course Complition</CTableHeaderCell>    
           <CTableHeaderCell>Certificat view</CTableHeaderCell>        
           <CTableHeaderCell>Edit/Delete</CTableHeaderCell>   
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {clientCertificateData.filter((el)=>{
         return (new Date(el.joiningDate).getFullYear()+"").includes(filterObj.year) &&
                (new Date(el.joiningDate).getMonth()+"").includes(filterObj.month) &&
                el.name.includes(filterObj.clientName)
        }).filter((el, i) => {  num++
if (pagination - 5 < i + 1 && pagination >= i + 1) {return el}})
.map((el,i)=>{
    const satatusFun = (val)=>{
      if(val){
      return <CButton size="sm">Done</CButton>
      }
      return <CButton size="sm" color="warning">...Pending</CButton>
    }

return <CTableRow className='text-center'>
<CTableDataCell>{i + 1 + pagination - 5}</CTableDataCell>
<CTableDataCell>
<Link style={{textDecoration:'none'}} to={`/clients/member-details/${el.MemberId}/1`}>{el.name}</Link>
</CTableDataCell>
<CTableDataCell>{el.contactNo}</CTableDataCell>
<CTableDataCell>{el.emailID}</CTableDataCell>
<CTableDataCell>{el.course}</CTableDataCell>
<CTableDataCell>{el.service}</CTableDataCell>
<CTableDataCell>{el.joiningDate}</CTableDataCell>
<CTableDataCell>{satatusFun(el.books==='Done')}</CTableDataCell>
<CTableDataCell>{satatusFun(el.prractical==='Done')}</CTableDataCell>
<CTableDataCell>{satatusFun(el.viva==='Done')}</CTableDataCell>
<CTableDataCell>{satatusFun(el.project==='Done')}</CTableDataCell>
<CTableDataCell>{satatusFun(el.videos==='Done')}</CTableDataCell>
<CTableDataCell>{satatusFun(el.theory==='Done')}</CTableDataCell>
<CTableDataCell>{satatusFun(el.result==='Done')}</CTableDataCell>
<CTableDataCell>{el.grade}</CTableDataCell>
<CTableDataCell>{el.certificationNum}</CTableDataCell>
<CTableDataCell>{satatusFun(el.certification==='Done')}</CTableDataCell>
<CTableDataCell><CButton size='sm' onClick={()=>toViewDoc(el)}>Certificat View</CButton></CTableDataCell>
<CTableDataCell style={{cursor:'pointer'}} >
    <MdEdit onClick={()=>updateTheValue(el)}/>
    <MdDelete onClick={()=>deleteCr(el)}/>
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

   </>

} 



export default ClientCertificateDetails


