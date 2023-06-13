import axios from 'axios';
import { useEffect,useCallback,useState } from 'react'
import { MdEdit,MdDelete } from 'react-icons/md';

import {  
    CFormInput,   
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CButton  
  } from '@coreui/react'

  import { useSelector } from 'react-redux'
  import { MdCall, MdMail } from "react-icons/md";
  import { BsWhatsapp } from "react-icons/bs";

import AllDietClientForm from '../form/AllDietClientForm';

function ClientDietTable ({closeFormFun,token,showForm,setForm,allMemberData,id}){
    const url = useSelector((el)=>el.domainOfApi) 


const [clientDite,setClientDite] =useState([])
const [edit,setEdit] = useState(false)
const [editData,setEditData] = useState([])



  const getClientDietData = useCallback(async ()=>{
    const {data} = await axios.get(`${url}/alldietclient`)

    
  if(id==='all-client-fitness'){
    setClientDite(data)
    return 
}else if(id){
    console.log(data,"hello")
    setClientDite(data.filter((el)=>el['Member_Id']===id))
    return 
}
   },[])
  
useEffect(()=>{
getClientDietData()
},[getClientDietData])





const deleteClientDitePlanFun =(id)=>{
    if(confirm('Do you want to delete it ')){

    }
    const  headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
     
    try{
    axios.delete(`${url}/alldietclient/${id}`,{headers})
    getClientDietData()
    }catch(error){
        console.log(error)
    }
}


const editClientDataFun =(el)=>{
    setEdit(true)
    setEditData(el)
    setForm(true)
}




return<>

{showForm && <AllDietClientForm
 closeFormFun={closeFormFun} 
 getClientDietData={getClientDietData}
 edit={edit}
 editData={editData}
 allMemberData={allMemberData}
/>}

<CTable className='m-3 p-2' align="middle" bordered style={{ borderColor: "#0B5345",width:'180%' }} hover responsive>
<CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
    <CTableRow >
        <CTableHeaderCell>Member ID</CTableHeaderCell>
        <CTableHeaderCell>Start Date</CTableHeaderCell>
        <CTableHeaderCell>Name</CTableHeaderCell>
        <CTableHeaderCell>Mobile.No</CTableHeaderCell>
        <CTableHeaderCell>Gender</CTableHeaderCell>
        <CTableHeaderCell>Purpose</CTableHeaderCell>
        <CTableHeaderCell>EndDate</CTableHeaderCell>
        <CTableHeaderCell>package</CTableHeaderCell>
        <CTableHeaderCell>Dietitian Name</CTableHeaderCell>
        <CTableHeaderCell>Delete/Edit</CTableHeaderCell>
      

     

    </CTableRow>
</CTableHead>
<CTableBody>
    <CTableRow>
        <CTableDataCell>
            <CFormInput
                className="mb-1"
                style={{ minWidth: "60px" }}
                type="text"
                aria-describedby="exampleFormControlInputHelpInline"
            />
        </CTableDataCell>
        <CTableDataCell>
            <CFormInput
                className="mb-1"
                style={{ minWidth: "120px" }}
                type="text"
                aria-describedby="exampleFormControlInputHelpInline"
            />
        </CTableDataCell>
        <CTableDataCell>
            <CFormInput
                className="mb-1"
                type="text"
                style={{ minWidth: "120px" }}
                aria-describedby="exampleFormControlInputHelpInline"
            />
        </CTableDataCell>
        <CTableDataCell>
            <CFormInput
                className="mb-1"
                type="text"
                style={{ minWidth: "90px" }}
               
                aria-describedby="exampleFormControlInputHelpInline"
            />
        </CTableDataCell>
        <CTableDataCell>
            <CFormInput
                className="mb-1"
                type="number"
                style={{ minWidth: "100px" }}
            
            />
        </CTableDataCell>
        <CTableDataCell>
            <CFormInput
                className="mb-1"
                type="text"
            />
        </CTableDataCell>
        <CTableDataCell>
            <CFormInput
                className="mb-1"
                type="text"
            />
        </CTableDataCell>
        <CTableDataCell>
            <CFormInput
                className="mb-1"
                type="text"
               
            />
        </CTableDataCell>
        <CTableDataCell>
            <CFormInput
                className="mb-1"
                type="text"
            />
        </CTableDataCell>
        <CTableDataCell>
            <CFormInput
                className="mb-1"
                type="text"
            />
        </CTableDataCell>
       
        
       
    </CTableRow>
    {clientDite.map((el)=>

    <CTableRow>                               
      <CTableDataCell>{el._id}</CTableDataCell>
      <CTableDataCell>{el.Start_Date}</CTableDataCell>
      <CTableDataCell>{el.Name}</CTableDataCell>
      <CTableDataCell>{el.Mobile_No}</CTableDataCell>
      <CTableDataCell>{el.Gender}</CTableDataCell>
      <CTableDataCell>{el.Purpose}</CTableDataCell>
      <CTableDataCell>{el.EndDate} </CTableDataCell>
      <CTableDataCell>{el.Package}</CTableDataCell>
      <CTableDataCell>{el.DietitianName}</CTableDataCell>
      <CTableDataCell className='text-center'>
    <CButton  className='mx-2' size='sm' onClick={()=>editClientDataFun(el)} ><MdEdit   /> </CButton>
    <CButton  className='mx-2' color='danger' size='sm' onClick={()=>deleteClientDitePlanFun(el._id)}><MdDelete    /></CButton>
    </CTableDataCell>

                    
   </CTableRow>


    )}
   
   
</CTableBody>
</CTable>
</>
}

export default ClientDietTable