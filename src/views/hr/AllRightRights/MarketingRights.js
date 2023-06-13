import { cilArrowCircleBottom, cilArrowCircleTop } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
    CCol,
    CFormSwitch,
    CRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import {useRight,useSuperRightFun,useSuperRightVal} from './useRight.js/useRight'
import { marketingRights } from '../Rights/rightsValue/crmRightsValue'



const MarketingRights = ({crmMarketing,setRightObject}) => {

    const marketingRigthFun = useRight(setRightObject,'crmMarketing')
    const {crmEmailMarketing1,crmSmsMarketing1,crmOffersMaster1,superRight,
         crmPushMarketing1,crmBulkMailerData1,crmBulkCallingData1,crmCustomerReview1} = crmMarketing.items

         const totoggaleRights = useSuperRightFun(setRightObject,'crmRights','crmMarketing')
         const checkDashRights = useSuperRightVal(superRight)
         

  return (
    <div>

        
    <CRow>

    <h5 className='mb-4 ms-1 p-2 d-flex ' >
         Marketing <span className='mx-2'>
           <CFormSwitch size="lg" checked={crmMarketing.value} onChange={(e)=>setRightObject(prev=>{
                                            prev.crmRights.crmMarketing.value=e.target.checked
                                            return {...prev}
            })}/></span>
          </h5>

        <CCol>

            <h5 className='mb-4 d-flex ' >
            Email Marketing<span className='mx-1'>
           <CFormSwitch size="lg" 
           checked={crmEmailMarketing1.value}
           onChange={(e)=>marketingRigthFun(true,'crmEmailMarketing1',e.target.checked)}
           /></span>
          </h5>
        </CCol>
        <CCol>

            <h5 className='mb-4 d-flex ' >
            SMS Marketing<span className='mx-1'>
           <CFormSwitch size="lg" 
           checked={crmSmsMarketing1.value}
           onChange={(e)=>marketingRigthFun(true,'crmSmsMarketing1',e.target.checked)}
           /></span>
          </h5>
        </CCol>

        <CCol>

            <h5 className='mb-4 d-flex ' >
            Push Marketing<span className='mx-1'>
           <CFormSwitch size="lg" 
           checked={crmPushMarketing1.value}
           onChange={(e)=>marketingRigthFun(true,'crmPushMarketing1',e.target.checked)}
           /></span>
          </h5>
        </CCol>
        

    </CRow>

    <CRow className='mt-4'>

    <CCol>


<h5 className='mb-4 d-flex ' >
     Offer Master<span className='mx-1'>
    <CFormSwitch size="lg" 
    checked={crmOffersMaster1.value}
    onChange={(e)=>marketingRigthFun(true,'crmOffersMaster1',e.target.checked)}
    /></span>
   </h5>
     <CFormSwitch size="xl" label="Add Offer"  checked={checkDashRights(marketingRights.offerMaster,'addOn')} onChange={()=>totoggaleRights(marketingRights.offerMaster,'addOn')}/>
     <CFormSwitch size="xl" label="Edit Offer "   checked={checkDashRights(marketingRights.offerMaster,'edit')} onChange={()=>totoggaleRights(marketingRights.offerMaster,'edit')}/>
     <CFormSwitch size="xl" label="Delete Offer " checked={checkDashRights(marketingRights.offerMaster,'delete')} onChange={()=>totoggaleRights(marketingRights.offerMaster,'delete')} />
 </CCol>
   
        <CCol>
          <h5 className='mb-4 d-flex ' >
          Bulk Mailer<span className='mx-1'>
           <CFormSwitch size="lg" 
           checked={ crmBulkMailerData1.value}
           onChange={(e)=>marketingRigthFun(true,'crmBulkMailerData1',e.target.checked)}
           /></span>
          </h5>
            <CFormSwitch size="xl" label="Delete Bulk Mailer" />
            <CFormSwitch size="xl" label="Edit Bulk Mailer" />
            <CFormSwitch size="xl" label="Status" />

        </CCol>
        <CCol>
            <h5 className='mb-4 d-flex ' >
            Bulk Calling<span className='mx-1'>
           <CFormSwitch size="lg" 
           checked={ crmBulkCallingData1.value}
           onChange={(e)=>marketingRigthFun(true,'crmBulkCallingData1',e.target.checked)}
           /></span>
          </h5>
     <CFormSwitch size="xl" label="Edit Bulk Calling"   checked={checkDashRights(marketingRights.bulkCalling,'edit')} onChange={()=>totoggaleRights(marketingRights.bulkCalling,'edit')}/>
     <CFormSwitch size="xl" label="Delete Bulk Calling" checked={checkDashRights(marketingRights.bulkCalling,'delete')} onChange={()=>totoggaleRights(marketingRights.bulkCalling,'delete')} />
     </CCol>   
    </CRow>
    <CRow>
    <CCol className='mt-4'>
           <h5 className='mb-4 d-flex ' >
           Customer Review<span className='mx-1'>
           <CFormSwitch size="lg" 
           checked={ crmCustomerReview1.value}
           onChange={(e)=>marketingRigthFun(true,'crmCustomerReview1',e.target.checked)}
           /></span>
          </h5>
            <CFormSwitch size="xl" label="Edit Customer Review" checked={checkDashRights(marketingRights.customerReview,'edit')} onChange={()=>totoggaleRights(marketingRights.customerReview,'edit')} />
            <CFormSwitch size="xl" label="Delete Customer Review" checked={checkDashRights(marketingRights.customerReview,'delete')} onChange={()=>totoggaleRights(marketingRights.customerReview,'delete')} />
        </CCol>
    </CRow>

</div>
  )
}

export default MarketingRights
