import axios from 'axios';

async function getToken() {
  try {
    const response = await axios.get('https://challenge.fonicredito.com/token?user=marco.mendoza.hill@gmail.com');
    return response.data.token;
  } catch (error) {
    console.error('Error getting token:', error);
  }
}

export default getToken;
