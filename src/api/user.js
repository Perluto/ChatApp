import client from './client';

const register = userInfo => client.post('/user', userInfo);
const updateStatus = (id, status) =>
  client.put(`/user/${id}/status`, {online: status});

export default {
  register,
  updateStatus,
};
