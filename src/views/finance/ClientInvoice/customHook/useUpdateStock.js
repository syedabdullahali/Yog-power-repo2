import React from 'react'
import { useSelector } from 'react-redux'

const useUpdateStock = (urlpath,setUPdatedImtemId) => {

    const url = useSelector((el)=>el.domainOfApi)  

  return (
    (item) => {
        let data1 = {...item,Available_Stock:item.Available_Stock-item.item,Sold:(+item?.Sold?+item?.Sold:0)+ +item.item}
        
    
        // fetch(`${url}/stockorderlist/create`, {
        //     method: "POST",
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data1)
        // }).then((resp) => {
        //     resp.json().then((data) => {
                setUPdatedImtemId(prev=>[...prev,item._id])
            // })
    }
  )
}

export default useUpdateStock
