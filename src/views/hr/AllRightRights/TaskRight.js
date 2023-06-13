import {
    CCol,
    CFormSwitch,
    CRow,
} from '@coreui/react'


import React from 'react'

const TaskRight = () => {
  return (
    <div >
    <CRow >
        <CCol>
            <CFormSwitch size="xl" label="Task" />
            <CFormSwitch size="xl" label="Create Task"  />
        </CCol>

        <CCol>
            <CFormSwitch size="xl" label="Yog Power Branch"  />
        </CCol>
    </CRow>
    </div>
  )
}

export default TaskRight
