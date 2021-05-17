import client from './client';

const createNewGroup = participants => client.post('/group', {participants});
const getGroupMessages = () => client.get(`/group`);

export default {
  createNewGroup,
  getGroupMessages,
};
