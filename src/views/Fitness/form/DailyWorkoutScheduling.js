import { CForm, CCard, CNav, CCol, CFormInput, CRow, CButton } from "@coreui/react"


function DailyWorkoutScheduling({ closeFormFun }) {

    return <CCard className="m-3 overflow-hidden" >
        <CNav className="p-2 px-3" style={{ background: '#0B5345' }}>
            <h3 className="text-white"  >Daily Workout Scheduling Form</h3>
        </CNav>
        <CForm className="p-3">

            <CCol className="d-flex justify-content-end">
                <CButton className="bg-danger  text-black " onClick={() => closeFormFun()}> close</CButton>
            </CCol>

            <h4 style={{ marginBottom: '2rem' }}>Workout Schedul </h4>

            <CRow className='mt-lg-4'>
                <CCol className='d-flex justify-content-between my-2' lg={6}>
                    <h5>Workout Name</h5>
                    <CFormInput
                        type="text"
                        className="w-50"
                        placeholder="Enter Workout Name"
                    />
                </CCol>

                <CCol className='d-flex justify-content-between my-2 ' lg={6} >
                    <h5 >No of Days</h5>
                    <CFormInput
                        type="number"
                        className="w-50"
                        placeholder="Enter no of day work out"
                    />
                </CCol>
            </CRow>



            <CRow className='mt-lg-4'>
                <CCol className='d-flex justify-content-between my-2' lg={6}>
                    <h5>Created Date</h5>

                    <CFormInput
                        type="date"
                        className="w-50"
                    />
                </CCol>

                <CCol className='d-flex justify-content-between my-2 ' lg={6} >
                    <h5 >Created From</h5>
                    <CFormInput
                        type="text"
                        className="ms-4 w-50"
                        placeholder="Enter Excercise info"
                    />
                </CCol>
            </CRow>
            <CRow className='mt-lg-4'>
                <CCol className='d-flex justify-content-between my-2' lg={6}>
                    <h5>Created By</h5>

                    <CFormInput
                        className="w-50"
                        type="text"
                        placeholder="Enter about Creater"
                    />
                </CCol>

                <CCol className='d-flex justify-content-between my-2 ' lg={6} >

                </CCol>
            </CRow>


        </CForm>
        <CCol className="p-3">
            <CButton>Save Diet Plan</CButton>
        </CCol>

        <CCol className="d-flex justify-content-around p-1 text-white " style={{ background: '#0B5345' }}>

        </CCol>


    </CCard>






}



export default DailyWorkoutScheduling