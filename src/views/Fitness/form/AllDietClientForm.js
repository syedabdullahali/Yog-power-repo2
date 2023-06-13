import { CForm, CCard, CNav, CCol, CFormInput, CRow, CButton, CFormSelect } from "@coreui/react"
import { useSelector } from 'react-redux'
import { useState,useEffect } from "react"
import CustomSelectInput from "../CustomSelectInput/CustomSelectInput"
import axios from "axios"

function AllDietClientForm({allMemberData, closeFormFun, getClientDietData,edit,editData }) {

    const [allDiietClientData,setAllDietClient] = useState({
        Member_Id: ' ',
        Start_Date: ' ',
        Name: ' ',
        Mobile_No:' ',
        Gender: ' ',
        Purpose: ' ',
        EndDate: ' ',
        Package: ' ',
        DietitianName:' ',
        Action:'no action',
    })
    
    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;
    
    

    const url = useSelector((el)=>el.domainOfApi) 

const  sumbitFormInfoHandler = async (e)=>{
    
         const  headers = {
            "Authorization": `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }

        try{

       if(edit){
          axios.put(`${url}/alldietclient/${editData._id}`,allDiietClientData ,{headers}).then((el)=>{
           alert('Successfully save')
           getClientDietData()
          })
        return 
       }
       axios.post(`${url}/alldietclient`,allDiietClientData ,{headers})
       alert('Successfully save')
       getClientDietData()

        }catch(error){
            console.log(error)
        }
}

function clientObj(obj){
    setAllDietClient((prev)=>({...prev,Mobile_No:obj.ContactNumber}))
    setAllDietClient((prev)=>({...prev,Name:obj.Fullname}))
    setAllDietClient((prev)=>({...prev,Member_Id:obj._id}))

 }


 useEffect(()=>{
    if(!edit)return 
    setAllDietClient({
        Member_Id: editData.Member_Id,
        Start_Date: editData.Start_Date,
        Name: editData.Name,
        Mobile_No:editData.Mobile_No,
        Gender: editData.Gender,
        Purpose:  editData.Purpose,
        EndDate: editData.EndDate,
        Package: editData.Package,
        DietitianName:editData.DietitianName,
        Action:editData.Action,
    })
    },[editData?._id])

    console.log(allDiietClientData)

    return <CCard className="m-3 overflow-hidden" >
        <CNav className="p-2 px-3" style={{ background: '#0B5345' }}>
            <h3 className="text-white"  > Client Diet Form</h3>
        </CNav>
        <CForm className="p-3">

            <CCol className="d-flex justify-content-end">
                <CButton className="bg-danger  text-black " onClick={() => closeFormFun()}> close</CButton>
            </CCol>

            <h4 style={{ marginBottom: '2rem' }}>Info</h4>

            <CRow className='mt-lg-4'>
                <CCol className='d-flex justify-content-between my-2' lg={6}>
                    <h5>Name</h5>
                    
                    <div className="w-50">
                    <CustomSelectInput  data={allMemberData} title={allDiietClientData?.Name?.trim()?allDiietClientData?.Name:"Select client name"} getData={clientObj}/>
                    </div>         
                </CCol>

                <CCol className='d-flex justify-content-between my-2 ' lg={6} >
                    <h5 >Contact</h5>
                    <CFormInput
                        type="number"
                        className="w-50"
                        placeholder="Enter your contact number"
                        value={allDiietClientData.Mobile_No}
                    />
                </CCol>
            </CRow>



            <CRow className='mt-lg-4'>
                <CCol className='d-flex justify-content-between my-2' lg={6}>
                    <h5>Gender</h5>
                    <CFormSelect 
                    aria-label="Default select example" 
                    className="w-50 "
                    value={allDiietClientData.Gender}
                    onChange={(e)=>setAllDietClient((prev)=>({...prev,Gender:e.target.value}))}


                    >
                        <option value="1">Male</option>
                        <option value="2">Female</option>
                    </CFormSelect>
                </CCol>

                <CCol className='d-flex justify-content-between my-2 ' lg={6} >
                </CCol>
            </CRow>




            <h3 style={{ margin: '2rem 0' }} >Diet Info </h3>

            <CRow className='mt-lg-4'>
                <CCol className='d-flex justify-content-between my-2' lg={6}>
                    <h5 >Purpose</h5>
                    <CFormInput
                        type="text"
                        className="ms-4 w-50"
                        placeholder="Enter your Purpose"
                        value={allDiietClientData.Purpose}
                        onChange={(e)=>setAllDietClient((prev)=>({...prev,Purpose:e.target.value}))}
                    />
                </CCol>

                <CCol className='d-flex justify-content-between my-2 ' lg={6} >
                    <h5 >Start Date</h5>
                    <CFormInput
                        type="date"
                        className="ms-4 w-50"
                        value={allDiietClientData.Start_Date}
                        onChange={(e)=>setAllDietClient((prev)=>({...prev,Start_Date:e.target.value}))}
                    />
                </CCol>
            </CRow>


            <CRow className='mt-lg-4'>
                <CCol className='d-flex justify-content-between my-2' lg={6}>
                    <h5 >End Date</h5>
                    <CFormInput
                        type="date"
                        className="ms-4 w-50"
                        placeholder="Enter Waist"
                        value={allDiietClientData.EndDate}
                        onChange={(e)=>setAllDietClient((prev)=>({...prev,EndDate:e.target.value}))}
                    />
                </CCol>

                <CCol className='d-flex justify-content-between my-2 ' lg={6} >
                    <h5 >Package</h5>
                    <CFormInput
                        type="number"
                        className="ms-4 w-50"
                        placeholder="Enter Package"
                        value={allDiietClientData.Package}
                        onChange={(e)=>setAllDietClient((prev)=>({...prev,Package:e.target.value}))}
                    />
                </CCol>
            </CRow>


            <CRow className='mt-lg-4'>
                <CCol className='d-flex justify-content-between my-2' lg={6}>
                    <h5 >Dietitian Name</h5>
                    <CFormInput
                        type="text"
                        className="ms-4 w-50"
                        placeholder="Enter Your Dietitian Name"
                        value={allDiietClientData.DietitianName}
                        onChange={(e)=>setAllDietClient((prev)=>({...prev,DietitianName:e.target.value}))}
                    />
                </CCol>

                <CCol className='d-flex justify-content-between my-2 ' lg={6} >

                </CCol>
            </CRow>





        </CForm>
        <CCol className="p-3">
            <CButton onClick={sumbitFormInfoHandler}>Save Client Diet</CButton>
        </CCol>

        <CCol className="d-flex justify-content-around p-1 text-white " style={{ background: '#0B5345' }}>

        </CCol>


    </CCard>

}


export default AllDietClientForm