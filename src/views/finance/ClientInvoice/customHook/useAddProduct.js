
const useAddProduct = (setNoOfProduct,setActiveToIncrement) => {
  return (
    function AddProduct(item){

        setNoOfProduct((prev)=>{
        if(!prev.some((el)=>el?.id===item?._id)){
           prev.push({item:1,avStock:item.Available_Stock,id:item._id,...item})
           setActiveToIncrement((prev)=>[...prev,item._id])
        }else{
            prev.map((el)=>{
              if(el.id===item?._id&&el.item<+el.avStock){
               el.item+=1
              }        
            })
        }
    
        return [...prev]
    
        })
    
    } 
  )
}

export default useAddProduct
