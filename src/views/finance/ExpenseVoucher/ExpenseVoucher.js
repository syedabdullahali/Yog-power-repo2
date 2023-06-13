import { CCard,CCardBody,CCardHeader,CCardTitle,CFormInput,CForm,CRow ,CCol,CFormSelect,CButton }from "@coreui/react"
import {useEffect, useState} from 'react'
import axios from "axios"
import { useSelector } from "react-redux"
import { data } from "autoprefixer"

let user = JSON.parse(localStorage.getItem('user-info'))
const token = user.token;
const username = user.user.username;

function ExpenseVoucher (){
  //dailyexpense
 
const [voucherNo,setVoucehrNo] = useState('')
const [date,setDate] = useState('')
const [expenceCategory,setCategory] = useState('')
const [detailOfEx,setDeatilOfEx] = useState('')
const [ammount,setAmount] = useState('')
const [paymentMode,setPaymentMode] = useState('')
const [payedTo,setPayedTo] = useState('')
const [approvedBy,setApprovedBy] = useState('')
const [createdBy,setCreatedBy] = useState('')
const [errorMessage,setErrorMessage] = useState(false)
const [showError,setError] = useState(false)
const url1 = useSelector((el)=>el.domainOfApi) 
const [getExpenceMaster,setExpenceMaster] = useState([])
const [balanceAmount,setBalanceAmount] = useState('')
const [eltoUPdate,setEltoUpdate] = useState(0)






const ExpenseObjeact = {
Sr_No:' ',
Date: date,
Voucher_Number:voucherNo,
Expense_Category:expenceCategory,
Details_Of_Expense: detailOfEx,
Amount:ammount,
Payment_Mode: paymentMode,
Paid_To: payedTo,
Approved_By:approvedBy,
Created_By:createdBy,
Status:false,
}



const getPittyCashDataFun =async ()=>{
  const res = await axios.get(`${url1}/pettycash`, {
      headers: {
          'Authorization': `Bearer ${token}`
      }
  })
  

 let Obj  = {    
    Balance:0,
} 

const UpdatedElement = res.data.reduce((crr,el,i)=>{
if(+el.Credit){
crr.Balance+= (+el.Credit)
return crr
}else if(+el.Debit){
crr.Balance-= (+el.Debit)
return crr
}
return crr
},{...Obj})
setEltoUpdate(UpdatedElement)
setBalanceAmount(+UpdatedElement.Balance)
}


  
useEffect(()=>{
  getPittyCashDataFun()
},[])
 


useEffect(()=>{
  const balance = eltoUPdate.Balance - ammount
  setBalanceAmount(balance)
},[ammount])

  





const validation = date.trim()==='' || expenceCategory.trim()==='' || detailOfEx.trim()===''|| ammount.trim()===''||
paymentMode.trim()===''|| payedTo.trim()==='' || approvedBy.trim()===''||  createdBy.trim()===''

useEffect(()=>{
  if(validation && showError){
    setErrorMessage('Please fill all details')
  }else if(!validation){
    setErrorMessage(false)

  }

},[validation])








const saveExpenceInfo = async ()=>{
if(validation){
setErrorMessage('Please fill all details'),setError(true)
return 
}else{setErrorMessage(false)}
if(!balanceAmount){
  setErrorMessage('Sorry network error please refresh your page')
  return 
}

let obj = {
  Balance: balanceAmount , 
  Sr_No:" ",
  Date:date,
  Particulars:detailOfEx,
  Category:expenceCategory,
  Credit:" ",
  Debit:ammount,
  Paid_By:createdBy,
  Approved_By:approvedBy,
  Action:payedTo,
}




axios.post(`${url1}/pettycash`,{...obj},{headers: {
  "Authorization": `Bearer ${token}`,
  'Accept': 'application/json',
  'Content-Type': 'application/json',
}})

axios.post(`${url1}/dailyexpense`,ExpenseObjeact,{headers: {
  "Authorization": `Bearer ${token}`,
  'Accept': 'application/json',
  'Content-Type': 'application/json',
}}).then(({data})=>{
alert('Successfully Save')
getLengthofVoucher()
})

}


function getLengthofVoucher(){
  axios.get(`${url1}/dailyexpense`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}) .then((res) => {
  setVoucehrNo(`VN${res.data?.length+1}`)
})
.catch((error) => {
  console.error(error)
})
}


function getExpress() {
  axios.get(`${url1}/expenseMaster/all`, {
      headers: {
          'Authorization': `Bearer ${token}`
      }
  })
      .then((res) => {
          setExpenceMaster(res.data.reverse())
      })
      .catch((error) => {
          console.error(error)
      })
}

const [staff, setStaff] = useState([])
function getStaff() {
    axios.get(`${url1}/employeeform`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then((res) => {
            setStaff(res.data)
            console.log(res.data);
        })
        .catch((error) => {
            console.error(error)
        })
}

useEffect(()=>{
  getStaff()
  getExpress()
  getLengthofVoucher()
},[])


return <CCard className="overflow-hidden">
       <CCardHeader style={{ backgroundColor: "#0B5345", color: "white" }}> 
           <CCardTitle><h4>Add Expense</h4></CCardTitle>
       </CCardHeader>
       <CCardBody>
              <CCardTitle className="p-4 " >
                <h5 className=" p-2 text-center  mx-auto outline"  >
                    Expense Voucher</h5>
             </CCardTitle>     
         <CForm>
           <CRow>
           <CCol md={6}>
                <CFormInput
                type="text"
                label='Voucher No' 
                value={voucherNo}    
                onChange={(e)=>setVoucehrNo(e.target.value)}           
                />
            </CCol>

            <CCol md={6}>
                <CFormInput
                type="date"
                label='Voucher Date'      
                value={date}
                onChange={(e)=>setDate(e.target.value)}          
                />
            </CCol>
         
          </CRow>   

          <CRow>

          <CCol md={6}>
                <CFormSelect 
                label='Expense Category' 
                value={expenceCategory}      
                onChange={(e)=>setCategory(e.target.value)} 
                >
                   <option>Select Category</option>
                                        {getExpenceMaster.map((el)=>{
                                            console.log(el)
                                            return  <option>{el.CategoryName
                                            }</option>
                                        })}
                </CFormSelect>
            </CCol>
                      
           
            <CCol md={6}>
               <CFormInput
                type="text"
                label='Details of Expense'   
                value={detailOfEx}       
                onChange={(e)=>{setDeatilOfEx(e.target.value)}}      
                />
               </CCol>
            
         
          </CRow> 

          <CRow>
          <CCol md={6}>
                <CFormInput
                type="number"
                label='Amount Rs ₹'        
                value={ammount}
                onChange={(e)=>setAmount(e.target.value)}        
                />
          </CCol>

          <CCol md={6}>
               
               <CFormSelect 
               label='Payment Mode' 
               options={[
                "Select Payment Mode",
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
               value={paymentMode} 
               onChange={(e)=>{setPaymentMode(e.target.value)}}           
               />
           </CCol>
            </CRow>

          <CRow>
          <CCol md={6}>
                <CFormSelect
                type="text"
                label='Paid by' 
                value={createdBy}
                onChange={(e)=>{setCreatedBy(e.target.value)}}               
                >
                   <option>Select Staff</option>
                                            {staff.filter((list) => list.username === username).map((item, index) => (
                                                item.username === username && (
                                                    <option key={index}>{item.FullName}</option>
                                                )
                                            ))}
                  </CFormSelect>
            </CCol>        
           
            <CCol md={6}>
                <CFormInput
                type="text"
                label='Paid To'   
                value={payedTo}
                onChange={(e)=>setPayedTo(e.target.value)}             
                />
            </CCol>            
          </CRow>   

           <CRow>
            <CCol md={6}>
                <CFormSelect
                type="text"
                label='Approved By' 
                value={approvedBy}
                onChange={(e)=>setApprovedBy(e.target.value)}               
                >
                  <option>Select Staff</option>
                                            {staff.filter((list) => list.username === username).map((item, index) => (
                                                item.username === username && (
                                                    <option key={index}>{item.FullName}</option>
                                                )
                                            ))}
                </CFormSelect>
            </CCol>           
            {errorMessage?<p className="h6 text-danger mt-2">{errorMessage}</p>:<p className="h6 text-white mt-2">' '</p>}                  
          </CRow>  
               
          <CCol className="p-2 d-flex justify-content-center mt-2">
             <CButton className="p-2 w-25"onClick={()=>{saveExpenceInfo()}} >Save</CButton>
          </CCol>

            
 
         </CForm>    
       </CCardBody>

    </CCard>
}


export default ExpenseVoucher