import {
    CCol,
    CFormSwitch,
    CRow,
} from '@coreui/react'


import React from 'react'

const MarketingRigths = () => {
    return <div >

<CRow>
  <CCol>
       <h5>Marketing</h5>
       <CFormSwitch  size="xl" label="Support" />
   </CCol>        
</CRow>

<CRow  className='mt-5'>
   <CCol>
       <h5>Lead Source Master</h5>
       <CFormSwitch  size="xl" label="Lead Source Master" />
       <CFormSwitch  size="xl" label="Add Source Master" />
       <CFormSwitch  size="xl" label="Delete Source Master" />
   </CCol>
   <CCol>
       <h5>Template</h5>
       <CFormSwitch size="xl" label="Template"  />
       <CFormSwitch size="xl" label="Add Template"  />
       <CFormSwitch size="xl" label="Edit Template"  />
       <CFormSwitch size="xl" label="Delete Template"  />
   </CCol>
   <CCol>
       <h5>Gallery Master</h5>
       <CFormSwitch size="xl" label="Gallery Master"  />
       <CFormSwitch size="xl" label="Add Gallery Master"  />
       <CFormSwitch size="xl" label="Delete Gallery Master"  />
   </CCol>
</CRow>

<CRow className='mt-5' >
   <CCol>
       <h5>Automated Communication</h5>
       <CFormSwitch size="xl" label="Automated Communication" />
   </CCol>
</CRow>


</div> 
}

export default MarketingRigths
