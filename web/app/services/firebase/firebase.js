import axios from 'axios';
import { firebaseConfig } from 'config';
// import { Map } from 'immutable';

function parseResults(response) {
  if (response.status !== 200) {
    return null;
  }
  return response.data;
}
function checkStatus(response) {
  // console.log(response);
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export function getFoodProfile(serialNumber) {
  const session = axios.create({
    baseURL: firebaseConfig.endpoint,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  // console.log('FirebaseServiceRest:ID:', serialNumber);
  const path = `profiles/${serialNumber}.json`;
  return session.get(path)
    .then(checkStatus)
    .then(parseResults);
}

export async function getMultiFoodProfile(ids) {
  const data = {};
  await Promise.all(ids.map(async (id) => {
    data[id] = await getFoodProfile(id);
  }));
  // console.log(data);
  return data;
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
