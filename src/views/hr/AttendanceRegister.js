import React, { useEffect } from 'react'
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
    CRow,
    CTable,
    CTableRow,
    CTableHeaderCell,
    CTableHead,
    CTableBody,
    CTableDataCell
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowCircleBottom, cilArrowCircleTop, cilFile, cilInfo } from '@coreui/icons'
import { FaBeer } from 'react-icons/fa';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment/moment';

let user = JSON.parse(localStorage.getItem('user-info'))
const token = user.token;


import useAttendanceEmp from './useAttendanceEmployeeHook/useAttendanceEmp';

const AttendanceRegister = () => {

    const updateAttendanceData  =useAttendanceEmp()


    const [dateOfAMonth,setDateOfMonth] = useState([])
    const [staffAttendanceData,setStaffAttendanceData] = useState([])
    const [totalAttendanceofDay,setTotalAttendanceOfDay] = useState([])

    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const url1 = useSelector((el) => el.domainOfApi)

    function getDaysInMonth(month, year) {
        var date = new Date(year, month, 1);
        var days = [];
        while (date.getMonth() === month) {
          days.push({attendanceDate:new Date(date),value:false});
          date.setDate(date.getDate() + 1);
        }
        return days;
}    

const [selectedMonth,setMonth] = useState(new Date().getMonth())
const [selectedYear,setYear] = useState(new Date().getFullYear())
const [empData2,setEmpData2] = useState([])
const [attendanceData2,setAttendanceData2] = useState([])


let user = JSON.parse(localStorage.getItem('user-info'))
const token = user.token;
const username = user.user.username;


const monthName =     ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

async function getAttendance() {
 const dateWithAttendance = getDaysInMonth(new Date().getMonth(),new Date().getFullYear())
            setDateOfMonth(dateWithAttendance)
 try{
 const response1 = axios.get(`${url1}/staffAttendance/all`, {headers: {'Authorization': `Bearer ${token}`}})
 const response2 = axios.get(`${url1}/employeeform`, {headers: {'Authorization': `Bearer ${token}`}})

 const data = await Promise.all([response1,response2])
 const attendanceData = data[0].data
 const empolyeeData   = data[1].data
 console.log(attendanceData)
 setEmpData2(empolyeeData)
 setAttendanceData2(attendanceData)

 const dataAttended = updateAttendanceData(attendanceData,dateWithAttendance,empolyeeData.filter((list)=>list.username === username 
 && list.selected === 'Select' ))
 HandleTotalAtten(dataAttended,dateWithAttendance)
 setStaffAttendanceData(dataAttended)
 }catch(error){
  console.error(error)
 }

}

function compareDateFun(date1,date2){
    return   new Date(date1).getFullYear() === new Date(date2).getFullYear() &&
                    new Date(date1).getMonth() === new Date(date2).getMonth()&&
                    new Date(date1).getDate() === new Date(date2).getDate()
   }

function HandleTotalAtten (data,date){

    const dataOfTotalAten = date.slice();

    dataOfTotalAten?.forEach((el)=>{
        el.value=0
        data?.forEach((el2)=>{
        let num = 0 
         el2?.dateWithAttendance1?.forEach((el3)=>{
          if(compareDateFun(el.attendanceDate,el3?.attendanceDate)&&el3.value){
             el.value += ++num 
          }          
         })
      })
    })
    
    setTotalAttendanceOfDay([...dataOfTotalAten])
}


useEffect(()=>{
    const newDate =  getDaysInMonth(+selectedMonth,+selectedYear)
        setDateOfMonth(newDate)
        if(!attendanceData2[0] && !empData2[0])return
        const dataAttended = updateAttendanceData(attendanceData2,newDate,empData2.filter((list)=>list.username === username 
        && list.selected === 'Select' ))
        HandleTotalAtten(dataAttended,newDate)
        setStaffAttendanceData(dataAttended)

      },[selectedMonth,selectedYear])

useEffect(()=>{
    getAttendance() 
},[])

let allTotalOfAttendance = 0


console.log(staffAttendanceData)

    return (
        <CRow>
            <CCol lg={12} sm={12}>
                <CCard className="mb-3 border-success">
                    <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                        <CCardTitle className="mt-2">Attendance Register</CCardTitle>
                    </CCardHeader>
                    <CCardBody>
                    <CRow className='mb-3'>
                                    <CCol  lg={3} md={6} sm={8} >
                                        <CInputGroup>
                                            <CInputGroupText
                                                component="label"
                                                htmlFor="inputGroupSelect01"
                                            >
                                                Year
                                            </CInputGroupText>
                                            <CFormSelect id="inputGroupSelect01"
                                            value={selectedYear}
                                            onChange={(e)=>setYear(e.target.value)}
                                            >
                                                <option>2023</option>    
                                                <option>2024</option>            
                                                <option>2025</option>    
                                                <option>2026</option>     
                                                <option>2027</option>    
                                                <option>2028</option>            
                                                <option>2029</option>    
                                                <option>2030</option>                                
                                            
                                            </CFormSelect>
                                        </CInputGroup>
                                    </CCol>
                                    <CCol lg={3} md={6} sm={8} >
                                        <CInputGroup>
                                            <CInputGroupText
                                                component="label"
                                                htmlFor="inputGroupSelect01"
                                            >
                                                Month
                                            </CInputGroupText>
                                            <CFormSelect id="inputGroupSelect01"
                                            value={selectedMonth}
                                            onChange={(e)=>setMonth(e.target.value)}
                                            >
                                                { monthName.map((el,i)=>
                                                <option value={i}>{el}</option>                                              
                                                )}
                                            </CFormSelect>
                                        </CInputGroup>
                                    </CCol>                                                                       
                                </CRow>
                          <div>
                          <CTable bordered borderColor="balck" responsive style={{width:'300%'}}>
                                    <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                                        <CTableRow>
                                            <CTableHeaderCell scope="col">Sr.No</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Attendance Id</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Center Id</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">
                                               Emp Name
                                            </CTableHeaderCell>
                                            <CTableHeaderCell scope="col"> Contact no</CTableHeaderCell>
                                           
                                            <CTableHeaderCell scope="col">Department</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Designation </CTableHeaderCell>
                                            <CTableHeaderCell scope="col" >Full Time/Part Time </CTableHeaderCell>
                                            <CTableHeaderCell scope="col" >Joining Date</CTableHeaderCell>
                                            {dateOfAMonth.map((el)=>
                                                    <CTableHeaderCell scope="col">{ days[new Date(el.attendanceDate).getDay()]}<br/>
                                                     {new Date(el.attendanceDate).getDate()}</CTableHeaderCell>                                                                                                                                        
                                          )}
                                             <CTableHeaderCell scope="col">Total Attended</CTableHeaderCell>


                                        </CTableRow>
                                    </CTableHead>                                  
                                    <CTableBody className='text-center'>
                                        {staffAttendanceData.map((el,i)=>
                                        <CTableRow color={el.status?'white':'danger'}>
                                           <CTableDataCell>{i+1}</CTableDataCell>
                                           <CTableDataCell>{el.attentanceId}</CTableDataCell>
                                          
                                            <CTableDataCell>{el.centerId}</CTableDataCell>
                                            <CTableDataCell>{el.StaffName}</CTableDataCell>
                                            <CTableDataCell>{el.staffContact}</CTableDataCell>
                                            <CTableDataCell>{el.Department}</CTableDataCell>
                                            <CTableDataCell>{el.Designation}</CTableDataCell>
                                            <CTableDataCell>{el.EmployeeCategory}</CTableDataCell>
                                            <CTableDataCell>{moment(el.joiningDate).format('DD-MM-YYYY')}</CTableDataCell>

                                            {el.dateWithAttendance1.flatMap((el2)=>
                                                    <CTableDataCell color={el2.value&&'success'}> {el2.value?'P':'A'}</CTableDataCell>                                                                                                                                         
                                          )}         
                                            <CTableDataCell>{el.dateWithAttendance1.reduce((crr,el2)=>{
                                              if(el2.value){
                                                 crr+=1
                                                 allTotalOfAttendance+=1
                                              }
                                               return crr 
                                            },0)}  </CTableDataCell>
                                        </CTableRow>)}     
                                        
                                        <CTableRow >
                                            <CTableDataCell colSpan={9} style={{ backgroundColor: "#0B5345", color: "white" }}>Total</CTableDataCell>
                                            {totalAttendanceofDay?.map((el)=><CTableDataCell color='success'>{el.value}</CTableDataCell>)}
                                             <CTableDataCell color='success'>{allTotalOfAttendance}</CTableDataCell>
                                        </CTableRow>                               
                                    </CTableBody>                                       
                                </CTable>
                          </div>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default AttendanceRegister
