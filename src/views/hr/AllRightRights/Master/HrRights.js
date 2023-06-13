import {
    CCol,
    CFormSwitch,
    CRow,
} from '@coreui/react'

import React from 'react'

const HrRights = () => {
return <div >

<CRow >
  <CCol>
       <h5>HR</h5>
       <CFormSwitch  size="xl" label="HR" />
   </CCol>        
</CRow>

   <CRow className='mt-5' >  
       <CCol>
           <h5>Designation Master</h5>
           <CFormSwitch  size="xl" label="Designation master" />
           <CFormSwitch  size="xl" label="ADD designation master" />
           <CFormSwitch  size="xl" label="Delete designation master" />
           <CFormSwitch  size="xl" label="Satus" />
       </CCol>
       <CCol>
           <h5>Hr Policy</h5>
           <CFormSwitch  size="xl" label="Hr Policy" />
           <CFormSwitch  size="xl" label="ADD Hr Policy" />
           <CFormSwitch  size="xl" label="Delete Hr Policy" />
           <CFormSwitch  size="xl" label="Satus" />
       </CCol>
       <CCol>
           <h5>Holiday List Master</h5>
           <CFormSwitch  size="xl"  label="Holiday List Master"/>
           <CFormSwitch  size="xl"  label="ADD Holiday List Master"/>
           <CFormSwitch  size="xl"  label="Delete Holiday List Master"/>
           <CFormSwitch  size="xl"  label="Satus Holiday List Master"/>
       </CCol>
    </CRow>    
    <CRow  className='mt-5' > 
    <CCol>
           <h5>Employee Joining</h5>
           <CFormSwitch  size="xl"  label="Employee Joining"/>
           <CFormSwitch  size="xl"  label="ADD Employee Joining"/>
           <CFormSwitch  size="xl"  label="Delete Employee Joining"/>
           <CFormSwitch  size="xl"  label="Satus Employee Joining"/>
       </CCol>    
    </CRow>
 </div> 
}

export default HrRights
