import React, { useEffect, useState,useRef } from 'react'
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
    CInputGroupText,
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
    CModalHeader,
    CModalTitle,
    CModalBody
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowCircleBottom, cilArrowCircleTop, cilInfo } from '@coreui/icons'
import { MdCall, MdDelete, MdEdit, MdMail } from 'react-icons/md';
import { BsPlusCircle, BsWhatsapp } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { useSelector } from 'react-redux'

const EmployeeProfile = React.lazy(()=>import('./Hr-Employee-Details/Tables/EmployeeProfile'))

const url2 = 'https://yog-seven.vercel.app'


const AllEmpProfile = () => {
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

    const [showEditModal,setEditModal] =useState()
    const [id,setId] = useState('')


    const hiddenXLExportFileInput = useRef('')
    const hiddenXLimportFileInput = useRef('')

    

  
  
    // Import 
  
     const HandaleImportClick = () =>{
         hiddenXLimportFileInput.current.click()
     }
     const HandaleImportChange = (event)=>{
      const importXlFile = event.target.files[0];
      // console.log("Import",importXlFile)
     }
    
    // Export 
  
     const HandaleExportClick = () =>{
      hiddenXLExportFileInput.current.click()
     }
     const HandaleExportChange = (event)=>{
      const importXlFile = event.target.files[0];
      // console.log("Export",importXlFile)
     }
  


    let user = JSON.parse(localStorage.getItem('user-info'))
    console.log(user);
    const token = user.token;
    const username = user.user.username;
    const centerCode = user.user.centerCode;
    const [result1, setResult1] = useState([]);
    const [paging, setPaging] = useState(0);
    console.log(token);
    useEffect(() => {
        getStaff()
    }, [])

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
    console.log(staff);

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

    function updateRec(data, status) {
        const data1 =  {...data,...{ status: status }}
        fetch(`${url}/employeeform/${data._id}`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data1)
        }).then((resp) => {
            resp.json().then(() => {
                getStaff()
            })
        })
    }



    function allowToEdit(id){
        setId(id)
        setEditModal(true)
    }




    return (
        <CRow>
              {showEditModal &&<CModal  style={{ border: '2px solid #0B5345' }} 
              visible={showEditModal} size='xl' onClose={()=>setEditModal(false)} scrollable>
            <CModalHeader  >
                <CModalTitle>Edit Form</CModalTitle>
            </CModalHeader>
            <CModalBody>
                {id&&  <EmployeeProfile getStaff2={getStaff} Edit={true} id={id}/>}
            </CModalBody>
              </CModal>}
             
            <CCol lg={12} sm={12}>
                <CCard className="mb-3 border-success">
                    <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                        <CCardTitle className="mt-2">All Employee Profile</CCardTitle>
                    </CCardHeader>
                    <CCardBody>
                        <CRow className='d-flex mb-2'>
                            <CCol lg={6} sm={12} className='mb-2'>
                                <CButtonGroup role="group" aria-label="Basic example">
                                    <CButton color="dark" variant="outline" style={{ fontSize: '13px' }}>Total Employee: {staff.filter((list) => list.username === username).length}</CButton>
                                    <CButton color="dark" variant="outline" style={{ fontSize: '13px' }}>Active Employee: {staff.filter((list) => list.username === username && list.status === true).length}</CButton>
                                    <CButton color="dark" variant="outline" style={{ fontSize: '13px' }}>Left Employee: {staff.filter((list) => list.username === username && list.status === false).length}</CButton>
                                </CButtonGroup>
                            </CCol>
                            <CCol lg={3}></CCol>
                            <CCol lg={3} sm={12}>

                             <CButtonGroup className=' mb-2 float-end'>
                                    <CButton onClick={HandaleImportClick}  color="primary">
                                        <CIcon icon={cilArrowCircleBottom} />
                                        {' '}Import
                                    </CButton>
                                    <CFormInput type='file'
                                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                        ref={hiddenXLimportFileInput}
                                        onChange={HandaleImportChange} hidden />
                                    
                                    <CButton   onClick={HandaleExportClick}color="primary">
                                        <CIcon  icon={cilArrowCircleTop} />
                                        {' '}Export
                                    </CButton>
                                    <CFormInput type='file'
                                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                        ref={hiddenXLExportFileInput}
                                        onChange={HandaleExportChange} hidden />
                            </CButtonGroup>


                            </CCol>
                        </CRow>
                        <CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345", width:'150%'}} hover responsive>
                            <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                                <CTableRow >
                                <CTableHeaderCell>Sr.No</CTableHeaderCell>
                                    <CTableHeaderCell>Name</CTableHeaderCell>
                                    <CTableHeaderCell>Mobile</CTableHeaderCell>
                                    <CTableHeaderCell>Email-ID</CTableHeaderCell>
                                    <CTableHeaderCell>Date Of Birth</CTableHeaderCell>
                                    <CTableHeaderCell>Gender</CTableHeaderCell>
                                    <CTableHeaderCell style={{minWidth:'150px'}}>Emp Id</CTableHeaderCell>
                                    <CTableHeaderCell>Attendance Id</CTableHeaderCell>
                                    <CTableHeaderCell>Department</CTableHeaderCell>
                                    <CTableHeaderCell>Designation</CTableHeaderCell>
                                    <CTableHeaderCell>Emp Right</CTableHeaderCell>
                                    <CTableHeaderCell>Status</CTableHeaderCell>
                                    <CTableHeaderCell>Action</CTableHeaderCell>
                                    <CTableHeaderCell>Edit</CTableHeaderCell>
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
                                            style={{ minWidth: "120px" }}
                                            type="text"
                                            disabled
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
                                            disabled
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
                                            disabled
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
                                   
                                  
                                </CTableRow>
                                {staff.filter((list) =>
                                    list.username === username && list.selected === 'Select' 
                                ).map((item, index) => (
                                    item.username === username && (
                                        <CTableRow key={index}>
                                            <CTableDataCell>{index + 1 + (paging * 10)}</CTableDataCell>
                                            <CTableDataCell><Link style={{textDecoration:'none'}} to={`/hr/employee-detail/${item._id}`}>{item.FullName}</Link></CTableDataCell>
                                            <CTableDataCell>{item.ContactNumber}</CTableDataCell>
                                            <CTableDataCell>{item.EmailAddress}</CTableDataCell>
                                            <CTableDataCell>{moment(item.DateofBirth).format("MM-DD-YYYY")}</CTableDataCell>
                                            <CTableDataCell>{item.Gender}</CTableDataCell>
                                            <CTableDataCell>{item.EmployeeID}</CTableDataCell>
                                            <CTableDataCell>{item.AttendanceID}</CTableDataCell>
                                            <CTableDataCell>{item.Department}</CTableDataCell>
                                            <CTableDataCell>{item.JobDesignation}</CTableDataCell>
                                            <CTableDataCell></CTableDataCell>
                                            <CTableDataCell>{item.status ? <>
                                            <CButton className='mt-1' color='success' onClick={() => updateRec(item, false)} >Active</CButton></>
                                                 : <CButton className='mt-1' color='danger' onClick={() => updateRec(item, true)}>Inactive</CButton>}</CTableDataCell>
                                            <CTableDataCell className='text-center'><a href={`tel:${item.ContactNumber}`} target="_black"><MdCall style={{ cursor: 'pointer', markerStart: '10px' }} size='20px' /></a><a href={`https://wa.me/${item.ContactNumber}`} target="_black"><BsWhatsapp style={{ marginLeft: "4px", cursor: 'pointer', markerStart: '10px' }} size='20px' /></a><a href={`mailto: ${item.EmailAddress}`} target="_black"> <MdMail style={{ cursor: 'pointer', markerStart: '10px', marginLeft: "4px" }} size='20px' /></a></CTableDataCell>
                                            <CTableDataCell className='text-center'>
                                                 <MdEdit style={{ cursor: 'pointer', markerStart: '10px', marginLeft: "5px" }} 
                                                onClick={() =>{allowToEdit(item._id)}} size='20px' />
                                                <MdDelete style={{ cursor: 'pointer', markerStart: '10px', marginLeft: "5px" }} 
                                                onClick={() => deleteEnquiry(item._id)} size='20px' />
                                             
                                                </CTableDataCell>
                                        </CTableRow>
                                    )
                                ))}
                            </CTableBody>
                        </CTable>
                    </CCardBody>
                   
                </CCard>
            </CCol>
        </CRow>
    )
}

export default AllEmpProfile
