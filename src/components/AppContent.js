import React, { Suspense, useEffect,useState } from 'react'
import { Navigate, Route, Routes,useParams } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
// routes config
import routes from '../routes'


const AppContent = ({params }) => {


  const routesEl = routes.map((route, idx) => {
    return (
      route.element && (
        <Route
          key={idx}
          path={route.path}
          exact={route.exact}
          name={route.name}
          element={<route.element />}
        />
      )
    )
  })
  const [routessC,setRoutes] = useState(routesEl)

 

  useEffect(()=>{
  setRoutes([...routesEl])
  },[params['*']])

  return (validateLayout&&
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes  >
          {routessC}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)




