import {
    CCol,
    CFormSwitch,
    CRow,
} from '@coreui/react'


import React from 'react'

const CenterSetup = () => {
    return <div >
<CRow>
<CCol>
       <h5>Center Setup</h5>
       <CFormSwitch  size="xl" label="Add Company Logo" />
   </CCol>        
</CRow>


<CRow  className='mt-5' >

   <CCol>
       <h5>Company Logo Setup</h5>
       <CFormSwitch  size="xl" label="Add Company Logo" />
   </CCol>
   <CCol>
       <h5>Company Profile Setup</h5>
       <CFormSwitch size="xl" label="Add Company Profile"  />
   </CCol>
   <CCol>
       <h5>Services Master</h5>
       <CFormSwitch size="xl" label="Services Master"  />
       <CFormSwitch size="xl" label="Add Services Master"  />
       <CFormSwitch size="xl" label="Delete Services Master"  />
   </CCol>
</CRow>

<CRow className='mt-5' >
   <CCol>
       <h5>Package Master</h5>
       <CFormSwitch size="xl" label="Package Master" />
       <CFormSwitch size="xl" label="Add Package Master" />
       <CFormSwitch size="xl" label="Delete Package Master" />
       <CFormSwitch size="xl" label="Package Master" />
       <CFormSwitch size="xl" label="Status" />
   </CCol>
   <CCol>
       <h5>Batch time Master</h5>
       <CFormSwitch size="xl" label="Batch time Master"  />
       <CFormSwitch size="xl" label="Add Batch time Master"  />
       <CFormSwitch size="xl" label="Delete Batch time Master"  />
       <CFormSwitch size="xl" label="Status"  />
   </CCol>
   <CCol>
       <h5>Form Master</h5>
       <CFormSwitch size="xl" label="Fitness Product"  />
   </CCol>

</CRow>



<CRow className='mt-4'>
   <CCol>
       <h5>Invoice Master</h5>
       <CFormSwitch size="xl" label="Fitness Product"  />
   </CCol>
</CRow>



</div> 
}

export default CenterSetup
