const useHandlelDailyReport = () => {
  return function HandleDailyReport (data=[]){
        const clientAllDailyReport = []
        data.forEach((el)=>{
          const monthlyReportObj ={
                ClientName:el.ClientName,
                attentanceId:el.attentanceId,
                trainerName:el.Condcuted,
                services:el.ServiceName,
                batchTiming:el.batches,
                totalClassses:0,
                Atteneded:0,
                date:el.checkDate,
                StartDate:el.startDate,
                EndDate:el.endDate,
                TotalSession:el.admissionPackageName 
              }
        clientAllDailyReport.push(monthlyReportObj)
        })
       
const sortedDailyReport = clientAllDailyReport.sort((b,a)=>{
    return   ( new Date(b.date) - new Date(a.date))
   })

const AllClientIdSartEndDate = sortedDailyReport.reduce((crr,el)=>{
    if(!crr.some((el2)=>el2.attentanceId===el.attentanceId)){
        crr.push({attentanceId:el.attentanceId,EndDate:el.EndDate,StartDate:el.StartDate})
    }
     return crr
},[])

AllClientIdSartEndDate.forEach((el2)=>{
// Acording To Id        
    let numOfAttendedClasses   = 0

    const AllAtendedBatchTiming = []
    sortedDailyReport.forEach((el)=>{
// Total attended batches 
      if(el2.attentanceId===el.attentanceId){
        const batches ={
            trainerName:el.trainerName,
            services:el.services,
            batchTiming:el.batchTiming,
          }
        el.Atteneded+= ++numOfAttendedClasses  
      if(!AllAtendedBatchTiming.some((el3)=>
      el3.trainerName ===batches.trainerName&&
      el3.services ===batches.services&&
      el3.batchTiming ===batches.batchTiming)){
        AllAtendedBatchTiming.push(batches)
      }}
    })
})        
        const alldailyReport =sortedDailyReport 
       return    alldailyReport.reverse()
    }
}

export default useHandlelDailyReport
