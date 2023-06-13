function useAttendanceEmp(){

    function compareDateFun(date1,date2){
        return   new Date(date1).getFullYear() === new Date(date2).getFullYear() &&
                        new Date(date1).getMonth() === new Date(date2).getMonth()&&
                        new Date(date1).getDate() === new Date(date2).getDate()
    }
    
    
    return function UpdateAttendance(data,dateWithAttendance,memBerData){



        function addingExternalClient(el){   
   
           let data = {

                username: el.username,
                centerId: '', 
                checkDate:" ",
                checkIn:" ",
                staffId:el._id,
                StaffName: el.FullName,
                staffContact:el.ContactNumber,
                Department: el?.Department,
                Designation:el?.JobDesignation,
                EmployeeCategory:el?.EmployeeCategory,
                joiningDate: el?.joiningDate,
                attentanceId: el.AttendanceID?el.AttendanceID:'', 
                status:el.status
           }
           return data
        } 
   
     const clientWithoutAttended =    memBerData.filter((el)=>{
            return (!data.some((el2)=>el2.staffId===el._id))         
        })
    const clinetToAddWitAttended =   clientWithoutAttended.map((el)=>{
       return   addingExternalClient(el)
      })
   
       const reverseData = data.reverse()    
       let dateWithAttendance2 =dateWithAttendance.slice()
   
        const staffID = [];
        console.log(staffID)
        const dataWitNotAttended = [...reverseData,...clinetToAddWitAttended]
        console.log(dataWitNotAttended)
        dataWitNotAttended.forEach(el => {if(!staffID.some((el2)=>el2===el.staffId)){staffID.push(el.staffId)}});
        const sortData = []

   
        staffID.forEach((el)=>{dataWitNotAttended.forEach(el2 => {if(el===el2.staffId ){sortData.push(el2)}})})
        sortData.forEach(el => {   
    const empData =  memBerData.find((el2)=>el2._id===el.staffId)   
    if(staffID.find((el2)=>el2===el.staffId)){
            
            el.status=empData.status
        
        
        }})       
   
   
        const newAt =    sortData.sort(a=>a.staffId).map((el,i,arr)=>{      
            console.log(el)  
         const dateWithAttendance1 = dateWithAttendance2.map((el2)=>{
                        if(compareDateFun(el2.attendanceDate,el.checkDate)){
                          return {attendanceDate:el2.attendanceDate,value:true}      
                        }
                        return {attendanceDate:el2.attendanceDate,value:el2.value}
                    })
                    const initialObjeact  = {     
                    
                        dateWithAttendance1,
                        staffId:el.staffId ,
                        centerId:el.centerId,
                        StaffName:el.StaffName ,
                        staffContact:el.staffContact,
                        Department:el.Department,
                        Designation:el.Designation,
                        EmployeeCategory:el.EmployeeCategory,
                        joiningDate:el.joiningDate,
                        attentanceId: el.attentanceId, 
                        status:el.status

                      }   
                      if(el.staffId ===arr[i+1]?.staffId ){
                       dateWithAttendance2 = dateWithAttendance1
                      }
                      if(el.staffId!==arr[i+1]?.staffId ){
                       const obj ={...initialObjeact}
                       dateWithAttendance2 =dateWithAttendance.slice()
                       return obj
       
                      }     
                  })
            ;
            return newAt.filter((el)=>el)
         } 




}



export default useAttendanceEmp