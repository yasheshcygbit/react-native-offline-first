import Api from './Api';

const ApiService = {
  async getAllUsers() {
    return Api.get('/api/users');
  },
  async createNewUser(data) {
    return Api.post('/api/users', data);
  },
};
export default ApiService;
