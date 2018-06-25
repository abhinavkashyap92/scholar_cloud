import axios from 'axios';

export default async (authorId) => {
  const response = await axios.get('http://localhost:5000/get_active_years/?author_id='+authorId);
  return response.data;
};
