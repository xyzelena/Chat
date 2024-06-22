import axios from 'axios';

const postAuth = (path, data) => axios.post(path, data);

export default postAuth;
