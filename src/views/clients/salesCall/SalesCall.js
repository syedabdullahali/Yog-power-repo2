import { cilArrowCircleBottom, cilArrowCircleTop } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import { MdCall, MdDelete, MdEdit, MdMail } from 'react-icons/md';
import { BsPlusCircle, BsWhatsapp } from 'react-icons/bs';
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
import { useParams } from 'react-router-dom';
import { empLoyeeeRights } from '../../hr/Rights/rightsValue/crmRightsValue'



const SalesCall = () => {
    const url = useSelector((el)=>el.domainOfApi) 

    const rightsData = useSelector((el)=>el.empLoyeeRights?.crmRights
    ?.crmEmployee?.items?.crmSalesCall1?.rights) 
    const access = rightsData?rightsData:[]
    const isAdmin = useSelector((el)=>el.isAdmin) 

    const funValidate = (val)=>{
        return (access?.includes(empLoyeeeRights[val])||isAdmin)
    }

    const upgradeCallsVal =  funValidate('upgradeCalls')
    const renewalsCallsVal = funValidate('renewalsCalls')
    const crossCellCallsVal = funValidate('paymentCalls')

    const [activeKey, setActiveKey] = useState(
        (upgradeCallsVal&&1)||
        (renewalsCallsVal&&2)||
        (crossCellCallsVal&&3))   
    
    
    const [uppgradeCallsData,setUppgradeCallsData] = useState([])
    const [renevalsCallData,setRenevalsCallData] = useState([])
    const [crossCellCallsData,setCrossCellCallsData] = useState([])
    const [selectedEmployee, setSselectedEmployee] = useState('')
    const [selectedMonth,setSelectedMonth] = useState('')
    const [selectedYear,setSelectedYear] = useState('')

    let user = JSON.parse(localStorage.getItem('user-info'))
    const username = user.user.username;

    const {id} = useParams()


    const  getSalesCallData = useCallback(async function() {
        try{

        const response1 = await axios.get(`${url}/upgradecalls`)
        const response2 = await axios.get(`${url}/renewalscalls`)
        const response3 = await axios.get(`${url}/crosssalecalls`)

     if(!id){
        setUppgradeCallsData(response1.data)
        setRenevalsCallData(response2.data)
        setCrossCellCallsData(response3.data)
     }else{
        setUppgradeCallsData(response1.data.filter((el)=>el.Member_Id ===id))
        setRenevalsCallData(response2.data.filter((el)=>el.Member_Id  ===id))
        setCrossCellCallsData(response3.data.filter((el)=>el.Member_Id ===id))
     }  
           
        }catch(error) {
                console.error(error)
        }
    },[])

    useEffect(() => {
        getSalesCallData()
        getEmployee()
    },[ getSalesCallData]) 


    const [employeeData, setEmployeeData] = useState([])
    console.log(uppgradeCallsData)


    async function getEmployee() {
        try {
            const { data } = await axios.get(`${ url }/employeeform`)
            setEmployeeData(data)
        } catch (error) {
            console.log(error)
        }
    }




    function deleteEnquiry(path,id) {

        if (confirm('Do you want to delete this')) {
            fetch(`${url}/${path}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then((result) => {
                result.json().then((resp) => {
                    console.warn(resp)
                    getSalesCallData()
                })
            })
        }
    }
   
 

    function clearFilter(){
     setSelectedMonth('')
     setSelectedYear('')
     setSselectedEmployee('')
    }

    return (
        <CRow>
            <CCol xs={12}>
                <CCard>
                    <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                        <CNav responsive variant="pills" role="tablist">
                            {upgradeCallsVal&& <CNavItem>
                                <CNavLink
                                    href="javascript:void(0);"
                                    active={activeKey === 1}
                                    onClick={() => setActiveKey(1)}
                                    className="text-white"
                                >
                                    Upgrade Calls
                                </CNavLink>
                            </CNavItem>}
                            {renewalsCallsVal&& <CNavItem>
                                <CNavLink
                                    href="javascript:void(0);"
                                    active={activeKey === 2}
                                    onClick={() => setActiveKey(2)}
                                    className="text-white"
                                >

                                    Renewals Calls
                                </CNavLink>
                            </CNavItem>}
                            {crossCellCallsVal&&<CNavItem>
                                <CNavLink
                                    href="javascript:void(0);"
                                    active={activeKey === 3}
                                    onClick={() => setActiveKey(3)}
                                    className="text-white"

                                >
                                    Cross-Cell Calls
                                </CNavLink>
                            </CNavItem>}                            
                        </CNav>
                    </CCardHeader>
                    <CCardBody >

        {!id &&
        <>
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
                    <option >Select Your Month</option>
                    <option value='0'>Jan</option>
                    <option value='1'>Feb</option>
                    <option value='2'>March</option>
                    <option value='3'>April</option>
                    <option value='4'>May</option>
                    <option value='5'>June</option>
                    <option value='6'>July</option>
                    <option value='7'>August</option>
                    <option value='8'>Sept</option>
                    <option value='9'>Oct</option>
                    <option value='10'>Nov</option>
                    <option value='11'>Dec</option>

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
                      <option>2023</option>
                        <option >2024</option>
                        <option >2025</option>
                        <option >2026</option>
                        <option>2027 </option>
                        <option>2028</option>
                        <option >2029</option>
                        <option >2031</option>
                        <option >2032</option>
                        <option>2033</option>

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

                    {employeeData.filter((list) => list.username === username && list.selected === 'Select').map((item, index) => (
                        item.username === username && (
                            <option key={index} value={item.FullName} >{item.FullName}</option>
                        )
                    ))}

                </CFormSelect>
                 
                </CInputGroup>
            </CCol>
            
        </CRow>
        <CRow className='py-4'>
            <CCol>
               <CButton onClick={()=>clearFilter()}>Clear Filter</CButton>
            </CCol>
        </CRow>
        </>
        }
                        <CTabContent>
                            <CTabPane responsives role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>

                               
                                <CTable bordered borderColor="success" responsive>
                                    <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                                        <CTableRow>
                                            <CTableHeaderCell scope="col">Sr.No.</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Timing</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">
                                                Client_Id
                                            </CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Contact</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">
                                                Service
                                            </CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Discussion</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Counseller</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Delete</CTableHeaderCell>
                                        </CTableRow>
                                    </CTableHead>
                                    <CTableBody>
                                        {uppgradeCallsData
                                        .filter((el)=>`${new Date(el.Date)?.getFullYear()}`.includes(selectedYear)&&
                                        `${new Date(el.Date)?.getMonth()}`.includes(selectedMonth)&&
                                        el?.Counseller?.includes(selectedEmployee)

                                        )
                                        
                                        .map((el,i)=>
                                         <CTableRow key={i}>
                                             <CTableDataCell>{i+1}</CTableDataCell>
                                             <CTableDataCell>{el.Date}</CTableDataCell>
                                             <CTableDataCell>{el.Timing}</CTableDataCell>
                                             <CTableDataCell>{el.Client_Id}</CTableDataCell>
                                             <CTableDataCell>{el.Name}</CTableDataCell>
                                             <CTableDataCell>{el.Contact}</CTableDataCell>
                                             <CTableDataCell>{el.Service}</CTableDataCell>
                                             <CTableDataCell>{el.Discussion}</CTableDataCell>
                                             <CTableDataCell>{el.Counseller}</CTableDataCell>

                                             <CTableDataCell className='text-center'>
                                                <a href={`tel:+91${el.Contact}`} target="_black">
                                                    <MdCall style={{ cursor: 'pointer', markerStart: '10px' }} size='20px' /></a>
                                                    <a href={`https://wa.me/${el.Contact}`} target="_black">
                                            <BsWhatsapp style={{ marginLeft: "4px", cursor: 'pointer', markerStart: '10px' }}
                                             size='20px' /></a>
                                            </CTableDataCell>                                             <CTableDataCell className='text-center'>
                                                <CButton size='sm' color='danger' onClick={()=>deleteEnquiry('upgradecalls',el._id)}>
                                                   <MdDelete/>
                                                </CButton>
                                            </CTableDataCell>
                                         </CTableRow>                                        
                                        )}
                                       
                                      
                                    </CTableBody>
                                </CTable>
                            </CTabPane>
                            <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 2}>
                              
                                <CTable bordered borderColor="primary" responsive>
                                    <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                                        <CTableRow>
                                            <CTableHeaderCell scope="col">S.No</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Timing</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">
                                                Client_Id
                                            </CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Contact</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">
                                                service
                                            </CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Discussion</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Counseller</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Delete</CTableHeaderCell>

                                        </CTableRow>
                                    </CTableHead>
                                    <CTableBody>
                                    {renevalsCallData .filter((el)=>`${new Date(el.Date)?.getFullYear()}`.includes(selectedYear)&&
                                        `${new Date(el.Date)?.getMonth()}`.includes(selectedMonth)&&
                                        el?.Counseller?.includes(selectedEmployee)

                                        ).map((el,i)=>
                                         <CTableRow key={i}>
                                             <CTableDataCell>{i+1}</CTableDataCell>
                                             <CTableDataCell>{el.Date}</CTableDataCell>
                                             <CTableDataCell>{el.Timing}</CTableDataCell>
                                             <CTableDataCell>{el.Client_Id}</CTableDataCell>
                                             <CTableDataCell>{el.Name}</CTableDataCell>
                                             <CTableDataCell>{el.Contact}</CTableDataCell>
                                             <CTableDataCell>{el.Service}</CTableDataCell>
                                            <CTableDataCell>{el.Discussion}</CTableDataCell>
                                             <CTableDataCell>{el.Counseller}</CTableDataCell>

                                             <CTableDataCell className='text-center'>
                                                <a href={`tel:+91${el.Contact}`} target="_black">
                                                    <MdCall style={{ cursor: 'pointer', markerStart: '10px' }} size='20px' /></a>
                                                    <a href={`https://wa.me/${el.Contact}`} target="_black">
                                            <BsWhatsapp style={{ marginLeft: "4px", cursor: 'pointer', markerStart: '10px' }}
                                             size='20px' /></a>
                                            </CTableDataCell>                                             <CTableDataCell className='text-center'>
                                                <CButton size='sm' color='danger' onClick={()=>deleteEnquiry('renewalscalls',el._id)}>
                                                   <MdDelete/>
                                                </CButton>
                                            </CTableDataCell>

                                         </CTableRow>                                        
                                        )}
                                    </CTableBody>
                                </CTable>
                            </CTabPane>
                            <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 3}>
                               
                                <CTable bordered borderColor="primary" responsive>
                                    <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                                        <CTableRow>
                                            <CTableHeaderCell scope="col">S.No</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Timing</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">
                                                Client-Id
                                            </CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Contact</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">
                                                Service
                                            </CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Discussion</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Counseller</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Delete</CTableHeaderCell>

                                        </CTableRow>
                                    </CTableHead>
                                    <CTableBody>
                                    {crossCellCallsData .filter((el)=>`${new Date(el.Date)?.getFullYear()}`.includes(selectedYear)&&
                                        `${new Date(el.Date)?.getMonth()}`.includes(selectedMonth)&&
                                          el?.Counseller?.includes(selectedEmployee)
                                        ).map((el,i)=>
                                         <CTableRow key={i}>
                                             <CTableDataCell>{i+1}</CTableDataCell>
                                             <CTableDataCell>{el.Date}</CTableDataCell>
                                             <CTableDataCell>{el.Timing}</CTableDataCell>
                                             <CTableDataCell>{el.Client_Id}</CTableDataCell>
                                             <CTableDataCell>{el.Name}</CTableDataCell>
                                             <CTableDataCell>{el.Contact}</CTableDataCell>
                                             <CTableDataCell>{el.Service}</CTableDataCell>
                                             <CTableDataCell>{el.Discussion}</CTableDataCell>
                                             <CTableDataCell>{el.Counseller}</CTableDataCell>


                                             
                                             <CTableDataCell className='text-center'>
                                                <a href={`tel:+91${el.Contact}`} target="_black">
                                                    <MdCall style={{ cursor: 'pointer', markerStart: '10px' }} size='20px' /></a>
                                                    <a href={`https://wa.me/${el.Contact}`} target="_black">
                                            <BsWhatsapp style={{ marginLeft: "4px", cursor: 'pointer', markerStart: '10px' }}
                                             size='20px' /></a>
                                            </CTableDataCell>

                                            


                                             <CTableDataCell className='text-center'>
                                               <CButton size='sm' color='danger' onClick={()=>deleteEnquiry('crosssalecalls',el._id)}>
                                                   <MdDelete/>
                                                </CButton>
                                            </CTableDataCell>
                                         </CTableRow>                                        
                                        )}
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
export default SalesCall