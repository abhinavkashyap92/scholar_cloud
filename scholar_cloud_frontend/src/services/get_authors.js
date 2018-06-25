import axios from 'axios';

export default async (getAuthors) => {
  const response = await axios.get('http://localhost:5000/get_authors');
  return response.data.data;
};
