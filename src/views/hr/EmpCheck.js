import React, { useEffect, useState } from 'react'
import {
    CButton,
    CButtonGroup,
    CCard,
    CCardBody,
    CCardHeader,
    CCardTitle,
    CCol,
    CFormInput,
    CFormSelect,
    CInputGroup,
    CInputGroupText,
    CPagination,
    CPaginationItem,
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
import { MdCall, MdDelete, MdEdit, MdMail } from 'react-icons/md';
import { BsPlusCircle, BsWhatsapp } from 'react-icons/bs';
import axios from 'axios';
import moment from 'moment';
import { useSelector } from "react-redux";

const EmpCheck = () => {
    const url = useSelector((el) => el.domainOfApi)
    const [result1, setResult1] = useState([]);


    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;
    const username = user.user.username;
    const centerCode = user.user.centerCode;
    useEffect(() => {
        getAttendance()
    }, [])

    function getAttendance() {
        axios.get(`${url}/staffAttendance/all`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log(res.data)  


            //     const data = res.data.reverse().filter((el)=>el.classesId)

            //     const uniqObj = []

            //    data.forEach((el,i) => {
            //      console.log(i)
            //      if(!uniqObj.some((el2)=>el?.classesId===el2?.classesId&&el?.staffId===el2?.staffId)){
            //         console.log(el)
            //           uniqObj.push({classesId:el.classesId,staffId:el.staffId,
            //             time:{hours:+el.totalWorkinghour.split(":")[0],mins:+el.totalWorkinghour.split(":")[1]},details:el
            //         })
            //      }else{
            //        uniqObj.forEach((el2,i)=>{
            //         if(el?.classesId===el2?.classesId&&el?.staffId===el2?.staffId){
            //             el2.time.hours+=+el.totalWorkinghour.split(":")[0]
            //             el2.time.mins+=+el.totalWorkinghour.split(":")[1]

            //         }
            //        })
            //      }
            //    });  



            //    console.log(uniqObj)
                


                setResult1(res.data.reverse())
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
                        <CCardTitle className="mt-2">   Check Ins</CCardTitle>
                    </CCardHeader>
                    <CCardBody>

                        <CTable className='mt-3'  align="middle" bordered style={{ borderColor: "#0B5345"}} hover responsive>
                            <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                                <CTableRow >
                                    <CTableHeaderCell>Sr.No</CTableHeaderCell>
                                    <CTableHeaderCell>Date</CTableHeaderCell>
                                    <CTableHeaderCell style={{minWidth:'150px'}}>Attendance Id</CTableHeaderCell>
                                    <CTableHeaderCell>Name</CTableHeaderCell>
                                    <CTableHeaderCell>Designation</CTableHeaderCell>
                                    <CTableHeaderCell>Shift Timeing</CTableHeaderCell>
                                    <CTableHeaderCell>Start Time</CTableHeaderCell>
                                    <CTableHeaderCell>End Time</CTableHeaderCell>
                                    <CTableHeaderCell style={{ minWidth: "150px" }}>Check In Time</CTableHeaderCell>
                                    <CTableHeaderCell>Check  Out Time</CTableHeaderCell>
                                    <CTableHeaderCell>Total working hour</CTableHeaderCell>
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
                                            style={{ minWidth: "180px" }}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            disabled
                                            aria-describedby="exampleFormControlInputHelpInline"
                                            style={{ minWidth: "180px" }}
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "180px" }}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "180px" }}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "180px" }}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "180px" }}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                   
                                   
                                </CTableRow>
                                  {result1.filter((list) => list.username === username&&list?.status==='Done').map((el,i)=>{
                                                         
               return               <CTableRow>
                                    <CTableDataCell>{i+1}</CTableDataCell>
                                    <CTableDataCell>{new Date(el.checkDate).toLocaleString()}</CTableDataCell>
                                    <CTableDataCell>{el.attentanceId}</CTableDataCell>
                                    <CTableDataCell>{el.StaffName}</CTableDataCell>
                                    <CTableDataCell>{el.Designation}</CTableDataCell>
                                    <CTableDataCell>{el.shiftTimeing}</CTableDataCell>
                                    <CTableDataCell>{formatTime(el.shiftStartTime)}</CTableDataCell>
                                    <CTableDataCell>{formatTime(el.shiftEndTime)}</CTableDataCell>
                                    <CTableDataCell>{el.checkIn} <u className='ms-2' style={{color:`${el.checkInstatus==='delay'?'red':'black'}`}}>{el.checkInstatus}</u></CTableDataCell>
                                    <CTableDataCell>{el.checkOut} <u className='ms-2' style={{color:`${el.checkOutstatus==='before'?'red':'black'}`}} >{el.checkOutstatus}</u></CTableDataCell>
                                    <CTableDataCell>{el.totalWorkinghour}</CTableDataCell>
                                    </CTableRow>


                                  })}


                            </CTableBody>
                        </CTable>
                    </CCardBody>
                  
                </CCard>
            </CCol>
        </CRow>
    )
}

export default EmpCheck







