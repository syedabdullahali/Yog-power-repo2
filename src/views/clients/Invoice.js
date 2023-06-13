import React, { useRef} from 'react'
import {
    CButton,   
    CCol,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CCard,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CImage,
} from '@coreui/react'

import logo from 'src/assets/images/avatars/icon.png'
import { useReactToPrint } from 'react-to-print'




function Invoice ({allIvoiceOfaUser,showInvoiceModal,setInvoceModal,ClientData}){

    

    console.log(allIvoiceOfaUser)
    const getDate = (date,val) => {
        const date2 = new Date(date).getDate() + "/" + (new Date(date).getMonth() + (val? 1:0)) + "/" + new Date(date).getFullYear()
        if (date2 === 'NaN/NaN/NaN') {
            return 'Invalid Date'
        }
        return date2

    }
    
    const componentRef = useRef()
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'yog-power',
        onAfterPrint: () => alert('print success')
    })

  return <CModal size="xl" alignment="center" scrollable visible={showInvoiceModal} onClose={() => setInvoceModal(false)}>

                            <CModalHeader>
                                <CModalTitle>Invoice Preview</CModalTitle>
                            </CModalHeader>
                            <CModalBody  ref={componentRef} style={{ padding: '25px' }}>
                                <CRow>
                                   <CCol lg={12} className='text-center'><CImage src={logo} width="100px" height='100px' /></CCol>
                                    <CCol lg={12} className='text-center mt-2'><h5>Yog Power International </h5></CCol>
                                </CRow>
                               

                               

{ allIvoiceOfaUser.map((el,i)=>{

return <div  className='my-5' > 

                            <CRow>                                                                   
                                 <CCol className='mt-2' style={{ marginLeft: '10px' }}>
                                     <h6>Client Name: {ClientData?.Fullname}</h6>
                                     <div>Client Number: {ClientData?.ContactNumber}</div>
                                     Customer ID : {ClientData?.AttendanceID}<br />
                                     Email-Id : {ClientData?.Email}<br />
                                 </CCol>
                                 <CCol className='mt-2' style={{ marginRight: '30px' }}>
                                     <div className='float-end'>
                                         Date : { getDate(el?.date,true)}<br />
                                         Invoice No {el?.centerName}:{el?.InvoiceNo} <br />
                                         Counseller : {el?.counseller}
                                     </div>
                                 </CCol>
                            </CRow>    
                                 <CCol lg={12} className='text-center p-0'><h4 className='m-0 p-0'>Invoice</h4></CCol>

<CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345" }} responsive>
                                   <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                                        <CTableRow >
                                            <CTableHeaderCell>Sr.No</CTableHeaderCell>
                                            <CTableHeaderCell>DESCRIPTION</CTableHeaderCell>
                                            <CTableHeaderCell>DURATION</CTableHeaderCell>
                                            <CTableHeaderCell>SERVICE FEE</CTableHeaderCell>
                                        </CTableRow>
                                    </CTableHead>
                                    <CTableBody>
                                        <CTableRow>
                                            <CTableDataCell>{i+1}</CTableDataCell>
                                            <CTableDataCell>
                                                <CRow>
                                                    <CCol lg={12}>
                                                        <div style={{ fontWeight: 'bold' }}>Service Name: {el?.ServiceName}</div>
                                                    </CCol>
                                                    <CCol lg={12}>
                                                        <div style={{ fontWeight: 'bold' }}>Package Name: {el?.PackageName}</div>

                                                    </CCol>
                                                </CRow>
                                                <CRow>
                                                    <CCol>
                                                        <div>Start Date: {getDate(el?.startDate,true)}</div>
                                                    </CCol>
                                                    <CCol>
                                                        <div >End Date: {getDate(el?.endDate,true)}</div>
                                                    </CCol>
                                                </CRow>

                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <div style={{ fontWeight: 'bold' }}>{el?.duration}</div>

                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <div style={{ fontWeight: 'bold' }}>{el?.fees}</div>
                                            </CTableDataCell>
                                        </CTableRow>

                                        <CTableRow>
                                            <CTableDataCell colSpan={2}></CTableDataCell>
                                            <CTableDataCell colSpan={2}>
                                                <CTable bordered style={{ margin: '0', padding: '0' }} responsive>
                                                    <CTableBody>
                                                        <CTableRow>
                                                            <CTableDataCell>Sub Total</CTableDataCell>
                                                            <CTableDataCell>
                                                                <div style={{ fontWeight: 'bold' }}>{el?.fees}</div>

                                                            </CTableDataCell>
                                                        </CTableRow>

                                                        <CTableRow>
                                                            <CTableDataCell>

                                                                Discount

                                                            </CTableDataCell>
                                                            <CTableDataCell>
                                                                <div style={{ fontWeight: 'bold' }}>{el?.discount}</div>
                                                            </CTableDataCell>
                                                        </CTableRow>
                                                        <CTableRow>
                                                            <CTableDataCell>
                                                                Tax
                                                            </CTableDataCell>
                                                            <CTableDataCell className="mt-2">
                                                                <div style={{ fontWeight: 'bold' }}>{el?.fees / 100 * el?.tax}</div>
                                                            </CTableDataCell>
                                                        </CTableRow>
                                                        <CTableRow>
                                                            <CTableDataCell>Total Amount</CTableDataCell>
                                                            <CTableDataCell>
                                                                <div style={{ fontWeight: 'bold' }}>{el.amount}</div>

                                                            </CTableDataCell>
                                                        </CTableRow>

                                                        <CTableRow>
                                                            <CTableDataCell>Paid Amount</CTableDataCell>
                                                            <CTableDataCell>
                                                                <div style={{ fontWeight: 'bold' }}>{el?.paidAmount}</div>

                                                            </CTableDataCell>
                                                        </CTableRow>
                                                      

                                                        <CTableRow>
                                                            <CTableDataCell>Mode of Payment</CTableDataCell>

                                                            <CTableDataCell>
                                                                <div style={{ fontWeight: 'bold' }}>{el?.paymode}</div>
                                                            </CTableDataCell>
                                                        </CTableRow>
                                                        <CTableRow>
                                                        </CTableRow>
                                                    </CTableBody>
                                                </CTable>
                                            </CTableDataCell>
                                        </CTableRow>
                                        
                                       

                                        <CTableRow>
                                            <CTableDataCell colSpan={3}>Total</CTableDataCell>
                                            <CTableDataCell>
                                                <div style={{ fontWeight: 'bold' }}>{el?.paidAmount}</div>
                                            </CTableDataCell>
                                        </CTableRow>

                                        </CTableBody>
                                        </CTable>


                                { el.Receipts[0]&& <CTable bordered style={{ borderColor: "#106103" }} responsive>
                             <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }}>
                                <CTableRow >
                                    <CTableHeaderCell scope="col">Sr No</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Receipt No</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">
                                        Invoice No                                    </CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Client Id</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Pay Mode</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Created By</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Paid Amount</CTableHeaderCell>
                                   
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                               
                                    {el.Receipts.map((el2,i)=>{
                                        return <CTableRow>
                                        <CTableDataCell>{i+1}</CTableDataCell>
                                            <CTableDataCell>{getDate(el2.NewSlipDate,true)}</CTableDataCell>
                                            <CTableDataCell>{el.InvoiceNo +"RN"+ +(1+i)}</CTableDataCell>
                                            <CTableDataCell>{el.InvoiceNo}</CTableDataCell>
                                            <CTableDataCell>{el.MemberId}</CTableDataCell>
                                            <CTableDataCell>{el2.Pay_Mode}</CTableDataCell>                                     
                                            <CTableDataCell>{el2.Counseller}</CTableDataCell>
                                            <CTableDataCell>{el2.PaidAmount}</CTableDataCell>
                                        </CTableRow>    
                                    })}
                                    
                            </CTableBody>
                            
</CTable>}
                                                        <CRow >
                                                            <CCol className='text-end'>
                                                                <strong>Balance Amount- </strong> 
                                                                <span style={{ fontWeight: 'bold' }}>{el?.pendingAmount}</span>
                                                            </CCol>
                                                        </CRow>
                                
</div>})}





                               <CTable>
                                    <CTableBody>
                                        <CTableRow style={{ backgroundColor: "#0B5345", color: "white" }}>
                                            <CTableDataCell colSpan={4}>
                                                <h5>TERMS AND CONDITIONS</h5>
                                            </CTableDataCell>
                                        </CTableRow>
                                        <CTableRow>
                                            <CTableDataCell colSpan={4}>
                                                <div>Fee once paid is not refundable, Non transferable & no package extension, lapsed sessions has to be adjusted within the expiry date. Instructors & timings are subject to change. All packages would be on hourly basis in a day. If a person wishes to workout more than an hour in a day, kindly upgrade your package accordingly. follow guidelines for better result</div>
                                            </CTableDataCell>
                                        </CTableRow>

                                        <CTableRow>
                                            <CTableDataCell colSpan={4}>
                                                <div style={{ fontWeight: 'bold' }}>Address: Shop 24/25, 2nd Floor, V Mall, Thakur Complex, Kandivali East, Mumbai 400 101. India.</div>
                                                <label style={{ fontWeight: 'bold' }}>Email: info@yogpowerint.com</label>
                                                <label style={{ fontWeight: 'bold', marginLeft: '10px' }}>Phone: +91 9819 1232 91</label>
                                                <div style={{ fontWeight: 'bold' }}>Website: https://yogpowerint.com</div>
                                            </CTableDataCell>
                                        </CTableRow>
                                    </CTableBody>
                                </CTable>
                            <CModalFooter>
                                <CButton color="primary" onClick={handlePrint}>Print</CButton>
                            </CModalFooter>
                            </CModalBody>
                      
 </CModal>
}

export default Invoice 