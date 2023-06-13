import { CCard,CTable,CTableHead,CTableHeaderCell,CTableRow
    ,CTableBody,CTableDataCell,CCol,CRow,CButton,CForm,
    CCardHeader,CCardTitle,CFormInput,CCallout,CModal,
    CModalHeader,CModalTitle,CCardBody,CModalBody,CModalFooter,
    CFormSelect
 } from "@coreui/react"
import CIcon from '@coreui/icons-react'
import { cilArrowCircleTop, cilFile } from '@coreui/icons'
import { FaBeer } from 'react-icons/fa';
import DataTable from 'src/components/DataTable'
import { MdCall, MdDelete, MdEdit, MdMail } from 'react-icons/md';
import { useSelector } from "react-redux";
import { useState,useEffect,useRef } from "react";
import { useReactToPrint } from "react-to-print";

let user = JSON.parse(localStorage.getItem('user-info'))
const token = user.token;
const username = user.user.username;
const centerCode = user.user.centerCode;
import axios from "axios";
import { storage } from "src/firebase";
import {getDownloadURL, ref,uploadBytesResumable } from "firebase/storage";



const EmpDocuments = () => {

    
const componentRef = useRef()

const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'yog-power',
    onAfterPrint: () => alert('print success')
})

    const headers = {
        "Authorization": `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
       }
    
    const url = useSelector((el) => el.domainOfApi)


    const [showForm,setForm] = useState(true)
    const [visible, setVisible] = useState(false)
    const [shiftTimeingData,setShitTimeingData] = useState([])
    const [updateActive,setUpdateActive] = useState(false)
    const [empDocumnetData,setEmpDocumnetData] = useState([])
    const [fileUploaded,setFileUploadUrl] = useState([])
    const [imgPrograss,setImgPrograss] = useState(0)
    const [visi1, setVisi1]= useState(false)
    const [docurl,setDocUrl]= useState('')
    const [empDocumnet,setEmpDocumnet] = useState({
        username: '',
        empID:'',
        empName:'',
        docName:'',
        docview:'',
        MemBerId:''
    })




    const [staff, setStaff] = useState([])

    const selectedStaff =  staff?.find((el)=>el?._id===empDocumnet?.empName)

    function getStaff() {
        axios.get(`${url}/employeeform`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                setStaff(res.data.reverse())
            })
            .catch((error) => {
                console.error(error)
            })
    }
    
    useEffect(()=>{
      console.log(selectedStaff)
     setEmpDocumnet((prev)=>({...prev,empID:selectedStaff?.EmployeeID}))

    },[selectedStaff?._id])


    const getEmpDocData = ()=>{
         axios.get(`${url}/emplDocument/all`,{headers}).then((res)=>{
         if(!res.status===200){
          return 
         }
         setEmpDocumnetData(res.data)
          console.log(res.data)

       }).catch((error)=>{console.log(error)})
       }

       const saveData = async (type)=>{

        let response ={}
        try{
          if(type==='Save'){
            response = await  axios.post(`${url}/emplDocument/create`,
            {...empDocumnet,docview:fileUploaded,empName:selectedStaff?.FullName,MemBerId:selectedStaff._id},{headers})
          }
          if(type==='Update'){
           response = await  axios.post(`${url}/emplDocument/update/${empDocumnet?._id}`,{...empDocumnet,empName:selectedStaff?.FullName},{headers})
          }
      
         if(response?.status===200){
          getEmpDocData()
          alert('successfully save')
         }
          }catch(error){
            console.error(error)
          }
      }   

      useEffect(()=>{
        getEmpDocData()
        getStaff()
      },[])
    

      const handleChange = event => {
        const fileUploaded = event.target.files[0];
        const file = event.target.files[0]
    
         
            const uploadImage = (file)=>{
              if(!fileUploaded)return
             const storageRef =   ref(storage,`document/${fileUploaded.name}`)
             const uploadTask = uploadBytesResumable(storageRef,fileUploaded)
      
             uploadTask.on("state_changed",(snapshot)=>{
              const prog = Math.round((snapshot.bytesTransferred/snapshot.totalBytes) *100)
              setImgPrograss(prog)
      
             },(error)=>{
              console.log(error)
             },
             ()=>{
              getDownloadURL(uploadTask.snapshot.ref).then((url)=>{
                setFileUploadUrl(url)
              })
             }
             )
            }
            uploadImage(file)
      };

      function toToggaleFrom(){
       setForm((prev=>!prev))
        setUpdateActive(false)
        setEmpDocumnet({
            username: '',
            empID:'',
            empName:'',
            docName:'',
            docview:'',
            MemBerId:''
         })
      }
      
      const updateProduct = async (item)=>{
        setForm(false)
        setEmpDocumnet({...item})
        setUpdateActive(true)
       
      }
    
    
    const toDeleteData= async (id)=>{
      if(!confirm('Do u want to delete this')){
      return
      }
      
      const response = await  axios.delete(`${url}/emplDocument/delete/${id}`, {headers})
      if(response.status===200){
         getEmpDocData()
      }
      
      }
    
   const  toViewDoc =(url)=>{
    setVisi1(true)
    setDocUrl(url)
   }

   

      

    return (
        <>
         <CModal  size="xl" alignment="center" scrollable visible={visi1} onClose={() => setVisi1(false)}>
                            <CModalHeader>
                                <CModalTitle>Invoice Preview</CModalTitle>
                            </CModalHeader>
                            <CModalBody ref={componentRef} style={{ padding: '25px' }}>
                <div style={{minHeight:'100vh'}}>
                    <iframe
                        src={docurl}
                        frameBorder="0"
                        scrolling="auto"
                        width="100%"
                        height="600"
                    ></iframe>
                </div>                  
                            </CModalBody>
                            <CModalFooter>
                                <CButton color="primary" onClick={handlePrint}>Print</CButton>
                            </CModalFooter>
                        </CModal>
        <CRow>
            <CCol lg={12} sm={12}>
                <CCard className="mb-3 border-success">
                    <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                        <CCardTitle className="mt-2">Employee  Document </CCardTitle>
                    </CCardHeader>
                    <CCardBody>
                    
                    <CCol className='my-3 text-end'>
                   {showForm&&<CButton onClick={()=>toToggaleFrom()}>Add New </CButton>}
                   {showForm||<CCard className="overflow-hidden my-4 text-start"   >
        <CCardHeader className="p-4" style={{ backgroundColor: '#0B5345', color: 'white' }}>
                 <CCardTitle> <h5>Employee Document Form</h5></CCardTitle>
        </CCardHeader>
    <div className="p-4">
         <CForm>
            <CCol className="d-flex justify-content-end">
            <CButton color='danger' onClick={()=>toToggaleFrom()}>Close</CButton>
            </CCol>
            <CRow>
              <CCol>
          <CFormSelect
              label='Emp Name'
              value={empDocumnet.empName}
              onChange={(e)=>setEmpDocumnet(prev=>({...prev,empName:e.target.value}))}
              >
                <option value=''>Select Employee</option>
                        {staff.filter((list) => list.username === username &&
                          list.selected === 'Select').map((item, index) => (
                            <option key={index} value={item._id}> {item.FullName}</option>
                          ))}
              </CFormSelect>
          </CCol>
        
              <CCol >
              <CFormInput
                  type="text"
                  label='Emp Id'
                  value={empDocumnet.empID}
                  onChange={(e)=>setEmpDocumnet((prev)=>({...prev,empID:e.target.value}))}
                />
              </CCol>
            </CRow>    

            <CRow>
              <CCol>
                <CFormInput
                  type="text"
                  label='Doc Name'
                  value={empDocumnet.docName}
                  onChange={(e)=>setEmpDocumnet((prev)=>({...prev,docName:e.target.value}))}

                />
              </CCol>
        
              <CCol >
              <CFormInput
                  type="file"
                  label={`Uploading... Doc ${imgPrograss}%`}
                  onChange={(e)=>handleChange(e)}
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
                                    <CTableHeaderCell>Emp ID</CTableHeaderCell>
                                   <CTableHeaderCell >Emp Name</CTableHeaderCell>
                                   <CTableHeaderCell>Doc Name</CTableHeaderCell>
                                   <CTableHeaderCell>Doc view</CTableHeaderCell>
                                   <CTableHeaderCell>Delete/Edit</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>

                                {empDocumnetData.map((el,i)=>(

                                    <CTableRow className="text-center">
                                        <CTableDataCell>{i+1}
                                        </CTableDataCell>
                                        <CTableDataCell >
                                        {el.empID}
                                        </CTableDataCell>
                                        <CTableDataCell>
                                        {el.empName}
                                        </CTableDataCell>
                                        <CTableDataCell>
                                        {el.docName}
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            <CButton onClick={()=>toViewDoc(el.docview)} >View</CButton>
                                        </CTableDataCell>
                                        <CTableDataCell>
                                           <MdEdit style={{cursor:'pointer'}} onClick={()=>updateProduct(el)} />
                                           <MdDelete style={{cursor:'pointer'}} onClick={()=>toDeleteData(el._id)}/>   
                                        </CTableDataCell>
                                    </CTableRow>     

                                ))}
                                                                                     
                           </CTableBody>
</CTable>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
        </>
    )
}

export default EmpDocuments
