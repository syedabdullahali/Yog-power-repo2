import {CCard,CCardTitle,CCardHeader,CTable,CTableHead,
    CTableHeaderCell,CTableBody,CTableRow,CTableDataCell,CFormInput,
    CButton,CCol}from '@coreui/react'

import { cilArrowCircleBottom, cilArrowCircleTop } from '@coreui/icons'
import CIcon from '@coreui/icons-react'


import { useRef } from 'react';


function BulkCalling(){

  const hiddenXLimportFileInput = useRef('')
  const hiddenXLExportFileInput = useRef('')


  // Import 

   const HandaleImportClick = () =>{
       hiddenXLimportFileInput.current.click()
   }
   const HandaleImportChange = (event)=>{
    const importXlFile = event.target.files[0];
    console.log("Import",importXlFile)
   }
  
  // Export 

   const HandaleExportClick = () =>{
    hiddenXLExportFileInput.current.click()
   }
   const HandaleExportChange = (event)=>{
    const importXlFile = event.target.files[0];
    console.log("Export",importXlFile)
   }


    return <CCard>

    <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
        <CCardTitle className='p-2 '>
           <h4>Bulk Calling</h4></CCardTitle>
    </CCardHeader>

    
      <CCol className='p-4 d-flex justify-content-end'>

        <CButton className='me-4' onClick={HandaleImportClick} > <CIcon icon={cilArrowCircleBottom} />Import</CButton> 

        <CFormInput type='file'
         accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"  
         ref={ hiddenXLimportFileInput}  
         onChange={HandaleImportChange}  hidden />


        <CButton className='me-2' onClick={HandaleExportClick}>  <CIcon icon={cilArrowCircleTop}/>Export</CButton>
        <CFormInput type='file'
         accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"  
         ref={hiddenXLExportFileInput}  
         onChange={HandaleExportChange}  hidden />
      </CCol>


    <div style={{overflowX:'scroll',boxSizing:'border-box'}} className='p-4'>
    
    <CTable  >
         <CTableHead >
            <CTableHeaderCell className='p-3'>Sr No</CTableHeaderCell>
            <CTableHeaderCell className='p-3'>Name</CTableHeaderCell>
            <CTableHeaderCell className='p-3'>Mobile</CTableHeaderCell>
            <CTableHeaderCell className='p-3'>Email</CTableHeaderCell>
            <CTableHeaderCell className='p-3 '>Services</CTableHeaderCell>        
          
            
         </CTableHead>
         <CTableBody>
           <CTableRow>
               <CTableDataCell>1</CTableDataCell>
               <CTableDataCell></CTableDataCell>
               <CTableDataCell></CTableDataCell>
               <CTableDataCell > </CTableDataCell>
               <CTableDataCell ></CTableDataCell>
           </CTableRow>
         </CTableBody>
    </CTable>
    </div>
    
    </CCard>





}


export default BulkCalling