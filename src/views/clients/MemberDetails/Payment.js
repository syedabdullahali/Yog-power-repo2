import { CButton, CCardTitle, CCol, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import ViewInvoice from 'src/components/ViewInvoice'
const url = 'https://yog-seven.vercel.app'
const url2 = 'https://yog-seven.vercel.app'
import { useSelector } from 'react-redux'

const  AddNewInvoice  = React.lazy(()=>import('src/components/AddNewInvoice'))



const Payment = ({ id }) => {

    const [viewInvoice, setViewInvoice] = useState(false);

    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;
    const username = user.user.username;
    const centerCode = user.user.centerCode;
    const [invoiceData, setInvoiceData] = useState([]);
    const [clinetInfoData,setClientInfo] = useState([])
    const url1 = useSelector((el)=>el.domainOfApi) 

    const headers = {
        'Authorization': `Bearer ${token}`,
        'My-Custom-Header': 'foobar'
    };
    useEffect(() => {
        getDetails()
        clinetInfo()
    }, []);

  async  function getDetails() {
  
  const {data} = await axios.get(`${url1}/Invoice/all`,{headers})    
    setInvoiceData(data?.filter((el)=>el.MemberId===id))
  

 }


 const getDate = (date,val) => {

    const date2 = new Date(date).getDate() + "/" + (new Date(date).getMonth() + (val? 1:0)) + "/" + new Date(date).getFullYear()
    if (date2 === 'NaN/NaN/NaN') {
        return 'Invalid Date'
    }
    return date2

}


async function clinetInfo(){
const {data} = await axios.get(`${url1}/memberForm/${id}`,{headers})
  setClientInfo(data)
}




  

    return (
        <CRow>
             {<AddNewInvoice data23={clinetInfoData}
             viewInvoice ={viewInvoice}
             setViewInvoice={setViewInvoice}
             getDetails={getDetails}
             
              id={id}/>}

            <CCol xs={12}>
                <div className='d-flex justify-content-between mb-2'>
                    <div className='mt-2 ms-2'>
                        <CCardTitle>Payments </CCardTitle>
                    </div>
               
                </div>
            </CCol>
            <CCol xs={12}>
                <div className='d-flex justify-content-between mb-2'>
                    <div className='mt-2 ms-2'>
                    </div>
                    <div className='justify-content-around'>
                        <CButton style={{ margin: '5px' }} onClick={()=>setViewInvoice(true)}>New Invoice</CButton>
                    </div>

                </div>
            </CCol>
            <CCol xs={12}>
               
                <CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345" }} hover responsive>
                    <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                        <CTableRow>
                            <CTableHeaderCell scope="col">Invoice Date</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Member Name</CTableHeaderCell>
                            <CTableHeaderCell scope="col">
                                Invoice No
                            </CTableHeaderCell>
                            <CTableHeaderCell scope="col">Amonut</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Tax</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Paid</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Pending</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Mode</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {invoiceData.map((item, index) => (
                            <CTableRow key={index}>
                                <CTableDataCell>{getDate(item.createdAt)}</CTableDataCell>
                                <CTableDataCell>{item.MemberName}</CTableDataCell>
                                <CTableDataCell>{item.InvoiceNo}</CTableDataCell>
                                <CTableDataCell>{item.amount}</CTableDataCell>
                                <CTableDataCell>{item.fees / 100 * item.tax }</CTableDataCell>
                                <CTableDataCell>{item.paidAmount}</CTableDataCell>
                                <CTableDataCell>{item.pendingAmount}</CTableDataCell>
                                <CTableDataCell>{item.paymode}</CTableDataCell>
                                <CTableDataCell>{item.paymode}</CTableDataCell>


                            </CTableRow>
                        ))}
                    </CTableBody>
                </CTable>
            </CCol>
        </CRow>
    )
}

export default Payment