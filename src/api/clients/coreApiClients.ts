import axios from "axios";
import getConstants from "../../config/constants";

const {BACKEND_URL} = getConstants()


const coreApiClient = axios.create({
  baseURL: `https://${BACKEND_URL}`,
  timeout: 100000,
});


export default coreApiClient;
