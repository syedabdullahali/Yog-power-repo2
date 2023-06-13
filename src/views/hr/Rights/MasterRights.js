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
import React, { useState } from 'react'
const CenterSetup = React.lazy(()=>import('../AllRightRights/Master/CenterSetupRights'))
const SupportRequest = React.lazy(()=>import('../AllRightRights/Master/SupportRequest'))
const MarketingRigths = React.lazy(()=>import('../AllRightRights/Master/MarketingRigths'))
const ClientSetupRights = React.lazy(()=>import('../AllRightRights/Master/ClientSetupRights'))
const FitnessMasterRights = React.lazy(()=>import('../AllRightRights/Master/FitnessMasterRights'))
const HrRights = React.lazy(()=>import('../AllRightRights/Master/HrRights'))
const InventoryRights   = React.lazy(()=>import('../AllRightRights/Master/InventoryRights'))
const FInanceRights = React.lazy(()=>import('../AllRightRights/Master/FInanceRights'))
const IntergrationsRights = React.lazy(()=>import('../AllRightRights/Master/IntergrationsRights'))
const CenterPartners  = React.lazy(()=>import('../AllRightRights/Master/CenterPartners'))
 
const MasterRights = () => {

    const [activeKey, setActiveKey] = useState(1)

  return (

  <div>
        <CRow>
            <CCol xs={12}>
                <CCard>
                    <CCardHeader style={{background:'#0B5345',color:'white'}}>
                        <CNav variant="pills" role="tablist">
                            <CNavItem>
                                <CNavLink
                                    href="javascript:void(0);"
                                    active={activeKey === 1}
                                    onClick={() => setActiveKey(1)}
                                    className="text-white"
                                >
                                    Center Setup
                                </CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink
                                    href="javascript:void(0);"
                                    active={activeKey === 2}
                                    onClick={() => setActiveKey(2)}
                                    className="text-white"
                                >
                                    Support   
                                </CNavLink>
                            </CNavItem>

                            <CNavItem>
                                <CNavLink
                                    href="javascript:void(0);"
                                    active={activeKey === 3}
                                    onClick={() => setActiveKey(3)}
                                    className="text-white"
                                >
                                   Marketing
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
                                    Fitness
                                </CNavLink>
                            </CNavItem>
                            <CNavItem>
                            <CNavLink
                                    href="javascript:void(0);"
                                    active={activeKey === 6}
                                    onClick={() => setActiveKey(6)}
                                    className="text-white"
                                >
                                    HR
                                </CNavLink>
                            </CNavItem>
                            <CNavItem>
                            <CNavLink
                                    href="javascript:void(0);"
                                    active={activeKey === 7}
                                    onClick={() => setActiveKey(7)}
                                    className="text-white"
                                >
                                   Inventory
                                </CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink
                                    href="javascript:void(0);"
                                    active={activeKey === 8}
                                    onClick={() => setActiveKey(8)}
                                    className="text-white"
                                >
                                   Finance
                                </CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink
                                    href="javascript:void(0);"
                                    active={activeKey === 9}
                                    onClick={() => setActiveKey(9)}
                                    className="text-white"
                                >
                                   Intergrations 
                                </CNavLink>
                            </CNavItem>

                            <CNavItem>
                             <CNavLink
                                    href="javascript:void(0);"
                                    active={activeKey === 10}
                                    onClick={() => setActiveKey(10)}
                                    className="text-white"
                                >
                                Center Partners
                                </CNavLink>
                            </CNavItem>

                        </CNav>
                    </CCardHeader>
                    <CCardBody>
                        <CTabContent >
                          {activeKey===1&&<CenterSetup/>}
                          {activeKey===2&&<SupportRequest/>}
                          {activeKey===3&&<MarketingRigths/>}
                          {activeKey===4&&<ClientSetupRights/>}
                          {activeKey===5&&<FitnessMasterRights/>}
                          {activeKey===6&&<HrRights/>}
                          {activeKey===7&&<InventoryRights/>}
                          {activeKey===8&&<FInanceRights/>}
                          {activeKey===9&&<IntergrationsRights/>}
                          {activeKey===10&&<CenterPartners/>}


                        </CTabContent>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    </div>
   
  )
}

export default MasterRights
