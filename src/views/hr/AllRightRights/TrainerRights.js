import {
    CCol,
    CFormSwitch,
    CRow,
} from '@coreui/react'

import {useRight,useSuperRightFun,useSuperRightVal} from './useRight.js/useRight'
import { trainerSuperRight } from '../Rights/rightsValue/crmRightsValue'

function TrainerRights({ crmTrainer,setRightObject}){
   const {crmLiveClasses1,crmAllBatches1,crmPtClasses1,
      crmTtcClasses,crmAllMembers1,superRight} = crmTrainer.items

   const empSubRigthFun = useRight(setRightObject,'crmTrainer')
   const totoggaleRights = useSuperRightFun(setRightObject,'crmRights','crmTrainer')
   const checkDashRights = useSuperRightVal(superRight)





return  <div >
<CRow className='mb-2'>
<h5 className='d-flex mt-2' >
          Trainer <span className='mx-2'>
           <CFormSwitch size="lg" checked={ crmTrainer.value} onChange={(e)=>setRightObject(prev=>{
                                            prev.crmRights. crmTrainer.value=e.target.checked
                                            return {...prev}
            })}/></span>
          </h5>
<CCol  className='mt-4'>
   <h5 className=' d-flex '>Live Classes   

   <CFormSwitch size="lg" 
   checked={crmLiveClasses1.value}            
   onChange={(e)=>empSubRigthFun(true,'crmLiveClasses1',e.target.checked)}/>

 </h5>
   
   <CFormSwitch size="xl" label="Daily batch Attendance" checked={checkDashRights(trainerSuperRight.liveClasses,'dailybatchAttendance')} onChange={()=>totoggaleRights(trainerSuperRight.liveClasses,'dailybatchAttendance')}  />
   <CFormSwitch size="xl" label="Monthly Report" checked={checkDashRights(trainerSuperRight.liveClasses,'monthlyReport')} onChange={()=>totoggaleRights(trainerSuperRight.liveClasses,'monthlyReport')} />
   <CFormSwitch size="xl" label="Client Attendance Reg"  checked={checkDashRights(trainerSuperRight.liveClasses,'clientAttendanceReg')} onChange={()=>totoggaleRights(trainerSuperRight.liveClasses,'clientAttendanceReg')} />
</CCol>
<CCol className='mt-4'> 
   <h5 className=' d-flex ' >All Batches  
   <CFormSwitch size="lg" 
   checked={crmAllBatches1.value}            
   onChange={(e)=>empSubRigthFun(true,'crmAllBatches1',e.target.checked)}/>
 </h5>
   <CFormSwitch size="xl" label="Daily batch Attendance" checked={checkDashRights(trainerSuperRight.allBatches,'dailybatchAttendance')} onChange={()=>totoggaleRights(trainerSuperRight.allBatches,'dailybatchAttendance')}/>
   <CFormSwitch size="xl" label="Monthly Report" checked={checkDashRights(trainerSuperRight.allBatches,'monthlyReport')} onChange={()=>totoggaleRights(trainerSuperRight.allBatches,'monthlyReport')}  />
   <CFormSwitch size="xl" label="Client Attendance Reg" checked={checkDashRights(trainerSuperRight.allBatches,'clientAttendanceReg')} onChange={()=>totoggaleRights(trainerSuperRight.allBatches,'clientAttendanceReg')}  />
</CCol>
<CCol className='mt-4'>
   <h5 className=' d-flex ' >PT Classes 
   <CFormSwitch size="lg" 
   checked={crmPtClasses1.value}            
   onChange={(e)=>empSubRigthFun(true,'crmPtClasses1',e.target.checked)}/>
   </h5>
   <CFormSwitch size="xl" label="Daily batch Attendance" checked={checkDashRights(trainerSuperRight.pTClasses,'dailybatchAttendance')} onChange={()=>totoggaleRights(trainerSuperRight.pTClasses,'dailybatchAttendance')} />
   <CFormSwitch size="xl" label="Monthly Report" checked={checkDashRights(trainerSuperRight.pTClasses,'monthlyReport')} onChange={()=>totoggaleRights(trainerSuperRight.pTClasses,'monthlyReport')} />
   <CFormSwitch size="xl" label="Client Attendance Reg" checked={checkDashRights(trainerSuperRight.pTClasses,'clientAttendanceReg')} onChange={()=>totoggaleRights(trainerSuperRight.pTClasses,'clientAttendanceReg')} />
</CCol>
</CRow>

<CRow className='mb-2'>
<CCol className='mt-4'>
   <h5 className=' d-flex '>TTC Classes <CFormSwitch 
    size="lg"
    checked={crmTtcClasses.value}            
    onChange={(e)=>empSubRigthFun(true,'crmTtcClasses',e.target.checked)}
   /></h5>
   <CFormSwitch size="xl" label="Daily batch Attendance" checked={checkDashRights(trainerSuperRight.ttCClasses,'dailybatchAttendance')} onChange={()=>totoggaleRights(trainerSuperRight.ttCClasses,'dailybatchAttendance')} />
   <CFormSwitch size="xl" label="Monthly Report" checked={checkDashRights(trainerSuperRight.ttCClasses,'monthlyReport')} onChange={()=>totoggaleRights(trainerSuperRight.ttCClasses,'monthlyReport')} />
   <CFormSwitch size="xl" label="Client Attendance Reg" checked={checkDashRights(trainerSuperRight.ttCClasses,'clientAttendanceReg')} onChange={()=>totoggaleRights(trainerSuperRight.ttCClasses,'clientAttendanceReg')} />
</CCol>
<CCol className='mt-4'>
   <h5 className=' d-flex'>All Members 
   <CFormSwitch  size="lg" 
   checked={crmAllMembers1.value}
   onChange={(e)=>empSubRigthFun(true,'crmAllMembers1',e.target.checked)}
   />
   
   </h5>
   <CFormSwitch size="xl" label="Client Attendance Reg" checked={checkDashRights(trainerSuperRight.allMembers,'clientAttendanceReg')} onChange={()=>totoggaleRights(trainerSuperRight.allMembers,'clientAttendanceReg')} />
</CCol>
<CCol>

</CCol>

</CRow>
</div>

} 

export default TrainerRights