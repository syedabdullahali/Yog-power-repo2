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
    CFormSelect,
    CFormSwitch,
    CFormTextarea,
    CImage,
    CInputGroup,
    CInputGroupText,
    CListGroup,
    CListGroupItem,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CNav,
    CNavItem,
    CNavLink,
    CRow,
    CTabContent,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CTabPane,
} from "@coreui/react";
import React, { useEffect, useRef, useState } from "react";
import { CountryList } from "src/components/CountryList";
import ProfileIcon from 'src/assets/images/avatars/profile_icon.png'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { listAll, ref, uploadBytes } from "firebase/storage";
import { storage } from "src/firebase";
import logo from 'src/assets/images/avatars/icon.png'
import { v4 } from "uuid";
import { useReactToPrint } from 'react-to-print'
import moment from "moment";
import { useSelector } from 'react-redux'
const url = 'https://yog-seven.vercel.app'
const url2 = 'https://yog-seven.vercel.app'

const ProfileDetails = ({ ids, deleteId }) => {

    const adId = JSON.parse(localStorage.getItem('adId'))
    console.log(adId);
    console.log(ids);
    const componentRef = useRef()
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'yog-power',
        onAfterPrint: () => alert('print success')
    })

    const [activeKey, setActiveKey] = useState(1)
    const [image, setImage] = useState(null)
    const [imageUrl, setImageUrl] = useState(null)
    const [Fullname, setFullname] = useState('')
    const [CountryCode, setCountryCode] = useState('')
    const [ContactNumber, setContactNumber] = useState('')
    const [WhatsappNumber, setWhatsappNumber] = useState('')
    const [Email, setEmail] = useState('')
    const [Gender, setGender] = useState('')
    const [Anniversarydate, setAnniversarydate] = useState('')
    const [DateofBirth, setDateofBirth] = useState('')
    const [Address, setAddress] = useState('')
    const [Area, setArea] = useState('')
    const [city, setCity] = useState('')
    const [pincode, setPincode] = useState('')
    const [state, setState] = useState('')
    const [BloodGroup, setBloodGroup] = useState('')
    const [FacebookID, setFacebookID] = useState('')
    const [sms, setsms] = useState(true)
    const [mail, setmail] = useState(true)
    const [pushnotification, setpushnotification] = useState(true)
    const [Name, setName] = useState('')
    const [CountryCode1, setCountryCode1] = useState('')
    const [ContactNumber1, setContactNumber1] = useState('')
    const [Relationship, setRelationship] = useState('')
    const [Customertype, setCustomertype] = useState('')
    const [serviceName, setserviceName] = useState('')
    const [serviceVaration, setserviceVariation] = useState('')
    const [EnquiryType, setEnquiryType] = useState('')
    const [AssignStaff, setAssignStaff] = useState('')
    const [MemberManager, setMemberManager] = useState('')
    const [Batch, setBatch] = useState('')
    const [GeneralTrainer, setGeneralTrainer] = useState('')
    const [AttendanceID, setAttendanceID] = useState('')
    const [CenterID, setCenterID] = useState('')
    const [LockerKeyNo, setLockerKeyNo] = useState('')
    const [PAN, setPAN] = useState('')
    const [AsthmaCOPD, setAsthmaCOPD] = useState(false)
    const [BackPain, setBackPain] = useState(false)
    const [BoneFracture, setBoneFracture] = useState(false)
    const [CarpalTunnel, setCarpalTunnel] = useState(false)
    const [Diabetes, setDiabetes] = useState(false)
    const [DigestiveDisorder, setDigestiveDisorder] = useState(false)
    const [Epilepsy, setEpilepsy] = useState(false)
    const [FootPain, setFootPain] = useState(false)
    const [Glaucoma, setGlaucoma] = useState(false)
    const [HeartDiseaseCondition, setHeartDiseaseCondition] = useState(false)
    const [HerniaDiastasisRecti, setHerniaDiastasisRecti] = useState(false)
    const [HighBloodPressure, setHighBloodPressure] = useState(false)
    const [Other, setOther] = useState(false)
    const [OtherText, setOtherText] = useState('')
    const [Weight, setWeight] = useState('')
    const [Height, setHeight] = useState('')
    const [fitnessLevel, setfitnessLevel] = useState('')
    const [fitnessGoal, setfitnessGoal] = useState('')
    const [idealWeight, setidealWeight] = useState('')
    const [suggestion, setsuggestion] = useState('')
    const [comments, setcomments] = useState('')
    const url1 = useSelector((el)=>el.domainOfApi) 





    var currentdate = new Date();
    var datetime = currentdate.getDay() + "/" + currentdate.getMonth()
        + "/" + currentdate.getFullYear();
    const navigate = useNavigate()
    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;
    const username = user.user.username;
    const centerCode = user.user.centerCode;
    const [result, setResult] = useState([]);
    const [result1, setResult1] = useState([]);
    const [visi, setVisi] = useState(false);
    const [mem, setMem] = useState([]);
    const [packageArr, setPackageArr] = useState([]);
    useEffect(() => {
        getDetails(ids)
        getStaff()
        getBatch()
        getMem()
        getSubService()
        getLeadSource()
        getPackage()
        getImage()
    }, [])
  
    function getDetails(id) {
        const headers = {
            'Authorization': `Bearer ${token}`,
            'My-Custom-Header': 'foobar'
        };
        axios.get(`${url1}/memberForm/${id}`, { headers },
        )
            .then(({data}) => {
                setFullname(data?.Fullname)
                setEmail(data?.Email)
                setCountryCode(data?.CountryCode)
                setContactNumber(data?.ContactNumber)
                setWhatsappNumber(data?.WhatsappNumber)
                setDateofBirth(moment(data?.DateofBirth).format('YYYY-MM-DD'))
                setAnniversarydate(data?.Anniversarydate)
                setGender(data?.Gender)
                setAddress(data?.Address)
                setArea(data?.Area)
                setCity(data?.city)
                setPincode(data?.pincode)
                setState(data?.state)
                setFacebookID(data?.FacebookID)
                setBloodGroup(data?.BloodGroup)
                setsms(data?.sms)
                setmail(data?.mail)
                setpushnotification(data?.pushnotification)
                setName(data?.Name)
                setRelationship(data?.Relationship)
                setCountryCode1(data?.CountryCode1)
                setContactNumber1(data?.ContactNumber1)
                setserviceName(data?.serviceName)
                setserviceVariation(data?.package)
                setCustomertype(data?.Customertype)
                setEnquiryType(data?.EnquiryType)
                setMemberManager(data?.AssignStaff)
                setBatch(data?.Batch)
                setGeneralTrainer(data?.GeneralTrainer)
                setAttendanceID(data?.AttendanceID)
                setCenterID(data?.CenterID)
                setLockerKeyNo(data?.LockerKeyNo)
                setPAN(data?.PAN)
                setBackPain(data?.BackPain)
                setBoneFracture(data?.BoneFracture)
                setHeartDiseaseCondition(data?.HeartDiseaseCondition)
                setEpilepsy(data?.Epilepsy)
                setCarpalTunnel(data?.CarpalTunnel)
                setFootPain(data?.FootPain)
                setDiabetes(data?.Diabetes)
                setGlaucoma(data?.Glaucoma)
                setAsthmaCOPD(data?.AsthmaCOPD)
                setHerniaDiastasisRecti(data?.HerniaDiastasisRecti)
                setHighBloodPressure(data?.HighBloodPressure)
                setOtherText(data?.Other)
                setHeight(data?.Height)
                setWeight(data?.Weight)
                setfitnessLevel(data?.fitnessLevel)
                setfitnessGoal(data?.fitnessGoal)
                setidealWeight(data?.idealWeight)
                setsuggestion(data?.suggestion)
                setcomments(data?.comments)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    function getPackage() {
        axios.get(`${url1}/Package/all`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                setPackageArr(res.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    function getImage() {
        listAll(imagesListRef).then((response) => {
        })
    }

    const [leadArr, setLeadArr] = useState([]);
    function getLeadSource() {
        axios.get(`${url1}/leadSourceMaster/all`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
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

    function getSubService() {
        axios.get(`${url1}/subservice/all`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                setResult1(res.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }
    function getMem() {
        axios.get(`${url1}/memberForm/all`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                setMem(res.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }
    function getBatch() {
        axios.get(`${url1}/Batch/all`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                setResult(res.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    console.log(ids)

    function updateClientInfo(){
        let editdata = {
            username: username,
            image: imageUrl,
            Fullname, CountryCode, ContactNumber,
            WhatsappNumber, Email, Gender, DateofBirth, 
            Anniversarydate, Address, Area, city, pincode, state, BloodGroup,
            FacebookID, sms, mail, pushnotification,
            Name, CountryCode1, ContactNumber1, Relationship,
            serviceName, serviceVaration, Customertype, EnquiryType,
            AssignStaff, MemberManager, Batch, GeneralTrainer, AttendanceID,
            CenterID, LockerKeyNo, PAN,
            BackPain, BoneFracture, CarpalTunnel, AsthmaCOPD, DigestiveDisorder,
            Diabetes, Epilepsy, FootPain, Glaucoma, HeartDiseaseCondition, HerniaDiastasisRecti,
            HighBloodPressure, Other: OtherText, Weight, Height, fitnessLevel,
            fitnessGoal, idealWeight, suggestion, comments, status: 'active',
            ClientId:`${centerCode}MEM${10+mem.length}`,
            package:serviceVaration
        }
    
     const headers = {
            'Authorization': `Bearer ${token}`,
            'My-Custom-Header': 'foobar'
    };
        axios.post(`${url1}/memberForm/update/${ids}`, editdata, { headers },
        ).then((resp) => {
                console.log(resp.data)
                alert("successfully submitted Updated")
    }).catch((error) => {
                console.error(error)
    })
     } 

   


  

    const imgRef = useRef(null)
    const handleImage = (e) => {
        setImage(e.target.files[0])
        const file = e.target.files[0]
        if (!file.type.startsWith('image/')) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            imgRef.current.src = e.target.result
        }
        reader.readAsDataURL(file)
    }


    const imagesListRef = ref(storage, "images/");
    const UploadImage = () => {
        if (image == null) return;
        const imageRef = ref(storage, `images/${image.name + v4()}`)
        console.log(imageRef.fullPath);
        setImageUrl(imageRef.fullPath)

        uploadBytes(imageRef, image).then(() => {
            alert('image uploaded')
        })
    }
    console.log(imageUrl);
    return (
        <>
            <div className='d-flex justify-content-between mb-2'>
                <div className='mt-2 ms-2'>
                    <CCardTitle>Profile </CCardTitle>
                </div>
                <div className='justify-content-around'>
                    <CButton style={{ margin: '5px' }}>Inter branch transfer</CButton>
                    <CButton style={{ margin: '5px' }}>Print Profile</CButton>
                    <CButton style={{ margin: '5px' }}>New Invoice</CButton>
                    <CButton style={{ margin: '5px' }}>New Call</CButton>
                    <CButton style={{ margin: '5px' }}>New Appointment</CButton>
                </div>

            </div>
            <CCard className="mb-3 border-success">
                <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                    <CNav variant="pills" role="tablist" className='d-flex'>
                        <CNavItem >
                            <CNavLink
                                style={{ color: 'white' }}
                                href="javascript:void(0);"
                                active={activeKey === 1}
                                onClick={() => setActiveKey(1)}
                            >
                                Personal Information
                            </CNavLink>
                        </CNavItem>
                        <CNavItem >
                            <CNavLink
                                style={{ color: 'white' }}
                                href="javascript:void(0);"
                                active={activeKey === 2}
                                onClick={() => setActiveKey(2)}
                            >
                                Fitness Profile
                            </CNavLink>
                        </CNavItem>
                    </CNav>
                </CCardHeader>
                <CCardBody>
                    <CTabContent>
                        <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>
                            <CForm>
                                <CRow>
                                    <CCol lg={6} sm={12}>
                                        <CCardTitle>Personal Details </CCardTitle>
                                        <CRow>
                                            <CCol xs={4} className='mt-2 mb-1' >
                                                <CImage ref={imgRef} className="mb-1" style={{ borderRadius: "50px" }} width={'160px'} src={ProfileIcon} />
                                            </CCol>
                                            <CCol xs={7} className='mt-3'>

                                                <CFormInput
                                                    className="mb-1 mr-3"
                                                    type="file"
                                                    onChange={handleImage}
                                                    accept="image/*"
                                                />
                                                <CButton onClick={UploadImage}>Upload Image</CButton>

                                            </CCol>
                                            <CCol xs={6}>
                                                <CFormInput
                                                    className="mb-1"
                                                    type="text"
                                                    id="exampleFormControlInput1"
                                                    label="Full name"
                                                    value={Fullname}
                                                    onChange={(e) => setFullname(e.target.value)}
                                                    placeholder="Enter Name"
                                                />
                                            </CCol>
                                            <CCol>
                                                <CFormInput
                                                    className="mb-1"
                                                    type="email"
                                                    id="exampleFormControlInput1"
                                                    label="Email address"
                                                    value={Email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="name@example.com"
                                                    text="Must be 8-20 characters long."
                                                    aria-describedby="exampleFormControlInputHelpInline"
                                                />
                                            </CCol>
                                        </CRow>
                                        <CRow>
                                            <CCol>
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
                                            <CCol>
                                                <CFormInput
                                                    className="mb-1"
                                                    type="number"
                                                    id="exampleFormControlInput1"
                                                    label="Contact Number"
                                                    value={ContactNumber}
                                                    onChange={(e) => setContactNumber(e.target.value)}
                                                    placeholder="Enter Number"
                                                />
                                            </CCol>
                                        </CRow>
                                        <CRow>
                                            <CCol>
                                                <CFormInput
                                                    className="mb-1"
                                                    type="number"
                                                    id="exampleFormControlInput1"
                                                    value={WhatsappNumber}
                                                    onChange={(e) => setWhatsappNumber(e.target.value)}
                                                    label="Whatsapp Number"
                                                    placeholder="Enter Number"
                                                />
                                            </CCol>
                                            <CCol>
                                                <CFormInput
                                                    className="mb-1"
                                                    type="date"
                                                    id="exampleFormControlInput1"
                                                    value={DateofBirth}
                                                    onChange={(e) => setDateofBirth(e.target.value)}
                                                    label="Date of Birth"
                                                    placeholder="Enter Date"
                                                />
                                            </CCol>
                                        </CRow>
                                        <CRow>
                                            <CCol>
                                                <CFormInput
                                                    className="mb-1"
                                                    type="date"
                                                    id="exampleFormControlInput1"
                                                    value={Anniversarydate}
                                                    onChange={(e) => setAnniversarydate(e.target.value)}
                                                    label='Anniversary Date'
                                                    placeholder="Enter Anniversary Date"
                                                />
                                            </CCol>
                                            <CCol>
                                                <CFormSelect
                                                    className="mb-1"
                                                    aria-label="Select Currency"
                                                    value={Gender}
                                                    onChange={(e) => setGender(e.target.value)}
                                                    label="Gender"
                                                    options={[
                                                        "Select Gender",
                                                        { label: "Male", value: "Male" },
                                                        { label: "Female", value: "Female" },
                                                        { label: "Other", value: "Other" },
                                                    ]}
                                                />
                                            </CCol>
                                        </CRow>
                                        <CCol>

                                            <CFormTextarea
                                                id="exampleFormControlTextarea1"
                                                label="Address"
                                                value={Address}
                                                onChange={(e) => setAddress(e.target.value)}
                                                rows="2"
                                                text="Must be 8-20 words long."
                                            ></CFormTextarea>
                                        </CCol>
                                        <CRow>
                                            <CCol>
                                                <CFormInput
                                                    className="mb-1"
                                                    type="text"
                                                    id="exampleFormControlInput1"
                                                    value={Area}
                                                    onChange={(e) => setArea(e.target.value)}
                                                    label="Area"
                                                    placeholder="Enter Locality"
                                                />
                                            </CCol>
                                            <CCol>
                                                <CFormInput
                                                    className="mb-1"
                                                    type="text"
                                                    value={city}
                                                    onChange={(e) => setCity(e.target.value)}
                                                    label="City"
                                                    placeholder="Enter City"
                                                />
                                            </CCol>
                                        </CRow>
                                        <CRow>
                                            <CCol>
                                                <CFormInput
                                                    className="mb-1"
                                                    type="number"
                                                    value={pincode}
                                                    onChange={(e) => setPincode(e.target.value)}
                                                    label="Pin Code"
                                                    placeholder="Enter Pin Code"
                                                />
                                            </CCol>
                                            <CCol>
                                                <CFormInput
                                                    className="mb-1"
                                                    type="text"
                                                    value={state}
                                                    onChange={(e) => setState(e.target.value)}
                                                    label="State"
                                                    placeholder="Enter State"
                                                />
                                            </CCol>
                                        </CRow>

                                        <CRow>
                                            <CCol>
                                                <CFormInput
                                                    className="mb-1"
                                                    type="url"
                                                    value={FacebookID}
                                                    onChange={(e) => setFacebookID(e.target.value)}
                                                    label="Facebook Id"
                                                    placeholder="Enter Facebook id"
                                                />
                                            </CCol>
                                            <CCol>
                                                <CFormSelect
                                                    className="mb-1"
                                                    aria-label="Select Blood Group"
                                                    value={BloodGroup}
                                                    onChange={(e) => setBloodGroup(e.target.value)}
                                                    label="Blood Group"
                                                    options={[
                                                        "Select Blood Group",
                                                        { label: "A+", value: "A+" },
                                                        { label: "A-", value: "A-" },
                                                        { label: "B+", value: "B+" },
                                                        { label: "B-", value: "B-" },
                                                        { label: "O+", value: "O+" },
                                                        { label: "O-", value: "O-" },
                                                        { label: "AB+", value: "AB+" },
                                                        { label: "AB-", value: "AB-" },
                                                    ]}
                                                />
                                            </CCol>
                                        </CRow>
                                        <CCardTitle>Communication Preference Settings</CCardTitle>
                                        <CRow>
                                            <CCol xs={4}>
                                                <CFormSwitch size="xl" label="SMS"
                                                    checked={sms}
                                                    onChange={() => setsms(!sms)} />
                                            </CCol>
                                            <CCol xs={4}>
                                                <CFormSwitch size="xl" label="Mail"
                                                    checked={mail}
                                                    onChange={() => setmail(!mail)} />
                                            </CCol>
                                            <CCol xs={4}>
                                                <CFormSwitch size="xl" label="Push Notification"
                                                    checked={pushnotification}
                                                    onChange={() => setpushnotification(!pushnotification)} />
                                            </CCol>
                                        </CRow>
                                    </CCol>

                                    <CCol lg={6} sm={12}>
                                        <CRow>
                                            <CCardTitle>Emergency contact</CCardTitle>
                                            <CCol xs={6}>
                                                <CFormInput
                                                    className="mb-1"
                                                    type="text"
                                                    id="exampleFormControlInput1"
                                                    value={Name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    label="Name"
                                                    placeholder="Enter Name"
                                                />
                                            </CCol>
                                            <CCol>
                                                <CFormInput
                                                    className="mb-1"
                                                    type="text"
                                                    value={Relationship}
                                                    onChange={(e) => setRelationship(e.target.value)}
                                                    id="exampleFormControlInput1"
                                                    label="Relationship"
                                                    placeholder="Enter Relationship"
                                                />
                                            </CCol>

                                            <CCol xs={6}>
                                                <CFormSelect
                                                    className="mb-1"
                                                    aria-label="Select Working Days"
                                                    value={CountryCode1}
                                                    onChange={(e) => setCountryCode1(e.target.value)}
                                                    label="Country Code"
                                                >{CountryList.map((item, index) => (
                                                    <option key={index} value={item.dial_code}>{item.name} {item.dial_code}</option>
                                                ))}</CFormSelect>
                                            </CCol>
                                            <CCol xs={6}>
                                                <CFormInput
                                                    className="mb-1"
                                                    type="number"
                                                    id="exampleFormControlInput1"
                                                    value={ContactNumber1}
                                                    onChange={(e) => setContactNumber1(e.target.value)}
                                                    label="Contact Number"
                                                    placeholder="Enter Number"
                                                />
                                            </CCol>
                                        </CRow>
                                        <CRow>
                                            <CCardTitle>Lead Information</CCardTitle>
                                            <CCol xs={6}>
                                                <CFormSelect
                                                    className="mb-1"
                                                    aria-label="Select Service Name"
                                                    value={serviceName}
                                                    onChange={(e) => setserviceName(e.target.value)}
                                                    label="Service Name"
                                                >
                                                    <option>Select Service</option>
                                                    {result1.map((item, index) => (
                                                        item.username === username && (
                                                            item.status === true && (
                                                                <option key={index}>{item.selected_service}</option>
                                                            )
                                                        )
                                                    ))}</CFormSelect>
                                            </CCol>
                                            <CCol xs={6}>
                                                <CFormSelect
                                                    className="mb-1"
                                                    aria-label="Select Service Name"
                                                    value={serviceVaration}
                                                    onChange={(e) => setserviceVariation(e.target.value)}
                                                    label="Service Variation"
                                                >
                                                    <option>Select Service</option>
                                                    {result1.filter((list) => list.selected_service === serviceName).map((item, index) => (
                                                        item.username === username && (
                                                            item.status === true && (
                                                                <option key={index}>{item.sub_Service_Name}</option>
                                                            )
                                                        )
                                                    ))}</CFormSelect>
                                            </CCol>

                                            <CCol xs={6}>
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
                                            <CCol xs={6}>

                                                <CFormSelect
                                                    className="mb-1"
                                                    aria-label="Select Assign Staff"
                                                    value={EnquiryType}
                                                    onChange={(e) => setEnquiryType(e.target.value)}
                                                    label="Enquiry Type"

                                                >
                                                    <option>Select Enquiry Type</option>
                                                    {leadArr.filter((list) => list.username === username).map((item, index) => (
                                                        item.username === username && (
                                                            <option key={index}>{item.LeadSource}</option>
                                                        )
                                                    ))}</CFormSelect>
                                            </CCol>
                                        </CRow>

                                        <CRow>
                                            <CCardTitle>Member Manager</CCardTitle>
                                            <CCol xs={6}>
                                                <CFormSelect
                                                    className="mb-1"
                                                    aria-label="Select Assign Staff"
                                                    value={AssignStaff}
                                                    onChange={(e) => setAssignStaff(e.target.value)}
                                                    label="Assign Staff"
                                                >
                                                    <option>Select Assign Staff</option>
                                                    {staff.filter((list) => list.username === username && list.Department === 'Sales').map((item, index) => (
                                                        <option key={index}>{item.FullName}</option>
                                                    ))}
                                                </CFormSelect>
                                            </CCol>
                                            <CCol xs={6}>
                                                <CFormSelect
                                                    className="mb-1"
                                                    aria-label="Select Member Manager"
                                                    value={MemberManager}
                                                    onChange={(e) => setMemberManager(e.target.value)}
                                                    label="Member Manager"
                                                    options={[
                                                        "Select Member Manager",
                                                        { label: "prabha", value: "prabha" },
                                                        { label: "sejal", value: "sejal" },
                                                        { label: "sonali", value: "sonali" },
                                                        { label: "None", value: "None" },
                                                    ]}
                                                />
                                            </CCol>
                                            <CCol xs={6}>
                                                <CFormSelect
                                                    className="mb-1"
                                                    aria-label="Select Batch"
                                                    value={Batch}
                                                    onChange={(e) => setBatch(e.target.value)}
                                                    label="Batch"
                                                ><option>Select Batch</option>
                                                    {result.map((item, index) => (
                                                        item.username === username && (
                                                            <option key={index} value={item.batch_timing}>{item.batch_timing} {item.Batch_Duration}</option>
                                                        )
                                                    ))}</CFormSelect>
                                            </CCol>
                                            <CCol xs={6}>
                                                <CFormSelect
                                                    className="mb-1"
                                                    aria-label="Select General Trainer"
                                                    value={GeneralTrainer}
                                                    onChange={(e) => setGeneralTrainer(e.target.value)}
                                                    label="General Trainer"
                                                    options={[
                                                        "Select General Trainer",
                                                        { label: "None", value: "None" },
                                                    ]}
                                                />
                                            </CCol>
                                        </CRow>
                                        <CRow>
                                            <CCardTitle>IDs</CCardTitle>
                                            <CCol xs={6}>
                                                <CFormSelect
                                                    className="mb-1"
                                                    type="text"
                                                    id="exampleFormControlInput1"
                                                    value={AttendanceID}
                                                    onChange={(e) => setAttendanceID(e.target.value)}
                                                    label="Attendance ID"
                                                >
                                                    <option>Select Attendance ID</option>
                                                    <option>CLIENT{mem.length + 1}</option>
                                                </CFormSelect>
                                            </CCol>
                                            <CCol xs={6}>
                                                <CFormSelect
                                                    className="mb-1"
                                                    type="text"
                                                    id="exampleFormControlInput1"
                                                    value={CenterID}
                                                    onChange={(e) => setCenterID(e.target.value)}
                                                    label="Center ID">
                                                    <option>Select Center ID</option>
                                                    <option>{username}</option>
                                                </CFormSelect>
                                            </CCol>
                                            <CCol xs={6}>
                                                <CFormInput
                                                    className="mb-1"
                                                    type="text"
                                                    id="exampleFormControlInput1"
                                                    value={LockerKeyNo}
                                                    onChange={(e) => setLockerKeyNo(e.target.value)}
                                                    label="Locker Key No"
                                                    placeholder="Enter Locker Key No"
                                                />
                                            </CCol>
                                            <CCol xs={6}>
                                                <CFormInput
                                                    className="mb-1"
                                                    type="text"
                                                    id="exampleFormControlInput1"
                                                    value={PAN}
                                                    onChange={(e) => setPAN(e.target.value)}
                                                    label="PAN"
                                                    placeholder="Enter PAN"
                                                />
                                            </CCol>
                                        </CRow>

                                    </CCol>
                                </CRow>
                                <CRow className="mt-2">
                                    <CCardTitle className="mb-2">Injuries and conditions</CCardTitle>
                                    <CCol>
                                        <CListGroup>
                                            <CListGroupItem>
                                                <CFormCheck label="Back Pain"
                                                    checked={BackPain}
                                                    onChange={() => setBackPain(!BackPain)} />
                                            </CListGroupItem>
                                            <CListGroupItem>
                                                <CFormCheck label="Bone Fracture"
                                                    checked={BoneFracture}
                                                    onChange={() => setBoneFracture(!BoneFracture)} />
                                            </CListGroupItem>
                                            <CListGroupItem>
                                                <CFormCheck label="Carpal Tunnel"
                                                    checked={CarpalTunnel}
                                                    onChange={() => setCarpalTunnel(!CarpalTunnel)} />
                                            </CListGroupItem>
                                            <CListGroupItem>
                                                <CFormCheck label="Diabetes"
                                                    checked={Diabetes}
                                                    onChange={() => setDiabetes(!Diabetes)}
                                                />
                                            </CListGroupItem>
                                        </CListGroup>
                                    </CCol>
                                    <CCol>
                                        <CListGroup>
                                            <CListGroupItem>
                                                <CFormCheck label="Pregnancy"
                                                    checked={HeartDiseaseCondition}
                                                    onChange={() => setHeartDiseaseCondition(!HeartDiseaseCondition)} />
                                            </CListGroupItem>
                                            <CListGroupItem>
                                                <CFormCheck label="Shoulder Pain"
                                                    checked={Epilepsy}
                                                    onChange={() => setEpilepsy(!Epilepsy)} />
                                            </CListGroupItem>
                                            <CListGroupItem>
                                                <CFormCheck label="Foot Pain"
                                                    checked={FootPain}
                                                    onChange={() => setFootPain(!FootPain)} />
                                            </CListGroupItem>
                                            <CListGroupItem>
                                                <CFormCheck label="Knee Replacement"
                                                    checked={Glaucoma}
                                                    onChange={() => setGlaucoma(!Glaucoma)} />
                                            </CListGroupItem>
                                        </CListGroup>
                                    </CCol>

                                    <CCol>
                                        <CListGroup>
                                            <CListGroupItem>
                                                <CFormCheck label="Joint Pain"
                                                    checked={AsthmaCOPD}
                                                    onChange={() => setAsthmaCOPD(!AsthmaCOPD)} />
                                            </CListGroupItem>
                                            <CListGroupItem>
                                                <CFormCheck label="Surgery"
                                                    checked={HerniaDiastasisRecti}
                                                    onChange={() => setHerniaDiastasisRecti(!HerniaDiastasisRecti)} />
                                            </CListGroupItem>
                                            <CListGroupItem>
                                                <CFormCheck label="High Blood Pressure"
                                                    checked={HighBloodPressure}
                                                    onChange={() => setHighBloodPressure(!HighBloodPressure)} />
                                            </CListGroupItem>
                                            <CListGroupItem>
                                                <CFormCheck label="Other"
                                                    checked={Other}
                                                    onChange={() => setOther(!Other)} />
                                            </CListGroupItem>
                                        </CListGroup>
                                    </CCol>
                                    {Other && (
                                        <CCol lg={12}>
                                            <CFormInput
                                                className="mb-1"
                                                type="text"
                                                id="exampleFormControlInput1"
                                                value={OtherText}
                                                onChange={(e) => setOtherText(e.target.value)}
                                                label="Other Reason"
                                                placeholder="Enter Other Reason"
                                            />
                                        </CCol>
                                    )}
                                </CRow>
                                <CButton className='mt-2' onClick={() => saveMember()}>Next</CButton>
                            </CForm>
                        </CTabPane>

                        <CTabPane role="tabpane2" aria-labelledby="second-tab" visible={activeKey === 2}>
                            <CForm>
                                <CRow>
                                    <CCol xs={6}>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            id="exampleFormControlInput1"
                                            value={Height}
                                            onChange={(e) => setHeight(e.target.value)}
                                            label="Height"
                                            placeholder="Enter height"
                                        />
                                    </CCol>
                                    <CCol xs={6}>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            id="exampleFormControlInput1"
                                            value={Weight}
                                            onChange={(e) => setWeight(e.target.value)}
                                            label="Weight"
                                            placeholder="Enter Weight"
                                        />
                                    </CCol>
                                    <CCardTitle>Fitness Goals</CCardTitle>

                                    <CCol xs={6}>
                                        <CFormSelect
                                            className="mb-1"
                                            aria-label="Select Currency"
                                            value={fitnessLevel}
                                            onChange={(e) => setfitnessLevel(e.target.value)}
                                            label="Fitness Level"
                                            options={[
                                                "Select Fitness Level",
                                                { label: "New", value: "1" },
                                                { label: "Beginner", value: "2" },
                                                { label: "Intermediate", value: "3" },
                                                { label: "Advance", value: "4" },
                                            ]}
                                        />
                                    </CCol>
                                    <CCol xs={3}>
                                        <CFormSelect
                                            className="mb-1"
                                            value={fitnessGoal}
                                            onChange={(e) => setfitnessGoal(e.target.value)}
                                            aria-label="Select Currency"
                                            label="Fitness Goal"
                                            options={[
                                                "Select Fitness Goal",
                                                { label: "Weight loss", value: "Weight loss" },
                                                { label: "Inch loss", value: "Inch loss" },
                                                { label: "Fitness", value: "Fitness" },
                                                { label: "Staminess", value: "Staminess" },
                                            ]}
                                        />
                                    </CCol>
                                    <CCol xs={3}>
                                        <CFormInput
                                            className="mb-1"
                                            value={idealWeight}
                                            onChange={(e) => setidealWeight(e.target.value)}
                                            type="text"
                                            id="exampleFormControlInput1"
                                            label="Ideal Weight"
                                            placeholder="Enter Ideal Weight"
                                        />
                                    </CCol>
                                    <CCol>
                                        <CFormTextarea
                                            id="exampleFormControlTextarea1"
                                            value={suggestion}
                                            onChange={(e) => setsuggestion(e.target.value)}
                                            label="Suggestion"
                                            rows="2"
                                            text="Must be 8-20 words long."
                                        ></CFormTextarea>
                                    </CCol>
                                    <CCol>

                                        <CFormTextarea
                                            id="exampleFormControlTextarea1"
                                            value={comments}
                                            onChange={(e) => setcomments(e.target.value)}
                                            label="Comments"
                                            rows="2"
                                            text="Must be 8-20 words long."
                                        ></CFormTextarea>
                                    </CCol>
                                </CRow>

                                <CButton className='mt-2' onClick={() =>  updateClientInfo()}>Save</CButton>
                            </CForm>
                        </CTabPane>

                    </CTabContent>

                   

                 
                </CCardBody>
            </CCard>
        </>


    )
}

export default ProfileDetails
