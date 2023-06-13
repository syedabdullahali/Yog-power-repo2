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
import React,{useEffect, useState} from 'react'
import moment from 'moment/moment'

const LiveClassesDailyReport = ({data}) => {
    const [dailyReport,setDailyReport] = useState([])




    const createDailyMonthlyReport = (startDate,breakDate)=>{
    
        var date = startDate;
           var days = [];
           while (
           !(startDate.getMonth() === breakDate.getMonth() &&
           startDate.getYear() === breakDate.getYear() &&
           startDate.getDate() === breakDate.getDate() )) {
             days.push(new Date(date));
             date.setDate(date.getDate() + 1);          
           }
           return days;   
    }
    
    function compareDateFun(date1,date2){
     return   new Date(date1).getFullYear() === new Date(date2).getFullYear() &&
                     new Date(date1).getMonth() === new Date(date2).getMonth()&&
                     new Date(date1).getDate() === new Date(date2).getDate()
    }
    
    const dailyReportAllDate =  createDailyMonthlyReport(new Date(2023,2,1),new Date())
    
    const dailyAttended = dailyReportAllDate.map((el)=>{
        const monthlyReportObj ={
            trainerName:'',
            services:'',
            batchTiming:'',
    
            noOfClients:'',
            Atteneded:'',
            date:el 
          }
          return monthlyReportObj
    })
    
    useEffect(()=>{
        HandleDailyReport(data)
    },[])
       
    function HandleDailyReport (data=[]){
    const removeDuplicate = []
    data.forEach((el)=>{
    if(!removeDuplicate.some((el2)=>   
     el2.trainerName.includes(el.Condcuted) 
    && el2.services.includes(el.ServiceName)  
    && el2.batchTiming.includes(el.batches)
    && compareDateFun(el2.date,el.checkDate)
    )){
      const monthlyReportObj ={
            trainerName:el.Condcuted,
            services:el.ServiceName,
            batchTiming:el.batches,
            noOfClients:0,
            Atteneded:0,
            date:el.checkDate
          }
    removeDuplicate.push(monthlyReportObj)
    }
    })
    removeDuplicate.forEach((el)=>{
    let noOfClients = 0
    let noOfAttended = 0
    let removeDuplicateClient =[]
    
    data.forEach((el2,i,arr)=>{
    if(   
    el.trainerName.includes(el2.Condcuted) 
    && el.services.includes(el2.ServiceName)  
    && el.batchTiming.includes(el2.batches)
    && compareDateFun(el.date,el2.checkDate)
    ){
    if(!removeDuplicateClient.some((el3)=> el3.clientId===el2.clientId)){    
    removeDuplicateClient.push(el2)
    noOfClients++
    el.noOfClients  = noOfClients
    }
    noOfAttended ++
    el.Atteneded  = noOfAttended 
    }
    })
    })
    
    const alldailyReport =removeDuplicate
    
    dailyAttended.forEach((el)=>{
     if(!alldailyReport.some((el2)=>compareDateFun(el2.date,el.date))){
       alldailyReport.push(el)
     }   
    })
    const reportDaily = alldailyReport.sort((b,a)=>{
     return   (new Date(a.date).getFullYear() - new Date(b.date).getFullYear()+
        new Date(a.date).getMonth() - new Date(b.date).getMonth()+
        new Date(a.date).getDate() - new Date(b.date).getDate())
    })
    setDailyReport(reportDaily)
    }
    


  return (
    <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={true}>                              
    <CTable bordered borderColor="black" responsive>
        <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
            <CTableRow>
                <CTableHeaderCell scope="col">Sr.No</CTableHeaderCell>
                <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                <CTableHeaderCell scope="col">Batch Timing</CTableHeaderCell>
                <CTableHeaderCell scope="col">Trainer Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Services</CTableHeaderCell>
                <CTableHeaderCell scope="col">No of Clients</CTableHeaderCell>
                <CTableHeaderCell scope="col">Atteneded</CTableHeaderCell>                                           
            </CTableRow>
        </CTableHead>
        <CTableBody>
           {dailyReport.map((el,i)=>
            <CTableRow>
            <CTableDataCell>{i+1}</CTableDataCell>
                <CTableDataCell>{moment(el.date).format('YYYY-MM-DD')}</CTableDataCell>
                <CTableDataCell>{el.batchTiming}</CTableDataCell>
                <CTableDataCell>{el.trainerName}</CTableDataCell>
                <CTableDataCell>{el.services}</CTableDataCell>
                <CTableDataCell>{el.noOfClients}</CTableDataCell>
                <CTableDataCell>{el.Atteneded}</CTableDataCell>      
            </CTableRow>)}

        </CTableBody>
    </CTable>
</CTabPane>
  )
}

export default LiveClassesDailyReport
