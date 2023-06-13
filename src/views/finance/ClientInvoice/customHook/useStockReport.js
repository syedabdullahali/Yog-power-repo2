import axios from 'axios';
let user = JSON.parse(localStorage.getItem('user-info'))
const token = user.token;
import { useSelector } from 'react-redux';

const useStockReport = () => {
    const url = useSelector((el)=>el.domainOfApi)

    
    const headers =   {
        "Authorization": `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
    

 const saveData = (productData)=>{


    const selctedProduct =   {
            Order_Date: new Date(),
            Product_Category:productData.productDetails.Product_Category,
            Product_Name: productData.productDetails.Product_Name ,
            Brand_Name: productData.productDetails.Brand_Name,
            Category: productData.productDetails.Category,
            Product_Price: productData.productDetails.Product_Price,
            Orders_Quantity:-productData.item,
            Total_Price:+productData.productPrize * +productData.item,
            soldBy:productData.StatffName,
            sellerId:productData.EmpId,
            Color:productData.productDetails.Color,
            Client_Name: productData.Fullname,
            Mobile_No: productData.ContactNumber,
            Product_Code: productData.productCode,
            Status:'Sold',
            ProductId:productData.productDetails.ProductId,
            StatOfStock:'InStock',
        }
    
    
    axios.post(`${url}/stockorderlist/create`, selctedProduct,{headers})
    .catch((error) => {
        console.error(error)
    })
    

    // const data ={
    //         Sr_No:'',
    //         Date:new Date(),
    //         Client_Name: productData.Fullname,
    //         Mobile_No: productData.ContactNumber,
    //         Product_Code: productData.Product_Code,
    //         Product_Name:productData.Product_Name ,
    //         Brand_Name:productData.Brand_Name ,
    //         Category:productData.Category,
    //         Color:productData.Color,
    //         Price:productData.Price ,
    //         Quantity:productData.item,
    //         Sold_By:productData.StatffName,
    //     }
    
    // fetch(`${url}/productsalesreport`, {
    //     method: "POST",
    //     headers: {
    //         "Authorization": `Bearer ${token}`,
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(data)
    // }).catch((error)=>{console.log(error)})
}

return saveData
}

export default useStockReport
