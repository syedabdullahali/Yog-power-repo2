
import { useEffect, useState } from 'react'
import './CustomSelectInput.css'
import {AiOutlineDown,AiOutlineUp,AiOutlineSearch} from 'react-icons/ai'

const CustomSelectInput = ({title,data,dataneed,getData}) => {

    const [visibale,setVisibale] = useState(false)
    const [inputvalName,setInputValName] = useState('')
    const [selectedName,setSelectedName] = useState(title)

    function getDataFun(event,el){
    console.log(el)
       if(event.target.id==='data-li-c'){
          getData(el)
          setSelectedName(el.Fullname)
          setVisibale(false)
       }
    }

    useEffect(()=>{
        setSelectedName(title)
    },[title])


  return (
 <div className='input-containenr'>
    <div className="select-btn-to-member" calssName='w-100' onClick={()=>{setVisibale(prev=>!prev)}} >
        <div>{selectedName}</div>
        {!visibale?<div className='member-input-icon'><AiOutlineDown/></div>:
        <div className='member-input-icon'> <AiOutlineUp/></div>}
      </div>
      <div className='member-content-data-li-c' style={{display:`${visibale?'block':'none'}`}}>
      <div className="search-data-li-c">
          <div ><AiOutlineSearch/></div>
          <input spellcheck="false" type="text" placeholder="Search" className='w-100'
           value={inputvalName}
           onChange={(e)=>setInputValName(e.target.value)}/>
        </div>
      <div className="member-content" calssName='w-100'>
      
        <ul className="options-data-li-c">

        {data?.filter((el)=>el.Fullname.includes(inputvalName)).map((el)=>{
                        return <li  id='data-li-c' onClick={(e)=>getDataFun(e,el)} >{el.Fullname }<br/>
                        {el.ContactNumber}
                        </li>
                    })}
        </ul>
      </div>
      </div>
 </div>
  )
}

export default CustomSelectInput
