import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCardTitle,
    CCol,
    CForm,
    CFormInput,
    CFormSelect,
    CFormTextarea,
    CRow,
} from "@coreui/react";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CountryList } from "src/components/CountryList";
import { useSelector } from 'react-redux'
import CustomSelectInput from "../Fitness/CustomSelectInput/CustomSelectInput";

const url = 'https://yog-seven.vercel.app'
const url2 = 'https://yog-seven.vercel.app'


const EnquiryForm = () => {
    const url1 = useSelector((el)=>el.domainOfApi) 

    const [Fullname, setFullName] = useState("");  // 
    const [Emailaddress, setEmailAddress] = useState(""); //

    const [CountryCode, setCountryCode] = useState("");//
    const [ContactNumber, setContactNumber] = useState(""); //
    const [Gander, setGander] = useState(""); //

    const [DateofBirth, setDateofBirth] = useState(""); 
    const [address, setAddress] = useState("");
    const [Area, setArea] = useState(""); // 
    const [city, setCity] = useState(""); //
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
    const [ServiceVariation, setServiceVariation] = useState("");
    const [Customertype, setCustomertype] = useState("");
    const [enquirytype, setEnquirytype] = useState("");
    const [trialDate, setTrialDate] = useState("");
    const [trialTime, setTrialTime] = useState("");
    const [appointmentDate, setappointmentDate] = useState("");
    const [appointmentTime, setappointmentTime] = useState("");
    const [appointmentfor, setappointmentfor] = useState("");
    const [counseller, setCounseller] = useState("");
    const [error,setError] = useState('')
    const [personalDetailDenger,setPersionalDetailDengar] = useState(false)
    const [LeadDetailDenger,setLeadDetailDengar] = useState(false)
    const [scheduleenquiryDanger,setScheduleenquiryDanger] = useState(false)
    const [clientReferance,setClientReferance] = useState('')
    const [clientData,setClientData] = useState([])
    

    const navigate = useNavigate()


     const changeRoute =()=>{
        navigate('/leads/all-enquires')
     }



    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;
    const username = user.user.username;
    const centerCode = user.user.centerCode;
    const [result, setResult] = useState([]);
    const [serviceArr, setServiceArr] = useState([]);
    const [result1, setResult1] = useState([]);
    const [leadArr, setLeadArr] = useState([]);
    const [mem, setMem] = useState([]);
    useEffect(() => {
        getStaff()
        getLeadSource()
        getClientData()
        axios.get(`${url1}/packagemaster`, {
        
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log(res.data)
                setResult(res.data)
            })
            .catch((error) => {
                console.error(error)
            })

        axios.get(`${url1}/enquiryForm/all`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log(res.data)
                setResult1(res.data)
            })
            .catch((error) => {
                console.error(error)
            })

    }, []);

    function getLeadSource() {
        axios.get(`${url}/leadSourceMaster/all`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log(res.data)
                setLeadArr(res.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }
    const [staff, setStaff] = useState([])
    function getStaff() {
        axios.get(`${url1}/employeeform`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                
                setStaff(res.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    function getClientData() {
        axios.get(`${url1}/memberForm/all`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                
                setClientData(res.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }


    const Email = Emailaddress.includes('@')            
    const contact = ContactNumber.length===10  
    const address1 = address.trim().split(' ').length>=2 


    

    const PersionalDetailsValidation  =  Fullname !=='' &&Email&&Emailaddress.includes('@')!==''
                                         && CountryCode!=='' && contact && Gander !==''  
                                         && address1!==''&&Area!=='' &&city!==''&& Profession!==''

    const ScheduleenquiryfollowUp   = StaffName.trim() !==''&& CenterName.trim()!==''&& CallStatus.trim()!=='' &&counseller.trim()!==''

    const LeadInformationValidation = EnquiryDate !==''   && ServiceName !=='' && ServiceVariation !=='' &&
                                      Customertype !=='' && enquirytype !=='' && appointmentfor !==''  
                                       && appointmentDate !=='' && appointmentTime !==''
                                      



useEffect(()=>{
    if(PersionalDetailsValidation){
        setError('')
        setPersionalDetailDengar((val)=>!val)
        return 
        }else if(ScheduleenquiryfollowUp){
        setError('')
        setScheduleenquiryDanger((val)=>!val)
        return 
        }else if(LeadInformationValidation){
        setError('')
        setLeadDetailDengar((val)=>!val)
        return 
    }
},[PersionalDetailsValidation,LeadInformationValidation,ScheduleenquiryfollowUp])

console.log(clientReferance)
                                       
const saveEnquiry = () => {

if(!PersionalDetailsValidation){
setError('Please Fill all Require Personal Details')
setPersionalDetailDengar(val=>true)
return 
}else if(!ScheduleenquiryfollowUp){
    setError('Please Fill all Require Schedule enquiry follow-up')
    setScheduleenquiryDanger((val)=>true)
    return 
}else if(!LeadInformationValidation){
setError('Please Fill all Require Lead Information')
setLeadDetailDengar((val)=>true)
return 
}


        let enqId = centerCode + 'Q' + (result1.length + 1);

        let data = {
            username: username,
            EnquiryId: enqId,
            Fullname, Emailaddress, CountryCode,
             ContactNumber, Gander, DateofBirth, 
             address, Area, city, Profession,
            StaffName, CenterName, CallStatus, Message,
            person_Name, Relation, CountryCode2: CountryCode2, ContactNumber2: ContactNumber2,
            EnquiryDate, ServiceName, ServiceVariation, Customertype,
             enquirytype, appointmentDate,
            appointmentTime, appointmentfor: appointmentfor, 
            Counseller: counseller,trialDate, trialDate, status: "all_enquiry",
            ClientReferenceName:clientReferance,
        }

        const headers = {
            'Authorization': `Bearer ${token}`,
            'My-Custom-Header': 'foobar'
        }


        axios.post(`${url1}/enquiryForm/create`, data, { headers })
            .then((resp) => {
                console.log(resp)
                alert("successfully submitted")
                console.log("refresh prevented");
                setEmailAddress('')
                setFullName('')
                setCountryCode('')
                setContactNumber('')
                setArea('')
                setCity('')
                setProfession('')
                setStaffName('')
                setCenterName('')
                setCallStatus('')
                setMessage('')
                setRelation('')
                setGander('')
                setCountryCode2('')
                setContactNumber2('')
                setappointmentDate('')
                setappointmentTime('')
                setappointmentfor('')
                setCounseller('')
                setAddress('')
                setCustomertype('')
                setEnquirytype('')
                setLeadDetailDengar(false)
                setPersionalDetailDengar(false)
                setScheduleenquiryDanger(false)
      
            })
            .catch((error) =>
                console.error(error)
            )
    }


    function clientObj(obj){
        setClientReferance(obj.Fullname)    
     }



    return (
        <CCard className="mb-3 border-success">

            <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                <CCardTitle>Enquiry Form </CCardTitle>
            </CCardHeader>

            <CCardBody>
                <CForm>
                    <CRow>
                        <CCol lg={6} sm={12}>
                            <CCardTitle>Personal Details</CCardTitle>
                            <CRow>
                                <CCol lg={6} md={6} sm={12}>
                                    <CFormInput
                                        className={Fullname.trim()===''&&personalDetailDenger ?"mb-1 bg-light-warning":"mb-1"}
                                        type="text"
                                        name="name"
                                        id="exampleFormControlInput1"
                                        label="Full name"
                                        value={Fullname}
                                        onChange={(e) => setFullName(e.target.value)}
                                        placeholder="Enter Name"
                                    />
                                </CCol>
                                <CCol lg={6} md={6} sm={12}>
                                    <CFormInput
                                        className={
                                        !Email
                                        &&personalDetailDenger ?"mb-1 bg-light-warning":"mb-1"}
                                        type="email"
                                        id="exampleFormControlInput1"
                                        label="Email address"
                                        value={Emailaddress}
                                        onChange={(e) => setEmailAddress(e.target.value)}
                                        placeholder="name@example.com"
                                        aria-describedby="exampleFormControlInputHelpInline"
                                    />
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol lg={6} md={6} sm={12}>
                                    <CFormSelect
                                       className={CountryCode.trim()===''&&personalDetailDenger?"mb-1 bg-light-warning":"mb-1"}
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
                                        className={!contact && personalDetailDenger?"mb-1 bg-light-warning":"mb-1"}
                                        type="number"
                                        value={ContactNumber}
                                        onChange={(e) =>{
                                         e.target.value.length <=10? 
                                         setContactNumber(e.target.value):
                                         setContactNumber((val)=>val)

                                        }}
                                        id="exampleFormControlInput1"
                                        label="Contact Number"
                                        placeholder="Enter Number"
                                        text={!contact&& personalDetailDenger &&<span className="text-danger">Must be 10 characters long</span>}
                                    />
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol lg={6} md={6} sm={12}>
                                    <CFormSelect
                                        className={Gander.trim()===''&&personalDetailDenger?"mb-1 bg-light-warning":"mb-1"}
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
                                        type="date"
                                        format="MM-dd-yyyy"
                                        value={DateofBirth}
                                        onChange={(e) => setDateofBirth(e.target.value)}
                                        id="exampleFormControlInput1"
                                        label="Date of Birth"
                                        placeholder="Enter Date"
                                    />
                                </CCol>
                            </CRow>

                            <CFormTextarea
                                className={!address1 && personalDetailDenger?"mb-1 bg-light-warning":"mb-1"}
                                id="exampleFormControlTextarea1"
                                label="Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                rows="2"
                                text="Must be 2-20 words long."
                            ></CFormTextarea>
                            <CRow>
                                <CCol lg={6} md={6} sm={12}>
                                    <CFormInput
                                       className={Area.trim()==='' && personalDetailDenger?"mb-1 bg-light-warning":"mb-1"}
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
                                       className={city.trim()===''&& personalDetailDenger?"mb-1 bg-light-warning":"mb-1"}
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
                               className={Profession.trim()===''&&personalDetailDenger?"mb-1 bg-light-warning":"mb-1"}
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
                                        className={StaffName.trim()==='' && scheduleenquiryDanger?"mb-1 bg-light-warning":"mb-1"}
                                        aria-label="Select Staff Name"
                                        label="Staff Name"
                                        value={StaffName}
                                        onChange={(e) => setStaffName(e.target.value)}
                                    >
                                        <option value={''}>Select Staff Name</option>
                                        {staff.filter((list) => list.username === username && list.selected === 'Select').map((item, index) => (
                                            item.username === username && (
                                                <option key={index}>{item.FullName}</option>
                                            )
                                        ))}
                                    </CFormSelect>
                                </CCol>

                                <CCol lg={
                                    6} md={6} sm={12}>

                                    <CFormSelect
                                        className={counseller.trim()===''&& LeadDetailDenger?"mb-1 bg-light-warning":"mb-1"}
                                        aria-label="Select Assign Staff"
                                        value={counseller}
                                        onChange={(e) => setCounseller(e.target.value)}
                                        label='Counseller'
                                    >
                                        <option value={''}>Select Counseller</option>
                                        {staff.filter((list) => list.username === username && list.selected === 'Select').map((item, index) => (
                                            item.username === username && (
                                                <option key={index}>{item.FullName}</option>
                                            )
                                        ))}</CFormSelect>
                                </CCol>

                                <CCol lg={6} md={6} sm={12}>
                                    <CFormSelect
                                        className={CenterName.trim()==='' && scheduleenquiryDanger?"mb-1 bg-light-warning":"mb-1"}
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
                                        className={CallStatus.trim()==='' && scheduleenquiryDanger?"mb-1 bg-light-warning":"mb-1"}
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
                                <CCol lg={6} md={6} sm={12}>

                                    <CFormInput
                                        className="mb-1"
                                        type="number"
                                        value={ContactNumber2}
                                        onChange={(e) =>{
                                          e.target.value.length <=10? 
                                            setContactNumber2(e.target.value):
                                            setContactNumber2(val=>val)
                                        }}
                                        id="exampleFormControlInput1"
                                        label="Contact Number"
                                        placeholder="Enter Number"
                                    />
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCardTitle>Lead Information</CCardTitle>
                                <CCol lg={6} md={6} sm={12}>
                                    <CFormInput
                                        className={EnquiryDate.trim()===''&& LeadDetailDenger?"mb-1 bg-light-warning":"mb-1"}
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
                                        className={Customertype.trim()===''&& LeadDetailDenger?"mb-1 bg-light-warning":"mb-1"}
                                        aria-label="Select Customer type"
                                        value={Customertype}
                                        onChange={(e) => setCustomertype(e.target.value)}
                                        label="Customer type"
                                        options={[
                                            "Select Customer type",
                                            { label: "Self", value: "Self" },
                                            { label: "Group", value: "Group" },
                                            { label: "Couple", value: "Couple" },
                                            { label: "Corporate", value: "Corporate" },
                                            { label: "Kids", value: "Kids" },
                                        ]}
                                    />
                                </CCol>
                                



                                <CCol lg={6} md={6} sm={12}>
                                    <CFormSelect
                                        className={ServiceName.trim()===''&& LeadDetailDenger?"mb-1 bg-light-warning":"mb-1"}
                                        value={ServiceName}
                                        onChange={(e) => setServiceName(e.target.value)}
                                        label="Service Name"

                                    >
                                        <option value={''}>Select Service</option>
                                        {result.map((item) => (
                                            item.username === username && (item.Status=== true && (item.Service.toLocaleLowerCase().trim()))))
                                            .filter((el,i,arr)=>i===arr.indexOf(el)).map((Service,ind)=>{
                                              return   <option key={ind}>{Service }</option>                                                  
                                            })
                                            
                                            }
                                    </CFormSelect>
                                </CCol>


                                <CCol lg={6} md={6} sm={12}>
                                    <CFormSelect
                                        className={ServiceVariation.trim()===''&& LeadDetailDenger?"mb-1 bg-light-warning":"mb-1"}
                                        value={ServiceVariation}
                                        onChange={(e) => setServiceVariation(e.target.value)}
                                        label="Service Package"

                                    >
                                        <option value={''}>Service Package</option>
                                        {result.filter((list) =>
                                            list.Service.toLocaleLowerCase().trim()=== ServiceName
                                        ).map((item, index) => (
                                            item.username === username && (
                                                item.Status === true && (
                                                    <option key={index}>{item.Package_Name }</option>
                                                )
                                            )
                                        ))}
                                    </CFormSelect>
                                </CCol>
                              

                                <CCol lg={6} md={6} sm={12}>

                                    <CFormSelect
                                        className={enquirytype.trim()===''&& LeadDetailDenger?"mb-1 bg-light-warning":"mb-1"}
                                        aria-label="Select Assign Staff"
                                        value={enquirytype}
                                        onChange={(e) => setEnquirytype(e.target.value)}
                                        label="Enquiry Source"
                                    >
                                        <option value={''}>Select Enquiry source</option>
                                        {leadArr.filter((list) => list.username === username).map((item, index) => (
                                            item.username === username && (
                                                <option key={index}>{item.LeadSource}</option>
                                            )
                                        ))}</CFormSelect>
                                </CCol>

                               {enquirytype=== 'Referred' && <CCol lg={6} md={6} sm={12}>
                                  <label className="mb-2">Select Referal Client</label>
                                    <CustomSelectInput data={clientData} 
                                    title={clientReferance?.trim()?
                                     clientReferance:"Select client name"}
                                     getData={clientObj}/>
                                </CCol>}

                                <CCol lg={6} md={6} sm={12}>
                                <CFormSelect                                
                                        className={appointmentfor.trim()===''&& LeadDetailDenger?"mb-1 bg-light-warning":"mb-1"}
                                        label='Enquiry Stage'
                                        aria-label="Select"
                                        value={appointmentfor}
                                        onChange={(e) => setappointmentfor(e.target.value)}
                                        options={[
                                            "Select Enquiry Stage",
                                            { label: "Enquiry", value: "Enquiry" },
                                            { label: "Prospect", value: "Prospect" },
                                            { label: "Appointment", value: "Appointment" },
                                            { label: "Trial Session", value: 'Trial Session' },
                                            { label: "Join", value: "Admission" },

                                        ]}
                                    />
                                </CCol>
                              

                              
                                  <CCol lg={6} md={6} sm={12}>
                               <CFormInput
                                        className={appointmentDate.trim()===''&& LeadDetailDenger?"mb-1 bg-light-warning":"mb-1"}
                                        label={`${(appointmentfor ==="Select Enquiry Stage"?"Appointment" :appointmentfor)} Date`}
                                        type="date"
                                        value={appointmentDate}
                                        onChange={(e) => setappointmentDate(e.target.value)}
                                        id="exampleFormControlInput1"
                                    />
                                </CCol>
                                <CCol lg={6} md={6} sm={12}>
                                    
                                <CFormInput
                                        className={appointmentTime.trim()===''&& LeadDetailDenger?"mb-1 bg-light-warning":"mb-1"}
                                        label={`${(appointmentfor ==="Select Enquiry Stage"?"Appointment" :appointmentfor)} Time`}
                                        type="time"
                                        id="exampleFormControlInput1"
                                        value={appointmentTime}
                                        onChange={(e) => setappointmentTime(e.target.value)}

                                    />
                                </CCol>
                                <CCol >
                                <CFormTextarea
                                id="exampleFormControlTextarea1"
                                label="Message"
                                value={Message}
                                onChange={(e) => setMessage(e.target.value)}
                                rows="2"
                                text="Must be 2-20 words long."
                                 ></CFormTextarea>
                                </CCol>                
                            </CRow>
                        </CCol>
                    </CRow>

                    <CButton className="mt-2" onClick={() =>{
                        saveEnquiry()
                     }} >Save</CButton>

                     {error &&<p className="mt-2" style={{color:'red',fontSize:'15px'}}>{error}</p>}
                </CForm>
            </CCardBody>
        </CCard>
    );
};

export default EnquiryForm;