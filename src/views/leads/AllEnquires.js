import React, { useEffect, useState, useRef } from 'react'
import {
    CButton,
    CButtonGroup,
    CCard,
    CCardBody,
    CCardHeader,
    CCardTitle,
    CCol,
    CForm,
    CFormInput,
    CFormSelect,
    CFormTextarea,
    CInputGroup,
    CInputGroupText,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CPagination,
    CPaginationItem,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowCircleBottom, cilArrowCircleTop } from '@coreui/icons'
import axios from 'axios'
import { MdCall, MdDelete, MdEdit, MdMail } from 'react-icons/md'
import { BsPlusCircle, BsWhatsapp } from 'react-icons/bs'
import { CountryList } from "src/components/CountryList";
import moment from 'moment/moment'
import { useSelector } from 'react-redux'
import AdmissionForm1 from 'src/components/AdmissionForm1'
import { leadsSuperRight } from '../hr/Rights/rightsValue/crmRightsValue'


const AllEnquires = () => {
    const rightsData = useSelector((el)=>el.empLoyeeRights?.crmRights
    ?.crmLeads?.items?.superRight) 

    const isAdmin = useSelector((el)=>el.isAdmin) 
    const enquiryAdd =  rightsData?.addOn?.includes(leadsSuperRight.allEnquires)
    const enquiryDelete =  rightsData?.delete?.includes(leadsSuperRight.allEnquires)
    const enquiryEdit  =  rightsData?.edit?.includes(leadsSuperRight.allEnquires)




    var currentdate = new Date();
    var day = currentdate.getDate() + '-' + (currentdate.getMonth() + 1) + '-' + currentdate.getFullYear();
    var month = currentdate.getMonth() + '-' + currentdate.getFullYear();
    var year = currentdate.getFullYear();

    const url = useSelector((el) => el.domainOfApi)




    const [select, setSelect] = useState('')
    const [followForm, setFollowForm] = useState('')
    const [followUpData,setFollowUPdata] = useState({})
    const [edit, setEdit] = useState({})
    const [visible1, setVisible1] = useState(false)
    const [admissionForm, setAdmissionForm] = useState(false)
    const [callReport, setCallReport] = useState(false)
    const [visible, setVisible] = useState(false)
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


    const [Name, setName] = useState("");
    const [Contact, setContact] = useState("");
    const [email, setEmail] = useState("");
    const [ServiceName1, setServiceName1] = useState("");
    const [CallStatus1, setCallStatus1] = useState("");
    const [FollowupDate, setFollowupDate] = useState("");
    const [enquiryStage, setEnquiryStage] = useState('')
    const [TimeFollowp, setTimeFollowp] = useState("");
    const [Discussion, setDiscussion] = useState("");
    const [Counseller, setCounseller] = useState("");

    const [Fullname, setFullName] = useState("");
    const [Emailaddress, setEmailAddress] = useState("");
    const [CountryCode, setCountryCode] = useState("");
    const [ContactNumber, setContactNumber] = useState("");
    const [Gander, setGander] = useState("");
    const [DateofBirth, setDateofBirth] = useState("");
    const [address, setAddress] = useState("");
    const [Area, setArea] = useState("");
    const [city, setCity] = useState("");
    const [Profession, setProfession] = useState("");


    const [StaffName, setStaffName] = useState("");
    const [CenterName, setCenterName] = useState("");
    const [CallStatus, setCallStatus] = useState("");
    const [Message, setMessage] = useState("");


    const [person_Name, setperson_Name] = useState("");
    const [Relation, setRelation] = useState("");
    const [CountryCode2, setCountryCode2] = useState("");
    const [ContactNumber2, setContactNumber2] = useState("");


    const [EnquiryDate, setEnquiryDate] = useState("");
    const [ServiceName, setServiceName] = useState("");
    const [Customertype, setCustomertype] = useState("");
    const [enquirytype, setEnquirytype] = useState("");
    const [trialDate, setTrialDate] = useState("");
    const [appointmentDate, setappointmentDate] = useState("");
    const [appointmentTime, setappointmentTime] = useState("");
    const [appointmentfor, setappointmentfor] = useState("");

    const [ServiceVariation, setServiceVariation] = useState("");



    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;
    const username = user.user.username;
    const dashboardAccess = user.user.dashboardAccess;
    const [result1, setResult1] = useState([]);
    console.log(token);
    const [result, setResult] = useState([]);
    const [paging, setPaging] = useState(0);
    const [subservice, setSubservice] = useState([]);

    const [pros, setPros] = useState([])


    const hiddenXLimportFileInput = useRef('')
    const hiddenXLExportFileInput = useRef('')


    useEffect(() => {
        axios.get(`${url}/subservice/all`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                setSubservice(res.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, []);


    // Import 
    const HandaleImportClick = () => {
        hiddenXLimportFileInput.current.click()
    }
    const HandaleImportChange = (event) => {
        const importXlFile = event.target.files[0];
    }


    // Export 
    const HandaleExportClick = () => {
        hiddenXLExportFileInput.current.click()
    }
    const HandaleExportChange = (event) => {
        const importXlFile = event.target.files[0];
    }



    useEffect(() => {
        getEnquiry()
        getStaff()
        axios.get(`${ url }/prospect/all`, {
            headers: {
                'Authorization': `Bearer ${ token }`
            }
        })
            .then((res) => {
                console.warn(res.data.filter((list) => list.status === "prospect"))
                setPros(res.data.filter((list) => list.status === "prospect"))
            })
            .catch((error) => {
                console.error(error)
            })
        axios.get(`${ url }/subservice/all`, {
            headers: {
                'Authorization': `Bearer ${ token }`
            }
        })
            .then((res) => {
                setResult(res.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, []);

    const [staff, setStaff] = useState([])
    function getStaff() {
        axios.get(`${ url }/employeeform`, {
            headers: {
                'Authorization': `Bearer ${ token }`
            }
        })
            .then((res) => {
                setStaff(res.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }





    const saveEnquiry = () => {
        let data = {
            username: username,
            Fullname, Emailaddress, ContactNumber, Gander, DateofBirth, address, Area, city, Profession,
            StaffName, CenterName, CallStatus, Message,
            person_Name, Relation, ContactNumber2: ContactNumber2,
            EnquiryDate, ServiceName, Customertype, enquirytype, appointmentDate,
            appointmentTime, appointmentfor: appointmentfor, Counseller: staff.find((el)=>el._id===Counseller)?.FullName ,
            trialDate: trialDate, status: "all_enquiry",
            EmployeeId:Counseller
        }

        fetch(`${ url }/enquiryForm/update/${ edit?._id }`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${ token }`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then((resp) => {
            resp.json().then(() => {
                 getEnquiry()
                alert("successfully submitted")
                setVisible1(false)
            })
        })
    }





    const saveProspect = () => {
        var currentdate = new Date();
        var date = currentdate.getDay() + "-" + currentdate.getMonth()
            + "-" + currentdate.getFullYear();
        var time =
            + currentdate.getHours() + ":"
            + currentdate.getMinutes();

        if (enquiryStage === 'Appointment') {
            const data1 = { appointmentDate, appointmentTime, appointmentfor: 'Appointment',
             Counseller: staff.find((el)=>el._id===Counseller)?.FullName }
            let data2 = {
                username: username,
                EnquiryID: followForm, CallDate: date, Time: time,
                Name: Name, Contact: Contact, Email: email, 
                ServiceName: ServiceName1, AppointmentDate: appointmentDate,
                 AppointmentTime: appointmentTime, enquiryStage: enquiryStage, 
                 CallStatus: CallStatus1, FollowupDate: FollowupDate,
                  TimeFollowp: TimeFollowp, Counseller: staff.find((el)=>el._id===Counseller)?.FullName, Discussion: Discussion,
                status: 'CallReport'
            }

            fetch(`${ url }/enquiryForm/update/${ followForm }`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${ token }`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({...data1,...data2})
            }).then((resp) => {
                resp.json().then(() => {
                    alert("successfully submitted")
                    getEnquiry()
                    setVisible(false)
                })
            })


            fetch(`${ url }/prospect/create`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${ token }`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data2)
            }).then((resp) => {
                resp.json().then(() => {
                    setCallReport(false)
                })
            })

        } else if (enquiryStage === 'Trial Session') {
            const data1 = { appointmentDate, appointmentTime, appointmentfor: 'Trial Session', Counseller: Counseller }
            let data2 = {
                username: username,
                EnquiryID: followForm, CallDate: date, Time: time,
                Name: Name, Contact: Contact, Email: email, ServiceName:
                 ServiceName1, AppointmentDate: appointmentDate, AppointmentTime:
                  appointmentTime, enquiryStage: enquiryStage, CallStatus: CallStatus1, 
                  FollowupDate: FollowupDate, TimeFollowp: TimeFollowp, 
                  Counseller: staff.find((el)=>el._id===Counseller)?.FullName, Discussion: Discussion,
                status: 'CallReport',
                EmployeeId:Counseller
            }

            fetch(`${ url }/enquiryForm/update/${followForm}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${ token }`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data1)
            }).then((resp) => {
                resp.json().then(() => {
                    alert("successfully submitted")
                    setVisible(false)
                })
            })

            fetch(`${ url }/prospect/create`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${ token }`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({...data1,...data2})
            }).then((resp) => {
                resp.json().then(() => {
                    getEnquiry()
                    setCallReport(false)
                })
            })
        } else if (enquiryStage === 'Not interested') {
               

            const data1 = {appointmentfor: 'Not interested', Counseller:staff.find((el)=>el._id===Counseller)?.FullName }
            let data2 = {
                username: username,
                EnquiryID: followForm, CallDate: date, Time: time,
                Name: Name, Contact: Contact, Email: email, ServiceName:
                 ServiceName1, enquiryStage: enquiryStage, CallStatus: "Cold", 
                  Counseller: staff.find((el)=>el._id===Counseller)?.FullName, Discussion: Discussion,
                status: 'CallReport'
            }

            fetch(`${ url }/enquiryForm/update/${ followForm }`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${ token }`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({...data1,...data2})
            }).then((resp) => {
                resp.json().then((res) => {
                    alert("successfully submitted")
                    getEnquiry()
                    setVisible(false)
                })
            })

            fetch(`${ url }/prospect/create`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${ token }`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data2)
            }).then((resp) => {
                resp.json().then(() => {
                    setCallReport(false)
                    getEnquiry()
                })
            })
        } 
        
        
        else if (enquiryStage === 'Join') {
            handleAdmission({...followUpData,type:'top'})
            setVisible(false)
            
            let data2 = {
                username: username,
                EnquiryID: followForm, CallDate: date, Time: time,
                Name: Name, Contact: Contact, Email: email,
                 ServiceName: ServiceName1, 
                 AppointmentDate: appointmentDate,
                  AppointmentTime: appointmentTime, enquiryStage: enquiryStage,
                   CallStatus: CallStatus1, FollowupDate: FollowupDate, 
                   TimeFollowp: TimeFollowp, Counseller: staff.find((el)=>el._id===Counseller)?.FullName, Discussion: Discussion,
                status: 'CallReport'
            }
            fetch(`${ url }/prospect/create`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${ token }`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({...data2})
            }).then((resp) => {
                resp.json().then(() => {
                    getEnquiry()
                    setCallReport(false)
                })
            })
        } else if (enquiryStage === 'Prospect') {
            let data = {
                username: username,
                EnquiryID: followForm, CallDate: date, Time: time,
                Name: Name, Contact: Contact, Email: email,
                 ServiceName: ServiceName1, AppointmentDate: appointmentDate,
                  AppointmentTime: appointmentTime, enquiryStage: enquiryStage,
                   CallStatus: CallStatus1, FollowupDate: FollowupDate, TimeFollowp:
                    TimeFollowp, Counseller: Counseller, Discussion: Discussion,
                status: 'prospect'
            }
            let data2 = {
                username: username,
                EnquiryID: followForm, CallDate: date, Time: time,
                Name: Name, Contact: Contact, Email: email, ServiceName: ServiceName1, AppointmentDate: appointmentDate, AppointmentTime: appointmentTime, enquiryStage: enquiryStage, CallStatus: CallStatus1, FollowupDate: FollowupDate, TimeFollowp: TimeFollowp, Counseller: Counseller, Discussion: Discussion,
                status: 'CallReport'
            }
            if (pros.filter((list) => list.EnquiryID === followForm).length > 0) {
                const found = pros.filter((list) => list.EnquiryID === followForm).map((element, index) => {
                    return index === 0 && element._id;
                });
                fetch(`${ url }/prospect/update/${ found[0] }`, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${ token }`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({...data,...data2})
                }).then((resp) => {
                    resp.json().then(() => {
                        getEnquiry()
                        setVisible(false)
                    })
                })

                const data1 = { Counseller, CallStatus: CallStatus1 }

                fetch(`${ url }/enquiryForm/update/${ followForm }`, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${ token }`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data1)
                }).then((resp) => {
                    resp.json().then(() => {
                        alert("successfully submitted")
                        getEnquiry()
                        setVisible(false)
                    })
                })
            } else {
                fetch(`${ url }/prospect/create`, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${ token }`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                }).then((resp) => {
                    resp.json().then(() => {
                        getEnquiry()
                        setVisible(false)
                    })
                })

                const data1 = { EmployeeId:Counseller,Counseller:staff.find((el)=>el._id===Counseller)?.FullName , CallStatus: CallStatus1 }

                fetch(`${ url }/enquiryForm/update/${ followForm }`, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${ token }`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data1)
                }).then((resp) => {
                    resp.json().then(() => {
                        alert("successfully submitted")
                        setVisible(false)
                        getEnquiry()
                    })
                })
            }
            fetch(`${ url }/prospect/create`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${ token }`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data2)
            }).then((resp) => {
                resp.json().then(() => {
                    setCallReport(false)
                    getEnquiry()
                })
            })

        }

    }
    console.log(select)
    const saveCallReport = () => {
        var currentdate = new Date();
        var date = currentdate.getDay() + "-" + currentdate.getMonth()
            + "-" + currentdate.getFullYear();
        var time =
            + currentdate.getHours() + ":"
            + currentdate.getMinutes();
        let data = {
            username: username,
            EnquiryID: followForm, CallDate: date, Time: time,
            Name: Name, Contact: Contact, Email: email, ServiceName:
             ServiceName1, CallStatus: CallStatus1, FollowupDate: 
             FollowupDate, TimeFollowp: TimeFollowp, Counseller: staff.find((el)=>el._id===Counseller)?.FullName,
              Discussion: Discussion,EmployeeId:Counseller,
             
            status: 'CallReport'
        }

        fetch(`${ url }/prospect/create`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${ token }`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then((resp) => {
            resp.json().then(() => {
                setCallReport(false)
            })
        })
        const data1 = { Counseller }

        fetch(`${ url}/enquiryForm/update/${ followForm }`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${ token }`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data1)
        }).then((resp) => {
            resp.json().then(() => {
                alert("successfully submitted")
                setVisible(false)
                getEnquiry()
            })
        })
    }
    const [ogList, setOgList] = useState([])
    function getEnquiry() {
        axios.get(`${ url }/enquiryForm/all`, {
            headers: {
                'Authorization': `Bearer ${ token }`
            }
        })
            .then((res) => {
                setResult1(res.data.reverse())
                setOgList(res.data.reverse())
            })
            .catch((error) => {
                console.error(error)
            })

    }
    function handleAdmission(data) {
        setEdit(data)
    }
    
    function getUpdate(data) {
       
                setFullName(data.Fullname)
                setEmailAddress(data.Emailaddress)
                setCountryCode(+data.CountryCode)
                setContactNumber(data.ContactNumber)
                setGander(data.Gander)
                setDateofBirth(moment(data.DateofBirth).utc().format('YYYY-MM-DD'))
                setAddress(data.address)
                setArea(data.Area)
                setCity(data.city)
                setProfession(data.Profession)
                setStaffName(data.StaffName)
                setCenterName(data.CenterName)
                setCallStatus(data.CallStatus)
                setMessage(data.Message)
                setperson_Name(data.person_Name)
                setRelation(data.Relation)
                setCountryCode2(data.CountryCode2)
                setContactNumber2(data.ContactNumber2)
                setEnquiryDate(data.EnquiryDate)
                setServiceName(data.ServiceName)
                setCustomertype(data.Customertype)
                setEnquirytype(data.enquirytype)
                setappointmentDate(moment(data.appointmentDate).utc().format('YYYY-MM-DD'))
                setappointmentTime(data.appointmentTime)
                setappointmentfor(data.appointmentfor)
                setVisible1(true)
    }
    function getProspect(id) {
        axios.get(`${ url }/enquiryForm/${ id }`, {
            headers: {
                'Authorization': `Bearer ${ token }`
            }
        })
            .then((res) => {
                setName(res.data.Fullname)
                setContact(res.data.ContactNumber)
                setServiceName1(res.data.ServiceName)
                setCallStatus1(res.data.CallStatus)
                setEmail(res.data.Emailaddress)
                setVisible(true)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    function getCallReport(id) {
        axios.get(`${ url }/enquiryForm/${ id }`, {
            headers: {
                'Authorization': `Bearer ${ token }`
            }
        })
            .then((res) => {
                setName(res.data.Fullname)
                setContact(res.data.ContactNumber)
                setServiceName1(res.data.ServiceName)
                setCallStatus1(res.data.CallStatus)
                setEmail(res.data.Emailaddress)
                setCallReport(true)
            })
            .catch((error) => {
                console.error(error)
            })
    }



    function deleteEnquiry(id) {
        if (confirm('Do you want to delete this')) {
            fetch(`${ url }/enquiryForm/delete/${ id }`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${ token }`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then((result) => {
                result.json().then((resp) => {
                    getEnquiry()
                })
            })
        }
    }
    const [filterBy, setFilterBy] = useState('')
    const [subFilter, setSubFilter] = useState('')
    const [arr, setArr] = useState([])
    function getUnique(arr, index) {
        const unique = arr
            .map(e => e[index])
            // store the keys of the unique objects
            .map((e, i, final) => final.indexOf(e) === i && i)
            // eliminate the dead keys & store unique objects
            .filter(e => arr[e]).map(e => arr[e]);
        return unique;
    }
    function filterArr(og, v) {
        if (v === '')
            setResult1(og)
        else
            setResult1(og.filter((list) => list[filterBy] === v))
    }
    const handleFollowup = (id,item) => {
        setFollowForm(id)
        getProspect(id)
        setFollowUPdata(item)

    }

    const handleCallReport = (id) => {
        setFollowForm(id)
        getCallReport(id)
    }

    function handleEnquiry(item) {
        setEdit(item)
        getUpdate(item)
    }
    const [dateFormat, setDateFormat] = useState('DD-MM-YYYY')

    const dateFilter = (e) => {
        const { value } = e.target
        if (value === day) {
            setDateFormat('DD-MM-YYYY')
            setSelect(day)
        } else if (value === month) {
            setDateFormat('MM-DD-YYYY')
            setSelect(month)
        } else {
            setDateFormat('YYYY')
            setSelect(year)
        }
    }




    useEffect(()=>{
        if(edit?._id){
            setAdmissionForm(true)           
        }
    },[edit?._id,edit.type])


    function closeAddmisionForm (valBol) {
        setAdmissionForm(valBol)
        setEdit({})
    }

    
    return (
        <CRow>
             {admissionForm&& <AdmissionForm1 add={admissionForm}  setAdmissionForm={closeAddmisionForm} ids={edit} />}

            <CCol lg={12} sm={12}>
                <CCard className='mb-3 border-top-success border-top-3'>
                    <CCardHeader>
                        <strong className="mt-2">All Enquires <span className='float-end'>Total Enquires: 
                        {result1.filter((list) => list.username === username ).length}
                        </span></strong>
                    </CCardHeader>
                    <CCardBody>
                        <CRow className='d-flex justify-content-between'>
                            <CCol lg={4} sm={6} md={6}>
                                <CInputGroup className='mb-2'>
                                    <CFormSelect
                                        id="inputGroupSelect04"
                                        aria-label="Example select with button addon"
                                        value={select}
                                        onChange={(e) => dateFilter(e)}
                                    >
                                        <option value=''>All Year</option>
                                        <option value={day}>Today</option>
                                        <option value={month}>Last Month</option>
                                        <option value={year}>This Year</option>
                                        {/* <option>Last Week</option>
                                        <option>Custom Date</option> */}
                                    </CFormSelect>
                                    {select === 'Custom Date' && (
                                        <CInputGroup className='mt-2 mb-2' >

                                            <CInputGroupText
                                                component="label"
                                                htmlFor="inputGroupSelect01"
                                            >
                                                Form
                                            </CInputGroupText>
                                            <CFormInput
                                                type="date"
                                                required
                                            /><CInputGroupText
                                                component="label"
                                                htmlFor="inputGroupSelect01"
                                            >
                                                To
                                            </CInputGroupText>
                                            <CFormInput
                                                type="date"
                                                required
                                            />
                                            <CButton type="button" color="primary">
                                                Go
                                            </CButton>
                                        </CInputGroup>

                                    )}

                                </CInputGroup>
                            </CCol>
                            <CCol lg={6} sm={6} md={6}>
                                <CButtonGroup className=' mb-2 float-end'>
                                    <CButton onClick={HandaleImportClick} color="primary">
                                        <CIcon icon={cilArrowCircleBottom} />
                                        {' '}Import
                                    </CButton>
                                    <CFormInput type='file'
                                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                        ref={hiddenXLimportFileInput}
                                        onChange={HandaleImportChange} hidden />

                                    <CButton onClick={HandaleExportClick} color="primary">
                                        <CIcon icon={cilArrowCircleTop} />
                                        {' '}Export
                                    </CButton>
                                    <CFormInput type='file'
                                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                        ref={hiddenXLExportFileInput}
                                        onChange={HandaleExportChange} hidden />
                                </CButtonGroup>
                            </CCol>
                        </CRow>
                        <CRow className='d-flex justify-content-between mb-2'>
                            <CCol lg={4} sm={12} md={12} className='mb-2'>
                                <CCard>
                                    <CCardHeader className='d-flex justify-content-center'>
                                        Enquiries
                                    </CCardHeader>
                                    <CCardBody className='d-flex justify-content-around'>
                                        <CCard style={{ margin: "2px" }}>
                                            <CCardBody style={{ padding: "5px" }}>
                                            Open qry: {result1.filter((list) =>
                                                    list.username === username &&
                                                    moment(list.createdAt).format("MM-DD-YYYY").includes(select) 
                                                    && list.status === 'all_enquiry' && list.enquirestatus!=='notshow'
                                                ).length}
                                            </CCardBody>
                                        </CCard>
                                        <CCard style={{ margin: "2px" }}>
                                            <CCardBody style={{ padding: "5px" }}>
                                                Converted: {result1.filter((list) =>
                                                    list.username === username &&
                                                     moment(list.createdAt).format("MM-DD-YYYY").includes(select) &&  
                                                      list.enquirestatus==='notshow'
                                                     ).length}
                                            </CCardBody>
                                        </CCard>
                                        <CCard style={{ margin: "2px" }}>
                                            <CCardBody style={{ padding: "5px" }}>
                                                Cold: {result1.filter((list) =>
                                                    list.username === username && moment(list.createdAt).format("MM-DD-YYYY").includes(select) && list.CallStatus === 'Cold'
                                                ).length}
                                            </CCardBody>
                                        </CCard>
                                    </CCardBody>
                                </CCard>
                            </CCol>
                            <CCol lg={4} sm={12} md={12} className='mb-2'>
                                <CCard>
                                    <CCardHeader className='d-flex justify-content-center'>
                                        Follow Up
                                    </CCardHeader>
                                    <CCardBody className='d-flex justify-content-around'>
                                        <CCard style={{ margin: "2px" }}>
                                            <CCardBody style={{ padding: "5px" }}>
                                                FollowUps: {pros.filter((list) =>
                                                    list.username === username && list.status === 'prospect'
                                                ).length}
                                            </CCardBody>
                                        </CCard>
                                        <CCard style={{ margin: "2px" }}>
                                            <CCardBody style={{ padding: "5px" }}>
                                                Trial: {result1.filter((list) =>
                                                    list.username === username && list.appointmentfor === 'Trial Session'
                                                ).length}
                                            </CCardBody>
                                        </CCard>
                                        <CCard style={{ margin: "2px" }}>
                                            <CCardBody style={{ padding: "5px" }}>
                                                Appointment: {result1.filter((list) =>
                                                    list.username === username && list.appointmentfor === 'Appointment'
                                                ).length}
                                            </CCardBody>
                                        </CCard>
                                    </CCardBody>
                                </CCard>
                            </CCol>
                            <CCol lg={4} sm={12} md={12} className='mb-2'>
                                <CCard>
                                    <CCardHeader className='d-flex justify-content-center'>
                                        Trials
                                    </CCardHeader>
                                    <CCardBody className='d-flex justify-content-around'>
                                        <CCard style={{ margin: "2px" }}>
                                            <CCardBody style={{ padding: "5px" }}>
                                                Trial Scheduled: {result1.filter((list) =>
                                                    list.username === username && list.appointmentfor === 'Trial Session'
                                                ).length}
                                            </CCardBody>
                                        </CCard>
                                        <CCard style={{ margin: "2px" }}>
                                            <CCardBody style={{ padding: "5px" }}>
                                                Completed: {result1.filter((list) =>
                                                    list.username === username && list.status === 'trailComplete'
                                                ).length}
                                            </CCardBody>
                                        </CCard>
                                        <CCard style={{ margin: "2px" }}>
                                            <CCardBody style={{ padding: "5px" }}>
                                                Converted: {result1.filter((list) =>
                                                    list.username === username && list.status === 'trailConverted'
                                                ).length}
                                            </CCardBody>
                                        </CCard>
                                    </CCardBody>
                                </CCard>
                            </CCol>
                            <CCol xs={3}>
                                <CFormSelect
                                    className="mb-1"
                                    aria-label="Select Service Name"
                                    value={filterBy}
                                    onChange={(e) => { setFilterBy(e.target.value); setArr(getUnique(ogList, e.target.value)) }}
                                    label="Filter By"
                                >
                                    <option value=''>Select</option>
                                    <option value='Counseller'>Counseller </option>
                                    <option value='enquirytype'>Lead Sources </option>
                                    <option value='appointmentfor'>Enquiry Stage </option>
                                    <option value='Message'>Last Call Status </option>
                                    <option value='ServiceName'>Services Name </option>
                                    <option value='Customertype'>Customer Type </option>
                                    <option value='Enquiry type'>Enquiry type </option>
                                    <option value='CallStatus'>Call Tag </option>
                                    <option value='Gander'>Gender</option>
                                </CFormSelect>
                            </CCol>
                            <CCol xs={3}>
                                <CFormSelect
                                    className="mb-1"
                                    aria-label="Select Service Name"
                                    value={subFilter}
                                    onChange={(e) => { setSubFilter(e.target.value); filterArr(ogList, e.target.value) }}
                                    label="Sub-filter"

                                >
                                    <option value=''>Select</option>
                                    {arr.filter((list) => list[filterBy] != '').map((item, index) => (
                                        <option key={index} value={item.id}>{item[filterBy]}</option>
                                    ))}
                                </CFormSelect>
                            </CCol>
                            <CCol></CCol>
                        </CRow>
                      

                        <CModal size='lg' style={{ border: '2px solid #0B5345' }} visible={callReport} color='' onClose={() => setCallReport(false)} >
                            <CModalHeader  >
                                <CModalTitle>Call Report</CModalTitle>
                            </CModalHeader>
                            <CModalBody>
                                <CForm >
                                    <CRow>
                                        <CCol lg={4} md={6} sm={12}>
                                            <CFormInput
                                                className="mb-1"
                                                type="text"
                                                id="exampleFormControlInput1"
                                                label="Name"
                                                value={Name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Enter Name"
                                            />
                                        </CCol>
                                        <CCol lg={4} md={6} sm={12}>
                                            <CFormInput
                                                className="mb-1"
                                                type="email"
                                                id="exampleFormControlInput1"
                                                label="Email Address"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="name@example.com"
                                                aria-describedby="exampleFormControlInputHelpInline"
                                            />
                                        </CCol>

                                        <CCol lg={4} md={6} sm={12}>
                                            <CFormInput
                                                className="mb-1"
                                                type="number"
                                                value={Contact}
                                                onChange={(e) => setContact(e.target.value)}
                                                id="exampleFormControlInput1"
                                                label="Contact No"
                                                placeholder="Enter Number"
                                            />
                                        </CCol>
                                        <CCol lg={6} md={6} sm={12}>
                                            <CFormSelect
                                                className="mb-1"
                                                aria-label="Select Service Name"
                                                value={ServiceName1}
                                                onChange={(e) => setServiceName1(e.target.value)}
                                                label="Service Name"

                                            >
                                                <option>Select Service</option>
                                                {result.map((item, index) => (
                                                    item.username === username && (
                                                        item.status === true && (
                                                            <option key={index} value={item.id}>{item.selected_service}</option>
                                                        )
                                                    )
                                                ))}
                                            </CFormSelect>
                                        </CCol>
                                        <CCol lg={6} md={6} sm={12}>
                                            <CFormSelect
                                                className="mb-1"
                                                aria-label="Select Assign Staff"
                                                value={Counseller}
                                                onChange={(e) => setCounseller(e.target.value)}
                                                label='Counseller'
                                            >
                                                <option>Select Counseller</option>
                                                {staff.filter((list) => list.username === username && list.Department.toLowerCase() === 'sales' && 
                                                list.selected === 'Select').map((item, index) => (
                                                    item.username === username && (
                                                        <option key={index} value={item._id}>{item.FullName}</option>
                                                    )
                                                ))}
                                            </CFormSelect>
                                        </CCol>

                                        <CCol lg={4} md={6} sm={12}>
                                            <CFormSelect
                                                className="mb-1"
                                                aria-label="Select Call Status"
                                                value={CallStatus1}
                                                onChange={(e) => setCallStatus1(e.target.value)}
                                                label="Call Status"
                                                options={[
                                                    "Select",
                                                    { label: "Cold", value: "Cold" },
                                                    { label: "Warm", value: "Warm" },
                                                    { label: "Hot", value: "Hot" },
                                                ]}
                                            />
                                        </CCol>
                                        <CCol lg={4} md={6} sm={12}>
                                            <CFormInput
                                                className="mb-1"
                                                label="FollowUp Date"
                                                type="date"
                                                value={FollowupDate}
                                                onChange={(e) => setFollowupDate(e.target.value)}
                                                id="exampleFormControlInput1"
                                            />
                                        </CCol>
                                        <CCol lg={4} md={6} sm={12}>
                                            <CFormInput
                                                className="mb-1"
                                                label="FollowUp Time"
                                                type="time"
                                                id="exampleFormControlInput1"
                                                value={TimeFollowp}
                                                onChange={(e) => setTimeFollowp(e.target.value)}

                                            />
                                        </CCol>
                                        <CCol>
                                            <CFormTextarea
                                                id="exampleFormControlTextarea1"
                                                label="Discussion"
                                                value={Discussion}
                                                onChange={(e) => setDiscussion(e.target.value)}
                                                rows="2"
                                                text="Must be 8-20 words long."
                                            ></CFormTextarea>
                                        </CCol>
                                    </CRow>
                                </CForm>
                            </CModalBody>
                            <CModalFooter>
                                <CButton color="secondary" onClick={() => setCallReport(false)}>
                                    Close
                                </CButton>
                                <CButton type='submit' color="primary" onClick={() => saveCallReport()}>Save Call Report</CButton>
                            </CModalFooter>
                        </CModal>

                        <CModal size='lg'  style={{ border: '2px solid #0B5345' }} visible={visible} color='' onClose={() => setVisible(false)} >
                            <CModalHeader style={{ backgroundColor: '#0B5345', color: 'white' }} >
                                <CModalTitle>Prospect Form</CModalTitle>
                            </CModalHeader>
                            <CModalBody>
                                <CForm >
                                    <CRow>
                                        <CCol lg={4} md={6} sm={12}>
                                            <CFormInput
                                                className="mb-1"
                                                type="text"
                                                id="exampleFormControlInput1"
                                                label="Name"
                                                value={Name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Enter Name"
                                            />
                                        </CCol>
                                        <CCol lg={4} md={6} sm={12}>
                                            <CFormInput
                                                className="mb-1"
                                                type="email"
                                                id="exampleFormControlInput1"
                                                label="Email Address"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="name@example.com"
                                                aria-describedby="exampleFormControlInputHelpInline"
                                            />
                                        </CCol>

                                        <CCol lg={4} md={6} sm={12}>
                                            <CFormInput
                                                className="mb-1"
                                                type="number"
                                                value={Contact}
                                                onChange={(e) => setContact(e.target.value)}
                                                id="exampleFormControlInput1"
                                                label="Contact No"
                                                placeholder="Enter Number"
                                            />
                                        </CCol>
                                        <CCol lg={4} md={6} sm={12}>
                                            <CFormSelect
                                                className="mb-1"
                                                aria-label="Select Service Name"
                                                value={ServiceName1}
                                                onChange={(e) => setServiceName1(e.target.value)}
                                                label="Service Name"

                                            >
                                                <option>Select Service</option>
                                                {result.map((item, index) => (
                                                    item.username === username && (
                                                        item.status === true && (
                                                            <option key={index} value={item.id}>{item.selected_service}</option>
                                                        )
                                                    )
                                                ))}
                                            </CFormSelect>
                                        </CCol>
                                        <CCol lg={4} md={6} sm={12}>

                                            <CFormSelect
                                                className="mb-1"
                                                aria-label="Select Assign Staff"
                                                value={Counseller}
                                                onChange={(e) => setCounseller(e.target.value)}
                                                label='Counseller'
                                            >
                                                <option>Select Counseller</option>
                                                {staff.filter((list) => list.username === username && list.selected === 'Select').map((item, index) => (
                                                    item.username === username && (
                                                        <option key={index} value={item._id}>{item.FullName}</option>
                                                    )
                                                ))}</CFormSelect>
                                        </CCol>
                                        <CCol lg={4} md={6} sm={12}>
                                            <CFormSelect
                                                className="mb-1"
                                                aria-label="Select Call Status"
                                                value={enquiryStage}
                                                onChange={(e) => setEnquiryStage(e.target.value)}
                                                label="Prospect Stage"
                                                options={[
                                                    "Select",
                                                    { label: 'Prospect', value: 'Prospect' },
                                                    { label: "Appointment", value: "Appointment" },
                                                    { label: "Trial Session", value: "Trial Session" },
                                                    { label: "Join", value: "Join" },
                                                    { label: 'Not Interested', value: 'Not interested' },

                                                ]}
                                            />
                                        </CCol>

                                        {(enquiryStage === 'Appointment') &&
                                            <>
                                                <CCol lg={4} md={6} sm={12}>
                                                    <CFormInput
                                                        className="mb-1"
                                                        label="Appointment Date"
                                                        type="date"
                                                        value={appointmentDate}
                                                        onChange={(e) => setappointmentDate(e.target.value)}
                                                        id="exampleFormControlInput1"
                                                    />
                                                </CCol>
                                                <CCol lg={4} md={6} sm={12}>
                                                    <CFormInput
                                                        className="mb-1"
                                                        label="Appointment Time"
                                                        type="time"
                                                        id="exampleFormControlInput1"
                                                        value={appointmentTime}
                                                        onChange={(e) => setappointmentTime(e.target.value)}

                                                    />
                                                </CCol>
                                            </>
                                        }
                                        {(enquiryStage === 'Trial Session') &&
                                            <>
                                                <CCol lg={4} md={6} sm={12}>
                                                    <CFormInput
                                                        className="mb-1"
                                                        label="Trial Date"
                                                        type="date"
                                                        value={appointmentDate}
                                                        onChange={(e) => setappointmentDate(e.target.value)}
                                                        id="exampleFormControlInput1"
                                                    />
                                                </CCol>
                                                <CCol lg={4} md={6} sm={12}>
                                                    <CFormInput
                                                        className="mb-1"
                                                        label="Trial Time"
                                                        type="time"
                                                        id="exampleFormControlInput1"
                                                        value={appointmentTime}
                                                        onChange={(e) => setappointmentTime(e.target.value)}

                                                    />
                                                </CCol>
                                            </>
                                        }
                                        {enquiryStage != 'Join' && enquiryStage != 'Not interested'&&

                                            <CCol lg={4} md={6} sm={12}>
                                                <CFormSelect
                                                    className="mb-1"
                                                    aria-label="Select Call Status"
                                                    value={CallStatus1}
                                                    onChange={(e) => setCallStatus1(e.target.value)}
                                                    label="Call Status"
                                                    options={[
                                                        "Select",
                                                        { label: "Cold", value: "Cold" },
                                                        { label: "Warm", value: "Warm" },
                                                        { label: "Hot", value: "Hot" },
                                                    ]}
                                                />
                                            </CCol>
                                        }
                                        {(enquiryStage === 'Prospect') &&
                                            <>

                                                <CCol lg={4} md={6} sm={12}>
                                                    <CFormInput
                                                        className="mb-1"
                                                        label="FollowUp Date"
                                                        type="date"
                                                        value={FollowupDate}
                                                        onChange={(e) => setFollowupDate(e.target.value)}
                                                        id="exampleFormControlInput1"
                                                    />
                                                </CCol>
                                                <CCol lg={4} md={6} sm={12}>
                                                    <CFormInput
                                                        className="mb-1"
                                                        label="FollowUp Time"
                                                        type="time"
                                                        id="exampleFormControlInput1"
                                                        value={TimeFollowp}
                                                        onChange={(e) => setTimeFollowp(e.target.value)}

                                                    />
                                                </CCol>
                                            </>
                                        }
                                        {enquiryStage === 'Prospect' &&
                                            <CCol lg={12} md={12} sm={12}>
                                                <CFormTextarea
                                                    id="exampleFormControlTextarea1"
                                                    label="Discussion"
                                                    value={Discussion}
                                                    onChange={(e) => setDiscussion(e.target.value)}
                                                    rows="2"
                                                    text="Must be 8-20 words long."
                                                ></CFormTextarea>
                                            </CCol>
                                        }
                                    </CRow>
                                </CForm>
                            </CModalBody>
                            <CModalFooter>
                                <CButton color="secondary" onClick={() => setVisible(false)}>
                                    Close
                                </CButton>
                                <CButton type='submit' color="primary" onClick={() => saveProspect()}>{
                                    enquiryStage === 'Join' ? 'Open Admission Form' : 'Save'}</CButton>
                            </CModalFooter>
                        </CModal>






                        <CModal size="xl" scrollable alignment="center" visible={visible1} onClose={() => setVisible1(false)}>
                            <CModalHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                                <CModalTitle>Enquiry Form</CModalTitle>
                            </CModalHeader>
                            <CModalBody>
                                <CForm >
                                    <CRow>
                                        <CCol lg={6} sm={12}>
                                            <CCardTitle>Personal Details</CCardTitle>
                                            <CRow>
                                                <CCol lg={6} md={6} sm={12}>
                                                    <CFormInput
                                                        className="mb-1"
                                                        type="text"
                                                        id="exampleFormControlInput1"
                                                        label="Full name"
                                                        value={Fullname}
                                                        onChange={(e) => setFullName(e.target.value)}
                                                        placeholder="Enter Name"
                                                    />
                                                </CCol>
                                                <CCol lg={6} md={6} sm={12}>
                                                    <CFormInput
                                                        className="mb-1"
                                                        type="email"
                                                        id="exampleFormControlInput1"
                                                        label="Email address"
                                                        value={Emailaddress}
                                                        onChange={(e) => setEmailAddress(e.target.value)}
                                                        placeholder="name@example.com"
                                                        text="Must be 8-20 characters long."
                                                        aria-describedby="exampleFormControlInputHelpInline"
                                                    />
                                                </CCol>
                                            </CRow>
                                            <CRow>
                                                <CCol lg={6} md={6} sm={12}>
                                                    <CFormSelect
                                                        className="mb-1"
                                                        aria-label="Select Currency"
                                                        label="Country Code"
                                                        value={CountryCode}
                                                        onChange={(e) => setCountryCode(e.target.value)}

                                                    >{CountryList.map((item, index) => (
                                                        <option key={index} value={item.dial_code}>{item.name} {item.dial_code}</option>
                                                    ))}
                                                    </CFormSelect>
                                                </CCol>
                                                <CCol lg={6} md={6} sm={12}>
                                                    <CFormInput
                                                        className="mb-1"
                                                        type="number"
                                                        value={ContactNumber}
                                                        onChange={(e) => setContactNumber(e.target.value)}
                                                        id="exampleFormControlInput1"
                                                        label="Contact Number"
                                                        placeholder="Enter Number"
                                                    />
                                                </CCol>
                                            </CRow>
                                            <CRow>
                                                <CCol lg={6} md={6} sm={12}>
                                                    <CFormSelect
                                                        className="mb-1"
                                                        aria-label="Select Currency"
                                                        value={Gander}
                                                        onChange={(e) => setGander(e.target.value)}
                                                        label="Gander"
                                                        options={[
                                                            "Select Gender",
                                                            { label: "Male", value: "Male" },
                                                            { label: "Female", value: "Female" },
                                                            { label: "Other", value: "Other" },
                                                        ]}
                                                    />
                                                </CCol>
                                                <CCol lg={6} md={6} sm={12}>
                                                    <CFormInput
                                                        className="mb-1"
                                                        type="date"
                                                        value={DateofBirth}
                                                        onChange={(e) => setDateofBirth(e.target.value)}
                                                        id="exampleFormControlInput1"
                                                        label="Date of Birth"
                                                        placeholder="Enter Date"
                                                    />
                                                </CCol>
                                            </CRow>

                                            <CFormTextarea
                                                id="exampleFormControlTextarea1"
                                                label="Address"
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                                rows="2"
                                                text="Must be 8-20 words long."
                                            ></CFormTextarea>
                                            <CRow>
                                                <CCol lg={6} md={6} sm={12}>
                                                    <CFormInput
                                                        className="mb-1"
                                                        type="text"
                                                        value={Area}
                                                        onChange={(e) => setArea(e.target.value)}
                                                        id="exampleFormControlInput1"
                                                        label="Area"
                                                        placeholder="Enter Locality"
                                                    />
                                                </CCol>
                                                <CCol lg={6} md={6} sm={12}>
                                                    <CFormInput
                                                        className="mb-1"
                                                        type="text"
                                                        value={city}
                                                        onChange={(e) => setCity(e.target.value)}
                                                        id="exampleFormControlInput1"
                                                        label="City"
                                                        placeholder="Enter City"
                                                    />
                                                </CCol>
                                            </CRow>

                                            <CFormInput
                                                className="mb-1"
                                                type="text"
                                                value={Profession}
                                                onChange={(e) => setProfession(e.target.value)}
                                                id="exampleFormControlInput1"
                                                label="Profession"
                                                placeholder="Enter Profession"
                                            />

                                            <CCardTitle>Schedule enquiry follow-up</CCardTitle>
                                            <CRow>
                                                <CCol lg={6} md={6} sm={12}>
                                                    <CFormSelect
                                                        className="mb-1"
                                                        aria-label="Select Staff Name"
                                                        label="Staff Name"
                                                        value={StaffName}
                                                        onChange={(e) => setStaffName(e.target.value)}
                                                    >

                                                        <option>Select Staff Name</option>
                                                        {staff.filter((list) => list.username === username && list.selected === 'Select').map((item, index) => (
                                                            item.username === username && (
                                                                <option key={index}>{item.FullName}</option>
                                                            )
                                                        ))}
                                                    </CFormSelect>

                                                </CCol>
                                                <CCol lg={6} md={6} sm={12}>
                                                    <CFormSelect
                                                        className="mb-1"
                                                        aria-label="Select Staff Name"
                                                        value={CenterName}
                                                        onChange={(e) => setCenterName(e.target.value)}
                                                        label="Center Name"
                                                        options={[
                                                            "Select Center",
                                                            { label: "V-mall Thakur Complex", value: "V-mall Thakur Complex" },
                                                            { label: "Station Kandivali East", value: "Station Kandivali East" },
                                                        ]}
                                                    />
                                                </CCol>
                                                <CCol lg={6} md={6} sm={12}>
                                                    <CFormSelect
                                                        className="mb-1"
                                                        aria-label="Select Call Status"
                                                        value={CallStatus}
                                                        onChange={(e) => setCallStatus(e.target.value)}
                                                        label="Call Status"
                                                        options={[
                                                            "Select Call Status",
                                                            { label: "Cold", value: "Cold" },
                                                            { label: "Warm", value: "Warm" },
                                                            { label: "Hot", value: "Hot" },
                                                        ]}
                                                    />
                                                </CCol>
                                            </CRow>
                                            <CFormTextarea
                                                id="exampleFormControlTextarea1"
                                                label="Message"
                                                value={Message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                rows="2"
                                                text="Must be 8-20 words long."
                                            ></CFormTextarea>
                                        </CCol>

                                        <CCol lg={6} sm={12}>
                                            <CRow>
                                                <CCardTitle>Emergency contact</CCardTitle>
                                                <CCol lg={6} md={6} sm={12}>
                                                    <CFormInput
                                                        className="mb-1"
                                                        type="text"
                                                        id="exampleFormControlInput1"
                                                        label="Name"
                                                        value={person_Name}
                                                        onChange={(e) => setperson_Name(e.target.value)}
                                                        placeholder="Enter Name"
                                                    />
                                                </CCol>
                                                <CCol lg={6} md={6} sm={12}>
                                                    <CFormInput
                                                        className="mb-1"
                                                        type="text"
                                                        id="exampleFormControlInput1"
                                                        label="Relationship"
                                                        value={Relation}
                                                        onChange={(e) => setRelation(e.target.value)}
                                                        placeholder="Enter Relationship"
                                                    />
                                                </CCol>

                                                <CCol lg={6} md={6} sm={12}>

                                                    <CFormInput
                                                        className="mb-1"
                                                        type="number"
                                                        value={ContactNumber2}
                                                        onChange={(e) => setContactNumber2(e.target.value)}
                                                        id="exampleFormControlInput1"
                                                        label="Contact Number"
                                                        placeholder="Enter Number"
                                                    />
                                                </CCol>
                                                <CCol lg={6} md={6} sm={12}>
                                                    <CFormSelect
                                                        className="mb-1"
                                                        aria-label="Select Working Days"
                                                        value={CountryCode2}
                                                        onChange={(e) => setCountryCode2(e.target.value)}
                                                        label="Country Code"
                                                    >{CountryList.map((item, index) => (
                                                        <option key={index} value={item.dial_code}>{item.name} {item.dial_code}</option>
                                                    ))}
                                                    </CFormSelect>
                                                </CCol>
                                            </CRow>
                                            <CRow>
                                                <CCardTitle>Lead Information</CCardTitle>
                                                <CCol lg={6} md={6} sm={12}>
                                                    <CFormInput
                                                        className="mb-1"
                                                        name="enquiry_date"
                                                        type="date"
                                                        id="exampleFormControlInput1"
                                                        value={EnquiryDate}
                                                        onChange={(e) => setEnquiryDate(e.target.value)}
                                                        label="Enquiry Date"
                                                        placeholder="Enter date"
                                                    />
                                                </CCol>

                                                <CCol lg={6} md={6} sm={12}>
                                                    <CFormSelect
                                                        className="mb-1"
                                                        aria-label="Select Service Name"
                                                        value={ServiceName}
                                                        onChange={(e) => setServiceName(e.target.value)}
                                                        label="Service Name"

                                                    >
                                                        <option>Select Service</option>
                                                        {result.map((item, index) => (
                                                            item.username === username && (
                                                                item.status === true && (
                                                                    <option key={index} value={item.id}>{item.selected_service}</option>
                                                                )
                                                            )
                                                        ))}
                                                    </CFormSelect>
                                                </CCol>

                                                <CCol lg={6} md={6} sm={12}>
                                                    <CFormSelect
                                                        className="mb-1"
                                                        aria-label="Select Service Name"
                                                        value={ServiceVariation}
                                                        onChange={(e) => setServiceVariation(e.target.value)}
                                                        label="Service Package"

                                                    >
                                                        <option>Service Package</option>
                                                        {subservice.filter((list) =>
                                                            list.selected_service === ServiceName
                                                        ).map((item, index) => (
                                                            item.username === username && (
                                                                item.status === true && (
                                                                    <option key={index}>{item.sub_Service_Name}</option>
                                                                )
                                                            )
                                                        ))}
                                                    </CFormSelect>
                                                </CCol>
                                                <CCol lg={6} md={6} sm={12}>
                                                    <CFormSelect
                                                        className="mb-1"
                                                        aria-label="Select Customer type"
                                                        value={Customertype}
                                                        onChange={(e) => setCustomertype(e.target.value)}
                                                        label="Customer type"
                                                        options={[
                                                            "Select Customer type",
                                                            { label: "Self", value: "Self" },
                                                            { label: "Group", value: "Group" },
                                                            { label: "Couple", value: "Couple" },
                                                            { label: "Youth", value: "Touth" },
                                                            { label: "Kids", value: "Kids" },
                                                        ]}
                                                    />
                                                </CCol>
                                                <CCol lg={6} md={6} sm={12}>
                                                    <CFormSelect
                                                        className="mb-1"
                                                        aria-label="Select Enquiry Source"
                                                        value={enquirytype}
                                                        onChange={(e) => setEnquirytype(e.target.value)}
                                                        label="Enquiry Source"
                                                        options={[
                                                            "Select Enquiry Type",
                                                            { label: "Walk-In", value: "Walk-In" },
                                                            { label: "E-mail", value: "E-mail" },
                                                            { label: "Social Media", value: "Social Media" },
                                                            { label: "Website", value: "Website" },
                                                            { label: "Call Enquiry", value: "Call Enquiry" },
                                                        ]}
                                                    />
                                                </CCol>
                                                <CCol lg={6} md={6} sm={12}>
                                                    <CFormSelect
                                                        className="mb-1"
                                                        aria-label="Select"
                                                        label="Enquiry Stage"
                                                        value={appointmentfor}
                                                        onChange={(e) => setappointmentfor(e.target.value)}
                                                        options={[
                                                            "Select",
                                                            { label: "Appointment", value: "Appointment" },
                                                            { label: "Trial Session", value: "Trial Session" },
                                                            { label: "Join", value: "Join" },
                                                            { label: "Enquiry", value: "Enquiry" },
                                                        ]}
                                                    />
                                                </CCol>
                                               
                                                
                                  <CCol lg={6} md={6} sm={12}>
                               <CFormInput
                                        className="mb-1"
                                        label={`${(appointmentfor ==="Select"?"Appointment" :appointmentfor)} Date`}
                                        type="date"
                                        value={appointmentDate}
                                        onChange={(e) => setappointmentDate(e.target.value)}
                                        id="exampleFormControlInput1"
                                    />
                                </CCol>
                                <CCol lg={6} md={6} sm={12}>
                                    
                                <CFormInput
                                        className="mb-1"
                                        label={`${(appointmentfor ==="Select"?"Appointment" :appointmentfor)} Time`}
                                        type="time"
                                        id="exampleFormControlInput1"
                                        value={appointmentTime}
                                        onChange={(e) => setappointmentTime(e.target.value)}

                                    />
                                </CCol>
                                                
                                               
                                                <CCol lg={6} md={6} sm={12}>

                                                    <CFormSelect
                                                        className="mb-1"
                                                        aria-label="Select Assign Staff"
                                                        value={Counseller}
                                                        onChange={(e) => setCounseller(e.target.value)}
                                                        label='Counseller'
                                                    >
                                                        <option>Select Staff Name</option>
                                                        {staff.filter((list) => list.username === username && list.selected === 'Select').map((item, index) => (
                                                            item.username === username && (
                                                                <option key={index} value={item._id} >{item.FullName}</option>
                                                            )
                                                        ))}</CFormSelect>
                                                </CCol>
                                            </CRow>
                                        </CCol>
                                    </CRow>

                                </CForm>

                            </CModalBody>

                            <CModalFooter>
                                <CButton color="secondary" onClick={() => setVisible1(false)}>
                                    Close
                                </CButton>
                                <CButton type='submit' color="primary" onClick={() => saveEnquiry()}>Update changes</CButton>
                            </CModalFooter>
                        </CModal>






                        <CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345" }} scrollable hover responsive>
                            <CTableHead style={{ position: 'sticky', backgroundColor: "#0B5345", color: "white", top: '0px' }} >
                                <CTableRow style={{ position: 'sticky', top: '0px' }}>
                                    <CTableHeaderCell style={{ position: 'sticky', top: '0px' }}>Sr.No</CTableHeaderCell>
                                    <CTableHeaderCell style={{ position: 'sticky', top: '0px' }}>Enquiry ID</CTableHeaderCell>
                                    <CTableHeaderCell style={{ position: 'sticky', top: '0px' }}>Date</CTableHeaderCell>
                                    <CTableHeaderCell style={{ position: 'sticky', top: '0px' }}>Time</CTableHeaderCell>
                                    <CTableHeaderCell style={{ position: 'sticky', top: '0px' }}>Name</CTableHeaderCell>
                                    <CTableHeaderCell style={{ position: 'sticky', top: '0px' }}>Mobile</CTableHeaderCell>
                                    <CTableHeaderCell style={{ position: 'sticky', top: '0px' }}>Service</CTableHeaderCell>
                                    <CTableHeaderCell style={{ position: 'sticky', top: '0px' }}>Source</CTableHeaderCell>
                                    <CTableHeaderCell style={{ position: 'sticky', top: '0px' }}>Enquiry stage</CTableHeaderCell>
                                    <CTableHeaderCell style={{ position: 'sticky', top: '0px' }}>Call Status</CTableHeaderCell>
                                    <CTableHeaderCell style={{ position: 'sticky', top: '0px' }}>Last Call</CTableHeaderCell>
                                    {(isAdmin|| enquiryAdd)&&<CTableHeaderCell style={{ position: 'sticky', top: '0px' }}>Add</CTableHeaderCell>}
                                    <CTableHeaderCell style={{ position: 'sticky', top: '0px', minWidth: '100px' }} > Date/Time</CTableHeaderCell>
                                    <CTableHeaderCell style={{ position: 'sticky', top: '0px' }}>Assigned by</CTableHeaderCell>
                                    <CTableHeaderCell style={{ position: 'sticky', top: '0px' }}>Counseller</CTableHeaderCell>
                                    <CTableHeaderCell style={{ position: 'sticky', top: '0px' }}>Action</CTableHeaderCell>
                                    {(isAdmin|| enquiryAdd)&&<CTableHeaderCell style={{ position: 'sticky', top: '0px' }}>Edit</CTableHeaderCell>}
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
                                            value={Search1}
                                            onChange={(e) => setSearch1(e.target.value)}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "90px" }}
                                            disabled
                                            value={Search2}
                                            onChange={(e) => setSearch2(e.target.value)}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "120px" }}
                                            value={Search3}
                                            onChange={(e) => setSearch3(e.target.value)}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "120px" }}
                                            value={Search4}
                                            disabled
                                            onChange={(e) => setSearch4(e.target.value)}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            value={Search5}
                                            onChange={(e) => setSearch5(e.target.value)}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "80px" }}
                                            value={Search6}
                                            onChange={(e) => setSearch6(e.target.value)}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "100px" }}
                                            value={Search7}
                                            onChange={(e) => setSearch7(e.target.value)}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "100px" }}
                                            value={Search8}
                                            onChange={(e) => setSearch8(e.target.value)}
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
                                    <CTableDataCell style={{display:(isAdmin|| enquiryAdd)?'block':'none'}}>
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
                                            style={{ minWidth: "50px" }}
                                            type="text"
                                            disabled
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "100px" }}
                                            value={Search9}
                                            onChange={(e) => setSearch9(e.target.value)}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            value={Search10}
                                            style={{ minWidth: "100px" }}
                                            disabled
                                            onChange={(e) => setSearch10(e.target.value)}
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
                                    <CTableDataCell style={{display:(isAdmin|| enquiryAdd)?'block':'none'}}>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            disabled
                                            aria-describedby="exampleFormControlInputHelpInline"
                                            style={{ minWidth: "100px" }}
                                        />
                                    </CTableDataCell>
                                </CTableRow>

                                {result1.filter((list)=>list.enquirestatus!=='notshow').slice(paging * 10, paging * 10 + 10).filter((list) => {
                                    return  list.Fullname.toLowerCase().includes(Search3.toLowerCase())
                                        && list.StaffName.toLowerCase().includes(Search9.toLowerCase()) &&
                                           list.ServiceName.toLowerCase().includes(Search5.toLowerCase()) &&
                                           list.enquirytype.toLowerCase().includes(Search6.toLowerCase()) &&
                                           list.CallStatus.toLowerCase().includes(Search8.toLowerCase())
                                }).map((item, index) => (
                                    <CTableRow key={index}>
                                        <CTableDataCell>{((result1.filter((list)=>list.enquirestatus!=='notshow').length - index)) - (paging * 10)}</CTableDataCell>
                                        <CTableDataCell>{item.EnquiryId}</CTableDataCell>
                                        <CTableDataCell className='text-center'>{moment(item.createdAt).format("DD-MM-YYYY")}</CTableDataCell>
                                        <CTableDataCell>{moment(item.createdAt, "HH:mm").format("hh:mm A")}</CTableDataCell>
                                        <CTableDataCell>{item.Fullname}</CTableDataCell>
                                        <CTableDataCell>{item.ContactNumber}</CTableDataCell>
                                        <CTableDataCell>{item.ServiceName}</CTableDataCell>
                                        <CTableDataCell>{item.enquirytype}</CTableDataCell>
                                        <CTableDataCell>{item.appointmentfor}</CTableDataCell>
                                        <CTableDataCell>{item.CallStatus}</CTableDataCell>
                                        <CTableDataCell>{item.Message}</CTableDataCell>
                                        <CTableDataCell style={{display:(isAdmin|| enquiryAdd)?'block':'none'}}>
                                            {(isAdmin|| enquiryAdd) && <BsPlusCircle id={item._id} style={{ cursor: 'pointer', markerStart: '10px', marginLeft: "4px" }}
                                            onClick={() => { setEdit(item._id), handleAdmission({...item,type:'bottom'}) }} />}
                                            
                                            </CTableDataCell>

                                        <CTableDataCell>

                                            {moment(item.appointmentDate).format("DD-MM-YYYY")
                                                != 'Invalid date' && moment(item.appointmentDate).format("DD-MM-YYYY")}
                                            <br />{moment(item.appointmentTime, "HH:mm").format("hh:mm A") !=
                                                'Invalid date' ? moment(item.appointmentTime, "HH:mm").format("hh:mm A") : '-'}


                                        </CTableDataCell>

                                        <CTableDataCell>{item.StaffName}</CTableDataCell>
                                        <CTableDataCell>{item.Counseller}</CTableDataCell>
                                        <CTableDataCell className='text-center'>
                                            <a href={`tel:+${ item.CountryCode }${ item.ContactNumber }`} target="_black">
                                                <MdCall style={{ cursor: 'pointer', markerStart: '10px' }} o
                                                    nClick={() => { setCallReport(true), handleCallReport(item._id) }} size='20px' />
                                            </a><a href={`https://wa.me/${ item.ContactNumber }`} target="_black">
                                                <BsWhatsapp style={{ marginLeft: "4px", cursor: 'pointer', markerStart: '10px' }}
                                                    onClick={() => { setCallReport(true), handleCallReport(item._id) }} size='20px' /></a>
                                            <a href={`mailto: ${ item.Emailaddress }`} target="_black">
                                                <MdMail style={{ cursor: 'pointer', markerStart: '10px', marginLeft: "4px" }}
                                                    onClick={() => { setCallReport(true), handleCallReport(item._id) }} size='20px' /></a>
                                           
                                            {(isAdmin|| enquiryAdd)&&<BsPlusCircle id={item._id} style={{
                                                cursor: 'pointer',
                                                markerStart: '10px', marginLeft: "4px"
                                            }} onClick={() => handleFollowup(item._id,item)} />}

                                        </CTableDataCell>

                                         {(isAdmin|| enquiryEdit ||enquiryDelete) &&<CTableDataCell className='text-center'>{
                                            (isAdmin|| enquiryEdit) && 
                                            <MdEdit id={item._id} style={{ fontSize: '35px', cursor: 'pointer', markerStart: '10px' }}
                                                onClick={() => handleEnquiry(item)} size='20px' />}
                                                
                                            {(isAdmin|| enquiryDelete) && <MdDelete style={{ cursor: 'pointer', markerStart: '10px', marginLeft: "5px" }}
                                                onClick={() => deleteEnquiry(item._id)} size='20px' />}
                                                
                                                </CTableDataCell>}
                                    </CTableRow>
                                ))}
                            </CTableBody>
                        </CTable>

                    </CCardBody>

                    <CPagination aria-label="Page navigation example" align="center" className='mt-2'>
                        <CPaginationItem style={{ cursor: 'pointer' }} aria-label="Previous" disabled={paging != 0 ? false : true}
                            onClick={() => paging > 0 && setPaging(paging - 1)}>
                            <span aria-hidden="true">&laquo;</span>
                        </CPaginationItem>
                        <CPaginationItem style={{ cursor: 'pointer' }} active onClick={() => setPaging(0)}>{paging + 1}</CPaginationItem>
                        {result1.filter((list)=>list.enquirestatus!=='notshow').filter((list) =>
                            list.username === username && moment(list.createdAt).format("MM-DD-YYYY").includes(select) && moment(list.createdAt).format("MM-DD-YYYY").includes(Search1) && list.Fullname.toLowerCase().includes(Search3.toLowerCase()) && list.StaffName.toLowerCase().includes(Search9.toLowerCase()) &&
                            list.ServiceName.toLowerCase().includes(Search5.toLowerCase()) && list.enquirytype.toLowerCase().includes(Search6.toLowerCase()) && list.CallStatus.toLowerCase().includes(Search8.toLowerCase())
                        ).length > (paging + 1) * 10 && <CPaginationItem style={{ cursor: 'pointer' }}
                            onClick={() => setPaging(paging + 1)} >{paging + 2}</CPaginationItem>}

                        {result1.filter((list)=>list.enquirestatus!=='notshow').filter((list) =>
                            list.username === username && moment(list.createdAt).format("MM-DD-YYYY").includes(select)
                            && moment(list.createdAt).format("MM-DD-YYYY").includes(Search1) &&
                            list.Fullname.toLowerCase().includes(Search3.toLowerCase()) &&
                            list.StaffName.toLowerCase().includes(Search9.toLowerCase()) &&
                            list.ServiceName.toLowerCase().includes(Search5.toLowerCase()) &&
                            list.enquirytype.toLowerCase().includes(Search6.toLowerCase()) &&
                            list.CallStatus.toLowerCase().includes(Search8.toLowerCase())
                        ).length > (paging + 2) * 10 && <CPaginationItem style={{ cursor: 'pointer' }}
                            onClick={() => setPaging(paging + 2)}>{paging + 3}</CPaginationItem>}
                        {result1.filter((list)=>list.enquirestatus!=='notshow').filter((list) =>
                            list.username === username && moment(list.createdAt).format("MM-DD-YYYY").includes(select)
                            && moment(list.createdAt).format("MM-DD-YYYY").includes(Search1) &&
                            list.Fullname.toLowerCase().includes(Search3.toLowerCase()) &&
                            list.StaffName.toLowerCase().includes(Search9.toLowerCase()) &&
                            list.ServiceName.toLowerCase().includes(Search5.toLowerCase()) &&
                            list.enquirytype.toLowerCase().includes(Search6.toLowerCase()) &&
                            list.CallStatus.toLowerCase().includes(Search8.toLowerCase())
                        ).length > (paging + 1) * 10 ?
                            <CPaginationItem aria-label="Next" style={{ cursor: 'pointer' }} onClick={() => setPaging(paging + 1)}>
                                <span aria-hidden="true">&raquo;</span>
                            </CPaginationItem>
                            : <CPaginationItem disabled aria-label="Next" style={{ cursor: 'pointer' }} onClick={() => setPaging(paging + 1)}>
                                <span aria-hidden="true">&raquo;</span>
                            </CPaginationItem>
                        }
                    </CPagination>
                </CCard>
            </CCol >
        </CRow >
    )
}

export default AllEnquires
