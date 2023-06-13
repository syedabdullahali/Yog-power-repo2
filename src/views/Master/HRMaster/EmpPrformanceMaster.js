
import React, { useEffect, useState } from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCardTitle,
    CCol,
    CRow,
    CNav,
    CNavItem,
    CNavLink,
    CTabContent,
    CTabPane
} from '@coreui/react'
import EmpPerformanceTable from './EmpPerformance/EmpPerformanceTable'
import TrainerPerformance from './EmpPerformance/TrainerPerformance'
import axios from 'axios'
import { useSelector } from 'react-redux';
let user = JSON.parse(localStorage.getItem('user-info'))
const token = user.token;
const username = user.user.username;

const headers = {
  "Authorization": `Bearer ${token}`
 }
const EmpPerformance = () => {

    const [activeKey, setActiveKey] = useState(1)
    const [staff, setStaff] = useState([])
    const [trainer, setTrainer] = useState([])

    const url = useSelector((el) => el.domainOfApi)

    function getStaff() {
      axios.get(`${url}/employeeform`, {headers})
        .then((res) => {
          const employeeData = res.data.filter((el)=>el.selected==="Select")          
          setStaff(employeeData)
          setTrainer(employeeData.filter((el)=>el.EmployeeCategory.trim()==='Freelancer'||el.trainerStatus?true:false)
          .reverse())
        })



      .catch((error) => {console.error(error)})
      }
      
      useEffect(()=>{
        getStaff()
      },[])



    return (
        <CRow>
            <CCol lg={12} sm={12}>
                <CCard className="mb-3 border-success">
                    <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                        <CCardTitle className="mt-2">Performance</CCardTitle>
                    </CCardHeader>
    <CCardBody>                  
    <CNav variant="tabs" role="tablist">
      <CNavItem>
        <CNavLink
          active={activeKey === 1}
          onClick={() => setActiveKey(1)}
        >
          Employee Prformance
        </CNavLink>
      </CNavItem>
      <CNavItem>
        <CNavLink
          active={activeKey === 2}
          onClick={() => setActiveKey(2)}
        >
         Trainer Prformance
        </CNavLink>
      </CNavItem>
    </CNav>
    <CTabContent>
      <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>
        <EmpPerformanceTable staff={staff}/>
      </CTabPane>
      <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={activeKey === 2}>
        <TrainerPerformance trainer={trainer}/>
      </CTabPane>
    </CTabContent>            
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
    )
}

export default EmpPerformance
