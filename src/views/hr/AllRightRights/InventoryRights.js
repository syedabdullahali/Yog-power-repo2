import {
    CCol,
    CFormSwitch,
    CRow,    
} from '@coreui/react'

function InventoryRights(){


    return <div >

<CRow >
<h5 className='mb-4 p-2 d-flex ' style={{background:'#0B5345',color:'white'}}>
        IMP Call List <span className='mx-2'><CFormSwitch size="lg"/></span></h5>

   <CCol>
       <h5>IMP Call List</h5>
       <CFormSwitch  size="xl" label="IMP Call lsit" />
       <CFormSwitch size="xl" label="Add IMP Call" />
       <CFormSwitch size="xl" label="Edit IMP Call" />
       <CFormSwitch size="xl" label="Delete IMP Call" />
   </CCol>
   <CCol>
       <h5>All Suppiler List</h5>
       <CFormSwitch size="xl" label="All Suppiler List"  />
       <CFormSwitch size="xl" label="Add Suppiler List" />
       <CFormSwitch size="xl" label="Edit Suppiler List" />
       <CFormSwitch size="xl" label="Delete Suppiler List" />
   </CCol>
   <CCol>
       <h5>Guest List</h5>
       <CFormSwitch size="xl" label="Guest List"  />
       <CFormSwitch size="xl" label="Add Guest List" />
       <CFormSwitch size="xl" label="Edit Guest List" />
       <CFormSwitch size="xl" label="Delete Guest List" />
   </CCol>

 
</CRow>

<CRow className='mt-5' >
  
<h5 className='mb-4 p-2 d-flex ' style={{background:'#0B5345',color:'white'}}>
Products List <span className='mx-2'><CFormSwitch size="lg"/></span></h5>


   <CCol>
       <h5>Clothes Product </h5>
       <CFormSwitch size="xl" label="Clothes Product" />
   </CCol>
   <CCol>
       <h5>Ayurveda Medicine</h5>
       <CFormSwitch size="xl" label="Ayurveda Medicine"  />
   </CCol>
   <CCol>
       <h5>Fitness Product</h5>
       <CFormSwitch size="xl" label="Fitness Product"  />
   </CCol>
 
</CRow>



<CRow className='mt-4'>
<CCol>
       <h5>Foods Product </h5>
       <CFormSwitch size="xl" label="Foods Product" />
   </CCol>
   <CCol>
       <h5>Genral Product</h5>
       <CFormSwitch size="xl" label="Genral Product"  />
   </CCol>
   <CCol></CCol>


</CRow>

<CRow className='mt-4 pt-5'>
<CCol>
<h5 className='p-2' style={{background:'#0B5345',color:'white'}}>Product Sales Report</h5>
<CFormSwitch size="xl" label="Stock Report"  />
</CCol>
<CCol>
<h5 className='p-2' style={{background:'#0B5345',color:'white'}}>Stock Report</h5>
<CFormSwitch size="xl" label="Stock Report"  />
</CCol>

<CCol>
<h5 className='p-2' style={{background:'#0B5345',color:'white'}}>Stock Alert</h5>
<CFormSwitch size="xl" label="Purchase Report"  />
</CCol>


</CRow>

<CRow className='mt-4 '>
    <CCol>
        <h5 className='p-2' style={{background:'#0B5345',color:'white'}}>Stock List</h5>
        <CFormSwitch size="xl" label="Stock List"/>
        <CFormSwitch size="xl" label="Stock List Add"/>
        <CFormSwitch size="xl" label="Order List"/>
        <CFormSwitch size="xl" label="Order List Status"/>
        <CFormSwitch size="xl" label="Order received"/>
    </CCol>
    <CCol>
        <h5  className='p-2'style={{background:'#0B5345',color:'white'}}>Office Inventory</h5>
        <CFormSwitch size="xl" label="Office Inventory"/>
        <CFormSwitch size="xl" label="Inventory List"/>
        <CFormSwitch size="xl" label="Assigned List"/>
    </CCol>
    <CCol></CCol>

</CRow>


</div> 


}

export default InventoryRights