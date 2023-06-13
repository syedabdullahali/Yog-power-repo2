import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
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
} from '@coreui/react'


// form 
import FitnessMeasurmentForm from './form/FitnessMeasurmentForm'
import AllDietClientForm from './form/AllDietClientForm';
import DietPlanTempletForm from './form/DietPlanTempletForm';
import WorkoutTempletForm from './form/WorkoutTempletForm';
import ExerciseLbiiry from './form/ExerciseLibiry';
import DailyWorkoutScheduling from './form/DailyWorkoutScheduling';

// Tables
const MeasurementTable = React.lazy(() => import('./Tablels/MeasurmentTable'))
const ClientDietTable = React.lazy(() => import('./Tablels/ClientDietTable'))
const DietPlanTable = React.lazy(() => import('./Tablels/DietPlanTable'))
const WorkOutTempletTable = React.lazy(() => import('./Tablels/WorkOutTempletTable'))
const ExerciseLibiryTable = React.lazy(() => import('./Tablels/ExerciseLibiry'))
const DailyWorkoutSchedulingTable =  React.lazy(() => import('./Tablels/DailyWorkoutScheduling'))

import { useSelector } from 'react-redux';
import axios from 'axios';



const Fitness = () => {
    const url1 = useSelector((el) => el.domainOfApi)

    const [active, setActiveButton] = useState(1)
    const [allMemberData,setAllmemBerData] = useState([]) 
    // Forms 
    const [showForm, setForm] = useState(false)
    // Barriar Token 
    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;

    const {id} = useParams()
    const {i} = useParams()

    console.log(id)
    console.log(i)


    const closeFormFun = () => {
        setForm(() => false)
    }
    


 const getClientMemData = ()=>{

    axios.get(`${url1}/memberForm/all`, {headers: {'Authorization': `Bearer ${token}`}})
    .then((res) => {setAllmemBerData(res.data)})
    .catch((error) => {console.error(error)})
 }

useEffect(()=>{
getClientMemData()
},[])

    return (
        <CCard style={{ overflow: 'hidden' }}>

            <CNav variant="pills" role="tablist" style={{ background: '#0B5345' }}>
                <CNavLink className='m-2 p-2' style={{ color: 'white', cursor: 'pointer' }} active={active === 1} onClick={() => { setActiveButton(1), closeFormFun() }}>
                    Measurment
                </CNavLink >
                <CNavLink className='m-2 p-2' style={{ color: 'white', cursor: 'pointer' }} active={active === 2} onClick={() => { setActiveButton(2), closeFormFun() }}>
                    ALL Diet Client
                </CNavLink>
                <CNavLink className='m-2 p-2' style={{ color: 'white', cursor: 'pointer' }} active={active === 3} onClick={() => { setActiveButton(3), closeFormFun() }}>
                    Diet Plan Templet
                </CNavLink>
                <CNavLink className='m-2 p-2' style={{ color: 'white', cursor: 'pointer' }} active={active === 4} onClick={() => { setActiveButton(4), closeFormFun() }}>
                    Work out Templet
                </CNavLink>
                <CNavLink className='m-2 p-2' style={{ color: 'white', cursor: 'pointer' }} active={active === 5} onClick={() => { setActiveButton(5), closeFormFun() }}>
                    Exercise Libiry
                </CNavLink>
                <CNavLink className='m-2 p-2' style={{ color: 'white', cursor: 'pointer' }} active={active === 6} onClick={() => { setActiveButton(6), closeFormFun() }}>
                    Daily Workout Scheduling
                </CNavLink>
            </CNav >
            <CCol className='m-4 mt-1 p-4' style={{ position: 'relative' }}>
                <CButton style={{ position: 'absolute', right: '0' }} onClick={() => setForm((value) => !value)}>Add New</CButton>
            </CCol>
            {showForm && active === 4 ? <WorkoutTempletForm closeFormFun={closeFormFun} /> : ''}
            {showForm && active === 5 ? <ExerciseLbiiry closeFormFun={closeFormFun} /> : ''}
            {showForm && active === 6 ? <DailyWorkoutScheduling  closeFormFun={closeFormFun} /> : ''}


            {active === 1 && <MeasurementTable id={id}  allMemberData={allMemberData} showForm={showForm}  token={token} closeFormFun={closeFormFun} setForm={setForm} />}
            {active === 2 && <ClientDietTable id={id}  allMemberData={allMemberData} showForm={showForm}  token={token} closeFormFun={closeFormFun} setForm={setForm} />}
            {active === 3 && <DietPlanTable id={id} idVal={+i===9} showForm={showForm}  token={token} closeFormFun={closeFormFun} setForm={setForm} />}
            {active === 4 && <WorkOutTempletTable id={id} idVal={+i===9}  allMemberData={allMemberData} Token={token} />}
            {active === 5 && <ExerciseLibiryTable id={id} idVal={+i===9}  allMemberData={allMemberData} Token={token} />}           
            {active === 6 && <DailyWorkoutSchedulingTable id={id} idVal={+i===9}  allMemberData={allMemberData} Token={token} />}


        </CCard>
    )
}

export default Fitness
