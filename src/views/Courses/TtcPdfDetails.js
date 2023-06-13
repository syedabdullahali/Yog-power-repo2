import {
    CButton,CCard,CCardBody,
    CCardHeader,CCardTitle,CCol,
    CForm,CFormCheck,CFormInput,
    CListGroup,CListGroupItem,CRow,
    CTable,CTableBody,CTableDataCell,
    CTableHead,CTableHeaderCell,CTableRow,
    CModal,CModalHeader,CModalTitle,
    CModalBody,CModalFooter,CPagination,
    CPaginationItem,CFormSelect,
} from "@coreui/react";
import { getDownloadURL, ref,  uploadBytesResumable,deleteObject } from 'firebase/storage'
import { storage } from 'src/firebase'
import { MdDelete, MdEdit} from 'react-icons/md';
import axios from "axios";
let user = JSON.parse(localStorage.getItem('user-info'))
const token = user.token;
const username = user.user.username;
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";


const headers = {
    "Authorization": `Bearer ${token}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
   }


function TtcPdfDetails(){

    let num =0

    const obj = {
        courseName: '',
        typeOfCourse: '',
        courseLink: '',
        documentType: '',
        docName:'',
        view:'',
    }

    const url = useSelector((el) => el.domainOfApi)

    const [showForm,setForm] = useState(true)
    const [teacherObj,setTeacherObj] = useState({...obj})
    const [teacherData,setTeachersData] = useState([])
    const [uploadingDocProgress,setUploadingDocProgRess] = useState(0)
    const [visi1, setVisi1]= useState(false)
    const [docurl,setDocUrl]= useState({ 
        visit:'',
        fileName:''
    })
    const [pagination, setPagination] = useState(5)




    function getTTCPdfDetails() {
        axios.get(`${url}/ttcPDFDetails/all`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => { 
                if(res.status===200){
                    console.log(res.data)
                    setTeachersData(res.data.reverse())
                }
            })
            .catch((error) => {
                console.error(error)
            })
    }

useEffect(()=>{
     getTTCPdfDetails()
 },[])



    const saveData = async (type)=>{
           let response ={}
           try{
             if(type==='Save'){
               response = await  axios.post(`${url}/ttcPDFDetails/create`,teacherObj,{headers})
             }
            if(response?.status===200){
             alert('successfully save')
             getTTCPdfDetails()
            }
             }catch(error){
               console.error(error)
             }
         }
         

         const HandaleResumeInputChange = event => {
            const file = event.target.files[0] 
    
            setTeacherObj(prev=>({...prev,docName:file.name}))
            const uploadResume = (file)=>{
              if(!file)return
             const storageRef =   ref(storage,`ttdcPDFDetails/${file.name}`)
             const uploadTask = uploadBytesResumable(storageRef,file)
      
             uploadTask.on("state_changed",(snapshot)=>{
              const prog = Math.round((snapshot.bytesTransferred/snapshot.totalBytes) *100)
              setUploadingDocProgRess(prog)
             },(error)=>{
              console.log(error)
             },
             ()=>{
              getDownloadURL(uploadTask.snapshot.ref).then((url)=>{
               setTeacherObj(prev=>({...prev,view:url}))
              })
             }
             )
            }
            uploadResume(file)
      };


      function deleteCr(el) {
        if (confirm('Do you want to delete this')) {
    
            const desertRef = ref(storage, `ttdcPDFDetails/${el.docName}`);
            deleteObject(desertRef).then((el) => {
                console.log(el,"File deleted successfully")
            }).catch((error) => {
                console.log(error)
            });
    
    
    
            fetch(`${url}/ttcPDFDetails/delete/${el._id}`, {
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


      const  toViewDoc =(el)=>{
        setVisi1(true)
        setDocUrl({
          visit:el.view,
          fileName:el.docName
        })
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
             <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }} className='mb-4'>
                           <CCardTitle className="mt-2">Teachers Training Course PDF Details</CCardTitle>
             </CCardHeader>
         
         {showForm?<CCol className='text-end p-2 px-4'>
            <CButton onClick={()=>setForm((value)=>!value)}>Add New</CButton>
    </CCol>:

    <CCard className="mx-2">
        <CCardHeader className="p-3" style={{ backgroundColor: '#0B5345', color: 'white' }}>
                 <CCardTitle> <h5>Certificate Form</h5></CCardTitle>
        </CCardHeader>

    <div >
         <CForm className='p-4'>
            <CRow>
                <CCol className="text-end p-2">
                    <CButton color="danger" onClick={()=>{
                        setForm(true)
                       setTeacherObj({...obj})                   
                    }}>Close</CButton>
                </CCol>
            </CRow>
            <CRow>
              <CCol lg={6} md={6} sm={12}>
                <CFormInput
                  label='Course Name'
                  type='text'
                  value={teacherObj.courseName}
                  onChange={(e)=>setTeacherObj((prev)=>({...prev,courseName:e.target.value}))}
                />
              </CCol>
              <CCol lg={6} md={6} sm={12}>
                <CFormInput
                  label='Type Of Course'
                  type='text'
                  value={teacherObj.typeOfCourse}
                  onChange={(e)=>setTeacherObj((prev)=>({...prev,typeOfCourse:e.target.value}))}
                />
              </CCol> 
             </CRow>
             <CRow>
              <CCol lg={6} md={6} sm={12}>
                <CFormInput
                  label='Course Link'
                  type='text'
                  value={teacherObj.courseLink}
                  onChange={(e)=>setTeacherObj((prev)=>({...prev,courseLink:e.target.value}))}
                />
              </CCol> 
              <CCol lg={6} md={6} sm={12}>
                <CFormInput
                  label='Document Type'
                  type="text"
                  value={teacherObj.documentType}
                  onChange={(e)=>setTeacherObj((prev)=>({...prev,documentType:e.target.value}))}
                />
              </CCol>
             
             </CRow>
             <CRow>
            

              <CCol lg={6} md={6} sm={12}>
                <CFormInput
                  label={`Upload Doc ${uploadingDocProgress}%`}
                  type="file" accept="application/pdf"
                  onChange={HandaleResumeInputChange}
                />
              </CCol>
             </CRow>
            
           <CCol className="pt-3 text-end">
            {<CButton onClick={()=>saveData('Save') }>Save</CButton>} 
           </CCol>

         </CForm>
    </div>
    <CCol style={{ backgroundColor: '#0B5345'}} className='p-1'>

    </CCol>
      </CCard>}


<CCardBody>
   <CTable className='m-3 p-2' align="middle" bordered style={{ borderColor: "#0B5345",width:'100%' }} hover responsive>
      <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }}>
          <CTableRow>
           <CTableHeaderCell>Sr No</CTableHeaderCell>    
           <CTableHeaderCell>Course Name</CTableHeaderCell>    
           <CTableHeaderCell>Type Of Course</CTableHeaderCell>    
           <CTableHeaderCell>Course Link</CTableHeaderCell>       
           <CTableHeaderCell>Document Type</CTableHeaderCell> 
           <CTableHeaderCell>View</CTableHeaderCell>        
           <CTableHeaderCell>Delete</CTableHeaderCell>    
          </CTableRow>
      </CTableHead>
      <CTableBody>
        {teacherData.filter((el, i) => {  num++
if (pagination - 5 < i + 1 && pagination >= i + 1) {return el}}).map((el,i)=>{
        return  <CTableRow className="text-center">
        <CTableDataCell>{i+1}</CTableDataCell>
        <CTableDataCell>{el.courseName}</CTableDataCell>
        <CTableDataCell>{el.typeOfCourse}</CTableDataCell>
        <CTableDataCell style={{width:'250px'}} ><a href={el.courseLink}>{el.courseLink}</a> </CTableDataCell>
        <CTableDataCell>{el.documentType}</CTableDataCell>
        <CTableDataCell><CButton size='sm' onClick={()=>toViewDoc(el)}> View </CButton></CTableDataCell>
        <CTableDataCell><MdDelete onClick={()=>deleteCr(el)} /></CTableDataCell>
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



export default TtcPdfDetails