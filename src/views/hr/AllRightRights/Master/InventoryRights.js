import {
    CCol,
    CFormSwitch,
    CRow,    
} from '@coreui/react'


const InventoryRights = () => {
    return <div >

    <CRow >
      <CCol>
           <h5>Inventory</h5>
           <CFormSwitch  size="xl" label="HR" />
       </CCol>        
    </CRow>
    
       <CRow className='mt-5' >  
           <CCol>
               <h5>All Product Listing Master</h5>
               <CFormSwitch  size="xl" label="Product Listing Master" />
               <CFormSwitch  size="xl" label="ADD Product Listing " />
               <CFormSwitch  size="xl" label="Delete Product Listing " />
               <CFormSwitch  size="xl" label="Edit Product Listing " />
           </CCol>
           <CCol>
               <h5>Office Inventory</h5>
               <CFormSwitch  size="xl" label="Office Inventory" />
               <CFormSwitch  size="xl" label="ADD Office Inventory" />
               <CFormSwitch  size="xl" label="Delete Office Inventory" />
               <CFormSwitch  size="xl" label="Edit Office Inventory" />
           </CCol>
        </CRow>    

     </div>
}

export default InventoryRights
