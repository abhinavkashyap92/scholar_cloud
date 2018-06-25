const fakeData = {
  'data': [
    {
      'id': '1',
      'name': 'Author 1',
    },
  ],
};

export default async () => {
  const response = await new Promise((resolve) => {
    resolve(fakeData.data);
  });

  return response;
};
