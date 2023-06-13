import {
    CCol,
    CFormSwitch,
    CRow,
} from '@coreui/react'


import React from 'react'
import {useRight,useSuperRightFun,useSuperRightVal} from './useRight.js/useRight'
import { empLoyeeeRights} from '../Rights/rightsValue/crmRightsValue'

const EmployeeRights = ({ crmEmployee,setRightObject}) => {

const {crmDashboard1,crmEmployeeTarget1,crmMemberCalls1,crmSalesCall1,crmServicesRateCard1} = crmEmployee.items

const empSubRigthFun = useRight(setRightObject,'crmEmployee')


   const checkDashRights = (val,type)=>{
    return crmEmployee.items[type].rights.includes(val)
   } 


   const totoggaleRights = (val,type)=>{
       
     setRightObject((prev)=>{
       const rightsPath = prev.crmRights.crmEmployee.items[type]?.rights
       console.log(rightsPath)
       console.log(prev.crmRights.crmEmployee.items[type])
        if(!rightsPath?.includes(val)){
            rightsPath?.push(val)
        }else if(rightsPath.includes(val)){
            rightsPath?.splice(rightsPath?.indexOf(val),1)
        }
        console.log(rightsPath)

          return {...prev}
       })
     
    }

 

    return <div  >
    <CRow >
          <h5 className='mb-4 p-2 d-flex ' >
          Employee <span className='mx-2'>
           <CFormSwitch size="lg" checked={crmEmployee.value} onChange={(e)=>setRightObject(prev=>{
                                            prev.crmRights.crmEmployee.value=e.target.checked
                                            return {...prev}
            })}/></span>
          </h5>
          <h5 className='mb-4 p-2 d-flex ' >
          Employee Dashboard<span className='mx-2'>
           <CFormSwitch size="lg" 
           checked={crmDashboard1.value}
           onChange={(e)=>empSubRigthFun(true,'crmDashboard1',e.target.checked)}
           /></span>
          </h5>
    
        <CCol>
            <CFormSwitch size="xl" label="Achived"  checked={checkDashRights(empLoyeeeRights.achived,'crmDashboard1')} onChange={()=>totoggaleRights(empLoyeeeRights.achived,'crmDashboard1')}/>
            <CFormSwitch size="xl" label="Target" checked={checkDashRights(empLoyeeeRights.target,'crmDashboard1')} onChange={()=>totoggaleRights(empLoyeeeRights.target,'crmDashboard1')} />
            <CFormSwitch size="xl" label="Incentive" checked={checkDashRights(empLoyeeeRights.incentive,'crmDashboard1')} onChange={()=>totoggaleRights(empLoyeeeRights.incentive,'crmDashboard1')} />
            <CFormSwitch size="xl" label="Profit" checked={checkDashRights(empLoyeeeRights.profit,'crmDashboard1')} onChange={()=>totoggaleRights(empLoyeeeRights.profit,'crmDashboard1')}/>
        </CCol>
        <CCol>
            <CFormSwitch size="xl" label="Income" checked={checkDashRights(empLoyeeeRights.income,'crmDashboard1')} onChange={()=>totoggaleRights(empLoyeeeRights.income,'crmDashboard1')}  />
            <CFormSwitch size="xl" label="Attendance" checked={checkDashRights(empLoyeeeRights.attendance,'crmDashboard1')} onChange={()=>totoggaleRights(empLoyeeeRights.attendance,'crmDashboard1')} />
            <CFormSwitch size="xl" label="Social Media"checked={checkDashRights(empLoyeeeRights.socialMedia,'crmDashboard1')} onChange={()=>totoggaleRights(empLoyeeeRights.socialMedia,'crmDashboard1')} />
            <CFormSwitch size="xl" label="Yog Power Branch" checked={checkDashRights(empLoyeeeRights.yogPowerBranch,'crmDashboard1')} onChange={()=>totoggaleRights(empLoyeeeRights.yogPowerBranch,'crmDashboard1')}  />

        </CCol>
        <CCol>
        </CCol>
      
    </CRow>
    
    <CRow className='mt-5' >

       <h5 className='mb-4 p-2 d-flex ' >
          Employee Target<span className='mx-2'>
           <CFormSwitch size="lg" 
              checked={crmEmployeeTarget1.value}
              onChange={(e)=>empSubRigthFun(true,'crmEmployeeTarget1',e.target.checked)}
           />
           </span>
          </h5>
        
        <CCol>
            <CFormSwitch size="xl" label="Sales Target"  checked={checkDashRights(empLoyeeeRights.salesTarget,'crmEmployeeTarget1')} onChange={()=>totoggaleRights(empLoyeeeRights.salesTarget,'crmEmployeeTarget1')}/>
            <CFormSwitch size="xl" label="Client Target"  checked={checkDashRights(empLoyeeeRights.clientTarget,'crmEmployeeTarget1')} onChange={()=>totoggaleRights(empLoyeeeRights.clientTarget,'crmEmployeeTarget1')} />
            <CFormSwitch size="xl" label="Calls Target" checked={checkDashRights(empLoyeeeRights.callsTarget,'crmEmployeeTarget1')} onChange={()=>totoggaleRights(empLoyeeeRights.callsTarget,'crmEmployeeTarget1')} />
            <CFormSwitch size="xl" label="Lead Target" checked={checkDashRights(empLoyeeeRights.leadTarget,'crmEmployeeTarget1')} onChange={()=>totoggaleRights(empLoyeeeRights.leadTarget,'crmEmployeeTarget1')} />
        </CCol>
        <CCol>
            <CFormSwitch size="xl" label="Renewal" checked={checkDashRights(empLoyeeeRights.renewal,'crmEmployeeTarget1')} onChange={()=>totoggaleRights(empLoyeeeRights.renewal,'crmEmployeeTarget1')}  />
            <CFormSwitch size="xl" label="Referral Leads"checked={checkDashRights(empLoyeeeRights.referralLeads,'crmEmployeeTarget1')} onChange={()=>totoggaleRights(empLoyeeeRights.referralLeads,'crmEmployeeTarget1')} />
            <CFormSwitch size="xl" label="Media Target" checked={checkDashRights(empLoyeeeRights.mediaTarget,'crmEmployeeTarget1')} onChange={()=>totoggaleRights(empLoyeeeRights.mediaTarget,'crmEmployeeTarget1')} />
        </CCol>    
    </CRow>

        <CRow className='mt-5' >

            <h5 className='mb-4 p-2 d-flex '>
                Members Call<span className='mx-2'>
                <CFormSwitch size="lg" 
              checked={crmMemberCalls1.value}
              onChange={(e)=>empSubRigthFun(true,'crmMemberCalls1',e.target.checked)}
           /></span>
            </h5>

            <CCol>
                <CFormSwitch size="xl" label="Welcome Calls" checked={checkDashRights(empLoyeeeRights.welcomeCalls,'crmMemberCalls1')} onChange={()=>totoggaleRights(empLoyeeeRights.welcomeCalls,'crmMemberCalls1')}/>
                <CFormSwitch size="xl" label="Feedback Calls" checked={checkDashRights(empLoyeeeRights.feedbackCalls,'crmMemberCalls1')} onChange={()=>totoggaleRights(empLoyeeeRights.feedbackCalls,'crmMemberCalls1')} />
                <CFormSwitch size="xl" label="Payment Calls" checked={checkDashRights(empLoyeeeRights.paymentCalls,'crmMemberCalls1')} onChange={()=>totoggaleRights(empLoyeeeRights.paymentCalls,'crmMemberCalls1')} />
                <CFormSwitch size="xl" label="Irregular Member Call"  checked={checkDashRights(empLoyeeeRights.irregularMemberCall,'crmMemberCalls1')} onChange={()=>totoggaleRights(empLoyeeeRights.irregularMemberCall,'crmMemberCalls1')} />
            </CCol>
            <CCol>
                <CFormSwitch size="xl" label="Greeting Calls"  checked={checkDashRights(empLoyeeeRights.greetingCalls,'crmMemberCalls1')} onChange={()=>totoggaleRights(empLoyeeeRights.greetingCalls,'crmMemberCalls1')} />
                <CFormSwitch size="xl" label="Call History"  checked={checkDashRights(empLoyeeeRights.callHistory,'crmMemberCalls1')} onChange={()=>totoggaleRights(empLoyeeeRights.callHistory,'crmMemberCalls1')} />
            </CCol>
        </CRow>

        <CRow className='mt-5' >

            <h5 className='mb-4 p-2 d-flex ' >
                Sales Call<span className='mx-2'>
                <CFormSwitch size="lg" 
              checked={crmSalesCall1.value}
              onChange={(e)=>empSubRigthFun(true,'crmSalesCall1',e.target.checked)}/>

              </span>
            </h5>

            <CCol>
                <CFormSwitch size="xl" label="Upgrade Calls"  checked={checkDashRights(empLoyeeeRights.upgradeCalls,'crmSalesCall1')} onChange={()=>totoggaleRights(empLoyeeeRights.upgradeCalls,'crmSalesCall1')} />
                <CFormSwitch size="xl" label="Renewals Calls"  checked={checkDashRights(empLoyeeeRights.renewalsCalls,'crmSalesCall1')} onChange={()=>totoggaleRights(empLoyeeeRights.renewalsCalls,'crmSalesCall1')} />
                <CFormSwitch size="xl" label="Cross-Cell Calls"  checked={checkDashRights(empLoyeeeRights.crossCellCalls,'crmSalesCall1')} onChange={()=>totoggaleRights(empLoyeeeRights.crossCellCalls,'crmSalesCall1')} />
            </CCol>
           
        </CRow>
        
        <CRow className='mt-5' >

            <h5 className='mb-4 p-2 d-flex ' >
            Services Rate Card <span className='mx-2'>
            <CFormSwitch size="lg" 
              checked={crmServicesRateCard1.value}
              onChange={(e)=>empSubRigthFun(true,'crmServicesRateCard1',e.target.checked)}/>
              </span>
            </h5>

        </CRow>
    
    </div>
}

export default EmployeeRights
