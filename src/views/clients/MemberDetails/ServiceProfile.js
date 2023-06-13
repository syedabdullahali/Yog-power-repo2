import { CButton, CCard, CCardTitle, CCol, CFormSelect, CImage, CRow,CTable,CTableHead,CTableHeaderCell,CTableBody,CTableRow,CTableDataCell } from '@coreui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ProfileIcon from 'src/assets/images/avatars/profile_icon.png'
import { useSelector } from 'react-redux'

const ServiceProfile = ({ id }) => {
    console.log(id ,"service profile")
    const url1 = useSelector((el)=>el.domainOfApi) 

    const [result, setResult] = useState([])
    const [allInvoiceData,setAllInvoiceData] = useState([])
    const [active,setActive] = useState(false)

    let user = JSON.parse(localStorage.getItem('user-info'))
    console.log(user);
    const token = user.token;
    const username = user.user.username;
    const centerCode = user.user.centerCode;

    useEffect(() => {
        getDetails(id)
    }, [])

function getDetails(id) {
        const headers = {
            'Authorization': `Bearer ${token}`,
            'My-Custom-Header': 'foobar'
        };

 const data2 = axios.get(`${url1}/memberForm/${id}`, {
   headers
})
  
    data2.then(({data}) => {
        setResult(data)  
        getInvoiceData(data)
            })
    .catch((error) => {
    console.error(error)
    })
}

function getInvoiceData(data){
    const headers = {
        'Authorization': `Bearer ${token}`,
        'My-Custom-Header': 'foobar'
    };
    axios.get(`${url1}/invoice/${data.invoiceId}`, { headers }).then(({data})=>{
        setAllInvoiceData(data)
     })


}

const getDate = (date,val) => {

    const date2 = new Date(date).getDate() + "/" + (new Date(date).getMonth() + (val? 1:0)) + "/" + new Date(date).getFullYear()
    if (date2 === 'NaN/NaN/NaN') {
        return 'Invalid Date'
    }
    return date2

}


console.log(allInvoiceData,result,"game on")



    return (
        <CRow>
            <CCol xs={12}>
                <div className='d-flex justify-content-between mb-2'>
                    <div className='mt-2 ms-2'>
                        <CCardTitle>Service {result?.MemberName}</CCardTitle>
                    </div>
                    
                </div>
            </CCol>
             
            <CCol xs={3} lg={3} sm={3}>
                <CImage className="mb-1" style={{ borderRadius: "20px" }} width={'200px'} src={ProfileIcon} />
            </CCol>
             
            <CCol xs={3} lg={3} sm={3}>
                      <p >Member Id:- {result?.ClientId}</p>
                      <p>Attendance ID : {result?.AttendanceID}</p>
                      <p>Service: {allInvoiceData?.ServiceName} </p>
                      <p>Total Loyalty Points</p>
                      <CButton size='sm'>Add/View Loyalty Points</CButton>

            </CCol>

            <CCol xs={3} lg={3} sm={3}>
                     <p>Membership status :</p>
                     <p>Start From : </p>
                     <p>Packeges Amount:</p>
                     <p>Referrals (0)</p>
                     <p>No of Shop Item: 0</p>
            </CCol>
                     
            <CCol xs={3} lg={3} sm={3}>
        
                     <p>{result?.status}</p>
                     <p>{ getDate(allInvoiceData?.startDate,true)}</p>
                     <p> Rs {allInvoiceData?.amount}</p>
                     <p>Referrals Value(0)</p>
                     <p>Shop Value: 0</p>

            </CCol>
        
            <CCol xs={12} className='mt-4'>
                <CRow >
                    <CCol xs={2}>
                        <CButton className='ml-1' size='sm' color='dark'  >Resync To Device</CButton></CCol>
                    <CCol xs={2}>
                        <CButton className='ml-1'  size='sm' color='dark' >Delete Member</CButton></CCol>
                    <CCol xs={2}>
                        <CFormSelect 
                            aria-label="Select Currency"
                            size='sm'
                        >
                            <option>Select</option>
                        </CFormSelect>
                        
                        </CCol>
                    <CCol xs={2}>
                        <CButton className='ml-1' color='dark'  size='sm'>Add Fingerprint</CButton>
                    </CCol>

                </CRow>
            </CCol>
            <CCol  className='mt-4'>
          

                <div style={{overflowX:'scroll',boxSizing:'border-box'}} >
    
    <CTable  >
         <CTableHead >
            <CTableHeaderCell className='p-3'>Singal  Center Membership</CTableHeaderCell>
            <CTableHeaderCell className='p-3'>Multiple Center Membership</CTableHeaderCell>
            <CTableHeaderCell className='p-3'>Postpaid Membership</CTableHeaderCell>
      
         </CTableHead>
         <CTableBody>
           <CTableRow className='text-center'>
               <CTableDataCell>Only one Center Services</CTableDataCell>
               <CTableDataCell>Multiclub Access Services</CTableDataCell>
               <CTableDataCell>Postpaid Services</CTableDataCell>
           </CTableRow>
         </CTableBody>
    </CTable>
    </div>
            </CCol>

            <CCol xs={12}>
                <CCard style={{ padding: '15px' }} className='mt-2'>
                    <CRow>
                         <CCol className='d-flex '>

                        <CCol>
                            <b>Service Id</b> : <br/> 2068115
                        </CCol>
                        <CCol>
                            <b>Service Name</b> :<br/>
                            {allInvoiceData?.ServiceName}
                        </CCol>
                        <CCol>
                            <b>Duration:</b><br/> {allInvoiceData?.duration}
                        </CCol>
                        <CCol>
                             <b>Packages:</b> <br/>{allInvoiceData?.PackageName}
                        </CCol>
                        </CCol>

                        <CCol className='d-flex '>
                       
                        <CCol>
                             <b>TOTAL DAYS</b> <br/>

                             {
                            Math.ceil(new Date(allInvoiceData?.endDate) -new Date(allInvoiceData?.startDate))/(1000*60*60*24) 
                             } days
                        </CCol>
                        <CCol>
                              <b>START DATE</b> <br/>{getDate(allInvoiceData?.startDate,true)}
                        </CCol>
                        <CCol>
                              <b>EXPIRY DATE</b> <br/>{getDate(allInvoiceData?.endDate,true)}
                        </CCol>
                        <CCol>
                              <b>Status </b><br/>{result?.status}
                        </CCol>  
                        </CCol>    
  
                        
 
                    </CRow>
                    <CRow>
                        {/* <CCol>Duration: {result?.PackageName}</CCol> */}
                    </CRow>
                    {/* <CRow><CCol>PT Staff: {result?.counseller}</CCol></CRow>
                    <CRow><CCol>Sessions : Not Applicable</CCol></CRow> */}
                    <CRow>
                        {/* <CCol>Status : {result?.status}</CCol> */}
                        {/* <CCol>Last visited on : - <CButton>Attendance</CButton></CCol> */}
                        <CCol></CCol>
                    </CRow>
                    <CRow>
                        {/* <CCol>

                            <div className='d-flex justify-content-between mb-2'>
                                <div className='justify-content-around'>
                                    <CButton style={{ margin: '5px' }}>Upgrade</CButton>
                                    <CButton style={{ margin: '5px' }}>Suspend</CButton>
                                    <CButton style={{ margin: '5px' }}>Staff Update</CButton>
                                    <CButton style={{ margin: '5px' }}>Add Appointment</CButton>
                                    <CButton style={{ margin: '5px' }}>Cancel/Refund</CButton>
                                </div>
                            </div>
                        </CCol> */}
                    </CRow>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default ServiceProfile