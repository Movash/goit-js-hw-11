import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
axios.defaults.headers.common['x-api-key'] =
  '38643483-af753ca3e0b3f8d342ebf97e6';

export async function fetchPhotos(request) {
  const resp = await axios.get(
    `${BASE_URL}?q=${request}&image_type=photo&orientation=horizontal&safesearch=true`
  );
  console.log(resp.data);
  return resp.data;
}