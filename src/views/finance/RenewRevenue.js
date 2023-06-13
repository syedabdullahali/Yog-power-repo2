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
    CPaginationItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowCircleBottom, cilArrowCircleTop, cilPlus } from '@coreui/icons'
import {useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import YogaSpinnar from '../theme/YogaSpinnar'

var monthName= ["January","February","March","April","May","June","July",
"August","September","October","November","December"];

import axios from "axios";

const RenewRevenue = () => {

    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;
    const username = user.user.username;
    const centerCode = user.user.centerCode;
  let InVoiceData =[]

    const [upgradeInvoiceData,setUpgradeInvoiceData] = useState([])
    const [getRenewRevenueData,setRenewRevenueData] = useState([])
    const url1 = useSelector((el)=>el.domainOfApi) 

const [years,setYears]= useState([])
const [selectedYear,setSelectedYear] = useState('')
const [month,setMonth] = useState('')
const [serviceData,setserviceData] = useState([])
const [serviceName,setServiceName] = useState('')
const [pagination, setPagination] = useState(10)


let num =0


    
   const headers = {
    'Authorization': `Bearer ${token}`,
    'My-Custom-Header': 'foobar'
   };





   const IndentifyCancelFun = (list)=>{
    
        const time =  (new Date(list.endDate) -new Date())
        const days = Math.ceil(time/(1000*60*60*24))
              if((days<=0 && list.username === username &&list.plan===true)){
                 return true 
              }
              return false                                                                         
 
   }


   const identifyRenevItme = (list)=>{
    const time =  (new Date(list.endDate) -new Date())
    const days = Math.ceil(time/(1000*60*60*24))

          if((days<=15 && days>=1)){
       
             return true 
          }
          return false                                                                         
     
    
   }

   const getInvoiceDataEmp = (el)=>{         
   
        return InVoiceData?.find((el1)=>el._id===el1.MemberId)
   }



   function getUpgradeInvoiceData (){
    
       axios.get(`${url1}/memberForm/all`,{headers}).then(({data})=>{

        const serviceAcordingToMonth   = ([...data?.reverse()?.map((el)=>{
            return {
               Service:el?.serviceName,
               TotalRenaval:'',
               Month:new Date(el.createdAt).getMonth(),
               date:new Date(el.createdAt),
               Year:new Date(el.createdAt).getFullYear(),
            }}
    
            )
            
            ].sort((a,b)=>b.Month-a.Month)) 
                 
        const classiFyAcordingToMonth = [...serviceAcordingToMonth].reduce((crr,el,i)=>{
                if(!crr.length){crr.push(el)}
               else if(crr?.length) {
               const val =  crr.some((el2)=>   el2.Service  === el.Service && el2.Month  === el.Month)
               if(!val){crr.push(el)}} return crr
        },[])

console.log(setYears([...new Set(classiFyAcordingToMonth.map((el)=>el.Year))]))
        
         
const serviceRevenueData =  classiFyAcordingToMonth.map((el)=>{

            let renwed = 0;
            let cancel = 0;
            let renevals = 0;
            let totalRevenue = 0;

            const obj = {
               month:el.Month,
               typeOfService:el.Service,
               date:el.date,
               year:el.Year,
               Renewed:0, 
               NoOfLeft:0,
               Renevals:0,
               TotalRevenue:0
            }

         return   data.reduce((crr,el2)=>{
            console.log(el2.serviceName === el.Service)

            const validation = el2.serviceName === el.Service && new Date(el2.createdAt).getMonth()  === el.Month      

                        
            if(el2.renewed && validation){
                renwed++   
           const inVoi = getInvoiceDataEmp(el2)
             
            if(inVoi?.paidAmount){
                totalRevenue+= inVoi?.paidAmount
                if(inVoi?.Receipts){
                    inVoi?.Receipts.forEach((el3)=>{
                        totalRevenue +=(+el3.PaidAmount)
                    })
                }

                crr.TotalRevenue = totalRevenue

            }

            crr.Renewed = renwed    
            }

            if(IndentifyCancelFun(el2) && validation){
              cancel++
              crr.NoOfLeft=cancel

              const inVoi = getInvoiceDataEmp(el2)
             
              if(inVoi?.paidAmount){
                  totalRevenue+= inVoi?.paidAmount
                  if(inVoi?.Receipts){
                      inVoi?.Receipts.forEach((el3)=>{
                          totalRevenue +=(+el3.PaidAmount)
                      })
                  }
                  crr.TotalRevenue = totalRevenue
  
              }
            }
            if(identifyRenevItme(el2) && validation){
               renevals++   
              crr.Renevals = renevals 

              const inVoi = getInvoiceDataEmp(el2)
             
              if(inVoi?.paidAmount){
                  totalRevenue+= inVoi?.paidAmount
                  if(inVoi?.Receipts){
                      inVoi?.Receipts.forEach((el3)=>{
                          totalRevenue +=(+el3.PaidAmount)
                      })
                  }
                  crr.TotalRevenue = totalRevenue
  
              }
            }
            return crr
           },{...obj})
        }) 
    
        console.log(serviceRevenueData)
        setRenewRevenueData(serviceRevenueData)
      }).catch((error)=>{
        console.error(error)
      })


      
      //renewed

    
   }



   const getInvoiceInfo = async ()=>{
    axios.get(`${url1}/invoice/all`,{headers}).then((res)=>{
    // console.log(res.data)
    InVoiceData = res.data
    setUpgradeInvoiceData(res.data)
    getUpgradeInvoiceData()
    })
}
   useEffect(()=>{
      getInvoiceInfo()
   },[])
   

   
   function clearFilter(){
    setServiceName('')
    setSelectedYear('')
    setMonth('')
}


function getPackage() {
    axios.get(`${url1}/packagemaster`, {

    })
        .then((res) => {
            setserviceData(res.data)
            console.log(res.data)
        })
        .catch((error) => {
            console.error(error)
        })
}
useEffect(()=>{
getPackage()                    
},[])



    return (
        <CRow>
            <CCol lg={12} sm={12}>
                <CCard className='mb-3 border-top-success border-top-3'>
                <CCardHeader>
                        <strong className="mt-2">Renewals/Upgrade Revenue</strong>
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
                                     onChange={(e)=>setServiceName(e.target.value)}
                                    >
                                    <option>Select Service</option>
                                        {serviceData.map((item, index) => (
                                            item.username === username && (
                                               item.Status=== true && (
                                                    <option key={index}>{item.Service }</option>                                                  
                                                )
                                            
                                            )))}
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
                                    <CTableHeaderCell scope="col">Services wise client</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">
                                        Total Renewal client
                                    </CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Renewed</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">No. of Left</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Total Revenue</CTableHeaderCell>
                          
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {getRenewRevenueData.filter((el)=>{                                                                      
                                   return monthName[el.month].includes(month) &&  
                                   (el.year+"").includes(selectedYear)&&
                                   el.typeOfService.includes(serviceName) 

                                }).filter((el, i) => {num++                                    
                                    if (pagination - 10 < i + 1 && pagination >= i + 1) {
                                    return el}}).map((el,i)=>
                                <CTableRow>
                                   <CTableDataCell>{i+1}</CTableDataCell>
                                   <CTableDataCell>{el.year}</CTableDataCell>
                                    <CTableDataCell>{monthName[el.month]}</CTableDataCell>
                                    <CTableDataCell>{el.typeOfService}</CTableDataCell>
                                    <CTableDataCell>{el.Renevals}</CTableDataCell>
                                    <CTableDataCell>{el.Renewed}</CTableDataCell>
                                    <CTableDataCell>{el.NoOfLeft}</CTableDataCell>
                                    <CTableDataCell>{el.TotalRevenue}</CTableDataCell>
                        
                                </CTableRow>                                
                                )}

                            </CTableBody>
                        </CTable>
                        {!getRenewRevenueData[0] ?
                                <CCol style={{ width: '100%' }} className='d-flex justify-content-center my-3'>
                                    <YogaSpinnar />
                         </CCol> : ''}
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

export default RenewRevenue