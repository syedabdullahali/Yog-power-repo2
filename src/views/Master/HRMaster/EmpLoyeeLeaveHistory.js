

import {
  CButton,
  CCol,
  CRow,
  CFormSelect,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CPagination,
  CPaginationItem,

} from "@coreui/react";
  import React from 'react'
  import { MdDelete } from "react-icons/md";
  import { useSelector } from "react-redux";
  import {useState,useEffect} from 'react'
  import axios from "axios";
  import CustomSelectInput from './CustomSelectInput/CustomSelectInput';

  let user = JSON.parse(localStorage.getItem('user-info'))
  const token = user.token;

  const headers = {
    "Authorization": `Bearer ${token}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
   }

   const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const EmpLoyeeLeaveHistory = () => {


  const [empLeabveHistoryData,setEmpLeaveHistoryData] = useState([])
  const url = useSelector((el) => el.domainOfApi)
  const [pagination, setPagination] = useState(10)
  const [selectedYear,setSelectedYear] = useState('')
  const [selectedMonth,setSelectedMonth] = useState('')
  const [clientReferance,setClientReferance] = useState({
    clientName:'',
    clientId:''
  })
  const [yearArr,setYearArr] = useState([])
  const [staff,setStaff] = useState([])


let num =0
  async function getEmpLeaveListData  (){
    try{
      const response1 = await axios.get(`${url}/empleaveList/all`,{headers})
      if(response1.status===200){
        setEmpLeaveHistoryData(response1.data.reverse())
        setYearArr(response1.data.map((el)=>new Date(el.leaveDate).getFullYear()).filter((el,i,arr)=>i==arr.indexOf(el)))
        const map = new Map()
        const arrClient = []
        response1.data.forEach((el)=>{
          if(!map.has(el.MemberId)){
            map.set(el.MemberId,el) 
          }
        })

        for (const key of map.entries()){
          arrClient.push(key[1])
        }

        setStaff(arrClient)
      }
    }catch(error){
      console.log(error)
    }
    }
  
    useEffect(()=>{
      getEmpLeaveListData()
    },[])

    console.log(empLeabveHistoryData)

    function deleteLeave(id) {
        if (confirm('Do you want to delete this')) {
            fetch(`${url}/leaveSetUpMaster/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then((result) => {
                result.json().then((resp) => {
                    getLeaveSetupData()
                })
            })
        }
      }



      function clientObj(obj){
        setClientReferance(obj.empName)   
        setClientReferance(()=>({clientName:obj.empName,clientId:obj.MemberId})) 
     }

     function clearFilter(){
      setClientReferance(
        {
          clientName:'',
          clientId:''
        }
      )
      setSelectedYear('')
      setSelectedMonth('')
       }


       console.log(selectedMonth,selectedYear)

  return (
    <>

<CRow>

<CCol className='my-2' lg={4} md={4} sm={6}>
<CFormSelect
label='Filter By Year'
value={selectedYear}
onChange={(e)=>setSelectedYear(e.target.value)}
>
  {yearArr.map((el,i)=>{
   return <option key={i}>{el}</option>   
  })}
</CFormSelect>
</CCol> 

{
  <CCol className='my-2' lg={4} md={4} sm={6}>
<CFormSelect
label='Filter By Month'
value={selectedMonth}
onChange={(e)=>setSelectedMonth
  (e.target.value)}
>
  {  monthNames.map((el,i)=>{
   return <option key={i} value={i}>{el}</option>   
  })}
</CFormSelect>
</CCol> 
}

{<CCol lg={4} md={4} sm={6} className=' my-2'>
              <label className="mb-2">Select Employee</label>
                <CustomSelectInput data={staff} 
                title={clientReferance.clientName?.trim()?clientReferance.clientName:"Select Employee Name"}
                 getData={clientObj}/>
            </CCol>}

                   <CRow>
                      <CCol>
                        <CButton onClick={()=>clearFilter()}> Clear Filter</CButton>
                      </CCol>
                    </CRow>

</CRow>
    <CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345" }} hover responsive>
    <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
        <CTableRow >
            <CTableHeaderCell>Sr.No</CTableHeaderCell>
            <CTableHeaderCell>Created Date</CTableHeaderCell>
            <CTableHeaderCell>Leave Date</CTableHeaderCell>
            <CTableHeaderCell>End Date</CTableHeaderCell>
            <CTableHeaderCell>Emp Id</CTableHeaderCell>
            <CTableHeaderCell>Emp Name</CTableHeaderCell>
            <CTableHeaderCell>Use Leave</CTableHeaderCell>
            <CTableHeaderCell>Delete</CTableHeaderCell>
        </CTableRow>
    </CTableHead>
    <CTableBody>
        {empLeabveHistoryData.filter((el)=>
        el.MemberId.includes(clientReferance.clientId)&&
        (new Date(el.leaveDate).getFullYear()+"").includes(selectedYear)&&
        (new Date(el.leaveDate).getMonth()+"").includes(selectedMonth)

        ).filter((el, i) => {num++
                                if (pagination - 10 < i + 1 && pagination >= i + 1) {return el}}).map((el,i)=>
         <CTableRow className="text-center">
         <CTableDataCell>{i + 1 + pagination - 10}</CTableDataCell>
         <CTableDataCell>
            {new Date(el.createdAt).toLocaleDateString() +" "+
            new Date(el.createdAt).toLocaleTimeString()}
        </CTableDataCell>
         <CTableDataCell>{new Date(el.leaveDate).toLocaleDateString()}</CTableDataCell>
         <CTableDataCell>{new Date(new Date(el.leaveDate).setDate(+el.useLeave +new Date(el.leaveDate).getDate())).toLocaleDateString()}</CTableDataCell>
         <CTableDataCell>{el.empId}</CTableDataCell>
         <CTableDataCell>{el.empName}</CTableDataCell>
         <CTableDataCell>{el.useLeave}</CTableDataCell>
         <CTableDataCell><MdDelete onClick={()=> deleteLeave(el._id)} style={{cursor:'pointer'}}/></CTableDataCell>
      </CTableRow>
        )}  
    </CTableBody>
</CTable> 
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
</>
  )
}

export default EmpLoyeeLeaveHistory
// setDate(15)