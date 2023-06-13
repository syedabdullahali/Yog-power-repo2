import { cilArrowCircleBottom, cilArrowCircleTop } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
    CButton,
    CButtonGroup,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CFormInput,
    CFormSelect,
    CInputGroup,
    CInputGroupText,
    CNav,
    CNavItem,
    CNavLink,
    CRow,
    CTabContent,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CTabPane,
} from '@coreui/react'
import React, { useState,useCallback,useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const monthNames =     ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
import moment from 'moment/moment'


function getDaysInMonth(month, year) {
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
      days.push({attendanceDate:new Date(date),value:false});
      date.setDate(date.getDate() + 1);
    }
    return days;
}   

import useAttendance from './AttendanceHook/useAttendance'
import useMonthlyReport from './AttendanceHook/useMonthlyReport'
import useDailyBatchAtten from './AttendanceHook/useDailyBatchAtten'
import { trainerSuperRight } from '../hr/Rights/rightsValue/crmRightsValue'

const AllBatches = () => {
     const updateAttendance = useAttendance()
     const updateMonthlyReport = useMonthlyReport()
     const updateDailyReport = useDailyBatchAtten()




     const url = useSelector((el)=>el.domainOfApi) 
     const [selectedMonth,setMonth] = useState(new Date().getMonth())
     const [selectedYear,setYear] = useState(new Date().getFullYear())
     const [dateOfAMonth,setDateOfMonth] = useState([])
     const [clientAttendance2,setClientAttendence2] = useState([])
     const [clientAttendenceReg,setClientAttendenceReg] = useState([])
     const [memBerData2,setMemberData] = useState([])
     const [monthlyReport,setMonthlyReport] = useState([])
     const [dailyReport,setDailyReport] = useState([])
     const [totalAttendanceofDay,setTotalAttendanceOfDay] = useState([])

     const rightsData = useSelector((el)=>el.empLoyeeRights?.crmRights?.
     crmTrainer?.items?.superRight) 
     const isAdmin = useSelector((el)=>el?.isAdmin) 

     const dailyAttendedvalidate =  rightsData?.dailybatchAttendance?.includes(trainerSuperRight.allBatches)
     const monthlyReportvalidate =  rightsData?.monthlyReport?.includes(trainerSuperRight.allBatches)
     const clientAttendanceRegvalidate =  rightsData?.clientAttendanceReg?.includes(trainerSuperRight.allBatches)


     const number =  ( (isAdmin&&1)||(dailyAttendedvalidate&&1)||
     (monthlyReportvalidate&&2)||
     (clientAttendanceRegvalidate&&3))

     const [activeKey, setActiveKey] = useState(number)

     
     let user = JSON.parse(localStorage.getItem('user-info'))
     const token = user.token;

    const  getAllBatches = useCallback(async function() {
        try{
        const response1 =  axios.get(`${url}/clientAttendance/all`,{ headers: {'Authorization': `Bearer ${token}`}})       
        const response2 =  axios.get(`${url}/memberForm/all`,{ headers: {'Authorization': `Bearer ${token}`}})
    
        const  data   = await  Promise.all([response1,response2])

        const  clientAttendanceData  = data[0].data
        const  memBerData =  data[1].data

        setClientAttendence2(clientAttendanceData.filter((el)=>el.category==='Studio Batches'))  
        setMemberData(memBerData)
            
        const dateWithAttendance =      getDaysInMonth(new Date().getMonth(),new Date().getFullYear())
        
        const attendedData =  updateAttendance(clientAttendanceData.filter((el)=>el.category==='Studio Batches'),dateWithAttendance,memBerData)
        setClientAttendenceReg(attendedData)
        setMonthlyReport(updateMonthlyReport(clientAttendanceData.filter((el)=>el.category==='Studio Batches'),memBerData))
        setDailyReport(updateDailyReport(clientAttendanceData.filter((el)=>el.category==='Studio Batches')))     


        }catch(error) {
                console.error(error)
        }
    },[])

    useEffect(() => {
        getAllBatches()
    },[ getAllBatches]) 


    function compareDateFun(date1,date2){
        return   new Date(date1).getFullYear() === new Date(date2).getFullYear() &&
                        new Date(date1).getMonth() === new Date(date2).getMonth()&&
                        new Date(date1).getDate() === new Date(date2).getDate()
       }
       


    useEffect(()=>{
        const newDate =  getDaysInMonth(+selectedMonth,+selectedYear)
            setDateOfMonth(newDate)
            if(!clientAttendenceReg[0] && !memBerData2[0])return
            const  attendedData = updateAttendance(clientAttendance2.filter((el)=>el.category==='Studio Batches'),newDate,memBerData2)
            HandleTotalAtten(attendedData,newDate)
            const monhtlyReportData=  updateMonthlyReport(clientAttendance2.filter((el)=>el.category==='Studio Batches'),memBerData2)
            setMonthlyReport(monhtlyReportData)
            setClientAttendenceReg(attendedData)
          },[selectedMonth,selectedYear])




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
        
        let allTotalOfAttendance = 0

    

    return (
        <CRow>
            <CCol xs={12}>
                <CCard>
                    <CCardHeader >
                        <CNav variant="pills" role="tablist">
                            {(isAdmin|| dailyAttendedvalidate)&& <CNavItem>
                                <CNavLink
                                    href="javascript:void(0);"
                                    active={activeKey === 1}
                                    onClick={() => setActiveKey(1)}
                                >
                                   Daily Attendance
                                </CNavLink>
                            </CNavItem>}
                            {(isAdmin|| monthlyReportvalidate)&&<CNavItem>
                                <CNavLink
                                    href="javascript:void(0);"
                                    active={activeKey === 2}
                                    onClick={() => setActiveKey(2)}
                                >

                                    Monthly Report
                                </CNavLink>
                            </CNavItem>}
                            {(isAdmin||clientAttendanceRegvalidate)&&<CNavItem>
                                <CNavLink
                                    href="javascript:void(0);"
                                    active={activeKey === 3}
                                    onClick={() => setActiveKey(3)}
                                >
                                    Client Attendance Reg
                                </CNavLink>
                            </CNavItem>}
                           
                            
                        </CNav>
                    </CCardHeader>
                    <CCardBody>
                        <CTabContent>
                        <CRow className='mb-3'>
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
                                                { monthNames.map((el,i)=>
                                                <option value={i}>{el}</option>                                              
                                                )}
                                            </CFormSelect>
                                        </CInputGroup>
                                    </CCol>
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
                                            
                                            </CFormSelect>
                                        </CInputGroup>
                                    </CCol>
                                                                         
                                </CRow>
                            
                            <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>

                           

                                <CTable bordered borderColor="black" responsive>
                                    <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                                    <CTableRow>
                                            <CTableHeaderCell scope="col">Sr.No</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Batch Timeing</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Trainer Name</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Services</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">No of Clients</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Atteneded</CTableHeaderCell>                                   
                                    </CTableRow>
                                    </CTableHead>
                                    <CTableBody>
                                    {dailyReport.map((el,i)=>
                                        <CTableRow className='text-center'>
                                        <CTableDataCell>{i+1}</CTableDataCell>
                                            <CTableDataCell>{moment(el.date).format('YYYY-MM-DD')}</CTableDataCell>
                                            <CTableDataCell>{el.batchTiming}</CTableDataCell>
                                            <CTableDataCell>{el.trainerName}</CTableDataCell>
                                            <CTableDataCell>{el.services}</CTableDataCell>
                                            <CTableDataCell>{el.noOfClients}</CTableDataCell>
                                            <CTableDataCell>{el.Atteneded}</CTableDataCell>      
                                        </CTableRow>)}
                                        <CTableRow className='text-center' >
                                          <CTableDataCell 
                                           style={{ backgroundColor: "#0B5345", color: "white" }} 
                                          colSpan={5}>Total</CTableDataCell>
                                           <CTableDataCell color='success'>{dailyReport.reduce((crr,el)=>crr +el.noOfClients ,0)}</CTableDataCell>
                                            <CTableDataCell  color='success'>{dailyReport.reduce((crr,el)=>crr +el.Atteneded ,0)}</CTableDataCell>   
                                        </CTableRow>
                             
                                    </CTableBody>
                                </CTable>
                            </CTabPane>
                            <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 2}>
                               
                                <CTable bordered borderColor="balck" responsive>
                                    <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                                       <CTableRow>
                                            <CTableHeaderCell scope="col">Sr.No</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">
                                               Batch Timing
                                            </CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Services</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Trainer Name</CTableHeaderCell>
                                          
                                            <CTableHeaderCell scope="col">Existing  Clients</CTableHeaderCell>
                                           
                                            <CTableHeaderCell scope="col">New Clients</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Left Client</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Total Client</CTableHeaderCell>
                                        </CTableRow>
                                    </CTableHead>
                                    <CTableBody>
                                    {monthlyReport.map((el,i)=>
                                         <CTableRow className='text-center'>
                                             <CTableDataCell>{i+1}</CTableDataCell>
                                             <CTableDataCell>{el.batchTiming}</CTableDataCell>
                                             <CTableDataCell>{el.serviceName}</CTableDataCell>
                                             <CTableDataCell>{el.trainerName}</CTableDataCell>
 
                                             <CTableDataCell>{el.ExistingClient}</CTableDataCell>
                                             <CTableDataCell>{el.newClient}</CTableDataCell>
                                             <CTableDataCell>{el.leftClient}</CTableDataCell>
                                             <CTableDataCell>{el.TotalClient}</CTableDataCell>                                          
                                         </CTableRow>)}                                           
                                         <CTableRow className='text-center'>
                                             <CTableDataCell style={{ backgroundColor: "#0B5345", color: "white" }}  colSpan={4}>Total</CTableDataCell>
                                             <CTableDataCell color='success'>{monthlyReport.reduce((crr,el)=>crr+el.ExistingClient,0)}</CTableDataCell>
                                             <CTableDataCell color='success'>{monthlyReport.reduce((crr,el)=>crr+el.newClient,0)}</CTableDataCell>
                                             <CTableDataCell color='success'>{monthlyReport.reduce((crr,el)=>crr+el.leftClient,0)}</CTableDataCell>
                                             <CTableDataCell color='success'>{monthlyReport.reduce((crr,el)=>crr+el.TotalClient,0)}</CTableDataCell>
                                        </CTableRow> 
                                    </CTableBody>
                                </CTable>
                            </CTabPane>
                            <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 3}>

                         
                                <CTable bordered borderColor="black" responsive style={{width:'3500px'}}>
                                    <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                                    <CTableRow>
                                            <CTableHeaderCell scope="col">Sr.No</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Client Attendence id</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Client Name</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Mobile</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Services</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Trainer Name</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Batch Timeing </CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Package</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Duration</CTableHeaderCell>
                                            {/* <CTableHeaderCell scope="col">Days</CTableHeaderCell> */}
                                            <CTableHeaderCell scope="col">Start Date</CTableHeaderCell>
                                            <CTableHeaderCell scope="col"> End Date</CTableHeaderCell>

                                            {dateOfAMonth.map((el)=>
                                                    <CTableHeaderCell scope="col">{ days[new Date(el.attendanceDate).getDay()]}<br/>
                                                     {new Date(el.attendanceDate).getDate()}</CTableHeaderCell>  
                                                                                                                                       
                                          )}
                                            <CTableHeaderCell scope="col"> Total <br/> Attended</CTableHeaderCell>
                                        </CTableRow>
                                    </CTableHead>
                                    <CTableBody>
                                    {clientAttendenceReg.map((el,i)=>
                                        <CTableRow  className='text-center'>
                                           <CTableDataCell>{i+1}</CTableDataCell>
                                           <CTableDataCell>{el.attentanceId}</CTableDataCell>
                                           <CTableDataCell> <Link index={-1} style={{ textDecoration: 'none' }} 
                                           to={`/clients/member-details/${el.clientId}/1`}
                                          >{el.clientName}</Link></CTableDataCell>
                                            <CTableDataCell>{el.mobile}</CTableDataCell>
                                            <CTableDataCell>{el.Services}</CTableDataCell>
                                            <CTableDataCell>{el.TrainerName}</CTableDataCell>
                                            <CTableDataCell>{el.admissionBatch}</CTableDataCell>
                                            <CTableDataCell>{el.admissionPackageName}</CTableDataCell>
                                            <CTableDataCell>{el.admissionDuration}</CTableDataCell>
                                            <CTableDataCell>{moment(el.startDate).format('DD-MM-YYYY')}</CTableDataCell>
                                            <CTableDataCell>{moment(el.endDate).format('DD-MM-YYYY')}</CTableDataCell>

                                            {el.dateWithAttendance1.flatMap((el2)=>
                                                    <CTableDataCell  color={el2.value&&'success'}> {el2.value?'P':'A'}</CTableDataCell>                                                                                                                                         
                                          )}         
                                            <CTableDataCell>{el.dateWithAttendance1.reduce((crr,el2)=>{
                                              if(el2.value){
                                                 crr+=1
                                                 allTotalOfAttendance+=1
                                              }
                                               return crr 
                                            },0)}  </CTableDataCell>
                                        </CTableRow>)}
                                        
                                        <CTableRow className='text-center' >
                                            <CTableDataCell colSpan={11} style={{ backgroundColor: "#0B5345", color: "white" }}>Total</CTableDataCell>
                                            {totalAttendanceofDay?.map((el)=><CTableDataCell color='success'>{el.value}</CTableDataCell>)}
                                             <CTableDataCell color='success'>{allTotalOfAttendance}</CTableDataCell>
                                        </CTableRow>
                                       
                                    </CTableBody>
                                </CTable>
                            </CTabPane>
                                                    
                        </CTabContent>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}
export default AllBatches