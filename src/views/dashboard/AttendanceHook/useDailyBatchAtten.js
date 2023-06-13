function useDailyBatchAtten(){


    function compareDateFun(date1,date2){
        return   new Date(date1).getFullYear() === new Date(date2).getFullYear() &&
                        new Date(date1).getMonth() === new Date(date2).getMonth()&&
                        new Date(date1).getDate() === new Date(date2).getDate()
       }
       
return   function HandleDailyReport (data=[]){
       const removeDuplicate = []
       data.forEach((el)=>{
       if(!removeDuplicate.some((el2)=>   
        el2.trainerName.includes(el.Condcuted) 
       && el2.services.includes(el.ServiceName)  
       && el2.batchTiming.includes(el.batches)
       && compareDateFun(el2.date,el.checkDate)
       )){
         const monthlyReportObj ={
               trainerName:el.Condcuted,
               services:el.ServiceName,
               batchTiming:el.batches,
               noOfClients:0,
               Atteneded:0,
               date:el.checkDate
             }
       removeDuplicate.push(monthlyReportObj)
       }
       })
       removeDuplicate.forEach((el)=>{
       let noOfClients = 0
       let noOfAttended = 0
       let removeDuplicateClient =[]
       
       data.forEach((el2,i,arr)=>{
       if(   
       el.trainerName.includes(el2.Condcuted) 
       && el.services.includes(el2.ServiceName)  
       && el.batchTiming.includes(el2.batches)
       && compareDateFun(el.date,el2.checkDate)
       ){
       if(!removeDuplicateClient.some((el3)=> el3.clientId===el2.clientId)){    
       removeDuplicateClient.push(el2)
       noOfClients++
       el.noOfClients  = noOfClients
       }
       noOfAttended ++
       el.Atteneded  = noOfAttended 
       }
       })
       })
       
       const alldailyReport =removeDuplicate
       
       const reportDaily = alldailyReport.sort((b,a)=>{
        return   (new Date(a.date) - new Date(b.date))
       })
       return reportDaily
       }
}


export default useDailyBatchAtten