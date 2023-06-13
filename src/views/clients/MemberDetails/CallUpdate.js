import React, { useEffect, useState } from 'react'
import {
    CButton,

    CCardTitle,
    CCol,
    CForm,
    CFormInput,
    CFormSelect,
    CFormTextarea,

    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,

    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CNavItem,
    CNavLink,
    CTabContent,
    CTabPane,
    CNav
} from '@coreui/react'

import moment from 'moment';
import SalesCall from '../salesCall/SalesCall';
import ServiceCall from '../serviceCall/ServiceCall'
const CallUpdate = ({ id }) => {

    const [activeKey, setActiveKey] = useState(1)

    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;
    const username = user.user.username;
    const centerCode = user.user.centerCode;


    return (
        <CRow>
            <CCol xs={12}>
                <div >

                    <CNav variant="tabs" role="tablist"style={{cursor:'pointer'}}>
                        <CNavItem >
                            <CNavLink
                                active={activeKey === 1}
                                onClick={() => setActiveKey(1)}
                            >
                                Salles Call
                            </CNavLink>
                        </CNavItem>
                        <CNavItem>
                            <CNavLink
                                active={activeKey === 2}
                                onClick={() => setActiveKey(2)}
                            >
                               Member Call 
                            </CNavLink>
                        </CNavItem>
                        
                    </CNav>
                    <CTabContent>
                        <CTabPane role="tabpanel" aria-labelledby="contact-tab" visible={activeKey === 1}>
                        {activeKey === 1 &&  <SalesCall />}
                        </CTabPane>
                        <CTabPane role="tabpanel" aria-labelledby="contact-tab" visible={activeKey === 2}>
                        {activeKey === 2 &&  <ServiceCall id={id} />}
                        </CTabPane>
                    </CTabContent>

                </div>
            </CCol>
    
        </CRow>
    )
}

export default CallUpdate
