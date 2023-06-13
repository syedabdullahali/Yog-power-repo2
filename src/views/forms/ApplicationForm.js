import { CButton, CCard, CCardBody, CCardHeader, CCardTitle, CCol, 
    CForm, CFormInput, CFormSelect, CFormSwitch, CFormTextarea, CImage, CRow} from '@coreui/react'
import React from 'react'
import ProfileIcon from 'src/assets/images/avatars/profile_icon.png'
import { storage } from 'src/firebase'
import { useSelector } from 'react-redux';

import { useState,useEffect,useRef } from 'react'
import axios from 'axios';

import { getDownloadURL, ref,  uploadBytesResumable } from 'firebase/storage'


const ApplicationForm = ({shouldEdit,data,editEnquiry,getStaff}) => {
    console.log(data)

const imgRef = useRef(null)
const [fullName,setFullName] = useState('')
const [contactNumber,setContactNumber] = useState('')
const [emailAddress,setEmailAddress] = useState('')
const [Gender, setGender] = useState('')
const [address,setAddress] = useState('')
const [age,setAge] = useState('')
const [resume, setResume] = useState(null)
const [jobDesignation,setJobDesignation] = useState('')
const [department,setDepartment] = useState('')
const [expSalary,setExpSalary] = useState('')
const [empCategory,setEmpCategory] = useState('')
const [payoutType,setPayouttype] = useState('')
const [Grade,setGrade] = useState('')
const [imageUrl,setImageUrl] = useState('')
const [comment,setComment]  = useState('')
const [result, setResult] = useState([])
const [leadArr, setLeadArr] = useState([]);
const [typesOfTime,setTypesOfTime] = useState('')

const [imgPrograss,setImgPrograss] = useState(0)

const imageInput = useRef('')


    const  formRenderParentObjeact = {  
            height:'100vh', 
            width:'100vw',
            background:'rgb(255,255,255,0.5)',
            position:'fixed',
            width: '99.6vw',
            background:'rgb(0,0,0,0.1)',
            top:'0',
            left:'0',
            zIndex:'10000',
            display:'flex',
            justifyContent:'center',   
    }

    const renderOverTheCurrentPage = shouldEdit ?formRenderParentObjeact:{display:'none'}


     
    const toggaleModel=(e)=>{
        console.log(e)
        if(e.target.className==='card Parent'){
            editEnquiry()
    }
}





console.log(data)
const AllowEditHandler = ()=>{
    setFullName(data.FullName)
    setContactNumber(data.ContactNumber)
    setEmailAddress(data.EmailAddress)
    setGender(data.Gender)
    setAddress(data.address)
    setAge(data.Age)
    setJobDesignation(data.JobDesignation)
    setDepartment(data.Department)
    setExpSalary(data.Salary )
    setEmpCategory(data.EmployeeCategory)
    setPayouttype(data.PayoutType)
    setGrade(data.Grade)
    setResume(data.resume)
    setImageUrl(data.image)
    setComment(data.Comment)
    setAge(data?.Age)
    setTypesOfTime(data.Grade)
    imgRef.current.src = data.image

}

useEffect(()=>{
AllowEditHandler(data)
},[data])
    

let obj = {
FullName:fullName, 
ContactNumber:contactNumber,
EmailAddress:emailAddress,  
Gender:Gender,
address:address,
Age:age,
JobDesignation:jobDesignation,
Departmen:department,
Salary:expSalary,
EmployeeCategory:empCategory,
PayoutType:payoutType,
Grade:Grade,
image:imageUrl,
Comment:comment,
resume:resume
}
const url = useSelector((el)=>el.domainOfApi) 

let user = JSON.parse(localStorage.getItem('user-info'))
console.log(user);
const token = user.token;
const username = user.user.username;


function Edit() {
        fetch(`${url}/employeeform/${data._id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({...data,...obj})
        }).then((result) => {
            result.json().then((resp) => {
                getStaff()    
                editEnquiry()
            })
        })
}



function getDesignation() {
    axios.get(`${`https://yog-seven.vercel.app`}/designation/all`, { headers: {
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
getLeadSource()
},[])


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
    

    return (
    <CCard style={renderOverTheCurrentPage} className='Parent' onClick={toggaleModel}>
        
        <CCard style={ {width:'70%',margin:'2% auto',overflowY:'scroll',height:'100%'}}>
            <div style={ {width:'100%'}}>
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
                            <CRow>
                                <CButton className="me-3 ms-3" style={{ margin: '5px', width: '200px' }} onClick={HandaleImageClick} > {imgPrograss}% Upload Image</CButton>
                                <CFormInput
                                        className="mb-1 mr-3"
                                        type="file"
                                        onChange={handleImage}
                                        accept="image/*"
                                        ref={imageInput}
                                        hidden
                                    />
                            </CRow>
                            <CRow>
                                <CButton className="me-3 ms-3" style={{ margin: '5px', width: '200px' }}>Capture Image</CButton>
                            </CRow>
                        </CCol>
                        <CCol xs={6}>
                            <CFormInput
                                className="mb-1"
                                type="text"
                                id="exampleFormControlInput1"
                                label="Full name"
                                placeholder="Enter Name"
                                value={fullName}
                                onChange={(e)=>setFullName(e.target.value)}
                            />
                        </CCol>
                        <CCol xs={6}>
                            <CFormInput
                                className="mb-1"
                                type="number"
                                id="exampleFormControlInput1"
                                label="Contact Number"
                                placeholder="Enter Contact Number"
                                value={contactNumber}
                                onChange={(e)=>setContactNumber(e.target.value)}
                            />
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol>
                            <CFormInput
                                className="mb-1"
                                type="email"
                                id="exampleFormControlInput1"
                                label="Email address"
                                placeholder="name@example.com"
                                text="Must be 8-20 characters long."
                                aria-describedby="exampleFormControlInputHelpInline"
                                value={emailAddress}
                                onChange={(e)=>setEmailAddress(e.target.value)}
                            />
                        </CCol>
                        <CCol>
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
                    </CRow>
                    <CCol>
                        <CFormTextarea
                            id="exampleFormControlTextarea1"
                            label="Address"
                            rows="2"
                            text="Must be 8-20 words long."
                            value={address}
                            onChange={(e)=>setAddress(e.target.value)}
                        ></CFormTextarea>
                    </CCol>
                    <CRow>
                        <CCol>
                            <CFormInput
                                className="mb-1"
                                type="number"
                                id="exampleFormControlInput1"
                                label="Age"
                                placeholder="Enter Your Age"
                                value={age}
                                onChange={(e)=>setAge(e.target.value)}
                            />
                        </CCol>
                        <CCol lg={6} md={6} sm={12}>
                         <CFormInput
                                        className="mb-1"
                                        type="file"
                                        accept='pdf/*'
                                        onChange={(e) => setResume(e.target.files[0])}
                                        id="exampleFormControlInput1"
                                        label="Upload Resume"
                                        placeholder="Enter Upload Resume"
                            />
                     </CCol>
                    </CRow>

                    <CRow>

                     
                        <CCol xs={4}>
                            <CFormSelect
                                className="mb-1"
                                aria-label="Select Job Designation"
                                label="Department"
                                value={department}
                                onChange={(e)=>setDepartment(e.target.value)}
                             
                            >
                              <option>Select Department</option>

                           {result.map((item, index) => (
                                   item.username === username && (
                            item.status === true && (
                           <option key={index} value={item.department}>{item.department}</option>
                           ))))}
                            </CFormSelect>
                        </CCol>

                        <CCol xs={4}>
                            <CFormSelect
                                className="mb-1"
                                aria-label="Select Job Designation"
                                label="Job Designation"
                                value={jobDesignation}
                                onChange={(e)=>setJobDesignation(e.target.value)}
                              
                            >
                                        {result.map((item, index) => (
                                            item.username === username && department === item.department &&
                                            item.status === true && (
                                                <option key={index} value={item.jobDesignation}>{item.jobDesignation}</option>
                                            )

                                        ))}
                            </CFormSelect>
                        </CCol>
                        <CCol xs={4}>
                            <CFormInput
                                className="mb-1"
                                type="number"
                                id="exampleFormControlInput1"
                                label="Exp Salary"
                                placeholder="Enter Exp Salary"
                                value={expSalary}
                                onChange={(e)=>setExpSalary(e.target.value)}
                            />
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol>
                            <CFormSelect
                                className="mb-1"
                                aria-label="Select Employee Category"
                                label="Employee Category"
                                value={empCategory}
                                onChange={(e)=> setEmpCategory(e.target.value)}
                                options={[
                                    "Select Employee Category",
                                    { label: "Employee", value: "1" },
                                    { label: "Consultant", value: "2" },
                                ]}
                            />
                        </CCol>
                        <CCol>

                            <CFormSelect
                                className="mb-1"
                                aria-label="Select Payout Type"
                                label="Source"
                                value={payoutType}
                                onChange={(e)=>setPayouttype(e.target.value)}
                                options={[
                                    "Select Grade",
                                    { label: "Employee", value: "1" },
                                    { label: "Consultant", value: "2" },
                                ]}
                            />                            
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol xs={3}>
                            <CFormSelect
                                className="mb-1"
                                aria-label="Select Grade"
                                label="Types of Time"
                                value={typesOfTime}
                                onChange={(e)=>{setTypesOfTime(e.target.value)}}
                                options={[
                                    "Select Types of Time",
                                    { label: "Full Time", value: "Full Time" },
                                    { label: "Part Time", value: "Part Time" },
                                    { label: "Freelancer", value: "Freelancer" },
                                    { label: "Consultant", value: "Consultant" },
                                ]}


                            />
                        </CCol>
                        <CCol>
                            <CFormInput
                                className="mb-1"
                                type="text"
                                id="exampleFormControlInput1"
                                label="Comments"
                                placeholder="Add Comments"
                                value={comment}
                                onChange={(e)=>setComment(e.target.value)}
                            />
                        </CCol>
                    </CRow>

                    <CButton className="mt-2" onClick={Edit}>Save</CButton>
                </CForm>
            </CCardBody>
            </div>
        </CCard>
    </CCard>
    )
}

export default ApplicationForm
