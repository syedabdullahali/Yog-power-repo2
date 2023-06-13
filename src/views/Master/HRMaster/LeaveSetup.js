import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCardTitle,
    CCol,
    CFormInput,
    CRow,
    CForm,
    CFormSelect,
    CCallout,
    CModal,
    CModalHeader,
    CModalTitle,
    CTable,
    CTableHead,
    CTableRow,
    CTableHeaderCell,
    CTableBody,
    CTableDataCell,
    CNav,
    CNavGroup,
    CNavItem,
    CNavLink,
    CTabContent,
    CTabPane

} from "@coreui/react";
import axios from "axios";
import React, { useState,useEffect } from "react";

let user = JSON.parse(localStorage.getItem('user-info'))
const token = user.token;
const username = user.user.username;
import { useSelector } from "react-redux";

const headers = {
    "Authorization": `Bearer ${token}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
   }

   import {MdDelete} from 'react-icons/md';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"]


const EmpLeaveListTable =React.lazy(()=>import("./EmpLeaveListTable"))
const EmpLoyeeLeaveHistory = React.lazy(()=>import('./EmpLoyeeLeaveHistory'))

function LeaveSetup(){
    const obj = {
    username:username,    
    noOfLeave:'0',
    noOfSl:'0',
    noOfCl:'0',
    noOfPl:'0',
    totalLeave:0,
    monthYear:'0',
    month:'0',
    year:''
}
    const [error,setError] = useState(false)
    const [showForm,setForm] = useState(true)
    const [leaveObj,setLeaveObj] = useState({...obj}) 
    const [activeKey, setActiveKey] = useState(1)
    const [leaveSetupError,setLeaveSetupError] = useState(false) 

    const [activeUpdate,setActiveUpdate] = useState('')

    const [leaveData,setLeaveData] = useState([])
    const url = useSelector((el) => el.domainOfApi)




    const getLeaveSetupData = async ()=>{
        try{
           let response = await  axios.get(`${url}/leaveSetUpMaster/all`,{headers})
            if(response.status===200){
                setLeaveData(response.data?.reverse())
                if(response?.data.length){
                  setLeaveSetupError(false)             
                }
            }
        }catch(error){
         console.error(error)
        }
    }

useEffect(()=>{
getLeaveSetupData()
},[])

    const validationVal = Object.values(leaveObj).every((el)=>el+""?.trim())

    useEffect(()=>{
      if(validationVal){
        setError(false)
      }
    },[validationVal])
    
    const saveData = async  (type)=>{
 
        if(!validationVal){
           setError(true)
           return 
        }
         const totalLeave = +leaveObj.noOfPl + +leaveObj.noOfSl+ +leaveObj.noOfCl + +leaveObj.noOfLeave
      
         let response ={}
         try{
           if(type==='Save'){
             response = await  axios.post(`${url}/leaveSetUpMaster/create`,{...leaveObj,totalLeave},{headers})
           }
           if(type==='Update'){
            response = await  axios.post(`${url}/leaveSetUpMaster/update/${activeUpdate}`,{...leaveObj,totalLeave},{headers})
           }
          if(response?.status===200){
           alert('successfully save')
           setActiveUpdate(response.data._id)
           getLeaveSetupData()
      
          }
           }catch(error){
             console.error(error)
           }
         
      }
      

      function deleteLeave(id) {
        if (confirm('Do you want to delete this')) {
            fetch(`${url}/leaveSetUpMaster/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then((result) => {
                result.json().then((resp) => {
                    getLeaveSetupData()
                })
            })
        }
      }

    useEffect(()=>{
     if(leaveObj.year!==''){
      const obj=  leaveData.find((el)=>+el.year===+`${leaveObj.year}`.trim())
      if(obj){
      setLeaveObj({  
        username:username,    
        noOfLeave:obj.noOfLeave,
        noOfSl:obj.noOfSl,
        noOfCl:obj.noOfCl,
        noOfPl:obj.noOfPl,
        monthYear:obj.monthYear,
        month:obj.month,
        year:obj.year,
        totalLeave:obj.totalLeave
      })
      setActiveUpdate(obj._id)
    }else if(activeUpdate!==''){
        setLeaveObj(prev=>({...prev,
                noOfLeave:'0',
                noOfSl:'',
                noOfCl:'',
                noOfPl:'',
        })) 
        setActiveUpdate('')
    }
     }
    },[leaveObj.year])




return <div>


    
  <CCard className="mb-3 border-success mt-4">
                <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                    <CCardTitle className="mt-2">Leave Setup</CCardTitle>
                </CCardHeader>
                <CCardBody>

            <CNav variant='tabs' >
                <CNavItem>
                    <CNavLink
                        active={activeKey === 1}
                        onClick={() => setActiveKey(1)}
                        style={{cursor:'pointer'}}
                    >
                        Leave Setup
                    </CNavLink>
                </CNavItem>
                <CNavItem>
                    <CNavLink
                        active={activeKey === 2}
                        style={{cursor:'pointer'}}
                        onClick={() =>{
                            if(!leaveData.length){
                                setLeaveSetupError(true)
                                return 
                            }
                            setActiveKey(2)
                        }}
                    >
                        Employee Leave list 
                    </CNavLink>
                </CNavItem>

                <CNavItem >
                    <CNavLink
                        active={activeKey === 3}
                        onClick={() =>setActiveKey(3)}
                        style={{cursor:'pointer'}}
                    >
                        Employee Leave History
                    </CNavLink>
                </CNavItem>

            </CNav>
            <CTabContent>
                <CTabPane className="pt-2" role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>
                {showForm ? <CCol color="primary" className="bg-body d-flex justify-content-end">
                <CButton onClick={() => setForm((value) => !value)}>Add New Payrol Setup</CButton>
            </CCol> :

                <CCard className="overflow-hidden"   >
                    <CCardHeader className="p-2 px-4" style={{ backgroundColor: '#0B5345', color: 'white' }}>
                        <CCardTitle> <h5>Leave Setup</h5></CCardTitle>
                    </CCardHeader>
                    <div className="p-4">
                        <CForm>
                            <CCol className="d-flex justify-content-end">
                                <CButton color='danger' onClick={() =>{
                                    setForm(() => true)
                                    setLeaveObj({...obj})
                                    setActiveUpdate('')
                                    setError(false)
                                } }>Close</CButton>
                            </CCol>

                            <CRow>
                                <CCol md={6}>
                                    <CFormInput
                                        label='Select month and year'
                                        type='number'
                                        value={leaveObj.year}
                                        onChange={(e)=>setLeaveObj(prev=>{
                                         

                                          return  ({...prev,year:e.target.value})
                                        })}
                                        
                                    />
                                </CCol>

                                <CCol md={6}>
                                    <CFormInput
                                        label='No of Sl'
                                        type='number'
                                        value={leaveObj.noOfSl}
                                        onChange={(e)=>setLeaveObj(prev=>({...prev,noOfSl:e.target.value}))}
                                    />
                                </CCol>
                                
                            </CRow>

                            <CRow>
                            
                                <CCol md={6}>
                                    <CFormInput
                                        label='No of CL'
                                        type='number'
                                        value={leaveObj.noOfCl}
                                        onChange={(e)=>setLeaveObj(prev=>({...prev,noOfCl:e.target.value}))}
                                    />
                                </CCol>
                                <CCol md={6}>
                                    <CFormInput
                                        label='No of PL'
                                        type='number'
                                        value={leaveObj.noOfPl}
                                        onChange={(e)=>setLeaveObj(prev=>({...prev,noOfPl:e.target.value}))}
                                    />
                                </CCol>
                            </CRow>
                           {!activeUpdate &&<CButton color="primary mt-4 px-4" onClick={(() => {saveData('Save')})} >Save</CButton>}
                           {activeUpdate!==''  &&<CButton color="primary mt-4 me-2 px-4" onClick={(() => {saveData('Update')})} >Update</CButton>}
                           {activeUpdate!==''  &&<CButton color="primary mt-4 px-4" onClick={(() => {setLeaveObj({...obj}),setActiveUpdate('')})} >Reset Update</CButton>}


                        {error && <p className="mt-2 text-danger" >Please fill all details</p>}

                        </CForm>
                    </div>
                    <CCol style={{ backgroundColor: '#0B5345' }} className='p-1'>

                    </CCol>
                </CCard>}

                {leaveSetupError&&<p>No data found in leave setup</p>}
                    
                <CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345" }} hover responsive>
                        <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                            <CTableRow >
                                <CTableHeaderCell>Sr.No</CTableHeaderCell>
                                <CTableHeaderCell>year</CTableHeaderCell>

                                <CTableHeaderCell>No of Sl</CTableHeaderCell>
                                <CTableHeaderCell>No of CL</CTableHeaderCell>

                                <CTableHeaderCell>No of PL</CTableHeaderCell>
                                <CTableHeaderCell>Total Leave</CTableHeaderCell>
                                <CTableHeaderCell>Delete</CTableHeaderCell>
                             
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {leaveData.map((el,i)=>
                            <CTableRow className="text-center">
                                <CTableDataCell>
                                   {i+1}
                                </CTableDataCell>
                                <CTableDataCell>{el.year}
                                </CTableDataCell>
                                <CTableDataCell>
                                    {el.noOfSl}
                                </CTableDataCell>
                                <CTableDataCell>
                                    {el.noOfCl}
                                </CTableDataCell>
                                <CTableDataCell>
                                    {el.noOfPl}
                                </CTableDataCell>   
                                <CTableDataCell>
                                    {el.totalLeave}
                                </CTableDataCell>  
                                <CTableDataCell style={{cursor:'pointer'}}>
                                        <MdDelete onClick={()=>deleteLeave(el._id)}/>
                                </CTableDataCell>                            
                            </CTableRow>   
                            )}                   
                        </CTableBody>
                    </CTable>  
                </CTabPane>

                <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={true}>
                   {activeKey === 2&&<EmpLeaveListTable/>}
                </CTabPane>
                <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={true}>
                   {activeKey === 3&&<EmpLoyeeLeaveHistory/>}
                </CTabPane>
            </CTabContent>



         



                </CCardBody>
            </CCard>
  </div>
} 

export default LeaveSetup