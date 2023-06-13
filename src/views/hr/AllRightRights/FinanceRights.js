import {
    CCol,
    CFormSwitch,
    CRow,
    CTabPane,
} from '@coreui/react'






function FinanceRights(){


    return <div>
        
<CRow >

<h4 className='mb-4 p-2 d-flex ' style={{background:'#0B5345',color:'white'}}>
        Invoices <span className='mx-2'><CFormSwitch size="lg"/></span></h4>

   <CCol>
       <h5>Total Invoice</h5>
       <CFormSwitch size="xl"  label="Total Invoice" />
       <CFormSwitch size="xl" label="Delete Invoice" />
       <CFormSwitch size="xl" label="Print Invoice" />
       <CFormSwitch size="xl" label="Status"  />

   </CCol>
   <CCol>
       <h5>Paid Invoice</h5>
       <CFormSwitch size="xl" label="Paid Invoice"  />
       <CFormSwitch size="xl" label="Delete Paid Invoice " />
       <CFormSwitch size="xl" label="Print Invoice" />
       <CFormSwitch size="xl" label="Status"  />


   </CCol>
   <CCol>
       <h5>Balance Payment</h5>
       <CFormSwitch size="xl" label="Balance Payment"  />
       <CFormSwitch size="xl" label="Delete Balance Payment" />
       <CFormSwitch size="xl" label="Add" />
       <CFormSwitch size="xl" label="Print Invoice" />
       <CFormSwitch size="xl" label="Status"  />
   </CCol>

 
</CRow>

<CRow className='my-5' >
   
   <CCol>
       <h5>Receipt</h5>
       <CFormSwitch size="xl" label="Receipt" />
       <CFormSwitch size="xl" label="Print Invoice" />
       <CFormSwitch size="xl" label="Print Receipt" />
   </CCol>
   <CCol>
       <h5>Cancelled Invoice</h5>
       <CFormSwitch size="xl" label="Cancelled Invoice"  />
       <CFormSwitch size="xl" label="Add  Invoice" />
       <CFormSwitch size="xl" label="Edit Invoice" />
       <CFormSwitch size="xl" label="Delete Invoice" />
       <CFormSwitch size="xl" label="Status"  />

   </CCol>
   <CCol>
       <h5>Comments of written off Invoice</h5>
       <CFormSwitch size="xl" label="Comments of written off Invoice"  />
   </CCol>
 
</CRow>



<CRow className='my-4'>
<h4 className='mb-4 p-2 d-flex ' style={{background:'#0B5345',color:'white'}}>
    Revenues <span className='mx-2'><CFormSwitch size="lg"/></span></h4>

    <CCol>
       <h5>Revenue Details</h5>
       <CFormSwitch size="xl" label="Revenue Details" />

   </CCol>
   <CCol>
       <h5>Service Revenue</h5>
       <CFormSwitch size="xl" label="Service Revenue"  />

   </CCol>
   <CCol>
       <h5>Renew Revenue</h5>
       <CFormSwitch size="xl" label="Renew Revenue"  />

   </CCol>

</CRow>


<CRow className='my-4'>

    <CCol>
       <h5>New Client Revenue</h5>
       <CFormSwitch size="xl" label="New Client Revenue" />
   </CCol>
   <CCol>
       <h5>Lead Report</h5>
       <CFormSwitch size="xl" label="Lead Report"  />
   </CCol>
   <CCol>
       <h5>Revenue Report</h5>
       <CFormSwitch size="xl" label="Revenue Report"  />
   </CCol>

</CRow>

<CRow className='my-4'>
<h4 className='mb-4 p-2 d-flex ' style={{background:'#0B5345',color:'white'}}>
   Collection Report <span className='mx-2'><CFormSwitch size="lg"/></span></h4>

    <CCol>
       <h5>Total Collection</h5>
       <CFormSwitch size="xl" label="Total Collection" />
   </CCol>
   <CCol>
       <h5>Payment Mode</h5>
       <CFormSwitch size="xl" label="Payment Mode"  />
   </CCol>
   <CCol>
       <h5>Cash Report</h5>
       <CFormSwitch size="xl" label="Cash Report"  />

   </CCol>

</CRow>

<CRow className='my-4'>    
<CCol>
       <h5>Cheque Report</h5>
       <CFormSwitch size="xl" label="Cheque Report"  />
</CCol>
    
</CRow>


<CRow className='my-4'>
<h4 className='mb-4 p-2 d-flex ' style={{background:'#0B5345',color:'white'}}>
   Expense  <span className='mx-2'><CFormSwitch size="lg"/></span></h4>

    <CCol>
       <h5>Center Expense </h5>
       <CFormSwitch size="xl" label="Center Expense" />

   </CCol>
   <CCol>
       <h5>Daily Expense</h5>
       <CFormSwitch size="xl" label="Daily Expense"  />
       <CFormSwitch size="xl" label="Status" />
       <CFormSwitch size="xl" label="Delete Daily Expense" />
   </CCol>
   <CCol>
       <h5>Petty Cash</h5>
       <CFormSwitch size="xl" label="Petty Cash"  />
       <CFormSwitch size="xl" label="Add Petty Cash" />
       <CFormSwitch size="xl" label="Delete Petty Cash" />
   </CCol>

</CRow>

<CRow className='my-4'>    

<h4 className='mb-4 p-2 d-flex ' style={{background:'#0B5345',color:'white'}}>
   Salles  <span className='mx-2'><CFormSwitch size="lg"/></span></h4>

    <CCol>
       <h5>DSR report</h5>
       <CFormSwitch size="xl" label="DSR report" />
   </CCol>
   <CCol>
       <h5>Target vs Achievment</h5>
       <CFormSwitch size="xl" label="Target vs Achievment"  />
   </CCol>
   <CCol>
    
   </CCol>

</CRow>




</div>





}

export default FinanceRights