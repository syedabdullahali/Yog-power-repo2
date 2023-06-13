import {
    CCol,
    CFormSwitch,
    CRow,
} from '@coreui/react'


import React from 'react'

const ExportImport = () => {
  return (<div >
    <CRow >   
        <CCol>
            <CFormSwitch size="xl" label="Export "  />
            <CFormSwitch size="xl" label="Import" />
        </CCol>
    </CRow>
    

    
    </div>
  )
}

export default ExportImport
