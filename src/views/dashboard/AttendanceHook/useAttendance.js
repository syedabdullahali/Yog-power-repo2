
function compareDateFun(date1,date2){
    return   new Date(date1).getFullYear() === new Date(date2).getFullYear() &&
                    new Date(date1).getMonth() === new Date(date2).getMonth()&&
                    new Date(date1).getDate() === new Date(date2).getDate()
}
function useAttendance(){

return function UpdateAttendance(data,dateWithAttendance,memBerData){


     function addingExternalClient(el){   

        let data = {
             username: el.username,
             ClientName: el.Fullname, 
             centerId: el.CenterID, 
             attentanceId: el.AttendanceID, 
             checkDate:'', 
             checkIn: '',
             batches:el.Batch,
             category:'',
             clientId:el._id,
             ServiceName: el.serviceName,            
             Group:" ",
             PT:" ",
             Condcuted:el.GeneralTrainer,       
             package:el.package,
             startDate:el.startDate,
             endDate:el.endDate,
             contact:el.ContactNumber,
             admissionBatch:el.Batch,
             admissionPackageName:el.package,
             admissionDuration:el.duration

        }
        return data
     } 

  const clientWithoutAttended =    memBerData.filter((el)=>{
         return (!data.some((el2)=>el2.clientId===el._id))         
     })
 const clinetToAddWitAttended =   clientWithoutAttended.map((el)=>{
    return   addingExternalClient(el)
   })

console.log(clinetToAddWitAttended)

     

    const reverseData = data.reverse()    


    let dateWithAttendance2 =dateWithAttendance.slice()

     const clientIdes = [];
     const dataWitNotAttended = [...reverseData,...clinetToAddWitAttended]
     dataWitNotAttended.forEach(el => {if(!clientIdes.some((el2)=>el2===el.clientId)){clientIdes.push(el.clientId)}});
     const sortData = []

     clientIdes.forEach((el)=>{dataWitNotAttended.forEach(el2 => {if(el===el2.clientId){sortData.push(el2)}})})



     const newAt =    sortData.sort(a=>a.clientId).map((el,i,arr)=>{        
      const dateWithAttendance1 = dateWithAttendance2.map((el2)=>{
                     if(compareDateFun(el2.attendanceDate,el.checkDate)){
                       return {attendanceDate:el2.attendanceDate,value:true}      
                     }
                     return {attendanceDate:el2.attendanceDate,value:el2.value}
                 })
                 const initialObjeact  = {     
                     clientName:el.ClientName,
                     mobile:el.contact,
                     Services:el.ServiceName,
                     TrainerName:el.Condcuted,
                     attentanceId: el.attentanceId, 
                     classTimeing:'',
                     packages:'',
                     duration:el.package,
                     startDate:el.startDate,
                     endDate:el.endDate,
                     admissionBatch:el.admissionBatch,
                     admissionPackageName:el.admissionPackageName,
                     admissionDuration:el.admissionDuration,
                     dateWithAttendance1,
                     clientId:el.clientId,

                   }   
                   if(el.clientId===arr[i+1]?.clientId){
                    dateWithAttendance2 = dateWithAttendance1
                   }
                   if(el.clientId!==arr[i+1]?.clientId){
                    const obj ={...initialObjeact}
                    dateWithAttendance2 =dateWithAttendance.slice()
                    return obj
    
                   }     
               })
         ;
         return newAt.filter((el)=>el)
      } 
}


export default useAttendance