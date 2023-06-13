import {CCard,CCardTitle,CCardHeader,CTable,CTableHead,
    CTableHeaderCell,CTableBody,CTableRow,CTableDataCell, 
    CButton,CCol,CFormInput,CFormSwitch}from '@coreui/react'
import { useState } from 'react';

function BulkMaller(){

const [activeButton,setActiveButton] = useState(true)

return <CCard>

<CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
    <CCardTitle className='p-2'>
       <h4>Bulk Mailer </h4></CCardTitle>
</CCardHeader>

  <CCol className='p-4'></CCol>
 
<div style={{overflowX:'scroll',boxSizing:'border-box'}} className='p-4'>

<CTable  >
     <CTableHead >
        <CTableHeaderCell className='p-3'>Sr No</CTableHeaderCell>
        <CTableHeaderCell className='p-3'>Name</CTableHeaderCell>
        <CTableHeaderCell className='p-3'>Mobile</CTableHeaderCell>
        <CTableHeaderCell className='p-3'>Email</CTableHeaderCell>
        <CTableHeaderCell className='p-3 '>Services</CTableHeaderCell>        
        <CTableHeaderCell className='p-3'>Status</CTableHeaderCell>
        <CTableHeaderCell className='p-3'>Option</CTableHeaderCell>
        
     </CTableHead>
     <CTableBody>
       <CTableRow>
           <CTableDataCell>1</CTableDataCell>
           <CTableDataCell></CTableDataCell>
           <CTableDataCell></CTableDataCell>
           <CTableDataCell className=''>
           </CTableDataCell>
           <CTableDataCell className='text-center'>
          
           </CTableDataCell>
         
           <CTableDataCell className='text-center' >
            {activeButton&&<CButton onClick={()=>setActiveButton(false)} size='sm' color='success'>Active</CButton>}
            {activeButton||<CButton onClick={()=>setActiveButton(true)} size='sm' color='danger'>InActive</CButton>}
           </CTableDataCell>

           <CTableDataCell  className='text-center' >
              <CButton size='sm'  color='warning'>Remove</CButton>
           </CTableDataCell>

       </CTableRow>
     </CTableBody>
</CTable>
</div>

</CCard>
} 


export default BulkMaller