import { createStore,applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import obj from './views/hr/crmErpObjeact/obj';

let user = JSON.parse(localStorage.getItem('user-info'))


import axios from 'axios';



const initialState = {
  isAdmin:false,
  showHomePage:false,
  isEmployee:false,
  activeToCall:'',
  empLoyeeRights:obj,
  sidebarShow: true,
  domainOfApi:'https://yog-power-api.vercel.app',
  stockDataClothData:[],
  clothStockDataClearFun:()=>{},
  stockDataAuravedaData:[],
  auravedaStockDataClearFun:()=>{},
  stockDataFitnessProduct:[],
  fitnessDataClearFun:()=>{},
  stockDataFoodProduct:[],
  foodProductDataClearFun:()=>{},
  genralProduct:[],
  genralProductDataClearFun:()=>{},
  getUserRight:()=>{}
}

function toConfirmBooking(state,id){
return   state.map((el)=>{
    if(el._id===id){
      return {...el,toInvoice:true}
    }
    return el
})
}

function toPreserveValOFInvoce(prevstate,newState){

 return  newState.map((el)=>{
   const obj =   prevstate.find((el2)=>el2._id===el._id)
    if(obj){
      return {...obj,item:el.item}
    }
    return el
  })
}


const toPreventToAdd = (data) =>{
return data?.some((el)=>el?.toInvoice)
}

const store = createStore(changeState,applyMiddleware(thunkMiddleware))


function functionUser(token,emailUniqId){
  console.log(emailUniqId)
  return function(dispatch){
    axios.get(`${'https://yog-power-api.vercel.app'}/allRight/rights/${emailUniqId}`, {
      headers: {
          'Authorization': `Bearer ${token}`
      }
  })
      .then((res) => {
        if(res.status===200){
          dispatch({type:'activeToCall',payload:true})
          dispatch({type:'getRigtsData',payload:res.data})
        }
      })
      .catch((error) => {
          console.error(error)
      })
  }
}

// store.dispatch(functionUser())

function getUserRight(token,emailUniqId){
  store.dispatch(functionUser(token,emailUniqId))
}

function changeState (state = initialState, { type, ...rest }){
  switch (type) {
    case 'set':
      return { ...state, ...rest }

    // To ClothProduct 
     case 'add Stock':
      if(!toPreventToAdd(state.stockDataClothData)){
        state.stockDataClothData=  toPreserveValOFInvoce(state.stockDataClothData,rest.payload.item)  
      }
      state.clothStockDataClearFun = rest.payload.fun 
     return  { ...state, ...rest }
     case 'update add Stock':
      state.stockDataClothData=toConfirmBooking(state.stockDataClothData,rest.payload)
     return  { ...state, ...rest }
  
     
     // To AuravedaProduct 
     case 'add Auraveda':
      if(!toPreventToAdd(state.stockDataAuravedaData)){
        state.stockDataAuravedaData=toPreserveValOFInvoce(state.stockDataAuravedaData,rest.payload.item)
      }
      state.auravedaStockDataClearFun= rest.payload.fun 
     return  { ...state, ...rest }
     case 'update Aurveda Product':
     state.stockDataAuravedaData=toConfirmBooking(state.stockDataAuravedaData,rest.payload)
     return  { ...state, ...rest }
     

     // To Fitness Product 
     case 'add fitnessProduct':
      if(!toPreventToAdd(state.stockDataFitnessProduct)){
        state.stockDataFitnessProduct=toPreserveValOFInvoce(state.stockDataFitnessProduct,rest.payload.item)
      }
      state.fitnessDataClearFun= rest.payload.fun 
     return  { ...state, ...rest }
     case 'update fitnessProduct Product':
     state.stockDataFitnessProduct=toConfirmBooking(state.stockDataFitnessProduct,rest.payload)
     return  { ...state, ...rest }


    // To Food Product 
     case 'add foodProduct':
     if(!toPreventToAdd(state.stockDataFoodProduct)){
      state.stockDataFoodProduct=toPreserveValOFInvoce(state.stockDataFoodProduct,rest.payload.item)
    }
     state.foodProductDataClearFun= rest.payload.fun 
     return  { ...state, ...rest }
     case 'update foodProduct Product':
     state.stockDataFoodProduct=toConfirmBooking(state.stockDataFoodProduct,rest.payload)
     return  { ...state, ...rest }
    
    // To genral Product 
    case 'add genral Product':
    if(!toPreventToAdd(state.genralProduct)){
        state.genralProduct=toPreserveValOFInvoce(state.genralProduct,rest.payload.item)
    }
    state.genralProductDataClearFun= rest.payload.fun 
    return  { ...state, ...rest }
    case 'update genral Product':
    state.genralProduct=toConfirmBooking(state.genralProduct,rest.payload)
    return  { ...state, ...rest }

    // clear all store 
    case 'clear Stock':
      state.stockDataClothData=[]
      state.stockDataAuravedaData=[]
      state.stockDataFitnessProduct=[]
      state.stockDataFoodProduct=[]
      state.genralProduct=[]
    return  { ...state, ...rest }

    // HandleRights
     case 'getRigtsData':
      state.isEmployee =true
      state.empLoyeeRights = rest.payload
    return  { ...state, ...rest }

    case 'activeToCall':
    state.activeToCall=rest.payload
    return  { ...state, ...rest }

    case 'chnageGetRightDataFun':
    state.getUserRight =()=>{}
    state.empLoyeeRights = []
    return  { ...state, ...rest }
    case 'getRightDataFun':
    state.getUserRight =getUserRight
    return  { ...state, ...rest }
    case 'dispatchIsAdmin':
    state.isAdmin = true
    return  { ...state, ...rest }
    case 'showHomePage':
    return state.showHomePage = rest.payload 
    return  { ...state, ...rest }
    case 'clearentireStore':
    return {...initialState}
    default:




     return state
  } 

}




export default store
