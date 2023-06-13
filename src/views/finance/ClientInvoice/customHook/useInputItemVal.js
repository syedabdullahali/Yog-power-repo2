import React from 'react'

const useInputItemVal = (setNoOfProduct) => {
  return (
    function inputItemVal (val,item){
        if(+val>=0){
            setNoOfProduct((prev)=>{         
                    prev.map((el)=>{
                      if(el.id===item?._id &&val<=+el.avStock){
                       el.item=+val
                      }        
                    })      
                    
                return [...prev]
                })
    
        }
    
    }
  )
}

export default useInputItemVal
