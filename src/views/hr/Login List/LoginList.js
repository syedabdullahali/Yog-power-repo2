import React, { useEffect, useRef} from 'react'
import { useState } from 'react'
import { MdDelete,MdEdit } from 'react-icons/md'
import {
    CButton,   
    CCol,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CCard,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CImage,
    CForm,
    CFormInput,
    CInputGroupText,
    CInputGroup,
    CFormSelect,
    CDropdown,
    CDropdownToggle,
    CDropdownMenu,
    CDropdownItem,
    CFormSwitch
} from '@coreui/react'
import { useSelector } from 'react-redux'
import CustomSelectInput from 'src/views/Master/HRMaster/CustomSelectInput/CustomSelectInput'
import axios from 'axios'
const LoginList = () => {

    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;
    const username = user.user.username;
    const centerCode = user.user.centerCode;

   const url = useSelector((el)=>el.domainOfApi) 


   const headers = {
    "Authorization": `Bearer ${token}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
   }
  const [CFormActive,setActiveForm] = useState(false)
  const [viewPas,setViewPas] = useState(false)
  const [staff, setStaff] = useState([])
  const [slectedStaffObj,setSelectedStaffObj]  = useState({})
  const [activeUpdate,setActiveUpdate] = useState('')
  const [allEmailData,setAllEmailData] = useState([])
  const [isAdimn,setIsAdmin] = useState(false)
  
  const [clientReferance,setClientReferance] = useState({
    clientName:'',
    clientId:'',
    mobNo:0
  })


  const obj = {

    username:' ',
    email: '',
    password: '',
    center: '',
    centerCode: '',
    status: true,
    Designation:'',
    empName:'',
    empId:'',
    mobNo:0,
    MemBerId:'no',
    createdBy:username,
    createrId:'no',
    isAdmin:false
  }


  const [emailObj,setEmailObj] = useState({...obj}) 


  function getAllEmailIdList(){
    axios.get(`${url}/signup/all`, {headers})
        .then((res) => {
          if(res.status===200){
            console.log(res.data)
            setAllEmailData(res.data) 
          }
        })
        .catch((error) => {
            console.error(error)
        })
  }


  function getStaff() {
      axios.get(`${url}/employeeform`, { headers})
          .then((res) => {
            if(res.status===200){
                console.log(res.data)
                setStaff(res.data.filter((list) => list.username === username &&
                list.selected === 'Select'))
            }
          })
          .catch((error) => {
              console.error(error)
          })
  }

  useEffect(()=>{
    if(!Object.values(slectedStaffObj).length){
        getStaff()
        getAllEmailIdList()
    }
    if(Object.values(slectedStaffObj).length){
        console.log(slectedStaffObj)
        setEmailObj(prev=>({...prev,mobNo:slectedStaffObj.ContactNumber}))
        setEmailObj(prev=>({...prev,empId:slectedStaffObj.EmployeeID}))
        setEmailObj(prev=>({...prev,Designation:slectedStaffObj.JobDesignation}))
        setEmailObj(prev=>({...prev,empName:slectedStaffObj.FullName}))
        setEmailObj(prev=>({...prev,username:slectedStaffObj.FullName}))
        setEmailObj(prev=>({...prev,email:slectedStaffObj.EmailAddress}))
        setEmailObj(prev=>({...prev,MemBerId:slectedStaffObj._id}))
    }

  },[slectedStaffObj._id])


  function clientObj(obj){
    setSelectedStaffObj({...obj})
    setEmailObj((prev)=>({...prev,empName:obj.FullName}))
 }





 const saveData = async (type)=>{
    let response ={}

    console.log(emailObj)
    try{
      if(type==='Save'){
        response = await  axios.post(`${url}/signup/create`,emailObj,{headers})
      }
      if(type==='Update'){
       response = await  axios.post(`${url}/signup/update/${activeUpdate}`,emailObj,{headers})
      }
  
     if(response?.status===200){
        getAllEmailIdList()
      alert('successfully save')
     }
      }catch(error){
        console.error(error)
      }
  }

  function deleteLeave(item) {
   
    if(item.isAdmin){
         alert("Admin Can't be Delete")
         return
    }

    if (confirm('Do you want to delete this')) {
        fetch(`${url}/signup/delete/${item._id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((result) => {
            result.json().then((resp) => {
                getAllEmailIdList()
            })
        })
    }
  }

  function toUppdateSwitch(val,id){
    axios.post(`${url}/signup/update/${id}`,{status:!val},{headers}).then((res)=>{
      if(res.status===200){
        getAllEmailIdList()

      }
    })
  }


  function toEditEmail(el){
   setActiveForm(true)
   setActiveUpdate(el?._id)
   setIsAdmin(el.Admin)
   setEmailObj(()=>({
    username:el.username,
    email: el.email,
    password: el.password,
    center: el.center,
    centerCode: el.centerCode,
    status: el.status,
    Designation:el.Designation,
    empName:el.empName,
    empId:el.empId,
    mobNo:el.mobNo,
    MemBerId:el.MemBerId,
    createdBy:el.createdBy,
    createrId:el.createrId,
    isAdmin:(el.isAdmin===undefined&&false)
   }))
  }


  return (
    <CCol >
        <CCard className='text-start' style={{display:`${CFormActive?'Block':'none' }`}}>
        <CForm className='p-4'>

            <CRow className='p-0'>

              <CCol className='text-end' lg={12} md={12} sm={12} sx={12}>
                <CButton color='danger' onClick={()=>{
                    setActiveForm(false)
                    setEmailObj({...obj})
                    setSelectedStaffObj({})   
                    setClientReferance(()=>({clientName:'',clientId:''})) 
                }} >Close</CButton>
                </CCol>
                
                <CCol lg={4} md={6} >
                    <CFormInput type='text'  label='Center Name' value={emailObj.center} onChange={(e)=> setEmailObj(prev=>({...prev,center:e.target.value}))} />
                </CCol>
                <CCol lg={4} md={6} >
                    <CFormInput type='text' label='Center Code' value={emailObj.centerCode} onChange={(e)=> setEmailObj(prev=>({...prev,centerCode:e.target.value}))}/>
                </CCol>
                <CCol lg={4} md={6} >
                
                                  {/* <label className="mb-2">Select Employee </label> */}
                                    {/* <CustomSelectInput data={staff} 
                                    title={clientReferance.clientName?.trim()?clientReferance.clientName:"Select Employee Name"}
                                     getData={clientObj}/> */}
                                     <label className='mb-1'>User Name</label>

<CDropdown  className="secondary p-0 m- w-100 border-0" style={{height:'fit-content'}} >
  <CDropdownToggle className="secondary p-0 m-0 h-100 w-100 border-0" style={{background:'transparent'}}> 
  <CFormInput
    value={emailObj.empName}
    onChange={(e)=>setEmailObj(prev=>({...prev,empName:e.target.value,username:e.target.value}))}
                                     
/></CDropdownToggle>
<CDropdownMenu style={{ height:'fit-content',marginTop:'70px'}}  className="secondary p-0 w-100 " >
    <div style={{maxHeight:'250px' ,overflowY:'scroll'}}>
    {staff.filter((el)=>el.FullName?.toLocaleLowerCase()?.trim()?.includes(emailObj?.empName?.toLocaleLowerCase()?.trim())).map((el,i)=>
      <CDropdownItem key={i} onClick={()=>clientObj(el)} >{el.FullName}<br/>{el.EmployeeID}</CDropdownItem>
    )}
    </div>

</CDropdownMenu>
</CDropdown>

                                     
                         </CCol>
                         <CCol lg={4} md={6} > 
                    <CFormInput type='number' label='Contact No'  value={emailObj.mobNo} onChange={(e)=> setEmailObj(prev=>({...prev,mobNo:e.target.value}))} />
                </CCol>

                <CCol lg={4}  md={6}>
                    <CFormInput type='text' label='Emp Id'  value={emailObj.empId} onChange={(e)=> setEmailObj(prev=>({...prev,empId:e.target.value}))} />
                </CCol>
                {/* <CCol lg={4}  md={6}>
                    <CFormInput type='text' label='User Id'  value={emailObj.username} onChange={(e)=> setEmailObj(prev=>({...prev,username:e.target.value}))} />
                </CCol> */}
                <CCol lg={4} md={6} >
                    <CFormInput type='text' label='Designation' value={emailObj.Designation} onChange={(e)=> setEmailObj(prev=>({...prev,Designation:e.target.value}))} />
                </CCol>
                <CCol lg={4} md={6} > 
                    <CFormInput type='email' label='Email Id'  value={emailObj.email} onChange={(e)=> setEmailObj(prev=>({...prev,email:e.target.value}))} />
                </CCol>
                
                <CCol lg={4} md={6} className='py-0' >
                    <p className='m-0 mt-2'>Password</p>
                    <CInputGroup className="m-0 mb-3 py-0">
                    <CInputGroupText style={{cursor:'pointer'}} id="basic-addon2" onClick={((e)=>{if(e.target.id==="basic-addon2"){setViewPas(val=>!val)}})}>{!viewPas?'View':'Hide'}</CInputGroupText>
                    <CFormInput type={!viewPas?'password':'text'}  value={emailObj.password} onChange={(e)=> setEmailObj(prev=>({...prev,password:e.target.value}))} />
                    </CInputGroup>
                </CCol>
                <CCol lg={12} md={12} sm={12} sx={12} className='py-0' >

               {isAdimn&& <CFormSwitch size="xl"  label="Admin"   
                checked={emailObj.isAdmin} onChange={()=>setEmailObj(prev=>({...prev,isAdmin:!prev.isAdmin}))} />}

                </CCol>

               
                <CCol lg={12} md={12} sm={12} sx={12} className='p-3 text-end' >
                    {activeUpdate===''&& <CButton onClick={()=>saveData('Save')} >Save</CButton>}
                    {activeUpdate!==''&& <CButton onClick={()=>saveData('Update')} className='me-2' >Update</CButton>}
                    {activeUpdate!==''&& <CButton onClick={()=>{
                           setEmailObj({...obj})
                           setActiveUpdate('')
                           setSelectedStaffObj({})   
                           setClientReferance(()=>({clientName:'',clientId:''})) 
                    }}>Reset Update</CButton>}


                </CCol>
            </CRow>
        </CForm>
        </CCard>

        <CCol  className='p-2 text-end'>
            {!CFormActive&&<CButton  onClick={()=>setActiveForm(true)}>Create New</CButton>}
        </CCol>


    <CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345" }} hover responsive>
                 <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                        <CTableRow >
                            <CTableHeaderCell>Sr No</CTableHeaderCell>
                            <CTableHeaderCell>Center Name</CTableHeaderCell>
                            <CTableHeaderCell>Center Id</CTableHeaderCell>
                            <CTableHeaderCell>Emp Id</CTableHeaderCell>
                            <CTableHeaderCell>Emp Name</CTableHeaderCell>
                            <CTableHeaderCell>Designation</CTableHeaderCell>
                            <CTableHeaderCell>Emp Rights</CTableHeaderCell>
                            <CTableHeaderCell>Email Id</CTableHeaderCell>
                            <CTableHeaderCell>Password</CTableHeaderCell>
                            <CTableHeaderCell>Status</CTableHeaderCell>
                            <CTableHeaderCell>Edit/Delete</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {allEmailData.map((el,i)=>
                            <CTableRow className='text-center'key={i} >
                                <CTableDataCell>{i+1}</CTableDataCell>
                                <CTableDataCell>{el.center}</CTableDataCell>
                                <CTableDataCell>{el.centerCode}</CTableDataCell>
                                <CTableDataCell>{el.empId}</CTableDataCell>
                                <CTableDataCell>{el.empName}</CTableDataCell>
                                <CTableDataCell>{el.Designation}</CTableDataCell>
                                <CTableDataCell ><CButton size='sm'>View</CButton></CTableDataCell>
                                <CTableDataCell>{el.email}</CTableDataCell>
                                {/* <CTableDataCell>{el.password}</CTableDataCell> */}
                                <CTableDataCell></CTableDataCell> 
                                <CTableDataCell>
                                <CFormSwitch size="xl"  onClick={()=>toUppdateSwitch(el.status,el._id)} checked={el.status} />
                                    </CTableDataCell>
                                    <CTableDataCell  >
                                        { <MdEdit onClick={()=>toEditEmail(el)} style={{cursor:'pointer'}} className='me-1'/>}                                       
                                        {!el.isAdmin && <MdDelete style={{cursor:'pointer'}} onClick={()=>deleteLeave(el)}/>}
                                    </CTableDataCell>
                            </CTableRow>
                        )}   
                    </CTableBody>
                </CTable>

</CCol>
  )
}

export default LoginList
