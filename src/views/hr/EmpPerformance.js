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

import EmpPerformanceTable from './Performance/EmpPerformanceTable'
import TrainerPerformance from './Performance/TrainerPerformance'

const EmpPerformance = () => {

    const [activeKey, setActiveKey] = useState(1)

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
       <EmpPerformanceTable/>
      </CTabPane>
      <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={activeKey === 2}>
       <TrainerPerformance/>
      </CTabPane>
    </CTabContent>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default EmpPerformance
