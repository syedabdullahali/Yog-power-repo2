
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CNav,
    CNavItem,
    CNavLink,
    CRow,
    CTabContent,
} from '@coreui/react'
import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { empLoyeeeRights } from '../hr/Rights/rightsValue/crmRightsValue'

const SalesTargetTable = React.lazy(()=>import('./Target/SalesTargetTable'))
const ClinetTargetTabel = React.lazy(()=>import('./Target/ClientTargetDataTable'))
const CallesTargetTable = React.lazy(()=>import('./Target/CallesTargetTable'))
const LeadTargetTable = React.lazy(()=>import('./Target/LeadTarget'))
const RenewalsTable = React.lazy(()=>import('./Target/RenewalsTable'))
const ReferralLeadsData = React.lazy(()=>import('./Target/ReferralLeadsData'))
const MeadiaTargetTable = React.lazy(()=>import('./Target/MediaTargetTable'))




const SalesTarget = () => {
    const url = useSelector((el) => el.domainOfApi)
    const [employeeData, setEmployeeData] = useState([])

    const rightsData = useSelector((el)=>el.empLoyeeRights?.crmRights
    ?.crmEmployee?.items?.crmEmployeeTarget1?.rights) 
    const access = rightsData?rightsData:[]
    const isAdmin = useSelector((el)=>el.isAdmin) 

    const funValidate = (val)=>{
        return (access?.includes(empLoyeeeRights[val])||isAdmin)
    }

    const salesTargetVal =  funValidate('salesTarget')
    const clientTargetVal = funValidate('clientTarget')
    const callsTargetVal = funValidate('callsTarget')
    const leadTargetVal = funValidate('leadTarget')
    const renewalVal = funValidate('renewal')
    const referralLeadsVal =funValidate('referralLeads')
    const mediaTargetVal  = funValidate('mediaTarget')
    

    const [activeKey, setActiveKey] = useState(
        (salesTargetVal&&1)||
        (clientTargetVal&&2)||
        (callsTargetVal&&3)||
        (leadTargetVal&&4)||
        (renewalVal&&5)||
        (salesTargetVal&&6)||
        (mediaTargetVal&&7))



    async function getEmployee() {
        try {
            const { data } = await axios.get(`${ url }/employeeform`)
            setEmployeeData(data)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getEmployee()
}, [])



    return (
        <CRow>
            <CCol xs={12}>
                <CCard>
                    <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                        <CNav variant="pills" role="tablist">
                        {salesTargetVal&& <CNavItem>
                                <CNavLink
                                    href="javascript:void(0);"
                                    active={activeKey === 1}
                                    onClick={() => setActiveKey(1)}
                                    className='text-white'
                                >
                                    Sales Target
                                </CNavLink>
                            </CNavItem>}
                        {clientTargetVal&& <CNavItem>
                                <CNavLink
                                    href="javascript:void(0);"
                                    active={activeKey === 2}
                                    onClick={() => setActiveKey(2)}
                                    className='text-white'

                                >

                                    Client Target
                                </CNavLink>
                            </CNavItem>}
                        {callsTargetVal&&  <CNavItem>
                                <CNavLink
                                    href="javascript:void(0);"
                                    active={activeKey === 3}
                                    onClick={() => setActiveKey(3)}
                                    className='text-white'

                                >
                                    Calls Target
                                </CNavLink>
                            </CNavItem>}
                        {leadTargetVal&&  <CNavItem>
                                <CNavLink
                                    href="javascript:void(0);"
                                    active={activeKey === 4}
                                    onClick={() => setActiveKey(4)}
                                    className='text-white'
                                >
                                    Lead Target
                                </CNavLink>
                            </CNavItem>}
                        {renewalVal&&<CNavItem>
                                <CNavLink
                                    href="javascript:void(0);"
                                    active={activeKey === 5}
                                    onClick={() => setActiveKey(5)}
                                    className='text-white'
                                >
                                   Renewal
                                </CNavLink>
                            </CNavItem>}
                        {referralLeadsVal&& <CNavItem>
                                <CNavLink
                                    href="javascript:void(0);"
                                    active={activeKey === 6}
                                    onClick={() => setActiveKey(6)}
                                    className='text-white'
                                >
                                    Referral Leads
                                </CNavLink>
                            </CNavItem>}
                         {mediaTargetVal&&   <CNavItem>
                                <CNavLink
                                    href="javascript:void(0);"
                                    active={activeKey === 7}
                                    onClick={() => setActiveKey(7)}
                                    className='text-white'
                                >
                                    Media Target
                                </CNavLink>
                            </CNavItem>}
                        </CNav>
                    </CCardHeader>
                    <CCardBody>
                        <CTabContent>
                          
                            {activeKey===1&& <SalesTargetTable EmployeeData ={employeeData}/>}
                            {activeKey===2&&<ClinetTargetTabel EmployeeData ={employeeData}/>}
                            {activeKey===3&&<CallesTargetTable EmployeeData ={employeeData}/>} 
                            {activeKey===4&&<LeadTargetTable EmployeeData ={employeeData}/>}                                                      
                            {activeKey===5&& <RenewalsTable EmployeeData ={employeeData}/>}
                            {activeKey===6&&<ReferralLeadsData EmployeeData ={employeeData}/>}
                            {activeKey===7&&<MeadiaTargetTable EmployeeData ={employeeData}/>}                 
                        </CTabContent>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}
export default SalesTarget