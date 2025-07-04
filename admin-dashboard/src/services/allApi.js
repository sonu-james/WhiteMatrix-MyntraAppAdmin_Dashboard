
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
export const getAllOrdersApi = async(reqHeader)=>{
    return await commonApi('GET',`${serverUrl}/admin/getAllOrders`,"",reqHeader)
}

export const updateOrderStatus = async(reqBody, orderId,reqHeader)=>{
    return await commonApi('PUT',`${serverUrl}/admin/update-order-status/${orderId}`,reqBody,reqHeader)
}
export const getAllUsersApi = async(reqHeader)=>{
    return await commonApi('GET',`${serverUrl}/admin/getAllUsers`,"",reqHeader)
}
export const deleteAUserApi = async(id,reqHeader)=>{    
    return await commonApi('DELETE',`${serverUrl}/admin/deleteaUser/${id}`,{},reqHeader)
}

export const getAllUsersCountApi = async(reqHeader)=>{
    return await commonApi('GET',`${serverUrl}/admin/getUsersCount`,"",reqHeader)
}
export const getAllProductsApi = async(reqHeader)=>{
    return await commonApi('GET',`${serverUrl}/admin/getAllProducts`,"",reqHeader)
}
//to get top selling categories
export const getTopSellingCategoriesApi = async(reqHeader)=>{
    return await commonApi('GET',`${serverUrl}/admin/getTopSellingCategories`,"",reqHeader)
}
//to get monthly revenue
export const getMonthlyRevenueApi = async(reqHeader)=>{
    return await commonApi('GET',`${serverUrl}/admin/getMonthlyRevenue`,"",reqHeader)
}
//to get weekly revenue
export const getWeeklyRevenueApi = async(reqHeader)=>{
    return await commonApi('GET',`${serverUrl}/admin/getWeeklyRevenue`,"",reqHeader)
}
//to add new ads
export const addAdApi = async (reqBody, reqHeader) => {
  return await commonApi('POST', `${serverUrl}/add-ads`, reqBody, reqHeader);
};
//get all ads
export const getAllAdsApi=async(reqHeader)=>{
  return await commonApi('GET',`${serverUrl}/get-ads-admin`,"",reqHeader)
}
//delete ads
export const deleteAdApi=async(id)=>{
  return await commonApi('DELETE',`${serverUrl}/delete-ad/${id}`,{},"")
}

