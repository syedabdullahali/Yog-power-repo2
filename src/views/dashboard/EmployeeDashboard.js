import React, { useEffect, useState } from 'react'

import {
    CAvatar,
    CButton,
    CButtonGroup,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CProgress,
    CProgressBar,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from '@coreui/react'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import {
    cibCcAmex,
    cibCcApplePay,
    cibCcMastercard,
    cibCcPaypal,
    cibCcStripe,
    cibCcVisa,
    cibGoogle,
    cibFacebook,
    cibLinkedin,
    cifBr,
    cifEs,
    cifFr,
    cifIn,
    cifPl,
    cifUs,
    cibTwitter,
    cilCloudDownload,
    cilUser,
    cilUserFemale,
    cilPeople,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

import WidgetsBrand from '../widgets/WidgetsBrand'
import { useNavigate } from 'react-router-dom'
import WidgetsDropdown2 from '../widgets/WidgetsDropdown2'
import { empLoyeeeRights } from '../hr/Rights/rightsValue/crmRightsValue'
import { useSelector } from 'react-redux'

const EmployeeDashboard = () => {
    const rightsData = useSelector((el)=>el.empLoyeeRights?.crmRights
    ?.crmEmployee?.items?.crmDashboard1?.rights) 
    const access = rightsData?rightsData:[]
    const isAdmin = useSelector((el)=>el.isAdmin) 



    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user-info'))
    useEffect(() => {
        if (user == null) {
            navigate('/login')
        }
        else if (user.user.username == null || user.user.username == undefined) {
            alert('Incorrect Details')
            localStorage.clear()
        }
    }, [])

    const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
    const [active, setActive] = useState('Today')

    const progressExample = [
        { title: 'Visits', value: '29.703 Users', percent: 40, color: 'success' },
        { title: 'Unique', value: '24.093 Users', percent: 20, color: 'info' },
        {
            title: 'Pageviews',
            value: '78.706 Views',
            percent: 60,
            color: 'warning',
        },
        { title: 'New Users', value: '22.123 Users', percent: 80, color: 'danger' },
        {
            title: 'Bounce Rate',
            value: 'Average Rate',
            percent: 40.15,
            color: 'primary',
        },
    ]

    const progressGroupExample1 = [
        { title: 'Monday', value1: 34, value2: 78 },
        { title: 'Tuesday', value1: 56, value2: 94 },
        { title: 'Wednesday', value1: 12, value2: 67 },
        { title: 'Thursday', value1: 43, value2: 91 },
        { title: 'Friday', value1: 22, value2: 73 },
        { title: 'Saturday', value1: 53, value2: 82 },
        { title: 'Sunday', value1: 9, value2: 69 },
    ]

    const progressGroupExample2 = [
        { title: 'Male', icon: cilUser, value: 53 },
        { title: 'Female', icon: cilUserFemale, value: 43 },
    ]

    const progressGroupExample3 = [
        { title: 'Organic Search', icon: cibGoogle, percent: 56, value: '191,235' },
        { title: 'Facebook', icon: cibFacebook, percent: 15, value: '51,223' },
        { title: 'Twitter', icon: cibTwitter, percent: 11, value: '37,564' },
        { title: 'LinkedIn', icon: cibLinkedin, percent: 8, value: '27,319' },
    ]

    const tableExample = [
        {
            avatar: { src: avatar1, status: 'success' },
            user: {
                name: 'Yiorgos Avraamu',
                new: true,
                registered: 'Jan 1, 2021',
            },
            country: { name: 'USA', flag: cifUs },
            usage: {
                value: 50,
                period: 'Jun 11, 2021 - Jul 10, 2021',
                color: 'success',
            },
            payment: { name: 'Mastercard', icon: cibCcMastercard },
            activity: '10 sec ago',
        },
        {
            avatar: { src: avatar2, status: 'danger' },
            user: {
                name: 'Avram Tarasios',
                new: false,
                registered: 'Jan 1, 2021',
            },
            country: { name: 'Brazil', flag: cifBr },
            usage: {
                value: 22,
                period: 'Jun 11, 2021 - Jul 10, 2021',
                color: 'info',
            },
            payment: { name: 'Visa', icon: cibCcVisa },
            activity: '5 minutes ago',
        },
        {
            avatar: { src: avatar3, status: 'warning' },
            user: { name: 'Quintin Ed', new: true, registered: 'Jan 1, 2021' },
            country: { name: 'India', flag: cifIn },
            usage: {
                value: 74,
                period: 'Jun 11, 2021 - Jul 10, 2021',
                color: 'warning',
            },
            payment: { name: 'Stripe', icon: cibCcStripe },
            activity: '1 hour ago',
        },
        {
            avatar: { src: avatar4, status: 'secondary' },
            user: { name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2021' },
            country: { name: 'France', flag: cifFr },
            usage: {
                value: 98,
                period: 'Jun 11, 2021 - Jul 10, 2021',
                color: 'danger',
            },
            payment: { name: 'PayPal', icon: cibCcPaypal },
            activity: 'Last month',
        },
        {
            avatar: { src: avatar5, status: 'success' },
            user: {
                name: 'Agapetus Tadeáš',
                new: true,
                registered: 'Jan 1, 2021',
            },
            country: { name: 'Spain', flag: cifEs },
            usage: {
                value: 22,
                period: 'Jun 11, 2021 - Jul 10, 2021',
                color: 'primary',
            },
            payment: { name: 'Google Wallet', icon: cibCcApplePay },
            activity: 'Last week',
        },
        {
            avatar: { src: avatar6, status: 'danger' },
            user: {
                name: 'Friderik Dávid',
                new: true,
                registered: 'Jan 1, 2021',
            },
            country: { name: 'Poland', flag: cifPl },
            usage: {
                value: 43,
                period: 'Jun 11, 2021 - Jul 10, 2021',
                color: 'success',
            },
            payment: { name: 'Amex', icon: cibCcAmex },
            activity: 'Last week',
        },
    ]

    return (
        <>
            <WidgetsDropdown2
              access={access}
              isAdmin={isAdmin}
            />

            <CRow>
                {(access?.includes(empLoyeeeRights.income)||isAdmin)&&<CCol lg={6} sm={12}>
                    <CCard className="mb-4">
                        <CCardBody>
                            <CRow>
                                <CCol sm={5} className='mb-2'>
                                    <h4 id="traffic" className="card-title mb-0">
                                        Income
                                    </h4>
                                    <div className="small text-medium-emphasis">
                                        January - July 2021
                                    </div>
                                </CCol>
                                <CCol sm={7} className="d-none d-md-block">
                                    <CButton color="primary" className="float-end">
                                        <CIcon icon={cilCloudDownload} />
                                    </CButton>
                                    <CButtonGroup className="float-end me-3">
                                        {['Day', 'Month', 'Year'].map((value) => (
                                            <CButton
                                                color="outline-secondary"
                                                key={value}
                                                className="mx-0"
                                                active={value === 'Month'}
                                            >
                                                {value}
                                            </CButton>
                                        ))}
                                    </CButtonGroup>
                                </CCol>
                            </CRow>
                            <CChartBar
                                data={{
                                    labels: [
                                        'January',
                                        'February',
                                        'March',
                                        'April',
                                        'May',
                                        'June',
                                        'July',
                                        'August',
                                        'Sep',
                                    ],
                                    value: [
                                        'January',
                                        'February',
                                        'March',
                                        'April',
                                        'May',
                                        'June',
                                        'July',
                                        'August',
                                        'Sep',
                                    ],
                                    datasets: [
                                        {
                                            label: 'Monthly Sales',
                                            backgroundColor: 'darkgreen',
                                            data: [61, 85, 100, 120, 150, 40, 39, 80, 40, 100, 300],
                                        },
                                    ],
                                }}
                                labels="months"
                                value="value"
                            />
                            <CCard style={{ marginRight: '10px', marginLeft: '40px', backgroundColor: 'darkgreen', color: 'white', paddingLeft: '10px', paddingRight: '10px' }}>
                                <div className='d-flex justify-content-between'>
                                    <label>40</label>
                                    <label>20</label>
                                    <label>12</label>
                                    <label>39</label>
                                    <label>10</label>
                                    <label>40</label>
                                    <label>39</label>
                                    <label>80</label>
                                    <label>40</label>
                                </div>
                            </CCard>
                        </CCardBody>
                    </CCard>
                </CCol>}
                {(access?.includes(empLoyeeeRights.attendance)||isAdmin)&&<CCol lg={6} sm={12}>
                    <CCard className="mb-4">

                        <CCardBody>

                            <CRow >
                                <CCol sm={4}>
                                    <h4 id="traffic" className="card-title mb-0">
                                        Attendance
                                    </h4>
                                    <div className="small text-medium-emphasis mb-3">
                                        Weekly
                                    </div>
                                </CCol>
                                <CCol sm={4}>
                                    <div className="border-start border-start-4 border-start-info py-1 px-3">
                                        <div className="text-medium-emphasis small">
                                            Attented Clients
                                        </div>
                                        <div className="fs-5 fw-semibold">9,123</div>
                                    </div>
                                </CCol>
                                <CCol sm={4}>
                                    <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                                        <div className="text-medium-emphasis small">
                                            Total Active Clients
                                        </div>
                                        <div className="fs-5 fw-semibold">22,643</div>
                                    </div>
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol xs={12} md={12} xl={12}>


                                    <hr className="mt-0" />
                                    {progressGroupExample1.map((item, index) => (
                                        <div className="progress-group mb-3" key={index}>
                                            <div className="progress-group-prepend">
                                                <span className="text-medium-emphasis small">
                                                    {item.title}
                                                </span>
                                            </div>
                                            <div className="progress-group-bars">
                                                <CProgress >
                                                    <CProgressBar color="success" value={item.value1} />
                                                    <CProgressBar color="info" value={item.value2} />
                                                </CProgress>
                                            </div>
                                            <div className="progress-group-prepend">
                                                <span className="ms-auto fw-semibold">
                                                    {item.value1}
                                                    <span className="text-medium-emphasis small">
                                                        ({item.percent}%)
                                                    </span>
                                                </span>/
                                                <span className="ms-auto fw-semibold">
                                                    {item.value2}
                                                    <span className="text-medium-emphasis small">
                                                        ({item.percent}%)
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CCol>}

                {(access?.includes(empLoyeeeRights.socialMedia)||isAdmin)&&<CCol lg={12} sm={12}>
                    <CCard className="mb-4">

                        <CCardBody>
                            <h4 id="traffic" className="card-title mb-0">
                                Social Media
                            </h4>
                            <div className="small text-medium-emphasis mb-3">
                                Traffic
                            </div>
                            <CRow>
                                <CCol sm={6}>
                                    <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                                        <div className="text-medium-emphasis small">
                                            Pageviews
                                        </div>
                                        <div className="fs-5 fw-semibold">78,623</div>
                                    </div>
                                </CCol>
                                <CCol sm={6}>
                                    <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                                        <div className="text-medium-emphasis small">
                                            Organic
                                        </div>
                                        <div className="fs-5 fw-semibold">49,123</div>
                                    </div>
                                </CCol>
                            </CRow>

                            <hr className="mt-0" />

                            {progressGroupExample2.map((item, index) => (
                                <div className="progress-group mb-2" key={index}>
                                    <div className="progress-group-header">
                                        <CIcon className="me-2" icon={item.icon} size="lg" />
                                        <span>{item.title}</span>
                                        <span className="ms-auto fw-semibold">
                                            {item.value}%
                                        </span>
                                    </div>
                                    <div className="progress-group-bars">
                                        <CProgress thin color="warning" value={item.value} />
                                    </div>
                                </div>
                            ))}

                            <div className="mb-4"></div>

                            {progressGroupExample3.map((item, index) => (
                                <div className="progress-group" key={index}>
                                    <div className="progress-group-header">
                                        <CIcon className="me-2" icon={item.icon} size="lg" />
                                        <span>{item.title}</span>
                                        <span className="ms-auto fw-semibold">
                                            {item.value}{' '}
                                            <span className="text-medium-emphasis small">
                                                ({item.percent}%)
                                            </span>
                                        </span>
                                    </div>
                                    <div className="progress-group-bars">
                                        <CProgress thin color="success" value={item.percent} />
                                    </div>
                                </div>
                            ))}
                        </CCardBody>
                    </CCard>
                </CCol>}

            </CRow>

            {/* <WidgetsBrand withCharts /> */}

            <CRow>
                {(access?.includes(empLoyeeeRights.yogPowerBranch)||isAdmin)&&<CCol >
                    <CCard className="mb-4">
                        <CCardHeader>Yog Power Branch</CCardHeader>
                        <CCardBody>
                            <CTable align="middle" bordered style={{ borderColor: "#106103" }} hover responsive>
                                <CTableHead style={{ backgroundColor: "#106103", color: "white" }} >
                                    <CTableRow>
                                        <CTableHeaderCell className="text-center">
                                            <CIcon icon={cilPeople} />
                                        </CTableHeaderCell>
                                        <CTableHeaderCell>Center Name</CTableHeaderCell>
                                        <CTableHeaderCell className="text-center">
                                            Location
                                        </CTableHeaderCell>
                                        <CTableHeaderCell>Proformance</CTableHeaderCell>
                                        <CTableHeaderCell className="text-center">
                                            Royalty Percent
                                        </CTableHeaderCell>
                                        <CTableHeaderCell>Details</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {tableExample.map((item, index) => (
                                        <CTableRow v-for="item in tableItems" key={index}>
                                            <CTableDataCell className="text-center">
                                                <CAvatar
                                                    size="md"
                                                    src={item.avatar.src}
                                                    status={item.avatar.status}
                                                />
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <div>{item.user.name}</div>
                                                <div className="small text-medium-emphasis">
                                                    <span>{item.user.new ? 'New' : 'Recurring'}</span> |
                                                    Registered: {item.user.registered}
                                                </div>
                                            </CTableDataCell>
                                            <CTableDataCell className="text-center">
                                                <CIcon
                                                    size="xl"
                                                    icon={item.country.flag}
                                                    title={item.country.name}
                                                />
                                            </CTableDataCell>
                                            <CTableDataCell>

                                                <div className="clearfix">
                                                    <div className="float-start">
                                                        <strong>Total Target :100000</strong>
                                                    </div>
                                                    <div className="float-end">
                                                        <small className="text-medium-emphasis">
                                                            Complated : 60000
                                                        </small>
                                                    </div>
                                                </div>

                                                <div className="clearfix">
                                                    <div className="float-start">
                                                        <strong>{item.usage.value}%</strong>
                                                    </div>
                                                    <div className="float-end">
                                                        <small className="text-medium-emphasis">
                                                            {item.usage.period}
                                                        </small>
                                                    </div>
                                                </div>
                                                <CProgress
                                                    thin
                                                    color={item.usage.color}
                                                    value={item.usage.value}
                                                />
                                            </CTableDataCell>
                                            <CTableDataCell className="text-center">
                                                <div>
                                                    <strong>12%</strong>
                                                </div>
                                                <div>
                                                    <small className="text-medium-emphasis">
                                                        72000 Received
                                                    </small>
                                                </div>
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <CButton color='success'>view</CButton>
                                            </CTableDataCell>
                                        </CTableRow>
                                    ))}
                                </CTableBody>
                            </CTable>
                        </CCardBody>
                    </CCard>
                </CCol>}
            </CRow>
        </>
    )
}

export default EmployeeDashboard
