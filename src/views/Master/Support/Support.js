import {CCard,CCardTitle,CCardHeader,CTable,CTableHead,
    CTableHeaderCell,CTableBody,CTableRow,CTableDataCell, 
    CButton,CCol,CFormInput,CFormSwitch}from '@coreui/react'
    import { MdCall, MdDelete, MdEdit, MdMail } from 'react-icons/md';



function Support (){

 
  
  return <CCard>

       <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
           <CCardTitle className='p-2'>
              <h4>Support Request</h4></CCardTitle>
       </CCardHeader>
  
         <CCol className='d-flex p-4'>
         <label className='me-4' ><h5>Request Type</h5></label>

          <CFormInput
            type="text"
            id="exampleFormControlInput1"
            placeholder="Enter Your Request Type"
             className='w-50'
          />
          <CButton className='mx-2 ' >Save</CButton>
        </CCol>
        
  
  
  
     <div style={{overflowX:'scroll',boxSizing:'border-box'}} className='p-4'>
  
       <CTable  >
            <CTableHead >
               <CTableHeaderCell className='p-3'>Sr No</CTableHeaderCell>
               <CTableHeaderCell className='p-3'>Date</CTableHeaderCell>
               <CTableHeaderCell className='p-3'>Request Type</CTableHeaderCell>
               <CTableHeaderCell className='p-3 '>ON/OFF</CTableHeaderCell>
               <CTableHeaderCell className='p-3'>Action</CTableHeaderCell>
               
            </CTableHead>
            <CTableBody>
              <CTableRow>
                  <CTableDataCell>1</CTableDataCell>
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell className=''>
                  <CFormSwitch size="xl"  id="formSwitchCheckDefaultXL" style={{margin:'auto',cursor:'pointer'}}/>
                  </CTableDataCell>
                  <CTableDataCell className='text-center'>
                    <MdEdit cursor='pointer'/>
                    <MdDelete cursor='pointer'/>
                  </CTableDataCell>
                 
              </CTableRow>
            </CTableBody>
       </CTable>
       </div>
  
  </CCard>






}


export default Support 




