import React, { useEffect,useState } from 'react'
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowCircleBottom, cilArrowCircleTop, cilPlus } from '@coreui/icons'
import axios from 'axios'
import { useSelector } from 'react-redux'
const url = 'https://yog-seven.vercel.app'


let user = JSON.parse(localStorage.getItem('user-info'))
const token = user.token;
const username = user.user.username;
const centerCode = user.user.centerCode;

const headers = {
    'Authorization': `Bearer ${token}`,
    'My-Custom-Header': 'foobar'
   };

   var monthName= ["January","February","March","April","May","June","July",
"August","September","October","November","December"];


const LeadReport= props => {


    const [leadReportData,setLeadReportData] = useState([])
    const url1 = useSelector((el)=>el.domainOfApi) 
    const [years,setYears]= useState([])
    const [selectedYear,setSelectedYear] = useState('')
    const [month,setMonth] = useState('')
    const [serviceName,setServiceName] = useState('')
    const [serviceData,setserviceData] = useState([])


    const getAllData = async  ()=>{
        try{
        const response1 = axios.get(`${url1}/invoice/all`,{headers})
        const response2 = axios.get(`${url1}/memberForm/all`,{headers})
        const response3 = axios.get(`${url1}/enquiryForm/all`,{headers})
              
        const allApiData = await Promise.all([response1,response2,response3])
        
        const invoiceData = allApiData[0].data
        const clientData = allApiData[1].data
        const enquiryData = allApiData[2].data 

        
        const serviceAcordingToMonth   = ([...enquiryData.filter((list) => list.username === username)?.reverse()?.map((el)=>{
                        return {
                           Enquiry:el?.enquirytype,
                           Month:new Date(el.createdAt).getMonth(),
                           Year:new Date(el.createdAt).getFullYear()
                        }}       
        )].sort((a,b)=>b.Month-a.Month))         
        
        
        const classiFyAcordingToMonth = [...serviceAcordingToMonth].reduce((crr,el,i)=>{
            if(!crr.length){crr.push(el)}
           else if(crr?.length) {
           const val =  crr.some((el2)=>   el2.Enquiry  === el.Enquiry && el2.Month  === el.Month)
           if(!val){crr.push(el)}} return crr
        },[])
        
         const serviceRevenueData =  classiFyAcordingToMonth.map((el)=>{
            let num =0;
            const obj = {
               month:el.Month,
               typeOfEnquiry:el.Enquiry||"Other",
               noOfClient:0,
               noOfLeads:0,
               amount:0 ,
               date:el.date,
               year:el.Year,
               investmentAmount:0,
               paidAmount:0,
            }


         return   enquiryData.reduce((crr,el2)=>{
            if(el2.enquirytype === el.Enquiry && new Date(el2.createdAt).getMonth()  === el.Month){
                num++
               crr.noOfLeads  = num 
               return crr
            }             
            return crr
           },{...obj})
        }) 

        console.log(serviceRevenueData)
            serviceRevenueData.forEach(element => {
                    let num =0
                clientData.forEach((el)=>{
                if(element.typeOfEnquiry===el.EnquiryType
                    && new Date(el.createdAt).getMonth()  === element.month){
                num++
                element.noOfClient = num
                invoiceData.forEach((el2)=>{
                    console.log(el2)
                    if( el._id===el2.MemberId){
                        element.amount+=el2.amount 
                        element.paidAmount+=el2.paidAmount    
                         if(el2.Receipts.length){
                            el2?.Receipts.forEach((el3)=>{
                                element.paidAmount += (+el3.PaidAmount)
                            })
                         }
                    }
                })

                }
                })
            })
          setLeadReportData(serviceRevenueData)   
          setserviceData([...new Set(serviceRevenueData.map((el)=>el.typeOfEnquiry))])
          setYears([...new Set(serviceRevenueData.map((el)=>el.year))])

        }catch(error){
         console.error(error)
        }
        
        }

    useEffect(()=>{
      getAllData()

    },[])
    console.log(leadReportData)


    function clearFilter(){
        setServiceName('')
        setSelectedYear('')
        setMonth('')
    }
    


  return (
    <CRow>
        <CCol lg={12} sm={12}>
                <CCard className='mb-3 border-top-success border-top-3'>
                    <CCardHeader>
                        <strong className="mt-2">Lead Report</strong>
                    </CCardHeader>
                    <CCardBody>
                    <CRow className=' mb-2' >
                             
                            <CCol lg={4} className='mb-2'>
                            <CFormSelect value={selectedYear} onChange={(e)=>setSelectedYear(e.target.value)}>
                                <option>slecte Year</option>
                                {years.map((el)=>{
                                    return <option>{el}</option>
                                })}  
                            </CFormSelect>
                            </CCol>
                            <CCol lg={4} className='mb-2'>
                             <CFormSelect value={month} onChange={(e)=>setMonth(e.target.value)}>
                                <option>Select Your Month </option>
                                 {monthName.map((el)=>{
                                    return <option>{el}</option>
                                })}                                                                                 
                           </CFormSelect>
                            </CCol >
                            <CCol lg={4}  className='mb-2'>
                            <CFormSelect  id="inputGroupSelect01"
                            value={serviceName}
                                     onChange={(e)=>setServiceName(e.target.value)}
                                    >
                                    <option>Select Source</option>
                                        {serviceData.map((item, index) => (
                                                    <option key={index}>{item}</option>                                                  
                                                )                                            
                                            )}
                                    </CFormSelect>
                        </CCol>
                        
                        </CRow>
                        <CRow>
                            <CCol className='px-3 mb-3'>
                            <CButton onClick={(e)=>clearFilter(e.target.value)}>Clear Filter</CButton>
                            </CCol>
                        </CRow>
                       
                        <CTable bordered style={{ borderColor: "#106103" }} responsive>
                            <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }}>
                            <CTableRow>

                                    <CTableHeaderCell scope="col">Sr No</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Year</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Month</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Sources</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">No of Leads</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Conversion</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Invoice Amount</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Paid Amount</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">
                                        Investment Amount
                                    </CTableHeaderCell>                                    
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                               {leadReportData.filter((el)=>{
                                       
                                       return monthName[el.month].includes(month) &&  
                                       (el.year+"").includes(selectedYear)&&
                                       el.typeOfEnquiry.includes(serviceName)   
                           
                                       }).map((el,i)=>{
                               return <CTableRow key={i}>
                                <CTableDataCell>{i+1}</CTableDataCell>
                                    <CTableDataCell>{el.year}</CTableDataCell>
                                    <CTableDataCell>{monthName[el.month]}</CTableDataCell>
                                    <CTableDataCell>{el.typeOfEnquiry}</CTableDataCell>
                                    <CTableDataCell>{el.noOfLeads}</CTableDataCell>
                                    <CTableDataCell>{el.noOfClient}</CTableDataCell>     
                                    <CTableDataCell>Rs {el.amount}</CTableDataCell>   
                                    <CTableDataCell>Rs {el.paidAmount}</CTableDataCell>   
                                    <CTableDataCell>Rs {el.investmentAmount}</CTableDataCell>                                                                                                         
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



export default LeadReport



