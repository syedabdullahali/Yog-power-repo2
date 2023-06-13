import {
    CCol,
    CFormSwitch,
    CRow,
} from '@coreui/react'

function Courses(){
return  <div >
<CRow >
<CCol>
   <h5>Teachers Training Course</h5>
   <CFormSwitch size="xl" label="Training Course" />
   <CFormSwitch size="xl" label="Add Course" />
   <CFormSwitch size="xl" label="Edit Course" />
   <CFormSwitch size="xl" label="Delete Course" />
</CCol>
<CCol>
   <h5>Teachers Training Course Video Details</h5>
   <CFormSwitch size="xl" label="Teachers Training Course"  />
   <CFormSwitch size="xl" label="Add Training Course"  />
   <CFormSwitch size="xl" label="Edit Course Video" />
   <CFormSwitch size="xl" label="Delete Course Video" />
</CCol>
<CCol>
   <h5>Teachers Training Course PDF Details</h5>
   <CFormSwitch size="xl" label="PDF Details"  />
   <CFormSwitch size="xl" label="Add PDF Details"  />
   <CFormSwitch size="xl" label="Edit PDF Details" />
   <CFormSwitch size="xl" label="Delete PDF Details" />
</CCol>
</CRow>

<CRow>
<CCol>
   <h5>Teachers Training Course Client Certificate Details</h5>
   <CFormSwitch size="xl" label="Client Certificate"  />
   <CFormSwitch size="xl" label="Add Client Certificate"  />
   <CFormSwitch size="xl" label="Edit Client Certificate" />
   <CFormSwitch size="xl" label="Delete Client Certificate" />
</CCol>
</CRow>
</div>

} 

export default Courses