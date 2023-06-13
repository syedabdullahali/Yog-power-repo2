import {
    CCol,
    CFormSwitch,
    CRow,
    CTabPane,
} from '@coreui/react'

import {useRight,useSuperRightFun,useSuperRightVal} from './useRight.js/useRight'
import { fitnessRigths } from '../Rights/rightsValue/crmRightsValue'

function FitnessRights({crmFitness,setRightObject}){

    const {crmFitnessGoal,superRight} = crmFitness.items

    const fitnessRigthFun = useRight(setRightObject,'crmFitness')
    const totoggaleRights = useSuperRightFun(setRightObject,'crmRights','crmFitness')
    const checkDashRights = useSuperRightVal(superRight)
    


return <div>
<CRow >

      <h5 className='mb-4 p-2 d-flex ' >
      Fitness  <span className='mx-2'>
           <CFormSwitch size="lg" checked={crmFitness.value} onChange={(e)=>setRightObject(prev=>{
                                            prev.crmRights.crmFitness.value=e.target.checked
                                            return {...prev}
            })}/></span>
          </h5>


  
          <h5 className='mb-4 d-flex ' >
          Fitness Goal<span className='mx-1'>
           <CFormSwitch size="lg" 
           checked={crmFitnessGoal.value}
           onChange={(e)=>fitnessRigthFun(true,'crmFitnessGoal',e.target.checked)}
           /></span>
          </h5>

    <CCol>
        <h6>Measurment</h6>
        <CFormSwitch size="xl" label="Measurment"  checked={checkDashRights(fitnessRigths.measurment,'access')} onChange={()=>totoggaleRights(fitnessRigths.measurment,'access')} />
        <CFormSwitch size="xl" label="Add Measurment" checked={checkDashRights(fitnessRigths.measurment,'addOn')} onChange={()=>totoggaleRights(fitnessRigths.measurment,'addOn')} />
        <CFormSwitch size="xl" label="Edit Measurment "  checked={checkDashRights(fitnessRigths.measurment,'edit')} onChange={()=>totoggaleRights(fitnessRigths.measurment,'edit')} />
        <CFormSwitch size="xl" label="Delete Measurment " checked={checkDashRights(fitnessRigths.measurment,'delete')} onChange={()=>totoggaleRights(fitnessRigths.measurment,'delete')} />
    </CCol>
    <CCol>
        <h6>All Client Dite</h6>
        <CFormSwitch size="xl" label="All Client Dite"  checked={checkDashRights(fitnessRigths.allClientDite,'access')} onChange={()=>totoggaleRights(fitnessRigths.allClientDite,'access')}  />
        <CFormSwitch size="xl" label="Add Client Dite" checked={checkDashRights(fitnessRigths.allClientDite,'addOn')} onChange={()=>totoggaleRights(fitnessRigths.allClientDite,'addOn')} />
        <CFormSwitch size="xl" label="Edit Measurment " checked={checkDashRights(fitnessRigths.allClientDite,'edit')} onChange={()=>totoggaleRights(fitnessRigths.allClientDite,'edit')} />
        <CFormSwitch size="xl" label="Delete Measurment " checked={checkDashRights(fitnessRigths.allClientDite,'delete')} onChange={()=>totoggaleRights(fitnessRigths.allClientDite,'delete')} />
    </CCol>
    <CCol>
        <h6>Diet Plan Templet</h6>
        <CFormSwitch size="xl" label="Diet Plan Templet"  checked={checkDashRights(fitnessRigths.dietPlanTemplet,'access')} onChange={()=>totoggaleRights(fitnessRigths.dietPlanTemplet,'access')} />
        <CFormSwitch size="xl" label="Add Diet Plan"  checked={checkDashRights(fitnessRigths.dietPlanTemplet,'addOn')} onChange={()=>totoggaleRights(fitnessRigths.dietPlanTemplet,'addOn')} />
        <CFormSwitch size="xl" label="Edit Diet Plan"  checked={checkDashRights(fitnessRigths.dietPlanTemplet,'edit')} onChange={()=>totoggaleRights(fitnessRigths.dietPlanTemplet,'edit')} />
        <CFormSwitch size="xl" label="Delete Diet Plan"  checked={checkDashRights(fitnessRigths.dietPlanTemplet,'delete')} onChange={()=>totoggaleRights(fitnessRigths.dietPlanTemplet,'delete')} />
    </CCol>
  
</CRow>

<CRow className='mt-5' >    
    <CCol>
        <h6>Work out Templet</h6>
        <CFormSwitch size="xl" label="Work out Templet" checked={checkDashRights(fitnessRigths.workOutTemplet,'access')} onChange={()=>totoggaleRights(fitnessRigths.workOutTemplet,'access')} />
        <CFormSwitch size="xl" label="Add Work out"  checked={checkDashRights(fitnessRigths.workOutTemplet,'addOn')} onChange={()=>totoggaleRights(fitnessRigths.workOutTemplet,'addOn')} />
        <CFormSwitch size="xl" label="Edit Work out"  checked={checkDashRights(fitnessRigths.workOutTemplet,'edit')} onChange={()=>totoggaleRights(fitnessRigths.workOutTemplet,'edit')} />
        <CFormSwitch size="xl" label="Delete Work out "  checked={checkDashRights(fitnessRigths.workOutTemplet,'delete')} onChange={()=>totoggaleRights(fitnessRigths.workOutTemplet,'delete')} />
    </CCol>
    <CCol>
        <h6>Exercise Libiry</h6> 
        <CFormSwitch size="xl" label="Exercise Libiry" checked={checkDashRights(fitnessRigths.exerciseLibiry,'access')} onChange={()=>totoggaleRights(fitnessRigths.exerciseLibiry,'access')}  />
        <CFormSwitch size="xl" label="Add Exercise"  checked={checkDashRights(fitnessRigths.exerciseLibiry,'addOn')} onChange={()=>totoggaleRights(fitnessRigths.exerciseLibiry,'addOn')}  />
        <CFormSwitch size="xl" label="Edit Exercise" checked={checkDashRights(fitnessRigths.exerciseLibiry,'edit')} onChange={()=>totoggaleRights(fitnessRigths.exerciseLibiry,'edit')}  />
        <CFormSwitch size="xl" label="Delete Exercise"  checked={checkDashRights(fitnessRigths.exerciseLibiry,'delete')} onChange={()=>totoggaleRights(fitnessRigths.exerciseLibiry,'delete')} />
    </CCol>
    <CCol>
        <h6>Daily Workout Scheduling</h6>
        <CFormSwitch size="xl" label="Daily Workout Scheduling" checked={checkDashRights(fitnessRigths.dailyWorkoutScheduling,'access')} onChange={()=>totoggaleRights(fitnessRigths.dailyWorkoutScheduling,'access')}/>
        <CFormSwitch size="xl" label="Add Daily Workout"  checked={checkDashRights(fitnessRigths.dailyWorkoutScheduling,'addOn')} onChange={()=>totoggaleRights(fitnessRigths.dailyWorkoutScheduling,'addOn')}/>
        <CFormSwitch size="xl" label="Edit Daily Workout"  checked={checkDashRights(fitnessRigths.dailyWorkoutScheduling,'edit')} onChange={()=>totoggaleRights(fitnessRigths.dailyWorkoutScheduling,'edit')} />
        <CFormSwitch size="xl" label="Delete Daily Workout" checked={checkDashRights(fitnessRigths.dailyWorkoutScheduling,'delete')} onChange={()=>totoggaleRights(fitnessRigths.dailyWorkoutScheduling,'delete')} />
    </CCol>
</CRow>

</div>

}


export default FitnessRights