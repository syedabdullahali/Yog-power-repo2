import React, { useEffect, useState } from 'react'
import {
    CButton,
    CButtonGroup,
    CCard,
    CCardBody,
    CCardHeader,
    CCardTitle,
    CCol,
    CFormInput,
    CFormSelect,
    CInputGroup,
    CInputGroupText,
    CPagination,
    CPaginationItem,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CForm,
    CModal,
    CModalHeader,
    CModalBody,
    CModalTitle
} from '@coreui/react'
import { useSelector } from 'react-redux';
import axios from 'axios';
let user = JSON.parse(localStorage.getItem('user-info'))
const token = user.token;
const username = user.user.username;


const headers = {
    "Authorization": `Bearer ${token}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
   }


const TrainerSalarySliipFrom = ({updateActive,getData}) => {
    const url = useSelector((el) => el.domainOfApi)
   
    
  const [trainerSlarySlipObj,setTrainerSlarySlipObj] = useState({
    username: username,
    date:new Date(),
    trainerName:'',   
    prHourSalary:0,
    totalWorkingHours:0,
    amount:0,
    tds:0,
    pt:0,
    advDec:0,
    modeOfPayment:'',
    totalAmount:0,
    trainerId:''
  }
) 

const [tdsamount,setTdsAmount] = useState(0)

const [staff, setStaff] = useState([])

const selectedStaff =  staff?.find((el)=>el?._id===trainerSlarySlipObj.trainerId)

function getStaff() {
    axios.get(`${url}/employeeform`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then((res) => {
            setStaff(res.data.filter((el)=>{
               return  el.EmployeeCategory.trim()==='Freelancer'||el.trainerStatus?true:false
            }).reverse())
        })
        .catch((error) => {
            console.error(error)
        })
}
useEffect(()=>{
    getStaff()
},[])



useEffect(()=>{
if(!trainerSlarySlipObj.tds){
      return 
}
setTdsAmount(trainerSlarySlipObj.totalAmount/100 *trainerSlarySlipObj.tds)
},[trainerSlarySlipObj.totalAmount,trainerSlarySlipObj.tds])


const saveData = async  (type)=>{
   const data = {...trainerSlarySlipObj,trainerName:selectedStaff.FullName,amount:
     trainerSlarySlipObj.totalAmount-tdsamount-+trainerSlarySlipObj.pt-+trainerSlarySlipObj.advDec}


   let response ={}
   try{
     if(type==='Save'){
       response = await  axios.post(`${url}/trainerSalarySlip/create`,data,{headers})
     }
     if(type==='Update'){
      response = await  axios.post(`${url}/trainerSalarySlip/update/${updateActive.obj?._id}`,data,{headers})
     }
    if(response?.status===200){
        getData()
     alert('successfully save')
    }
     }catch(error){
       console.error(error)
     }
   
}


useEffect(()=>{
if(updateActive?.visible){
setTrainerSlarySlipObj(updateActive?.obj)
}else{
setTrainerSlarySlipObj({ 
    username: username,
    date:new Date(),
    trainerName:'',   
    prHourSalary:0,
    totalWorkingHours:0,
    amount:0,
    tds:0,
    pt:0,
    advDec:0,
    modeOfPayment:'',
    totalAmount:0,
    trainerId:''
  } )
  setTdsAmount(0)
}
},[updateActive?.visible])



  return (
    <CCard className="mb-3 border-success mt-4">
                    <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                        <CCardTitle className="mt-2">Trainer salary slip form</CCardTitle>
                    </CCardHeader>
                    <CCardBody>

    <CRow className='text-start mb-4'>
            <CCol sm={4}>
              <h5>Trainer Salry Date</h5>
              <CFormInput
              size='lg'
              type='date'
              value={trainerSlarySlipObj.date}
              onChange={(e)=>setTrainerSlarySlipObj(prev=>({...prev, date:e.target.value}))}
              />
           
              </CCol>         
    </CRow>


           <CRow>
            <CCol >
              <CFormSelect
              label='Trainer Name'
              value={trainerSlarySlipObj.trainerId}
              onChange={(e)=>setTrainerSlarySlipObj(prev=>({...prev, trainerId:e.target.value}))}
              >
                <option value=''>Select Employee</option>
                        {staff.filter((list) => list.username === username &&
                          list.selected === 'Select').map((item, index) => (
                            <option key={index} value={item._id}> {item.FullName}</option>
                          ))}
              </CFormSelect>
              </CCol>
              <CCol>
              <CFormInput
              label='Total Working Hour'
              type='number'
              value={trainerSlarySlipObj.totalWorkingHours}
              onChange={(e)=>{
                setTrainerSlarySlipObj(prev=>{
                   return ({...prev,totalWorkingHours:e.target.value,totalAmount:prev.prHourSalary*e.target.value})
                
                })
            
            }}      
            >
              </CFormInput>
              </CCol>
             
        </CRow>
        <CRow>
            <CCol>
            <CFormInput
              label='Per Hour Amount'
              value={trainerSlarySlipObj.prHourSalary}
              onChange={(e)=>{
                setTrainerSlarySlipObj(prev=>{
                return   ({...prev,prHourSalary:e.target.value,totalAmount:prev.totalWorkingHours*e.target.value})
                
                })
              }}
              >
              </CFormInput>
            </CCol>
            <CCol>
            <CFormInput
              label='Total Amount'
              value={trainerSlarySlipObj.totalAmount}
              >
              </CFormInput>
            </CCol>
        </CRow>
        <CRow>
            <CCol>
              <CFormInput
              label='TDS %'
              value={trainerSlarySlipObj.tds}
              onChange={(e)=>{
                setTrainerSlarySlipObj(prev=>({...prev,tds:e.target.value}))
            }}
              />
            </CCol>
            <CCol>
              <CFormInput
              label='PT'
              value={trainerSlarySlipObj.pt}
              onChange={(e)=>{
                setTrainerSlarySlipObj(prev=>({...prev,pt:e.target.value}))
            }}
              />
            </CCol>
        </CRow>

        <CRow>
            <CCol>
              <CFormInput
              label='ADV DEC'
              value={trainerSlarySlipObj.advDec}
              onChange={(e)=>{
                setTrainerSlarySlipObj(prev=>({...prev,advDec:e.target.value}))
            }}
              />
            </CCol>
            <CCol>
              <CFormSelect
              label='Mode OF Payment'
              options={[
                "Select",
                { label: "Cash", value: "Cash" },
                { label: "Debit Card", value: "Debit Card" },
                { label: "Credit Card", value: "Credit Card" },
                { label: "Cheque", value: "Cheque" },
                { label: "Draft", value: "Draft" },
                { label: "Paytm", value: "Paytm" },
                { label: "GPay", value: "GPay" },
                { label: "PhonePe", value: "PhonePe" },
                { label: "Account Pay", value: "Account Pay" },
                
              ]}
            value={trainerSlarySlipObj.modeOfPayment}
              onChange={(e)=>{
                setTrainerSlarySlipObj(prev=>({...prev,modeOfPayment:e.target.value}))
            }}
              />
            </CCol>

        </CRow>
        
          <CCol>
              <CFormInput
              label='Net Salar'
              value={trainerSlarySlipObj.totalAmount-tdsamount-+trainerSlarySlipObj.pt-+trainerSlarySlipObj.advDec}
              />
            </CCol>
            <CCol className='text-end py-2'>
              {!updateActive.visible&& <CButton onClick={()=>saveData('Save')}>Save</CButton>}
              {!!updateActive.visible &&<CButton onClick={()=>saveData('Update')}>Update</CButton>}

            </CCol>
                    </CCardBody>
                </CCard>
  )
}

export default TrainerSalarySliipFrom
