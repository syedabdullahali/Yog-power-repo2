import React, { useEffect, useState } from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCardTitle,
    CCol,
    CFormInput,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowCircleBottom, cilArrowCircleTop, cilInfo } from '@coreui/icons'
import { useSelector } from 'react-redux'
import axios from 'axios';
import moment from 'moment';



const AllClassReport = () => {

    const [classReportData, setClassReportDta] = useState([]);
    const url = useSelector((el) => el.domainOfApi)
    var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;
;
    useEffect(() => {
        getAttendance()
    }, [])

    function getAttendance() {
        axios.get(`${url}/staffAttendance/report`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => {


     

               console.log(res.data)


                setClassReportDta(res.data.reverse())
            })
            .catch((error) => {
                console.error(error)
            })
    }

    function formatTime(timeString) {
        const [hourString, minute] = timeString.split(":");
        const hour = +hourString % 24;
        return (hour % 12 || 12) + ":" + (minute||'00') + (hour < 12 ? "AM" : "PM");
    }



    



    return (
        <CRow>
            <CCol lg={12} sm={12}>
                <CCard className="mb-3 border-success">
                    <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                        <CCardTitle className="mt-2">All Trainer Report</CCardTitle>
                    </CCardHeader>
                    <CCardBody>                     
                        <CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345" }} hover responsive>
                            <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                                <CTableRow >
                                    <CTableHeaderCell>Sr.No</CTableHeaderCell>
                                    <CTableHeaderCell>Year/month</CTableHeaderCell>
                                    <CTableHeaderCell>Trainer Name</CTableHeaderCell>
                                    <CTableHeaderCell>Type of Classes</CTableHeaderCell>
                                    <CTableHeaderCell>No Of Classes</CTableHeaderCell>
                                    <CTableHeaderCell>Classes Timing</CTableHeaderCell>
                                    <CTableHeaderCell>Total completed hrs </CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                <CTableRow>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            style={{ minWidth: "60px" }}
                                            type="text"
                                            disabled
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "90px" }}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            style={{ minWidth: "120px" }}
                                            type="text"
                                            disabled
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="number"
                                            style={{ minWidth: "100px" }}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "120px" }}
                                            disabled
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "120px" }}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>  
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "120px" }}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell> 
                                </CTableRow>
                                {classReportData.map((el,i)=>
                                <CTableRow>
                                       <CTableDataCell>{i+1} </CTableDataCell>
                                       <CTableDataCell>{el.year} {month[el.month]} </CTableDataCell>
                                        <CTableDataCell >{el.details.trainer_name}</CTableDataCell>

                                        <CTableDataCell>{el.details.shiftTimeing}</CTableDataCell>

                                        <CTableDataCell>{el.noOfClasses}</CTableDataCell>

                                        <CTableDataCell>{formatTime(el.details.batch_timing)}</CTableDataCell>
                                        <CTableDataCell>Hours {el.time.hours} Minutes {el.time.mins}</CTableDataCell>

                                </CTableRow>                                                              
                              )}
                                
                            </CTableBody>
                        </CTable>
                    </CCardBody>
                   
                </CCard>
            </CCol>
        </CRow>
    )
}

export default AllClassReport
//noOfClasses
