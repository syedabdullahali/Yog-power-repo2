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
import {useRight,useSuperRightFun,useSuperRightVal} from './useRight.js/useRight'
import { leadsSuperRight } from '../Rights/rightsValue/crmRightsValue'

const LeadsRight = ({crmLeads,setRightObject }) => {

    const {crmAllEnquiry1,crmAppointment1,crmTrialUpdate1,crmProspects1
      ,crmCallsReports1,crmColdEnquires1,superRight} = crmLeads.items


    const leadsRigthFun = useRight(setRightObject,'crmLeads')
    const totoggaleRights = useSuperRightFun(setRightObject,'crmRights','crmLeads')
    const checkDashRights = useSuperRightVal(superRight)
    



  return (
    <div>
    <CRow >

         <h5 className='mb-4 p-2 d-flex ' >
         Leads <span className='mx-2'>
           <CFormSwitch size="lg" checked={crmLeads.value} onChange={(e)=>setRightObject(prev=>{
                                            prev.crmRights.crmLeads.value=e.target.checked
                                            return {...prev}
            })}/></span>
          </h5>

        <CCol>
            
            <h5 className='mb-4 d-flex ' >
            All Enquires<span className='mx-1'>
           <CFormSwitch size="lg" 
           checked={crmAllEnquiry1.value}
           onChange={(e)=>leadsRigthFun(true,'crmAllEnquiry1',e.target.checked)}
           /></span>
          </h5>
            <CFormSwitch size="xl" label="Add "  checked={checkDashRights(leadsSuperRight.allEnquires,'addOn')} onChange={()=>totoggaleRights(leadsSuperRight.allEnquires,'addOn')}  />
            <CFormSwitch size="xl" label="Edit enquiries" checked={checkDashRights(leadsSuperRight.allEnquires,'edit')} onChange={()=>totoggaleRights(leadsSuperRight.allEnquires,'edit')} />
            <CFormSwitch size="xl" label="Delete enquiries" checked={checkDashRights(leadsSuperRight.allEnquires,'delete')} onChange={()=>totoggaleRights(leadsSuperRight.allEnquires,'delete')} />

        </CCol>

        <CCol>
            <h5 className='mb-4 d-flex ' >
            Appointment<span className='mx-1'>
           <CFormSwitch size="lg" 
           checked={crmAppointment1.value}
           onChange={(e)=>leadsRigthFun(true,'crmAppointment1',e.target.checked)}
           /></span>
          </h5>
            <CFormSwitch size="xl" label="Add "  checked={checkDashRights(leadsSuperRight.appointment,'addOn')} onChange={()=>totoggaleRights(leadsSuperRight.appointment,'addOn')}  />
            <CFormSwitch size="xl" label="Edit enquiries" checked={checkDashRights(leadsSuperRight.appointment,'edit')} onChange={()=>totoggaleRights(leadsSuperRight.appointment,'edit')} />
            <CFormSwitch size="xl" label="Delete enquiries" checked={checkDashRights(leadsSuperRight.appointment,'delete')} onChange={()=>totoggaleRights(leadsSuperRight.appointment,'delete')} />
        </CCol>

        <CCol>
            <h5 className='mb-4 d-flex ' >
            Trail Update<span className='mx-1'>
           <CFormSwitch size="lg" 
           checked={crmTrialUpdate1.value}
           onChange={(e)=>leadsRigthFun(true,'crmTrialUpdate1',e.target.checked)}
           /></span>
          </h5>
          <CFormSwitch size="xl" label="Add "  checked={checkDashRights(leadsSuperRight.trailUpdate,'addOn')} onChange={()=>totoggaleRights(leadsSuperRight.trailUpdate,'addOn')}  />
            <CFormSwitch size="xl" label="Edit enquiries" checked={checkDashRights(leadsSuperRight.trailUpdate,'edit')} onChange={()=>totoggaleRights(leadsSuperRight.trailUpdate,'edit')} />
            <CFormSwitch size="xl" label="Delete enquiries" checked={checkDashRights(leadsSuperRight.trailUpdate,'delete')} onChange={()=>totoggaleRights(leadsSuperRight.trailUpdate,'delete')} />
        </CCol>
    </CRow>

    <CRow className='mt-4'>
        <CCol>
        <h5 className='mb-4 d-flex ' >
        Prospect<span className='mx-1'>
           <CFormSwitch size="lg" 
           checked={crmProspects1.value}
           onChange={(e)=>leadsRigthFun(true,'crmProspects1',e.target.checked)}
           /></span>
          </h5>
             <CFormSwitch size="xl" label="Add "  checked={checkDashRights(leadsSuperRight.prospect,'addOn')} onChange={()=>totoggaleRights(leadsSuperRight.prospect,'addOn')}  />
            <CFormSwitch size="xl" label="Edit enquiries" checked={checkDashRights(leadsSuperRight.prospect,'edit')} onChange={()=>totoggaleRights(leadsSuperRight.prospect,'edit')} />
            <CFormSwitch size="xl" label="Delete enquiries" checked={checkDashRights(leadsSuperRight.prospect,'delete')} onChange={()=>totoggaleRights(leadsSuperRight.prospect,'delete')} />
        </CCol>
        <CCol>
            <h5 className='mb-4 d-flex ' >
            Call Report<span className='mx-1'>
           <CFormSwitch size="lg" 
           checked={crmCallsReports1.value}
           onChange={(e)=>leadsRigthFun(true,'crmCallsReports1',e.target.checked)}
           /></span>
          </h5>

          <CFormSwitch size="xl" label="Add "  checked={checkDashRights(leadsSuperRight.callReport,'addOn')} onChange={()=>totoggaleRights(leadsSuperRight.callReport,'addOn')}  />
            <CFormSwitch size="xl" label="Edit enquiries" checked={checkDashRights(leadsSuperRight.callReport,'edit')} onChange={()=>totoggaleRights(leadsSuperRight.callReport,'edit')} />
            <CFormSwitch size="xl" label="Delete enquiries" checked={checkDashRights(leadsSuperRight.callReport,'delete')} onChange={()=>totoggaleRights(leadsSuperRight.callReport,'delete')} />
        </CCol>
        <CCol>
            <h5 className='mb-4 d-flex ' >
            Cold Enquires<span className='mx-1'>
           <CFormSwitch size="lg" 
           checked={crmColdEnquires1.value}
           onChange={(e)=>leadsRigthFun(true,'crmColdEnquires1',e.target.checked)}
           /></span>
          </h5>
          <CFormSwitch size="xl" label="Add "  checked={checkDashRights(leadsSuperRight.coldEnquires,'addOn')} onChange={()=>totoggaleRights(leadsSuperRight.coldEnquires,'addOn')}  />
            <CFormSwitch size="xl" label="Edit enquiries" checked={checkDashRights(leadsSuperRight.coldEnquires,'edit')} onChange={()=>totoggaleRights(leadsSuperRight.coldEnquires,'edit')} />
            <CFormSwitch size="xl" label="Delete enquiries" checked={checkDashRights(leadsSuperRight.coldEnquires,'delete')} onChange={()=>totoggaleRights(leadsSuperRight.coldEnquires,'delete')} />
        </CCol>

    </CRow>

</div>
  )
}

export default LeadsRight
