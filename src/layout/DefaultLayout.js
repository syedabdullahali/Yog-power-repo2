import React,{useEffect,useState} from 'react'
import {
  AppContent,
  AppSidebar,
  AppFooter,
  AppHeader,
} from '../components/index'

import {useParams } from 'react-router-dom'


const params = useParams()



import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

let user = JSON.parse(localStorage.getItem('user-info'))
const token = user?.token;
const emailUniqId = user?.user?.emailUniqId;

const DefaultLayout = () => {
  let num =0
  const disPatch = useDispatch()
  const navigate = useNavigate()
  const getUserRight = useSelector((el)=>el.getUserRight)    
  const isEmployee = useSelector((el)=>el.isEmployee)    
  const activeToCall = useSelector((el)=>el.activeToCall)    
  const [toggaleToRerendar,setReRender] = useState(false)
  const data = useSelector((el)=>el.empLoyeeRights)  
  const [validateLayout,setValidateLayout] = useState(false)

  const validateVal = (!!data?.emailUniqId || user?.user?.isAdmin)  

  if(user?.user?.isAdmin){
    disPatch({type:'dispatchIsAdmin'})
  }

  useEffect(()=>{   
  if(!token){
    navigate('/login')
    return 
  }
  },[token])

useEffect(()=>{
 setReRender(prev=>!prev)
  disPatch({type:'getRightDataFun'})
  disPatch({type:'activeToCall',payload:false})
},[!!emailUniqId])

  useEffect(()=>{
      disPatch({type:'getRightDataFun'})
      getUserRight(token,emailUniqId)
  },[getUserRight,activeToCall,toggaleToRerendar,emailUniqId,isEmployee])
  

  useEffect(()=>{
    if(validateVal){
      setValidateLayout(true)
    }else{
      setValidateLayout(false)
    }
  },[validateVal])

  console.log('hello')


  return (
    validateLayout&&
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3 mb-3">
          
          <AppContent params={params} />
        </div>
      </div>
    </div>
  )
}

export default DefaultLayout
