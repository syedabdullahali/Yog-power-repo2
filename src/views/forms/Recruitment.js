import { CButton, CCard, CCardBody, CCardHeader, CCardTitle, CCol, CForm, CFormInput, CFormSelect, CFormTextarea, CImage, CRow } from '@coreui/react'
import axios from 'axios'
import { getDownloadURL, ref,  uploadBytesResumable } from 'firebase/storage'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProfileIcon from 'src/assets/images/avatars/profile_icon.png'
import { storage } from 'src/firebase'
import { v4 } from 'uuid'
import { useSelector } from 'react-redux';
import { cilArrowCircleBottom} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const url = 'https://yog-seven.vercel.app'
const url2 = 'https://yog-seven.vercel.app'

const Recruitment = () => {

    const url1 = useSelector((el) => el.domainOfApi)
    
    const [error, setError] = useState('')
    const [image, setImage] = useState('')
    const [imageUrl, setImageUrl] = useState(null)
    const [Fullname, setFullname] = useState('')
    const [age, setAge] = useState('')
    const [ContactNumber, setContactNumber] = useState('')
    const [Designation, setDesignation] = useState('')
    const [Email, setEmail] = useState('')
    const [Gender, setGender] = useState('')
    const [resume, setResume] = useState(null)
    const [resumeUrl, setResumeUrl] = useState(null)
    const [Department, setDepartment] = useState('')
    const [Address, setAddress] = useState('')
    const [Area, setArea] = useState('')
    const [city, setCity] = useState('')
    const [pincode, setPincode] = useState('')
    const [state, setState] = useState('')
    const [Salary, setSalary] = useState('')
    const [Source, setSource] = useState('')
    const [grade, setgrade] = useState('')
    const [comment, setComment] = useState('')

    const [imgPrograss,setImgPrograss] = useState(0)
    const [resumePrograss,setResumePrograss] = useState(0)


    const resumeInput = useRef('')
    const imageInput = useRef('')
  


    const navigate = useNavigate()
    let user = JSON.parse(localStorage.getItem('user-info'))
    console.log(user);
    const token = user.token;
    const username = user.user.username;

    useEffect(() => {
        getLeadSource()
    }, [])
    const [leadArr, setLeadArr] = useState([]);
    
    function getLeadSource() {
        axios.get(`${url2}/leadSourceMaster/all`, {
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

    const [result, setResult] = useState([])


    function getDesignation() {
        axios.get(`${url1}/designation/all`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
            console.log(res.data)
                setResult(res.data.reverse())

            })
            .catch((error) => {
                console.error(error)
            })
    }

useEffect(()=>{
    getDesignation()
},[])


    const saveRecruitment = (e) => {
        if (imageUrl !== null && resumeUrl !== null  &&  Fullname !== '' && Salary !== '' &&
            Email !== ''  && pincode !== '' && state !== ''  && Gender !== '' && Address !== '') {

            let data = {
                username: username ,
                image: imageUrl,
                FullName: Fullname, EmailAddress: Email, ContactNumber,                
                Gender: Gender, address: Address, Area, city, 
                resume:  resumeUrl, PinCode: pincode, State: state,
                PayoutType: Source, Grade: grade, Comment: comment, 
                JobDesignation: Designation, Department: Department, Salary: Salary,
                status: false,CountryCode: 0,whatsappNumber: 0,
                DateofBirth:new Date(),Age:age,EmployeeCategory: "",loginAccess: false,
                Anniversary: new Date(),AdminRights: "",joiningDate:"",EmployeeID: "",AttendanceID: "",
                AccountNo: "",IFSC: "",PANCardNumber:"",AadharNumber: 0,PANCard:"",AadharCard: "",
                selected: "",status:false,OfferLetter: "",AppoinmentLetter:"",Indexion: ""
            }
            console.log(data)

            fetch(`${url1}/employeeform`, {
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
                    e?.preventDefault();
                    console.log("refresh prevented");
                    navigate('/forms/staff-form')
                })
            })
        } else {
            setError('Please Fill All Details')
        }
    }



    const imgRef = useRef(null)

    const HandaleImageClick = () =>{
        imageInput.current.click()
       }


    const handleImage = event => {
        const fileUploaded = event.target.files[0];
        const file = event.target.files[0] 
        const reader = new FileReader();
        if (!file.type.startsWith('image/')) return;

        reader.onload = (e) => {
            imgRef.current.src = e.target.result
        }
        reader.readAsDataURL(file)

            const uploadImage = (file)=>{
              if(!fileUploaded)return
             const storageRef =   ref(storage,`profile-photo/${fileUploaded.name}`)
             const uploadTask = uploadBytesResumable(storageRef,fileUploaded)
      
             uploadTask.on("state_changed",(snapshot)=>{
              const prog = Math.round((snapshot.bytesTransferred/snapshot.totalBytes) *100)
              setImgPrograss(prog)
      
             },(error)=>{
              console.log(error)
             },
             ()=>{
              getDownloadURL(uploadTask.snapshot.ref).then((url)=>{
                setImageUrl(url)
              })
             }
             )
            }
            uploadImage(file)
      };

   

    const HandaleResumeInputChange = event => {
        const file = event.target.files[0] 
            const uploadResume = (file)=>{
              if(!file)return
             const storageRef =   ref(storage,`resume/${file.name}`)
             const uploadTask = uploadBytesResumable(storageRef,file)
      
             uploadTask.on("state_changed",(snapshot)=>{
              const prog = Math.round((snapshot.bytesTransferred/snapshot.totalBytes) *100)
              setResumePrograss(prog)
      
             },(error)=>{
              console.log(error)
             },
             ()=>{
              getDownloadURL(uploadTask.snapshot.ref).then((url)=>{

               setResumeUrl(url)
              })
             }
             )
            }
            uploadResume(file)
      };

      const HandaleResumeInputClick  = () =>{
         resumeInput.current.click()
    }

   console.log(resumeUrl)
   console.log(imageUrl)



    return (
        <>
           <CRow className='mb-2 ms-2'>
                <CCard color={'primary'} 
                style={{ padding: '10px', color: '#ffffff', width: '100px', margin: '3px', cursor: 'pointer' }}
                >
                    Step-1
                </CCard>
            </CRow>
                <CCard>
                    <CCardHeader>
                        <CCardTitle>Recruitment Application</CCardTitle>
                    </CCardHeader>
                    <CCardBody>
                        <CForm>
                            
                            <CRow>
                                <CCol lg={3} sm={6} className='mt-2 mb-1' >
                                    <CImage ref={imgRef} className="mb-1" style={{ borderRadius: "100px" }} width={'200px'} src={ProfileIcon} />
                                </CCol>
                                <CCol lg={8} sm={6} className='mt-5'>
                                    <CFormInput
                                        className="mb-1 mr-3"
                                        type="file"
                                        onChange={handleImage}
                                        accept="image/*"
                                        ref={imageInput}
                                        hidden
                                    />
                                    <CButton onClick={HandaleImageClick} > <CIcon icon={cilArrowCircleBottom} /> {imgPrograss}% Upload Image</CButton>

                                </CCol>
                                <CCol lg={6} md={6} sm={12}>
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
                                <CCol lg={6} md={6} sm={12}>
                                    <CFormInput
                                        className="mb-1"
                                        type="number"
                                        id="exampleFormControlInput1"
                                        label="Contact Number"
                                        maxLength={10}
                                        value={ContactNumber}
                                        onChange={(e) => setContactNumber(e.target.value)}
                                        placeholder="Enter Contact Number"
                                    />
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol lg={5} md={6} sm={12}>
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
                                <CCol lg={4} md={6} sm={8}>
                                    <CFormSelect
                                        className="mb-1"
                                        aria-label="Select Currency"
                                        value={Gender}
                                        onChange={(e) => setGender(e.target.value)}
                                        label="Gander"
                                    >
                                        <option>Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </CFormSelect>
                                </CCol>

                                <CCol lg={3} md={6} sm={4}>
                                    <CFormInput
                                        className="mb-1"
                                        type="number"
                                        id="exampleFormControlInput1"
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)}
                                        label="Age"
                                        placeholder="Enter Your Age"
                                    />
                                </CCol>
                            </CRow>

                            <CCol>
                                <CFormTextarea
                                    id="exampleFormControlTextarea1"
                                    label="Address"
                                    value={Address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    rows="3"
                                    text="Must be 8-20 words long."
                                ></CFormTextarea>
                            </CCol>
                            <CRow>
                                <CCol lg={6} md={6} sm={12}>
                                    <CFormInput
                                        className="mb-1"
                                        type="text"
                                        id="exampleFormControlInput1"
                                        value={Area}
                                        onChange={(e) => setArea(e.target.value)}
                                        label="Area"
                                        placeholder="Enter Area"
                                    />
                                </CCol>
                                <CCol lg={6} md={6} sm={12}>
                                    <CFormInput
                                        className="mb-1"
                                        type="text"
                                        id="exampleFormControlInput1"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        label="City"
                                        placeholder="Enter City"
                                    />
                                </CCol>
                                
                            </CRow>
                            <CRow>
                                <CCol lg={6} md={6} sm={12}>
                                    <CFormInput
                                        className="mb-1"
                                        type="text"
                                        id="exampleFormControlInput1"
                                        value={pincode}
                                        maxLength={6}
                                        onChange={(e) => setPincode(e.target.value)}
                                        label="Pin Code"
                                        placeholder="Enter Pin Code"
                                    />
                                </CCol>
                                <CCol lg={6} md={6} sm={12}>
                                    <CFormInput
                                        className="mb-1"
                                        type="text"
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                        id="exampleFormControlInput1"
                                        label="State"
                                        placeholder="Enter State"
                                    />
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol lg={6} md={6} sm={12}>
                                    <CFormSelect
                                                className="mb-1"
                                                aria-label="Select Assign Staff"
                                                value={Source}
                                                onChange={(e) => setSource(e.target.value)}
                                                label="Source"
                                            >
                                                <option>Select Source</option>
                                                {leadArr.filter((list) => list.username === username).map((item, index) => (
                                                    item.username === username && (
                                                     
                                                        <option key={index}>{item.LeadSource}</option>
                                                    )
                                    ))}</CFormSelect>
                                </CCol>
                                <CCol lg={6} md={6} sm={12}>

                                   <CFormSelect
                                                className="mb-1"
                                                aria-label="Select Job Department"
                                                value={Department}
                                                onChange={(e) => setDepartment(e.target.value)}
                                                label="Department"
                                            >                                               
                                             <option>Select Department</option>

                                                {result.map((el)=>{
                                                    if(el.username === username && el.status === true){
                                                      return el.department.trim().toLocaleLowerCase()
                                                    }
                                                   return false
                                                })
                                                .filter((el,i,arr)=>el?i===arr.indexOf(el):el) 
                                            
                                                .map((item, index) => (                                                   
                                                <option key={index} value={item}>{item}</option>                                                       
                                                    )
                                                )}
                                    </CFormSelect>
                               </CCol>
   
                            </CRow>
                            <CRow>

                            <CCol lg={6} md={6} sm={12}>

                                    <CFormSelect
                                                className="mb-1"
                                                aria-label="Select Job Designation"
                                                value={Designation}
                                                onChange={(e) => setDesignation(e.target.value)}
                                                label="Job Designation"
                                            >
                                             <option>Select Designation</option>
                                                {result.map((item, index) => (
                                                    item.username === username && Department === item.department.trim().toLocaleLowerCase()&&
                                                        item.status === true && (
                                                            <option key={index} value={item.jobDesignation}>{item.jobDesignation}</option>
                                                        )                             
                                                ))}
                                            </CFormSelect>
                            </CCol>
           
                        
                                <CCol lg={6} md={6} sm={12}>                                   
                                    <CFormInput
                                                className="mb-1"
                                                type="number"
                                                value={Salary}
                                                onChange={(e) => setSalary(e.target.value)}
                                                id="exampleFormControlInput1"
                                                label="CTC"
                                                placeholder="Enter Salary"
                                            />
                                </CCol>
                    
                            </CRow>

                            <CRow>
                            <CCol lg={6} md={6} sm={12}>
                                  <CFormSelect
                                                className="mb-1"
                                                aria-label="Select Grade"
                                                value={grade}
                                                onChange={(e) => setgrade(e.target.value)}
                                                label="Employee Type"
                                                options={[
                                                    "Select Grade",
                                                    { label: "Full Time", value: "Full Time" },
                                                    { label: "Part Time", value: "Part Time" },
                                                    { label: "Freelancer", value: "Freelancer" },
                                                    { label: "Consultant", value: "Consultant" },

                                                ]}
                                            />
                                </CCol>

                               <CCol lg={6} md={6} sm={12}>
                                     <CFormInput
                                                className="mb-1"
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                type="text"
                                                id="exampleFormControlInput1"
                                                label="Comments"
                                                placeholder="Add Comments"
                                            />
                                </CCol>
                                
                              
                            </CRow>

                            <CRow>
                            <CCol lg={6} md={6} sm={12}>
                                    <CFormInput
                                        className="mb-1"
                                        type="file"
                                        accept='pdf/*'
                                        ref={resumeInput}
                                        id="exampleFormControlInput1"
                                        onChange={HandaleResumeInputChange}
                                        hidden
                                    />


                                    <CButton className='mt-2' onClick={HandaleResumeInputClick}>  <CIcon icon={cilArrowCircleBottom} />  {resumePrograss}%  Upload Resume</CButton>
                                    <label style={{ color: 'red' }} className='ms-5'>{error}</label>
                                  
                                </CCol>
                                
                            </CRow>
                           
                            <CButton className="mt-4" onClick={() => {
                                saveRecruitment()
                            }}>Save</CButton>
                           
                        </CForm>
                    </CCardBody>
                </CCard>
            
           
        </>
    )
}

export default Recruitment
