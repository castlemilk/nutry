import axios from 'axios';
import { firebaseConfig } from 'config';

function parseResults(response) {
  if (response.status !== 200) {
    return null;
  }
  return response.data;
}
function checkStatus(response) {
  console.log(response);
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export function getFoodProfile(source, serialNumber) {
  const session = axios.create({
    baseURL: firebaseConfig.endpoint,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  console.log('FirebaseServiceRest:ID:', serialNumber);
  console.log('FirebaseServiceRest:source:', source);
  const path = `${source}/${serialNumber}.json`;
  return session.get(path)
    .then(checkStatus)
    .then(parseResults);
}

// function foodProfileRefJSON(id, source) {
//   return foodProfileRef(id, source).then((response) => response.json());
// }
//
// function fetchFoodProfile(id, source) {
//   foodProfileRef(id, source).then((snapshot) => {
//     cb(snapshot);
//   });
// }
