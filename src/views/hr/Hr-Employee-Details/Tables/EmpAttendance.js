import { cilAccountLogout, cilCheckCircle, cilFingerprint } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
    CButton, CCard, CCardBody, CCardHeader, CCardText, CCol, CFormInput, CRow,
    CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow,
    CSpinner
} from '@coreui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { MdDelete} from 'react-icons/md'
import moment from 'moment/moment'

import { useSelector } from 'react-redux'
import { BsFillPersonCheckFill, BsFillPersonFill } from 'react-icons/bs'
import { GiTeacher } from 'react-icons/gi'
import { AiOutlineCheck, AiTwotoneCheckCircle } from 'react-icons/ai'

const EmpAttendance = ({id}) => {
    const [attendance, setAttendance] = useState(0);
    const [attendanceID, setAttendanceID] = useState('');
    const [staffName, setStaffName] = useState('')
    const [dipartment, setDipartMent] = useState('')
    const [designation, setDesignation] = useState('')
    const [employeeCategory, setEmployeeCategory] = useState('')
    const [joiningDate, setJoiningDate] = useState('')
    const [centarId, setCentarId] = useState('');
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');

    const time = null;
    const [ctime, setDate] = useState(time);
    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;
    const username = user.user.username;
    const centerCode = user.user.centerCode;
    const [result1, setResult1] = useState([]);
    const [allStaff, setAllStaff] = useState({});
    const url1 = useSelector((el) => el.domainOfApi)
    const [staffId, setStaffId] = useState('')
    const [staffContact, setContact] = useState('')
    const [shiftTimeingData, setShitTimeingData] = useState([])
    const [selectedtimeing, setSelectedTimeing] = useState({ shiftName: '', selectedId: '', startTime: '', endTime: '' })
    const [isTrainer, setIsTrainer] = useState(false)
    const [batchMaster, setBatchMaster] = useState([])
    const [selectedBatch, setSelectedBatch] = useState({})
    const [innerProsseccActive,setInnerProsseccActive] = useState(true)
 

    const headers = {
        "Authorization": `Bearer ${ token }`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }


    const getDataToStaffCheckIn = async () => {
        try {
            const response1 = axios.get(`${url1}/shiftTimeSchedule/all`, { headers })
            const response2 = axios.get(`${url1}/employeeform/${id}`, { headers })
            const response3 = axios.get(`${url1}/Batch/all`, { headers })

            const data = await Promise.all([response1, response2, response3])

            setShitTimeingData(data[0].data)
            setAllStaff(data[1].data)
            setAttendanceID(data[1].data?.AttendanceID),
            setBatchMaster(data[2].data)

            if(data.every((el)=>el.status===200)){
                setInnerProsseccActive(false)
            }


        } catch (error) {
            console.log(error)
        }


    }

    const getAttendance = async () => {
        try {
            const { data } = await axios.get(`${ url1 }/staffAttendance/emp/${id}`, { headers })
            setResult1(data.reverse())

        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getDataToStaffCheckIn()
        getAttendance()
    }, [])




    const handelTime = () => {
        let time = new Date().toLocaleTimeString();
        var currentdate = new Date();
        const classesId = selectedBatch?._id

        const batchData = { ...selectedBatch }
        delete batchData?.username
        delete batchData?.status
        delete batchData?.updatedAt
        delete batchData?.createdAt
        delete batchData?._id
        delete batchData?.__v


        let data = {
            ...batchData,
            classesId,
            username: username,
            centerId: centerCode,
            attentanceId: attendanceID,
            checkDate: currentdate,
            checkIn: time,
            staffId: id,
            StaffName: staffName,
            staffContact: staffContact,
            Department: dipartment,
            Designation: designation,
            EmployeeCategory: employeeCategory,
            joiningDate: joiningDate,
            shiftTimeing: selectedtimeing.shiftName,
            shiftStartTime: selectedtimeing.startTime,
            shiftEndTime: selectedtimeing.endTime,
            currentTimeInfo: {
                hours: new Date().getHours(),
                minutes: new Date().getMinutes(),
                seconds: new Date().getSeconds()
            },
        }
        fetch(`${url1}/staffAttendance/create`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${ token }`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then((resp) => {
            console.log(resp)
            resp.json().then(() => {
                alert("successfully submitted")
                setAttendance(2)
                setSelectedTimeing({ shiftName: '', selectedId: '', startTime: '', endTime: '' })
                setSelectedBatch('')
                getAttendance()
            })
        })



    }


    const totalWorkingHour = (item) => {
        let num = 0

        for (let i = item.currentTimeInfo?.hours; i < item.checkOutTimeInfo?.hours; i++) {
            num++
        }
        const totalWorkinghour = `${ num }:${ Math.abs(item.checkOutTimeInfo.minutes - item.currentTimeInfo.minutes) }`
        return { totalWorkinghour }
    }

    const handelTimeingStatus = (item) => {


        const chectkWorkingHours = (shiftTime, shiftEndTime, joinHour, joinMinute) => {

            if (+shiftTime.split(':')[0] < joinHour && !shiftEndTime) {
                if (+shiftTime.split(':')[1] < item.currentTimeInfo.minutes) {
                    return 'delay'
                }
                if (+shiftTime.split(':')[1] === joinMinute) {
                    return 'Right'
                }
                return 'before'
            }

            if (+shiftTime.split(':')[0] > joinHour && !shiftEndTime) {
                return 'before'
            }

            if (+shiftTime.split(':')[0] === joinHour && +shiftTime.split(':')[1] > joinMinute) {
                return 'before'
            }

            if (+shiftTime.split(':')[0] > joinHour && shiftEndTime) {
                if (+shiftTime.split(':')[1] > item.currentTimeInfo.minutes) {
                    return 'before'
                }
                if (+shiftTime.split(':')[1] === joinMinute) {
                    return 'Right'
                }
            }
            if (+shiftTime.split(':')[0] < joinHour) {
                return 'extra'
            } else {
                return 'before'
            }





        }

        const checkInstatus = chectkWorkingHours(item.shiftStartTime, false, item.currentTimeInfo?.hours, item.currentTimeInfo?.minutes)
        const checkOutstatus = chectkWorkingHours(item.shiftEndTime, true, item.checkOutTimeInfo?.hours, item.checkOutTimeInfo?.minutes)
        return { checkInstatus, checkOutstatus }
    }



    const CheckOut = (item1) => {

        const checkOutTimeInfo = {
            hours: new Date().getHours(),
            minutes: new Date().getMinutes(),
            seconds: new Date().getSeconds()
        }

        let time2 = new Date().toLocaleTimeString();
        let item = {
            checkOut: time2, status: 'Done',
            status2: 'no',
            checkOutTimeInfo,
            ...handelTimeingStatus({ ...item1, checkOutTimeInfo }),
            ...totalWorkingHour({ ...item1, checkOutTimeInfo })
        }

        console.log(item)
        fetch(`${ url1 }/staffAttendance/update/${ item1._id }`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${ token }`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        }).then((result) => {
            result.json().then((resp) => {
                getAttendance()
            })
        })
    }



    const submitBtn = () => {

        if (allStaff._id) {
            [allStaff].map((data) => (
                setStaffName(data?.FullName),
                setCentarId(data?.CenterID),
                setAttendance(1),
                setStatus(data?.status),
                setContact(data?.ContactNumber),
                setDipartMent(data?.Department),
                setDesignation(data?.JobDesignation),
                setJoiningDate(data?.joiningDate),
                setEmployeeCategory(data?.EmployeeCategory),
                setError(''),
                setIsTrainer(data?.EmployeeCategory.trim() === 'Freelancer' || data.trainerStatus ? true : false)
            ))
        } else {
            setError('Not Found')
        }
    }

    function deleteStaff(id) {
        if (!confirm('Do you want to delete this')) return

        fetch(`${ url1 }/staffAttendance/delete/${id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((result) => {
            result.json().then((resp) => {
                getAttendance()
            })
        })
    }

    const toSelectShiftTimeing = (el) => {
        setSelectedTimeing({ shiftName: el.shiftName, selectedId: el._id, startTime: el.startTime, endTime: el.endTime })
    }


    const toSelectTrainerBatchTimeing = (el) => {
        const endTime = moment().hour(el.batch_timing.split(':')[0])
            .minute(el.batch_timing.split(':')[1])
            .add(el.BatchTime.split(':')[0], 'hours').add(el.BatchTime.split(':')[1], 'minutes').format("HH:mm");
        setSelectedBatch(el)
        console.log({ shiftName: el.category, selectedId: el._id, startTime: el.batch_timing, endTime: endTime })
        setSelectedTimeing({ shiftName: el.category, selectedId: el._id, startTime: el.batch_timing, endTime: endTime })
    }


    console.log(attendanceID)

    return (
        <div className="mb-3 border-success">
       
            <CCardBody>
                <CRow className='text-end p-2'>
                    <CCol>
                    {innerProsseccActive&& <CSpinner color="success" variant="grow"/>}
                    {innerProsseccActive&& <h6>Inner Process Going on Please Wait few Second</h6>}
                    </CCol>
                </CRow>
                <CRow>
                    <CCol lg={4}>
                        <CCard>
                            <CCardBody>
                                <label style={{ color: 'red' }}>{error}</label>
                                <CRow>
                                    <CCol xs={5}>
                                        <CIcon icon={cilFingerprint} size="8xl" />
                                    </CCol>
                                    <CCol className='mt-4'>
                                        <CFormInput
                                            type="text"
                                            label='Attendance ID'
                                            placeholder="Enter Attendance ID"
                                            value={attendanceID}
                                            onChange={(e) => setAttendanceID(`${e.target.value}`)}
                                        />
                                    </CCol>
                                </CRow>
                                <CButton className='mt-1 float-end' onClick={submitBtn}>Submit</CButton>
                            </CCardBody>
                        </CCard>
                    </CCol>


                    {attendance === 1 && !isTrainer
                        && <CCol lg={4}>
                            <CCard>
                                <CCardBody style={{ maxHeight: '260px', overflowY: 'scroll' }}>

                                    {shiftTimeingData.map((el) =>
                                        <CCol className='d-flex py-2 '>
                                            <CButton className='border-0' style={{ backgroundColor: `${ selectedtimeing.selectedId === el._id ? 'blue' : '#D3D3D3' }`, width: '40px', height: '40px' }} onClick={() => toSelectShiftTimeing(el)}>
                                                {selectedtimeing.selectedId === el._id ? <BsFillPersonCheckFill /> : <BsFillPersonFill />}</CButton>
                                            <div>
                                                <h6 className='ms-2'>{el.shiftName}</h6>
                                                <h6 className='ms-2'><b>Start Time</b> {el.startTime}</h6>
                                                <h6 className='ms-2'><b>End Time</b> {el.endTime}</h6>

                                            </div>
                                        </CCol>
                                    )}


                                </CCardBody>
                            </CCard>
                        </CCol>}

                    {isTrainer && attendance === 1
                        && <CCol lg={4} >
                            <CCard>
                                <CCardBody style={{ maxHeight: '260px', overflowY: 'scroll' }}>

                                    {batchMaster.filter((el) => el.MemberId === id).map((el) =>
                                        <CCol className='d-flex py-2 '>
                                            <div >
                                                <CButton color={el._id === selectedBatch?._id ? 'primary' : 'light'} className='d-flex p-2' onClick={() => toSelectTrainerBatchTimeing(el)} >
                                                    <div><GiTeacher /></div>
                                                    <div style={{ fontSize: '10px' }}>{el._id === selectedBatch?._id ? <AiOutlineCheck /> : <AiTwotoneCheckCircle />}</div>
                                                </CButton>
                                            </div>

                                            <div>
                                                <h6 className='ms-2'>Batch timing {el.batch_timing}</h6>
                                                <h6 className='ms-2'><b>Category</b> {el.category}</h6>
                                                <h6 className='ms-2'><b>Batch Duration</b> {el.Batch_Duration}</h6>

                                            </div>
                                        </CCol>
                                    )}


                                </CCardBody>
                            </CCard>
                        </CCol>}



                    {attendance === 1 && (!!selectedtimeing.selectedId.trim() || selectedBatch?._id) &&
                        <CCol lg={4}>
                            <CCard>
                                <CCardBody>
                                    <CRow>
                                        <CCol xs={5}>

                                            <CIcon icon={cilCheckCircle} size="8xl" />
                                        </CCol>
                                        <CCol className='mt-3'>
                                            <CCardText>Staff Name: {staffName}<br />
                                                Attendance ID: {attendanceID}<br />
                                                Center ID: {centerCode}<br />
                                                Status: {status ? 'Active' : 'Inactive'}<br />
                                            </CCardText>
                                        </CCol>
                                    </CRow>
                                    {ctime == null &&
                                        <CButton className='mt-1 float-end' onClick={handelTime}>Check In</CButton>
                                    }
                                </CCardBody>
                            </CCard>
                        </CCol>
                    }



                    {attendance === 2 &&
                        <CCol lg={4}>
                            <CCard>
                                <CCardBody>
                                    <CRow>
                                        <CCol xs={5} className='mt-2'>
                                            <CIcon icon={cilAccountLogout} size="7xl" />
                                        </CCol>
                                        <CCol className='mt-3'>
                                            <CCardText>Staff Name: {staffName}<br />
                                                Attendance ID: {attendanceID}<br />
                                                Attendance Time: {ctime}
                                            </CCardText>
                                        </CCol>
                                    </CRow>
                                    <CButton className='mt-1 float-end' onClick={() => setAttendance(0)}>Done !</CButton>

                                </CCardBody>
                            </CCard>
                        </CCol>
                    }
                </CRow>

                <CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345" }} hover responsive>
                    <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                        <CTableRow >
                            <CTableHeaderCell>Sr.No</CTableHeaderCell>
                            <CTableHeaderCell>Staff Name</CTableHeaderCell>
                            <CTableHeaderCell>Attendance ID</CTableHeaderCell>
                            <CTableHeaderCell>Center ID</CTableHeaderCell>
                            <CTableHeaderCell>Check Date</CTableHeaderCell>
                            <CTableHeaderCell>CheckIn Time</CTableHeaderCell>
                            <CTableHeaderCell>CheckOut Time</CTableHeaderCell>
                            <CTableHeaderCell>Action</CTableHeaderCell>
                            <CTableHeaderCell>Edit</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {result1.filter((list) => list.username === username).map((item, index) => (
                            <CTableRow key={index}>
                                <CTableDataCell>{index + 1}</CTableDataCell>
                                <CTableDataCell>{item.StaffName}</CTableDataCell>
                                <CTableDataCell>{item.attentanceId}</CTableDataCell>
                                <CTableDataCell>{item.centerId}</CTableDataCell>
                                <CTableDataCell>{moment(item.createdAt).format("LL")}</CTableDataCell>
                                <CTableDataCell>{item.checkIn}</CTableDataCell>
                                <CTableDataCell>{item.checkOut}</CTableDataCell>
                                <CTableDataCell>{item.checkOut === undefined ? <CButton color='danger' onClick={() => CheckOut(item)}>Check Out</CButton> : <CButton disabled color='danger' onClick={() => CheckOut(item)}>Check Out</CButton>}</CTableDataCell>
                                <CTableDataCell>
                                    <MdDelete style={{ cursor: 'pointer', markerStart: '10px' }}
                                        onClick={() => deleteStaff(item._id)} size='20px' /> </CTableDataCell>
                            </CTableRow>
                        ))}
                    </CTableBody>
                </CTable>
            </CCardBody>
        </div>
    )
}

export default EmpAttendance
