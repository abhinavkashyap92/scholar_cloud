const fakeWordCloud = {
  'data': [
    {
      'value': 1,
      'word': 'Deep Learning',
    },
    {
      'value': 0.95,
      'word': 'SVM',
    },
  ],
};

export default async (authorId) => {
  return await new Promise((resolve) => {
    resolve(fakeWordCloud.data);
  });
};
