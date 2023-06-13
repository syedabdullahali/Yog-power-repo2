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
import { useSelector } from "react-redux";
import moment from "moment/moment";
import axios from 'axios';
let user = JSON.parse(localStorage.getItem('user-info'))
const token = user.token;
const username = user.user.username;


const CenterExpense = () => {


    const url1 = useSelector((el)=>el.domainOfApi) 
    const [centerExpense,setCenterExpense] = useState([])
    const [yearData,setYearData] = useState([])
    const [yearFilter,setYearFilter] = useState('')
    const [categoryFilter,setCategoryFilter]= useState('')
    const [getExpenceMaster,setExpenceMaster] = useState([])


const allMonthName = [
        "Jan","Feb","Mar","Apr","May","Jun","Jul",
        "Aug","Sep","Oct","Nov","Dec"
]
    



async function getSubService() {
 try{
 const response1 =  axios.get(`${url1}/budgetingMaster/all`, { headers: {
        'Authorization': `Bearer ${token}`}})
 const response2 =  axios.get(`${url1}/dailyexpense`, { headers: {
       'Authorization': `Bearer ${token}`}})

 const data = await Promise.all([response1,response2])

 console.log(data[0].data)
 console.log(data[1].data)

;
const budgetingExpense =  [...data[0].data].map((el)=>{
    const yearBudgetingExpense = {
        "ExpensesCategory":"",
        "BudgetingYear":"",
         "BudgetEx":[
         {"Jan":0,"Jan2":0},
         {"Feb":0,"Feb2":0},
         {"Mar":0,"Mar2":0},
         {"Apr":0,"Apr2":0},
         {"May":0,"May2":0},
         {"Jun":0,"Jun2":0},
         {"Jul":0,"Jul2":0},
         {"Aug":0,"Aug2":0},
         {"Sep":0,"Sep2":0},
         {"Oct":0,"Oct2":0},
         {"Nov":0,"Nov2":0},
         {"Dec":0,"Dec2":0}
     ]
     }    
yearBudgetingExpense.ExpensesCategory=el.CategoryName
yearBudgetingExpense.BudgetingYear= new Date(el.BudgetYear).getFullYear()
yearBudgetingExpense.BudgetEx[0].Jan=el.Jan
yearBudgetingExpense.BudgetEx[1].Feb=el.Feb
yearBudgetingExpense.BudgetEx[2].Mar=el.Mar
yearBudgetingExpense.BudgetEx[3].Apr=el.Apr
yearBudgetingExpense.BudgetEx[4].May=el.May
yearBudgetingExpense.BudgetEx[5].Jun=el.Jun
yearBudgetingExpense.BudgetEx[6].Jul=el.Jul
yearBudgetingExpense.BudgetEx[7].Aug=el.Aug
yearBudgetingExpense.BudgetEx[8].Sep=el.Sep
yearBudgetingExpense.BudgetEx[9].Oct=el.Oct
yearBudgetingExpense.BudgetEx[10].Nov=el.Nov
yearBudgetingExpense.BudgetEx[11].Dec=el.Dec

return yearBudgetingExpense
})

budgetingExpense.forEach((el,i)=>{
data[1].data.forEach((el2)=>{
    if(el.ExpensesCategory ===el2.Expense_Category && el.BudgetingYear=== new Date(el2.Date).getFullYear()){
        console.log(el,"parnet")
        console.log(el2)
    el.BudgetEx.forEach((el3)=>{
     const keysName = Object.keys(el3)
     if(keysName[0]===allMonthName[new Date(el2.Date).getMonth()]){
       el3[keysName[1]]+= +el2.Amount
     }
    })
    }
})
})

setCenterExpense(budgetingExpense)
setYearData(budgetingExpense.sort((a,b)=>a.BudgetingYear-b.BudgetingYear).map((el)=>el.BudgetingYear))

 }catch{

 }
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
getSubService()
    },[])




    return (
        <CRow>
            <CCol lg={12} sm={12}>
                <CCard className='mb-3 border-top-success border-top-3'>
                    <CCardHeader>
                        <strong className="mt-2">Center Expense</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CRow>
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
                        </CRow>            
                <CCol className='mb-4'>
                    <CButton onClick={()=>{
                        setYearFilter('')
                        setCategoryFilter('')
                    }}>Clear Filter</CButton>
                </CCol>           
                        <CTable bordered style={{ borderColor: "#106103",width:'250%' }} responsive>
                            <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }}>
                                <CTableRow>
                                    <CTableHeaderCell scope="col">Sr No</CTableHeaderCell>
                                    <CTableHeaderCell scope="col" >Expenses Category</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Budgeting Year</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">
                                        Jan Budgeting
                                    </CTableHeaderCell>
                                    <CTableHeaderCell scope="col">
                                        Jan Expense
                                    </CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Feb Budgeting</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Feb Expense</CTableHeaderCell>

                                    <CTableHeaderCell scope="col">Mar Budgeting</CTableHeaderCell>                                    
                                    <CTableHeaderCell scope="col">Mar Expense</CTableHeaderCell>

                                    <CTableHeaderCell scope="col">Apr Budgeting</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Apr Expense</CTableHeaderCell>

                                    <CTableHeaderCell scope="col">May Budgeting</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">May Expense</CTableHeaderCell>

                                    <CTableHeaderCell scope="col">Jun Budgeting</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Jun Expense</CTableHeaderCell>

                                    <CTableHeaderCell scope="col">Jul Budgeting</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Jul Expense</CTableHeaderCell>

                                    <CTableHeaderCell scope="col">Aug  Budgeting</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Aug Expense</CTableHeaderCell>

                                    <CTableHeaderCell scope="col">Sep Budgeting</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Sep Expense</CTableHeaderCell>


                                    <CTableHeaderCell scope="col">Oct Budgeting</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Oct Expense</CTableHeaderCell>

                                    <CTableHeaderCell scope="col">Nov Budgeting</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Nov Expense</CTableHeaderCell>

                                    <CTableHeaderCell scope="col">Dec Budgeting</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Dec Expense</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Total Budgeting</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Total Expense</CTableHeaderCell>

                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {centerExpense.filter((el)=>
                        (" "+el.BudgetingYear).includes(yearFilter)&&
                        el.ExpensesCategory.includes(categoryFilter)
                        ).map((item,index)=>{
                                    console.log(item)

                                    return  (
                                        <CTableRow key={index}>
                                                <CTableDataCell>{index + 1}</CTableDataCell>
                                                <CTableDataCell>{item.ExpensesCategory}</CTableDataCell>
                                                <CTableDataCell className="text-center">{item.BudgetingYear}
                                                </CTableDataCell>
                                                {/* <CTableDataCell></CTableDataCell> */}
                                                <CTableDataCell >{item.BudgetEx[0].Jan}</CTableDataCell>
                                                <CTableDataCell color='success'>{item.BudgetEx[0].Jan2}</CTableDataCell>

                                                <CTableDataCell>{item.BudgetEx[1].Feb}</CTableDataCell>
                                                <CTableDataCell  color='success'>{item.BudgetEx[1].Feb2}</CTableDataCell>

                                                <CTableDataCell>{item.BudgetEx[2].Mar}</CTableDataCell>
                                                <CTableDataCell  color='success'>{item.BudgetEx[2].Mar2}</CTableDataCell>

                                                <CTableDataCell >{item.BudgetEx[3].Apr}</CTableDataCell>
                                                <CTableDataCell  color='success'>{item.BudgetEx[3].Apr2}</CTableDataCell>

                                                <CTableDataCell>{item.BudgetEx[4].May}</CTableDataCell>
                                                <CTableDataCell color='success'>{item.BudgetEx[4].May2}</CTableDataCell>

                                                <CTableDataCell>{item.BudgetEx[5].Jun}</CTableDataCell>
                                                <CTableDataCell  color='success'>{item.BudgetEx[5].Jun2}</CTableDataCell>

                                                <CTableDataCell>{item.BudgetEx[6].Jul}</CTableDataCell>
                                                <CTableDataCell  color='success' >{item.BudgetEx[6].Jul2}</CTableDataCell>

                                                <CTableDataCell>{item.BudgetEx[7].Aug}</CTableDataCell>
                                                <CTableDataCell color='success'>{item.BudgetEx[7].Aug2}</CTableDataCell>

                                                <CTableDataCell>{item.BudgetEx[8].Sep}</CTableDataCell>
                                                <CTableDataCell color='success'>{item.BudgetEx[8].Sep2}</CTableDataCell>

                                                <CTableDataCell>{item.BudgetEx[9].Oct}</CTableDataCell>
                                                 <CTableDataCell color='success'>{item.BudgetEx[9].Oct2}</CTableDataCell>

                                                <CTableDataCell>{item.BudgetEx[10].Nov}</CTableDataCell>
                                                <CTableDataCell color='success'>{item.BudgetEx[10].Nov2}</CTableDataCell>

                                                <CTableDataCell>{item.BudgetEx[11].Dec}</CTableDataCell>
                                                <CTableDataCell color='success' >{item.BudgetEx[11].Dec2}</CTableDataCell>
                                                <CTableDataCell  >{"Rs" +item.BudgetEx.reduce((crr,el,i)=>{
                                               const  anualBudget = Object.values(el)
                                                crr+= +anualBudget[0] 
                                                return crr
                                                } ,0)} </CTableDataCell>
                                                <CTableDataCell color='success' >
                                                {"Rs" +item.BudgetEx.reduce((crr,el,i)=>{
                                               const  anualBudget = Object.values(el)
                                                crr+= +anualBudget[1] 
                                                return crr
                                                } ,0)}
                                                </CTableDataCell>

                                         </CTableRow>
                                        )

                                })}
                         
                            
                            </CTableBody>
                        </CTable>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default CenterExpense;
