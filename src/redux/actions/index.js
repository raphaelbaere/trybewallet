// Coloque aqui suas actions

const addUser = (value) => ({
  type: 'ADD_USER',
  value: value.email,
});

export default addUser;
