import {CCard,CCardTitle,CCardHeader,CTable,CTableHead,CTableHeaderCell,CTableBody,CTableRow,CTableDataCell,CCol}from '@coreui/react'


function CustomerReview (){

return <CCard>

<CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
    <CCardTitle className='p-2'>
       <h4>Customer Review</h4></CCardTitle>
</CCardHeader>

  <CCol className='p-4'></CCol>
 
<div style={{overflowX:'scroll',boxSizing:'border-box'}} className='p-4'>

<CTable  >
     <CTableHead >
        <CTableHeaderCell className='p-3'>Sr No</CTableHeaderCell>
        <CTableHeaderCell className='p-3'>Name</CTableHeaderCell>
        <CTableHeaderCell className='p-3'>Mobile</CTableHeaderCell>
        <CTableHeaderCell className='p-3'>Email</CTableHeaderCell>
        <CTableHeaderCell className='p-3 '>Review</CTableHeaderCell>        
        <CTableHeaderCell className='p-3'>Reply / Post</CTableHeaderCell>
        <CTableHeaderCell className='p-3'>Link</CTableHeaderCell>
     </CTableHead>
     <CTableBody>
       <CTableRow>
           <CTableDataCell>1</CTableDataCell>
           <CTableDataCell></CTableDataCell>
           <CTableDataCell></CTableDataCell>
           <CTableDataCell>
           </CTableDataCell>
           <CTableDataCell >
          
           </CTableDataCell>
         
           <CTableDataCell  >

           </CTableDataCell>

           <CTableDataCell  >
           </CTableDataCell>

       </CTableRow>
     </CTableBody>
</CTable>
</div>

</CCard>
}


export default CustomerReview