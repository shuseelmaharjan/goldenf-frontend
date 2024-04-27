import axios from 'axios';

const apiClient = axios.create({
  // baseURL: 'https://data.goldenfutureinstitute.com.np/'
  baseURL: 'http://localhost:8000'

});
export default apiClient;

