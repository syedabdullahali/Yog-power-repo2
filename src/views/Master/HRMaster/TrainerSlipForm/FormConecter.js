import {
    CButton,
    CCol,
    CNav,
    CNavItem,
    CNavLink,
    CTabContent,
    CTabPane,
} from '@coreui/react'
import { useEffect, useState } from 'react'
import React from 'react'


import TrainerSalarySliipFrom from './TrainerSalarySliipFrom';

const FormConecter = ({updateActive,setUpdateActive,getData}) => {

  const [activeKey, setActiveKey] = useState()



useEffect(()=>{
if(updateActive?.visible ){
  setActiveKey(1)
  
}
},[updateActive?.visible])

  return (
    <div>
       <CNav variant="tabs" role="tablist" style={{display:!!activeKey?'flex':'none'}}>
    
          <CNavItem>
            <CNavLink
              active={activeKey === 1}
            >
              Salary Form 
            </CNavLink>
          </CNavItem>
</CNav>
                    <CCol className='text-end p-2'>
                        {!activeKey&& <CButton onClick={()=>setActiveKey(1)}>Create new salary slip</CButton>}
                        {!!activeKey&&<CButton color='danger' onClick={()=>{
                          setActiveKey(0)
                          setUpdateActive({visible:false,obj:{}})
                          }}>Close</CButton>}
                    </CCol>  
       <CTabContent style={{display:!!activeKey?'block':'none'}}>
        
          <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={activeKey === 1}>
           <TrainerSalarySliipFrom updateActive={updateActive} getData={getData} />
          </CTabPane>
        </CTabContent>

    </div>
  )
}

export default FormConecter
