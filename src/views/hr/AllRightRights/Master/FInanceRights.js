import {
  CCol,
  CFormSwitch,
  CRow,    
} from '@coreui/react'

const FInanceRights = () => {
  return <div >

  <CRow >
    <CCol>
         <h5>Finance</h5>
         <CFormSwitch  size="xl" label="HR" />
     </CCol>        
  </CRow>
  
     <CRow className='mt-5' >  
         <CCol>
             <h5>Expenses Category Master</h5>
             <CFormSwitch  size="xl" label="Product Listing Master" />
             <CFormSwitch  size="xl" label="ADD Expenses Category" />
             <CFormSwitch  size="xl" label="Delete Expenses Category" />
         </CCol>
         <CCol>
             <h5>Budgeting Master</h5>
             <CFormSwitch  size="xl" label="Office Inventory" />
             <CFormSwitch  size="xl" label="ADD Budgeting Master" />
             <CFormSwitch  size="xl" label="Delete Budgeting Master" />
         </CCol>
         <CCol>
             <h5>Invoice Setup Master</h5> 
             <CFormSwitch  size="xl" label="Invoice Setup Master" />
             <CFormSwitch  size="xl" label="ADD Invoice " />
             <CFormSwitch  size="xl" label="Delete Invoice " />
         </CCol>
      </CRow>    
      <CRow className='mt-5' >  
         <CCol>
             <h5>Tax Setup Master</h5>
             <CFormSwitch  size="xl" label="Tax Setup Master" />
             <CFormSwitch  size="xl" label="ADD Tax" />
             <CFormSwitch  size="xl" label="Delete Tax" />
         </CCol>
      </CRow>

   </div>
}

export default FInanceRights
