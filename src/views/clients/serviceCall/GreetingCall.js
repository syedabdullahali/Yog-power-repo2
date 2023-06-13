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
    CFormTextarea,
    CCardTitle,
    CCardText
} from '@coreui/react'
import React, { useState,useCallback,useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import moment  from  'moment/moment';

let user = JSON.parse(localStorage.getItem('user-info'))
const token = user.token;
const username = user.user.username;


const GreetingCall = ({visible,filterObj,id}) => {

    const url = useSelector((el)=>el.domainOfApi) 
    const [greatingCallsData,setgreatingCallsData] = useState([])
    const [visibalCallUpdateForm,setVisibalCallUpdateForm] = useState(false)
    const [followupId,setFollowUpid] = useState('')
    const [closestBirthDay,setClosestBirthDay] = useState([])
    
    const [updateFormData,setUpdateForm] = useState({
        greetingCallTiming:'',
        greetingDiscussion:'',
        greetingFollowupby:'',
        greetingFollowUpDate:''
    })
    const [staff, setStaff] = useState([])


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

                const data1 =  getAge(data.filter((list) => list.username === username ).reverse())
                data.sort((b,a)=>(a.allTotalOfBartDay-a.totalDaysOfBarthDay)-(b.allTotalOfBartDay-b.totalDaysOfBarthDay))
                const dataDoneBirthDay = data1.filter((el)=>(el.allTotalOfBartDay-el.totalDaysOfBarthDay)<0)
                const dataBirthDay = data1.filter((el)=>(el.allTotalOfBartDay-el.totalDaysOfBarthDay)>=0).reverse()


                setClosestBirthDay(data1.filter((el)=> {
                    const val = (el.allTotalOfBartDay-el.totalDaysOfBarthDay)
                    if(0<=val&&val<=2){
                        return true
                    }                
                }).reverse() )
                 
                

                setgreatingCallsData([...dataBirthDay,...dataDoneBirthDay])
                
            })
            .catch((error) => {
                console.error(error)
            })
    }

useEffect(()=>{
    getAllMemberData()
    getStaff()
},[])

const saveCallUpDate = async ()=>{

    const uniqClient = greatingCallsData.find((el)=>el._id===followupId)

    const emp =    staff.find((el)=>el._id=== updateFormData.greetingFollowupby)
    updateFormData.greetingFollowupby = emp.FullName

    const headers = {
        'Authorization': `Bearer ${token}`,
        'My-Custom-Header': 'foobar'
    }

    const obj ={
         greetingCallInfo:{...updateFormData}
    }

    const obj2 = {
       username: username,
       callTimeing: updateFormData.greetingCallTiming,
       callDiscussion: updateFormData.greetingDiscussion,
       callFollowupby: updateFormData.greetingFollowupby,
       callFollowUpDate: updateFormData.greetingFollowUpDate,
       typeOfCall:'greetingCall',
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
                console.log(res.data)
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

function getAge(memberData){
return memberData.map((el)=>{
const obj  ={clientId:'',
totalDaysOfBarthDay:0,
allTotalOfBartDay:0,
incrementTotalDaysOfBarthFun(){
this.totalDaysOfBarthDay++
},
allTotalDaysOfBarthFun(){
   this.allTotalOfBartDay++
}    
}
const increment1 = ()=>{
obj.incrementTotalDaysOfBarthFun()
}
const increment2 =()=>{
obj.allTotalDaysOfBarthFun()
}


function getDaysInMonth(month, year,breaKDate,incrementFun) {
    var date = new Date(year, month, 1);
    while (date.getMonth() <= new Date(breaKDate).getMonth() || date.getDate() <= new Date(breaKDate).getDate()) {
      incrementFun()
      date.setDate(date.getDate() + 1);
    }

  }
  getDaysInMonth(0,new Date().getFullYear(),new Date(),increment1)
  getDaysInMonth(0,new Date().getFullYear(),new Date(el.DateofBirth),increment2)

return {...el,...obj}
})

}


function birtDayStatus(list){
if(list.allTotalOfBartDay-list.totalDaysOfBarthDay>0){
return ` Birth Day next ${list.allTotalOfBartDay-list.totalDaysOfBarthDay} days `
}else if(list.allTotalOfBartDay-list.totalDaysOfBarthDay===0){
    return `Happy Birth Day 🎊`
}else{
    return `Birth Day Done`
}
}

function compare1WeekFunction(list){
    const val = list.allTotalOfBartDay-list.totalDaysOfBarthDay
if(0<= val && val<=7){
        return true
}
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
                  value={updateFormData.greetingCallTiming}
                  onChange={(e)=>setUpdateForm(prev=>({...prev,greetingCallTiming:e.target.value}))}
                ></CFormInput>
            </CCol>
            <CCol lg={8}>
                <CFormInput
                  type='date'
                  label='Follow up date'
                  value={updateFormData.greetingFollowUpDate}
                  onChange={(e)=>setUpdateForm(prev=>({...prev,greetingFollowUpDate:e.target.value}))}
                ></CFormInput>
            </CCol>
            
            <CCol>
                <CFormTextarea rows={4}
                label='Discussion'  
        
                value={updateFormData.greetingDiscussion}
                onChange={(e)=>setUpdateForm(prev=>({...prev, greetingDiscussion:e.target.value}))}
                ></CFormTextarea>
            </CCol>
            <CCol lg={8}>
               <CFormSelect
               label='Follow up by'
               value={updateFormData.greetingFollowupby}
               onChange={(e)=>setUpdateForm(prev=>({...prev,greetingFollowupby:e.target.value}))}
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

    {visible&& closestBirthDay.map((el)=>{
     const color = el.allTotalOfBartDay-el.totalDaysOfBarthDay===0?'darkslateblue':'white'
     const colorText = el.allTotalOfBartDay-el.totalDaysOfBarthDay===0?'white':'black'

   return <CCard
        
      textColor={colorText}
      className={`me-2 mb-3 border-top-${'dark'} border-top-3`}
      style={{ width: '18rem' ,display:'inline-block',backgroundColor:color}}

    >
      <CCardHeader><h4>{el.Fullname}</h4></CCardHeader>
      <CCardBody>
        <CCardTitle>Date of Birth</CCardTitle>
        <CCardTitle>{moment(el.DateofBirth).format('YYYY-MM-DD')}</CCardTitle>
        <CCardText>
        {el.allTotalOfBartDay-el.totalDaysOfBarthDay===0?
       `Happy Birthday ${el.Fullname} 🎂 `:`Barth day in next ${el.allTotalOfBartDay-el.totalDaysOfBarthDay} days`
    }
        </CCardText>
      </CCardBody>
    </CCard>
    }) }

    <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={visible} style={{width:'200%'}}>
                                
    <CTable bordered  responsive>
        <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
            <CTableRow>
                <CTableHeaderCell scope="col">S.No</CTableHeaderCell>
                <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                <CTableHeaderCell scope="col">Follow up date</CTableHeaderCell>

                <CTableHeaderCell scope="col">Timing</CTableHeaderCell>
                <CTableHeaderCell scope="col">
                    Client Id
                </CTableHeaderCell>
                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Contact</CTableHeaderCell>
                <CTableHeaderCell scope="col">
                    Service
                </CTableHeaderCell>
                <CTableHeaderCell scope="col">Expiry Date</CTableHeaderCell>
                <CTableHeaderCell scope="col">Date of Birth</CTableHeaderCell>
                <CTableHeaderCell scope="col">Birth day status </CTableHeaderCell>
                <CTableHeaderCell scope="col">Discussion</CTableHeaderCell>
                <CTableHeaderCell scope="col">Counseller</CTableHeaderCell>
                <CTableHeaderCell scope="col">Follow up by</CTableHeaderCell>
                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
            </CTableRow>
        </CTableHead>
        <CTableBody>
        {greatingCallsData.filter((el)=> 
        `${new Date(el.createdAt).getFullYear()}`.includes(filterObj.year)&&
        `${new Date(el.createdAt).getMonth()}`.includes(filterObj.monthName)&&
          el?.AssignStaff?.includes(filterObj.staffName)    
       )    
        .map((el,i)=>
         <CTableRow 
         style={{color:birtDayStatus(el)===`Happy Birth Day 🎊`?'blueviolet':'black'}} 
         color={compare1WeekFunction(el)?'success':'white'}  
         key={i}
          className='text-center'>
             <CTableDataCell>{i+1}</CTableDataCell>
             <CTableDataCell>{moment(el.createdAt).format('YYYY-MM-DD')}</CTableDataCell>
             <CTableDataCell>{el?.greetingCallInfo?.greetingFollowUpDate}</CTableDataCell>
             <CTableDataCell>{el?.greetingCallInfo?.greetingCallTiming}</CTableDataCell>
             <CTableDataCell>{el.ClientId}</CTableDataCell>
             <CTableDataCell>{el.Fullname}</CTableDataCell>
             <CTableDataCell>{el.ContactNumber}</CTableDataCell>
             <CTableDataCell>{el.serviceName}</CTableDataCell>
             <CTableDataCell>{moment(el.endDate).format('YYYY-MM-DD')}</CTableDataCell>
             <CTableDataCell>{moment(el.DateofBirth).format('YYYY-MM-DD')}</CTableDataCell>
             <CTableDataCell >{birtDayStatus(el)}</CTableDataCell>
             <CTableDataCell>{el?.greetingCallInfo?.greetingDiscussion}</CTableDataCell>
             <CTableDataCell>{el?.AssignStaff}</CTableDataCell>
             <CTableDataCell>{el?.greetingCallInfo?.greetingFollowupby}</CTableDataCell>

            
             <CTableDataCell className='text-center'>
                    <a href={`tel:${ el?.CountryCode ? el?.CountryCode: '+91' }${ el.ContactNumber }`} target="_black">
                        <MdCall style={{ cursor: 'pointer', markerStart: '10px' }} size='20px' /></a>
                    <a href={`https://wa.me/${el.ContactNumber }`} target="_black">
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

export default GreetingCall
