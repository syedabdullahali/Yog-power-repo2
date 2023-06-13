import { CForm, CCard, CNav, CCol, CFormInput, CRow, CButton, CFormTextarea } from "@coreui/react"



function WorkoutTempletForm({ closeFormFun }) {

    return <CCard className="m-3 overflow-hidden" >
        <CNav className="p-2 px-3" style={{ background: '#0B5345' }}>
            <h3 className="text-white"  > Work out Form</h3>
        </CNav>
        <CForm className="p-3">

            <CCol className="d-flex justify-content-end">
                <CButton className="bg-danger  text-black " onClick={() => closeFormFun()}> close</CButton>
            </CCol>

            <h4 style={{ marginBottom: '2rem' }}> Exercise  Info</h4>

            <CRow className='mt-lg-4'>
                <CCol className='d-flex justify-content-between my-2' lg={6}>
                    <h5>Exercise Name</h5>
                    <CFormInput
                        type="text"
                        className="w-50"
                        placeholder="Enter your Exercise Name"
                    />
                </CCol>

                <CCol className='d-flex justify-content-between my-2 ' lg={6} >
                    <h5 >Exercise Image</h5>
                    <CFormInput
                        type="file"
                        accept="image/*"
                        className="w-50"
                        placeholder="Enter your contact number"
                    />
                </CCol>
            </CRow>



            <CRow className='mt-lg-4'>
                <CCol className='d-flex justify-content-between my-2' lg={6}>
                    <h5>Video</h5>

                    <CFormInput
                        type="file"
                        accept="video/*"
                        className="w-50"
                        placeholder="Enter your contact number"
                    />
                </CCol>



                <CCol className='d-flex justify-content-between my-2 ' lg={6} >
                    <h5 >Types of Exercise</h5>
                    <CFormInput
                        type="text"
                        className="ms-4 w-50"
                        placeholder="Enter your Type of Exercise"
                    />
                </CCol>
            </CRow>

            <CRow className='mt-lg-4'>
                <CCol className='d-flex justify-content-between my-2'>
                    <h5 className="me-4">Description</h5>
                    <CFormTextarea
                        id="exampleFormControlTextarea1"
                        rows={3}
                        className="ms-4"
                        placeholder="Description Must be 8-20 words long."
                    />
                </CCol>


            </CRow>


        </CForm>
        <CCol className="p-3">
            <CButton>Save Client Diet</CButton>
        </CCol>

        <CCol className="d-flex justify-content-around p-1 text-white " style={{ background: '#0B5345' }}>

        </CCol>

    </CCard>

}


export default WorkoutTempletForm