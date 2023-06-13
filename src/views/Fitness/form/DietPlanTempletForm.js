import { CForm, CCard, CNav, CCol, CFormInput, CRow, CButton, CFormSelect } from "@coreui/react"
import { useEffect, useState } from "react"
import axios from "axios"
import { useSelector } from "react-redux"

function DietPlanTempletForm({ closeFormFun, getClientDietData,edit,editData }) {

    const [diteplan,setDitePlan] =useState({
        Sr_No: ' ',
        Diet_Plan_Name:' ',
        Diet_Duration:' ',
        Format:' ',
        Action:' '
    })
    
    const url = useSelector((el)=>el.domainOfApi) 


    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;

    const  sumbitFormInfoHandler = async (e)=>{
        const  headers = {
            "Authorization": `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
        
        if(edit){
            try{
            axios.put(`${url}/dietplantemplate/${editData?._id}`,diteplan ,{headers})
            alert('Save successfully ')
            getClientDietData()
            }catch(error){
                console.log(error)
            }
            return 
        }
         
        try{
         axios.post(`${url}/dietplantemplate`,diteplan ,{headers})
        getClientDietData()
        alert('Save successfully ')
        }catch(error){
            console.log(error)
        }
}


useEffect(()=>{
if(!edit)return 
setDitePlan({
    Sr_No: ' ',
    Diet_Plan_Name:editData.Diet_Plan_Name,
    Diet_Duration:editData.Diet_Duration,
    Format:editData.Format,
    Action:' '
})
},[editData?._id])



    return <CCard className="m-3 overflow-hidden" >
        <CNav className="p-2 px-3" style={{ background: '#0B5345' }}>
            <h3 className="text-white"  >Diet Plan Form</h3>
        </CNav>
        <CForm className="p-3">

            <CCol className="d-flex justify-content-end">
                <CButton className="bg-danger  text-black " onClick={() => closeFormFun()}> close</CButton>
            </CCol>

            <h4 style={{ marginBottom: '2rem' }}>Diet Plan</h4>

            <CRow className='mt-lg-4'>
                <CCol className='d-flex justify-content-between my-2' lg={6}>
                    <h5>Diet Plan Name</h5>
                    <CFormInput
                        type="text"
                        className="w-50"
                        placeholder="Diet Plan Name"
                        value={diteplan.Diet_Plan_Name}
                        onChange={(e)=>setDitePlan(prev=>({...prev,Diet_Plan_Name:e.target.value}))}
                    />
                </CCol>

                <CCol className='d-flex justify-content-between my-2 ' lg={6} >
                    <h5 >Diet Duretion</h5>
                    <CFormInput
                        type="text"
                        className="w-50"
                        placeholder="Enter your Diet Duretion"
                        value={diteplan.Diet_Duration}
                        onChange={(e)=>setDitePlan(prev=>({...prev,Diet_Duration:e.target.value}))}

                    />
                </CCol>
            </CRow>



            <CRow className='mt-lg-4'>
                <CCol className='d-flex justify-content-between my-2' lg={6}>
                    <h5>Format</h5>
                 
                    <CFormSelect
                        type="text"
                        className="w-50"
                        placeholder=" Diet  Formet"
                        value={diteplan.Format}
                        onChange={(e)=>setDitePlan(prev=>({...prev,Format:e.target.value}))}
                    >
                        <option>Select Formet</option>
                        <option>JPEG.</option>
                        <option>PNG.</option>
                        <option>GIF.</option>
                        <option>PDF.</option>
                        <option>SVG.</option>
                        <option>MP4.</option>

                    </CFormSelect>
                </CCol>

            </CRow>


        </CForm>
        <CCol className="p-3">
            <CButton onClick={()=>sumbitFormInfoHandler()}>Save Diet Plan</CButton>
        </CCol>

        <CCol className="d-flex justify-content-around p-1 text-white " style={{ background: '#0B5345' }}>

        </CCol>


    </CCard>

}

export default DietPlanTempletForm