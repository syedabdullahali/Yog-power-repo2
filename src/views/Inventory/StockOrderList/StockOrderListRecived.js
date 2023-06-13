import {CTable,CTableHead,CTableRow,CTableHeaderCell,
    CTableBody,CTableDataCell,
    CTabPane,

 } from '@coreui/react'
 import { useEffect} from 'react'

const StockOrderListRecived = ({visible,receviedProduct}) => {



  return (
    <CTabPane role="tabpanel" aria-labelledby="contact-tab" visible={visible}>

   
  <CTable className='mt-3 ' align="middle" bordered style={{ borderColor: "#0B5345"}} hover responsive>                  
                   <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                       <CTableRow >
                           <CTableHeaderCell>Sr No</CTableHeaderCell>
                           <CTableHeaderCell>Order Date</CTableHeaderCell>
                           <CTableHeaderCell>Received Date</CTableHeaderCell>
                           <CTableHeaderCell>Product Category</CTableHeaderCell>
                           <CTableHeaderCell>Product Name</CTableHeaderCell>
                           <CTableHeaderCell>Brand Name</CTableHeaderCell>
                           <CTableHeaderCell>Size/Kg</CTableHeaderCell>
                           <CTableHeaderCell>Color</CTableHeaderCell>
                           <CTableHeaderCell>Product Prize</CTableHeaderCell>
                           <CTableHeaderCell>Product quantity</CTableHeaderCell>     
                           <CTableHeaderCell>Total Amount</CTableHeaderCell>     
                           <CTableHeaderCell>Order by</CTableHeaderCell>                      
                           <CTableHeaderCell>Received by</CTableHeaderCell>                      
                       </CTableRow>
                   </CTableHead>
                   <CTableBody>
                       
                   {receviedProduct.map((item,i)=>{        
              
                return <CTableRow >
                           <CTableDataCell>{i+1}</CTableDataCell>
                           <CTableDataCell>{new Date(item.Order_Date).toLocaleString()}</CTableDataCell>
                           <CTableDataCell>{new Date(item.receivedDate).toLocaleString()}</CTableDataCell>
                           <CTableDataCell>{item.Product_Category}</CTableDataCell>
                           <CTableDataCell>{item.Product_Name}</CTableDataCell>
                           <CTableDataCell>{item.Brand_Name}</CTableDataCell>
                           <CTableDataCell>{item.Category}</CTableDataCell>
                           <CTableDataCell>{item.Color}</CTableDataCell>
                           <CTableDataCell>{item.Product_Price}</CTableDataCell>
                           <CTableDataCell>{item.Orders_Quantity}</CTableDataCell>
                           <CTableDataCell>{item.Product_Price * item.Orders_Quantity}</CTableDataCell>     
                           <CTableDataCell>{item.EmployeeName}</CTableDataCell>  
                           <CTableDataCell>{item.receivedBy}</CTableDataCell>  

                       </CTableRow>                   
                   })}
                  
             
                     
                   </CTableBody>
     </CTable>


  </CTabPane>
  )
}

export default StockOrderListRecived
