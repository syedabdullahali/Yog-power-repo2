
import { cilArrowCircleBottom, cilArrowCircleTop } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
    CButton,
    CButtonGroup,
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
    CTabPane,
    CPagination,
    CPaginationItem
} from '@coreui/react'
import React, { useState, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import YogaSpinnar from 'src/views/theme/YogaSpinnar'


function RenewalsTable({EmployeeData}) {
    let num = 0;
    const url = useSelector((el) => el.domainOfApi)
    const [referralLeadsData, setReferralLeadsData] = useState([])
    const [pagination, setPagination] = useState(10)
    const [selectedEmployee, setSselectedEmployee] = useState('')
    const [selectedMonth,setSelectedMonth] = useState('')
    const [selectedYear,setSelectedYear] = useState('')

    let user = JSON.parse(localStorage.getItem('user-info'))
    const username = user.user.username;
    const token = user.token;


    const headers = {
        'Authorization': `Bearer ${token}`,
        'My-Custom-Header': 'foobar'
};

const allMonthName  = ['Jan','Feb','March','April','May','Jun','July','August','Sep','Oct','Nov','Dec']
let totalTarget = 0
let noOfRenewedLead = 0
let convertMemeber = 0
let totalAmount = 0
    const getLiveClasses = useCallback(async function () {
        try {

            const response1 =  axios.get(`${ url }/referralsleadstarget`,{headers})
            const response2 =  axios.get(`${url}/enquiryForm/all`,{headers})
            const response3 =  axios.get(`${url}/invoice/all`,{headers})

            const data  =  await Promise.all([response1,response2,response3])


             data[0].data?.forEach(el => {
                const LeadData = data[1].data.filter((el2)=>el2.invEmployeeId===el.Sr_No  && el2.enquirytype=== "Referred") 
                const InvoiceData = data[2].data.filter((el2)=>el2.EmployeeId===el.Sr_No )   

                
               el.annualTarget.forEach((el3)=>{
                    el3.TotalLeadCoverted =0
                    el3.No_Of_Referrals_Leads = 0
                    el3.Balance_Collection = 0

                    LeadData.forEach((el4)=>{
                    if(el3.monthName === allMonthName[new Date(el4.enquiryConvertedDate).getMonth()] 
                     &&+el.Year===new Date(el4.enquiryConvertedDate).getFullYear()){   
                        if(el4.enquirestatus==='notshow'){
                            el3.TotalLeadCoverted+=1
                            el3.Balance_Collection+=  InvoiceData.filter((el3)=>el3._id===el4.invoiceId).reduce((crr,el6)=>{                                                 
                                crr += +el6.paidAmount    
                              if(el6.Receipts.length){
                                             el6?.Receipts.forEach((el7)=>{
                             crr += (+el7.PaidAmount)
                                                 })
                                      }                  
                                return crr

                            },0)
                        } 
                        el3.No_Of_Referrals_Leads+=1                                                                                         
                    }
                   })
               }) 
               setReferralLeadsData(data[0].data)
             });

        } catch (error) {
            console.error(error)
        }
    }, [])

    useEffect(() => {
        getLiveClasses()
    }, [getLiveClasses])

    function percentage(partialValue, totalValue) {
        return (100 * partialValue) / totalValue;
     } 

    return <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={true}>
         <CRow className='mb-3'>
            <CCol sm={3}>
                <CInputGroup>
                    <CInputGroupText
                        component="label"
                        htmlFor="inputGroupSelect01"

                    >
                        Month
                    </CInputGroupText>
                   <CFormSelect
                   value={selectedMonth}
                   onChange={(e)=>setSelectedMonth(e.target.value)}
                   >
                    <option>Select Your Month</option>
                    <option>Jan</option>
                    <option>Feb</option>
                    <option>March</option>
                    <option>April</option>
                    <option>May</option>
                    <option>June</option>
                    <option>July</option>
                    <option>August</option>
                    <option>Sept</option>
                    <option>Oct</option>
                    <option>Nov</option>
                    <option>Dec</option>

                   </CFormSelect>
                    
                </CInputGroup>
                
            </CCol>
            <CCol sm={3}>
                <CInputGroup>
                    <CInputGroupText
                        component="label"
                        htmlFor="inputGroupSelect01"
                    >
                        Year
                    </CInputGroupText>
                   <CFormSelect
                   value={selectedYear}
                   onChange={(e)=>setSelectedYear(e.target.value)}
                   >
                      <option>Select Year</option>
                      <option>{new Date().getFullYear() - 9}</option>
                        <option >{new Date().getFullYear() - 8}</option>
                        <option >{new Date().getFullYear() - 7}</option>
                        <option >{new Date().getFullYear() - 6}</option>
                        <option> {new Date().getFullYear()-5}</option>
                        <option>{new Date().getFullYear() - 4}</option>
                        <option >{new Date().getFullYear() - 3}</option>
                        <option >{new Date().getFullYear() - 2}</option>
                        <option >{new Date().getFullYear() - 1}</option>
                        <option> {new Date().getFullYear()}</option>

                   </CFormSelect>
                    
                </CInputGroup>
                
            </CCol>
            <CCol>
                <CInputGroup className="left">
                <CInputGroupText
                        component="label"
                        htmlFor="inputGroupSelect01"
                    >
                       Employee
                    </CInputGroupText>
                <CFormSelect 
                    value={selectedEmployee}
                    onChange={(e) => setSselectedEmployee(e.target.value)}
                >
                    <option >Select Your Employee </option>

                    {EmployeeData.filter((list) => list.username === username && list.selected === 'Select').map((item, index) => (
                        item.username === username && (
                            <option key={index} value={item._id} >{item.FullName}</option>
                        )
                    ))}

                </CFormSelect>
                 
                </CInputGroup>
            </CCol>
            
        </CRow>
        <CTable bordered borderColor="black" responsive>
            <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                <CTableRow>
                    <CTableHeaderCell scope="col">Sr.No</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Month Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Employee</CTableHeaderCell>
                    <CTableHeaderCell scope="col">No. of Renewed Target</CTableHeaderCell>
                    <CTableHeaderCell scope="col">
                        No. of Renewed Leads
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col">Convert to member</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Total Amount</CTableHeaderCell>
                    <CTableHeaderCell scope="col">
                        Achived %
                    </CTableHeaderCell>

                </CTableRow>
            </CTableHead>
            <CTableBody>
       


{[...referralLeadsData.filter((el4)=>{
    if(selectedYear){
     return el4.Year===selectedYear
    }else if(selectedEmployee){
    return el4.Sr_No===selectedEmployee
    }else{
    return el4
    }
}).map(el=>el.annualTarget.filter((el3)=>selectedMonth?el3.monthName===selectedMonth:el3)
.map((el2,i)=>{
        if(+el2.Target){
            totalTarget+= +el2.Target
            noOfRenewedLead+=el2.No_Of_Referrals_Leads 
            convertMemeber+=el2.TotalLeadCoverted
            totalAmount+=el2.Balance_Collection
            num++
            return  <CTableRow key={num}>
             <CTableDataCell>{num}</CTableDataCell>
             <CTableDataCell>{el2.monthName }</CTableDataCell>
                <CTableDataCell>{el.Employee}</CTableDataCell>
                        <CTableDataCell>{+el2.Target}</CTableDataCell>
                        <CTableDataCell>{el2.No_Of_Referrals_Leads }</CTableDataCell>
                        <CTableDataCell>{el2.TotalLeadCoverted}</CTableDataCell>
                        <CTableDataCell>{el2.Balance_Collection}</CTableDataCell>
                        <CTableDataCell>{percentage(+el2.TotalLeadCoverted,+el2.Target).toFixed(2)}%</CTableDataCell>
        </CTableRow>    
        }
    }).filter((el)=>el)).flat(2)].filter((el, i) => {
        if (pagination - 10 < i + 1 && pagination >= i + 1) {
              return el
            }
    })
}
<CTableRow className='text-center' >
                    <CTableDataCell colSpan={3} style={{ backgroundColor: "#0B5345"}} className='text-white  border-2'>Total</CTableDataCell>
                    <CTableDataCell className=' border border-2 border-dark text-dark' scope="col">{totalTarget}</CTableDataCell>  
                    <CTableDataCell  className=' border border-2  border-dark text-dark' scope="col">{noOfRenewedLead}</CTableDataCell>  
                    <CTableDataCell className=' border border-2 border-dark text-dark'>{convertMemeber}</CTableDataCell>  
                    <CTableDataCell  className=' border border-2  border-dark text-dark'>{totalAmount}</CTableDataCell>  
                    <CTableDataCell  className=' border border-2  border-dark text-dark'>{percentage(convertMemeber,totalTarget).toFixed(2)}%</CTableDataCell>  
                  
                </CTableRow>   
            </CTableBody>
        </CTable>
        {!referralLeadsData[0] ?
            <CCol style={{ width: '100%' }} className='d-flex justify-content-center '>
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

    </CTabPane>


}


export default RenewalsTable