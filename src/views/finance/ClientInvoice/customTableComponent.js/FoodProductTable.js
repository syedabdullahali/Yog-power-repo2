import React,{useState,useEffect} from 'react'


import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton
} from "@coreui/react";

import useUpdateStock from "../customHook/useUpdateStock";
import {RxCross2} from 'react-icons/rx'
import { useDispatch } from 'react-redux';
import useStockReport from '../customHook/useStockReport';
import { useSelector } from 'react-redux';



  const FoodProductTable = ({foodProduct,status,validate,toRenderErrorOnFrontend,clientReferance}) => {

    
  const [updatedItemId,setUPdatedImtemId] = useState([])
  const saveUpdate = useUpdateStock(`foodsproduct`,setUPdatedImtemId)
  const updateStock = useDispatch()
  const createStockReport = useStockReport()


  const clearFunction = useSelector((el)=>el.foodProductDataClearFun)


  const functionToUpdate = (item)=>{
    if(validate){
      toRenderErrorOnFrontend()
      return 
   }
    saveUpdate(item)    
    createStockReport({...clientReferance,...item})    
  }

  useEffect(()=>{
    if(updatedItemId.length){
      updateStock({type:'update foodProduct Product',payload:updatedItemId.at(-1)})
      clearFunction()
    }
        },[updatedItemId.length])


    return (
      <>
         {Boolean(foodProduct.length)&& <div>
                                  <h4>FOOD PRODUCT</h4>
                                  </div>}
  
                            {Boolean(foodProduct.length)&& <CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345" }} hover responsive>
  
                  <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                  <CTableRow >
                          <CTableHeaderCell>Sr.No</CTableHeaderCell>
                          <CTableHeaderCell>Product Code</CTableHeaderCell>
                          <CTableHeaderCell>Product Name</CTableHeaderCell>
                          <CTableHeaderCell>Brand Name</CTableHeaderCell>
                          <CTableHeaderCell>Size</CTableHeaderCell>
                          <CTableHeaderCell>Color</CTableHeaderCell>
                          <CTableHeaderCell>No of item</CTableHeaderCell>
                          <CTableHeaderCell>Total Price</CTableHeaderCell>
                          {status || <CTableHeaderCell>Status</CTableHeaderCell>}
                  </CTableRow>
                  </CTableHead>
                  <CTableBody>
                   
          
                  {foodProduct.map((item,index)=>
                   <CTableRow key={index}>
                             <CTableDataCell>{index+1}</CTableDataCell>
                            <CTableDataCell>{item.productCode}</CTableDataCell>
                            <CTableDataCell>{item.productName}</CTableDataCell>
                            <CTableDataCell>{item.productDetails.Brand_Name}</CTableDataCell>
                            <CTableDataCell>{item.productDetails.Category}</CTableDataCell>
                            <CTableDataCell>{item.productDetails.Color}</CTableDataCell>
                            <CTableDataCell>{item.item} <RxCross2/> {item.productDetails.Product_Price}</CTableDataCell>
                            <CTableDataCell>{item.productDetails.Product_Price*item.item}</CTableDataCell>
                              {status || <CTableHeaderCell> {updatedItemId.includes(item._id)?<CButton size='sm'>Confirmed</CButton>:<CButton color='warning' size="sm" onClick={()=>functionToUpdate(item)} >Pending...</CButton>}</CTableHeaderCell>}


               </CTableRow>
                  )}
  
              <CTableRow className="text-center">
                             <CTableDataCell style={{ backgroundColor: "#0B5345", color: "white" }} colSpan={6} >Total</CTableDataCell>
                             <CTableDataCell colSpan={3}>{foodProduct.reduce((crr,el)=>crr+(el.item*el.productDetails.Product_Price),0)}</CTableDataCell>
               </CTableRow>
  
                  </CTableBody>
                              </CTable>}  
      </>
    )
  }
  
  export default FoodProductTable
  
  