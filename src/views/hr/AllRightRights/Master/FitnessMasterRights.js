import {
    CCol,
    CFormSwitch,
    CRow,
} from '@coreui/react'

import React from 'react'

const FitnessMasterRights = () => {
return <div >

<CRow >
  <CCol>
       <h5>Fitness</h5>
       <CFormSwitch  size="xl" label="Fitness" />
   </CCol>        
</CRow>

   <CRow className='mt-5' >  
       <CCol>
           <h5>Body Measurement</h5>
           <CFormSwitch  size="xl" label="Body Measurement" />
       </CCol>
       <CCol>
           <h5>Fitness Goal</h5>
           <CFormSwitch size="xl" label="Fitness Goal"  />
       </CCol>
       <CCol>
           <h5>Fitnees Workout</h5>
           <CFormSwitch size="xl" label="Fitnees Workout"  />
       </CCol>
    </CRow>    
 </div> 
}

export default FitnessMasterRights
