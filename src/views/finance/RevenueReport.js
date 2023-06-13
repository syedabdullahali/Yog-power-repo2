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
import { useSelector } from 'react-redux'
import CIcon from '@coreui/icons-react'
import { cilArrowCircleBottom, cilArrowCircleTop, cilPlus } from '@coreui/icons'
import axios from 'axios'

let user = JSON.parse(localStorage.getItem('user-info'))
const token = user.token;
const username = user.user.username;
const centerCode = user.user.centerCode;

const headers = {
    'Authorization': `Bearer ${token}`,
    'My-Custom-Header': 'foobar'
   };

   

const RevenueReport= () => {
    const url1 = useSelector((el)=>el.domainOfApi) 
    const [annualRevenue,setAnnualRevenue] = useState([])
    const [selectedYear,setSelectedYear] = useState('')
    const [years,setYears] = useState([])


    const getInvoiceDataToCollectAnualRevenue = async  ()=>{
        try{
        const responseData = await axios.get(`${url1}/invoice/all`,{headers})
        const InvoiceData = responseData.data

        console.log(InvoiceData)

   const FilterYear =  InvoiceData.map((el)=>{
          return {Year:new Date(el.createdAt).getFullYear(),Month:new Date(el.createdAt).getMonth()}
        })

   const removeDuplicateYear =FilterYear.reduce((crr,el,i)=>{
    if(!crr.length){crr.push(el)}
   else if(crr?.length) {
   const val =  crr.some((el2)=>   el2.Year  === el.Year )
   if(!val){crr.push(el)}} return crr
   },[])




const AnnualRevenue=    removeDuplicateYear.map((el)=>{
        let obj ={
                year:el.Year,
                Allmonth:[
                    {month:0,Totalamount:0},
                    {month:1,Totalamount:0},
                    {month:2,Totalamount:0},
                    {month:3,Totalamount:0},
                    {month:4,Totalamount:0},
                    {month:5,Totalamount:0},
                    {month:6,Totalamount:0},
                    {month:7,Totalamount:0},
                    {month:8,Totalamount:0},
                    {month:9,Totalamount:0},
                    {month:10,Totalamount:0},
                    {month:11,Totalamount:0},
                ],
                annuaTotal:0
        }

      return  InvoiceData.reduce((crr,el2)=>{
            if(new Date(el2.createdAt).getFullYear()  === el.Year ){
              crr.Allmonth[new Date(el2.createdAt).getMonth()].Totalamount += (+el2.paidAmount)
              crr.annuaTotal += (+el2.paidAmount)
                    if(el2.Receipts.length){
                      el2?.Receipts.forEach((el3)=>{
               crr.Allmonth[new Date(el2.createdAt).getMonth()].Totalamount += (+el3.PaidAmount)
               crr.annuaTotal += (+el3.PaidAmount)
                      })                  }       
  }
  return crr
  },{...obj})
         
    })

console.log(AnnualRevenue)



setAnnualRevenue(AnnualRevenue)

setYears(AnnualRevenue.map((el)=>el.year))
}catch(error){
    console.error(error)
 }
}


    useEffect(()=>{
        getInvoiceDataToCollectAnualRevenue()
    },[])


console.log(annualRevenue)

    return (
        <CRow>


            <CCol lg={12} sm={12}>
                <CCard className='mb-3 border-top-success border-top-3'>
                    <CCardHeader>
                        <strong className="mt-2">Revenue Report</strong>
                    </CCardHeader>
                    <CCardBody>                        
                        <CRow >
                        <CCol lg={4} className='mb-2'>
                            <CFormSelect value={selectedYear} onChange={(e)=>setSelectedYear(e.target.value)}>
                                <option>slecte Year</option>
                                {years.map((el)=>{
                                    return <option>{el}</option>
                                })}  
                            </CFormSelect>
                            </CCol>                           
                        </CRow>
                        <CTable bordered style={{ borderColor: "#106103" }} responsive>
                            <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }}>
                                <CTableRow>
                                    <CTableHeaderCell scope="col">Sr No</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Year</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Jan</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">
                                        Feb
                                    </CTableHeaderCell>
                                    <CTableHeaderCell scope="col">March</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Apr</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">May</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">June</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">July</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Aug</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Sep</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Oct</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Nov</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Dec</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Total</CTableHeaderCell>


                                    {/* <CTableHeaderCell scope="col">Renewls Revenue</CTableHeaderCell> */}
                                    {/* <CTableHeaderCell scope="col">
                                        Balance Collection
                                    </CTableHeaderCell>
                                    <CTableHeaderCell scope="col">View</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Achived %</CTableHeaderCell> */}
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {annualRevenue.filter((el)=>{                                       
                                       return (el.year+"").includes(selectedYear)
                                                               
                                       }).map((el,i)=>{
                                    console.log(el)
                              return   <CTableRow key={i}>
                                   <CTableDataCell>{i+1}</CTableDataCell>
                                    <CTableDataCell>{el.year}</CTableDataCell>
                                    <CTableDataCell>{el.Allmonth[0].Totalamount}</CTableDataCell>
                                    <CTableDataCell>{ el.Allmonth[1].Totalamount}</CTableDataCell>
                                    <CTableDataCell>{el.Allmonth[2].Totalamount}</CTableDataCell>
                                    <CTableDataCell>{el.Allmonth[3].Totalamount}</CTableDataCell>
                                    <CTableDataCell>{el.Allmonth[4].Totalamount}</CTableDataCell>
                                    <CTableDataCell>{el.Allmonth[5].Totalamount}</CTableDataCell>
                                    <CTableDataCell>{el.Allmonth[6].Totalamount}</CTableDataCell>
                                    <CTableDataCell>{el.Allmonth[7].Totalamount}</CTableDataCell>
                                    <CTableDataCell>{el.Allmonth[8].Totalamount}</CTableDataCell>
                                    <CTableDataCell>{el.Allmonth[9].Totalamount}</CTableDataCell>
                                    <CTableDataCell>{el.Allmonth[10].Totalamount}</CTableDataCell>
                                    <CTableDataCell>{el.Allmonth[11].Totalamount}</CTableDataCell>
                                    <CTableDataCell>{"Rs "+ el.annuaTotal}</CTableDataCell>
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

export default RevenueReport