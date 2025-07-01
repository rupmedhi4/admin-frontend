 //const base_url = "http://localhost:4000";
const base_url = "https://grocery-app-backend-1wx0.onrender.com";

export const apiAgent = {
  signup: `${base_url}/auth/user/signup`,
  login: `${base_url}/auth/user/login`,
  logout : `${base_url}/auth/user/logout`,
  createProduct : `${base_url}/product/create`,
  getOrderedProducts : `${base_url}/product/all`,
  updateStatus:`${base_url}/product/update/status`,
  createProduct:`${base_url}/product/create`,
  getMyProducts:`${base_url}/product/get/my-products`,
  updateProducts:`${base_url}/product/updates`,
  deleteProducts:`${base_url}/product/delete`,
  getCreateProducts:`${base_url}/product/get/my-products`,

};
