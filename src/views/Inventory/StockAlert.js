import {CCard,CTable,CCol,CTableHead,CTableRow,CTableHeaderCell,
    CTableBody,CTableDataCell,CFormInput,CCardHeader,CCardTitle,CButton,CCardBody
 } from '@coreui/react'

 import { useSelector } from 'react-redux'
 import {useState,useEffect} from "react"
 import axios from 'axios'

 let user = JSON.parse(localStorage.getItem('user-info'))
 const token = user.token;

function StockAlert(){
 const url = useSelector((el)=>el.domainOfApi) 
    const [result1, setResult1] = useState([])
    

    


    const headers =   {
        "Authorization": `Bearer ${token}`,
    }

    useEffect(() => {
        getStockAssigning()
    }, [])

    function getStockAssigning() {
        axios.get(`${url}/stockorderlist-status-received-stock/all`,{headers})
            .then((res) => {
                setResult1(res.data.reverse().filter((el)=>+el.Available_Stock<=10))
                console.log(res.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    

return (
<CCard >
     <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                <CCardTitle>Stock Alert</CCardTitle>
            </CCardHeader>




<CCardBody>
<CTable className='mt-3 ' align="middle" bordered hover responsive>
                <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                    <CTableRow >
                    <CTableHeaderCell>Sr No</CTableHeaderCell>
                        <CTableHeaderCell>Product Category</CTableHeaderCell>
                        <CTableHeaderCell>Product Name</CTableHeaderCell>
                        <CTableHeaderCell>Brand Name</CTableHeaderCell>
                        <CTableHeaderCell>Total Stock</CTableHeaderCell>
                        <CTableHeaderCell>Use Stock</CTableHeaderCell>
                        <CTableHeaderCell>Avaible Stock </CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    <CTableRow>
                        <CTableDataCell>
                            <CFormInput
                                className="mb-1"
                                style={{ minWidth: "60px" }}
                                type="text"
                                disabled
                                aria-describedby="exampleFormControlInputHelpInline"
                            />
                        </CTableDataCell>
                        <CTableDataCell>
                            <CFormInput
                                className="mb-1"
                                type="text"
                                style={{ minWidth: "120px" }}
                                disabled
                                aria-describedby="exampleFormControlInputHelpInline"
                            />
                        </CTableDataCell>
                        <CTableDataCell>
                            <CFormInput
                                className="mb-1"
                                style={{ minWidth: "120px" }}
                                type="text"
                                aria-describedby="exampleFormControlInputHelpInline"
                            />
                        </CTableDataCell>
                        <CTableDataCell>
                            <CFormInput
                                className="mb-1"
                                style={{ minWidth: "100px" }}
                                type="text"
                                aria-describedby="exampleFormControlInputHelpInline"
                            />
                        </CTableDataCell>
                        <CTableDataCell>
                            <CFormInput
                                className="mb-1"
                                type="text"
                                style={{ minWidth: "200px" }}
                                aria-describedby="exampleFormControlInputHelpInline"
                            />
                        </CTableDataCell>
                        <CTableDataCell>
                            <CFormInput
                                className="mb-1"
                                style={{ minWidth: "120px" }}
                                type="text"
                                aria-describedby="exampleFormControlInputHelpInline"
                            />
                        </CTableDataCell>
                        <CTableDataCell>
                            <CFormInput
                                className="mb-1"
                                style={{ minWidth: "120px" }}
                                type="number"
                                aria-describedby="exampleFormControlInputHelpInline"
                            />
                        </CTableDataCell>
                        
                      
                    
                        
                    </CTableRow>
                    {result1.map((item, index) => (
                        <CTableRow key={index} className='text-center'>
                            <CTableDataCell>{index + 1 }</CTableDataCell>
                            <CTableDataCell>{item.productDetails.Product_Category}</CTableDataCell>
                            <CTableDataCell>{item.productName}</CTableDataCell>
                            <CTableDataCell>{item.productDetails.Brand_Name}</CTableDataCell>
                            <CTableDataCell>{item.Total_Stock}</CTableDataCell>
                            <CTableDataCell>{Math.abs(item.soldQuantity)}</CTableDataCell>
                            <CTableDataCell>{item.Available_Stock}</CTableDataCell>    
                        </CTableRow>
                    ))}
                  
                </CTableBody>
            </CTable>

</CCardBody>



</CCard>

)

}


export default StockAlert