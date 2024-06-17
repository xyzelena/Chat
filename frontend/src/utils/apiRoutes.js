// https://www.npmjs.com/package/@hexlet/chat-server

const apiPath = '/api/v1';

const apiRoutes = {
  loginPath: `${apiPath}/login`,
  signupPath: `${apiPath}/signup`,
  channelsPath: `${apiPath}/channels`,
  messagesPath: `${apiPath}/messages`,
};

export default apiRoutes;
