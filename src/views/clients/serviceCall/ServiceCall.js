import { cilArrowCircleBottom, cilArrowCircleTop } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import { MdCall, MdDelete, MdEdit, MdMail } from 'react-icons/md';
import { BsPlusCircle, BsWhatsapp } from 'react-icons/bs';
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
import React, { useState,useCallback,useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'

import PaymentCallsTable from './PaymentCallsTable';
import WelcomeCalls from './WelcomeCalls';
import FeedBackCall from './FeedBackCall';
import GreetingCall from './GreetingCall';
import IrregularMemberCall from './IrregularMemberCall';
import CallHistory from './CallHistory';
import { empLoyeeeRights } from '../../hr/Rights/rightsValue/crmRightsValue'



const ServiceCall = ({id}) => {

    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;
    const username = user.user.username;

    const [staff, setStaff] = useState([])
    const monthName =     ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    const rightsData = useSelector((el)=>el.empLoyeeRights?.crmRights
    ?.crmEmployee?.items?.crmMemberCalls1?.rights) 
    const access = rightsData?rightsData:[]
    const isAdmin = useSelector((el)=>el.isAdmin) 

    const funValidate = (val)=>{
        return (access?.includes(empLoyeeeRights[val])||isAdmin)
    }


    const welcomeCallsVal =  funValidate(' welcomeCalls')
    const feedbackCallsVal = funValidate('feedbackCalls')
    const paymentCallsVal = funValidate('paymentCalls')
    const irregularMemberCallVal = funValidate('irregularMemberCall')
    const greetingCallsVal = funValidate('greetingCalls')
    const callHistoryVal =funValidate('callHistory')

    
    const [activeKey, setActiveKey] = useState(
        (welcomeCallsVal&&1)||
        (feedbackCallsVal&&2)||
        (paymentCallsVal&&3)||
        (irregularMemberCallVal&&4)||
        (greetingCallsVal&&5)||
        (callHistoryVal&&6))

    const url = useSelector((el)=>el.domainOfApi) 
    const initialFilterObj = {
        year:'',
        monthName:'',
        staffName:''
    }

    const [filterObj,setFilterObj] = useState(initialFilterObj)

   
    function getStaff() {
        axios.get(`${url}/employeeform`, {headers: {'Authorization': `Bearer ${token}`}})
            .then((res) => {
                setStaff(res.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    useEffect(()=>{
      getStaff()
    },[])

    const clearFilter =()=>{
    setFilterObj(initialFilterObj)
    }


    return (
        <CRow>
            <CCol xs={12}>
                <CCard>
                    <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                        <CNav responsive variant="pills" role="tablist">
                            { welcomeCallsVal&& <CNavItem md={12}>
                                <CNavLink
                                    href="javascript:void(0);"
                                    active={activeKey === 1}
                                    onClick={() => setActiveKey(1)}
                                    className="text-white"
                                >
                                    Welcome Calls
                                </CNavLink>
                            </CNavItem>}
                            {feedbackCallsVal&&<CNavItem md={12}>
                                <CNavLink 

                                    href="javascript:void(0);"
                                    active={activeKey === 2}
                                    onClick={() => setActiveKey(2)}
                                    className="text-white"

                                >

                                    Feedback Calls
                                </CNavLink>
                            </CNavItem>}
                           {paymentCallsVal&&<CNavItem>
                                <CNavLink
                                    href="javascript:void(0);"
                                    active={activeKey === 3}
                                    onClick={() => setActiveKey(3)}
                                    className="text-white"

                                >
                                    Payment Calls
                                </CNavLink>
                            </CNavItem>}
                            {irregularMemberCallVal&& <CNavItem>
                                <CNavLink
                                    href="javascript:void(0);"
                                    active={activeKey === 4}
                                    onClick={() => setActiveKey(4)}
                                    className="text-white"

                                >
                                    Irregular Member Call
                                </CNavLink>
                            </CNavItem>}                           
                            {greetingCallsVal&& <CNavItem>
                                <CNavLink
                                    href="javascript:void(0);"
                                    active={activeKey === 5}
                                    onClick={() => setActiveKey(5)}
                                    className="text-white"

                                >
                                    Greeting Calls
                                </CNavLink>
                            </CNavItem>}
                            {callHistoryVal&& <CNavItem>
                                <CNavLink
                                    href="javascript:void(0);"
                                    active={activeKey === 6}
                                    onClick={() => setActiveKey(6)}
                                    className="text-white"

                                >
                                    Call History
                                </CNavLink>
                            </CNavItem>}
                        </CNav>
                    </CCardHeader>
                    <CCardBody style={{overflowY:'scroll'}}>

                  {!id &&
                  <>
                   <CRow>
                                    <CCol lg={3}>
                                        <CInputGroup>
                                            <CInputGroupText
                                                component="label"
                                                htmlFor="inputGroupSelect01"
                                            >
                                                Month
                                            </CInputGroupText>
                                            <CFormSelect id="inputGroupSelect01"
                                             value={filterObj.monthName}
                                             onChange={(e)=>setFilterObj(prev=>({...prev,monthName:e.target.value}))}

                                            >
                                            <option >Select Month</option>                                              
                                              { monthName.map((el,i)=>
                                                <option value={i}>{el}</option>                                              
                                                )}
                                            </CFormSelect>
                                        </CInputGroup>
                                    </CCol>
                                    <CCol  lg={3}>
                                        <CInputGroup>
                                            <CInputGroupText
                                                component="label"
                                                htmlFor="inputGroupSelect01"
                                            >
                                                Year
                                            </CInputGroupText>
                                            <CFormSelect id="inputGroupSelect01"
                                             value={filterObj.year}
                                             onChange={(e)=>setFilterObj(prev=>({...prev,year:e.target.value}))}                                            
                                            >
                                                <option >Select Year</option>                                              
                                                <option>2023</option>
                                                <option>2024</option>
                                                <option>2025</option>
                                                <option>2026</option>
                                                <option>2027</option>
                                                <option>2028</option>
                                                <option>2029</option>
                                                <option>2030</option>
                                                <option>2031</option>
                                                <option>2032</option>
                                                <option>2033</option>
                                                <option>2034</option>
                                               
                                            </CFormSelect>
                                        </CInputGroup>
                                    </CCol>
                                    <CCol lg={3}>
                                        <CInputGroup className="left">
                                        <CInputGroup>
                                            <CInputGroupText
                                                component="label"
                                                htmlFor="inputGroupSelect01"
                                            >
                                                Staff 
                                            </CInputGroupText>
                                            <CFormSelect id="inputGroupSelect01"
                                            value={filterObj.staffName}
                                            onChange={(e)=>setFilterObj(prev=>({...prev,staffName:e.target.value}))}                                                
                                            >
                                            <option>Select Assign Staff</option>
                                          {staff.filter((list) => list.username === username &&
                                                list.selected === 'Select').map((item, index) => (
                                         <option key={index}>{item.FullName}</option>
                                             ))}
                                            </CFormSelect>
                                        </CInputGroup>
                                        </CInputGroup>
                                    </CCol>
                                  
                    </CRow>
                      <CCol  className='my-2'>
                      <CButton onClick={clearFilter} >Clear filter</CButton>
                  </CCol>
                  </> 
                    }
                  
                                <div style={{overflowY:'scroll'}} >
                        <CTabContent>
                            {activeKey === 1 &&<WelcomeCalls id={id} visible={activeKey === 1} filterObj={filterObj} />}
                            {activeKey === 2&&<FeedBackCall id={id} visible={activeKey === 2} filterObj={filterObj} />}                       
                            {activeKey === 3&&<PaymentCallsTable id={id} visible={activeKey === 3} filterObj={filterObj} />} 
                            {activeKey === 4 &&<IrregularMemberCall id={id} visible={activeKey === 4} filterObj={filterObj} />}
                            {activeKey === 5 && <GreetingCall id={id} visible={activeKey === 5} filterObj={filterObj} />}
                            {activeKey === 6 && <CallHistory id={id} visible={activeKey === 6} filterObj={filterObj} />}
                        </CTabContent>
                        </div>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}
export default ServiceCall