
import { commonApi } from "./commonApi"
import {serverUrl} from "./serverUrl"

//login
export const loginApi= async(reqBody)=>{
  return await commonApi('POST',`${serverUrl}/login`,reqBody,"")
}
// Add Product API
export const addProductApi = async (reqBody, reqHeader) => {
  return await commonApi('POST', `${serverUrl}/add_product`, reqBody, reqHeader);
};

//get all product API
export const allProductApi=async(reqHeader)=>{
  return await commonApi('GET',`${serverUrl}/all-products-admin`,"",reqHeader)
}

//edit product API
export const updateProductApi = async (productId, reqBody, reqHeader) => {
  return await commonApi('PUT', `${serverUrl}/update-product/${productId}`, reqBody, reqHeader);
};

//delete products
export const deleteProductApi=async(id)=>{
  return await commonApi('DELETE',`${serverUrl}/delete/${id}`,{},"")
}


//get all orders
export const getAllOrdersApi = async()=>{
    return await commonApi('GET',`${serverUrl}/admin/getAllOrders`,"","")
}

export const updateOrderStatus = async(reqBody, orderId)=>{
    return await commonApi('PUT',`${serverUrl}/admin/update-order-status/${orderId}`,reqBody,"")
}
export const getAllUsersApi = async()=>{
    return await commonApi('GET',`${serverUrl}/admin/getAllUsers`,"","")
}
export const getAllUsersCountApi = async()=>{
    return await commonApi('GET',`${serverUrl}/admin/getUsersCount`,"","")
}
export const getAllProductsApi = async()=>{
    return await commonApi('GET',`${serverUrl}/admin/getAllProducts`,"","")
}
//to get top selling categories
export const getTopSellingCategoriesApi = async()=>{
    return await commonApi('GET',`${serverUrl}/admin/getTopSellingCategories`,"","")
}
//to get monthly revenue
export const getMonthlyRevenueApi = async()=>{
    return await commonApi('GET',`${serverUrl}/admin/getMonthlyRevenue`,"","")
}
//to get weekly revenue
export const getWeeklyRevenueApi = async()=>{
    return await commonApi('GET',`${serverUrl}/admin/getWeeklyRevenue`,"","")
}