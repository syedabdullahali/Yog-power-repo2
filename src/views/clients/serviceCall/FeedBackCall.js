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


const FeedBackCall = ({visible,filterObj,id}) => {

    const url = useSelector((el)=>el.domainOfApi) 


    const [feedBackCallsData,setWelcomeCallsData] = useState([])
    const [visibalCallUpdateForm,setVisibalCallUpdateForm] = useState(false)
    const [followupId,setFollowUpid] = useState('')
    const [updateFormData,setUpdateForm] = useState({
        feedBackCallTimeing:'',
        feedBackCallDiscussion:'',
        feedBackCallFollowupby:'',
        feedBackCallFollowUpDate:''
    })
    const [staff, setStaff] = useState([])



    
    function getAllMemberData() {

        const urlPath = !id?`${url}/memberForm/all`:`${url}/memberForm/${id}`

        axios.get(urlPath, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                let  data =  res.data
                if(!!id){
                    data =  [res.data]
                }
                setWelcomeCallsData(data.filter((list) => list.username === username ).reverse())
            })
            .catch((error) => {
                console.error(error)
            })
    }

    useEffect(()=>{
      getAllMemberData()
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
        const uniqClient =  feedBackCallsData.find((el)=>el._id===followupId)


        const headers = {
            'Authorization': `Bearer ${token}`,
            'My-Custom-Header': 'foobar'
        }

const emp =    staff.find((el)=>el._id=== updateFormData.feedBackCallFollowupby)
updateFormData.feedBackCallFollowupby = emp.FullName


const obj ={
    feedBackCallInfo:{...updateFormData}
}

const obj2 = {
    username: username,
    callTimeing: updateFormData.feedBackCallTimeing,
    callDiscussion: updateFormData.feedBackCallDiscussion,
    callFollowupby: updateFormData. feedBackCallFollowupby,
    callFollowUpDate: updateFormData.feedBackCallFollowUpDate,
    typeOfCall: 'feedBackCallInfo',
    clientId:uniqClient.ClientId,
    memberId:uniqClient._id,
    clientName:uniqClient.Fullname,
    phone: uniqClient.ContactNumber,
    empolyeeId:emp._id,
}

        axios.post(`${url}/memberForm/update/${followupId}`,obj, { headers },
            )
            .then(() => {
                axios.post(`${url}/memberCallReport/create`,obj2, { headers }).then((res)=>{
                    alert("successfully submitted")
                    getAllMemberData()
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
        {/* <CRow> */}
            <CCol lg={8}>
                <CFormInput
                  type='time'
                  label='Time'
                  value={updateFormData.feedBackCallTimeing}
                  onChange={(e)=>setUpdateForm(prev=>({...prev,feedBackCallTimeing:e.target.value}))}
                ></CFormInput>
            </CCol>
            <CCol lg={8}>
                <CFormInput
                  type='date'
                  label='Follow up date'
                  value={updateFormData.feedBackCallFollowUpDate}
                  onChange={(e)=>setUpdateForm(prev=>({...prev, feedBackCallFollowUpDate:e.target.value}))}
                ></CFormInput>
            </CCol>
            
            <CCol>
                <CFormTextarea rows={4}
                label='Discussion'  
                value={updateFormData.feedBackCallDiscussion}
                onChange={(e)=>setUpdateForm(prev=>({...prev,feedBackCallDiscussion:e.target.value}))}
                ></CFormTextarea>
            </CCol>
            <CCol lg={8}>
               <CFormSelect
               label='Follow up by'
               value={updateFormData.feedBackCallFollowupby}
               onChange={(e)=>setUpdateForm(prev=>({...prev,feedBackCallFollowupby:e.target.value}))}
               >
                          <option>Select Assign Staff</option>
                          {staff.filter((list) => list.username === username &&
                              list.selected === 'Select').map((item, index) => (
                                  <option key={index} value={item._id} >{item.FullName}</option>
                              ))}
               </CFormSelect>
            </CCol>
        {/* </CRow> */}
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisibalCallUpdateForm(false)}>
          Close
        </CButton>
        <CButton color="primary" onClick={()=> saveCallUpDate()} >Save call update</CButton>
      </CModalFooter>
    </CModal>
    <CTabPane className='text-center' role="tabpanel" aria-labelledby="home-tab" visible={visible} style={{width:'160%'}}>
                                
                                <CTable bordered borderColor="primary" responsive>
                                    <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                                        <CTableRow>
                                            <CTableHeaderCell scope="col">S.No</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Follow up date</CTableHeaderCell>

                                            <CTableHeaderCell scope="col">Timing</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">
                                                Client_Id
                                            </CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Contact</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">
                                                service
                                            </CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Discussion</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Counseller</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Follow up by</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                                        </CTableRow>
                                    </CTableHead>
                                    <CTableBody>
                                       
                  {feedBackCallsData.filter((el)=>  
                                    `${new Date(el.createdAt).getFullYear()}`.includes(filterObj.year)&&
                                    `${new Date(el.createdAt).getMonth()}`.includes(filterObj.monthName) &&
                                       el?.AssignStaff?.includes(filterObj.staffName)    
                                     ).map((el, i) =>
                      <CTableRow key={i}>
                          <CTableDataCell>{i + 1}</CTableDataCell>
                          <CTableDataCell>{moment(el.createdAt).format('YYYY-MM-DD')}</CTableDataCell>
                          <CTableDataCell>{el?.feedBackCallInfo?.feedBackCallFollowUpDate}</CTableDataCell>
                          <CTableDataCell>{el?.feedBackCallInfo?.feedBackCallTimeing}</CTableDataCell>
                          <CTableDataCell>{el.ClientId}</CTableDataCell>
                          <CTableDataCell>{el.Name}</CTableDataCell>
                          <CTableDataCell>{el.ContactNumber}</CTableDataCell>
                          <CTableDataCell>{el.serviceName}</CTableDataCell>
                          <CTableDataCell>{el?.feedBackCallInfo?.feedBackCallDiscussion}</CTableDataCell>
                          <CTableDataCell>{el.AssignStaff}</CTableDataCell>
                          <CTableDataCell>{el?.feedBackCallInfo?.feedBackCallFollowupby}</CTableDataCell>
                          <CTableDataCell className='text-center'>
                              <a href={`tel:${ el?.CountryCode ? el?.CountryCode : '+91' }${ el.ContactNumber }`} target="_black">
                                  <MdCall style={{ cursor: 'pointer', markerStart: '10px' }} size='20px' /></a>
                              <a href={`https://wa.me/${ el.ContactNumber }`} target="_black">
                                  <BsWhatsapp style={{ marginLeft: "4px", cursor: 'pointer', markerStart: '10px' }}
                                      size='20px' /></a>

                              <BsPlusCircle className='ms-1'
                                  style={{ fontSize: '20px', cursor: 'pointer', markerStart: '10px', color: 'blue' }} onClick={() => callUpdateFun(el._id, el)} />
                          </CTableDataCell>
                      </CTableRow>
                  )}
              </CTableBody>
          </CTable>
                            </CTabPane>
</>

  )
}

export default FeedBackCall
