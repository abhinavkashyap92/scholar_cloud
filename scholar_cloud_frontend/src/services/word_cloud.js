import axios from 'axios';

export default async (authorId, fromYear, toYear) => {
  const response = await axios.get('http://localhost:5000/top_words/?author_id='
  + authorId + '&from_year=' + fromYear + '&to_year=' + toYear + '&limit=200');
  return response.data.data;
};
