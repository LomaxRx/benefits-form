import axios from 'axios';

export const postAssistanceRequest = (data, callback=()=>{}) => {
  axios({
    method: 'post',
    url: 'http://localhost:49567/api/assistance-requests',
    data,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Cache-Control': 'no-cache'
    }
  }).then(function (response) {
      callback(response);
    })
    .catch(function (error) {
      callback(error.response);
    });
}

export const getServiceTypes = (callback=()=>{}) => {
  axios.get('http://localhost:49567/api/service-types')
    .then(function (response) {
      callback(false, response);
    })
    .catch(function (error) {
      callback(error);
    });
}
