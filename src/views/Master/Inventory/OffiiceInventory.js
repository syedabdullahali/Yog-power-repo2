import React from 'react'

import {CCard,CTable,CCol,CTableHead,CTableRow,CTableHeaderCell,
  CTableBody,CTableDataCell,CFormInput,CCardHeader,CCardTitle,CButton, CCardBody, CForm,CRow,
  CFormSelect
} from '@coreui/react'

import { MdCall, MdDelete, MdEdit, MdMail } from "react-icons/md";


import { useSelector } from 'react-redux'
import {useState,useEffect} from "react"
import axios from 'axios'



let user = JSON.parse(localStorage.getItem('user-info'))
const token = user.token;
const username = user.user.username;

const ProductAssignMaster = () => {
  const url = useSelector((el)=>el.domainOfApi) 
  const [allProductData,setAllProductData] = useState([])
  const [activeForm,setActiveForm] = useState(false)
  const [updateActive,setUpdateActive] = useState(false)

  const [topostAllProductData,setToPostAllProductData] = useState(
    {
      username:username,
      sataus:'Selected',
      productCategory:'',
      productName:'',
      brandName:'',
      category:'',
      productPrize:'',
      ordersQty:'',
      Color:'',
      Available_Stock:''
    }
  )

const headers =   {
    "Authorization": `Bearer ${token}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
}

  
 async  function getAllProductListingMaster() {
  try{
  const response = await  axios.get(`${url}/inventoryListingMaster/all`,{headers})

  const {data} = response
  setAllProductData(data.reverse())
  }catch(error){
    console.error(error)

  }
 
}

useEffect(()=>{
  getAllProductListingMaster()
},[])







const saveAllProductListingMaster = async (type)=>{
   let response ={}
  try{
    if(type==='Save'){
      response = await  axios.post(`${url}/inventoryListingMaster/create`,topostAllProductData, {headers})
    }
    if(type==='Update'){
     response = await  axios.post(`${url}/inventoryListingMaster/update/${topostAllProductData?._id}`,topostAllProductData, {headers})
    }

   if(response?.status===200){
    getAllProductListingMaster()
    alert('successfully save')
   }
    }catch(error){
      console.error(error)
  
    }
}




function toToggaleFrom(){
  setActiveForm(prev=>!prev)
  setUpdateActive(false)
  setToPostAllProductData(
    {
      username:username,
      sataus:'Selected',
      productCategory:'',
      productName:'',
      brandName:'',
      category:'',
      productPrize:'',
      ordersQty:'',
      Color:'',
      Available_Stock:''
    }
  )
}

const updateProduct = async (item)=>{
  setActiveForm(true)
  setToPostAllProductData({...item})
  setUpdateActive(true)
 
}



const toDeleteData= async (id)=>{
if(!confirm('Do u want to delete this')){
return
}

const response = await  axios.delete(`${url}/inventoryListingMaster/delete/${id}`, {headers})
if(response.status===200){
   getAllProductListingMaster()
}

}
console.log(topostAllProductData)

return (
    <CCard>
      <CCardHeader style={{ backgroundColor: "#0B5345", color: "white" }} className='p-3'>
        <CCardTitle><h5>Office Inventory</h5></CCardTitle>
      </CCardHeader>



         <CCardBody>    
                <CCol className='my-3 text-end'>
                  {!activeForm&&<CButton onClick={()=>toToggaleFrom()} >ADD Product</CButton>}
                </CCol>
     
               <CCol>
               <CForm style={{display:activeForm?'block':'none'}}>
                  <CCol className=' d-flex justify-content-between border px-4 py-2 rounded-top' style={{ backgroundColor: "#0B5345", color: "white" }} >
                      <h5>Product Form</h5>
                     <CButton color='danger' onClick={()=>toToggaleFrom()} >Close</CButton>
                  </CCol>
                    <div  className='border rounded-bottom p-4 border-top-0'>
                  <CRow>
                    <CCol lg={6} md={6} >
                      <CFormSelect
                      label='Product Category'
                      type='text'
                      value={topostAllProductData.productCategory}
                      onChange={(e)=>setToPostAllProductData((prev)=>({...prev,productCategory:e.target.value}))}
                      options={[
                        'Open this select menu',
                        { label: 'Clothes product', value: 'Clothes product' },
                        { label: 'Ayurveda Medicine', value: 'Ayurveda Medicine ' },
                        { label: 'Fitness Product', value: 'Fitness Product'},
                        { label: 'Foods Product', value: 'Foods Product'},
                        { label: 'General Inventory', value: 'General Inventory'}


                      ]}
                      />
                    </CCol>

                    <CCol lg={6} md={6} >
                      <CFormInput
                      label='Product Name'
                      type='text'
                      value={topostAllProductData.productName}
                      onChange={(e)=>setToPostAllProductData((prev)=>({...prev,productName:e.target.value}))}
                      />
                    </CCol>

                    <CCol lg={6} md={6} >
                      <CFormInput
                      label='Brand Name'
                      type='text'
                      value={topostAllProductData.brandName}
                      onChange={(e)=>setToPostAllProductData((prev)=>({...prev,brandName:e.target.value}))}
                      />
                    </CCol>
                    <CCol lg={6} md={6} >
                      <CFormInput
                      label='Size/Kg'
                      type='text'
                      value={topostAllProductData.category}
                      onChange={(e)=>setToPostAllProductData((prev)=>({...prev,category:e.target.value}))}
                      />
                    </CCol>

                    
                   
                    <CCol lg={6} md={6} >
                      <CFormInput
                      label='Color'
                      type='text'
                      value={topostAllProductData.Color}
                      onChange={(e)=>setToPostAllProductData((prev)=>({...prev,Color:e.target.value}))}
                      />
                    </CCol>
                   

                    <CCol lg={6} md={6} >
                      <CFormInput
                      label='Product Prize'
                      type='number'
                      value={topostAllProductData.productPrize}
                      onChange={(e)=>setToPostAllProductData((prev)=>({...prev,productPrize:e.target.value}))}
                      
                      />
                    </CCol>

                    <CCol lg={6} md={6} >
                      <CFormInput
                      label='Available Stock'
                      type='number'
                      value={topostAllProductData.Available_Stock}
                      onChange={(e)=>setToPostAllProductData((prev)=>({...prev,Available_Stock:e.target.value}))}
                      
                      />
                    </CCol>

                    
                    
                  </CRow>

                  <CCol className='mt-4'>
                    {updateActive?
                      <CButton onClick={()=>saveAllProductListingMaster('Update')} >Save Update</CButton>:          
                        <CButton onClick={()=>saveAllProductListingMaster('Save')} >Save</CButton>
                    }

                    </CCol>

                    </div>
                    

               </CForm>
              </CCol>    
        
      <CTable className='mt-3 ' align="middle" bordered style={{ borderColor: "#0B5345",width:'150%' }} hover responsive>
      <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                            <CTableRow >
                                <CTableHeaderCell>Sr No</CTableHeaderCell>
                                <CTableHeaderCell>Product Category</CTableHeaderCell>
                                <CTableHeaderCell>Product Name</CTableHeaderCell>
                                <CTableHeaderCell>Brand Name</CTableHeaderCell>
                                <CTableHeaderCell>Size/Kg</CTableHeaderCell>
                                <CTableHeaderCell>Color</CTableHeaderCell>
                                <CTableHeaderCell>Product Prize</CTableHeaderCell>
                                <CTableHeaderCell>Available Stock</CTableHeaderCell>
                               
                                <CTableHeaderCell>Edit/Delete</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                           {allProductData.map((el,i)=>
                           
                      <CTableRow >
                           <CTableDataCell>{i+1}</CTableDataCell>
                           <CTableDataCell>{el.productCategory}</CTableDataCell>
                           <CTableDataCell>{el.productName}</CTableDataCell>
                           <CTableDataCell>{el.brandName}</CTableDataCell>
                           <CTableDataCell>{el.category}</CTableDataCell>
                           <CTableDataCell>{el.Color}</CTableDataCell>
                           <CTableDataCell>{el.productPrize}</CTableDataCell>
                           <CTableDataCell>{el.Available_Stock}</CTableDataCell>
                               <CTableDataCell className='text-center'>
                                  <MdEdit style={{ fontSize: '35px', cursor: 'pointer', markerStart: '10px' }} size='20px' onClick={()=>updateProduct(el)} />
                                  <MdDelete style={{ cursor: 'pointer', markerStart: '10px', marginLeft: "5px" }}  size='20px'  onClick={()=>toDeleteData(el._id)} />
                              </CTableDataCell>                                                   
                       </CTableRow>
                           
                           )}
                  
                          
                        </CTableBody>
                    </CTable>

      </CCardBody>
        
    </CCard>
  )
}

export default ProductAssignMaster

