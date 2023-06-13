let user = JSON.parse(localStorage.getItem('user-info'))
const username = user.user.username;

function useMonthlyReport(){

return  function HandleMonthlyReport(data,memberData){
    const createMonthLyReport = []   
    data.forEach(element => {    
     const month =    new Date (element.checkDate).getMonth()
     const year =     new Date (element.checkDate).getFullYear()
    
        const monthLyReportObj = {
            batchTiming:element.batches,
            serviceName:element.ServiceName,
            trainerName:element.Condcuted ,
            ExistingClient:0,
            newClient:0,
            leftClient:0,
            TotalClient:0,
            monthlyInfo:{year:year,month:month} 
        }
    if(!createMonthLyReport[0]){
     createMonthLyReport.push(monthLyReportObj)
    } else if(!createMonthLyReport.some((el)=>
    el?.monthlyInfo?.year===year && el?.monthlyInfo?.month===month&&
    el.batchTiming===element.batches && el.serviceName.toLowerCase() === element.ServiceName.toLowerCase()  && 
    el.trainerName === element.Condcuted
    )){
        createMonthLyReport.push(monthLyReportObj)
    }
    });
    
    const uniqService =  createMonthLyReport.reduce((crr,el)=>{
    if(!crr.some((el2)=>el.batchTiming===el2.batchTiming && el.serviceName === el2.serviceName && 
    el.trainerName === el2.trainerName)){crr.push(el)}
    return crr},[])
    
    const monthDatainSubCategory =  uniqService.reduce((crr,el)=>{
    const data = []
    createMonthLyReport.forEach((el2)=>{
    if(el.batchTiming===el2.batchTiming && 
        el.serviceName === el2.serviceName && 
        el.trainerName === el2.trainerName){           
            data.push(el2)
    }
    })    
    crr.push(data)
    return crr
    },[])
    
    function findExistingClient(list){
        const time =  (new Date(list.endDate) -new Date())
        const days = Math.ceil(time/(1000*60*60*24))
              if((days>=0 && list.username === username &&list.plan===true)){
                console.log(list.invoiceId)
                 return true 
              }
              return false  
    }  
    function findLeftClient(list){
        const time =  (new Date(list.endDate) -new Date())
        const days = Math.ceil(time/(1000*60*60*24))
              if((days<=0 && list.username === username &&list.plan===true)){
                console.log(list.invoiceId)
                 return true 
              }
              return false  
    }  

    console.log(memberData.filter((el)=>el.Batch=== "6:45 PM"))
    monthDatainSubCategory.forEach(element => {
        let ExistingClient = 0
        let leftClient = 0;
        let previousClient = 0
    
      element.forEach((el)=>{
        let newClient = 0;
        let totalClient = 0 


        memberData.forEach((el2,i) => {
         
            const month =    new Date (el2.createdAt).getMonth()
            const year =     new Date (el2.createdAt).getFullYear()
             let add = true
    
            if(el.batchTiming === el2.Batch && el.trainerName ===   el2.GeneralTrainer&&
               el.serviceName.toLowerCase() ===el2.serviceName.toLowerCase() &&
               el?.monthlyInfo?.year===year && el?.monthlyInfo?.month===month
               ){
                el.TotalClient += ++totalClient 

                if(!findLeftClient(el2)){
                
                    ++ExistingClient
                    ++previousClient

               }
               
               
                if( el?.monthlyInfo?.year===year && el?.monthlyInfo?.month===month){
                    el.newClient+= ++newClient
                }
    
                if(findExistingClient(el2)){
                   el.ExistingClient += ExistingClient - newClient<=0?0:ExistingClient  - newClient
                }
                if(findLeftClient(el2)){
                     el.leftClient+= ++leftClient
                }
                

                if(add){
                    totalClient += previousClient - newClient<=0?0:previousClient  - newClient
                    add =false
    
                }
            }
        });
    })
    }); 
  return createMonthLyReport 
}

}

export default useMonthlyReport

