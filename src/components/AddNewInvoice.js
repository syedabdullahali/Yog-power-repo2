import {
    CButton,
    CCol,
    CFormInput,
    CFormSelect,
    CImage,
    CInputGroup,
    CInputGroupText,

    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,

    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from "@coreui/react";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import logo from 'src/assets/images/avatars/icon.png'
import { useSelector } from 'react-redux'

function AddNewInvoice({id,data23,viewInvoice,setViewInvoice,getDetails}){

 const RenewedObj  = [data23].find((list) =>{
        const time =  (new Date(data23.endDate) -new Date())
        const days = Math.ceil(time/(1000*60*60*24))
              if((days<=15)){           
                 return true 
              }
              return false                                                                         
         })


    const url1 = useSelector((el)=>el.domainOfApi) 
    const [GeneralTrainer, setGeneralTrainer] = useState('')
    const [subService,setService] = useState([])

    
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [tax, settax] = useState(0)
    const [total, setTotal] = useState(0)
    const [paidAmount, setpaidAmount] = useState('')
    const [discount, setDiscount] = useState()
    const [dis1, setDis1] = useState()
    const [pendingAmount, setPendingAmount] = useState('')
    const [paymode, setPayMode] = useState('')
    const [finalTotal, setFinalTotal] = useState('')
    const [ser1, setSer1] = useState('')
    const [ser2, setSer2] = useState('')
    const [ser3, setSer3] = useState('')
    const [ser5, setSer5] = useState({EmployeeId:'',EmployeeName:''})
    const [ser6, setSer6] = useState('')
    const [invoiceNum,setInvoice] = useState([])
    const [serviceDays,setServiceDays] = useState('')
    const [errorMessage,setErrorMessage] = useState('')


    

    const [visi, setVisi] = useState(false);
    const [mem, setMem] = useState([]);

    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;
    const username = user.user.username;
    const centerCode = user.user.centerCode;


    var currentdate = new Date();
    var datetime = currentdate.getDay() + "/" + currentdate.getMonth()
        + "/" + currentdate.getFullYear();

    const headers = {
            'Authorization': `Bearer ${token}`,
            'My-Custom-Header': 'foobar'
    };
    
 const getInvoiceNoFun =async ()=>{
      await  axios.get(`${url1}/invoice/all`,{headers}).then(({data})=>{
        setInvoice(data.length)
      })
     }

     useEffect(()=>{
        getInvoiceNoFun()
    },[])



const validation = username && centerCode &&ser1 
&& ser6 && ser2 && ser3
&& ser5 && total && finalTotal && startDate && endDate && paymode

useEffect(()=>{
if(validation){
    setErrorMessage("") 
}
},[validation])


const RenewedClient = async () =>{
if(RenewedObj){
  
  const data1 = {"renewed": true}        

 const {data} = await axios.post(`${url1}/memberForm/update/${RenewedObj?._id}`,data1,{headers})       
console.log(data)
}



}



const saveInvoice = () => {
if(!validation) {
    setErrorMessage("Please Fill All Detail") 
return 
}

   const selectedStaff = staff.find((el)=>el._id===ser5)


    let data = {
        username: username,
        date: datetime,
        centerName: centerCode,
        InvoiceNo: `INV${invoiceNum}`,
        id: id, MemberName:`${data23?.Fullname}`,
        ServiceName: ser1, PackageName: ser6,
        duration: ser2, fees: ser3, startDate, endDate,
        counseller: selectedStaff?.FullName, trainer: GeneralTrainer,
        amount: total, tax, discount, totalAmount:
        finalTotal, paidAmount, pendingAmount, 
        paymode, status: 'active',typesofdiscount:dis1,
        clientId:`${data23?.ClientId}`,
        upgrade:(RenewedObj?true:false),
        EmployeeId:selectedStaff?._id, 
    }

    const headers = {
        'Authorization': `Bearer ${token}`,
        'My-Custom-Header': 'foobar'
    };
    axios.post(`${url1}/invoice/create`, data, { headers })
        .then((resp) => {

            RenewedClient() 
            setViewInvoice(false)
            getDetails()
            let data1 = { invoiceId: resp.data._id, invoiceNum: resp.data.InvoiceNo, startDate,duration:ser2,
                endDate,plan: true,renewedDate:(RenewedObj?new Date():'')
             }

             axios.all([
                axios.post(`${url1}/enquiryForm/update/${data23._id}`, {
                    invEmployeeId:selectedStaff?._id,
                    invEmployeeName:selectedStaff?.FullName,
                    invoiceId:resp.data._id,
                }, { headers}),
                axios.post(`${url1}/memberForm/update/${id}`, data1, { headers },)]

                ).then(() => {
            }).catch((error) => {
                console.error(error)
            })

            alert('Successfully save')

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
        })
        .catch((error) => {
            console.error(error)
        })
}


function getSubService() {
    axios.get(`${url1}/packagemaster`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then((res) => {
            setService(res.data)
          
            console.log(res.data,"Package Master")
        })
        .catch((error) => {
            console.error(error)
        })
}


useEffect(()=>{
getStaff()
getSubService()
},[])


const handleTaxTotal = (e) => {
    settax(e.target.value)
    let total = ser3 / 100 * e.target.value;
    if (total >= 0) {
        setTotal(Number(total) + Number(ser3))
    } else {
        setTotal(ser3)
    }
}

const handleDiscount = (e) => {
    let total = ser3 / 100 * tax;

    if (dis1 == 'R') {
        if (total >= 0) {
            setTotal(Number(total) + Number(ser3) - e.target.value)
        } else {
            setTotal(ser3 - e.target.value)
        }
    } else {
        let dis = ser3 / 100 * e.target.value;
        if (total >= 0) {
            setTotal(Number(total) + Number(ser3) - dis)
        } else {
            setTotal(ser3 - dis)
        }
    }
    setDiscount(e.target.value)
}




const getCurrentDateInput = () => {
    const dateObj = new Date(new Date(startDate).getTime()+(serviceDays *24*60*60*1000));
    const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
    const day = ("0" + dateObj.getDate()).slice(-2);
    const year = dateObj.getFullYear();
    const shortDate = `${year}-${month}-${day}`;
    return shortDate;
  }

useEffect(()=>{
if(startDate&& serviceDays){
console.log(startDate)
setEndDate(getCurrentDateInput())
}
},[startDate])

useEffect(()=>{
if(ser1){
subService.forEach((el)=>{
if(el.Service=== ser1){
setServiceDays(el.Days)
}
})
}
},[ser1])



    return   <CModal size="xl" alignment="center" scrollable visible={viewInvoice} onClose={() => {setViewInvoice(false) }}>
    <CModalHeader>
        <CModalTitle>Invoice</CModalTitle>
    </CModalHeader>
    <CModalBody>
        <CRow>
            <CCol lg={12} className='text-center'><CImage src={logo} width="100px" height='100px' /></CCol>
            <CCol lg={12} className='text-center mt-2'><h5>Yog Power International  </h5></CCol>

        </CRow>
        <CRow className="mt-2">
            <CCol style={{ marginLeft: '5px' }}>
                <h6>Client Name: {data23?.Fullname}</h6>
                <div>Client Number: {data23?.ContactNumber}</div>
                Customer ID : {data23?.ClientId}<br />
                Email-Id : {data23?.Email}<br />
            </CCol>
            <CCol lg={4} className='text-center mt-4'><h4>Invoice</h4></CCol>
            <CCol >
                Date : {datetime}<br />
                Invoice No : {centerCode}INV{invoiceNum  +1} <br />
                <CRow>
                    <CCol lg={9}>
                        <CInputGroup>
                            <CInputGroupText
                                component="label"
                                htmlFor="inputGroupSelect01"
                            >
                                Counseller :
                            </CInputGroupText>
                            <CFormSelect
                             value={ser5}
                             onChange={(e) => setSer5(e.target.value)}                                 
                            >
                            <option>Select Assign Staff</option>
                                {staff.filter((list) => list.username === username &&
                                 list.selected === 'Select').map((item, index) => (
                                    <option key={index} value={item._id}>{item.FullName}</option>
                                ))}

                            </CFormSelect>
                     
                        </CInputGroup>
                    </CCol>
                </CRow>
            </CCol>
        </CRow>
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
                    <CTableDataCell>1</CTableDataCell>
                    <CTableDataCell>
                        <CRow>
                            <CCol>
                                
                                <CFormSelect
                                    className="mb-1"
                                    aria-label="Select Service Name"
                                    value={ser1}
                                    onChange={(e) => setSer1(e.target.value)}
                                    label='Service Name'
                                    style={{ minWidth: "210px" }}

                                >
                                    <option>Select Service</option>
                                    {[...subService.filter((el)=>{
                return el.username === username                                  
            })].map((el,i)=><option key={i}>{el.Service
            }</option>)
            }
                                </CFormSelect>
                            </CCol>
                            <CCol>
                                <CFormSelect
                                    className="mb-1"
                                    aria-label="Select Service Name"
                                    value={ser6}
                                    label='Package Name'
                                    onChange={(e) => setSer6(e.target.value)}
                                    style={{ minWidth: "210px" }}

                                >
                                    <option>Select Package</option>
                                    {[...subService.filter((el)=>{
                return el.username === username && el.Service=== ser1                                
            })].map((el,i)=><option key={i}>{el.Package_Name
                }</option>)
            }   


                                </CFormSelect>
                            </CCol>
                        </CRow>

                        <CRow>
                        {
                        ser1 &&  
                        <>
                            <CCol>
                                <CInputGroup>
                                    <CInputGroupText
                                        component="label"
                                        htmlFor="inputGroupSelect01"
                                    >
                                        Start Date :
                                    </CInputGroupText>
                                    <CFormInput
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        style={{ minWidth: "100px" }}
                                        aria-describedby="exampleFormControlInputHelpInline"
                                    />
                                </CInputGroup>
                            </CCol>
                            <CCol>
                                <CInputGroup>
                                    <CInputGroupText
                                        component="label"
                                        htmlFor="inputGroupSelect01"
                                    >
                                        End Date :
                                    </CInputGroupText>
                                    <CFormInput
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        style={{ minWidth: "100px" }}
                                        aria-describedby="exampleFormControlInputHelpInline"
                                    />
                                </CInputGroup>
                            </CCol>
                        </>      
                        }
                        </CRow>

                    </CTableDataCell>
                    <CTableDataCell>

                        <CFormSelect
                            className="mb-1"
                            aria-label="Select Service Name"
                            value={ser2}
                            onChange={(e) => setSer2(e.target.value)}
                        >
                 <option>Select Duration</option>
                   {[...subService.filter((el)=>{
                  
                 return el.username === username && el.Service=== ser1                                  
            })].map((el,i)=><option key={i}>{el.Duration
                }</option>)
            }   
                        </CFormSelect>


                    </CTableDataCell>
                    <CTableDataCell>
                        <CFormSelect
                            className="mb-1"
                            aria-label="Select Service Name"
                            value={ser3}
                            onChange={(e) =>{
                                setSer3(e.target.value)
                                setTotal(+e.target.value)
                            }
                        }
                        >
                            <option>Select Fees</option>
                            {[...subService.filter((el)=>{
            return el.username === username && el.Service=== ser1                                    
            })].map((el,i)=><option key={i}>{el.Fees

                }</option>)
            }  
                        </CFormSelect>
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
                                        <CFormInput
                                            className="mb-1"
                                            style={{ minWidth: "100px" }}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                            value={ser3}

                                        />
                                    </CTableDataCell>
                                </CTableRow>

                                <CTableRow>
                                    <CTableDataCell>
                                        <CRow>
                                            <CCol>
                                                Discount
                                            </CCol>
                                            <CCol>
                                                <CFormSelect
                                                    className="mb-1"
                                                    aria-label="Select"
                                                    value={dis1}
                                                    onChange={(e) => { setDis1(e.target.value), setDiscount(0) }}
                                                    options={[
                                                        { label: "%", value: "P" },
                                                        { label: "₹", value: "R" },
                                                    ]}
                                                />
                                            </CCol>
                                        </CRow>
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            value={discount}
                                            onChange={(e) => handleDiscount(e)}
                                            type="number"
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableDataCell>
                                        <CRow>
                                            <CCol lg={4}>Tax </CCol>
                                            <CCol>
                                                <CFormSelect
                                                    className="mb-1"
                                                    value={tax}
                                                    onChange={(e) => handleTaxTotal(e)}
                                                    aria-label="Select"
                                                    options={[
                                                        { label: "Select", value: "0" },
                                                        { label: "GST", value: "18" },
                                                        { label: "IGST", value: "18" },
                                                        { label: "CGST", value: "18" },
                                                        { label: "TDS", value: "18" },
                                                    ]}
                                                /></CCol>
                                        </CRow>
                                    </CTableDataCell>
                                    <CTableDataCell className="mt-2">
                                        <CFormInput
                                            className="mb-1"
                                            style={{ minWidth: "100px" }}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                            value={ser3 / 100 * tax}
                                        />
                                    </CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableDataCell>Total Amount</CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="number"
                                            value={total}
                                            style={{ minWidth: "100px" }}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                </CTableRow>

                                <CTableRow>
                                    <CTableDataCell>Paid Amount</CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="number"
                                            value={paidAmount}
                                            onChange={(e) => { setpaidAmount(e.target.value), setPendingAmount(total - e.target.value), setFinalTotal(e.target.value) }}
                                            style={{ minWidth: "100px" }}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableDataCell>Balance Amount</CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="number"
                                            value={pendingAmount}
                                            onChange={(e) => { setPendingAmount(e.target.value), setpaidAmount(total - e.target.value), setFinalTotal(total - e.target.value) }}
                                            style={{ minWidth: "100px" }}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                </CTableRow>

                                <CTableRow>
                                    <CTableDataCell>Mode of Payment</CTableDataCell>

                                    <CTableDataCell>
                                        <CFormSelect
                                            className="mb-1"
                                            aria-label="Select Call Status"
                                            value={paymode}
                                            onChange={(e) => { setPayMode(e.target.value) }}
                                            style={{ minWidth: "100px" }}
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
                                        />
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
                        <CFormInput
                            className="mb-1"
                            type="number"
                            value={finalTotal}
                            onChange={(e) => setFinalTotal(e.target.value)}
                            style={{ minWidth: "100px" }}
                            aria-describedby="exampleFormControlInputHelpInline"
                        />
                    </CTableDataCell>
                </CTableRow>
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

    </CModalBody>
    {errorMessage&& <CCol className="text-end px-5"><p style={{color:'red',fontSize:'15px'}}>{errorMessage}</p></CCol>}

    <CModalFooter>
        <CButton color="secondary" onClick={() => { setVisi(false) }}>
            Close
        </CButton>
        <CButton color="primary" onClick={() => saveInvoice()}>Submit</CButton>
    </CModalFooter>
</CModal>

}

export default AddNewInvoice