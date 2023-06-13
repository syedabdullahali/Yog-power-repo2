import {
    CCol,
    CFormSwitch,
    CRow,
} from '@coreui/react'

function HrRights(){

   

return  <div>

<CRow >
<CCol>
   <h5>Recuritment</h5>
   <CFormSwitch size="xl" label="Recuritment" />
   <CFormSwitch size="xl" label="Add Recuritment" />
   <CFormSwitch size="xl" label="Edit Recuritment" />
   <CFormSwitch size="xl" label="Delete Recuritment" />
   <CFormSwitch size="xl" label="Status" />
</CCol>
<CCol>
   <h5>All Employee Profile</h5>
   <CFormSwitch size="xl" label="All Employee Profile"  />
   <CFormSwitch size="xl" label="Edit Employee Profile" />
   <CFormSwitch size="xl" label="Delete Employee Profile" />
   <CFormSwitch size="xl" label="Status" />
</CCol>
<CCol>
   <h5>Empyolee Target Sheet</h5>
   <CFormSwitch size="xl" label="Empyolee Target Sheet"  />
   <CFormSwitch size="xl" label="Add Empyolee Target " />
   <CFormSwitch size="xl" label="Delete Empyolee Target " />
</CCol>

</CRow>

<CRow className='my-5' >

<CCol>
   <h5>Biometric Staff</h5>
   <CFormSwitch size="xl" label="Biometric Staff" />
   <CFormSwitch size="xl" label="Edit Biometric Staff" />
   <CFormSwitch size="xl" label="Delete Biometric Staff" />
</CCol>
<CCol>
   <h5>EMP Attendance Register</h5>
   <CFormSwitch size="xl" label="EMP Attendance Register"  />
</CCol>
<CCol>
   <h5>Emp Check Ins</h5>
   <CFormSwitch size="xl" label="Emp Check Ins"  />
</CCol>

</CRow>



<CRow className='my-5'>
<CCol>
   <h5>EMP joining</h5>
   <CFormSwitch size="xl" label="EMP joining" />
</CCol>
<CCol>
   <h5>Job Profile</h5>
   <CFormSwitch size="xl" label="Job Profile" />
</CCol>
<CCol>
   <h5>Hr Policy</h5>
   <CFormSwitch size="xl" label="Hr Policy" />
</CCol>

</CRow>


<CRow className='my-5'>
<CCol>
   <h5>Holiday List</h5>
   <CFormSwitch size="xl" label="Holiday List" />
   <CFormSwitch size="xl" label="Edit Holiday List" />
   <CFormSwitch size="xl" label="Delete Holiday List" />
</CCol>
<CCol>
   <h5>Employee Document</h5>
   <CFormSwitch size="xl" label="Employee Document" />
</CCol>
<CCol>
   <h5>Leave Setup</h5>
   <CFormSwitch size="xl" label="Leave Setup" />
</CCol>

</CRow>

<CRow className='my-5'>


<CCol>
   <h5>Salary Sheet</h5>
   <CFormSwitch size="xl" label="Salary Sheet" />
   <CFormSwitch size="xl" label="Salary View" />

</CCol>
<CCol>
   <h5>Trainer Salary Sheet</h5>
   <CFormSwitch size="xl" label="Trainer Salary Sheet" />
   <CFormSwitch size="xl" label="Trainer Salary View" />

</CCol>

<CCol>
   <h5>Shift Timing </h5>
   <CFormSwitch size="xl" label="Shift Timing " />
</CCol>
</CRow>

<CRow className='my-5'>


<CCol>
   <h5>Shift Timing </h5>
   <CFormSwitch size="xl" label="All Trainer Report" />
</CCol>

<CCol>
   <h5>Emp Performance</h5>
   <CFormSwitch size="xl" label="Emp Performance" />
   <CFormSwitch size="xl" label="Trainer Performance" />
</CCol>


</CRow>

</div>

} 

export default HrRights