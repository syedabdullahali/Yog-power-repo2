import {
    CButton,
    CButtonGroup,
    CCard,
    CCardBody,
    CCardHeader,
    CCardTitle,
    CCol,
    CForm,
    CFormInput,
    CFormSelect,
    CFormSwitch,
    CFormTextarea,
    CInputGroup,
    CInputGroupText,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CPagination,
    CPaginationItem,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CImage,
} from '@coreui/react'

import logo from 'src/assets/images/avatars/icon.png'


function AddInvoiceSlip({showInvoiceModal2,setInvoceModal2,allIvoiceOfaUser}) {

    return <CModal  size="xl" alignment="center" scrollable visible={showInvoiceModal2} onClose={() => setInvoceModal2(false)}>

                          <CModalHeader>
                                <CModalTitle>Create new Invoice Slip</CModalTitle>
                            </CModalHeader>                            
        <CRow>
            <CCol lg={12} className='text-center'><CImage src={logo} width="100px" height='100px' /></CCol>
            <CCol lg={12} className='text-center mt-2'><h5>Yog Power International </h5></CCol>
        </CRow>    
</CModal>

}

export default AddInvoiceSlip 