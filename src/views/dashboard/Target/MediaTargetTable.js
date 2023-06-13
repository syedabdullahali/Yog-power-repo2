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


function MeadiaTargetTable({EmployeeData}) {
    let  num =0
    let user = JSON.parse(localStorage.getItem('user-info'))
    const username = user.user.username;
    let totalTarget = 0


    const url = useSelector((el) => el.domainOfApi)
    const [mediaTarget, setMediaTarget] = useState([])
    const [pagination, setPagination] = useState(10)
    const [selectedEmployee, setSselectedEmployee] = useState('')
    const [selectedMonth,setSelectedMonth] = useState('')
    const [selectedYear,setSelectedYear] = useState('')


    const getLiveClasses = useCallback(async function () {
        try {
            const response7 = await axios.get(`${ url }/mediatarget`)
            setMediaTarget(response7.data)
        } catch (error) {
            console.error(error)
        }
    }, [])

    useEffect(() => {
        getLiveClasses()
    }, [getLiveClasses])


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
                    <CTableHeaderCell scope="col">Employee</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Google Reviewst</CTableHeaderCell>
                    <CTableHeaderCell scope="col">
                        Facebook
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col">Instagram</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Linkedin</CTableHeaderCell>
                    <CTableHeaderCell scope="col">
                        Justdial
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col">Achieved</CTableHeaderCell>

                </CTableRow>
            </CTableHead>

            <CTableBody>

                {/* {
                    mediaTarget.filter((el, i) => {
                        if (pagination - 10 < i + 1 && pagination >= i + 1) {
                              return el
                            }
                    }).map((el, i) =>
                        <CTableRow>
                            <CTableDataCell>{i + 1 + pagination - 10}</CTableDataCell>
                            <CTableDataCell>{el.Employee}</CTableDataCell>
                            <CTableDataCell>{el.Google_Reviews}</CTableDataCell>
                            <CTableDataCell>{el.Facebook}</CTableDataCell>
                            <CTableDataCell>{el.Instagram}</CTableDataCell>
                            <CTableDataCell>{el.Linkedin}</CTableDataCell>
                            <CTableDataCell>{el.Justdial}</CTableDataCell>
                            <CTableDataCell>{el.Achived}</CTableDataCell>
                        </CTableRow>
                    )} */}
                    {[... mediaTarget.filter((el4)=>{
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
            totalTarget+= +el.Google_Reviews

            num++
            return  <CTableRow key={num}>
            <CTableDataCell>{num}</CTableDataCell>
            <CTableDataCell>{el.Employee}</CTableDataCell>
                            <CTableDataCell>{el.Google_Reviews}</CTableDataCell>
                            <CTableDataCell>{el.Facebook}</CTableDataCell>
                            <CTableDataCell>{el.Instagram}</CTableDataCell>
                            <CTableDataCell>{el.Linkedin}</CTableDataCell>
                            <CTableDataCell>{el.Justdial}</CTableDataCell>
                            <CTableDataCell>{el.Achived}</CTableDataCell>
        </CTableRow>    
        }
    }).filter((el)=>el)).flat(2)].filter((el, i) => {
        if (pagination - 10 < i + 1 && pagination >= i + 1) {
              return el
            }
    })


}

<CTableRow className='text-center' >
                    <CTableDataCell colSpan={2} style={{ backgroundColor: "#0B5345"}} className='text-white  border-2'>Total</CTableDataCell>
                    <CTableDataCell className=' border border-2 border-dark text-dark' scope="col">{totalTarget}</CTableDataCell>  
                    <CTableDataCell  className=' border border-2  border-dark text-dark' scope="col">0</CTableDataCell>  
                    <CTableDataCell className=' border border-2 border-dark text-dark'>0</CTableDataCell>  
                    <CTableDataCell  className=' border border-2  border-dark text-dark'>0</CTableDataCell>  
                    <CTableDataCell  className=' border border-2  border-dark text-dark'>0</CTableDataCell>
                    <CTableDataCell  className=' border border-2  border-dark text-dark'>0</CTableDataCell>    
                </CTableRow>   
            </CTableBody>
        </CTable>
        {!mediaTarget[0] ?
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


export default MeadiaTargetTable