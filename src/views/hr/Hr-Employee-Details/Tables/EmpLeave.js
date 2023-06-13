
import {
    CTable,
    CTableHead,
    CTableRow,
    CTableHeaderCell,
    CTableBody,
    CTableDataCell,
  } from "@coreui/react";
  import React from 'react'
  import { MdDelete } from "react-icons/md";
  import { useSelector } from "react-redux";
  import {useState,useEffect} from 'react'
  import axios from "axios";

  let user = JSON.parse(localStorage.getItem('user-info'))
  const token = user.token;

  const headers = {
    "Authorization": `Bearer ${token}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
   }

const EmpLeave = ({id}) => {


  const [empLeabveHistoryData,setEmpLeaveHistoryData] = useState([])
  const url = useSelector((el) => el.domainOfApi)


  async function getEmpLeaveListData  (){
    try{
      const response1 = await axios.get(`${url}/empleaveList/emp/${id}`,{headers})
      if(response1.status===200){
        setEmpLeaveHistoryData(response1.data.reverse())
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

  return (
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
        {empLeabveHistoryData.map((el,i)=>
         <CTableRow className="text-center">
         <CTableDataCell>{i+1}</CTableDataCell>
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

  )
}

export default EmpLeave
