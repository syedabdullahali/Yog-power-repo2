import {
    CCol,
    CFormSwitch,
    CRow,
} from '@coreui/react'


import React from 'react'

const SupportRequest = () => {
    return <div >
<CRow>
  <CCol>
       <h5>Support</h5>
       <CFormSwitch  size="xl" label="Support" />
   </CCol>        
</CRow>

<CRow className='mt-5' >
   <CCol>
       <h5>Support Request</h5>
        <CFormSwitch size="xl" label="Support Request"  />
       <CFormSwitch  size="xl" label="Add Support Request" />
   </CCol>
</CRow>
</div> 
}

export default SupportRequest
