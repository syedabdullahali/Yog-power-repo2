
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
    CPaginationItem,
} from '@coreui/react'
import React, { useState, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import YogaSpinnar from 'src/views/theme/YogaSpinnar'

let user = JSON.parse(localStorage.getItem('user-info'))
    const username = user.user.username;
    const allMonthName  = ['Jan','Feb','March','April','May','Jun','July','August','Sep','Oct','Nov','Dec']


function CallesTargetTable({EmployeeData}) {
    let num =0;
    const url = useSelector((el) => el.domainOfApi)
    const [callsTargetData, setCallsTarget] = useState([])
    const [pagination, setPagination] = useState(10)
    const [selectedEmployee, setSselectedEmployee] = useState('')
    const [selectedMonth,setSelectedMonth] = useState('')
    const [selectedYear,setSelectedYear] = useState('')

    let totalTarget = 0
    let leadCall = 0
    let totalMemebrCall = 0


    let user = JSON.parse(localStorage.getItem('user-info'))
    const username = user.user.username;
    const token = user.token;

    const headers = {
        'Authorization': `Bearer ${token}`,
        'My-Custom-Header': 'foobar'
};

    const getLiveClasses = useCallback(async function () {
        try {

            const response1 =  axios.get(`${url}/callstarget`,{headers})
            const response2 =  axios.get(`${url}/memberCallReport/all`,{headers})
            const response3 =  axios.get(`${url}/prospect/all`,{headers})
            const data  =  await Promise.all([response1,response2,response3])

            console.log(data[0].data)
            console.log(data[1].data)
            console.log(data[2].data)

            


            data[0].data?.forEach(el => {
                const memBerCallHistory = data[1].data.filter((el2)=>el2.empolyeeId===el.Sr_No )   
                const enqCallHistory = data[2].data.filter((el2)=>el2.EmployeeId===el.Sr_No )   
                console.log(enqCallHistory)

               el.annualTarget.forEach((el3)=>{

                    el3.Members_Call =0
                    el3.Lead_Call = 0
                    el3.Total_Call = 0


                   memBerCallHistory.forEach((el4)=>{
                    if(el3.monthName === allMonthName[new Date(el4.callFollowUpDate).getMonth()] 
                     &&+el.Year===new Date(el4.callFollowUpDate).getFullYear()){                        
                                el3.Members_Call+= 1
                                el3.Total_Call+=1
                    }

                   })  

                   enqCallHistory.forEach((el4)=>{
                    if(el3.monthName === allMonthName[new Date(el4.CallDate).getMonth()] 
                     &&+el.Year===new Date(el4.CallDate).getFullYear()){                        
                                el3.Lead_Call+= 1
                                el3.Total_Call+=1
                    }

                   })  
               }) 
               setCallsTarget(data[0].data)
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
                    <CTableHeaderCell scope="col">Call Target</CTableHeaderCell>
                    <CTableHeaderCell scope="col">
                      New Follow Up Call Report
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col">Members Call</CTableHeaderCell>
                    <CTableHeaderCell scope="col">
                        Achived %
                    </CTableHeaderCell>
                </CTableRow>
            </CTableHead>
            <CTableBody>


{[...callsTargetData.filter((el4)=>{
    if(selectedYear){
     return el4.Year===selectedYear
    }else if(selectedEmployee){
    return el4.Sr_No===selectedEmployee
    }else{
    return el4
    }
}).map(el=>el.annualTarget.filter((el3)=>selectedMonth?el3.monthName===selectedMonth:el3)
.map((el2,i)=>{
    totalTarget+= +el2.Target
    leadCall+=el2.Lead_Call
    totalMemebrCall+=+el2.Members_Call
    
        if(+el2.Target){
            num++
            return  <CTableRow key={num} className='text-center'>
            <CTableDataCell>{num}</CTableDataCell>
            <CTableDataCell>{el2.monthName }</CTableDataCell>
            <CTableDataCell>{el.Employee}</CTableDataCell>
            <CTableDataCell>{el2.Target}</CTableDataCell>
            <CTableDataCell>{el2.Lead_Call}</CTableDataCell>
            <CTableDataCell>{el2.Members_Call}</CTableDataCell>
            <CTableDataCell>{percentage(el2.Total_Call,el2.Target).toFixed(2)}%</CTableDataCell>
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
                    <CTableDataCell  className=' border border-2  border-dark text-dark' scope="col">{leadCall}</CTableDataCell>  
                    <CTableDataCell className=' border border-2 border-dark text-dark'>{totalMemebrCall}</CTableDataCell>  
                    <CTableDataCell  className=' border border-2  border-dark text-dark'>{percentage((leadCall+totalMemebrCall),totalTarget).toFixed(2)}%</CTableDataCell>  
                </CTableRow> 
            </CTableBody>
        </CTable>
        {!callsTargetData[0] ?
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
                            <CPaginationItem aria-label="Next" onClick={() => setPagination((val) => val < num.length ? val + 10 : val)}>
                                <span aria-hidden="true">&raquo;</span>
                            </CPaginationItem>
                    </CPagination>
        </div>  
    </CTabPane>
}


export default CallesTargetTable