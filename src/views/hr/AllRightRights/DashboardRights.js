import { cilArrowCircleBottom, cilArrowCircleTop } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
    CCardTitle,
    CCol,
    CFormSwitch,
    CRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { dashboardRights } from '../Rights/rightsValue/crmRightsValue'


const DashboardRights = ({ crmDashboard,setRightObject }) => {

    const checkDashRights = (val) => {
        return crmDashboard.rights.includes(val)
    }
    const totoggaleRights = (val) => {

        setRightObject((prev) => {
            const rightsPath = prev.crmRights.crmDashboard.rights
            if (!rightsPath.includes(val)) {
                rightsPath.push(val)
            } else if (rightsPath.includes(val)) {
                rightsPath.splice(rightsPath.indexOf(val), 1)
            }
            return { ...prev }
        })
    }

    return (
        <div>
                <CRow>
                    <CCardTitle className='d-flex '>Dashboard
                        <CFormSwitch size="lg"
                            className='ms-2'
                            checked={crmDashboard.value}
                            onChange={(e) => setRightObject(prev => {
                                prev.crmRights.crmDashboard.value = e.target.checked
                                return { ...prev }
                            })}

                        />
                    </CCardTitle>
                </CRow>
                <CRow>
                    <CCol>

                        <CFormSwitch size="xl" checked={checkDashRights(dashboardRights.allEnquiry)}
                            onChange={() => totoggaleRights(dashboardRights.allEnquiry)}
                            label="All Enquiries" />

                        <CFormSwitch size="xl" checked={checkDashRights(dashboardRights.totalSales)}
                            onChange={() => totoggaleRights(dashboardRights.totalSales)}
                            label="Total Sales" />

                        <CFormSwitch size="xl" label="Total Clients" checked={checkDashRights(dashboardRights.totalClients)}
                            onChange={() => totoggaleRights(dashboardRights.totalClients)}
                        />

                        <CFormSwitch size="xl" checked={checkDashRights(dashboardRights.totalService)}
                            onChange={() => totoggaleRights(dashboardRights.totalService)}
                            label="Total Services" />


                    </CCol>
                    <CCol>
                        <CFormSwitch size="xl" label="Members" checked={checkDashRights(dashboardRights.members)}
                            onChange={() => totoggaleRights(dashboardRights.members)}
                        />

                        <CFormSwitch size="xl" label="Collection" checked={checkDashRights(dashboardRights.collection)}
                            onChange={() => totoggaleRights(dashboardRights.collection)}
                        />
                        <CFormSwitch size="xl" label="Expense" checked={checkDashRights(dashboardRights.expense)}
                            onChange={() => totoggaleRights(dashboardRights.expense)}
                        />

                        <CFormSwitch size="xl" label="Profit" checked={checkDashRights(dashboardRights.profit)}
                            onChange={() => totoggaleRights(dashboardRights.profit)}
                        />

                    </CCol>
                    <CCol>


                        <CFormSwitch size="xl" label="Income" checked={checkDashRights(dashboardRights.income)}
                            onChange={() => totoggaleRights(dashboardRights.income)}
                        />

                        <CFormSwitch size="xl" label="Attendance" checked={checkDashRights(dashboardRights.attendance)}
                            onChange={() => totoggaleRights(dashboardRights.attendance)}
                        />
                        <CFormSwitch size="xl" label="Social Media" checked={checkDashRights(dashboardRights.socialMedia)}
                            onChange={() => totoggaleRights(dashboardRights.socialMedia)}
                        />
                        <CFormSwitch size="xl" label="Admin panel" checked={checkDashRights(dashboardRights.adminpanel)}
                            onChange={() => totoggaleRights(dashboardRights.adminpanel)}
                        />
                    </CCol>

                </CRow>
        </div>
    )
}

export default DashboardRights
