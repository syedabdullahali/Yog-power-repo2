import { cilAccountLogout, cilCheckCircle, cilFingerprint } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton, CCard, CCardBody, CCardHeader, CCardText, CCol, CFormInput, CRow, CTable, 
    CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow ,CCardTitle,
    CListGroupItem,
    CListGroup,
    CFormCheck
} from '@coreui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { MdDelete, MdEdit } from 'react-icons/md'
import moment from 'moment/moment'
const url = 'https://yog-seven.vercel.app'
const url2 = 'https://yog-seven.vercel.app'
import { useSelector } from 'react-redux'

const Attendence = ({ id }) => {
    const [viewInvoice, setViewInvoice] = useState(false);



    const url1 = useSelector((el) => el.domainOfApi)
    const AllowedServcieToAttended =  ['yoga','yoga pt']
    const [attendance, setAttendance] = useState(0);
    const [attendanceID, setAttendanceID] = useState('');
    const [client, setClient] = useState('');
    const [centarId, setCentarId] = useState('');
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');
    const [selectClassCatogary,setClassCatogary] = useState('')
    const [selectedBatches,setSBatch] = useState('')
    const [clientService,setClientService] = useState('')
    const [clientId,setClientId] = useState('')
    const [traner,setTrainerName] = useState('')
    const [invoiceId,setInvoiceId] = useState()
    const [startDate,setStartDate] = useState('')
    const [endDate,setEndDate] = useState('')
    const [duration,setDuration] = useState('')
    const [contact,setContact] = useState('')
    const [pakageName,setPackageName] = useState('')
    const [bacth2,setBatch2] =useState('')
    const [adDuration,setAdDuration] = useState('')
    const [showAttendedForm,setAttendanceForm] = useState(false)

    const time = null;
    const [ctime, setDate] = useState(time);
    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;
    const username = user.user.username;
    const centerCode = user.user.centerCode;
    const [result1, setResult1] = useState([]);
    const [allClient, setAllclient] = useState([]);
    const [batchesData,setBatches] = useState([])

    const headers = {
        'Authorization': `Bearer ${token}`,
        'My-Custom-Header': 'foobar'
    };

   

    const submitBtn = () => {
        if (allClient.filter((list) => list.AttendanceID.includes(attendanceID.trim()) &&
        AllowedServcieToAttended.includes(list.serviceName.toLocaleLowerCase())).length ) {
            allClient.filter((list) =>
                list.AttendanceID.includes(attendanceID.trim()) 
            ).map((data) => (
                console.log(data),
                setClient(data.Fullname),
                setAttendanceID(data.AttendanceID),
                setCentarId(data.CenterID),
                setStatus(data.status),
                setClientService(data.serviceName),
                setClientId(data._id),
                setInvoiceId(data.invoiceId),
                setStartDate(data.startDate),
                setEndDate(data.endDate),
                setDuration(data.duration),
                setContact(data.ContactNumber),
                setPackageName(data.package),
                setBatch2(data.Batch),
                setAdDuration(data.duration),
                setAttendance(1),
                setError('')
            ))
        } else {
            setError('Not Found')
        }
    }



    useEffect(() => {
        getEnquiry()
        getClient()
        getBatch()
    }, []);

    function getEnquiry() {
        axios.get(`${url1}/clientAttendance/all`, {headers})
            .then((res) => {setResult1(res.data.filter((el)=>el.clientId===id).reverse())})
            .catch((error) => {console.error(error)})
    }
    function getClient() {
        axios.get(`${url1}/memberForm/all`, {headers})
       .then((res) => {setAllclient(res.data)})
       .catch((error) => {console.error(error) })
    }
    function getBatch() {
        axios.get(`${url1}/Batch/all`, {headers})
        .then((res) => {setBatches(res.data)})
        .catch((error) => {console.error(error)})
    }

  

   const handelTime = () => {
    let time = new Date().toLocaleTimeString();
    let data = {
         username: username,
         ClientName: client, 
         centerId: centerCode, 
         attentanceId: attendanceID, 
         checkDate: new Date(), 
         checkIn: time,
         batches:selectedBatches,
         category:selectClassCatogary,
         clientId,
         ServiceName: clientService,            
         Group:" ",
         PT:" ",
         Condcuted: traner,       
         package:duration,
         startDate:startDate,
         endDate:endDate,
         contact,
admissionBatch:bacth2,
admissionPackageName:pakageName,
admissionDuration:adDuration
    }

    fetch(`${url1}/clientAttendance/create`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).then((resp) => {
        resp.json().then(() => {
            alert("successfully submitted")
            getEnquiry()
            setAttendance(2)
        })
    })
}

    const CheckOut = (id) => {
        let time2 = new Date().toLocaleTimeString();
        let item = { checkOut: time2 }
        fetch(`${url1}/clientAttendance/update/${id}`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        }).then((result) => {
            result.json().then((resp) => {
                getEnquiry()
            })
        })
    }

   

    console.log(result1)
    

    return (
        <CRow>
            <CCol xs={12}>
                <div className='d-flex justify-content-between mb-2'>
                    <div className='mt-2 ms-2'>
                        <CCardTitle>Attendence </CCardTitle>
                    </div>
                </div>
            </CCol>
  
            
             {showAttendedForm&& <CRow>
                <CCol lg={12} md={12} sm={12} sx={12} className='d-flex justify-content-end py-4' >  
                  <CButton onClick={()=>setAttendanceForm(false)} variant='outline' color='danger'>Close</CButton>
                </CCol>
                <CCol lg={4}>
                        <CCard>
                            
                            <CCardBody>
                                <label style={{ color: 'red' }}>{error}</label>
                                <CRow>
                                    <CCol xs={5}>
                                        <CIcon icon={cilFingerprint} size="8xl" />
                                    </CCol>
                                    <CCol className='mt-4'>
                                        <CFormInput
                                            type="text"
                                            label='Attendance ID'
                                            placeholder="Enter Attendance ID"
                                            value={attendanceID}
                                            onChange={(e) => setAttendanceID(e.target.value)}
                                        />
                                    </CCol>
                                </CRow>
                                <CButton className='mt-1 float-end' onClick={submitBtn}>Submit</CButton>
                            </CCardBody>
                        </CCard>
                    </CCol>
                <CCol lg={4}>
                        <CCard >
                            <h6 className='px-3 pt-1'>Select Types of Classes</h6>
                            <CCardBody>                                            
                                             <CListGroup>
                                                <CListGroupItem>
                                                    {batchesData
                                                    .filter((el)=>el.service_variation.toLocaleLowerCase()
                                                    ===clientService.toLocaleLowerCase() && el.status).reduce((crr,el)=>{
                                                      if(!crr.some((el2)=>el2.category===el.category)){
                                                       crr.push(el) 
                                                      } 
                                                      return crr    
                                                    },[])
                                                    .map((el)=>{                                                     
                                                 return <CFormCheck label={el.category}
                                                        checked={selectClassCatogary===el.category}
                                                        onChange={() =>{setClassCatogary(el.category),setTrainerName(el?.trainer_name)}}/>                                                   
                                                    })}
                                                </CListGroupItem>  
                                        </CListGroup>
                            </CCardBody>
                        </CCard>
                        </CCol>
                        {<CCol lg={4}>  
                        <CCard >
                            <h6 className='px-3 pt-1'>Select  Batch </h6>
                            <CCardBody>
                                       <CListGroup>
                                                <CListGroupItem>
                                                    {batchesData.filter((el)=>el.service_variation.toLocaleLowerCase()===clientService.toLocaleLowerCase() &&
                                                    selectClassCatogary ===el.category
                                                    && el.status)
                                                    .map((el)=>{                                                     
                                                 return <CFormCheck label={ ` ${el?.service_variation}  
                                                                               ${el?.batch_timing}`}
                                                        checked={selectedBatches===el?.batch_timing}
                                                        onChange={() =>setSBatch(el?.batch_timing)}/>                                                   
                                                    })}
                                                </CListGroupItem>                                             
                                        </CListGroup>
                            </CCardBody>
                        </CCard>
                    </CCol>}    
                {attendance >= 1 && selectedBatches  && selectClassCatogary &&
                        <CCol lg={4}>
                            <CCard>
                                <CCardBody>
                                    <CRow>
                                        <CCol xs={5}>

                                            <CIcon icon={cilCheckCircle} size="8xl" />
                                        </CCol>
                                        <CCol className='mt-3'>
                                            <CCardText>Client Name: {client}<br />
                                                Attendance ID: {attendanceID}<br />
                                                Center ID: {centarId}<br />
                                                Status: {status}<br />

                                            </CCardText>
                                        </CCol>
                                    </CRow>
                                    {ctime == null &&
                                        <CButton className='mt-1 float-end' onClick={handelTime}>Check In</CButton>
                                    }
                                </CCardBody>
                            </CCard>
                        </CCol>
                    }
                    {attendance === 2 &&  selectedBatches  && selectClassCatogary &&
                        <CCol lg={4}>
                            <CCard>
                                <CCardBody>
                                    <CRow>
                                        <CCol xs={5} className='mt-2'>
                                            <CIcon icon={cilAccountLogout} size="7xl" />
                                        </CCol>
                                        <CCol className='mt-3'>
                                            <CCardText>Client Name: {client}<br />
                                                Attendance ID: {attendanceID}<br />
                                                Attendance Time: {ctime}
                                            </CCardText>
                                        </CCol>
                                    </CRow>
                                    {ctime != null &&
                                        <CButton className='mt-1 float-end' onClick={() => setAttendance(0)}>Done !</CButton>
                                    }
                                </CCardBody>
                            </CCard>
                        </CCol>
                    }                      
             </CRow>}

            <CCol className='d-flex justify-content-end py-4'>
               <CButton onClick={()=>setAttendanceForm(true)}>Add new Attendence</CButton>
            </CCol>



            <CCol xs={12}>
                <div className='d-flex justify-content-between mb-2'>
                    <div className='mt-2 ms-2'>
                    </div>
                </div>
            </CCol>
            <CCol xs={12}>
                {viewInvoice &&
                    <ViewInvoice add={viewInvoice} clickfun={() => setViewInvoice(false)} invoiceId={invId} clientId={cliId} />
                }
                <CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345" }} hover responsive>
                    <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                        <CTableRow>
                            <CTableHeaderCell scope="col">Sr. No.</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                            <CTableHeaderCell scope="col">
                                Name
                            </CTableHeaderCell>
                            <CTableHeaderCell>Attendance ID</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Mobile</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Service</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Branch</CTableHeaderCell>
                            <CTableHeaderCell scope="col">CheckIn</CTableHeaderCell>
                            <CTableHeaderCell scope="col">CheckOut</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Alert</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Delete</CTableHeaderCell>

                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                    {result1.filter((list) => list.username === username).map((item, index) => (
                            <CTableRow key={index}>
                                <CTableDataCell>{index + 1}</CTableDataCell>
                                <CTableDataCell>{moment(item.checkDate).format("LL")}</CTableDataCell>
                                <CTableDataCell>{item.ClientName}</CTableDataCell>
                                <CTableDataCell>{item.attentanceId}</CTableDataCell>
                                <CTableDataCell>{item.contact}</CTableDataCell>
                                <CTableDataCell>{item.batches}</CTableDataCell>
                                <CTableDataCell>{item.category}</CTableDataCell>
                                <CTableDataCell>{item.checkIn}</CTableDataCell>
                                <CTableDataCell>{item.checkOut}</CTableDataCell>
                                <CTableDataCell>{item.checkOut === undefined ? <CButton color='danger' onClick={() => 
                                    CheckOut(item._id)}>Check Out</CButton> : <CButton disabled color='danger'
                                     onClick={() => CheckOut(item._id)}>Check Out</CButton>}</CTableDataCell>
                                <CTableDataCell>
                                    <MdDelete style={{ cursor: 'pointer', markerStart: '10px' }} 
                                    onClick={() => deleteEnquiry(item._id)} size='20px' /> 

                                    </CTableDataCell>
                            </CTableRow>
                        ))}
                    </CTableBody>
                </CTable>
            </CCol>
        </CRow>
    )
}

export default Attendence