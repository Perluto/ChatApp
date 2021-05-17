import client from './client';

const createNewGroup = participants => client.post('/group', {participants});
const getGroupMessages = id => client.get(`/group/${id}`);

export default {
  createNewGroup,
  getGroupMessages,
};
