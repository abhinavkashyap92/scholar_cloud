const fakeActiveYears = {
  'from_year': 2001,
  'to_year': 2002,
};

export default async (authorId) => {
  return await new Promise((resolve) => {
    resolve(fakeActiveYears);
  });
};
