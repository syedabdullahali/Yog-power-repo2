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


const IrregularMemberCall = ({visible,filterObj,id}) => {

    const url = useSelector((el)=>el.domainOfApi) 
    const [AllInvoiceData,setAllInvoiceData] = useState([])
    const [visibalCallUpdateForm,setVisibalCallUpdateForm] = useState(false)
    const [reggularMemberData,setReggularMemberData] = useState([])
    const [followupId,setFollowUpid] = useState('')
    const [updateFormData,setUpdateForm] = useState({
        callTimeing:'',
        discussion:'',
        followupby:'',
        followUpDate:''
    })
    const [staff, setStaff] = useState([])

    function getIrregularMemberCall() {
        axios.get(`${url}/clientAttendance/all`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
             const data =    res.data.reduce((crr,el)=>{
            if(!crr.some((el2)=>el2.clientId===el.clientId)){
                 crr.push(el)
                }
                return crr
            },[])

           const reggularData=   data.map((el)=>{
                let array = []
                res.data.forEach((el2)=>{
                   if(el2.clientId===el.clientId){
                      array.push(el2.checkDate)
                   }
                })    
                array.sort(function(a,b){
                    return new Date(b.date) - new Date(a.date);
                  });
                       el.LastAttended=array.at(-1)    
                       el.createdAt = array.at(0)
               return el                  
             })
             if(!!id){
                setReggularMemberData([...reggularData].filter((el)=>el.clientId===id))
                  return 
             }
                 setReggularMemberData([...reggularData])
            })
            .catch((error) => {
                console.error(error)
            })
    }


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

    useEffect(()=>{
      getIrregularMemberCall()
      getStaff()
    },[])

   


    const saveCallUpDate = async ()=>{
        const uniqClient = reggularMemberData.find((el)=>el._id===followupId)


    const headers = {
            'Authorization': `Bearer ${token}`,
            'My-Custom-Header': 'foobar'
    }


    const emp =  staff.find((el)=>el._id=== updateFormData.followupby)
    updateFormData.followupby= emp.FullName

    const obj ={
        attentanceCallingInfo:{...updateFormData}
    }

    const obj2 = {
        username: username,
        callTimeing: updateFormData.callTimeing,
        callDiscussion: updateFormData.discussion,
        callFollowupby: updateFormData.followupby,
        callFollowUpDate: updateFormData.followUpDate,
        typeOfCall: 'irreguralMemberCall',
        clientId:uniqClient.attentanceId,
        memberId:uniqClient._id,
        clientName:uniqClient.ClientName,
        phone: uniqClient.contact,
        empolyeeId:emp._id,

    }
        axios.post(`${url}/clientAttendance/update/${followupId}`,obj, { headers },
            )
            .then(() => {
                axios.post(`${url}/memberCallReport/create`,obj2, { headers }).then((res)=>{
                    console.log(res.data)
                    alert("successfully submitted")
                    getIrregularMemberCall()
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
                  value={updateFormData.callTimeing}
                  onChange={(e)=>setUpdateForm(prev=>({...prev, callTimeing:e.target.value}))}
                ></CFormInput>
            </CCol>
            <CCol lg={8}>
                <CFormInput
                  type='date'
                  label='Follow up date'
                  value={updateFormData.followUpDate}
                  onChange={(e)=>setUpdateForm(prev=>({...prev,followUpDate:e.target.value}))}
                ></CFormInput>
            </CCol>
            
            <CCol>
                <CFormTextarea rows={4}
                label='Discussion'  
        
                value={updateFormData.discussion}
                onChange={(e)=>setUpdateForm(prev=>({...prev, discussion:e.target.value}))}
                ></CFormTextarea>
            </CCol>
            <CCol lg={8}>
               <CFormSelect
               label='Follow up by'
               value={updateFormData.followupby}
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

    <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={visible}>
                           
    <CTable className='text-center' bordered borderColor="primary" responsive  style={{width:'200%'}}>
        <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
            <CTableRow>
                <CTableHeaderCell scope="col">S.No</CTableHeaderCell>
                <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                <CTableHeaderCell scope="col">Timing</CTableHeaderCell>
                <CTableHeaderCell scope="col">Follow up date</CTableHeaderCell>

                <CTableHeaderCell scope="col">
                    Attendance-Id
                </CTableHeaderCell>
                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Contact</CTableHeaderCell>
                <CTableHeaderCell scope="col">
                    Service
                </CTableHeaderCell>
                <CTableHeaderCell scope="col">Duration</CTableHeaderCell>
                <CTableHeaderCell scope="col">Expiry Date</CTableHeaderCell>
                <CTableHeaderCell scope="col">Last Attended</CTableHeaderCell>
                <CTableHeaderCell scope="col">Discussion</CTableHeaderCell>
                <CTableHeaderCell scope="col">Follow up by</CTableHeaderCell>
                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
            </CTableRow>
        </CTableHead>
        <CTableBody>
        {reggularMemberData.filter((el)=>  
        `${new Date(el.createdAt).getFullYear()}`.includes(filterObj.year)&&
        `${new Date(el.createdAt).getMonth()}`.includes(filterObj.monthName)    
        ).map((el,i)=>
         <CTableRow key={i}>
             <CTableDataCell>{i+1}</CTableDataCell>
             <CTableDataCell>{ moment(el.createdAt).format('YYYY-MM-DD')}</CTableDataCell>
             <CTableDataCell>{el.attentanceCallingInfo?.callTimeing}</CTableDataCell>
             <CTableDataCell>{el.attentanceCallingInfo?.followUpDate}</CTableDataCell>

             <CTableDataCell>{el.attentanceId}</CTableDataCell>
             <CTableDataCell>{el.ClientName}</CTableDataCell>
             <CTableDataCell>{el.contact}</CTableDataCell>
             <CTableDataCell>{el.ServiceName}</CTableDataCell>
             <CTableDataCell>{el.admissionDuration}</CTableDataCell>
             <CTableDataCell>{moment(el.endDate).format('YYYY-MM-DD')}</CTableDataCell>
             <CTableDataCell style={{minWidth:'250px'}}>{(new Date(el.LastAttended).toDateString() +"   "+  new Date(el.LastAttended).toLocaleTimeString())}</CTableDataCell>
             <CTableDataCell style={{minWidth:'250px'}}>{el.attentanceCallingInfo?. discussion}</CTableDataCell>
             <CTableDataCell>{moment(el.followUpDate).format('YYYY-MM-DD')}</CTableDataCell>
             <CTableDataCell className='text-center'>
                    <a href={`tel:${ el?.CountryCode ? el?.CountryCode: '+91'}${el.contact}`} target="_black">
                        <MdCall style={{ cursor: 'pointer', markerStart: '10px' }} size='20px' /></a>
                    <a href={`https://wa.me/${el.contact }`} target="_black">
                        <BsWhatsapp style={{ marginLeft: "4px", cursor: 'pointer', markerStart: '10px' }}
                            size='20px' /></a>
                    <BsPlusCircle className='ms-1'
                        style={{ fontSize: '20px', cursor: 'pointer', markerStart: '10px', color: 'blue' }}
                         onClick={() => callUpdateFun(el._id, el)} />
                </CTableDataCell>
         </CTableRow>
        )}
        </CTableBody>
    </CTable>
</CTabPane>

</>
  )
}

export default IrregularMemberCall
