import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '41849458-2d98265cf06659a45ba73a30c';

export async function getPhotos(value, page = 1) {
  try {
    const response = await axios.get(`${BASE_URL}/`, {
      params: {
        key: API_KEY,
        q: value,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: 15,
        page,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Sorry! Try later! Server not working');
  }
}
