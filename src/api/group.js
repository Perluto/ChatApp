import client from './client';

const createNewGroup = (name, participants) =>
  client.post('/group', {name, participants});
const getGroupMessages = () => client.get(`/group`);
const changeParticipant = (id, newParticipants, options = 'empty') =>
  client.put(`/group/${id}/participants`, {newParticipants, options});

export default {
  createNewGroup,
  getGroupMessages,
  changeParticipant,
};
