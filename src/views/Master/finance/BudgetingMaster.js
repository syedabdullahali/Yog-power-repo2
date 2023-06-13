import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCardTitle,
    CCol,
    CForm,
    CFormInput,
    CFormSelect,
    CFormSwitch,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from "@coreui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
const url = 'https://yog-seven.vercel.app'
const url2 = 'https://yog-seven.vercel.app'
import { useSelector } from "react-redux";
import moment from "moment/moment";


const BudgetingMaster = () => {
    const [action1, setAction1] = useState(false)
    const [year, setYear] = useState("")
    const [budgetingCategory, setbudgetingCategory] = useState("")
    const [selectedMonth,setSelectedMonth] = useState('')   
    const [expenceAmount,setExpenceAmount] = useState('')    
    const [fees, setFees] = useState("")
    const [status, setStatus] = useState(false)
    const [packages, setPackages] = useState("")
    const [duration, setDuration] = useState("")
    const [yearData,setYearData] = useState([])
    const [yearFilter,setYearFilter] = useState('')
    const [categoryFilter,setCategoryFilter]= useState('')

    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;
    const username = user.user.username;
    const [budgetingMaster, setBudgetingMaster] = useState([]);
    const [getExpenceMaster,setExpenceMaster] = useState([])
    const url1 = useSelector((el)=>el.domainOfApi) 



    const [monthInput1, setMonthIput1] = useState('0')
    const [monthInput2, setMonthIput2] = useState('0')
    const [monthInput3, setMonthIput3] = useState('0')
    const [monthInput4, setMonthIput4] = useState('0')
    const [monthInput5, setMonthIput5] = useState('0')
    const [monthInput6, setMonthIput6] = useState('0')
    const [monthInput7, setMonthIput7] = useState('0')
    const [monthInput8, setMonthIput8] = useState('0')
    const [monthInput9, setMonthIput9] = useState('0')
    const [monthInput10, setMonthIput10] = useState('0')
    const [monthInput11, setMonthIput11] = useState('0')
    const [monthInput12, setMonthIput12] = useState('0')

    const allMonthName = [
        "Jan","Feb","Mar","Apr","May","Jun","Jul",
        "Aug","Sep","Oct","Nov","Dec"
    ]




    useEffect(() => {
        getSubService()
    }, []);

    function getSubService() {
        axios.get(`${url1}/budgetingMaster/all`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                setBudgetingMaster(res.data.reverse())
                setYearData(res.data.sort((a,b)=>new Date(a.BudgetYear).getFullYear()-
                new Date(b.BudgetYear).getFullYear())
                .map((el)=>new Date(el.BudgetYear).getFullYear()))
            })
            .catch((error) => {
                console.error(error)
            })
    }
    function deleteSubService(id) {
        fetch(`${url1}/budgetingMaster/delete/${id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((result) => {
            result.json().then((resp) => {
                console.warn(resp)
                getSubService()
            })
        })
    }

const UserData = budgetingMaster.find((el)=>
new Date(el.BudgetYear).getFullYear()===new Date(year).getFullYear()
&& el.CategoryName ===budgetingCategory
)
    console.log(new Date(year)?.getFullYear())

const yearSearch =new Date(year)?.getFullYear()

    useEffect(()=>{

console.log(UserData)

        if(!UserData){
                setMonthIput1('0')
                setMonthIput2('0')
                setMonthIput3('0')
                setMonthIput4('0')
                setMonthIput5('0')
                setMonthIput6('0')
                setMonthIput7('0')
                setMonthIput8('0')
                setMonthIput9('0')
                setMonthIput10('0')
                setMonthIput11('0')
                setMonthIput12('0')
                // setYear('0')  
            return
        }
          setMonthIput1(UserData.Jan)
          setMonthIput2(UserData.Feb)
          setMonthIput3(UserData.Mar)
          setMonthIput4(UserData.Apr)
          setMonthIput5(UserData.May)
          setMonthIput6(UserData.Jun)
          setMonthIput7(UserData.Jul)
          setMonthIput8(UserData.Aug)
          setMonthIput9(UserData.Sep)
          setMonthIput10(UserData.Oct)
          setMonthIput11(UserData.Nov)
        },[yearSearch,budgetingMaster[0]?._id,budgetingCategory])


    const saveSubservice = () => {
        
        let data = {   
            username: username,
            CategoryName: budgetingCategory,
            BudgetYear: year,
            Jan:monthInput1,
            Feb:monthInput2,
            Mar:monthInput3,
            Apr:monthInput4,
            May:monthInput5,
            Jun:monthInput6,
            Jul:monthInput7,
            Aug:monthInput8,
            Sep:monthInput9,
            Oct:monthInput10,
            Nov:monthInput11,
            Dec:monthInput12, 
        }


if(UserData){
    fetch(`${url1}/budgetingMaster/update/${UserData._id}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).then((resp) => {
        console.warn("resp",resp);;
        resp.json().then(() => {
            alert("successfully submitted")
            getSubService()
        })
    })
return
}

        fetch(`${url1}/budgetingMaster/create`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then((resp) => {
            console.warn("resp",resp);;
            resp.json().then(() => {
                alert("successfully submitted")
                getSubService()
            })
        })
    }

    




    const subserviceClose = () => {
        setAction1(!action1)
        setSelected_service('')
        setSub_Service_Name('')
        setFees("")
        setDuration('')
        setStatus(false)
    }

    function getExpress() {
        axios.get(`${url1}/expenseMaster/all`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                setExpenceMaster(res.data.reverse())
            })
            .catch((error) => {
                console.error(error)
            })
    }
    
    useEffect(()=>{
        getExpress()
    },[])


    console.log(yearData)


    return (
        <CCard className="mb-3 border-success">
            <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                <CCardTitle>Budgeting Master</CCardTitle>
            </CCardHeader>
            <CCardBody>
                <CForm className="mb-2">
                    <div className="d-flex justify-content-between">
                        <div></div>
                        <div>
                            <CRow>
                                <CCol>
                                    <CButton className="ms-1 mt-2" onClick={subserviceClose}>{action1 ? 'close' : 'Add Budget'}</CButton>
                                </CCol>
                            </CRow>
                        </div>
                    </div>
                    {action1 &&
                        <div>
                            <CRow className='mt-3'>
                                <CCol lg={6} md={6} sm={12}>
                                    <CFormSelect
                                        className="mb-2"
                                        type="text"
                                        id="exampleFormControlInput1"
                                        label="Category"
                                        value={budgetingCategory}
                                        onChange={(e) => setbudgetingCategory(e.target.value)}
                                        placeholder="Enter Tax Name"
                                    >
                                        <option>Select Category</option>
                                        {getExpenceMaster.map((el)=>{
                                            return  <option>{el.CategoryName
                                            }</option>
                                        })}
                                        
                                    
                                    </CFormSelect>
                                </CCol>
                                <CCol lg={6} md={6} sm={12}>
                                    <CFormInput
                                        className="mb-2"
                                        type="year"                                       
                                        id="exampleFormControlInput1"
                                        label="Year"
                                        value={year}
                                        onChange={(e) => setYear(e.target.value)}
                                        placeholder="Enter Year"
                                    />
                                </CCol>
                                

                                
                                

            <div style={{ overflowX: 'scroll' }} className='px-3 mb-3 '>
                <CTable className='mt-3' style={{ width: '200%' }}>
                    <CTableHead >
                        <CTableHeaderCell className=' '>Jan</CTableHeaderCell>
                        <CTableHeaderCell className=''>Feb</CTableHeaderCell>
                        <CTableHeaderCell className=''>March</CTableHeaderCell>
                        <CTableHeaderCell className=''>April</CTableHeaderCell>
                        <CTableHeaderCell className=''>May</CTableHeaderCell>
                        <CTableHeaderCell className=''>Jun</CTableHeaderCell>
                        <CTableHeaderCell className=''>July</CTableHeaderCell>
                        <CTableHeaderCell className=''>August</CTableHeaderCell>
                        <CTableHeaderCell className=''>Sep</CTableHeaderCell>
                        <CTableHeaderCell className=''>Oct</CTableHeaderCell>
                        <CTableHeaderCell className=''>Nov</CTableHeaderCell>
                        <CTableHeaderCell className=''>Dec</CTableHeaderCell>
                    </CTableHead>
                    <CTableBody>
                        <CTableRow>
                            <CTableDataCell>
                                <CFormInput type='number' value={monthInput1} onChange={(e) => setMonthIput1(e.target.value)}></CFormInput>
                            </CTableDataCell>
                            <CTableDataCell>
                                <CFormInput type='number' value={monthInput2} onChange={(e) => setMonthIput2(e.target.value)}></CFormInput>
                            </CTableDataCell>
                            <CTableDataCell>
                                <CFormInput type='number' value={monthInput3} onChange={(e) => setMonthIput3(e.target.value)}></CFormInput>
                            </CTableDataCell>
                            <CTableDataCell>
                                <CFormInput type='number' value={monthInput4} onChange={(e) => setMonthIput4(e.target.value)}></CFormInput>
                            </CTableDataCell>
                            <CTableDataCell>
                                <CFormInput type='number' value={monthInput5} onChange={(e) => setMonthIput5(e.target.value)}></CFormInput>
                            </CTableDataCell>
                            <CTableDataCell>
                                <CFormInput type='number' value={monthInput6} onChange={(e) => setMonthIput6(e.target.value)}></CFormInput>
                            </CTableDataCell>
                            <CTableDataCell>
                                <CFormInput type='number' value={monthInput7} onChange={(e) => setMonthIput7(e.target.value)}></CFormInput>
                            </CTableDataCell>
                            <CTableDataCell>
                                <CFormInput type='number' value={monthInput8} onChange={(e) => setMonthIput8(e.target.value)}></CFormInput>
                            </CTableDataCell>
                            <CTableDataCell>
                                <CFormInput type='number' value={monthInput9} onChange={(e) => setMonthIput9(e.target.value)}></CFormInput>
                            </CTableDataCell>
                            <CTableDataCell>
                                <CFormInput type='number' value={monthInput10} onChange={(e) => setMonthIput10(e.target.value)}></CFormInput>
                            </CTableDataCell>
                            <CTableDataCell>
                                <CFormInput type='number' value={monthInput11} onChange={(e) => setMonthIput11(e.target.value)}></CFormInput>
                            </CTableDataCell>
                            <CTableDataCell>
                                <CFormInput type='number' value={monthInput12} onChange={(e) => setMonthIput12(e.target.value)}></CFormInput>
                            </CTableDataCell>
                        </CTableRow>
                    </CTableBody>
                </CTable>
            </div>

           



                                <CCol className="mt-2" lg={6} md={6} sm={12}>
                                    <CButton className="mt-2" onClick={saveSubservice}>Save</CButton>
                                </CCol>
                            </CRow>
                        </div>
                    }
                </CForm>
                <CRow>
                <CCol lg={4} md={6} sm={12} className='mb-2'>
                                    <CFormSelect
                                    value={yearFilter}
                                    onChange={(e)=>setYearFilter(e.target.value)}
                                    label='Year Filter'
                                    >
                                     <option>Selected Year</option>
                                     {
                                    yearData.map((el)=><option>{el}</option>)

                                     }
                                     </CFormSelect>


            </CCol>
            <CCol lg={4} md={6} sm={12} className='mb-2'>
                                    <CFormSelect
                                    label='Category Filter '
                                    type="number"
                                    placeholder="'Enter Expense"  
                                    value={categoryFilter}
                                    onChange={(e)=>setCategoryFilter(e.target.value)}                                
                                    >
                                    <option>Select Category</option>
                                    {getExpenceMaster.map((el)=>{
                                            return  <option>{el.CategoryName
                                            }</option>
                                        })}
                                    </CFormSelect>
            </CCol> 
            </CRow>
                <CCol>
                    <CButton onClick={()=>{
                        setYearFilter('')
                        setCategoryFilter('')
                    }}>Clear Filter</CButton>
                </CCol>

                <CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345" }} hover responsive>
                    <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                        <CTableRow >
                            <CTableHeaderCell>Sr.No</CTableHeaderCell>
                            <CTableHeaderCell>Category Name</CTableHeaderCell>
                            <CTableHeaderCell>Budget Year</CTableHeaderCell>
                            <CTableHeaderCell>Jan</CTableHeaderCell>
                            <CTableHeaderCell>Feb</CTableHeaderCell>
                            <CTableHeaderCell>Mar</CTableHeaderCell>
                            <CTableHeaderCell>Apr</CTableHeaderCell>
                            <CTableHeaderCell>May</CTableHeaderCell>
                            <CTableHeaderCell>Jun</CTableHeaderCell>
                            <CTableHeaderCell>Jul</CTableHeaderCell>
                            <CTableHeaderCell>Aug</CTableHeaderCell>
                            <CTableHeaderCell>Sep</CTableHeaderCell>
                            <CTableHeaderCell>Oct</CTableHeaderCell>
                            <CTableHeaderCell>Nov</CTableHeaderCell>
                            <CTableHeaderCell>Dec</CTableHeaderCell>
                            <CTableHeaderCell>Action</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {budgetingMaster.filter((el)=>
                        (+" "+moment(el.BudgetYear).format('YYYY')).includes(yearFilter)&&
                        el.CategoryName.includes(categoryFilter)
                        ).map((item, index) => {
                          return  item.username === username && (
                            <CTableRow key={index}>
                                    <CTableDataCell>{index + 1}</CTableDataCell>
                                    <CTableDataCell>{item.CategoryName}</CTableDataCell>
                                    <CTableDataCell className="text-center">{moment(item.BudgetYear).format('YYYY')}</CTableDataCell>
                                    <CTableDataCell>{item.Jan}</CTableDataCell>
                                    <CTableDataCell>{item.Feb}</CTableDataCell>
                                    <CTableDataCell>{item.Mar}</CTableDataCell>
                                    <CTableDataCell>{item.Apr}</CTableDataCell>
                                    <CTableDataCell>{item.May}</CTableDataCell>
                                    <CTableDataCell>{item.Jun}</CTableDataCell>
                                    <CTableDataCell>{item.Jul}</CTableDataCell>
                                    <CTableDataCell>{item.Aug}</CTableDataCell>
                                    <CTableDataCell>{item.Sep}</CTableDataCell>
                                    <CTableDataCell>{item.Oct}</CTableDataCell>
                                    <CTableDataCell>{item.Nov}</CTableDataCell>
                                    <CTableDataCell>{item.Dec}</CTableDataCell>
                                    <CTableDataCell> <MdDelete style={{ cursor: 'pointer', markerStart: '10px' }}
                                     onClick={() => deleteSubService(item._id)} size='20px' /> </CTableDataCell>
                             </CTableRow>
                            )
                            })}
                    </CTableBody>
                </CTable>
            </CCardBody>
        </CCard>
    );
};

export default BudgetingMaster;