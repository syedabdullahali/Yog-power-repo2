import { cilArrowCircleBottom, cilArrowCircleTop } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import { MdCall, MdDelete, MdEdit, MdMail } from 'react-icons/md';
import { BsPlusCircle, BsWhatsapp } from 'react-icons/bs';
import {
    CButton,
    CButtonGroup,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CFormInput,
    CFormSelect,
    CInputGroup,
    CInputGroupText,
    CNav,
    CNavItem,
    CNavLink,
    CRow,
    CTabContent,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CTabPane,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CFormTextarea
} from '@coreui/react'
import React, { useState,useCallback,useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import moment  from  'moment/moment';

let user = JSON.parse(localStorage.getItem('user-info'))
const token = user.token;
const username = user.user.username;



const PaymentCallsTable = ({visible,filterObj,id}) => {

    const url = useSelector((el)=>el.domainOfApi) 

    const [AllInvoiceData,setAllInvoiceData] = useState([])
    const [visibalCallUpdateForm,setVisibalCallUpdateForm] = useState(false)
    const [followupId,setFollowUpid] = useState('')
    const [updateForm,setUpdateForm] = useState({
        callTimeing:'',
        discussion:'',
        followupby:'',
        followUpDate:''
    })
    const [staff, setStaff] = useState([])

const getAllInvoiceData = async ()=>{

        const {data} = await axios.get(`${url}/invoice/all`,{ 
                  headers: {
                      'Authorization': `Bearer ${token}`
                  }})
                  
                  if(!!id){
                    setAllInvoiceData(data.filter((el)=>el.MemberId===id).reverse())
                    return 
                  }
          
          setAllInvoiceData(data.filter((el)=>el.pendingAmount).reverse())                    
  }   

  useEffect(()=>{
    getAllInvoiceData()
    getStaff()
  },[])

  function getStaff() {
    axios.get(`${url}/employeeform`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then((res) => {
            setStaff(res.data)
        })
        .catch((error) => {
            console.error(error)
        })
}
  


  const saveCallUpDate = async ()=>{
    const headers = {
        'Authorization': `Bearer ${token}`,
        'My-Custom-Header': 'foobar'
    }
 
    const uniqClient = AllInvoiceData.find((el)=>el._id===followupId)

    const emp =  staff.find((el)=>el._id=== updateForm.followupby)
    updateForm.followupby= emp.FullName


    const obj2 = {
      username: username,
      callTimeing: updateForm.callTimeing,
      callDiscussion: updateForm.discussion,
      callFollowupby: updateForm.followupby,
      callFollowUpDate: updateForm.followUpDate,
      typeOfCall: 'paymentCallsInfo',
      clientId:uniqClient.clientId ,
      memberId:uniqClient.MemberId,
      clientName:uniqClient.MemberName ,
      phone: uniqClient.contact ,
      empolyeeId:emp._id,
  }
  

    axios.post(`${url}/invoice/update/${followupId}`, updateForm, { headers },
        )
        .then(() => {
            axios.post(`${url}/memberCallReport/create`,obj2, { headers }).then((res)=>{
              console.log(res.data)
              alert("successfully submitted")
              getAllInvoiceData()
          })

         
        })
            .catch((error) => {
                      console.error(error)
        })           
               
}   


 const callUpdateFun=(id)=>{
    setFollowUpid(id)
    setVisibalCallUpdateForm(true)
 }

  return (
    <>
  <CModal size='lg' alignment="start" visible={(visible && visibalCallUpdateForm)} onClose={() => setVisibalCallUpdateForm(false)}>
      <CModalHeader>
        <CModalTitle>Call Update</CModalTitle>
      </CModalHeader>
      <CModalBody>
            <CCol lg={8}>
                <CFormInput
                  type='time'
                  label='Time'
                  value={updateForm.callTimeing}
                  onChange={(e)=>setUpdateForm(prev=>({...prev,callTimeing:e.target.value}))}
                ></CFormInput>
            </CCol>
            <CCol lg={8}>
                <CFormInput
                  type='date'
                  label='Follow up date'
                  value={updateForm.followUpDate}
                  onChange={(e)=>setUpdateForm(prev=>({...prev,followUpDate:e.target.value}))}
                ></CFormInput>
            </CCol>
            
            <CCol>
                <CFormTextarea rows={4}
                label='Discussion'  
                value={updateForm.discussion}
                onChange={(e)=>setUpdateForm(prev=>({...prev,discussion:e.target.value}))}
                ></CFormTextarea>
            </CCol>
            <CCol lg={8}>
               <CFormSelect
               label='Follow up by'
               value={updateForm.followupby}
               onChange={(e)=>setUpdateForm(prev=>({...prev,followupby:e.target.value}))}
               >
                          <option>Select Assign Staff</option>
                          {staff.filter((list) => list.username === username &&
                              list.selected === 'Select').map((item, index) => (
                                  <option key={index} value={item._id} >{item.FullName}</option>
                              ))}
               </CFormSelect>
            </CCol>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisibalCallUpdateForm(false)}>
          Close
        </CButton>
        <CButton color="primary" onClick={()=> saveCallUpDate()} >Save call update</CButton>
      </CModalFooter>
    </CModal>

    <CTabPane responsives role="tabpanel" aria-labelledby="home-tab" visible={visible} style={{width:'200%'}} >


                            
<CTable bordered borderColor="primary" responsive >
                                    <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }}  >
                                        <CTableRow>
                                            <CTableHeaderCell scope="col">S.No</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Invoice Date</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Follow up date</CTableHeaderCell>

                                            <CTableHeaderCell scope="col">Timing</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">
                                                Client-Id
                                            </CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Contact</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">
                                                Service
                                            </CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Duration</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Total Amount</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Paid</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Balance</CTableHeaderCell>
                                            <CTableHeaderCell scope="col" style={{maxWidth:'300px'}} >Discussion</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Counseller</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Follow up by</CTableHeaderCell>

                                            <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                                        </CTableRow>
                                    </CTableHead>
                                    <CTableBody>
                                    {AllInvoiceData.filter((el)=>  
                                    `${new Date(el.createdAt).getFullYear()}`.includes(filterObj.year)&&
                                    `${new Date(el.createdAt).getMonth()}`.includes(filterObj.monthName) &&
                                         el?.counseller?.includes(filterObj.staffName)    
                                     ).map((el,i)=>
                                     <CTableRow key={i}>
                                         <CTableDataCell>{i+1}</CTableDataCell>
                                         <CTableDataCell>{moment(el.createdAt).format('YYYY-MM-DD')}</CTableDataCell>
                                         <CTableDataCell>{moment(el?.followUpDate).format('YYYY-MM-DD')}</CTableDataCell>
                                         <CTableDataCell>{el?.callTimeing? el.callTimeing:'No call timeing yet'}</CTableDataCell>
                                         <CTableDataCell>{el.clientId}</CTableDataCell>
                                         <CTableDataCell>{el.MemberName}</CTableDataCell>
                                         <CTableDataCell>{el.contact}</CTableDataCell>
                                         <CTableDataCell>{el.ServiceName}</CTableDataCell>
                                         <CTableDataCell>{el.duration}</CTableDataCell>
                                         <CTableDataCell>{el.amount}</CTableDataCell>
                                         <CTableDataCell>{el.paidAmount + el?.Receipts?.reduce((crr,el2)=>crr+ +el2.PaidAmount,0)}</CTableDataCell>
                                         <CTableDataCell>{el.pendingAmount}</CTableDataCell>
                                         <CTableDataCell>{el?.discussion?el.discussion:'No call discussion yet'}</CTableDataCell>
                                         <CTableDataCell>{el.counseller }</CTableDataCell>
                                         <CTableDataCell>{el?.followupby?el.followupby:'No one available  yet'}</CTableDataCell>
                                             
                                         <CTableDataCell className='text-center'>
                                                <a href={`tel:${el?.CountryCode?el?.CountryCode:'+91'}${el.contact}`} target="_black">
                                                    <MdCall style={{ cursor: 'pointer', markerStart: '10px' }} size='20px' /></a>
                                                    <a href={`https://wa.me/${el.contact}`} target="_black">
                                            <BsWhatsapp style={{ marginLeft: "4px", cursor: 'pointer', markerStart: '10px' }}
                                             size='20px' /></a>

                                                <BsPlusCircle  className='ms-1'
                                                   style={{fontSize:'20px', cursor: 'pointer', markerStart: '10px',color:'blue' }} onClick={()=>callUpdateFun(el._id,el)} />                                               
                                            </CTableDataCell>




                                     </CTableRow>
                                    )}
                                    </CTableBody>
                                </CTable>
</CTabPane>
</>

  )
}

export default PaymentCallsTable
