import React, { useEffect, useState,useRef } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import {
    CButton,
    CButtonGroup,
    CCard,
    CCardBody,
    CCardHeader,
    CCardTitle,
    CCol,
    CFormInput,
    CFormSelect,
    CInputGroup,
    CPagination,
    CPaginationItem,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CModal,
    CModalHeader,CModalTitle,CModalBody,CModalFooter,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowCircleBottom, cilArrowCircleTop } from '@coreui/icons'
import { MdCall, MdDelete, MdEdit, MdMail } from 'react-icons/md';
import { BsPlusCircle, BsWhatsapp } from 'react-icons/bs';
import ApplicationForm from '../forms/ApplicationForm';
import EmployeeForm from '../forms/EmployeeForm';
import axios from 'axios';
import moment from 'moment';
import { useReactToPrint } from 'react-to-print';

const EmpRecruitment = () => {
    const url = useSelector((el)=>el.domainOfApi) 

    const [Search1, setSearch1] = useState('')
    const [Search2, setSearch2] = useState('')
    const [Search3, setSearch3] = useState('')
    const [Search4, setSearch4] = useState('')
    const [Search5, setSearch5] = useState('')
    const [Search6, setSearch6] = useState('')
    const [Search7, setSearch7] = useState('')
    const [Search8, setSearch8] = useState('')
    const [Search9, setSearch9] = useState('')
    const [Search10, setSearch10] = useState('')
    const [showEditFrom,setEditFormValue] = useState([false,[]])
    const [showEmpRecrument,setEmpRecrumentForm] =useState([false])
    const [userdata,setUserData] = useState([])
    const [visi1, setVisi1]= useState(false)
    const [docurl,setDocUrl]= useState('')

  
    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;
    const username = user.user.username;
    const centerCode = user.user.centerCode;
    const [result1, setResult1] = useState([]);
    const [paging, setPaging] = useState(0);
    useEffect(() => {
        getStaff()
    }, [])

    const componentRef = useRef()

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'yog-power',
        onAfterPrint: () => alert('print success')
    })
    


    const [staff, setStaff] = useState([])


    function getStaff() {
        axios.get(`${url}/employeeform`)
            .then((res) => {
                setStaff(res.data.reverse())
               
            })
            .catch((error) => {
                console.error(error)
            })
    }

    function deleteEnquiry(id) {
        if (confirm('Do you want to delete this')) {
            fetch(`${url}/employeeform/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then((result) => {
                result.json().then((resp) => {
                    console.warn(resp)
                    getStaff()
                })
            })
        }
    }
    
    function editEnquiry(userData) {       
        setEditFormValue((value)=>[!value[0],userData])                   
    }

    function showEmpRecrumentFormFun(item){
        setUserData(item)
        setEmpRecrumentForm((value)=>[!value[0]])
    }


    function updateRec(id, selected,item) {

        const data1 = { selected}

        fetch(`${url}/employeeform/${id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...item,...data1})
        }).then((resp) => {
            resp.json().then(() => {
                alert("successfully submitted")
                getStaff()
            })
        })
    }

    const  toViewDoc =(url)=>{
        setVisi1(true)
        setDocUrl(url)
       }
    
       


    return (
        <CRow>
            <CCol lg={12} sm={12}>
                {showEditFrom[0]&&<ApplicationForm getStaff={getStaff}  shouldEdit ={true} data={showEditFrom[1]} editEnquiry={editEnquiry} />}
                { showEmpRecrument[0]&& 

                <EmployeeForm
                 AttendenceLength={staff.filter((list) => list.username === username && list.selected === 'Select').length} 
                 token={token} userdata={userdata} data={staff}
                 showEmpRecrumentFormFun={showEmpRecrumentFormFun}/>}


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


                <CCard className="mb-3 border-success">
                    <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                        <CCardTitle className="mt-2">All Recruitment</CCardTitle>
                    </CCardHeader>
                    <CCardBody>
                        <CRow className='d-flex mb-2'>
                            <CCol lg={8} sm={6} className='mb-2'>

                            </CCol>
                            <CCol lg={4} sm={6} className='mb-2' >
                                <CButtonGroup className='float-end'>
                                    <CButton color="primary">
                                         <CIcon icon={cilArrowCircleBottom} />
                                        {' '}Import
                                    </CButton>
                                    <CButton color="primary">
                                        <CIcon icon={cilArrowCircleTop} />
                                        {' '}Export
                                    </CButton>
                                </CButtonGroup>
                            </CCol>
                        </CRow>

                        <CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345" }} hover responsive>
                            <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                                <CTableRow >
                                    <CTableHeaderCell>Sr.No</CTableHeaderCell>
                                    <CTableHeaderCell>Recruitment-ID</CTableHeaderCell>
                                    <CTableHeaderCell>Apply Date</CTableHeaderCell>
                                    <CTableHeaderCell>Name</CTableHeaderCell>
                                    <CTableHeaderCell>Mobile</CTableHeaderCell>
                                    <CTableHeaderCell>Email-ID</CTableHeaderCell>
                                    <CTableHeaderCell>Gender</CTableHeaderCell>
                                    <CTableHeaderCell>Location</CTableHeaderCell>
                                    <CTableHeaderCell>Source</CTableHeaderCell>
                                    <CTableHeaderCell>Department</CTableHeaderCell>
                                    <CTableHeaderCell>Designation</CTableHeaderCell>
                                    <CTableHeaderCell>Grade</CTableHeaderCell>
                                    <CTableHeaderCell>Comment</CTableHeaderCell>
                                    <CTableHeaderCell>Expected Salary</CTableHeaderCell>

                                    <CTableHeaderCell>Status</CTableHeaderCell>
                                    <CTableHeaderCell>Resume</CTableHeaderCell>
                                    <CTableHeaderCell>Action</CTableHeaderCell>
                                    <CTableHeaderCell>Edit/Delete</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                <CTableRow>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            style={{ minWidth: "60px" }}
                                            type="text"
                                            disabled
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            style={{ minWidth: "120px" }}
                                            type="text"
                                            disabled
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "120px" }}
                                            disabled
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "90px" }}
                                            value={Search1}
                                            onChange={(e) => setSearch1(e.target.value)}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="number"
                                            style={{ minWidth: "100px" }}
                                            value={Search10}
                                            onChange={(e) => setSearch10(e.target.value)}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "120px" }}
                                            value={Search2}
                                            onChange={(e) => setSearch2(e.target.value)}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            value={Search3}
                                            onChange={(e) => setSearch3(e.target.value)}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "180px" }}
                                            value={Search4}
                                            onChange={(e) => setSearch4(e.target.value)}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "100px" }}
                                            value={Search5}
                                            onChange={(e) => setSearch5(e.target.value)}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "100px" }}
                                            value={Search6}
                                            onChange={(e) => setSearch6(e.target.value)}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            style={{ minWidth: "100px" }}
                                            type="text"
                                            value={Search7}
                                            onChange={(e) => setSearch7(e.target.value)}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            style={{ minWidth: "80px" }}
                                            type="number"
                                            value={Search9}
                                            onChange={(e) => setSearch9(e.target.value)}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "50px" }}
                                            value={Search8}
                                            onChange={(e) => setSearch8(e.target.value)}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            value={Search9}
                                            style={{ minWidth: "120px" }}
                                            disabled
                                            onChange={(e) => setSearch9(e.target.value)}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            style={{ minWidth: "80px" }}
                                            type="text"
                                            disabled
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            style={{ minWidth: "70px" }}
                                            type="text"
                                            disabled
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            style={{ minWidth: "100px" }}
                                            type="text"
                                            disabled
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            style={{ minWidth: "70px" }}
                                            type="text"
                                            disabled
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                </CTableRow>
                                {staff.slice(paging * 10, paging * 10 + 10).filter((list) =>

                                   list.username === username &&
                                   list.FullName.toLowerCase().includes(Search1.toLowerCase())&&list.EmailAddress
                                     .toLowerCase().includes(Search2.toLowerCase())
                                    && list?.Gender?.toLowerCase().includes(Search3.toLowerCase())
                                     && list.address.toLowerCase().includes(Search4.toLowerCase()) 
                                     && list.PayoutType.toLowerCase().includes(Search5.toLowerCase())
                                    && list.Department.toLowerCase().includes(Search6.toLowerCase()) 
                                    && list.JobDesignation.toLowerCase().includes(Search7.toLowerCase())
                                     && list.Grade.toLowerCase().includes(Search8.toLowerCase())
                                    && list.Salary.toString().includes(Search9.toString()) 
                                    && list.ContactNumber.toString().includes(Search10.toString())
                         
                                  ).map((item, index) => (
                                    item.username === username && (
                                        <CTableRow key={index}>
                                            <CTableDataCell>{index + 1 + (paging * 10)}</CTableDataCell>
                                            <CTableDataCell>JobRec{index + 1 + (paging * 10)}</CTableDataCell>
                                            <CTableDataCell className='text-center'>{moment(item.createdAt).format("LL")}</CTableDataCell>
                                            <CTableDataCell>{item.FullName}</CTableDataCell>
                                            <CTableDataCell>{item.ContactNumber}</CTableDataCell>
                                            <CTableDataCell>{item.EmailAddress}</CTableDataCell>
                                            <CTableDataCell>{item.Gender}</CTableDataCell>
                                            <CTableDataCell>{item.address}</CTableDataCell>
                                            <CTableDataCell>{item.PayoutType}</CTableDataCell>
                                            <CTableDataCell>{item.Department}</CTableDataCell>
                                            <CTableDataCell>{item.JobDesignation}</CTableDataCell>
                                            <CTableDataCell>{item.Grade}</CTableDataCell>
                                            <CTableDataCell>{item.Comment}</CTableDataCell>
                                            <CTableDataCell>{item.Salary}</CTableDataCell>
                                            
                                            <CTableDataCell>
                                             {item.selected !== 'Select'?   
                                            <CButton className='mt-1' color='success' onClick={()=>showEmpRecrumentFormFun(item)} >Accept</CButton>                                            
                                            :<CButton className='mt-1' color='danger' onClick={() => updateRec(item._id, 'Not Select',item)}>Reject</CButton>
                                             }   

                                            </CTableDataCell> 
                                            <CTableDataCell  > <CButton onClick={()=>toViewDoc(item.resume)}>View</CButton></CTableDataCell>
                                            <CTableDataCell className='text-center'><a href={`tel:${item.ContactNumber}`} target="_black"><MdCall style={{ cursor: 'pointer', markerStart: '10px' }} size='20px' /></a><a href={`https://wa.me/${item.ContactNumber}`} target="_black"><BsWhatsapp style={{ marginLeft: "4px", cursor: 'pointer', markerStart: '10px' }} size='20px' /></a><a href={`mailto: ${item.EmailAddress}`} target="_black"> <MdMail style={{ cursor: 'pointer', markerStart: '10px', marginLeft: "4px" }} size='20px' /></a></CTableDataCell>
                                            <CTableDataCell className='text-center'>
                                             <MdEdit style={{ 
                                                    cursor: 'pointer', markerStart: 
                                                    '10px', marginLeft: "5px" }} 
                                                onClick={() => editEnquiry(item)} size='20px' />    
                                                <MdDelete style={{ 
                                                    cursor: 'pointer', markerStart: 
                                                    '10px', marginLeft: "5px" }} 
                                                    onClick={() => deleteEnquiry(item._id)} size='20px' />
                                                
                                                     
                                            </CTableDataCell>
                                        </CTableRow>
                                    )
                                ))}
                            </CTableBody>
                        </CTable>
                    </CCardBody>
                    <CPagination aria-label="Page navigation example" align="center" className='mt-2'>
                        <CPaginationItem aria-label="Previous" disabled={paging != 0 ? false : true} onClick={() => paging > 0 && setPaging(paging - 1)}>
                            <span aria-hidden="true">&laquo;</span>
                        </CPaginationItem>
                        <CPaginationItem active onClick={() => setPaging(0)}>{paging + 1}</CPaginationItem>
                        {staff.filter((list) =>
                            list.username === username && list?.FullName?.toLowerCase().includes(Search1.toLowerCase()) && list.EmailAddress.toLowerCase().includes(Search2.toLowerCase())
                            && list?.Gender?.toLowerCase().includes(Search3.toLowerCase()) && list.address.toLowerCase().includes(Search4.toLowerCase()) && list.PayoutType.toLowerCase().includes(Search5.toLowerCase())
                            && list.Department.toLowerCase().includes(Search6.toLowerCase()) && list.JobDesignation.toLowerCase().includes(Search7.toLowerCase()) && list.Grade.toLowerCase().includes(Search8.toLowerCase())
                            && list.Salary.toString().includes(Search9.toString()) && list.ContactNumber.toString().includes(Search10.toString())
                        ).length > (paging + 1) * 10 && <CPaginationItem onClick={() => setPaging(paging + 1)} >{paging + 2}</CPaginationItem>}

                        {staff.filter((list) =>
                            list.username === username && list.FullName.toLowerCase().includes(Search1.toLowerCase()) && list.EmailAddress.toLowerCase().includes(Search2.toLowerCase())
                            && list?.Gender?.toLowerCase().includes(Search3.toLowerCase()) && list.address.toLowerCase().includes(Search4.toLowerCase()) && list.PayoutType.toLowerCase().includes(Search5.toLowerCase())
                            && list.Department.toLowerCase().includes(Search6.toLowerCase()) && list.JobDesignation.toLowerCase().includes(Search7.toLowerCase()) && list.Grade.toLowerCase().includes(Search8.toLowerCase())
                            && list.Salary.toString().includes(Search9.toString()) && list.ContactNumber.toString().includes(Search10.toString())
                        ).length > (paging + 2) * 10 && <CPaginationItem onClick={() => setPaging(paging + 2)}>{paging + 3}</CPaginationItem>}
                        {staff.filter((list) =>
                            list.username === username && list.FullName.toLowerCase().includes(Search1.toLowerCase()) && list.EmailAddress.toLowerCase().includes(Search2.toLowerCase())
                            && list?.Gender?.toLowerCase().includes(Search3.toLowerCase()) && list.address.toLowerCase().includes(Search4.toLowerCase()) && list.PayoutType.toLowerCase().includes(Search5.toLowerCase())
                            && list.Department.toLowerCase().includes(Search6.toLowerCase()) && list.JobDesignation.toLowerCase().includes(Search7.toLowerCase()) && list.Grade.toLowerCase().includes(Search8.toLowerCase())
                            && list.Salary.toString().includes(Search9.toString()) && list.ContactNumber.toString().includes(Search10.toString())
                        ).length > (paging + 1) * 10 ?
                            <CPaginationItem aria-label="Next" onClick={() => setPaging(paging + 1)}>
                                <span aria-hidden="true">&raquo;</span>
                            </CPaginationItem>
                            : <CPaginationItem disabled aria-label="Next" onClick={() => setPaging(paging + 1)}>
                                <span aria-hidden="true">&raquo;</span>
                            </CPaginationItem>
                        }
                    </CPagination>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default EmpRecruitment
