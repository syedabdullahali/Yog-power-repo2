import axios from 'axios';
import { useEffect,useCallback,useState } from 'react'
import FitnessMeasurmentForm from '../form/FitnessMeasurmentForm';

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
  import { MdDelete,MdEdit } from 'react-icons/md';


function MeasurementTable({closeFormFun,token,showForm,setForm,allMemberData,id}){
    const [allMeasurmentMembers,setAllMeasurmentMembers] =useState([])
    const [edit,setEdit] = useState(true)
    const [editData,setEditData] = useState(true)

    const url = useSelector((el)=>el.domainOfApi) 
    const headers = {
    'Authorization': `Bearer ${token}`
   }

  const getAllmembersData = useCallback(async ()=>{

    const {data} = await axios.get(`${url}/fitnessDetail/all`,{headers})
    if(id==='all-client-fitness'){
        setAllMeasurmentMembers(data)
        return 
    }else if(id){
        setAllMeasurmentMembers(data.filter((el)=>el['Member_ID']===id))
        return 
    }
   },[])
  
useEffect(()=>{
getAllmembersData()
},[getAllmembersData])


const deleteClientDitePlanFun =(id)=>{
    if(confirm('Do you want to delete it')){

    }
    const  headers = {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
     
    try{
    axios.delete(`${url}/fitnessDetail/delete/${id}`,{headers})
    getAllmembersData()
    }catch(error){
        console.log(error)
    }
}


const editClientDataFun =(el)=>{
    setEdit(true)
    setEditData(el)
    setForm(true)
}



    return <>

    
{showForm && <FitnessMeasurmentForm
 closeFormFun={closeFormFun} 
 getAllmembersData={ getAllmembersData}
 edit={edit}
 editData={editData}
 allMemberData={allMemberData}
/>}

     <CTable className='m-3 ' align="middle" bordered style={{ borderColor: "#0B5345",width:'440%' }} hover responsive>
    <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
        <CTableRow >
            <CTableHeaderCell>Measurement_Date</CTableHeaderCell>
            <CTableHeaderCell>Member_ID</CTableHeaderCell>
            {/* <CTableHeaderCell>Apply Date</CTableHeaderCell> */}
            <CTableHeaderCell>Name</CTableHeaderCell>
            <CTableHeaderCell>Contact</CTableHeaderCell>
            <CTableHeaderCell>Weight</CTableHeaderCell>
            <CTableHeaderCell>Height</CTableHeaderCell>
            <CTableHeaderCell>BMI</CTableHeaderCell>
            <CTableHeaderCell>Age</CTableHeaderCell>
            <CTableHeaderCell>Fat</CTableHeaderCell>
            <CTableHeaderCell>Neck</CTableHeaderCell>
            <CTableHeaderCell>Shoulder</CTableHeaderCell>
            <CTableHeaderCell>Chest</CTableHeaderCell>
            <CTableHeaderCell>Arms(R)</CTableHeaderCell>

            <CTableHeaderCell>Arms(L)</CTableHeaderCell>
            <CTableHeaderCell>ForArms</CTableHeaderCell>
            <CTableHeaderCell>Waist</CTableHeaderCell>
            <CTableHeaderCell>Hips</CTableHeaderCell>

            
            <CTableHeaderCell>Thigh(R)</CTableHeaderCell>
            <CTableHeaderCell>Thigh(L)</CTableHeaderCell>
            <CTableHeaderCell>Calf(R)</CTableHeaderCell>
            <CTableHeaderCell>Calf(L)</CTableHeaderCell>

            <CTableHeaderCell>Counseller</CTableHeaderCell>
            <CTableHeaderCell>NextFollowup_Date</CTableHeaderCell>
            <CTableHeaderCell>Edit/Delete</CTableHeaderCell>

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
            <CTableDataCell>
                <CFormInput
                    className="mb-1"
                    type="text"
                />
            </CTableDataCell>
            <CTableDataCell>
                <CFormInput
                    className="mb-1"
                    type="number"                                           
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
                    style={{ minWidth: "70px" }}
                    type="text"
                />
            </CTableDataCell>
            <CTableDataCell>
                <CFormInput
                    className="mb-1"
                    style={{ minWidth: "100px" }}
                    type="text"
                />
            </CTableDataCell>
            <CTableDataCell>
                <CFormInput
                    className="mb-1"
                    style={{ minWidth: "70px" }}
                    type="text"
                />
            </CTableDataCell>
            <CTableDataCell>
                <CFormInput
                    className="mb-1"
                    style={{ minWidth: "70px" }}
                    type="text"
                />
            </CTableDataCell>
            <CTableDataCell>
                <CFormInput
                    className="mb-1"
                    style={{ minWidth: "70px" }}
                    type="text"
                />
            </CTableDataCell>
            <CTableDataCell>
                <CFormInput
                    className="mb-1"
                    style={{ minWidth: "70px" }}
                    type="text"
                />
            </CTableDataCell>
            <CTableDataCell>
                <CFormInput
                    className="mb-1"
                    style={{ minWidth: "70px" }}
                    type="text"
                />
            </CTableDataCell>
            <CTableDataCell>
                <CFormInput
                    className="mb-1"
                    style={{ minWidth: "70px" }}
                    type="text"
                />
            </CTableDataCell>
            <CTableDataCell>
                <CFormInput
                    className="mb-1"
                    style={{ minWidth: "70px" }}
                    type="text"
                />
            </CTableDataCell>
           
        </CTableRow>
         
                  {allMeasurmentMembers.map((el)=>
                   <CTableRow>                       
                    <CTableDataCell>{new Date(el.createdAt).toLocaleDateString()}</CTableDataCell>
                    <CTableDataCell>{el['Member_ID']}</CTableDataCell>
                    {/* <CTableDataCell>{new Date(el.updatedAt).toLocaleDateString()}</CTableDataCell> */}
                    <CTableDataCell>{el.Fullname}</CTableDataCell>
                    <CTableDataCell>{el.ContactNumber}</CTableDataCell>
                    <CTableDataCell>{el.Weight}</CTableDataCell>
                    <CTableDataCell>{el.Height}</CTableDataCell>
                    <CTableDataCell>{el.BMI}</CTableDataCell>
                    <CTableDataCell>{el.Age}</CTableDataCell>
                    <CTableDataCell>{el.Fat}</CTableDataCell>
                    <CTableDataCell>{el.Neck}</CTableDataCell>
                    <CTableDataCell>{el.Shoulder}</CTableDataCell>
                    <CTableDataCell>{el.Chest}</CTableDataCell>
                    <CTableDataCell>{el.ArmsR}</CTableDataCell>      
                    <CTableDataCell>{el.ArmsL}</CTableDataCell>
                    <CTableDataCell>{el.ForArms}</CTableDataCell>
                    <CTableDataCell>{el.Waist}</CTableDataCell>
                    <CTableDataCell>{el.Hips}</CTableDataCell>  
                    <CTableDataCell>{el.ThighR}</CTableDataCell>
                    <CTableDataCell>{el.ThighL}</CTableDataCell>
                    <CTableDataCell>{el.CalfR}</CTableDataCell>
                    <CTableDataCell>{el.CalfL}</CTableDataCell>  
                    <CTableDataCell>{el.Counseller}</CTableDataCell>
                    <CTableDataCell>{new Date(el.NextFollowup_Date).toLocaleDateString()}</CTableDataCell>
                    <CTableDataCell className='text-center'>
                               <CButton  className='mx-2' size='sm' onClick={()=>editClientDataFun(el)} ><MdEdit   /> </CButton>
                               <CButton  className='mx-2' color='danger' size='sm' onClick={()=>deleteClientDitePlanFun(el._id)}><MdDelete    /></CButton>
                    </CTableDataCell>
                    </CTableRow>)}
           
    </CTableBody>
</CTable>
</>
}

export default MeasurementTable