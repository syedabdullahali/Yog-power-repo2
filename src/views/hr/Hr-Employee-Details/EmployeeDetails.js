import React,{useState} from 'react'
import { useParams } from 'react-router-dom'

import {
    CButton,
    CButtonGroup,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CFormInput,
    CFormSelect,
    CInputGroup,
    CInputGroupText,
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
} from '@coreui/react'
const  EmployeeProfile = React.lazy(()=>import('./Tables/EmployeeProfile'))
const  EmployeeDocument= React.lazy(()=>import('./Tables/EmployeeDocument'))
const  EmpAttendance= React.lazy(()=>import('./Tables/EmpAttendance'))
const  SalarySheet  = React.lazy(()=>import('./Tables/SalarySheet'))
const  JobProfile  = React.lazy(()=>import('./Tables/JobProfile'))
const  EmpLeave  = React.lazy(()=>import('./Tables/EmpLeave'))

const EmployeeDetails = () => {
    const [activeKey, setActiveKey] = useState(1)
    const {id} = useParams()



  return (
    <CCard>
      <CCardHeader  style={{ backgroundColor: '#0B5345', color: 'white' }}>
      <CNav variant="pills" role="tablist">
                            <CNavItem>
                                <CNavLink
                                    href="javascript:void(0);"
                                    active={activeKey === 1}
                                    onClick={() => setActiveKey(1)}
                                    className='text-white'
                                >
                                    Employee Profile
                                </CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink
                                    href="javascript:void(0);"
                                    active={activeKey === 2}
                                    onClick={() => setActiveKey(2)}
                                    className='text-white'

                                >

                                    Job Profile
                                </CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink
                                    href="javascript:void(0);"
                                    active={activeKey === 3}
                                    onClick={() => setActiveKey(3)}
                                    className='text-white'

                                >
                                 Salary Sheet
                                </CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink
                                    href="javascript:void(0);"
                                    active={activeKey === 4}
                                    onClick={() => setActiveKey(4)}
                                    className='text-white'
                                >
                                   Attendance
                                </CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink
                                    href="javascript:void(0);"
                                    active={activeKey === 5}
                                    onClick={() => setActiveKey(5)}
                                    className='text-white'
                                >
                                   Document
                                </CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink
                                    href="javascript:void(0);"
                                    active={activeKey === 6}
                                    onClick={() => setActiveKey(6)}
                                    className='text-white'
                                >
                                   Leave
                                </CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink
                                    href="javascript:void(0);"
                                    active={activeKey === 7}
                                    onClick={() => setActiveKey(7)}
                                    className='text-white'
                                >
                                </CNavLink>
                            </CNavItem>                          
                        </CNav>
      </CCardHeader>
      <CCardBody>
        {activeKey===1&&<EmployeeProfile id={id}/>}
        {activeKey===2&&<JobProfile id={id}/>}
        {activeKey===3&&<SalarySheet id={id}/>}
        {activeKey===4&&<EmpAttendance id={id}/>}
        {activeKey===5&&<EmployeeDocument id={id}/>}
        {activeKey===6&&<EmpLeave id={id}/>}


      </CCardBody>
    </CCard>
  )
}

export default EmployeeDetails
