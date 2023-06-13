import React,{useEffect, useState,useRef} from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'

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
    CImage,
    CFormTextarea
} from '@coreui/react'
import ProfileIcon from 'src/assets/images/avatars/profile_icon.png'
import moment from 'moment/moment'


const EmployeeProfile = ({id,Edit,getStaff2}) => {

const [EmployeeData,setEmployeeData] = useState([])
const url = useSelector((el)=>el.domainOfApi) 
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
const [typesOfTime,setTypesOfTime] = useState('')
const [result, setResult] = useState([])
const [dateOfBirth, setDateOfBirth] = useState('')
const [Anniversary, setAnniversary] = useState('')
const [joiningDate, setJoiningDate] = useState('')
const [EmployeeID, setEmployeeID] = useState('')
const [AttendanceID, setAttendanceID] = useState('')
const [accountNo, setAccountNo] = useState('')
const [IFSCCode, setIFSCCode] = useState('')
const [PANNo, setPANNo] = useState('')
const [aadharNo, setAadharNo] = useState('')





let user = JSON.parse(localStorage.getItem('user-info'))
console.log(user);
const token = user.token;
const username = user.user.username;

console.log(dateOfBirth)
function getStaff() {
        if(!id){
return
        }
        axios.get(`${url}/employeeform/${id}`)
            .then((res) => {
                console.log(res.data)
                setEmployeeData(res.data)
                setFullName(res.data.FullName)
                setContactNumber(res.data.ContactNumber)
                setEmailAddress(res.data.EmailAddress)
                setGender(res.data.Gender)
                setAddress(res.data.address)
                setAge(res.data.Age)
                setDateOfBirth(moment(res.data.DateofBirth).format('YYYY-MM-DD'))
                setDepartment(res.data.Department)
                setJobDesignation(res.data.JobDesignation)
                setExpSalary(res?.data?.Salary *12)
                setJoiningDate(moment(res.data.joiningDate).format('YYYY-MM-DD'))
                setEmpCategory(res.data.EmployeeCategory)
                setAnniversary(moment(res.data.Anniversary).format('YYYY-MM-DD'))
                setEmployeeID(res.data.EmployeeID)
                setAttendanceID(res.data.AttendanceID)
                setAccountNo(res.data.AccountNo)
                setIFSCCode(res.data.IFSC)
                setPANNo(res.data.PANCard)
                setAadharNo(res.data.AadharNumber)
                imgRef.current.src= res.data.image                  
            })
            .catch((error) => {
                console.error(error)
            })
    }

useEffect(()=>{
       getStaff()
       getDesignation()

},[])


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


// Editing Scope //////////////////////////////////////////////////////////////////////////////

 const EmpObjToEdit = {
    FullName:fullName, 
    ContactNumber:contactNumber,
    EmailAddress:emailAddress,  
    Gender:Gender,
    address:address,
    Age:age,
    JobDesignation:jobDesignation,
    Department:department,
    Salary:expSalary,
    EmployeeCategory:empCategory,
    PayoutType:payoutType,
    Grade:Grade,
    image:imageUrl,
    Comment:comment,
    resume:resume,
    "DateofBirth": dateOfBirth,
    "Anniversary":  Anniversary,
    "joiningDate": joiningDate,
    "EmployeeID": EmployeeID,
    "AttendanceID": AttendanceID,
    "AccountNo":  accountNo,
    "IFSC": IFSCCode,
    "AadharNumber": aadharNo,
    "PANCard": PANNo,
    "selected": "Select",
    "status":true
 }
  
function updateEmpolyee(){
    axios.put(`${url}/employeeform/${id}`,EmpObjToEdit,{ headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }}).then(()=>{
        alert('Successfully save')
        getStaff2()
    })

}







  return (
        
    <CCard>
        <CCardHeader style={{ backgroundColor: "#0B5345", color: "white" }}>
            <CCardTitle>Empolyee Profile Info</CCardTitle>
        </CCardHeader>
        <CCardBody>
                <CRow>
                    <CCol  lg={12} md={12} className='mt-2 mb-1' >
                       <CImage ref={imgRef} className="mb-1" style={{ borderRadius: "100px" }} width={'200px'} src={ProfileIcon} />
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
                   
                                          <CCol >
                                             <CFormInput
                                                 className="mb-1"
                                                 type="date"
                                                 id="exampleFormControlInput1"
                                                 value={dateOfBirth}
                                                 onChange={(e) => setDateOfBirth(e.target.value)}
                                                 label="Date of Birth"
                                                 placeholder="Enter date"
                                             />
                                         </CCol> 
                         </CRow>

                <CRow>

                 
                    <CCol xs={4}>
                        <CFormInput
                            className="mb-1"
                            aria-label="Select Job Designation"
                            label="Department"
                            value={department}
                            onChange={(e)=>setDepartment(e.target.value)}
                         
                        />
                    </CCol>

                    <CCol xs={4}>
                        <CFormInput
                            className="mb-1"
                            aria-label="Select Job Designation"
                            label="Job Designation"
                            value={jobDesignation}
                            onChange={(e)=>setJobDesignation(e.target.value)}
                          
                        />
                                    
                    </CCol>
                    <CCol xs={4}>
                        <CFormInput
                            className="mb-1"
                            type="number"
                            id="exampleFormControlInput1"
                            label="CTC"
                            value={expSalary}
                            onChange={(e)=>setExpSalary(e.target.value)}
                        />
                    </CCol>
                </CRow>
                <CRow>
                  
                    <CCol>

                        <CFormSelect
                            className="mb-1"
                            aria-label="Select Payout Type"
                            label="Source"
                            value={payoutType}
                            onChange={(e)=>setPayouttype(e.target.value)}
                            options={[
                                "Select Grade",
                                // { label: "Employee", value: "1" },
                                // { label: "Consultant", value: "2" },
                            ]}
                        />                            
                    </CCol>

                    <CCol >
                                            <CFormInput
                                                className="mb-1"
                                                type="date"
                                                value={joiningDate}
                                                onChange={(e) => setJoiningDate(e.target.value)}
                                                id="exampleFormControlInput1"
                                                label="Date of Joining"
                                                placeholder="Enter Date of Joining"
                                            />
                                        </CCol> 
                </CRow>
                <CRow>
                    <CCol >
                        <CFormSelect
                            className="mb-1"
                            aria-label="Select Grade"
                            label="Job Timeing"
                            value={typesOfTime}
                            onChange={(e)=>{setTypesOfTime(e.target.value)}}
                            options={[
                                "Select Job Timeing",
                                // { label: "Full Time", value: "Full Time" },
                                // { label: "Part Time", value: "Part Time" },
                                // { label: "Freelancer", value: "Freelancer" },
                                // { label: "Consultant", value: "Consultant" },
                            ]}


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
                                          <CCol xs={6}>
                                             <CFormInput
                                                 className="mb-1"
                                                 type="date"
                                                 id="exampleFormControlInput1"
                                                 value={Anniversary}
                                                 onChange={(e) => setAnniversary(e.target.value)}
                                                 label="Anniversary"
                                                 placeholder="Enter Anniversary"
                                             />
                                         </CCol> 
                                         
                                          

                                        <CCol xs={6}>
                                        <CFormSelect
                                                 className="mb-1"
                                                 aria-label="Select Employee Category"
                                                 value={empCategory}
                                                 onChange={(e) => setEmpCategory(e.target.value)}
                                                 label="Employee Category"
                                                 options={[
                                                     "Select Employee Category",
                                                     { label: "Full Time", value: "Full Time" },
                                                     { label: "Part Time", value: "Part Time" },
                                                     { label: "Freelancer", value: "Freelancer" },
                                                     { label: "Consultant", value: "Consultant" },
                                                 ]}
                                             />
                                         </CCol> 

                                          
                                         <CCol xs={6}>
                                             <CFormInput
                                                 className="mb-1"
                                                 type="text"
                                                 id="exampleFormControlInput1"
                                                 value={EmployeeID}
                                                 onChange={(e) => setEmployeeID(e.target.value)}
                                                 label="Employee ID"
                                                 placeholder="Enter Employee ID"
                                             />
                                               

                                         </CCol>
                                         <CCol xs={6}>
                                             <CFormInput
                                                 className="mb-1"
                                                 type="text"
                                                 id="exampleFormControlInput1"
                                                 value={AttendanceID}
                                                 onChange={(e) => setAttendanceID(e.target.value)}
                                                 label="Attendance ID"
                                                 placeholder="Enter Attendance ID"
                                             />
                                                
                                         </CCol>
                                         <CCol xs={6}>
                                            <CFormInput
                                                className="mb-1"
                                                type="number"
                                                value={accountNo}
                                                onChange={(e) => setAccountNo(e.target.value)}
                                                id="exampleFormControlInput1"
                                                label="Account No"
                                                placeholder="Enter Account No"
                                            />
                                        </CCol>
                                        <CCol xs={6}>
                                             <CFormInput
                                                 className="mb-1"
                                                 type="text"
                                                 id="exampleFormControlInput1"
                                                 value={IFSCCode}
                                                 onChange={(e) => setIFSCCode(e.target.value)}
                                                 label="IFSC"
                                                 placeholder="Enter IFSC"
                                             />
                                         </CCol>
                                         <CCol xs={6}>
                                             <CFormInput
                                                 className="mb-1"
                                                 type="text"
                                                 id="exampleFormControlInput1"
                                                 value={PANNo}
                                                 onChange={(e) => setPANNo(e.target.value)}
                                                 label="PAN Card"
                                                 placeholder="Enter PAN Card"
                                             />
                                         </CCol>
                                         <CCol xs={6}>
                                             <CFormInput
                                                 className="mb-1"
                                                 type="number"
                                                 value={aadharNo}
                                                 onChange={(e) => setAadharNo(e.target.value)}
                                                 id="exampleFormControlInput1"
                                                 label="Aadhar Number"
                                                 placeholder="Enter Aadhar Number"
                                             />
                                         </CCol>
                                       
               </CRow>

               <CRow>
                   <CCol>
                      {Edit&&<CButton onClick={updateEmpolyee}>Save</CButton>}
                   </CCol>
               </CRow>
                                      
                </CRow>


        </CCardBody>
</CCard>
  )
}

export default EmployeeProfile
