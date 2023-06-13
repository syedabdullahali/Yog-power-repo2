import React from 'react'

const useRight = (setRightObject,Grandparnet) => {

   
return function empSubRigthFun(parent,type,val){
if(parent){
        setRightObject(prev=>{
            prev.crmRights[Grandparnet].items[type].value=val
            return {...prev}
}
)
}
} 
}


const useSuperRightVal =(superRight)=>{
    return (val,type)=>{
        return superRight[type].includes(val)
       } 
}

const useSuperRightFun = (setRightObject,parent,child)=>{
    return (val,type)=>{
       
        setRightObject((prev)=>{
          const rightsPath = prev[parent][child].items.superRight[type]
          
           if(!rightsPath?.includes(val)){
               rightsPath?.push(val)
           }else if(rightsPath.includes(val)){
               rightsPath?.splice(rightsPath?.indexOf(val),1)
           }   
             return {...prev}
          })
        
       }
}




export {useRight,useSuperRightVal,useSuperRightFun}
