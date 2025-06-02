const base_url = "http://localhost:4000";

export const apiAgent = {
  signup: `${base_url}/auth/user/signup`,
  login: `${base_url}/auth/user/login`,
  logout : `${base_url}/auth/user/logout`,
  createProduct : `${base_url}/product/create`,
  getOrderedProducts : `${base_url}/client/order/get`,
  updateStatus:`${base_url}/client/order/update/status`,
  createProduct:`${base_url}/product/create`,
  getMyProducts:`${base_url}/product/get/my-products`,
  updateProducts:`${base_url}/product/updates`,
  

};
