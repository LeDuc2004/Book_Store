import axios from 'axios';

const BASE_URL = 'https://example.com/api';

function getData(endpoint) {
  return axios
    .get(`${BASE_URL}/${endpoint}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}

function postData(endpoint, data) {
  return axios
    .post(`${BASE_URL}/${endpoint}`, data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('Error posting data:', error);
    });
}

function putData(endpoint, data) {
  return axios
    .put(`${BASE_URL}/${endpoint}`, data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('Error putting data:', error);
    });
}

function deleteData(endpoint) {
  return axios
    .delete(`${BASE_URL}/${endpoint}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('Error deleting data:', error);
    });
}

export { getData, postData, putData, deleteData };
