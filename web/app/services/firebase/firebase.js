import axios from 'axios';
import { firebaseConfig } from 'config';
// import { Map } from 'immutable';

export function parseResults(response) {
  if (response.status !== 200) {
    return null;
  }
  return response.data;
  // return response;
}
export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errorMessage = response.statusText || 'ERROR STATUS';
  const error = new Error(errorMessage);
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
  console.log('FirebaseServiceRest:ID:', serialNumber);
  const path = `profiles/${serialNumber}.json`;
  console.log('FirebaseServiceRest:path:', path);
  return session.get(path)
    .then(checkStatus)
    .then(parseResults);
}

export async function getMultiFoodProfile(ids) {
  const data = {};
  await Promise.all(ids.map(async (id) => {
    data[id] = await getFoodProfile(id);
  }));
  return data;
}
