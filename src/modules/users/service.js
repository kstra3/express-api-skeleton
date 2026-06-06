const users = [
  { id: 1, name: 'Demo User', email: 'demo@example.com' },
];

const getUsers = () => users;

const createUser = (data) => {
  if (!data.name || !data.email) {
    const error = new Error('Name and email are required');
    error.code = 400;
    throw error;
  }

  const id = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
  const user = {
    id,
    name: data.name,
    email: data.email,
  };

  users.push(user);
  return user;
};

module.exports = {
  getUsers,
  createUser,
};
