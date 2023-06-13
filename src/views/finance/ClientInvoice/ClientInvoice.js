import { cilInfo } from "@coreui/icons";
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
    CFormTextarea,
    CInputGroup,
    CNav,
    CNavItem,
    CNavLink,
    CRow,
    CTabContent,
    CTabPane,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from "@coreui/react";
import React, { useState,lazy, useEffect,useMemo } from "react";
import { FaBeer } from "react-icons/fa";
import {AiOutlineShoppingCart}from "react-icons/ai"
import { useSelector } from "react-redux";
import logo from 'src/assets/images/avatars/icon.png'
import CreateInvoice from "./customTableComponent.js/CreateInvoice";
import axios from "axios";
const ClothProduct = lazy(()=>import("./ClothProduct"))
const AuravedaMD = lazy(()=>import("./AuravedaMd"))
const FitnessProduct  =lazy(()=>import("./FitnessProduct"))
const FoodProduct  =lazy(()=>import("./FoodProduct"))

const ClothProductTotalTable = lazy(()=>import( "./customTableComponent.js/ClothProductTotalTable"));
const AuravedaTotalTable = lazy(()=>import("./customTableComponent.js/AuravedaTotalTable")) 
const FitnessProductTotalTable = lazy(()=>import("./customTableComponent.js/FitnessProductTotalTable")) 
const FoodProductTable = lazy(()=>import( "./customTableComponent.js/FoodProductTable")) 
import CustomSelectInput from "src/views/Fitness/CustomSelectInput/CustomSelectInput";
import GeneralProduct from "./GeneralProduct";
import GeneralProductTable from "./customTableComponent.js/GeneralProductTable";
import Invoice from "./Invoice/Invoice";


let user = JSON.parse(localStorage.getItem('user-info'))
const token = user.token;
const username = user.user.username;
function ClientInvoice(){
    const [activeKey, setActiveKey] = useState(1)
    const [activeKey2, setActiveKey2] = useState(1)

    const clothStore = useSelector((el)=>el.stockDataClothData)  
    const auravedaStore = useSelector((el)=>el.stockDataAuravedaData)  
    const fitnessProduct = useSelector((el)=>el.stockDataFitnessProduct) 
    const foodProduct = useSelector((el)=>el.stockDataFoodProduct)
    const genralProduct = useSelector((el)=>el.genralProduct) 
 


    const [clientData,setClientData]= useState([])
    const [enquiryData,setEnquiryData] = useState([])
    const [staff, setStaff] = useState([])
    const [selectedStaffId,setSelectedStaffId] = useState('')
    const [prinInvoiceData,setPrintInvoiceData] = useState([])
    const [prinInvoice,setPrinInvoice] = useState(false)

    const obj = useMemo(()=>{return{
        Fullname:'',
        ContactNumber:'',
        CustomerId:'',
        EmployeeId:'',
        EmailId:'',
        StatffName:'',
        MemberId:'',
        EmpId:'',
    }})

    const [clientReferance,setClientReferance] =  useState(obj)
    const url = useSelector((el)=>el.domainOfApi) 

    const [cartError,setCarterror] = useState(false)
    const [error,setError] = useState(false)
    const [error1,setError1] = useState(false)
    const [error2,setError2] = useState(false)
    const [error3,setError3] = useState(true)
    const [error4,setError4] = useState(true)




   let num = auravedaStore.length+clothStore.length+fitnessProduct.length+foodProduct.length+genralProduct.length
   let total = [...auravedaStore,...clothStore,...fitnessProduct,...foodProduct,...genralProduct]


 useEffect(()=>{
 if(num ){
setCarterror(false)
}else if (!num){
    setActiveKey(1)  
}
 },[num+1])


 
 const validation = total.some((el)=>el.toInvoice)
 
 useEffect(()=>{
if(validation){
   setError(false)
}else if(!!clientReferance.Fullname.trim()){
   setError2(false)
   setError3(false)
}
 },[validation,clientReferance.Fullname,clientReferance.StatffName])

 useEffect(()=>{
if(selectedStaffId.trim()){
 setError1(false)   
 setError4(false)
 const emp =   staff.find((el)=>el._id===selectedStaffId)
 setClientReferance((prev)=>{
    return {...prev,StatffName:emp?.FullName,EmpId:emp?._id,EmployeeId:emp?.EmployeeID}
 })
}
 },[selectedStaffId])


 const headers =  {
    'Authorization': `Bearer ${token}`
}

async  function toGetSelectInputData(){
try{
const response1 =     axios.get(`${url}/memberForm/all`, {headers})   
const response2 =    axios.get(`${url}/enquiryForm/all`, {headers})  
const response3 = axios.get(`${url}/employeeform`,{headers}) 

const data = await Promise.all([response1,response2,response3])
setClientData(data[0].data)
setEnquiryData(data[1].data)
setStaff(data[2].data)

}catch(error){
 console.log(error)
}




}



useEffect(() => {
toGetSelectInputData()
}, [])


 function clientObj(obj){
    setClientReferance({
        Fullname:obj?.Fullname,
        ContactNumber:obj?.ContactNumber,
        CustomerId:obj?.ClientId?obj?.ClientId:obj?.EnquiryId,
        EmailId:obj?.Email?obj?.Email:obj?.Emailaddress,
        MemberId:obj?._id,
    })    
 }


const allowToConfirm = error2 ||error3||error4||error1

function toRenderErrorOnFrontend(){
if(!error2 && !clientReferance.MemberId.trim()){
  setError2(true)
}else if(!error1){
  setError1(true)
}
}


function toPrintInvoice(data){
  setPrintInvoiceData(data)
  setPrinInvoice(true)  
  setActiveKey(7)
}

return   <>
<Invoice 
       visibale={prinInvoice} 
       setPrinInvoice={setPrinInvoice}
       InvoiceData={prinInvoiceData}
       />

<CRow>
    

    <CCol xs={12}>
        <CCard className="mb-3 border-success">
            <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                <CNav variant="pills" role="tablist">
                    <CNavItem>
                        <CNavLink
                            style={{ color: "white" }}
                            href="javascript:void(0);"
                            active={activeKey === 1}
                            onClick={() => setActiveKey(1)}
                        >
                            Clothes product
                        </CNavLink>
                    </CNavItem>
                    <CNavItem>
                        <CNavLink
                            style={{ color: "white" }}
                            href="javascript:void(0);"
                            active={activeKey === 2}
                            onClick={() => setActiveKey(2)}
                        >

                            Ayurveda Medicine
                        </CNavLink>
                    </CNavItem>
                    <CNavItem>
                        <CNavLink
                            style={{ color: "white" }}
                            href="javascript:void(0);"
                            active={activeKey === 3}
                            onClick={() => setActiveKey(3)}
                        >
                            Fitness Product
                        </CNavLink>
                    </CNavItem>
                    <CNavItem>
                        <CNavLink
                            style={{ color: "white" }}
                            href="javascript:void(0);"
                            active={activeKey === 4}
                            onClick={() => setActiveKey(4)}
                        >
                            Foods Product
                        </CNavLink>
                    </CNavItem>
                    <CNavItem>
                        <CNavLink
                            style={{ color: "white" }}
                            href="javascript:void(0);"
                            active={activeKey === 5}
                            onClick={() => setActiveKey(5)}
                        >
                            General Inventory


                        </CNavLink>
                    </CNavItem>
                </CNav>
            </CCardHeader>
            <CCardBody>

            <CCol  xs={12} className="p-3 d-flex justify-content-end">
      <div style={{display:`${activeKey !==6?'block':'none'}`}} >          
     <CCard style={{fontSize:'50px',width:'fit-content',padding:'20px',cursor:'pointer'}} onClick={() =>{
        if(num){
         setActiveKey(6)
        }else{
            setCarterror(true)
        }
     }} >
        <AiOutlineShoppingCart/>
     </CCard>
     <CCol style={{height:'50px'} }>
        {num?<p className="p-0" style={{fontSize:'20px'}}>No of item {num}</p>:''}
     </CCol>
     </div>
    </CCol>
    {cartError&&<p p className="p-0 text-danger" style={{fontSize:'20px'}}>Please add the product </p>}

                          <CTabContent>
                                <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>
                                    <ClothProduct />
                                </CTabPane>
                                <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 2}>
                                    <AuravedaMD />
                                </CTabPane>
                                <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 3}>
                                    <FitnessProduct />
                                </CTabPane>
                                <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 4}>
                                    <FoodProduct/>
                                </CTabPane>
                                <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 5}>
                                    <GeneralProduct/>
                                </CTabPane>
                                <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 7}>
                                    <CreateInvoice  visible={activeKey === 7} 
                                    setActiveKey1={setActiveKey}  
                                    clientReferance={clientReferance}
                                    toPrintInvoice={toPrintInvoice}
                                    />
                                </CTabPane>
                          </CTabContent>

                            <CCard style={{display:`${activeKey === 6?'block':'none'}`}} className="p-3" >


                    <CCol className="d-flex justify-content-between">
                        <div style={{width:'400px'}}>
                        <CNav variant="tabs" role="tablist">
                            <CNavItem>
                                <CNavLink
                                    active={activeKey2 === 1}
                                    onClick={() => setActiveKey2(1)}
                                >
                                   Select Client
                                </CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink
                                    active={activeKey2 === 2}
                                    onClick={() => setActiveKey2(2)}
                                >
                                  Select Enquiry
                                </CNavLink>
                            </CNavItem>
                        </CNav>
                        <CTabContent>
                            <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey2 === 1}>
                                <CCol  className="py-2">
                                 
                                    <CustomSelectInput data={clientData} 
                                 title={clientReferance.Fullname?.trim()?
                                    clientReferance.Fullname:"Select Enquiry"}
                                     getData={clientObj}/>

                                </CCol>

                            </CTabPane>
                            <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={activeKey2 === 2}>
                            <CCol  className="py-2">
                                 
                                 <CustomSelectInput data={enquiryData} 
                                 title={clientReferance.Fullname?.trim()?
                                    clientReferance.Fullname:"Select Enquiry"}
                                  getData={clientObj}
                                  />

                             </CCol>
                            </CTabPane>
                        </CTabContent>

                        </div>

                     <div className="ps-4">
                         <CFormSelect
                         label="Select staff"
                         onChange={(e)=>setSelectedStaffId( e.target.value)}                                                                                                                                  
                                    >
                                <option >Select Staff</option>

                                        {staff.filter((list) => list.username === username &&
                                            list.selected === 'Select').map((item, index) => (
                                                <option key={index} value={item._id}>{item.FullName}</option>
                                            ))}
                                    </CFormSelect>

              <div className="d-flex mt-2">
                       <div className="me-3">
                            <h5> Client name </h5>
                            <h6>{clientReferance.Fullname}</h6>
                        </div>
                        <div>
                           <h5> Mobile no </h5>
                           <h6>{clientReferance.ContactNumber}</h6>
                        </div>

              </div>
                       
                     </div>
                    </CCol>
                    {error2&& <p style={{color:'red'}} >Please select client name</p>}      
                    {error1&& <p style={{color:'red'}} >Please select Staff name</p>}      



                            
                            <ClothProductTotalTable clothStore={clothStore} validate={allowToConfirm} toRenderErrorOnFrontend={toRenderErrorOnFrontend} clientReferance={clientReferance} />
                            <AuravedaTotalTable auravedaStore={auravedaStore} validate={allowToConfirm} toRenderErrorOnFrontend={toRenderErrorOnFrontend} clientReferance={clientReferance} />
                            <FitnessProductTotalTable fitnessProduct={fitnessProduct} validate={allowToConfirm} toRenderErrorOnFrontend={toRenderErrorOnFrontend} clientReferance={clientReferance} />
                            <FoodProductTable foodProduct={foodProduct} validate={allowToConfirm} toRenderErrorOnFrontend={toRenderErrorOnFrontend} clientReferance={clientReferance} />
                            <GeneralProductTable genralProduct={genralProduct} validate={allowToConfirm} toRenderErrorOnFrontend={toRenderErrorOnFrontend} clientReferance={clientReferance} />
                            {num ?<CCol className="d-flex justify-content-end">
                                <h4>TOTAL AMOUNT :-
                                     Rs {total.reduce((crr,el)=>crr+(el.item*el.productDetails.Product_Price),0)}</h4>
                            </CCol>:''}
                            <CCol className="text-center">
                                <CButton size="md" variant="outline" className="px-5" onClick={()=>{
                                    if(!clientReferance.Fullname.trim()){
                                        setError2(true)
                                        return
                                    } else if(!validation){
                                        setError(true)  
                                        return  
                                    } else if(!selectedStaffId){
                                        setError1(true)
                                    }
                                    setActiveKey(7)
                                    
                                    }}>Create  Invoice</CButton>

                              {error&& <p style={{color:'red'}} >Please confirm your at least one  product</p>}      
                              {error2&& <p style={{color:'red'}} >Please select client name</p>}      
                              {error1&& <p style={{color:'red'}} >Please select Staff name</p>}      


                            </CCol>
                            </CCard>

                                         
                        </CCardBody>
        </CCard>
    </CCol>
</CRow>
</>

}



export default ClientInvoice