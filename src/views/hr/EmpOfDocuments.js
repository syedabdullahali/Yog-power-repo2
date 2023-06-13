import { CCard,CTable,CTableHead,CTableHeaderCell,CTableRow
    ,CTableBody,CTableDataCell,CCol,CRow,CButton,CForm,
    CCardHeader,CCardTitle,CFormInput,CCallout,CModal,
    CModalHeader,CModalTitle,CCardBody,CModalBody,CModalFooter,
 } from "@coreui/react"
import CIcon from '@coreui/icons-react'
import { cilArrowCircleTop, cilFile } from '@coreui/icons'
import { FaBeer } from 'react-icons/fa';
import DataTable from 'src/components/DataTable'
import { MdCall, MdDelete, MdEdit, MdMail } from 'react-icons/md';
import { useSelector } from "react-redux";
import { useState,useEffect,useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";





const EmpOfDocuments = () => {

    const [empDocumnetData,setEmpDocumnetData] = useState([])
    const [visi1, setVisi1]= useState(false)
    const [docurl,setDocUrl]= useState('')


    const componentRef = useRef()

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'yog-power',
        onAfterPrint: () => alert('print success')
    })


    const url = useSelector((el) => el.domainOfApi)
    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;

    const headers = {
        "Authorization": `Bearer ${token}`,
       }

   const getEmpDocData = ()=>{
        axios.get(`${url}/emplDocument/all`,{headers}).then((el)=>{

        if(!el.data){
         return 
        }
        setEmpDocumnetData(el.data)
      }).catch((error)=>{console.log(error)})
      }

      useEffect(()=>{
        getEmpDocData()
      },[])


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
                    
                        
                    <CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345" }} hover responsive>
                            <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                                <CTableRow >
                                    <CTableHeaderCell>Sr.No</CTableHeaderCell>
                                    <CTableHeaderCell>Emp ID</CTableHeaderCell>
                                   <CTableHeaderCell >Emp Name</CTableHeaderCell>
                                   <CTableHeaderCell>Doc Name</CTableHeaderCell>
                                   <CTableHeaderCell>Doc view</CTableHeaderCell>
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

export default EmpOfDocuments
