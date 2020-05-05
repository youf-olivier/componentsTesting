import axios from 'axios';

const githubBaseUrl = 'https://api.github.com/';
const topFalloworsUrl = 'search/users?q=followers:%3E40000&order=desc&sort=followers';
const urlSearchUser = 'search/users';

export const requestInfoGet = {
  method: 'GET',
  crossDomain: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/vnd.github.v3+json',
  },
};

export const fetchUserWithFetch = fetchInt => async user => {
  const url = user ? `${githubBaseUrl}${urlSearchUser}?q=user:${user}` : `${githubBaseUrl}${topFalloworsUrl}`;
  const response = await fetchInt(url, requestInfoGet);
  if (response.status !== 200) {
    throw response.statusText;
  }
  return response.data;
};

export const searchUserByNameWithFetch = fetchInt => async userName => {
  const url = `${githubBaseUrl}${urlSearchUser}?q=${userName}in%3Afullname`;
  const response = await fetchInt(url, requestInfoGet);
  if (response.status !== 200) {
    throw response.statusText;
  }
  return response.data;
};

export const fetchUser = fetchUserWithFetch(axios);
export const fetchUserByName = searchUserByNameWithFetch(axios);
