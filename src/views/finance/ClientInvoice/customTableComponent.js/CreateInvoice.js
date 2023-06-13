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

import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from "react-redux";
import axios from "axios";
import logo from 'src/assets/images/avatars/icon.png'
import moment from "moment/moment";
import {RxCross2} from 'react-icons/rx'



const CreateInvoice = ({visible,setActiveKey1,clientReferance,toPrintInvoice}) => {

    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;
    const username = user.user.username;
    const centerCode = user.user.centerCode;

    const [staff, setStaff] = useState([])
    const url1 = useSelector((el) => el.domainOfApi)
    const [invoiceNum,setInvoice] = useState([])

    const clothStore = useSelector((el)=>el.stockDataClothData)  
    const auravedaStore = useSelector((el)=>el.stockDataAuravedaData)  
    const fitnessProduct = useSelector((el)=>el.stockDataFitnessProduct) 
    const foodProduct = useSelector((el)=>el.stockDataFoodProduct) 
    const genralProduct = useSelector((el)=>el.genralProduct) 


    const disPatchFun = useDispatch()

    const clearFunction = useSelector((el)=>el.clothStockDataClearFun)
    const clearFunction1 = useSelector((el)=>el.auravedaStockDataClearFun)
    const clearFunction2 = useSelector((el)=>el.fitnessDataClearFun)
    const clearFunction3 = useSelector((el)=>el.foodProductDataClearFun)
    const clearFunction4 = useSelector((el)=>el.genralProductDataClearFun)


    const [modeOfPayment,setPaymentMode] = useState('')
  


    const allProduct = [...clothStore,...auravedaStore,...fitnessProduct,...foodProduct,...genralProduct]
    .filter((el)=>el?.toInvoice)   
    
    const totalAmount = allProduct.reduce((crr,el)=>crr+(el.productDetails.Product_Price*el.item),0)

    const allProduct2 = allProduct.map((el)=>{
        console.log(el,'stock')
return {
Product_Code:el?.productCode,
Product_Name:el?.productName,
Brand_Name:el?.productDetails?.Brand_Name,
Category:el?.productDetails?.Category,
Color:el?.productDetails?.Color,
Price:el?.productDetails.Product_Price,
Total_Stock:el?.Total_Stock,    
Available_Stock:el?.Available_Stock,  
item:el?.item 
}
    })



    const headers =  {
        'Authorization': `Bearer ${token}`
    }

   async  function toGetSelectInputData(){
    try{
   const response1 = await   axios.get(`${url1}/employeeform`, {headers})   
   setStaff(response1.data)
    }catch(error){
     console.log(error)
    }
    }


    useEffect(() => {
    toGetSelectInputData()
    }, [])

    const getInvoiceNoFun =async ()=>{
        const headers = {
                'Authorization': `Bearer ${token}`,
                'My-Custom-Header': 'foobar'
        };
        
          await  axios.get(`${url1}/productInvoice/all`,{headers}).then(({data})=>{
            setInvoice(data.length +1)
          })
         }
        
        
        
         useEffect(()=>{
            getInvoiceNoFun()
        },[])


    const saveInvoice = () => {

        let data = {
            Fullname:clientReferance?.Fullname,
            username: username,
            date: new Date(),
            centerName: centerCode,
            InvoiceNo: `${centerCode}INV${invoiceNum}INVEN`,
            MemberId: clientReferance.MemberId,
            counseller:clientReferance.StatffName, 
            totalAmount,
            paidAmount:totalAmount, 
            clientId:clientReferance.CustomerId,
            contact:clientReferance.ContactNumber,
            followUpDate:new Date(),
            EmployeeId:clientReferance.EmpId,
            InventoryStock:allProduct2,
            fees: totalAmount,
            amount: totalAmount,
            paymode:modeOfPayment, 
            pendingAmount:'0',
        }

           
           

        const headers = {
            'Authorization': `Bearer ${token}`,
            'My-Custom-Header': 'foobar'
        };
        axios.post(`${url1}/productInvoice/create`, data, { headers },
        )
            .then((resp) => {

                disPatchFun({type:'clear Stock'})
                clearFunction('clear')
                clearFunction1('clear')
                clearFunction2('clear')
                clearFunction3('clear')
                clearFunction4('clear')

                console.log(resp.data,"ekfmkemfm new invoice no")
                toPrintInvoice(resp.data)           
                getInvoiceNoFun()     
                alert("successfully submitted")
            }).catch((error) => {
                console.error(error)
            })

    }

    return (
     <> 
       
       

        <CModal size="xl" alignment="center" scrollable visible={visible} onClose={()=>setActiveKey1(6)}>
            <CModalHeader>
                <CModalTitle>Invoice</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CRow>
                    <CCol lg={12} className='text-center'><CImage src={logo} width="100px" height='100px' /></CCol>
                    <CCol lg={12} className='text-center mt-2'><h5>Yog Power International  </h5></CCol>

                </CRow>
              
                <CRow className="mt-2">
                    <CCol>
                    Full Name:- {clientReferance?.Fullname} <br/>
                    Contact Number:- {clientReferance?.ContactNumber} <br/>
                    Customer Id:- {clientReferance?.CustomerId} <br/> 
                    </CCol>
                    <CCol lg={4} className='text-center mt-4'><h4>Invoice</h4></CCol>
                    <CCol >
                        Date : {moment(new Date()).format('YYYY-MM-DD')}<br />
                        Invoice No : {centerCode}INV{invoiceNum} <br />
                        <CRow>
                            <CCol lg={9}>
                                <CInputGroup>
                                    <CInputGroupText
                                        component="label"
                                        htmlFor="inputGroupSelect01"
                                    >
                                        Counseller :
                                    </CInputGroupText>
                                    <CFormInput
                                     value={clientReferance.StatffName}
                                    disabled 
                                    className="bg-body"                                                                                             
                                    >
                                      
                                    </CFormInput>
                                </CInputGroup>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol   lg={9} className="mt-4" >
                                <CFormSelect
                                value={modeOfPayment}
                                onChange={(e)=>setPaymentMode(e.target.value)}
                                label='Select mode of payment'
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
                            </CCol>
                        </CRow>
                    </CCol>

                </CRow>
                 <div className="py-3">

                  <CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345" }} hover responsive>
                <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                    <CTableRow >
                        <CTableHeaderCell>Sr.No</CTableHeaderCell>
                        <CTableHeaderCell>Product Code</CTableHeaderCell>
                        <CTableHeaderCell>Product Name</CTableHeaderCell>
                        <CTableHeaderCell>Brand Name</CTableHeaderCell>
                        <CTableHeaderCell>No of item</CTableHeaderCell>
                        <CTableHeaderCell>Total Price</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                 
                 
                    {allProduct.map((item, index) => {


                     return    <CTableRow key={index} className='text-center'>
                            <CTableDataCell>{index+1}</CTableDataCell>
                            <CTableDataCell>{item.productCode}</CTableDataCell>
                            <CTableDataCell>{item.productName}</CTableDataCell>
                            <CTableDataCell>{item.productDetails.Brand_Name}</CTableDataCell>
                            <CTableDataCell>{item.item}{<RxCross2/>}  {item.productDetails.Product_Price}</CTableDataCell>
                            <CTableDataCell>{+item.productDetails.Product_Price * +item.item}</CTableDataCell>
                    </CTableRow>
})}
                         <CTableRow className="text-center" ><CTableDataCell style={{ backgroundColor: "#0B5345", color: "white" }} 
                          colSpan={4}>Total</CTableDataCell>
                         <CTableDataCell colSpan={2}>{totalAmount}</CTableDataCell> </CTableRow>


                </CTableBody>
            </CTable>
                </div>  

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
               
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={() => { setActiveKey1(6)}}>
                    Close
                </CButton>
                <CButton color="primary" onClick={() => saveInvoice()}>Submit</CButton>
            </CModalFooter>
        </CModal>
    </>  
    )
}

export default CreateInvoice
