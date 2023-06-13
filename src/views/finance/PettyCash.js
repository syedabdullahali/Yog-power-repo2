import React, { useState, useEffect } from 'react'
import {
    CButton,
    CButtonGroup,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormInput,
    CFormSelect,
    CInputGroup,
    CInputGroupText,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody
} from '@coreui/react'
import { useSelector } from 'react-redux'


let user = JSON.parse(localStorage.getItem('user-info'))
const token = user.token;
const username = user.user.username;
import axios from 'axios';
import { MdDelete, MdEdit } from 'react-icons/md';


const PettyCash = () => {
    var monthNaame= ["January","February","March","April","May","June","July",
    "August","September","October","November","December"]

    const [creditdate, setCreditDate] = useState('')
    const [debitdate, setDebitDate] = useState('')

    const [expenceCategory, setCategory] = useState('')
    const [detailOfEx, setDeatilOfEx] = useState('')
    const [payedBy, setPayedBy] = useState('')
    const [approvedBy, setApprovedBy] = useState('')
    const [approvedByEx, setApprovedByEx] = useState('')
    const [errorMessage, setErrorMessage] = useState(false)
    const [errorMessage2, setErrorMessage2] = useState(false)

    const [showError, setError] = useState(false)
    const [showError2, setError2] = useState(false)
    const url1 = useSelector((el) => el.domainOfApi)
    const [getExpenceMaster, setExpenceMaster] = useState([])
    const [creditAmount, setCreditAmount] = useState(' ')
    const [debitAmount, setDebitAmount] = useState(' ')
    const [getPettyCash, setPetttyCash] = useState([])
    const [showFrom, setShowForm] = useState(false)
    const [payedTo, setPayedTo] = useState('')
    const [showDebitForm, setDebitForm] = useState(false)
    const [balanceAmount, setBalanceAmount] = useState('')
    const [eltoUPdate, setEltoUpdate] = useState(0)
    const [voucherNo, setVoucehrNo] = useState('')

    const [categoryName2,setCategory2] = useState('')
    const [selectedMonth,setSelectedMonth] = useState('')




    function getExpress() {
        axios.get(`${ url1 }/expenseMaster/all`, {
            headers: {
                'Authorization': `Bearer ${ token }`
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
        axios.get(`${ url1 }/employeeform`, {
            headers: {
                'Authorization': `Bearer ${ token }`
            }
        })
            .then((res) => {
                setStaff(res.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }


    useEffect(() => {
        getExpress()
        getStaff()
        getLengthofVoucher()
    }, [])

    function getLengthofVoucher() {
        axios.get(`${ url1 }/dailyexpense`, {
            headers: {
                'Authorization': `Bearer ${ token }`
            }
        }).then((res) => {
            setVoucehrNo(`VN${ res.data?.length + 1 }`)
        })
            .catch((error) => {
                console.error(error)
            })
    }
    



    const getPittyCashDataFun = async () => {

        const res = await axios.get(`${ url1 }/pettycash`, {
            headers: {
                'Authorization': `Bearer ${ token }`
            }
        })

        setPetttyCash(res.data.reverse())
    }

    useEffect(() => {
        getPittyCashDataFun()
    }, [])


    const validation = creditdate.trim() === '' || creditAmount.trim() === '' ||
        approvedBy.trim() === ''

    useEffect(() => {
        if (validation && showError) {
            setErrorMessage('Please fill all details')
        } else if (!validation) {
            setErrorMessage(false)

        }

    }, [validation])









    function savePittyCashData() {




        if (validation) {
            setErrorMessage('Please fill all details')
            setError(true)
            return
        } else {
            setErrorMessage(false)
        }

        let Obj = {
            Balance: 0,
        }

        const UpdatedElement = getPettyCash.reduce((crr, el, i) => {
            if (+el.Credit) {
                crr.Balance += (+el.Credit)
                return crr
            } else if (+el.Debit) {
                crr.Balance -= (+el.Debit)
                return crr
            }
            return crr
        }, { ...Obj })

        const obj = {
            Sr_No: "1",
            Date: creditdate,
            Particulars: " ",
            Category: "Petty Cash",
            Credit: (+creditAmount),
            Debit: " ",
            Balance: (+UpdatedElement.Balance) + (+creditAmount),
            Paid_By: "  ",
            Approved_By: approvedBy,
            Action: "  ",
        }



        console.log(obj)
        axios.post(`${ url1 }/pettycash`, obj, {
            headers: {
                "Authorization": `Bearer ${ token }`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(({ data }) => {
            alert('Successfully Save')
            getPittyCashDataFun()
            setDeatilOfEx('')
            setCreditAmount(' ')
            setPayedBy(' ')
            setApprovedBy(' ')
            setCreditAmount(' ')
            setShowForm(false)

        })
    }

    const DeletePityCash = (id) => {
        console.log(id)
        if (!confirm('Do you Want to Delete')) return

        axios.delete(`${ url1 }/pettycash/${ id }`, {
            headers: {
                "Authorization": `Bearer ${ token }`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(({ data }) => {
            getPittyCashDataFun()
        })
    }


const validation2 =  debitdate.trim() === '' || debitAmount.trim() === '' ||
approvedByEx.trim() === '' || expenceCategory.trim() === '' || payedBy.trim()===''||
payedTo.trim()==='' ||detailOfEx.trim()==='' 

console.log(validation2)

useEffect(() => {
    if (validation2 && showError2) {
        setErrorMessage('Please fill all details')
    } else if (!validation2) {
        setErrorMessage(false)

    }

}, [validation2])



const ShowModalofDabit = (el) => {
        setDebitForm(true)
        let Obj = {
            Balance: 0,
        }

        const UpdatedElement = getPettyCash.reduce((crr, el, i) => {
            if (+el.Credit) {
                crr.Balance += (+el.Credit)
                return crr
            } else if (+el.Debit) {
                crr.Balance -= (+el.Debit)
                return crr
            }
            return crr
        }, { ...Obj })
        setEltoUpdate(UpdatedElement)
        setBalanceAmount(+UpdatedElement.Balance)

    }


    useEffect(() => {
        const balance = eltoUPdate.Balance - debitAmount
        setBalanceAmount(balance)
    }, [debitAmount])


    const saveDabit = () => {

        if (validation2) {
            setErrorMessage2('Please fill all details')
            setError2(true)
            return
        } else {
            setErrorMessage2(false)
        }
        
        if(!voucherNo){
            setErrorMessage2('Network errror please refresh your page')
        }

        let obj = {
            Balance: balanceAmount,
            Sr_No: " ",
            Date: debitdate,
            Particulars: detailOfEx,
            Category: expenceCategory,
            Credit: " ",
            Debit: debitAmount,
            Paid_By: payedBy,
            Approved_By:approvedByEx,
            Action: payedTo,
        }


        const ExpenseObjeact = {
            Sr_No: ' ',
            Date: debitdate,
            Voucher_Number:voucherNo,
            Expense_Category: expenceCategory,
            Details_Of_Expense: detailOfEx,
            Amount: debitAmount,
            Payment_Mode: "Petty Cash",
            Paid_To: payedTo,
            Approved_By: approvedByEx,
            Created_By: payedBy,
            Status: false,
        }

        axios.post(`${url1}/pettycash`, { ...obj }, {
            headers: {
                "Authorization": `Bearer ${ token }`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(() => {
            alert('Successfully Save')
            setDebitForm(false)
            setDebitAmount('')
            getPittyCashDataFun()
        })

        axios.post(`${url1}/dailyexpense`, ExpenseObjeact, {
            headers: {
                "Authorization": `Bearer ${ token }`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(({ data }) => {
            getLengthofVoucher()
            getPittyCashDataFun()
        })


    }



const clearFunction = ()=>{
    setSelectedMonth('')
    setCategory2('')
}

    return (
        <CRow>

            <CModal visible={showDebitForm} onClose={() => setDebitForm(false)} size='lg'>
                <CModalHeader>
                    <CModalTitle>Add Expense Amount</CModalTitle>
                </CModalHeader>
                <CModalBody>

                    <CRow>
                        <CCol md={12} lg={6}>
                            <CFormInput
                                type="date"
                                label='Date'
                                className='mb-2'
                                value={debitdate}
                                onChange={(e) => setDebitDate(e.target.value)}
                            />
                        </CCol>

                        <CCol md={12} lg={6}>
                            <CFormSelect
                                className='mb-2'
                                label='Expense Category'
                                value={expenceCategory}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option>Select Category</option>
                                {getExpenceMaster.map((el) => {
                                    return <option>{el.CategoryName
                                    }</option>
                                })}
                            </CFormSelect>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol md={12} lg={6}>
                            <CFormInput
                                className='mb-2'
                                type="text"
                                label='Details of Expense'
                                value={detailOfEx}
                                onChange={(e) => { setDeatilOfEx(e.target.value) }}
                            />
                        </CCol>

                        <CCol md={12} lg={6}>
                            <CFormSelect
                                className='mb-2'
                                type="text"
                                label='Paid by'
                                value={payedBy}
                                onChange={(e) => setPayedBy(e.target.value)}
                            >
                                <option>Select Staff</option>
                                {staff.filter((list) => list.username === username).map((item, index) => (
                                    item.username === username && (
                                        <option key={index}>{item.FullName}</option>
                                    )
                                ))}

                            </CFormSelect>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol md={12} lg={6}>
                            <CFormInput
                                className='mb-2'
                                type="text"
                                label='Paid To'
                                value={payedTo}
                                onChange={(e) => setPayedTo(e.target.value)}
                            />
                        </CCol>
                        <CCol md={12} lg={6}>
                            <CFormSelect
                                type="text"
                                label='Approved By'
                                className='mb-2'
                                value={approvedByEx}
                                onChange={(e) => setApprovedByEx(e.target.value)}
                            >
                                <option>Select Staff</option>
                                {staff.filter((list) => list.username === username).map((item, index) => (
                                    item.username === username && (
                                        <option key={index}>{item.FullName}</option>
                                    )
                                ))}
                            </CFormSelect>
                        </CCol>

                    </CRow>

                    <CRow>




                        <CCol md={12} lg={6}>
                            <CFormInput
                                label='Expense Amount'
                                type='number'
                                value={debitAmount}
                                onChange={(e) => setDebitAmount(e.target.value)
                                }
                            ></CFormInput>
                        </CCol>

                        <CCol md={12} lg={6}>
                            <CFormInput
                                disabled
                                className='bg-success text-white'
                                label='Balance Amount'
                                type='number'
                                value={balanceAmount}
                            ></CFormInput>
                        </CCol>
                    </CRow>
                    {errorMessage2 ? <p className="h6 text-danger mt-2">{errorMessage2}</p>
                                 : <p className="h6 text-white mt-2">' '</p>}
                    <CCol className='pt-3'>
                        <CButton onClick={() => saveDabit()}>Save</CButton>
                    </CCol>
                </CModalBody>
            </CModal>
            <CCol lg={12} sm={12}>
                <CCard className='mb-3 border-top-success border-top-3'>
                    <CCardHeader>
                        <strong className="mt-2">Petty Cash</strong>
                    </CCardHeader>
                    <CCardBody>

                        {showFrom && <CCard className='mb-4'>

                            <CCardHeader style={{ backgroundColor: "#0B5345", color: "white" }} >
                                <strong className="mt-2">Petty Cash</strong>
                            </CCardHeader>
                            <CCardBody>
                                <CRow>
                                    <CCol className='text-end'>
                                        <CButton color='danger' onClick={() => {
                                            setShowForm(false)
                                            setDebitAmount('')
                                        }} className='my-2'>close</CButton>
                                    </CCol>
                                </CRow>
                                <CForm>
                                    <CRow>

                                        <CCol md={6} lg={4}>
                                            <CFormSelect
                                                type="text"
                                                label='Approved By'
                                                className='mb-2'
                                                value={approvedBy}
                                                onChange={(e) => setApprovedBy(e.target.value)}
                                            >
                                                <option>Select Staff</option>
                                                {staff.filter((list) => list.username === username).map((item, index) => (
                                                    item.username === username && (
                                                        <option key={index}>{item.FullName}</option>
                                                    )
                                                ))}
                                            </CFormSelect>
                                        </CCol>


                                        <CCol md={6} lg={4}>
                                            <CFormInput
                                                label='Credit Amount'
                                                type='number'
                                                value={creditAmount}
                                                onChange={(e) => setCreditAmount(e.target.value)}
                                            ></CFormInput>
                                        </CCol>

                                        <CCol md={6} lg={4}>
                                            <CFormInput
                                                type="date"
                                                label='Credit Date'
                                                className='mb-2'
                                                value={creditdate}
                                                onChange={(e) => setCreditDate(e.target.value)}
                                            />
                                        </CCol>

                                        {errorMessage ? <p className="h6 text-danger mt-2">{errorMessage}</p> : <p className="h6 text-white mt-2">' '</p>}


                                    </CRow>


                                </CForm>

                             

                                <CButton onClick={() => savePittyCashData()} className='my-2'>Save</CButton>

                            </CCardBody>
                        </CCard>}

                        <CRow>
                            <CCol className='my-4 text-end'><CButton onClick={() => {
                                setDeatilOfEx('')
                                setCreditDate(' ')
                                setCreditAmount(' ')
                                setPayedBy(' ')
                                setApprovedBy(' ')
                                setCreditAmount(' ')
                                setShowForm(val => !val)
                            }}>Add Credit</CButton>

                                <CButton className='my-4 mx-2' onClick={() => { ShowModalofDabit() }} >Add Expense</CButton>

                            </CCol>

                        </CRow>

   
                        <CRow className='pb-3'>
                        <CCol lg={4} md={6} className='mb-2'>
                            <CFormSelect
                            value={categoryName2}
                            onChange={(e)=>setCategory2(e.target.value)}
                            options={["Select Category Name",...getExpenceMaster.map((el)=>el.CategoryName)]}      
                                                  
                            >                                
                            </CFormSelect>
                        </CCol>

                        <CCol lg={4} md={6} className='mb-2'>
                            <CFormSelect
                            value={selectedMonth}
                            onChange={(e)=>setSelectedMonth(e.target.value)}
                            options={["Select month Name",...monthNaame.map((el,i)=>( {value:i,label:el}))]}                                             
                            >                                
                            </CFormSelect>
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol className='pb-3'>
                        <CButton onClick={clearFunction}> Clear</CButton>
                        </CCol>
                      </CRow>

                        <div style={{ overflowx: 'scroll' }}>
                            <CTable bordered style={{ borderColor: "#106103", width: '150%' }} responsive>
                                <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }}>
                                    <CTableRow>
                                        <CTableHeaderCell scope="col">Sr No</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Approved By</CTableHeaderCell>

                                        <CTableHeaderCell scope="col">
                                            Category
                                        </CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Details of Expense</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Paid By</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Paid To</CTableHeaderCell>

                                        <CTableHeaderCell scope="col">Credit</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Debit</CTableHeaderCell>
                                        {/* <CTableHeaderCell scope="col">Debit status</CTableHeaderCell> */}

                                        <CTableHeaderCell scope="col">
                                            Balance
                                        </CTableHeaderCell>

                                        <CTableHeaderCell scope="col">Delete/Edit</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {getPettyCash.filter((el)=>
                                (""+new Date(el.Date).getMonth()).includes(selectedMonth)&&
                                el.Category.includes(categoryName2)
                                ).map((el, i) => {
                                        console.log(el)
                                        return <CTableRow>
                                            <CTableDataCell>{i + 1}</CTableDataCell>
                                            <CTableDataCell>{el.Date}</CTableDataCell>
                                            <CTableDataCell>{el.Approved_By}</CTableDataCell>

                                            <CTableDataCell>{el.Category}</CTableDataCell>
                                            <CTableDataCell>{el.Particulars}</CTableDataCell>
                                            <CTableDataCell>{el.Paid_By}</CTableDataCell>
                                            <CTableDataCell>{el.Action}</CTableDataCell>
                                            <CTableDataCell>{el.Credit}</CTableDataCell>
                                            <CTableDataCell style={{ width: '100px' }}>{

                                                <b style={{ height: '20px' }} >{el.Debit}</b>
                                            }
                                            </CTableDataCell>
                                            {/* <CTableDataCell className='text-center'>{
                                    // !el.Debit.trim()?
                                    // <CButton size='sm' className='mt-2' onClick={()=>{ShowModalofDabit(el)}} >Add</CButton>
                                    // :" "
                                    }</CTableDataCell> */}

                                            <CTableDataCell>{el.Balance}</CTableDataCell>
                                            <CTableDataCell className='text-center'>{
                                                <>
                                                    <CButton color='danger' size='sm' onClick={() => DeletePityCash(el._id)}><MdDelete /></CButton>
                                                </>
                                            }</CTableDataCell>
                                        </CTableRow>
                                    })}


                                </CTableBody>
                            </CTable>
                        </div>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default PettyCash