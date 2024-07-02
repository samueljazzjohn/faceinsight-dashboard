import coreApiClient from "./clients/coreApiClients";


export const getFacebookUserData = async (body: {}) => {
  return coreApiClient({
    method: "POST",
    url:'/v1/facebook/user-data',
    data: body,
  });
};

export const getPageInsights = async(body:{})=>{
  return coreApiClient({
    method: "POST",
    url:`/v1/facebook/page-insights`,
    data: body,
  })
}