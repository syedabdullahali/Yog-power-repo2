import {
    CCol,
    CFormSwitch,
    CRow,
} from '@coreui/react'

import React from 'react'

const IntergrationsRights = () => {
return <div >

<CRow >
  <CCol>
       <h5>Intergrations</h5>
       <CFormSwitch  size="xl" label="Intergrations" />
   </CCol>        
</CRow>

   <CRow className='mt-5' >  
       <CCol>
           <h5>Batches</h5>
           <CFormSwitch  size="xl" label="Batches" />
       </CCol>
       <CCol>
           <h5>PT</h5>
           <CFormSwitch  size="xl" label="PT" />
       </CCol>
       <CCol>
           <h5>Classes</h5>
           <CFormSwitch  size="xl"  label="Classes"/>
       </CCol>
    </CRow>    
 </div> 
}

export default IntergrationsRights
