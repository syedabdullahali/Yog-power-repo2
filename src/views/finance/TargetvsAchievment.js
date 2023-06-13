import React,{useState,useEffect} from 'react'
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
    CContainer,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowCircleBottom, cilArrowCircleTop, cilPlus } from '@coreui/icons'
import { useSelector } from 'react-redux'
import axios from 'axios'


let user = JSON.parse(localStorage.getItem('user-info'))
console.log(user)
const token = user.token;
const username = user.user.username;
const centerCode = user.user.centerCode;


const allMonthName  = ["Jan","Feb","March","April","May","June","July","August","Sept", "Oct","Nov","Dec"]

const TargetvsAchievment = () => {

    const url1 = useSelector((el)=>el.domainOfApi) 
    const [targetVsAchiveMent,setTargetVsAchiveMent] = useState([])

    const centerName =  centerCode  ==='VM'?"(V-mall Thakur Complex)":''  

   const targetvsAchievmentData =
    {
        "centerName":`${centerCode }${centerName}`
    }

    allMonthName.forEach((el)=>{
 targetvsAchievmentData[el]={targetData:0,revenueData:0}
    })
   

    console.log(targetvsAchievmentData)

    

    



    useEffect(()=>{
       getRevenueTarget()
    },[])
    
    
    async function getRevenueTarget(){  
    try{  
    const response1 =   axios.get(`${url1}/employeetargetsheet`,{ headers: {
        'Authorization': `Bearer ${token}`
    }})
    const response2 =   axios.get(`${url1}/invoice/all`,{ headers: {
        'Authorization': `Bearer ${token}`
    }})

  const bothData  =  await Promise.all([response1,response2])

  console.log(bothData)

   const targetData = bothData[0].data
   const invoiceData = bothData[1].data
   
   targetData.forEach((el)=>{
    for (const key in el){
        if(allMonthName.includes(key)){
            targetvsAchievmentData[key].targetData+= +el[key]
        }
    }
   })

  invoiceData.forEach((el)=>{
    console.log(el.createdAt)
    const MonthName = allMonthName[new Date(el.createdAt).getMonth()]
    if(MonthName){        
        targetvsAchievmentData[MonthName].revenueData +=  +el.paidAmount    
        if(el?.Receipts.length){
            el?.Receipts.forEach((el3)=>{
                targetvsAchievmentData[MonthName].revenueData += +el3?.PaidAmount
            })
    }
}
  })

   setTargetVsAchiveMent([targetvsAchievmentData])


    }catch(error){
      console.error(error)
     }
    }
    
    console.log(targetVsAchiveMent)



    return (
        <CRow>
            <CCol lg={12} sm={12}>
                <CCard className='mb-3 border-top-success border-top-3'>
                    <CCardHeader>
                        <strong className="mt-2">Target vs Achievment</strong>
                    </CCardHeader>
                    <CCardBody style={{overflowX:"scroll"}}>
                        {/* <CRow className='d-flex justify-content-center mb-2'>
                            <CCol lg={3} sm={6} className='mb-2'>
                                <CInputGroup
                                    className='mb-2'
                                >
                                    <CInputGroupText
                                        component="label"
                                        htmlFor="inputGroupSelect01"
                                    >
                                        From
                                    </CInputGroupText>
                                    <CFormInput
                                        type='date'
                                        placeholder="Search"
                                        aria-label="Recipient's username"
                                        aria-describedby="button-addon2"
                                    />
                                </CInputGroup>
                            </CCol>
                            <CCol lg={3} sm={6} className='mb-2'>
                                <CInputGroup className='mb-2'>
                                    <CInputGroupText
                                        component="label"
                                        htmlFor="inputGroupSelect01"
                                    >
                                        To
                                    </CInputGroupText>
                                    <CFormInput
                                        type='date'
                                        placeholder="Search"
                                        aria-label="Recipient's username"
                                        aria-describedby="button-addon2"
                                    />
                                </CInputGroup>
                            </CCol>
                            <CCol lg={5} className='mb-2'>
                                <CButton type="button" color="primary">
                                    Search
                                </CButton>
                            </CCol>
                            <CCol></CCol>
                        </CRow>
                        <CRow >
                            <CCol lg={2} sm={6} className='mb-2'>
                                <CInputGroup>
                                    <CInputGroupText
                                        component="label"
                                        htmlFor="inputGroupSelect01"
                                    >
                                        All
                                    </CInputGroupText>
                                    <CFormSelect id="inputGroupSelect01">
                                        <option>Select</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </CFormSelect>
                                </CInputGroup>
                            </CCol>
                            <CCol lg={3} sm={6} className='mb-2'>
                                <CInputGroup>
                                    <CFormSelect id="inputGroupSelect01">
                                        <option>Service Receipt</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </CFormSelect>
                                </CInputGroup>
                            </CCol>
                            <CCol lg={3} sm={6} className='mb-2'>
                                <CInputGroup>
                                    <CFormSelect id="inputGroupSelect01">
                                        <option>Select Service</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </CFormSelect>
                                </CInputGroup>
                            </CCol>
                            <CCol lg={4} sm={6} className='mb-2' >
                                <CButton color="primary" className='float-end '>
                                    <CIcon icon={cilPlus} />
                                    {' '}New Invoice
                                </CButton>
                            </CCol>
                        </CRow> */}
                        <table>
                            <tbody>
                                <tr>
                                <th rowSpan={2} >Sr No</th>
                                <th rowSpan={2} >Center Name</th>
                                <th colSpan={2}>January</th>
                                <th colSpan={2}>February</th>
                                <th colSpan={2}>March</th>
                                <th colSpan={2}>April</th>
                                <th colSpan={2}>May</th>
                                <th colSpan={2}>June</th>
                                <th colSpan={2}>July</th>
                                <th colSpan={2}>August</th>
                                <th colSpan={2}>September</th>
                                <th colSpan={2}>October</th>
                                <th colSpan={2}>November</th>
                                <th colSpan={2}>December</th>
                            </tr>
                            <tr>
                                <th>Target</th>
                                <th>Revenue</th>
                                <th>Target</th>
                                <th>Revenue</th>
                                <th>Target</th>
                                <th>Revenue</th>
                                <th>Target</th>
                                <th>Revenue</th>
                                <th>Target</th>
                                <th>Revenue</th>
                                <th>Target</th>
                                <th>Revenue</th>
                                <th>Target</th>
                                <th>Revenue</th>
                                <th>Target</th>
                                <th>Revenue</th>
                                <th>Target</th>
                                <th>Revenue</th>
                                <th>Target</th>
                                <th>Revenue</th>
                                <th>Target</th>
                                <th>Revenue</th>
                                <th>Target</th>
                                <th>Revenue</th>
                               
                            </tr>
                            {targetVsAchiveMent.map((el,i)=>
                            <tr>
                                <td className='p-3'>{i+1}</td>
                                <td className='p-3'>{el.centerName}</td>
                                <td className='p-3'>{el.Jan.targetData}</td>    
                                <td className='p-3'>{el.Jan.revenueData}</td>  
                                <td className='p-3'>{el.Feb.targetData}</td>  
                                <td className='p-3'>{el.Feb.revenueData}</td>  
                                <td className='p-3' >{el.March.targetData}</td>
                                <td className='p-3'>{el.March.revenueData}</td>    
                                <td className='p-3'>{el.April.targetData}</td>  
                                <td className='p-3'>{el.April.revenueData}</td>  
                                <td className='p-3'>{el.May.targetData}</td>  
                                <td className='p-3'>{el.May.revenueData}</td>
                                <td className='p-3'>{el.June.targetData}</td>    
                                <td className='p-3'>{el.June.revenueData}</td>  
                                <td className='p-3'>{el.July.targetData}</td>  
                                <td className='p-3'>{el.July.revenueData}</td>  
                                <td className='p-3'>{el.August.targetData}</td>
                                <td className='p-3'>{el.August.revenueData}</td>    
                                <td className='p-3'>{el.Sept.targetData}</td>  
                                <td className='p-3'>{el.Sept.revenueData}</td>  
                                <td className='p-3'>{el.Oct.targetData}</td>  
                                <td className='p-3'>{el.Oct.revenueData}</td>  
                                <td className='p-3'>{el.Nov.targetData}</td>
                                <td className='p-3'>{el.Nov.revenueData}</td>  
                                <td className='p-3'>{el.Dec.targetData}</td>
                                <td className='p-3'>{el.Dec.revenueData}</td>  
                            </tr>
                            )}
                            
                            </tbody>
                        </table>
                      
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default TargetvsAchievment