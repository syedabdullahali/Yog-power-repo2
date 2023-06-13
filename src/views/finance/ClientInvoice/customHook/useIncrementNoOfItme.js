
const useIncrementNoOfItem = (setNoOfProduct,setActiveToIncrement) => {
  return (
    function incrementNoOfItem(item,type){
         setNoOfProduct((prev)=>{
             if(prev.some((el)=>el?.id===item?._id) ){
          
          prev.map((el)=>{
                   if(el.id===item?._id&&el.item>=0&&type==='increment'&&el.item<+el.avStock){
                    el.item+=1
                   }
                   if(el.id===item?._id&&el.item>0&&type==='decrement'&&el.item<=el.avStock){
                     el.item-=1
                    }
                    
                    if(el.id===item?._id&&el.item===0&&type==='decrement'){
                          setActiveToIncrement(prev2=>{
                             if(prev2.some((el)=>el===item?._id) ){
                               return  [...prev2.filter((el)=>el!==item._id)]
                             }
                         })
                    }
     
                    return el
                 })
     
     
             }
             const filterItem =[...prev.filter((el)=>el.item)]
     
             return filterItem
             })
     }
  )
}

export default useIncrementNoOfItem
