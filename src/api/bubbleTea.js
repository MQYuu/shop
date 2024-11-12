import axios from 'axios';

const API_URL = 'http://localhost:3000/bubbleTeas';

export const getBubbleTeas = () => {
  return axios.get(API_URL)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching bubble teas:', error);
      throw error;
    });
};
