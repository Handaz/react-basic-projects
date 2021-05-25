const paginate = (page, data) => {
  const users = data.slice(page, page + 10);
  console.log(users);
  return users;
};

export default paginate;
