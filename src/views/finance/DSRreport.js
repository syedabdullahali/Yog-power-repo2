import React, { useEffect, useState } from 'react'
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
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CPagination,
    CPaginationItem
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowCircleBottom, cilArrowCircleTop, cilPlus } from '@coreui/icons'
import { useSelector } from 'react-redux'
let user = JSON.parse(localStorage.getItem('user-info'))
import moment  from 'moment/moment'
console.log(user);
const token = user.token;
const username = user.user.username;
import axios from 'axios'
const DSRreport = () => {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var monthNaame= ["January","February","March","April","May","June","July",
    "August","September","October","November","December"];
    const url1 = useSelector((el)=>el.domainOfApi) 
    const [dsrReportData,setDsrReportData] = useState([])
    const [pagination, setPagination] = useState(10)

const [years,setYears]= useState([])
const [selectedYear,setSelectedYear] = useState('')
const [month,setMonth] = useState('')


   const allDsrReport = [] 
   let num =0

   
    const dsrReportObj = {
        date:'',
        existingLeads:0,
        newLeads:0,
        referral:0,
        leadConverted:0,
        trialScheduled: 0,
        trialNoOfconversion:0,
        trialNoOfApointment:0,
        noOfConversion:0,
        totalInvoiceAmount:0,

        existingClients:0,
        noOfrenewals:0,
        noOfRenewed:0,
        renewInvoiceAmount:0,
        shop:0,
        shopamount:0,
        noOfClient:0,
        noOfAttended:0,
        noofEmployee:0,
        noOfAttended2:0,
        totalInvoiceAmount2:0,
        totalPaidAmount:0,
        dueReciptsCollection:0,
        todayCollection:0,
        totalBalance:0,
        dailyExpense:0,
    }

    const header ={ headers: {
        'Authorization': `Bearer ${token}`
    }}


    

   const createDailyDsrReport = (startDate,breakDate)=>{
    
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

const dSrReportAllDate =  createDailyDsrReport(new Date(2023,1,15),new Date())


dSrReportAllDate.forEach((el)=>{
dsrReportObj.date = el
allDsrReport.push({...dsrReportObj})
})

dsrReportObj.date =new Date()
allDsrReport.push({...dsrReportObj})



const compareData  = (startDate,breakDate)=>{
    let startDate2 = new Date(startDate)
    let breakDate2 = new Date(breakDate)

  return   startDate2.getMonth() === breakDate2.getMonth() &&
        startDate2.getYear() === breakDate2.getYear() &&
        startDate2.getDate() === breakDate2.getDate()
}


    const getDsrReportData =async ()=>{
        const response1 =   axios.get(`${url1}/enquiryForm/all`,header)
        const response2 =   axios.get(`${url1}/invoice/all`,header)
        const response3 =   axios.get(`${url1}/memberForm/all`,header)
        const response4 =   axios.get(`${url1}/employeeform`,header)
        const response5 =   axios.get(`${url1}/dailyexpense`,header)

          
        const AllApiData = await  Promise.all([response1,response2,response3,response4,response5])

        const enquiryData  =   AllApiData[0].data  
        const invoiceData =    AllApiData[1].data  
        const clientData =     AllApiData[2].data 
        const employeeData =   AllApiData[3].data 
        const expenseData =    AllApiData[4].data
        

        const findRenewalsFunction = (obj)=>{
            const time =  (new Date(obj.endDate) -new Date())
            const days = Math.ceil(time/(1000*60*60*24))
            if((days<=15 && days>=1)){return "Renewals" }
            else if(days>=15){return"Renewed" }
            return false }                          
                           

   
// Dsr report of enquire           
         let noOfExistingLeadsLeads = 0
         let leadNoOfConversion = 0

// All client Dsr report
let existingClient = 0;
let totalrenewals = 0;
let holdRenewedInfo = [{createdAt:'',noOfRenewed:0,totalColAmount:0}]         
// All employee dsr report 
       let existingEmployee = 0

//////////////////////////////////////--- global variables -----/////////////////////////////////////
          allDsrReport.forEach((el)=>{
 // Dsr Report of enquire           
              let newLeadsCount = 0     
              let noOfReferd = 0
              let leadConverted = 0
              let scheduledTrail = 0;
              let trailConversion = 0; 
              let trailNoOfAppointment = 0;

               enquiryData.forEach((el2)=>{
                      if(compareData(el.date , el2.createdAt)){
                          ++noOfExistingLeadsLeads
                        el.newLeads = ++newLeadsCount
                        if(el2.enquirytype==="Referred"){
                            el.referral =++noOfReferd
                        }
                        if(el2?.enquirestatus==="notshow"){
                            el.leadConverted = ++leadConverted 
                            ++leadNoOfConversion
                        }
                        if(el2?.appointmentfor==="Trial Session"){
                          el.trialScheduled =++scheduledTrail
                        }
                        if(el2?.appointmentfor==="Trial Session" && el2?.enquirestatus==="notshow"){
                            el.trialNoOfconversion =++trailConversion
                          }
                        if(el2?.appointmentfor==="Appointment"){
                            el.trialNoOfApointment =++trailNoOfAppointment
                        }  
                      }
               })
               el.existingLeads =noOfExistingLeadsLeads
               el.noOfConversion = leadNoOfConversion

// Dsr Report of All Client 
             let noOfRenewed = 0;
             let totalColAmount = 0
             let invoiceAmount = 0


             clientData.forEach((el2)=>{
    if(compareData(el.date , el2.createdAt)){
           ++existingClient
         const invoice = invoiceData.find((el4)=>el2._id===el4.MemberId)
         const isRenewals  =invoiceData.filter((el4)=>el2._id===el4.MemberId) 

        if(invoice){
             invoiceAmount +=invoice.amount 
        }
        isRenewals.forEach(element => {
            
            if(findRenewalsFunction(element) === "Renewals" ){totalrenewals++}
            if(findRenewalsFunction(element) === "Renewed" && el2.renewed ){
              totalColAmount+=element.amount
              holdRenewedInfo.push({createdAt:element.createdAt,noOfRenewed:++noOfRenewed,totalColAmount})           
            }        
        });

       holdRenewedInfo.forEach((el3)=>{
           if(compareData(el.date , el3.createdAt)){
            el.noOfRenewed = el3.noOfRenewed
            el.renewInvoiceAmount =  el3.totalColAmount
           }
       })


      }
             })
             el.existingClients = existingClient
             el.noOfrenewals = totalrenewals 
             el.totalInvoiceAmount =invoiceAmount
             el.noOfClient = existingClient
// Dsr Report to all Employee
    
            employeeData.forEach(el2 => {
                 if(compareData(el.date , el2.createdAt)){
                 ++existingEmployee
                 }
            });     
            el.noofEmployee = existingEmployee

// Dsr Report to all Invoice 
            let todayCollection = 0     
            let totalInvoiceAmount2 = 0  
            let totalPaidAmount = 0
            let dueReciptsCollection = 0
            let totalBalance = 0         

             invoiceData.forEach((el2)=>{
                if(compareData(el.date , el2.createdAt)){
                    totalInvoiceAmount2+=el2.amount 
                    totalPaidAmount+=el2.paidAmount
                    todayCollection +=el2.paidAmount
                    totalBalance+=el2.pendingAmount
                    if(el2.Receipts.length){
                        el2?.Receipts.forEach((el3)=>{
                         dueReciptsCollection += (+el3.PaidAmount)
                         todayCollection += (+el3.PaidAmount)
                        })
                    }  
            }

             }) 
                   el.totalInvoiceAmount2 =totalInvoiceAmount2
                   el.totalPaidAmount =totalPaidAmount
                   el.dueReciptsCollection = dueReciptsCollection
                   el.todayCollection = todayCollection
                   el.totalBalance = totalBalance

// Dsr Report dailyExpense    
                     
           let dailyExpense = 0;

            expenseData.forEach(el2 => {
                if(compareData(el.date , el2.Date)){
                    dailyExpense+= (+el2.Amount)
                }
            }); 
           
            el.dailyExpense = dailyExpense

          })
        setDsrReportData(allDsrReport.reverse())
        console.log(allDsrReport.map((el)=>new Date(el.date).getFullYear()))

        setYears([...new Set(allDsrReport.map((el)=>new Date(el.date).getFullYear()))])}
// //////////////////////////////////////////////////////////////////// Total Of All

  let TotalExisting = 0
  let newLeads = 0
  let referral = 0
  let trialScheduled = 0
  let trialNoOfAppointment = 0
  let trailNoOfConversion = 0
  let leadconversion= 0

  let totalConversion = 0
  let totalInvoiceAmount = 0
  let exisTingClient = 0

  let noOfRenneWals  = 0
  let noOfRenewed = 0
  let invoiceAmount = 0
  let noOfClient = 0
  let noOfEmployee = 0

  let dailyInvoiceAmount  =0
  let paidAmount = 0
  let duoCollection = 0
  let todayCollection =0
  let totalBalance = 0
  let dailyExpense = 0



    useEffect(()=>{
     getDsrReportData()
    },[])

useEffect(()=>{
        setPagination(10)
},[])

console.log(dsrReportData)

function clearFilter(){
    setSelectedYear('')
    setMonth('')
}



    return (
        <CRow>
            <CCol lg={12} sm={12}>
                <CCard className='mb-3 border-top-success border-top-3'>


                    <CCardHeader>
                        <strong className="mt-2">DSR Report</strong>
                    </CCardHeader>

                    <CCardBody>
                        

                    <CRow className=' mb-2' >                             
                             <CCol lg={4} className='mb-2'>
                             <CFormSelect value={selectedYear} onChange={(e)=>setSelectedYear(e.target.value)}>
                                 <option>Select Year</option>
                                 {years.map((el,i)=>{
                                     return <option key={i}>{el}</option>
                                 })}  
                             </CFormSelect>
                             </CCol>

                             <CCol lg={4} className='mb-2'>
                              <CFormSelect value={month} onChange={(e)=>setMonth(e.target.value)}>
                                 <option>Select  Month </option>
                                  {monthNaame.map((el,i)=>{
                                     return <option key={i} value={i}> {el}</option>
                                 })}                                                                                 
                            </CFormSelect>
                             </CCol >                                                      
                    </CRow>
                    
                         <CRow>
                             <CCol className='px-3 mb-3'>
                             <CButton onClick={(e)=>clearFilter(e.target.value)}>Clear Filter</CButton>
                             </CCol>
                         </CRow>
                        




                       
                    
                    <div style={{overflowY:'scroll'}}>
                    <CTable style={{width:'400%'}}>
                    <CTableHead>
                            <CTableHeaderCell colSpan={12} className='lead'>Lead Management</CTableHeaderCell>
                            <CTableHeaderCell colSpan={6} style={{background:'Orange'}}>Client Management</CTableHeaderCell>
                            <CTableHeaderCell colSpan={4} style={{background:'Sienna'}}>Attendance Management</CTableHeaderCell>
                            <CTableHeaderCell colSpan={5} style={{background:'ForestGreen'}}> Revenues</CTableHeaderCell>
                            <CTableHeaderCell colSpan={12} style={{background:'Maroon'}}> Expense</CTableHeaderCell>



                    </CTableHead>
                        <CTableHead >
                            <CTableHeaderCell >Sr no</CTableHeaderCell>
                            <CTableHeaderCell >Date</CTableHeaderCell>
                            <CTableHeaderCell >Day</CTableHeaderCell>
                            <CTableHeaderCell >Existing Leads</CTableHeaderCell>
                            <CTableHeaderCell > New Leads</CTableHeaderCell>
                            <CTableHeaderCell >Referral</CTableHeaderCell>
                            <CTableHeaderCell >Trial Scheduled</CTableHeaderCell>
                            <CTableHeaderCell >Enquire Apointment</CTableHeaderCell>
                            <CTableHeaderCell >Trial No Of conversion</CTableHeaderCell>
                            <CTableHeaderCell >Today Lead conversion</CTableHeaderCell>
                            <CTableHeaderCell >Total Conversion</CTableHeaderCell>
                            <CTableHeaderCell >Invoice Amount</CTableHeaderCell>


                            <CTableHeaderCell >Existing Clients</CTableHeaderCell>
                            <CTableHeaderCell >No of renewals</CTableHeaderCell>
                            <CTableHeaderCell >No of Renewed</CTableHeaderCell>
                            <CTableHeaderCell >Invoice Amount</CTableHeaderCell>
                            <CTableHeaderCell >Shop</CTableHeaderCell>
                            <CTableHeaderCell >Shop amount</CTableHeaderCell>
                            

                            <CTableHeaderCell >No of Client</CTableHeaderCell>
                            <CTableHeaderCell >No of Attended</CTableHeaderCell>
                            <CTableHeaderCell >No of Employee</CTableHeaderCell>
                            <CTableHeaderCell >No of Attended</CTableHeaderCell>

                            <CTableHeaderCell >Daily Invoice Amount</CTableHeaderCell>
                            <CTableHeaderCell > Paid amount</CTableHeaderCell>
                            <CTableHeaderCell >Due Collection</CTableHeaderCell>
                            <CTableHeaderCell >Today Collection</CTableHeaderCell>
                            <CTableHeaderCell >Total Balance</CTableHeaderCell>
                            <CTableHeaderCell >daily Expense</CTableHeaderCell>


                        </CTableHead>
                        <CTableBody >
                        {dsrReportData.filter((el)=>{   
                               
                                    return (new Date(el.date).getMonth()+"").includes(month) &&  
                                    (new Date(el.date).getFullYear()+"").includes(selectedYear)
                                
                                   
                                }).filter((el, i) => { 
                            if(i===0){
                                TotalExisting =el.existingLeads  
                                totalConversion =el.noOfConversion
                                exisTingClient = el.existingClients
                                noOfRenneWals = el.noOfrenewals
                                noOfClient = el.noOfClient
                                noOfEmployee = el.noofEmployee

                            }

                            newLeads+=el.newLeads
                            referral+=el.referral
                            trialScheduled+=el.trialScheduled
                            trialNoOfAppointment+=el.trialNoOfApointment
                            trailNoOfConversion+=el.trialNoOfconversion
                            leadconversion+=el.leadConverted
                            totalInvoiceAmount+=el.totalInvoiceAmount
                            noOfRenewed +=el.noOfRenewed      
                            invoiceAmount += el.renewInvoiceAmount
                            dailyInvoiceAmount+=el.totalInvoiceAmount2
                            paidAmount+=el.totalPaidAmount
                            duoCollection +=el.dueReciptsCollection 
                            todayCollection+=el.todayCollection
                            totalBalance+=el.totalBalance
                            dailyExpense+=el.dailyExpense
                 

                    num++
                    if (pagination - 10 < i + 1 && pagination >= i + 1) {return el}}).map((el,i)=>{
                      return <CTableRow className='text-center'>
                            <CTableDataCell >{ i + 1 +(pagination -10)}</CTableDataCell>
                            <CTableDataCell >{moment(el.date).format('DD-MM-YYYY')}</CTableDataCell>
                            <CTableDataCell >{days[new Date(el.date).getDay()]}</CTableDataCell>
                            <CTableDataCell >{el.existingLeads}</CTableDataCell>
                            <CTableDataCell >{el.newLeads}</CTableDataCell>
                            <CTableDataCell >{el.referral}</CTableDataCell>
                            <CTableDataCell >{el.trialScheduled}</CTableDataCell>
                            <CTableDataCell >{el.trialNoOfApointment}</CTableDataCell>
                            <CTableDataCell >{el.trialNoOfconversion}</CTableDataCell>
                            <CTableDataCell >{el.leadConverted}</CTableDataCell>
                            <CTableDataCell >{el.noOfConversion}</CTableDataCell>
                            <CTableDataCell >Rs{el.totalInvoiceAmount}</CTableDataCell>
                            <CTableDataCell >{el.existingClients}</CTableDataCell>
                            <CTableDataCell >{el.noOfrenewals}</CTableDataCell>
                            <CTableDataCell >{el.noOfRenewed}</CTableDataCell>
                            <CTableDataCell >Rs {el.renewInvoiceAmount}</CTableDataCell>
                            <CTableDataCell >{el.shop}</CTableDataCell>
                            <CTableDataCell >{el.shopamount}</CTableDataCell>
                            <CTableDataCell >{el.noOfClient}</CTableDataCell>
                            <CTableDataCell>{el.noOfAttended}</CTableDataCell>
                            <CTableDataCell>{el.noofEmployee}</CTableDataCell>
                            <CTableDataCell>{el.noOfAttended2}</CTableDataCell>
                            <CTableDataCell>Rs {el.totalInvoiceAmount2}</CTableDataCell>
                            <CTableDataCell>Rs {el.totalPaidAmount}</CTableDataCell>
                            <CTableDataCell> Rs {el.dueReciptsCollection }</CTableDataCell>
                            <CTableDataCell>Rs {el.todayCollection}</CTableDataCell>
                            <CTableDataCell> Rs {el.totalBalance} </CTableDataCell>
                            <CTableDataCell> Rs {el.dailyExpense} </CTableDataCell>                                             
                        </CTableRow>
                        })}
                        <CTableRow  style={{background:'#D4FBD8'}} className='text-primary text-center'>
                            <CTableDataCell style={{ backgroundColor: "#0B5345"}}  className='text-white' colSpan={3}>
                                Total of DSR Report
                            </CTableDataCell>
                            <CTableDataCell   >{TotalExisting }</CTableDataCell>
                            <CTableDataCell >{newLeads}</CTableDataCell>
                            <CTableDataCell >{referral}</CTableDataCell>
                            <CTableDataCell >{trialScheduled}</CTableDataCell>
                            <CTableDataCell>{trialNoOfAppointment}</CTableDataCell>
                            <CTableDataCell>{trailNoOfConversion}</CTableDataCell>
                            <CTableDataCell>{leadconversion}</CTableDataCell>
                            <CTableDataCell>{totalConversion}</CTableDataCell>
                            <CTableDataCell> Rs {totalInvoiceAmount}</CTableDataCell>
                            <CTableDataCell>{exisTingClient}</CTableDataCell>
                            <CTableDataCell>{noOfRenneWals}</CTableDataCell>
                            <CTableDataCell>{noOfRenewed}</CTableDataCell>
                            <CTableDataCell>Rs {invoiceAmount}</CTableDataCell>
                            <CTableDataCell>0</CTableDataCell>
                            <CTableDataCell>0</CTableDataCell>
                            <CTableDataCell>{noOfClient}</CTableDataCell>
                            <CTableDataCell>0</CTableDataCell>
                            <CTableDataCell>{noOfEmployee}</CTableDataCell>
                            <CTableDataCell>0</CTableDataCell>
                            <CTableDataCell>Rs {dailyInvoiceAmount}</CTableDataCell>
                            <CTableDataCell>Rs {paidAmount}</CTableDataCell>
                            <CTableDataCell>Rs {duoCollection}</CTableDataCell>
                            <CTableDataCell>Rs {todayCollection}</CTableDataCell>
                            <CTableDataCell>Rs {totalBalance}</CTableDataCell>
                            <CTableDataCell>Rs {dailyExpense}</CTableDataCell>
                        </CTableRow>
                    </CTableBody>
                    </CTable>
                   
                       
                    </div>

                    
   <div className='d-flex justify-content-center mt-3' >
                        <CPagination aria-label="Page navigation example" style={{cursor:'pointer'}}>
                            <CPaginationItem aria-label="Previous" onClick={() => setPagination((val) => val > 10 ? val - 10 : 10)}>
                                <span aria-hidden="true" >&laquo;</span>
                            </CPaginationItem>
                            <CPaginationItem active >{pagination / 10}</CPaginationItem>
                            {num > pagination / 10 * 10 && <CPaginationItem onClick={() => setPagination((val) => val < num ? val + 10 : val)}>{pagination / 10 + 1}</CPaginationItem>}
                            {num > pagination / 10 * 20 && <CPaginationItem onClick={() => setPagination((val) => val < num ? val + 10 : val)}>{pagination / 10 + 2}</CPaginationItem>}
                            <CPaginationItem aria-label="Next" onClick={() => setPagination((val) => val < num ? val + 10 : val)}>
                                <span aria-hidden="true">&raquo;</span>
                            </CPaginationItem>
                        </CPagination>
      </div>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default DSRreport