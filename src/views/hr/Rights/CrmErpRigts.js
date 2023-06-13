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
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { dashboardRights } from './rightsValue/crmRightsValue'



const FitnessRights = React.lazy(() => import('../AllRightRights/FitnessRights'))
const EmployeeRights = React.lazy(() => import('../AllRightRights/EmployeeRights'))
const TrainerRights = React.lazy(() => import('../AllRightRights/TrainerRights'))
const LeadsRight = React.lazy(() => import('../AllRightRights/LeadsRight'))
const DashboardRights = React.lazy(()=>import('../AllRightRights/DashboardRights'))
const ClientRights = React.lazy(()=>import('../AllRightRights/ClientRights'))
const MarketingRights  = React.lazy(()=>import('../AllRightRights/MarketingRights'))

const CrmErpRigts = ({ rightObjeact, setRightObject }) => {

    const [activeKey, setActiveKey] = useState(1)
    const {crmDashboard,crmEmployee,crmTrainer,crmLeads,crmCientManagment,crmMarketing,crmFitness} = rightObjeact
    


    return (
        <div>
            <CRow>
                <CCol xs={12}>
                    <CCard>
                        <CCardHeader style={{ background: '#0B5345', color: 'white' }}>
                            <CNav variant="pills" role="tablist">
                                <CNavItem>
                                    <CNavLink
                                        href="javascript:void(0);"
                                        active={activeKey === 1}
                                        onClick={() => setActiveKey(1)}
                                        className="text-white"
                                    >
                                        Dashboard
                                    </CNavLink>
                                </CNavItem>
                                <CNavItem>
                                    <CNavLink
                                        href="javascript:void(0);"
                                        active={activeKey === 2}
                                        onClick={() => setActiveKey(2)}
                                        className="text-white"
                                    >

                                        Employee
                                    </CNavLink>
                                </CNavItem>
                                <CNavItem>
                                    <CNavLink
                                        href="javascript:void(0);"
                                        active={activeKey === 7}
                                        onClick={() => setActiveKey(7)}
                                        className="text-white"
                                    >

                                        Trainer
                                    </CNavLink>
                                </CNavItem>

                                <CNavItem>
                                    <CNavLink
                                        href="javascript:void(0);"
                                        active={activeKey === 3}
                                        onClick={() => setActiveKey(3)}
                                        className="text-white"
                                    >

                                        Lead
                                    </CNavLink>
                                </CNavItem>
                                <CNavItem>
                                    <CNavLink
                                        href="javascript:void(0);"
                                        active={activeKey === 4}
                                        onClick={() => setActiveKey(4)}
                                        className="text-white"
                                    >
                                        Clients
                                    </CNavLink>
                                </CNavItem>
                                <CNavItem>
                                    <CNavLink
                                        href="javascript:void(0);"
                                        active={activeKey === 5}
                                        onClick={() => setActiveKey(5)}
                                        className="text-white"
                                    >
                                        Marketing
                                    </CNavLink>
                                </CNavItem>
                                <CNavItem>
                                    <CNavLink
                                        href="javascript:void(0);"
                                        active={activeKey === 6}
                                        onClick={() => setActiveKey(6)}
                                        className="text-white"
                                    >
                                        Fitness
                                    </CNavLink>
                                </CNavItem>
                            </CNav>
                        </CCardHeader>
                        <CCardBody>
                            <CTabContent >
                               
                                {activeKey===1&& <DashboardRights crmDashboard={crmDashboard} setRightObject={setRightObject} />}
                                {activeKey === 2 && <EmployeeRights crmEmployee={crmEmployee} setRightObject={setRightObject} />}                                
                                {activeKey===3 && <LeadsRight crmLeads={crmLeads} setRightObject={setRightObject}/>}
                                {activeKey===4&&<ClientRights  crmCientManagment={crmCientManagment} setRightObject={setRightObject} />}
                                {activeKey ===5&&<MarketingRights crmMarketing={crmMarketing} setRightObject={setRightObject} />}                                
                                {activeKey === 6 && <FitnessRights crmFitness={crmFitness} setRightObject={setRightObject} />}
                                {activeKey === 7 && <TrainerRights crmTrainer={crmTrainer} setRightObject={setRightObject} />}

                            </CTabContent>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </div>

    )
}

export default CrmErpRigts
