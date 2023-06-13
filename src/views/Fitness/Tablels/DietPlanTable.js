import axios from 'axios';
import { useEffect,useCallback,useState } from 'react'

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
  import { BsWhatsapp } from "react-icons/bs";
  import { MdCall, MdDelete, MdEdit, MdMail } from "react-icons/md";
  import DietPlanTempletForm from '../form/DietPlanTempletForm';


function DietPlanTable({closeFormFun,token,showForm,setForm}){

 const url = useSelector((el)=>el.domainOfApi) 


const [Diteplan,setDitePlan] =useState([])
const [edit,setEdit] = useState(true)
const [editData,setEditData] = useState(true)



  const getClientDietData = useCallback(async ()=>{
    const {data} = await axios.get(`${url}/dietplantemplate`)
    setDitePlan(data)
  console.log(data)
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
    axios.delete(`${url}/dietplantemplate/${id}`,{headers})
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
    {showForm && <DietPlanTempletForm 
    closeFormFun={closeFormFun} 
    getClientDietData={getClientDietData}
    edit={edit}
    editData={editData}
    
    
    /> }
    <CTable className='m-3 p-2' align="middle" bordered style={{ borderColor: "#0B5345",width:'120%' }} hover responsive>
    <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
        <CTableRow >
            <CTableHeaderCell>Sr No</CTableHeaderCell>
            <CTableHeaderCell>Diet plan name</CTableHeaderCell>
            <CTableHeaderCell>Diet Duretion</CTableHeaderCell>
            <CTableHeaderCell>Format</CTableHeaderCell>
            <CTableHeaderCell>Edit Delete</CTableHeaderCell>
           
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
                                        
        </CTableRow>
        { Diteplan.map((el,i)=>

 <CTableRow key={i}>                               
  <CTableDataCell>{i+1}</CTableDataCell>
  <CTableDataCell>{el.Diet_Plan_Name}</CTableDataCell>
  <CTableDataCell>{el.Diet_Duration}</CTableDataCell>
  <CTableDataCell>{el.Format}</CTableDataCell>
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

export default DietPlanTable