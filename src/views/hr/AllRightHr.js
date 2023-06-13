import { cilArrowCircleBottom, cilArrowCircleTop } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCardTitle,
    CCol,
    CFormSwitch,
    CNav,
    CNavItem,
    CNavLink,
    CRow,
    CTabContent,
    CTabPane,
    CFormSelect,
    CButton
} from '@coreui/react'
import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

const CrmErpRigts  = React.lazy(()=>import('./Rights/CrmErpRigts'))
const MasterRights = React.lazy(()=>import('./Rights/MasterRights'))
const LoginList = React.lazy(()=>import('./Login List/LoginList'))
const ErpRigths = React.lazy(()=>import('./Rights/ErpRigths'))
import CustomSelectInput from '../Master/HRMaster/CustomSelectInput/CustomSelectInput'
import obj1 from './crmErpObjeact/obj'

let user = JSON.parse(localStorage.getItem('user-info'))
const token = user.token;


const headers = {
  "Authorization": `Bearer ${token}`,
  'Accept': 'application/json',
  'Content-Type': 'application/json'
 }


const AllRight = () => {

    const url = useSelector((el)=>el.domainOfApi) 
    const [activeKey, setActiveKey] = useState(1)
    const [activeKey2, setActiveKey2] = useState(1)
    const [employeeData,setEmployeeData] = useState([])
    const [activeUpdate,setActiveUpdate] = useState('')

    const [rightObjeact,setRightObject]= useState({
    empId:'',
    empName:'',
    memBerId:'',
    email:'',
    emailUniqId:'',
    crmRights:obj1.crmRights
    })

    console.log(rightObjeact)
    function getEmpEmailData() {
      axios.get(`${url}/allRight/all`, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      })
          .then((res) => {
            console.log(res.data)
             setEmployeeData(res.data)
          })
          .catch((error) => {
              console.error(error)
          })
  }
 
   
   function getEmpEmailData2() {
    axios.get(`${'http://localhost:8000'}/allRight/rights/${user.user.emailUniqId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then((res) => {
          console.log(res.data,'reighuergh',user.user.emailUniqId)
        })
        .catch((error) => {
            console.error(error)
        })
}

  useEffect(()=>{
   getEmpEmailData()
   getEmpEmailData2()

  },[])

  function clientObj(obj){
    if(obj.emailUniqId){
      setActiveUpdate(obj._id)
      setRightObject(()=>(obj))
      return 
    }
    setActiveUpdate('')
    setRightObject((prev)=>({...prev,
      empName:obj.empName,
      empId:obj.empId,
      memBerId:obj.MemBerId,
      email:obj.email,
      emailUniqId:obj._id,
    })) 
 }


 const saveData = async  (type)=>{
 


   let response ={}
   try{
     if(type==='Save'){
       response = await  axios.post(`${url}/allRight/create`,rightObjeact,{headers})
     }
     if(type==='Update'){
      response = await  axios.post(`${url}/allRight/update/${activeUpdate}`,rightObjeact,{headers})
     }
    if(response?.status===200){
     alert(`Successfully ${type.toLocaleLowerCase()}`)
     console.log(response.data)
     getEmpEmailData()

    }
     }catch(error){
       console.error(error)
     }
   
}




    return (
        <CCard>
<CCardHeader>
    <CNav variant="tabs" role="tablist">
     <CNavItem>
        <CNavLink
          active={activeKey === 1}
          onClick={() =>  setActiveKey(1)}
        >
         Login Id List
        </CNavLink>
      </CNavItem>

      <CNavItem>
        <CNavLink
          active={activeKey === 2}
          onClick={() =>  setActiveKey(2)}
        >
          Login Id Right
        </CNavLink>
      </CNavItem>
     
    </CNav>
</CCardHeader>

<CCardBody>
  <CTabContent>
      <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>
         <LoginList/>
      </CTabPane>
      <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 2}>

        <CRow className='my-5 mt-2'>
                {<CCol lg={4} md={4} sm={6} className=' my-2'>
                                  <label className="mb-2">Select Your Employee</label>
                                    <CustomSelectInput email={true} data={employeeData} 
                                    title={rightObjeact.empName?.trim()?rightObjeact.empName:"Select Employee"}
                                     getData={clientObj}/>
                                </CCol>}

                      <CCol  lg={4} md={4} sm={6} className='p-2 d-flex align-items-end'>
        {activeUpdate===''&&<CButton onClick={()=>saveData('Save')}>Create Right</CButton>}
        {activeUpdate!==''&&<CButton onClick={()=>saveData('Update')}>Update</CButton>}

      </CCol>

        </CRow>


<CNav variant="tabs" role="tablist">
      <CNavItem>
        <CNavLink
          active={activeKey2 === 1}
          onClick={() =>  setActiveKey2(1)}
        >
         CRM
        </CNavLink>
      </CNavItem>
      <CNavItem>
        <CNavLink
          active={activeKey2 === 2}
          onClick={() =>  setActiveKey2(2)}
        >
          ERP
        </CNavLink>
      </CNavItem>
      <CNavItem>
        <CNavLink
          active={activeKey2 === 3}
          onClick={() =>  setActiveKey2(3)}
        >
          Master
        </CNavLink>
      </CNavItem>
    </CNav>

      <CTabPane role="tabpanel" aria-labelledby="home-tab" style={{display:activeKey2 === 1?'block':'none'}} visible={activeKey2 === 1} >
        <CrmErpRigts rightObjeact={rightObjeact.crmRights} setRightObject={setRightObject} />
      </CTabPane>
      <CTabPane role="tabpanel" aria-labelledby="home-tab"  style={{display:activeKey2 === 2?'block':'none'}} visible={activeKey2 === 2} >
        <ErpRigths />
      </CTabPane>
      <CTabPane role="tabpanel" aria-labelledby="home-tab"  style={{display:activeKey2 === 3?'block':'none'}} visible={activeKey2 === 3}>
        <MasterRights/>
      </CTabPane>

   

      </CTabPane>

      
  </CTabContent>
  </CCardBody>    
   
    </CCard>
    )
}
export default AllRight
