import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '38643483-af753ca3e0b3f8d342ebf97e6';

export async function fetchPhotos(q, page, perPage) {
  const resp = await axios.get(
    `${BASE_URL}?key=${KEY}&q=${q}&page=${page}&per_page=${perPage}&image_type=photo&orientation=horizontal&safesearch=true`
  );
  return resp.data;
};