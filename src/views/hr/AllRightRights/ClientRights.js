import { cilArrowCircleBottom, cilArrowCircleTop } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
    CCol,
    CFormSwitch,
    CRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import {useRight,useSuperRightFun,useSuperRightVal} from './useRight.js/useRight'
import { clientManagementRights } from '../Rights/rightsValue/crmRightsValue'

const ClientRights = ({crmCientManagment,setRightObject}) => {

    const {crmAllClients1,crmActiveClients1,crmRenewalsClient1,
      crmRenewedClients1,crmLeftClients1,crmClientSupport1,superRight} = crmCientManagment.items

    const clientRigthFun = useRight(setRightObject,'crmCientManagment')
    const totoggaleRights = useSuperRightFun(setRightObject,'crmRights','crmCientManagment')
    const checkDashRights = useSuperRightVal(superRight)
    


  return (
    <div >
    <CRow>
          <h5 className='mb-4 p-2 d-flex ' >
          Client Management <span className='mx-2'>
           <CFormSwitch size="lg" checked={crmCientManagment.value} onChange={(e)=>setRightObject(prev=>{
                                            prev.crmRights.crmCientManagment.value=e.target.checked
                                            return {...prev}
            })}/></span>
          </h5>

        <CCol>
            <h5 className='mb-4 d-flex ' >
            All Clients<span className='mx-1'>
           <CFormSwitch size="lg" 
           checked={crmAllClients1.value}
           onChange={(e)=>clientRigthFun(true,'crmAllClients1',e.target.checked)}
           /></span>
          </h5>
            <CFormSwitch size="xl" label="Client Profile" checked={checkDashRights(clientManagementRights.allClients,'profile')} onChange={()=>totoggaleRights(clientManagementRights.allClients,'profile')} />
            <CFormSwitch size="xl" label="Status" checked={checkDashRights(clientManagementRights.allClients,'status')} onChange={()=>totoggaleRights(clientManagementRights.allClients,'status')} />
            <CFormSwitch size="xl" label="Edit Client" checked={checkDashRights(clientManagementRights.allClients,'edit')} onChange={()=>totoggaleRights(clientManagementRights.allClients,'edit')} />
            <CFormSwitch size="xl" label="Delete  Client"  checked={checkDashRights(clientManagementRights.allClients,'delete')} onChange={()=>totoggaleRights(clientManagementRights.allClients,'delete')} />
        </CCol>
        <CCol>

            <h5 className='mb-4 d-flex ' >
            Active Clients<span className='mx-1'>
           <CFormSwitch size="lg" 
           checked={crmActiveClients1.value}
           onChange={(e)=>clientRigthFun(true,'crmActiveClients1',e.target.checked)}
           /></span>
          </h5>

            <CFormSwitch size="xl" label="Client Profile" checked={checkDashRights(clientManagementRights.activeClients,'profile')} onChange={()=>totoggaleRights(clientManagementRights.activeClients,'profile')} />
            <CFormSwitch size="xl" label="Status" checked={checkDashRights(clientManagementRights.activeClients,'status')} onChange={()=>totoggaleRights(clientManagementRights.activeClients,'status')} />
            <CFormSwitch size="xl" label="Edit Client" checked={checkDashRights(clientManagementRights.activeClients,'edit')} onChange={()=>totoggaleRights(clientManagementRights.activeClients,'edit')} />
            <CFormSwitch size="xl" label="Delete  Client"  checked={checkDashRights(clientManagementRights.activeClients,'delete')} onChange={()=>totoggaleRights(clientManagementRights.activeClients,'delete')} />
        </CCol>
        <CCol>
            <h5 className='mb-4 d-flex ' >
            Renewals Clients<span className='mx-1'>
           <CFormSwitch size="lg" 
           checked={crmRenewalsClient1.value}
           onChange={(e)=>clientRigthFun(true,'crmRenewalsClient1',e.target.checked)}
           /></span>
          </h5>
            <CFormSwitch size="xl" label="Client Profile" checked={checkDashRights(clientManagementRights.renewalsClients,'profile')} onChange={()=>totoggaleRights(clientManagementRights.renewalsClients,'profile')} />
            <CFormSwitch size="xl" label="Status" checked={checkDashRights(clientManagementRights.renewalsClients,'status')} onChange={()=>totoggaleRights(clientManagementRights.renewalsClients,'status')} />
            <CFormSwitch size="xl" label="Edit Client" checked={checkDashRights(clientManagementRights.renewalsClients,'edit')} onChange={()=>totoggaleRights(clientManagementRights.renewalsClients,'edit')} />
            <CFormSwitch size="xl" label="Delete  Client"  checked={checkDashRights(clientManagementRights.renewalsClients,'delete')} onChange={()=>totoggaleRights(clientManagementRights.renewalsClients,'delete')} />
        </CCol>
    </CRow>
    <CRow className='mt-4'>
        <CCol>
          <h5 className='mb-4 d-flex ' >
            Renewed Clients<span className='mx-1'>
           <CFormSwitch size="lg" 
           checked={crmRenewedClients1.value}
           onChange={(e)=>clientRigthFun(true,'crmRenewedClients1',e.target.checked)}
           /></span>
          </h5>
            <CFormSwitch size="xl" label="Client Profile" checked={checkDashRights(clientManagementRights.renewedClients,'profile')} onChange={()=>totoggaleRights(clientManagementRights.renewedClients,'profile')} />
            <CFormSwitch size="xl" label="Status" checked={checkDashRights(clientManagementRights.renewedClients,'status')} onChange={()=>totoggaleRights(clientManagementRights.renewedClients,'status')} />
            <CFormSwitch size="xl" label="Edit Client" checked={checkDashRights(clientManagementRights.renewedClients,'edit')} onChange={()=>totoggaleRights(clientManagementRights.renewedClients,'edit')} />
            <CFormSwitch size="xl" label="Delete  Client"  checked={checkDashRights(clientManagementRights.renewedClients,'delete')} onChange={()=>totoggaleRights(clientManagementRights.renewedClients,'delete')} />
        </CCol>
        <CCol>
            <h5 className='mb-4 d-flex ' >
            Left Clients<span className='mx-1'>
           <CFormSwitch size="lg" 
           checked={crmLeftClients1.value}
           onChange={(e)=>clientRigthFun(true,'crmLeftClients1',e.target.checked)}
           /></span>
          </h5>
            <CFormSwitch size="xl" label="Client Profile" checked={checkDashRights(clientManagementRights.leftClients,'profile')} onChange={()=>totoggaleRights(clientManagementRights.leftClients,'profile')} />
            <CFormSwitch size="xl" label="Status" checked={checkDashRights(clientManagementRights.leftClients,'status')} onChange={()=>totoggaleRights(clientManagementRights.leftClients,'status')} />
            <CFormSwitch size="xl" label="Edit Client" checked={checkDashRights(clientManagementRights.leftClients,'edit')} onChange={()=>totoggaleRights(clientManagementRights.leftClients,'edit')} />
            <CFormSwitch size="xl" label="Delete  Client"  checked={checkDashRights(clientManagementRights.leftClients,'delete')} onChange={()=>totoggaleRights(clientManagementRights.leftClients,'delete')} />
        </CCol>
        <CCol>
            <h5 className='mb-4 d-flex ' >
            Client Support<span className='mx-1'>
           <CFormSwitch size="lg" 
           checked={crmClientSupport1.value}
           onChange={(e)=>clientRigthFun(true,'crmClientSupport1',e.target.checked)}
           /></span>
          </h5>
          <CFormSwitch size="xl" label="Client Profile" checked={checkDashRights(clientManagementRights.clientSupport,'profile')} onChange={()=>totoggaleRights(clientManagementRights.clientSupport,'profile')} />
            <CFormSwitch size="xl" label="Status" checked={checkDashRights(clientManagementRights.clientSupport,'status')} onChange={()=>totoggaleRights(clientManagementRights.clientSupport,'status')} />
            <CFormSwitch size="xl" label="Edit Client" checked={checkDashRights(clientManagementRights.clientSupport,'edit')} onChange={()=>totoggaleRights(clientManagementRights.clientSupport,'edit')} />
            <CFormSwitch size="xl" label="Delete  Client"  checked={checkDashRights(clientManagementRights.clientSupport,'delete')} onChange={()=>totoggaleRights(clientManagementRights.clientSupport,'delete')} />
        </CCol>
    </CRow>
</div>
  )
}

export default ClientRights
